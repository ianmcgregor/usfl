'use strict';

var Fullscreen = require('../src/lib/fullscreen.js');

describe('fullscreen', function() {

    it('should return supported', function() {
        expect(Fullscreen.isSupported).to.be.a('boolean');
    });

    it('should have onChange', function() {
        expect(Fullscreen.onChange).to.be.an('object');
    });

});
