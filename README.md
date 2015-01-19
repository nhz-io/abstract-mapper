# Abstract Object Mapper
## Install
### Node
`npm install --save abstract-mapper`

### Browser
* [mapper.js](mapper.js)
* [mapper.min.js](mapper.min.js)

## Usage
### Node
`var AbstractMapper = require('abstract-mapper');`

### Object -> DOM
```javascript
var mapper = new AbstractMapper({
  '!': function() { /* Context Initializer */
    this.target = document.body;
    this.target.innerHTML = '\
      <div class="title"></div>\
      <div class="content"></div>';
  },
  title: function(value) {
    this.target.querySelector('.title').innerHTML = value;
  },
  content: function(value) {
    this.target.querySelector('.content').innerHTML = value;
  }
});

mapper({ title: 'Mapper Demo', content: 'FOOBAR!' });
```

### DOM -> Object
```javascript
var mapper = new AbstractMapper({
  '!': function() { /* Context Initializer */
    this.target = {};
  },
  innerHTML: function() {
    this.target.title = this.data.querySelector('.title').innerHTML;
    this.target.content = this.data.querySelector('.content').innerHTML;
  }
});

mapper(document.body);
```

### Object -> Object
```javascript
var mapper = new AbstractMapper({
  '!': function() { /* Context Initializer */
    this.target = {};
  },
  key: function(value) {
    this.target[key] = value;
  }
});

mapper(document.body);
```

### Array -> Array
```javascript
var mapper = new AbstractMapper({
  '!': function() {
    if(this.idx >= 0) {
      var target = {};
      this.target.push(target);
      this.target = target;
    } else {
      this.target = [];
    }
  },
  key: function(value) {
    this.target.foo = value;
  }
});

var result = mapper([ {key:'foo'}, {key:'bar'} ]);
```

### DOM -> DOM
```javascript
var source, target;
source = document.createElement('div');
target = document.createElement('div');

source.innerHTML = '\
  <div class="foo">FOO!</div>\
  <div class="bar">BAR!</div>';

target.innerHTML = '\
  <div class="foo"></div>\
  <div class="bar"></div>';

document.body.appenChild(source);
document.body.appendChild(target);

var mapper = new AbstractMapper({
  '!': function() { /* Context Initializer */
    this.target = target;
  },
  innerHTML: function() {
    var source, target;
    source = this.data.querySelector('.foo');
    target = this.target.querySelector('.foo');
    target.innerHTML = source.innerHTML;

    source = this.data.querySelector('.bar');
    target = this.target.querySelector('.bar');
    target.innerHTML = source.innerHTML;
  }
});

var result = mapper(source);
```

### Map
```javascript
/* For every method below `this` is set to current Context */
{
  "!": function() { /* Initializer */ },
  key: function(value) { /* Mapper function */},
  deep: { /* Nested Object map */
    key: function(value) { /* Nested Mapper function */ },
    list: [{ /* Nested Array map */
      key: function(value) { /* Executed for each item */}
    }]
  }
}
```

### Context
```javascript
{
  target: {}, /* Mapper target. Set with Initializer */
  parent: null, /* Set to parent Context when nested */
  data: {}, /* Set to the data passed to mapper */
  idx: 0, /* Exists when mapping list item */
  mapper: function(data) { /* Context mapper method */ },
  clone: function() { /* Context clone method */}
}
```
## Benchmark
###  [JSPERF](http://jsperf.com/abstract-mapper)

## License
### [MIT](LICENSE)
