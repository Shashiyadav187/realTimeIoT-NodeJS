'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const agentFixtures = require('./fixtures/agent')

let config = {
    loggin: function() {}
}

let MetricStub = {
 belongsTo: sinon.spy()
}

// Get one instance 
let single = Object.assign({}, agentFixtures.single)
let id = 1
let uuid = 'yyyy-yyyy-yyyy'
let AgentStub = null
let db = null
let sandbox = null

let uuidArgs = {
    where: {
        uuid
    }
}

test.beforeEach(async () => {
    sandbox = sinon.sandbox.create()
    AgentStub = {
        hasMany: sandbox.spy()
    }
    // Model findOne Stub
    AgentStub.findOne = sandbox.stub()
    AgentStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(agentFixtures.byUuid(uuid)))
    // Model findById Stub
    AgentStub.findById = sandbox.stub()
    AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))

    AgentStub.update = sandbox.stub()
    AgentStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single))
    
    const setupDatabse = proxyquire('../', {
        './models/agent': () => AgentStub,
        './models/metric': () => MetricStub
    })
    db = await setupDatabse(config)
})

test.afterEach(() => {
    sandbox && sinon.sandbox.restore()
})

test('Agent', t => {
    t.truthy(db.Agent, 'Agent service should exist')
})


test.serial('Setup', t => {
    t.true(AgentStub.hasMany.called, 'Agent.hasMany was executed')
    t.true(AgentStub.hasMany.calledWith(MetricStub), 'Agent.hasMany was executed with Matric')
    t.true(MetricStub.belongsTo.called, 'Metric.belongsTo was executed')
    t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentStub')
})

test.serial('Agent#findById', async t => {
   let agent = await db.Agent.findById(id) 
   t.true(AgentStub.findById.called, 'FindById should be called on model')
   t.true(AgentStub.findById.calledOnce, 'FindById should be called once')
   t.true(AgentStub.findById.calledWith(id), 'FindById should be called with specified id')

   t.deepEqual(agent, agentFixtures.byId(id), 'Should be the same')
})

 test.serial('Agent#createOrUpdate - exists', async t => {
     let agent = await db.Agent.createOrUpdate(single)

     t.deepEqual(agent, single, 'Agent should be the same')
 })

