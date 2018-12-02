import readline from 'readline'
import fs from 'fs'
import path from 'path'

console.log('----- DAY 2 -----')

readline.createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'input'))
}).on('line', line => {
  console.log(line)
}).on('close', () => {
  console.log('done')
})
