import { select, detached, div } from 'utils/selection'
import { userFacingText } from 'utils/user-facing-text'
import emit from 'test/utils/fake-event'

import { Meter } from 'components/meter'

export default () ->
  describe 'meter', ->
    # fixture = select('body').append(div('hx-test-meter'))
    fixture = undefined

    beforeEach ->
      fixture = select('body').append(div('hx-test-meter'))

    afterEach ->
      # fixture.remove()

    it 'should set and get values', ->
      meter = new Meter(fixture.append(div()))

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
      meter = new Meter(fixture.append(div()))

      meter.value({
        completed: 456,
        tracker: 789,
        total: 123
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

    it 'should define user facing text', ->
      userFacingText('meter', 'of').should.equal('of')

    it 'emit an event when rendering with cause "api" when value method is called with data', (done) ->
      selection = fixture
        .append 'div'
        .style 'width', '500px'
        .style 'height', '500px'
      meter = new Meter(selection.node())

      data =
        marker: 246,
        markerText: 'strawberry',
        unitText: 'banana',
        completed: 456,
        tracker: 789,
        total: 123

      renderSpy = chai.spy (obj) ->
        obj.should.eql({cause: 'api', data: data})
        done()

      meter.on 'render', renderSpy
      renderSpy.should.not.have.been.called()

      meter.value(data)
      renderSpy.should.have.been.called()

    it 'emit an event when rendering with cause "user" when resizing the meter', (done) ->
      selection = fixture
        .append 'div'
        .style 'width', '500px'
        .style 'height', '500px'

      data =
        marker: 246,
        markerText: 'strawberry',
        unitText: 'banana',
        completed: 456,
        tracker: 789,
        total: 123

      meter = new Meter(selection.node())
      renderSpy = chai.spy (obj) ->
        obj.should.eql({cause: 'user', data: data})

      meter.value(data)

      meter.on 'render', renderSpy
      selection.style 'width', '400px'
      emit(selection.node(), 'resize')
      renderSpy.should.have.been.called()
      done()

    it 'should redraw on resize when the option is false', ->
      selection = fixture
        .append 'div'
        .style 'width', '500px'
        .style 'height', '500px'

      data =
        marker: 246,
        markerText: 'strawberry',
        unitText: 'banana',
        completed: 456,
        tracker: 789,
        total: 123

      meter = new Meter(selection.node(), redrawOnResize: false)
      meter.value(data)
      renderSpy = chai.spy()
      meter.on 'render', renderSpy
      selection.style 'width', '400px'
      emit(selection.node(), 'resize')

      renderSpy.should.not.have.been.called()


    it 'should use a default value formatter', ->
      selection = fixture
        .append 'div'

      meter = new Meter(selection.node())

      data =
        completed: 456,
        tracker: 789,
        total: 123

      meter.value(data)
      selection.select '.hx-meter-completed'
        .text().should.equal data.completed.toString()

      selection.select '.hx-meter-total'
        .text().should.equal "of #{data.total}"

    it 'should use a custom value formatter', ->
      selection = fixture
        .append 'div'

      valueFormatter = (value, isTotal) ->
        if isTotal then 'total' else 'completed'

      meter = new Meter(selection.node(), valueFormatter: valueFormatter)

      data =
        completed: 456,
        tracker: 789,
        total: 123

      meter.value(data)
      selection.select '.hx-meter-completed'
        .text().should.equal 'completed'

      selection.select '.hx-meter-total'
        .text().should.equal 'total'

    it 'should not render when the container size is 0', ->
      selection = fixture
        .append 'div'
        .style 'width', '0px'
        .style 'height', '0px'

      data =
        marker: 246,
        markerText: 'strawberry',
        unitText: 'banana',
        completed: 456,
        tracker: 789,
        total: 123

      meter = new Meter(selection.node(), {redrawOnResize: false})
      meter.value(data)
      renderSpy = chai.spy()
      meter.on 'render', renderSpy
      meter.render()
      renderSpy.should.not.have.been.called()
      selection
        .style('height', '100px')
        .style('width', '100px')
      emit(selection.node(), 'resize')
      meter.render()
      renderSpy.should.have.been.called()

