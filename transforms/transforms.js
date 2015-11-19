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

  return page.create('div').class('docs-module')
    .add(page.create('h1').class('docs-module-section').text(moduleTitle)
      .add(page.create('div').class('docs-module-changelog-link')
        .add(page.create('a').text('Changelog').attr('href', '/docs/' + module + '/changelog/'))))
    .add(entity.select('description').transform(transforms))
    .add(page.create('h1').class('docs-module-section').text('Examples'))
    .add(entity.filter('examples').transform(transforms))
    .add(page.create('h1').class('docs-module-section').text('Api'))
    .add(entity.filter('api').transform(transforms))
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
