define(
	[
		'array-utils'
	],
	function(ArrayUtils) {

		'use strict';

		describe('array utils', function() {
			it('should return numeric ordered array', function() {
				expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
			});
			it('should return random sorted array', function() {
				expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
				expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
			});
			it('should return random element', function() {
				expect(ArrayUtils.random([3,2,1,0])).to.be.a('number');
			});
		});
});