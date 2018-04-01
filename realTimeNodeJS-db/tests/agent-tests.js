'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
    loggin: function() {}
}

let MetricStub = {
 belongsTo: sinon.spy()
}

let AgentStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
    sandbox = sinon.sandbox.create()
    AgentStub = {
        hasMany: sandbox.spy()
    }

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