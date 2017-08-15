describe 'Pivot Table', ->
  it 'should have the correct default options', ->
    topHead = hx.range(2)
    leftHead = hx.range(2)
    body = hx.range(2).map (x) ->
      hx.range(2).map (y) -> x * y

    data =
      body: body
      leftHead: leftHead
      topHead: topHead

    pt = new hx.PivotTable(hx.detached('div').node())

    pt.options.stickyHeaders.should.equal(true)
    should.not.exist(pt.options.topLeftCellRender)
    pt.options.cellRender.should.be.a('function')
    pt.options.useResponsive.should.equal(true)
    should.not.exist(pt.options.data)
    should.not.exist(pt.options.fullWidth)

  it 'should not mutate the data', ->
    topHead = hx.range(8)
    leftHead = hx.range(8)
    body = hx.range(8).map (x) ->
      hx.range(8).map (y) -> x * y

    data =
      body: body
      leftHead: leftHead
      topHead: topHead

    pt = new hx.PivotTable(hx.detached('div').node(), {
      data: data
    })
    topHead.should.eql([0,1,2,3,4,5,6,7])
    leftHead.should.eql([0,1,2,3,4,5,6,7])

    pt.data().should.not.equal(data)
    pt.data().should.eql(data)
    pt.data(pt.data()).should.equal(pt)

  it 'should pass the fullWidth option through to the sticky table', ->
    topHead = hx.range(2)
    leftHead = hx.range(2)
    body = hx.range(2).map (x) ->
      hx.range(2).map (y) -> x * y

    data =
      body: body
      leftHead: leftHead
      topHead: topHead

    pt = new hx.PivotTable(hx.detached('div').node(), {
      data: data
      fullWidth: true
    })

    pt.options.fullWidth.should.equal(true)
    pt.stickyTableHeaders._.options.fullWidth.should.equal(true)

  it 'should use the fullWidth option when sticky tables are disabled', ->
    topHead = hx.range(2)
    leftHead = hx.range(2)
    body = hx.range(2).map (x) ->
      hx.range(2).map (y) -> x * y

    data =
      body: body
      leftHead: leftHead
      topHead: topHead

    pt = new hx.PivotTable(hx.detached('div').node(), {
      data: data
      fullWidth: true
      stickyHeaders: false
    })

    pt.options.fullWidth.should.equal(true)
    should.not.exist(pt.stickyTableHeaders)
