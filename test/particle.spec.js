import Particle from '../src/particle';
import ParticleGroup from '../src/particle/particle-group';

describe('Particle', () => {

    it('should construct Particle instance', () => {
        expect(new Particle()).to.exist;
    });
});

describe('ParticleGroup', () => {

    it('should construct ParticleGroup instance', () => {
        expect(new ParticleGroup()).to.exist;
    });
});
