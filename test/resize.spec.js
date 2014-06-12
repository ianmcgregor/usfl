'use strict';

var resize = require('../src/lib/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});
