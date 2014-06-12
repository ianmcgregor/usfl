'use strict';

var ready = require('../src/lib/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});
