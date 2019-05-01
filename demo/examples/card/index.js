import {
  card,
  div,
  range,
  theme,
  sparkline,
} from 'hexagon-js';


function titleText(title, text) {
  return card.section()
    .add(div().add(card.title({ text: title })))
    .add(div().add(card.text({ text })));
}

function sparklineExample(options) {
  return card.group()
    .add(card.fixed.section().add(card.text({ text: options.text })))
    .add(card.section()
      .add(sparkline({
        strokeColor: options.sparklineColor,
        data: options.sparklineData,
      })));
}

function random(i) {
  return {
    x: i,
    y: Math.random(),
  };
}

function statusCard(name, context) {
  return card()
    .add(card.header.section({ context })
      .add(card.title({ text: name })))
    .add(card.header.group()
      .add(titleText('Status', 'Normal'))
      .add(titleText('Uptime', '5 days'))
      .add(titleText('Memory Usage', '482 MB'))
      .add(titleText('Thread Count', '19'))
      .add(titleText('Page Hits', '2236 / s')))
    .add(card.aligned()
      .add(sparklineExample({ text: 'Memory Use', sparklineColor: theme().plotColors[0], sparklineData: range(60).map(random) }))
      .add(sparklineExample({ text: 'Thread Count', sparklineColor: theme().plotColors[1], sparklineData: range(60).map(random) }))
      .add(sparklineExample({ text: 'Page Hits', sparklineColor: theme().plotColors[2], sparklineData: range(60).map(random) }))
      .add(sparklineExample({ text: 'Messages Processed', sparklineColor: theme().plotColors[3], sparklineData: range(60).map(random) })));
}

export default () => div('card-demo')
  .add(statusCard('Instance 1', undefined))
  .add(statusCard('Instance 2', 'positive'))
  .add(statusCard('Instance 3', 'negative'));
