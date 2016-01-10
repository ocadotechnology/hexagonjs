describe 'hx-view', ->
  it "should create elements of a given type using the default view enter fn", ->
    selection = hx.detached('div')
    selection.view('element-type').apply([1..3])
    selection.selectAll('element-type').size().should.equal(3)

  it "should create elements of a given class using the default view enter fn", ->
    selection = hx.detached('div')
    selection.view('.class').apply([1..3])
    selection.selectAll('.class').size().should.equal(3)

  it "should create slightly more complicated elements with the default view enter fn", ->
    selection = hx.detached('div')
    selection.view('element-type.class-onion.class-lemon').apply([1..3])
    selection.selectAll('element-type.class-onion.class-lemon').size().should.equal(3)


  it "should support update functions", ->
    selection = hx.detached('div')

    selection.view('.class')
      .update (datum, node) -> hx.select(node).text(datum + 1)
      .apply([1..3])

    selection.selectAll('.class').text().should.eql(["2", "3", "4"])

  it "should create additional elements as needed", ->
    selection = hx.detached('div')

    selection.view('.class')
      .update (datum, node) -> hx.select(node).text(datum + 1)
      .apply([1..3])
      .apply([1..4])

    selection.selectAll('.class').text().should.eql(["2", "3", "4", "5"])

  it "should remove additional elements as needed", ->
    selection = hx.detached('div')

    selection.view('.class')
      .update (datum, node) -> hx.select(node).text(datum + 1)
      .apply([1..3])
      .apply([1..2])

    selection.selectAll('.class').text().should.eql(["2", "3"])

