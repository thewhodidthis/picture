const Loop = (callback) => {
  let frameId

  const play = fn => window.requestAnimationFrame(fn)
  const stop = () => window.cancelAnimationFrame(frameId)
  const loop = () => {
    callback(frameId)

    if (frameId) {
      frameId = play(loop)
    }
  }

  // On/Off
  return () => {
    frameId = (frameId === undefined) ? play(loop) : stop()
  }
}

export default Loop
