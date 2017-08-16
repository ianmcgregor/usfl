# usfl


## array

[usfl/array](../array/index.js)

```javascript
import array from 'usfl/array';

array.array(5); // [0,1,2,3,4]
array.clone([2,1,3]); // [2,1,3]
array.nearest(2.3, [2,1,3]); // 2
array.randomChoice([2,1,3]); // 1
['b', 'a'].sort(array.sortAlpha); // ['a', 'b']
[{n: 'b'}, {n: 'a'}].sort(array.sortAlpha('n')); // [{n: 'a'}, {n: 'b'}]);
[2, 1].sort(array.sortNumeric); // [1, 2]
[{n: 2}, {n: 1}].sort(array.sortNumeric('n')); // [{n: 1}, {n: 2}]
[2, 1, 3].sort(array.sortRandom); // [1, 3, 2]

import randomChoice from 'usfl/array/randomChoice';

const choice = randomChoice([2,1,3]);
```

## dom

[usfl/dom](../dom/index.js)

```javascript
import dom from 'usfl/dom';

// prevent scrolling on a web page
dom.blockScrolling(true|false);

// force page to re render
dom.forceRedraw();

// get height of entire page
dom.getPageHeight(); // returns number

// get percentage of page scroll
dom.getScrollPercentage(); // returns number 0-1

// get number of px left to scroll
dom.getScrollRemaining(); // returns number

// get number of px scrolled
dom.getScrollTop(); // returns number

// get appropriate image from srcset
const srcset = img.getAttribute('data-srcset');
// e.g. 'images/image_2048.jpg 2048w, images/image_640.jpg 640w';
dom.getSrcsetImage(srcset); // return string e.g. images/image_2048.jpg

// is an el contained in the visible screen
dom.isElementInViewport(el); // returns boolean

// is the page fully scrolled (minus buffer)
dom.isPageEnd(buffer = 0); // returns boolean

// debounced resize listener
dom.resize();

// smoothed scroll listener
dom.scroll();

// set element styles
dom.setStyle(el, {
    left: 0,
    top: 0
});

// css transition end listener with timeout
dom.transitionEnd(el, cb, timeout = 1000);

```

## events

[usfl/events/debounce](../events/debounce.js)  
[usfl/events/delegateEvents](../events/delegateEvents.js)  
[usfl/events/emitter](../events/emitter.js)  
[usfl/events/eventBus](../events/eventBus.js)
[usfl/events/heartbeat](../events/heartbeat.js)

```javascript
// debounce(handler)
import debounce from 'usfl/events/debounce';
document.body.addEventListener('touchmove', debounce((event) =>{
    console.log('touchmove');
}));
```
```javascript
// delegateEvents(parentEl, eventType, tagName, cb)
import delegateEvents from 'usfl/events/delegateEvents';
delegateEvents(parentEl, 'click', 'li', (target, event) => {
    event.preventDefault();
    console.log(target, event);
});
```
```javascript
import emitter from 'usfl/events/emitter';
const foo = Object.assign(Object.create(emitter.prototype), {
    bar () {
        this.emit('hello', 'world');
    }
});
const log = (value) => console.log(value);
foo.on('hello', log);
// remove handler with specific signature
foo.off('hello', log);
// remove all handlers
foo.off();
// remove handler listening for 'hi'
foo.off('hello');
```
```javascript
// singleton eventBus
import eventBus from 'usfl/events/eventBus';
eventBus.on('foo', () => doSomething());
eventBus.emit('bar');
```
```javascript
import heartbeat from 'usfl/events/heartbeat';
const beat = heartbeat(2);
beat.on('update', () => console.log('beat'));
beat.start();
function update() {
  window.requestAnimationFrame(update);
  beat.update(delta);
}
update();
```

## fps

[usfl/fps](../fps/index.js)

```javascript
import fps from 'usfl/fps';

const fpsCounter = fps();

function update() {
  window.requestAnimationFrame(update);
  // update stuff
  fpsCounter.update();
}
update();

// use pre-existing element
const el = document.querySelector('.Fps');
const fpsCounter = fps(el);

// auto update
fps().auto();
```

