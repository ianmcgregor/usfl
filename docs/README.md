# usfl

# Instances

## array

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


## css (for ie9, Android 2)

>`addClass(el, className)`  
`hasClass(el, className)` returns boolean  
`removeClass(el, className)`  
`toggleClass(el, className)`

#### Examples

```javascript
usfl.css.addClass(el, 'is-selected');
usfl.css.hasClass(el, 'is-selected'); // true
usfl.css.removeClass(el, 'is-selected');
usfl.css.toggleClass(el, 'is-selected');
```


## device

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


## event (for ie8)

>`addEvent(el, type, fn)`  
`removeEvent(el, type, fn)`

#### Examples

```javascript
usfl.event.addEvent(el, 'click', clickHandler);
usfl.event.removeEvent(el, 'click', clickHandler);
```


## fullscreen

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

Various social media share options


## storage

Local storage wrapper, including image to dataUrl


## string

String utils


## urlParams

Query string parameters to object


## visibility

Wrapper for browser visibility API


# Constructors

## AssetLoader

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

## AudioManager

Manage audio


## Boid

Steering behaviours

#### Examples

```javascript
var gfx = new Graphics();

var wanderer = new Boid();
    wanderer.setBounds(gfx.width, gfx.height);
    wanderer.position.x = 400;
    wanderer.position.y = 400;

var seeker = new Boid();
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
var graphics = new Graphics();
graphics.background('#FFFF00')
graphics.fill('#00FF00');
graphics.circle(200, 200, 10);

```

## HTMLAudio

Wrapper for Audio tag

## InputCoords

Keeps track of user input position

## KeyInput

Check if keys are down

## LinkedList

Linked List

## ObjectPool

Reuse objects for performance

## StateMachine

Finite State Machine

## Vec2

2d vector

## VideoObject

Wrapper for Video media element

## Viewport

Manager for a user defined viewport

## WebAudio

WebAudio API wrapper


# Functions

## popup

## ready

## resize

## console patch

## raf Polyfill


# Not included in bundle

## Facebook

## Flash
