hx.userFacingText({
  dataTable: {
    addFilter: 'Add Filter',
    addFilterGroup: 'Add Filter Group',
    advancedSearch: 'Advanced Search',
    and: 'and',
    anyColumn: 'Any column'
    clearFilters: 'Clear Filters',
    clearSelection: 'clear selection',
    loading: 'Loading',
    noData: 'No Data',
    noSort: 'No Sort',
    or: 'or',
    removeFilterGroup: 'Remove Filter Group',
    rowsPerPage: 'Rows Per Page',
    search: 'Search',
    selectedRows: '$selected of $total selected.',
    sortBy: 'Sort By'
  }
})


fullWidthColSpan = 999 # the colspan used to make a cell display as an entire row
collapseBreakPoint = 480

columnOptionLookup = (options, name, id) ->
  if options.columns isnt undefined and options.columns[id] isnt undefined and options.columns[id][name] isnt undefined
    options.columns[id][name]
  else
    options[name]

splitArray = (array, index) ->
  left = if index is 0
    []
  else
    array[0..index - 1]
  right = if index is array.length - 1
    []
  else
    array[index+1..array.length]
  [left, array[index], right]


class DataTable extends hx.EventEmitter
  constructor: (selector, options) ->
    super
    hx.component.register(selector, this)

    # XXX: review option names (particularly rowEnabledLookup and rowSelectableLookup) and decide on default values
    resolvedOptions = hx.merge({
      allowHeaderWrap: false
      compact: 'auto'             # 'auto', true, false
      displayMode: 'paginate'     # 'paginate', 'all'
      feed: undefined
      filter: undefined
      filterEnabled: true
      pageSize: 15
      pageSizeOptions: undefined  # supply an array of numbers to show the user
      retainHorizontalScrollOnRender: true
      retainVerticalScrollOnRender: false
      selectEnabled: false
      singleSelection: false
      sort: undefined
      sortEnabled: true

      # functions used for getting row state
      rowIDLookup: (row) -> row.id
      rowEnabledLookup: (row) -> not row.disabled
      rowSelectableLookup: (row) -> true
      rowCollapsibleLookup: (row) -> false

      # functions for rendering
      collapsibleRenderer: undefined
      cellRenderer: (element, cell, row) -> hx.select(element).text(cell)
      headerCellRenderer: (element, cell, headers) -> hx.select(element).text(cell.name)

      # per column options (headerCellRenderer, cellRenderer, sortEnabled)
      columns: {}

      clearSelectionText: hx.userFacingText('dataTable','clearSelection')
      loadingText: hx.userFacingText('dataTable','loading')
      noDataMessage: hx.userFacingText('dataTable','noData')
      noSortText: hx.userFacingText('dataTable', 'noSort')
      rowsPerPageText: hx.userFacingText('dataTable','rowsPerPage')
      searchPlaceholder: hx.userFacingText('dataTable','search')
      selectedRowsText: hx.userFacingText('dataTable', 'selectedRows')
      sortByText: hx.userFacingText('dataTable','sortBy')

      addFilterText: hx.userFacingText('dataTable', 'addFilter')
      clearFiltersText: hx.userFacingText('dataTable', 'clearFilters')
      anyColumnText: hx.userFacingText('dataTable', 'anyColumn')
      removeFilterGroupText: hx.userFacingText('dataTable', 'removeFilterGroup')
      addFilterGroupText: hx.userFacingText('dataTable', 'addFilterGroup')

      advancedSearchPlaceholder: hx.userFacingText('dataTable', 'search')
    }, options)

    selection = hx.select(selector).classed('hx-data-table', true)
    content = selection.append('div').class('hx-data-table-content')
    statusBar = selection.append('div').class('hx-data-table-status-bar')
    footer = selection.append('div').class('hx-data-table-footer')

    resolvedOptions.pageSize = Math.min resolvedOptions.pageSize, 1000

    onInput = hx.debounce 200, => @filter(filterInput.value(), undefined, 'user')

    filterInput = footer.append('input').class('hx-data-table-filter-control')
      .attr('placeholder', resolvedOptions.searchPlaceholder)
      .classed('hx-data-table-filter-visible', resolvedOptions.filterEnabled)
      .on 'input', 'hx.data-table', onInput

    # loading div
    selection.append('div').class('hx-data-table-loading')
      .append('div').class('hx-data-table-loading-inner')
        .append('div').class('hx-spinner')
        .insertAfter('span').text(' ' + resolvedOptions.loadingText)

    # Create the status bar text span and the clear button
    statusBar.append('span').class('hx-data-table-status-bar-text')
      .insertAfter('span').class('hx-data-table-status-bar-clear').text(" (#{resolvedOptions.clearSelectionText})")
        .on 'click', 'hx.data-table', =>
          @_.selectedRows.clear()
          selection.select('.hx-data-table-content').selectAll('.hx-data-table-row-selected').classed('hx-data-table-row-selected', false)
          @updateSelected()
          @emit 'selectedrowsclear'

    # control panel / footer section

    # compact sort - always on the page, only visible in compact mode (so we can just change the class and everything will work)
    sortDiv = footer.append('div').class('hx-data-table-sort-control')
      .classed('hx-data-table-sort-visible', resolvedOptions.sortEnabled)
    sortDiv.append('span').text(resolvedOptions.sortByText + ': ')
    sortColPicker = new hx.Picker(sortDiv.append('button').class('hx-btn hx-btn-invisible').node())
    sortColPicker.on 'change', 'hx.data-table', (d) =>
      if d.cause is 'user' then @sort({column: sortColPicker.value().column, direction: sortColPicker.value().direction})

    # spacer to push other content to the right hand side of the footer
    footer.append('div').class('hx-data-table-footer-spacer')

    advancedSearch = hx.detached('div').class('hx-data-table-advanced-search')
    advancedSearchContainer = advancedSearch.append('div').class('hx-data-table-advanced-search-container')
    advancedSearchButtons = advancedSearch.append('div').class('hx-data-table-advanced-search-buttons')


    # Render individual row
    advancedSearchRowEnter = (filterGroup, filterGroupIndex, dataTable) ->
      (filterRow, index, trueIndex) ->
        typePickerOptions =
          items: [
            { text: hx.userFacingText('dataTable', 'and'), value: 'and' }
            { text: hx.userFacingText('dataTable', 'or'), value: 'or' }
          ]

        typePickerSel = hx.picker(typePickerOptions)
          .classed('hx-data-table-advanced-search-type', true)

        typePickerSel.component()
          .on 'change', (data) ->
            if data.cause is 'user'
              prevFilters = dataTable.advancedSearch()
              [leftFilterGroups, filterGroup, rightFilterGroups] = splitArray(prevFilters, filterGroupIndex)

              newFilters = if data.value.value is 'or'
                [leftFilters, filter, rightFilters] = splitArray(filterGroup, trueIndex)
                [leftFilterGroups..., leftFilters, [filter, rightFilters...], rightFilterGroups...]
              else
                [leftAllButLast..., leftLast] = leftFilterGroups
                [leftAllButLast..., [leftLast..., filterGroup...], rightFilterGroups...]

              dataTable.advancedSearch(newFilters)

        anyColumn = {
          text: resolvedOptions.anyColumnText
          value: 'any'
          anyColumn: true
        }

        columnItems = filterRow.headers.map (header) ->
          value: header.id
          orig: header

        columnRenderer = (element, cell) ->
          if cell.anyColumn then hx.select(element).text(cell.text)
          else columnOptionLookup(resolvedOptions, 'headerCellRenderer', cell.orig.id)(element, cell.orig, filterRow.headers)

        columnPickerOptions =
          items: [anyColumn, columnItems...]
          renderer: columnRenderer

        columnPickerSel = hx.picker(columnPickerOptions)
          .classed('hx-data-table-advanced-search-column', true)

        columnPickerSel.component()
          .on 'change', (data) ->
            if data.cause is 'user'
              prevFilters = dataTable.advancedSearch()
              [leftFilterGroups, filterGroup, rightFilterGroups] = splitArray(prevFilters, filterGroupIndex)
              [leftFilters, filter, rightFilters] = splitArray(filterGroup, trueIndex)
              newFilter = hx.merge(filter, {
                column: data.value.value
              })
              dataTable.advancedSearch([leftFilterGroups..., [leftFilters..., newFilter, rightFilters...], rightFilterGroups...])

        debouncedInput = hx.debounce 200, (e) ->
          prevFilters = dataTable.advancedSearch()
          [leftFilterGroups, filterGroup, rightFilterGroups] = splitArray(prevFilters, filterGroupIndex)
          [leftFilters, filter, rightFilters] = splitArray(filterGroup, trueIndex)
          newFilter = hx.merge(filter, {
            term: e.target.value
          })
          dataTable.advancedSearch([leftFilterGroups..., [leftFilters..., newFilter, rightFilters...], rightFilterGroups...])

        termInput = hx.detached('input').attr('placeholder', resolvedOptions.advancedSearchPlaceholder)
          .class('hx-data-table-advanced-search-input hx-section')
          .on 'input', debouncedInput

        removeBtn = hx.button({context: 'negative'})
          .add(hx.icon({class: 'hx-icon hx-icon-close'}))
          .on 'click', ->
            prevFilters = dataTable.advancedSearch()
            [leftFilterGroups, filterGroup, rightFilterGroups] = splitArray(prevFilters, filterGroupIndex)
            [leftFilters, _, rightFilters] = splitArray(filterGroup, trueIndex)

            newFilters = if trueIndex is 0 and filterGroupIndex is 0
              [rightFilters, rightFilterGroups...]
            else if trueIndex is 0
              [leftFilterGroup..., leftFilterGroupLast] = leftFilterGroups
              [_, filters...] = filterGroup
              newFilterGroup = [leftFilterGroupLast..., filters...]
              [leftFilterGroup..., newFilterGroup, rightFilterGroups...]
            else
              newFilterGroup = [leftFilters..., rightFilters...]
              if newFilterGroup.length
                [leftFilterGroups..., newFilterGroup, rightFilterGroups...]
              else
                [leftFilterGroups..., rightFilterGroups...]
            dataTable.advancedSearch(newFilters)

        @append('div').class('hx-data-table-advanced-search-filter hx-section hx-input-group hx-input-group-full-width')
          .add(typePickerSel)
          .add(columnPickerSel)
          .add(termInput)
          .add(removeBtn)
          .node()


    advancedSearchRowUpdate = ({term, column}, element, index) ->
      filterRowSel = hx.select(element)
        .classed('hx-data-table-advanced-search-invalid', not term)

      filterRowSel.select('.hx-data-table-advanced-search-type').component()
        .value(if index is 0 then 'or' else 'and')

      filterRowSel.select('.hx-data-table-advanced-search-column').component()
        .value(column or 'any')

      filterRowSel.select('.hx-data-table-advanced-search-input').value(term or '')



    # Render grouped filters
    advancedSearchGroupEnter = (dataTable) ->
      (filterGroup, index, trueIndex) ->
        addFilterToGroup = ->
          prevFilters = dataTable.advancedSearch()
          [leftFilterGroups, filterGroup, rightFilterGroups] = splitArray(prevFilters, trueIndex)
          newFilter = {
            column: 'any',
            term: ''
          }
          dataTable.advancedSearch([leftFilterGroups..., [filterGroup..., newFilter], rightFilterGroups...])

        removeFilterGroup = ->
          prevFilters = dataTable.advancedSearch()
          [leftFilterGroups, filterGroup, rightFilterGroups] = splitArray(prevFilters, trueIndex)
          dataTable.advancedSearch([leftFilterGroups..., rightFilterGroups...])

        filterGroupSel = hx.detached('div').class('hx-data-table-advanced-search-filter-group')
        filterGroupView = filterGroupSel.append('div')
          .view('.hx-data-table-advanced-search-filter')
            .enter(advancedSearchRowEnter(filterGroup, trueIndex, dataTable))
            .update(advancedSearchRowUpdate)
        filterGroupButtons = filterGroupSel.append('div')

        filterGroupButtons.append(hx.button({context: 'positive'})
          .add(hx.icon({class: 'hx-icon hx-icon-plus'}))
          .add(hx.detached('span').text(resolvedOptions.addFilterText)))
          .on 'click', addFilterToGroup

        filterGroupButtons.append(hx.button({context: 'negative'})
          .add(hx.icon({class: 'hx-icon hx-icon-close'}))
          .add(hx.detached('span').text(resolvedOptions.removeFilterGroupText)))
          .on 'click', removeFilterGroup

        hx.component.register(filterGroupSel.node(), {
          filterGroupView
        })
        @append(filterGroupSel).node()

    advancedSearchGroupUpdate = (filterGroup, element, index) ->
      hx.component(element).filterGroupView.apply(filterGroup)

    advancedSearchView = advancedSearchContainer.view('.hx-data-table-advanced-search-filter-group')
      .enter(advancedSearchGroupEnter(this))
      .update(advancedSearchGroupUpdate)

    addFilterGroup = ->
      prevFilters = dataTable.advancedSearch() or []
      dataTable.advancedSearch([prevFilters..., [{
        column: 'any',
        term: ''
      }]])

    clearFilters = => @advancedSearch([[]])

    advancedSearchButtons.append(hx.button({context: 'positive'})
      .add(hx.icon({class: 'hx-icon hx-icon-plus'}))
      .add(hx.detached('span').text(resolvedOptions.addFilterGroupText)))
      .on 'click', addFilterGroup

    advancedSearchButtons.append(hx.button({context: 'negative'})
      .add(hx.icon({class: 'hx-icon hx-icon-close'}))
      .add(hx.detached('span').text(resolvedOptions.clearFiltersText)))
      .on 'click', clearFilters

    # XXX TODO - put this somewhere proper
    footer.insertAfter(advancedSearch)


    # pagination block (the page selector and the rows per page selector)
    paginationContainer = footer.append('div').class('hx-data-table-pagination-block')


    # pagination select
    pagePickerContainer = paginationContainer.append('div').class('hx-data-table-paginator')

    pagePickerNode = pagePickerContainer.append('button').class('hx-data-table-pagination-picker hx-btn hx-btn-invisible').node()
    pagePicker = new hx.Picker(pagePickerNode, { dropdownOptions: { align: 'rbrt' } })
      .on 'change', 'hx.data-table', (d) =>
        if d.cause is 'user'
          @page(d.value.value, undefined, d.cause)

    pagePickerTotalRows = pagePickerContainer.append('span').class('hx-data-table-paginator-total-rows')

    pagePickerBack = pagePickerContainer.append('button').class('hx-data-table-paginator-back hx-btn hx-btn-invisible')
    pagePickerBack.append('i').class('hx-icon hx-icon-chevron-left')
    pagePickerBack.on 'click', 'hx.data-table', => if not pagePickerBack.classed('hx-data-table-btn-disabled') then @page(@page()-1)

    pagePickerForward = pagePickerContainer.append('button').class('hx-data-table-paginator-forward hx-btn hx-btn-invisible')
    pagePickerForward.append('i').class('hx-icon hx-icon-chevron-right')
    pagePickerForward.on 'click', 'hx.data-table', => if not pagePickerForward.classed('hx-data-table-btn-disabled') then @page(@page()+1)


    # pageSizeOptions select
    pageSizeContainer = paginationContainer.append('div').class('hx-data-table-page-size')

    pageSizeContainer.append('span').text(resolvedOptions.rowsPerPageText + ': ')

    pageSizeNode = pageSizeContainer.append('button').class('hx-data-table-page-size-picker hx-btn hx-btn-invisible').node()
    pageSizePicker = new hx.Picker(pageSizeNode, { dropdownOptions: { align: 'rbrt' } })
      .on 'change', 'hx.data-table', (d) =>
        if d.cause is 'user'
          @pageSize(d.value.value, undefined, 'user')
          @page(1, undefined, 'user')


    # 'private' variables
    @_ = {
      selection: selection
      options: resolvedOptions
      page: 1
      pagePicker: pagePicker
      pageSizePicker: pageSizePicker
      statusBar: statusBar
      sortColPicker: sortColPicker
      selectedRows: new hx.Set   # holds the ids of the selected rows
      expandedRows: new hx.Set
      renderedCollapsibles: {}
      compactState: (resolvedOptions.compact is 'auto' and selection.width() < collapseBreakPoint) or resolvedOptions.compact is true
      advancedSearchView: advancedSearchView
    }

    # responsive page resize when compact is 'auto'
    selection.on 'resize', 'hx.data-table', =>
      selection.selectAll('.hx-data-table-collapsible-content-container').map (e) =>
        e.style('max-width', (parseInt(selection.style('width')) - @_.collapsibleSizeDiff) + 'px')

      state = (@compact() is 'auto' and selection.width() < collapseBreakPoint) or @compact() is true
      selection.classed 'hx-data-table-compact', state
      if @_.compactState isnt state
        @_.compactState = state
        @emit('compactchange', {value: @compact(), state: state, cause: 'user'})

    randomId = hx.randomId()

    # deal with shift being down - prevents the text in the table being selected when shift
    # selecting multiple rows (as it looks bad) but also means that data can be selected if required
    # XXX: make this work better / come up with a better solution
    hx.select('body').on 'keydown', 'hx.data-table.shift.' + randomId, (e) =>
      if e.shiftKey and @selectEnabled()
        selection.classed('hx-data-table-disable-text-selection', true)

    hx.select('body').on 'keyup', 'hx.data-table.shift.' + randomId, (e) =>
      if not e.shiftKey and @selectEnabled()
        selection.classed('hx-data-table-disable-text-selection', false)



  # Methods for changing the options
  #---------------------------------

  # general purpose function for setting / getting an option
  option = (name) ->
    (value, cb, cause) ->
      options = @_.options
      if arguments.length > 0
        options[name] = value
        @emit(name.toLowerCase() + 'change', {value: value, cause: (cause or 'api')})
        @render(cb)
        this
      else options[name]

  collapsibleRenderer: option('collapsibleRenderer')
  compact: option('compact')
  displayMode: option('displayMode')
  feed: option('feed')
  filter: option('filter')
  advancedSearch: option('advancedSearch')
  filterEnabled: option('filterEnabled')
  noDataMessage: option('noDataMessage')
  pageSize: option('pageSize')
  pageSizeOptions: option('pageSizeOptions')
  retainHorizontalScrollOnRender: option('retainHorizontalScrollOnRender')
  retainVerticalScrollOnRender: option('retainVerticalScrollOnRender')
  rowCollapsibleLookup: option('rowCollapsibleLookup')
  rowEnabledLookup: option('rowEnabledLookup')
  rowIDLookup: option('rowIDLookup')
  rowSelectableLookup: option('rowSelectableLookup')
  selectEnabled: option('selectEnabled')
  singleSelection: option('singleSelection')
  sort: option('sort')

  # general purpose function for setting / getting a column option (or the default option of the column id is not specified)
  columnOption = (name) ->
    (columnId, value, cb) ->
      options = @_.options
      if arguments.length > 1 and hx.isString(columnId)
        options.columns[columnId] ?= {}
        options.columns[columnId][name] = value
        @emit(name.toLowerCase() + 'change', {column: columnId, value: value, cause: 'api'})
        @render(cb)
        this
      else if arguments.length > 0
        if hx.isString(columnId) and options.columns[columnId]
          options.columns[columnId][name]
        else
          options[name] = arguments[0]
          @emit(name.toLowerCase() + 'change', {value: value, cause: 'api'})
          @render(arguments[1])
          this
      else options[name]

  allowHeaderWrap: columnOption('allowHeaderWrap')
  cellRenderer: columnOption('cellRenderer')
  headerCellRenderer: columnOption('headerCellRenderer')
  sortEnabled: columnOption('sortEnabled')

  # function for setting / getting options that are only column specific and cannot be set for the whole table
  columnOnlyOption = (name) ->
    (columnId, value, cb) ->
      options = @_.options
      if hx.isString(columnId)
        if arguments.length > 1
          options.columns[columnId] ?= {}
          options.columns[columnId][name] = value
          @emit(name.toLowerCase() + 'change', {column: columnId, value: value, cause: 'api'})
          @render(cb)
          this
        else if options.columns[columnId]
          options.columns[columnId][name]

  maxWidth: columnOnlyOption('maxWidth')


  # Methods for changing the state of the table
  # -------------------------------------------

  page: (value, cb, cause) ->
    if arguments.length > 0
      @_.page =  Math.max(1, value)
      if @_.numPages?
        @_.page = Math.min @_.page, @_.numPages
      @emit('pagechange', {value: @_.page, cause: cause or 'api'})
      @render(cb)
      this
    else @_.page

  selectedRows: (value, cb) ->
    if arguments.length > 0 and not hx.isFunction(value)

      # Deal with single select mode when setting the selected rows
      if @singleSelection() and hx.isArray(value) and value.length
        value = [value[0]]
      @_.selectedRows = new hx.Set(value)
      newSelectedRows = @_.selectedRows.values()
      @emit('selectedrowschange', {value: newSelectedRows, cause: 'api'})
      @_.userLastSelectedIndex = undefined
      @render(cb)
      this
    else
      @_.selectedRows.values()

  expandedRows: (value, cb) ->
    if arguments.length > 0 and not hx.isFunction(value)
      @_.expandedRows = new hx.Set(value)
      @render(cb)
      @emit('expandedrowschange', {value: @_.expandedRows.values(), cause: 'api'})
      this
    else
      @_.expandedRows.values()

  rowsForIds: (ids, cb) ->
    if cb? then @feed().rowsForIds(ids, @rowIDLookup(), cb)
    this

  # Methods that perform an action on the table
  # -------------------------------------------

  renderSuppressed: (value) ->
    if arguments.length > 0
      @_.renderSuppressed = value
      this
    else @_.renderSuppressed

  # redraws the table
  render: (cb) ->
    if @_.renderSuppressed then return

    feed = @feed()

    # check that the feed has been defined - if it hasn't then there is no point in continuing
    if feed is undefined or (feed.headers is undefined or feed.totalCount is undefined or feed.rows is undefined)
      hx.consoleWarning('No feed specified when rendering data table')
      return

    selection = @_.selection
    options = @_.options

    selection.select('.hx-data-table-pagination-block').classed('hx-data-table-pagination-block-visible', options.displayMode is 'paginate')

    # some utility functions
    getColumnOption = (name, id) -> columnOptionLookup(options, name, id)

    rowToArray = (headers, obj) -> headers.map (header) -> obj.cells[header.id]

    # build the main structure of the table in a detached container
    container = hx.detached('div').class('hx-data-table-content')
    table = container.append('table').class('hx-data-table-table hx-table')
    thead = table.append('thead').class('hx-data-table-head')
    tbody = table.append('tbody').class('hx-data-table-body')
    headerRow = thead.append('tr').class('hx-data-table-row')

    # make the loading div visible
    selection.select('.hx-data-table-loading').style('display', '')

    selection.select('.hx-data-table-filter-control')
      .classed('hx-data-table-filter-visible', options.filterEnabled)

    # load in the data needed
    # XXX: how much of this could be split out so it's not re-defined every time render is called?
    feed.headers (headers) =>
      if options.showAdvancedSearch and options.advancedSearchEnabled
        currentFilters = @advancedSearch() or [[]]
        @_.advancedSearchView.apply currentFilters.filter((x) -> x.length).map (filterGroup) ->
          filterGroup.map (filterRow) ->
            hx.merge(filterRow, {
              headers,
              getColumnOption
            })

      selection.select('.hx-data-table-sort-control')
        .classed('hx-data-table-sort-visible', options.sortEnabled or headers.some((header) -> getColumnOption('sortEnabled', header.id)))

      feed.totalCount (totalCount) =>
        if options.displayMode is 'paginate'
          start = (@page() - 1) * options.pageSize
          end = @page() * options.pageSize - 1
        else
          start = undefined
          end = undefined

        selection.classed('hx-data-table-infinite', totalCount is undefined)

        feed.rows {start: start, end: end, sort: @sort(), filter: @filter(), advancedSearch: @advancedSearch()}, ({rows, filteredCount}) =>
          if options.displayMode is 'paginate'
            if filteredCount is undefined
              @_.numPages = undefined
              numText = (start+1) + ' - ' + (end+1)
              selection.select('.hx-data-table-paginator').classed('hx-data-table-multi-page', true)
            else

              @_.numPages = Math.max(1, Math.ceil(filteredCount / options.pageSize))

              if @page() > @_.numPages then @page(@_.numPages)

              selection.select('.hx-data-table-paginator').classed('hx-data-table-multi-page', @_.numPages > 1)

              if filteredCount > 0 and @_.numPages > 1
                numText = 'of ' + filteredCount
                items = for i in [1..@_.numPages] by 1
                  num = i * options.pageSize
                  text: (num + 1 - options.pageSize) + ' - ' + Math.min(num, filteredCount) # e.g. 1 - 15
                  value: i

                @_.pagePicker
                  .items(items)
                  .value(@page())

            selection.select('.hx-data-table-paginator-total-rows').text(numText or '')

            selection.select('.hx-data-table-paginator-back').classed('hx-data-table-btn-disabled', @page() is 1)
            selection.select('.hx-data-table-paginator-forward').classed('hx-data-table-btn-disabled', @page() is @_.numPages)


          if headers.some((header) -> getColumnOption('sortEnabled', header.id))
            currentSort = (@sort() or {})

            # filter out columns that are not sortable so they don't show in the list for compact mode
            sortColumns = hx.flatten(headers
              .map((header) -> if getColumnOption('sortEnabled', header.id)
                [
                  {text: header.name, value: header.id + 'asc', column: header.id, direction: 'asc', cell: header}
                  {text: header.name, value: header.id + 'desc', column: header.id, direction: 'desc',  cell: header}
                ])
              .filter(hx.defined))


            # set the values for the compact sort control
            @_.sortColPicker
              .renderer((element, option) ->
                if option.value
                  getColumnOption('headerCellRenderer', option.cell.id)(element, option.cell, headers)
                  hx.select(element).append('i')
                    .class('hx-data-table-compact-sort-arrow hx-icon hx-icon-chevron-' + (if option.direction is 'asc' then 'up' else 'down'))
                else
                  hx.select(element).text(option.text)
              )
              .items([{text: options.noSortText, value: undefined}].concat sortColumns)

            if currentSort.column and @_.sortColPicker.value().value isnt (currentSort.column + currentSort.direction)
              @_.sortColPicker.value({value: currentSort.column + currentSort.direction})

          # populate the page size picker if there are options set
          if filteredCount isnt undefined and filteredCount > 0
            selectPageSize = options.pageSizeOptions? and options.pageSizeOptions.length > 0
            selection.select('.hx-data-table-page-size').classed('hx-data-table-select-page-size', selectPageSize)

            if selectPageSize
              if options.pageSizeOptions.indexOf(options.pageSize) is -1
                options.pageSizeOptions.push options.pageSize

              pageSizeOptions = options.pageSizeOptions
                .sort(hx.sort.compare)
                .map((item) -> {text: item, value: item})

              @_.pageSizePicker
                .items(pageSizeOptions)
                .value(options.pageSize)

          # build the grouped header
          if headers.some((header) -> header.groups?)
            relevantHeaders = headers.filter((e) -> e.groups?).map((e) -> e.groups.length)
            maxHeaderDepth = Math.max.apply(null,  relevantHeaders)

            # Map over to populate columns with groups of '' where not included
            headerGroups = headers.map (e) ->
              groups = e.groups or []
              groups.push '' while groups.length < maxHeaderDepth
              groups

            for row in [maxHeaderDepth-1..0] by -1
              groupedRow = headerRow.insertBefore 'tr'
              groupedRow.append('th').class('hx-data-table-control') if options.selectEnabled or options.collapsibleRenderer?
              count = 1
              for column in [1..headerGroups.length] by 1
                col = headerGroups[column]
                prevCol = headerGroups[column-1]
                if col? and prevCol?
                  parent = col.slice(row, maxHeaderDepth).toString()
                  prevParent = prevCol.slice(row, maxHeaderDepth).toString()

                if column is headerGroups.length or col[row] isnt prevCol[row] or parent isnt prevParent
                  groupedRow.append('th')
                    .attr('colspan', count)
                    .class('hx-data-table-cell-grouped')
                    .text(prevCol[row])
                  count = 0
                count++


          # add the 'select all' checkbox to the header
          if options.selectEnabled or options.collapsibleRenderer?
            headerControlBox = headerRow.append('th').class('hx-data-table-control hx-table-head-no-border')

          if options.selectEnabled and not options.singleSelection
            headerCheckBox = headerControlBox.append('div').class('hx-data-table-checkbox')
              .on 'click', 'hx.data-table', =>
                if rows.length > 0
                  enabledRows = rows.filter (row) -> options.rowEnabledLookup(row)
                  selectMulti(0, rows.length - 1, not enabledRows.every((row) => @_.selectedRows.has(options.rowIDLookup(row))))
            headerCheckBox.append('i').class('hx-icon hx-icon-check')


          # build the header
          headers.forEach (header, i) =>
            cellDiv = headerRow.append('th').class('hx-data-table-cell')
              .classed('hx-table-header-allow-wrap', getColumnOption('allowHeaderWrap', header.id))

            cellDivContent = cellDiv.append('div').class('hx-data-table-cell-inner')

            getColumnOption('headerCellRenderer', header.id)(cellDivContent.append('span').class('hx-data-table-title').node(), header, headers)

            if getColumnOption('sortEnabled', header.id)
              cellDiv.classed('hx-data-table-cell-sort-enabled', true)

              currentSort = @sort()
              dirClass = if currentSort and currentSort.column is header.id
                'hx-icon-sort-' + currentSort.direction + ' hx-data-table-sort-on'
              else 'hx-icon-sort'
              cellDivContent.append('i').class('hx-icon ' + dirClass + ' hx-data-table-sort-icon')

              cellDiv.on 'click', 'hx.data-table', =>
                currentSort = @sort() or {}
                direction = if currentSort.column is header.id
                  if currentSort.direction is 'asc' then 'desc'
                else 'asc'
                column = if direction isnt undefined then header.id
                @sort({column: column, direction: direction}, undefined, 'user')


          @updateSelected = =>
            parentFilter = (parent) ->
              (sel) -> sel.node().parentNode is parent.node()

            getSelectableRows = (parent) ->
              parent
                .selectAll('.hx-data-table-row')
                .filter(parentFilter(parent))
                .classed('hx-data-table-row-selected', false)

            rowDivs = getSelectableRows(tbody)

            leftHeaderBody = container.select('.hx-sticky-table-header-left').select('tbody')
            checkBoxDivs = getSelectableRows(leftHeaderBody)

            if @_.selectedRows.size > 0
              for row, rowIndex in rows
                if @_.selectedRows.has(options.rowIDLookup(row))
                  hx.select(rowDivs.nodes[rowIndex]).classed('hx-data-table-row-selected', true)
                  if checkBoxDivs.nodes[rowIndex]?
                    hx.select(checkBoxDivs.nodes[rowIndex]).classed('hx-data-table-row-selected', true)

            pageHasSelection = tbody.selectAll('.hx-data-table-row-selected').size() > 0
            selection.classed('hx-data-table-has-page-selection', pageHasSelection and not options.singleSelection)
            selection.classed('hx-data-table-has-selection', @_.selectedRows.size > 0 and not options.singleSelection)
            if totalCount isnt undefined
              @_.statusBar
                .select('.hx-data-table-status-bar-text')
                .text(options.selectedRowsText.replace('$selected', @_.selectedRows.size).replace('$total', totalCount))

          # handles multi row selection ('select all' and shift selection)
          selectMulti = (start, end, force) =>
            newRows = []
            newRows.push rows[i] for i in [start..end] by 1

            for row in newRows
              if options.rowEnabledLookup(row) and options.rowSelectableLookup(row)
                id = options.rowIDLookup(row)
                @_.selectedRows[if force then 'add' else 'delete'](id)
                @emit 'selectedrowschange', {row: row, rowValue: @_.selectedRows.has(id), value: @selectedRows(), cause: 'user'}
            @updateSelected()

          # handles row selection.
          selectRow = (row, index, shiftDown) =>
            if @_.userLastSelectedIndex?
              if options.singleSelection and index isnt @_.userLastSelectedIndex
                @_.selectedRows.clear()
              else
                # does the check for whether we're shift selecting and calls into selectMulti if we are
                if shiftDown and index isnt @_.userLastSelectedIndex
                  force = @_.selectedRows.has(options.rowIDLookup(rows[@_.userLastSelectedIndex]))
                  if index > @_.userLastSelectedIndex then selectMulti(@_.userLastSelectedIndex + 1, index, force)
                  else selectMulti(index, @_.userLastSelectedIndex, force)
                  return

            @_.userLastSelectedIndex = index

            if options.rowSelectableLookup(row)
              id = options.rowIDLookup(row)
              deleteOrAdd = if @_.selectedRows.has(id) then 'delete' else 'add'
              @_.selectedRows[deleteOrAdd](id)
              @emit 'selectedrowschange', {row: row, rowValue: @_.selectedRows.has(id), value: @selectedRows(), cause: 'user'}
            @updateSelected()

          # Deal with collapsible rows
          buildCollapsible = ->
            contentRow = hx.detached('tr').class('hx-data-table-collapsible-content-row')
            hiddenRow = hx.detached('tr').class('hx-data-table-collapsible-row-spacer')

            # Add an empty cell so the sticky headers display correctly
            contentRow.append('td').class('hx-data-table-collapsible-cell hx-data-table-collapsible-cell-empty')

            # The div that the user will populate with the collapsibleRender function
            contentDiv = contentRow.append('td').class('hx-data-table-collapsible-cell')
              .attr('colspan',fullWidthColSpan)
              .append('div').class('hx-data-table-collapsible-content-container')
              .append('div').class('hx-data-table-collapsible-content')

            {contentRow: contentRow, hiddenRow: hiddenRow, contentDiv: contentDiv}

          toggleCollapsible = (node, row, force) =>
            # once rows have been clicked once, the nodes are stored in the _.renderedCollapsibles object for re-use
            rowId = options.rowIDLookup(row)
            cc = @_.renderedCollapsibles[rowId] or buildCollapsible(row)
            @_.renderedCollapsibles[rowId] = cc

            # We always insert after here to make sure the nodes are added when setting the collapsible rows with the API
            node.insertAfter(cc.hiddenRow).insertAfter(cc.contentRow)

            currentVis = if force? then force else !cc.contentRow.classed('hx-data-table-collapsible-row-visible')
            cc.contentRow.classed('hx-data-table-collapsible-row-visible', currentVis)
            node.classed('hx-data-table-collapsible-row-visible', currentVis)
            node.select('.hx-data-table-collapsible-toggle').select('i').class(if currentVis then 'hx-icon hx-icon-minus' else 'hx-icon hx-icon-plus')

            if currentVis then options.collapsibleRenderer cc.contentDiv.node(), row
            else
              @_.renderedCollapsibles[rowId].contentRow.remove()
              @_.renderedCollapsibles[rowId].hiddenRow.remove()
              delete @_.renderedCollapsibles[rowId]

            @_.expandedRows[if currentVis then 'add' else 'delete'](rowId)
            @_.stickyHeaders.render()

            @_.collapsibleSizeDiff = parseInt(selection.style('width')) - parseInt(hx.select(cc.contentDiv.node().parentNode).style('width'))

            currentVis

          # build the rows
          if filteredCount is undefined or filteredCount > 0
            rows.forEach (row, rowIndex) =>
              tr = tbody.append('tr').class('hx-data-table-row')
                .classed('hx-data-table-row-selected', @_.selectedRows.has(options.rowIDLookup(row)))
                .classed('hx-data-table-row-disabled', not options.rowEnabledLookup(row))

              tr.on 'click', 'hx.data-table', (e) => @emit 'rowclick', {data: row, node: tr.node()}

              rowIsCollapsible = options.rowCollapsibleLookup(row) # stored as we use it more than once

              # used in compact mode to display the tick correctly without letting text flow behind it.
              tr.classed('hx-data-table-row-select-enabled', options.selectEnabled)

              if options.selectEnabled or options.collapsibleRenderer?
                controlDiv = tr.append('th').class('hx-data-table-control')

                if options.selectEnabled
                  checkbox = controlDiv.append('div').class('hx-data-table-checkbox')
                  checkbox.append('i').class('hx-icon hx-icon-check')

                  if options.rowEnabledLookup(row)
                    checkbox.on 'click', 'hx.data-table', (e) ->
                      e.stopPropagation() # prevent collapsibles being toggled by tick selection in compact mode
                      selectRow(row, rowIndex, e.shiftKey)

                if options.collapsibleRenderer?
                  collapsibleControl = controlDiv.append('div')
                    .class('hx-data-table-collapsible-toggle')
                    .classed('hx-data-table-collapsible-disabled', not rowIsCollapsible)
                  collapsibleControl.append('i').class('hx-icon hx-icon-plus')

                if rowIsCollapsible
                  # restore open collapsibles on render
                  if @_.expandedRows.has(options.rowIDLookup(row)) then toggleCollapsible(tr, row, true)
                  collapsibleControl.on 'click', 'hx.data-table.collapse-row', (e) =>
                    currentVis = toggleCollapsible(tr, row)
                    @emit('expandedrowschange', {value: @_.expandedRows.values(), row: row, rowValue: currentVis, cause: 'user'})

              # populate the row
              for cell, columnIndex in rowToArray(headers, row)

                # Render the 'key' value using the headerCellRenderer
                keyDiv = hx.detached('div').class('hx-data-table-cell-key')
                getColumnOption('headerCellRenderer', headers[columnIndex].id)(keyDiv.node(), headers[columnIndex], headers)

                cellElem = tr.append('td').class('hx-data-table-cell')
                columnMaxWidth = getColumnOption('maxWidth', headers[columnIndex].id)
                if columnMaxWidth?
                  columnMaxWidth = parseInt(columnMaxWidth) + 'px'
                  cellElem
                    .style('max-width', columnMaxWidth)
                    .style('width', columnMaxWidth)
                    .style('min-width', columnMaxWidth)

                cellDiv = cellElem.add(keyDiv)
                  .append('div').class('hx-data-table-cell-value').node()
                getColumnOption('cellRenderer', headers[columnIndex].id)(cellDiv, cell, row)
          else # append the 'No Data' row.
            tbody.append('tr').class('hx-data-table-row-no-data').append('td').attr('colspan', fullWidthColSpan).text(options.noDataMessage)

          @updateSelected()

          # retain the horizontal scroll unless the page has been changed.
          # We only retain the horizontal scroll as when sorting/filtering on
          # the first page it retains the vertical scroll which looks weird.
          if @page() is @_.oldPage
            wrapperNode = selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node()
            scrollLeft = wrapperNode.scrollLeft if options.retainHorizontalScrollOnRender
            scrollTop = wrapperNode.scrollTop if options.retainVerticalScrollOnRender

          # store the old page - only used for retaining the scroll positions
          @_.oldPage = @page()

          # remove the old content div, and slot in the new one
          selection.select('.hx-data-table-content').insertAfter(container)
          selection.select('.hx-data-table-content').remove()
          selection.classed('hx-data-table-compact', ((options.compact is 'auto') and (selection.width() < collapseBreakPoint)) or (options.compact is true))

          # set up the sticky headers
          stickFirstColumn = options.selectEnabled or options.collapsibleRenderer?
          stickyOpts = {stickFirstColumn: stickFirstColumn and (filteredCount is undefined or filteredCount > 0), fullWidth: true}
          @_.stickyHeaders = new hx.StickyTableHeaders(container.node(), stickyOpts)

          # restore horizontal scroll position
          selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node().scrollLeft = scrollLeft if scrollLeft?
          selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node().scrollTop = scrollTop if scrollTop?

          # hide the loading spinner as we're done rendering
          selection.select('.hx-data-table-loading').style('display', 'none')

          @emit 'render'
          cb?()

    this


