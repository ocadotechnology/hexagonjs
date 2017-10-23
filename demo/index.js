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
import autocompleteExamples from './examples/autocomplete'
import autocompletePickerExamples from './examples/autocomplete-picker'
import pickerExamples from './examples/picker'
import inputGroupExamples from './examples/input-group'
import layoutExamples from './examples/layout'
import dragContainerExamples from './examples/drag-container'
import progressBarExamples from './examples/progress-bar'
import errorPageExamples from './examples/error-page'
import tableExamples from './examples/table'
import toggleExamples from './examples/toggle'
import buttonGroupExamples from './examples/button-group'
import noticeExamples from './examples/notice'

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
    example('Autocomplete').add(autocompleteExamples()),
    example('Autocomplete Picker').add(autocompletePickerExamples()),
    example('Picker').add(pickerExamples()),
    example('Input Group').add(inputGroupExamples()),
    example('Layout').add(layoutExamples()),
    example('Drag Container').add(dragContainerExamples()),
    example('Progress Bar').add(progressBarExamples()),
    example('Error Page').add(errorPageExamples()),
    example('Table').add(tableExamples()),
    example('Toggle').add(toggleExamples()),
    example('Button Group').add(buttonGroupExamples()),
    example('Notice').add(noticeExamples())
  ]))
