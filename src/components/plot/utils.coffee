import { select } from 'utils/selection'
import { color } from 'utils/color'
import { find, min, max, clamp, randomId, isFunction } from 'utils/utils'

doCollisionDetection = (nodesRaw) ->
  nodes = nodesRaw.map (node, index) ->
    { node, index, box: node.getBoundingClientRect() }
  reductor = (oldDistance, { index: currentIndex, box: currBox }) ->
    previousNodes = nodes.slice(0, (currentIndex - oldDistance + 1))
    tuple = find previousNodes, ({ index: previousIndex, box: prevBox }) ->
      currBox.left < prevBox.right
    if tuple then currentIndex - tuple.index else oldDistance
  distance = nodes.reduce reductor, 1
  nodes.forEach ({ node, index: currentIndex }) ->
    if currentIndex % (distance + 1)
      select(node).text('')

# encodes the data into an svg path string
svgCurve = (data, close) ->
  if data.length > 1
    #OPTIM: it might actually be faster to do standard string concatination here. need to test...
    segments = new Array(data.length)
    segments[0] = 'M' + data[0].x + ',' + data[0].y
    l = data.length-1
    for i in [1..l]
      segments[i] = 'L' + data[i].x + ',' + data[i].y
    if close then segments.join('') + 'z' else segments.join('')
  else ''

arcCurveMinimumRadius = (startRadians, endRadians, padding) ->
  if padding is 0
    return 0

  DELTA = 1e-4
  radians = endRadians - startRadians
  theta = if radians < Math.PI then radians / 2 else Math.PI - radians / 2

  if Math.abs(Math.sin(theta)) < DELTA
    return 0
  else
    return padding / 2 / Math.sin(theta)

arcCurve = (x, y, innerRadius, outerRadius, startRadians, endRadians, padding, dontCurveCenter) ->

  radians = endRadians - startRadians

  #convert padding (in pixels) into radians (for a radius r)
  pixelsToRadians = (pixels, radius) -> pixels / radius

  pushPoints = (startPoint, endPoint, radius) ->
    radpad = pixelsToRadians(padding, radius)
    pmax = Math.abs(endPoint - startPoint)
    for i in [startPoint..endPoint]
      r = (radians - radpad)
      theta = if r > 0
        startRadians + (radpad / 2) + ((i / pmax) * r)
      else
        endRadians - (radpad / 2) - ((i / pmax) * r)

      theta = clamp(startRadians, endRadians, theta)
      points.push {
        x: x + radius * Math.cos(theta)
        y: y + radius * Math.sin(theta)
      }

  pointsRequired = Math.min(100, Math.max(3, Math.floor(radians * Math.sqrt(outerRadius))-1))
  points = []

  # if there is no inner radius set, then we only need one point at the middle
  if innerRadius is 0 or dontCurveCenter
    points.push {
      x: x + innerRadius * Math.cos((startRadians + endRadians) / 2)
      y: y + innerRadius * Math.sin((startRadians + endRadians) / 2)
    }
  else
    pushPoints(0, pointsRequired, innerRadius)

  pushPoints(pointsRequired, 0, outerRadius)

  svgCurve(points, true)

# calculates the min and max of some data using an accessor function to select the value to use
extent = (data, f) ->
  if data.length > 0
    dmin = f(data[0])
    dmax = f(data[0])
    for d in data
      dmin = min([dmin, f(d)])
      dmax = max([dmax, f(d)])
    [dmin, dmax]
  else
    undefined

extent2 = (data, f, g) ->
  if data.length > 0
    dmin = f(data[0])
    dmax = f(data[0])
    for d in data
      dmin = min([dmin, f(d), g(d)])
      dmax = max([dmax, f(d), g(d)])
    [dmin, dmax]
  else
    undefined

splitData = (data, defined = ->) ->
  l = data.length
  datas = []
  current = undefined
  awaitingReal = true

  for d in data
    if defined(d)
      if awaitingReal
        current = []
        datas.push(current)
        awaitingReal = false
      current.push d
    else
      awaitingReal = true

  datas.filter((d) -> d.length > 0)