###
  Feeds

  A feed should be an object with the following functions:

  {
    headers: (cb) ->        # returns a list of header objects ({name, id})
    totalCount: (cb) ->     # returns the total number of rows in the data set
    rows: (range, cb) ->    # returns the row data for the range object specified (range = { start, end, filter, sort }) along with the filtered count
    rowsForIds: (ids, lookupRow, cb) ->  # returns the rows for the ids supplied
  }

  There are predefined feeds for objects and urls.

###

objectFeed = (data, options) ->
  lookupTerm = (term, rowSearchTerm) ->
    # What if we have multiple spaces ?
    arr = term.toLowerCase().split ' '
    validPart = hx.find arr, (part) -> ~rowSearchTerm.indexOf part
    hx.defined validPart


  options = hx.merge({
    filter: (term, row) ->
      rowSearchTerm = (v for k, v of row.cells).join(' ').toLowerCase()
      lookupTerm(term, rowSearchTerm)

    advancedSearch: (filters, row) ->
      rowSearchTerm = (v for k, v of row.cells).join(' ').toLowerCase()
      # if term is empty this will return false
      validFilters = hx.find filters, (groupedFilters) ->
        invalidFilter = hx.find groupedFilters, (filter) ->
          searchTerm = if filter.column is 'any' then rowSearchTerm else row.cells[filter.column].toLowerCase()
          # This requires the cell value to be a string...
          not lookupTerm filter.term, searchTerm
        not hx.defined invalidFilter
      hx.defined validFilters


    #XXX: should this be hx.sort.compare?
    #XXX: should this provide more information - like the column id being sorted on?
    compare: (c1, c2) -> if c1 > c2 then 1 else -1
  }, options)

  # cached values
  filtered = undefined
  filterCacheTerm = undefined
  sorted = undefined
  sortCacheTerm = {}
  rowsByIdMap = undefined

  {
    data: data # for debugging
    headers: (cb) -> cb(data.headers)
    totalCount: (cb) -> cb(data.rows.length)
    rows: (range, cb) ->

      if range.sort?.column isnt sortCacheTerm.column
        filtered = undefined

      if filtered is undefined or filterCacheTerm isnt range.filter
        filtered = if range.filter and range.filter.length > 0
          if hx.isArray(range.filter)
            data.rows.filter((row) -> options.advancedSearch(range.advancedSearch, row))
          else
            data.rows.filter((row) -> options.filter(range.filter, row))
        else
          data.rows.slice()
        filterCacheTerm = range.filter
        sorted = undefined

      if sorted is undefined or sortCacheTerm.column isnt range.sort?.column or sortCacheTerm.direction isnt range.sort?.direction
        sorted = if range.sort and range.sort.column
          direction = if range.sort.direction is 'asc' then 1 else -1
          column = range.sort.column
          filtered.sort (r1, r2) -> direction * options.compare(r1.cells[column], r2.cells[column])
          filtered.sort (r1, r2) -> direction * options.compare(r1.cells[column], r2.cells[column])
          filtered
        else filtered
        sortCacheTerm.column = range.sort?.column
        sortCacheTerm.direction = range.sort?.direction

      cb({rows: sorted[range.start..range.end], filteredCount: sorted.length})
    rowsForIds: (ids, lookupRow, cb) ->
      if rowsByIdMap is undefined
        rowsByIdMap = {}
        for row in data.rows
          rowsByIdMap[lookupRow(row)] = row
      cb(rowsByIdMap[id] for id in ids)
  }

