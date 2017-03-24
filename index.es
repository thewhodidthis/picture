// # Picture
// 2d canvas context helpers

const merge = Object.assign;

const canvas = document.createElement('canvas');
const render = (source, target, sx, sy, tx, ty) => {
  const s = source.canvas || source;
  const t = target.canvas || target;

  const w = s.width - (sx || 0);
  const h = s.height - (sy || 0);

  t.getContext('2d').drawImage(s, sx, sy, w, h, tx || 0, ty || 0, w, h);
};

// Bundle methods, options, and defaults
const Picture = (width, height) => {
  const context = merge(canvas, { width, height }).getContext('2d');

  return merge({
    source(s, x, y) {
      render(s, context, x, y);

      return this;
    },
    target(t, x, y) {
      render(context, t, 0, 0, x, y);

      return this;
    },
  }, { context, canvas: context.canvas });
};

export default Picture;

