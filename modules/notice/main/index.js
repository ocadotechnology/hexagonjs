const { div } = require('modules/selection/main')

// XXX: 2.0.0 - these functions have changed name and module - document these changes
// notice.head has changed to noticeHead
// notice.body has changed to noticeBody

function notice () {
  return div('hx-notice')
}

function noticeHead () {
  return div('hx-notice-head')
}

function noticeBody () {
  return div('hx-notice-body')
}

module.exports = {
  notice,
  noticeHead,
  noticeBody,
  hx: {
    notice,
    noticeHead,
    noticeBody
  }
}
