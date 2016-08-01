var testHelpers = (function () {
  var fakeNodeEvent = function (node, eventName) {
    if (node != null) {
      return function (e) {
        var eventEmitter = hx.select.getHexagonElementDataObject(node).eventEmitter
        if (eventEmitter != null) {
          // we're using fakeNodeEvent for mapping arrays, so the eventName might be a an index
          eventName = (eventName != null && isNaN(eventName)) ? eventName : 'click'
          eventEmitter.emit(eventName, e)
        }
      }
    }
  }
  return { fakeNodeEvent: fakeNodeEvent }
})()
