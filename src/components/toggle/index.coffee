import { EventEmitter } from 'utils/event-emitter'
import { select, div } from 'utils/selection'
import { mergeDefined } from 'utils/utils'

class Toggle extends EventEmitter
  constructor: (selector, options) ->
    super()

    @options = mergeDefined({
      value: false
      disabled: false
    }, options)

    @selection = select(selector)
      .classed('hx-toggle', true)
      .api('toggle', this)
      .api(this)

    @toggle = @selection.append('div')
      .class('hx-toggle-box')

    @value(@options.value)

    @disabled(@options.disabled)

    @selection.on 'click', 'hx.toggle', (e) =>
      if (!@disabled())
        @value(!@value())
        @emit 'change', @value()

  value: (val) ->
    if val?
      @options.value = val
      @toggle.classed('hx-toggle-box-on', val)
      this
    else
      @options.value

  disabled: (val) ->
    if val?
      @options.disabled = val
      @toggle.classed('hx-toggle-disabled', val)
      this
    else
      @options.disabled

toggle = (options) ->
  selection = div()
  new Toggle(selection.node(), options)
  selection

export {
  toggle,
  Toggle
}
