select = require('modules/selection/main')
utils = require('modules/util/main/utils')

div = (clasz) -> select.detached('div').class(clasz)
span = (clasz) -> select.detached('span').class(clasz)

#XXX: use the palette context functions instead
classContext = (selection, context) -> if context then selection.classed('hx-' + context, true) else selection
textContext = (selection, context) -> if context then selection.classed('hx-text-' + context, true) else selection
backgroundContext = (selection, context) -> if context then selection.classed('hx-background-' + context, true) else selection

# core card layout (card + sections + horizontal groups)
card = -> div('hx-card')
card.small = -> div('hx-card-small hx-card')

sizes = [undefined, 'small', 'normal']
fixes = [undefined, 'fixed']
joints = [undefined, 'joint']
directions = [undefined, 'vertical']
headers = [undefined, 'header']

sizes.forEach (size) ->
  fixes.forEach (fixed) ->
    joints.forEach (joint) ->
      directions.forEach (direction) ->
        headers.forEach (header) ->
          types = [size, fixed, joint, direction, header].filter(utils.defined)
          base = card
          types.forEach (type) ->
            base[type] ?= {}
            base = base[type]

getComponentParent = (identifierParts) ->
  base = card
  identifierParts.forEach (type) ->
    base[type] ?= {}
    base = base[type]
  base

defineComponent = (identifier, setup) ->
  identifierParts = identifier.split('.')
  name = identifierParts.pop()
  parent = getComponentParent(identifierParts)

  parent[name] = (options) ->
    selection = div(identifier.split('.').map((d) -> 'hx-card-' + d).join(' '))
      .api({
        context: (context) -> backgroundContext(selection, context)
      })
    backgroundContext(selection, options?.context)

    setup?(selection, options)
    selection

# sections and groups
defineComponent 'section'
defineComponent 'group'
defineComponent 'vertical.group'
defineComponent 'header.section'
defineComponent 'header.group'
defineComponent 'vertical.header.group'

defineComponent 'joint.section'
defineComponent 'joint.group'
defineComponent 'joint.vertical.group'
defineComponent 'joint.header.section'
defineComponent 'joint.header.group'
defineComponent 'joint.vertical.header.group'

defineComponent 'fixed.section'
defineComponent 'fixed.group'
defineComponent 'fixed.vertical.group'
defineComponent 'fixed.header.section'
defineComponent 'fixed.header.group'
defineComponent 'fixed.vertical.header.group'
defineComponent 'fixed.joint.section'
defineComponent 'fixed.joint.group'
defineComponent 'fixed.joint.vertical.group'
defineComponent 'fixed.joint.header.section'
defineComponent 'fixed.joint.header.group'
defineComponent 'fixed.joint.vertical.header.group'

for size in ['small', 'normal', 'slim']
  defineComponent size + '.section'
  defineComponent size + '.group'
  defineComponent size + '.vertical.group'
  defineComponent size + '.header.section'
  defineComponent size + '.header.group'
  defineComponent size + '.vertical.header.group'
  defineComponent size + '.joint.section'
  defineComponent size + '.joint.group'
  defineComponent size + '.joint.vertical.group'
  defineComponent size + '.joint.header.section'
  defineComponent size + '.joint.header.group'
  defineComponent size + '.joint.vertical.header.group'
  defineComponent size + '.fixed.section'
  defineComponent size + '.fixed.group'
  defineComponent size + '.fixed.vertical.group'
  defineComponent size + '.fixed.header.section'
  defineComponent size + '.fixed.header.group'
  defineComponent size + '.fixed.vertical.header.group'
  defineComponent size + '.fixed.joint.section'
  defineComponent size + '.fixed.joint.group'
  defineComponent size + '.fixed.joint.vertical.group'
  defineComponent size + '.fixed.joint.header.section'
  defineComponent size + '.fixed.joint.header.group'
  defineComponent size + '.fixed.joint.vertical.header.group'

card.aligned = -> select.detached('div').class('hx-card-aligned')

### building blocks ###

card.large = {}

textLikeComponent = (elementType, clasz) ->
  (options) ->
    context = options?.context

    selection = select.detached(elementType)
      .class(clasz)
      .text(options.text)
      .api({
        text: (text) ->
          if arguments.length > 0
            selection.text(text)
            this
          else selection.text()
        context: (c) ->
          if arguments.length > 0
            context = c
            textContext(selection, context)
            this
          else context
      })

    textContext(selection, context)

    return selection

card.text = textLikeComponent('span', 'hx-card-text')
card.small.text = (options) -> card.text(options).classed('hx-card-small', true)
card.large.text = (options) -> card.text(options).classed('hx-card-large', true)

card.title = textLikeComponent('span', 'hx-card-title hx-header')
card.small.title = (options) -> card.title(options).classed('hx-card-small', true)
card.large.title = (options) -> card.title(options).classed('hx-card-large', true)

card.icon = (options) ->
  selection = select.detached('i')
    .class('hx-card-icon ' + (options.icon or ''))
    .api({
      icon: (icon) ->
        selection.class('hx-card-icon ' + (icon or ''))
        this
      context: (context) ->
        textContext(selection, context)
        this
    })

  textContext(selection, options?.context)

  return selection
  
card.small.icon = (options) -> card.icon(options).classed('hx-card-small', true)
card.large.icon = (options) -> card.icon(options).classed('hx-card-large', true)

### sections ###

card.action = { icon: {}}
card.icon.action = {}

card.action.section = (options) ->
  card.section(options).add(
    select.detached('a')
      .attr('href', options.link)
      .class('hx-card-action')
      .add(card.text(options)))

card.action.icon.section = (options) ->
  card.section(options).add(
    select.detached('a')
      .attr('href', options.link)
      .class('hx-card-action')
      .add(card.text(options))
      .add(card.icon(options)))

card.icon.action.section = (options) ->
  card.section(options).add(
    select.detached('a')
      .attr('href', options.link)
      .class('hx-card-action')
      .add(card.icon(options))
      .add(card.text(options)))

# Complete cards

card.notice = (options = {}) ->
  card().classed('hx-card-small', true)
    .add(card.header.section({sectionContext: options.context or 'info'})
      .add(card.title({titleText: options.title or 'Note'})))
    .add(card.section().add(card.text({text: options.message})))


module.exports = card
module.exports.hx = {
  card
}
