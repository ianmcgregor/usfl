define(
	[
		'asset-loader'
	],
	function(AssetLoader) {

		'use strict';

		describe('asset loader', function() {
			var assetLoader = new AssetLoader(),
				el = document.createElement('audio'),
				ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
				files = {
					'image': 'http://placekitten.com/g/200/300',
					'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
					'json': 'http://graph.facebook.com/facebook'
				},
				complete = false;

			assetLoader.webAudioContext = null;
			assetLoader.crossOrigin = true;
			
			assetLoader.add(files.image, 'jpg');
			assetLoader.add(files.audio);
			assetLoader.add(files.json, 'json');
			
			beforeEach(function(done) {
				assetLoader.onComplete.add(function() {
					complete = true;
					done();
				});
				assetLoader.start();
			});

			it('should have finished loading', function(){
				expect(complete).equals(true);
				expect(assetLoader.get(files.image)).to.exist;
				expect(assetLoader.get(files.audio)).to.exist;
				expect(assetLoader.get(files.json)).to.exist;
			});
		});
});