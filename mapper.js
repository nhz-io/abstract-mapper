/*jslint indent: 2, maxlen: 80, browser: true, node: true */
(function () {
  "use strict";
  var Context, AbstractMapper;
  Context = function (map, options) {
    var key;
    this.map = map;
    this.type = map instanceof Array ? 'array' : 'object';
    this.target = this.parent = this.data = null;
    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  };

  Context.prototype = {
    mapper: function (data) {
      if (this.map) {
        var i, key, init, value, context, mapper;
        var _hasProp = function(object, key) {
          return Object.hasOwnProperty.call(object, key);
        };

        this.data = data;

        init = this.map['!'] || function () { this.target = []; };
        init.call(this);

        if (data instanceof Array) {
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
                _hasProp(this.data, key) && key !== '!') {

              value = this.data[key];
              mapper = this.map[key];
              if (typeof mapper === 'function') {
                mapper.call(this, value);
              } else {
                context = this.clone();
                context.parent = this;
                context.mapper(value);
              }
            }
          }
        }
      }

      return this.target;
    },
    clone: function () {
      return Object.clone(this);
    }
  };

  AbstractMapper = function (map, options) {
    var context = new Context(map, options);
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
