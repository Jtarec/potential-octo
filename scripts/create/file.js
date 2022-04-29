const {
  log,
  fs,
  TemplateDir,
  SrcDir,
  ReWriteReg,
  TemplateFiles,
  ensureDir,
  readJSONFile,
  changeNextPointer,
} = require('../utils')

/**
 * 获取当前Pointer
 */
async function getPointer() {
  const obj = await readJSONFile()
  return obj.nextPointer
}

async function getFileName(fileName) {
  const pointer = await getPointer()
  return `/${pointer}.${fileName}`
}

/**
 * 复制模板到 src 目录
 */
// TODO: add configuration
// TOFIX: use async await
async function copyTemplate(fileName) {
  const targetDir = SrcDir + await getFileName(fileName)
  return new Promise((resolve, reject) => {
    fs.ensureDir(targetDir)
      .then(() => {
        log('Create template dir successful...', 'success')
        fs.copy(TemplateDir, targetDir)
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

module.exports = async({ fileName, funcName }) => {
  ensureDir(SrcDir)
  const targetDir = await copyTemplate(fileName)
  await rewriteTemplate(targetDir, funcName)
  log(`Generate ${fileName} successful`, 'success')
  await changeNextPointer()
}
