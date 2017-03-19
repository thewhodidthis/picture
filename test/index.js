const test = require('tape');
const Picture = require('../');

// Add favicon
const linkTag = document.createElement('link');

linkTag.rel = 'shortcut icon';
linkTag.href = 'data:;base64,iVBORw0KGgo=';

document.head.appendChild(linkTag);

test('will default', (t) => {
  const picture = Picture();

  t.equals(picture.width, 500);
  t.equals(picture.height, 300);
  t.end();
});

