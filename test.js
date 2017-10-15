import 'cutaway'
import { stat, veto } from 'tapeless'
import { from as pictureFrom, createPicture } from './index.es'

const is = veto((a, b) => a === b, 'equals')
const isNot = veto((a, b) => a !== b, 'equals not')

const canvas = document.createElement('canvas')

const p1 = createPicture(20)
const p2 = createPicture()

is(p1.canvas.height, 20, 'is equal', 'will default')
is(p2.canvas.height, 0, 'is equal')

const p3 = pictureFrom(canvas)

is(p3.canvas.width + p3.canvas.height, 450, 'will transfer dimensions')

const p4 = pictureFrom(p2.canvas)

is(p2.context, p4.context, 'is equal', 'will adjust context')

p4.canvas = canvas

isNot(p2.context, p4.context, 'is not equal')
is(p4.context, canvas.getContext('2d'), 'is equal')

stat()
