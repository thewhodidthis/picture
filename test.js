const test = require('tape')
const kpow = require('kpow')
const picture = require('./')

const Picture = picture.createPicture

kpow()

test('will default', (t) => {
  const p1 = Picture(20)
  const p2 = Picture()

  t.equals(p1.canvas.height, 20)
  t.equals(p2.canvas.height, 0)
  t.end()
})

test('will transfer dimensions', (t) => {
  const canvas = document.createElement('canvas')
  const p3 = picture.from(canvas)

  t.equals(p3.canvas.width + p3.canvas.height, 450)
  t.end()
})

test('will adjust context', (t) => {
  const canvas = document.createElement('canvas')
  const p4 = Picture()
  const p5 = picture.from(p4.canvas)

  t.is(p4.context, p5.context)

  p5.canvas = canvas

  t.isNot(p4.context, p5.context)
  t.is(p5.context, canvas.getContext('2d'))
  t.end()
})
