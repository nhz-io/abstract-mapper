Base = require './base'
module.exports = class Handler extends Base
  init: (options..., @generator = ->) ->
    unless this instanceof Context
      return new Context @options, handler

    @callback = @generator()
    @context = new Context options, this
    return => @call.apply this, arguments

  call: -> @callback.apply this, argument
