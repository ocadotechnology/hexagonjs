class Crumbtrail

  constructor: (@selector, options) ->
    hx.component.register(@selector, this)
    self = this

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
          .html(self.options.separator).node()

    @view = hx.select(@selector).view('span', 'span')
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
      @options.items = hx.flatten(data.map((d) -> [d, 0])).slice(0, -1)
      @view.apply @options.items
      this
    else
      @options.items

hx.crumbtrail = (options) ->
  selection = hx.detached('div')
  new Crumbtrail(selection.node(), options)
  selection

hx.Crumbtrail = Crumbtrail