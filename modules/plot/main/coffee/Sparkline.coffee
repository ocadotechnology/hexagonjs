
class Sparkline

  constructor: (selector, options) ->
    opts = hx.merge.defined({
      strokeColor: hx.theme.plot.colors[0],
      data: [],
      type: 'line',
      labelRenderer: (element, obj) -> hx.select(element).text(obj.y + ' (' + obj.x + ')')
    }, options)

    innerLabelRenderer = (element, meta) ->
      marker = hx.detached('div').class('hx-plot-label-marker').style('background', meta.color)

      xValue = meta.values[0]
      yValue = meta.values[1]
      midX = (meta.bounding.x1 + meta.bounding.x2) / 2
      midY = (meta.bounding.y1 + meta.bounding.y2) / 2

      labelNode = hx.detached('div').node()

      opts.labelRenderer(labelNode, {
        x: xValue.value,
        y: yValue.value
      })

      details = hx.detached('div').class('hx-plot-label-details-basic')
        .classed('hx-plot-label-details-left', meta.x >= midX)
        .classed('hx-plot-label-details-bottom', meta.y >= midY)
        .add(hx.detached('span').class('hx-plot-label-sparkline-x').add(labelNode))

      hx.select(element)
        .clear()
        .add(marker)
        .add(details)

    hx.components.clear(selector)
    hx.component.register(selector, this)

    graph = new hx.Graph(selector, { redrawOnResize: options.redrawOnResize })

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
        scalePaddingMin: 0.1
        scalePaddingMax: 0.1
      }
    })
    series =  axis.addSeries(opts.type, {
      fillEnabled: true
      labelRenderer: innerLabelRenderer
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
    @_.series.data(@data())
    if @fillColor()? then @_.series.fillColor(@fillColor())
    if @_.options.type is 'line'
      @_.series.strokeColor(@strokeColor())
    @_.graph.render()
