'use strict';

var AssetLoader = require('../AssetLoader.js'),
	storage = require('../storage');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = storage.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = storage.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader({
		url: 'http://placekitten.com/g/200/300',
		type: 'jpg',
		crossOrigin: 'anonymous'
	});
	var loaderData;
	beforeEach(function(done) {
		loader.on('complete', function(id, data) {
			loaderData = data;
			loader.off();
			done();
		}).on('error', function(err) {
			console.error(err);
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = storage.getImageDataURL(loaderData);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});