#choose n values so that the maximum number of values returned in the new array doesn't exceed maxSize
splitAndFeather = (data, maxSize, defined = ->) ->
  if maxSize
    featherFactor = maxSize / data.length
    LTTBFeather(d, Math.floor(d.length * featherFactor)) for d in splitData(data, defined)
  else
    splitData(data, defined)

#Largest-Triangle-Three-Buckets Algorithm for feathering
LTTBFeather = (array, maxSize=200) ->
  if maxSize > 1
    originalLength = array.length

    if originalLength > maxSize
      newData = new Array(maxSize)
      newData[0] = array[0]
      newData[maxSize-1] = array[originalLength-1]
      bucketSize = (originalLength-2) / (maxSize-2)

      for i in [1...maxSize-1] by 1
        data1 = newData[i-1]
        bucket = array.slice(Math.floor((i-1)*bucketSize)+1, Math.floor(i*bucketSize)+1)
        data2 = dataAverage array.slice(Math.floor(i*bucketSize)+1, Math.floor((i+1)*bucketSize)+1)
        newData[i] = maxTriangle(data1, bucket, data2)

      newData
    else
      array.slice(0)
  else if maxSize == 1 and array.length > 0
    [array[Math.floor(array.length/2)]]
  else []

#calculate the average point in a data point array
dataAverage = (array) ->
  length = array.length
  if array[0].y != undefined
    sum = array.reduce((a,b) -> {x: a.x+b.x, y: a.y+b.y})
    x: sum.x/length
    y: sum.y/length
  else
    sum = array.reduce((a,b) -> {x: a.x+b.x, y1: a.y1+b.y1, y2: a.y2+b.y2})
    x: sum.x/length
    y1: sum.y1/length
    y2: sum.y2/length

#find the data point in an array with the largest triangle forming with two selected points
maxTriangle = (data1, array, data2) ->
  maxArea = -1
  for d in array
    if d.y != undefined
      area = Math.abs((data1.x-data2.x)*(d.y-data1.y)-(data2.y-data1.y)*(data1.x-d.x))
    else
      area = Math.abs((data1.x-data2.x)*(Math.abs(d.y1-d.y2)-Math.abs(data1.y2-data1.y1)) -
          (Math.abs(data2.y2-data2.y1)-Math.abs(data1.y2-data1.y1))*(data1.x-d.x))
    if area > maxArea
      maxArea = area
      data = d
  data

# prepares an array for plotting as a bar chart
stackSegments = (array, arrayNames, xvalue) ->
  result = []
  sum = 0
  for y, i in array
    result.push
      y0: sum
      y1: sum + y.value
      yname: arrayNames[i]
      y: y.value
      data: y
      x: xvalue
    sum += y.value
  result

# XXX: make this use binary search (since array should be sorted)
inefficientSearch = (array, find, nearest, v) ->
  for i in [0...array.length-1] by 1
    if v(array[i]) <= find <= v(array[i+1])
      if nearest
        if Math.abs(v(array[i]) - find) < Math.abs(v(array[i+1]) - find)
          return i
        else
          return i+1
      else return i
  return -1

# performs a binary search for the closest value
search = (array, find, lookup) ->
  if array.length < 2 then return array.length - 1
  imin = 0
  imax = array.length - 1
  ibest = imin
  while imin <= imax
    imid = Math.floor((imax + imin) / 2)
    if lookup(array[imid]) < find
      imin = imid + 1
    else if lookup(array[imid]) > find
      imax = imid - 1
    else return imid
    if Math.abs(lookup(array[imid]) - find) < Math.abs(lookup(array[ibest]) - find)
      ibest = imid
  return ibest

