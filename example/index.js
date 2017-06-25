(function () {
'use strict';

// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
function picture(s, d, sX, sY, dX, dY) {
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
  var w = source.width - sx,
      h = source.height - sy;

  // Choose destination

  var context = target.context || target.getContext('2d');

  // Wipe out
  context.clearRect(dx, dy, w, h);

  // And draw
  context.drawImage(source, sx, sy, w, h, dx, dy, w, h);
}

// No type cheching of course
var from = function from(canvas) {
  return {
    canvas: canvas,
    context: canvas.getContext('2d'),
    source: function source(copy, x, y) {
      picture(copy, this.context, x, y);

      return this;
    },
    target: function target(copy, x, y) {
      picture(this.context, copy, 0, 0, x, y);

      return this;
    }
  };
};

var createPicture = function createPicture(w, h) {
  // Create and resize offscreen `canvas`, square up if height missing
  var sample = document.createElement('canvas');
  var canvas = Object.assign(sample, { width: w, height: h || w });

  return from(canvas);
};

var Loop = function Loop(callback) {
  var frameId = void 0;

  var play = function play(fn) {
    return window.requestAnimationFrame(fn);
  };
  var stop = function stop() {
    return window.cancelAnimationFrame(frameId);
  };
  var loop = function loop() {
    callback(frameId);

    if (frameId) {
      frameId = play(loop);
    }
  };

  // On/Off
  return function () {
    frameId = frameId === undefined ? play(loop) : stop();
  };
};

var TAU = Math.PI * 2;
var Poly = function Poly(size, n) {
  var center = size * 0.5;

  // So I can use with `Array.map()` straight away
  var points = Array.from({ length: n || 5 }).map(function (point, i) {
    // https://en.wikipedia.org/wiki/Regular_polygon
    var a = i * TAU / n;
    var x = center * Math.cos(a);
    var y = center * Math.sin(a);

    return { x: x, y: y };
  });

  return points;
};

var Rose = function Rose(size) {
  var pict = createPicture(size);
  var half = size * 0.5;
  var withRose = {
    render: function render(layers, colors, rot) {
      var _this = this;

      this.context.save();
      this.context.translate(half, half);

      layers.forEach(function (points, i) {
        _this.context.rotate(rot);
        _this.context.beginPath();

        points.forEach(function (p) {
          _this.context.lineTo(p.x, p.y);
        });

        _this.context.closePath();
        _this.context.stroke();

        _this.context.fillStyle = colors[i % colors.length];
        _this.context.fill();
      });

      this.context.restore();

      return this;
    }
  };

  return Object.assign(pict, withRose);
};

var canvas = document.querySelector('canvas');
var master = from(canvas);

var getR = function getR(i, s, p) {
  return s - (p * i + i);
};

var size = 180;
var data = [4, 3, 5];

var colors = ['#000', '#fff'];
var shapes = data.map(function (n) {
  return Array.from({ length: 22 }).map(function (v, i) {
    return Poly(getR(i, 130, 5), n);
  });
});

var toggle = Loop(function (frame) {
  var r = 0.008 * frame;

  shapes.forEach(function (layers, i) {
    var rose = Rose(size);
    var a = i ? r + i : -r;
    var x = i * size;
    var y = (360 - size) * 0.5;

    rose.context.strokeStyle = 'transparent';
    rose.render(layers, colors, a).target(master, x, y);
  });
});

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

document.addEventListener('click', toggle);
window.addEventListener('load', toggle);

}());
