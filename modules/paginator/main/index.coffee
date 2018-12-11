hx.userFacingText({
  paginator: {
    paginatorAria: 'Pagination navigation',
    currentPageAria: 'Current page, page $page',
    gotoPageAria: 'Goto page $page',
    prevPageAria: 'Goto previous page, page $page',
    nextPageAria: 'Goto next page, page $page',
    prev: 'Prev',
    next: 'Next',
  }
})

getRange = (obj) ->
  start = Math.max(1, obj.page - Math.floor(obj.visibleCount / 2))
  end = Math.min(start + obj.visibleCount, obj.pageCount + 1)
  start = Math.max(1, end - obj.visibleCount)
  {start: start, end: end}

getFilledArray = (length) -> new Array(length).fill(0)
makeItem = (page, currentPage) -> "#{page}#{if currentPage == page then '~' else ''}"

getPageItems = (currentPage = 1, pageCount, maxMiddleCount) ->
  displayMiddleCount = if maxMiddleCount is pageCount - 2 then maxMiddleCount + 1
  else Math.min(pageCount, maxMiddleCount)
  beforeAfterLength = Math.floor(displayMiddleCount / 2)
  middleNearStart = currentPage <= displayMiddleCount
  middleNearEnd = currentPage > pageCount - displayMiddleCount
  middleInMiddle = !middleNearStart and !middleNearEnd
  showMiddle = pageCount > 2 and (middleNearStart or middleNearEnd or middleInMiddle)

  firstIsNextToMiddle = middleNearEnd and pageCount - displayMiddleCount == 1 or
    middleInMiddle and currentPage - beforeAfterLength == 1

  lastIsNextToMiddle = middleNearStart and pageCount - displayMiddleCount == 1 or
    middleInMiddle and currentPage + beforeAfterLength == pageCount - 1

  showFirst = !middleNearStart or pageCount > 1 and !showMiddle or pageCount == 1
  showFirstEllipsis = showFirst and (pageCount - displayMiddleCount > 1 or middleInMiddle)

  showLast = middleNearStart and pageCount - displayMiddleCount >= 1 or !middleNearEnd or
    pageCount > 1 and !showMiddle or lastIsNextToMiddle
  showLastEllipsis = showLast and (pageCount - displayMiddleCount > 1 or middleInMiddle)

  first = showFirst and makeItem(1, currentPage)
  last = showLast and makeItem(pageCount, currentPage)
  prev = currentPage > 1 and 'prev'
  next = currentPage < pageCount and 'next'
  startEllipsis = showFirstEllipsis and '...'
  endEllipsis = showLastEllipsis and '...'

  middle = if showMiddle then (->
    if middleNearStart
      return getFilledArray(displayMiddleCount)
        .map (_, i) -> i + 1

    if middleNearEnd
      return getFilledArray(displayMiddleCount)
        .map (_, i) -> pageCount - displayMiddleCount + i + 1

    if middleInMiddle
      before = getFilledArray(beforeAfterLength)
        .map (_, i) -> currentPage - beforeAfterLength + i

      after = getFilledArray(beforeAfterLength)
        .map (_, i) -> currentPage + i + 1

      return [
        before...,
        currentPage,
        after...
      ]
  )().map (item) -> makeItem(item, currentPage)

  [
    prev
    first
    startEllipsis
    (middle or [])...,
    endEllipsis
    last
    next
  ].filter hx.identity

