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

### Generic
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

## Map
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

## Context
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
## License
### [MIT](LICENSE)
