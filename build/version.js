/*
     ____                    __                      _
    / __ \__  ______ _____  / /___  ______ ___      (_)____
   / / / / / / / __ `/ __ \/ __/ / / / __ `__ \    / / ___/
  / /_/ / /_/ / /_/ / / / / /_/ /_/ / / / / / /   / (__  )
  \___\_\__,_/\__,_/_/ /_/\__/\__,_/_/ /_/ /_(_)_/ /____/
                                              /___/

  Version
  =======

  Merges content from different @version entities together.

*/

var quantum = require('./quantum') // needed for its selection api
var path = require('path') // required for the default filename renamer
var merge = require('merge')
var chalk = require('chalk')

function getEntityType (type) {
  return type ? type.replace('?', '') : undefined
}

// NOTE: this function may mutate content1 - pass in a cloned copy if you don't want to mutate the original
function mergeContent (content1, content2, options, version) {
  // it isn't possible to reliably merge text - so we just return the new content, and
  // ignore the previous content if that is the case
  if (content2.some(function (e) { return typeof (e) === 'string' && e !== '' })) {
    return content2
  } else { // otherwise, we perform the per entity merging
    var c1Map = {}

    content1.forEach(function (e1) {
      c1Map[options.entityMatchLookup(e1)] = e1
    })

    content2.forEach(function (e2) {
      var e1 = c1Map[options.entityMatchLookup(e2)]
      var e1s = quantum.select(e1)
      var e2s = quantum.select(e2)

      var entityType = getEntityType(e2.type)
      var isTaggable = (options.taggable.indexOf(entityType) > -1)

      if (!!e1) {
        if (e1.content && e2.content) {
          if (options.unmergeable.indexOf(entityType) > -1) {
            e1s.replaceContent(e2.content)
          } else {
            e1s.replaceContent(mergeContent(e1.content, e2.content, options, version))
          }

          // var e1sCanBeUpdated = !e1s.has('removed') && !e1s.has('deprecated')
          // var e2sCanBeUpdated = !e2s.has('removed') && !e2s.has('deprecated')

          // const existingVersions = e1s.selectAll('updated').map(({params:[v]}) => v)

          // if (isTaggable && e1sCanBeUpdated && e2sCanBeUpdated) {
          //   if (existingVersions.indexOf(version) === -1) {
          //     e1.content.unshift({ type: 'updated', params: [version], content: [] })
          //   }
          // }
        }
      } else {
        if (isTaggable) {
          const hasAdded = e2.content.some(({type}) => type === 'added')

          if (!hasAdded) {
            e2.content.unshift({ type: 'added', params: [version], content: [] })
          }
        }
        content1.push(e2)
      }
    })

    return content1
  }
}

// function getRemovableTags (tags) {
//   return Object.keys(tags).filter(function (tag) {
//     return !tags[tag].retain
//   })
// }

// filters versions for added, updated and removed flags
// added, updated: removes flags from item, leaves item in content
// removed: removes item from content
// function removeTags (entity, tags) {
//   if (Array.isArray(entity.content)) {
//     function tagFilter (e) {
//       var entityIsRemoved = quantum.select(e).has('removed')
//       var removeTag = tags.indexOf(e.type) > -1
//       return !entityIsRemoved && !removeTag
//     }
//     entity.content = entity.content.filter(tagFilter)
//     entity.content.forEach(function (e) {removeTags(e, tags)})
//   }
//   return entity
// }

// adds the versions to the @versionList entity. mutates the input
// function populateVersionList (entity, versions, currentVersion) {
//   if (entity.type === 'versionList') {
//     entity.content.push({type: 'current', params: [currentVersion], content: []})
//     versions.forEach(function (v) {
//       entity.content.push({type: 'version', params: [v], content: []})
//     })
//   } else if (Array.isArray(entity.content)) {
//     entity.content.forEach(function (e) {
//       populateVersionList(e, versions, currentVersion)
//     })
//   }
//   return entity
// }

// de-version the source (remove all @version entities)
// this removes the @version entities recursively
function removeVersions (entity) {
  if (Array.isArray(entity.content) && entity.type !== 'versionList') {
    entity.content = entity.content.filter(function (e) { return e.type !== 'version' })
    entity.content.forEach(removeVersions)
  }
}

function defaultEntityMatchLookup (entity) {
  entity = quantum.select(entity)
  var name = entity.ps()
  var params = entity.selectAll(['arg', 'arg?']).map(function (arg) {return arg.ps()})
  return entity.type + ': ' + name + '(' + params.join(', ') + ')'
}

function endsWith (string, searchString) {
  var position = string.length - searchString.length
  var i = string.indexOf(searchString, position)
  return i !== -1 && i === position
}

