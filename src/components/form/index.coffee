import { userFacingText } from 'utils/user-facing-text'
import { EventEmitter } from 'utils/event-emitter'
import { Map as HMap } from 'utils/map'
import { randomId, merge, isArray, mergeDefined } from 'utils/utils'
import { select, detached, span, div, button } from 'utils/selection'

import { Autocomplete } from 'components/autocomplete'
import { Picker } from 'components/picker'
import { DatePicker } from 'components/date-picker'
import { TimePicker } from 'components/time-picker'
import { DateTimePicker } from 'components/date-time-picker'
import { TagInput } from 'components/tag-input'
import { FileInput } from 'components/file-input'
import { Toggle } from 'components/toggle'
# import { AutocompletePicker } from 'components/autocomplete-picker'

userFacingText({
  form: {
    pleaseSelectAValue: 'Please select a value from the list',
    pleaseAddAValue: 'Please add at least one item',
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

validateForm = (form, options) ->
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


# XXX: Refactor into constructor in 2.0.0
getButtons = (form) ->
  selection = select(form.selector)
  sel = selection.select('.hx-form-buttons')
  buttons = if sel.empty()
    selection.append('div').class('hx-form-buttons')
  else sel

class Form extends EventEmitter
  constructor: (@selector) ->
    super()

    @formId = 'form-' + randomId() + '-'
    @properties = new HMap

    select(@selector)
      .classed('hx-form', true)
      .api('form-builder', this)
      .api(this)
      .on 'keypress', 'hx.form-builder', (e) ->
        target = select(e.target || e.srcElement)
        if e.keyCode == 13 and target.attr('type') != 'submit' and target.attr('type') != 'textarea'
          e.preventDefault()

  submit: ->
    { valid, errors } = validateForm(@selector)
    if valid then @emit('submit', @data())
    this

  data: (data) ->
    if arguments.length > 0
      @value(key, value) for own key, value of data
      this
    else
      result = {}
      @properties.forEach (key, it) =>
        if not it.options.hidden and it.type isnt 'button'
          result[key] = @value(key)
      result

  option: (optionKey, setFnKey, property, value) ->
    if isArray(property)
      res = property.map((prop) => @[optionKey](prop, value))
      if value? then this else res
    else if @properties.has(property)
      prop = @properties.get(property)
      if value?
        prop.options[optionKey] = value
        prop[setFnKey](value)
        @properties.set(property, prop)
        this
      else
        !!prop.options[optionKey]

  hidden: (property, hidden) ->
    @option('hidden', 'hide', property, hidden)

  disabled: (property, disabled) ->
    @option('disabled', 'disable', property, disabled)

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
      if arguments.length > 1
        prop.setValue(value)
      else
        if not prop.options.hidden
          prop.getValue()

  component: (property) ->
    if (prop = @properties.get(property))?
      prop.component or select(prop.elem).api(prop.type)

  node: (property) ->
    if (prop = @properties.get(property))?
      prop.elem.node()

  add: (name, type, f) ->
    id = @formId + name.split(' ').join('-')
    formSel = select(@selector)
    entry = formSel.append('div')

    # Append buttons container to the end of the form
    formSel.append(getButtons(this))

    entry.append('label').attr('for', id).text(name)
    prop = f() or {}
    key = prop.key || name
    selection = entry.append(if prop.component then div().add(prop.elem) else prop.elem).attr('id', id)

    # Define the default function for enabling/disabling a form property
    prop.disable ?= (disable) ->
      if prop.component
        prop.component.disabled(disable)
      else
        selection.attr('disabled', if disable then 'disabled' else undefined)

    prop.hide = (hide) -> entry.style('display', if hide then 'none' else '')

    prop.setValue ?= (value) ->
      if prop.component
        prop.component.value(value)
      else
        prop.elem.value(value)

    prop.getValue ?= () ->
      if prop.component
        prop.component.value?()
      else
        prop.elem.value()

    @properties.set key,
      type: type
      elem: prop.elem
      component: prop.component
      getValue: prop.getValue
      setValue: prop.setValue
      disable: prop.disable
      hide: prop.hide
      options: prop.options

    if prop.options.hidden then @hidden key, true
    if prop.options.disabled then @disabled key, true
    this

  addButton: (text, action, opts = {}) =>
    id = @formId + text.split(" ").join("-")
    options = merge({
      key: text,
      context: 'action',
      buttonType: 'button',
      icon: undefined,
      hidden: false,
      disabled: false,
    }, opts)

    formBtn = button("hx-btn hx-#{options.context}")
      .attr('type', options.buttonType)
      .attr('id',id)
      .add(if options.icon then i(options.icon) else undefined)
      .add(span().text(" " + text))
      .on 'click', 'hx.form-builder', (e) =>
        e.preventDefault()
        action?()

    elem = getButtons(this).append('div').add(formBtn)

    @properties.set options.key,
      type: 'button'
      node: formBtn.node()
      extras: {
        disable: (s, disabled) -> formBtn.attr('disabled', if disabled then 'disabled' else undefined)
      }

    if options.hidden then @hidden options.key, options.hidden
    if options.disabled then @disabled options.key, options.disabled
    this

  addSubmit: (text, icon, submitAction, options = {}) ->
    defaultSubmitAction = () => @submit()
    @addButton(text, (submitAction or defaultSubmitAction), {
      key: text or options.key,
      context: 'action',
      buttonType: 'submit',
      icon: icon,
      hidden: options.hidden,
      disabled: options.disabled,
    })

  addText: (name, options={}) ->
    options.type ?= 'text'
    options.attrs ?= []
    @add name, 'text', ->
      elem = detached('input').attr('type', options.type)
      if options.autoCompleteData? and options.type isnt 'password' and options.type isnt 'number'
        component = new Autocomplete(elem,
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
        component: component
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

  addPassword: (name, options={}) ->
    options.type = 'password'
    @addText(name, options)

  addNumber: (name, options={}) ->
    options.type = 'number'
    options.attrs = [{type: 'step', value: options.step}]
    if options.min? then options.attrs.push {type: 'min', value: options.min}
    if options.max? then options.attrs.push {type: 'max', value: options.max}
    @addText(name, options)

  addCheckbox: (name, options = {}) ->
    @add name, 'checkbox', ->
      elem = detached('input').attr('type', 'checkbox')
      if options.required? then elem.attr('required', options.required)
      if options.value then elem.attr('checked', true)

      setValue = (value) -> elem.attr('checked', value)
      getValue = () -> if elem.attr('checked') is 'true' then true else false

      {
        key: options.key
        elem: elem
        getValue: getValue
        setValue: setValue
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addTextArea: (name, options={}) ->
    options.attrs ?= []
    @add name, 'textarea', ->
      elem = detached('textarea')
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
        elem.add(item)
        count += 1

      getValue = () -> elem.select('input:checked').value()
      setValue = (value) -> elem.selectAll('input').filter((d) -> d.value() is value).prop('checked', true)

      {
        key: options.key
        elem: elem
        getValue: getValue
        setValue: setValue
        disable: (disable) ->
          elem.selectAll('input').attr('disabled', if disable then true else undefined)
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
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addPicker: (name, values, options = {}) ->
    @add name, 'picker', ->
      elem = button(options.buttonClass)
        .attr('type', 'button')
        .style('position', 'relative')

      pickerOptions = merge({}, options.pickerOptions)

      if values.length > 0
        pickerOptions.items = values

      component = new Picker(elem.node(), pickerOptions)
      input = detached('input').class('hx-form-builder-hidden-form-input').attr('size', 0)
      component.value(values[0]) unless typeof options.required is 'boolean'

      setValidity = () ->
        input.node().setCustomValidity(userFacingText('form', 'pleaseSelectAValue'))

      if options.required
        setValidity()
        component.on 'change', 'hx.form-builder', ({ value, cause }) ->
          if value is undefined
            setValidity()
          else
            input.node().setCustomValidity('')

      return {
        key: options.key
        elem: elem
        component: component
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
        component.validRange(options.validStart, options.validEnd)

      if options.selectRange?
        getValue = -> component.range()

        setValue = (value) ->
          component.range(value.startDate, value.endDate, false, true)

        if options.startDate? and options.endDate?
          component.range(options.startDate, options.endDate, false, true)
      else
        getValue = -> component.date()
        setValue = (value) -> component.date(value)

      return {
        key: options.key
        elem: elem
        component: component
        getValue: getValue
        setValue: setValue
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addTimePicker: (name, options = {}) ->
    @add name, 'time-picker', ->
      elem = div()
      component = new TimePicker(elem, options.timePickerOptions)

      getValue = -> component.date()
      setValue = (value) -> component.date(value)

      return {
        key: options.key
        elem: elem
        component: component
        getValue: getValue
        setValue: setValue
        options: {
          hidden: options.hidden
          disabled: options.disabled
        }
      }

  addDateTimePicker: (name, options = {}) ->
    @add name, 'date-time-picker', ->
      elem = div()
      component = new DateTimePicker(elem, options.dateTimePickerOptions)

      getValue = -> component.date()
      setValue = (value) -> component.date(value)

      return {
        key: options.key
        elem: elem
        component: component
        getValue: getValue
        setValue: setValue
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

      getValue = -> component.items()
      setValue = (items) -> component.items(items)

      if options.required
        input = @select('input')

        setValidity = () ->
          input.node().setCustomValidity(userFacingText('form', 'pleaseAddAValue'))

        change = () ->
          value = tagInput.items()
          if value is undefined or not value.length
            setValidity()
          else
            input.node().setCustomValidity('')

        setValidity()

        tagInput.on 'add', 'hx.form-builder', change
        tagInput.on 'remove', 'hx.form-builder', change

      return {
        key: options.key
        elem: elem
        component: component
        getValue: getValue
        setValue: setValue
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

export {
  validateForm,
  Form
}
