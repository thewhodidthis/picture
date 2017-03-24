const test = require('tape');
const Picture = require('../');

// Add favicon
const linkTag = document.createElement('link');

linkTag.rel = 'shortcut icon';
linkTag.href = 'data:;base64,iVBORw0KGgo=';

document.head.appendChild(linkTag);

test('will default', (t) => {
  const picture = Picture();

  t.equals(picture.canvas.width, 0);
  t.equals(picture.canvas.height, 0);
  t.end();
});

