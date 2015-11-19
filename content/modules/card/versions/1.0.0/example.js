function titleText (title, text) {
  return hx.card.section()
    .add(hx.card.title({text: title}))
    .add(hx.card.text({text: text}))
}

function sparkline (options) {
  return hx.card.group()
    .add(hx.card.fixed.section().add(hx.card.text({text: options.text})))
    .add(hx.card.section().add(hx.sparkline({strokeColor: options.sparklineColor, data: options.sparklineData})))
}

function statusCard (name, context) {
  return hx.card()
    .add(hx.card.header.section({ context: context})
      .add(hx.card.title({text: name})))
    .add(hx.card.header.group()
      .add(titleText('Status', 'Normal'))
      .add(titleText('Uptime', '5 days'))
      .add(titleText('Memory Usage', '482 MB'))
      .add(titleText('Thread Count', '19'))
      .add(titleText('Page Hits', '2236 / s')))
    .add(hx.card.aligned()
      .add(sparkline({text: 'Memory Use', sparklineColor: hx.theme.plot.colors[0], sparklineData: hx.range(60).map(Math.random)}))
      .add(sparkline({text: 'Thread Count', sparklineColor: hx.theme.plot.colors[1], sparklineData: hx.range(60).map(Math.random)}))
      .add(sparkline({text: 'Page Hits', sparklineColor: hx.theme.plot.colors[2], sparklineData: hx.range(60).map(Math.random)}))
      .add(sparkline({text: 'Messages Processed', sparklineColor: hx.theme.plot.colors[3], sparklineData: hx.range(60).map(Math.random)})))
}

hx.select('#card-container')
  .add(statusCard('Instance 1', undefined))
  .add(statusCard('Instance 2', 'positive'))
  .add(statusCard('Instance 3', 'negative'))
