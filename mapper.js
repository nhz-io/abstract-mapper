/*jslint indent: 2, maxlen: 80, browser: true, node: true */
(function () {
  "use strict";
  var Context, AbstractMapper,
    _hasProp = function(object, key) {
      return Object.hasOwnProperty.call(object, key);
    };

  Context = {
    init: function (map, options) {
      var key;
      this.map = map;
      this.target = this.parent = this.data = null;
      for (key in options) {
        if (_hasProp(options, key)) {
          this[key] = options[key];
        }
      }
    },
    mapper: function (data) {
      if (this.map) {
        var i, key, init, value, context, mapper;
        this.data = data;
        init = this.map['!'] || function () { this.target = []; };
        init.call(this);

        if (this.data instanceof Array) {
          for (i = 0; i < this.data.length; i += 1) {
            value = this.data[i];
            context = this.clone();
            context.idx = i;
            context.parent = this;
            context.mapper(value);
          }
        } else {
          for (key in this.map) {
            if (_hasProp(this.map, key) &&
                this.data[key] !== undefined && key !== '!') {

              value = this.data[key];
              mapper = this.map[key];

              if (typeof mapper === 'function') {
                mapper.call(this, value);
              } else {
                context = this.clone();
                context.parent = this;
                context.map = mapper;
                context.mapper(value);
              }
            }
          }
        }
      }
      return this.target;
    },
    clone: function () {
      var result = Object.create(Context);
      result.init(null, this);
      return result;
    }
  };

  AbstractMapper = function (map, options) {
    var context = Object.create(Context);
    context.init(map, options);
    return function mapper(data) {
      return context.mapper(data);
    };
  };

  if (typeof module !== 'undefined') {
    module.exports = AbstractMapper;
  } else if (typeof window !== 'undefined') {
    window.AbstractMapper = AbstractMapper;
  }
}());
