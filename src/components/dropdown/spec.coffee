import chai from 'chai'

import { select, div, getHexagonElementDataObject } from 'utils/selection'
import logger from 'utils/logger'

import { Dropdown, config as dropdownConfig } from 'components/dropdown'
import { calculateDropdownPosition } from 'components/dropdown/positioning'

import installFakeTimers from 'test/utils/fake-time'
import emit from 'test/utils/fake-event'

should = chai.should()

export default () ->
  describe 'dropdown', ->

    windowSize = 1000
    startWindowWidth = window.innerWidth
    startWindowHeight = window.innerHeight
    dropdownAnimationDelay = 150
    button = undefined
    content = div().text('dropdown content')

    fixture = undefined
    clock = undefined

    getWindowMeasurement = (horizontal, scroll) ->
      if scroll then 0
      else windowSize

    # Fixes firefox's unexplained decimal test failures
    roundAll = (box) ->
      for key, value of box
        box[key] = Math.round value
      box

    getSpacing = (dd) -> dd.options.spacing or Number(0)

    makeButton = ->
      fixture.append('div')
        .style('width', '100px')
        .style('height', '50px')
        .style('position', 'absolute')
        .style('top', '50%')
        .style('left', '50%')
        .style('margin', '-50px -25px 0 0')
        .text('button')

    before ->
      fixture = select('body').append(div('hx-test-dropdown'))
        .style('padding', '0')
        .style('margin', '0')
        .style('width', '1000px')
        .style('height', '1000px')
        .style('position', 'relative')
      window.resizeTo(windowSize, windowSize)

    beforeEach ->
      dropdownConfig.attachToSelector = fixture
      clock = installFakeTimers()
      button = makeButton()

    afterEach ->
      dropdownConfig.attachToSelector = 'body'
      clock.restore()
      fixture.clear()
      button.api('dropdown')?.cleanUp()
      button.remove()

    after ->
      fixture.remove()
      window.resizeTo(startWindowWidth, startWindowHeight)


    it 'should throw an error when passing in the wrong thing for dropdownContent', ->
      oldConsoleWarning = logger.warn
      logger.warn = chai.spy()
      invalidDropdownContent = {}
      dd = new Dropdown(button, invalidDropdownContent)
      dd.show()
      logger.warn.should.have.been.called.with('dropdown: dropdownContent is not a valid type. dropdownContent: ', invalidDropdownContent)
      logger.warn = oldConsoleWarning

    it 'should create a dropdown object with the correct default options', ->
      dd = new Dropdown(button, content)

      dd._.selection.should.eql(button)
      getSpacing(dd).should.equal(0)
      dd.options.matchWidth.should.equal(true)
      should.not.exist(dd._.dropdown)
      dd._.visible.should.equal(false)
      dd.options.ddClass.should.equal('')
      dd.options.mode.should.equal('click')


    it 'should set the mode correctly for click', ->
      dd = new Dropdown(button, content, {mode: 'click'})

      getHexagonElementDataObject(button.node()).eventEmitter.has('click').should.equal(true)
      getHexagonElementDataObject(button.node()).eventEmitter.has('mouseover').should.equal(false)
      getHexagonElementDataObject(button.node()).eventEmitter.has('mouseout').should.equal(false)

      dd = new Dropdown(button, content, {mode: 'hover'})
      getHexagonElementDataObject(button.node()).eventEmitter.has('click').should.equal(true)
      getHexagonElementDataObject(button.node()).eventEmitter.has('mouseover').should.equal(true)
      getHexagonElementDataObject(button.node()).eventEmitter.has('mouseout').should.equal(true)

    it 'should set the spacing correctly', ->
      dd = new Dropdown(button, content, {spacing: 10} )
      getSpacing(dd).should.equal(10)

    it 'should set the matchWidth property correctly', ->
      dd = new Dropdown(button, content, {matchWidth: false} )
      dd.options.matchWidth.should.equal(false)

      dd = new Dropdown(button, content, {matchWidth: true} )
      dd.options.matchWidth.should.equal(true)

    it 'should set the ddClass correctly', ->
      dd = new Dropdown(button, content, { ddClass: 'bob' })
      dd.options.ddClass.should.equal('bob')

    it 'should call toggle the selector is clicked in click mode', ->
      dd = new Dropdown(button, content)
      chai.spy.on(dd, 'toggle')
      emit(button.node(), 'click')
      dd.toggle.should.have.been.called()

    it 'should call show/hide on mouseover/mouseout in hover mode', ->
      dd = new Dropdown(button, content, {mode: 'hover'})
      chai.spy.on(dd, 'show')
      chai.spy.on(dd, 'hide')
      chai.spy.on(dd, 'toggle')

      emit(button.node(), 'mouseover')
      dd.show.should.have.been.called()

      emit(button.node(), 'mouseout')
      dd.hide.should.have.been.called()

      emit(button.node(), 'click')
      dd.toggle.should.have.been.called()

    it 'should correctly detect if the dropdown is open', ->
      dd = new Dropdown(button, content)
      dd.isOpen().should.equal(false)
      dd.show()
      dd.isOpen().should.equal(true)
      dd.hide()
      dd.isOpen().should.equal(false)
      dd.toggle()
      dd.isOpen().should.equal(true)
      dd.toggle()
      dd.isOpen().should.equal(false)

    it 'should exist on the page when opened and set the visible property to true', ->
      dd = new Dropdown(button, content)
      dd._.visible.should.equal(false)
      fixture.select('.hx-dropdown').empty().should.equal(true)

      emit(button.node(), 'click')
      dd._.visible.should.equal(true)
      clock.tick(dropdownAnimationDelay)

      fixture.select('.hx-dropdown').empty().should.equal(false)
      fixture.select('.hx-dropdown').select('div').node(0).should.equal(content.node(0))

    it 'should not do anything if show is called and the dropdown is already open', ->
      dd = new Dropdown(button, content)
      dd._.visible.should.equal(false)
      fixture.select('.hx-dropdown').empty().should.equal(true)

      dd.show()
      dd._.visible.should.equal(true)
      clock.tick(dropdownAnimationDelay)
      fixture.select('.hx-dropdown').empty().should.equal(false)
      fixture.select('.hx-dropdown').select('div').node(0).should.equal(content.node(0))

      dd.show()
      dd._.visible.should.equal(true)
      clock.tick(dropdownAnimationDelay)
      fixture.select('.hx-dropdown').empty().should.equal(false)
      fixture.select('.hx-dropdown').select('div').node(0).should.equal(content.node(0))

    it 'should not do anything if hide is called and the dropdown is already closed', ->
      dd = new Dropdown(button, content)
      chai.spy.on(dd._.clickDetector, 'off')
      dd._.visible.should.equal(false)
      fixture.select('.hx-dropdown').empty().should.equal(true)

      dd.hide()
      dd._.visible.should.equal(false)
      fixture.select('.hx-dropdown').empty().should.equal(true)
      dd._.clickDetector.off.should.have.not.been.called()

    it 'should call the clean up the click detector', ->
      dd = new Dropdown(button, content)
      chai.spy.on(dd._.clickDetector, 'cleanUp')
      dd.cleanUp()
      dd._.clickDetector.cleanUp.should.have.been.called()

    it 'should call hide when an element other than the button is clicked', ->
      dd = new Dropdown(button, content)
      chai.spy.on(dd, 'hide')
      dd.show()
      emit(document, 'pointerdown', { event: {target: fixture.node()}})
      emit(document, 'pointerup', { event: {target: fixture.node()}})
      dd.hide.should.have.been.called()

    it 'should detect parent z-index and set the index to be 1 greater', ->
      fixture
        .style('position', 'fixed')
        .style('z-index', 100)
      dd = new Dropdown(button, content)
      dd.show()
      dd._.dropdown.style('z-index').should.equal('101')
      fixture
        .style('position', undefined)
        .style('z-index', undefined)

    it 'should detect parent position and match it correctly', ->
      fixture.style('position', 'fixed')

      dd = new Dropdown(button, content)
      dd.show()
      dd._.dropdown.style('position').should.equal('fixed')

    it 'should render correctly using a function as content', ->
      # XXX Breaking: Renderer
      # populate = () -> div('bob').text('Dave')
      populate = (elem) -> select(elem).set(div('bob').text('Dave'))

      dd = new Dropdown(button, populate)
      dd.show()
      dd._.dropdown.select('.bob').text().should.equal('Dave')


    it 'should class the dropdown with the supplied dd class', ->
      dd = new Dropdown(button, content, {ddClass: 'bob'})
      dd.show()
      dd._.dropdown.classed('bob').should.equal(true)

    it 'should show and hide correctly', ->
      dd = new Dropdown(button, content)

      dd._.visible.should.equal(false)
      fixture.select('.hx-dropdown').empty().should.equal(true)

      dd.show()
      dd._.visible.should.equal(true)
      clock.tick(dropdownAnimationDelay)
      fixture.select('.hx-dropdown').empty().should.equal(false)

      dd.hide()
      dd._.visible.should.equal(false)
      clock.tick(dropdownAnimationDelay)
      fixture.select('.hx-dropdown').empty().should.equal(true)

    it 'should set the overflow style when the useScroll (private) option is specified', ->
      dd = new Dropdown(button, content)
      dd._.useScroll = true
      dd.show()
      clock.tick(300)
      clock.tick(1)
      dd._.dropdown.style('overflow-y').should.equal('auto')

    it 'shouldnt try to match the width of the parent if matchWidth is false', ->
      button.text('Wider button for testing')
      bWidth = button.width()

      dd = new Dropdown(button, content, {matchWidth: false })

      dd.show()
      dd._.dropdown.style('min-width').should.equal('0px')
      clock.tick(301)

    it 'should try to match the width of the parent if matchWidth is true', ->
      button.text('Wider button for testing')

      dd = new Dropdown(button, content, {matchWidth: true })

      dd.show()
      dd._.dropdown.style('min-width').should.equal(button.style('width'))
      clock.tick(301)

    # PhantomJS doesn't support `MutationObserver`
    if navigator.userAgent.indexOf("PhantomJS") is -1
      it 're-positions the dropdown when the content is changed', (done) ->
        fixture.clear()
        clock.restore()

        bottomElement = fixture.append(div()
          .style('position', 'fixed')
          .style('bottom', '0')
          .style('left', '0')
          .text('Bottom Element'))

        contents = div()

        dd = new Dropdown(bottomElement, contents)
        dd.show()
        top = dd._.dropdown.style('top')
        contents.add(div().text('Something'))
        setTimeout ->
          updatedTop = dd._.dropdown.style('top')
          top.should.not.eql(updatedTop)
          done()
        , 1


    describe 'calculateDropdownPosition', ->

      check = (selectionX, selectionY, alignments) ->
        selectionRect = { x: selectionX, y: selectionY, width: 100, height: 100 }
        dropdownRect = { width: 200, height: 200 }
        windowRect = { width: 1000, height: 1000 }
        ddMaxHeight = undefined
        scrollbarWidth = 0

        calculateDropdownPosition(
          alignments,
          selectionRect,
          dropdownRect,
          windowRect,
          ddMaxHeight,
          scrollbarWidth
        )

      checkNoSpaceToFlipH = (alignments) ->
        selectionRect = { x: 50, y: 500, width: 100, height: 100 }
        dropdownRect = { width: 200, height: 200 }
        windowRect = { width: 200, height: 1000 }
        ddMaxHeight = undefined
        scrollbarWidth = 0

        calculateDropdownPosition(
          alignments,
          selectionRect,
          dropdownRect,
          windowRect,
          ddMaxHeight,
          scrollbarWidth
        )

      checkNoSpaceToFlipV = (alignments) ->
        selectionRect = { x: 500, y: 50, width: 100, height: 100 }
        dropdownRect = { width: 200, height: 200 }
        windowRect = { width: 1000, height: 200 }
        ddMaxHeight = undefined
        scrollbarWidth = 0

        calculateDropdownPosition(
          alignments,
          selectionRect,
          dropdownRect,
          windowRect,
          ddMaxHeight,
          scrollbarWidth
        )

      # downwards tests
      describe 'down', ->
        it 'ample space', -> check(500, 500, 'down').should.eql({ x: 500, y: 600, direction: 'down' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('down').should.eql({ x: 500, y: 150, direction: 'down' })
        it 'shifted left', -> check(850, 500, 'down').should.eql({ x: 800, y: 600, direction: 'down' })
        it 'shifted right', -> check(-50, 500, 'down').should.eql({ x: 0, y: 600, direction: 'down' })
        it 'flipped', -> check(500, 850, 'down').should.eql({ x: 500, y: 650, direction: 'up' })
        it 'flipped shifted left', -> check(850, 850, 'down').should.eql({ x: 800, y: 650, direction: 'up' })
        it 'flipped shifted right', -> check(-50, 850, 'down').should.eql({ x: 0, y: 650, direction: 'up' })

      describe 'lblt', ->
        it 'ample space', -> check(500, 500, 'lblt').should.eql({ x: 500, y: 600, direction: 'down' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('lblt').should.eql({ x: 500, y: 150, direction: 'down' })
        it 'shifted left', -> check(850, 500, 'lblt').should.eql({ x: 800, y: 600, direction: 'down' })
        it 'shifted right', -> check(-50, 500, 'lblt').should.eql({ x: 0, y: 600, direction: 'down' })
        it 'flipped', -> check(500, 850, 'lblt').should.eql({ x: 500, y: 650, direction: 'up' })
        it 'flipped shifted left', -> check(850, 850, 'lblt').should.eql({ x: 800, y: 650, direction: 'up' })
        it 'flipped shifted right', -> check(-50, 850, 'lblt').should.eql({ x: 0, y: 650, direction: 'up' })

      describe 'rblt', ->
        it 'ample space', -> check(500, 500, 'rblt').should.eql({ x: 600, y: 600, direction: 'down' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('rblt').should.eql({ x: 600, y: 150, direction: 'down' })
        it 'shifted left', -> check(750, 500, 'rblt').should.eql({ x: 800, y: 600, direction: 'down' })
        it 'shifted right', -> check(-150, 500, 'rblt').should.eql({ x: 0, y: 600, direction: 'down' })
        it 'flipped', -> check(500, 850, 'rblt').should.eql({ x: 600, y: 650, direction: 'up' })
        it 'flipped shifted left', -> check(750, 850, 'rblt').should.eql({ x: 800, y: 650, direction: 'up' })
        it 'flipped shifted right', -> check(-150, 850, 'rblt').should.eql({ x: 0, y: 650, direction: 'up' })

      describe 'ltlt', ->
        it 'ample space', -> check(500, 500, 'ltlt').should.eql({ x: 500, y: 500, direction: 'down' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('ltlt').should.eql({ x: 500, y: 50, direction: 'down' })
        it 'shifted left', -> check(850, 500, 'ltlt').should.eql({ x: 800, y: 500, direction: 'down' })
        it 'shifted right', -> check(-50, 500, 'ltlt').should.eql({ x: 0, y: 500, direction: 'down' })
        it 'flipped', -> check(500, 850, 'ltlt').should.eql({ x: 500, y: 750, direction: 'up' })
        it 'flipped shifted left', -> check(850, 850, 'ltlt').should.eql({ x: 800, y: 750, direction: 'up' })
        it 'flipped shifted right', -> check(-50, 850, 'ltlt').should.eql({ x: 0, y: 750, direction: 'up' })

      describe 'lbrt', ->
        it 'ample space', -> check(500, 500, 'lbrt').should.eql({ x: 300, y: 600, direction: 'down' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('lbrt').should.eql({ x: 300, y: 150, direction: 'down' })
        it 'shifted left', -> check(1050, 500, 'lbrt').should.eql({ x: 800, y: 600, direction: 'down' })
        it 'shifted right', -> check(150, 500, 'lbrt').should.eql({ x: 0, y: 600, direction: 'down' })
        it 'flipped', -> check(500, 850, 'lbrt').should.eql({ x: 300, y: 650, direction: 'up' })
        it 'flipped shifted left', -> check(1050, 850, 'lbrt').should.eql({ x: 800, y: 650, direction: 'up' })
        it 'flipped shifted right', -> check(150, 850, 'lbrt').should.eql({ x: 0, y: 650, direction: 'up' })

      describe 'rbrt', ->
        it 'ample space', -> check(500, 500, 'rbrt').should.eql({ x: 400, y: 600, direction: 'down' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('rbrt').should.eql({ x: 400, y: 150, direction: 'down' })
        it 'shifted left', -> check(950, 500, 'rbrt').should.eql({ x: 800, y: 600, direction: 'down' })
        it 'shifted right', -> check(50, 500, 'rbrt').should.eql({ x: 0, y: 600, direction: 'down' })
        it 'flipped', -> check(500, 850, 'rbrt').should.eql({ x: 400, y: 650, direction: 'up' })
        it 'flipped shifted left', -> check(950, 850, 'rbrt').should.eql({ x: 800, y: 650, direction: 'up' })
        it 'flipped shifted right', -> check(50, 850, 'rbrt').should.eql({ x: 0, y: 650, direction: 'up' })

      describe 'rtrt', ->
        it 'ample space', -> check(500, 500, 'rtrt').should.eql({ x: 400, y: 500, direction: 'down' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('rtrt').should.eql({ x: 400, y: 50, direction: 'down' })
        it 'shifted left', -> check(950, 500, 'rtrt').should.eql({ x: 800, y: 500, direction: 'down' })
        it 'shifted right', -> check(50, 500, 'rtrt').should.eql({ x: 0, y: 500, direction: 'down' })
        it 'flipped', -> check(500, 850, 'rtrt').should.eql({ x: 400, y: 750, direction: 'up' })
        it 'flipped shifted left', -> check(950, 850, 'rtrt').should.eql({ x: 800, y: 750, direction: 'up' })
        it 'flipped shifted right', -> check(50, 850, 'rtrt').should.eql({ x: 0, y: 750, direction: 'up' })

      # upwards tests
      describe 'up', ->
        it 'ample space', -> check(500, 500, 'up').should.eql({ x: 500, y: 300, direction: 'up' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('up').should.eql({ x: 500, y: -150, direction: 'up' })
        it 'shifted left', -> check(850, 500, 'up').should.eql({ x: 800, y: 300, direction: 'up' })
        it 'shifted right', -> check(-50, 500, 'up').should.eql({ x: 0, y: 300, direction: 'up' })
        it 'flipped', -> check(500, 150, 'up').should.eql({ x: 500, y: 250, direction: 'down' })
        it 'flipped shifted left', -> check(850, 150, 'up').should.eql({ x: 800, y: 250, direction: 'down' })
        it 'flipped shifted right', -> check(-50, 150, 'up').should.eql({ x: 0, y: 250, direction: 'down' })

      describe 'lblb', ->
        it 'ample space', -> check(500, 500, 'lblb').should.eql({ x: 500, y: 400, direction: 'up' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('lblb').should.eql({ x: 500, y: -50, direction: 'up' })
        it 'shifted left', -> check(850, 500, 'lblb').should.eql({ x: 800, y: 400, direction: 'up' })
        it 'shifted right', -> check(-50, 500, 'lblb').should.eql({ x: 0, y: 400, direction: 'up' })
        it 'flipped', -> check(500, 50, 'lblb').should.eql({ x: 500, y: 50, direction: 'down' })
        it 'flipped shifted left', -> check(950, 50, 'lblb').should.eql({ x: 800, y: 50, direction: 'down' })
        it 'flipped shifted right', -> check(-50, 50, 'lblb').should.eql({ x: 0, y: 50, direction: 'down' })

      describe 'ltlb', ->
        it 'ample space', -> check(500, 500, 'ltlb').should.eql({ x: 500, y: 300, direction: 'up' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('ltlb').should.eql({ x: 500, y: -150, direction: 'up' })
        it 'shifted left', -> check(850, 500, 'ltlb').should.eql({ x: 800, y: 300, direction: 'up' })
        it 'shifted right', -> check(-50, 500, 'ltlb').should.eql({ x: 0, y: 300, direction: 'up' })
        it 'flipped', -> check(500, 150, 'ltlb').should.eql({ x: 500, y: 250, direction: 'down' })
        it 'flipped shifted left', -> check(850, 150, 'ltlb').should.eql({ x: 800, y: 250, direction: 'down' })
        it 'flipped shifted right', -> check(-50, 150, 'ltlb').should.eql({ x: 0, y: 250, direction: 'down' })

      describe 'rtlb', ->
        it 'ample space', -> check(500, 500, 'rtlb').should.eql({ x: 600, y: 300, direction: 'up' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('rtlb').should.eql({ x: 600, y: -150, direction: 'up' })
        it 'shifted left', -> check(750, 500, 'rtlb').should.eql({ x: 800, y: 300, direction: 'up' })
        it 'shifted right', -> check(-150, 500, 'rtlb').should.eql({ x: 0, y: 300, direction: 'up' })
        it 'flipped', -> check(500, 150, 'rtlb').should.eql({ x: 600, y: 250, direction: 'down' })
        it 'flipped shifted left', -> check(850, 150, 'rtlb').should.eql({ x: 800, y: 250, direction: 'down' })
        it 'flipped shifted right', -> check(-150, 150, 'rtlb').should.eql({ x: 0, y: 250, direction: 'down' })

      describe 'rbrb', ->
        it 'ample space', -> check(500, 500, 'rbrb').should.eql({ x: 400, y: 400, direction: 'up' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('rbrb').should.eql({ x: 400, y: -50, direction: 'up' })
        it 'shifted left', -> check(950, 500, 'rbrb').should.eql({ x: 800, y: 400, direction: 'up' })
        it 'shifted right', -> check(50, 500, 'rbrb').should.eql({ x: 0, y: 400, direction: 'up' })
        it 'flipped', -> check(500, 50, 'rbrb').should.eql({ x: 400, y: 50, direction: 'down' })
        it 'flipped shifted left', -> check(950, 50, 'rbrb').should.eql({ x: 800, y: 50, direction: 'down' })
        it 'flipped shifted right', -> check(50, 50, 'rbrb').should.eql({ x: 0, y: 50, direction: 'down' })

      describe 'ltrb', ->
        it 'ample space', -> check(500, 500, 'ltrb').should.eql({ x: 300, y: 300, direction: 'up' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('ltrb').should.eql({ x: 300, y: -150, direction: 'up' })
        it 'shifted left', -> check(1050, 500, 'ltrb').should.eql({ x: 800, y: 300, direction: 'up' })
        it 'shifted right', -> check(50, 500, 'ltrb').should.eql({ x: 0, y: 300, direction: 'up' })
        it 'flipped', -> check(500, 50, 'ltrb').should.eql({ x: 300, y: 150, direction: 'down' })
        it 'flipped shifted left', -> check(1050, 50, 'ltrb').should.eql({ x: 800, y: 150, direction: 'down' })
        it 'flipped shifted right', -> check(50, 50, 'ltrb').should.eql({ x: 0, y: 150, direction: 'down' })

      describe 'rtrb', ->
        it 'ample space', -> check(500, 500, 'rtrb').should.eql({ x: 400, y: 300, direction: 'up' })
        it 'not enough space to flip', -> checkNoSpaceToFlipV('rtrb').should.eql({ x: 400, y: -150, direction: 'up' })
        it 'shifted left', -> check(950, 500, 'rtrb').should.eql({ x: 800, y: 300, direction: 'up' })
        it 'shifted right', -> check(50, 500, 'rtrb').should.eql({ x: 0, y: 300, direction: 'up' })
        it 'flipped', -> check(500, 50, 'rtrb').should.eql({ x: 400, y: 150, direction: 'down' })
        it 'flipped shifted left', -> check(950, 50, 'rtrb').should.eql({ x: 800, y: 150, direction: 'down' })
        it 'flipped shifted right', -> check(50, 50, 'rtrb').should.eql({ x: 0, y: 150, direction: 'down' })

      # rightwards tests
      describe 'right', ->
        it 'ample space', -> check(500, 500, 'right').should.eql({ x: 600, y: 500, direction: 'right' })
        it 'not enough space to flip', -> checkNoSpaceToFlipH('right').should.eql({ x: 150, y: 500, direction: 'right' })
        it 'shifted down', -> check(500, -50, 'right').should.eql({ x: 600, y: 0, direction: 'right' })
        it 'shifted up', -> check(500, 850, 'right').should.eql({ x: 600, y: 800, direction: 'right' })
        it 'flipped', -> check(750, 500, 'right').should.eql({ x: 550, y: 500, direction: 'left' })
        it 'flipped shifted down', -> check(750, -50, 'right').should.eql({ x: 550, y: 0, direction: 'left' })
        it 'flipped shifted up', -> check(750, 850, 'right').should.eql({ x: 550, y: 800, direction: 'left' })

      describe 'rtlt', ->
        it 'ample space', -> check(500, 500, 'rtlt').should.eql({ x: 600, y: 500, direction: 'right' })
        it 'not enough space to flip', -> checkNoSpaceToFlipH('rtlt').should.eql({ x: 150, y: 500, direction: 'right' })
        it 'shifted down', -> check(500, -50, 'rtlt').should.eql({ x: 600, y: 0, direction: 'right' })
        it 'shifted up', -> check(500, 850, 'rtlt').should.eql({ x: 600, y: 800, direction: 'right' })
        it 'flipped', -> check(750, 500, 'rtlt').should.eql({ x: 550, y: 500, direction: 'left' })
        it 'flipped shifted down', -> check(750, -50, 'rtlt').should.eql({ x: 550, y: 0, direction: 'left' })
        it 'flipped shifted up', -> check(750, 850, 'rtlt').should.eql({ x: 550, y: 800, direction: 'left' })

      describe 'rblb', ->
        it 'ample space', -> check(500, 500, 'rblb').should.eql({ x: 600, y: 400, direction: 'right' })
        it 'not enough space to flip', -> checkNoSpaceToFlipH('rblb').should.eql({ x: 150, y: 400, direction: 'right' })
        it 'shifted down', -> check(500, 50, 'rblb').should.eql({ x: 600, y: 0, direction: 'right' })
        it 'shifted up', -> check(500, 950, 'rblb').should.eql({ x: 600, y: 800, direction: 'right' })
        it 'flipped', -> check(750, 500, 'rblb').should.eql({ x: 550, y: 400, direction: 'left' })
        it 'flipped shifted down', -> check(750, 50, 'rblb').should.eql({ x: 550, y: 0, direction: 'left' })
        it 'flipped shifted up', -> check(750, 950, 'rblb').should.eql({ x: 550, y: 800, direction: 'left' })

      # leftwards tests
      describe 'left', ->
        it 'ample space', -> check(500, 500, 'left').should.eql({ x: 300, y: 500, direction: 'left' })
        it 'not enough space to flip', -> checkNoSpaceToFlipH('left').should.eql({ x: -150, y: 500, direction: 'left' })
        it 'shifted down', -> check(500, -50, 'left').should.eql({ x: 300, y: 0, direction: 'left' })
        it 'shifted up', -> check(500, 850, 'left').should.eql({ x: 300, y: 800, direction: 'left' })
        it 'flipped', -> check(150, 500, 'left').should.eql({ x: 250, y: 500, direction: 'right' })
        it 'flipped shifted down', -> check(150, -50, 'left').should.eql({ x: 250, y: 0, direction: 'right' })
        it 'flipped shifted up', -> check(150, 850, 'left').should.eql({ x: 250, y: 800, direction: 'right' })

      describe 'ltrt', ->
        it 'ample space', -> check(500, 500, 'ltrt').should.eql({ x: 300, y: 500, direction: 'left' })
        it 'not enough space to flip', -> checkNoSpaceToFlipH('ltrt').should.eql({ x: -150, y: 500, direction: 'left' })
        it 'shifted down', -> check(500, -50, 'ltrt').should.eql({ x: 300, y: 0, direction: 'left' })
        it 'shifted up', -> check(500, 850, 'ltrt').should.eql({ x: 300, y: 800, direction: 'left' })
        it 'flipped', -> check(150, 500, 'ltrt').should.eql({ x: 250, y: 500, direction: 'right' })
        it 'flipped shifted down', -> check(150, -50, 'ltrt').should.eql({ x: 250, y: 0, direction: 'right' })
        it 'flipped shifted up', -> check(150, 850, 'ltrt').should.eql({ x: 250, y: 800, direction: 'right' })

      describe 'lbrb', ->
        it 'ample space', -> check(500, 500, 'lbrb').should.eql({ x: 300, y: 400, direction: 'left' })
        it 'not enough space to flip', -> checkNoSpaceToFlipH('lbrb').should.eql({ x: -150, y: 400, direction: 'left' })
        it 'shifted down', -> check(500, 50, 'lbrb').should.eql({ x: 300, y: 0, direction: 'left' })
        it 'shifted up', -> check(500, 950, 'lbrb').should.eql({ x: 300, y: 800, direction: 'left' })
        it 'flipped', -> check(150, 500, 'lbrb').should.eql({ x: 250, y: 400, direction: 'right' })
        it 'flipped shifted down', -> check(150, 50, 'lbrb').should.eql({ x: 250, y: 0, direction: 'right' })
        it 'flipped shifted up', -> check(150, 950, 'lbrb').should.eql({ x: 250, y: 800, direction: 'right' })
