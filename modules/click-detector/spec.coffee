import { ClickDetector } from 'click-detector'
import { select } from 'selection'

export default () ->
  describe 'click-detector', ->

    exception = undefined
    elem = undefined

    beforeEach ->
      fixture = select('body')
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

    afterEach ->
      exception.remove()
      elem.remove()

    it 'should correctly add exceptions', ->
      cd = new ClickDetector
      cd.addException(document.getElementById('exception'))

      cd.exceptions.size.should.equal(1)
      cd.exceptions.entries().should.eql([document.getElementById('exception')])

    it 'should correctly remove exceptions', ->
      cd = new ClickDetector
      cd.addException(document.getElementById('exception'))

      cd.exceptions.size.should.equal(1)
      cd.exceptions.entries().should.eql([document.getElementById('exception')])
      cd.removeException(document.getElementById('exception'))
      cd.exceptions.size.should.equal(0)

      cd.removeException(document.getElementById('elem'))
      cd.exceptions.size.should.equal(0)

    it 'should correctly clear exceptions', ->
      cd = new ClickDetector
      cd.addException(document.getElementById('exception'))

      cd.exceptions.size.should.equal(1)
      cd.exceptions.entries().should.eql([document.getElementById('exception')])

      cd.removeAllExceptions()

      cd.exceptions.size.should.equal(0)
      cd.exceptions.entries().should.eql([])

    it 'should emit the click event when a pointerdown event is called', ->
      cd = new ClickDetector
      val = 0
      cd.on 'click', ->
        val += 1

      document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})

      val.should.equal(1)

    it 'should emit the click event when a pointerup event is called', ->
      cd = new ClickDetector
      val = 0
      cd.on 'click', ->
        val += 1

      document.__hx__.eventEmitter.emit('pointerup', { event: {target: document.getElementById('elem')}})

      val.should.equal(1)


    it 'should not emit an event for an exception', ->
      cd = new ClickDetector
      cd.addException(document.getElementById('exception'))

      val = 0
      cd.on 'click', ->
        val += 1

      document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('exception')}})
      document.__hx__.eventEmitter.emit('pointerup', { event: {target: document.getElementById('exception')}})

      val.should.equal(0)

    it 'should emit an event for an element that is not an exception', ->
      cd = new ClickDetector
      cd.addException(document.getElementById('exception'))

      val = 0
      cd.on 'click', ->
        val += 1

      document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})
      document.__hx__.eventEmitter.emit('pointerup', { event: {target: document.getElementById('elem')}})

      val.should.equal(2)

    it 'should correctly check for the original element when pointerup is called on a different element to that of pointerdown', ->
      cd = new ClickDetector
      val = 0
      cd.on 'click', ->
        val += 1

      document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})
      document.__hx__.eventEmitter.emit('pointerup', { event: {target: document.getElementById('exception')}})

      val.should.equal(1)

    it 'should correctly deregister listeners', ->
      cd = new ClickDetector
      val = 0
      cd.on 'click', ->
        val += 1

      document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})

      val.should.equal(1)

      cd.cleanUp()

      document.__hx__.eventEmitter.emit('pointerdown', { event: {target: document.getElementById('elem')}})

      val.should.equal(1)
