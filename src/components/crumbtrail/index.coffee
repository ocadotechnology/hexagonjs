import { select, div } from 'utils/selection'
import { mergeDefined, flatten } from 'utils/utils'

class Crumbtrail

  constructor: (@selector, options) ->
    self = this

    section = select(@selector).api(this)
    section.classed('hx-crumbtrail', true)

    @options = mergeDefined({
      renderer: (node, data) ->
        select(node).text(data)
      items: []
      separator: '/'
    }, options)

    update = (d, element, i) ->
      if i % 2 is 0
        @class('hx-crumbtrail-node')
        self.options.renderer(element, d)
      else
        @class('hx-crumbtrail-separator')
          .text(self.options.separator).node()

    @view = section.view('span', 'span')
      .update update

    if @options.items? and @options.items.length > 0
      @items @options.items

  renderer: (render) ->
    if render?
      @options.renderer = render
      this
    else
      @options.renderer

  items: (data) ->
    if data?
      @options.items = data
      @view.apply flatten(data.map((d) -> [d, 0])).slice(0, -1)
      this
    else
      @options.items

crumbtrail = (options) ->
  selection = div()
  new Crumbtrail(selection.node(), options)
  selection

export {
  crumbtrail,
  Crumbtrail
}
