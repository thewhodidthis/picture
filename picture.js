var picture = (function(exports) {
  "use strict"

  // # Picture
  // Canvas drawing helpers

  // A thin wrapper to mimic `CanvasRenderingContext2D.drawImage`.
  function picture(s, d, sX, sY, dX, dY) {
    // Decide whether source/target objects are canvas elements or
    // context-like by checking for the canvas property.
    const source = s.canvas || s
    const target = d.canvas || d

    // Avoid default params for now.
    const sx = sX || 0
    const sy = sY || 0
    const dx = dX || 0
    const dy = dY || 0

    // Apparently no transpiler penalties over here.
    const [w, h] = [source.width - sx, source.height - sy]

    // Choose destination.
    const context = target.context || target.getContext("2d")

    // Wipe out.
    context.clearRect(dx, dy, w, h)

    // And draw.
    context.drawImage(source, sx, sy, w, h, dx, dy, w, h)
  }

  const from = (canvas, options) => ({
    get context() {
      return this.canvas.getContext("2d", options)
    },
    canvas,
    source(copy, x, y) {
      picture(copy, this.context, x, y)

      return this
    },
    target(copy, x, y) {
      picture(this.context, copy, 0, 0, x, y)

      return this
    },
  })

  function createPicture(width, height = width, options) {
    // Set up and resize offscreen `canvas`.
    const canvas = document.createElement("canvas")
    const sample = Object.assign(canvas, { width, height })

    return from(sample, options)
  }

  exports.createPicture = createPicture
  exports.from = from
  exports.picture = picture

  return exports
})({})
