# usfl



## array

[array.js](../array.js)

Array helpers

>`clone(arr)` returns array  
`getRandom(arr)` returns random item from array  
`isArray(arr)` returns boolean  
`nearest(value, arr)` returns number (index of item nearest to value)  
`sortNumeric(arr)` returns array  
`sortRandom(arr)` returns array  

#### Examples

```javascript
var array = require('usfl/array');
var arr = [2,1,3];
array.clone(arr); // [2,1,3]
array.getRandom(arr); // 1
array.isArray(arr); // true
array.nearest(2.3, arr); // 0
array.sortNumeric(arr); // [1,2,3]
array.sortRandom(arr); // [1,3,2]
```




## AssetLoader

[AssetLoader.js](../AssetLoader.js)

Batch loads images, audio and json files.

#### Examples

```javascript
var AssetLoader = require('usfl/AssetLoader');

var assetLoader = new AssetLoader();
assetLoader.add('images/foo.jpg');
assetLoader.add('images/bar.jpg');
assetLoader.on('progress', function(progress) {
  // progress 0 to 1
});
assetLoader.on('child', function(loader) {
  // something loaded
});
assetLoader.on('complete', function(loaders) {
  // finished
});
assetLoader.start();
```



## device

[device.js](../device.js)

UserAgent things for when Modernizr isn't enough

>`android` boolean  
`androidOld` boolean  
`androidStock` boolean  
`dpr` number  
`ie8down` boolean  
`ie9down` boolean  
`ieVersion` number  
`ios` boolean  
`ios5` boolean  
`ipad` boolean  
`iphone` boolean  
`ipod` boolean  
`mobile` boolean  
`retina` boolean  
`screenHeight` number  
`screenWidth` number  

#### Examples

```javascript
var device = require('usfl/device');
if(device.ipad && device.retina) {
  // do something
}
```



## Emitter

[Emitter.js](../Emitter.js)

Decorates standard events.EventEmitter with 'off' method.

>`off()`  
`off(name)`  
`off(name, fn)`

#### Examples

```javascript
var Emitter = require('usfl/Emitter');
var foo = Object.create(Emitter.prototype, {
    bar: {
        value: function() {
            this.emit('hi', 0);
        }
    }
});
var log = function(value) {
    console.log(value);
};
foo.on('hi', log);
// remove all handlers
foo.off();
// remove handler listening for 'hi'
foo.off('hi');
// remove handler with specific signature
foo.off('hi', log);
```



## Facebook

[Facebook.js](../Facebook.js)

>`init()`  
`login()`  
`on('init', fn)`  
`on('info', fn)`  
`utils`  
`getInfo(permissions, fields)`

#### Examples

```javascript
var Facebook = require('usfl/Facebook');
var facebook = new Facebook(appId);
facebook.on('info', function(response) {
    console.log(response);
});
facebook.once('init', function() {
    facebook.getInfo();
});
facebook.init();
```


## Flash

[Flash.js](../Flash.js)

>`Flash(element, url, embedvars, flashvars)`  
`embed()`  
`getFlashObject` returns SWF  
`ready()`  
`call(functionName, args)`  
`on('embed', fn)`  
`on('ready', fn)`  

#### Examples

```javascript
var Flash = require('usfl/Flash');
var el = document.querySelector('.Flash');
var flash = new Flash(el, 'flash.swf', {
  version: '11.2.0',
  width: 640,
  height: 360,
  bgColor: '#000000'
}, {
  debug: true,
  foo: 'bar'
});
flash.embed();
```


## Fps

[Fps.js](../Fps.js)

Simple FPS counter

#### Examples

```javascript
var Fps = require('usfl/Fps');

var fps = new Fps();

function update() {
  window.requestAnimationFrame(update);
  // update stuff
  fps.update();
}
update();

// use pre-existing element
var el = document.querySelector('.Fps');
var fps = new Fps(el);

```




## fullscreen

[fullscreen.js](../fullscreen.js)

Wrapper for browser fullscreen API

>`isSupported` returns boolean  
`enter()`  
`exit()`  
`toggle()`  
`isFullscreen()` returns boolean

#### Examples

```javascript
var fullscreen = require('usfl/fullscreen');

if(fullscreen.isSupported) {
  btnFullscreen.classList.add('is-visible');

  btnFullscreen.addEventListener('click', function() {
    fullscreen.toggle();
  });
}
```



## Graphics

[Graphics.js](../Graphics.js)

Canvas drawing abstraction

