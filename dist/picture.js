(function (exports) {
'use strict';

// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
function render(source, target, sourceX, sourceY, targetX, targetY) {
  // Decide whether source/target objects are canvas elements or
  // context-like by checking for the canvas property
  var src = source.canvas || source;
  var ctx = (target.canvas || target).getContext('2d');

  // Avoid default params for now
  var sx = sourceX || 0;
  var sy = sourceY || 0;
  var tx = targetX || 0;
  var ty = targetY || 0;

  // Apparently no transpile step penalties over here
  var w = src.width - sx,
      h = src.height - sy;

  // Wipe out

  ctx.clearRect(tx, ty, w, h);

  // Draw
  ctx.drawImage(src, sx, sy, w, h, tx, ty, w, h);
}

// Picture template
var Picture2d = {
  set canvas(canvas) {
    this.context = canvas.getContext('2d');
  },
  get canvas() {
    return this.context.canvas;
  },
  source: function source(s, x, y) {
    render(s, this.context, x, y);

    return this;
  },
  target: function target(t, x, y) {
    render(this.context, t, 0, 0, x, y);

    return this;
  }
};

// Based on existing `canvas`
var from = function from(canvas) {
  return Object.assign(Object.create(Picture2d), { canvas: canvas });
};

// Create and resize offscreen `canvas`, square up if height missing
var createPicture = function createPicture(w, h) {
  var canvasRect = { width: w, height: h || w };
  var canvas = Object.assign(document.createElement('canvas'), canvasRect);

  return from(canvas);
};

exports.Picture2d = Picture2d;
exports.from = from;
exports.createPicture = createPicture;

}((this.picture = this.picture || {})));
//# sourceMappingURL=picture.js.map
