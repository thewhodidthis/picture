'use strict';

function Picture(width, height) {
  this.options = Object.create(Picture.defaults);
  this.context = document.createElement('canvas').getContext('2d');

  this.context.canvas.width = width || this.options.width;
  this.context.canvas.height = height || this.options.height;
}

Picture.prototype = {
  constructor: Picture,

  _copy: function(source, target, sx, sy, dx, dy, w, h) {
    if (source instanceof Picture) {
      source = source.context.canvas;
    }

    if (target instanceof Picture) {
      target = target.context.canvas;
    }

    var sx = sx || 0;
    var sy = sy || 0;
    var dx = dx || 0;
    var dy = dy || 0;

    var w = w || source.width;
    var h = h || source.height;

    w = w - sx;
    h = h - sy;

    target.getContext('2d').drawImage(source, sx, sy, w, h, dx, dy, w, h);

    return this;
  },

  source: function(target, x, y) {
    this._copy(target, this, x, y, 0, 0);

    return this;
  },

  target: function(target, x, y) {
    this._copy(this, target, 0, 0, x, y);

    return this;
  }
};

Picture.defaults = {
  width: 500,
  height: 300
};

module.exports = Picture;
