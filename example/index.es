import { from as pictureFrom } from '../index.es';

import Loop from './lib/loop';
import Poly from './lib/poly';
import Rose from './lib/rose';

const canvas = document.querySelector('canvas');
const master = pictureFrom(canvas);
const height = canvas.height;

const getR = (i, s, p) => s - ((p * i) + i);

const size = 165;
const data = [4, 3, 5];

const colors = ['#000', '#fff'];
const shapes = data.map(n => Array.from({ length: 22 }).map((v, i) => Poly(getR(i, 130, 5), n)));
const render = Loop((frame) => {
  const r = 0.008 * frame;

  shapes.forEach((layers, i) => {
    const rose = Rose(size);
    const a = i ? r + i : -r;
    const x = i * size;
    const y = (height - size) * 0.5;

    rose.context.strokeStyle = 'transparent';
    rose.render(layers, colors, a).target(master, x, y);
  });
});

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

window.addEventListener('load', render);

