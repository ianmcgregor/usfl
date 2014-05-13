/* facebook-utils.js */

define(
	[],
	function() {

		'use strict';

		var self = {
			getProfileImageUrl: function(id, width, height) {
				return 'http://graph.facebook.com/' + id + '/picture?width=' + width + '&height=' + height;
			},
			resizeCanvas: function(height) {
				FB.Canvas.setSize({ 'height': height });
				setTimeout(function(){
					FB.Canvas.setSize({ 'height': height });
				}, 1000);
			},
			scrollToTop: function() {
				FB.Canvas.scrollTo(0,0);
			},
			logout: function() {
				FB.Event.subscribe('auth.logout', function(response) {
					var success = response && !response.error;
					console.log( 'onFacebookLogoutComplete', success );
				});
				FB.logout();
			},
			getFriends: function(limit) {
				FB.api('/me/friends', { limit: limit }, function(response) {
					if (!response || response.error) {
						console.log( 'getFriends ERROR' );
					} else {
						console.log(response.data);
					}
				});
			},
			sortFriendsByMutual: function(userData) {
				var friends = userData.friends.data.sort(function(a,b){
                    var x = a.mutualfriends ? a.mutualfriends.data.length : 0;
                    var y = b.mutualfriends ? b.mutualfriends.data.length : 0;
                    return y - x;
                });
                return friends;
			},
			/* publish status message to feed. requires publish_stream permission */
			statusPublish: function(message) {
				FB.api('/me/feed', 'post', { message: message }, function(response) {
					if (!response || response.error) {
						console.log( 'onFacebookStatusPublish ERROR' );
					} else {
						console.log( 'onFacebookStatusPublish SUCCESS' );
					}
				});
			},
			/* Send a message */
			sendDialog: function(_link, _name, _description, _picture, _to) {
				FB.ui({
					method: 'send',
					to: _to,
					name: _name,
					picture: _picture,
					link: _link,
					display: 'popup',
					description: _description
				},
				function(response) {
					console.log('facebook.sendDialog', response);
					if (response.success) {
						console.log( 'onFacebookSendDialogComplete', true );
					} else {
						console.log( 'onFacebookSendDialogComplete', false );
					}
				});
			},
			/* Publish action. requires publish_actions permission */
			/*publishAction: function(appId, namespace, action, target_id, repeaterUrl, object, url, image) {
				var objectParams = 'fb:app_id=' + appId + '&og:type=' + namespace + ':' + object + '&url' = url;
				var params = {
					'tags': target_id,
					'image[0][url]': image
				};
				params[object] = repeaterUrl + (repeaterUrl.indexOf('?') < 0 ? '?' : '&') + objectParams;

				FB.api('/me/' + namespace + ':' + action + '?' + $.param(params), 'post', function(response) {
					console.log(response);
					if (!response || response.error) {
						console.log( 'onFacebookPublishActionComplete', false );
					} else {
						console.log( 'onFacebookPublishActionComplete', true );
					}
				});
			},*/
			/* stream publish with confirmation and user input. rquires publish_stream permission */
			streamPublish: function(message, attachment, action_links, user_message_prompt, target_id) {
				var publish = {
					method: 'stream.publish',
					message: message,
					attachment: attachment,
					action_links: action_links,
					user_message_prompt: user_message_prompt,
					target_id: target_id
				};
				FB.ui(publish, function(response) {
					if (!response || response.error) {
						console.log( 'onFacebookStreamPublishComplete', false );
					} else {
						console.log( 'onFacebookStreamPublishComplete', true );
					}
				});
			},
			test_streamPublish: function() {
				var message = 'message';
				var attachment = {
					name: 'name',
					caption: 'caption',
					description: 'description',
					href: 'http://example.com/'
				};
				var action_links = [{ text: 'action_link', href: 'http://example.com/' }];
				var user_message_prompt = 'user_message_prompt';
				this.streamPublish(message, attachment, action_links, user_message_prompt);
			}
		};

		return self;
	}
);