function defaultFilenameModifier (filename, version) {
  if (endsWith(filename, 'index.um')) {
    return filename.replace('index.um', version) + '/' + 'index.um'
  } else {
    return filename.replace('.um', '') + '/' + version + '.um'
  }
}

const notAllowedDescription = [
  'description',
  'code',
  'codeblock',
  'p',
  'link',
  'default',
  'js',
  'html',
  'example',
  'extra',
  'examples',
  'section',
  'topic',
  'seeAlso',
]

function entityFilter (maybeStringOrEntity) {
  if (typeof maybeStringOrEntity === 'string' || notAllowedDescription.indexOf(maybeStringOrEntity.type) > -1) {
    return
  }
  return maybeStringOrEntity
}

function contentFilter (maybeStringOrEntity) {
  if (typeof maybeStringOrEntity === 'string' || notAllowedDescription.indexOf(maybeStringOrEntity.type) > -1) {
    return maybeStringOrEntity
  }
}

function sortByVersion (versions) {
  return (a, b) => versions.indexOf(a.params[0]) < versions.indexOf(b.params[0])
}

function moveIssues (tagEntity) {
  const issues = tagEntity.content.filter(({type}) => type === 'issue')
  const notIssues = tagEntity.content.filter(({type}) => type !== 'issue')

  tagEntity.content = [
    ...issues,
    ...notIssues
  ]
  return tagEntity
}

function fixTags (entity, tags, versions) {
  if (entity.content && entity.content.length) {
    const tagEntities = entity.content.filter(({type}) => tags.indexOf(type) > -1)
    const notTags = entity.content.filter(({type}) => tags.indexOf(type) === -1)

    const sortedTagEntities = tagEntities.sort(sortByVersion(versions))
      .map(moveIssues)

    entity.content = [
      ...sortedTagEntities,
      ...notTags.map((e) => fixTags(e, tags, versions))
    ]
  }

  return entity
}

function fixEvents (entity) {
  if (entity.content) {
    if (entity.type === 'prototype') {
      const onMethod = entity.content.filter((e) => e.type === 'method' && e.params[0] === 'on')[0]

      if (onMethod) {
        const events = onMethod.content.filter((e) => e.type === 'event')
        const fixedContent = entity.content.filter((e) => !(e.type === 'method' && e.params[0] === 'on'))
        entity.content = [
          ...fixedContent,
          ...events
        ]
      }
    } else {
      entity.content = entity.content.map(fixEvents)
    }
  }
  return entity
}

function fixType (entity) {
  if (entity.type === 'api' || (entity.type === 'returns' && entity.params.length)) {
    entity.params = [`[${entity.params.join(' ')}]`]
    // entity.params = ['[', ...entity.params, ']']
  }

  if (entity.type !== 'returns' && entity.content) {
    entity.content = entity.content.map(fixType)
  }

  return entity
}

function fixDescription (entity) {
  if (notAllowedDescription.indexOf(entity.type) > -1) {
    return entity
  }

  const entitySel = quantum.select(entity)
  if (entity.content && entity.content.length) {
    entity.content = entity.content.map(fixDescription)
  }

  const nonStrings = entitySel.clone().filter(entityFilter).content || []

  var descEntity
  if (entitySel.has('description')) {
    descEntity = entitySel.select('description')
  } else {
    const strings = (entitySel.clone().filter(contentFilter).content || []).filter(x => x)
    if (strings.length) {
      descEntity = {
        type: 'description',
        params: [],
        content: [...strings, '>>', '']
      }
    }
  }

  if (descEntity) {
    entity.content = [
      descEntity,
      ...nonStrings
    ]
  }

  return entity
}

function replaceTags (entity, tags, version) {
  const tagStrings = Object.keys(tags)
  const foundTags = quantum.select(entity).selectAll(tagStrings, { recursive: true })
  if (foundTags.length) {
    entity.content = entity.content.map((maybeTag) => {
      // is a tag
      if (tagStrings.indexOf(maybeTag.type) > -1) {
        maybeTag.params = [version]
      // is not a tag
      } else if (maybeTag.content && maybeTag.content.length) {
        maybeTag = replaceTags(maybeTag, tags, version)
      }
      return maybeTag
    })
  }
  return entity
}

