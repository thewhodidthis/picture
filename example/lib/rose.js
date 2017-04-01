import Picture from '../../index.es';

let colors = [];

const Rose = (size, r) => {
  const picture = Picture(size);
  const context = picture.context;
  const connect = p => context.lineTo(p.x, p.y);

  const center = size * 0.5;
  const render = (details, i) => {
    context.rotate(r);
    context.beginPath();

    // The points
    details.forEach(connect);

    context.closePath();
    context.stroke();

    context.fillStyle = colors[i % colors.length];
    context.fill();
  };

  const output = {
    render(details) {
      colors = ['#000', context.fillStyle];

      context.save();
      context.translate(center, center);

      // The shapes
      details.forEach(render);

      context.restore();

      return this;
    },
  };

  return Object.assign(picture, output);
};

export default Rose;

