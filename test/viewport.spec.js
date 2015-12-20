'use strict';

var Viewport = require('../viewport');

describe('viewport', function() {
    Viewport.init(640, 360);

    it('should pass', function() {

        expect(Viewport.originalWidth).to.eql(640);
        expect(Viewport.originalHeight).to.eql(360);

        expect(Viewport.rect.x).to.be.a('number');
        expect(Viewport.rect.y).to.be.a('number');
        expect(Viewport.rect.width).to.be.a('number');
        expect(Viewport.rect.height).to.be.a('number');
        expect(Viewport.rect.stageWidth).to.be.a('number');
        expect(Viewport.rect.stageHeight).to.be.a('number');
        expect(Viewport.rect.scale).to.be.a('number');

        expect(Viewport.rect.width).to.be.above(0);
        expect(Viewport.rect.height).to.be.above(0);
        expect(Viewport.rect.stageWidth).to.be.above(0);
        expect(Viewport.rect.stageHeight).to.be.above(0);
        expect(Viewport.rect.scale).to.be.above(0);

        expect(Viewport.getScrollTop()).to.be.a('number');
        expect(Viewport.getWindowScrollY()).to.be.a('number');
        expect(Viewport.getDocHeight()).to.be.a('number');
        expect(Viewport.getDocHeight()).to.be.above(0);
        expect(Viewport.getScrollPercentage()).to.be.a('number');
    });
});
