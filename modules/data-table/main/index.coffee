
fullWidthColSpan = 999 # the colspan used to make a cell display as an entire row
collapseBreakPoint = 480

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
      noDataMessage: 'No Data'
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
    }, options)

    selection = hx.select(selector).classed('hx-data-table', true)
    content = selection.append('div').class('hx-data-table-content')
    statusBar = selection.append('div').class('hx-data-table-status-bar')
    footer = selection.append('div').class('hx-data-table-footer')

    resolvedOptions.pageSize = Math.min resolvedOptions.pageSize, 1000

    onInput = hx.debounce 200, => @filter(filterInput.value(), undefined, 'user')

    filterInput = footer.append('input').class('hx-data-table-filter-control')
      .attr('placeholder', 'Search')
      .classed('hx-data-table-filter-visible', resolvedOptions.filterEnabled)
      .on 'input', 'hx.data-table', onInput

    # loading div
    selection.append('div').class('hx-data-table-loading')
      .append('div').class('hx-data-table-loading-inner')
        .append('div').class('hx-spinner')
        .insertAfter('span').text(' Loading')

    # Create the status bar text span and the clear button
    statusBar.append('span').class('hx-data-table-status-bar-text')
      .insertAfter('span').class('hx-data-table-status-bar-clear').text(' (clear selection)')
        .on 'click', 'hx.data-table', =>
          @_.selectedRows.clear()
          selection.select('.hx-data-table-content').selectAll('.hx-data-table-row-selected').classed('hx-data-table-row-selected', false)
          @updateSelected()
          @emit 'selectedrowsclear'

    # control panel / footer section

    # compact sort - always on the page, only visible in compact mode (so we can just change the class and everything will work)
    sortDiv = footer.append('div').class('hx-data-table-sort-control')
      .classed('hx-data-table-sort-visible', resolvedOptions.sortEnabled)
    sortDiv.append('span').text('Sort By: ')
    sortColPicker = new hx.Picker(sortDiv.append('button').class('hx-btn hx-btn-invisible').node())
    sortColPicker.on 'change', 'hx.data-table', (d) =>
      if d.cause is 'user' then @sort({column: sortColPicker.value().column, direction: sortColPicker.value().direction})

    # spacer to push other content to the right hand side of the footer
    footer.append('div').class('hx-data-table-footer-spacer')

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

    pageSizeContainer.append('span').text('Rows per page: ')

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
      sortColPicker: sortColPicker
      selectedRows: new hx.Set   # holds the ids of the selected rows
      expandedRows: new hx.Set
      renderedCollapsibles: {}
      compactState: (resolvedOptions.compact is 'auto' and selection.width() < collapseBreakPoint) or resolvedOptions.compact is true
    }

    # responsive page resize when compact is 'auto'
    selection.on 'resize', 'hx.data-table', =>
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
      if @singleSelection() and hx.isArray(value)
        value = [value[0]]
      @_.selectedRows = new hx.Set(value)
      @emit('selectedrowschange', {value: @_.selectedRows.values(), cause: 'api'})
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
    getColumnOption = (name, id) ->
      if options.columns isnt undefined and options.columns[id] isnt undefined and options.columns[id][name] isnt undefined
        options.columns[id][name]
      else
        options[name]

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

        feed.rows {start: start, end: end, sort: @sort(), filter: @filter()}, ({rows, filteredCount}) =>
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
              .items([{text: 'No Sort', value: undefined}].concat sortColumns)

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
              maxHeaderDepth = Math.max.apply(null, headers.filter((e) -> e.groups?).map((e) -> e.groups.length))

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
                  enabledRows = rows.filter (row) => options.rowEnabledLookup(row)
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
            rowDivs = tbody.selectAll('.hx-data-table-row').classed('hx-data-table-row-selected', false)
            checkBoxDivs = container.select('.hx-sticky-table-header-left').select('tbody').selectAll('.hx-data-table-row').classed('hx-data-table-row-selected', false)

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
              selection.select('.hx-data-table-status-bar').select('.hx-data-table-status-bar-text').text(@_.selectedRows.size + ' of ' + totalCount + ' selected.')

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
            if options.singleSelection and index isnt @_.lastSelected
              @_.selectedRows.clear()
            else
              # does the check for whether we're shift selecting and calls into selectMulti if we are
              if shiftDown and @_.lastSelected? and index isnt @_.lastSelected
                force = @_.selectedRows.has(options.rowIDLookup(rows[@_.lastSelected]))
                if index > @_.lastSelected then selectMulti(@_.lastSelected + 1, index, force)
                else selectMulti(index, @_.lastSelected, force)
                return

            @_.lastSelected = index

            if options.rowSelectableLookup(row)
              id = options.rowIDLookup(row)
              @_.selectedRows[if @_.selectedRows.has(id) then 'delete' else 'add'](id)
              @emit 'selectedrowschange', {row: row, rowValue: @_.selectedRows.has(id), value: @selectedRows(), cause: 'user'}
            @updateSelected()

          # Deal with collapsible rows
          buildCollapsible = =>
            contentRow = hx.detached('tr').class('hx-data-table-collapsible-content-row')
            hiddenRow = hx.detached('tr').class('hx-data-table-collapsible-row-spacer')

            # Add an empty cell so the sticky headers display correctly
            contentRow.append('td').class('hx-data-table-collapsible-cell hx-data-table-collapsible-cell-empty')

            # The div that the user will populate with the collapsibleRender function
            contentDiv = contentRow.append('td').class('hx-data-table-collapsible-cell')
              .attr('colspan',fullWidthColSpan)
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
                    checkbox.on 'click', 'hx.data-table', (e) =>
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
                getColumnOption('headerCellRenderer', headers[columnIndex])(keyDiv.node(), headers[columnIndex], headers)

                cellDiv = tr.append('td').class('hx-data-table-cell')
                  .add(keyDiv)
                  .append('div').class('hx-data-table-cell-value').node()
                getColumnOption('cellRenderer', headers[columnIndex].id)(cellDiv, cell, row)
          else # append the 'No Data' row.
            tbody.append('tr').class('hx-data-table-row-no-data').append('td').attr('colspan', fullWidthColSpan).text(options.noDataMessage)

          @updateSelected()

          # retain the horizontal scroll unless the page has been changed.
          # We only retain the horizontal scroll as when sorting/filtering on
          # the first page it retains the vertical scroll which looks weird.
          if @page() is @_.oldPage
            wrapperNode = selection.select('.hx-data-table-content .hx-sticky-table-wrapper').node()
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
          @_.stickyHeaders = new hx.StickyTableHeaders(container.node(), {stickFirstColumn: stickFirstColumn and (filteredCount is undefined or filteredCount > 0), fullWidth: true} )

          # restore horizontal scroll position
          selection.select('.hx-data-table-content .hx-sticky-table-wrapper').node().scrollLeft = scrollLeft if scrollLeft?
          selection.select('.hx-data-table-content .hx-sticky-table-wrapper').node().scrollTop = scrollTop if scrollTop?

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
  options = hx.merge({
    filter: (term, row) ->
      rowSearchTerm = (v for k, v of row.cells).join(' ').toLowerCase() # this bit can be cached for more speedy filters
      for part in term.toLowerCase().split(' ')
        if rowSearchTerm.indexOf(part) is -1 then return false
      return true
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
        filtered = if range.filter
          data.rows.filter((row) -> options.filter(range.filter, row))
        else data.rows.slice()
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

  {
    url: url # for debugging
    headers: maybeCached (r) -> hx.json(url, { type: 'headers', extra: options.extra }, r)
    totalCount: maybeCached (r) -> hx.json(url, { type: 'totalCount', extra: options.extra }, (res) -> r(res.count))
    rows: (range, cb) -> hx.json(url, { type: 'rows', range: range, extra: options.extra }, cb)
    rowsForIds: (ids, lookupRow, cb) -> hx.json(url, { type: 'rowsForIds', ids: ids, extra: options.extra }, cb)
  }





hx.DataTable = DataTable

hx.dataTable = (options) ->
  selection = hx.detached('div')
  new DataTable(selection.node(), options)
  selection

hx.dataTable.objectFeed = objectFeed
hx.dataTable.urlFeed = urlFeed