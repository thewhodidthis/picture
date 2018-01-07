import { createPicture, from as pictureFrom } from '../index.es'

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const TAU = Math.PI * 2

const createPoly = (size, n) => {
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

const createRose = (size) => {
  const source = createPicture(size)
  const center = size * 0.5

  const withRose = {
    render(layers, colors, corner) {
      const target = this.context

      target.save()
      target.translate(center, center)

      layers.forEach((points, i) => {
        target.rotate(corner)
        target.beginPath()

        points.forEach((p) => {
          target.lineTo(p.x, p.y)
        })

        target.closePath()

        target.strokeStyle = 'transparent'
        target.stroke()

        target.fillStyle = colors[i % colors.length]
        target.fill()
      })

      target.restore()

      return this
    }
  }

  return Object.assign(source, withRose)
}

const canvas = document.querySelector('canvas')
const master = pictureFrom(canvas)
const height = canvas.height

const getR = (i, s, p) => s - ((p * i) + i)

const size = 180
const data = [4, 3, 5]

const colors = ['#000', '#fff']
const shapes = data.map(n => Array.from({ length: 22 })
  .map((v, i) => createPoly(getR(i, 130, 5), n)))

const render = (t) => {
  const r = 0.0005 * t

  shapes.forEach((layers, i) => {
    const rose = createRose(size)
    const a = i ? r + i : -r
    const x = i * size
    const y = (height - size) * 0.5

    rose.render(layers, colors, a).target(master, x, y)
  })

  window.requestAnimationFrame(render)
}

window.addEventListener('load', () => {
  window.requestAnimationFrame(render)
})