# works out the label to show given the x value
findLabel = (array, find, interpolate, interpolateValues) ->
  i = search(array, find, (d) -> d.x)
  if i > -1
    if interpolate
      closest = array[i]
      dist = find - closest.x
      inLower = (dist < 0 and i > 0)
      inUpper = (dist > 0 and i < array.length - 1)
      if inLower or inUpper
        nextClosest = array[if inLower then i-1 else i+1]
        interpolated = interpolateValues find, closest, nextClosest, (yClosest, yNextClosest) ->
          yClosest + (yClosest - yNextClosest) * dist / (closest.x - nextClosest.x)
        if interpolated? then interpolated else array[i]
      else array[i]
    else array[i]

# creates label canditate label points for all the sections of data in a series, then picks the
# one that is closest to the mouse
createLabelPoint = (series, x, y, interpolator) ->
  if series.labelsEnabled()
    bestPoint = undefined
    bestDist = -1
    xx = series.axis.xScale.inverse(x)
    for data in series._.featheredData
      point = findLabel(series.data(), xx, series.labelInterpolated(), interpolator)
      if point
        dist = Math.abs(point.x - xx)
        if dist < bestDist or not bestPoint?
          bestDist = dist
          bestPoint = point
    bestPoint

makeLabelDetails = (series, point, yAccessor, xProperty='x', yProperty='y') ->
  {
    series: series,
    title: series.title(),
    x: series.axis.xScale.apply(point.x),
    y: series.axis.yScale.apply(yAccessor(point)),
    color: series.legendColor(),
    values: series.labelValuesExtractor()(series, point, undefined, yAccessor, xProperty, yProperty)
  }

boundLabel = (label, graph) ->
  label.bounding = graph.plotArea
  label

createLinearGradient = (parent, values, series) ->
  gradientId = randomId()

  select(parent).select('.hx-linear-gradient').remove()
  linearGradient = select(parent).append('linearGradient')
    .attr('class', 'hx-linear-gradient')
    .attr('id', gradientId)
    .attr('gradientUnits', "userSpaceOnUse")
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', series.axis.yScale.rangeMin)
    .attr('y2', series.axis.yScale.rangeMax)

  values.forEach (value) ->
    linearGradient.append('stop')
      .attr('offset', ((value.yValue - series.axis.yScale.domainMin) / (series.axis.yScale.domainMax - series.axis.yScale.domainMin) * 100) + '%')
      .attr('stop-color', color(value.color).alpha(1).toString())
      .attr('stop-opacity', color(value.color).alpha())

  gradientId

populateLegendSeries = (selection, series) ->
  background = selection.select('.hx-legend-box')
  if background.size() is 0
    background = selection.append('rect').class('hx-legend-box')

  selection.view('.hx-legend-entry', 'g')
    .enter ->
      selection = @append('g').class('hx-legend-entry')
      selection.append('text')
      selection.append('rect')
      selection.node()
    .update (s, e, i) ->
      @select('text')
        .text(if isFunction(s.title) then s.title() else s.name)
        .attr('y', i*20 + 10)
        .attr('x', 15)

      @select('rect')
        .text(if isFunction(s.title) then s.title() else s.name)
        .attr('y', i*20)
        .attr('x', 0)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', if s.legendColor then s.legendColor() else s.fillColor) # XXX: the else s.fillColor is there for PieCharts... which should be fixed when pie charts are refactored
    .apply(series)

  width = max(selection.selectAll('text').nodes.map((node) -> node.getComputedTextLength()))

  background.attr('width', width + 6 + 20)
  background.attr('x', -5)
  background.attr('height', series.length*20)
  background.attr('y', -5)

  selection

optionSetterGetter = (name) ->
  (value) ->
    if arguments.length > 0
      @_.options[name] = value
      this
    else
      @_.options[name]

export {
  svgCurve,
  dataAverage,
  maxTriangle,
  LTTBFeather,
  boundLabel,
  splitAndFeather,
  populateLegendSeries,
  createLinearGradient,
  optionSetterGetter,
  arcCurveMinimumRadius
  arcCurve,
  extent,
  extent2,
  splitData,
  stackSegments,
  inefficientSearch,
  search,
  findLabel,
  createLabelPoint,
  makeLabelDetails,
  doCollisionDetection,
}
