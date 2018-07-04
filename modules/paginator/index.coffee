import { select, div, detached } from 'selection'
import { range, clamp, merge } from 'utils'
import { EventEmitter } from 'event-emitter'

getRange = (obj) ->
  start = Math.max(1, obj.page - Math.floor(obj.visibleCount / 2))
  end = Math.min(start + obj.visibleCount, obj.pageCount + 1)
  start = Math.max(1, end - obj.visibleCount)
  {start: start, end: end}

render = (paginator) ->

  if paginator._.pageCount is undefined
    data = [{
      value: paginator._.page
      selected: true
      dataLength: paginator._.page.toString().length
    }]
  else
    {start, end} = getRange(paginator._)

    maxLength = Math.max(start.toString().length, (end - 1).toString().length)
    buttonSize = 30 + (5 * Math.max(0, maxLength - 2))

    # 85 is the width of the back/forward buttons which never changes
    buttonSpace = paginator.container.width() - 81
    maxButtons = Math.floor(buttonSpace / buttonSize)
    visibleCount = Math.min(maxButtons, paginator._.visibleCount)
    visibleCount = Math.max(visibleCount, 1)

    # XXX: Probably shouldn't run this twice every time
    {start, end} = getRange(paginator._)

    data = range(end - start).map (i) ->
      {
        value: start + i
        selected: paginator._.page == start + i
        dataLength: maxLength
      }

  paginator.view.apply(data)

selectPage = (paginator, page, cause) ->
  if paginator._.pageCount is undefined
    newPage = Math.max(page, 1)
  else
    newPage = clamp(1, paginator._.pageCount, page)

  if newPage != paginator._.page
    paginator._.page = newPage
    render(paginator)
    paginator.emit 'change', {cause: cause, selected: paginator._.page}


class Paginator extends EventEmitter
  constructor: (selector, options) ->
    super()

    @container = select(selector)
      .classed('hx-paginator', true)
      .api(this)

    @_ = merge({
      page: 1,
      visibleCount: 10,
      pageCount: 10
    }, options)

    @_.selector = selector

    self = this

    # go-to-start button
    @container.append('button')
      .attr('type', 'button')
      .class('hx-btn hx-paginator-start-button')
        .add(detached('i').class('hx-icon hx-icon-step-backward'))
        .on 'click', 'hx.paginator', ->
          if self._.pageCount is undefined
            selectPage(self, self._.page - 1, 'user')
          else
            selectPage(self, 0, 'user')

    pageButtons = @container.append('span').class('hx-input-group')
    @view = pageButtons.view('.hx-btn', 'button').update (d, e, i) ->
      @text(d.value)
        .attr('type', 'button')
        .classed('hx-paginator-three-digits', d.dataLength is 3)
        .classed('hx-paginator-more-digits', d.dataLength > 3)
        .classed('hx-paginator-default', not d.selected)
        .classed('hx-paginator-selected', d.selected)
        .classed('hx-no-border', true)
        .on('click', 'hx.paginator', -> selectPage(self, d.value, 'user'))

    # go-to-end button
    @container.append('button')
      .attr('type', 'button')
      .class('hx-btn hx-paginator-end-button')
        .add(detached('i').class('hx-icon hx-icon-step-forward'))
        .on 'click', 'hx.paginator', ->
          if self._.pageCount is undefined
            selectPage(self, self._.page + 1, 'user')
          else
            selectPage(self, self._.pageCount, 'user')

    @container.on 'resize', 'hx.paginator', -> render(self)
    render(this)

  page: (i) ->
    if arguments.length > 0
      selectPage(@, i, 'api')
      this
    else
      @_.page

  pageCount: (value) ->
    if value?
      @_.pageCount = value
      render(this)
      this
    else
      @_.pageCount

  visibleCount: (value) ->
    if value?
      @_.visibleCount = value
      render(this)
      this
    else
      @_.visibleCount

paginator = (options) ->
  selection = div()
  new Paginator(selection, options)
  selection

export {
  paginator,
  Paginator
}
