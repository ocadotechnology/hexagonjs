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
  const manualTabDiv = div('hx-flag-tabs')
    .add(div('hx-tab').text('Tab 1').attr('data-content', 'tab-1'))
    .add(div('hx-tab').text('Tab 2').attr('data-content', 'tab-2'))
    .add(div('hx-tab').text('Tab 3').attr('data-content', 'tab-3'))
    .add(div('hx-tabs-content')
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
