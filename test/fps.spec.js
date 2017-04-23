import fps from '../fps';

describe('fps', () => {

    it('should have update fn', () => {
        expect(fps.update).to.be.a('function');
        expect(fps.auto).to.be.a('function');
    });

});
