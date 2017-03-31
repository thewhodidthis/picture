// # Picture
// 2d canvas context helpers

// `CanvasRenderingContext2D.drawImage` wrapper
const paste = (source, target, sourceX, sourceY, targetX, targetY) => {
  // Assume the source/target object is a canvas rendering context or a picture
  // Otherwise assume the source/target object is a canvas element
  const s = source.canvas || source;
  const t = target.canvas || target;
  const context = t.getContext('2d');

  // Avoid default params for now
  const sx = sourceX || 0;
  const sy = sourceY || 0;
  const tx = targetX || 0;
  const ty = targetY || 0;

  // Apparently no penalties over here
  const [w, h] = [s.width - sx, s.height - sy];

  // Wipe
  context.clearRect(tx, ty, w, h);

  // Draw
  context.drawImage(s, sx, sy, w, h, tx, ty, w, h);
};

// My factory
const Picture = (width, h) => {
  // Create and resize offscreen canvas
  // Attempt at "squaring off" if height argument missing
  const canvas = Object.assign(document.createElement('canvas'), { width, height: h || width });

  // Bundle methods, options, and defaults
  return {
    canvas,
    context: canvas.getContext('2d'),

    // In
    source(source, x, y) {
      paste(source, canvas, x, y);

      return this;
    },

    // Out
    target(target, x, y) {
      paste(canvas, target, 0, 0, x, y);

      return this;
    },
  };
};

export default Picture;

