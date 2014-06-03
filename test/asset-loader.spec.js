'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});
