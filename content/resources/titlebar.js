var dx = window.dx

function setupMenu (node, meta) {
  var selection = dx.select(node)
    .append('div').class('dx-content')
    .append('div').class('dx-group dx-horizontal')

  // XXX: turn this into part of the json request?
  selection.append('div').class('dx-section dx-fixed')
    .append('div').class('dx-margin dx-pad')
    .add(dx.detached('h3').text('About'))
    .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/').text('Home'))
    .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/getting-started/').text('Installation / Getting Started'))
    .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/core-concepts/').text('Core concepts'))
    .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/printing/').text('Printing'))
    .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/examples/').text('Examples'))
    // .add(dx.detached('h3').text('Design patterns'))
    // .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/general-guidelines/').text('General guidelines'))
    // .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/page-layout/').text('Page layout'))
    // .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/working-with-dom/').text('Working with the DOM'))
    // .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/working-with-data/').text('Working with data'))
    // .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/designing-for-mobiles/').text('Designing for mobiles'))
    // .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/representing-data/').text('Representing data'))
    // .add(dx.detached('h3').text('Theming'))
    // .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/guide/create-custom-theme/').text('Creating a custom theme'))
    .add(dx.detached('h3').text('Other'))
    .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/changelog/').text('Change Log'))
    .add(dx.detached('a').class('docs-dropdown-link').attr('href', '/faq/').text('FAQ'))

  var container = selection.append('div').class('dx-section dx-border-left docs-group-modules-container')
    .append('div').class('dx-margin dx-pad dx-group dx-vertical')

  var modulesArray = Object.keys(meta.modules).map(function (key) {
    return meta.modules[key]
  })

  var groups = dx.groupBy(modulesArray, function (d) { return d.category })

  var groupsObj = {}
  var groupNames = {
    'styles': 'CSS Components',
    'component': 'CSS + Javascript Components',
    'util': 'Utils (Javascript)'
  }

  function toId (module) {
    return module.id
  }

  groups.forEach(function (group) {
    groupsObj[group[0]] = group[1].map(toId).sort()
  })

  var groupOrder = ['styles', 'component', 'util']
  groupOrder.forEach(function (name) {
    var groupContainer = container.append('div').class('dx-group dx-vertical')
    groupContainer.append('h3').class('dx-section').text(groupNames[name])
    var groupModulesContainer = groupContainer.append('div').class('.dx-group dx-horizontal')
    groupsObj[name].forEach(function (module) {
      groupModulesContainer.add(dx.detached('a')
        .class('docs-dropdown-module-link dx-section dx-fixed')
        .attr('href', '/docs/' + (meta.selectedVersion || meta.targetVersions[meta.targetVersions.length - 1]) + '/' + module + '/')
        .text(module.split('-').map(function (d) {
          return d[0].toUpperCase() + d.substring(1)
        }).join(' '))
      )
    })
  })
}

dx.json('/meta.json', function (err, meta) {
  var menuPos = 0
  var i
  if (err) { console.error(err) }
  for (i in meta.targetVersions) {
    var v = meta.targetVersions[i]
    if (window.location.pathname.indexOf('/' + v + '/') > -1) {
      meta.selectedVersion = v
      break
    }
  }

  if (meta.selectedVersion) {
    dx.select('.docs-version').classed('docs-visible', true)
    var versionPicker = new dx.Picker('.docs-version-button', {
      items: meta.targetVersions.reverse(),
      renderer: function (elem, v) {
        elem = dx.select(elem)
          .text(v)

        if (!elem.classed('dx-picker-text')) {
          elem.on('click', function () {
            window.location.assign(window.location.href.replace(meta.selectedVersion, v))
          })
        }
      },
      value: meta.selectedVersion
    })
    dx.select('.docs-version-button').classed('dx-btn', false)
  }

  var searchInput = dx.select('.docs-search-box')

  function filterer (item) {
    var searchValue = searchInput.value().toLowerCase()
    return searchValue.split(' ').every(function (term) {
      return meta.modules[item].keywords.some(function (keyword) {
        return keyword.indexOf(term) >= 0
      })
    })
  }

  function renderMenu () {
    var searchValue = searchInput.value().toLowerCase()
    dropdownContent.clear()

    if (searchValue) {
      dropdownContent.classed('docs-menu-search-results', true).clear()
      Object.keys(meta.modules).filter(filterer).forEach(function (moduleId, i) {
        dropdownContent.append('a')
          .class('docs-search-result')
          .attr('href', '/docs/' + (meta.selectedVersion || meta.targetVersions[meta.targetVersions.length - 1]) + '/' + moduleId + '/')
          .classed('docs-search-result-highlight', menuPos === i)
          .add(dx.detached('span').class('docs-search-result-text').text(moduleId.split('-').join(' ')))
      })
    } else {
      setupMenu(dropdownContent.node(), meta)
    }
  }

  function performSearch () {
    var searchValue = searchInput.value().toLowerCase()
    if (searchValue) {
      var menuNodes = dx.selectAll('.docs-search-result')
      var node = menuNodes.node(menuPos)
      if (node) {
        document.location.href = dx.select(node).attr('href')
      } else {
        var results = Object.keys(meta.modules).filter(filterer)
        if (results.length > 0) {
          document.location.href = '/docs/' + meta.latest + '/' + results[0] + '/'
        }
      }
    }
  }

  var dropdownContent = dx.detached('div')

  var dropdown = new dx.Dropdown('.docs-search', function (node) {
    renderMenu()
    return dx.select(node)
      .classed('docs-menu-container', true)
      .append(dropdownContent.node())
  }, { mode: 'manual', spacing: 7 })

  dropdown.on('hidestart', function () {
    dx.select('.docs-search').classed('docs-search-active', false)
  })

  searchInput.on('focus', function () {
    dx.select('.docs-search').classed('docs-search-active', true)
    dropdown.show()
  })

  dropdown._.clickDetector.addException(dx.select('.docs-titlebar-logo').node())

  dx.select('.docs-titlebar-logo').on('click', function () {
    dropdown.toggle()
  })

  searchInput.on('input', renderMenu)

  function getSearchResult (event) {
    var menuNodes, node
    menuNodes = dx.selectAll('.docs-search-result')
    node = menuNodes.node(menuPos)
    if (node) dx.select(node).classed('docs-search-result-highlight', false)
    menuPos = (event.which === 38 ? Math.max(-1, menuPos - 1) : Math.min(menuNodes.size() - 1, menuPos + 1))
    node = menuNodes.node(menuPos)
    if (node) dx.select(node).classed('docs-search-result-highlight', true)
    event.preventDefault()
  }

  searchInput.on('keydown', function (event) {
    if (event.which === 13) { // enter
      performSearch()
    } else if (event.which === 9) { // tab
      //
    } else if (event.which === 38 || event.which === 40) { // up || down
      getSearchResult(event)
    }
  })
})
