
siSuffixes = ['y','z','a','f','p','n','µ','','','K','M','G','T','P','E','Z','Y']

zeroPad = (number, { length }) ->
  str = number.toString()
  if str.length < length
    zeros = length - str.length
    ('0' for _ in [0..zeros-1]).join('') + str
  else str

precision = (number) -> if number then Math.floor(Math.log(Math.abs(number)) / Math.LN10) else 1

roundPrecision = (number, base, factor) ->
  # have to deal with the +ve and -ve cases separately so that numerical errors are less likely
  if factor >= 0
    Math.round(number / Math.pow(base, factor)) * Math.pow(base, factor)
  else
    Math.round(number * Math.pow(base, - factor)) / Math.pow(base, - factor)

# takes a number, and the number of significant numbers
formatRound = (number, options) ->
  factor = precision(number) - options.sf + 1
  roundPrecision(number, 10, factor).toString()

formatSI = (number, options) ->
  p = Math.min(precision(number), 26) # up to yotta is supported (hence the 26)

  suffix = siSuffixes[Math.min(Math.max(0, Math.floor(8 + p / 3)), 16)]

  # calculate the scaling factor to divide by, so that the number makes sense with its si suffix
  x = if Math.abs(number) < 1 and p % 3 and not ( -3 < p < 0) then 1000 else 1
  if p is -3
    x = 1000
    suffix = siSuffixes[6]
  siFactor = Math.pow(10, p - p % 3) / x

  formatRound(number / siFactor, options) + suffix

formatExp = (number, options) ->
  p = precision(number)
  formatRound(number / Math.pow(10, p), options) + 'e' + p

formatFixed = (number, options) -> number.toFixed(options.digits)

strictCheck = (number, formatFn, options) ->
  if options.strict
    if isNaN(number) then 'NaN' else formatFn(number, options)
  else
    if hx.isString(number) then number else formatFn(number, options)


hx.round = (number, options) -> strictCheck(number, formatRound, options)
hx.si = (number, options) -> strictCheck(number, formatSI, options)
hx.exp = (number, options) -> strictCheck(number, formatExp, options)
hx.fixed = (number, options) -> strictCheck(number, formatFixed, options)
hx.zeroPad = (number, options) -> strictCheck(number, zeroPad, options)


# XXX: Remove in 2.0.0 in favour of hx.round etc.
deprecatedWarning = (which) ->
  hx.deprecatedWarning("hx.format.#{which}: The formatter factory pattern is deprecated and will be removed in the next major release, please use hx.#{which}(number, options)")
hx.format =
  round: (sf, strict) ->
    deprecatedWarning('round')
    (number) -> hx.round(number, { strict, sf })
  si: (sf, strict) ->
    deprecatedWarning('si')
    (number) -> hx.si(number, { strict, sf })
  exp: (sf, strict) ->
    deprecatedWarning('exp')
    (number) -> hx.exp(number, { strict, sf })
  fixed: (digits, strict) ->
    deprecatedWarning('fixed')
    (number) -> hx.fixed(number, { digits, strict })
  zeroPad: (length, strict) ->
    deprecatedWarning('zeroPad')
    (number) -> hx.zeroPad(number, { length, strict })

