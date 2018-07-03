import { tagInput, detached } from 'hexagon-js'

export default () => {
  return [
    tagInput({ items: ['tag-1', 'tag-2', 'tag-3'] }),
    detached('br'),
    tagInput({
      classifier: function(value) {
        switch(value){
          case 'hello':
            return 'hx-positive'
          case 'goodbye':
            return 'hx-negative'
        }
      },
      items: ['hello', 'goodbye', 'tag', 'tag2']
    })
  ]
}
