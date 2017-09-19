import storage from '../src/storage';

describe('storage utils', () => {

    const key = 'testData',
        testData = {
            id: 'foo',
            name: 'bar',
            x: 0
        };

    it('should store object and return true', () => {
        const saved = storage.saveJSON(key, testData);
        expect(saved).to.be.true;
    });

    it('should retrieve stored object', () => {
        const loaded = storage.loadJSON(key);
        expect(loaded).to.exist;
        expect(loaded.id).to.eql('foo');
        expect(loaded.name).to.eql('bar');
        expect(loaded.x).to.eql(0);
    });
});
