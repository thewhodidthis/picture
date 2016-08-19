'use strict';

function Picture(w, h) {
  this.context = document.createElement('canvas').getContext('2d');

  this.context.canvas.width = w || Picture.defaults.w;
  this.context.canvas.height = h || Picture.defaults.h;
}

Picture.prototype = {
  constructor: Picture,

  _copy: function(source, target, sx, sy, dx, dy, w, h) {
    var sx = sx || 0;
    var sy = sy || 0;
    var dx = dx || 0;
    var dy = dy || 0;
    var w = w || source.width;
    var h = h || source.height;

    target.getContext('2d').drawImage(source, sx, sy, w - sx, h - sy, dx, dy, w - sx, h - sy);

    return this;
  },

  source: function(target, x, y) {
    if (target instanceof Picture) {
      target = target.context.canvas;
    }

    this._copy(target, this.context.canvas, x, y, 0, 0);

    return this;
  },

  target: function(target, x, y) {
    if (target instanceof Picture) {
      target = target.context.canvas;
    }

    this._copy(this.context.canvas, target, 0, 0, x, y);

    return this;
  }
};

Picture.defaults = {
  w: 500,
  h: 300
};

module.exports = Picture;
