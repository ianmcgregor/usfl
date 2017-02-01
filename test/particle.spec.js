import Particle from '../particle';
import ParticleGroup from '../particle/ParticleGroup';

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
