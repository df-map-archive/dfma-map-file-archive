const fs = require('fs')
const NL = '\n'

const lineReExp = /<LocalFile>[A-z\d\\:-]*((\d{4}-\d{2})\\.*)<\/LocalFile>/

const lines = fs.readFileSync('FileZilla.xml', 'utf8')
  .split(NL)
  .filter(n => lineReExp.test(n))
  .map(n => {
    return n.match(lineReExp)[1].replace('\\', '/')
  })

fs.writeFileSync('./failed-transfers.json', JSON.stringify(lines, null, 2), 'utf8')

console.log('Failed Transfers:', NL, ' ' + lines.join(NL + '  '))
