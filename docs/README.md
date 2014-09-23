# usfl

# Instances

## array

[array-utils.js](../src/lib/array-utils.js)

Array helpers

>`isArray(arr)` returns boolean  
`sortNumeric(arr)` returns array  
`sortRandom(arr)` returns array  
`getRandom(arr)` returns random item from array

#### Examples

```javascript
var arr = [2,1,3];
usfl.array.isArray(arr); // true
usfl.array.sortNumeric(arr); // [1,2,3]
usfl.array.sortRandom(arr); // [2,1,3]
usfl.array.getRandom(arr); // 1
```


## device

[device.js](../src/lib/device.js)

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
if(usfl.device.ipad && usfl.device.retina) {
  // do something
}
```


## fullscreen

[fullscreen.js](../src/lib/fullscreen.js)

Wrapper for browser fullscreen API

>`isSupported` returns boolean  
`enter()`  
`exit()`  
`toggle()`  
`isFullscreen()` returns boolean

#### Examples

```javascript
if(usfl.fullscreen.isSupported) {
  btnFullscreen.classList.add('is-visible');

  btnFullscreen.addEventListener('click', function() {
    usfl.fullscreen.toggle();
  });
}
```


## keyboard

[keyboard.js](../src/lib/keyboard.js)

Hashmap of constants for keyCodes

#### Examples

```javascript
function onKeyDown(event) {
    event.preventDefault();
    if(event.keyCode === usfl.keyboard.P) {
      // P key is down
    }
}
```


## math

[math-utils.js](../src/lib/math-utils.js)

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
usfl.math.angle(0, 0, -1, 0); // Math.PI
usfl.math.clamp(100, 0, 50)); // 50);
usfl.math.coinToss(); // true or false
usfl.math.degrees(Math.PI); // 180
usfl.math.difference(-20, 20); // 40
usfl.math.distance(0, 0, 1, 1); // 1.41421356237 (Math.SQRT2)
usfl.math.distanceSQ(0, 0, 1, 1); // 2
usfl.math.getCirclePoints(0, 0, 8, 8).length; // 8;
usfl.math.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2); // 2
usfl.math.lerp(0, 1, 0.2); // 0.2
usfl.math.map(0.75, 0, 1, -100, 100)); // 50
usfl.math.radians(180); // Math.PI
usfl.math.random(0, 100); // 45
usfl.math.rotateToDEG(359, 1); // 361
usfl.math.rotateToRAD(Math.PI * 2, Math.PI) // 9.42477796076938 (Math.PI * 3)
usfl.math.roundToNearest(96.5, 10); // 100
```


## share

[share.js](../src/lib/share.js)

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
usfl.share.facebook('http://www.example.com');
```


## storage

[storage-utils.js](../src/lib/storage-utils.js)

Local storage wrapper, including image to dataUrl

>`saveJSON(key, object)`  
`loadJSON(key)` returns object  
`getImageDataURL(img, width, height)` returns dataURL string

#### Examples

```javascript
usfl.storage.saveJSON('user', {
  level: 2,
  score: 500,
  lives: 2
});

var user = usfl.storage.loadJSON('user');
console.log(user.level); // 2

// save images in localstorage
var img = new Image();
img.src = 'http://www.example.com/foo.jpg';
img.onload = function() {
  var user = {
    name: 'foo',
    offlineImage: usfl.storage.getImageDataURL(img);
  };
  usfl.storage.saveJSON('user', user);
};
```


## string

[string-utils.js](../src/lib/string-utils.js)

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
usfl.string.capitalize('hello world', true); // 'Hello World'
usfl.string.padLeft('1', 4); // '0001'
usfl.string.stripTags('<p>Hello</p>'); // 'Hello'
usfl.string.contains('Hello World', 'World'); // true
usfl.string.isNumeric('8797865'); // true
usfl.string.between('Hello [World]', '[', ']'); // World
usfl.string.editDistance('Hello', 'Helllo'); // 1
```


## track

[track.js](../src/lib/track.js)

Google Analytics util

>`init(gaAccount)`  
`page(value)`  
`page(category, action, label, value)`

#### Examples

```javascript
usfl.track.init('UA-XXX-YYY');
usfl.track.page('Home');
usfl.track.event('Foo', 'Bar');
```


## urlParams

[url-params.js](../src/lib/url-params.js)

Query string parameters to object

#### Examples

