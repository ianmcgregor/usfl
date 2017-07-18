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

    it('should move element', () => {
        expect(array.moveElement([1, 2, 3], 0, 1)).to.eql([2, 1, 3]);
        expect(array.moveElement([1, 2, 3], 2, 0)).to.eql([3, 1, 2]);
    });

    it('should return random element', () => {
        expect(array.randomChoice([3, 2, 1, 0])).to.be.a('number');
    });

    it('should return alpha ordered array', () => {
        expect(['thing3', 'thing2', 'thing1', 'thing0'].sort(array.sortAlpha))
            .to.eql(['thing0', 'thing1', 'thing2', 'thing3']);
        expect([{n: 'thing3'}, {n: 'thing2'}, {n: 'thing1'}].sort(array.sortAlpha('n')))
            .to.eql([{n: 'thing1'}, {n: 'thing2'}, {n: 'thing3'}]);
    });

    it('should return numbered ordered array', () => {
        expect(['Item 10', 'Item 2', 'Item 1'].sort(array.sortNumbered)).to.eql(['Item 1', 'Item 2', 'Item 10']);
        expect(['val=20', 'val=1', 'val=0.3'].sort(array.sortNumbered)).to.eql(['val=0.3', 'val=1', 'val=20']);
        expect(['val=-1', 'val=-3', 'val=-2'].sort(array.sortNumbered)).to.eql(['val=-3', 'val=-2', 'val=-1']);
        expect([{n: 'Item 2'}, {n: 'Item 3'}, {n: 'Item 1'}].sort(array.sortNumbered('n')))
            .to.eql([{n: 'Item 1'}, {n: 'Item 2'}, {n: 'Item 3'}]);
    });

    it('should return numeric ordered array', () => {
        expect([3, 2, 1, 0].sort(array.sortNumeric)).to.eql([0, 1, 2, 3]);
        expect([20, -1, 0.3].sort(array.sortNumeric)).to.eql([-1, 0.3, 20]);
        expect([{n: 2}, {n: 3}, {n: 1}].sort(array.sortNumeric('n')))
            .to.eql([{n: 1}, {n: 2}, {n: 3}]);
    });

    it('should return random sorted array', () => {
        expect([3, 2, 1, 0].sort(array.sortRandom)).to.be.instanceof(Array);
        expect([3, 2, 1, 0].sort(array.sortRandom)).to.have.property('length', 4);
    });
});
