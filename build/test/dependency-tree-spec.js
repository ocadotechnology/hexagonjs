var chai     = require('chai')
var should   = chai.should()
var dt       = require('../main/dependency-tree')

describe('dependency-tree', function() {

  it('simple example 1', function() {
    dt([
      {name: "a", dependencies: ['b']},
      {name: "b", dependencies: ['c']},
      {name: "c", dependencies: []}
    ]).should.eql(['c', 'b', 'a'])
  })

  it('simple example 2', function() {
    dt([
      {name: "a", dependencies: ['b']},
      {name: "b", dependencies: []},
      {name: "c", dependencies: ['a']}
    ]).should.eql(['b', 'a', 'c'])
  })

  it('simple example 3', function() {
    dt([
      {name: "a", dependencies: ['b', 'c']},
      {name: "b", dependencies: []},
      {name: "c", dependencies: ['b']}
    ]).should.eql(['b', 'c', 'a'])
  })

  it('should be fine with a missing dependencies property', function() {
    dt([
      {name: "a", dependencies: ['b', 'c']},
      {name: "b" },
      {name: "c", dependencies: ['b']}
    ]).should.eql(['b', 'c', 'a'])
  })

  it('should be fine with an empty array being passed in', function() {
    dt([]).should.eql([])
  })

  it('throw when there is a cycle', function() {
    chai.expect(function(){dt([
      {name: "a", dependencies: ['b']},
      {name: "b", dependencies: ['c']},
      {name: "c", dependencies: ['a']}
    ])}).to.throw()
  })

  it('throw when there is a self reference', function() {
    chai.expect(function(){dt([
      {name: "a", dependencies: ['a']}
    ])}).to.throw()
  })

  it('throw when there is a missing reference', function() {
    chai.expect(function(){dt([
      {name: "a", dependencies: ['d']}
    ])}).to.throw()
  })

  it('throw when an item doesnt have a name property', function() {
    chai.expect(function(){dt([
      {name: 'd', dependencies: []},
      {dependencies: ['d']}
    ])}).to.throw()
  })

});
