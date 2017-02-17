class Crumbtrail

  constructor: (@selector, options) ->
    hx.component.register(@selector, this)
    self = this

    section = hx.select(@selector)
    section.classed('hx-crumbtrail', true)

    @options = hx.merge.defined {
      renderer: (node, data) ->
        hx.select(node).text(data)
      items: []
      separator: '/'
    }, options

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
      @view.apply hx.flatten(data.map((d) -> [d, 0])).slice(0, -1)
      this
    else
      @options.items

hx.crumbtrail = (options) ->
  selection = hx.detached('div')
  new Crumbtrail(selection.node(), options)
  selection

hx.Crumbtrail = Crumbtrail
