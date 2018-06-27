import * as hx from 'hexagon-js'
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
import plotExamples from './examples/plot'
import labelExamples from './examples/label'
import crumbtrailExamples from './examples/crumbtrail'
import colorPickerExamples from './examples/color-picker'
import sliderExamples from './examples/slider'
import timeSliderExamples from './examples/time-slider'
import cardExamples from './examples/card'
import paginatorExamples from './examples/paginator'
import sideCollapsibleExamples from './examples/side-collapsible'
import datePickerExamples from './examples/date-picker'
import pivotTableExamples from './examples/pivot-table'
import timePickerExamples from './examples/time-picker'
import tabsExamples from './examples/tabs'
import treeExamples from './examples/tree'
import dataTableExamples from './examples/data-table'
import sidebarExamples from './examples/sidebar'

window.hx = hx

function example (title) {
  return div('example-section')
    .add(detached('h2').text(title))
}
function tryDemo (demoFn) {
  try {
    return demoFn()
  } catch (e) {
    console.error(e)
    return detached('pre').class('big-ol-error').text(e.toString())
  }
}


select('body')
  .add(titleBar({ title: 'Title', subtitle: 'Subtitle'}))
  .add(div('hx-content').add([
    example('Loading Spinners').add(tryDemo(loadingSpinnerExamples)),
    example('Modals').add(tryDemo(modalExamples)),
    example('Buttons').add(tryDemo(buttonExamples)),
    example('Notify').add(tryDemo(notifyExamples)),
    example('Form').add(tryDemo(formExamples)),
    example('Dropdown').add(tryDemo(dropdownExamples)),
    example('Collapsible').add(tryDemo(collapsibleExamples)),
    example('Palette').add(tryDemo(paletteExamples)),
    example('Number Pickers').add(tryDemo(numberPickerExamples)),
    example('Autocomplete').add(tryDemo(autocompleteExamples)),
    example('Autocomplete Picker').add(tryDemo(autocompletePickerExamples)),
    example('Picker').add(tryDemo(pickerExamples)),
    example('Input Group').add(tryDemo(inputGroupExamples)),
    example('Layout').add(tryDemo(layoutExamples)),
    example('Drag Container').add(tryDemo(dragContainerExamples)),
    example('Progress Bar').add(tryDemo(progressBarExamples)),
    example('Error Page').add(tryDemo(errorPageExamples)),
    example('Table').add(tryDemo(tableExamples)),
    example('Toggle').add(tryDemo(toggleExamples)),
    example('Button Group').add(tryDemo(buttonGroupExamples)),
    example('Notice').add(tryDemo(noticeExamples)),
    example('Plot').add(tryDemo(plotExamples)),
    example('Label').add(tryDemo(labelExamples)),
    example('Crumbtrail').add(tryDemo(crumbtrailExamples)),
    example('Color Picker').add(tryDemo(colorPickerExamples)),
    example('Slider').add(tryDemo(sliderExamples)),
    example('Time Slider').add(tryDemo(timeSliderExamples)),
    example('Card').add(tryDemo(cardExamples)),
    example('Paginator').add(tryDemo(paginatorExamples)),
    example('Side Collapsible').add(tryDemo(sideCollapsibleExamples)),
    example('Date Picker').add(tryDemo(datePickerExamples)),
    example('Pivot Table').add(tryDemo(pivotTableExamples)),
    example('Time Picker').add(tryDemo(timePickerExamples)),
    example('Tabs').add(tryDemo(tabsExamples)),
    example('Tree').add(tryDemo(treeExamples)),
    example('Data Table').add(tryDemo(dataTableExamples)),
    example('Sidebar').add(tryDemo(sidebarExamples)),
  ]))
