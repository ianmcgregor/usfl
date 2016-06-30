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

    it('should get SrcsetImage', () => {
        const srcsetA = `images/image_2048.jpg 2048w,
                images/image_640.jpg 640w,
                images/image_1536.jpg 1536w`;
        expect(dom.getSrcsetImage(srcsetA)).to.be.a('string');
        expect(dom.getSrcsetImage(srcsetA, 2048)).to.eql('images/image_2048.jpg');
        expect(dom.getSrcsetImage(srcsetA, 500)).to.eql('images/image_640.jpg');
        expect(dom.getSrcsetImage(srcsetA, 1280)).to.eql('images/image_1536.jpg');
        expect(dom.getSrcsetImage(srcsetA, 3000)).to.eql('images/image_2048.jpg');
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
