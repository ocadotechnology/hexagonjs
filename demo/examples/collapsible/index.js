import { div, Collapsible } from 'hexagon-js'

export default () => {
  const selection = div('hx-collapsible')
    .add(div('hx-collapsible-heading').text('Header'))
    .add(div('hx-collapsible-content demo-collapsible-content').text('Content'))

  new Collapsible(selection)

  return selection
}
