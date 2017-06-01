import object from '../object';

describe('object utils', () => {

    it('should clone object', () => {
        const obj = {a: 1, b: 2, c: 3};
        const cloned = object.clone(obj);
        obj.a = 9;
        expect(cloned).to.be.an('object');
        expect(cloned).to.eql({a: 1, b: 2, c: 3});
        expect(obj).to.eql({a: 9, b: 2, c: 3});
    });

    it('should filter object', () => {
        expect(object.filter({a: 1, b: 2, c: 3}, (key, value) => value > 1)).to.eql({b: 2, c: 3});
        expect(object.filter({a: 1, b: 2, c: 3}, key => key === 'a')).to.eql({a: 1});
    });

    it('should map object', () => {
        expect(object.map({a: 1, b: 2, c: 3}, (key, value) => value * 2)).to.eql({a: 2, b: 4, c: 6});
    });
});
