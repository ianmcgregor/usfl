import media from '../src/media';
import mp4 from '../src/platform/mp4';

describe('media', () => {

    describe('cuepointsReader', () => {
        let name = '';
        const reader = media.cuepointsReader();
        reader.onCuepoint((item) => (name = item.name));
        reader.add(2, 'foo', {name: 'bar'});
        reader.add(3, 'bar', {name: 'foo'});

        beforeEach((done) => {
            reader.update(2);
            done();
        });

        expect(media.cuepointsReader).to.be.a('function');

        it('should have dispatched foo', () => {
            expect(name).to.eql('foo');
        });
    });

    describe('video', () => {
        it('should have iOSPlayVideoInline', () => {
            expect(media.iOSPlayVideoInline).to.be.a('function');
        });

        it('should have videoPlayer', () => {
            expect(media.videoPlayer).to.be.a('function');
        });

        it('should have vimeo', () => {
            expect(media.vimeo).to.be.a('function');
        });

        it('should have youtube', () => {
            expect(media.youtube).to.be.a('function');
        });

        it('should have youtubeBasic', () => {
            expect(media.youtubeBasic).to.be.a('function');
        });
    });

    describe('video player', function() {
        this.timeout(20000); // extend timeout for this test

        const videoPlayer = media.videoPlayer(),
            ext = mp4 ? 'mp4' : 'webm',
            file = `https://ianmcgregor.co/prototypes/video/counter.${ext}`;

        let ready = false;

        beforeEach((done) => {

            videoPlayer.on('ready', function() {
                ready = true;
                done();
            }).on('error', function(err) {
                console.error(err);
                ready = true;
                done();
            });
            videoPlayer.load(file);
        });

        it('should be ready', function() {
            expect(ready).to.be.true;
        });
    });
});
