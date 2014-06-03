'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});
