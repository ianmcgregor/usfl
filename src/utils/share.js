'use strict';

var popup = require('popup');

// warnBadURL - helper to warn on relative URLs supplied for images etc
function warnBadURL(url) {
	if(url.substr(0,4) !== 'http') {
		console.warn('URL: ' + url + ' should start with http');
	}
}

var self = {
	// Standard FB share (uses og tags)
	facebook: function(url) {
		console.log('share.facebook', url);
		return popup('http://www.facebook.com/share.php?u=' + encodeURIComponent(url), 'shareFacebook', 720, 480);
	},
	twitter: function(url, text, hashtags, related) {
		console.log('share.twitter', url, text, hashtags, related);
		return popup('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text) + '&hashtags=' + encodeURIComponent(hashtags) + '&related=' + encodeURIComponent(related), 'shareTwitter', 550, 380);
	},
	googlePlus: function(url) {
		console.log('share.googlePlus', url);
		return popup('https://plus.google.com/share?url=' + encodeURIComponent(url), 'shareGooglePlus', 550, 380);
	},
	pinterest: function(url, picture, text) {
		warnBadURL(picture);
		console.log('share.pinterest', url, picture, text);
		return popup('http://pinterest.com/pin/create/button/?url='+ encodeURIComponent(url) + '&media='+ encodeURIComponent(picture) + '&description=' + encodeURIComponent(text), 'sharePinterest', 630, 280);
	},
	vkontakte: function(url, title, description, image) {
		console.log('share.vkontakte', url, title, description, image);
		return popup('http://vkontakte.ru/share.php?url=' + encodeURIComponent(url) + '&title=' + title + '&description=' + description + '&image=' + encodeURIComponent(image), 'shareVK', 550, 380);
	},
	renren: function(url, title) {
		console.log('share.renren', url, title);
		return popup('http://share.renren.com/share/buttonshare.do?link=' + encodeURIComponent(url) + '&title=' + title, 'shareRenRen', 900, 480);
	},
	weibo: function(url, title, image) {
		console.log('share.weibo', url, title, image);
		return popup('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&appkey=&title=' + title + '&pic=' + encodeURIComponent(image) + '&ralateUid=&language=zh_cn', 'shareWeibo', 640, 480);
	},
	// FB feed dialog share for sharing with customised text and images 
	// See http://developers.facebook.com/docs/reference/dialogs/feed/
	facebookFeedDialog: function(appId, title, link, picture, source, caption, description, redirectURL) {
		warnBadURL(picture);
		warnBadURL(redirectURL);
		console.log('share.facebookViaApp', appId, title, link, picture, source, caption, description, redirectURL);

		var url = 'http://www.facebook.com/dialog/feed?app_id=' + appId +
		'&picture=' + picture +
		( source && source !== '' ? '&source=' + source : '' ) +
		'&name=' + encodeURIComponent(title) +
		'&link=' + link +
		'&caption=' + encodeURIComponent(caption) +
		'&description=' + encodeURIComponent(description) +
		'&display=popup' +
		'&show_error=true' +
		'&redirect_uri=' + redirectURL;

		return popup(url, 'shareFacebook', 550, 380);
	}
};

module.exports = self;
