// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
const render = (what, onto, sourceX, sourceY, targetX, targetY) => {
  // Decide whether source/target objects are canvas elements or
  // context-like by checking for the canvas property
  const src = (what.canvas || what);
  const ctx = (onto.canvas || onto).getContext('2d');

  // Avoid default params for now
  const sx = sourceX || 0;
  const sy = sourceY || 0;
  const tx = targetX || 0;
  const ty = targetY || 0;

  // Apparently no transpile type penalties over here
  const [w, h] = [src.width - sx, src.height - sy];

  // Wipe out
  ctx.clearRect(tx, ty, w, h);

  // Draw
  ctx.drawImage(src, sx, sy, w, h, tx, ty, w, h);
};

// Because calling directly is faster than `bind`, `apply`, or `call`
// https://jsperf.com/function-calls-direct-vs-apply-vs-call-vs-bind/60
function source(what, x, y) {
  render(what, this.context, x, y);

  return this;
}

function target(onto, x, y) {
  render(this.context, onto, 0, 0, x, y);

  return this;
}

// Bundle up
export const createPicture = (width, h) => {
  // Create and resize offscreen `canvas`, square up if height missing
  const size = { width, height: h || width };
  const canvas = Object.assign(document.createElement('canvas'), size);

  return { canvas, source, target, context: canvas.getContext('2d') };
};

// Based on existing `canvas`
export const from = canvas => Object.assign(createPicture(), { canvas });

