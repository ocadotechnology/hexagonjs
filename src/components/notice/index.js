import { div } from 'utils/selection';

function notice() {
  return div('hx-notice');
}

function noticeHead() {
  return div('hx-notice-head');
}

function noticeBody() {
  return div('hx-notice-body');
}

// XXX Deprecated: Fluid
notice.head = noticeHead;
notice.body = noticeBody;

export {
  notice,
  noticeHead,
  noticeBody,
};
