hx.userFacingText({
  form: {
    pleaseSelectAValue: 'Please select a value from the list',
    pleaseAddAValue: 'Please add at least one item'
  }
})

# XXX: Refactor into constructor in 2.0.0
getButtons = (form) ->
  selection = hx.select(form.selector)
  sel = selection.select('.hx-form-buttons')
  buttons = if sel.empty()
    selection.append('div').class('hx-form-buttons')
  else sel

class Form extends hx.EventEmitter
  constructor: (@selector) ->
    super
    hx.component.register(@selector, this)

    @formId = "form-"+hx.randomId() + '-'
    @properties = new hx._.Map
    hx.select(@selector)
      .classed('hx-form', true)
      .on 'keypress', 'hx.form-builder', (e) ->
        target = hx.select(e.target || e.srcElement)
        if e.keyCode == 13 and target.attr('type') != 'submit' and target.attr('type') != 'textarea'
          e.preventDefault()

  add: (name, type, nodeType, f) ->
    id = @formId + name.split(" ").join("-")
    formSel = hx.select(@selector)
    entry = formSel.append('div')

    formSel.append(getButtons(this))

    entry.append('label').attr("for", id).text(name)
    selection = entry.append(nodeType).attr("id",id)
    extras = f.call(selection) or {}
    key = extras.key || name
    # We don't want or need the key in the extras after this point
    delete extras.key

    # Define the default function for enabling/disabling a form property
    extras.disable ?= (sel, disable) ->
      sel.attr('disabled', if disable then 'disabled' else undefined)

    @properties.set key,
      type: type
      node: selection.node()
      extras: extras

    if extras.hidden then @hidden key, extras.hidden
    if extras.disabled then @disabled key, extras.disabled
    this

  addText: (name, options={}) ->
    options.type ?= "text"
    options.attrs ?= []
    @add name, 'text', 'input', ->
      selection = @attr('type', options.type)
      if options.autoCompleteData? and options.type isnt "password" and options.type isnt "number"
        new hx.AutoComplete(selection.node(),
          options.autoCompleteData,
          options.autoCompleteOptions ?= undefined)
      if options.placeholder? then selection.attr('placeholder', options.placeholder)
      if options.required then selection.attr('required', options.required)
      selection.attr(attr.type, attr.value) for attr in options.attrs
      if options.validator? then selection.node().oninput = (e) => e.target.setCustomValidity(options.validator(e) || "")
      if options.value then selection.node().value = options.value
      {
        required: options.required
        key: options.key
        hidden: options.hidden
        disabled: options.disabled
      }

  addTextArea: (name, options={}) ->
    options.type ?= "textarea"
    options.attrs ?= []
    @add name, 'textarea', 'textarea', ->
      selection = @attr('type', options.type)
      if options.placeholder? then selection.attr('placeholder', options.placeholder)
      if options.required then selection.attr('required', options.required)
      selection.attr(attr.type, attr.value) for attr in options.attrs
      if options.validator? then selection.node().oninput = (e) => e.target.setCustomValidity(options.validator(e) || "")
      if options.value then selection.node().value = options.value
      {
        required: options.required
        key: options.key
        hidden: options.hidden
        disabled: options.disabled
      }

  addEmail: (name, options={}) ->
    options.type = "email"
    @addText(name, options)

  addUrl: (name, options={}) ->
    options.type = "url"
    @addText(name, options)

  addNumber: (name, options={}) ->
    options.type = "number"
    options.attrs = [{type: 'step', value: options.step}]
    if options.min? then options.attrs.push {type: 'min', value: options.min}
    if options.max? then options.attrs.push {type: 'max', value: options.max}
    @addText(name, options)

  addPassword: (name, options={}) ->
    options.type = "password"
    @addText(name, options)

  addPicker: (name, values, options = {}) ->
    @add name, 'select', 'div', ->
      elem = @append('button')
        .attr('type', 'button')
        .class(options.buttonClass)

      pickerOptions = hx.merge({}, options.pickerOptions)

      if values.length > 0
        pickerOptions.items = values

      picker = new hx.Picker(elem.node(), pickerOptions)
      input = @append('input').class('hx-hidden-form-input').attr('size', 0)
      @style('position', 'relative')

      picker.value(values[0]) unless typeof options.required is 'boolean'

      setValidity = () ->
        input.node().setCustomValidity(hx.userFacingText('form', 'pleaseSelectAValue'))

      if options.required
        setValidity()
        picker.on 'change', 'hx.form-builder', ({ value, cause }) ->
          if value is undefined
            setValidity()
          else
            input.node().setCustomValidity('')

      {
        required: options.required
        componentNode: elem.node()
        key: options.key
        hidden: options.hidden
        disabled: options.disabled
        disable: (selection, disabled) -> picker.disabled(disabled)
      }

  addAutocompletePicker: (name, values, options = {}) ->
    @add name, 'select', 'div', ->
      elem = @append('button')
        .attr('type', 'button')
        .class(options.buttonClass)

      autocompletePickerOptions = hx.merge({buttonClass: options.buttonClass}, options.autocompletePickerOptions)

      if values.length > 0
        autocompletePickerOptions.items = values

      autocompletePicker = new hx.AutocompletePicker(elem.node(), values, autocompletePickerOptions)
      input = @append('input').class('hx-hidden-form-input').attr('size', 0)
      @style('position', 'relative')

      autocompletePicker.value(values[0]) unless typeof options.required is 'boolean'

      setValidity = () ->
        input.node().setCustomValidity(hx.userFacingText('form', 'pleaseSelectAValue'))

      if options.required
        setValidity()
        autocompletePicker.on 'change', 'hx.form-builder', ({ value, cause }) ->
          if value is undefined
            setValidity()
          else
            input.node().setCustomValidity('')

      {
        required: options.required
        componentNode: elem.node()
        key: options.key
        hidden: options.hidden
        disabled: options.disabled
        disable: (selection, disabled) -> autocompletePicker.disabled(disabled)
      }

  addCheckbox: (name, options = {}) ->
    @add name, 'checkbox', 'input', ->
      @attr('type', 'checkbox')
      if options.required? then @attr('required', options.required)
      if options.value then @attr('checked', true)
      {
        required: options.required
        key: options.key
        hidden: options.hidden
        disabled: options.disabled
      }

  addRadio: (name, values, options = {}) ->
    self = this
    @add name, 'radio', 'div', ->
      id = self.formId + name.split(' ').join('-')
      count = 0
      for value in values
        selection  = @append('div').class('hx-radio-container')
        input = selection.append('input').attr('type', 'radio').attr('name', id).attr("id",id+"-"+count).value(value)
        if options.required? then input.attr('required', options.required)
        if options.value is value then input.attr('checked', true)
        selection.append('label').attr("for", id + "-" + count).text(value)
        count += 1

      {
        required: options.required
        key: options.key
        hidden: options.hidden
        disabled: options.disabled
        disable: (sel, disabled) ->
          sel.selectAll('input')
            .attr('disabled', if disabled then true else undefined)
      }

  addDatePicker: (name, options = {}) ->
    @add name, 'datepicker', 'div', ->
      elem = @append('div').node()
      datepicker = new hx.DatePicker(elem, options.datePickerOptions)

      if options.validStart? or options.validEnd?
        datepicker.validRange(options.validStart, options.validEnd)

      if options.selectRange?
        getValue = ->
          datepicker.range()

        setValue = (value) ->
          datepicker.range(value.startDate, value.endDate, false, true)

        if options.startDate? and options.endDate?
          datepicker.range(options.startDate, options.endDate, false, true)

      else
        getValue = -> datepicker.date()
        setValue = (value) -> datepicker.date(value)

      {
        key: options.key
        componentNode: elem
        getValue: getValue
        setValue: setValue
        hidden: options.hidden
        disabled: options.disabled
        disable: (sel, disabled) -> datepicker.disabled(disabled)
      }

  addTimePicker: (name, options = {}) ->
    @add name, 'timepicker', 'div', ->
      elem = @append('div').node()
      timepicker = new hx.TimePicker(elem, options.timePickerOptions)
      getValue = -> timepicker.date()
      setValue = (value) -> timepicker.date(value)

      {
        key: options.key
        componentNode: elem
        getValue: getValue
        setValue: setValue
        hidden: options.hidden
        disabled: options.disabled
        disable: (sel, disabled) -> timepicker.disabled(disabled)
      }

  addDateTimePicker: (name, options = {}) ->
    @add name, 'datetimepicker', 'div', ->
      elem = @append('div').node()
      datetimepicker = new hx.DateTimePicker(elem, options.dateTimePickerOptions)
      getValue = -> datetimepicker.date()
      setValue = (value) -> datetimepicker.date(value)
      {
        key: options.key
        componentNode: elem
        getValue: getValue
        setValue: setValue
        hidden: options.hidden
        disabled: options.disabled
        disable: (sel, disabled) -> datetimepicker.disabled(disabled)
      }

  addTagInput: (name, options = {}) ->
    self = this
    @add name, 'tagInput', 'div', ->
      elem = @append('div').node()
      if options.placeholder
        options.tagInputOptions ?= {}
        options.tagInputOptions.placeholder ?= options.placeholder

      tagInput = new hx.TagInput(elem, options.tagInputOptions)

      if options.required
        input = @select('input')

        setValidity = () ->
          input.node().setCustomValidity(hx.userFacingText('form', 'pleaseAddAValue'))

        change = () ->
          value = tagInput.items()
          if value is undefined or not value.length
            setValidity()
          else
            input.node().setCustomValidity('')

        setValidity()

        tagInput.on 'add', 'hx.form-builder', change
        tagInput.on 'remove', 'hx.form-builder', change

      {
        required: options.required
        key: options.key
        componentNode: elem
        hidden: options.hidden
        disabled: options.disabled
        disable: (sel, disabled) -> tagInput.disabled(disabled)
      }

  addFileInput: (name, options = {}) ->
    self = this
    @add name, 'fileInput', 'div', ->
      elem = @append('div').node()
      fileInput = new hx.FileInput(elem, options.fileInputOptions)
      {
        key: options.key
        componentNode: elem
        hidden: options.hidden
        disabled: options.disabled
        disable: (sel, disabled) -> fileInput.disabled(disabled)
      }

  addToggle: (name, options = {}) ->
    self = this
    @add name, 'toggle', 'div', ->
      elem = @append('div').class('hx-btn hx-btn-invisible hx-no-pad-left').node()
      toggle = new hx.Toggle(elem, options.toggleOptions)
      {
        key: options.key
        componentNode: elem
        hidden: options.hidden
        disabled: options.disabled
        disable: (sel, disabled) -> toggle.disabled(disabled)
      }

  addButton: (text, action, opts = {}) =>
    id = @formId + text.split(" ").join("-")
    options = hx.merge({
      key: text,
      context: 'action',
      buttonType: 'button',
      icon: undefined,
      hidden: false,
      disabled: false,
    }, opts)

    button = hx.detached('button')
      .attr('type', options.buttonType)
      .attr('id',id)
      .class("hx-btn hx-#{options.context}")
      .add(if options.icon then hx.detached('i').class(options.icon) else undefined)
      .add(hx.detached('span').text(" " + text))
      .on 'click', 'hx.form-builder', (e) =>
        e.preventDefault()
        action?()

    elem = getButtons(this).append('div').add(button)

    @properties.set options.key,
      type: 'submit'
      node: button.node()
      extras: {
        disable: (s, disabled) -> button.attr('disabled', if disabled then 'disabled' else undefined)
      }

    if options.hidden then @hidden options.key, options.hidden
    if options.disabled then @disabled options.key, options.disabled
    this

  addSubmit: (text, icon, submitAction, options = {}) ->
    @addButton(text, (submitAction or () => @submit()), {
      key: text or options.key,
      context: 'action',
      buttonType: 'submit',
      icon: icon,
      hidden: options.hidden,
      disabled: options.disabled,
    })

  submit: ->
    {valid, errors} = hx.validateForm(@selector)
    if valid then @emit('submit', @data())
    this

  data: (data) ->
    if arguments.length > 0
      @value(key, value) for own key, value of data
      this
    else
      result = {}
      @properties.forEach (key, it) =>
        if not it.hidden and it.type isnt 'submit'
          result[key] = @value(key)
      result

  hidden: (property, hidden) ->
    if hx.isArray(property)
      res = property.map (prop) => @hidden(prop, hidden)
      if hidden? then this else res
    else if @properties.has(property)
      prop = @properties.get(property)
      if hidden?
        prop.hidden = hidden
        hx.select(prop.node.parentNode).style('display', if hidden then 'none' else '')
        @properties.set(property, prop)
        this
      else
        !!prop.hidden

  disabled: (property, disabled) ->
    if hx.isArray(property)
      res = property.map (prop) => @disabled(prop, disabled)
      if disabled? then this else res
    else if @properties.has(property)
      prop = @properties.get(property)
      if disabled?
        prop.disabled = disabled
        prop.extras.disable(hx.select(prop.node), disabled)
        @properties.set(property, prop)
        this
      else
        !!prop.disabled


  node: (property) -> @properties.get(property).node if @properties.has(property)

  errorMessage: (property, value) ->
    node = @node(property)
    if arguments.length > 1
      value ?= ''
      if node
        if node.setCustomValidity
          node.setCustomValidity(value)
        else
          hx.select(node).selectAll('input').nodes.map (e) ->
            e.setCustomValidity(value)
      this
    else
      if node
        if node.setCustomValidity
          node.validationMessage
        else
          hx.select(node).select('input').node.validationMessage


  value: (property, value) ->
    if @properties.has(property)
      it = @properties.get(property)
      node = it.node
      if arguments.length > 1
        switch it.type
          when 'checkbox' then hx.select(node).prop('checked', value)
          when 'radio' then hx.select(node).selectAll('input').filter((d) -> d.value() is value).prop('checked', true)
          when 'fileInput'
            # You cannot set the value for a file input
            fileInput = hx.component(it.extras.componentNode or node)
            fileInput.value(value)
          when 'tagInput' then hx.component(it.extras.componentNode or node).items(value)
          when 'select' then hx.component(it.extras.componentNode or node).value(value)
          when 'toggle' then hx.component(it.extras.componentNode or node).value(value)
          when 'datepicker', 'timepicker', 'datetimepicker' then it.extras.setValue(value)
          else hx.select(node).value(value)
      else
        if not it.hidden
          value = switch it.type
            when 'checkbox' then hx.select(it.node).prop('checked')
            when 'radio' then hx.select(it.node).select('input:checked').value()
            when 'tagInput' then hx.component(it.extras.componentNode or it.node).items()
            when 'fileInput' then hx.component(it.extras.componentNode or it.node).value()
            when 'select' then hx.component(it.extras.componentNode or it.node).value()
            when 'toggle' then hx.component(it.extras.componentNode or it.node).value()
            when 'datepicker', 'timepicker', 'datetimepicker' then it.extras.getValue()
            else hx.select(it.node).value()
          return value

  component: (property) ->
    if (prop = @properties.get(property))?
      node = prop.extras.componentNode or prop.node
      if node?
        hx.component(node)

hx.Form = Form
