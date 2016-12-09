
factory = (type, clasz) -> -> hx.detached(type).class(clasz)

hx.div = (cls) ->
  if cls then hx.detached('div').class(cls) else hx.detached('div')

hx.span = (cls) ->
  if cls then hx.detached('span').class(cls) else hx.detached('span')

hx.inputGroup = factory('div', 'hx-input-group')

hx.notice = factory('div', 'hx-notice')
hx.notice.head = factory('div', 'hx-notice-head')
hx.notice.body = factory('div', 'hx-notice-body')

hx.spinner = factory('span', 'hx-spinner')
hx.spinner.wide = factory('div', 'hx-spinner-wide')

hx.icon = (options) -> hx.detached('i').class(options?.class)
hx.button = (options) -> hx.palette.context(hx.detached('button').attr('type', 'button').class('hx-btn'), options?.context)
hx.label = (options) -> hx.palette.context(hx.detached('span').class('hx-label'), options?.context)

hx.group = factory('div', 'hx-group hx-horizontal')
hx.group.vertical = factory('div', 'hx-group hx-vertical')

hx.group.fixed = factory('div', 'hx-group hx-horizontal hx-fixed')
hx.group.vertical.fixed = factory('div', 'hx-group hx-vertical hx-fixed')

hx.section = factory('div', 'hx-section')
hx.section.fixed = factory('div', 'hx-section hx-fixed')

hx.checkbox = -> hx.detached('input').attr('type', 'checkbox')
