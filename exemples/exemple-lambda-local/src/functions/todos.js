const axios = require('axios')
const winston = require('winston')

const LOG = winston.createLogger(require('./settings').Logging)

/**
 * Return todo list from a fake service (see: https://jsonplaceholder.typicode.com)
 * @param event - The event.
 * @param context - The context.
 * @param callback - The callback function.
 * @returns {Promise<void>}
 */
exports.handler = async function (event, context, callback) {
  LOG.info('Function: returns todo list.')
  try {
    let res = await axios.get('https://jsonplaceholder.typicode.com/todos/')
    callback(null, res.data)
  } catch (err) {
    callback(err)
  }
}
