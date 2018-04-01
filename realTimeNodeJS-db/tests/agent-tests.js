'use strict'

const test = require('ava')
const proxyquire = require('proxyquire')
let config = {
    loggin: function() {}
}

let MetricStub = {
 belongsTo: function() {} 
}

let AgentStub = null

let db = null
test.beforeEach(async () => {
    AgentStub = {
        hasMany: function () {}
    }

    const setupDatabse = proxyquire('../', {
        './models/agent': () => AgentStub,
        './models/metric': () => MetricStub
    })
    db = await setupDatabse(config)
})

test('Agent', t => {
    t.truthy(db.Agent, 'Agent service should exist')
})