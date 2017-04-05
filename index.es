// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
const paste = (source, target, sourceX, sourceY, targetX, targetY) => {
  // Decide whether source/target objects are canvas elements or context-like
  const s = source.canvas || source;
  const t = target.canvas || target;
  const context = t.getContext('2d');

  // Avoid default params for now
  const sx = sourceX || 0;
  const sy = sourceY || 0;
  const tx = targetX || 0;
  const ty = targetY || 0;

  // Apparently no transpile penalties over here
  const [w, h] = [s.width - sx, s.height - sy];

  // Wipe out
  context.clearRect(tx, ty, w, h);

  // Draw
  context.drawImage(s, sx, sy, w, h, tx, ty, w, h);
};

// My factory
const Picture = (width, h) => {
  // Create and resize offscreen canvas, square up if height missing
  const context = Object.assign(document.createElement('canvas'), {
    width,
    height: h || width,
  }).getContext('2d');

  // Bundle
  return {
    context,
    canvas: context.canvas,

    // In
    source(source, x, y) {
      paste(source, context, x, y);

      return this;
    },

    // Out
    target(target, x, y) {
      paste(context, target, 0, 0, x, y);

      return this;
    },
  };
};

export default Picture;