## fullscreen

[usfl/fullscreen](../fullscreen/index.js)

```javascript
import fullscreen from 'usfl/fullscreen';

if (fullscreen.isSupported) {
    btnFullscreen.classList.add('is-visible');

    btnFullscreen.addEventListener('click', () => {
        fullscreen.toggle();
    });
}

fullscreen.request();
fullscreen.exit();
fullscreen.isFullscreen();
fullscreen.element;
fullscreen.enabled;
```

## graphics

[usfl/graphics](../graphics/index.js)

```javascript
import Graphics from 'usfl/graphics';

const graphics = new Graphics(document.querySelector('canvas'));
const graphics = new Graphics(w, h);

graphics
    .size(640, 360)
    .clear('#ffff00')
    .clear(255, 255, 0, 0.5)
    .fill('#00FF00')
    .circle(200, 200, 10)
    .clear('#0000FF')
    .clear()
    .stroke('#FFFF00')
    .lineWidth(2)
    .move(0, 0)
    .line(0, 0, 100, 100)
    .rect(0, 0, 100, 100)
    .image(img, x, y, angle)
    .text(str, x, y)
    .setFontStyle(font, size)
    .getImageData(x, y, w, h)
    .getPixel(x, y)
    .setPixel(x, y, r, g, b, a)
    .destroy();

import downloadImage from 'usfl/graphics/downloadImage';
downloadImage(canvas);

import getImageDataURL from 'usfl/graphics/getImageDataURL';
getImageDataURL(img, w, h);

import openImage from 'usfl/graphics/openImage';
openImage(canvas);

import shape from 'usfl/graphics/shape';
shape.triangle(ctx, x, y, width, height, angle);
shape.triangleABC(ctx, x1, y1, x2, y2, x3, y3)
shape.cross(ctx, radius);
```

## http

[usfl/http](../http/index.js)

```javascript
import getLocation from 'usfl/http/getLocation';

getLocation('http://www.example.com/path').hostname; // www.example.com
getLocation('http://www.example.com/path').pathname; // /path
getLocation('http://www.example.com/path').protocol; // http:
```
```javascript
import urlParams from 'usfl/http/urlParams';

urlParams('foo=bar&hello=world'); // {foo: 'bar', hello: 'world'}
```
```javascript
import jsonp from 'usfl/http/jsonp';

jsonp('test.json', (res) => console.log(res));

```
```javascript
import xhr from 'usfl/http/xhr';

xhr('test.json')
    .then((response) => console.log(response))
    .catch((err) => console.error('status:', err));

xhr('test.html', 'text')
    .then((response) => console.log(response))
    .catch((err) => console.error('status:', err));
```

## input

#### clickOutside

[usfl/input/clickOutside](../input/clickOutside.js)

```javascript
import clickOutside from 'usfl/input/clickOutside';

clickOutside(el, () => {
    el.classList.remove('is-open');
});
```

#### keyboard

[usfl/input/keyboard](../input/keyboard.js)

```javascript
import keyboard from 'usfl/input/keyboard';

function onKeyDown(event) {
    event.preventDefault();
    if (event.keyCode === keyboard.P) {
      // P key is down
    }
}
```

#### key input

[usfl/input/keyInput](../input/keyInput.js)

```javascript
import KeyInput from 'usfl/KeyInput';

const keyInput = new KeyInput();
const p = keyInput.isDown(keyboard.P); // P key is pressed
const left = keyInput.left(); // left arrow or A is pressed
keyInput.off(); // stop listening
keyInput.on(); // start listening again
```

#### microphone

[usfl/input/microphone](../input/microphone.js)

```javascript
import microphone from 'usfl/input/microphone';

const mic = microphone()
    .on('connect', (stream) => {
        const source = createWebAudioSource(webAudioContext, connectTo);
    })
    .on('denied', () => console.warn('Permission denied'))
    .on('error', () => console.error('Error'))
    .connect();

mic.isSupported(); // boolean
mic.disconnect();

```

