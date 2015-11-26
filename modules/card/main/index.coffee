div = (clasz) -> hx.detached('div').class(clasz)
span = (clasz) -> hx.detached('span').class(clasz)

#XXX: use the palette context functions instead
classContext = (selection, context) -> if context then selection.classed('hx-' + context, true) else selection
textContext = (selection, context) -> if context then selection.classed('hx-text-' + context, true) else selection
backgroundContext = (selection, context) -> if context then selection.classed('hx-background-' + context, true) else selection

# core card layout (card + sections + horizontal groups)
hx.card = -> div('hx-card')
hx.card.small = -> div('hx-card-small hx-card')

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
          types = [size, fixed, joint, direction, header].filter(hx.defined)
          base = hx.card
          types.forEach (type) ->
            base[type] ?= {}
            base = base[type]

getComponentParent = (identifierParts) ->
  base = hx.card
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
    backgroundContext(selection, options?.context)

    hx.component.register(selection.node(), {
      context: (context) -> backgroundContext(selection, context)
    })

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

hx.card.aligned = -> hx.detached('div').class('hx-card-aligned')

### building blocks ###

hx.card.large = {}

textLikeComponent = (elementType, clasz) ->
  (options) ->
    selection = textContext(hx.detached(elementType).class(clasz).text(options.text), options?.context)
    context = options?.context
    hx.component.register(selection.node(), {
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
    selection

hx.card.text = textLikeComponent('span', 'hx-card-text')
hx.card.small.text = (options) -> hx.card.text(options).classed('hx-card-small', true)
hx.card.large.text = (options) -> hx.card.text(options).classed('hx-card-large', true)

hx.card.title = textLikeComponent('div', 'hx-card-title hx-header')
hx.card.small.title = (options) -> hx.card.title(options).classed('hx-card-small', true)
hx.card.large.title = (options) -> hx.card.title(options).classed('hx-card-large', true)

hx.card.icon = (options) ->
  selection = textContext(hx.detached('i').class('hx-card-icon ' + (options.icon or '')), options?.context)
  hx.component.register(selection.node(), {
    icon: (icon) ->
      selection.class('hx-card-icon ' + (icon or ''))
      this
    context: (context) ->
      textContext(selection, context)
      this
  })
  selection
hx.card.small.icon = (options) -> hx.card.icon(options).classed('hx-card-small', true)
hx.card.large.icon = (options) -> hx.card.icon(options).classed('hx-card-large', true)

### sections ###

hx.card.action = { icon: {}}
hx.card.icon.action = {}

hx.card.action.section = (options) ->
  hx.card.section(options).add(
    hx.detached('a')
      .attr('href', options.link)
      .class('hx-card-action')
      .add(hx.card.text(options)))

hx.card.action.icon.section = (options) ->
  hx.card.section(options).add(
    hx.detached('a')
      .attr('href', options.link)
      .class('hx-card-action')
      .add(hx.card.text(options))
      .add(hx.card.icon(options)))

hx.card.icon.action.section = (options) ->
  hx.card.section(options).add(
    hx.detached('a')
      .attr('href', options.link)
      .class('hx-card-action')
      .add(hx.card.icon(options))
      .add(hx.card.text(options)))

# Complete cards

hx.card.notice = (options = {}) ->
  hx.card().classed('hx-card-small', true)
    .add(hx.card.header.section({sectionContext: options.context or 'info'})
      .add(hx.card.title({titleText: options.title or 'Note'})))
    .add(hx.card.section().add(hx.card.text({text: options.message})))
