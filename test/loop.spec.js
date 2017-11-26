import {Loop} from '../src/loop';

describe('Loop', () => {
    const loop = new Loop();
    let updated = false;
    let delta = 0;
    let elapsed = 0;
    loop.add((deltaTime, elapsedTime) => {
        updated = true;
        delta = deltaTime;
        elapsed = elapsedTime;
    });

    beforeEach((done) => {
        loop.start();
        done();
    });

    it('should construct', () => {
        expect(loop).to.exist;
    });

    it('should start', () => {
        loop.start();
        expect(loop.running).to.be.true;
    });

    it('should stop', () => {
        loop.stop();
        expect(loop.running).to.be.false;
    });

    it('should update', () => {
        expect(updated).to.be.true;
    });

    it('should have dt', () => {
        expect(delta).to.be.a('number');
        expect(elapsed).to.be.a('number');
    });

});