>`init(canvas)` canvas is optional  
`size(width, height)` if width and height are undefined window innerWidth/Height are used  
`clear(color)` clear with optional colour  
`background(r, g, b)`  
`fill(r, g, b, a)`  
`stroke(r, g, b, a)`  
`strokeWeight(w)`  
`move(x, y)`  
`line(x1, y1, x2, y2)`  
`rect(x, y, width, height, angle)`  
`circle(x, y, radius)`  
`triangle(x, y, width, height, angle)`  
`triangleABC(x1, y1, x2, y2, x3, y3)`  
`image(img, x, y, angle)`  
`cross(radius)`  
`text(str, x, y)`  
`textFont(font)`  
`textSize(size)`  
`openImage()`  
`downloadImage()`  
`getImageData()`  
`getPixel(x, y)`  
`setPixel(x, y, r, g, b, a)`  
`eachPixel(fn)`

#### Examples

```javascript
var Graphics = require('usfl/Graphics');

var graphics = new Graphics();
graphics.background('#FFFF00')
graphics.fill('#00FF00');
graphics.circle(200, 200, 10);

```


## InputCoords

[InputCoords.js](../InputCoords.js)

Keeps track of user input position

>`x` returns number  
`y` returns number  
`percentX` returns number  
`percentY` returns number  
`isListening` returns boolean  
`on()`  
`off()`

#### Examples

```javascript
var InputCoords = require('usfl/InputCoords');

var inputCoords = new InputCoords();
inputCoords.on(); // start listening
inputCoords.off(); // stop listening
var x = inputCoords.x; // x position of pointer
var p = inputCoords.percentX; // x position of pointer as percentage of window
```



## keyboard

[keyboard.js](../keyboard.js)

Hashmap of constants for keyCodes

#### Examples

```javascript
var keyboard = require('usfl/keyboard');

function onKeyDown(event) {
    event.preventDefault();
    if(event.keyCode === keyboard.P) {
      // P key is down
    }
}
```


## KeyInput

[KeyInput.js](../KeyInput.js)

Check if keys are down, with helpers for WASD and arrow keys

>`on()`  
`off()`  
`isDown(key)` // returns boolean  
`left()` // returns boolean  
`right()` // returns boolean  
`up()` // returns boolean  
`down()` // returns boolean  
`space()` // returns boolean

#### Examples

```javascript
var KeyInput = require('usfl/KeyInput');

var keyInput = new KeyInput();
var p = keyInput.isDown(keyboard.P); // P key is pressed
var left = keyInput.left(); // left arrow or A is pressed
keyInput.off(); // stop listening
keyInput.on(); // start listening again
```


## LinkedList

[LinkedList.js](../LinkedList.js)

Linked List

>`add(item)` returns item  
`remove(item)` returns item  
`insertAfter(item, after)` returns item  
`insertBefore(item, before)` returns item  
`forEach(callback, callbackContext)`  
`getFirst()` returns item  
`getLast()` returns item  
`getCount()` returns number  

#### Examples

```javascript
var LinkedList = require('usfl/LinkedList');

function ListItem(name) {
  this.name = name;
  this.next = null;
  this.prev = null;
}
var linkedList = new LinkedList();
linkedList.add(new ListItem('a'));
linkedList.add(new ListItem('b'));
linkedList.add(new ListItem('c'));

linkedList.getCount(); // 3
linkedList.getFirst().name; // 'a'
linkedList.getLast().name; // 'c'

var item = linkedList.getFirst();
while(item.next) {
  console.log(item.name);
  item = item.next;
}

linkedList.forEach(function(item) {
  console.log(item.name);
});

//linkedList.remove
//linkedList.insertBefore(item, before);
```




## math

[math.js](../math.js)

>`angle(x1, y1, x2, y2)` returns angle in radians between two points  
`clamp(value, min, max)` returns number between min and max  
`coinToss()` returns boolean  
`crossProduct(aX, aY, bX, bY)` returns (2d) cross product  
`degrees(radians)` returns angle converted to degrees  
`difference(a, b)` returns difference between a and b  
`distance(x1, y1, x2, y2)` returns distance between a and b  
`distanceSQ(x1, y1, x2, y2)` returns square distance between a and b  
`dotProduct(aX, aY, bX, bY)` returns dot product of a and b  
`getCirclePoints(originX, originY, radius, count, start, Class)` returns array of points  
`getIntersectionArea(aX, aY, aW, aH, bX, bY, bW, bH)` returns area of overlap  
`getOverlapX(aX, aW, bX, bW)` returns amount of horizontal overlap  
`getOverlapY(aY, aH, bY, bH)` returns amount of vertical overlap  
`lerp(from, to, percent)` returns interpolated value  
`map(v, a, b, x, y)` returns value within range a to b mapped to range x to y  
`radians(degrees)` returns angle converted to radians  
`random(min, max)` returns random number betwen min and max  
`rotateToDEG(start, end)` returns rotation difference appended to start rotation  
`rotateToRAD(start, end)` returns rotation difference appended to start rotation  
`roundToNearest(value, unit)` returns number rounded to nearest unit sepcified  

