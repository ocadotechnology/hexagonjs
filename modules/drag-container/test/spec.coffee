describe 'drag-container', ->
  fixture = undefined
  dragContainer = undefined
  body = hx.select('body').append('div').class('fixture')

  createDraggableElem = (index) ->
    fixture.append('div').class('hx-drag-element')
      .attr('data-id', index)
      .append('span').class('hx-drag-control').text('Drag Control ' + index)


  beforeEach ->
    body.clear()
    fixture = body.append('div')
    for i in [1..5]
      createDraggableElem(i)
    dragContainer = new hx.DragContainer(fixture.node())


  describe 'order', ->
    it 'should ignore elements without data-id by default', ->
      fixture.clear()
      for i in [1..5]
        createDraggableElem()
      dragContainer.order().should.eql([])

    it 'should get the order correctly', ->
      dragContainer.order().should.eql(['1','2','3','4','5'])

    it 'should set the order correctly', ->
      dragContainer.order(['1','3','5','2','4']).should.eql(dragContainer)
      dragContainer.order().should.eql(['1','3','5','2','4'])

    it 'should reset the sort order correctly', ->
      initialOrder = ['1','2','3','4','5']
      dragContainer.order().should.eql(initialOrder)
      dragContainer.order(['1','3','5','2','4']).should.eql(dragContainer)
      dragContainer.order().should.eql(['1','3','5','2','4'])
      dragContainer.order(undefined).should.eql(dragContainer)
      dragContainer.order().should.eql(initialOrder)

    it 'should ignore incorrect indexes when setting', ->
      dragContainer.order(['1','3','invalid','5','2','4']).should.eql(dragContainer)
      dragContainer.order().should.eql(['1','3','5','2','4'])

    it 'should append all specified elements after non specified elements', ->
      dragContainer.order(['2','4']).should.eql(dragContainer)
      dragContainer.order().should.eql(['1','3','5','2','4'])

    it 'should initialise with a specified order', ->
      body.clear()
      fixture = body.append('div')
      for i in [1..5]
        createDraggableElem(i)
      dragContainer = new hx.DragContainer(fixture.node(), {
        order: ['1','3','5','2','4']
      })
      dragContainer.order().should.eql(['1','3','5','2','4'])


  describe 'lookup', ->
    it 'should get the lookup function correctly', ->
      should.exist(dragContainer.lookup())

    it 'should initialse with a specified lookup', ->
      body.clear()
      fixture = body.append('div')
      for i in [1..5]
        createDraggableElem(i)

      lookup = (elem) -> 'dave'

      dragContainer = new hx.DragContainer(fixture.node(), {
        lookup: lookup
      })
      dragContainer.lookup().should.equal(lookup)

    it 'should set the lookup function correctly', ->
      lookup = (elem) -> 'dave'
      dragContainer.lookup(lookup).should.eql(dragContainer)
      dragContainer.lookup().should.equal(lookup)

    it 'should use the specified lookup function when getting the order', ->
      lookup = (elem) -> hx.select(elem).select('.hx-drag-control').text()
      dragContainer.lookup(lookup).should.eql(dragContainer)
      dragContainer.order().should.eql(['Drag Control 1','Drag Control 2','Drag Control 3','Drag Control 4','Drag Control 5'])

    it 'should use the specified lookup function when setting the order', ->
      lookup = (elem) -> hx.select(elem).select('.hx-drag-control').text()
      dragContainer.lookup(lookup).should.eql(dragContainer)
      dragContainer.order(['Drag Control 2','Drag Control 1','Drag Control 5','Drag Control 4','Drag Control 3']).should.eql(dragContainer)
      dragContainer.order().should.eql(['Drag Control 2','Drag Control 1','Drag Control 5','Drag Control 4','Drag Control 3'])


  describe 'setup', ->
    it 'should return the current dragContainer', ->
      dragContainer.setup().should.eql(dragContainer)
