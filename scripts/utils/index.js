const fs = require('fs-extra')

const { log } = require('./log')
const { 
  BasePath,
  TemplateDir,
  SrcDir,
  RewriteTarget,
  ReWriteReg,
  TemplateFiles,
  cacheFileName,
} = require('./config')

let packageObj
async function readJSONFile() {
  ensureFile(`${BasePath}/cache.json`)
  try {
    packageObj = await fs.readJson(`${BasePath}/cache.json`)
  } catch {
    packageObj = { nextPointer: 1 }
  }
  return packageObj
}

async function changeNextPointer(nextPointer = null) {
  packageObj.nextPointer = nextPointer || Number(packageObj.nextPointer) + 1
  await fs.writeJson(`${BasePath}/cache.json`, packageObj, { spaces: '\t' })
}

function ensureDir(dir) {
  fs.ensureDirSync(dir)
}

function ensureFile(file) {
  fs.ensureFileSync(file)
}

module.exports = {
  log,
  fs,
  BasePath,
  TemplateDir,
  SrcDir,
  RewriteTarget,
  ReWriteReg,
  TemplateFiles,
  cacheFileName,
  readJSONFile,
  changeNextPointer,
  ensureDir,
  ensureFile,
}
