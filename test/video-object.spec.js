'use strict';

var VideoPlayer = require('../VideoPlayer');

describe('video object', function() {
	this.timeout(20000); // extend timeout for this test
	var videoPlayer = new VideoPlayer(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'webm'),
		file = ('https://dl.dropboxusercontent.com/u/15470024/prototypes/video/counter.' + ext),
		ready = false;

	beforeEach(function(done) {

		videoPlayer.on('ready', function() {
			ready = true;
			done();
		}).on('error', function(err) {
			console.error(err);
		});
		videoPlayer.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});
