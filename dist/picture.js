(function (exports) {
'use strict';

// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
function picture(s, d, sX, sY, dX, dY) {
  // Decide whether source/target objects are canvas elements or
  // context-like by checking for the canvas property
  var source = s.canvas || s;
  var target = d.canvas || d;

  // Avoid default params for now
  var sx = sX || 0;
  var sy = sY || 0;
  var dx = dX || 0;
  var dy = dY || 0;

  // Apparently no transpiler penalties over here
  var w = source.width - sx,
      h = source.height - sy;

  // Choose destination

  var context = target.context || target.getContext('2d');

  // Wipe out
  context.clearRect(dx, dy, w, h);

  // And draw
  context.drawImage(source, sx, sy, w, h, dx, dy, w, h);
}

// No type cheching of course
var from = function from(canvas) {
  return {
    canvas: canvas,
    context: canvas.getContext('2d'),
    source: function source(copy, x, y) {
      picture(copy, this.context, x, y);

      return this;
    },
    target: function target(copy, x, y) {
      picture(this.context, copy, 0, 0, x, y);

      return this;
    }
  };
};

var createPicture = function createPicture(w, h) {
  // Create and resize offscreen `canvas`, square up if height missing
  var sample = document.createElement('canvas');
  var canvas = Object.assign(sample, { width: w, height: h || w });

  return from(canvas);
};

exports.picture = picture;
exports.from = from;
exports.createPicture = createPicture;

}((this.picture = this.picture || {})));
//# sourceMappingURL=picture.js.map