function versionTransform (obj, options) {
  var content = quantum.select(obj.content)
  var fullVersionList = options.versions || []

  if (content.has('versionList', {recursive: true})) {
    var inputList = content.selectAll('versionList', {recursive: true}).filter(function (versionList) {
      return versionList.selectAll('version').length > 0
    })[0]

    if (inputList) {
      var inputVersionList = inputList.selectAll('version').map(function (v) {
        return v.ps()
      })
      if (inputVersionList.length > 0) {
        fullVersionList = inputVersionList
      }

      // remove the list of versions - they will be repopulated by the populateVersionList function
      inputList.original.content = []
    }

  }

  var targetVersions = options.targetVersions || fullVersionList
  var actualVersions = content.selectAll('version', {recursive: true})

  // Check if there are actual versions in the object, if there arent then no versioning is required.
  if (actualVersions.length > 0) {
    if (fullVersionList.length === 0) {
      console.error(
        chalk.yellow('\n\nquantum-version Warning: processing content with no version list defined\n') +
        '  A file was processed and @version entities found but no @versionList was\n' +
        '  found and options.versions was not defined.\n' +
        '  Please define a ' + chalk.yellow('@versionList') + ' or pass in ' + chalk.yellow('options.versions') + '\n'
      )
    }

    const merged = { filename: 'index.um', content: [], params: [], type: 'file' }
    var versionsMap = {}
    actualVersions.forEach(function (version) {
      versionsMap[version.ps()] = version
    })

    fullVersionList.forEach((v) => {
      const versionSel = versionsMap[v]
      if (versionSel) {
        replaceTags(versionSel, options.tags, v)
        merged.content = mergeContent(quantum.select(merged).clone().content, versionSel.content, options, v)
      }
    })

    removeVersions(merged)
    return [
      fixType(
        fixEvents(
          fixTags(
            fixDescription(merged),
            Object.keys(options.tags),
            targetVersions
          )
        )
      )
    ]

    // var base = undefined
    // var results = []

    // var removableTags = getRemovableTags(options.tags)

    // fullVersionList.forEach(function (v) {
    //   var version = versionsMap[v]

    //   if (version !== undefined) {
    //     if (base === undefined) {
    //       base = {content: version.content}
    //     } else {
          // base = {content: mergeContent(removeTags(quantum.select(base).clone(), removableTags).content, version.content, options)}
    //     }
    //   } else {
    //     base = removeTags(quantum.select(base).clone(), removableTags)
    //   }

    //   // replace the versioned parts for the @version entities
    //   var source = {content: content.clone().content}

    //   // insert the versioned content just before the first version entity
    //   // this searches recursively until it finds the right one
    //   function insertVersionedContent (entity) {
    //     if (Array.isArray(entity.content)) {
    //       var index = -1
    //       entity.content.forEach(function (v, i) {
    //         if (v.type === 'version' && v.params && v.params[0] === actualVersions[0].params[0]) {
    //           index = i
    //         }
    //       })

    //       if (index > -1) {
    //         // this bit actually inserts the content
    //         entity.content.splice.apply(entity.content, [index, 0].concat(base.content))
    //       } else {
    //         entity.content.forEach(insertVersionedContent)
    //       }
    //     }
    //   }

    //   if (base !== undefined) {
    //     insertVersionedContent(source)
    //   }

    //   populateVersionList(source, fullVersionList, v)
    //   removeVersions(source)

    //   // XXX [OPTIMISATION]: this can be done with fewer clones when versions are missing from the targetVersions list
    //   // build the new result with new filename and add the result to the results list
    //   if (targetVersions.indexOf(v) > -1) {
    //     results.push({
    //       filename: options.filenameModifier(obj.filename, v),
    //       content: source,
    //       version: v
    //     })

    //     // optionally output the latest version without the filename modification
    //     if (options.outputLatest && v === fullVersionList[fullVersionList.length - 1]) {
    //       results.push({
    //         filename: obj.filename,
    //         content: quantum.select(source).clone(),
    //         version: v
    //       })
    //     }
    //   }

    // })

    // return results
  } else {
    // return an array for consistent return type - without this
    // the user would have to check if the return type is an array
    // which wouldn't be nice to use
    return [obj]
  }
}

// returns a function that expands a quantum ast containing `version`
// entities into multiple ast's - one for each version
module.exports = function (opts) {
  var options = merge.recursive({
    versions: undefined,
    targetVersions: undefined, // Target array of versions
    entityMatchLookup: defaultEntityMatchLookup,
    filenameModifier: defaultFilenameModifier,
    outputLatest: true,
    taggable: [ // Elements that can be tagged and should be indexed
      'function',
      'prototype',
      'method',
      'property',
      'object',
      'constructor',
      'returns',
      'event',
      'data',
      'class',
      'extraclass',
      'childclass',
      'entity'
    ],
    indexable: [ // Elements that can't be tagged but should be indexed
      'arg',
      'group'
    ],
    unmergeable: [], // Elements that can not be merged (e.g. descriptions)
    tags: {
      added: {
        retain: true, // Whether to retain the tag across versions
        removeEntity: false // Whether to remove the tagged entity in the next version
      },
      updated: {
        retain: true,
        removeEntity: false
      },
      deprecated: {
        retain: true,
        removeEntity: false
      },
      removed: {
        retain: true,
        removeEntity: false
      }
    }
  }, opts)

  return function (obj) {
    return versionTransform(obj, options)
  }
}
