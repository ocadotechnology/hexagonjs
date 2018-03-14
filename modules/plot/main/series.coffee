import { EventEmitter } from 'event-emitter/main'
import { merge, isString, find, defined } from 'utils/main'
import { plotLabelStandard } from './labels'
import { optionSetterGetter, inefficientSearch } from './utils'

class Series extends EventEmitter

  defaultLabelValuesExtractor = (series, dataPoint, xAccessor, yAccessor, xProperty, yProperty) ->
    [
      {
        name: series.axis.x.title(),
        value: dataPoint[xProperty + 'Label'] or (if xAccessor then xAccessor(dataPoint) else dataPoint.x),
        formatter: series.labelFormatter(xProperty) or series.axis.x.formatter()
      },
      {
        name: series.axis.y.title(),
        value: dataPoint[yProperty + 'Label'] or (if yAccessor then yAccessor(dataPoint) else dataPoint.y),
        formatter: series.labelFormatter(yProperty) or series.axis.y.formatter()
      }
    ]

  constructor: (options) ->
    super()

    @_ = {
      options: merge({
        title: undefined,
        data: undefined,
        labelsEnabled: true,
        labelRenderer: plotLabelStandard,
        labelInterpolated: false,
        labelFormatters: {}
        class: ''
        type: undefined # used to determine which type of series we are dealing with,
        labelValuesExtractor: defaultLabelValuesExtractor
      }, options),
      featheredData: [],
      axis: undefined,
      seriesId: undefined
    }

    @_.options.data ?= []

  title: optionSetterGetter('title')
  data: optionSetterGetter('data')
  labelsEnabled: optionSetterGetter('labelsEnabled')
  labelRenderer: optionSetterGetter('labelRenderer')
  labelInterpolated: optionSetterGetter('labelInterpolated')
  labelValuesExtractor: optionSetterGetter('labelValuesExtractor')
  labelFormatter: (name, value) ->
    if arguments.length > 1
      @_.options.labelFormatters[name] = value
      this
    else
      @_.options.labelFormatters[name]

  class: optionSetterGetter('class')

  getX: (y) ->
    data = @data()
    if isString(y)
      d = find data, (d) -> d.y==y
      if defined(d) then d.x else undefined
    else
      i = inefficientSearch(data, y, true, (d) -> d.y)
      data[i].x

  getY: (x, isDiscrete) ->
    data = @data()
    if isString(x)
      d = find data, (d) -> d.x==x
      if defined(d) then d.y else undefined
    else
      i = inefficientSearch(data, x, false, (d) -> d.x)
      if 0 <= i < data.length-1
        x1 = data[i].x
        x2 = data[i+1].x
        y1 = data[i].y
        y2 = data[i+1].y
        y1+(y2-y1)*(x-x1)/(x2-x1)
      else
        if x > data[data.length-1].x
          if not isDiscrete then data[data.length-1].y
        else
          data[0].y


  # returns an array of label detail objects (often of length one)
  getLabelDetails: (x, y) ->
    # Implemented by the series type

  updateSvg: (element) ->
    # Implemented by the series type

  legendColor: ->
    # Implemented by the series type - should return a colour to use for the legend

export {
  Series
}
