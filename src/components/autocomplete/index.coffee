import { userFacingText } from 'utils/user-facing-text'
import { sort } from 'utils/sort'
import { EventEmitter } from 'utils/event-emitter'
import { Map as HMap } from 'utils/map'
import * as filter from 'utils/filter'
import { select, detached, div } from 'utils/selection'
import { groupBy, isFunction, isArray, merge } from 'utils/utils'
import logger from 'utils/logger'

import { Menu } from 'components/menu'

userFacingText({
  autocomplete: {
    loading: 'Loading...',
    noResultsFound: 'No results found',
    otherResults: 'Other Results',
    pleaseEnterMinCharacters: 'Please enter $minLength or more characters',
    minCharacters: 'Min length $minLength characters',
  }
})

sortActive = (items) ->
  groupedActive = new HMap(groupBy(items, (i) -> not i.disabled))
  active = groupedActive.get(true) || []
  inactive = groupedActive.get(false) || []
  { active, inactive }


# Force match is used when closing the dd and options.mustMatch is true
# It checks if the term is exactly a term in the data and should only
# be called when the menu is hidden.
findTerm = (term, forceMatch) ->
  self = this
  _ = @_

  _.prevTerm ?= ''

  # Should use previous data as the user types more characters to reduce the
  # amount of filtering/sorting required
  allData = _.data.get(term)

  # if the term length is less than the previous term length then the data is
  # irrelevant
  if term.length >= _.prevTerm.length
    allData ?= _.data.get(_.prevTerm)

  # if we haven't got cached data for the current or previous term we get all
  # the data
  allData ?= _.data.get('')

  _.prevTerm = term

  filteredData = if @options.matchType is 'external' then allData
  else if term.length is 0 and !@options.showAll then []
  else @options.filter allData, term

  # checks if all the data and the filtered data are the same. If they are, we
  # don't need to show any other results
  dataMatches = allData.length is filteredData.length and allData.length > 0

  # Adds 'Other Data' heading and shows the data that was filtered out under it
  if @options.showOtherResults and !forceMatch and !dataMatches

    matches = if filteredData.length > 0
      filteredData
    else
      [{unselectable:true, text:self.options.noResultsMessage}]

    # find values that are in the original data but not in the filtered data
    heading = {unselectable:true, heading: true, text: self.options.otherResultsMessage}

    remainingResults =
      if filteredData.length is 0
        allData
      else
        data = allData.filter (d) -> not filteredData.some((e) -> e is d)
        if not @options.filterOptions.sort? or @options.filterOptions.sort
          if @options.inputMap?
            data.sort (a,b) ->
              sort.compare(
                self.options.inputMap(a),
                self.options.inputMap(b)
              )
          else
            data.sort(sort.compare)
        data

    { active, inactive } = sortActive(remainingResults)
    filteredData = [matches..., heading, active..., inactive...]

  filteredData


buildAutocomplete = (searchTerm, fromCallback, loading) ->
  # 'this' in this context is the autocomplete object, passed to callback
  self = this
  _ = @_

  # we get in here if callback is defined and we haven't tried to call it
  if _.callback? and !fromCallback
    if searchTerm.length < @options.minLength or (not @options.showAll and searchTerm.length is 0)
      _.data.set(searchTerm, [])
      buildAutocomplete.call self, searchTerm ,true
    else
      # call the autocomplete to show the loading message
      buildAutocomplete.call self, searchTerm, true, true

      _.currentSearch = searchTerm

      # check for the data in the cache before trying to load a new set
      if not _.data.get(searchTerm)
        # set the value to true to prevent errors caused by filtering undefined
        _.data.set(searchTerm, true)
        _.callback.call self, searchTerm, (returnData) ->
          # cleanUp prevents calling the callback when the user has changed focus
          if not _.cleanUp
            # store the returned data
            _.data.set(searchTerm, returnData)

            # check that the  Prevents calls that take a long time conflicting
            # when they return in a different order than they were called in.
            if _.currentSearch is searchTerm
              buildAutocomplete.call self, searchTerm, true
      else
        buildAutocomplete.call self, searchTerm, true
  else
    _.menu.cursorPos = -1

    # loading is true when we're waiting for a callback to return data
    filteredData = if not loading
      if @options.matchType is 'external'
        _.data.get(searchTerm)
      else
        findTerm.call self, searchTerm
    else
      undefined

    message =
      unselectable: true
      text: ''

    _.menu.items([])

    items = []

    trimAndReload = false
    if not filteredData?
      message.text = @options.loadingMessage
    else if searchTerm.length < @options.minLength
      message.text = userFacingText.format(@options.pleaseEnterMinCharactersMessage, { minLength: @options.minLength })
    else if (searchTerm.length > 0 or @options.showAll) and filteredData.length is 0
      if @options.trimTrailingSpaces and _.input.value().lastIndexOf(' ') is _.input.value().length - 1
        trimAndReload = true
      else if @options.noResultsMessage.length > 0 and @options.noResultsMessage?
        message.text = @options.noResultsMessage
    else if searchTerm.length >= @options.minLength and filteredData.length > 0
      items = items.concat filteredData

    # add the message if the text was set in the previous step
    if message.text.length > 0
      items = [message].concat items

    # show the dropdown if there are items, or update it if it's already visible
    if items.length > 0
      _.menu.items(items)
      if _.menu.dropdown.isOpen()
        # XXX Breaking: Render
        # _.menu.dropdown.render()
        _.menu.dropdown._.setupDropdown _.menu.dropdown._.dropdown.node()
      else
        _.menu.dropdown.show()
    else # Hide the dropdown as there are no items
      _.menu.hide()

    if trimAndReload
      _.input.value(_.input.value().substring(0, _.input.value().length - 1))
      buildAutocomplete.call self, _.input.value(), fromCallback, loading
  undefined

