var Picture = (function () {
  'use strict';

  // # Picture
  // 2d canvas context helpers

  // Uglification friendly shorthand
  var merge = Object.assign;

  // ```CanvasRenderingContext2D.drawImage``` wrapper
  var paste = function paste(source, target, sourceX, sourceY, targetX, targetY) {
    // Assume the source object is a canvas rendering context or a picture
    // Otherwise assume the source object is a canvas element
    var s = source.canvas || source;
    var t = target.canvas || target;

    // Avoid default params for now
    var sx = sourceX || 0;
    var sy = sourceY || 0;
    var tx = targetX || 0;
    var ty = targetY || 0;

    // Just because, no penalties here
    var w = s.width - sx,
        h = s.height - sy;


    t.getContext('2d').drawImage(s, sx, sy, w, h, tx, ty, w, h);
  };

  // Offscreen canvas wrapper
  var createCanvas = function createCanvas(width, height) {
    // Create and resize at the same time
    // Attempt at "squaring off" if height argument missing
    var canvas = merge(document.createElement('canvas'), { width: width, height: height || width });

    return {
      canvas: canvas,
      context: canvas.getContext('2d')
    };
  };

  // My factory
  // Bundle methods, options, and defaults
  var Picture = function Picture(width, height) {
    // Canvas and context references tucked inside of here
    var canvas = createCanvas(width, height);

    return merge({
      source: function source(_source, x, y) {
        paste(_source, canvas, x, y);

        return this;
      },
      target: function target(_target, x, y) {
        paste(canvas, _target, 0, 0, x, y);

        return this;
      }
    }, canvas);
  };

  return Picture;

}());
//# sourceMappingURL=picture.js.map
