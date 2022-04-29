const inquirer = require('inquirer')
const { log } = require('../utils')

module.exports = (dirs) => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'dirPath',
          message: '请选择文件夹',
          default: 'handwritten',
          choices: dirs.map(label => ({ name: label, value: label })),
        },
        {
          type: 'input',
          name: 'id',
          message: '请输入题目序号',
        },
        {
          type: 'input',
          name: 'fileName',
          message: '请输入文件名',
        },
        {
          type: 'input',
          name: 'funcName',
          message: '请输入函数名',
        },
      ])
      .then((answers) => {
        answers.fileName = answers.fileName.replace(/\s/g, '')
        answers.funcName = answers.funcName.replace(/\s/g, '')
        resolve(answers)
      })
      .catch((err) => {
        log(err.message, 'error')
        reject(err)
      })
  })
}
