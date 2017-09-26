// callback function - val will be true/false by default.
var dialogCallback = function(val){
  if (val){
    hx.notify("You confirmed the action", {icon: "fa fa-thumbs-up", cssclass: "hx-notification hx-positive" })
  } else {
    hx.notify("You cancelled the action", {icon: "fa fa-thumbs-down", cssclass: "hx-notification hx-negative" })
  }
}

// show the modal when the button is clicked
hx.select('#show-modal-dialog').on('click', function(){
  hx.modal.dialog('Modal Dialog Example', 'Please click Confirm or Cancel', dialogCallback);
});