urlFeed = (url, options) ->
  #XXX: when new calls come in, ignore the ongoing request if there is one / cancel the request if possible

  options = hx.merge({
    extra: undefined,
    cache: false
  }, options)

  # creates a function that might perform caching, depending on the options.cache value
  maybeCached = (fetcher) ->
    if options.cache
      value = undefined
      (cb) ->
        if value
          cb(value)
        else
          fetcher (res) ->
            value = res
            cb(value)
    else
      (cb) -> fetcher(cb)

  jsonCallback = (cb) ->
    (err, value) ->
      console.error(err) if err
      cb(value)

  {
    url: url # for debugging
    headers: maybeCached (cb) ->
      hx.json url, { type: 'headers', extra: options.extra }, jsonCallback(cb)
    totalCount: maybeCached (cb) ->
      hx.json url, { type: 'totalCount', extra: options.extra }, (err, res) ->
        jsonCallback(cb)(err, res.count)
    rows: (range, cb) ->
      hx.json url, { type: 'rows', range: range, extra: options.extra }, jsonCallback(cb)
    rowsForIds: (ids, lookupRow, cb) ->
      hx.json url, { type: 'rowsForIds', ids: ids, extra: options.extra }, jsonCallback(cb)
  }





hx.DataTable = DataTable

hx.dataTable = (options) ->
  selection = hx.detached('div')
  dataTable = new DataTable(selection.node(), options)
  if options and options.feed then dataTable.render()
  selection

hx.dataTable.objectFeed = objectFeed
hx.dataTable.urlFeed = urlFeed
