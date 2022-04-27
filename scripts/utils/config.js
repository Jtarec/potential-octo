const path = require('path')

const BasePath = path.resolve(__dirname, '../../')
const TemplateDir = `${BasePath}/template`
const SrcDir = `${BasePath}/handwritten`
const RewriteTarget = 'create_funcName'
const ReWriteReg = new RegExp(`(${RewriteTarget})+`, 'g')
const TemplateFiles = ['/index.ts', '/index.spec.ts']
const cacheFileName = 'cache.json'


module.exports = {
  BasePath,
  TemplateDir,
  SrcDir,
  RewriteTarget,
  ReWriteReg,
  TemplateFiles,
  cacheFileName
}