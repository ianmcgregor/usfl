const usfl = require('../dist/usfl.js');
const {expect} = require('chai');

describe('node bundle', () => {

    it('should exist', () => {
        expect(usfl).to.exist;
    });

    it('should have utils', () => {
        expect(usfl.array).to.be.an('object');
        expect(usfl.dom).to.be.an('object');
        expect(usfl.ease).to.be.an('object');
        expect(usfl.events).to.be.an('object');
        expect(usfl.fullscreen).to.be.an('object');
        expect(usfl.graphics).to.be.a('function');
        expect(usfl.gui).to.be.a('function');
        expect(usfl.http).to.be.an('object');
        expect(usfl.input).to.be.an('object');
        expect(usfl.linkedList).to.be.a('function');
        expect(usfl.Loop).to.be.a('function');
        expect(usfl.math).to.be.an('object');
        expect(usfl.media).to.be.an('object');
        expect(usfl.object).to.be.an('object');
        expect(usfl.objectPool).to.be.a('function');
        expect(usfl.Particle).to.be.a('function');
        expect(usfl.ParticleGroup).to.be.a('function');
        expect(usfl.platform).to.be.an('object');
        expect(usfl.popup).to.be.a('function');
        expect(usfl.QuadTree).to.be.a('function');
        expect(usfl.share).to.be.an('object');
        expect(usfl.storage).to.be.an('object');
        expect(usfl.string).to.be.an('object');
        expect(usfl.Tween).to.be.a('function');
        expect(usfl.track).to.be.an('object');
        expect(usfl.visibility).to.be.an('object');
    });

});
