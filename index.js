'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
var render = function render(what, onto, sourceX, sourceY, targetX, targetY) {
  // Decide whether source/target objects are canvas elements or
  // context-like by checking for the canvas property
  var src = what.canvas || what;
  var ctx = (onto.canvas || onto).getContext('2d');

  // Avoid default params for now
  var sx = sourceX || 0;
  var sy = sourceY || 0;
  var tx = targetX || 0;
  var ty = targetY || 0;

  // Apparently no transpile type penalties over here
  var w = src.width - sx,
      h = src.height - sy;

  // Wipe out

  ctx.clearRect(tx, ty, w, h);

  // Draw
  ctx.drawImage(src, sx, sy, w, h, tx, ty, w, h);
};

// Because calling directly is faster than `bind`, `apply`, or `call`
// https://jsperf.com/function-calls-direct-vs-apply-vs-call-vs-bind/60
function source(what, x, y) {
  render(what, this.context, x, y);

  return this;
}

function target(onto, x, y) {
  render(this.context, onto, 0, 0, x, y);

  return this;
}

// Bundle up
var createPicture = function createPicture(width, h) {
  // Create and resize offscreen `canvas`, square up if height missing
  var canvas = Object.assign(document.createElement('canvas'), {
    width: width,
    height: h || width
  });

  return { canvas: canvas, source: source, target: target, context: canvas.getContext('2d') };
};

// Based on existing `canvas`
var from = function from(canvas) {
  return Object.assign(createPicture(), { canvas: canvas });
};

exports.createPicture = createPicture;
exports.from = from;
