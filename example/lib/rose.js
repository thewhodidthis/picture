import { createPicture as Picture } from '../../index.es'

const Rose = (size) => {
  const pict = Picture(size)
  const half = size * 0.5
  const withRose = {
    render (layers, colors, rot) {
      const context = this.context

      context.save()
      context.translate(half, half)

      layers.forEach((points, i) => {
        context.rotate(rot)
        context.beginPath()

        points.forEach((p) => {
          context.lineTo(p.x, p.y)
        })

        context.closePath()
        context.stroke()

        context.fillStyle = colors[i % colors.length]
        context.fill()
      })

      context.restore()

      return this
    }
  }

  return Object.assign(pict, withRose)
}

export default Rose
