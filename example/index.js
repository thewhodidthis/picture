(function () {
'use strict';

// # Picture
// Canvas drawing helpers

// `CanvasRenderingContext2D.drawImage` wrapper
var picture = function (s, d, sX, sY, dX, dY) {
  // Decide whether source/target objects are canvas elements or
  // context-like by checking for the canvas property
  var source = s.canvas || s;
  var target = d.canvas || d;

  // Avoid default params for now
  var sx = sX || 0;
  var sy = sY || 0;
  var dx = dX || 0;
  var dy = dY || 0;

  // Apparently no transpiler penalties over here
  var ref = [source.width - sx, source.height - sy];
  var w = ref[0];
  var h = ref[1];

  // Choose destination
  var context = target.context || target.getContext('2d');

  // Wipe out
  context.clearRect(dx, dy, w, h);

  // And draw
  context.drawImage(source, sx, sy, w, h, dx, dy, w, h);
};

var from = function (canvas) { return ({
  get context() {
    return this.canvas.getContext('2d')
  },
  canvas: canvas,
  source: function source(copy, x, y) {
    picture(copy, this.context, x, y);

    return this
  },
  target: function target(copy, x, y) {
    picture(this.context, copy, 0, 0, x, y);

    return this
  }
}); };

var createPicture = function (width, height) {
  if ( height === void 0 ) height = width;

  // Setup and resize offscreen `canvas`
  var canvas = document.createElement('canvas');
  var sample = Object.assign(canvas, { width: width, height: height });

  return from(sample)
};

var canvas = document.querySelector('canvas');
var target = from(canvas);

var w = canvas.width;
var h = canvas.height;

var source = document.createElement('img');
var buffer = createPicture(w, h);

var frame = 0;
var shift = 0;

var period = 15;
var frames = 40 * w;

var draw = function () {
  if (frame % period === 0) {
    buffer.source(source, shift, 0).target(target);

    shift += w;
    shift %= frames;
  }

  frame = window.requestAnimationFrame(draw);
};

var html = document.documentElement;

if (window !== window.top) {
  html.classList.add('is-iframe');
}

html.classList.add('is-mining');

source.addEventListener('load', function () {
  html.classList.remove('is-mining');

  draw();
});

// Source video from
// https://www.pond5.com/stock-footage/44599211
source.setAttribute('src', 'source.gif');

}());

