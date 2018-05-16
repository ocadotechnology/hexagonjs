const quantum = require('quantum-core')
const version = require('quantum-version')
const template = require('quantum-template')
const flatten = require('flatten')
const path = require('path')

const fileOptions = require('quantum-core/lib/file-options')
const {defaultLoader} = require('quantum-core/lib/read')

const fs = require('fs-extra')
const Bluebird = require('bluebird')
const outputFileAsync = Bluebird.promisify(fs.outputFile)

const latestVersion = require('./package.json').devDependencies['hexagon-js']

function cachedTransforms (trans) {
  const store = {}

  function cached (transform) {
    return (selection, transforms) => {
      const h = JSON.stringify(selection.entity())
      if (!(h in store)) {
        store[h] = transform(selection, transforms)
      }
      return store[h]
    }
  }

  function processObj (obj) {
    const res = {}
    Object.keys(obj).forEach(k => {
      if (typeof obj[k] === 'function') {
        res[k] = cached(obj[k])
      } else {
        res[k] = processObj(obj[k])
      }
    })
    return res
  }

  return processObj(trans)
}

function customizedTemplate (file) {
  if (file.meta.version === latestVersion) {
    const templateOptions = {
      variables: {
        version: file.meta.version,
        latestVersion: latestVersion
      }
    }

    return template.fileTransform(templateOptions)(file)
  } else {
    return []
  }
}

const versionTemplate = `
@versionedPage
  @version 0.9.0
  @version 0.10.0
  @version 0.11.0
  @version 0.12.0
  @version 0.12.1
  @version 0.12.2
  @version 0.12.3
  @version 0.12.4
  @version 0.12.5
  @version 0.12.6
  @version 0.12.7
  @version 0.12.8
  @version 0.12.9
  @version 0.12.10
  @version 0.13.0
  @version 0.14.0
  @version 0.14.1
  @version 0.15.0
  @version 0.15.1
  @version 0.15.2
  @version 0.15.3
  @version 1.0.0
  @version 1.0.4
  @version 1.1.0
  @version 1.2.0
  @version 1.2.1
  @version 1.3.0
  @version 1.3.1
  @version 1.3.2
  @version 1.3.3
  @version 1.4.0
  @version 1.4.1
  @version 1.4.2
  @version 1.5.0
  @version 1.5.1
  @version 1.6.0
  @version 1.7.0
  @version 1.8.0
  @version 1.8.1
  @version 1.8.2
  @version 1.9.0
  @version 1.10.0
  @version 1.11.0
  @version 1.12.0
  @version 1.13.0
  @version 1.14.0
  @version 1.15.0
`

const tsTypes = {
  String: 'string',
  Boolean: 'boolean',
  Any: 'any',
  Number: 'number',
  Object: '{}',
  InnerFunctionToStopInfiniteLoop: 'Function'
}

function tsMap (quantumType) {
  return tsTypes[quantumType] || quantumType
}

function preVersion (file) {
  const versionEntity = quantum.parse(versionTemplate)
  file.content.content.splice(0, 0, versionEntity)
  return file
}

function makeObject (entity, _, isRoot, nested, union, inNamespace, _, optionsProps) {
  const name = isRoot && !optionsProps
    ? entity.ps()
    : ''

  const interfaceName = name
    ? `interface ${name} `
    : ''

  const props = entity.selectAll(['property', 'property?']).map(s => `${isRoot && inNamespace && !interfaceName ? 'const ' : ''}${makeNamedType(s, false, false, false, optionsProps)}`)
  const funcs = entity.selectAll(['function']).map(s => makeFunction(s, false, true))

  if (name.indexOf('.') > -1) {
    return namespace(entity, name, makeObject)
  } else {
    const allProps = [...props, ...funcs]
    const str = allProps.join(isRoot ? ';\n' : ', ')

    return `${interfaceName}${str
      ? inNamespace && !interfaceName
        ? str
        : `{ ${str} }`
      : '{}'}`
  }
}

const bracketMatchRegex = /([^\[\n]*)\[(.*?(?=]))](.*)/g
const whitespaceSlash = / ?\/ ?/g
const excessSemicolons = /;:/g

