(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Picture = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Picture(width, height) {
  this.options = Object.create(Picture.defaults);
  this.context = document.createElement('canvas').getContext('2d');

  this.context.canvas.width = width || this.options.width;
  this.context.canvas.height = height || this.options.height;
}

Picture.prototype = {
  constructor: Picture,

  _copy: function(source, target, sx, sy, dx, dy, w, h) {
    var sx = sx || 0;
    var sy = sy || 0;
    var dx = dx || 0;
    var dy = dy || 0;
    var w = w || source.width;
    var h = h || source.height;

    target.getContext('2d').drawImage(source, sx, sy, w - sx, h - sy, dx, dy, w - sx, h - sy);

    return this;
  },

  source: function(target, x, y) {
    if (target instanceof Picture) {
      target = target.context.canvas;
    }

    this._copy(target, this.context.canvas, x, y, 0, 0);

    return this;
  },

  target: function(target, x, y) {
    if (target instanceof Picture) {
      target = target.context.canvas;
    }

    this._copy(this.context.canvas, target, 0, 0, x, y);

    return this;
  }
};

Picture.defaults = {
  width: 500,
  height: 300
};

module.exports = Picture;

},{}]},{},[1])(1)
});