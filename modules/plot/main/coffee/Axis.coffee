
# by far the most complicated component of the graphing api. The auto axis scaling makes things really complicated here...
dimension = (axis, options) ->
  state = hx.merge({
    scaleType: 'linear',
    visible: true,
    formatter: hx.format.si(2)
    tickRotation: 0
    doCollisionDetection: true
    min: 'auto'
    max: 'auto'
    discretePadding: 0.1
    discreteLabels: undefined
    tickSpacing: 50
    title: null
    scalePaddingMin: 0
    scalePaddingMax: 0
    ticksAll: false
    gridLines: true
    nthTickVisible: 1
    axisTickLabelPosition: 'bottom'
    showTicks: true
  }, options)

  setterGetter = (name) ->
    (value) ->
      if arguments.length > 0
        state[name] = value
        axis
      else
        state[name]

  {
    doCollisionDetection: setterGetter('doCollisionDetection'),
    scaleType: setterGetter('scaleType'),
    visible: setterGetter('visible'),
    formatter: setterGetter('formatter'),
    tickRotation: setterGetter('tickRotation'),
    min: setterGetter('min'),
    max: setterGetter('max'),
    discretePadding: setterGetter('discretePadding'),
    discreteLabels: setterGetter('discreteLabels'),
    tickSpacing: setterGetter('tickSpacing'),
    title: setterGetter('title'),
    scalePaddingMin: setterGetter('scalePaddingMin'),
    scalePaddingMax: setterGetter('scalePaddingMax'),
    ticksAll: setterGetter('ticksAll'),
    gridLines: setterGetter('gridLines'),
    nthTickVisible: setterGetter('nthTickVisible'),
    axisTickLabelPosition: setterGetter('axisTickLabelPosition'),
    showTicks: setterGetter('showTicks'),
    axisSize: setterGetter('axisSize'),
    titleHeight: setterGetter('titleHeight')
  }


