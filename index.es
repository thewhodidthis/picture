// # Picture
// Super minimal canvas helpers

const getContext = canvas => canvas.getContext('2d');

// `CanvasRenderingContext2D.drawImage` wrapper
const render = (what, onto, sourceX, sourceY, targetX, targetY) => {
  // Decide whether source/target objects are canvas elements or context-like
  const src = what.canvas || what;
  const ctx = getContext(onto.canvas || onto);

  // Avoid default params for now
  const sx = sourceX || 0;
  const sy = sourceY || 0;
  const tx = targetX || 0;
  const ty = targetY || 0;

  // Apparently no transpile penalties over here
  const [w, h] = [src.width - sx, src.height - sy];

  // Wipe out
  ctx.clearRect(tx, ty, w, h);

  // Draw
  ctx.drawImage(src, sx, sy, w, h, tx, ty, w, h);
};

// Because calling directly is faster than `bind`, `apply`, or `call`
// https://jsperf.com/function-calls-direct-vs-apply-vs-call-vs-bind/60
function source(what, x, y) {
  return render(what, this.context, x, y);
}

function target(onto, x, y) {
  return render(this.context, onto, 0, 0, x, y);
}

// My `canvas` factories
export const createPicture = (width, h) => {
  // Create and resize offscreen `canvas`, square up if height missing
  const canvas = Object.assign(document.createElement('canvas'), {
    width,
    height: h || width,
  });

  return { canvas, source, target, context: getContext(canvas) };
};

// Based on existing `canvas`
export const from = canvas => Object.assign(createPicture(), { canvas });

