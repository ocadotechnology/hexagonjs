import { select, div, span } from 'utils/selection'

plotLabelStandard = (element, meta) ->

  createEntry = (value) ->
    div('hx-plot-label-details-entry')
      .add(span('hx-plot-label-details-entry-key').text(value.name))
      .add(span('hx-plot-label-details-entry-value').text(value.formatter(value.value)))

  header = div('hx-plot-label-marker').style('background', meta.color)

  details = div('hx-plot-label-details')
    .add(div('hx-plot-label-details-header').text(meta.title))
    .add(meta.values.map(createEntry))

  midX = (meta.bounding.x1 + meta.bounding.x2) / 2
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2

  details.classed('hx-plot-label-details-left', meta.x >= midX)
  details.classed('hx-plot-label-details-bottom', meta.y >= midY)

  select(element)
    .clear()
    .add(header)
    .add(details)

plotLabelBasic = (element, meta) ->
  marker = div('hx-plot-label-marker').style('background', meta.color)

  value = meta.values[1]
  midX = (meta.bounding.x1 + meta.bounding.x2) / 2
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2

  details = div('hx-plot-label-details-basic')
    .classed('hx-plot-label-details-left', meta.x >= midX)
    .classed('hx-plot-label-details-bottom', meta.y >= midY)
    .text(value.formatter(value.value))

  select(element)
    .clear()
    .add(marker)
    .add(details)

export {
  plotLabelStandard,
  plotLabelBasic
}
