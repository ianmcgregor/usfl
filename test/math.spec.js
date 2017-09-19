import math from '../src/math';

describe('math utils', () => {

    it('should find angle', () => {
        expect(math.angle(0, 0, -1, 0)).to.eql(Math.PI);
    });

    it('should interpolate using cerp', () => {
        expect(math.cerp(0, 100, 0.5)).to.be.a('number');
    });

    it('should distribute in circle', () => {
        const p = math.circleDistribution(10);
        expect(p).to.be.an('object');
        expect(p.x).to.be.a('number');
        expect(p.y).to.be.a('number');
    });

    it('should find clamp number', () => {
        expect(math.clamp(100, 0, 50)).to.eql(50);
    });

    it('should produce random true/false', () => {
        expect(math.coinToss()).to.be.a('boolean');
    });

    it('should get cross product', () => {
        expect(math.crossProduct2d(2, 2, 4, 2)).to.be.below(0);
    });

    it('should convert to degrees', () => {
        expect(math.degrees(Math.PI)).to.eql(180);
    });

    it('should find difference', () => {
        expect(math.difference(-20, 20)).to.eql(40);
    });

    it('should find distance', () => {
        expect(math.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
    });

    it('should find square distance', () => {
        expect(math.distanceSq(0, 0, 1, 1)).to.eql(2);
    });

    it('should find dot product', () => {
        expect(math.dotProduct2d(2, 2, 4, 2)).to.be.above(0);
    });

    it('should get circle points', () => {
        expect(math.getCirclePoints(0, 0, 8, 8).length).to.eql(8);
    });

    it('should get intersection area', () => {
        expect(math.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
    });

    it('should get x overlap', () => {
        expect(math.getOverlapX(0, 2, 0, 2)).to.eql(2);
    });

    it('should get y overlap', () => {
        expect(math.getOverlapY(0, 2, 0, 2)).to.eql(2);
    });

    it('should lerp value', () => {
        expect(math.lerp(0, 1, 0.5)).to.eql(0.5);
    });

    it('should map range', () => {
        expect(math.map(0.75, 0, 1, -100, 100)).to.eql(50);
    });

    it('should normalize', () => {
        expect(math.normalize(0.75, 0, 1)).to.eql(0.75);
        expect(math.normalize(50, 0, 100)).to.eql(0.5);
    });

    it('should orient', () => {
        expect(math.orientation(1, 1)).to.eql(Math.PI / 4);
    });

    it('should get percent remaining', () => {
        expect(math.percentRemaining(3, 4)).to.eql(0.75);
    });

    it('should convert to radians', () => {
        expect(math.radians(180)).to.eql(Math.PI);
    });

    it('should get random range', () => {
        expect(math.random(0, 100)).to.be.within(0, 100);
    });

    it('should get random int', () => {
        const rndInt = math.randomInt(0, 100);
        expect(rndInt).to.be.within(0, 100);
        expect(rndInt).to.eql(Math.floor(rndInt));
    });

    it('should get random sign', () => {
        expect(math.randomSign()).to.be.within(-1, 1);
        expect(Math.abs(math.randomSign())).to.eql(1);
        expect(Math.abs(math.randomSign())).to.satisfy((value) => {
            return value === -1 || value === 1;
        });
    });

    it('should rotate to deg', () => {
        expect(math.rotateToDeg(359, 1)).to.eql(361);
    });

    it('should rotate to rad', () => {
        expect(math.rotateToRad(Math.PI * 2, Math.PI)).to.eql(Math.PI * 3);
    });

    it('should round to places', () => {
        expect(math.roundTo(0.1234, 2)).to.eql(0.12);
        expect(math.roundTo(0.1234, 3)).to.eql(0.123);
    });

    it('should round to nearest', () => {
        expect(math.roundToNearest(96.5, 10)).to.eql(100);
    });

    it('should size to ratio', () => {
        const rect = {width: 640, height: 360};

        expect(math.size(rect, 1920, 720, 'contain', true)).to.eql({
            x: 320,
            y: 0,
            width: 1280,
            height: 720,
            scale: 2
        });

        expect(math.size(rect, 1920, 720, 'cover', true)).to.eql({
            x: 0,
            y: -180,
            width: 1920,
            height: 1080,
            scale: 3
        });

        expect(math.size(rect, 1920, 720, 'width', true)).to.eql({
            x: 0,
            y: -180,
            width: 1920,
            height: 1080,
            scale: 3
        });

        expect(math.size(rect, 1920, 720, 'height', true)).to.eql({
            x: 320,
            y: 0,
            width: 1280,
            height: 720,
            scale: 2
        });
    });

    it('should interpolate using smoothstep', () => {
        expect(math.smerp(0, 100, 0, 10, 5)).to.be.a('number');
    });

    it('should interpolate value using smoothstep', () => {
        expect(math.smoothstep(0, 1, 0.5)).to.be.a('number');
    });

    it('should split unit and value', () => {
        expect(math.splitValueAndUnit('10%').value).to.eql(10);
        expect(math.splitValueAndUnit('10%').unit).to.eql('%');
        expect(math.splitValueAndUnit('1.4vw').value).to.eql(1.4);
        expect(math.splitValueAndUnit('1.4vw').unit).to.eql('vw');
        expect(math.splitValueAndUnit('-2px').value).to.eql(-2);
        expect(math.splitValueAndUnit('-2px').unit).to.eql('px');
    });

    it('should interpolate using weighted average', () => {
        expect(math.weightedAverage(0, 100, 20)).to.be.a('number');
    });

    it('should get weighted distribution', () => {
        const d = math.weightedDistribution(0, 10, 5);
        expect(d).to.be.a('number');
        expect(d).to.be.within(0, 10);
    });

});
