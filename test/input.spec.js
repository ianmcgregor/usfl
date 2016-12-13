import input from '../input';

describe('input', () => {

    describe('clickOutside', () => {
        expect(input.clickOutside).to.be.a('function');
        expect(input.clickOutside().destroy).to.be.a('function');
    });

    describe('key', () => {

        it('should have keyboard constants', () => {
            expect(input.keyboard.A).to.eql(65);
            expect(input.keyboard.UP).to.eql(38);
        });

        it('should have key input', () => {
            expect(input.keyInput).to.be.a('function');
            expect(input.keyInput().enable).to.be.a('function');
            expect(input.keyInput().isDown).to.be.a('function');
            expect(input.keyInput().isDown(input.keyboard.UP)).to.be.a('boolean');
        });

    });

    describe('microphone', () => {
        expect(input.microphone).to.be.a('function');
        expect(input.microphone().isSupported()).to.be.a('boolean');
    });

    describe('mouseLeftWindow', () => {
        expect(input.mouseLeftWindow).to.be.a('function');
        expect(input.mouseLeftWindow(() => {}).destroy).to.be.a('function');
    });

    describe('mouseWheel', () => {
        expect(input.mouseWheel).to.be.a('function');
    });

    describe('pointerCoords', () => {
        expect(input.pointerCoords).to.be.a('function');
        expect(input.pointerCoords().x).to.be.a('number');
        expect(input.pointerCoords().y).to.be.a('number');
        expect(input.pointerCoords().percentX).to.be.a('number');
        expect(input.pointerCoords().percentY).to.be.a('number');
    });

    describe('touch input', () => {
        const touchInput = input.touchInput();

        it('should construct successfully', () => {
            expect(touchInput).to.be.an('object');
        });

        it('should have api', () => {
            expect(touchInput.listen).to.be.a('function');
            expect(touchInput.isDown).to.be.a('function');
            expect(touchInput.getTouch).to.be.a('function');
            expect(touchInput.destroy).to.be.a('function');
        });

    });
});
