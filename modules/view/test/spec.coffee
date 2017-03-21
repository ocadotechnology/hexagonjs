import chai from 'chai'
import logger from 'modules/logger/main'
import { select, div, span } from 'modules/selection/main'
import { initView } from 'modules/view/main'

initView()

export default () ->
  describe 'view', ->
    origConsoleWarning = logger.warn

    beforeEach ->
      logger.warn = chai.spy()

    afterEach ->
      logger.warn = origConsoleWarning

    it "should create elements of a given type using the default view enter fn", ->
      selection = div()
      selection.view('element-type').apply([1..3])
      selection.selectAll('element-type').size().should.equal(3)
      logger.warn.should.not.have.been.called()

    it "should create elements of a given class using the default view enter fn", ->
      selection = div()
      selection.view('.class').apply([1..3])
      selection.selectAll('.class').size().should.equal(3)
      logger.warn.should.not.have.been.called()

    it "should create slightly more complicated elements with the default view enter fn", ->
      selection = div()
      selection.view('element-type.class-onion.class-lemon').apply([1..3])
      selection.selectAll('element-type.class-onion.class-lemon').size().should.equal(3)
      logger.warn.should.not.have.been.called()

    it "should show a warning when the returned element does not match the selector passed in", ->
      selection = div()
      selection.view('.class')
        .enter (datum) -> @append('div').node()
        .apply([1..3])
      logger.warn.should.have.been.called()

    it "should show a warning when the returned element does not match the selector passed in with extra classes added", ->
      selection = div()
      selection.view('.class')
        .enter (datum) -> @append('div').class('dave').node()
        .apply([1..3])
      logger.warn.should.have.been.called()

    it "should show a warning when the returned element is not a child of the view", ->
      selection = div()
      selection.view('.class')
        .enter (datum) -> div().class('class').node()
        .apply([1..3])
      logger.warn.should.have.been.called()

    it "should support update functions", ->
      selection = div()

      selection.view('.class')
        .update (datum, node) -> select(node).text(datum + 1)
        .apply([1..3])

      selection.selectAll('.class').text().should.eql(["2", "3", "4"])
      logger.warn.should.not.have.been.called()

    it "should create additional elements as needed", ->
      selection = div()

      selection.view('.class')
        .update (datum, node) -> select(node).text(datum + 1)
        .apply([1..3])
        .apply([1..4])

      selection.selectAll('.class').text().should.eql(["2", "3", "4", "5"])
      logger.warn.should.not.have.been.called()

    it "should remove additional elements as needed", ->
      selection = div()

      selection.view('.class')
        .update (datum, node) -> select(node).text(datum + 1)
        .apply([1..3])
        .apply([1..2])

      selection.selectAll('.class').text().should.eql(["2", "3"])
      logger.warn.should.not.have.been.called()

    it "should index correctly when entering nodes", ->
      selection = div()

      spy = chai.spy()
      view = selection.view('div')
        .enter (datum, index) ->
          spy(datum, index)
          @append('div').node()

      spy.should.not.have.been.called()
      view.apply([1..3])
      spy.should.have.been.called.exactly(3)
      spy.should.have.been.called.with(1, 0)
      spy.should.have.been.called.with(2, 1)
      spy.should.have.been.called.with(3, 2)
      spy.reset()
      view.apply([1..4])
      spy.should.have.been.called.exactly(1)
      spy.should.have.been.called.with(4, 0)
      logger.warn.should.not.have.been.called()

    it "should index correctly when updating nodes", ->
      selection = div()

      spy = chai.spy()
      view = selection.view('div')
        .update (datum, node, index) ->
          spy(datum, index)

      spy.should.not.have.been.called()
      view.apply([1..3])
      spy.should.have.been.called.exactly(3)
      spy.should.have.been.called.with(1, 0)
      spy.should.have.been.called.with(2, 1)
      spy.should.have.been.called.with(3, 2)
      spy.reset()
      view.apply([1..4])
      spy.should.have.been.called.exactly(4)
      spy.should.have.been.called.with(1, 0)
      spy.should.have.been.called.with(2, 1)
      spy.should.have.been.called.with(3, 2)
      spy.should.have.been.called.with(4, 3)
      logger.warn.should.not.have.been.called()

    it 'should only select direct children', ->
      selection = div()

      view = selection.view('div')
        .enter(-> @append('div').add(span()).add(div()).node())
        .update((d, e) -> select(e).select('span').text(d))

      view.apply(['a','b','c'])
      selection.selectAll('div').text().should.eql(['a','','b','','c',''])
      view.apply(['a','b','c'])
      selection.selectAll('div').text().should.eql(['a','','b','','c',''])



    it 'should allow recursive nesting', ->
      selection = div()

      viewEnter = ->
        children = div()
        text = span()

        view = children.view('.child')
          .enter(viewEnter)
          .update(viewUpdate)

        sel = div().class('child')
          .add(text)
          .add(children)

        sel.api({
          update: (item) ->
            text.text(item.text)
            view.apply(item.children || [])
        })

        this.append(sel).node()

      viewUpdate = (item, elem) ->
        select(elem).api().update(item)

      view = selection.view('.child')
        .enter(viewEnter)
        .update(viewUpdate)

      items = [
        {
          text: 'Item 1',
          children: [
            {
              text: 'Replaced with item 2 on second call'
            }
          ]
        },
        {
          text: 'Item 2'
        }
      ]

      view.apply(items)
      selection.shallowSelectAll('.child').select('span').text().should.eql(['Item 1', 'Item 2'])
      view.apply(items)
      selection.shallowSelectAll('.child').select('span').text().should.eql(['Item 1', 'Item 2'])
