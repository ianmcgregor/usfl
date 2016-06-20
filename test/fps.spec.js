import fps from '../fps';

describe('fps', () => {

    it('should have update fn', () => {
        const counter = fps();
        expect(counter.update).to.be.a('function');
        expect(counter.auto).to.be.a('function');
    });

});
