Base = require './base'
Context = require './context'
Handler = require './handler'

module.exports = class Mapper extends Base
  init: (@map) ->
    unless this instanceof Mapper
      return new Context @options, handler
