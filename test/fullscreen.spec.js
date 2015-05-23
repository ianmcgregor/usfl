'use strict';

var Fullscreen = require('../fullscreen');

describe('fullscreen', function() {

    it('should return supported', function() {
        expect(Fullscreen.isSupported).to.be.a('boolean');
    });

    it('should have onChange', function() {
        expect(Fullscreen.on).to.be.a('function');
    });

});
