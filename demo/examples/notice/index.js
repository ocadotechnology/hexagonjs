import { notice, noticeHead, noticeBody } from 'hexagon-js';

function exampleNotice(cls) {
  return notice().classed(cls, true)
    .add(noticeHead().text('Notice header'))
    .add(noticeBody().text('Notice body text'));
}

export default () => [
  exampleNotice(''),
  exampleNotice('hx-action'),
  exampleNotice('hx-positive'),
  exampleNotice('hx-warning'),
  exampleNotice('hx-negative'),
  exampleNotice('hx-info'),
  exampleNotice('hx-complement'),
  exampleNotice('hx-contrast'),
];
