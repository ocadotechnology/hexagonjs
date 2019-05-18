import { select, Selection } from 'utils/selection'
import { userFacingText } from 'utils/user-facing-text'
import { InlineEditable, inlineEditable } from 'components/inline-editable'

import installFakeTimers from 'test/utils/fake-time'
import emit from 'test/utils/fake-event'

export default () ->
  describe 'inline-editable', ->
    fixture = undefined
    clock = undefined
    animationDelay = 201

    before ->
      clock = installFakeTimers();
      fixture = select('body').append('div')

    beforeEach ->
      fixture.clear()

    after ->
      clock.restore();
      fixture.remove()

    it 'should have user facing text defined', ->
      userFacingText('inlineEditable', 'enterValue').should.equal('Enter Value')

    it 'should use the text of the selection used to create it as the value', ->
      container = fixture.append('div').text('test')
      ie = new InlineEditable(container)
      ie.value().should.equal('test')

    it 'should correctly set the input value', ->
      container = fixture.append('div').text('test')
      ie = new InlineEditable(container)
      input = container.select('.hx-name')
      input.value().should.equal('')
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.value().should.equal('test')

    it 'should use the value option correctly', ->
      container = fixture.append('div').text('test')
      ie = new InlineEditable(container, {
        value: 'Dave'
      })
      ie.value().should.equal('Dave')

    it 'should emit the change event when the value is updated using the api', ->
      container = fixture.append('div')
      ie = new InlineEditable(container)
      spy = chai.spy()
      ie.on 'change', spy
      ie.value('test')
      spy.should.have.been.called.with({
        cause: 'api',
        value: 'test'
      })

    it 'should emit the change event when the value is updated', ->
      container = fixture.append('div')
      ie = new InlineEditable(container)
      spy = chai.spy()
      ie.on 'change', spy
      input = container.select('.hx-name')
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.value('bob')
      emit(container.select('.hx-confirm').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      spy.should.have.been.called.with({
        cause: 'user',
        value: 'bob'
      })

    it 'should show and focus the input when clicked', ->
      container = fixture.append('div')
      ie = new InlineEditable(container)
      input = container.select('.hx-name').node()
      content = container.select('.hx-morph-content')
      input.should.not.equal(document.activeElement)
      content.style('display').should.equal('none')
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.should.equal(document.activeElement)
      content.style('display').should.not.equal('none')

    it 'should show the enterValueText when no value is provided', ->
      container = fixture.append('div')
      ie = new InlineEditable(container)
      container.text().should.equal('Enter Value')

    it 'should use the provided enterValueText', ->
      container = fixture.append('div')
      ie = new InlineEditable(container, {
        enterValueText: 'Bob'
      })
      container.text().should.equal('Bob')

    it 'should show the enterValueText when the value is cleared', ->
      container = fixture.append('div').text('test')
      ie = new InlineEditable(container)
      input = container.select('.hx-name')
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.value('')
      emit(container.select('.hx-confirm').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      container.text().should.equal('Enter Value')

    it 'should set the value when enter is pressed', ->
      container = fixture.append('div')
      ie = new InlineEditable(container)
      spy = chai.spy()
      ie.on 'change', spy
      input = container.select('.hx-name')
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.value('bob')
      emit(input.node(), 'keydown', { key: 'Enter' })
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      spy.should.have.been.called.with({
        cause: 'user',
        value: 'bob'
      })

    it 'should support deprecated event values', ->
      container = fixture.append('div')
      ie = new InlineEditable(container)
      spy = chai.spy()
      ie.on 'change', spy
      input = container.select('.hx-name')
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.value('bob')
      emit(input.node(), 'keydown', { keyCode: 13 })
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      spy.should.have.been.called.with({
        cause: 'user',
        value: 'bob'
      })
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.value('steve')
      emit(input.node(), 'keydown', { which: 13 })
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      spy.should.have.been.called.with({
        cause: 'user',
        value: 'steve'
      })

    it 'should allow the user to enter text', ->
      container = fixture.append('div')
      ie = new InlineEditable(container)
      spy = chai.spy()
      ie.on 'change', spy
      input = container.select('.hx-name')
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.value('bob')
      emit(input.node(), 'keydown', {})
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      spy.should.not.have.been.called()

    it 'should show the enterValueText when the value is cleared', ->
      container = fixture.append('div').text('test')
      ie = new InlineEditable(container, {
        enterValueText: 'Bob'
      })
      input = container.select('.hx-name')
      emit(container.select('.hx-morph-toggle').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      input.value('')
      emit(container.select('.hx-confirm').node(), 'click')
      clock.tick(animationDelay)
      clock.tick(animationDelay)
      container.text().should.equal('Bob')

    describe 'fluid', ->
      it 'should return a selection', ->
        (inlineEditable() instanceof Selection).should.equal(true)

      it 'should use the value option', ->
        ie = inlineEditable({
          value: 'Bob'
        })
        ie.api().value().should.equal('Bob')

      it 'should use the enterValueText option', ->
        ie = inlineEditable({
          value: 'Bob'
        })
        ie.api().value().should.equal('Bob')
