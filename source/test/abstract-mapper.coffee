should = require 'should'
AbstractMapper = require '../abstract-mapper'

describe 'AbstractMapper', ->
  describe '#constructor()', ->
    it 'should return a mapper function', ->
      (new AbstractMapper).should.be.an.instanceOf Function

  describe '#mapper function', ->
    it 'should swap object keys and values', ->
      mapper = new AbstractMapper [
        -> {}
        ($) -> this[value] = key for key, value of $
        -> this
      ]

      test = mapper key1:'value1', key2:'value2'
      test.value1.should.be.equal 'key1'
      test.value2.should.be.equal 'key2'

    it 'should explode the object into key:value pairs', ->
      mapper = new AbstractMapper [
        -> if this instanceof Array then this else []
        ($) ->
          nested = []
          for key, value of $
            if typeof value is 'object'
              nested.push value
            else
              result = {}
              result[key] = value
              @push result

          for data in nested
            mapper.call this, data
        -> this
      ]

      test = mapper
        key1: 'value1'
        nested1:
          key2: 'value2'
          nested2:
            key3: 'value3'

      test.length.should.be.equal 3
      test[0].key1.should.be.equal 'value1'
      test[1].key2.should.be.equal 'value2'
      test[2].key3.should.be.equal 'value3'
