define(
	[
		'asset-loader',
		'audio-object'
	],
	function(AssetLoader, AudioObject) {

		'use strict';

		describe('asset loader', function() {
			var audioObject,
				assetLoader = new AssetLoader(),
				el = createElement('audio'),
				ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
				file = 'http://www.google.com/logos/2013/debussy/clairdelune.' + ext);

			assetLoader.webAudioContext = null;
			assetLoader.add(file);

			beforeEach(function(done) {
				assetLoader.onComplete.add(function() {
					audioObject = new AudioObject(assetLoader.get('file').data, false, null);
					done();
				});
				assetLoader.start();
			});

			it('should have finished loading', function(){
				//expect(audioObject)
			});
		});
});