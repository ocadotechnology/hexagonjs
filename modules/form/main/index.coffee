hx.userFacingText({
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
        hx.userFacingText('form', 'missingRadioValue')
      else
        hx.userFacingText('form', 'missingValue')
    when 'type mismatch'
      hx.userFacingText('form', 'typeMismatch')
    else
      message

validateForm = (form, options) ->
  form = hx.select(form).node()

  options = hx.merge.defined {
    showMessage: true
  }, options

  hx.select(form).selectAll('.hx-form-error').remove()

  errors = []

  focusedElement = document.activeElement

  for i in [0...form.children.length]
    # Loop through all direct child divs of form element ()
    if form.children[i].nodeName.toLowerCase() is 'div'
      element = form.children[i].children[1]

      # Don't check the validity of hidden  or undefined elements
      if element and element.offsetParent isnt null
        # Deal with standard label/input pairs
        if element.nodeName.toLowerCase() is 'input' or element.nodeName.toLowerCase() is 'textarea'
          if not element.checkValidity()
            type = hx.select(element).attr('type')
            errors.push {
              message: getValidationMessage element.validationMessage, type
              node: element
              validity: element.validity
              focused: focusedElement is element
            }
        else
          # Deal with radio groups and other similar structured elements
          input = hx.select(element).select('input').node()
          type  = hx.select(element).select('input').attr('type')
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

    # XXX: This structure lets us jump out of the forced table layout. If we change
    # to match the full-width aeris forms, this will need changing.
    hx.select(error.node.parentNode)
      .insertAfter('div')
      .class('hx-form-error')
      .append('div')
      .insertAfter('div')
      .class('hx-form-error-text-container')
      .append('div')
      .class('hx-form-error-text')
      .text(error.message)

    hx.select(error.node).on 'click', 'hx.form', (e) ->
      next = hx.select(error.node.parentNode.nextElementSibling)
      if next.classed('hx-form-error')
        next.remove()
      hx.select(error.node).off 'click', 'hx.form'

  # Return the errors so we can still check how many there are.
  {
    valid: errors.length is 0,
    errors: errors
  }

hx.validateForm = validateForm
