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

    expect(meter.value().total).toEqual(123)
    expect(meter.value().completed).toEqual(456)
    expect(meter.value().tracker).toEqual(789)
    expect(meter.value().marker).toEqual(246)
    expect(meter.value().unitText).toEqual('banana')
    expect(meter.value().markerText).toEqual('strawberry')

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

    expect(meter.value().total).toEqual(123)
    expect(meter.value().completed).toEqual(456)
    expect(meter.value().tracker).toEqual(789)
    expect(meter.value().marker).toEqual(246)
    expect(meter.value().unitText).toEqual('banana')
    expect(meter.value().markerText).toEqual('strawberry')

