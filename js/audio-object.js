/* audio-object.js */

define(
	[],
	function() {

		'use strict';

		function AudioObject(data, loop, context) {
			var buffer,
				source,
				audioElement,
				volume = 1,
				startedAt = 0,
				pausedAt = 0,
				gainNode;

			var init = function(data) {
				if(!data.tagName) {
					buffer = data;
				}
				else {
					audioElement = data;
					if(loop) {
						audioElement.addEventListener('ended', function() {
							this.currentTime = 0;
							this.play();
						}, false);
					}
				}
			};

			if(data) {
				init(data);
			}

			var play = function() {
				if(!buffer && !audioElement) {
					return false;
				}
				stop();
				// using webaudio
				if(buffer) {
					source = context.createBufferSource();
					source.buffer = buffer;
					source.loop = loop;
					// gain
					gainNode = context.createGain();
					source.connect(gainNode);
					// connect to output
					gainNode.connect(context.destination);
				}
				// handle restart from pause
				if (pausedAt) {
					startedAt = Date.now() - pausedAt;
					if(source) {
						source.start(0, pausedAt / 1000);
					}
					else if(audioElement) {
						audioElement.currentTime = pausedAt;
						audioElement.play();
					}
				}
				else {
					startedAt = Date.now();
					if(source) {
						source.start(0);
					}
					else if(audioElement) {
						audioElement.play();
					}
				}
				setVolume(volume);

				return true;
			};

			var pause = function() {
				stop();
				pausedAt = Date.now() - startedAt;
			};

			var stop = function() {
				if(source) {
					source.stop(0);
					source = null;
				}
				else if(audioElement) {
					audioElement.pause();
				}
				pausedAt = 0;
			};

			var fade = function(to, duration) {
				if(gainNode) {
					gainNode.gain.linearRampToValueAtTime(to, context.currentTime + duration);
					volume = to;
				}
				else {
					setVolume(to);
				}
			};

			var setVolume = function(value) {
				volume = value;

				if(gainNode) {
					gainNode.gain.value = volume;
				}
				else if(audioElement && audioElement.volume !== undefined) {
					audioElement.volume = volume;
				}
			};

			var mute = function() {
				setVolume(0);
			};

			var unmute = function() {
				setVolume(1);
			};

			var toggleMute = function() {
				setVolume(volume > 0 ? 0 : 1);
			};

			var isMuted = function() {
				return volume === 0;
			};

			return {
				'init': init,
				'play': play,
				'pause': pause,
				'stop': stop,
				'fade': fade,
				'mute': mute,
				'unmute': unmute,
				'toggleMute': toggleMute,
				'isMuted': isMuted
			};
		}

		return AudioObject;
	}
);