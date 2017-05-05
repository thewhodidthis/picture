// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
function render(source, target, sourceX, sourceY, targetX, targetY) {
  // Decide whether source/target objects are canvas elements or
  // context-like by checking for the canvas property
  const src = source.canvas || source;
  const ctx = (target.canvas || target).getContext('2d');

  // Avoid default params for now
  const sx = sourceX || 0;
  const sy = sourceY || 0;
  const tx = targetX || 0;
  const ty = targetY || 0;

  // Apparently no transpile step penalties over here
  const [w, h] = [src.width - sx, src.height - sy];

  // Wipe out
  ctx.clearRect(tx, ty, w, h);

  // Draw
  ctx.drawImage(src, sx, sy, w, h, tx, ty, w, h);
}

// Picture template
export const Picture2d = {
  set canvas(canvas) {
    this.context = canvas.getContext('2d');
  },
  get canvas() {
    return this.context.canvas;
  },
  source(s, x, y) {
    render(s, this.context, x, y);

    return this;
  },
  target(t, x, y) {
    render(this.context, t, 0, 0, x, y);

    return this;
  },
};

// Based on existing `canvas`
export const from = canvas => Object.assign(Object.create(Picture2d), { canvas });

// Create and resize offscreen `canvas`, square up if height missing
export const createPicture = (w, h) => {
  const canvasRect = { width: w, height: h || w };
  const canvas = Object.assign(document.createElement('canvas'), canvasRect);

  return from(canvas);
};

