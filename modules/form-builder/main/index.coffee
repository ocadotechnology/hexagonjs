
class Form extends hx.EventEmitter
  constructor: (@selector) ->
    super

    hx.component.register(@selector, this)

    @formId = "form-"+hx.randomId() + '-'
    @properties = new hx.Map
    hx.select(@selector)
      .classed('hx-form', true)
      .on 'keypress', 'hx.form-builder', (e) ->
        target = hx.select(e.target || e.srcElement)
        if e.keyCode == 13 and target.attr('type') != 'submit' and target.attr('type') != 'textarea'
          e.preventDefault()

  add: (name, type, nodeType, f) ->
    id = @formId + name.split(" ").join("-")
    entry = hx.select(@selector).append('div')
    entry.append('label').attr("for", id).text(name)
    selection = entry.append(nodeType).attr("id",id)
    extras = f.call(selection) or {}

    if extras.key?
      key = extras.key
      delete extras.key
      @properties.set key,
        type: type
        node: selection.node()
        extras: extras
    else
      @properties.set name,
        type: type
        node: selection.node()
        extras: extras
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
      if options.disabled then selection.attr('disabled', '')
      selection.attr(attr.type, attr.value) for attr in options.attrs
      if options.validator? then selection.node().oninput = (e) => e.target.setCustomValidity(options.validator(e) || "")
      {required: options.required, key: options.key}

  addTextArea: (name, options={}) ->
    options.type ?= "textarea"
    options.attrs ?= []
    @add name, 'textarea', 'textarea', ->
      selection = @attr('type', options.type)
      if options.placeholder? then selection.attr('placeholder', options.placeholder)
      if options.required then selection.attr('required', options.required)
      if options.disabled then selection.attr('disabled', '')
      selection.attr(attr.type, attr.value) for attr in options.attrs
      if options.validator? then selection.node().oninput = (e) => e.target.setCustomValidity(options.validator(e) || "")
      {required: options.required, key: options.key}

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
      c = 'hx-btn'

      elem = @append('button')

      if options.disabled then elem.attr('disabled', '')
      else
        if options.buttonClass?
          c += ' ' + options.buttonClass

      pickerOptions = hx.merge({}, options.pickerOptions)

      if values.length > 0
        pickerOptions.items = values

      select = new hx.Picker(elem.node(), pickerOptions)

      # Prevent the button submitting the form - must be done after the select
      # is initialised
      elem.classed(c, true).on 'click', 'hx.form-builder', (e) -> e.preventDefault()

      # XXX: replace this with classes in the css
      input = @append('input').class('hx-hidden-form-input').attr('size', 0)

      @style('position', 'relative')

      if typeof options.required isnt 'boolean'
        select.value(values[0])

      if options.required
        input.node().setCustomValidity('Please select a value from the list')

        select.on 'change', 'hx.form-builder', ->
          input.node().setCustomValidity('')


      {required: options.required, componentNode: elem.node(), select: select, key: options.key}

  addCheckbox: (name, options = {}) ->
    @add name, 'checkbox', 'input', ->
      @attr('type', 'checkbox')
      if options.required? then @attr('required', options.required)
      if options.disabled then @attr('disabled', '')
      {required: options.required, key: options.key}

  addRadio: (name, values, options = {}) ->
    self = this
    @add name, 'radio', 'div', ->
      id = self.formId + name.split(" ").join("-")
      count = 0
      for value in values
        selection  = @append('div').class('hx-radio-container')
        input = selection.append('input').attr('type', 'radio').attr('name', id).attr("id",id+"-"+count).value(value)
        if options.required? then input.attr('required', options.required)
        if options.disabled then input.attr('disabled', '')
        selection.append('label').attr("for", id + "-" + count).text(value)
        count += 1
      {required: options.required, key: options.key}

  addDatePicker: (name, options = {}) ->
    @add name, 'datepicker', 'div', ->

      elem = @append('div').node()
      datepicker = new hx.DatePicker(elem, options.datePickerOptions)

      if options.disabled
        datepicker.disable()

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
        getValue = ->
          datepicker.date()

        setValue = (value) ->
          datepicker.date(value)

      {key: options.key, componentNode: elem, getValue: getValue, setValue: setValue}
    this

  addTimePicker: (name, options = {}) ->
    @add name, 'timepicker', 'div', ->
      elem = @append('div').node()

      timepicker = new hx.TimePicker(elem, options.timePickerOptions)

      if options.disabled
        timepicker.disable()

      getValue = ->
        timepicker.date()

      setValue = (value) ->
        timepicker.date(value)

      {key: options.key, componentNode: elem, getValue: getValue, setValue: setValue}
    this

  addDateTimePicker: (name, options = {}) ->
    @add name, 'datetimepicker', 'div', ->
      elem = @append('div').node()

      datetimepicker = new hx.DateTimePicker(elem, options.dateTimePickerOptions)

      if options.disabled
        datetimepicker.disable()

      getValue = ->
        datetimepicker.date()

      setValue = (value) ->
        datetimepicker.date(value)

      {key: options.key, componentNode: elem, getValue: getValue, setValue: setValue}
    this

  addSubmit: (text, icon, submitAction) ->
    hx.select(@selector).append('button')
      .attr('type', 'submit')
      .class('hx-btn hx-positive hx-form-submit')
      .add(hx.detached('i').class(icon))
      .add(hx.detached('span').text(" " + text))
      .on 'click', 'hx.form-builder', (e) =>
        e.preventDefault()
        if submitAction?
          submitAction(this)
        else
          @submit()
    this

  addTagInput: (name, options = {}) ->
    self = this
    @add name, 'tagInput', 'div', ->
      elem = @append('div').node()
      new hx.TagInput(elem, options.tagInputOptions)
      {key: options.key, componentNode: elem}
    this

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
        if not it.hidden
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
          when 'tagInput'
            tagInput = hx.component(it.extras.componentNode or node)
            value.forEach((e) -> tagInput.add(e))
          when 'select' then hx.component(it.extras.componentNode or node).value(value)
          when 'datepicker', 'timepicker', 'datetimepicker' then it.extras.setValue(value)
          else hx.select(node).value(value)
      else
        if not it.hidden
          value = switch it.type
            when 'checkbox' then hx.select(it.node).prop('checked')
            when 'radio' then hx.select(it.node).select('input:checked').value()
            when 'tagInput' then hx.component(it.extras.componentNode or it.node).items()
            when 'select' then hx.component(it.extras.componentNode or it.node).value()
            when 'datepicker', 'timepicker', 'datetimepicker' then it.extras.getValue()
            else hx.select(it.node).value()
          return value

  component: (property) ->
    if (prop = @properties.get(property))?
      node = prop.extras.componentNode or prop.node
      if node?
        hx.component(node)

hx.Form = Form