'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});