#### Examples

```javascript
var math = require('usfl/math');

math.angle(0, 0, -1, 0); // Math.PI
math.clamp(100, 0, 50)); // 50);
math.coinToss(); // true or false
math.degrees(Math.PI); // 180
math.difference(-20, 20); // 40
math.distance(0, 0, 1, 1); // 1.41421356237 (Math.SQRT2)
math.distanceSQ(0, 0, 1, 1); // 2
math.getCirclePoints(0, 0, 8, 8).length; // 8;
math.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2); // 2
math.lerp(0, 1, 0.2); // 0.2
math.map(0.75, 0, 1, -100, 100)); // 50
math.radians(180); // Math.PI
math.random(0, 100); // 45
math.rotateToDEG(359, 1); // 361
math.rotateToRAD(Math.PI * 2, Math.PI) // 9.42477796076938 (Math.PI * 3)
math.roundToNearest(96.5, 10); // 100
```




## Modern

[modern.js](../modern.js)

Basic feature detection to detect a 'modern' browser

#### Examples

```javascript
var modern = require('usfl/modern');
if(modern) {
    // modern browser
}
if(Modernizr.modern) {
    // modern browser
}
```


## MouseWheel

[MouseWheel.js](../MouseWheel.js)

Cross-browser mouse wheel util

>`MouseWheel(speed)` returns instance  
`add()` listen again after remove  
`remove()` stop listening  
`on('update', fn)`
`on('up', fn)`
`on('down', fn)`


#### Examples

```javascript
var MouseWheel = require('usfl/MouseWheel');

var mouseWheel = new MouseWheel(5);
mouseWheel.on('update', function(delta) {
    console.log('mouse wheel moved:', delta);
});
mouseWheel.on('up', function() {
    console.log('mouse wheel moved up');
});
mouseWheel.on('down', function() {
    console.log('mouse wheel moved down');
});
```


## ObjectPool

[ObjectPool.js](../ObjectPool.js)

Reuse objects for performance

>`ObjectPool(Type)` returns instance  
`getPool()` returns array  
`get()` returns instance  
`dispose(instance)`  
`fill(count)`  
`empty()`  

#### Examples

```javascript
var ObjectPool = require('usfl/ObjectPool');

function Foo() {
  // something
}
var pool = new ObjectPool(Foo);
var foo = pool.get(); // new instance of Foo
pool.dispose(foo); // put back in pool
pool.getPool().length // 1

pool.fill(100); // create 100 Foo instances for later use
pool.getPool().length // 101

for(var i = 0; i < 10; i++) {
  var foo = pool.get();
}
pool.getPool().length // 91

pool.empty(); // empty the pool
pool.getPool().length // 0
```


## popup

[popup.js](../popup.js)

Pop up window

>`popup(url, name, width, height)` returns boolean

#### Examples

```javascript
var popup = require('usfl/popup');
popup('http://www.example.com', 'example', 640, 480);
```

## ready

[ready.js](../ready.js)

Dom ready

>`ready()`

#### Examples

```javascript
var ready = require('usfl/ready');
ready(function() {
  // something
});
```


## resize

[resize.js](../resize.js)

Resize a rectangle maintaining aspect ratio

>`resize(rect, areaWidth, areaHeight, autoCenter, method)`

#### Examples

```javascript
var resize = require('usfl/resize');
var rect = { x:0, y:0, width: 640, height: 360 };
// fill up the area completely and center
resize(rect, window.innerWidth, window.innerHeight, true, 'fill');
// fit within the area and center
resize(rect, window.innerWidth, window.innerHeight, true, 'fit');
```



## share

[share.js](../share.js)

Various social media share options

>`facebook(url)`  
`twitter(url, text, hashtags, related)`  
`googlePlus(url)`  
`pinterest(url, picture, text)`  
`vkontakte(url, title, description, image)`  
`renren(url, title)`  
`weibo(url, title, image)`  
`facebookFeedDialog(appId, title, link, picture, source, caption, description, redirectURL)`

#### Examples

```javascript
var share = require('usfl/share');
share.facebook('http://www.example.com');
```


## storage

[storage.js](../storage.js)

Local storage wrapper, including image to dataUrl

>`saveJSON(key, object)`  
`loadJSON(key)` returns object  
`getImageDataURL(img, width, height)` returns dataURL string

#### Examples

```javascript
var storage = require('usfl/storage');

storage.saveJSON('user', {
  level: 2,
  score: 500,
  lives: 2
});

var user = storage.loadJSON('user');
console.log(user.level); // 2

// save images in localstorage
var img = new Image();
img.src = 'http://www.example.com/foo.jpg';
img.onload = function() {
  var user = {
    name: 'foo',
    offlineImage: storage.getImageDataURL(img);
  };
  storage.saveJSON('user', user);
};
```


