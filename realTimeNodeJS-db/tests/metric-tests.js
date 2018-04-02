'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

//const agentFixtures = require('./fixtures/agent')
const metricFixtures = require('./fixtures/metric')


let config = {
    loggin: function () {}
  }
  
  let MetricStub = {
    belongsTo: sinon.spy()
  }

  let AgentStub = {
    hasMany: sinon.spy()
  }

  let sandbox = null
  let db = null
  let agentId = 1
  let type = 'START'
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


  test.serial('Setup', t => {
    t.true(AgentStub.hasMany.called, 'Agent.hasMany was executed')
    t.true(AgentStub.hasMany.calledWith(MetricStub), 'Agent.hasMany was executed with Matric')
    t.true(MetricStub.belongsTo.called, 'Metric.belongsTo was executed')
    t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentStub')
  })


  test.serial('Metric#findByAgentId', async t => {
    let metric = await db.Metric.findByTypeAgentUuid(type, agentId)
    t.true(MetricStub.findByTypeAgentUuid.called, 'findByTypeAgentUuid should be called on model')
  //  t.true(AgentStub.findById.calledOnce, 'FindById should be called once')
  //  t.true(AgentStub.findById.calledWith(id), 'FindById should be called with specified id')
  
    t.deepEqual(metric, metricFixtures.byTypeAnAgentId(type, agentId), 'Should be the same')
  })
  