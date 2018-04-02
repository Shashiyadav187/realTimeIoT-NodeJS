'use strict'

const agentFixtures = require('./agent')

const metric = {
  type: 'START',
  value: 'ENGINE',
  createAt: new Date(),
  updateAt: new Date(),
  agentId: 1
}

const metrics = [
    metric,
    extend(metric, {type: 'END', value: 'ENGINE', agentId: 1}),
    extend(metric, {type: 'TOUCH', value: 'BUTTOM', agentId: 1}),
    extend(metric, {type: 'START', value: 'ENGINE', agentId: 2}),
  ]
  
  function extend (obj, values) {
    const clone = Object.assign({}, obj)
    return Object.assign(clone, values)
  }

  module.exports = {
    single: metric,
    all: metrics,
    byStart: metrics.filter(a => a.type === 'START').shift(),
    byValue: value => metrics.filter(a => a.value === value).shift(),
    byType: type => metrics.filter(a => a.type === type).shift(),
    byTypeAnAgentId: (type, uuid) => metrics.filter( a => a.agentId === agentFixtures.byUuid(uuid).id  && a.type === type ).shift()
  }
  