import Picture from '../index.es';

import Loop from './lib/loop.js';
import Poly from './lib/poly.js';
import Rose from './lib/rose.js';

const canvas = document.getElementById('canvas');
const [w, h] = [canvas.width, canvas.height];
const master = Picture(w, h);

const grid = 3;
const size = 160;
const seed = [4, 3, 5];
const getR = (i, s = 130, p = 5) => s - ((p * i) + i);

const layers = Array.from({ length: 22 });
const shapes = seed.map((n, j) => layers.map((v, i) => Poly(getR(i), n)));
const toggle = Loop((frame) => {
  const r = 0.008 * frame;

  shapes.map((shape, i) => Rose(size, i % 2 ? r + (i * 0.5) : -r)).forEach((rose, i) => {
    const p = shapes[i];
    const x = i * size;
    const y = (300 - size) * 0.5;

    rose.context.fillStyle = '#fff';
    rose.context.strokeStyle = 'transparent';
    rose.render(p).target(master, x, y);
  });
});

canvas.parentNode.replaceChild(master.canvas, canvas);

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

document.addEventListener('click', toggle);
window.addEventListener('load', toggle);

