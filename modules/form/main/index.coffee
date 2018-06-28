import { userFacingText } from 'user-facing-text/main'
import { EventEmitter } from 'event-emitter/main'
import { Map as HMap } from 'map/main'
import { randomId, merge, isArray, mergeDefined } from 'utils/main'
import { select, detached, span, div } from 'elem/main'
import { Autocomplete } from 'autocomplete/main'
import { Picker } from 'picker/main'
import { DatePicker } from 'date-picker/main'
import { TimePicker } from 'time-picker/main'
import { DateTimePicker } from 'date-time-picker/main'
import { TagInput } from 'tag-input/main'
import { FileInput } from 'file-input/main'
import { Toggle } from 'toggle/main'
# import { AutocompletePicker } from 'autocomplete-picker/main'

userFacingText({
  form: {
    pleaseSelectAValue: 'Please select a value from the list'
    missingRadioValue: 'Please select one of these options',
    missingValue: 'Please fill in this field',
    typeMismatch: 'Please enter a valid value for this field'
  }
})

# Swaps out poor validation messages for more descriptive ones.
getValidationMessage = (message, type) ->
  switch message.toLowerCase()
    when 'value missing'
      if type is 'radio'
        userFacingText('form', 'missingRadioValue')
      else
        userFacingText('form', 'missingValue')
    when 'type mismatch'
      userFacingText('form', 'typeMismatch')
    else
      message

export validateForm = (form, options) ->
  form = select(form).node()

  defaultOptions = {
    showMessage: true
  }
  options = mergeDefined(defaultOptions, options)

  select(form).selectAll('.hx-form-error').remove()

  errors = []

  focusedElement = document.activeElement

  for i in [0...form.children.length]
    # Loop through all direct child divs of form element ()
    if form.children[i].nodeName.toLowerCase() is 'div'
      element = form.children[i].children[1]

      # Don't check the validity of hidden elements
      if element.offsetParent isnt null
        # Deal with standard label/input pairs
        if element.nodeName.toLowerCase() is 'input' or element.nodeName.toLowerCase() is 'textarea'
          if not element.checkValidity()
            type = select(element).attr('type')
            errors.push {
              message: getValidationMessage element.validationMessage, type
              node: element
              validity: element.validity
              focused: focusedElement is element
            }
        else
          # Deal with radio groups and other similar structured elements
          input = select(element).select('input').node()
          type  = select(element).select('input').attr('type')
          if input and not input.checkValidity()
            errors.push {
              message: getValidationMessage input.validationMessage, type
              node: element
              validity: input.validity
              focused: focusedElement is input
            }

  if options.showMessage and errors.length > 0
    # Show the error for the focused element (if there is one) or the first error in the form
    error = errors.filter((error) -> error.focused)[0] or errors[0]

    select(error.node.parentNode)
      .insertAfter('div')
      .class('hx-form-error')
      .append('div')
      .insertAfter('div')
      .class('hx-form-error-text-container')
      .append('div')
      .class('hx-form-error-text')
      .text(error.message)

    select(error.node).on 'click', 'hx.form', (e) ->
      next = select(error.node.parentNode.nextElementSibling)
      if next.classed('hx-form-error')
        next.remove()
      select(error.node).off('click', 'hx.form')

  # Return the errors so we can still check how many there are.
  return {
    valid: errors.length is 0,
    errors: errors
  }

