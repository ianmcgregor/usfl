'use strict';

var AssetLoader = require('../src/lib/asset-loader.js'),
	AudioManager = require('../src/lib/audio-manager.js');

describe('audio manager', function() {
	this.timeout(5000);

	var audioManager = new AudioManager();

	it('should get extension as .ogg or .mp3', function() {
		expect(audioManager.getExtension()).to.match(/\.(mp3|ogg)/);
	});

	it('should get isSupported', function() {
		expect(audioManager.isSupported()).to.be.true;
	});

	it('should get webAudioSupported', function() {
		expect(audioManager.webAudioSupported()).to.be.true;
	});

	describe('audio manager play test', function() {
		var assetLoader = new AssetLoader(),
		ext = audioManager.getExtension(),
		file = ('http://ianmcgregor.me/prototypes/assets/audio/hit' + ext),
		playing = false;

		assetLoader.crossOrigin = 'anonymous';
		assetLoader.webAudioContext = audioManager.webAudioContext;
		assetLoader.add(file);

		beforeEach(function(done) {
			assetLoader.onComplete.add(function() {
				var data = assetLoader.get(file).data;
				audioManager.add(file, data, false);
				audioManager.play(file);
				playing = audioManager.get(file).playing;
				done();
			});
			assetLoader.start();
		});

		it('should play a sound', function(){
			expect(playing).to.be.true;
			audioManager.stop();
		});
	});
});