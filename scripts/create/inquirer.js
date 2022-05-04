const inquirer = require('inquirer')
const { log, fs, SrcPath } = require('../utils')

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
      ])
      .then((answers) => {
        const { dirPath } = answers
        const files = fs.readdirSync(`${SrcPath}/${dirPath}`, 'utf8')
        const supportPoint = getNextPoint(files)
        inquirer.prompt([
          {
            type: 'input',
            name: 'id',
            message: '请输入题目序号',
            default: supportPoint,
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
          answers.dirPath = dirPath
          answers.fileName = answers.fileName.replace(/\s/g, '')
          answers.funcName = answers.funcName.replace(/\s/g, '')   
          resolve(answers)
        })
        .catch((err) => {
          log(err.message, 'error')
          reject(err)
        })
      })
      .catch((err) => {
        log(err.message, 'error')
        reject(err)
      })
  })
}


function getNextPoint(files) {
  files = files.sort((a, b) => a.split('.')[0] - b.split('.')[0]).map(item => item.split('.')[0])
  const n = files.length
  if (files[n - 1] === n + '') return n + 1
  for (let i = 0; i < n; ++i) {
    const id = files[i]
    if (id !== i + 1) return `可使用空缺序号(${i + 1})，或者使用最新序号(${n + 1})`
  }
  return n + 1
}