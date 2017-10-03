import { DragContainer } from 'modules/drag-container/main'
import { select } from 'modules/selection/main'
import chai from 'chai'

should = chai.should()

export default () ->
  describe 'drag-container', ->
    fixture = undefined

    createDraggableElem = (index) ->
      fixture.append('div').class('hx-drag-element')
        .attr('data-id', index)
        .append('span').class('hx-drag-control').text('Drag Control ' + index)


    beforeEach ->
      fixture = select('body').append('div')

    afterEach ->
      fixture.remove()

    describe 'order', ->
      it 'should ignore elements without data-id by default', ->
        dragContainer = new DragContainer(fixture.node())
        dragContainer.order().should.eql([])

      it 'should get the order correctly', ->
        for i in [1..5]
          createDraggableElem(i)
        dragContainer = new DragContainer(fixture.node())
        dragContainer.order().should.eql(['1','2','3','4','5'])

      it 'should set the order correctly', ->
        for i in [1..5]
          createDraggableElem(i)
        dragContainer = new DragContainer(fixture.node())
        dragContainer.order(['1','3','5','2','4']).should.eql(dragContainer)
        dragContainer.order().should.eql(['1','3','5','2','4'])

      it 'should reset the sort order correctly', ->
        for i in [1..5]
          createDraggableElem(i)
        dragContainer = new DragContainer(fixture.node())
        dragContainer.order().should.eql(['1','2','3','4','5'])
        dragContainer.order(['1','3','5','2','4']).order().should.eql(['1','3','5','2','4'])
        # debugger
        dragContainer.order(undefined).should.eql(dragContainer)
        dragContainer.order().should.eql(['1','2','3','4','5'])

      it 'should ignore incorrect indexes when setting', ->
        for i in [1..5]
          createDraggableElem(i)
        dragContainer = new DragContainer(fixture.node())
        dragContainer.order(['1','3','invalid','5','2','4']).should.eql(dragContainer)
        dragContainer.order().should.eql(['1','3','5','2','4'])

      it 'should append all specified elements after non specified elements', ->
        for i in [1..5]
          createDraggableElem(i)
        dragContainer = new DragContainer(fixture.node())
        dragContainer.order(['2','4']).should.eql(dragContainer)
        dragContainer.order().should.eql(['1','3','5','2','4'])

      it 'should initialise with a specified order', ->
        for i in [1..5]
          createDraggableElem(i)
        dragContainer = new DragContainer(fixture.node(), {
          order: ['1','3','5','2','4']
        })
        dragContainer.order().should.eql(['1','3','5','2','4'])


    describe 'lookup', ->
      it 'should get the lookup function correctly', ->
        dragContainer = new DragContainer(fixture.node())
        should.exist(dragContainer.lookup())

      it 'should initialse with a specified lookup', ->
        for i in [1..5]
          createDraggableElem(i)

        lookup = (elem) -> 'dave'

        dragContainer = new DragContainer(fixture.node(), {
          lookup: lookup
        })
        dragContainer.lookup().should.equal(lookup)

      it 'should set the lookup function correctly', ->
        lookup = (elem) -> 'dave'
        dragContainer = new DragContainer(fixture.node())
        dragContainer.lookup(lookup).should.eql(dragContainer)
        dragContainer.lookup().should.equal(lookup)

      it 'should use the specified lookup function when getting the order', ->
        lookup = (elem) -> select(elem).select('.hx-drag-control').text()
        for i in [1..5]
          createDraggableElem(i)
        dragContainer = new DragContainer(fixture.node())
        dragContainer.lookup(lookup).should.eql(dragContainer)
        dragContainer.order().should.eql(['Drag Control 1','Drag Control 2','Drag Control 3','Drag Control 4','Drag Control 5'])

      it 'should use the specified lookup function when setting the order', ->
        lookup = (elem) -> select(elem).select('.hx-drag-control').text()
        for i in [1..5]
          createDraggableElem(i)
        dragContainer = new DragContainer(fixture.node())
        dragContainer.lookup(lookup).should.eql(dragContainer)
        dragContainer.order(['Drag Control 2','Drag Control 1','Drag Control 5','Drag Control 4','Drag Control 3']).should.eql(dragContainer)
        dragContainer.order().should.eql(['Drag Control 2','Drag Control 1','Drag Control 5','Drag Control 4','Drag Control 3'])


    describe 'setup', ->
      it 'should return the current dragContainer', ->
        dragContainer = new DragContainer(fixture.node())
        dragContainer.setup().should.eql(dragContainer)

