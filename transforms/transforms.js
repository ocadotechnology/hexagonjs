const quantum = require('quantum-js')
const html = require('quantum-html')
const dom = require('quantum-dom')

// XXX: tidy this up

// exports.section = function (selection, transforms) {
//   return dom.create('div').class('docs-section')
//     .add(dom.create('h2').text(selection.ps()))
//     .add(dom.create('div').class('docs-section-content')
//       .add(selection.transform(transforms)))
// }

exports.card = function (selection, transforms) {
  return dom.create('div').class('docs-card')
    .add(selection.transform(transforms))
}

exports.module = function (selection, transforms) {
  const module = selection.ps().toLowerCase().split(' ').join('-')
  const moduleTitle = selection.ps()

  let moduleContainer = dom.create('div').class('docs-module')
    .add(dom.create('h1').class('docs-module-section').text(moduleTitle)
      .add(dom.create('div').class('docs-module-changelog-link')
        .add(dom.create('a').text('Changelog').attr('href', '/docs/' + module + '/changelog/'))))

  if (selection.hasContent()) {
    if (selection.has('description')) {
      moduleContainer = moduleContainer.add(html.paragraphTransform(selection.select('description'), transforms))
    } else {
      moduleContainer = moduleContainer.add('This module does not have a description.')
    }

    if (selection.has('examples')) {
      var exampleContent = selection.filter('examples')
      if (exampleContent.content().length) {
        moduleContainer = moduleContainer.add(dom.create('h1').class('docs-module-section').text('Examples'))
          .add(exampleContent.transform(transforms))
      }
    }

    if (selection.has('api')) {
      var apiContent = selection.filter('api')
      if (apiContent.content().length) {
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

exports.example = function (selection, transforms) {
  const body = dom.create('div').class('docs-example-body')
    .add(selection.transform(transforms))

  function codeSection (type, title) {
    if (selection.has(type)) {
      return dom.create('div').class('example-code-section')
        .add(dom.create('h3').text(title))
        .add(transforms(quantum.select({
          type: 'codeblock',
          params: [type],
          content: selection.select(type).content()
        })))
    }
  }

  const code = dom.create('div').class('docs-example-code-body')
    .add(codeSection('html', 'HTML'))
    .add(codeSection('js', 'JavaScript'))
    .add(codeSection('coffee', 'CoffeeScript'))
    .add(codeSection('css', 'CSS'))
    .add(codeSection('json', 'JSON'))

  return dom.create('div').class('docs-example')
    .add(body)
    .add(code)
}
