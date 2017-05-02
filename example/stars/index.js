import { from as Picture } from '../../index.es';

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

const master = Picture(document.getElementById('canvas'));

const getR = (i, s, p) => s - ((p * i) + i);

const grid = 2;
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

canvas.parentNode.replaceChild(master.canvas, canvas);

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

document.addEventListener('click', toggle);
window.addEventListener('load', toggle);

