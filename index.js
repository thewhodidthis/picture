'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

  // Apparently no transpile type penalties over here
  var w = src.width - sx,
      h = src.height - sy;

  // Wipe out

  ctx.clearRect(tx, ty, w, h);

  // Draw
  ctx.drawImage(src, sx, sy, w, h, tx, ty, w, h);
}

// Bundle up
var createPicture = function createPicture(w, h) {
  // Create and resize offscreen `canvas`, square up if height missing
  var size = { width: w, height: h || w };
  var context = Object.assign(document.createElement('canvas'), size).getContext('2d');

  return {
    context: context,
    canvas: context.canvas,
    source: function source(picture, x, y) {
      render(picture, context, x, y);

      return this;
    },
    target: function target(picture, x, y) {
      render(context, picture, 0, 0, x, y);

      return this;
    }
  };
};

// Based on existing `canvas`
var from = function from(canvas) {
  return Object.assign(createPicture(), { canvas: canvas });
};

exports.createPicture = createPicture;
exports.from = from;
