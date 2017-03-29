'use strict';

// # Picture
// 2d canvas context helpers

// Uglification friendly shorthand
var merge = Object.assign;

// ```CanvasRenderingContext2D.drawImage``` wrapper
var paste = function paste(source, target, sourceX, sourceY, targetX, targetY) {
  // Assume the source/target object is a canvas rendering context or a picture
  // Otherwise assume the source/target object is a canvas element
  var s = source.canvas || source;
  var t = target.canvas || target;
  var context = t.getContext('2d');

  // Avoid default params for now
  var sx = sourceX || 0;
  var sy = sourceY || 0;
  var tx = targetX || 0;
  var ty = targetY || 0;

  // Apparently no penalties over here
  var w = s.width - sx,
      h = s.height - sy;

  // Wipe

  context.clearRect(0, 0, w, h);

  // Draw
  context.drawImage(s, sx, sy, w, h, tx, ty, w, h);
};

// Offscreen canvas wrapper
var createPicture = function createPicture(width, height) {
  // Create and resize in parallel
  // Attempt at "squaring off" if height argument missing
  var canvas = merge(document.createElement('canvas'), { width: width, height: height || width });

  return {
    canvas: canvas,
    context: canvas.getContext('2d')
  };
};

// My factory
var Picture = function Picture(width, height) {
  // Canvas and context references tucked inside of here
  var picture = createPicture(width, height);

  // Bundle methods, options, and defaults
  return merge({
    // In
    source: function source(_source, x, y) {
      paste(_source, picture, x, y);

      return this;
    },


    // Out
    target: function target(_target, x, y) {
      paste(picture, _target, 0, 0, x, y);

      return this;
    }
  }, picture);
};

module.exports = Picture;
