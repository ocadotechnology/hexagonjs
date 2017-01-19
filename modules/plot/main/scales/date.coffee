LinearScale = require('./linear')

module.exports = class DateScale extends LinearScale
  constructor: (@domainMin, @domainMax, @rangeMin, @rangeMax) ->
    super

  ticks: (targetSpacing) ->
    # stolen from D3 (with some extras added)
    timeSteps = [
      1,
      2,
      5,
      10,
      25,
      50,
      100,
      250,
      500,
      1e3,    # 1-second
      5e3,    # 5-seconds
      15e3,   # 15-seconds
      3e4,    # 30-seconds
      6e4,    # 1-minute
      3e5,    # 5-minutes
      9e5,    # 15-minutes
      18e5,   # 30-minutes
      36e5,   # 1-hour
      108e5,  # 3-hours
      216e5,  # 6-hours
      432e5,  # 12-hours
      864e5,  # 1-day
      1728e5, # 2-days
      6048e5, # 1-week
      2592e6, # 1-month
      7776e6, # 3-months
      31536e6 # 1-year
    ]

    domainSpan = @domainMax - @domainMin

    checkVal = (val) ->
      for step in timeSteps
        if val <= step
          return step
      return 1

    # the number of ticks wanted, based off of the target spacing - we may end up with a different number than this, depending on how things pan out
    targetCount = Math.abs(@rangeMax - @rangeMin) / targetSpacing
    niceDomainSpacing = Math.pow(10, Math.floor(Math.log(domainSpan / targetCount) / Math.LN10))

    # how far off are we from the target count? 1 means spot on, 2 means there were twice the amount expected
    error =  domainSpan / (targetCount * niceDomainSpacing)

    niceDomainSpacing *=
      if error >= 7.5 then 10
      else if error >= 3 then 5
      else if error >= 2 then 3
      else if error >= 1.25 then 2
      else if error >= 1.025 then 1.5
      else 1

    domainStart = Math.ceil(@domainMin / niceDomainSpacing) * niceDomainSpacing
    domainEnd = Math.floor(@domainMax / niceDomainSpacing) * niceDomainSpacing

    round = (val, ceil) ->
      if ceil
        Math.ceil(val / timeStep) * timeStep
      else
        Math.floor(val / timeStep) * timeStep

    timeStep = checkVal niceDomainSpacing

    niceDomainSpacing = round niceDomainSpacing, true

    domainStart = round domainStart

    if domainStart < @domainMin
      domainStart += niceDomainSpacing

    niceCount = (domainEnd - domainStart) / (niceDomainSpacing)

    for i in [0..niceCount]
      d = domainStart + i * niceDomainSpacing
      [d, @apply(d)]
