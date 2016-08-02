userFacingText = require('modules/user-facing-text/main')
select = require('modules/selection/main')

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

validate = (form, options) ->
  form = select(form).node()

  defaultOptions = {
    showMessage: true
  }
  options = hx.merge.defined(defaultOptions, options)

  select(form).selectAll('.hx-form-error').remove()

  errors = []

  for i in [0...form.children.length]
    # Loop through all direct child divs of form element ()
    if form.children[i].nodeName.toLowerCase() is 'div'
      element = form.children[i].children[1]

      # Deal with standard label/input pairs
      if element.nodeName.toLowerCase() is 'input' or element.nodeName.toLowerCase() is 'textarea'
        if not element.checkValidity()
          type = select(element).attr('type')
          errors.push({
            message: getValidationMessage(element.validationMessage, type),
            node: element,
            validity: element.validity
          })
      else
        # Deal with radio groups and other similar structured elements
        input = select(element).select('input').node()
        type  = select(element).select('input').attr('type')
        if input and not input.checkValidity()
          errors.push({
            message: getValidationMessage(input.validationMessage, type),
            node: element,
            validity: input.validity
          })

  if options.showMessage and errors.length > 0
    error = errors[0]
    # XXX: This structure lets us jump out of the forced table layout. If we change
    # to match the full-width aeris forms, this will need changing.
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

module.exports = {
  validate: validate,
  hx: {
    validateForm: validate
  }
}
