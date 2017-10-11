import { clamp } from 'utils/main'
import { color } from 'color/main'

class ColorScale
  setFactor = (dMin, dMax, rMin, rMax) ->
    den = (dMax - dMin)
    if den != 0 then (rMax - rMin)/den else 1

  constructor: (@domainMin=0, @domainMax=10, @rangeArr) ->
    @rangeArr = @rangeArr.sort((a, b) -> a.val - b.val)
    @rangeMin = @rangeArr[0].val
    @rangeMax = @rangeArr[@rangeArr.length-1].val
    @factor = setFactor(@domainMin, @domainMax, @rangeMin, @rangeMax)

  apply: (v) ->
    m = @rangeMin + (v - @domainMin) * @factor
    switch
      when m < @rangeMin
        col = @rangeArr[0].color
      when m > @rangeMax
        col = @rangeArr[@rangeArr.length-1].color
      else
        for i in [0...(@rangeArr.length-1)] by 1
          if (m >= @rangeArr[i].val) and (m <= @rangeArr[i+1].val)
            point = (i+1)
            break
        mDiff = m - @rangeArr[point-1].val
        pointDiff = @rangeArr[point].val - @rangeArr[point-1].val
        percentage = utils.clamp(0, 1, mDiff / pointDiff)
        col = color(@rangeArr[point-1].color).mix(color(@rangeArr[point].color), percentage)
    col.toString()

  domain: (start, end) ->
    @domainMin = start
    @domainMax = end
    @factor = setFactor(@domainMin, @domainMax, @rangeMin, @rangeMax)
    this

  range: (range) ->
    @rangeArr = range
    @factor = setFactor(@domainMin, @domainMax, @rangeMin, @rangeMax)
    this

export {
  ColorScale
}