```javascript
// Browser address is: http://www.example.com/?debug=true&level=2

if(usfl.urlParams.debug) {
  // do something
}

var level = usfl.urlParams.level; // 2
```


## visibility

[visibility.js](../src/lib/visibility.js)

Wrapper for browser visibility API

>`onPageHidden` // returns Signal  
`onPageShown` // returns Signal


#### Examples

```javascript
usfl.visibility.onPageHidden.add(function() {
  videoPlayer.pause();
  audio.mute();
});

usfl.visibility.onPageShown.add(function() {
  videoPlayer.play();
  audio.unmute();
});
```


# Constructors


## AssetLoader

[asset-loader.js](../src/lib/asset-loader.js)

Batch loads images, audio and json files.

#### Examples

```javascript
var assetLoader = new usfl.AssetLoader();
assetLoader.add('images/foo.jpg');
assetLoader.add('images/bar.jpg');
assetLoader.onProgress.add(function(progress) {
  // progress 0 to 1
});
assetLoader.onChildComplete.add(function(loader) {
  // something loaded
});
assetLoader.onComplete.add(function(loaders) {
  // finished
});
assetLoader.start();
```


## Boid

[boid.js](../src/lib/boid.js)

Steering behaviours

#### Examples

```javascript
var gfx = new usfl.Graphics();

var wanderer = new usfl.Boid();
    wanderer.setBounds(gfx.width, gfx.height);
    wanderer.position.x = 400;
    wanderer.position.y = 400;

var seeker = new usfl.Boid();
    seeker.setBounds(gfx.width, gfx.height);
    seeker.position.x = 10;
    seeker.position.y = 10;

function update() {
    window.requestAnimationFrame(update);

    wanderer.wander();
    wanderer.update();

    seeker.seek(wanderer.position);
    seeker.update();

    gfx.clear();

    gfx.fill('#00FF00');
    gfx.circle(wanderer.position.x, wanderer.position.y, 10);

    gfx.fill('#0000FF');
    var angle = mouseSeeker.velocity.angle + Math.PI / 2;
    gfx.triangle(seeker.position.x, seeker.position.y, 30, 40, angle);
}
update();
```


## FPS

[fps.js](../src/lib/fps.js)

Simple FPS counter

#### Examples

```javascript
var fps = new usfl.FPS();

function update() {
  window.requestAnimationFrame(update);
  // update stuff
  fps.update();
}
update();

// use pre-existing element
var el = document.querySelector('.Fps');
var fps = new usfl.FPS(el);

```


## Graphics

[graphics.js](../src/lib/graphics.js)

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

#### Examples

```javascript
var graphics = new usfl.Graphics();
graphics.background('#FFFF00')
graphics.fill('#00FF00');
graphics.circle(200, 200, 10);

```


## InputCoords

[input-coords.js](../src/lib/input-coords.js)

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
var inputCoords = new usfl.InputCoords();
inputCoords.on(); // start listening
inputCoords.off(); // stop listening
var x = inputCoords.x; // x position of pointer
var p = inputCoords.percentX; // x position of pointer as percentage of window
```


## KeyInput

[key-input.js](../src/lib/key-input.js)

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
var keyInput = new usfl.KeyInput();
var p = keyInput.isDown(usfl.keyboard.P); // P key is pressed
var left = keyInput.left(); // left arrow or A is pressed
keyInput.off(); // stop listening
keyInput.on(); // start listening again
```


## LinkedList

[linked-list.js](../src/lib/linked-list.js)

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


## ObjectPool

[object-pool.js](../src/lib/object-pool.js)

Reuse objects for performance

>`ObjectPool(Type)` returns instance  
`getPool()` returns array  
`get()` returns instance  
`dispose(instance)`  
`fill(count)`  
`empty()`  

#### Examples

