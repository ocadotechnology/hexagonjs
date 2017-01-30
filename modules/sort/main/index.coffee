# Intl.Collator isn't supported by safari
# https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
# using a collator is supposed to be faster than doing localeCompare
hasCollator = -> Intl?.Collator?

hx._.sort = {}

collatorFn = -> if hasCollator()
  new Intl.Collator(undefined, {numeric: true}).compare
else
  (a, b) ->
    if a is b then 0
    else if String(a) < String(b) then -1
    else 1

compare = (a, b) ->
  hx._.sort.collator ?= collatorFn()
  if a? and b? and not isNaN(Number(a)) and not isNaN(Number(b)) then a - b
  else hx._.sort.collator(a, b)

nullsLastCollator = (collator) -> (a, b) ->
  if a is b then 0
  else if a is undefined then 1
  else if b is undefined then -1
  else if a is null then 1
  else if b is null then -1
  else if not isNaN(Number(a)) and not isNaN(Number(b)) then a - b
  else collator(a, b)


compareNullsLast = (a, b) ->
  hx._.sort.collator ?= collatorFn()
  nullsLastCollator(hx._.sort.collator)(a, b)

localeCollatorFn = (locale, options) ->
  if hasCollator()
    new Intl.Collator(locale, options).compare
  else
    (a, b) -> String(a).localeCompare(String(b), locale, options)

# slower than compare but enforces locale comparison for browsers that
# dont support Intl.Collator.
localeCompare = (locale, options) ->
  options ?= {numeric: true}

  localeCollator = localeCollatorFn(locale, options)

  (a, b) ->
    if a? and b? and not isNaN(Number(a)) and not isNaN(Number(b)) then a - b
    else localeCollator(a, b)

localeCompareNullsLast = (locale, options) ->
  options ?= {numeric: true}

  localeCollator = localeCollatorFn(locale, options)
  nullsLastCollator(localeCollator)


hx.sortBy = (arr, f) ->
  newArr = [arr...]
  newArr.sort (left, right) ->
    fLeft = f left
    fRight = f right
    compare fLeft, fRight
  newArr

hx.sort = (arr) -> hx.sortBy arr, (x) -> x
hx.sort.compare = compare
hx.sort.compareNullsLast = compareNullsLast
hx.sort.localeCompare = localeCompare
hx.sort.localeCompareNullsLast = localeCompareNullsLast
