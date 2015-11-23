describe 'ClickDetector', ->

  cd = null
  beforeEach ->
    fixture = hx.select('body')
    exception = fixture.append('div')
      .style('width', '50px')
      .style('height', '50px')
      .style('margin', '0 auto')
      .attr('id', 'exception')
    elem = fixture.append('div')
      .style('width', '50px')
      .style('height', '50px')
      .style('margin', '0 auto')
      .attr('id', 'elem')


    cd = new hx.ClickDetector()

  afterEach ->
    cd = null

  it 'should correctly add exceptions', ->
    cd.addException(document.getElementById('exception'))

    expect(cd.exceptions.size).toEqual(1)
    expect(cd.exceptions.entries()).toEqual([document.getElementById('exception')])

  it 'should correctly remove exceptions', ->
    cd.addException(document.getElementById('exception'))

    expect(cd.exceptions.size).toEqual(1)
    expect(cd.exceptions.entries()).toEqual([document.getElementById('exception')])
    cd.removeException(document.getElementById('exception'))
    expect(cd.exceptions.size).toEqual(0)

    cd.removeException(document.getElementById('elem'))
    expect(cd.exceptions.size).toEqual(0)

  it 'should correctly clear exceptions', ->
    cd.addException(document.getElementById('exception'))

    expect(cd.exceptions.size).toEqual(1)
    expect(cd.exceptions.entries()).toEqual([document.getElementById('exception')])

    cd.removeAllExceptions()

    expect(cd.exceptions.size).toEqual(0)
    expect(cd.exceptions.entries()).toEqual([])

  it 'should emit the click event when a pointerdown event is called', ->
    val = 0
    cd.on 'click', ->
      val += 1

    document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})

    expect(val).toEqual(1)

  it 'should emit the click event when a pointerup event is called', ->
    val = 0
    cd.on 'click', ->
      val += 1

    document.__hx__.eventEmitter.emit('pointerup', { event: {target: document.getElementById('elem')}})

    expect(val).toEqual(1)


  it 'should not emit an event for an exception', ->
    cd.addException(document.getElementById('exception'))

    val = 0
    cd.on 'click', ->
      val += 1

    document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('exception')}})
    document.__hx__.eventEmitter.emit('pointerup', { event: {target: document.getElementById('exception')}})

    expect(val).toEqual(0)

  it 'should emit an event for an element that is not an exception', ->
    cd.addException(document.getElementById('exception'))

    val = 0
    cd.on 'click', ->
      val += 1

    document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})
    document.__hx__.eventEmitter.emit('pointerup', { event: {target: document.getElementById('elem')}})

    expect(val).toEqual(2)

  it 'should correctly check for the original element when pointerup is called on a different element to that of pointerdown', ->
    val = 0
    cd.on 'click', ->
      val += 1

    document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})
    document.__hx__.eventEmitter.emit('pointerup', { event: {target: document.getElementById('exception')}})

    expect(val).toEqual(1)

  it 'should correctly deregister listeners', ->
    val = 0
    cd.on 'click', ->
      val += 1

    document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})

    expect(val).toEqual(1)

    cd.cleanUp()

    document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})

    expect(val).toEqual(1)