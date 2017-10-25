
class DiscreteScale

  constructor: (@bandPadding=0.1) ->
    @domainCategories = []
    @rangeMin = 0
    @rangeMax = 10

  apply: (v) ->
    i = @domainCategories.indexOf(v)
    if i != -1
      @rangeMin + (i/ @domainCategories.length) * (@rangeMax - @rangeMin) + @tickOffset() + @tickWidth() / 2
    else undefined

  inverse: (v) ->
    i = Math.floor(((v - @tickOffset()) - @rangeMin) / (@rangeMax - @rangeMin) * @domainCategories.length)
    if 0 <= i < @domainCategories.length
      @domainCategories[i]
    else
      undefined

  domain: (categories) ->
    @domainCategories = categories
    this

  range: (start, end) ->
    @rangeMin = start
    @rangeMax = end
    this

  ticks: (targetSpacing=50) -> [c, @apply(c)] for c in @domainCategories

  tickWidth: -> (@rangeMax - @rangeMin) / (@domainCategories.length) * (1 - @bandPadding)

  tickOffset: -> (@rangeMax - @rangeMin) / (@domainCategories.length) * @bandPadding / 2

export {
  DiscreteScale
}