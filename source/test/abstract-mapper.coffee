should = require 'should'
AbstractMapper = require '../abstract-mapper'

describe 'AbstractMapper', ->
  describe '#constructor()', ->
    it 'should return a function', ->
      (new AbstractMapper).should.be.an.instanceOf Function
