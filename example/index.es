import { createPicture, from as pictureFrom } from '../index.es'

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const TAU = Math.PI * 2

// https://en.wikipedia.org/wiki/Regular_polygon
const createPoly = (radius, edges) => Array.from({ length: edges }).map((v, i) => {
  const a = (i * TAU) / edges
  const x = radius * Math.cos(a)
  const y = radius * Math.sin(a)

  return { x, y }
})

const createRose = (spread, colors) => {
  const source = createPicture(spread)
  const middle = spread * 0.5

  const withRose = {
    render(parts, angle) {
      const target = this.context

      target.save()
      target.translate(middle, middle)

      parts.forEach((points, i) => {
        target.rotate(angle)
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
const output = pictureFrom(canvas)

const spread = 180
const colors = ['#fff', '#000']

const middle = x => x * 0.5

const radius = (v, i) => middle(150 - ((9 * i) + i))
const shapes = [4, 3, 5].map(n => Array.from({ length: 15 }).map(radius).map(v => createPoly(v, n)))

const margin = [canvas.width - (shapes.length * spread), canvas.height - spread].map(middle)

const render = (t) => {
  const r = 0.0005 * t

  shapes.forEach((data, i) => {
    const rose = createRose(spread, colors)
    const a = i % 2 ? r + i : -r
    const x = i * spread

    rose.render(data, a).target(output, margin[0] + x, margin[1])
  })

  window.requestAnimationFrame(render)
}

window.addEventListener('load', () => {
  window.requestAnimationFrame(render)
})
