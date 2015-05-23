'use strict';

var Graphics = require('../Graphics');

describe('graphics', function() {
	var graphics = new Graphics();

    it('should constrcut successfully', function() {
        expect(graphics).to.exist;
        expect(graphics.size).to.be.a('function');
    });

    it('should have context', function() {
        expect(graphics.context).to.exist;
    });

});
