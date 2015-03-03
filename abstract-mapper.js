(function() {
  var AbstractMapper;

  this.AbstractMapper = AbstractMapper = (function() {
    function AbstractMapper(_map) {
      var i, len, map, mapper;
      if (_map == null) {
        _map = [];
      }
      map = [];
      for (i = 0, len = _map.length; i < len; i++) {
        mapper = _map[i];
        switch (false) {
          case typeof mapper !== 'function':
            map.push(mapper);
            break;
          case !(mapper instanceof Array):
            mapper = new this.constructor(mapper);
            map.push(function() {
              return mapper(this);
            });
        }
      }
      return function() {
        var init, j, len1, length, result;
        init = map[0];
        length = map.length;
        for (j = 0, len1 = map.length; j < len1; j++) {
          mapper = map[j];
          if (!result) {
            result = mapper.apply(this, arguments);
          } else {
            mapper.apply(result, arguments);
          }
        }
        return result;
      };
    }

    return AbstractMapper;

  })();

}).call(this);
