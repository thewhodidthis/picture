var Picture = (function () {
  'use strict';

  // # Picture
  // 2d canvas context helpers

  // `CanvasRenderingContext2D.drawImage` wrapper
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

    context.clearRect(tx, ty, w, h);

    // Draw
    context.drawImage(s, sx, sy, w, h, tx, ty, w, h);
  };

  // My factory
  var Picture = function Picture(width, h) {
    // Create and resize offscreen canvas
    // Attempt at "squaring off" if height argument missing
    var canvas = Object.assign(document.createElement('canvas'), { width: width, height: h || width });

    // Bundle methods, options, and defaults
    return {
      canvas: canvas,
      context: canvas.getContext('2d'),

      // In
      source: function source(_source, x, y) {
        paste(_source, canvas, x, y);

        return this;
      },


      // Out
      target: function target(_target, x, y) {
        paste(canvas, _target, 0, 0, x, y);

        return this;
      }
    };
  };

  return Picture;

}());
//# sourceMappingURL=picture.js.map
