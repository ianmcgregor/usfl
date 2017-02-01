import Tween from '../tween';

describe('Tween', () => {
    const ob = {x: 0};
    const tween = new Tween(ob, {x: 10}, 1);

    it('should construct', () => {
        expect(tween).to.exist;
    });

    it('should change prop', () => {
        tween.update(0.5);
        tween.update(0.5);
        expect(ob.x).to.eql(10);
    });

});
