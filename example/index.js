'use strict';

const TAU = Math.PI * 2;

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

const Poly = (size, n = 5) => {
  const center = size * 0.5;

  // So I can use with `Array.map()` straight away
  const points = Array.from({ length: n }).map((point, i) => {
    // https://en.wikipedia.org/wiki/Regular_polygon
    const a = (i * TAU) / n;
    const x = center * Math.cos(a);
    const y = center * Math.sin(a);

    return { x, y };
  });

  return points;
};

const Node = (size, r) => {
  const picture = Picture(size);
  const context = picture.context;
  const connect = p => context.lineTo(p.x, p.y);

  const center = size * 0.5;
  const render = (details, i) => {
    context.rotate(r);
    context.beginPath();

    // The points
    details.forEach(connect);

    context.closePath();

    context.fillStyle = i % 2 ? '#fff' : '#000';
    context.fill();
  };

  const output = {
    render(details) {
      context.save();
      context.translate(center, center);

      // The shapes
      details.forEach(render);

      context.restore();

      return this;
    },
  };

  return Object.assign(picture, output);
};

const canvas = document.getElementById('canvas');
const [w, h] = [canvas.width, canvas.height];
const master = Picture(w, h);

const size = 160;
const grid = w / size;
const seed = [5, 4, 7, 8, 3, 6];
const getR = (i, s = 90, p = 5) => s - ((p * i) + i);

const layers = Array.from({ length: 18 });
const shapes = seed.map((n, j) => layers.map((v, i) => Poly(getR(i), n)));
const update = Loop((frame) => {
  const r = 0.01 * frame;

  // Tiles
  shapes.map((shape, i) => Node(size, i % 2 ? r + (i * 0.5) : -r)).forEach((node, i) => {
    const p = shapes[i];
    const x = (i % grid);
    const y = (i - x) / grid;

    node.render(p).target(master, size * x, size * y);
  });
});

canvas.parentNode.replaceChild(master.canvas, canvas);

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

document.addEventListener('click', update);
window.addEventListener('load', update);

