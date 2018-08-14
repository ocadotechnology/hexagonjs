import { select } from 'utils/selection'

import { Collapsible, initializeCollapsibles } from 'components/collapsible'

export default () ->
  describe 'collapsible', ->

    beforeEach ->
      fixture = select('body').append('div').attr('id', 'fixture').node().innerHTML = """
        <div id="example" class="hx-collapsible">
          <div class="hx-collapsible-heading">Header</div>
          <div class="hx-collapsible-content">Content</div>
        </div>

        <div id="example2" class="hx-collapsible">
          <div class="hx-collapsible-heading"><i class="existing"></i>Header</div>
          <div class="hx-collapsible-content">Content</div>
        </div>

        <div id="example3" class="hx-collapsible">
          <div class="hx-collapsible-heading">
            <div class="hx-collapsible-toggle"></i>Header</div>
          </div>
          <div class="hx-collapsible-content">Content</div>
        </div>

        <div id="example4" class="hx-collapsible">
          <div class="hx-collapsible-heading">
            <div class="hx-collapsible-toggle"><i class="existing"></i>Header</div>
          </div>
          <div class="hx-collapsible-content">Content</div>
        </div>
      """

    afterEach ->
      select('#fixture').remove()

    it 'should initialise the target element with openable', ->
      new Collapsible(select('#example').node())
      select('#example').classed('hx-openable').should.equal(true)

    it 'should initialise with visible if visible is set', ->
      new Collapsible(select('#example').node(), {visible: true})
      select('#example').classed('hx-collapsible-expanded').should.equal(true)
      select('#example').classed('hx-opened').should.equal(true)

    it 'should initialise with visible if visible is set to false', ->
      new Collapsible(select('#example').node(), {visible: false})
      select('#example').classed('hx-collapsible-expanded').should.equal(false)
      select('#example').classed('hx-opened').should.equal(false)

    it 'should call the lazy function just once', ->
      called = 0
      f = -> called++
      collapsible = new Collapsible(select('#example').node(), {lazyContent: f})
      called.should.equal(0)
      collapsible.show(false)
      called.should.equal(1)
      collapsible.hide(false)
      called.should.equal(1)
      collapsible.show(false)
      called.should.equal(1)
      collapsible.show(false)
      called.should.equal(1)

    it 'should add an icon by default', ->
      collapsible = new Collapsible(select('#example').node())
      select('#example').select('i').size().should.equal(1)

    it 'should not add an icon if addIcon is false', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false, addIcon: false })
      select('#example').select('i').size().should.equal(0)

    it 'should remove an existing icon if there is one, then add a new one', ->
      collapsible = new Collapsible(select('#example2').node())
      select('#example2').select('i').classed('existing').should.equal(false)

    it 'an existing icon should not be touched if addIcon is false', ->
      collapsible = new Collapsible(select('#example2').node(), { visible: false, addIcon: false })
      select('#example2').select('i').classed('existing').should.equal(true)

    it 'should add an icon by default (with toggle area)', ->
      collapsible = new Collapsible(select('#example3').node())
      select('#example3').select('i').size().should.equal(1)

    it 'should not add an icon if addIcon is false (with toggle area)', ->
      collapsible = new Collapsible(select('#example3').node(), { visible: false, addIcon: false })
      select('#example3').select('i').size().should.equal(0)

    it 'should remove an existing icon if there is one, then add a new one (with toggle area)', ->
      collapsible = new Collapsible(select('#example4').node())
      select('#example4').select('i').classed('existing').should.equal(false)

    it 'an existing icon should not be touched if addIcon is false (with toggle area)', ->
      collapsible = new Collapsible(select('#example4').node(), { visible: false, addIcon: false })
      select('#example4').select('i').classed('existing').should.equal(true)

    it 'the collapsible should be visible after show is called', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.show(false)
      collapsible.isOpen().should.equal(true)

    it 'the collapsible should not be visible after hide is called', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.hide(false)
      collapsible.isOpen().should.equal(false)

    it 'toggle should work as expected', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.show(false)
      collapsible.toggle(false)
      collapsible.isOpen().should.equal(false)
      collapsible.toggle(false)
      collapsible.isOpen().should.equal(true)

    it 'the collapsible should be visible after show is called (with animation enabled)', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.show(true)
      collapsible.isOpen().should.equal(true)

    it 'the collapsible should not be visible after hide is called (with animation enabled)', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.hide(true)
      collapsible.isOpen().should.equal(false)

    it 'toggle should work as expected (with animation enabled)', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.show(true)
      collapsible.toggle(true)
      collapsible.isOpen().should.equal(false)
      collapsible.toggle(true)
      collapsible.isOpen().should.equal(true)

    it 'the collapsible should be visible after show is called (with default animation)', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.show()
      collapsible.isOpen().should.equal(true)

    it 'the collapsible should not be visible after hide is called (with default animation)', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.hide()
      collapsible.isOpen().should.equal(false)

    it 'toggle should work as expected (with default animation)', ->
      collapsible = new Collapsible(select('#example').node(), { visible: false })
      collapsible.show()
      collapsible.toggle()
      collapsible.isOpen().should.equal(false)
      collapsible.toggle()
      collapsible.isOpen().should.equal(true)

    it 'initializeCollapsibles should work', ->
      collapsibles = initializeCollapsibles('.hx-collapsible')
      collapsibles.length.should.equal(4)
      collapsibles[0].should.be.an.instanceOf(Collapsible)
      collapsibles[1].should.be.an.instanceOf(Collapsible)
      collapsibles[2].should.be.an.instanceOf(Collapsible)
      collapsibles[3].should.be.an.instanceOf(Collapsible)

    it 'should open when clicked', ->
      collapsible = new Collapsible(select('#example').node())
      collapsible.hide()
      collapsible.isOpen().should.equal(false)
      select('#example').select('.hx-collapsible-heading').node().__hx__.eventEmitter.emit('click')
      collapsible.isOpen().should.equal(true)

    it 'should close when clicked', ->
      collapsible = new Collapsible(select('#example').node())
      collapsible.show()
      collapsible.isOpen().should.equal(true)
      select('#example').select('.hx-collapsible-heading').node().__hx__.eventEmitter.emit('click')
      collapsible.isOpen().should.equal(false)

    it 'should open when clicked (with toggle area)', ->
      collapsible = new Collapsible(select('#example3').node())
      collapsible.hide()
      collapsible.isOpen().should.equal(false)
      select('#example3').select('.hx-collapsible-toggle').node().__hx__.eventEmitter.emit('click')
      collapsible.isOpen().should.equal(true)

    it 'should close when clicked (with toggle area)', ->
      collapsible = new Collapsible(select('#example3').node())
      collapsible.show()
      collapsible.isOpen().should.equal(true)
      select('#example3').select('.hx-collapsible-toggle').node().__hx__.eventEmitter.emit('click')
      collapsible.isOpen().should.equal(false)
