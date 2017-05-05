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

  // Apparently no transpile type penalties over here
  const [w, h] = [src.width - sx, src.height - sy];

  // Wipe out
  ctx.clearRect(tx, ty, w, h);

  // Draw
  ctx.drawImage(src, sx, sy, w, h, tx, ty, w, h);
}

// Bundle up
export const createPicture = (w, h) => {
  // Create and resize offscreen `canvas`, square up if height missing
  const size = { width: w, height: h || w };
  const context = Object.assign(document.createElement('canvas'), size).getContext('2d');

  return {
    context,
    canvas: context.canvas,
    source(picture, x, y) {
      render(picture, context, x, y);

      return this;
    },
    target(picture, x, y) {
      render(context, picture, 0, 0, x, y);

      return this;
    },
  };
};

// Based on existing `canvas`
export const from = canvas => Object.assign(createPicture(), { canvas });

