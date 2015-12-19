'use strict';

var Emitter = require('./Emitter');

function Facebook(appId) {

    var loadScriptTimeout;

    // initialize FB app
    function init() {
        if (window.FB !== undefined) {
            /*FB.Event.subscribe('auth.statusChange', function(response) {
                console.log('auth.statusChange', response);
                if(response.status === 'connected') {
                }
            });*/
            window.FB.init({
                appId: appId,
                status: true,
                cookie: true,
                logging: true,
                xfbml: true
            });
            window.FB.getLoginStatus(function(response) {
                self.emit('init', response.status);
            });
            clearTimeout(loadScriptTimeout);
        } else {
            // called by FBs JS when finished loading
            window.fbAsyncInit = function() {
                init();
            };
        }
    }

    // login
    function login(callback, permissions) {
        window.FB.login(function() {
            callback();
        }, {
            'scope': (permissions || '')
        });
    }

    // check that user has granted required permissions and request if needed
    function checkPermissions(callback, permissions) {
        if (permissions === undefined || permissions === '') {
            return callback();
        }

        window.FB.api('/me/permissions', function(response) {
            var hasPermission = true;
            var perms = permissions.split(',');
            for (var i = 0; i < perms.length; i++) {
                hasPermission = !!response.data[0][perms[i]];
                if (!hasPermission) {
                    break;
                }
            }
            if (hasPermission) {
                return callback();
            }
            login(callback, permissions);
        });
    }

    // check user login and permission status
    function checkAuth(callback, permissions) {
        window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                checkPermissions(callback, permissions);
            } else {
                login(callback, permissions);
            }
        });
    }

    function getInfo(permissions, fields) {
        checkAuth(function() {
            window.FB.api('/me', {
                'fields': fields
            }, function(response) {
                if (!response || response.error) {
                    console.error(response);
                    self.emit('info', null);
                } else {
                    self.emit('info', response);
                }
            });
        }, permissions);
    }

    // create FB container and load script
    function loadScript() {
        if (window.FB !== undefined) {
            return;
        }
        var fbroot = document.getElementById('fb-root');
        if (!fbroot) {
            fbroot = document.createElement('div');
            fbroot.setAttribute('id', 'fb-root');
            document.body.appendChild(fbroot);
        }
        var fb = document.createElement('script');
        fb.type = 'text/javascript';
        fb.async = true;
        fb.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        fbroot.appendChild(fb);

        loadScriptTimeout = setTimeout(loadScript, 6000);
    }

    loadScript();

    // public
    var self = Object.create(Emitter.prototype, {
        _events: {
            value: {}
        },
        init: {
            value: init
        },
        login: {
            value: login
        },
        utils: {
            value: utils
        },
        getInfo: {
            value: getInfo
        }
    });

    return self;
}

var utils = {
    getProfileImageUrl: function(id, width, height) {
        return document.location.protocol +
            '//graph.facebook.com/' + id +
            '/picture?width=' + width + '&height=' + height;
    },
    resizeCanvas: function(height) {
        window.FB.Canvas.setSize({
            'height': height
        });
        setTimeout(function() {
            window.FB.Canvas.setSize({
                'height': height
            });
        }, 1000);
    },
    scrollToTop: function() {
        window.FB.Canvas.scrollTo(0, 0);
    },
    logout: function() {
        window.FB.Event.subscribe('auth.logout', function(response) {
            var success = response && !response.error;
            console.log('onFacebookLogoutComplete', success);
        });
        window.FB.logout();
    },
    getFriends: function(limit) {
        window.FB.api('/me/friends', {
            limit: limit
        }, function(response) {
            if (!response || response.error) {
                console.log('getFriends ERROR');
            } else {
                console.log(response.data);
            }
        });
    },
    sortFriendsByMutual: function(userData) {
        var friends = userData.friends.data.sort(function(a, b) {
            var x = a.mutualfriends ? a.mutualfriends.data.length : 0;
            var y = b.mutualfriends ? b.mutualfriends.data.length : 0;
            return y - x;
        });
        return friends;
    },
    /* publish status message to feed. requires publish_stream permission */
    statusPublish: function(message) {
        window.FB.api('/me/feed', 'post', {
            message: message
        }, function(response) {
            if (!response || response.error) {
                console.log('onFacebookStatusPublish ERROR');
            } else {
                console.log('onFacebookStatusPublish SUCCESS');
            }
        });
    },
    /* Send a message */
    sendDialog: function(_link, _name, _description, _picture, _to) {
        window.FB.ui({
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
                console.log('onFacebookSendDialogComplete', true);
            } else {
                console.log('onFacebookSendDialogComplete', false);
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
    streamPublish: function(message, attachment, actionLinks, userMessagePrompt, targetId) {
        var publish = {
            method: 'stream.publish',
            message: message,
            attachment: attachment,
            action_links: actionLinks,
            user_message_prompt: userMessagePrompt,
            target_id: targetId
        };
        window.FB.ui(publish, function(response) {
            if (!response || response.error) {
                console.log('onFacebookStreamPublishComplete', false);
            } else {
                console.log('onFacebookStreamPublishComplete', true);
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
        var actionLinks = [{
            text: 'action_link',
            href: 'http://example.com/'
        }];
        var userMessagePrompt = 'user_message_prompt';
        this.streamPublish(message, attachment, actionLinks, userMessagePrompt);
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = Facebook;
}
