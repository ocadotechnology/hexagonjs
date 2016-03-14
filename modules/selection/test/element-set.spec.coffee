ElementSet = require('modules/selection/main/element-set')

describe 'ElementSet', ->

  it 'should add an element', ->
    s = new ElementSet
    el = document.createElement('div')
    s.add(el)
    s.elements.has(el).should.equal(true)
    s.ids.size.should.equal(1)

  it 'should not add an item twice', ->
    s = new ElementSet
    el = document.createElement('div')
    s.add(el)
    s.add(el)
    s.elements.has(el).should.equal(true)
    s.ids.size.should.equal(1)

  it 'should remove an element', ->
    s = new ElementSet
    el = document.createElement('div')
    s.add(el)
    s.elements.has(el).should.equal(true)
    s.ids.size.should.equal(1)
    s.remove(el)
    s.elements.has(el).should.equal(false)
    s.ids.size.should.equal(0)

  it 'should not do anything if you try and remove an element not in the set', ->
    s = new ElementSet
    el = document.createElement('div')
    el2 = document.createElement('div')
    s.add(el)
    s.elements.has(el).should.equal(true)
    s.ids.size.should.equal(1)
    s.remove(el2)
    s.elements.has(el).should.equal(true)
    s.ids.size.should.equal(1)

  it 'should not do strange things if you remove an element that exists in another set', ->
    s = new ElementSet
    s2 = new ElementSet
    el = document.createElement('div')
    s.add(el)
    s.elements.has(el).should.equal(true)
    s.ids.size.should.equal(1)
    s2.elements.has(el).should.equal(false)
    s2.ids.size.should.equal(0)
    s2.remove(el)
    s.elements.has(el).should.equal(true)
    s.ids.size.should.equal(1)
    s2.elements.has(el).should.equal(false)
    s2.ids.size.should.equal(0)

  it 'should correctly report the elements in the set', ->
    s = new ElementSet
    el1 = document.createElement('div')
    el2 = document.createElement('div')
    s.add(el1)
    s.add(el2)
    s.entries().should.eql([el1, el2])

  it 'should return correctly for has', ->
    s = new ElementSet
    el1 = document.createElement('div')
    el2 = document.createElement('div')
    el3 = document.createElement('div')
    s.add(el1)
    s.add(el2)
    s.has(el1).should.equal(true)
    s.has(el2).should.equal(true)
    s.has(el3).should.equal(false)
