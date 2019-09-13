import {
  div,
  detached,
  progressBar,
} from 'hexagon-js';

export default () => [
  progressBar({ value: 0.25 }),
  progressBar({ value: 0.33 }).classed('hx-action', true),
  progressBar({ value: 0.42 }).classed('hx-positive', true),
  progressBar({ value: 0.5 }).classed('hx-warning', true),
  progressBar({ value: 0.58 }).classed('hx-negative', true),
  progressBar({ value: 0.67 }).classed('hx-complement', true),
  progressBar({ value: 0.75 }).classed('hx-contrast', true),
  div('hx-pad'),
  div('hx-pad'),
  div('hx-flag-typography').set([
    div('hx-header-medium').text('Updated Progress Bars (feature flag)'),
    progressBar({
      featureFlags: { useUpdatedClass: true },
      title: 'Title here',
      breakdown: 'Breakdown Text can go here',
      plan: 78,
      done: 38,
    }),
    detached('note').text('Not started state'),
    progressBar({
      featureFlags: { useUpdatedClass: true },
      title: 'Title here',
      breakdown: 'Breakdown Text can go here',
      plan: 80,
    }),
    detached('note').text('Not applicable state (disabled)'),
    progressBar({
      featureFlags: { useUpdatedClass: true },
      title: 'Title here',
      breakdown: 'Breakdown Text can go here',
      disabled: true,
    }),
    detached('note').text('In Progress state'),
    progressBar({
      featureFlags: { useUpdatedClass: true },
      title: 'Buffering Containers',
      breakdown: 'Ambient: 27 / 50\nChill: 10 / 25\nFreezer: 0 / 5',
      plan: 78,
      inProgress: 2,
      done: 38,
    }),
    div('hx-header-medium').text('Secondary progress bars (compact)'),
    progressBar({
      featureFlags: { useUpdatedClass: true },
      title: 'Freezer (eaches)',
      breakdown: 'Breakdown Text can go here',
      done: 5,
      plan: 10,
      compact: true,
    }),
    detached('note').text('Disabled'),
    progressBar({
      featureFlags: { useUpdatedClass: true },
      title: 'Freezer (eaches)',
      breakdown: 'Breakdown Text can go here',
      done: 5,
      plan: 10,
      compact: true,
      disabled: true,
    }),
    detached('note').text('In table'),
    detached('table').class('hx-table hx-flag-table')
      .add(detached('thead')
        .add(detached('tr')
          .add(detached('th').text('Title'))
          .add(detached('th').text('Title'))))
      .add(detached('tbody')
        .add(detached('tr')
          .add(detached('td').text('Something'))
          .add(detached('td').add(progressBar({
            featureFlags: { useUpdatedClass: true },
            done: 9,
            plan: 10,
            compact: true,
          }))))
        .add(detached('tr')
          .add(detached('td').text('Something'))
          .add(detached('td').add(progressBar({
            featureFlags: { useUpdatedClass: true },
            done: 9,
            plan: 10,
            compact: true,
            disabled: true,
          }))))),
    div('hx-header-medium').text('Edge Cases'),
    detached('note').text('No plan'),
    progressBar({
      featureFlags: { useUpdatedClass: true },
      title: 'Freezer (units)',
      breakdown: 'Breakdown Text can go here',
      done: 900,
    }),
    detached('note').text('MVP: show position without planning capabilities yet'),
    progressBar({
      featureFlags: { useUpdatedClass: true },
      title: 'Freezer (units)',
      breakdown: 'Breakdown Text can go here',
      done: 900,
      hidePlan: true,
    }),
    div('hx-card')
      .add(div('hx-card-section hx-card-header')
        .add(div('hx-header-medium').text('Usage in a card')))
      .add(div('hx-card-section hx-no-border')
        .add(progressBar({
          featureFlags: { useUpdatedClass: true },
          title: 'Ambient (units)',
          done: 80,
          plan: 5000,
        })))
      .add(div('hx-card-section hx-no-border')
        .add(progressBar({
          featureFlags: { useUpdatedClass: true },
          title: 'Chill (units)',
          done: 2200,
          inProgress: 100,
          plan: 2100,
        })))
      .add(div('hx-card-section hx-no-border')
        .add(progressBar({
          featureFlags: { useUpdatedClass: true },
          title: 'Freezer (units)',
          done: 900,
          plan: 1200,
        }))),
  ]),
];
