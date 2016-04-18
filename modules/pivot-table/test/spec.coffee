describe 'Pivot Table', ->

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