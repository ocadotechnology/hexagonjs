import { tree, select } from 'hexagon-js'

export default () => {
  return [
    tree({
      renderer: function (elem, data) { select(elem).text(data.name) },
      items: [
        {
          name: 'Parent 1',
          children: [
            {
              name: 'Item 1'
            },
            {
              name: 'Parent 2',
              children: [
                {
                  name: 'Item 2'
                }
              ]
            }
          ]
        }
      ]
    })
  ]
}
