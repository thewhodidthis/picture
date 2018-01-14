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

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

var TAU = Math.PI * 2;

// https://en.wikipedia.org/wiki/Regular_polygon
var createPoly = function (radius, edges) { return Array.from({ length: edges }).map(function (v, i) {
  var a = (i * TAU) / edges;
  var x = radius * Math.cos(a);
  var y = radius * Math.sin(a);

  return { x: x, y: y }
}); };

var createRose = function (spread, colors) {
  var source = createPicture(spread);
  var middle = spread * 0.5;

  var withRose = {
    render: function render(parts, angle) {
      var target = this.context;

      target.save();
      target.translate(middle, middle);

      parts.forEach(function (points, i) {
        target.rotate(angle);
        target.beginPath();

        points.forEach(function (p) {
          target.lineTo(p.x, p.y);
        });

        target.closePath();

        target.strokeStyle = 'transparent';
        target.stroke();

        target.fillStyle = colors[i % colors.length];
        target.fill();
      });

      target.restore();

      return this
    }
  };

  return Object.assign(source, withRose)
};

var canvas = document.querySelector('canvas');
var output = from(canvas);

var spread = 180;
var colors = ['#000', '#fff'];

var middle = function (x) { return x * 0.5; };

var radius = function (v, i) { return middle(150 - ((3 * i) + i)); };
var shapes = [4, 3, 5].map(function (n) { return Array.from({ length: 30 }).map(radius).map(function (v) { return createPoly(v, n); }); });

var margin = [canvas.width - (shapes.length * spread), canvas.height - spread].map(middle);

var render = function (t) {
  var r = 0.0005 * t;

  shapes.forEach(function (data, i) {
    var rose = createRose(spread, colors);
    var a = i % 2 ? r + i : -r;
    var x = i * spread;

    rose.render(data, a).target(output, margin[0] + x, margin[1]);
  });

  window.requestAnimationFrame(render);
};

window.addEventListener('load', function () {
  window.requestAnimationFrame(render);
});

}());

