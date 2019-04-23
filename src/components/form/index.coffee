import { userFacingText } from 'utils/user-facing-text'

userFacingText({
  form: {
    pleaseSelectAValue: 'Please select a value from the list',
    pleaseAddAValue: 'Please add at least one item',
    missingRadioValue: 'Please select one of these options',
    missingValue: 'Please fill in this field',
    typeMismatch: 'Please enter a valid value for this field'
  }
})

export { Form } from './form-builder'
export { validateForm } from './validate-form'