class Axis

  constructor: (options) ->

    opts = hx.merge({
      x: {
        axisTickLabelPosition: 'bottom'
      },
      y: {
        axisTickLabelPosition: 'left'
      }
    }, options)

    @_ = {
      series: new hx.List
    }

    @x = dimension this, hx.merge({
      axisTickLabelPosition: 'bottom'
    }, options?.x)
    @y = dimension this, hx.merge({
      axisTickLabelPosition: 'left'
    }, options?.y)

    #XXX: move these to the underscore object

    # private values which can't be made private since they are members

    @xScale = new LinearScale(0, 1, 0, 1)
    @yScale = new LinearScale(0, 1, 0, 1)
    @graph = null # gets set when it is attached to a graph

    @xAxisSize = 50
    @xTitleHeight = 0
    @yAxisSize = 50
    @yTitleHeight = 0
    options?.series?.forEach (seriesObj) =>
      @addSeries seriesObj.type, seriesObj.options



  # series: string (which indicates the type of series to create) or a Series object, or nothing for a line series
  # possible types: line, area, area-stacked, bar, bar-stacked, scatter, constant (line)
  addSeries: (series, options) ->

    if hx.isString(series)
      series = switch series
        when 'line' then new LineSeries(options)
        when 'band' then new BandSeries(options)
        when 'bar' then new BarSeries(options)
        when 'scatter' then new ScatterSeries(options)
        when 'straight-line' then new StraightLineSeries(options)
        else
          hx.consoleWarning(series + ' is not a valid series type')
          undefined
      @_.series.add series
      series.axis = this
      series
    else if series instanceof Series
      @_.series.add series
      series.axis = this
      series
    else if arguments.length is 0
      series = new LineSeries
      @_.series.add series
      series.axis = this
      series
    else
      hx.consoleWarning(series + ' is not a valid series type')
      return

  series: (series) ->
    if arguments.length > 0
      @_.series = new hx.List(series)
      for s in series
        s.axis = this
      this
    else
      @_.series.values()

  removeSeries: (series) ->
    if @_.series.remove series
      series.axis = undefined
      series

  setupAxisSvg: (element) ->
    gridGroup = hx.select(element).append('g').class('hx-axis-grid')
    xAxisGroup = hx.select(element).append('g').class('hx-x-axis')
    xAxisGroup.append('g').class('hx-axis-scale')
    yAxisGroup = hx.select(element).append('g').class('hx-y-axis')
    yAxisGroup.append('g').class('hx-axis-scale')

  scalePad = (value, range, padding) -> value + (range or 1) * padding

  tagSeries: ->

    groupTypeEntries = (data) ->

      groups = new hx.Map
      for series in data
        group = if supportsGroup(series) then series.group()
        if not groups.has(group)
          groups.set(group, new hx.List)
        groups.get(group).add(series)

      internalGroupId = 0
      typeSize = groups.size

      typeSize += if groups.has(undefined)
        groups.get(undefined).size - 1
      else 0

      for entry in groups.entries()
        group = entry[0]
        if group == undefined
          for series, i in entry[1].entries()
            series.groupId = internalGroupId
            internalGroupId++
            series._.seriesId = 0
            series.groupSize = 1
            series._.typeSize = typeSize
        else
          for series, i in entry[1].entries()
            series.groupId = internalGroupId
            series._.seriesId = i
            series.groupSize = entry[1].size
            series._.typeSize = typeSize
          internalGroupId++
        entry

      internalGroupId

    # collect the series by type
    types = new hx.Map
    for series in @series()
      if not types.has(series._.type)
        types.set(series._.type, new hx.List)
      types.get(series._.type).add(series)

    for typeEntry in types.entries()
      groupTypeEntries(typeEntry[1].entries())

  preupdateXAxisSvg: (element) ->
    self = this

    switch @x.scaleType()
      when 'linear' then @xScale = new LinearScale().range(0, @graph.width)
      when 'discrete' then @xScale = new DiscreteScale(@x.discretePadding()).range(0, @graph.width)
      when 'log' then @xScale = new LogScale().range(0, @graph.width)
      when 'date' then @xScale = new DateScale().range(0, @graph.width)

    if @x.scaleType() == 'discrete'
      domain = if @x.discreteLabels()
        @x.discreteLabels()
      else
        set = new hx.Set
        for series in @series()
          for d in series.data()
            set.add(d.x)
        set.values()

      @xScale.domain(domain)
    else

      # OPTIM: this expensive calculation is not needed if the scales are non auto
      # XXX: band series?
      xs = for s in @series()
        if s instanceof StraightLineSeries
          data = s.data()
          if not data.dx and not data.dy and data.x
            [data.x, data.x]
          else
            undefined
        else
          extent(s.data(), (d) -> d.x)
      xs = xs.filter(hx.identity)
      xmin = hx.min(xs.map((d) -> d[0]))
      xmax = hx.max(xs.map((d) -> d[1]))

      xmin = if @x.min() is 'auto' then xmin else @x.min()
      xmax = if @x.max() is 'auto' then xmax else @x.max()

      if @x.min() is 'auto' then xmin = scalePad(xmin, xmax - xmin, -@x.scalePaddingMin())
      if @x.max() is 'auto' then xmax = scalePad(xmax, xmax - xmin, @x.scalePaddingMax())

      start = xmin + (xmax - xmin) * @graph.zoomRangeStart()
      end = xmin + (xmax - xmin) * @graph.zoomRangeEnd()

      @xScale.domain(start, end)

    xLabelTickSize = 0

    if not @x.visible()
      hx.select(element).select('.hx-x-axis').remove()
    else
      axisGroupSelection = hx.select(element).select('.hx-x-axis')
      alphaDeg = @x.tickRotation()
      alpha = alphaDeg / 180 * Math.PI

      getXTicks = (scale) =>
        if self.x.ticksAll()
          set = new hx.Set
          for series in @series()
            for d in series.data()
              set.add(d.x)
          set.values().map (d) -> [d, scale.apply(d)]
        else
          scale.ticks(self.x.tickSpacing())


      # view update view update view update!
      axisGroupSelection.select('.hx-axis-scale')
        .view('.hx-axis-view', 'g')
          .update (scale) ->
            @view('.hx-tick', 'g')
              .update (tick) ->
                @view('.hx-tick-text-x', 'text')
                  .update (t) ->
                    @text(self.x.formatter()(t))
                    bbox = @node().getBBox()
                    size =  bbox.height * Math.cos(alpha) + bbox.width * Math.sin(alpha)
                    xLabelTickSize = Math.max(xLabelTickSize, size)
                    if alpha is 0
                      @attr("transform", "translate(#{-bbox.width / 2},#{labelOffset})")
                      .style("dominant-baseline", "hanging")
                    else
                      @attr("transform", "translate(0,#{labelOffset}) rotate(#{alphaDeg})")
                  .apply(tick[0])
              .apply(getXTicks(scale))
          .apply(@xScale)

      if @x.title()
        axisGroupSelection.view('.hx-axis-title', 'text')
          .update (d) -> d.xTitleHeight = @text(d.x.title()).height()
          .apply(this)
        xLabelTickSize += @xTitleHeight

      xLabelTickSize += labelOffset + axisPadding

    @xAxisSize = xLabelTickSize

  preupdateYAxisSvg: (element, totalXAxisSize) ->
    self = this

    rmin = @graph.height - totalXAxisSize
    switch @y.scaleType()
      when 'linear' then @yScale = new LinearScale().range(rmin, 0)
      when 'discrete' then @yScale = new DiscreteScale(@y.discretePadding()).range(rmin, 0)
      when 'log' then @yScale = new LogScale().range(rmin, 0)
      when 'date' then @yScale = new DateScale().range(rmin, 0)

    if @y.scaleType() == 'discrete'
      domain = if @yDiscreteLabels
        @yDiscreteLabels
      else
        set = new hx.Set
        for series in @series()
          for d in series.data()
            set.add(d.y)
        set.values()

      @yScale.domain(domain)
    else

      yMinMightBeAuto = @y.min()
      yMaxMightBeAuto = @y.max()
      { ymin, ymax } = @calculateYBounds yMinMightBeAuto, yMaxMightBeAuto

      @yScale.domain(ymin, ymax)

    yLabelTickSize = 0

    if not @y.visible()
      hx.select(element).select('.hx-y-axis').remove()
    else
      axisGroupSelection = hx.select(element).select('.hx-y-axis')

      axisGroupSelection.select('.hx-axis-scale')
        .view('.hx-axis-view', 'g')
          .update (scale) ->
            @view('.hx-tick', 'g')
              .update (tick) ->
                @view('.hx-tick-text-y', 'text')
                  .update (t) ->
                    size = @text(self.y.formatter()(t)).attr('x', -labelOffset).width()
                    if size > yLabelTickSize then yLabelTickSize = size
                  .apply(tick[0])
              .apply(scale.ticks(self.y.tickSpacing()))
          .apply(@yScale)

      if @y.title()
        axisGroupSelection.view('.hx-axis-title', 'text')
          .update (d) -> d.yTitleHeight = @text(d.y.title()).attr('transform', 'rotate(90)').width()
          .apply(this)
        yLabelTickSize += @yTitleHeight

      yLabelTickSize += labelOffset + axisPadding

    @yAxisSize = yLabelTickSize

  updateAxisSvg: (element, xOffset, yOffset, totalXOffset, totalYOffset) ->
    self = this

    # save some values into local variables

    width = @graph.width
    height = @graph.height

    # calculate axis ranges (pixel coordinates)

    switch @x.scaleType()
      when 'linear', 'date' then @xScale.range(totalXOffset, width)
      when 'discrete' then @xScale.range(totalXOffset, width)
      when 'log' then @xScale.range(totalXOffset, width)

    switch @y.scaleType()
      when 'linear', 'date' then @yScale.range(height - totalYOffset, 0)
      when 'discrete' then @yScale.range(height - totalYOffset, 0)
      when 'log' then @yScale.range(height - totalYOffset, 0)

    gridSelection = hx.select(element).select('.hx-axis-grid')

    # render the axis

    if not @x.visible()
      hx.select(element).select('.hx-x-axis').remove()
    else
      if @x.gridLines()
        gridSelection.view('.hx-vertical-grid-line', 'line')
          .update (tick) ->
            @attr('x1', tick[1]).attr('x2', tick[1])
            .attr('y1', self.yScale.rangeMax).attr('y2', self.yScale.rangeMin)
          .apply(@xScale.ticks(self.x.tickSpacing()))

      axisGroupSelection = hx.select(element).select('.hx-x-axis')

      yline = @yScale.apply(0)
      if isNaN(yline) or @y.scaleType() is 'discrete'
        axisY = height - yOffset - @xAxisSize
        markerY = height - yOffset - @xAxisSize
      else
        axisY = Math.min((height - yOffset - @xAxisSize), yline)

        if @x.axisTickLabelPosition() is 'axis'
          markerY = Math.min((height - yOffset - @xAxisSize), yline)
        else
          markerY = height - yOffset - @xAxisSize

      axisUpdateFunc = (scale) ->
        @view('.hx-axis-line', 'line')
          .update((s) ->
            @attr('x1', s.rangeMin).attr('x2', s.rangeMax)
            @attr('y1', axisY).attr('y2', axisY)
          ).apply(scale)

        @view('.hx-tick', 'g')
          .update (tick, e, i) ->
            @attr("transform", "translate(" + tick[1] + "," + markerY + ")")
            @view('.hx-tick-line', 'line')
              .update (t) -> @attr('y1', 0).attr('y2', tickSize)
              .apply(this)
            @view('.hx-tick-text-x', 'text')
              .update (t) -> @text(if (i%self.x.nthTickVisible())==0 then self.x.formatter()(t) else '')
              .apply(tick[0])
          .apply(if self.x.showTicks() then scale.ticks(self.x.tickSpacing()) else [])

        if self.x.showTicks() and self.x.doCollisionDetection()
          nodes = @selectAll('.hx-tick-text-x').filter((x) -> x.text()).nodes
          if nodes.length
            doCollisionDetection nodes

      axisGroupSelection.select('.hx-axis-scale')
        .view('.hx-axis-view', 'g')
          .update axisUpdateFunc
          .apply(@xScale)

      if @x.title()
        axisGroupSelection.view('.hx-axis-title', 'text')
          .update (d) ->
            translateX = (width+totalXOffset)/2
            translateY = markerY + d.xAxisSize-d.xTitleHeight/2 - axisPadding/2
            @attr('transform', 'translate(' + translateX + ', ' + translateY + ')').text(self.x.title())
          .apply(this)

    if not @y.visible()
      hx.select(element).select('.hx-y-axis').remove()
    else
      if @y.gridLines()
        gridSelection.view('.hx-horizontal-grid-line', 'line')
          .update (tick) ->
            @attr('y1', tick[1]).attr('y2', tick[1])
            .attr('x1', self.xScale.rangeMax).attr('x2', self.xScale.rangeMin)
          .apply(@yScale.ticks(self.y.tickSpacing()))

      axisGroupSelection = hx.select(element).select('.hx-y-axis')
        #.attr("transform", "translate(" + (xOffset + @yAxisSize) + "," + 0 + ")")


      xline = @xScale.apply(0)
      if isNaN(xline) or @x.scaleType() is 'discrete'
        axisX = xOffset + @yAxisSize
        markerX = xOffset + @yAxisSize
      else
        axisX = Math.max((xOffset + @yAxisSize), xline)

        if @y.axisTickLabelPosition() is 'axis'
          markerX = Math.max((xOffset + @yAxisSize), xline)
        else
          markerX = xOffset + @yAxisSize

      axisGroupSelection.select('.hx-axis-scale')
        .view('.hx-axis-view', 'g')
          .update (scale) ->
            @view('.hx-axis-line', 'line')
              .update (s) -> @attr('y1', s.rangeMin).attr('y2', s.rangeMax).attr('x1', axisX).attr('x2', axisX)
              .apply(scale)
            @view('.hx-tick', 'g')
              .update (tick, e, i) ->
                @attr("transform", "translate(" + markerX + "," + tick[1] + ")")
                @view('.hx-tick-line', 'line')
                  .update (t) -> @attr('x1', -tickSize).attr('x2', 0)
                  .apply(this)
                @view('.hx-tick-text-y', 'text')
                  .update (t) -> @attr('x', -labelOffset).text(if (i%self.y.nthTickVisible())==0 then self.y.formatter()(t) else '')
                  .apply(tick[0])
              .apply(if self.y.showTicks() then scale.ticks(self.y.tickSpacing()) else [])
          .apply(@yScale)

      if @y.title()
        axisGroupSelection.view('.hx-axis-title', 'text')
          .update (d) ->
            translateX = markerX - d.yAxisSize + d.yTitleHeight/2 + axisPadding/2
            translateY = (height-totalYOffset)/2
            @attr('transform', 'translate(' + translateX + ', ' + translateY + ') rotate(-90)').text(self.y.title())
          .apply(this)


  updateDataSvg: (fillLayer, sparseLayer) ->
    fill = []
    sparse = []
    hx.select(fillLayer).view('.hx-series', 'g').update((d, e) -> fill.push(e)).apply(@series())
    hx.select(sparseLayer).view('.hx-series', 'g').update((d, e) -> sparse.push(e)).apply(@series())

    for s, i in @series()
      s.updateSvg(fill[i], sparse[i])

  # return the label object that this axis wants to render based off the x,y coords.
  # the graph object may choose to ignore it if one of the other axes offers a better
  # alternative
  getLabelDetails: (x, y) ->
    labels = hx.flatten @series().map (series) -> series.getLabelDetails(x, y)
    labels.filter((d) -> d)

  # gets the width of the stack for a particular type, group and x value (the seriesId is the series that you want to get the baseline for)
  getXStack: (type, group, y, seriesId, start = 0) ->
    if group
      xStack = Math.max(@xScale.domainMin, 0)
      for series, j in @series()
        if series._.seriesId < seriesId and series.group() == group and series._.type == type
          xs = series.getX(y)
          if hx.defined(xs)
            xStack += xs
      xStack
    else Math.max(start, 0)

  getYStack: (type, group, x, seriesId, start = 0) ->
    allSeries = @series()
    xScaleType = @x.scaleType()
    yScaleDomainMin = @yScale.domainMin

    if group
      yStack = Math.max(yScaleDomainMin, 0)
      maybeys = allSeries.map (series) ->
        if series._.seriesId < seriesId and series.group() == group and series._.type == type
          series.getY(x, xScaleType is 'discrete')
      yStack + hx.sum maybeys.filter hx.identity
    else
      Math.max(start, 0)

  calculateYBounds: (yMinMightBeAuto, yMaxMightBeAuto) ->
    if 'auto' in [yMaxMightBeAuto, yMinMightBeAuto]
      # XXX: band series?
      allSeries = @series()
      xScaleType = @x.scaleType()

      initValue = { ymin: 0, ymax: 0 }
      types = hx.groupBy(allSeries, (d) -> d._.type)
      stackGroups = types.map ([type, series]) ->
        type: type
        group: hx.groupBy series, (s) -> if supportsGroup(s) then s.group() else undefined
  
  
      typeGroupReductor = (type) ->
        ({ ymin, ymax }, [seriesGroup, series]) ->
          { yymin, yymax } = if seriesGroup == undefined
            maybeys = allSeries.map (s) ->
              data = s.data()
              if s instanceof StraightLineSeries
                if not data.dx and not data.dy and data.y
                  [data.y, data.y]
                else
                  undefined
              else if s instanceof BandSeries
                extent2(data, ((d) -> d.y1), (d) -> d.y2)
              else
                extent(data, (d) -> d.y)
            ys = maybeys.filter((d) -> d?)
  
            {
              yymin: hx.min(ys.map((d) -> d[0]))
              yymax: hx.max(ys.map((d) -> d[1]))
            }
          else
            allX = hx.unique hx.flatten series.map (s) -> s.data().map ({ x }) -> x
            stackHeights = allX.map (x) ->
              maybeys = series.map (series) -> series.getY x, xScaleType is 'discrete'
              hx.sum maybeys.filter hx.identity
            {
              yymin: hx.min stackHeights
              yymax: hx.max stackHeights
            }
          {
            ymin: Math.min(ymin, yymin)
            ymax: Math.max(ymax, yymax)
          }
  
      stackGroupReductor = (prev, { type, group }) ->
        reductor = typeGroupReductor type
        group.reduce reductor, prev
      { ymin, ymax } = stackGroups.reduce stackGroupReductor, initValue
      yminscaled = if yMinMightBeAuto is 'auto' then scalePad(ymin, ymax - ymin, -@y.scalePaddingMin()) else yMinMightBeAuto
      ymaxscaled = if yMaxMightBeAuto is 'auto' then scalePad(ymax, ymax - ymin, @y.scalePaddingMax()) else yMaxMightBeAuto
      { ymin: yminscaled, ymax: ymaxscaled }
    else
      { ymin: yMinMightBeAuto, ymax: yMaxMightBeAuto }
