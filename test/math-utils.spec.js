'use strict';

var math = require('../math');

describe('math utils', function() {

    it('should pass', function() {
        expect(math.angle(0, 0, -1, 0)).to.eql(Math.PI);
        expect(math.clamp(100, 0, 50)).to.eql(50);
        expect(math.coinToss()).to.be.a('boolean');
        expect(math.crossProduct(2, 2, 4, 2)).to.be.below(0);
        expect(math.degrees(Math.PI)).to.eql(180);
        expect(math.difference(-20, 20)).to.eql(40);
        expect(math.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
        expect(math.distanceSQ(0, 0, 1, 1)).to.eql(2);
        expect(math.dotProduct(2, 2, 4, 2)).to.be.above(0);
        expect(math.getCirclePoints(0, 0, 8, 8).length).to.eql(8);
        expect(math.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
        expect(math.getOverlapX(0, 2, 0, 2)).to.eql(2);
        expect(math.getOverlapY(0, 2, 0, 2)).to.eql(2);
        expect(math.lerp(0, 1, 0.5)).to.eql(0.5);
        expect(math.map(0.75, 0, 1, -100, 100)).to.eql(50);
        expect(math.percentRemaining(3, 4)).to.eql(0.75);
        expect(math.radians(180)).to.eql(Math.PI);
        expect(math.random(0, 100)).to.be.within(0, 100);
        expect(math.rotateToDEG(359, 1)).to.eql(361);
        expect(math.rotateToRAD(Math.PI * 2, Math.PI)).to.eql(Math.PI * 3);
        expect(math.roundToNearest(96.5, 10)).to.eql(100);
    });

});
