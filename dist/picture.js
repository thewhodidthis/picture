var Picture = (function () {
  'use strict';

  function Picture(width, height) {
    this.options = Object.create(Picture.defaults);
    this.context = document.createElement('canvas').getContext('2d');

    this.context.canvas.width = parseInt(width, 10) || this.options.width;
    this.context.canvas.height = parseInt(height, 10) || this.options.height;
  }

  Picture.prototype = {
    constructor: Picture,

    copy: function copy(s, d, sX, sY, dX, dY, w, h) {
      var source = s;
      var target = d;

      // s: source, d: destination
      if (s instanceof Picture) {
        source = s.context.canvas;
      }

      if (d instanceof Picture) {
        target = d.context.canvas;
      }

      var sx = sX || 0;
      var sy = sY || 0;
      var dx = dX || 0;
      var dy = dY || 0;

      var width = w || source.width;
      var height = h || source.height;

      width -= sx;
      height -= sy;

      target.getContext('2d').drawImage(source, sx, sy, width, height, dx, dy, width, height);

      return this;
    },
    source: function source(canvas, x, y) {
      this.copy(canvas, this, x, y, 0, 0);

      return this;
    },
    target: function target(canvas, x, y) {
      this.copy(this, canvas, 0, 0, x, y);

      return this;
    }
  };

  Picture.defaults = {
    width: 500,
    height: 300
  };

  return Picture;

}());
//# sourceMappingURL=picture.js.map
