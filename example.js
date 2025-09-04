import { createPicture, from } from "./main.js"

const canvas = document.querySelector("canvas")
const target = from(canvas)

const { width: w, height: h } = canvas

const source = document.createElement("img")
const buffer = createPicture(w, h)

let frame = 0
let shift = 0

const period = 15
const frames = 40 * w

const draw = () => {
  if (frame % period === 0) {
    buffer.source(source, shift, 0).target(target)

    shift += w
    shift %= frames
  }

  frame = window.requestAnimationFrame(draw)
}

const html = document.documentElement

if (window !== window.top) {
  html.classList.add("is-iframe")
}

html.classList.add("is-mining")

source.addEventListener("load", () => {
  html.classList.remove("is-mining")

  draw()
})

// Source video from:
// https://www.pond5.com/stock-footage/44599211
source.setAttribute("src", "clip.gif")
