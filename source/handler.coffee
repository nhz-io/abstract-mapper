Base = require './base'
module.exports = class Handler extends Base
  init: (options..., @generator = ->) ->
    @callback = @generator()
    @context = new Context options, this
    return => @call.apply this, arguments

  call: -> @callback.apply this, argument
