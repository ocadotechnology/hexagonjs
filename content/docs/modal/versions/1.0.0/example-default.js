var setupModal = function (node) {
  hx.select(node).text('Modal Text')
}

var modal = new hx.Modal('Modal Popup', setupModal)

hx.select('#show-modal').on('click', function () {
  modal.show()
})
