'use strict';

var signals = require('signals');

function Facebook(appId) {

    var onInit = new signals.Signal(),
        onInfo = new signals.Signal(),
        loadScriptTimeout;

    // initialize FB app
    function init() {
        if(window.FB !== undefined) {
            /*FB.Event.subscribe('auth.statusChange', function(response) {
                console.log('auth.statusChange', response);
                if(response.status === 'connected') {
                }
            });*/
            FB.init({appId: appId, status: true, cookie: true, logging: true, xfbml: true});
            FB.getLoginStatus(function(response) {
                onInit.dispatch(response.status);
            });
            clearTimeout(loadScriptTimeout);
        }
        else {
            // called by FBs JS when finished loading
            window.fbAsyncInit = function() {
                init();
            };
        }
    }

    // login
    function login(callback, permissions) {
        FB.login(function() {
            callback();
        }, { 'scope': (permissions || '') });
    }

    // check that user has granted required permissions and request if needed
    function checkPermissions(callback, permissions){
        if( permissions === undefined || permissions === '' ) {
            callback();
        } else {
            FB.api('/me/permissions', function (response) {
                var hasPermission = true;
                var perms = permissions.split(',');
                for (var i = 0; i < perms.length; i++) {
                    hasPermission = !!response.data[0][perms[i]];
                    if(!hasPermission) {
                        break;
                    }
                }
                if(hasPermission) {
                    callback();
                }
                else {
                    login(callback, permissions);
                }
            });
        }
    }

    // check user login and permission status
    function checkAuth(callback, permissions) {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                checkPermissions(callback, permissions);
            } else {
                login(callback, permissions);
            }
        });
    }

    // create FB container and load script
    function loadScript() {
        if(window.FB !== undefined) {
            return;
        }
        var fbroot = document.getElementById('fb-root');
        if(!fbroot) {
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
    var self = {
        'init': init,
        'login': login,

        'onInit': onInit,
        'onInfo': onInfo,

        getInfo: function(permissions, fields) {
            checkAuth(function() {
                FB.api('/me', { 'fields': fields }, function(response) {
                    if (!response || response.error) {
                        console.error(response);
                        onInfo.dispatch(null);
                    } else {
                        onInfo.dispatch(response);
                    }
                });
            }, permissions);
        }
    };

    return self;
}

if (typeof module === 'object' && module.exports) {
    module.exports = Facebook;
}