```javascript
function Foo() {
  // something
}
var pool = new usfl.ObjectPool(Foo);
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

## Vec2

[vec2.js](../src/lib/vec2.js)

2d vector

>`Vec2.get(x, y)` returns Vec2  
`add(vec, overwrite)` returns Vec2  
`subtract(vec, overwrite)` returns Vec2  
`multiply(vec, overwrite)` returns Vec2  
`divide(vec, overwrite)` returns Vec2  
`normalize()` returns Vec2  
`isNormalized()` returns boolean  
`truncate(max)` returns Vec2  
`scaleBy(mul)` returns Vec2  
`divideBy(div)` returns Vec2  
`equals(vec)` returns boolean  
`negate()` returns Vec2  
`reverse()` returns Vec2  
`dotProduct(vec)` returns number  
`crossProduct(vec)` returns number  
`distanceSquared(vec)` returns number  
`distance(vec)` returns number  
`clone()` returns Vec2  
`zero()` returns Vec2  
`isZero()` returns boolean  
`reset()` returns Vec2  
`perpendicular()` returns Vec2  
`sign(vec)` returns number  
`set(x, y)` returns Vec2  
`dispose()`  
`Vec2.angleBetween()` returns number  
`lengthSquared` returns number  
`length` returns number  
`angle` returns number  

#### Examples

```javascript
var velocity = Vec2.get(1,1);
var position = Vec2.get(2,2);
position.add(velocity, true);
console.log(position.x, position.y); // 3, 3
```


## VideoObject

[video-object.js](../src/lib/video-object.js)

Wrapper for Video media element

>`onReady` returns Signal  
`onPlay` returns Signal  
`onError` returns Signal  
`onEnded` returns Signal  
`onTimeUpdate` returns Signal  
`create()`  
`load(url)`  
`forceLoad(pauseDelay)`  
`unload()`  
`destroy()`  
`play()`  
`pause()`  
`seek(time)`  
`getBufferProgress()`  
`getReadyStateString()`  
`getNetworkStateString()`  
`getErrorStateString()`  
`getElement()`  
`getVolume()`  
`setVolume(value)

## Viewport

[viewport.js](../src/lib/viewport.js)

Manager for a user defined viewport

>`init(width, height)`  
`mouseLeftWindow(fn, context)`  
`getWindowWidth()` returns number  
`getWindowHeight()` returns number  
`getScrollTop()` returns number  
`getWindowScrollY()` returns number  
`getDocHeight()` returns number  
`getScrollPercentage()` returns number  
`onResize` returns Signal  
`originalHeight` returns number  
`originalWidth` returns number  
`rect` returns Object  
`resize()`  


#### Examples

```javascript
Viewport.init(640, 360);
Viewport.resize();
Viewport.originalWidth; // 640
Viewport.rect.x; // number
Viewport.rect.stageWidth;
Viewport.rect.scale;
Viewport.getScrollTop();
Viewport.getWindowScrollY();
Viewport.getDocHeight();
Viewport.getScrollPercentage();
});
```


# Functions


## popup

[popup.js](../src/lib/popup.js)

Pop up window

>`popup(url, name, width, height)` returns boolean

#### Examples

```javascript
usfl.popup('http://www.example.com', 'example', 640, 480);
```


## ready

[ready.js](../src/lib/ready.js)

Dom ready

>`ready()`

#### Examples

```javascript
usfl.ready(function() {
  // something
});
```


## resize

[resize.js](../src/lib/resize.js)

Resize a rectangle maintaining aspect ratio

>`resize(rect, areaWidth, areaHeight, autoCenter, method)`

#### Examples

```javascript
var rect = { x:0, y:0, width: 640, height: 360 };
// fill up the area completely and center
usfl.resize(rect, window.innerWidth, window.innerHeight, true, 'fill');
// fit within the area and center
usfl.resize(rect, window.innerWidth, window.innerHeight, true, 'fit');
```


## raf polyfill

[raf-polyfill.js](../src/lib/raf-polyfill.js)

Handle need for prefix or fallback to setTimeout


# Not included in bundle


## Facebook

[facebook.js](../src/lib/facebook.js)

>`init()`  
`login()`  
`onInit` returns Signal  
`onInfo` returns Signal  
`utils`  
`getInfo(permissions, fields)`

#### Examples

```javascript
var facebook = new Facebook(appId);
facebook.onInfo.add(function(response) {
    console.log(response);
});
facebook.onInit.add(function() {
    facebook.getInfo();
});
facebook.init();
```


## Flash

[flash.js](../src/lib/flash.js)

>`Flash(element, url, embedvars, flashvars)`  
`embed()`  
`getFlashObject` returns SWF  
`ready()`  
`call(functionName, args)`  
`onEmded` returns Signal  
`onReady` returns Signal

#### Examples

```javascript
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


## Modern

[modern.js](../src/lib/modern.js)

Basic feature detection to detect a 'modern' browser

#### Examples

```javascript
var modern = require('modern.js');
if(modern) {
    // modern browser
}
if(Modernizr.modern) {
    // modern browser
}
```
