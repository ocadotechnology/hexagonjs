EventEmitter = require('modules/event-emitter/main')
select = require('modules/selection/main')
utils = require('modules/util/main/utils')

class Toggle extends EventEmitter
  constructor: (selector, options) ->
    super

    @options = utils.merge.defined {
      value: false
    }, options

    @selection = select(selector)
      .classed('hx-toggle', true)
      .api(this)

    @toggle = @selection.append('div')
      .class('hx-toggle-box')

    @value(@options.value)

    @selection.on 'click', 'hx.toggle', (e) =>
      @value(!@value())
      @emit 'change', @value()

  value: (val) ->
    if val?
      @options.value = val
      @toggle.classed('hx-toggle-box-on', val)
      this
    else
      @options.value

toggle = (options) ->
  selection = select.detached('div')
  new Toggle(selection.node(), options)
  selection

module.exports = toggle
module.exports.Toggle = Toggle

module.exports.hx = {
  toggle,
  Toggle
}
