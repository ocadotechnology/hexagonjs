// show the modal when the button is clicked
hx.select('#show-modal-input').on('click', function(){

  // callback function - val will be defined if sumbit was
  // selected, false if cancel was selected and undefined if
  // the modal was closed with no action selected
  hx.modal.input('Modal Input Example', 'Enter some text:', function(val){
    if (hx.isString(val)){
      hx.notify.info("You entered: " + val)
    } else {
      hx.notify.negative("You cancelled the action")
    }
  });

});