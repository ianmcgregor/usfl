import api from '../visibility/api';
import visibility from '../visibility';

describe('visibility', () => {

    it('should get visibility api from browser', () => {
        expect(api.hidden).to.be.a('string');
        expect(api.change).to.be.a('string');
    });

    it('should have hidden property', function() {
        expect(visibility.hidden).to.be.a('boolean');
    });

    it('should be emitter', function() {
        expect(visibility.on).to.be.a('function');
        expect(visibility.off).to.be.a('function');
    });

});
