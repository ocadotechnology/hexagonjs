import { compare } from 'sort/main'
import { startsWith, mergeDefined } from 'utils/main'

filterCaseModifier = (caseSensitive) ->
  if caseSensitive then (string) -> string
  else (string) -> string.toLowerCase()

filterMatch = (item, getIndex, options) ->
  val = 0
  isMatch = false
  # If we've defined 'searchValues', use it to build a combined index
  if options.searchValues?
    for e in options.searchValues(item)
      val += options.lookup(options.caseModifier(e.toString()))
      # This is set in case there are mulitple non-matching items in e that
      # cause val to be negative
      if val > -1 then isMatch = true
  else
    val += options.lookup(options.caseModifier(item.toString()))

  # getIndex passed in as false when filtering we only care about whether there
  # is a match.
  # It's passed in as true when sorting to let us sort on the strength of the
  # match.
  if getIndex is true then val
  else if isMatch or val > -1 then true
  else false

buildFilter = (lookupType) ->
  (array, term, opts = {}) ->

    options = mergeDefined {
      caseSensitive: false
      searchValues: undefined
      sort: true
    }, opts

    # set the case modifier - we add it to options so we can easily pass to
    # filterMatch. We set this once to reduce the amount of checking we need
    # to do.
    options.caseModifier = filterCaseModifier options.caseSensitive

    if typeof term is 'string'
      term = options.caseModifier term

    options.lookup = lookupType(term)

    array = array.filter (d) -> filterMatch d, false, options

    if options.sort is true
      array = array.sort (a, b) ->
        aI = filterMatch a, true, options
        bI = filterMatch b, true, options
        if aI > bI then 1
        else if aI < bI then -1
        # If the strength for both matches is equal, we compare the strings
        # instead.
        else if options.searchValues?
          r = 0
          aArr = options.searchValues a
          bArr = options.searchValues b
          for i in [0...aArr.length] by 1
            r = compare(aArr[i], bArr[i])
            # If the two terms dont match (and there is one better than the
            # other) then we use that value, else we keep moving down the
            # properties until we find something that can be compared.
            if r isnt 0 then break
          r
        else compare(a, b)

    # return the filtered/sorted array
    array


# All filter lookup functions should return the index + the length of
# the term within the item, allowing us to sort based on the strength
# of the match.
filterExact = buildFilter (term) ->
  (item) -> if item is term then term.length else -1

filterStartsWith = buildFilter (term) ->
  (item) -> if startsWith(item, term) then term.length else -1

filterContains = buildFilter (term) ->
  (item) ->
    index = item.indexOf(term)
    if index > -1 then index + term.length else -1

filterExcludes = buildFilter (term) ->
  (item) ->
    index = item.indexOf(term)
    if index is -1 then term.length else -1

filterGreater = buildFilter (term) ->
  (item) ->
    val = compare(item, term)
    if val isnt -1 then val else -1

filterLess = buildFilter (term) ->
  (item) ->
    val = compare(term, item)
    if val isnt -1 then val else -1

filterFuzzy = buildFilter (term) ->
  escapeRegExp = (str) -> str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
  regStr = '(' + term.split('').map(escapeRegExp).join(').*?(') + ').*?'
  pattern = new RegExp(regStr)
  (item) ->
    match = item.match(pattern)
    if match? then match.index + match[0].length else -1

filterRegex = buildFilter (term) ->
  (item) ->
    match = item.match(term)
    if match? then match.index + match[0].length else -1

filterStringTypes = () -> [
  'contains',
  'exact'
  'excludes',
  'startsWith'
  'regex',
  'fuzzy'
]

filterNumberTypes = () -> [
  'exact',
  'greater',
  'less'
]

filterTypes = () -> [
  'contains',
  'exact'
  'greater',
  'less',
  'excludes',
  'startsWith'
  'regex',
  'fuzzy'
]

export {
  filterExact,
  filterStartsWith,
  filterContains,
  filterExcludes,
  filterGreater,
  filterLess,
  filterFuzzy,
  filterRegex,
  filterStringTypes,
  filterNumberTypes,
  filterTypes
}
