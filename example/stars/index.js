import Picture from '../../index.es';

import Loop from '../lib/loop.js';
import Poly from '../lib/poly.js';
import Rose from '../lib/rose.js';

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

const canvas = document.getElementById('canvas');
const [w, h] = [canvas.width, canvas.height];
const master = Picture(w, h);

const grid = 2;
const size = 250;
const seed = [7, 5];
const getR = (i, s = 200, p = 7) => s - ((p * i) + i);

const layers = Array.from({ length: 21 });
const shapes = seed.map((n, j) => layers.map((v, i) => Star(getR(i), n)));
const toggle = Loop((frame) => {
  const r = 0.0025 * frame;

  shapes.map((shape, i) => Rose(size, i % 2 ? r + (i * 0.5) : -r)).forEach((rose, i) => {
    const p = shapes[i];
    const x = i * size;
    const y = (300 - size) * 0.5;

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

