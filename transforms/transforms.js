const quantum = require('quantum-js')
const dom = require('quantum-dom')

exports.section = function (selection, transforms) {
  return dom.create('div').class('docs-section')
    .add(dom.create('h2').text(selection.ps()))
    .add(dom.create('div').class('docs-section-content')
      .add(selection.transform(transforms)))
}

exports.card = function (selection, transforms) {
  return dom.create('div').class('docs-card')
    .add(selection.transform(transforms))
}

// exports.example = function(selection, dom, transforms) {
//   return dom.create('div').class('docs-example')
//     .add(selection.transform(transforms))
// }

exports.module = function (selection, transforms) {
  const module = selection.ps().toLowerCase().split(' ').join('-')
  const moduleTitle = selection.ps()

  const moduleContainer = dom.create('div').class('docs-module')
    .add(dom.create('h1').class('docs-module-section').text(moduleTitle)
      .add(dom.create('div').class('docs-module-changelog-link')
        .add(dom.create('a').text('Changelog').attr('href', '/docs/' + module + '/changelog/'))))

  if (selection.hasContent()) {
    if (selection.has('description')) {
      moduleContainer = moduleContainer.add(selection.select('description').transform(transforms))
    } else {
      moduleContainer = moduleContainer.add('This module does not have a description.')
    }

    if (selection.has('examples')) {
      var exampleContent = selection.filter('examples')
      if (exampleContent.content[0].content.length) {
        moduleContainer = moduleContainer.add(dom.create('h1').class('docs-module-section').text('Examples'))
          .add(exampleContent.transform(transforms))
      }
    }

    if (selection.has('api')) {
      var apiContent = selection.filter('api')
      if (apiContent.content[0].content.length) {
        moduleContainer = moduleContainer.add(dom.create('h1').class('docs-module-section').text('Api'))
          .add(apiContent.transform(transforms))
      }
    }

    if (selection.has('extra')) {
      moduleContainer = moduleContainer.add(selection.select('extra').transform(transforms))
    }
  } else {
    moduleContainer = moduleContainer.add('This module does not have any documentation for this version.')
  }

  return moduleContainer
}

exports.examples = function (selection, transforms) {
  return dom.create('div').class('docs-examples')
    .add(selection.transform(transforms))
}

// exports.list = function (selection, transforms) {
//   var ordered = selection.ps() === 'ordered'
//   return dom.create(ordered ? 'ol' : 'ul').class(ordered ? 'docs-list' : 'docs-list fa-ul')
//     .add(Promise.all(selection.selectAll('item').map(function (e) {
//       return dom.create('li')
//         .add(ordered ? undefined : dom.create('i').class('fa fa-li ' + (e.ps() || 'docs-list-bullet fa-circle')))
//         .add(e.transform(transforms))
//     })))
// }

var blackChevron = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="14" viewBox="0 0 10 14"><path fill="#444444" d="M8.648 6.852l-5.797 5.797q-0.148 0.148-0.352 0.148t-0.352-0.148l-1.297-1.297q-0.148-0.148-0.148-0.352t0.148-0.352l4.148-4.148-4.148-4.148q-0.148-0.148-0.148-0.352t0.148-0.352l1.297-1.297q0.148-0.148 0.352-0.148t0.352 0.148l5.797 5.797q0.148 0.148 0.148 0.352t-0.148 0.352z"></path></svg>'

exports.example = function (selection, transforms) {
  const body = dom.create('div').class('docs-example-body')
    .add(selection.transform(transforms))

  const codeBody = dom.create('div').class('docs-example-code-body')

  function addCodeSection (type, title) {
    if (selection.has(type)) {
      var subEntity = selection.select(type)
      var fake = quantum.select({
        content: [{
          type: 'codeblock',
          params: [type],
          content: subEntity.content
        }]
      })

      codeBody = codeBody
        .add(dom.create('div').text(title))
        .add(fake.transform(transforms))
    }
  }

  addCodeSection('html', 'HTML')
  addCodeSection('js', 'JavaScript')
  addCodeSection('coffee', 'CoffeeScript')
  addCodeSection('css', 'CSS')
  addCodeSection('json', 'JSON')

  var code = dom.create('div').class('docs-example-code docs-collapsible')
    .add(dom.create('div').class('docs-collapsible-heading')
      .text(blackChevron, true)
      .add(dom.create('span').text('Code')))
    .add(dom.create('div').class('docs-collapsible-content')
      .add(dom.create('div').class('docs-example-code-container')
        .add(codeBody)
    )
  )

  return dom.create('div').class('docs-example')
    .add(body)
    .add(code)
}
