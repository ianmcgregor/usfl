'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});
