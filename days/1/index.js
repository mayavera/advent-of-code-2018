import readline from 'readline'
import fs from 'fs'
import path from 'path'

(async () => {
  console.log('----- DAY 1 -----')

  let frequency = 0
  let resultingFrequency = 0
  let firstRepeatedFrequency = null
  let firstRepeatedFrequencyFound = false
  const foundFrequencies = new Set()

  for (let i = 0; !firstRepeatedFrequencyFound; i++) {
    await new Promise(resolve => {
      readline.createInterface({
        input: fs.createReadStream(path.resolve(__dirname, 'input'))
      }).on('line', line => {
        const direction = line.charAt(0)
        const amount = parseInt(line.substr(1), 10)

        switch (direction) {
          case '+':
            frequency += amount
            break
          case '-':
            frequency -= amount
            break
        }

        if (!firstRepeatedFrequencyFound) {
          if (foundFrequencies.has(frequency)) {
            firstRepeatedFrequencyFound = true
            firstRepeatedFrequency = frequency
          } else {
            foundFrequencies.add(frequency)
          }
        }
      }).on('close', () => {
        if (i === 0) {
          resultingFrequency = frequency
        }
        resolve()
      })
    })
  }

  console.log(`final frequency: ${resultingFrequency}`)
  console.log(`first repeated frequency: ${firstRepeatedFrequency}`)
  console.log()
})()
