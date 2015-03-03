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

    return (data) ->
      for mapper in map
        result = mapper.call this, data
      return result
