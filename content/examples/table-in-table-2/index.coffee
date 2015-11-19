# Does all the work creating and rendering the child table(s)
renderNestedTable = (table, row, childData, nextLevelData) ->
  self = this
  elem = hx.select(row.node)

  # If the original table still exists, we want to make sure it is removed before continuing
  if @options.showOriginal and @visible
    @hide(-> renderNestedTable.call self, table, row, childData, nextLevelData)
    return

  @nestedTableContainer = @tableContainer.insertAfter('div')

  if not @options.showOriginal
    # Make a single row table without sorts/filters
    @subTableContainer = @nestedTableContainer.insertBefore('div')

    # The sub table should not have any modifers available so we extend the table options here.
    subTableOptions = hx.merge false, table.options, {
      showSorts: false
      showFilters: false
      showSelection: false
    }

    subTable = new hx.Table(@subTableContainer.node(), subTableOptions)

    # Construct a single-row dataset for the sub table
    rowData = {
      head: table._.header
      body: [row.data]
    }

    subTable.setData(rowData)

    subTable.on 'rowclick', ->
      self.hide()

    subTable.on 'render', ->
      # Highlight the rows on render
      newElem = self.subTableContainer.select('.hx-table-non-sticky')
      if newElem.classed('hx-table-mobile')
        newElem.select('tbody').class('hx-table-row-selected')
      else
        newElem.select('tbody').select('tr').class('hx-table-row-selected')
  else
    # If the selected row is clicked, we hide the nested content.
    if elem.classed('hx-table-row-selected')
      @hide()
      elem.classed('hx-table-row-selected', false)
      return
    else
      @tableContainer.selectAll('.hx-table-row-selected').classed('hx-table-row-selected', false)
      elem.class('hx-table-row-selected')

  # Create the nested table using the returned child data.
  nestedTable = new hx.Table(@nestedTableContainer.node(), table.options)
  nestedTable.setData(childData)

  # Use the parent options and override the data method
  subOptions = {}

  if nextLevelData?
    subOptions.childData = nextLevelData

  subOptions = hx.merge(false, @options, subOptions)

  @nested = new NestedTable(nestedTable, subOptions)

  # Increment the level for the nested table.
  @nested.level = @level + 1

  @nested.pipe this

  # When the nested table is rendered, we call the show function, only when it
  # needs to be shown.
  nestedTable.on 'render', 'nestedTableRenderInner', ->
    if not self.options.showOriginal or self.origView is table._.useMobileView
      showNestedTable.call self

showNestedTable = ->
  self = this
  if not @visible and not @forceClose
    if @options.animate
      if not @options.showOriginal
        @tableContainer.morph().with('fadeout').and('collapsev').go(true)
        @subTableContainer?.style('opacity',0).morph().with('fadein').go(true)
      @nestedTableContainer.style('height',0).style('opacity',0).morph().with('expandv').and('fadein')
      .then(-> self.emit 'show', self.level)
      .go(true)
    else
      if not @options.showOriginal
        @tableContainer.style('display', 'none')
      @emit 'show', @level
    @visible = true
  return

hideNestedTable = (cb) ->
  self = this

  # Forces the nested table to start at the bottom level and work it's way up.
  if @nested?.nested?
    @nested.subHide = true
    @nested.hide(-> self.hide(cb))
    return

  done = =>
    @subHide = false
    @nested = undefined
    @emit 'hide', @level
    cb?()

  if @visible
    @visible = false
    if @options.animate
      if not @options.showOriginal
        if not @subHide
          @tableContainer.morph().with('fadein').and('expandv').go(true)
        @subTableContainer.morph().with('fadeout').then(-> self.subTableContainer.remove()).go(true)

      @nestedTableContainer
        .morph()
        .with('fadeout')
        .and('collapsev')
        .then(-> self.nestedTableContainer.remove())
        .then(-> done())
        .go(true)
    else
      if not @options.showOriginal
        if not @subHide
          @tableContainer.style('display', '')
        @subTableContainer.remove()
      @nestedTableContainer.remove()
      done()
  return


# Class for creating a nested table.
class NestedTable extends hx.EventEmitter
  # Constructor takes a hx.Table object, not a node or selection
  constructor: (table, options) ->
    super
    self = this

    @tableContainer = table._.container

    @options = hx.merge false, {
      animate: true # Whether or not to animate the open/close
      childData: (row, cb) -> undefined # The function to get the data for the next level
      showOriginal: false # Whether to show the original table when selecting
    }, options

    @level = 0 # The level of the current nested table
    @visible = false # Whether or not the nested content is visible

    table.on 'rowclick', 'nestedTableRowClick', (row) =>
      # Get the data based on the row data and level. The options of child tables will be inherited.
      @options.childData? row.data, @level, (childData, nextLevelData) ->
        # Only render if data is returned.
        if childData then renderNestedTable.call self, table, row, childData, nextLevelData

    if @options.showOriginal
      # Store the view mode - lets us prevent function calls when switching between mobile/desktop views in responsive mode.
      @origView = table._.useMobileView

      # Hide content when sorting/filtering the origial table (as selected row will disappear)
      table.on 'render', 'nestedTableRenderOuter', ->
        self.hide ->
          self.origView = table._.useMobileView

  hide: (cb) ->
    hideNestedTable.call this, cb
    this





