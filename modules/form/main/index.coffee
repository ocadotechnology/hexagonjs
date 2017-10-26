import { userFacingText } from 'user-facing-text/main'
import { select } from 'selection/main'
import { mergeDefined } from 'utils/main'

userFacingText({
  form: {
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
