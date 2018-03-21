function redirectorFunction (url, current, version) {
  if (url.indexOf((current + '/'), url.length - (current + '/').length) !== -1) {
    return '../' + version + '/'
  } else {
    return version + '/'
  }
}

function createOption (version, current) {
  var option = document.createElement('option')
  option.value = redirectorFunction(window.location.pathname, current, version)
  option.innerHTML = version
  return option
}

function goToVersion (event) {
  var url = event.target.value
  if (url) {
    window.location = url
  }
  return false
}

function getCurrentVersion (url, current, versions) {
  var pathSplit = url.split('/').filter(function (x) { return x })
  var pathVersion = pathSplit[pathSplit.length - 1]
  return versions.indexOf(pathVersion) !== -1 ? pathVersion : current || versions[versions.length - 1]
}

function createDropdown (id, versions, current) {
  var url = window.location.pathname
  var currentVersion = getCurrentVersion(url, current, versions)
  var node = document.getElementById(id)
  versions.forEach(function (v) { return node.appendChild(createOption(v, currentVersion)) })
  node.value = redirectorFunction(window.location.pathname, currentVersion, currentVersion)
  node.addEventListener('change', goToVersion)
}

function classed (node, className, classed) {
  var current = node.className.split(' ')
  var index = current.indexOf(className)
  if (arguments.length === 3) {
    if (index > -1 && !classed) {
      current.splice(index, 1)
    } else if (index === -1 && classed) {
      current.push(className)
    }
    node.className = current.join(' ')
  } else {
    return index > -1
  }
}

function createHeaderToggle (id) {
  var toggle = document.getElementById('nav.toggle.' + id)
  var links = document.getElementById('nav.links.' + id)
  var sidebar = document.querySelector('.qm-docs-sidebar')
  var header = toggle.parentNode.parentNode.parentNode

  function updateSidebar () {
    var headerHeight = header.getBoundingClientRect().height
    sidebar.style.top = headerHeight + 'px'
  }

  toggle.onclick = function () {
    var isOpen = classed(links, 'qm-mobile-nav-open')
    classed(links, 'qm-mobile-nav-open', !isOpen)
    if (sidebar) {
      classed(sidebar, 'qm-mobile-nav-open', !isOpen)
      updateSidebar()
    }
  }

  if (sidebar) {
    window.addEventListener('orientationchange', function () {
      setTimeout(updateSidebar, 5)
    })
  }
}

window.quantum = window.quantum || {}
window.quantum.docs = {
  createDropdown: createDropdown,
  createHeaderToggle: createHeaderToggle
}
