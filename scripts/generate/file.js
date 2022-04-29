const { TemplateDir, TemplateFiles, ReWriteReg, fs, log, SrcPath, ensureFile, BasePath } = require('../utils')

/**
 * 复制模板到 src 目录
 */
// TODO: add configuration
// TO FIX: use async await
async function copyTemplate(targetDir, templateDir) {
  return new Promise((resolve, reject) => {
    fs.ensureDir(targetDir)
      .then(() => {
        log('Create template dir successful...', 'success')
        fs.copy(templateDir, targetDir)
          .then(() => {
            log('Copy template files successful...', 'success')
            resolve(targetDir)
          })
          .catch(err => reject(err))
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 重写对应模板文件
 */
async function rewriteTemplate(target, funcName) {
  for (const file of TemplateFiles) {
    const fileJSON = await read(target + file, funcName)
    save(target + file, fileJSON)
  }
}

async function read(target, funcName) {
  let readerJson = await fs.readFile(target, { encoding: 'utf-8' })
  readerJson = readerJson.replace(ReWriteReg, funcName)
  return readerJson
}

function save(target, json) {
  fs.writeFileSync(target, json, { encoding: 'utf-8' })
}

/**
 * @description: 生成 md 文档
 * @return {*}
 */
function generateMarkdown() {
  const dirs = fs.readdirSync(SrcPath)
  if (!dirs.length)
    return log('找不到文件路径', 'error')

  let md = '# 题库\r\n'
  dirs.forEach((item) => {
    md += `\r\n## ${item.toUpperCase()}\r\n\r\n`
    md += '| 题目 |\r\n'
    md += '| ---- |\r\n'
    const subDirs = fs.readdirSync(`${SrcPath}/${item}`)
    subDirs.sort((a, b) => parseInt(a) - parseInt(b))
    subDirs.forEach((problem) => {
      md += `| [${problem}](./src/${item}/${problem}/readme.md) |\r\n`
    })
  })

  ensureFile(`${BasePath}/Problem.md`)
  fs.writeFileSync(`${BasePath}/Problem.md`, md)
}

module.exports = async ({ dirPath, id, fileName, funcName }) => {
  console.log("dirPath", dirPath)
  const targetDir = `${SrcPath}/${dirPath}/${id}.${fileName}`
  const curTemplateDir = `${TemplateDir}/${dirPath}`

  await copyTemplate(targetDir, curTemplateDir)
  await rewriteTemplate(targetDir, funcName)
  log(`Generate ${fileName} successful`, 'success')

  await generateMarkdown(SrcPath)
  log('Generate Promise.md successful', 'success')
}
