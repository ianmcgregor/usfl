import fullscreen from '../fullscreen';

describe('fullscreen', function() {

    it('should return state booleans', function() {
        expect(fullscreen.isSupported).to.be.a('boolean');
        expect(fullscreen.isFullscreen).to.be.a('boolean');
        expect(fullscreen.enabled).to.be.a('boolean');
    });

    it('should have request and exit methods', function() {
        expect(fullscreen.request).to.be.a('function');
        expect(fullscreen.exit).to.be.a('function');
        expect(fullscreen.toggle).to.be.a('function');
    });

    it('should have emitter', function() {
        expect(fullscreen.on).to.be.a('function');
        expect(fullscreen.off).to.be.a('function');
    });

});
