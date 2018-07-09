import { button, div, Dropdown } from 'hexagon-js'

export default () => {
  const button1 = button('hx-btn').text('Click dropdown')
  const content1 = div('demo-dropdown-content').text('Dropdown content')
  new Dropdown(button1, content1)

  const button2 = button('hx-btn').text('Hover dropdown')
  const content2 = div('demo-dropdown-content').text('Dropdown content')
  new Dropdown(button2, content2, { mode: 'hover' })

  return [
    button1,
    button2
  ]
}
