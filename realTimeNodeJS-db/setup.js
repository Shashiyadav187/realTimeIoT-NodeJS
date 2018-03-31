'use strict'

// Debug of module
const debug = require('debug')('realTimeNodeJS-db:db:setup')
// Let us to ask questions
const inquirer = require('inquirer')
// Beautiful look and feel
const chalk = require('chalk')
// Connect db
const db = require('./')

// Prompt for ask questions
const prompt = inquirer.createPromptModule()


async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure? '
   }
 ]) 

 if(!answer.setup) {
   return console.log('Nothing happend ! :)')
 }
  const config = {
    database: process.env.DB_NAME || 'realtimenodedb',
    username: process.env.DB_USER || 'realtimenode',
    password: process.env.DB_PASS || 'realtimenode',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message} ` )
  console.error(err.stack)
  process.exit(1)
}

setup()
