import {
  select,
  spinner,
  button,
  spinnerWide,
  Modal
} from '../modules/hexagon.js' // would normally be 'hexagon-js'

function modalButton () {
  const modal = new Modal("Demo modal", (node) => {
    select(node).text("Hello")
  })

  return button('hx-button')
    .text('Show Modal')
    .on('click', () => {
      modal.show()
    })
}

select('body')
  .add(spinner())
  .add(spinnerWide())
  .add(modalButton())
