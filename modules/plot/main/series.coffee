EventEmitter = require('modules/event-emitter/main')
labels = require('./labels')
utils = require('modules/util/main/utils')

graphutils = require('./utils')

module.exports = class Series extends EventEmitter

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
    super

    @_ = {
      options: utils.merge({
        title: undefined,
        data: undefined,
        labelsEnabled: true,
        labelRenderer: labels.standard,
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

  title: graphutils.optionSetterGetter('title')
  data: graphutils.optionSetterGetter('data')
  labelsEnabled: graphutils.optionSetterGetter('labelsEnabled')
  labelRenderer: graphutils.optionSetterGetter('labelRenderer')
  labelInterpolated: graphutils.optionSetterGetter('labelInterpolated')
  labelValuesExtractor: graphutils.optionSetterGetter('labelValuesExtractor')
  labelFormatter: (name, value) ->
    if arguments.length > 1
      @_.options.labelFormatters[name] = value
      this
    else
      @_.options.labelFormatters[name]

  class: graphutils.optionSetterGetter('class')

  getX: (y) ->
    data = @data()
    if utils.isString(y)
      d = utils.find data, (d) -> d.y==y
      if utils.defined(d) then d.x else undefined
    else
      i = inefficientSearch(data, y, true, (d) -> d.y)
      data[i].x

  getY: (x, isDiscrete) ->
    data = @data()
    if utils.isString(x)
      d = utils.find data, (d) -> d.x==x
      if utils.defined(d) then d.y else undefined
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
