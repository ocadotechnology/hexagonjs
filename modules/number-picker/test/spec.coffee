describe 'number picker', ->
  it 'should have a default min of undefined', ->
    np = new hx.NumberPicker(hx.detached('div').node())
    should.not.exist(np.min())

  it 'should set and get the min option properly', ->
    np = new hx.NumberPicker(hx.detached('div').node(), { min: 20 })
    np.min().should.equal(20)
    np.min(0).min().should.equal(0)

  it 'should check the value when the min option is set', ->
    np = new hx.NumberPicker(hx.detached('div').node())
    np.value(-5).min(0).value().should.equal(0)

  it 'should have a default max of undefined', ->
    np = new hx.NumberPicker(hx.detached('div').node())
    should.not.exist(np.max())

  it 'should set and get the max option properly', ->
    np = new hx.NumberPicker(hx.detached('div').node(), { max: 20 })
    np.max().should.equal(20)
    np.max(0).max().should.equal(0)

  it 'should check the value when the max option is set', ->
    np = new hx.NumberPicker(hx.detached('div').node())
    np.value(5).max(0).value().should.equal(0)

  it 'should set and get the value properly', ->
    np = new hx.NumberPicker(hx.detached('div').node(), { value: 20 })
    np.value().should.equal(20)
    np.value(0).value().should.equal(0)
