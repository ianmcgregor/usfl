import Graphics from '../src/graphics';
import getImageDataURL from '../src/graphics/getImageDataURL';

describe('graphics', () => {
    const gfx = new Graphics();

    it('should construct successfully', () => {
        expect(gfx).to.exist;
        expect(gfx.size).to.be.a('function');
        expect(gfx.size(100, 100)).to.eql(gfx);
    });

    it('should have context', () => {
        expect(gfx.context).to.exist;
    });

    const image = new Image();
    image.crossOrigin = 'anonymous';

    beforeEach((done) => {
        if (!image.src) {
            image.addEventListener('load', () => done());
            image.src = 'http://i.imgur.com/pIUsuyE.jpg';
        } else {
            done();
        }
    });

    it('should get image data', () => {
        const dataURL = getImageDataURL(image);
        expect(dataURL.indexOf('data:image/')).to.eql(0);
    });

    // context: ctx,
    // size,
    // clear,
    // background,
    // fill,
    // stroke,
    // strokeWeight,
    // move,
    // line,
    // rect,
    // circle,
    // triangle,
    // triangleABC,
    // image,
    // cross,
    // text,
    // setFont,
    // setFontSize,
    // openImage,
    // downloadImage,
    // getImageData,
    // getPixel,
    // setPixel,
    // eachPixel

});
