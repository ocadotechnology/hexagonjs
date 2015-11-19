describe 'collapsible', ->
  beforeEach ->
    fixture = hx.select('body').append('div').attr('id', 'fixture').html """
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
    hx.select('#fixture').remove()

  it 'should initialise the target element with openable', ->
    new hx.Collapsible(hx.select('#example').node())
    expect(hx.select('#example').classed('hx-openable')).toEqual(true)

  it 'should initialise with visible if visible is set', ->
    new hx.Collapsible(hx.select('#example').node(), {visible: true})
    expect(hx.select('#example').classed('hx-collapsible-expanded')).toEqual(true)
    expect(hx.select('#example').classed('hx-opened')).toEqual(true)

  it 'should initialise with visible if visible is set to false', ->
    new hx.Collapsible(hx.select('#example').node(), {visible: false})
    expect(hx.select('#example').classed('hx-collapsible-expanded')).toEqual(false)
    expect(hx.select('#example').classed('hx-opened')).toEqual(false)

  it 'should call the lazy function just once', ->
    called = 0
    f = -> called++
    collapsible = new hx.Collapsible(hx.select('#example').node(), {lazyContent: f})
    expect(called).toEqual(0)
    collapsible.show(false)
    expect(called).toEqual(1)
    collapsible.hide(false)
    expect(called).toEqual(1)
    collapsible.show(false)
    expect(called).toEqual(1)
    collapsible.show(false)
    expect(called).toEqual(1)

  it 'should add an icon by default', ->
    collapsible = new hx.Collapsible(hx.select('#example').node())
    expect(hx.select('#example').select('i').size()).toEqual(1)

  it 'should not add an icon if addIcon is false', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false, addIcon: false })
    expect(hx.select('#example').select('i').size()).toEqual(0)

  it 'should remove an existing icon if there is one, then add a new one', ->
    collapsible = new hx.Collapsible(hx.select('#example2').node())
    expect(hx.select('#example2').select('i').classed('existing')).toEqual(false)

  it 'an existing icon should not be touched if addIcon is false', ->
    collapsible = new hx.Collapsible(hx.select('#example2').node(), { visible: false, addIcon: false })
    expect(hx.select('#example2').select('i').classed('existing')).toEqual(true)

  it 'should add an icon by default (with toggle area)', ->
    collapsible = new hx.Collapsible(hx.select('#example3').node())
    expect(hx.select('#example3').select('i').size()).toEqual(1)

  it 'should not add an icon if addIcon is false (with toggle area)', ->
    collapsible = new hx.Collapsible(hx.select('#example3').node(), { visible: false, addIcon: false })
    expect(hx.select('#example3').select('i').size()).toEqual(0)

  it 'should remove an existing icon if there is one, then add a new one (with toggle area)', ->
    collapsible = new hx.Collapsible(hx.select('#example4').node())
    expect(hx.select('#example4').select('i').classed('existing')).toEqual(false)

  it 'an existing icon should not be touched if addIcon is false (with toggle area)', ->
    collapsible = new hx.Collapsible(hx.select('#example4').node(), { visible: false, addIcon: false })
    expect(hx.select('#example4').select('i').classed('existing')).toEqual(true)

  it 'the collapsible should be visible after show is called', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.show(false)
    expect(collapsible.isOpen()).toEqual(true)

  it 'the collapsible should not be visible after hide is called', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.hide(false)
    expect(collapsible.isOpen()).toEqual(false)

  it 'toggle should work as expected', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.show(false)
    collapsible.toggle(false)
    expect(collapsible.isOpen()).toEqual(false)
    collapsible.toggle(false)
    expect(collapsible.isOpen()).toEqual(true)

  it 'the collapsible should be visible after show is called (with animation enabled)', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.show(true)
    expect(collapsible.isOpen()).toEqual(true)

  it 'the collapsible should not be visible after hide is called (with animation enabled)', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.hide(true)
    expect(collapsible.isOpen()).toEqual(false)

  it 'toggle should work as expected (with animation enabled)', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.show(true)
    collapsible.toggle(true)
    expect(collapsible.isOpen()).toEqual(false)
    collapsible.toggle(true)
    expect(collapsible.isOpen()).toEqual(true)

  it 'the collapsible should be visible after show is called (with default animation)', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.show()
    expect(collapsible.isOpen()).toEqual(true)

  it 'the collapsible should not be visible after hide is called (with default animation)', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.hide()
    expect(collapsible.isOpen()).toEqual(false)

  it 'toggle should work as expected (with default animation)', ->
    collapsible = new hx.Collapsible(hx.select('#example').node(), { visible: false })
    collapsible.show()
    collapsible.toggle()
    expect(collapsible.isOpen()).toEqual(false)
    collapsible.toggle()
    expect(collapsible.isOpen()).toEqual(true)

  it 'initializeCollapsibles should work', ->
    collapsibles = hx.initializeCollapsibles('.hx-collapsible')
    expect(collapsibles.length).toEqual(4)
    expect(collapsibles[0]).toEqual(jasmine.any(hx.Collapsible))
    expect(collapsibles[1]).toEqual(jasmine.any(hx.Collapsible))
    expect(collapsibles[2]).toEqual(jasmine.any(hx.Collapsible))
    expect(collapsibles[3]).toEqual(jasmine.any(hx.Collapsible))

  it 'should open when clicked', ->
    collapsible = new hx.Collapsible(hx.select('#example').node())
    collapsible.hide()
    expect(collapsible.isOpen()).toEqual(false)
    hx.select('#example').select('.hx-collapsible-heading').node().__hx__.eventEmitter.emit('click')
    expect(collapsible.isOpen()).toEqual(true)

  it 'should close when clicked', ->
    collapsible = new hx.Collapsible(hx.select('#example').node())
    collapsible.show()
    expect(collapsible.isOpen()).toEqual(true)
    hx.select('#example').select('.hx-collapsible-heading').node().__hx__.eventEmitter.emit('click')
    expect(collapsible.isOpen()).toEqual(false)

  it 'should open when clicked (with toggle area)', ->
    collapsible = new hx.Collapsible(hx.select('#example3').node())
    collapsible.hide()
    expect(collapsible.isOpen()).toEqual(false)
    hx.select('#example3').select('.hx-collapsible-toggle').node().__hx__.eventEmitter.emit('click')
    expect(collapsible.isOpen()).toEqual(true)

  it 'should close when clicked (with toggle area)', ->
    collapsible = new hx.Collapsible(hx.select('#example3').node())
    collapsible.show()
    expect(collapsible.isOpen()).toEqual(true)
    hx.select('#example3').select('.hx-collapsible-toggle').node().__hx__.eventEmitter.emit('click')
    expect(collapsible.isOpen()).toEqual(false)
