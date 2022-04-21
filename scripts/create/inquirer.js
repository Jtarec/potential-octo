const inquirer = require('inquirer')

module.exports = () => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
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
        resolve(answers)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
