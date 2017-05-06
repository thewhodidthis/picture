(function () {
'use strict';

// # Picture
// Super minimal canvas helpers

// `CanvasRenderingContext2D.drawImage` wrapper
function picture(s, d, sX, sY, dX, dY) {
  // Decide whether source/target objects are canvas elements or
  // context-like by checking for the canvas property
  const source = s.canvas || s;
  const target = d.canvas || d;

  // Avoid default params for now
  const sx = sX || 0;
  const sy = sY || 0;
  const dx = dX || 0;
  const dy = dY || 0;

  // Apparently no transpiler penalties over here
  const [w, h] = [source.width - sx, source.height - sy];

  // Choose destination
  const context = target.context || target.getContext('2d');

  // Wipe out
  context.clearRect(dx, dy, w, h);

  // And draw
  context.drawImage(source, sx, sy, w, h, dx, dy, w, h);
}

// No type cheching of course
const from = canvas => ({
  canvas,
  context: canvas.getContext('2d'),
  source(copy, x, y) {
    picture(copy, this.context, x, y);

    return this;
  },
  target(copy, x, y) {
    picture(this.context, copy, 0, 0, x, y);

    return this;
  },
});

const createPicture = (w, h) => {
  // Create and resize offscreen `canvas`, square up if height missing
  const sample = document.createElement('canvas');
  const canvas = Object.assign(sample, { width: w, height: h || w });

  return from(canvas);
};

const Loop = (callback) => {
  let frameId;

  const play = fn => window.requestAnimationFrame(fn);
  const stop = () => window.cancelAnimationFrame(frameId);
  const loop = () => {
    callback(frameId);

    if (frameId) {
      frameId = play(loop);
    }
  };

  // On/Off
  return () => {
    frameId = (frameId === undefined) ? play(loop) : stop();
  };
};

const TAU = Math.PI * 2;

const Poly = (size, n) => {
  const center = size * 0.5;

  // So I can use with `Array.map()` straight away
  const points = Array.from({ length: n || 5 }).map((point, i) => {
    // https://en.wikipedia.org/wiki/Regular_polygon
    const a = (i * TAU) / n;
    const x = center * Math.cos(a);
    const y = center * Math.sin(a);

    return { x, y };
  });

  return points;
};

const Rose = (size) => {
  const pict = createPicture(size);
  const half = size * 0.5;
  const withRose = {
    render(layers, colors, rot) {
      this.context.save();
      this.context.translate(half, half);

      layers.forEach((points, i) => {
        this.context.rotate(rot);
        this.context.beginPath();

        points.forEach((p) => {
          this.context.lineTo(p.x, p.y);
        });

        this.context.closePath();
        this.context.stroke();

        this.context.fillStyle = colors[i % colors.length];
        this.context.fill();
      });

      this.context.restore();

      return this;
    },
  };

  return Object.assign(pict, withRose);
};

const Star = (size, n, m = 2) => {
  // This is only accurate for the sizes I'm interested in right here
  const isDegenerate = n % m === 0;

  const points = Poly(size, n);
  const output = Array.from({ length: n * m }).map((v, i) => {
    const j = i * m;
    const k = isDegenerate ? (j + j % m) / m : 0;
    const x = (k + j) % n;

    return points[x];
  });

  return output;
};

const master = from(document.getElementById('canvas'));

const getR = (i, s, p) => s - ((p * i) + i);

const size = 250;
const data = [7, 5];

const colors = ['#000'];
const layers = Array.from({ length: 21 });
const shapes = data.map((n, j) => layers.map((v, i) => Star(getR(i, 200, 7), n)));
const toggle = Loop((frame) => {
  const r = 0.0025 * frame;

  shapes.forEach((layers, i) => {
    const rose = Rose(size);
    const a = i ? r + i : -r;
    const x = i * size;
    const y = (300 - size) * 0.5;

    rose.context.strokeStyle = '#fff';
    rose.render(layers, colors, a).target(master, x, y);
  });
});

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

document.addEventListener('click', toggle);
window.addEventListener('load', toggle);

}());
