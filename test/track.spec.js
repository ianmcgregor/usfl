import track from '../src/track';

describe('track', () => {

    it('should have event function', () => {
        expect(track.event).to.be.a('function');
    });

    it('should have pageview function', () => {
        expect(track.pageview).to.be.a('function');
    });

    it('should have load function', () => {
        expect(track.load).to.be.a('function');
        expect(track.load.length).to.eql(1);
    });

});
