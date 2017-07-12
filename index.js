'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
var picture = function (s, d, sX, sY, dX, dY) {
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
  var ref = [source.width - sx, source.height - sy];
  var w = ref[0];
  var h = ref[1];

  // Choose destination
  var context = target.context || target.getContext('2d');

  // Wipe out
  context.clearRect(dx, dy, w, h);

  // And draw
  context.drawImage(source, sx, sy, w, h, dx, dy, w, h);
};

// No type cheching of course
var from = function (canvas) { return ({
  get context() {
    return this.canvas.getContext('2d')
  },
  canvas: canvas,
  source: function source(copy, x, y) {
    picture(copy, this.context, x, y);

    return this
  },
  target: function target(copy, x, y) {
    picture(this.context, copy, 0, 0, x, y);

    return this
  }
}); };

var createPicture = function (w, h) {
  // Create and resize offscreen `canvas`, square up if height missing
  var canvas = document.createElement('canvas');
  var sample = Object.assign(canvas, { width: w, height: h || w });

  return from(sample)
};

exports.picture = picture;
exports.from = from;
exports.createPicture = createPicture;

