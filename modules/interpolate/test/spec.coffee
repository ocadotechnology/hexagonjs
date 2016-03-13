
describe 'hx-interpolate', ->
  it 'should work for numbers', ->
    hx.interpolate(0, 10)(0.5).should.equal(5)

  it 'should work for basic strings', ->
    hx.interpolate('T0', 'T10')(0.5).should.equal('T5')

  it 'should work for more complicated strings', ->
    hx.interpolate('Number 1: 500px;', 'Number 1: 200px;')(0.5).should.equal('Number 1: 350px;')

  it 'should work for more complicated strings 2', ->
    hx.interpolate('Number 3: 500px;', 'Number 1: 200px;')(0.5).should.equal('Number 2: 350px;')

  it 'should use the second string when non number segments differ', ->
    hx.interpolate('Number 3: 500px;', 'Nombre 1: 200px;')(0.5).should.equal('Nombre 2: 350px;')

  it 'should apply special handling for colors', ->
    hx.interpolate('rgba(255, 0, 0, 1)', 'rgba(0, 0, 0, 1)')(0.5).should.equal('rgba(128,0,0,1)')

  it 'should apply special handling for colors', ->
    hx.interpolate('#FF0000', '#000000')(0.5).should.equal('rgba(128,0,0,1)')

  it 'when strings dont match, use the second', ->
    hx.interpolate('T0 5 6', 'T10 7')(0.5).should.equal('T10 7')