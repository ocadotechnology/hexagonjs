window.form = new hx.Form('#form')
  .addText('Text', {required:true, placeholder:'Name'})
  .addEmail('Email', {required:true, placeholder:'your.name@ocado.com'})
  .addUrl('Url', {placeholder:'http://www.example.co.uk/'}) # Allows blank or valid URL (with http:// prefix)
  .addNumber('Number', {required:true})
  .addSelect('Default Select', ['red', 'green', 'blue'])
  .addSelect('Select Blank Start', ['cyan', 'magenta', 'yellow'], {required: false})
  .addSelect('Required Select', [
    { text: 'Hue', value: 'hue' } ,
    { text: 'Saturation', value: 'saturation'},
    { text: 'Lightness', value: 'lightness'}
    ], {required: true}) # Will not validate unless a value is selected
  .addCheckbox('Checkbox')
  .addPassword('Password')
  .addRadio('Radio', ['One', 'Two', 'Three'], {
    required: true
  })
  .addTagInput('Tag Input')
  .addDatePicker('Date Picker')
  .addDatePicker('Date Range Picker', {
    datePickerOptions: {
      selectRange: true
    }
  })
  .addTimePicker('Time Picker')
  .addTimePicker('Time Picker with Seconds', {
    timePickerOptions: {
      showSeconds: true
    }
  })
  .addDateTimePicker('Date Time Picker')
  .addDateTimePicker('Date Time Picker with Seconds', {
    timePickerOptions: {
      showSeconds: true
    }
  })
  .addSubmit('Submit', 'fa fa-check')
  .on('submit', (data) ->console.log(data));