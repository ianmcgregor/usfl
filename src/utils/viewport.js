'use strict';

var signals = require('signals'),
	resizeRect = require('./resize');

module.exports = {
	rect: {
		'x': 0,
		'y': 0,
		'width': 0,
		'height': 0,
		'stageWidth': 0,
		'stageHeight': 0,
		'scale': 1
	},
	originalWidth: 0,
	originalHeight: 0,

	init: function(width, height) {
		this.originalWidth = width;
		this.originalHeight = height;
		var self = this;
		window.onresize = window.onorientationchange = function() {
			self.resize();
		};
		this.resize();
	},
	resize: function() {
		// reset
		this.rect.x = 0;
		this.rect.y = 0;
		this.rect.width = this.originalWidth;
		this.rect.height = this.originalHeight;
		this.rect.stageWidth = window.innerWidth || document.body.clientWidth;
		this.rect.stageHeight = window.innerHeight || document.body.clientHeight;
		this.rect.scale = 1;
		// resize
		if(this.rect.stageWidth > this.rect.stageHeight) {
			resizeRect(this.rect, this.rect.stageWidth, this.rect.stageHeight, true, 'fill');
		}
		else {
			resizeRect(this.rect, this.rect.stageWidth, this.rect.stageHeight, true, 'fitWidth');
		}
		this.rect.scale = this.rect.width / this.originalWidth;
		// notify
		this.onResize.dispatch();
	},
	onResize: new signals.Signal()
};