import { select, div, detached } from 'hexagon-js'

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

function example(title) {
  return div('example-section')
    .add(detached('h2').text(title))
}

//XXX should be part of hexagon (pending MR in the 1.x.x branch)
function heading () {
  return div('hx-heading')
    .add(div('hx-titlebar')
      .add(div('hx-titlebar-container')
        .add(div('hx-titlebar-header')
          .add(detached('a')
            .class('hx-titlebar-icon')
            .attr('href', '#')
            .add(detached('img').class('hx-logo')))
          .add(div('hx-titlebar-title').text('Title'))
          .add(div('hx-titlebar-subtitle').text('Subtitle')))))
}

select('body')
  .add(heading())
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
    example('Auto Complete').add(autoCompleteExamples())
  ]))
