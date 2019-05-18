import { div, SideCollapsible } from 'hexagon-js';

export default () => {
  const selection = div('hx-side-collapsible')
    .add(div('hx-side-collapsible-heading-closed').text('Header'))
    .add(div('hx-side-collapsible-heading-open').text('Header'))
    .add(div('hx-side-collapsible-content demo-collapsible-content').text('Content'));

  new SideCollapsible(selection);

  return selection;
};
