describe 'hx-dropdown', ->

  windowSize = 1000
  savedHxLoop = undefined
  button = undefined
  content = '<div style="padding:10px; width: 100px">Content</div>'
  id = '#button'

  fixture = undefined

  getWindowMeasurement = (horizontal, scroll) ->
    if scroll then 0
    else windowSize

  # Fixes firefox's unexplained decimal test failures
  roundAll = (box) ->
    for key, value of box
      box[key] = Math.round value
    box

  getSpacing = (dd) -> dd.options.spacing or Number(hx.theme.dropdown.spacing)

  fakeNodeEvent = (node, eventName) ->
    if node?
      (e) -> hx.select.getHexagonElementDataObject(node).eventEmitter?.emit((if eventName? and isNaN(eventName) then eventName else 'click'), e)

  makeButton = ->
    fixture.append('div')
      .attr('id', id.slice(1))
      .style('width', '100px')
      .style('height', '50px')
      .style('position', 'absolute')
      .style('top', '50%')
      .style('left', '50%')
      .style('margin', '-50px -25px 0 0')
      .text('button')

  beforeAll ->

    console.log(hx.select('head').node())
    console.log(hx.select('body').node())

    #hx.select('body').clear()

    hx._.dropdown.attachToSelector = '#dropdown-fixture'

    hx.select('body')
      .style('height', '1000px')
      .style('width', '1000px')

    fixture = hx.select('body').append('div')
      .style('padding', '0')
      .style('margin', '0')
      .style('width', '1000px')
      .style('height', '1000px')
      .style('position', 'relative')
      .attr('id', 'dropdown-fixture')

    console.log(fixture.width(), fixture.height())

    window.innerHeight = 1000
    window.innerWidth = 1000
    # mock hx.loop
    hx_requestAnimationFrame = (f) ->
      setTimeout(f, 1)
    hx_loop_update = (f, g) -> if not f() then hx_requestAnimationFrame(g)
    savedHxLoop = hx.loop
    hx.loop = hx_loop = (f) ->
      g = -> hx_loop_update(f, g)
      hx_loop_update(f, g)
    jasmine.clock().install()
    baseTime = new Date(2013, 0, 1)
    jasmine.clock().mockDate(baseTime)

  afterAll ->
    fixture.remove()
    hx.loop = savedHxLoop
    jasmine.clock().uninstall()
    hx.select('body')
      .style('padding', '')
      .style('margin', '')
      .style('width', '')
      .style('height', '')
      .style('position', '')
      .clear()

  beforeEach ->
    button = makeButton()

  afterEach ->
    hx.component(id).cleanUp()
    hx.selectAll('.hx-dropdown').remove()
    button = undefined
    fixture.clear()


  it 'should throw an error when passing in the wrong thing for dropdownContent', ->
    spyOn(console, 'error')
    dd = new hx.Dropdown(id, hx.detached('div'))
    dd.show()
    expect(console.error).toHaveBeenCalledWith('hexagon: dropdownContent is not a valid type ' + id)

  it 'should create a dropdown object with the correct default options', ->
    dd = new hx.Dropdown(id, content)

    expect(dd.selector).toEqual(id)
    expect(dd.selection).toEqual(button)
    expect(dd.dropdownContent).toEqual(content)
    expect(getSpacing(dd)).toEqual(0)
    expect(dd.options.matchWidth).toEqual(true)
    expect(dd.alignments).toEqual('lblt'.split(''))
    expect(dd.dropdown).not.toBeDefined()
    expect(dd.visible).toEqual(false)
    expect(dd.options.ddClass).toEqual('')
    expect(dd.options.mode).toEqual('click')


  it 'should set the mode correctly for click', ->
    dd = new hx.Dropdown(id, content, {mode: 'click'})

    expect(dd.selection.node().__hx__.eventEmitter.has('click')).toEqual(true)
    expect(dd.selection.node().__hx__.eventEmitter.has('mouseover')).toEqual(false)
    expect(dd.selection.node().__hx__.eventEmitter.has('mouseout')).toEqual(false)

    dd = new hx.Dropdown(id, content, {mode: 'hover'})
    expect(dd.selection.node().__hx__.eventEmitter.has('click')).toEqual(true)
    expect(dd.selection.node().__hx__.eventEmitter.has('mouseover')).toEqual(true)
    expect(dd.selection.node().__hx__.eventEmitter.has('mouseout')).toEqual(true)


  it 'should set the alignment correctly', ->
    dd = new hx.Dropdown(id, content, {align: 'rbrb'})
    expect(dd.alignments).toEqual('rbrb'.split(''))

  it 'should use the right alignment option when a named align value is used', ->
    dd = new hx.Dropdown(id, content, {align: 'up'})
    expect(dd.alignments).toEqual('ltlb'.split(''))

    dd = new hx.Dropdown(id, content, {align: 'down'})
    expect(dd.alignments).toEqual('lblt'.split(''))

    dd = new hx.Dropdown(id, content, {align: 'left'})
    expect(dd.alignments).toEqual('ltrt'.split(''))

    dd = new hx.Dropdown(id, content, {align: 'right'})
    expect(dd.alignments).toEqual('rtlt'.split(''))

  it 'should set the spacing correctly', ->
    dd = new hx.Dropdown(id, content, {spacing: 10} )
    expect(getSpacing(dd)).toEqual(10)


  # it 'should use the spacing correctly', ->
  #   dd = new hx.Dropdown(id, content, {spacing: 10})
  #   dd.show()
  #   buttonBox = button.box()
  #   jasmine.clock().tick(301)
  #   console.log(hx.select('body').node())
  #   ddBox = dd.dropdown.box()
  #   expect(ddBox.left).toEqual(buttonBox.left)
  #   expect(ddBox.top).toEqual(buttonBox.top + buttonBox.height + getSpacing(dd))


  it 'should set the matchWidth property correctly', ->
    dd = new hx.Dropdown(id, content, {matchWidth: false} )
    expect(dd.options.matchWidth).toEqual(false)

    dd = new hx.Dropdown(id, content, {matchWidth: true} )
    expect(dd.options.matchWidth).toEqual(true)

  it 'should set the ddClass correctly', ->
    dd = new hx.Dropdown(id, content, { ddClass: 'bob' })
    expect(dd.options.ddClass).toEqual('bob')

  it 'should call toggle the selector is clicked in click mode', ->
    dd = new hx.Dropdown(id, content)
    spyOn(dd, 'toggle')
    dd.selection.node().__hx__.eventEmitter.emit('click')
    expect(dd.toggle).toHaveBeenCalled()

  it 'should call show/hide on mouseover/mouseout in hover mode', ->
    dd = new hx.Dropdown(id, content, {mode: 'hover'})
    spyOn(dd, 'show')
    spyOn(dd, 'hide')
    spyOn(dd, 'toggle')

    dd.selection.node().__hx__.eventEmitter.emit('mouseover')
    expect(dd.show).toHaveBeenCalled()

    dd.selection.node().__hx__.eventEmitter.emit('mouseout')
    expect(dd.hide).toHaveBeenCalled()

    dd.selection.node().__hx__.eventEmitter.emit('click')
    expect(dd.toggle).toHaveBeenCalled()

  it 'should correctly detect if the dropdown is open', ->
    dd = new hx.Dropdown(id, content)
    expect(dd.isOpen()).toEqual(false)
    dd.show()
    expect(dd.isOpen()).toEqual(true)
    dd.hide()
    expect(dd.isOpen()).toEqual(false)
    dd.toggle()
    expect(dd.isOpen()).toEqual(true)
    dd.toggle()
    expect(dd.isOpen()).toEqual(false)

  it 'should exist on the page when opened and set the visible property to true', ->
    dd = new hx.Dropdown(id, content)
    expect(dd.visible).toEqual(false)
    expect(hx.select('.hx-dropdown').empty()).toEqual(true)

    dd.selection.node().__hx__.eventEmitter.emit('click')

    expect(dd.visible).toEqual(true)
    expect(hx.select('.hx-dropdown').empty()).toEqual(false)
    expect(hx.select('.hx-dropdown').html()).toEqual(content)

  it 'should not do anything if show is called and the dropdown is already open', ->
    dd = new hx.Dropdown(id, content)
    expect(dd.visible).toEqual(false)
    expect(hx.select('.hx-dropdown').empty()).toEqual(true)

    dd.show()
    expect(dd.visible).toEqual(true)
    expect(hx.select('.hx-dropdown').empty()).toEqual(false)
    expect(hx.select('.hx-dropdown').html()).toEqual(content)

    dd.show()
    expect(dd.visible).toEqual(true)
    expect(hx.select('.hx-dropdown').empty()).toEqual(false)
    expect(hx.select('.hx-dropdown').html()).toEqual(content)

  it 'should not do anything if hide is called and the dropdown is already closed', ->
    dd = new hx.Dropdown(id, content)
    spyOn(dd.clickDetector, 'off')
    expect(dd.visible).toEqual(false)
    expect(hx.select('.hx-dropdown').empty()).toEqual(true)

    dd.hide()
    expect(dd.visible).toEqual(false)
    expect(hx.select('.hx-dropdown').empty()).toEqual(true)
    expect(dd.clickDetector.off).not.toHaveBeenCalled()

  it 'should call the clean up the click detector', ->
    dd = new hx.Dropdown(id, content)
    spyOn(dd.clickDetector, 'cleanUp')
    dd.cleanUp()
    expect(dd.clickDetector.cleanUp).toHaveBeenCalled()

  it 'should call hide when an element other than the button is clicked', ->
    dd = new hx.Dropdown(id, content)
    spyOn(dd, 'hide')
    dd.show()
    document.__hx__.eventEmitter.emit('pointerdown', { event: {target: fixture.node()}})
    document.__hx__.eventEmitter.emit('pointerup', { event: {target: fixture.node()}})
    expect(dd.hide).toHaveBeenCalled()

  it 'should detect parent z-index and set the index to be 1 greater', ->
    fixture.style('z-index', 100)
    dd = new hx.Dropdown(id, content)
    dd.show()
    expect(dd.dropdown.style('z-index')).toEqual('101')

  it 'should detect parent position and match it correctly', ->
    fixture.style('position', 'fixed')

    dd = new hx.Dropdown(id, content)
    dd.show()
    expect(dd.dropdown.style('position')).toEqual('fixed')

  it 'should render correctly using a function as content', ->
    populate = (elem) ->
      hx.select(elem).append('div').class('bob').text('Dave')

    dd = new hx.Dropdown(id, populate)

    dd.show()
    # uses fixture bg as hex gets converted to different things by different browsers
    expect(dd.dropdown.select('.bob').text()).toEqual('Dave')


  it 'should class the dropdown with the supplied dd class', ->
    dd = new hx.Dropdown(id, content, {ddClass: 'bob'})
    dd.show()
    expect(dd.dropdown.classed('bob')).toEqual(true)

  it 'should show and hide correctly', ->
    dd = new hx.Dropdown(id, content)

    expect(dd.visible).toEqual(false)
    expect(hx.select('.hx-dropdown').empty()).toEqual(true)

    dd.show()
    expect(dd.visible).toEqual(true)
    expect(hx.select('.hx-dropdown').empty()).toEqual(false)

    dd.hide()
    expect(dd.visible).toEqual(false)
    expect(hx.select('.hx-dropdown').empty()).toEqual(true)

  it 'should set the overflow style when the useScroll option is specified', ->
    dd = new hx.Dropdown(id, content)
    dd.useScroll = true
    dd.show()
    jasmine.clock().tick(300)
    expect(dd.dropdown.style('overflow-y')).toEqual('auto')

  it 'shouldnt try to match the width of the parent if matchWidth is false', ->
    button.text('Wider button for testing')
    bWidth = button.width()

    dd = new hx.Dropdown(id, content, {matchWidth: false })

    dd.show()
    expect(dd.dropdown.style('min-width')).toEqual('0px')
    jasmine.clock().tick(301)

  it 'should try to match the width of the parent if matchWidth is true', ->
    button.text('Wider button for testing')

    dd = new hx.Dropdown(id, content, {matchWidt: true })

    dd.show()
    expect(dd.dropdown.style('min-width')).toEqual(button.style('width'))
    jasmine.clock().tick(301)

  it 'should detect the maxHeight properly', ->
    hx.select('head').append('style').attr('id','style').attr('type', 'text/css').text("""
      .hx-dropdown{
        max-height: 5px;
      }
    """)

    buttonBox = roundAll button.box()

    dd = new hx.Dropdown(id, content)
    dd.show()
    setTimeout ->
      ddBox = roundAll dd.dropdown.box()
      expect(dd.dropdown.style('max-height')).toEqual('5px')
      expect(ddBox.left).toEqual(buttonBox.left)
      expect(ddBox.height).toEqual(5)
      hx.select('#style').remove()
    , 300
    jasmine.clock().tick(301)

  it 'should shift the dropdown down if shifting it up has moved it off the top of the screen', ->
    dd = new hx.Dropdown(id, content, {align: 'up'})

    button.style('top', '5px')

    buttonBox = roundAll button.box()
    dd.show()
    setTimeout ->
      ddBox = roundAll dd.dropdown.box()
      expect(ddBox.top).toEqual(buttonBox.top + buttonBox.height + getSpacing(dd))
      expect(ddBox.left).toEqual(buttonBox.left)
    , 300
    jasmine.clock().tick(301)


  describe 'align', ->
    button = undefined
    buttonBox = undefined
    dd = undefined
    ddBox = undefined

    beforeEach ->
      buttonBox = roundAll button.box()

    describe 'should align correctly when align is set to', ->
      tests = [
          align: null
          check: ->
            expect(ddBox.left).toEqual(buttonBox.left)
            expect(ddBox.top).toEqual(buttonBox.bottom + getSpacing(dd))
        ,
          align: 'up'
          check: ->
            expect(ddBox.left).toEqual(buttonBox.left)
            expect(ddBox.top).toEqual(buttonBox.top - ddBox.height - getSpacing(dd))
        ,
          align: 'down'
          check: ->
            expect(ddBox.left).toEqual(buttonBox.left)
            expect(ddBox.top).toEqual(buttonBox.bottom + getSpacing(dd))
        ,
          align: 'left'
          check: ->
            expect(ddBox.right).toEqual(buttonBox.left - getSpacing(dd))
            expect(ddBox.top).toEqual(buttonBox.top)
        ,
          align: 'right'
          check: ->
            expect(ddBox.left).toEqual(buttonBox.right + getSpacing(dd))
            expect(ddBox.top).toEqual(buttonBox.top)
        ,
          align: 'lbrb'
          check: ->
            expect(ddBox.right).toEqual(buttonBox.left - getSpacing(dd))
            expect(ddBox.bottom).toEqual(buttonBox.bottom)
        ,
          align: 'lbrt'
          check: ->
            expect(ddBox.right).toEqual(buttonBox.left - getSpacing(dd))
            expect(ddBox.top).toEqual(buttonBox.top + buttonBox.height + getSpacing(dd))
        ,
          align: 'ltrb'
          check: ->
            expect(ddBox.right).toEqual(buttonBox.left - getSpacing(dd))
            expect(ddBox.bottom).toEqual(buttonBox.top - getSpacing(dd))
        ,
          align: 'rblt'
          check: ->
            expect(ddBox.left).toEqual(buttonBox.right + getSpacing(dd))
            expect(ddBox.top).toEqual(buttonBox.bottom + getSpacing(dd))
        ,
          align: 'rblb'
          check: ->
            expect(ddBox.left).toEqual(buttonBox.right + getSpacing(dd))
            expect(ddBox.bottom).toEqual(buttonBox.bottom)
        ,
          align: 'rbrt'
          check: ->
            expect(ddBox.right).toEqual(buttonBox.right)
            expect(ddBox.top).toEqual(buttonBox.bottom + getSpacing(dd))
        ,
          align: 'rtlb'
          check: ->
            expect(ddBox.left).toEqual(buttonBox.right + getSpacing(dd))
            expect(ddBox.top).toEqual(buttonBox.top - ddBox.height - getSpacing(dd))
        ,
          align: 'rtrb'
          check: ->
            expect(ddBox.right).toEqual(buttonBox.right)
            expect(ddBox.bottom).toEqual(buttonBox.top - getSpacing(dd))
      ]

      t = (test, index) ->
        it test.align, ->
          dd = new hx.Dropdown(id, content, {
            align: test.align or undefined
          })
          dd.show()
          setTimeout ->
            ddBox = roundAll dd.dropdown.box()
            test.check()
          , 300
          jasmine.clock().tick(301)

        if index < tests.length
          t(tests[index], index + 1)

      t(tests[0], 1)


    describe 'shouldnt flow outside the screen when the dropdown is on the', ->
      scrollbarWidth = hx.scrollbarSize()
      moveBy = 10000

      tests = [
        pos: 'left'
        check: ->
          expect(ddBox.left).toEqual(0)
      ,
        pos: 'top'
        check: ->
          expect(ddBox.top).toEqual(0)
      ,
        pos: 'right'
        check: ->
          expect(ddBox.left).toEqual(window.innerWidth - ddBox.width - scrollbarWidth)
      ,
        pos: 'bottom'
        check: ->
          expect(ddBox.top).toEqual(window.innerHeight - ddBox.height)
      ]

      t = (test, index) ->
        it ': ' + test.pos, ->
          button.style('top', '')
            .style('right', '')
            .style('bottom', '')
            .style('left', '')
            .style('left', '')
            .style('margin-left', '')
            .style('margin-top', '')
            .style(test.pos, '-' + moveBy + 'px')

          dd = new hx.Dropdown(id, content)
          dd.show()
          setTimeout ->
            ddBox = roundAll dd.dropdown.box()
            test.check()
          , 300
          jasmine.clock().tick(301)

        if index < tests.length
          t(tests[index], index + 1)

      t(tests[0], 1)

    describe 'shouldnt overlap the parent element when align is set to', ->
      tests = [
        align: 'rbrb'
        check: ->
          expect(ddBox.top).toEqual(buttonBox.bottom + getSpacing(dd))
          expect(ddBox.right).toEqual(buttonBox.right)
      ,
        align: 'lblb'
        check: ->
          expect(ddBox.top).toEqual(buttonBox.bottom + getSpacing(dd))
          expect(ddBox.left).toEqual(buttonBox.left)
      ,
        align: 'rtrt'
        check: ->
          expect(ddBox.bottom).toEqual(buttonBox.top - getSpacing(dd))
          expect(ddBox.right).toEqual(buttonBox.right)
      ,
        align: 'ltlt'
        check: ->
          expect(ddBox.bottom).toEqual(buttonBox.top - getSpacing(dd))
          expect(ddBox.left).toEqual(buttonBox.left)
      ,
        align: 'cover'
        check: ->
          expect(ddBox.top).toEqual(buttonBox.bottom + getSpacing(dd))
          expect(ddBox.left).toEqual(buttonBox.left)
      ]

      t = (test, index) ->
        it test.align, ->
          if test.align is 'cover'
            test.align = null
            coverContent = '<div style="width:200px; height: 100px">Content</div>'
          dd = new hx.Dropdown(id, coverContent or content, {align: test.align or undefined })
          dd.show()
          setTimeout ->
            ddBox = roundAll dd.dropdown.box()
            test.check()
          , 300
          jasmine.clock().tick(301)

        if index < tests.length
          t(tests[index], index + 1)

      t(tests[0], 1)
