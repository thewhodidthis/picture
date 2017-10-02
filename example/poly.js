import { createPicture } from '../index.es'

const TAU = Math.PI * 2

export const createPoly = (size, n) => {
  const center = size * 0.5

  // So I can use with `Array.map()` straight away
  const points = Array.from({ length: n || 5 }).map((point, i) => {
    // https://en.wikipedia.org/wiki/Regular_polygon
    const a = (i * TAU) / n
    const x = center * Math.cos(a)
    const y = center * Math.sin(a)

    return { x, y }
  })

  return points
}

export const createRose = (size) => {
  const pict = createPicture(size)
  const half = size * 0.5

  const withRose = {
    render(layers, colors, rot) {
      const ctx = this.context

      ctx.save()
      ctx.translate(half, half)

      layers.forEach((points, i) => {
        ctx.rotate(rot)
        ctx.beginPath()

        points.forEach((p) => {
          ctx.lineTo(p.x, p.y)
        })

        ctx.closePath()
        ctx.stroke()

        ctx.fillStyle = colors[i % colors.length]
        ctx.fill()
      })

      ctx.restore()

      return this
    }
  }

  return Object.assign(pict, withRose)
}

export const createStar = (size, n, m = 2) => {
  // This is only accurate for the sizes I'm interested in right here
  const isDegenerate = n % m === 0

  const points = createPoly(size, n)
  const output = Array.from({ length: n * m }).map((v, i) => {
    const j = i * m
    const k = isDegenerate ? ((j + j) % m) / m : 0
    const x = (k + j) % n

    return points[x]
  })

  return output
}
