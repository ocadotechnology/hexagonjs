hx_plot_label = {}

hx_plot_label.standard = (element, meta) ->

  createEntry = (value) ->
    hx.detached('div').class('hx-plot-label-details-entry')
      .add(hx.detached('span').class('hx-plot-label-details-entry-key').text(value.name))
      .add(hx.detached('span').class('hx-plot-label-details-entry-value').text(value.formatter(value.value)))

  header = hx.detached('div').class('hx-plot-label-marker').style('background', meta.color)

  details = hx.detached('div').class('hx-plot-label-details')
    .add(hx.detached('div').class('hx-plot-label-details-header').text(meta.title))
    .add(meta.values.map(createEntry))

  midX = (meta.bounding.x1 + meta.bounding.x2) / 2
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2

  details.classed('hx-plot-label-details-left', meta.x >= midX)
  details.classed('hx-plot-label-details-bottom', meta.y >= midY)


  hx.select(element)
    .clear()
    .add(header)
    .add(details)

hx_plot_label.basic = (element, meta) ->
  marker = hx.detached('div').class('hx-plot-label-marker').style('background', meta.color)

  value = meta.values[1]
  midX = (meta.bounding.x1 + meta.bounding.x2) / 2
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2

  details = hx.detached('div').class('hx-plot-label-details-basic')
    .classed('hx-plot-label-details-left', meta.x >= midX)
    .classed('hx-plot-label-details-bottom', meta.y >= midY)
    .text(value.formatter(value.value))

  hx.select(element)
    .clear()
    .add(marker)
    .add(details)