showAutocomplete = ->
  @_.cleanUp = false
  buildAutocomplete.call this, @_.input.value() or ''


class Autocomplete extends EventEmitter
  constructor: (@selector, @data, opts = {}) ->
    super()

    # do a sanity check on the data
    if not isArray(@data) and not isFunction(@data)
      logger.warn(
        'Autocomplete - ', @selector, ': data set incorrectly - you supplied: ', @data,
        ' but should have been an array of items or a function'
      )
    else
      @options = merge({
        minLength: 0
        showAll: true
        trimTrailingSpaces: false
        mustMatch: false
        inputMap: undefined
        renderer: undefined
        matchType: 'contains'
        placeholder: undefined
        filter: undefined
        filterOptions: undefined
        showOtherResults: false
        allowTabCompletion: true
        value: undefined

        # XXX Breaking: Text keys (autoComplete -> autocomplete)
        loadingMessage: userFacingText('autoComplete', 'loading')
        noResultsMessage: userFacingText('autoComplete', 'noResultsFound')
        otherResultsMessage: userFacingText('autoComplete', 'otherResults')
        pleaseEnterMinCharactersMessage: userFacingText('autoComplete', 'pleaseEnterMinCharacters', true)
        minCharactersMessage: userFacingText('autoComplete', 'minCharacters', true)
      }, opts)


      @_ = _ = {}
      _.ignoreMatch = false
      _.ignoreNextFocus = false
      self = this

      # create the data cache for storing the datasets based on their search term
      _.data = new HMap()

      if isFunction @data
        _.callback = @data
      else
        _.data.set('', @data)

      if @options.inputMap?
        # default searchValue if inputMap is defined
        _filterOpts =
          searchValues: (d) -> [self.options.inputMap(d)]

      @options.filterOptions = merge({}, _filterOpts, opts.filterOptions)

      @options.filter ?= (arr, term) =>
        # XXX: this feels hacky. Maybe the api should be simplified for autocomplete?
        filterName = 'filter' + self.options.matchType[0].toUpperCase() + self.options.matchType.slice(1)
        filtered = filter[filterName](arr, term, self.options.filterOptions)
        { active, inactive } = sortActive(filtered)
        [active..., inactive...]

      # create renderer based on inputMap
      # XXX Breaking: Renderer
      @options.renderer ?= if @options.inputMap?
        # (item) -> div().text(self.options.inputMap(item))
        (elem, item) -> select(elem).text(self.options.inputMap(item))
      else
        # (item) -> div().text(item.text or item)
        (elem, item) -> select(elem).text(item)

      @options.placeholder ?= if @options.minLength > 0
        userFacingText.format(@options.minCharactersMessage, { minLength: @options.minLength })

      input = select(@selector)
        .api('autocomplete', this)
        .api(this)

      menu = new Menu(@selector, {dropdownOptions: {ddClass: 'hx-autocomplete-dropdown'}})

      menu.pipe(this, '', ['highlight'])
      menu.dropdown.pipe(this, 'dropdown')

      select(@selector).off('click', 'hx.menu')
      menu.on 'input', 'hx.autocomplete', (e) ->
        if self.options.allowTabCompletion
          if (e.which or e.keyCode) == 9
            e.preventDefault()

      # set properties and functions for input
      _.setInputValue = if @options.inputMap?
        (d='') ->
          input.value(self.options.inputMap(d))
          self.emit 'change', d
      else
        (d='') ->
          input.value(d)
          self.emit 'change', d

      if @options.placeholder?
        input.attr 'placeholder', @options.placeholder

      # focus is here for when user tabs to input box
      input.on 'focus', 'hx.autocomplete', (e) ->
        if not _.ignoreNextFocus
          _.cleanUp = false
          self.show()

      # prevent callback when user has tabbed out of input box
      input.on 'blur', 'hx.autocomplete', (e) ->
        if e.relatedTarget?
          self.hide()
        _.ignoreNextFocus = false

      timeout = undefined
      input.on 'input', 'hx.autocomplete', ->
        _.cleanUp = false
        clearTimeout(timeout)
        _.initialValue = input.value()
        timeout = setTimeout( ->
          if input.value() isnt _.prevTerm
            buildAutocomplete.call self, input.value() or ''
        , 200)

      # set properties and functions for menu
      # XXX Breaking: Renderer
      # menu.renderer (elem, item) ->
      #   return this.options.renderer(item)
      #     .classed('hx-autocomplete-item-unselectable', item.unselectable or item.heading)

      menu.renderer (elem, item) ->
        # if the item is a unselectable item or a heading, we use a set renderer
        # and ignore the passed in renderer
        selection = select(elem)
        selection.style('font-weight','')
        if item.unselectable or item.heading
          selection
            .text(item.text)
            .off()
          if item.heading
            selection.style('font-weight','600')
        else
          self.options.renderer(elem, item)

      # called when a menu item is selected. Updates the input field when using
      # the arrow keys.
      menu.on 'change', 'hx.autocomplete', (d) ->
        content = d?.content
        if content?
          if !content?.unselectable and !content?.heading and !content?.disabled
            if d.eventType is 'tab'
              if self.options.allowTabCompletion
                _.setInputValue content
                _.ignoreMatch = true
                self.hide()
            else if menu.cursorPos is -1 and _.initialValue?
              input.value(_.initialValue)
            else
              _.setInputValue content

              if d.eventType is 'click' or d.eventType is 'enter'
                _.ignoreMatch = true
                self.hide()
                _.ignoreNextFocus = true
        else if d.eventType is 'enter'
          _.ignoreMatch = false
          self.hide()
          _.ignoreNextFocus = true

      _.checkValidity = ->
        _.cleanUp = true
        if not _.ignoreMatch
          if self.options.mustMatch
            if input.value().length > 0
              exactMatch = if self.options.matchType is 'external'
                _.data.get(input.value())
              else
                if _.data.get(input.value()) is true
                  setTimeout(_.checkValidity, 5)
                else
                  findTerm.call self, input.value(), true
              if exactMatch isnt true and exactMatch?.length > 0
                exactMatch = exactMatch?.filter (e) ->
                  e = if self.options.inputMap? then self.options.inputMap(e) else e
                  e.toLowerCase() is input.value().toLowerCase()
                if exactMatch?.length > 0
                  _.setInputValue exactMatch[0]
                else
                  input.value('')
              else
                input.value('')
        _.ignoreMatch = false
        self.clearCache()
        self.emit 'hide', input.value()


      menu.on 'dropdown.change', 'hx.autocomplete', (visible) ->
        if !!visible
          _.initialValue = input.value()
          menu.dropdown._.useScroll = true
        else
          _.checkValidity()
          return

      menu.on 'click', 'hx.autocomplete', ->
        _.ignoreMatch = true

      _.menu = menu
      _.input = input

      if @options.value
        @value(@options.value)


  clearCache: ->
    @_.data = new HMap()
    if @data? and not isFunction @data
      @_.data.set('', @data)
    this

  show: ->
    @_.ignoreNextFocus = false
    showAutocomplete.call(this)
    this

  value: (value) ->
    if arguments.length > 0
      @_.setInputValue value
      @_.checkValidity()
      this
    else
      @_.input.value()

  hide: ->
    _ = @_
    _.ignoreNextFocus = false
    if _.menu.dropdown.isOpen()
      _.menu.hide()
      _.prevTerm = undefined
      _.cleanUp = true
    this

autocomplete = (data, options) ->
  selection = detached('input')
  new Autocomplete(selection, data, options)
  selection

export {
  autocomplete,
  Autocomplete
}
