(function () {
'use strict';

// # Picture
// 2d canvas context helpers

// `CanvasRenderingContext2D.drawImage` wrapper
const paste = (source, target, sourceX, sourceY, targetX, targetY) => {
  // Decide whether source/target objects are canvas elements or context-like
  const s = source.canvas || source;
  const t = target.canvas || target;
  const context = t.getContext('2d');

  // Avoid default params for now
  const sx = sourceX || 0;
  const sy = sourceY || 0;
  const tx = targetX || 0;
  const ty = targetY || 0;

  // Apparently no transpile penalties over here
  const [w, h] = [s.width - sx, s.height - sy];

  // Wipe
  context.clearRect(tx, ty, w, h);

  // Draw
  context.drawImage(s, sx, sy, w, h, tx, ty, w, h);
};

// My factory
const Picture = (width, h) => {
  // Create and resize offscreen canvas
  // Attempt at "squaring off" if height argument missing
  const canvas = Object.assign(document.createElement('canvas'), { width, height: h || width });

  // Bundle
  return {
    canvas,
    context: canvas.getContext('2d'),

    // In
    source(source, x, y) {
      paste(source, canvas, x, y);

      return this;
    },

    // Out
    target(target, x, y) {
      paste(canvas, target, 0, 0, x, y);

      return this;
    },
  };
};

const Loop = (callback) => {
  let frameId;

  const play = fn => window.requestAnimationFrame(fn);
  const stop = () => window.cancelAnimationFrame(frameId);
  const loop = () => {
    callback(frameId);

    if (frameId) {
      frameId = play(loop);
    }
  };

  // On/Off
  return () => {
    frameId = (frameId === undefined) ? play(loop) : stop();
  };
};

const TAU = Math.PI * 2;

const Poly = (size, n) => {
  const center = size * 0.5;

  // So I can use with `Array.map()` straight away
  const points = Array.from({ length: n || 5 }).map((point, i) => {
    // https://en.wikipedia.org/wiki/Regular_polygon
    const a = (i * TAU) / n;
    const x = center * Math.cos(a);
    const y = center * Math.sin(a);

    return { x, y };
  });

  return points;
};

const Rose = (size) => {
  const picture = Picture(size);
  const center = size * 0.5;
  const rose = {
    render(layers, colors, rot) {
      this.context.save();
      this.context.translate(center, center);

      layers.forEach((points, i) => {
        this.context.rotate(rot);
        this.context.beginPath();

        points.forEach((p) => {
          this.context.lineTo(p.x, p.y);
        });

        this.context.closePath();
        this.context.stroke();

        this.context.fillStyle = colors[i % colors.length];
        this.context.fill();
      });

      this.context.restore();

      return this;
    },
  };

  return Object.assign(picture, rose);
};

const canvas = document.getElementById('canvas');
const master = Picture(canvas.width, canvas.height);

const getR = (i, s, p) => s - ((p * i) + i);

const size = 160;
const data = [4, 3, 5];

const colors = ['#000', '#fff'];
const layers = Array.from({ length: 22 });
const shapes = data.map((n, j) => layers.map((v, i) => Poly(getR(i, 130, 5), n)));
const toggle = Loop((frame) => {
  const r = 0.008 * frame;

  shapes.forEach((layers, i) => {
    // Make a picture for each shape
    const rose = Rose(size);

    // Position within master canvas
    const x = i * size;
    const y = (300 - size) * 0.5;

    // Calculate base angle for each shape
    const a = i % 2 ? r + (i * 0.5) : -r;

    // No stroke
    rose.context.strokeStyle = 'transparent';

    // Cache shape, paste onto master
    rose.render(layers, colors, a).target(master, x, y);
  });
});

canvas.parentNode.replaceChild(master.canvas, canvas);

if (window !== window.top) {
  document.documentElement.className = 'is-iframe';
}

document.addEventListener('click', toggle);
window.addEventListener('load', toggle);

}());
