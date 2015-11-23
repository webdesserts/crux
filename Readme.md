
Crux
====

The tiny utility library for simplifying prototypical inheritance.

Overview
--------

```js
var Point = Crux.extend()

// formalized initialization
Point.init = function (x, y) {
  this.x = x
  this.y = y
}

// "Instantiate"...
var Shape = Point.extend()

Shape.init = function (x, y, height, width) {
  Point.init.call(this, x, y)
  this.height = height
  this.width = width
}

// ...and Initialize seperately
var rect = Shape.init(1, 1, 10, 20)

// or...

// "Instantiate" and Initialize all in one go
var point = Point.create(10, -3)
point.x // => 10
point.y // => -3


// Create objects from anything. Everything's a "Class"
var square = point.extend()
square.width = 4
square.height = 4
```


Installation
------------
*Crux* is currently available on npm

In the terminals:
```bash
npm install --save @webdesserts/crux
```

In your Javascripts:
```js
var Crux = require('@webdesserts/crux')
```  

Motivation
----------

*Crux* has two goals:

1. Make Prototypical inheritance easier to consume for Classical developers without covering up too many of the details
2. Formalize the stuff that Veteran JavaScript Developers already do.

### Making Prototypes Simpler

Prototypical Inheritance is a great tool that is arguably more powerful and simpler than Classical inheritance. Unfortunately it's extremely difficult for most programmers (including me) to understand at first because of poorly named APIs and old practices that are used in most code examples. Even newer APIs are awkward to use due to the need for backwards compatability.

*Crux* is an ideal. It's what I wish the prototype API was in the first place. It attempts to formalize some of the common practices used in prototypical inheritance, while making the API simpler and easier to understand for those coming from a Classical background.

At the very least I hope it can be used as a learning tool, to help those new to prototypical inheritance see why it's so useful.

Guide
-----

### Creating Objects

In Prototypical Inheritance object creation is a simple two step process. You choose an object to create, and then you choose an object to be it's prototype. The `Object.create()` function does both of these in one go.

**Vanilla Prototypes:**
```js
var Point = {}
var point = Object.create(Point)
```

*Crux* provides two options for creating objects, the first of which is `.extend()`

**Crux:**
```js
var Point = Crux.extend()
var point = Point.extend()
```

### Initialization

If you're coming from Classical inheritance, you might be used to having a *constructor* that initializes your object. In Protypical Inheritance you would normaly create *and* call your constructor manually.

**Vanilla Prototypes:**
```js
var Point = {}

Point.init = function (x, y) {
  this.x = x
  this.y = y
}

var point = Object.create(Point)
point.init(4, 3)
point.x // => 4
point.y // => 3
```

In *Crux* we formalize this this `.init()` function. Just like in the vanilla js example, `.init()` is a user defined function that is completely optional.

**Crux:**
```js
var Point = Crux.extend()

Point.init = function (x, y) {
  this.x = x
  this.y = y
}

var point = Point.extend()
point.init(4, 3)
point.x // => 4
point.y // => 3
```

Well that's not much better! We still have to initialize every object we create. That's going to get really annoying really quick. Well, remember how we said there were two ways to create an object in Crux? That's where `.create()` comes in. The `.create()` method essentially calls `.extend()` and `.init()` all in one go.

```js
// this...
var point = Point.extend().init(4, 3)
// is equivilant to
var point = Point.create(4, 3)
```

### Overriding Initializer

If you are a Classical programmer, you might be used to `super`. Although *Crux* does not provide a special API for this, it is not hard to do.

```js
var Point = Crux.extend()

Point.init = function (x, y) {
  this.x = x
  this.y = y
}

var Shape = Point.extend()

Shape.init = function (x, y, width, height) {
  Point.init.call(this, x, y)
  this.width = width
  this.height = height
}

var square = Shape.create(5, 4, 20, 20)
// => { x: 5, y: 4, width: 20, height: 20 }
```

This may seem a bit annoying compared to just calling `super()`, but with this, your code is more explicit, especially when referencing methods further down the inheritance chain.

### Convenient Prototypes

*Crux* also provides a `.proto` property for conveniently getting and setting an object's prototype via `Object.getPrototypeOf()` and `Object.setPrototypeOf()`.

```js
var Point = Crux.extend()
var point = Point.extend()

Object.getPrototypeOf(point) // => Point
point.proto // => Point

var Vector = Crux.extend()

point.proto = Vector
// equivilant to:
// Object.setPrototypeOf(point, Vector)

Object.getPrototypeOf(point) // => Vector
```

**Note:** right now changing the prototype after creation will deoptimize the object. I think this is unfortunate, as it is one of the features unique to Prototypical Inheritance. It should also be noted that when Crux is available in the browser, be able to use it on older IEs as they do not support either `Object.setPrototypeOf()` or `__proto__`.
