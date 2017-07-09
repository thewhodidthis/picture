const TAU = Math.PI * 2
const Poly = (size, n) => {
  const center = size * 0.5

  // So I can use with `Array.map()` straight away
  const points = Array.from({ length: n || 5 }).map((point, i) => {
    // https://en.wikipedia.org/wiki/Regular_polygon
    const a = (i * TAU) / n
    const x = center * Math.cos(a)
    const y = center * Math.sin(a)

    return { x, y }
  })

  return points
}

export default Poly
