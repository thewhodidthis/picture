'use strict'

const test = require('tape')
const kpow = require('cutaway')
const { from: pictureFrom, createPicture } = require('./')

kpow()

test('will default', (t) => {
  const p1 = createPicture(20)
  const p2 = createPicture()

  t.equals(p1.canvas.height, 20)
  t.equals(p2.canvas.height, 0)
  t.end()
})

test('will transfer dimensions', (t) => {
  const canvas = document.createElement('canvas')
  const p3 = pictureFrom(canvas)

  t.equals(p3.canvas.width + p3.canvas.height, 450)
  t.end()
})

test('will adjust context', (t) => {
  const canvas = document.createElement('canvas')
  const p4 = createPicture()
  const p5 = pictureFrom(p4.canvas)

  t.is(p4.context, p5.context)

  p5.canvas = canvas

  t.isNot(p4.context, p5.context)
  t.is(p5.context, canvas.getContext('2d'))
  t.end()
})
