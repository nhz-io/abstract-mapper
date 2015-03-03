module.exports = class AbstractMapper
  constructor: (_map = []) ->
    map = []
    for mapper in _map
      switch
        when typeof mapper is 'function'
          map.push mapper
        when mapper instanceof Array
          mapper = new @constructor mapper
          map.push -> mapper this

    return ->
      init = map[0]
      length = map.length
      for mapper in map
        unless result
          result = mapper.apply this, arguments
        else
          mapper.apply result, arguments
      return result
