import { createPicture as Picture } from '../../index.es'

const Rose = (size) => {
  const pict = Picture(size)
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

export default Rose
