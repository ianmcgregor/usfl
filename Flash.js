'use strict';

var Emitter = require('./Emitter'),
    swfobject = window.swfobject;

function Flash(element, url, embedvars, flashvars) {

    this.emitter = new Emitter();
    this.elementId = element.getAttribute('id');
    this.flashId = 'flash-' + this.elementId;
    this.url = url;
    this.embedvars = embedvars || {};
    this.flashvars = flashvars || {};

    this.isReady = false;
    this.queuedCalls = [];
}

Flash.prototype = {
    /*
     * Embed main flash app
     */
    embed: function() {
        // Querystring vars
        this._getFlashvarsFromQueryString(this.flashvars);
        // Check path format
        this._formatPaths(this.flashvars);
        // check flash version
        var flashVersion = swfobject.getFlashPlayerVersion();
        var minVersionArr = ( this.embedvars.version || '10.2.0' ).split('.');
        var minMajor = parseInt(minVersionArr[0], 10);
        var minMinor = parseInt(minVersionArr[1], 10);

        var result;

        // Detect / Embed
        if (flashVersion.major === 0) {
            // No Flash
            //document.getElementById('flash-site').innerHTML = embedvars.noFlashHTML || '<div class="error"><h1>Error</h1><p><a href="http://get.adobe.com/flashplayer/" target="_blank">Flashplayer ' + (embedvars.version || '') + '</a> is required.</p></div>';
            result = -1;
        }
        else if(flashVersion.major < minMajor || (flashVersion.major === minMajor && flashVersion.minor < minMinor)) {
            // Update Flash
            //document.getElementById('flash-site').innerHTML = embedvars.updateFlashHTML || '<div class="error"><h1>Error</h1><p><a href="http://get.adobe.com/flashplayer/" target="_blank">Flashplayer ' + (embedvars.version || '') + '</a> is required.</p></div>';
            result = 0;
        }
        else {
            var params = {
                'menu': false,
                'quality': 'high',
                'bgcolor': (this.embedvars.bgColor || '#ffffff'),
                'allowFullScreen': true,
                'allowFullScreenInteractive': true,
                'allowScriptAccess': 'always',
                'wmode': (this.embedvars.wmode || undefined)
            };

            var attributes = {
                'id': this.flashId,
                'name': this.flashId
            };

            swfobject.embedSWF(this.url, this.elementId, (this.embedvars.width || '100%'), (this.embedvars.height || '100%'), (this.embedvars.version || '10.2.0'), this.flashvars.assetsPath + 'swf/expressInstall.swf', this.flashvars, params, attributes);

            result = 1;
        }

        this.emitter.emit('embed', result);
    },
    /*
     * Get ref to Flash object
     */
    getFlashObject: function() {
        return swfobject.getObjectById(this.flashId);
    },
    /*
     * Flash must call 'flash.ready' when loaded and ready to receive JS calls
     */
    ready: function() {
        if( this.isReady ) {
            return;
        }
        this.isReady = true;
        console.log('flash.ready called');
        this._applyQueuedCalls();
        this.emitter.emit('ready');
    },
    /*
     * Call methods in flash
     *
     * E.g.
     * flash.call( "onSomeJSActionComplete", response ); - calls the ExternalInterface call back 'onSomeJSActionComplete' in Flash
     * flash.call("onFlashDispatcher", "Hello", "World", {testObj:true}, false); - can send multiple arguments - max 4 at moment!
     *
     */
    call: function( functionName ) {
        try {
            console.log('flash.call: ', functionName, 'arguments:', (Array.prototype.slice.call(arguments).slice(1)));

            var flashObject = this.getFlashObject();
            console.log('flash ready:', this.isReady, flashObject);
            if(this.isReady && flashObject && flashObject[ functionName ]){
                // TODO: figure out how to do this in a clever way!
                if(arguments.length > 4){
                    return flashObject[ functionName ]( arguments[1], arguments[2], arguments[3], arguments[4] );
                } else if(arguments.length > 3){
                    return flashObject[ functionName ]( arguments[1], arguments[2], arguments[3] );
                } else if(arguments.length > 2){
                    return flashObject[ functionName ]( arguments[1], arguments[2] );
                } else if(arguments.length > 1){
                    return flashObject[ functionName ]( arguments[1] );
                } else {
                    return flashObject[ functionName ]();
                }
            }
            else {
                console.log('flash.queuedCalls.push:', arguments);
                this.queuedCalls.push(arguments);
            }
        } catch(error) {
            console.log('flash.call ERROR:', error);
        }
        return false;
    },
    /*
     * Any JS methods called before Flash loaded will be queued and called when this method is called.
     */
    _applyQueuedCalls: function() {
        console.log('flash._applyQueuedCalls', this.queuedCalls.length);
        var queuedCalls = this.queuedCalls;
        var l = queuedCalls.length;
        var i = 0;
        while(i < l) {
            this.call.apply(this, queuedCalls[i]);
            i++;
        }
        this.queuedCalls = [];
    },
    /*
     * Check Querystring for Flashvar values
     */
    _getFlashvarsFromQueryString: function(flashvars) {
        // Set Flashvars from Query String params
        function setFlashvarFromQueryString(param) {
            if (swfobject.getQueryParamValue(param)) {
                flashvars[param] = swfobject.getQueryParamValue(param);
                console.log('flash Set flashvar \'' + param + '\' to \'' + flashvars[param] + '\'');
            }
        }
        // QueryString params to overwrite default Flashvars
        function queryParamsToFlashvars(flashvars) {
            for(var param in flashvars) {
                if (flashvars.hasOwnProperty(param)) {
                    setFlashvarFromQueryString(param);
                }
            }
        }
        queryParamsToFlashvars(flashvars);
        // Look for locale and debug params if they haven't already been defined
        if(!flashvars.locale) {
            setFlashvarFromQueryString('locale');
        }
        if(!flashvars.debug) {
            setFlashvarFromQueryString('debug');
        }
        if(!flashvars.bw) {
            setFlashvarFromQueryString('bw');
        }
    },
    /*
     * Check paths for correct formatting
     */
    _formatPaths: function(flashvars) {
        // Make sure paths start with protocol and end with '/'
        function formatPath(input) {
            if(input && input.lastIndexOf('/') !== input.length - 1) {
                input = input + '/';
            }
            if(input && input.substr(0,2) === '//') {
                input = document.location.protocol + input;
            }
        }
        formatPath(flashvars.assetsPath);
        formatPath(flashvars.videoPath);
        formatPath(flashvars.audioPath);
        formatPath(flashvars.appPath);
    }

};

if (typeof module === 'object' && module.exports) {
    module.exports = Flash;
}
