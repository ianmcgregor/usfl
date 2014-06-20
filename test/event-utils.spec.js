'use strict';

var EventUtils = require('../src/lib/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have received click event', function() {
		expect(complete).to.be.true;
	});
});
