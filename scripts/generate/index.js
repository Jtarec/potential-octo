const clear = require('clear')
const { log, fs, SrcPath } = require('../utils')
const inquirer = require('./inquirer')
const update = require('./file')

async function run() {
  clear()
  const dirs = fs.readdirSync(SrcPath)
  const { dirPath, id, fileName, funcName } = await inquirer(dirs)
  if (parseInt(id) !== Number(id))
    return log('id must be number', 'error')

  if (fileName === '' || funcName === '')
    return log('fileName or funcName could not be undefined', 'error')

  update({ dirPath, id, fileName, funcName })
}

run()
