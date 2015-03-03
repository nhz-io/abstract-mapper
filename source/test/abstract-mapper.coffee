should = require 'should'
AbstractMapper = require '../abstract-mapper'

describe 'AbstractMapper', ->
  describe '#constructor()', ->
    it 'should return a mapper function', ->
      (new AbstractMapper).should.be.an.instanceOf Function

  describe '#mapper function', ->
    it 'should transform Object to Object', ->
      mapper = new AbstractMapper [
        -> {}
        ($) -> @original = $
        ($) -> @test = $.test.toUpperCase()
        -> this
      ]

      test = test: 'test'
      result = mapper test
      result.original.should.be.equal test
      result.test.should.be.equal 'TEST'

