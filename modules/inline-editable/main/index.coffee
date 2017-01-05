hx.userFacingText({
  inlineEditable: {
    enterValue: 'Enter Value'
  }
})

class InlineEditable extends hx.InlineMorphSection

  enterEditMode = (options) -> (toggle, content) ->
    value = hx.select(toggle).text()
    inputSel = hx.select(content).select('.hx-name')
    if value isnt options.enterValueText
      inputSel.value(value)
    inputSel.node().focus()
    hx.select(content).select('.hx-confirm').on 'click', 'hx.inline-editable', =>
      value = hx.select(content).select('.hx-name').value()
      @textSelection.text(value || options.enterValueText)
        .classed('hx-inline-editable-no-value', !value.length)
      @emit('change', { cause: 'user', value: value })
      this.hide()

  constructor: (@selector, opts) ->
    # MorphSection registers the component
    selection = hx.select(@selector).classed('hx-inline-editable', true)

    defaultOptions = {
      enterValueText: hx.userFacingText('inlineEditable', 'enterValue'),
      value: selection.text()
    }

    options = hx.merge defaultOptions, opts

    selection.text('')

    @textSelection = selection.append('a').class('hx-morph-toggle').text(options.value || options.enterValueText)

    selection.append('div').class('hx-morph-content hx-input-group')
      .add hx.detached('input').class('hx-name').attr('placeholder', options.enterValueText)
      .add hx.detached('button').class('hx-btn hx-positive hx-confirm').add(hx.detached('i').class('hx-icon hx-icon-check'))

    super(@selector, enterEditMode(options))

  value: (value) ->
    if value isnt undefined
      @textSelection.text(value)
      @emit('change', { cause: 'api', value: value })
    else
      @textSelection.text()

hx.inlineEditable = (options) ->
  selection = hx.detached('div')
  new InlineEditable(selection.node(), options)
  selection

hx.InlineEditable = InlineEditable