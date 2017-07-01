const test = require('tape');
const picture = require('../');

const Picture = picture.createPicture;

test('will default', (t) => {
  const p1 = Picture(20);
  const p2 = Picture();

  t.equals(p1.canvas.height, 20);
  t.equals(p2.canvas.height, 0);
  t.end();
});

test('will transfer dimensions', (t) => {
  const myCanvas = document.createElement('canvas');
  const p3 = picture.from(myCanvas);

  t.equals(p3.canvas.width + p3.canvas.height, 450);
  t.end();
});

test('will adjust context', (t) => {
  const myContext = document.createElement('canvas').getContext('2d');
  const p4 = Picture();
  const p5 = picture.from(p4.canvas);

  t.is(p4.context, p5.context);

  p5.canvas = myContext.canvas;

  t.isNot(p4.context, p5.context);
  t.is(p5.context, myContext);
  t.end();
});