class Paginator extends hx.EventEmitter
  constructor: (selector, options) ->
    super

    hx.component.register(selector, this)
    @container = hx.select(selector).classed('hx-paginator', true)

    @_ = hx.merge({
      page: 1,
      pageCount: 10,
      visibleCount: 10,
      updatePageOnSelect: true,
      v2Features: {
        maxMiddleCount: 5,
        useAccessibleRendering: false,
        dontRenderOnResize: false,
      },
      paginatorAria: hx.userFacingText('paginator', 'paginatorAria'),
      currentPageAria: hx.userFacingText('paginator', 'currentPageAria'),
      gotoPageAria: hx.userFacingText('paginator', 'gotoPageAria'),
      prevPageAria: hx.userFacingText('paginator', 'prevPageAria'),
      nextPageAria: hx.userFacingText('paginator', 'nextPageAria'),
      prevText: hx.userFacingText('paginator', 'prev'),
      nextText: hx.userFacingText('paginator', 'next'),
    }, options)

    @_.selector = selector

    if @_.v2Features.useAccessibleRendering
      # 2.x
      navItemEnter = () ->
        navItem = hx.detached('li')
          .class('hx-paginator-button-container')
          .add(hx.detached('a')
            .class('hx-paginator-button'))
        this.append(navItem).node()

      navItemUpdate = ({ text, aria, selected, disabled, isEllipsis, onClick }, element) ->
        navItem = hx.select(element)
          .classed('hx-paginator-selected-container', selected)
          .classed('hx-paginator-ellipsis-container', isEllipsis)

        link = navItem.select('a')
          .classed('hx-paginator-selected', selected)
          .attr('aria-current', if selected then true else undefined)
          .classed('hx-paginator-ellipsis', isEllipsis)
          .attr('aria-hidden', if isEllipsis then true else undefined)

        link.text(text)
        link.attr('aria-label', aria)
        link.off()
        if onClick
          link.on('click', 'hx.paginator', onClick)
          link.on('keypress', 'hx.paginator', (e) -> if e.which is 13 then onClick())

      links = hx.detached('ul')

      @view = links.view('li')
        .enter(navItemEnter)
        .update(navItemUpdate)

      nav = hx.detached('nav')
        .class('hx-paginator-nav')
        .attr('role', 'navigation')
        .attr('aria-label', @_.paginatorAria)
        .add(links)
        .attr('tabindex', '0')
        .on 'keydown', (e) =>
          currentPage = @page()
          currentPageCount = @pageCount()
          switch e.which
            when 37 # Left
              if currentPage isnt 1 then selectPage.call(this, 'user', currentPage - 1)
            when 39 # Right
              if currentPage isnt currentPageCount then selectPage.call(this, 'user', currentPage + 1)

      @container.add(nav)
    else
      # 1.x
      # go-to-start button
      self = this
      @container.append('button')
        .attr('type', 'button')
        .class('hx-btn ' + hx.theme.paginator.arrowButton)
          .add(hx.detached('i').class('hx-icon hx-icon-step-backward'))
          .on 'click', 'hx.paginator', ->
            if self._.pageCount is undefined
              selectPage.call(self, 'user', self._.page - 1)
            else
              selectPage.call(self, 'user', 0)

      pageButtons = @container.append('span').class('hx-input-group')
      @view = pageButtons.view('.hx-btn', 'button').update (d, e, i) ->
        @text(d.value)
          .attr('type', 'button')
          .classed('hx-paginator-three-digits', d.dataLength is 3)
          .classed('hx-paginator-more-digits', d.dataLength > 3)
          .classed(hx.theme.paginator.defaultButton, not d.selected)
          .classed(hx.theme.paginator.selectedButton, d.selected)
          .classed('hx-no-border', true)
          .on 'click', 'hx.paginator', -> selectPage.call(self, 'user', d.value)

      # go-to-end button
      @container.append('button')
        .attr('type', 'button')
        .class('hx-btn ' + hx.theme.paginator.arrowButton)
          .add(hx.detached('i').class('hx-icon hx-icon-step-forward'))
          .on 'click', 'hx.paginator', ->
            if self._.pageCount is undefined
              selectPage.call(self, 'user', self._.page + 1)
            else
              selectPage.call(self, 'user', self._.pageCount)

    if not @_.v2Features.dontRenderOnResize
      @container.on 'resize', 'hx.paginator', => @render()

    @render()

  setterGetter = (key, onChange) ->
    (val) ->
      # Set
      if arguments.length > 0
        this._[key] = val
        @render()
        return this
      # Get
      else
        return this._[key]

  pageCount: setterGetter('pageCount')
  visibleCount: setterGetter('visibleCount')
  updatePageOnSelect: setterGetter('updatePageOnSelect')
  paginatorAria: setterGetter('paginatorAria')
  currentPageAria: setterGetter('currentPageAria')
  gotoPageAria: setterGetter('gotoPageAria')
  prevPageAria: setterGetter('prevPageAria')
  nextPageAria: setterGetter('nextPageAria')
  prevText: setterGetter('prevText')
  nextText: setterGetter('nextText')

  selectPage = (cause, value = 1) ->
    currentPageCount = @pageCount()
    currentPage = @page()
    newPage = if currentPageCount is undefined
      Math.max(value, 1)
    else
      hx.clamp(1, currentPageCount, value)

    if newPage isnt currentPage
      if cause is 'api' or @updatePageOnSelect()
        this._.page = newPage
        @render()

      # DEPRECATED: 'selected' is deprecated in the event
      @emit('change', { cause, value, selected: value })

  page: (value) ->
    # Set
    if arguments.length > 0
      selectPage.call(this, 'api', value, true)
      return this
    # Get
    else
      return this._.page or 1

  render: () ->
    currentPage = @page()
    currentPageCount = @pageCount()
    data = if @_.v2Features.useAccessibleRendering
      getPageItems(currentPage, currentPageCount, this._.v2Features.maxMiddleCount).map (item) =>
        if item is 'prev'
          return {
            text: @prevText(),
            aria: @prevPageAria().replace('$page', currentPage - 1),
            onClick: () => selectPage.call(this, 'user', currentPage - 1),
          }
        if item is 'next'
          return {
            text: @nextText(),
            aria: @nextPageAria().replace('$page', currentPage + 1),
            onClick: () => selectPage.call(this, 'user', currentPage + 1),
          }
        if item is '...'
          return {
            isEllipsis: true,
          }

        selected = item.indexOf('~') > -1
        numericItem = parseInt(item)
        aria = if selected then @currentPageAria() else @gotoPageAria()
        return {
          text: numericItem,
          aria: aria.replace('$page', numericItem),
          selected: selected,
          onClick: () => selectPage.call(this, 'user', numericItem)
        }
    else
      if currentPageCount is undefined
        [{
          value: currentPage
          selected: true
          dataLength: currentPage.toString().length
        }]
      else
        {start, end} = getRange(this._)

        maxLength = Math.max(start.toString().length, (end - 1).toString().length)
        buttonSize = 30 + (5 * Math.max(0, maxLength - 2))

        # 85 is the width of the back/forward buttons which never changes
        buttonSpace = this.container.width() - 81
        maxButtons = Math.floor(buttonSpace / buttonSize)
        visibleCount = Math.min(maxButtons, this._.visibleCount)
        visibleCount = Math.max(visibleCount, 1)

        # XXX: Probably shouldn't run this twice every time
        {start, end} = getRange(this._)

        hx.range(end - start).map (i) =>
          {
            value: start + i
            selected: this._.page == start + i
            dataLength: maxLength
          }

    this.view.apply(data)

hx.paginator = (options) ->
  selection = hx.detached('div')
  new Paginator(selection.node(), options)
  selection

hx.Paginator = Paginator

hx._.paginator = {
  getPageItems
}
