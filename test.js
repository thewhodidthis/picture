import 'cutaway'
import { report, assert } from 'tapeless'
import { from as pictureFrom, createPicture } from './index.es'

const { ok, equal, notEqual } = assert

const canvas = document.createElement('canvas')

const p1 = createPicture()
const p2 = createPicture(1)

ok(p1, null, 'will default')
ok(p2)

equal(p1.canvas.height, 0, 'is equal')
equal(p2.canvas.height, 1, 'is equal')

const p3 = pictureFrom(canvas)
const { width, height } = p3.canvas

equal(width + height, 450, 'will transfer dimensions')

const p4 = pictureFrom(p2.canvas)

equal(p2.context, p4.context, 'is equal', 'will adjust context')

p4.canvas = canvas

notEqual(p2.context, p4.context, 'is not equal')
equal(p4.context, canvas.getContext('2d'), 'is equal')

report()