function makeTypeString (entity, t, insideFunction) {
  if (!t) {
    return 'MISSING_TYPE_ERROR'
  }

  if (t.indexOf('[') > -1) {
    return t.replace(bracketMatchRegex, (m, p1, p2, p3) => {
      const startStr = p1 && p1.indexOf('/') === 0
        ? p1.slice(1)
        : p1

      const midStr = p2 && p2.indexOf('[') > -1 && p2.indexOf(']') === -1
        ? `${p2}]`
        : p2

      const endStr = p3 && p3 !== ']' && p3 !== ']]' && p3 !== ']]]'
        ? `/${p3}`
        : ''

      const start = makeTypeString(undefined, startStr)
      const middle = makeTypeString(undefined, midStr)
      const end = endStr && makeTypeString(undefined, endStr)
      return `${start}<${middle}>${end}`
    })
  }
  return t.replace(whitespaceSlash, '/').split('/').map((type) => {
    if (entity) {
      switch (type) {
        case 'Object':
          return makeObject(entity)
        case 'Function':
          return makeFunction(entity, true, false, true, t.indexOf('/') > -1 || insideFunction)
        default:
          return tsMap(type)
      }
    } else {
      return tsMap(type)
    }
  }).join(' | ')
}

function makeNamedType (entity, force, insideFunction, classProp, forcedOptional) {
  const t = entity.type()

  const optional = t.indexOf('?') > -1 || forcedOptional
    ? '?'
    : ''
  const [name, outerType] = entity.params()

  const type = name.indexOf('...') > -1 && outerType.indexOf('Array') === -1
    ? `Array[${outerType.replace('...', '')}]`
    : outerType

  const nameStr = name.indexOf('...') > -1
    ? `...${name.replace('...', '')}`
    : name

  const typeStr = force
    ? type
    : makeTypeString(entity, type, insideFunction)

  return `${nameStr === 'class' ? 'className' : nameStr}${optional}: ${typeStr}${classProp ? ';' : ''}`
}

