import Ticker from '../ticker';

describe('Ticker', () => {
    const ticker = new Ticker();
    let updated = false;
    ticker.onUpdate.once(function() {
        updated = true;
    });

    beforeEach((done) => {
        ticker.start();
        done();
    });

    it('should construct', () => {
        expect(ticker).to.exist;
    });

    it('should start', () => {
        ticker.start();
        expect(ticker.running).to.be.true;
    });

    it('should stop', () => {
        ticker.stop();
        expect(ticker.running).to.be.false;
    });

    it('should update', () => {
        expect(updated).to.be.true;
    });

});
