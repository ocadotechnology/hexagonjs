import { detached, select } from 'utils/selection'
import { InlineMorphSection } from 'components/morph-section'
import { merge } from 'utils/utils'
import { userFacingText } from 'utils/user-facing-text'

userFacingText({
  inlineEditable: {
    enterValue: 'Enter Value'
  }
})

export class InlineEditable extends InlineMorphSection
  enterEditMode = (options) -> (toggle, content) ->
    value = select(toggle).text()
    inputSel = select(content).select('.hx-name')
    if value isnt options.enterValueText
      inputSel.value(value)
    inputSel.node().focus()

  constructor: (selector, opts) ->
    # MorphSection registers the component
    selection = select(selector).classed('hx-inline-editable', true)

    defaultOptions = {
      enterValueText: userFacingText('inlineEditable', 'enterValue'),
      value: selection.text()
    }

    options = merge defaultOptions, opts


    selection.text('')

    textSelection = selection.append('a').class('hx-morph-toggle').text(options.value || options.enterValueText)

    input = detached('input').class('hx-name').attr('placeholder', options.enterValueText)
    confirm = detached('button').class('hx-btn hx-positive hx-confirm').add(detached('i').class('hx-icon hx-icon-check'))

    selection.append('div').class('hx-morph-content hx-input-group')
      .add input
      .add confirm

    super(selector, enterEditMode(options))

    @textSelection = textSelection

    setValue = =>
      value = input.value()
      @textSelection.text(value || options.enterValueText)
        .classed('hx-inline-editable-no-value', !value.length)
      @emit('change', { cause: 'user', value: value })
      @hide()

    confirm.on 'click', 'hx.inline-editable', setValue
    input.on 'keydown', 'hx.inline-editable', (e) ->
      if e.key is 'Enter' or e.keyCode is 13 or e.which is 13
        setValue()

  value: (value) ->
    if value isnt undefined
      @textSelection.text(value)
      @emit('change', { cause: 'api', value: value })
    else
      @textSelection.text()

export inlineEditable = (options) ->
  selection = detached('div')
  new InlineEditable(selection.node(), options)
  selection
