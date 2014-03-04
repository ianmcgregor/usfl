define(
	[
		'storage-utils',
		'asset-loader'
	],
	function(StorageUtils, AssetLoader) {

		'use strict';

		describe('storage utils', function() {
			var key = 'testData',
				testData = {
					id: 'foo',
					name: 'bar',
					x: 0
				};

			it('should store object and return true', function(){
				var saved = StorageUtils.saveJSON(key, testData);
				expect(saved).to.be.true;
			});

			it('should retrieve stored object', function(){
				var loaded = StorageUtils.loadJSON(key);
				expect(loaded).to.exist;
				expect(loaded.id).to.eql('foo');
				expect(loaded.name).to.eql('bar');
				expect(loaded.x).to.eql(0);
			});

			var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
			loader.crossOrigin = true;
			beforeEach(function(done) {
				loader.onComplete.add(function() {
					loader.onComplete.removeAll();
					done();
				});
				loader.start();
			});

			it('should get image data', function(){
				var dataURL = StorageUtils.getImageDataURL(loader.data);
				expect(dataURL.indexOf('data:image/')).to.eql(0);
			});
		});
});