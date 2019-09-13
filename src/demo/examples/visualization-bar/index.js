import {
  visualizationBar,
  detached,
  div,
} from 'hexagon-js';

export default () => div('hx-flag-typography').set([
  visualizationBar({
    segments: [
      {
        id: 'late',
        label: 'Late',
        count: 11,
        type: 'danger',
      },
      {
        id: 'predictedDelays',
        label: 'Predicted Delays',
        count: 17,
        type: 'warning',
      },
      {
        id: 'onTime',
        label: 'On Time',
        count: 52,
      },
    ],
  }),
  detached('note').text('With title / breakdown'),
  visualizationBar({
    title: 'Title',
    breakdown: 'Breakdown text can go here',
    segments: [
      {
        id: 'late',
        label: 'Late',
        count: 11,
        type: 'danger',
      },
      {
        id: 'predictedDelays',
        label: 'Predicted Delays',
        count: 17,
        type: 'warning',
      },
      {
        id: 'onTime',
        label: 'On Time',
        count: 52,
      },
    ],
  }),
  detached('note').text('Alternate colour schemes'),
  visualizationBar({
    title: 'Three segments',
    segments: [
      {
        id: 'healthy-used',
        label: 'Healthy and used',
        count: 22,
        type: 'dark',
      },
      {
        id: 'healthy-unused',
        label: 'Healthy and not in use',
        count: 3,
        type: 'medium',
      },
      {
        id: 'not-in-use',
        label: 'Unavailable',
        count: 99,
        type: 'light',
      },
    ],
  }),
  visualizationBar({
    title: 'Two segments',
    segments: [
      {
        id: 'healthy-used',
        label: 'Healthy and used',
        count: 5,
        type: 'medium',
      },
      {
        id: 'healthy-unused',
        label: 'Healthy and not in use',
        count: 0,
        type: 'light',
      },
    ],
  }),
]);
