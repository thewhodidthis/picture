'use strict';

const TAU = Math.PI * 2;

const Loop = (callback) => {
  let frameId;

  const play = (fn) => window.requestAnimationFrame(fn);
  const stop = () => window.cancelAnimationFrame(frameId);
  const loop = t => {
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

// https://en.wikipedia.org/wiki/Regular_polygon
const Poly = (size, n = 5) => {
  const center = size * 0.5;

  // So I can use with `Array.map()` straight away
  const points = Array.from({ length: n }).map((point, i) => {
    const a = (i * TAU) / n;
    const x = center * Math.cos(a);
    const y = center * Math.sin(a);

    return { x, y };
  });

  return points;
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

const Node = (size, r) => {
  const picture = Picture(size);
  const context = picture.context;
  const connect = p => context.lineTo(p.x, p.y);

  const center = size * 0.5;

  const render = (details, i) => {
    context.rotate(r * (i + 1));
    context.beginPath();

    details.forEach(connect);

    context.closePath();
    context.stroke();
  };

  return Object.assign({
    render(details, i) {
      context.strokeStyle = '#fff';

      context.save();
      context.translate(center, center);

      details.forEach(render);

      context.restore();

      return this;
    },
  }, picture);
};

const canvas = document.getElementById('canvas');
const [w, h] = [canvas.width, canvas.height];
const master = Picture(w, h);
const center = {
  x: w * 0.5,
  y: h * 0.5,
};

const getSize = (size, n) => size * Math.cos(Math.PI / n);

// Corners
const sizes = [150, 150, 150, 150];
const polys = [7, 5, 4, 3].map((n, i) => Poly(getSize(90, n) - i * 10, n));

// Core
const stars = [9, 5].map((n, i) => Star(getSize(180 - i * 20, n), n));

const draw = (frame) => {
  const r = 0.0125 * frame;

  const roses = sizes.map(size => Node(size, r));

  roses.forEach((rose, i) => {
    const s = rose.canvas.width;
    const l = (i % 2) * (w - s);
    const t = Math.floor(i * 0.5) * (h - s);

    rose.render(polys).target(master, l, t);
  });

  const [x, y] = [center.x - (180 * 0.5), center.y - (180 * 0.5)];
  const focus = Node(180, r);

  focus.render(stars).target(master, x, y);
};

canvas.parentNode.replaceChild(master.canvas, canvas);

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

const loop = Loop(draw);

document.addEventListener('click', loop);
window.addEventListener('load', loop);

