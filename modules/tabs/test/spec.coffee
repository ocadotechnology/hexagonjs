describe 'hx-tabs tests', ->
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

    titleRenderer = (node, data) -> hx.select(node).text(titles[data])

    contentRenderer = chai.spy (node, item) ->
      { name, town } = item
      hx.select node
        .add hx.detached('span').text name
        .add hx.detached('span').text town

    hx.tabs { titleRenderer, contentRenderer, items }

  setupTabs = ->

    ctx = [undefined, undefined, 'negative', 'action']
    createTabHeaderAndBody = (i) ->
      identifier = "tab-content-#{i}"
      header = hx.detached 'div'
        .class 'hx-tab'
        .attr 'id', "tab-#{i}"
        .attr 'data-content', identifier
      hx.palette.context header.node(), ctx[i]
      body = hx.detached 'div'
        .attr 'id', identifier
        .class 'hx-tab-content'
      { header, body }

    numberOfTabs = ctx.length

    headerAndBody = hx.range numberOfTabs
      .map createTabHeaderAndBody


    tabsContent = hx.detached 'div'
      .class 'hx-tabs-content'
      .add headerAndBody.map ({ body }) -> body

    rootSel = hx.detached 'div'
      .add  headerAndBody.map ({ header }) -> header
      .add tabsContent

    tabs = new hx.Tabs rootSel.node()

    { headerAndBody, rootSel, tabs }

  verifyVisible = (headerAndBody, i) ->
    expectedVisible = headerAndBody.map (_, index)  -> index is i

    actualVisible = headerAndBody.map ({ header }) ->
      header.classed 'hx-tab-active'

    actualVisible.should.eql expectedVisible

  testChangeEventFired = (cause, tabToSelect, done) ->
    { tabs, rootSel } = setupTabs()


    tabs.on 'change', (data) ->
      data.should.eql { id: tabToSelect, value: tabToSelect, cause }
      done()

    { tabs, rootSel }

  pretendClickTab = (root, tabToSelect) ->
    tabs = root.selectAll '.hx-tab'
    f = testHelpers.fakeNodeEvent tabs.node(tabToSelect), 'click'
    f()

  it 'should select the first element by default', ->
    { headerAndBody } = setupTabs()
    verifyVisible headerAndBody, 0

  it 'should correctly emit the change event if changed from the api', (done) ->
    tabToSelect = 1
    { tabs } = testChangeEventFired 'api', tabToSelect, done
    tabs.select tabToSelect

  it 'should correctly select the tab if changed from the api', ->
    tabToSelect = 1
    { tabs, headerAndBody } = setupTabs()
    tabs.select tabToSelect
    verifyVisible headerAndBody, tabToSelect

  it 'should correctly emit the change event if changed from the dom', (done) ->
    tabToSelect = 1
    { rootSel } = testChangeEventFired 'user', tabToSelect, done
    pretendClickTab rootSel, tabToSelect

  it 'should correctly select the tab if changed from the dom', ->
    tabToSelect = 1
    { tabs, rootSel, headerAndBody } = setupTabs()
    pretendClickTab rootSel, tabToSelect
    verifyVisible headerAndBody, tabToSelect

  it 'should set the hx-tabs class', ->
    tabs = setupTabsUsingStructuredObject()
    tabs.classed('hx-tabs').should.equal true

  it 'should set the hx-tabs-content element, if it does not exist already', ->
    tabs = setupTabsUsingStructuredObject()
    tabs.select('.hx-tabs-content').size().should.equal 1

  it 'should select and render the first element by default', ->
    tabs = setupTabsUsingStructuredObject()
    headers = getHeaders tabs
    tabsContent = tabs.select '.hx-tabs-content'
    verifyVisible headers, 0

    contentRenderer = tabs.component()._.options.contentRenderer
    contentRenderer.should.have.been.called.with tabsContent.node(), {
      name: 'Bob',
      town: 'Wheathampstead'
    }
  
  it 'should render the correct text for titles', ->
    tabs = setupTabsUsingStructuredObject()
    allTitles = getHeaders tabs
      .map ({ header }) -> header.text()
    allTitles.should.eql ['Example1', 'Example2', 'Example3', 'Example4']

  testChange = (cause, f) ->
    tabs = setupTabsUsingStructuredObject()
    headers = getHeaders tabs
    allTitles = getHeaders tabs
    spy = chai.spy()

    tabs.component().on 'change', spy

    f tabs

    tabsContent = tabs.select '.hx-tabs-content'
    verifyVisible headers, 1


    contentRenderer = tabs.component()._.options.contentRenderer
    contentRenderer.should.have.been.called.with tabsContent.node(), {
      name: 'Kate',
      town: 'North Mymms'
    }

    spy.should.be.called.with { id: 1, value: 1, cause }

  it 'should allow things to be set by the api', ->
    testChange 'api', (tabs) -> tabs.component().select 1

  it 'should allow things to be set by the dom', ->
    testChange 'user', (tabs) -> pretendClickTab tabs, 1

  it 'should set the pallette correctly', ->
    tabs = setupTabsUsingStructuredObject()
    headers = tabs.selectAll '.hx-tab'
    actualContext = headers.map (header) -> hx.palette.context header
    expectedContext = [undefined, undefined, 'negative', 'action']
    actualContext.should.eql expectedContext

  it 'should correctly update the context of the content border in api mode', ->
    tabs = setupTabsUsingStructuredObject()
    testContext tabs

  it 'should update the context of the content border in html mode', ->
    { rootSel } = setupTabs()
    testContext rootSel

  testContext = (tabs) ->
    should.not.exist hx.palette.borderContext tabs.select '.hx-tabs-content'
    tabs.component().select 2
    ctx = hx.palette.borderContext tabs.select '.hx-tabs-content'
    ctx.should.equal 'negative'

  it 'should ', ->

  it 'should use the default renderer if none is specified', ->
    tabs = hx.tabs items: [{ title: 'Title', content: 'Content' }]
    opts = tabs.component()._.options
    opts.contentRenderer.should.be.defined
    opts.titleRenderer.should.be.defined
    tabs.select('.hx-tabs-content').text().should.equal 'Content'
    tabs.select('.hx-tab').text().should.equal 'Title'




