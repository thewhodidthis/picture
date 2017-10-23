> Canvas drawing helpers

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/picture
```

### Usage
```js
// Download and process random image
import { createPicture } from '@thewhodidthis/picture'

const w = 640
const h = 360

const buffer = createPicture(w, h)
const master = createPicture(w, h)

const output = Object.assign({
  filter() {
    const output = this.context.getImageData(0, 0, w, h)
    const outputData = output.data
    const outputSize = output.data.length

    // Colorize
    for (let i = 0; i < outputSize; i += 4) {
      outputData[i+1] = outputData[i]
    }

    this.context.putImageData(output, 0, 0)

    return this
  },
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
