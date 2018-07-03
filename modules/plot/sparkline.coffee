import { Graph } from './graph'
import { select, div, span } from 'selection'
import { mergeDefined } from 'utils'
import logger from 'logger'
import { theme } from 'theme'

import { optionSetterGetter } from './utils'


class Sparkline

  constructor: (selector, options) ->
    opts = mergeDefined({
      strokeColor: theme().plotColor1,
      data: [],
      type: 'line',
      min: undefined
      max: undefined
      labelRenderer: (element, obj) -> select(element).text(obj.y + ' (' + obj.x + ')')
      redrawOnResize: true
    }, options)

    innerLabelRenderer = (element, meta) ->
      marker = div('hx-plot-label-marker').style('background', meta.color)

      xValue = meta.values[0]
      yValue = meta.values[1]
      midX = (meta.bounding.x1 + meta.bounding.x2) / 2
      midY = (meta.bounding.y1 + meta.bounding.y2) / 2

      labelNode = div().node()

      opts.labelRenderer(labelNode, {
        x: xValue.value,
        y: yValue.value
      })

      details = div('hx-plot-label-details-basic')
        .classed('hx-plot-label-details-left', meta.x >= midX)
        .classed('hx-plot-label-details-bottom', meta.y >= midY)
        .add(span('hx-plot-label-sparkline-x').add(labelNode))

      select(element)
        .clear()
        .add(marker)
        .add(details)

    select(selector)
      .classed('hx-sparkline', true)
      .api(this)

    graph = new Graph(selector, { redrawOnResize: opts.redrawOnResize })

    if opts.type isnt 'bar' and opts.type isnt 'line'
      logger.warn('options.type can only be "line" or "bar", you supplied "' + opts.type + '"')
      @render = -> graph.render()
      return

    axisOptions = {
      x: {
        scaleType: if opts.type is 'bar' then 'discrete' else 'linear'
        visible: false
      },
      y: {
        visible: false
        scalePaddingMin: 0.1
        scalePaddingMax: 0.1
      }
    }

    axisOptions.y.min = opts.min if opts.min?
    axisOptions.y.max = opts.max if opts.max?

    axis = graph.addAxis(axisOptions)
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
  redrawOnResize: (value) ->
    @_.graph.redrawOnResize(value)
    optionSetterGetter('redrawOnResize').apply(this, arguments)

  render: ->
    @_.series.data(@data())
    if @fillColor()? then @_.series.fillColor(@fillColor())
    if @_.options.type is 'line'
      @_.series.strokeColor(@strokeColor())
    @_.graph.render()


sparkline = (options) ->
  selection = div()
  sl = new Sparkline(selection, options)
  sl.render()
  selection

export {
  sparkline,
  Sparkline
}
