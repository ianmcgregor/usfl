const usfl = require('../dist/usfl.js');
const {expect} = require('chai');

describe('node bundle', () => {

    it('should exist', () => {
        expect(usfl).to.exist;
    });

    it('should have array utils', () => {
        expect(usfl.array).to.be.an('object');
    });

    it('should have dom utils', () => {
        expect(usfl.dom).to.be.an('object');
    });

    it('should have ease util', () => {
        expect(usfl.ease).to.be.an('object');
    });

    it('should have events utils', () => {
        expect(usfl.events).to.be.an('object');
    });

    it('should have fullscreen util', () => {
        expect(usfl.fullscreen).to.be.an('object');
    });

    it('should have graphics utils', () => {
        expect(usfl.graphics).to.be.a('function');
    });

    it('should have gui util', () => {
        expect(usfl.gui).to.be.a('function');
    });

    it('should have http utils', () => {
        expect(usfl.http).to.be.an('object');
    });

    it('should have imput utils', () => {
        expect(usfl.input).to.be.an('object');
    });

    it('should have linkedList utils', () => {
        expect(usfl.linkedList).to.be.a('function');
    });

    it('should have loop utils', () => {
        expect(usfl.Loop).to.be.a('function');
        expect(usfl.loop).to.be.an('object');
    });

    it('should have math utils', () => {
        expect(usfl.math).to.be.an('object');
    });

    it('should have media utils', () => {
        expect(usfl.media).to.be.an('object');
    });

    it('should have object utils', () => {
        expect(usfl.object).to.be.an('object');
    });

    it('should have objectPool util', () => {
        expect(usfl.objectPool).to.be.a('function');
    });

    it('should have Particle util', () => {
        expect(usfl.Particle).to.be.a('function');
    });

    it('should have ParticleGroup util', () => {
        expect(usfl.ParticleGroup).to.be.a('function');
    });

    it('should have platform utils', () => {
        expect(usfl.platform).to.be.an('object');
    });

    it('should have popup util', () => {
        expect(usfl.popup).to.be.a('function');
    });

    it('should have QuadTree util', () => {
        expect(usfl.QuadTree).to.be.a('function');
    });

    it('should have share utils', () => {
        expect(usfl.share).to.be.an('object');
    });

    it('should have storage util', () => {
        expect(usfl.storage).to.be.an('object');
    });

    it('should have string utils', () => {
        expect(usfl.string).to.be.an('object');
    });

    it('should have tween util', () => {
        expect(usfl.Tween).to.be.a('function');
    });

    it('should have track util', () => {
        expect(usfl.track).to.be.an('object');
    });

    it('should have visibility util', () => {
        expect(usfl.visibility).to.be.an('object');
    });

});
