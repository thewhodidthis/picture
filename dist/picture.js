var Picture = (function () {
  'use strict';

  // # Picture
  // Super minimal canvas helpers

  // `CanvasRenderingContext2D.drawImage` wrapper
  var paste = function paste(source, target, sourceX, sourceY, targetX, targetY) {
    // Decide whether source/target objects are canvas elements or context-like
    var s = source.canvas || source;
    var t = target.canvas || target;
    var context = t.getContext('2d');

    // Avoid default params for now
    var sx = sourceX || 0;
    var sy = sourceY || 0;
    var tx = targetX || 0;
    var ty = targetY || 0;

    // Apparently no transpile penalties over here
    var w = s.width - sx,
        h = s.height - sy;

    // Wipe out

    context.clearRect(tx, ty, w, h);

    // Draw
    context.drawImage(s, sx, sy, w, h, tx, ty, w, h);
  };

  // My factory
  var Picture = function Picture(width, h) {
    // Create and resize offscreen canvas, square up if height missing
    var context = Object.assign(document.createElement('canvas'), {
      width: width,
      height: h || width
    }).getContext('2d');

    // Bundle
    return {
      context: context,
      canvas: context.canvas,

      // In
      source: function source(_source, x, y) {
        paste(_source, context, x, y);

        return this;
      },


      // Out
      target: function target(_target, x, y) {
        paste(context, _target, 0, 0, x, y);

        return this;
      }
    };
  };

  return Picture;

}());
//# sourceMappingURL=picture.js.map
