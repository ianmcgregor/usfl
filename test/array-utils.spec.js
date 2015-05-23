'use strict';

var array = require('../array');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(array.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(array.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(array.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(array.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(array.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(array.getRandom([3,2,1,0])).to.be.a('number');
	});
});
