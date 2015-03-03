# abstract-mapper

## Abstract Object Mapper [![Build Status][travis-image]][travis-url]
[![NPM][npm-image]][npm-url]

## Install
```
npm install --save abstract-mapper
```

## Browser
* [mapper.js](mapper.js)
* [mapper.min.js](mapper.min.js)

## Use
`var AbstractMapper = require('abstract-mapper');`

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
#### 0.1.0
* API is totally different from v0.0.10 (Abusing [CoffeeScript][coffee-url] sugar)
* Added build system ([GULP][gulp-url])
* Added travis-ci


[coffee-url]: https://github.com/jashkenas/coffeescript
[gulp-url]: https://github.com/gulpjs/gulp

[travis-image]: https://travis-ci.org/nhz-io/abstract-mapper.svg
[travis-url]: https://travis-ci.org/nhz-io/abstract-mapper

[npm-image]: https://nodei.co/npm/abstract-mapper.png
[npm-url]: https://nodei.co/npm/abstract-mapper