## string

[string.js](../string.js)

Utilities for working with strings

>Helper:  
`escapePattern(pattern)` returns escaped string  
Format:  
`trim(str)` returns string  
`trimLeft(str)` returns string  
`trimRight(str)` returns string  
`padLeft(str, substr, length)` returns string  
`padRight(str, substr, length)` returns string  
`removeExtraWhitespace(str)` returns string  
`remove(str, substr, caseSensitive)` returns string  
`truncate(str, len, suffix)` returns string  
`capitalize(str, all)` returns string  
`properCase(str)` returns string  
`reverse(str)` returns string  
`reverseWords(str)` returns string  
`stripTags(str)` returns string  
`swapCase(str)` returns string  
`timeCode(seconds, delim)` returns string  
Query:  
`beginsWith(str, substr)` returns boolean  
`contains(str, substr)` returns boolean  
`countOf(str, substr, caseSensitive)` returns number  
`endsWith(str, substr)` returns boolean  
`hasText(str)` returns boolean  
`isEmpty(str)` returns boolean  
`isNumeric(str)` returns boolean  
`wordCount(str)` returns number  
Substring:  
`afterFirst(str, substr)` returns string  
`afterLast(str, substr)` returns string  
`beforeFirst(str, substr)` returns string  
`beforeLast(str, substr)` returns string  
`between(str, start, end)` returns string  
Utility:  
`block(str, len, delim)` returns array  
`editDistance(source, target)` returns number  
`similarity(a, b)` returns number

#### Examples

```javascript
var string = require('usfl/string');

string.capitalize('hello world', true); // 'Hello World'
string.padLeft('1', 4); // '0001'
string.stripTags('<p>Hello</p>'); // 'Hello'
string.contains('Hello World', 'World'); // true
string.isNumeric('8797865'); // true
string.between('Hello [World]', '[', ']'); // World
string.editDistance('Hello', 'Helllo'); // 1
```


## track

[track.js](../track.js)

Google Analytics util

>`init(gaAccount)`  
`page(value)`  
`page(category, action, label, value)`

#### Examples

```javascript
var track = require('usfl/track');

track.init('UA-XXX-YYY');
track.page('Home');
track.event('Foo', 'Bar');
```


## urlParams

[urlParams.js](../urlParams.js)

Query string parameters to object

#### Examples

```javascript
var urlParams = require('usfl/urlParams');

// Browser address is: http://www.example.com/?debug=true&level=2

if(urlParams.debug) {
  // do something
}

var level = urlParams.level; // 2
```




## VideoPlayer

[VideoPlayer.js](../VideoPlayer.js)

Wrapper for Video media element

>`on('ready', fn)`  
`on('play', fn)`  
`on('error', fn)`  
`on('ended', fn)`  
`on('timeupdate', fn)`  
`create()`  
`load(url)`  
`unload()`  
`destroy()`  
`play()`  
`pause()`  
`seek(time)`
`el`  
`currentTime`  
`duration`  
`volume`  

## Viewport

[viewport.js](../viewport.js)

Manager for a user defined viewport

>`init(width, height)`  
`mouseLeftWindow(fn, context)`  
`getWindowWidth()` returns number  
`getWindowHeight()` returns number  
`getScrollTop()` returns number  
`getWindowScrollY()` returns number  
`getDocHeight()` returns number  
`getScrollPercentage()` returns number  
`on('resize', fn)`
`originalHeight` returns number  
`originalWidth` returns number  
`rect` returns Object  
`resize()`  


#### Examples

```javascript
var viewport = require('usfl/viewport');

viewport.init(640, 360);
viewport.resize();
viewport.originalWidth; // 640
viewport.rect.x; // number
viewport.rect.stageWidth;
viewport.rect.scale;
viewport.getScrollTop();
viewport.getWindowScrollY();
viewport.getDocHeight();
viewport.getScrollPercentage();
});
```


## visibility

[visibility.js](../visibility.js)

Wrapper for browser visibility API

>`on('hidden', fn)`
`on('shown', fn)`  


#### Examples

```javascript
var visibility = require('usfl/visibility');

visibility.on('hidden', function() {
  videoPlayer.pause();
  audio.mute();
});

visibility.on('shown', function() {
  videoPlayer.play();
  audio.unmute();
});
```



## polyfills

[polyfill-classlist.js](../polyfill-classlist.js)

Shims broken classList.add, classList.remove and classList.toggle in ie10 and ie11

[polyfill-console.js](../polyfill-console.js)

Patches missing console methods

[polyfill-raf.js](../polyfill-raf.js)

Handles need for prefix or fallback to setTimeout

#### Examples

```javascript
require('usfl/polyfill-classlist');
require('usfl/polyfill-console');
require('usfl/polyfill-raf');
```
