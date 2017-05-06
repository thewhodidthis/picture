// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
export function picture(s, d, sX, sY, dX, dY) {
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
}

// No type cheching of course
export const from = canvas => ({
  canvas,
  context: canvas.getContext('2d'),
  source(copy, x, y) {
    picture(copy, this.context, x, y);

    return this;
  },
  target(copy, x, y) {
    picture(this.context, copy, 0, 0, x, y);

    return this;
  },
});

export const createPicture = (w, h) => {
  // Create and resize offscreen `canvas`, square up if height missing
  const sample = document.createElement('canvas');
  const canvas = Object.assign(sample, { width: w, height: h || w });

  return from(canvas);
};

