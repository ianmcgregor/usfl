'use strict';

var AssetLoader = require('../src/lib/asset-loader.js'),
	WebAudio = require('../src/lib/web-audio.js');

describe('web audio', function() {
	this.timeout(5000);

	var audio = new WebAudio(),
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/ogg; codecs="vorbis"') ? '.ogg' : '.mp3'),
		file = ('http://ianmcgregor.me/prototypes/assets/audio/music' + ext),
		playing = false;

	if(!audio.context) {
		return;
	}

	assetLoader.crossOrigin = 'anonymous';
	assetLoader.webAudioContext = audio.context;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			//audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			var data = assetLoader.get(file).data;
			audio.add(data);
			audio.play();
			playing = audio.playing;
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audio.stop();
	});
});
