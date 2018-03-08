/*
     ____                    __                      _
    / __ \__  ______ _____  / /___  ______ ___      (_)____
   / / / / / / / __ `/ __ \/ __/ / / / __ `__ \    / / ___/
  / /_/ / /_/ / /_/ / / / / /_/ /_/ / / / / / /   / (__  )
  \___\_\__,_/\__,_/_/ /_/\__/\__,_/_/ /_/ /_(_)_/ /____/
                                              /___/

  Stringify
  =========

  Turns quantum ast back into quantum markup.

*/

var select = require('./select')
const invalidSamelineTypes = [
  'description',
  'default',
  'p',
  'codeblock',
  'html',
  'js',
  'css',
  'property',
  'param',
  'arg',
  'function',
  'method'
]

function entityToString (entity, indent, opts) {
  if (entity.type === 'theme') {
    return ''
  } else if (select.isEntity(entity)) {
    var selection = select(entity)
    var sameLineContent = invalidSamelineTypes.indexOf(selection.type) === -1
      && invalidSamelineTypes.indexOf(selection.type + '?') === -1
      && selection.entityContent().empty()
      && selection.textContent().content.length === 1

    var params = entity.params.length > 1
      ? entity.params[0] + ' [' + entity.params.slice(1).join(' ') + ']'
      : entity.params.length
        ? entity.params[0]
        : ''

    if (selection.type === 'p') {
      return entity.content.map((e) => entityToString(e, indent, opts)).join('\n\n') + '\n'
    } else if (sameLineContent) {
      return indent + '@' + entity.type + (params && ('(' + params + ')')) + '[' + (entity.content[0] || '') + ']'
    } else if (entity.content.length >= 1) {
      return indent + '@' + entity.type + ' ' + params + '\n' + entity.content.map(function (e) {
        return entityToString(e, indent + '  ', opts)
      }).join('\n') + '\n'
    } else {
      return indent + '@' + entity.type + ' ' + params
    }
  } else {
    return indent + entity
  }
}

const inlineLinks = /\n\s*\@(code|link)\((.*)\)\[(.*)\]\n\s*/g
const inlineCode = /\n\s*\@(code|link)\[(.*)\]\n\s*/g
const pTags = /\<p\>(.*)\<\/p\>/g
const codeblock = /\@\@?codeblock/g
const enhancement = /\@enhancement/g
const endDesc = /\s*\>\>/g
const whitespace = /\n\n\n/g

module.exports = function (parsed, opts, startIndent = '') {
  let string
  if (select.isEntity(parsed)) {
    string = entityToString(parsed, startIndent, opts)
  } else {
    string = parsed.map((x) => entityToString(x, startIndent, opts))
      .join('\n')
  }

  return string
    .replace(enhancement, '@updated')
    .replace(inlineLinks, '@$1($2)[$3] ')
    .replace(inlineCode, '@$1[$2] ')
    .replace(pTags, '$1\n')
    .replace(codeblock, '@@codeblock')
    .replace(endDesc, '')
    .replace(whitespace, '\n\n')
    .replace(whitespace, '\n\n')
    .replace(whitespace, '\n\n')
}
