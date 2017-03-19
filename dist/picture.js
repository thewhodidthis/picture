var Picture = (function () {
  'use strict';

  // # Picture
  // 2d canvas context helpers
  // Avoiding default params for now, because dist file size

  // Will handle canvas tags straight up or as properties of
  var copy = function copy(source, target, sourceX, sourceY, tx, ty, width, height) {
    var sx = sourceX || 0;
    var sy = sourceY || 0;

    var s = source.canvas || source;
    var t = target.canvas || target;

    var w = (width || source.width) - sx;
    var h = (height || source.height) - sy;

    t.getContext('2d').drawImage(s, sx, sy, w, h, tx || 0, ty || 0, w, h);
  };

  // Bundle methods and data
  var Picture = function Picture(w, h, c) {
    var width = w || 500;
    var height = h || 300;
    var canvas = c || document.createElement('canvas');

    return {
      width: width,
      height: height,

      // Resize the canvas
      canvas: Object.assign(canvas, { width: width, height: height }),

      // Bare basics
      context: canvas.getContext('2d'),
      source: function source(_source, x, y) {
        copy(_source, canvas, x, y);

        return this;
      },
      target: function target(_target, x, y) {
        copy(canvas, _target, 0, 0, x, y);

        return this;
      }
    };
  };

  return Picture;

}());
//# sourceMappingURL=picture.js.map
