import { isString } from 'utils/utils'

siSuffixes = ['y','z','a','f','p','n','µ','','','K','M','G','T','P','E','Z','Y']

formatZeroPad = (number, options) ->
  options.length ?= 2
  str = number.toString()
  if str.length < options.length
    zeros = options.length - str.length
    ('0' for _ in [0..zeros-1]).join('') + str
  else str

precision = (number) -> if number then Math.floor(Math.log(Math.abs(number)) / Math.LN10) else 0

roundPrecision = (number, base, factor) ->
  # have to deal with the +ve and -ve cases separately so that numerical errors are less likely
  if factor >= 0
    Math.round(number / Math.pow(base, factor)) * Math.pow(base, factor)
  else
    Math.round(number * Math.pow(base, - factor)) / Math.pow(base, - factor)

# takes a number, and the number of significant numbers
formatRound = (number, options) ->
  options.sf ?= 2
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
  mod = if p >= 0 then '+' else ''
  formatRound(number / Math.pow(10, p), options) + 'e' + mod + p

formatFixed = (number, options) ->
  options.digits ?= 2
  number.toFixed(options.digits)

strictCheck = (number, formatFn, options={}) ->
  if options.strict
    if isNaN(number) then 'NaN' else formatFn(number, options)
  else
    if isString(number) then number else formatFn(number, options)

round = (number, options) -> strictCheck(number, formatRound, options)
si = (number, options) -> strictCheck(number, formatSI, options)
exp = (number, options) -> strictCheck(number, formatExp, options)
fixed = (number, options) -> strictCheck(number, formatFixed, options)
zeroPad = (number, options) -> strictCheck(number, formatZeroPad, options)

export {
  exp,
  fixed,
  round,
  si,
  zeroPad,
}
