import { div, group, section } from 'hexagon-js'

export default () => {

  const exampleLayout = group()
    .add(section())
    .add(group({ vertical: true })
      .add(section())
      .add(section())
      .add(group()
        .add(section())
        .add(section())))
    .add(section())
    .add(section())

  return div('layout-demo')
    .add(exampleLayout)
}