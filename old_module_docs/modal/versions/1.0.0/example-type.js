// show the modal when the button is clicked
hx.select('#show-modal-warning').on('click', function () {
  // callback function - val will be defined if sumbit was
  // selected, false if cancel was selected and undefined if
  // the modal was closed with no action selected
  hx.modal.dialog('Modal Warning Example', 'You did something that caused a warning.', function (val) {}, {
    titleClass: 'warning',
    icon: 'fa fa-warning'
  })
})

hx.select('#show-modal-positive').on('click', function () {
  hx.modal.dialog('Modal Positive Example', 'You did something positive.', function (val) {}, {
    titleClass: 'positive',
    icon: 'fa fa-check'
  })
})

hx.select('#show-modal-negative').on('click', function () {
  hx.modal.dialog('Modal Negative Example', 'You did something negative.', function (val) {}, {
    titleClass: 'negative',
    icon: 'fa fa-exclamation-circle'
  })
})

hx.select('#show-modal-info').on('click', function () {
  hx.modal.dialog('Modal Info Example', 'You did something that has extra information.', function (val) {}, {
    titleClass: 'info',
    icon: 'fa fa-info'
  })
})
