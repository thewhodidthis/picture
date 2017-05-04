import { createPicture as Picture, from as pictureFrom } from '../index.es';

import Loop from './lib/loop.js';
import Poly from './lib/poly.js';
import Rose from './lib/rose.js';

const canvas = document.getElementById('canvas');
const master = pictureFrom(canvas);

const getR = (i, s, p) => s - ((p * i) + i);

const grid = 3;
const size = 160;
const data = [4, 3, 5];

const colors = ['#000', '#fff'];
const layers = Array.from({ length: 22 });
const shapes = data.map((n, j) => layers.map((v, i) => Poly(getR(i, 130, 5), n)));
const toggle = Loop((frame) => {
  const r = 0.008 * frame;

  shapes.forEach((layers, i) => {
    // Make a picture for each shape
    const rose = Rose(size);

    // Position within master canvas
    const x = i * size;
    const y = (300 - size) * 0.5;

    // Calculate base angle for each shape
    const a = i % 2 ? r + (i * 0.5) : -r;

    // No stroke
    rose.context.strokeStyle = 'transparent';

    // Cache shape, paste onto master
    rose.render(layers, colors, a).target(master, x, y);
  });
});

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

document.addEventListener('click', toggle);
window.addEventListener('load', toggle);

