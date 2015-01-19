# Abstract Object Mapper
## Usage

```javascript
var mapper = new AbstractMapper({
  '!': function() { /* Context Initializer */
    this.target = document.body;
    this.target.innerHTML = '<div class="title"></div><div class="content"></div>';
  },
  title: function(value) {
    this.target.getElementsByClassName('title')[0].innerHTML = value;
  },
  content: function(value) {
    this.target.getElementsByClassName('content')[0].innerHTML = value;
  }
});

mapper({ title: 'Mapper Demo', content: 'FOOBAR!' });
```

## License
### [MIT](LICENSE)
