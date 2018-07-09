import { mergeDefined } from 'utils'

# Intl.Collator isn't supported by safari
# https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
# using a collator is supposed to be faster than doing localeCompare
hasCollator = -> Intl?.Collator?

state = {}

collatorFn = -> if hasCollator()
  new Intl.Collator(undefined, {numeric: true}).compare
else
  (a, b) ->
    if a is b then 0
    else if String(a) < String(b) then -1
    else 1

nullsLastCollator = (collator) -> (a, b) ->
  if a is b then 0
  else if a is undefined then 1
  else if b is undefined then -1
  else if a is null then 1
  else if b is null then -1
  else if not isNaN(Number(a)) and not isNaN(Number(b)) then a - b
  else collator(a, b)

defaultCollator = (collator) -> (a, b) ->
  if a? and b? and not isNaN(Number(a)) and not isNaN(Number(b)) then a - b
  else collator(a, b)

compare = (a, b) ->
  state.collator ?= collatorFn()
  defaultCollator(state.collator)(a, b)

compareNullsLast = (a, b) ->
  state.collator ?= collatorFn()
  nullsLastCollator(state.collator)(a, b)

localeCollatorFn = (locale, options) ->
  if hasCollator()
    new Intl.Collator(locale, options).compare
  else
    (a, b) -> String(a).localeCompare(String(b), locale, options)

# slower than compare but enforces locale comparison for browsers that
# dont support Intl.Collator.
localeCompare = (locale, options) ->
  options = mergeDefined({
    numeric: true
  }, options)

  localeCollator = localeCollatorFn(locale, options)

  if options.nullsLast
    nullsLastCollator(localeCollator)
  else
    defaultCollator(localeCollator)

sortBy = (arr, f) ->
  newArr = [arr...]
  newArr.sort (left, right) ->
    fLeft = f left
    fRight = f right
    compare fLeft, fRight
  newArr

sort = (arr) -> sortBy(arr, (x) -> x)


export {
  state,
  compare,
  compareNullsLast,
  localeCompare,
  sortBy,
  sort
}