#### mouseLeftWindow

[usfl/input/mouseLeftWindow](../input/mouseLeftWindow.js)

```javascript
import mouseLeftWindow from 'usfl/input/mouseLeftWindow';

mouseLeftWindow(() => console.log('Mouse left window'));
```

#### mouse wheel

[usfl/input/mouseWheel](../input/mouseWheel.js)

```javascript
import mouseWheel from 'usfl/input/mouseWheel';

mouseWheel(5)
    .on('update', (delta) => {
        console.log('mouse wheel moved:', delta);
    })
    .on('up', () => {
        console.log('mouse wheel moved up');
    })
    .on('down', () => {
        console.log('mouse wheel moved down');
    });
```

#### pointer coords

[usfl/input/pointerCoords](../input/pointerCoords.js)

```javascript
import pointerCoords from 'usfl/input/pointerCoords';

const coords = pointerCoords();
coords.on(); // start listening
coords.isListening(); // start listening
coords.off(); // stop listening
const {x, y, percentX, percentY} = coords;
```

#### touchInput

[usfl/input/touchInput](../input/touchInput.js)

```javascript
const touch = touchInput(el);

function update() {
  window.requestAnimationFrame(update);

  if (touch.isDown()) {
      const [x, y] = touch.getTouch().position;
  }
}
update();
```

## linked list

[usfl/linkedList](../linkedList/index.js)

```javascript
import linkedList from 'usfl/linkedList';

function itemFactory(name) {
    return {name, next: null, prev: null};
}

const list = linkedList();
list.add(itemFactory('a'));
list.add(itemFactory('b'));
list.add(itemFactory('c'));

list.getCount(); // 3
list.length; // 3

list.getFirst().name; // 'a'
list.first.name; // 'a'

list.getLast().name; // 'c'
list.last.name; // 'c'

const item = list.getFirst();
while(item) {
  console.log(item.name);
  item = item.next;
}

list.forEach((item) => {
  console.log(item.name);
});

const newList = list.map((item) => Object.assign(item, {
    foo: 'bar'
}));

// remove 2nd item
const item = list.remove(list.first.next);
// insert it at the beginning
list.insertBefore(item, list.first);
// move it to the end
list.insertAfter(item, list.last);
```

## loop

[usfl/loop](../loop/index.js)

```javascript
import Loop from 'usfl/loop';

const loop = new Loop();
const listener = loop.add((deltaTime, elapsedTime) => {
    something.update(deltaTime);
});
loop.start();

// stop
loop.stop();

// remove listener
loop.remove(listener);
```

## math

[usfl/math](../math/index.js)

```javascript
import math from 'usfl/math';

math.angle(0, 0, -1, 0); // Math.PI
math.cerp(0, 1, 0.3); // 0.20610737385376343
math.clamp(100, 0, 50); // 50
math.coinToss(); // true or false
math.degrees(Math.PI); // 180
math.difference(-20, 20); // 40
math.distance(0, 0, 1, 1); // 1.41421356237 (Math.SQRT2)
math.distanceSq(0, 0, 1, 1); // 2
math.getCirclePoints(0, 0, 8, 8).length; // 8;
math.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2); // 2
math.lerp(0, 1, 0.2); // 0.2
math.map(0.75, 0, 1, -100, 100)); // 50
math.radians(180); // Math.PI
math.random(-1, 1); // -0.45
math.randomInt(0, 100); // 45
math.rotateToDeg(359, 1); // 361
math.rotateToRad(Math.PI * 2, Math.PI) // 9.42477796076938 (Math.PI * 3)
math.roundTo(1.23456, 2); // 1.23
math.roundToNearest(96.5, 10); // 100  
math.size({width: 640, height: 360}, 1920, 720, 'cover', true); // {x: 0, y: -180, width: 1920, height: 1080}
math.smerp(10, 20, 0, 10, 5); // 15
math.smoothstep(10, 20, 15); // 0.5
math.splitValueAndUnit('10%').value; // 10
math.splitValueAndUnit('10%').unit; // '%'
math.weightedAverage(0, 1, 20); // 0.05
```

