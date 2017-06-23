## Picture
> Helps setup canvas drawings

### Setup
```sh
npm install thewhodidthis/picture
```

### Usage
```sh
# Symlink freshly built standalone module into example folder
# Start a php server on port 8000
npm run example

# Open using default browser
open http://localhost:8000
```

### Example
```js
// Download and process random image
import { createPicture as Picture } from '@thewhodidthis/picture';

const w = 640;
const h = 360;

const buffer = Picture(w, h);
const master = Picture(w, h);

const output = Object.assign({
  filter() {
    const output = this.context.getImageData(0, 0, w, h);
    const outputData = output.data;
    const outputSize = output.data.length;

    // Colorize
    for (let i = 0; i < outputSize; i += 4) {
      outputData[i+1] = outputData[i];
    }

    this.context.putImageData(output, 0, 0);

    return this;
  },
}, buffer);

const sprite = document.createElement('img');

sprite.addEventListener('load', () => {
  output.source(sprite).filter().target(master);

  master.canvas.toBlob((blob) => {
    window.location.href = window.URL.createObjectURL(blob);
  });
});

// Replace sprite url
sprite.setAttribute('crossOrigin', 'anonymous');
sprite.setAttribute('src', `//source.unsplash.com/random/${w}x${h}`);
```
