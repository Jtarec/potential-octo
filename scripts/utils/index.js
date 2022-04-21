const { log } = require('./log')
const path = require('path')
const fs = require('fs-extra')
const BasePath = path.resolve(__dirname, '../../')
const TemplateDir = `${path.resolve(__dirname, '../../')}/template`
const SrcDir = `${BasePath}/src`
const RewriteTarget = 'create_funcName'
const ReWriteReg = new RegExp(`(${RewriteTarget})+`, 'g')
const TemplateFiles = ['/index.ts', '/index.spec.ts']

let packageObj
async function readJSONFile() {
  packageObj = await fs.readJson(`${BasePath}/package.json`)
  return packageObj
}
async function changeNextPointer(nextPointer = null) {
  packageObj.nextPointer = nextPointer || Number(packageObj.nextPointer) + 1
  await fs.writeJson(`${BasePath}/package.json`, packageObj, { spaces: '\t' })
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
  readJSONFile,
  changeNextPointer,
}
