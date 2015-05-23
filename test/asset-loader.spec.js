'use strict';

var AssetLoader = require('../AssetLoader');

describe('asset loader', function() {
	this.timeout(5000);

	var assetLoader = new AssetLoader(),
		elAudio = document.createElement('audio'),
		extAudio = (elAudio.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		elVideo = document.createElement('video'),
		extVideo = (elVideo.canPlayType('video/ogg; codecs="theora"') ? 'ogv' : 'mp4'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'imageXHR': 'http://placekitten.com/1000/1000',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + extAudio),
			'video': ('http://techslides.com/demos/sample-videos/small.' + extVideo),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	// assetLoader.webAudioContext = null;
	// assetLoader.crossOrigin = true;

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

	it('should have finished loading', function(){
		expect(complete).equals(true);
		// expect(childrenLoaded).to.eql(assetLoader.numTotal);
		// expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.imageXHR)).to.exist;
		// expect(assetLoader.get(files.imageXHR).data.tagName).to.eql('IMG');
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.video)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});
