describe 'hx-meter', ->

  it 'should set and get values', ->
    meter = new hx.Meter(document.createElement('div'))

    meter.value({
      total: 123,
      completed: 456,
      tracker: 789,
      marker: 246,
      markerText: 'strawberry',
      unitText: 'banana'

    })

    meter.value().total.should.equal(123)
    meter.value().completed.should.equal(456)
    meter.value().tracker.should.equal(789)
    meter.value().marker.should.equal(246)
    meter.value().unitText.should.equal('banana')
    meter.value().markerText.should.equal('strawberry')

  it 'setting partial values should be fine', ->
    meter = new hx.Meter(document.createElement('div'))

    meter.value({
      completed: 456,
      tracker: 789,
      total: 123,
    })

    meter.value({
      marker: 246,
      markerText: 'strawberry',
      unitText: 'banana'
    })

    meter.value().total.should.equal(123)
    meter.value().completed.should.equal(456)
    meter.value().tracker.should.equal(789)
    meter.value().marker.should.equal(246)
    meter.value().unitText.should.equal('banana')
    meter.value().markerText.should.equal('strawberry')

