class TagInput extends hx.EventEmitter

  constructor: (@selector, options) ->
    super

    _ = @_ = {}

    @options = hx.merge.defined {
      classifier: undefined
      validator: undefined
      draggable: true
      items: []
    }, options

    hx.component.register(@selector, this)

    @selection = hx.select(@selector).classed('hx-tag-input', true)
    @tagContainer = @selection.append('span').class('hx-tags-container')

    if @options.draggable
      _.dragContainer = new hx.DragContainer(@tagContainer.node())

    @form = @selection.append('form')
    @input = @form.append('input').attr('placeholder', 'add tag...')

    backspacedown = false

    hasError = =>
      name = @input.value()
      if name is ''
        @input.node().setCustomValidity('')
        false
      else if @options.validator
        error = @options.validator(name) or ''
        @input.node().setCustomValidity(error)
        error.length > 0

    @form.on 'keypress', 'hx.tag-input', (event) =>
      if event.keyCode is 13
        if @form.node().checkValidity()
          event.preventDefault()
          name = @input.value()
          if name
            _.userEvent = true
            @add(name, undefined)

    @input.on 'input', 'hx.tag-input', hasError

    @input.on 'keydown', 'hx.tag-input', (event) =>
      if ((event.keyCode or event.charCode) is 8) and not backspacedown
        backspacedown = true
        @input.node().setCustomValidity('')

        if @input.value() is ''
          selection = @tagContainer.selectAll('.hx-tag')
          if selection.size() > 0
            nodeSelection = hx.select(selection.node(selection.size()-1))
            value = nodeSelection.text()
            nodeSelection.remove()
            @emit 'remove', {value: value, type: 'user'}

    @input.on 'keyup', 'hx.tag-input', (event) ->
      if (event.keyCode or event.charCode) is 8
        backspacedown = false
        true

    @input.on 'blur', 'hx.tag-input', (event) =>
      if @input.value().length > 0 and not hasError()
        @add(@input.value(), undefined)

    @input.on 'focus', 'hx.tag-input', (event) =>
      if hasError() then @form.node().checkValidity()

    if @options.disabled then @disabled(@options.disabled)
    if @options.items then @items(@options.items)

  # adds a tag, or an array of tags
  addTag = (tagInput, name, clasz) ->
    tagSelection = tagInput.tagContainer
      .append('div').class('hx-tag')
      .add(hx.detached('span').class('hx-tag-text').text(name))
      .add(hx.detached('span').class('hx-tag-remove')
        .add(hx.detached('i').class('hx-icon hx-icon-close')))

    if tagInput.options.draggable
      tagSelection.classed('hx-drag-element', true)
        .select('.hx-tag-text').classed('hx-drag-control', true)

    if clasz
      tagSelection.classed(clasz, true)

    tagSelection.classed('hx-disabled', tagInput._.disabled)

    if tagInput.options.classifier
      cls = tagInput.options.classifier(name)
      if cls then tagSelection.classed(cls, true)

    tagSelection.select('.hx-tag-remove').on 'click', 'hx.tag-input', =>
      if not tagInput._.disabled and not tagSelection.classed('hx-disabled')
        value = tagSelection.text()
        tagSelection.remove()
        tagInput.emit 'remove', { value: value, type: 'user'}

    tagInput.emit 'add', {value: name, type: if tagInput._.userEvent then 'user' else 'api'}
    tagInput._.userEvent = false



  add: (name, cssclass) ->
    if hx.isArray(name)
      addTag(this, n, cssclass) for n in name
    else
      addTag(this, name, cssclass)
    @input.value('')
    if @options.draggable then @_.dragContainer.setup()
    this

  # removes a tag by name
  remove: (name) ->
    if name?
      returnValue = @tagContainer
        .selectAll('.hx-tag')
        .filter((d) -> d.text() is name)
        .forEach (d) => @emit 'remove', { value: d.text(), type: 'api' }
        .remove()
        .length
    else
      tags = @tagContainer
        .selectAll('.hx-tag')
        .forEach (d) => @emit 'remove', { value: d.text(), type: 'api' }
      returnValue = tags.text()
      tags.remove()
    if @options.draggable then @_.dragContainer.setup()
    returnValue

  # returns the tags as an array of strings
  items: (items, cssclass) ->
    if arguments.length > 0
      @remove()
      @add(items, cssclass)
      this
    else
      @tagContainer.selectAll('.hx-tag').select('.hx-tag-text').text()

  disabled: (disable) ->
    if disable?
      @_.disabled = disable
      @input.attr('disabled', if disable then true else undefined)
      @tagContainer.selectAll('.hx-tag').classed('hx-disabled', disable)
        .classed('hx-drag-element', @options.draggable && !disable)
      if @options.draggable then @_.dragContainer.setup()
      this
    else
      !!@_.disabled

hx.tagInput = (options) ->
  selection = hx.detached('div')
  new TagInput(selection.node(), options)
  selection

hx.TagInput = TagInput