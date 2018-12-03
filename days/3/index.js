import readline from 'readline'
import fs from 'fs'
import path from 'path'
import { createCanvas } from 'canvas'
import { orderBy } from 'lodash'

console.log('----- DAY 3 -----')

const parser = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/
const claims = []

readline.createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'input'))
}).on('line', line => {
  const match = line.match(parser)
  if (!match) {
    return
  }

  claims.push({
    id: parseInt(match[1], 10),
    offsetX: parseInt(match[2]),
    offsetY: parseInt(match[3]),
    width: parseInt(match[4]),
    height: parseInt(match[5])
  })
}).on('close', () => {
  let substrateHeight = 0
  let substrateWidth = 0

  for (const claim of claims) {
    if (claim.offsetX + claim.width > substrateWidth) {
      substrateWidth = claim.offsetX + claim.width
    }

    if (claim.offsetY + claim.height > substrateHeight) {
      substrateHeight = claim.offsetY + claim.height
    }
  }

  const sortedX = orderBy(claims, 'offsetX')
  const sortedY = orderBy(claims, 'offsetY')
  console.log(sortedX)
  console.log(sortedY)

  console.log(substrateWidth, substrateHeight)

  const canvas = createCanvas(substrateWidth, substrateHeight)
  const ctx = canvas.getContext('2d')

  ctx.strokeStyle = 'red'
  for (const claim of claims) {
    ctx.fillRect(claim.offsetX, claim.offsetY, claim.width, claim.height)
  }

  const out = fs.createWriteStream(path.resolve(__dirname, 'viz.png'))
  const stream = canvas.createPNGStream()
  out.on('finish', () => console.log('The PNG file was created.'))
  stream.pipe(out)
})
