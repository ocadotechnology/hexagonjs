
import { isString } from 'utils/utils'

siSuffixes = ['y','z','a','f','p','n','µ','','','K','M','G','T','P','E','Z','Y']

zeroPad = (number, pad) ->
  str = number.toString()
  if str.length < pad
    zeros = pad - str.length
    ('0' for _ in [0..zeros-1]).join('') + str
  else str

precision = (n) -> if n then Math.floor(Math.log(Math.abs(n)) / Math.LN10) else 1

roundPrecision = (n, base, factor) ->
  # have to deal with the +ve and -ve cases separately so that numerical errors are less likely
  if factor >= 0
    Math.round(n / Math.pow(base, factor)) * Math.pow(base, factor)
  else
    Math.round(n * Math.pow(base, - factor)) / Math.pow(base, - factor)

# takes a number, and the number of significant numbers
formatRound = (n, sf) ->
  if isNaN(n) then return 'NaN'
  factor = precision(n) - sf + 1
  roundPrecision(n, 10, factor).toString()

formatSI = (n, sf) ->
  if isNaN(n) then return 'NaN'
  p = Math.min(precision(n), 26) # up to yotta is supported (hence the 26)

  suffix = siSuffixes[Math.min(Math.max(0, Math.floor(8 + p / 3)), 16)]

  # calculate the scaling factor to divide by, so that the number makes sense with its si suffix
  x = if Math.abs(n) < 1 and p % 3 and not ( -3 < p < 0) then 1000 else 1
  if p is -3
    x = 1000
    suffix = siSuffixes[6]
  siFactor = Math.pow(10, p - p % 3) / x

  formatRound(n / siFactor, sf) + suffix

formatExp = (n, sf) ->
  if isNaN(n) then return 'NaN'
  p = precision(n)
  formatRound(n / Math.pow(10, p), sf) + 'e' + p

formatFixed = (n, digits) ->
  if isNaN(n) then return 'NaN'
  n.toFixed(digits)

strictCheck = (f, sf, strict) ->
    if strict
      (n) -> f(n, sf)
    else
      (n) -> if isString(n) then n else f(n, sf)

# XXX [2.0.0] having factories instead of plain functions feels strange here - change to plain functions?
export format = {
  round: (sf, strict) -> strictCheck(formatRound, sf, strict),
  si: (sf, strict) -> strictCheck(formatSI, sf, strict),
  exp: (sf, strict) -> strictCheck(formatExp, sf, strict),
  fixed: (digits, strict) -> strictCheck(formatFixed, digits, strict),
  zeroPad: (length, strict) -> strictCheck(zeroPad, length, strict)
}
