import QuadTree from '../src/quad-tree';

describe('QuadTree', () => {

    it('should construct', () => {
        expect(new QuadTree({x: 0, y: 0, width: 100, height: 100})).to.exist;
    });

});
