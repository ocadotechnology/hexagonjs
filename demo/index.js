import { select, div, detached, titleBar } from 'hexagon-js'

import loadingSpinnerExamples from './examples/loading-spinner'
import modalExamples from './examples/modal'
import buttonExamples from './examples/button'
import notifyExamples from './examples/notify'
import formExamples from './examples/form'
import dropdownExamples from './examples/dropdown'
import collapsibleExamples from './examples/collapsible'
import paletteExamples from './examples/palette'
import numberPickerExamples from './examples/number-picker'
import autoCompleteExamples from './examples/autocomplete'
import pickerExamples from './examples/picker'
import inputGroupExamples from './examples/input-group'

function example(title) {
  return div('example-section')
    .add(detached('h2').text(title))
}

select('body')
  .add(titleBar({ title: 'Title', subtitle: 'Subtitle'}))
  .add(div('hx-content').add([
    example('Loading Spinners').add(loadingSpinnerExamples()),
    example('Modals').add(modalExamples()),
    example('Buttons').add(buttonExamples()),
    example('Notify').add(notifyExamples()),
    example('Form').add(formExamples()),
    example('Dropdown').add(dropdownExamples()),
    example('Collapsible').add(collapsibleExamples()),
    example('Palette').add(paletteExamples()),
    example('Number Pickers').add(numberPickerExamples()),
    example('Auto Complete').add(autoCompleteExamples()),
    example('Picker').add(pickerExamples()),
    example('Input Group').add(inputGroupExamples())
  ]))
