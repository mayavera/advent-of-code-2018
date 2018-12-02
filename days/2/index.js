import readline from 'readline'
import fs from 'fs'
import path from 'path'

console.log('----- DAY 2 -----')

let numDoubles = 0
let numTriples = 0
let ids = []

readline.createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'input'))
}).on('line', line => {
  const counts = {}

  line.split('').forEach(c => {
    counts[c] = (counts[c] || 0) + 1
  })

  let hasDouble = false
  let hasTriple = false

  Object.entries(counts).forEach(([_, count]) => {
    if (count === 2) {
      hasDouble = true
    } else if (count === 3) {
      hasTriple = true
    }
  })

  if (hasDouble) {
    numDoubles++
  }

  if (hasTriple) {
    numTriples++
  }

  ids.push(line)
}).on('close', () => {
  console.log(`checksum: ${numDoubles * numTriples}`)

  let first, second

  ids = ids.sort((a, b) => a.localeCompare(b))

  for (const id of ids) {
    if (!first) {
      first = id
      continue
    }

    if (first.length !== id.length) {
      continue
    }

    let numDifferentChars = 0
    first.split('').forEach((c, i) => {
      if (id[i] !== c) {
        numDifferentChars++
      }
    })

    if (numDifferentChars === 1) {
      second = id
      break
    } else {
      first = id
    }
  }

  const sharedChars = []
  first.split('').forEach((c, i) => {
    if (second[i] === c) {
      sharedChars.push(c)
    }
  })

  console.log(`shared characters of similar ids: ${sharedChars.join('')}`)
})
