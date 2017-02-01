import * as ease from '../ease';

describe('Ease', () => {

    const types = [
        'Linear',
        'Back',
        'Bounce',
        'Circular',
        'Cubic',
        'Elastic',
        'Expo',
        'Quad',
        'Quart',
        'Quint',
        'Sine'
    ];

    it('should have ease type objects', () => {
        for (let i = 0; i < types.length; i++) {
            const easeType = ease[types[i].toLowerCase()];
            expect(easeType).to.be.an('object');
            expect(easeType.easeIn).to.be.a('function');
            expect(easeType.easeOut).to.be.a('function');
            expect(easeType.easeInOut).to.be.a('function');
        }
    });

    it('should have ease type functions', () => {
        expect(ease.easeLinear).to.be.a('function');
        for (let i = 1; i < types.length; i++) {
            expect(ease['easeIn' + types[i]]).to.be.a('function');
            expect(ease['easeOut' + types[i]]).to.be.a('function');
            expect(ease['easeInOut' + types[i]]).to.be.a('function');
        }
    });
});
