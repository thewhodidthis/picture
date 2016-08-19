'use strict';

var Picture = window.picture;

var html = document.documentElement;
var canvas = document.getElementById('canvas');
var filter = document.getElementById('filter');
var sprite = document.createElement('img');

var w = 800;
var h = 600;

var picture = new Picture(w, h);

var diff = {
  x: (canvas.width - w) * 0.5,
  y: (canvas.height - h) * 0.5
};

html.className = 'html';

if (window !== window.top) {
  html.classList.add('is-iframe');
}

sprite.src = '/sprite.jpg';

sprite.addEventListener('load', function _onLoad(e) {
  picture.source(sprite).target(canvas, diff.x, diff.y);

  picture.filter = function() {
    var w = this.context.canvas.width;
    var h = this.context.canvas.height;

    var output = this.context.getImageData(0, 0, w, h);
    var outputData = output.data;

    for (var i = 0, stop = outputData.length; i < stop; i += 4) {
      var r = outputData[i];
      var g = outputData[i+1];
      var b = outputData[i+2];
      var a = outputData[i+3];

      outputData[i+2] = outputData[i];
      outputData[i+3] = (outputData[i+2] == 255) ? 0 : a;
    }

    this.context.putImageData(output, 0, 0);

    return this;
  }

  picture.filter().target(filter, diff.x, diff.y);
}, false);
