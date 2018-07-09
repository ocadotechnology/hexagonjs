import {
  div,
  span,
  button,
  i,
  group,
  section,
  notifyInfo,
  DragContainer
} from 'hexagon-js'

export default () => {
  const container = group()
    .add(section()
      .attr('data-id', 'green')
      .classed('hx-drag-element hx-pad hx-background-positive', true)
      .text('Draggable'))
    .add(section()
      .attr('data-id', 'yellow')
      .classed('hx-drag-element hx-pad hx-background-warning', true)
      .text('Draggable'))
    .add(section()
      .attr('data-id', 'red')
      .classed('hx-drag-element hx-pad hx-background-negative', true)
      .text('Undraggable'))
    .add(section()
      .attr('data-id', 'blue')
      .classed('hx-drag-element hx-pad hx-background-action', true)
      .add(span()
        .add(i('hx-drag-control fa fa-arrows'))
        .add(span().text('Draggable Control'))))

  const dc = new DragContainer(container)

  const resetButton = button('hx-btn')
    .text('Reset Order')
    .on('click', () => {
      dc.order(undefined)
    })

  const getOrderButton = button('hx-btn hx-positive')
    .text('Get Order')
    .on('click', () => {
      notifyInfo('The order is: ' + dc.order().join(', '))
    })

  return div()
    .add([
      container,
      resetButton,
      getOrderButton
    ])
}