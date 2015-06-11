(function() {
  var AbstractMapper;

  this.AbstractMapper = AbstractMapper = (function() {
    function AbstractMapper(_map) {
      var handler, i, len, map, mapper;
      if (_map == null) {
        _map = [];
      }
      map = [];
      for (i = 0, len = _map.length; i < len; i++) {
        handler = _map[i];
        switch (false) {
          case typeof handler !== 'function':
            map.push(handler);
            break;
          case !(handler instanceof Array):
            mapper = new this.constructor(handler);
            map.push((function(mapper) {
              return function() {
                return mapper.apply(this, arguments);
              };
            })(mapper));
        }
      }
      return function() {
        var context, j, len1, result;
        for (j = 0, len1 = map.length; j < len1; j++) {
          handler = map[j];
          if (!context) {
            context = result = handler.apply(this, arguments);
          } else {
            result = handler.apply(context, arguments);
          }
        }
        return result;
      };
    }

    return AbstractMapper;

  })();

}).call(this);
