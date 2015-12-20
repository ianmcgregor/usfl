'use strict';

var AssetLoader = require('../AssetLoader');

describe('asset loader', function() {
    this.timeout(5000);

    var assetLoader = new AssetLoader(),
        elAudio = document.createElement('audio'),
        extAudio = (elAudio.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
        elVideo = document.createElement('video'),
        extVideo = (elVideo.canPlayType('video/webm') ? 'webm' : 'mp4'),
        files = {
            'image': 'http://i.imgur.com/Jvh1OQm.jpg',
            'imageXHR': 'http://i.imgur.com/otXC9cN.jpg',
            'audio': ('https://dl.dropboxusercontent.com/u/15470024/prototypes/audio/bullet.' + extAudio),
            'video': ('https://dl.dropboxusercontent.com/u/15470024/prototypes/video/counter.' + extVideo),
            'json': 'https://dl.dropboxusercontent.com/u/15470024/prototypes/test/test.json'
        },
        complete = false,
        loadProgress,
        childrenLoaded = 0;

    assetLoader.add({
        url: files.image,
        type: 'jpg'
    });
    // var imgXHR = assetLoader.add(files.imageXHR, 'jpg');
    assetLoader.add({
        url: files.imageXHR,
        type: 'jpg'
    });
    // imgXHR.useImageXHR = true;
    assetLoader.add({
        url: files.audio
    });
    assetLoader.add({
        url: files.video
    });
    assetLoader.add({
        url: files.json,
        type: 'json'
    });

    beforeEach(function(done) {
        assetLoader.on('progress', function(progress) {
            loadProgress = progress;
        });
        assetLoader.on('child', function() {
            childrenLoaded++;
        });
        assetLoader.on('complete', function() {
            complete = true;
            //document.body.appendChild(assetLoader.get(files.imageXHR).data);
            done();
        });
        assetLoader.on('error', function(err) {
            console.error(err);
        });
        assetLoader.start();
    });

    it('should have finished loading', function() {
        expect(complete).equals(true);
        expect(assetLoader.get(files.image)).to.exist;
        expect(assetLoader.get(files.imageXHR)).to.exist;
        expect(assetLoader.get(files.audio)).to.exist;
        expect(assetLoader.get(files.video)).to.exist;
        expect(assetLoader.get(files.json)).to.exist;
        expect(assetLoader.get(files.json)).to.exist;
        expect(loadProgress).to.eql(1);
    });
});
