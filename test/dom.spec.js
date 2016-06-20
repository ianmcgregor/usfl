import dom from '../dom';

describe('dom', () => {

    it('should block scrolling', () => {
        dom.blockScrolling(true);
        expect(document.body.style.overflow).to.eql('hidden');
        dom.blockScrolling(false);
        expect(document.body.style.overflow).to.eql('');
    });

    it('should have forceRedraw', () => {
        expect(dom.forceRedraw).to.be.a('function');
    });

    it('should get ScrollPercentage', () => {
        expect(dom.getScrollPercentage()).to.be.a('number');
    });

    it('should get PageHeight', () => {
        expect(dom.getPageHeight()).to.be.a('number');
    });

    it('should get ScrollRemaining', () => {
        expect(dom.getScrollRemaining()).to.be.a('number');
    });

    it('should get ScrollTop', () => {
        expect(dom.getScrollTop()).to.be.a('number');
    });

    it('should get isElementInViewport', () => {
        expect(dom.isElementInViewport(document.body)).to.be.a('boolean');
    });

    it('should get isPageEnd', () => {
        expect(dom.isPageEnd()).to.be.a('boolean');
    });

    it('should have resize', () => {
        expect(dom.resize).to.be.a('function');
    });

    it('should have scroll', () => {
        expect(dom.scroll).to.be.a('function');
    });

    it('should have transitionEnd', () => {
        expect(dom.transitionEnd).to.be.a('function');
    });
});