## media

#### cue points reader

[usfl/media/cuePointsReader](../media/cuePointsReader.js)

```javascript
const reader = cuepointsReader();
reader.onCuepoint((item) => console.log(item.name, item.data));
reader.add(2, 'foo', {name: 'bar'});
reader.add(3, 'bar', {name: 'foo'});

function update() {
  window.requestAnimationFrame(update);
  reader.update(time);
}
update();
```

#### iOSPlayVideoInline

[usfl/media/iOSPlayVideoInline](../media/iOSPlayVideoInline.js)

```javascript
import iOSPlayVideoInline from 'usfl/media/iOSPlayVideoInline';

const video = iOSPlayVideoInline(videoEl);
video.play();
video.pause();
```

#### video player

[usfl/media/videoPlayer](../media/videoPlayer.js)

```javascript
import videoPlayer from 'usfl/media/videoPlayer';
videoPlayer(el)
    .on('ready', () => console.log('ready'))
    .on('timeupdate', (time) => console.log('timeupdate', time))
    .on('play', () => console.log('play'))
    .on('pause', () => console.log('pause'))
    .on('ended', () => console.log('ended'))
    .on('error', () => console.log('error'))
    .load(url)
    .play();
```

#### vimeo

[usfl/media/vimeo](../media/vimeo.js)

```javascript
import vimeo from 'usfl/media/vimeo';

vimeo(iframe)
    .on('ready', () => console.log('ready'))
    .on('timeupdate', (time) => console.log('timeupdate', time))
    .on('play', () => console.log('play'))
    .on('pause', () => console.log('pause'))
    .on('ended', () => console.log('ended'));
```

#### youtube

[usfl/media/youtube](../media/youtube.js)

```javascript
import youtube from 'usfl/media/youtube';

youtube(iframe)
    .on('ready', () => console.log('ready'))
    .on('timeupdate', (time) => console.log('timeupdate', time))
    .on('play', () => console.log('play'))
    .on('pause', () => console.log('pause'))
    .on('ended', () => console.log('ended'));
```

#### youtube basic (only play/pause but no need to load JS api)

[usfl/media/youtubeBasic](../media/youtubeBasic.js)

```javascript
import youtubeBasic from 'usfl/media/youtubeBasic';
const video = youtubeBasic(iframe);
video.play();
video.pause();
```

## object pool

[usfl/object-pool](../object-pool/index.js)

```javascript
import objectPool from 'usfl/object-pool';

function foo() {
  return {x: 0, y:0, z: 0};
}
const pool = objectPool(foo);
const foo = pool.get(); // new foo
pool.dispose(foo); // put back in pool
pool.getPool().length // 1

pool.fill(100); // create 100 foos for later use
pool.getPool().length // 101

for(let i = 0; i < 10; i++) {
  const foo = pool.get();
}
pool.getPool().length // 91

pool.empty(); // empty the pool
pool.getPool().length // 0
```

## platform

[usfl/platform](../platform/index.js)

```javascript
platform.android; // boolean
platform.androidNative; // boolean
platform.androidVersion; // number
platform.chromeIOS; // boolean
platform.desktop; // boolean
platform.deviceOrientation; // boolean
platform.firefox; // boolean
platform.ie; // boolean
platform.ieVersion; // number
platform.ios; // boolean
platform.iosVersion; // number
platform.ipad; // boolean
platform.iphone; // boolean
platform.linux; // boolean
platform.localHost; // boolean
platform.mac; // boolean
platform.mobile; // boolean
platform.mp4; // boolean
platform.safari; // boolean
platform.safariIOS; // boolean
platform.screen.width; // number
platform.screen.height; // number
platform.screen.dpr; // number
platform.screen.retina; // boolean
platform.webgl; // boolean
platform.webm; // boolean
platform.windows; // boolean
platform.windowsPhone; // boolean
```

## polyfill

