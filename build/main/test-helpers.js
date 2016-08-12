var testHelpers = (function () {
  var fakeNodeEvent = function (node, eventName, eventNamespace) {
    if (node != null) {
      return function (e) {
        var eventEmitter = hx.select.getHexagonElementDataObject(node).eventEmitter
        if (eventEmitter != null) {
          // we're using fakeNodeEvent for mapping arrays, so the eventName might be an index
          eventName = (eventName != null && isNaN(eventName)) ? eventName : 'click'
          if (eventNamespace != null) {
            eventEmitter.emit(eventName, eventNamespace, e)
          } else {
            eventEmitter.emit(eventName, e)
          }
        }
      }
    }
  }
  return { fakeNodeEvent: fakeNodeEvent }
})()
