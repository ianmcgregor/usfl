import events from '../events';

describe('events', () => {

    it('should have debounce', () => {
        expect(events.debounce).to.be.a('function');
    });

    it('should have delegateEvents', () => {
        expect(events.delegateEvents).to.be.a('function');
    });

    it('should have emitter', () => {
        expect(events.emitter).to.be.a('function');
    });

    it('should have eventBus', () => {
        expect(events.eventBus).to.be.an('object');
    });

    it('should have heartbeat', () => {
        expect(events.heartbeat).to.be.a('function');
        expect(events.heartbeat().start).to.be.a('function');
        expect(events.heartbeat().stop).to.be.a('function');
        expect(events.heartbeat().update).to.be.a('function');
    });

});
