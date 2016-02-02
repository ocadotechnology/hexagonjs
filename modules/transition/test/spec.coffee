describe 'hx-transition', ->
  savedHxLoop = hx.loop

  clock = undefined
  beforeAll -> clock = sinon.useFakeTimers()
  afterAll -> clock.restore()

  beforeEach ->
    # mock hx.loop
    hx_requestAnimationFrame = (f) ->
      setTimeout(f, 1)
    hx_loop_update = (f, g) -> if not f() then hx_requestAnimationFrame(g)
    savedHxLoop = hx.loop
    hx.loop = hx_loop = (f) ->
      g = -> hx_loop_update(f, g)
      hx_loop_update(f, g)

    baseTime = new Date(2013, 0, 1)


  afterEach ->
    hx.loop = savedHxLoop

  it 'hx.loop: should not loop if true is returned', ->
    count = 0
    cb = ->
      count++
      true
    hx.loop cb
    clock.tick(5)
    expect(count).toBe(1)

  it 'hx.loop: should not loop if true is returned', ->
    count = 0
    cb = ->
      count++
      count==2
    hx.loop cb
    clock.tick(5)
    expect(count).toBe(2)

  it 'hx.ease: linear', ->
    expect(hx.ease.linear(0.5)).toBe(0.5)
    expect(hx.ease.linear(0)).toBe(0)
    expect(hx.ease.linear(1)).toBe(1)
    expect(hx.ease.linear(0.75)).toBe(0.75)

  it 'hx.ease: quad', ->
    expect(hx.ease.quad(0.5)).toBe(0.25)
    expect(hx.ease.quad(0)).toBe(0)
    expect(hx.ease.quad(1)).toBe(1)
    expect(hx.ease.quad(0.75)).toBeCloseTo(0.5625)

  it 'hx.ease: cubic', ->
    expect(hx.ease.cubic(0.5)).toBe(0.125)
    expect(hx.ease.cubic(0)).toBe(0)
    expect(hx.ease.cubic(1)).toBe(1)
    expect(hx.ease.cubic(0.75)).toBeCloseTo(0.421875)

  it 'hx.transition: should call the callback the right number of times', ->
    count = 0
    end = false
    hx.transition 5, (-> count++), undefined, ->
      end = true
    clock.tick(5)
    expect(end).toEqual(true)
    expect(count).toBeGreaterThan(1)

  it 'hx.transition: should be fine without an end callback', ->
    count = 0
    hx.transition(5, (-> count++))
    clock.tick(5)
    expect(count).toBeGreaterThan(1)

  it 'hx.transition: should call the callback with the right values', ->
    values = []
    cb = (d) ->
      values.push d

    hx.transition 60, cb, hx.ease.linear

    clock.tick(60)

    expect(values).toEqual(values.slice().sort()) # check the values are ascending
    expect(values[values.length-1]).toEqual(1)


  it 'hx.transition: should call the end callback', ->
    called = false
    hx.transition 1, (->), undefined, (cancelled) ->
      expect(cancelled).toEqual(false)
      called = true

    clock.tick(1)
    expect(called).toBe(true)

  it 'hx.transition: cancelling should work', ->
    can = false
    stop = hx.transition 1000, (->), undefined, (cancelled) ->
      can = cancelled

    stop()
    clock.tick(1)
    expect(can).toEqual(true)


  it 'hx.transition: giving negative duration should result in the transition instantly finishing', (done) ->
    stop = hx.transition -1000, (->), undefined, (cancelled) ->
      expect(cancelled).toEqual(false)
      done()

  it 'hx.transition: giving negative duration should result in the transition instantly finishing', ->
    value = -1
    hx.transition -1000, ((v) -> value = v), undefined
    clock.tick(1)
    expect(value).toEqual(1)
