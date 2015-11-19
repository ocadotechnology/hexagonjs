class InlineEditable extends hx.InlineMorphSection

  enterEditMode = (toggle, content) ->
    hx.select(content).select('.hx-name').value(hx.select(toggle).text())
    hx.select(content).select('.hx-confirm').on 'click', 'hx.inline-editable', =>
      value = hx.select(content).select('.hx-name').value()
      @textSelection.text(value)
      @emit('change', {api: false, value: value})
      this.hide()

  constructor: (@selector) ->
    # MorphSection registers the component

    selection = hx.select(@selector).classed('hx-inline-editable', true)

    text = selection.text()
    selection.text('')
    @textSelection = selection.append('a').class('hx-morph-toggle').text(text)

    selection.append('div').class('hx-morph-content hx-input-group')
      .add hx.detached('input').class('hx-name')
      .add hx.detached('button').class('hx-btn hx-positive hx-confirm').add(hx.detached('i').class('hx-icon hx-icon-check'))

    super(@selector, enterEditMode, ->)

  value: (value) ->
    if value isnt undefined
      @textSelection.text(value)
      @emit('change', {api: false, value: value})
    else
      @textSelection.text()

hx.inlineEditable = (options) ->
  selection = hx.detached('div')
  new InlineEditable(selection.node(), options)
  selection

hx.InlineEditable = InlineEditable