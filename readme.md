## about

Canvas drawing helpers.

## setup

Fetch latest from GitHub directly:

```sh
# Includes ESM and CJS versions
npm install thewhodidthis/picture
```

## usage

Import the factory function, give it a width and height, get a `CanvasRenderingContext2D` containing object in return. For example,

```js
// Download and process random image
import { createPicture } from '@thewhodidthis/picture'

const w = 640
const h = 360

const buffer = createPicture(w, h)
const master = createPicture(w, h)

const output = Object.assign({
  filter() {
    const result = this.context.getImageData(0, 0, w, h)
    const resultData = result.data
    const resultSize = result.data.length

    // Colorize
    for (let i = 0; i < resultSize; i += 4) {
      resultData[i + 1] = resultData[i]
    }

    this.context.putImageData(result, 0, 0)

    return this
  }
}, buffer)

const sprite = document.createElement('img')

sprite.addEventListener('load', () => {
  output.source(sprite).filter().target(master)

  master.canvas.toBlob((blob) => {
    window.location.href = window.URL.createObjectURL(blob)
  })
})

// Replace sprite url
sprite.setAttribute('crossOrigin', 'anonymous')
sprite.setAttribute('src', `//source.unsplash.com/random/${w}x${h}`)
```
