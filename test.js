import cutaway from 'cutaway'

cutaway()

import { from as pictureFrom, createPicture } from './index.es'
import { veto } from 'tapeless'

const is = veto((a, b) => a === b, 'equals')
const isNot = veto((a, b) => a !== b, 'equals not')

const canvas = document.createElement('canvas')

const p1 = createPicture(20)
const p2 = createPicture()

is(p1.canvas.height, 20, 'is equal', 'will default')
is(p2.canvas.height, 0, 'is equal')

const p3 = pictureFrom(canvas)

is(p3.canvas.width + p3.canvas.height, 450, 'will transfer dimensions')

const p4 = createPicture()
const p5 = pictureFrom(p4.canvas)

is(p4.context, p5.context, 'is equal', 'will adjust context')

p5.canvas = canvas

isNot(p4.context, p5.context, 'is not equal')
is(p5.context, canvas.getContext('2d'), 'is equal')
