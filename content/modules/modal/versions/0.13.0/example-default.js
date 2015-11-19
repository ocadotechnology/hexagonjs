var setupModal = function(element){
  elem = hx.select(element).closest('.hx-modal-container').select('.hx-modal-title').classed('hx-background-warning', true)
  elem.select('.hx-btn').classed('hx-warning', true)
  hx.select(element)
    .append('div')
    .text('Modal Content');

}

var modal = new hx.Modal('Modal Popup', setupModal);

hx.select('#show-modal').on('click', function(){
  modal.show();
});