# Level 0 data
data = {
  "head":{
    "columns":[
      { "value":"Name"},
      { "value":"Age" },
      { "value":"Gender" },
      { "value":"Date of Birth" },
      { "value":"Salary (£)" },
      { "value":"Locale" }
    ]
  },
  "body":[
    {
      columns: [
        "Bob",
        "23",
        "Male",
        "1970-01-01",
        "20001",
        "UK"
      ]
    },{
      columns: [
        "Steve",
        "21",
        "Male",
        "1999-10-12",
        "19000",
        "US"
      ]
    },{
      columns: [
        "Kate",
        "23",
        "Female",
        "2001-05-16",
        "100000",
        "AU"
      ]
    }
  ]
}


# Method one of getting the data for each level. The function for getting the data for the next level is passed into the callback
getLevel1 = (row, level, cb) ->
  data = {
      head: {
        columns: [
          {value: "County" }
          {value: "D1"}
          {value: "D2"}
          {value: "D3"}
        ]
      }
      body: [
        [
          'London'
          'Row 1 Cell 2'
          'Row 1 Cell 3'
          'Row 1 Cell 4'
        ]
        [
          'Hertfordshire'
          'Row 2 Cell 2'
          'Row 2 Cell 3'
          'Row 2 Cell 4'
        ]
        [
          'Hertfordshire'
          'Row 3 Cell 2'
          'Row 3 Cell 3'
          'Row 3 Cell 4'
        ]
      ]
    }
  cb data, getLevel2

getLevel2 = (row, level, cb) ->
  data = {
      head: {
        columns: [
          {value: "D1"}
          {value: "D2"}
          {value: "D3"}
        ]
      }
      body: [
        [
          'Sub Row 1 Cell 1'
          'Sub Row 1 Cell 2'
          'Sub Row 1 Cell 3'
        ]
        [
          'Sub Row 2 Cell 1'
          'Sub Row 2 Cell 2'
          'Sub Row 2 Cell 3'
        ]
        [
          'Sub Row 3 Cell 1'
          'Sub Row 3 Cell 2'
          'Sub Row 3 Cell 3'
        ]
      ]
    }
  cb data, getLevel3

getLevel3 = (row, level, cb) ->
  data = {
      head: {
        columns: [
          {value: "Data"}
        ]
      }
      body: [
      ]
    }
  cb data


table1 = new hx.Table('#table1')
table1.setData(data)

new NestedTable(table1, {
  animate: false
  childData: getLevel1
})


# Method two for getting the data for each level. The level parameter is used to determine which data to use.
getChildren = (row, level, cb) ->
  data = if level is 0
    {
      head: {
        columns: [
          {value: "County" }
          {value: "D1"}
          {value: "D2"}
          {value: "D3"}
        ]
      }
      body: [
        [
          'London'
          row.columns[0]
          'Row 1 Cell 3'
          'Row 1 Cell 4'
        ]
        [
          'Hertfordshire'
          'Row 2 Cell 2'
          'Row 2 Cell 3'
          'Row 2 Cell 4'
        ]
        [
          'Hertfordshire'
          'Row 3 Cell 2'
          'Row 3 Cell 3'
          'Row 3 Cell 4'
        ]
      ]
    }
  else if level is 1
    {
      head: {
        columns: [
          {value: "D1"}
          {value: "D2"}
          {value: "D3"}
        ]
      }
      body: [
        [
          'Sub Row 1 Cell 1'
          row[0]
          'Sub Row 1 Cell 3'
        ]
        [
          'Sub Row 2 Cell 1'
          'Sub Row 2 Cell 2'
          'Sub Row 2 Cell 3'
        ]
        [
          'Sub Row 3 Cell 1'
          'Sub Row 3 Cell 2'
          'Sub Row 3 Cell 3'
        ]
      ]
    }
  else if level is 2
    {
      head: {
        columns: [
          {value: "Data"}
        ]
      }
      body: [
      ]
    }
  cb(data)

table2 = new hx.Table('#table2')
table2.setData(data)

nested = new NestedTable(table2, {
  animate: true
  showOriginal: true
  childData: getChildren
})

nested.on 'show', (level) -> console.log 'show', level
nested.on 'hide', (level) -> console.log 'hide', level