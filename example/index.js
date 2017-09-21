(function () {
'use strict';

// # Picture
// Super minimal canvas helpers

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

// No type cheching of course
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

var createPicture = function (w, h) {
  // Create and resize offscreen `canvas`, square up if height missing
  var canvas = document.createElement('canvas');
  var sample = Object.assign(canvas, { width: w, height: h || w });

  return from(sample)
};

var Loop = function (callback) {
  var frameId;

  var play = function (fn) { return window.requestAnimationFrame(fn); };
  var stop = function () { return window.cancelAnimationFrame(frameId); };
  var loop = function () {
    callback(frameId);

    if (frameId) {
      frameId = play(loop);
    }
  };

  // On/Off
  return function () {
    frameId = (frameId === undefined) ? play(loop) : stop();
  }
};

var TAU = Math.PI * 2;

var Poly = function (size, n) {
  var center = size * 0.5;

  // So I can use with `Array.map()` straight away
  var points = Array.from({ length: n || 5 }).map(function (point, i) {
    // https://en.wikipedia.org/wiki/Regular_polygon
    var a = (i * TAU) / n;
    var x = center * Math.cos(a);
    var y = center * Math.sin(a);

    return { x: x, y: y }
  });

  return points
};

var Rose = function (size) {
  var pict = createPicture(size);
  var half = size * 0.5;

  var withRose = {
    render: function render(layers, colors, rot) {
      var ctx = this.context;

      ctx.save();
      ctx.translate(half, half);

      layers.forEach(function (points, i) {
        ctx.rotate(rot);
        ctx.beginPath();

        points.forEach(function (p) {
          ctx.lineTo(p.x, p.y);
        });

        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
      });

      ctx.restore();

      return this
    }
  };

  return Object.assign(pict, withRose)
};

var canvas = document.querySelector('canvas');
var master = from(canvas);
var height = canvas.height;

var getR = function (i, s, p) { return s - ((p * i) + i); };

var size = 165;
var data = [4, 3, 5];

var colors = ['#000', '#fff'];
var shapes = data.map(function (n) { return Array.from({ length: 22 }).map(function (v, i) { return Poly(getR(i, 130, 5), n); }); });
var render = Loop(function (frame) {
  var r = 0.008 * frame;

  shapes.forEach(function (layers, i) {
    var rose = Rose(size);
    var a = i ? r + i : -r;
    var x = i * size;
    var y = (height - size) * 0.5;

    rose.context.strokeStyle = 'transparent';
    rose.render(layers, colors, a).target(master, x, y);
  });
});

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

window.addEventListener('load', render);

}());

