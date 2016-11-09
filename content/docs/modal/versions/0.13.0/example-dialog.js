// callback function - val will be true/false by default.
var dialogCallback = function(val){
  if (val){
    hx.notify().temporary("You confirmed the action", "fa fa-thumbs-up", "hx-notification hx-positive")
  } else {
    hx.notify().temporary("You cancelled the action", "fa fa-thumbs-down", "hx-notification hx-negative")
  }
}

// show the modal when the button is clicked
hx.select('#show-modal-dialog').on('click', function(){
  hx.modal.dialog('Modal Dialog Example', 'Please click Confirm or Cancel', dialogCallback);
});