'use strict'

const setupDatabase = require('../lib/db')
const setupAgentModel = require('../models/agent')
const setupMetricModel = require('../models/metric')

module.exports = async function (config) {
  const sequealize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MatricModel = setupMetricModel(config)
  AgentModel.hasMany(MatricModel)
  MatricModel.belongsTo(AgentModel)
  await sequealize.authenticate()
  // sequealize.async()
  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
