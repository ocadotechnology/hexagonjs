document.querySelectorAll('.qm-api-collapsible').forEach(function (node) {
  var contentNode = node.querySelector('.qm-api-collapsible-content')
  if (contentNode) {
    var initialClass = node.className.replace('qm-api-collapsible-open', '')
    node.querySelector('.qm-api-collapsible-toggle')
      .addEventListener('click', function () {
        var isOpen = node.className.indexOf('qm-api-collapsible-open') !== -1
        node.className = (isOpen ? initialClass : initialClass + ' qm-api-collapsible-open')
      })
  }
})
