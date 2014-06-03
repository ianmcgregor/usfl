'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});
