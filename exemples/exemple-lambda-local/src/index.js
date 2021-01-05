const path = require('path')
const winston = require('winston')
const lambdaLocal = require('lambda-local')

/** The logger. */
const LOG = winston.createLogger(require('./settings').Logging)

lambdaLocal.setLogger(LOG) // Use our logger in Lambda Local.

const jsonPayload = {
  'key': 1,
  'another_key': 'Some text'
}

/**
 * Execute a Lambda function.
 */
function getTodos () {
  lambdaLocal.execute({
    event: jsonPayload,
    lambdaPath: path.join(__dirname, 'todos.js'),
    profileName: 'default',
    timeoutMs: 3000
  }).then((done) => {
    // LOG.info(done)
  }).catch((err) => {
    LOG.error(err)
  })
}

/**
 * Entry point.
 */
function main() {
  getTodos()
}

main()