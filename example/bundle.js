(function () {
  'use strict';

  // # Picture
  // Canvas drawing helpers

  // `CanvasRenderingContext2D.drawImage` wrapper
  const picture = (s, d, sX, sY, dX, dY) => {
    // Decide whether source/target objects are canvas elements or
    // context-like by checking for the canvas property
    const source = s.canvas || s;
    const target = d.canvas || d;

    // Avoid default params for now
    const sx = sX || 0;
    const sy = sY || 0;
    const dx = dX || 0;
    const dy = dY || 0;

    // Apparently no transpiler penalties over here
    const [w, h] = [source.width - sx, source.height - sy];

    // Choose destination
    const context = target.context || target.getContext('2d');

    // Wipe out
    context.clearRect(dx, dy, w, h);

    // And draw
    context.drawImage(source, sx, sy, w, h, dx, dy, w, h);
  };

  const from = canvas => ({
    get context() {
      return this.canvas.getContext('2d')
    },
    canvas,
    source(copy, x, y) {
      picture(copy, this.context, x, y);

      return this
    },
    target(copy, x, y) {
      picture(this.context, copy, 0, 0, x, y);

      return this
    }
  });

  const createPicture = (width, height = width) => {
    // Setup and resize offscreen `canvas`
    const canvas = document.createElement('canvas');
    const sample = Object.assign(canvas, { width, height });

    return from(sample)
  };

  const canvas = document.querySelector('canvas');
  const target = from(canvas);

  const { width: w, height: h } = canvas;

  const source = document.createElement('img');
  const buffer = createPicture(w, h);

  let frame = 0;
  let shift = 0;

  const period = 15;
  const frames = 40 * w;

  const draw = () => {
    if (frame % period === 0) {
      buffer.source(source, shift, 0).target(target);

      shift += w;
      shift %= frames;
    }

    frame = window.requestAnimationFrame(draw);
  };

  const html = document.documentElement;

  if (window !== window.top) {
    html.classList.add('is-iframe');
  }

  html.classList.add('is-mining');

  source.addEventListener('load', () => {
    html.classList.remove('is-mining');

    draw();
  });

  // Source video from
  // https://www.pond5.com/stock-footage/44599211
  source.setAttribute('src', 'clip.gif');

}());
