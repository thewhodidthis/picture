import { from as pictureFrom } from '../index.es'
import { createPoly, createRose } from './poly.js'

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe')
}

const canvas = document.querySelector('canvas')
const master = pictureFrom(canvas)
const height = canvas.height

const getR = (i, s, p) => s - ((p * i) + i)

const size = 165
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

    rose.context.strokeStyle = 'transparent'
    rose.render(layers, colors, a).target(master, x, y)
  })

  window.requestAnimationFrame(render)
}

window.addEventListener('load', () => {
  window.requestAnimationFrame(render)
})
