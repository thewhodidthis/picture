import { createPicture as Picture } from '../../index.es';

const Rose = (size) => {
  const pict = Picture(size);
  const half = size * 0.5;
  const rose = {
    render(layers, colors, rot) {
      this.context.save();
      this.context.translate(half, half);

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

  return Object.assign(pict, rose);
};

export default Rose;

