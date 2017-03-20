// # Picture
// 2d canvas context helpers
// Avoiding default params for now, because dist file size

// Will handle canvas tags straight up or as properties of
const copy = (source, target, sourceX, sourceY, tx, ty, width, height) => {
  const sx = sourceX || 0;
  const sy = sourceY || 0;

  const s = source.canvas || source;
  const t = target.canvas || target;

  const w = (width || source.width) - sx;
  const h = (height || source.height) - sy;

  t.getContext('2d').drawImage(s, sx, sy, w, h, tx || 0, ty || 0, w, h);
};

// Bundle methods, options, and defaults
const Picture = (w, h, c) => {
  const width = w || 500;
  const height = h || 300;
  const canvas = c || document.createElement('canvas');

  return {
    width,
    height,

    // Resize the canvas
    canvas: Object.assign(canvas, { width, height }),

    // Bare basics
    context: canvas.getContext('2d'),
    source(source, x, y) {
      copy(source, canvas, x, y);

      return this;
    },
    target(target, x, y) {
      copy(canvas, target, 0, 0, x, y);

      return this;
    },
  };
};

export default Picture;

