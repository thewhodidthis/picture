'use strict';

var html = document.documentElement;
var canvas = document.getElementById('canvas');
var sprite = document.createElement('img');

var w = 800;
var h = 600;
var x = (canvas.width - w) * 0.5;
var y = (canvas.height - h) * 0.5;
var count = 0;

var keyout = {
  filter: function() {
    var w = this.width;
    var h = this.height;

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
};

var master = Picture(w, h);
var output = Object.assign(master, keyout);

var draw = function() {
  master.source(sprite).target(canvas, x, y);
};

var pimp = function() {
  output.filter().target(canvas, x, y);
}

if (window !== window.top) {
  html.className = html.className + ' is-iframe';
}

sprite.addEventListener('load', draw, false);
sprite.setAttribute('src', 'sprite.jpg');

canvas.addEventListener('click', function _onClick(e) {
  e.preventDefault();

  if (count % 2 === 0) {
    pimp();
  } else {
    draw();
  }

  count += 1;
}, false)

