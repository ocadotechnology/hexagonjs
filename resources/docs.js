;(function () {
  var body = document.body

  function getMethod (node, methodName) {
    if (node === window) {
      return window[methodName]
    } else if (node instanceof Document) {
      return Document.prototype[methodName]
    } else {
      return Element.prototype[methodName]
    }
  }

  function select (node, selector) {
    return getMethod(node, 'querySelector').call(node, selector)
  }
  function selectAll (node, selector) {
    return getMethod(node, 'querySelectorAll').call(node, selector)
  }
  function addHandler (node, eventName, handler) {
    return getMethod(node, 'addEventListener').call(node, eventName, handler)
  }
  function collapsibleToggle (collapsibleNode, nodeClass, contentNode) {
    var open = collapsibleNode.className.indexOf('docs-collapsible-open') !== -1
    collapsibleNode.className = (open ? nodeClass : nodeClass + ' docs-collapsible-open')
  }

  function collapsible (node) {
    var nodeClass = node.className
    var nodeToggle = select(node, '.docs-collapsible-toggle') || select(node, '.docs-collapsible-heading')

    if (nodeToggle.className.indexOf('toggle') === -1) {
      nodeToggle.className = nodeToggle.className + ' docs-collapsible-toggle'
    }

    var contentNode = select(node, '.docs-collapsible-content')

    if (contentNode) {
      addHandler(nodeToggle, 'click', function (event) { collapsibleToggle(node, nodeClass, contentNode) })
    }
  }

  function initializeCollapsibles (selector) {
    var collapsibles = selectAll(document.body, selector)
    for (var i = 0; i < collapsibles.length; i++) {
      collapsible(collapsibles[i])
    }
    return collapsibles
  }
  initializeCollapsibles('.docs-collapsible')
})()
