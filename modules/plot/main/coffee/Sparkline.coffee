
class Sparkline
  constructor: (selector, options) ->
    opts = hx.merge.defined({
      strokeColor: hx.theme.plot.colors[0],
      data: [],
      type: 'line',
      labelRenderer: hx.plot.label.basic
    }, options)

    hx.components.clear(selector)
    hx.component.register(selector, this)

    graph = new hx.Graph(selector)

    if opts.type isnt 'bar' and opts.type isnt 'line'
      hx.consoleWarning('options.type can only be "line" or "bar", you supplied "' + opts.type + '"')
      @render = -> graph.render()
      return

    axis = graph.addAxis({
      x: {
        scaleType: if opts.type is 'bar' then 'discrete' else 'linear'
        visible: false
      },
      y: {
        visible: false
      }
    })
    series =  axis.addSeries(opts.type, {
      fillEnabled: true
      labelRenderer: options.labelRenderer
    })

    @_ = {
      options: opts,
      graph: graph,
      series: series
    }

  data: optionSetterGetter('data')
  fillColor: optionSetterGetter('fillColor')
  strokeColor: optionSetterGetter('strokeColor')
  labelRenderer: optionSetterGetter('labelRenderer')

  render: ->
    self = this
    @_.series.data(@data().map((d, i) -> {x: i, y: d}))
    @_.series.fillColor(@fillColor())
    @_.series.labelRenderer(@labelRenderer())
    if @_.options.type is 'line'
      @_.series.strokeColor(@strokeColor())
    @_.graph.render()
