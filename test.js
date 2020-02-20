import 'cutaway'
import { report, assert } from 'tapeless'
import { from as pictureFrom, createPicture } from './index.mjs'

const { ok, equal, notEqual } = assert

const canvas = document.createElement('canvas')

const p1 = createPicture()
const p2 = createPicture(1)

ok
  .test(p1)
  .describe(null, 'will default')
  .test(p2)

equal
  .describe('is equal')
  .test(p1.canvas.height, 0)
  .describe('is equal')
  .test(p2.canvas.height, 1)

const p3 = pictureFrom(canvas)
const { width, height } = p3.canvas

equal
  .describe('will transfer dimensions')
  .test(width + height, 450)

const p4 = pictureFrom(p2.canvas)

equal
  .describe('is equal')
  .test(p2.context, p4.context)

p4.canvas = canvas

notEqual
  .describe('is not equal')
  .test(p2.context, p4.context)

equal
  .describe('is equal', 'will adjust context')
  .test(p4.context, canvas.getContext('2d'))

report()