export class Form extends EventEmitter
  constructor: (@selector) ->
    super()

    @formId = 'form-' + randomId() + '-'
    @component = new HMap
    select(@selector)
      .classed('hx-form', true)
      .api(this)
      .on 'keypress', 'hx.form-builder', (e) ->
        target = select(e.target || e.srcElement)
        if e.keyCode == 13 and target.attr('type') != 'submit' and target.attr('type') != 'textarea'
          e.preventDefault()

  submit: ->
    {valid, errors} = validateForm(@selector)
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
    if isArray(property)
      res = property.map (prop) => @hidden(prop, hidden)
      if hidden? then this else res
    else if @properties.has(property)
      prop = @properties.get(property)
      if hidden?
        prop.options.hidden = hidden
        select(prop.node.parentNode).style('display', if hidden then 'none' else '')
        @properties.set(property, prop)
        this
      else
        !!prop.hidden

  disabled: (property, disabled) ->
    if isArray(property)
      res = property.map (prop) => @disabled(prop, disabled)
      if disabled? then this else res
    else if @properties.has(property)
      prop = @properties.get(property)
      if disabled?
        prop.options.disabled = disabled
        prop.disable(disabled)
        @properties.set(property, prop)
        this
      else
        !!prop.disabled

  errorMessage: (property, value) ->
    node = @node(property)
    if arguments.length > 1
      value ?= ''
      if node
        if node.setCustomValidity
          node.setCustomValidity(value)
        else
          select(node).selectAll('input').nodes.map (e) ->
            e.setCustomValidity(value)
      this
    else
      if node
        if node.setCustomValidity
          node.validationMessage
        else
          select(node).select('input').node.validationMessage


  value: (property, value) ->
    if @properties.has(property)
      prop = @properties.get(property)
      node = prop.node
      if arguments.length > 1
        prop.setValue(value)
      else
        if not prop.hidden
          prop.getValue()

  component: (property) ->
    if (prop = @properties.get(property))?
      prop.component or select(prop.elem).api(prop.type)

  node: (property) ->
    if (prop = @properties.get(property))?
      prop.elem.node()

  addSubmit: (text, icon, submitAction) ->
    select(@selector).append('button')
      .attr('type', 'submit')
      .class('hx-btn hx-action hx-form-submit')
      .add(detached('i').class(icon))
      .add(span().text(' ' + text))
      .on 'click', 'hx.form-builder', (e) =>
        e.preventDefault()
        if submitAction?
          submitAction(this)
        else
          @submit()

    return this

  add: (name, type, f) ->
    id = @formId + name.split(' ').join('-')
    entry = select(@selector).append('div')
    entry.append('label').attr('for', id).text(name)
    prop = f() or {}
    key = prop.key || name
    selection = entry.append(prop.elem).attr('id', id)

    # Define the default function for enabling/disabling a form property
    prop.disable ?= (disable) ->
      selection.attr('disabled', if disable then 'disabled' else undefined)

    prop.setValue ?= (value) ->
      prop.component
        ? prop.component.value(value)
        : prop.elem.value(value)

    prop.getValue ?= () ->
      prop.component
        ? prop.component.value()
        : prop.elem.value()

    @properties.set key,
      type: type
      elem: prop.elem
      component: prop.component
      getValue: prop.getValue
      setValue: prop.setValue
      disable: prop.disable
      options: prop.options

    if prop.options.hidden then @hidden key, true
    if prop.options.disabled then @disabled key, true
    this

  addText: (name, options={}) ->
    options.type ?= 'text'
    options.attrs ?= []
    @add name, 'text', ->
      elem = detached('input').attr('type', options.type)
      if options.autoCompleteData? and options.type isnt 'password' and options.type isnt 'number'
        new Autocomplete(elem,
          options.autoCompleteData,
          options.autoCompleteOptions ?= undefined)
      if options.placeholder? then elem.attr('placeholder', options.placeholder)
      if options.required then elem.attr('required', options.required)
      elem.attr(attr.type, attr.value) for attr in options.attrs
      if options.validator? then elem.node().oninput = (e) => e.target.setCustomValidity(options.validator(e) || '')
      if options.value then elem.node().value = options.value
      {
        key: options.key
        elem: elem
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addTextArea: (name, options={}) ->
    options.type ?= 'textarea'
    options.attrs ?= []
    @add name, 'textarea', ->
      elem = detached('textarea').attr('type', options.type)
      if options.placeholder? then elem.attr('placeholder', options.placeholder)
      if options.required then elem.attr('required', options.required)
      elem.attr(attr.type, attr.value) for attr in options.attrs
      if options.validator? then elem.node().oninput = (e) => e.target.setCustomValidity(options.validator(e) || '')
      if options.value then elem.node().value = options.value
      {
        key: options.key
        elem: elem
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addEmail: (name, options={}) ->
    options.type = 'email'
    @addText(name, options)

  addUrl: (name, options={}) ->
    options.type = 'url'
    @addText(name, options)

  addNumber: (name, options={}) ->
    options.type = 'number'
    options.attrs = [{type: 'step', value: options.step}]
    if options.min? then options.attrs.push {type: 'min', value: options.min}
    if options.max? then options.attrs.push {type: 'max', value: options.max}
    @addText(name, options)

  addPassword: (name, options={}) ->
    options.type = 'password'
    @addText(name, options)

  addPicker: (name, values, options = {}) ->
    @add name, 'picker', ->
      elem = button(options.buttonClass)
        .attr('type', 'button')

      pickerOptions = merge({}, options.pickerOptions)

      if values.length > 0
        pickerOptions.items = values

      component = new Picker(elem.node(), pickerOptions)
      input = 'input').class('hx-form-builder-hidden-form-input').attr('size', 0
      @style('position', 'relative')

      picker.value(values[0]) unless typeof options.required is 'boolean'

      setValidity = () ->
        input.node().setCustomValidity(userFacingText('form', 'pleaseSelectAValue'))

      if options.required
        setValidity()
        picker.on 'change', 'hx.form-builder', ({ value, cause }) ->
          if value is undefined
            setValidity()
          else
            input.node().setCustomValidity('')

      return {
        key: options.key
        elem: elem
        component: component
        disable: (disabled) -> picker.disabled(disabled)
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addCheckbox: (name, options = {}) ->
    @add name, 'checkbox', ->
      elem = detached('input').attr('type', 'checkbox')
      if options.required? then elem.attr('required', options.required)
      if options.value then elem.attr('checked', true)

      setValue = (value) -> elem.attr('checked', value)
      getValue = () -> elem.attr('checked')

      return {
        key: options.key
        elem: elem
        getValue: getValue
        setValue: setValue
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addRadio: (name, values, options = {}) ->
    self = this
    @add name, 'radio', ->
      elem = div()
      id = self.formId + name.split(' ').join('-')
      count = 0
      for value in values
        item = div('hx-radio-container')
        input = item.append('input').attr('type', 'radio').attr('name', id).attr('id',id+'-'+count).value(value)
        if options.required? then input.attr('required', options.required)
        if options.value is value then input.attr('checked', true)
        item.append('label').attr('for', id + '-' + count).text(value)
        count += 1

      return {
        key: options.key
        elem: elem
        getValue: getValue
        setValue: setValue
        disable: (disabled) ->
          elem.selectAll('input')
            .attr('disabled', if disabled then true else undefined)
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addDatePicker: (name, options = {}) ->
    @add name, 'date-picker', ->
      elem = div()
      component = new DatePicker(elem, options.datePickerOptions)

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

      return {
        key: options.key
        elem: elem
        component: component
        getValue: getValue
        setValue: setValue
        disable: (disabled) -> datepicker.disabled(disabled)
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addTimePicker: (name, options = {}) ->
    @add name, 'time-picker', ->
      elem = div()
      component = new TimePicker(elem, options.timePickerOptions)
      getValue = -> timepicker.date()
      setValue = (value) -> timepicker.date(value)

      return {
        key: options.key
        elem: elem
        component: component
        getValue: getValue
        setValue: setValue
        disable: (disabled) -> timepicker.disabled(disabled)
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addDateTimePicker: (name, options = {}) ->
    @add name, 'date-time-picker', ->
      elem = div()
      component = new DateTimePicker(elem, options.dateTimePickerOptions)
      getValue = -> datetimepicker.date()
      setValue = (value) -> datetimepicker.date(value)

      return {
        key: options.key
        elem: elem
        component: component
        getValue: getValue
        setValue: setValue
        disable: (disabled) -> datetimepicker.disabled(disabled)
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addTagInput: (name, options = {}) ->
    self = this
    @add name, 'tag-input', ->
      elem = div()
      if options.placeholder
        options.tagInputOptions ?= {}
        options.tagInputOptions.placeholder ?= options.placeholder

      component = new TagInput(elem, options.tagInputOptions)

      getValue = -> tagInput.items()
      setValue = (items) -> tagInput.items(items)

      return {
        key: options.key
        elem: elem
        component: component
        getValue: getValue
        setValue: setValue
        disable: (disabled) -> tagInput.disabled(disabled)
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addFileInput: (name, options = {}) ->
    self = this
    @add name, 'file-input', ->
      elem = div()
      component = new FileInput(elem, options.fileInputOptions)
      return {
        key: options.key
        elem: elem
        component: component
        disable: (disabled) -> fileInput.disabled(disabled)
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addToggle: (name, options = {}) ->
    self = this
    @add name, 'toggle', ->
      elem = div('hx-btn hx-btn-invisible hx-no-pad-left')
      component = new Toggle(elem, options.toggleOptions)
      {
        key: options.key
        elem: elem
        component: component
        disable: (disabled) -> toggle.disabled(disabled)
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  # addAutocompletePicker: (name, values, options = {}) ->
  #   @add name, 'select', 'div', ->
  #     elem = 'button'
  #       .attr('type', 'button')
  #       .class(options.buttonClass)

  #     autocompletePickerOptions = merge({buttonClass: options.buttonClass}, options.autocompletePickerOptions)

  #     if values.length > 0
  #       autocompletePickerOptions.items = values

  #     component = new AutocompletePicker(elem.node(), values, autocompletePickerOptions)
  #     input = 'input').class('hx-hidden-form-input').attr('size', 0
  #     @style('position', 'relative')

  #     autocompletePicker.value(values[0]) unless typeof options.required is 'boolean'

  #     setValidity = () ->
  #       input.node().setCustomValidity(userFacingText('form', 'pleaseSelectAValue'))

  #     if options.required
  #       setValidity()
  #       autocompletePicker.on 'change', 'hx.form-builder', ({ value, cause }) ->
  #         if value is undefined
  #           setValidity()
  #         else
  #           input.node().setCustomValidity('')

  #     return {
  #       required: options.required
  #       component: component
  #       key: options.key
  #       hidden: options.hidden
  #       disabled: options.disabled
  #       disable: (disabled) -> autocompletePicker.disabled(disabled)
  #     }
