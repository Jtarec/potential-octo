const runInquirer = require('./inquirer')
const createFile = require('./file')

async function run() {
  const { fileName, funcName } = await runInquirer()
  if (fileName === '' || funcName === '') {
    console.error('fileName or funcName could not be undefined')
    return
  }
  await createFile({ fileName, funcName })
}

run()
