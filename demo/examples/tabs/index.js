import {
  cycle,
  detached,
  div,
  range,
  select,
  tabs,
  Tabs,
} from 'hexagon-js';

export default () => {
  const manualTabDiv = div()
    .add(div('hx-tab hx-positive').text('Tab 1').attr('data-content', 'tab-1'))
    .add(div('hx-tab hx-warning').text('Tab 2').attr('data-content', 'tab-2'))
    .add(div('hx-tab hx-negative').text('Tab 3').attr('data-content', 'tab-3'))
    .add(div('hx-tabs-content').style('padding', '1em')
      .add(div('hx-tab-content').text('Tab 1 Content').attr('id', 'tab-1'))
      .add(div('hx-tab-content').text('Tab 2 Content').attr('id', 'tab-2'))
      .add(div('hx-tab-content').text('Tab 3 Content').attr('id', 'tab-3')));

  new Tabs(manualTabDiv);

  const contexts = [undefined, 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast'];

  return [
    manualTabDiv,
    detached('br'),
    tabs({
      items: range(8).map((_, i) => ({
        title: `Tab ${i + 1}`,
        content: `Tab Content ${i + 1} - ${cycle(contexts, i)} border`,
        context: cycle(contexts, i),
      })),
      contentRenderer: (elem, content) => {
        select(elem).style('padding', '1em').text(content);
      },
    }),
  ];
};
