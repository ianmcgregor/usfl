define(
	[
		'asset-loader',
		'audio-object'
	],
	function(AssetLoader, AudioObject) {

		'use strict';

		describe('audio object', function() {
			var audioObject,
				assetLoader = new AssetLoader(),
				el = document.createElement('audio'),
				ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
				file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
				playing = false;

			assetLoader.webAudioContext = null;
			assetLoader.add(file);

			beforeEach(function(done) {
				assetLoader.onComplete.add(function() {
					audioObject = new AudioObject(assetLoader.get(file).data, false, null);
					playing = audioObject.play();
					done();
				});
				assetLoader.start();
			});

			it('should be playing', function(){
				expect(playing).to.be.true;
				audioObject.stop();
			});
		});
});