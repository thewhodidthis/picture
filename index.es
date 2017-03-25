// # Picture
// 2d canvas context helpers

// Uglification friendly shorthand
const merge = Object.assign;

// ```CanvasRenderingContext2D.drawImage``` wrapper
const paste = (source, target, sourceX, sourceY, targetX, targetY) => {
  // Assume the source/target object is a canvas rendering context or a picture
  // Otherwise assume the source/target object is a canvas element
  const s = source.canvas || source;
  const t = target.canvas || target;

  // Avoid default params for now
  const sx = sourceX || 0;
  const sy = sourceY || 0;
  const tx = targetX || 0;
  const ty = targetY || 0;

  // Apparently no penalties over here
  const [w, h] = [s.width - sx, s.height - sy];

  t.getContext('2d').drawImage(s, sx, sy, w, h, tx, ty, w, h);
};

// Offscreen canvas wrapper
const createCanvas = (width, height) => {
  // Create and resize in parallel
  // Attempt at "squaring off" if height argument missing
  const canvas = merge(document.createElement('canvas'), { width, height: height || width });

  return {
    canvas,
    context: canvas.getContext('2d'),
  };
};

// My factory
const Picture = (width, height) => {
  // Canvas and context references tucked inside of here
  const canvas = createCanvas(width, height);

  // Bundle methods, options, and defaults
  return merge({
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
  }, canvas);
};

export default Picture;

