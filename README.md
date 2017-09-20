# usfl

[![NPM version](https://badge.fury.io/js/usfl.svg)](http://badge.fury.io/js/usfl) [![Bower version](https://badge.fury.io/bo/usfl.svg)](http://badge.fury.io/bo/usfl) [![Build Status](https://secure.travis-ci.org/ianmcgregor/usfl.png)](https://travis-ci.org/ianmcgregor/usfl)

A collection of tested, reusable JS utilities and snippets.

### Installation

```shell
npm install usfl --save
```

### Usage

```javascript
// individual module
import randomChoice from 'usfl/array/random-choice';
const chosen = randomChoice([1, 2, 3]);

// group
import array from 'usfl/array';
const chosen = array.randomChoice([1, 2, 3]);

// everything
import usfl from 'usfl';
const chosen = usfl.array.randomChoice([1, 2, 3]);
```

### Docs

[usfl/array](docs/README.md#array)

[usfl/dom](docs/README.md#dom)

[usfl/events](docs/README.md#events)

[usfl/fps](docs/README.md#fps)

[usfl/fullscreen](docs/README.md#fullscreen)

[usfl/graphics](docs/README.md#graphics)

[usfl/http](docs/README.md#http)

[usfl/input](docs/README.md#input)

[usfl/linked-list](docs/README.md#linkedlist)

[usfl/loop](docs/README.md#loop)

[usfl/math](docs/README.md#math)

[usfl/media](docs/README.md#media)

[usfl/object-pool](docs/README.md#objectpool)

[usfl/platform](docs/README.md#platform)

[usfl/polyfill](docs/README.md#polyfill)

[usfl/popup](docs/README.md#popup)

[usfl/share](docs/README.md#share)

[usfl/storage](docs/README.md#storage)

[usfl/string](docs/README.md#string)

[usfl/track](docs/README.md#track)

[usfl/visibility](docs/README.md#visibility)


### Dev setup

To install dependencies:

```
$ npm i
```

To run tests:

```
$ npm i -g karma-cli
$ karma start
```
