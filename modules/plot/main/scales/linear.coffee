
class LinearScale

  constructor: (@domainMin=0, @domainMax=10, @rangeMin=0, @rangeMax=10) ->
    den = (@domainMax - @domainMin)
    @factor = if den != 0 then (@rangeMax - @rangeMin) / den else 1

  apply: (v) -> @rangeMin + (v - @domainMin) * @factor

  inverse: (v) -> @domainMin + (v - @rangeMin) / @factor

  domain: (start, end) ->
    @domainMin = start
    @domainMax = end
    den = (@domainMax - @domainMin)
    @factor = if den != 0 then (@rangeMax - @rangeMin) / den else 1
    this

  range: (start, end) ->
    @rangeMin = start
    @rangeMax = end
    den = (@domainMax - @domainMin)
    @factor = if den != 0 then (@rangeMax - @rangeMin) / den else 1
    this

  ticks: (targetSpacing) ->

    domainSpan = @domainMax - @domainMin

    # the number of ticks wanted, based off of the target spacing - we may end up with a different number than this, depending on how things pan out
    targetCount = Math.abs(@rangeMax - @rangeMin) / targetSpacing
    niceDomainSpacing = Math.pow(10, Math.floor(Math.log(domainSpan / targetCount) / Math.LN10))

    # how far off are we from the target count? 1 means spot on, 2 means there were twice the amount expected
    error =  domainSpan / (targetCount * niceDomainSpacing)

    switch
      when error >= 7.5 then niceDomainSpacing *= 10
      when error >= 3 then niceDomainSpacing *= 5
      when error >= 1.25 then niceDomainSpacing *= 2

    domainStart = Math.ceil(@domainMin / niceDomainSpacing) * niceDomainSpacing
    domainEnd = (Math.floor(@domainMax / niceDomainSpacing) + .5) * niceDomainSpacing
    niceCount = (domainEnd - domainStart) / (niceDomainSpacing)

    for i in [0...niceCount]
      d = domainStart + i * niceDomainSpacing
      [d, @apply(d)]


export {
  LinearScale
}