const winston = require('winston')

module.exports = {
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
}
