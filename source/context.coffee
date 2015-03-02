Base = require './base'
module.exports = class Context extends Base
  init: (@options = {}, handler) ->
    {@root, @parent, @children, @previous, @next} = options
    @handler = handler or @handler
    return this

  clone: -> new @constructor @options, @handler