[usfl/polyfill](../polyfill/index.js)

```javascript
// all
import 'usfl/polyfill';

// individual

// Shims broken classList add, remove and toggle in ie10/11
import 'usfl/polyfill/classList';

// Patches missing console methods
import 'usfl/polyfill/console';

// Handles prefixes or fallback to setTimeout
import 'usfl/polyfill/requestAnimationFrame';
```


## popup

[usfl/popup](../popup/index.js)

```javascript
// popup(url, width = 800, height = 600, name = '')
import popup from 'usfl/popup';
popup('http://www.example.com');
```


## share

[usfl/share](../share/index.js)

```javascript
import share from 'usfl/share';
share.whatsapp('http://www.example.com', 'Example');
share.twitter('http://www.example.com');

import whatsapp from 'usfl/share/whatsapp';
whatsapp('http://www.example.com', 'Example');
```


## storage

[usfl/storage](../storage/index.js)

```javascript
import storage from 'usfl/storage';

storage.saveJSON('user', {
  level: 2,
  score: 500,
  lives: 2
});

const user = storage.loadJSON('user');
console.log(user.level); // 2

// save images in localstorage
import getImageDataURL from 'usfl/graphics';
const img = new Image();
img.addEventListener('load', () => {
    storage.saveJSON('foo', {
        name: 'bar',
        offlineImage: getImageDataURL(img);
    });
});
img.src = 'http://www.example.com/foo.jpg';
```


## string

[usfl/string](../string/index.js)

```javascript
import string from 'usfl/string';

string.countOf('Hello World', 'l'); // 3
string.endsWith('Hello World', 'ld'); // true
string.escapeHTML('<p>Hello World</p>'); //
string.hasText('Hello World'); // true
string.isNumeric('Hello World'); // false
string.isNumeric('68769123214'); // true
string.wordCount('Hello World'); // 2
string.similarity('Hello World', str); // 1

string.editDistance('Hello World', 'Hello World'); // 0);
string.editDistance('Hello World', 'Hello World!'); // 1);

string.afterFirst('Hello World', 'l'); // 'lo World'
string.afterLast('Hello World', 'l'); // 'd'
string.beginsWith('Hello World', 'H'); // true
string.beforeFirst('Hello World', 'l'); // 'He'
string.beforeLast('Hello World', 'l'); // 'Hello Wor'
string.between('Hello World', 'H', 'W'); // 'ello '

string.padLeft('Hello World', '_', 12); // '_Hello World'
string.padRight('Hello World', '_', 12); // 'Hello World_'
string.removeExtraWhitespace('Hello     World'); // 'Hello World'
string.remove('Hello World', 'll'); // 'Heo World'
string.truncate('Hello World', 10); // 'Hello...'
//string.truncate('Hello World', 4); // 'Hello...'
string.capitalize('Hello World'.toLowerCase()); // 'Hello world'
string.properCase('Hello World'.toLowerCase()); // 'Hello World'
string.reverse('Hello World'); // 'dlroW olleH'
string.reverseWords('Hello World'); // 'World Hello'
string.stripTags('<p>' + str + '</p>'); // 'Hello World'
string.swapCase('Hello World'); // 'hello World'
// string.block('Hello World'); // 'Hello World'
string.escapePattern('Hello World' + '.'); // 'Hello World\\.'
string.timeCode(217.8); // '00:03:37'

string.preventWidow('Hello World'); // Hello&nbsp;World

import editDistance from 'usfl/string/editDistance';
editDistance('Hello', 'Helllo'); // 1
```


## track

[usfl/track](../track/index.js)

```javascript
import track from 'usfl/track';

track.load('UA-XXX-YYY');
track.page('Home');
track.event(category, action, label, value);
```


## visibility

[usfl/visibility](../visibility/index.js)

```javascript
const visibility from 'usfl/visibility';

visibility.on('hidden', function() {
  videoPlayer.pause();
  audio.mute();
});

visibility.on('shown', function() {
  videoPlayer.play();
  audio.unmute();
});
```
