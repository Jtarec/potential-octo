const chalk = require('chalk')

const error = chalk.white.bgRed
const warning = chalk.keyword('orange')
const success = chalk.greenBright
const normal = chalk.hex('#DEADED')

const chalkMap = {
  error,
  warning,
  success,
  normal
}

const log = (msg, event) => {
  if (!chalkMap[event]) {
    event = 'normal'
  }
  console.log(chalkMap[event](msg))
}

module.exports = {
  log
}