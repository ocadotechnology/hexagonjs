import { Tabs, tabs } from 'tabs'
import { select, span, div } from 'selection'
import { range } from 'utils'
import { palette } from 'palette'

import { emit } from 'test/utils/fake-event'

export default () ->
  defaultContext = [undefined, undefined, 'negative', 'action']
  describe 'tabs', ->
    getHeaders = (root) ->
      root.selectAll '.hx-tab'
        .map (header) -> { header }

    setupTabsUsingStructuredObject = ->
      items = [{
        title: 'title1',
        content: {
          name: 'Bob',
          town: 'Wheathampstead'
        }
      }, {
        title: 'title2',
        content: {
          name: 'Kate',
          town: 'North Mymms'
        },
      }, {
        title: 'title3',
        context: 'negative',
        content: {
          name: 'Ganesh',
          town: 'Digswell'
        }
      }, {
        title: 'title4',
        context: 'action',
        content: {
          name: 'Lazlo',
          town: 'Essendon'
        }
      }]

      titles =
        title1: 'Example1'
        title2: 'Example2'
        title3: 'Example3'
        title4: 'Example4'

      titleRenderer = (node, data) -> select(node).text(titles[data])

      contentRenderer = chai.spy (node, item) ->
        { name, town } = item
        select node
          .add span().text name
          .add span().text town

      tabs({ titleRenderer, contentRenderer, items })

    setupTabs = ->

      ctx = defaultContext
      createTabHeaderAndBody = (i) ->
        identifier = "tab-content-#{i}"
        header = div('hx-tab')
          .attr 'id', "tab-#{i}"
          .attr 'data-content', identifier
        palette.context header.node(), ctx[i]
        body = div('hx-tab-content')
          .attr 'id', identifier
        { header, body }

      numberOft = ctx.length

      headerAndBody = range numberOft
        .map createTabHeaderAndBody

      tContent = div('hx-tabs-content')
        .add headerAndBody.map ({ body }) -> body

      rootSel = div()
        .add  headerAndBody.map ({ header }) -> header
        .add tContent

      t = new Tabs rootSel

      { headerAndBody, rootSel, t }

    verifyVisible = (headerAndBody, i) ->
      expectedVisible = headerAndBody.map (_, index) -> index is i

      actualVisible = headerAndBody.map ({ header }) ->
        header.classed 'hx-tab-active'

      actualVisible.should.eql expectedVisible

    setupChangeEventTest = (cause, tabToSelect, done) ->
      { t, rootSel } = setupTabs()

      t.on 'change', (data) ->
        data.should.eql { id: tabToSelect, value: tabToSelect, cause }
        done()

      { t, rootSel }

    pretendClickTab = (root, tabToSelect) ->
      t = root.selectAll '.hx-tab'
      emit(t.node(tabToSelect), 'click')

    testChange = (cause, f) ->
      t = setupTabsUsingStructuredObject()
      headers = getHeaders t
      allTitles = getHeaders t
      spy = chai.spy()

      t.api().on 'change', spy

      f t

      tContent = t.select '.hx-tabs-content'
      verifyVisible headers, 1

      contentRenderer = t.api()._.options.contentRenderer
      contentRenderer.should.have.been.called.with tContent.node(), {
        name: 'Kate',
        town: 'North Mymms'
      }

      spy.should.be.called.with { id: 1, value: 1, cause }

    testContextX = (t) ->
      t.select('.hx-tabs-content').class().should.equal('hx-tabs-content')
      t.api().select(2)
      ctx = palette.borderContext(t.select('.hx-tabs-content'))
      ctx.should.equal('negative')

    it 'should select the first element by default', ->
      { headerAndBody } = setupTabs()
      verifyVisible headerAndBody, 0

    it 'should correctly emit the change event if changed from the api', (done) ->
      tabToSelect = 1
      { t } = setupChangeEventTest 'api', tabToSelect, done
      t.select tabToSelect

    it 'should correctly select the tab if changed from the api', ->
      tabToSelect = 1
      { t, headerAndBody } = setupTabs()
      t.select tabToSelect
      verifyVisible headerAndBody, tabToSelect

    it 'should correctly emit the change event if changed from the dom', (done) ->
      tabToSelect = 1
      { rootSel } = setupChangeEventTest 'user', tabToSelect, done
      pretendClickTab rootSel, tabToSelect

    it 'should correctly select the tab if changed from the dom', ->
      tabToSelect = 1
      { t, rootSel, headerAndBody } = setupTabs()
      pretendClickTab rootSel, tabToSelect
      verifyVisible headerAndBody, tabToSelect

    it 'should set the hx-tabs class', ->
      t = setupTabsUsingStructuredObject()
      t.classed('hx-tabs').should.equal true

    it 'should set the hx-tabs-content element, if it does not exist already', ->
      t = setupTabsUsingStructuredObject()
      t.select('.hx-tabs-content').size().should.equal 1

    it 'should select and render the first element by default', ->
      t = setupTabsUsingStructuredObject()
      headers = getHeaders t
      tContent = t.select '.hx-tabs-content'
      verifyVisible headers, 0

      contentRenderer = t.api()._.options.contentRenderer
      contentRenderer.should.have.been.called.with tContent.node(), {
        name: 'Bob',
        town: 'Wheathampstead'
      }

    it 'should render the correct text for titles', ->
      t = setupTabsUsingStructuredObject()
      allTitles = getHeaders t
        .map ({ header }) -> header.text()
      allTitles.should.eql ['Example1', 'Example2', 'Example3', 'Example4']

    it 'should allow things to be set by the api', ->
      testChange 'api', (t) -> t.api().select 1

    it 'should allow things to be set by the dom', ->
      testChange 'user', (t) -> pretendClickTab t, 1

    it 'should set the pallette correctly', ->
      t = setupTabsUsingStructuredObject()
      headers = t.selectAll '.hx-tab'
      actualContext = headers.map (header) -> palette.context header
      expectedContext = defaultContext
      actualContext.should.eql expectedContext

    it 'should correctly update the context of the content border in api mode', ->
      t = setupTabsUsingStructuredObject()
      testContextX t

    it 'should update the context of the content border in html mode', ->
      { rootSel } = setupTabs()
      testContextX rootSel

    it 'should use the default renderer if none is specified', ->
      t = tabs({ items: [{ title: 'Title', content: 'Content' }] })
      opts = t.api()._.options
      opts.contentRenderer.should.not.be.undefined
      opts.titleRenderer.should.not.be.undefined
      t.select('.hx-tabs-content').text().should.equal 'Content'
      t.select('.hx-tab').text().should.equal 'Title'
