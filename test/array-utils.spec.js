import array from '../array';

describe('array utils', () => {

    it('should clone array', () => {
        const arr = [1, 2, 3];
        const cloned = array.clone(arr);
        arr[0] = 9;
        expect(cloned).to.be.instanceof(Array);
        expect(cloned).to.eql([1, 2, 3]);
    });

    it('should find nearest value', () => {
        expect(array.nearest(2.2, [3, 2, 1, 0])).to.eql(2);
        expect(array.nearest(100, [300, 2000])).to.eql(300);
        expect(array.nearest(-10, [-9, 10])).to.eql(-9);
    });

    it('should return random element', () => {
        expect(array.randomChoice([3, 2, 1, 0])).to.be.a('number');
    });

    it('should return numeric ordered array', () => {
        expect(array.sortNumeric([3, 2, 1, 0])).to.eql([0, 1, 2, 3]);
        expect(array.sortNumeric([20, -1, 0.3])).to.eql([-1, 0.3, 20]);
    });

    it('should return random sorted array', () => {
        expect(array.sortRandom([3, 2, 1, 0])).to.be.instanceof(Array);
        expect(array.sortRandom([3, 2, 1, 0])).to.have.property('length', 4);
    });
});
