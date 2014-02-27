/* facebook.js */

define(
    [
        'signals'
    ],
    function(signals) {

        'use strict';

        function Facebook(appId) {

            var onInit = new signals.Signal(),
                onInfo = new signals.Signal();

            // initialize FB app
            function init() {
                if(window.FB !== undefined) {
                    FB.Event.subscribe('auth.statusChange', function(response) {
                        console.log('auth.statusChange:', response.status);
                        if (response.status === 'connected') {
                            //the user is logged and has granted permissions
                        } else if (response.status === 'not_authorized') {
                            //ask for permissions
                        } else {
                            //ask the user to login to facebook
                        }
                    });
                    FB.init({appId: appId, status: true, cookie: true, logging: true, xfbml: true});
                    FB.getLoginStatus(function(response) {
                        onInit.dispatch(response.status);
                    });
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
                            /*login(function(response) {
                                if(response && response.scope){
                                    callback();
                                } else {
                                    console.log('FB user didn\'t grant permission:', permissions);
                                    onPermissionSkip.dispatch(permissions);
                                }
                            }, permissions);*/
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
            (function() {
                console.log('load fb');
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
            }());

            // public
            var self = {
                'init': init,
                'login': login,

                'onInit': onInit,
                'onInfo': onInfo,

                /*
            var permissions = 'user_relationships,user_relationship_details';
            var fields = 'id, name, first_name, last_name, gender, picture, picture.type(square)' +
            ', significant_other, significant_other.name, significant_other.picture, significant_other.gender' + 
            ', friends, friends.id, friends.name, friends.gender, friends.picture, friends.mutualfriends, friends.limit(100)';
            
                */

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

        return Facebook;
    }
);
