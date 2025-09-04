## about

Helps place images on canvas.

## setup

Load via script tag:

```html
<!-- Just an IIFE namespaced `picture` -->
<script src="https://thewhodidthis.github.io/picture/picture.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "@thewhodidthis/picture": "https://thewhodidthis.github.io/picture/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
npm install thewhodidthis/picture
```

## usage

Import the factory function, give it a width and height, get a `CanvasRenderingContext2D` containing object in return. For example,

```js
// Download and process a random image.
import { createPicture } from "@thewhodidthis/picture"

const w = 640
const h = 360

const buffer = createPicture(w, h)
const master = createPicture(w, h)

const output = Object.assign({
  filter() {
    const result = this.context.getImageData(0, 0, w, h)
    const resultData = result.data
    const resultSize = result.data.length

    // Colorize.
    for (let i = 0; i < resultSize; i += 4) {
      resultData[i + 1] = resultData[i]
    }

    this.context.putImageData(result, 0, 0)

    return this
  },
}, buffer)

const sprite = document.createElement("img")

sprite.addEventListener("load", () => {
  output.source(sprite).filter().target(master)

  master.canvas.toBlob((blob) => {
    window.location.href = window.URL.createObjectURL(blob)
  })
})

// Replace sprite url.
sprite.setAttribute("crossOrigin", "anonymous")
sprite.setAttribute("src", `//source.unsplash.com/random/${w}x${h}`)
```

## see also

- [@thewhodidthis/sound](https://github.com/thewhodidthis/sound/)
- [@thewhodidthis/glx](https://github.com/thewhodidthis/glx/)
