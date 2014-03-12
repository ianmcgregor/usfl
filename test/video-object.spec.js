define(
	[
		'video-object'
	],
	function(VideoObject) {

		'use strict';

		describe('video object', function() {
			var videoObject = new VideoObject(),
				el = document.createElement('video'),
				ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
				file = ('http://techslides.com/demos/sample-videos/small.' + ext),
				ready = false;

			beforeEach(function(done) {
				videoObject.onReady.add(function() {
					ready = true;
					done();
				});
				videoObject.load(file);
			});

			it('should be ready', function(){
				expect(ready).to.be.true;
			});
		});
});