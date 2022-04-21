const runInquirer = require('./inquirer')
const createFile = require('./file')

async function run() {
  const { fileName, funcName } = await runInquirer()
  if (fileName === '' || funcName === '') {
    console.error('fileName or funcName cound not be undefined')
    return
  }
  await createFile({ fileName, funcName })
}

run()
