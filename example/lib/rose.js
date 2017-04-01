import Picture from '../../index.es';

const Rose = (size, r) => {
  const picture = Picture(size);
  const context = picture.context;
  const connect = p => context.lineTo(p.x, p.y);

  const colors = ['#000'];
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
      if (context.fillStyle !== colors[0]) {
        colors.push(context.fillStyle);
      }

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

