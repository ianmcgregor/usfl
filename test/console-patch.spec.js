'use strict';

require('../src/lib/legacy/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});