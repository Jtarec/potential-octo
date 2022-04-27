const { execSync } = require("child_process")
const { log } = require('../utils/log.js')

function Octal2Chinese(str) {
  const matches = str.match(/(\\\d{3}){3}/g);
  if (matches) matches.forEach(match => {
    let encoded = '';
    const splits = match.split('\\');
    splits.forEach(code => !code || (encoded += '%' + parseInt(code, 8).toString(16)));
    const cChar = decodeURI(encoded);
    str = str.replace(match, cChar);
  });
  return str;
}

function getDirName(str) {
  const handLen = 'handwritten/'.length
  const left = str.indexOf('handwritten/')
  const right = str.lastIndexOf('/')
  return str.slice(left + handLen, right)
}

// 清除终端其他信息
process.stdout.write(process.platform === 'win32' ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H")

const files = execSync("git status -s").toString().split("\n").filter(item => item.indexOf('handwritten') !== -1).map(item => getDirName(Octal2Chinese(item)))

if (files.length === 0) {
  log(`Sorry, no file changed.`, 'warning')
  return
}

const ming = `npm run test:all -- ${files.join(' ')}`

log(`Running jest changed task for ${files.join(',')}.`)

execSync(ming)

log(`Finsh jest changed task.`, 'success')