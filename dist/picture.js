var Picture = (function () {
  'use strict';

  // # Picture
  // 2d canvas context helpers

  var merge = Object.assign;

  var canvas = document.createElement('canvas');
  var render = function render(source, target, sx, sy, tx, ty) {
    var s = source.canvas || source;
    var t = target.canvas || target;

    var w = s.width - (sx || 0);
    var h = s.height - (sy || 0);

    t.getContext('2d').drawImage(s, sx, sy, w, h, tx || 0, ty || 0, w, h);
  };

  // Bundle methods, options, and defaults
  var Picture = function Picture(width, height) {
    var context = merge(canvas, { width: width, height: height }).getContext('2d');

    return merge({
      source: function source(s, x, y) {
        render(s, context, x, y);

        return this;
      },
      target: function target(t, x, y) {
        render(context, t, 0, 0, x, y);

        return this;
      }
    }, { context: context, canvas: context.canvas });
  };

  return Picture;

}());
//# sourceMappingURL=picture.js.map
