describe 'hx-tabs tests', ->
  setupTabs = ->

    createTabHeaderAndBody = (i) ->
      identifier = "tab-content-#{i}"
      header = hx.detached 'div'
        .class 'hx-tab'
        .attr 'id', "tab-#{i}"
        .attr 'data-content', identifier
      body = hx.detached 'div'
        .attr 'id', identifier
        .class 'hx-tab-content'
      { header, body }

    numberOfTabs = 3

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
    expectedHidden = headerAndBody.map (_, index)  -> index isnt i

    actualHidden = headerAndBody.map ({ body }) ->
      body.classed 'hx-tab-content-hidden'

    actualHidden.should.eql expectedHidden

  before ->
    hx.select 'body'
      .append 'div'
      .class 'fixture'

  testChangeEventFired = (tabToSelect, done) ->
    { tabs, rootSel } = setupTabs()


    tabs.on 'change', (data) ->
      data.should.eql id: tabToSelect
      done()

    { tabs, rootSel }

  pretendClickTab = (root, tabToSelect) ->
    headerSel = root.select "#tab-#{tabToSelect}"
    f = testHelpers.fakeNodeEvent headerSel.node(), 'click'
    f()

  beforeEach ->
    hx.select '.fixture'
      .clear()

  it 'should select the first element by default', ->
    { rootSel, headerAndBody } = setupTabs()
    verifyVisible headerAndBody, 0

  it 'should correctly emit the change event if changed from the api', (done) ->
    tabToSelect = 1
    { tabs } = testChangeEventFired tabToSelect, done
    tabs.select tabToSelect

  it 'should correctly select the tab if changed from the api', ->
    tabToSelect = 1
    { tabs, headerAndBody } = setupTabs()
    tabs.select tabToSelect
    verifyVisible headerAndBody, tabToSelect

  it 'should correctly emit the change event if changed from the dom', (done) ->
    tabToSelect = 1
    { rootSel } = testChangeEventFired tabToSelect, done
    pretendClickTab rootSel, tabToSelect

  it 'should correctly select the tab if changed from the dom', ->
    tabToSelect = 1
    { tabs, rootSel, headerAndBody } = setupTabs()
    pretendClickTab rootSel, tabToSelect
    verifyVisible headerAndBody, tabToSelect
