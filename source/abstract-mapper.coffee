module.exports = class AbstractMapper
  @Context = class Context
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
          last = result = mapper.apply this, arguments
        else
          last = mapper.apply result, arguments
      return last
