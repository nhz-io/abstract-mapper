# abstract-mapper

## Abstract Object Mapper [![Build Status][travis-image]][travis-url]
[![NPM][npm-image]][npm-url]

Utility class to generate a **mapper function** from the array of
**handler functions**. The array of handler functions is passed
as a first argument ot the `AbstractMapper` constructor. The **first**
handler function in the array being a **context initializer**.

The result of context initializer is passed as `thisarg` to every
subsequent handler function. Each handler function receives the
same arguments. The result of the **last** handler function is the value
that the mapper function will return.

The array of handler functions that is passed to `AbstractMapper`
constructor, can also contain **nested arrays**. In this case, a **nested mapper**
will be constructed from this array. This nested mapper will be called with
the same `thisarg`, as the rest of the handler functions.

This module was created with [CoffeeScript][coffeescript-url] in mind.

## Install
```
npm install --save abstract-mapper
```

## Browser
* [abstract-mapper.js](abstract-mapper.js)
* [abstract-mapper.min.js](abstract-mapper.min.js)

## Usage

```coffeescript
mapper = new AbstractMapper [
  (args...) -> ...    # Init
  (args...) -> ...
  [                   # Nested mapper
    (args...) -> ...
    (args...) -> ...
  ]
  (args...) -> ...    # Result
]
```

## Examples

### Object -> Object, Swap keys and values
```coffeescript
  mapper = new AbstractMapper [
    -> {}
    ($) -> this[value] = key for key, value of $
    -> this
  ]
```

### Explode Object recursively
```coffeescript
  mapper = new AbstractMapper [
    -> if this instanceof Array then this else []

    ($) ->
      nested = []
      for key, value of $
        if typeof value is 'object'
          nested.push value
        else
          result = {}
          result[key] = value
          @push result

      for data in nested
        mapper.call this, data

    -> this
  ]
```

### JSON -> DOM
```coffeescript
  mapper = new AbstractMapper [
    ($) -> if typeof $ is 'string' then textMapper $ else nodeMapper $
  ]

  textMapper = new AbstractMapper [ ($) -> document.createTextNode $ ]

  nodeMapper = new AbstractMapper [
    ($) -> document.createElement $.element or 'div'
    ($) -> @className = $.class if $.class
    ($) -> @setAttribute 'style', $.style if $.style
    ($) -> @appendChild mapper child for child in $.children or []
    -> this
  ]
```

### DOM -> JSON
```coffeescript
  mapper = new AbstractMapper [
    ($) -> if $.nodeType is 3 then textMapper $ else nodeMapper $
  ]

  textMapper = new AbstractMapper [ ($) -> $.data ]

  nodeMapper = new AbstractMapper [
    -> {}
    ($) -> @element = $.nodeName.toLowerCase()
    ($) -> @class = $.className if $.className
    ($) -> @style = style if style = $.getAttribute? 'style'
    ($) -> @children = [] if $.childNodes.length
    ($) -> @children.push mapper child for child in $.childNodes
    -> this
  ]
```

Build
-----
```
git clone https://github.com/nhz-io/abstract-mapper.git
cd abstract-mapper
npm install
gulp
```

## Benchmark
###  [JSPERF](http://jsperf.com/abstract-mapper/6)

LICENSE
-------
#### [MIT](LICENSE)

VERSION
-------
#### 0.1.5
* More README, More meaningful variable names

#### 0.1.4
* Removed junk rudiment (AbstractMapper.Context)

#### 0.1.3
* Fixed `RangeError: Maximum call stack size exceeded` on nested mappers

#### 0.1.2
* Added empty `Context` class under `AbstractMapper.Context`

#### 0.1.1
* Fixed [.npmignore](.npmignore) to exclude only browser dist files

#### 0.1.0
* API is totally different from v0.0.10 (Abusing [CoffeeScript][coffeescript-url] sugar)
* Added build system ([GULP][gulp-url])
* Added travis-ci


[coffeescript-url]: https://github.com/jashkenas/coffeescript
[gulp-url]: https://github.com/gulpjs/gulp

[travis-image]: https://travis-ci.org/nhz-io/abstract-mapper.svg
[travis-url]: https://travis-ci.org/nhz-io/abstract-mapper

[npm-image]: https://nodei.co/npm/abstract-mapper.png
[npm-url]: https://nodei.co/npm/abstract-mapper
