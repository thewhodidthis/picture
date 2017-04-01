(function () {
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

var Poly = function Poly(size) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

  var center = size * 0.5;

  // So I can use with `Array.map()` straight away
  var points = Array.from({ length: n }).map(function (point, i) {
    // https://en.wikipedia.org/wiki/Regular_polygon
    var a = i * TAU / n;
    var x = center * Math.cos(a);
    var y = center * Math.sin(a);

    return { x: x, y: y };
  });

  return points;
};

var Rose = function Rose(size, r) {
  var picture = Picture(size);
  var context = picture.context;
  var connect = function connect(p) {
    return context.lineTo(p.x, p.y);
  };

  var colors = ['#000'];
  var center = size * 0.5;
  var _render = function _render(details, i) {
    context.rotate(r);
    context.beginPath();

    // The points
    details.forEach(connect);

    context.closePath();
    context.stroke();

    context.fillStyle = colors[i % colors.length];
    context.fill();
  };

  var output = {
    render: function render(details) {
      if (context.fillStyle !== colors[0]) {
        colors.push(context.fillStyle);
      }

      context.save();
      context.translate(center, center);

      // The shapes
      details.forEach(_render);

      context.restore();

      return this;
    }
  };

  return Object.assign(picture, output);
};

var Star = function Star(size, n) {
  var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  // This is only accurate for the sizes I'm interested in right here
  var isDegenerate = n % m === 0;

  var points = Poly(size, n);
  var output = Array.from({ length: n * m }).map(function (v, i) {
    var j = i * m;
    var k = isDegenerate ? (j + j % m) / m : 0;
    var x = (k + j) % n;

    return points[x];
  });

  return output;
};

var canvas = document.getElementById('canvas');
var _ref = [canvas.width, canvas.height];
var w = _ref[0];
var h = _ref[1];

var master = Picture(w, h);

var size = 250;
var seed = [7, 5];
var getR = function getR(i) {
  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
  return s - (p * i + i);
};

var layers = Array.from({ length: 21 });
var shapes = seed.map(function (n, j) {
  return layers.map(function (v, i) {
    return Star(getR(i), n);
  });
});
var toggle = Loop(function (frame) {
  var r = 0.0025 * frame;

  shapes.map(function (shape, i) {
    return Rose(size, i % 2 ? r + i * 0.5 : -r);
  }).forEach(function (rose, i) {
    var p = shapes[i];
    var x = i * size;
    var y = (300 - size) * 0.5;

    rose.context.strokeStyle = '#fff';
    rose.render(p).target(master, x, y);
  });
});

canvas.parentNode.replaceChild(master.canvas, canvas);

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

document.addEventListener('click', toggle);
window.addEventListener('load', toggle);

}());
