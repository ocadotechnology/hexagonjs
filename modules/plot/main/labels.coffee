select = require('modules/selection/main')

standard = (element, meta) ->

  createEntry = (value) ->
    select.detached('div').class('hx-plot-label-details-entry')
      .add(select.detached('span').class('hx-plot-label-details-entry-key').text(value.name))
      .add(select.detached('span').class('hx-plot-label-details-entry-value').text(value.formatter(value.value)))

  header = select.detached('div').class('hx-plot-label-marker').style('background', meta.color)

  details = select.detached('div').class('hx-plot-label-details')
    .add(select.detached('div').class('hx-plot-label-details-header').text(meta.title))
    .add(meta.values.map(createEntry))

  midX = (meta.bounding.x1 + meta.bounding.x2) / 2
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2

  details.classed('hx-plot-label-details-left', meta.x >= midX)
  details.classed('hx-plot-label-details-bottom', meta.y >= midY)

  select(element)
    .clear()
    .add(header)
    .add(details)

basic = (element, meta) ->
  marker = select.detached('div').class('hx-plot-label-marker').style('background', meta.color)

  value = meta.values[1]
  midX = (meta.bounding.x1 + meta.bounding.x2) / 2
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2

  details = select.detached('div').class('hx-plot-label-details-basic')
    .classed('hx-plot-label-details-left', meta.x >= midX)
    .classed('hx-plot-label-details-bottom', meta.y >= midY)
    .text(value.formatter(value.value))

  select(element)
    .clear()
    .add(marker)
    .add(details)

module.exports = {
  standard,
  basic
}
