var quantum = require('quantum-js')

exports.section = function (entity, page, transforms) {
  return page.create('div').class('docs-section')
    .add(page.create('h2').text(entity.ps()))
    .add(entity.transform(transforms))
}

exports.card = function (entity, page, transforms) {
  return page.create('div').class('docs-card')
    .add(entity.transform(transforms))
}

// exports.example = function(entity, page, transforms) {
//   return page.create('div').class('docs-example')
//     .add(entity.transform(transforms))
// }

exports.module = function (entity, page, transforms) {
  var module = entity.ps().toLowerCase().split(' ').join('-')

  var moduleTitle = entity.ps()

  var moduleContainer = page.create('div').class('docs-module')
    .add(page.create('h1').class('docs-module-section').text(moduleTitle)
      .add(page.create('div').class('docs-module-changelog-link')
        .add(page.create('a').text('Changelog').attr('href', '/docs/' + module + '/changelog/'))))
    .add(entity.select('description').transform(transforms))

  if (entity.has('examples')) {
    var exampleContent = entity.filter('examples')
    if (exampleContent.content[0].content.length) {
      moduleContainer = moduleContainer.add(page.create('h1').class('docs-module-section').text('Examples'))
        .add(exampleContent.transform(transforms))
    }
  }

  if (entity.has('api')) {
    var apiContent = entity.filter('api')
    if (apiContent.content[0].content.length) {
      moduleContainer = moduleContainer.add(page.create('h1').class('docs-module-section').text('Api'))
        .add(apiContent.transform(transforms))
    }
  }

  return moduleContainer
}

exports.examples = function (entity, page, transforms) {
  return page.create('div').class('docs-examples')
    .add(entity.transform(transforms))
}

exports.list = function (entity, page, transforms) {
  var ordered = entity.ps() === 'ordered'
  return page.create(ordered ? 'ol' : 'ul').class(ordered ? 'docs-list' : 'docs-list fa-ul')
    .add(Promise.all(entity.selectAll('item').map(function (e) {
      return page.create('li')
        .add(ordered ? undefined : page.create('i').class('fa fa-li ' + (e.ps() || 'docs-list-bullet fa-circle')))
        .add(e.transform(transforms))
    })))
}

var blackChevron = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="14" viewBox="0 0 10 14"><path fill="#444444" d="M8.648 6.852l-5.797 5.797q-0.148 0.148-0.352 0.148t-0.352-0.148l-1.297-1.297q-0.148-0.148-0.148-0.352t0.148-0.352l4.148-4.148-4.148-4.148q-0.148-0.148-0.148-0.352t0.148-0.352l1.297-1.297q0.148-0.148 0.352-0.148t0.352 0.148l5.797 5.797q0.148 0.148 0.148 0.352t-0.148 0.352z"></path></svg>'

exports.example = function (entity, page, transforms) {
  var body = page.create('div').class('docs-example-body')
    .add(entity.transform(transforms))

  var codeBody = page.create('div').class('docs-example-code-body')

  function addCodeSection (type, title) {
    if (entity.has(type)) {
      var subEntity = entity.select(type)
      var fake = quantum.select({
        content: [{
          type: 'codeblock',
          params: [type],
          content: subEntity.content
        }]
      })

      codeBody = codeBody
        .add(page.create('div').text(title))
        .add(fake.transform(transforms))
    }
  }

  addCodeSection('html', 'HTML')
  addCodeSection('js', 'JavaScript')
  addCodeSection('coffee', 'CoffeeScript')
  addCodeSection('css', 'CSS')
  addCodeSection('json', 'JSON')

  var code = page.create('div').class('docs-example-code docs-collapsible')
    .add(page.create('div').class('docs-collapsible-heading')
      .text(blackChevron, true)
      .add(page.create('span').text('Code')))
    .add(page.create('div').class('docs-collapsible-content')
      .add(page.create('div').class('docs-example-code-container')
        .add(codeBody)
    )
  )

  return page.create('div').class('docs-example')
    .add(body)
    .add(code)
}
