import Poly from './poly.js';

const Star = (size, n, m = 2) => {
  // This is only accurate for the sizes I'm interested in right here
  const isDegenerate = n % m === 0;

  const points = Poly(size, n);
  const output = Array.from({ length: n * m }).map((v, i) => {
    const j = i * m;
    const k = isDegenerate ? (j + j % m) / m : 0;
    const x = (k + j) % n;

    return points[x];
  });

  return output;
};

export default Star;
