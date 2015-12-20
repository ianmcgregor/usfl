'use strict';

var TouchInput = require('../TouchInput');

describe('touch input', function() {
    var touchInput = new TouchInput();

    it('should construct successfully', function() {
        expect(touchInput).to.exist;
    });

    it('should have api', function() {
        expect(touchInput.listen).to.be.a('function');
        expect(touchInput.isDown).to.be.a('function');
        expect(touchInput.getTouch).to.be.a('function');
        expect(touchInput.destroy).to.be.a('function');
    });

});
