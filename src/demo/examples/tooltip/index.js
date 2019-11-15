import { tooltip, detached, span } from 'hexagon-js';

export default () => [
  tooltip({ text: 'A little bit more information', label: 'Text tooltip label' }),
  tooltip({ text: 'A little bit more information', icon: 'fab fa-angellist' }),
  detached('p')
    .add(span().text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi purus, sagittis sit amet ipsum sed, dictum placerat massa. '))
    .add(span().text('Morbi id vulputate quam. Nulla ultricies mauris ligula, vitae luctus leo ullamcorper at. '))
    .add(tooltip({
      text: 'Aliquam erat volutpat. Aenean ac lacus volutpat, tempus magna ac, dapibus orci. Pellentesque quis leo fermentum, sodales mi vitae, sodales purus. Ut ultricies mattis nibh ut facilisis. Fusce quis scelerisque ex. Morbi blandit efficitur nisl non lacinia. Suspendisse potenti. In consequat dictum faucibus. Donec ornare elit id ultricies ornare.',
      label: 'Proin eu lacinia odio. ',
    }))
    .add(span().text('Vestibulum porta nisl a justo elementum ullamcorper. Duis sagittis velit auctor fermentum ullamcorper.')),
];
