import { userFacingText } from 'user-facing-text/main'
import { EventEmitter } from 'event-emitter/main'
import { select, div, span, i } from 'selection/main'
import { DragContainer } from 'drag-container/main'
import { Autocomplete } from 'autocomplete/main'
import { validateForm } from 'form/main'
import { identity, isArray, isFunction, mergeDefined } from 'utils/main'
import logger from 'logger/main'

userFacingText({
  tagInput: {
    placeholder: 'add tag...'
  }
})

createFilteredData = (filterFn, data) ->
  if isFunction data
    (term, callback) ->
      data term, (result) ->
        callback result.filter filterFn
  else if isArray data
    (term, callback) -> callback data.filter filterFn
  else
    data

class TagInput extends EventEmitter
  constructor: (@selector, options) ->
    super()

    _ = @_ = {}

    @options = mergeDefined {
      classifier: undefined
      validator: undefined
      draggable: true
      items: []
      placeholder: userFacingText('tagInput', 'placeholder')
      autocompleteData: undefined
      autocompleteOptions: {}
      excludeTags: true
      mustMatchAutocomplete: true
    }, options

    if @options.mustMatchAutocomplete
      @options.autocompleteOptions.mustMatch = true

    @selection = select(@selector)
      .classed('hx-tag-input', true)
      .api('tag-input', this)
      .api(this)

    @tagContainer = @selection.append('span').class('hx-tags-container')

    if @options.draggable
      _.dragContainer = new DragContainer(@tagContainer.node())

    isInsideForm = not @selection.closest('form').empty()

    inputContainer = @selection.append(if isInsideForm then 'div' else 'form')
      .class('hx-tag-input-container')

    validationForm = if isInsideForm
      @selection.closest('.hx-form')
    else
      inputContainer

    @input = inputContainer.append('input').attr('placeholder', @options.placeholder)
    if @options.autocompleteData?
      isValid = if @options.validator? then (item) => not @options.validator(item) else identity
      filterFn = if @options.excludeTags then (item) => isValid(item) and not ~@items().indexOf(item.toString()) else isValid
      acData = createFilteredData filterFn, @options.autocompleteData

      @_.autocomplete = new Autocomplete(@input.node(), acData, @options.autocompleteOptions)
      @_.autocomplete.on 'change', 'hx.taginput', (value) =>  # add the item to the tag list on first enter/tab
        @add value
        setTimeout (=> @_.autocomplete.show()), 0

    backspacedown = false

    hasError = =>
      name = @input.value()
      @input.node().setCustomValidity('')
      validateTagInput(true)
      if name isnt '' and @options.validator
        error = @options.validator(name) or ''
        @input.node().setCustomValidity(error)
        error.length > 0
      else
        false

    validateTagInput = (clear) =>
      if isInsideForm
        if clear
          validationForm.selectAll('.hx-form-error').remove()
        else
          validateForm(validationForm.node()).valid
      else
        validationForm.node().checkValidity()

    @input.on 'keypress', 'hx.tag-input', (event) =>
      if event.keyCode is 13
        validateTagInput()
        if @input.node().checkValidity()
          event.preventDefault()
          if not @_.autocomplete
            name = @input.value()
            if name
              _.userEvent = true
              @add name

    @input.on 'input', 'hx.tag-input', hasError

    @input.on 'keydown', 'hx.tag-input', (event) =>
      if ((event.keyCode or event.charCode) is 8) and not backspacedown
        backspacedown = true
        @input.node().setCustomValidity('')
        validateTagInput(true)

        if @input.value() is ''
          selection = @tagContainer.selectAll('.hx-tag')
          if selection.size() > 0
            @_.autocomplete?.hide()
            nodeSelection = select(selection.node(selection.size()-1))
            value = nodeSelection.text()
            nodeSelection.remove()
            @_.autocomplete?.show()
            @emit 'remove', {value: value, type: 'user'}

    @input.on 'keyup', 'hx.tag-input', (event) ->
      if (event.keyCode or event.charCode) is 8
        backspacedown = false
        true

    if not @_.autocomplete
      @input.on 'blur', 'hx.tag-input', (event) =>
        if @input.value().length > 0 and not hasError()
          _.userEvent = true
          @add(@input.value(), undefined)

    @input.on 'focus', 'hx.tag-input', (event) =>
      if not isInsideForm and hasError() then validateTagInput()

    if @options.disabled then @disabled(@options.disabled)
    if @options.items then @items(@options.items)

  # adds a tag, or an array of tags
  addTag = (tagInput, name, clasz) ->
    tagSelection = tagInput.tagContainer
      .append('div').class('hx-tag')
      .add(span('hx-tag-text').text(name))
      .add(span('hx-tag-remove')
        .add(i('hx-icon hx-icon-close')))

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
    if isArray(name)
      addTag(this, n, cssclass) for n in name
    else if name
      addTag(this, name, cssclass)
    else
      logger.warn(
        'TagInput::add',
        'Expected an array or string argument, you supplied:',
        name
      )
    @input.value('')
    if @options.draggable then @_.dragContainer.setup()
    this

  # removes a tag by name
  remove: (name) ->
    if name?
      tagsToRemove = @tagContainer
        .selectAll('.hx-tag')
        .filter((d) -> d.text() is name)

      returnValue = tagsToRemove.size()
      tagsToRemove.remove()
      tagsToRemove.forEach (d) => @emit 'remove', { value: d.text(), type: 'api' }

    else
      tagsToRemove = @tagContainer
        .selectAll('.hx-tag')

      returnValue = tagsToRemove.text()
      tagsToRemove.remove()
      tagsToRemove.forEach (d) => @emit 'remove', { value: d.text(), type: 'api' }

    if @options.draggable then @_.dragContainer.setup()
    returnValue

  # returns the tags as an array of strings
  items: (items, cssclass) ->
    if arguments.length > 0
      @remove()
      if isArray(items)
        @add(items, cssclass)
      else if items
        logger.warn(
          'TagInput::items',
          'Expected an array of items, you supplied:',
          items
        )
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

tagInput = (options) ->
  selection = div()
  new TagInput(selection, options)
  selection

export {
  tagInput,
  TagInput
}
