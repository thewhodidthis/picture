const test = require('tape');
const picture = require('../');

const Picture = picture.createPicture;

// Add favicon
const linkTag = document.createElement('link');

linkTag.rel = 'shortcut icon';
linkTag.href = 'data:;base64,iVBORw0KGgo=';

document.head.appendChild(linkTag);

test('will default', (t) => {
  const p1 = Picture(20);
  const p2 = Picture();

  t.equals(p1.canvas.height, 20);
  t.equals(p2.canvas.height, 0);
  t.end();
});

test('will merge', (t) => {
  const myCanvas = document.createElement('canvas');
  const p3 = picture.from(myCanvas);

  t.equals(p3.canvas.width, 300);
  t.equals(p3.canvas.height, 150);
  t.end();
});