function namespace (entityToUse, name, fn) {
  const entity = quantum.clone(entityToUse)
  const innerName = name.replace('hx.', '').split('.')
  const outerName = innerName.splice(0, 1)
  entity.params([innerName.join('.')])

  return `namespace ${outerName} {
${fn(entity, false, true, false, false, true)}
}
`
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeFunction (functionEntity, ignoreName, isRoot, nested, unionType) {
  const type = functionEntity.type()
  const name = functionEntity.params()[0]

  const hasOptionsInterface = name
    ? name.startsWith('hx') && globalOptionalInterfaces.filter(s => s.toLowerCase().indexOf(name.replace('hx.', '').toLowerCase() + 'options') > -1).length > 0
    : false

  const args = functionEntity.selectAll(['arg', 'arg?']).map(s => {
    if (s.params()[0] === 'options' && s.params()[1].toLowerCase().indexOf('options') === -1) {
      if (s.parent().parent().type() === 'prototype'){
        return `options?: ${s.parent().parent().params()[0].replace('hx.', '')}Options`
      }
      if (hasOptionsInterface) {
        return `options?: ${capitalize(name.replace('hx.', ''))}Options`
      }
    } else if (unionType) {
      return makeTypeString(s, s.params()[1], true)
    } else {
      return makeNamedType(s, false)
    }
  })
  const returns = functionEntity.has('returns')
    ? makeTypeString(undefined, functionEntity.select('returns').ps())
    : nested
      ? makeTypeString(undefined, 'Any')
      : ''


  if (args.length === 0 && !returns) {
    return makeTypeString(undefined, 'InnerFunctionToStopInfiniteLoop')
  }
  if (name && name.replace('hx.', '').indexOf('.') > -1) {
    return namespace(functionEntity, name, makeFunction)
  }
  const screenName = ignoreName
    ? ''
    : (name || type).replace('hx.', '')
  return `${isRoot ? 'function ' : ''}${screenName}(${args.join(', ')})${returns ? `${nested ? ' =>' : ':'} ${returns}` : ''}${!nested ? ';' : ''}`

}

function stringifyArray (arr) {
  return arr.length
    ? `${arr.sort().filter(x => x.replace(/\w/g, '')).join(`\n  `)}\n`
    : ''
}

const replaceWhitespaceOnlyLines = /^\s+$/g

const globalOptionalInterfaces = []

function makeClass (prototypeEntity) {
  const title = prototypeEntity.ps()
  const constructorEntities = prototypeEntity.selectAll('constructor')

  const optionsInterfaces = flatten(constructorEntities.map(s => s.selectAll(['arg', 'arg?'])
    .filter(s => s.params()[0] === 'options')
    .map(s => makeObject(s, false, true, false, false, false, false, true)))).filter(x => x && x.replace(replaceWhitespaceOnlyLines, ''))

  const constructors = constructorEntities.map(s => makeFunction(s))
  const props = prototypeEntity.selectAll(['property', 'property?']).map(s => makeNamedType(s, false, false, true))
  const methods = prototypeEntity.selectAll('method').map(s => makeFunction(s))

  const niceTitle = title.replace('hx.', '')

  const opts = optionsInterfaces.length
    ? `interface ${niceTitle}Options ${optionsInterfaces.join('\n')}\n`
    : ''

  globalOptionalInterfaces.push(opts)

  return `class ${niceTitle} {
  ${stringifyArray(props)}
  ${stringifyArray(constructors)}
  ${stringifyArray(methods)}
}
`
}

function convertSectionToTypes (apiSection, type, fn) {
  const classes = apiSection.selectAll(type)
  const otherClasses = classes.filter(s => !s.ps().startsWith('hx.')).map(s => fn(s, false, true))
  const hxClasses = classes.filter(s => s.ps().startsWith('hx.')).map(s => fn(s, false, true))

  const namespacedHxClasses = hxClasses.length
    ? `
START_NAMESPACE

${hxClasses.join('\n')}

END_NAMESPACE
`   : ''

  return [
    namespacedHxClasses,
    otherClasses.join('\n')
  ].join('\n')
}

function toTypescript (file) {
  try {
    if (file.info.dest.indexOf(latestVersion) > -1) {
      return []
    } else {
      const apiSection = quantum.select(file.content.content[1])

      const classes = convertSectionToTypes(apiSection, 'prototype', makeClass)
      const functions = convertSectionToTypes(apiSection, 'function', makeFunction)
      const objects = convertSectionToTypes(apiSection, 'object', makeObject)
      file.info.dest = file.info.dest.replace('/api.um', '.d.ts')
      file.content = [classes, functions, objects].join('\n')
      console.log('Success parsing:', file.info.dest)
      return file
    }
  } catch (e) {
    console.error('Error parsing:  ', file.info.dest)
    console.error(e)
    return []
  }
}

function buildPage (sourceFile, pipeline) {
  const start = Date.now()
  return Bluebird.resolve(pipeline(sourceFile))
    .then(files => Array.isArray(files) ? files : [files])
    .then(files => Array.from(new Map(files.map(f => [f.info.dest, f])).values()))
    .map(file => file.content)
    .catch((err) => console.error(err))
}

function createPipeline (entityTransforms) {
  return (file) => {
    let result = Bluebird.resolve([file])
    entityTransforms.forEach(transform => {
      result = result.then(files => {
        return Bluebird.all(files.map(transform)).then(flatten)
      })
    })
    return result
  }
}

function groupNamespacedContent (content) {
  let namespaced = ''
  let tmp = ''
  let inside = false
  let gl = ''
  const split = content.split('\n')
  for (const line of split) {
    if (line === 'START_NAMESPACE') {
      inside = true
    } else if (line === 'END_NAMESPACE') {
      namespaced += tmp
      tmp = ''
      inside = false
    } else if (inside === true) {
      tmp += `\n${line}`
    } else {
      gl += `\n${line}`
    }
  }
  return `
declare namespace hx {
${namespaced}
}
${globalOptionalInterfaces.filter(x => x).join('\n')}
${gl}
`
}

function buildSpecs (startTime, specs, config, options, pipeline) {
  const fileReader = quantum.readAsFile
  const loader = defaultLoader

  let builtCount = 0

  return fileOptions.resolve(specs, options).map((fileInfo) => {
    return fileReader(fileInfo, { loader, resolveRoot: options.resolveRoot })
      .then(file => buildPage(file, pipeline))
      .catch((err) => {
        console.log(err)
      })
  }, {concurrency: options.concurrency})
  .then(allFileContent => {
    const whitespace = /^\s*$/g
    const tidyContent = groupNamespacedContent(flatten(allFileContent).join('\n'))
      .split('\n').filter(x => x.replace(whitespace, '')).join('\n')
      .replace(excessSemicolons, '')
      .replace(/Array /g, 'Array<any> ')
      .replace(/;;?/g, ';')
      .replace(/\(\) \=\> any/g, 'Function')

    const content = `
export = hx;
export as namespace hx;

${tidyContent}
`

    return outputFileAsync(`${options.dest}/hexagon.d.ts`, content)
  })
}

function build (config) {
  const options = {
    concurrency: config.concurrency || 1,
    dest: config.dest,
    resolveRoot: path.resolve(config.resolveRoot || process.cwd())
  }
  const pipeline = createPipeline(config.pipeline)
  const startTime = Date.now()
  return buildSpecs(startTime, config.pages, config, options, pipeline)
}

build({
  port: 9000,
  pipeline: [
    preVersion,
    version.fileTransform(),
    customizedTemplate,
    toTypescript
  ],
  resolveRoot: 'content',
  dest: 'typescript',
  pages: [
    {
      // files: 'content/docs/autocomplete-picker/api.um',
      files: 'content/docs/**/api.um',
      base: 'content/docs',
      watch: true
    }
  ]
})
