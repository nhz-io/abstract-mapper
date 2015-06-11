module.exports = class AbstractMapper
  constructor: (_map = []) ->
    map = []
    for handler in _map
      switch
        when typeof handler is 'function'
          map.push handler
        when handler instanceof Array
          mapper = new @constructor handler
          map.push do (mapper) -> return -> mapper.apply this, arguments

    return ->
      for handler in map
        unless context
          context = result = handler.apply this, arguments
        else
          result = handler.apply context, arguments
      return result
