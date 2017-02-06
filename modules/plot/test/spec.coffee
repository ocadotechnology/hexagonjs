describe "plot", ->
  it 'should have user facing text defined', ->
    hx.userFacingText('plot','noData').should.equal('No Data')

  describe "Graph", ->

    describe 'util functions for plotting', ->
      s = hx._.plot
      array = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}]
      array2 = [{x: 1, y1: 4, y2: 3}, {x: 2, y1: 3, y2: 4}, {x: 3, y1: 5, y2: 5}]
      array3 = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 2}]

      it 'calculateYBounds: should not ignore non-auto parameters', ->
        axis = new hx.Axis()
        axis.calculateYBounds('auto', 'auto').should.eql { ymin: 0, ymax: 0 }
        axis.calculateYBounds(1, 1).should.eql { ymin: 1, ymax: 1 }
        axis.calculateYBounds(-1, 'auto').should.eql { ymin: -1, ymax: 0 }

      it 'calculateYBounds: should correctly calculate y bounds when the data is sparse and the graph is stacked', ->
        axis = new hx.Axis({
          x: {
            scaleType: 'discrete'
          },
          y: {
            min: 0
          },
          series: [
            {
              type: 'bar',
              options: {
                title: 'Bob',
                group: 'g0',
                fillColor: hx.theme.plot.coldCol,
                data: [{
                  x: 'verybig',
                  y: 10
                }, {
                  x: 'alwayspresesnt',
                  y: 1
                }]
              }
            },
            {
              type: 'bar',
              options: {
                title: 'Lazlo',
                fillColor: hx.theme.plot.warmCol,
                group: 'g0',
                data: [{
                  x: 'alwayspresesnt',
                  y: 2
                }]
              }
            }
          ]
  		})

        axis.tagSeries()
        { ymax } = axis.calculateYBounds('auto', 'auto')
        ymax.should.eql(10)

      it 'doCollisionDetection: should hide text that gets in the way of other text', ->
        widthPx = 200
        intendedDistance = 2
        createSuspiciousElement = (i) ->
          hx.detached 'div'
            .text i
            .style 'left', "#{i * widthPx / intendedDistance}px"
            .style 'width', "#{widthPx}px"
            .style 'position', 'absolute'
            .node()

        suspiciousElements = hx.range(4).map createSuspiciousElement
        suspiciousElementsSel = hx.selectAll suspiciousElements

        expectedPrevText = ['0', '1', '2', '3']
        # Sense check
        suspiciousElementsSel.text().should.deep.equal expectedPrevText
        hx._.plot.doCollisionDetection suspiciousElements

        expectedCurrText = expectedPrevText.map (val, i) -> if i % intendedDistance then '' else val
        suspiciousElementsSel.text().should.deep.equal expectedCurrText


      it 'dataAverage: should return the average data point in an array', ->
        s.dataAverage(array).should.eql({x: 2, y: 3})
        s.dataAverage(array2).should.eql({x: 2, y1: 4, y2: 4})

      it 'maxTriangle: should return a data point', ->
        data1 = {x: 0, y: 0}
        data2 = {x: 4, y: 1}
        data3 = {x: 0, y1: 1, y2: 3}
        data4 = {x: 4, y1: 3, y2: 4}
        s.maxTriangle(data1, array, data2).should.eql({x: 3, y: 4})
        s.maxTriangle(data3, array2, data4).should.eql({x: 3, y1: 5, y2: 5})

      it 'LTTBFeather: should return a data array', ->
        s.LTTBFeather(array, 3).should.eql(array)
        s.LTTBFeather(array2, 3).should.eql(array2)
        s.LTTBFeather(array, 2).should.eql([{x: 1, y: 2}, {x: 3, y: 4}])
        s.LTTBFeather(array2, 2).should.eql([{x: 1, y1: 4, y2: 3}, {x: 3, y1: 5, y2: 5}])
        s.LTTBFeather(array3, 3).should.eql([{x: 1, y: 2}, {x: 3, y: 4}, {x: 4, y: 2}])
        s.LTTBFeather(array, 1).should.eql([{x: 2, y: 3}])
        s.LTTBFeather(array, 0).should.eql([])
        s.LTTBFeather([], 3).should.eql([])

      it 'splitAndFeather: should return a data array', ->
        s.splitAndFeather(array, 3, (d)-> d.y != undefined).should.eql([array])
        s.splitAndFeather(array2, 3, (d)-> d.y1 != undefined and d.y2 != undefined).should.eql([array2])
        s.splitAndFeather(array3, 3, (d)-> d.y != undefined).should.eql([[{x: 1, y: 2}, {x: 3, y: 4}, {x: 4, y: 2}]])

    describe 'setter/getters should work', ->

      checkSetterGetterAndOption = (property, valuesToCheck) ->
        it 'property ' + property + ' should set and get correctly', ->
          valuesToCheck.forEach (v) ->
            graph = new hx.Graph(hx.detached('div').node())
            graph[property](v).should.equal(graph)
            graph[property]().should.equal(v)

        it 'option ' + property + ' should get passed through', ->
          valuesToCheck.forEach (v) ->
            opts = {}
            opts[property] = v
            graph = new hx.Graph(hx.detached('div').node(), opts)
            graph[property]().should.equal(v)

      checkSetterGetterAndOption('zoomRangeStart', [0, 0.5, 1])
      checkSetterGetterAndOption('zoomRangeEnd', [0, 0.5, 1])
      checkSetterGetterAndOption('zoomEnabled', [true, false])
      checkSetterGetterAndOption('labelsEnabled', [true, false])
      checkSetterGetterAndOption('legendEnabled', [true, false])
      checkSetterGetterAndOption('legendLocation', ['auto', 'thingthatisnotavalidoption'])

      it 'should be able to get the list of axes', ->
        graph = new hx.Graph(hx.detached('div').node())
        a1 = graph.addAxis()
        a2 = graph.addAxis()
        graph.axes().should.eql([a1, a2])

      it 'should be able to set the list of axes', ->
        graph = new hx.Graph(hx.detached('div').node())
        a1 = graph.addAxis()
        a2 = graph.addAxis()
        graph.axes().should.eql([a1, a2])
        graph.axes([a2, a1]).should.eql(graph)
        graph.axes().should.eql([a2, a1])

    it 'constructing an axis with addAxis should work', ->
      graph = new hx.Graph(hx.detached('div').node())
      axis = graph.addAxis()
      axis.x.scaleType().should.equal('linear')
      axis.y.scaleType().should.equal('linear')

      graph = new hx.Graph(hx.detached('div').node())
      axis = graph.addAxis({x: {scaleType: 'discrete'}, y: {scaleType: 'time'}})
      axis.x.scaleType().should.equal('discrete')
      axis.y.scaleType().should.equal('time')

      graph = new hx.Graph(hx.detached('div').node())
      axis = graph.addAxis(new hx.Axis({x: {scaleType: 'discrete'}, y: {scaleType: 'time'}}))
      axis.x.scaleType().should.equal('discrete')
      axis.y.scaleType().should.equal('time')

    it 'should not redraw on resize when told not to', ->
      selection = hx.select('body').append('div')
        .style 'width', '500px'
        .style 'height', '500px'
      graph = new hx.Graph(selection.node(), redrawOnResize: false)
      axis = graph.addAxis(x: { title: 'foo' }, y: { title: 'bar' })
      axis.addSeries('line', data: [{ x: 0, y: 1 }])
      graph.render()

      renderSpy = chai.spy()
      graph.on 'render', renderSpy
      selection.style 'width', '400px'
      testHelpers.fakeNodeEvent(selection.node(), 'resize')()
      renderSpy.should.not.have.been.called()

    it 'should redraw on resize by default', ->
      selection = hx.select('body').append('div')
        .style 'width', '500px'
        .style 'height', '500px'
      graph = new hx.Graph(selection.node())
      axis = graph.addAxis(x: {title: 'foo'}, y: {title: 'bar'})
      axis.addSeries('line', data: [{x: 0, y: 1}])
      graph.render()

      renderSpy = chai.spy()
      graph.on 'render', renderSpy
      selection.style 'width', '400px'
      testHelpers.fakeNodeEvent(selection.node(), 'resize')()
      renderSpy.should.have.been.called()


  describe "hx.Axis", ->

    it 'constructing an axis with new Axis should work', ->
      axis = new hx.Axis()
      axis.x.scaleType().should.equal('linear')
      axis.y.scaleType().should.equal('linear')

      axis = new hx.Axis({x: {scaleType: 'discrete'}, y: {scaleType: 'time'}})
      axis.x.scaleType().should.equal('discrete')
      axis.y.scaleType().should.equal('time')

    describe 'setter/getters should work', ->
      checkSetterGetterAndOption = (dim, property, valuesToCheck) ->
        it 'property ' + property + ' should set and get correctly', ->
          valuesToCheck.forEach (v) ->
            axis = new hx.Axis
            axis[dim][property](v).should.equal(axis)
            axis[dim][property]().should.equal(v)

        it 'option ' + property + ' should be passed through correctly', ->
          valuesToCheck.forEach (v) ->
            opts = {}
            opts[dim] = {}
            opts[dim][property] = v
            axis = new hx.Axis(opts)
            axis[dim][property]().should.equal(v)

      checkSetterGetterAndOption('x', 'scaleType', ['linear', 'time', 'discrete'])
      checkSetterGetterAndOption('x', 'visible', [true, false])
      checkSetterGetterAndOption('x', 'formatter', [(-> 'a'), (x) -> x])
      checkSetterGetterAndOption('x', 'tickRotation', [0, 5, 10])
      checkSetterGetterAndOption('x', 'min', [0, -100, 100, 'auto'])
      checkSetterGetterAndOption('x', 'max', [0, -100, 100, 'auto'])
      checkSetterGetterAndOption('x', 'discretePadding', [0, 5, 120])
      checkSetterGetterAndOption('x', 'discreteLabels', [0, 5, 120])
      checkSetterGetterAndOption('x', 'tickSpacing', [100, 200, 300])
      checkSetterGetterAndOption('x', 'title', ['title-1', 'title-2'])
      checkSetterGetterAndOption('x', 'scalePaddingMin', [0, 0.1, 0.2])
      checkSetterGetterAndOption('x', 'scalePaddingMax', [0, 0.1, 0.2])
      checkSetterGetterAndOption('x', 'ticksAll', [true, false])
      checkSetterGetterAndOption('x', 'gridLines', [true, false])
      checkSetterGetterAndOption('x', 'nthTickVisible', [0, 5, 100])
      checkSetterGetterAndOption('x', 'axisTickLabelPosition', [true, false])
      checkSetterGetterAndOption('x', 'showTicks', [true, false])

      checkSetterGetterAndOption('y', 'scaleType', ['linear', 'time', 'discrete'])
      checkSetterGetterAndOption('y', 'visible', [true, false])
      checkSetterGetterAndOption('y', 'formatter', [(-> 'a'), (x) -> x])
      checkSetterGetterAndOption('y', 'tickRotation', [0, 5, 10])
      checkSetterGetterAndOption('y', 'min', [0, -100, 100, 'auto'])
      checkSetterGetterAndOption('y', 'max', [0, -100, 100, 'auto'])
      checkSetterGetterAndOption('y', 'discretePadding', [0, 5, 120])
      checkSetterGetterAndOption('y', 'discreteLabels', [0, 5, 120])
      checkSetterGetterAndOption('y', 'tickSpacing', [100, 200, 300])
      checkSetterGetterAndOption('y', 'title', ['title-1', 'title-2'])
      checkSetterGetterAndOption('y', 'scalePaddingMin', [0, 0.1, 0.2])
      checkSetterGetterAndOption('y', 'scalePaddingMax', [0, 0.1, 0.2])
      checkSetterGetterAndOption('y', 'ticksAll', [true, false])
      checkSetterGetterAndOption('y', 'gridLines', [true, false])
      checkSetterGetterAndOption('y', 'nthTickVisible', [0, 5, 100])
      checkSetterGetterAndOption('y', 'axisTickLabelPosition', [true, false])
      checkSetterGetterAndOption('y', 'showTicks', [true, false])

      it 'should be able to get the list of series', ->
        axis = new hx.Axis
        a1 = axis.addSeries()
        a2 = axis.addSeries()
        axis.series().should.eql([a1, a2])

      it 'should be able to set the list of series', ->
        axis = new hx.Axis
        a1 = axis.addSeries()
        a2 = axis.addSeries()
        axis.series().should.eql([a1, a2])
        axis.series([a2, a1]).should.eql(axis)
        axis.series().should.eql([a2, a1])


  describe "series", ->

    checkOptionAndSetterGetter = (SeriesType, property, valuesToCheck) ->

      it 'setter/getter ' + property + ' should set and get correctly', ->
        series = new SeriesType
        valuesToCheck.forEach (v) ->
          series[property](v).should.equal(series)
          if v?
            series[property]().should.eql(v)
          else
            should.not.exist(series[property]())

      it 'option ' + property + ' should get passed through as the initial value', ->
        valuesToCheck.forEach (v) ->
          opts = {}
          opts[property] = v
          series = new SeriesType(opts)
          if v?
            series[property]().should.eql(v)
          else
            should.not.exist(series[property]())

    describe "hx.LineSeries", ->

      checkOptionAndSetterGetter(hx.LineSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(hx.LineSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(hx.LineSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(hx.LineSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(hx.LineSeries, 'strokeEnabled', [true, false])
      checkOptionAndSetterGetter(hx.LineSeries, 'strokeColor', ['rgba(1, 2, 3, 0.5)', 'red', [{ yValue: -4, color: 'red' }, {yValue: 4, color: 'green'}]])
      checkOptionAndSetterGetter(hx.LineSeries, 'fillEnabled', [true, false])
      checkOptionAndSetterGetter(hx.LineSeries, 'fillColor', ['rgba(1, 2, 3, 0.5)', 'red', undefined])
      checkOptionAndSetterGetter(hx.LineSeries, 'markersEnabled', [true, false])
      checkOptionAndSetterGetter(hx.LineSeries, 'markerFillColor', ['rgba(1, 2, 3, 0.5)', 'red', undefined])
      checkOptionAndSetterGetter(hx.LineSeries, 'markerRadius', [0, 5, 120])
      checkOptionAndSetterGetter(hx.LineSeries, 'sampleThreshold', [100, 200, undefined])
      checkOptionAndSetterGetter(hx.LineSeries, 'group', ['group1', 'group2'])


    describe "hx.ScatterSeries", ->

      checkOptionAndSetterGetter(hx.ScatterSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(hx.ScatterSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(hx.ScatterSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(hx.ScatterSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(hx.ScatterSeries, 'radius', [2, 4, 6, 8])
      checkOptionAndSetterGetter(hx.ScatterSeries, 'fillColor', ['rgba(1, 2, 3, 0.5)', 'red'])


    describe "hx.BandSeries", ->

      checkOptionAndSetterGetter(hx.BandSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(hx.BandSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(hx.BandSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(hx.BandSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(hx.BandSeries, 'fillColor', ['rgba(1, 2, 3, 0.5)', 'red'])
      checkOptionAndSetterGetter(hx.BandSeries, 'sampleThreshold', [100, 200, undefined])


    describe "hx.StraightLineSeries", ->

      checkOptionAndSetterGetter(hx.StraightLineSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(hx.StraightLineSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(hx.StraightLineSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(hx.StraightLineSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(hx.StraightLineSeries, 'strokeColor', [
        'rgba(1, 2, 3, 0.5)'
        'red'
        [{
          yValue: -4
          color: 'red'
        }
        {
          yValue: 4
          color: 'green'
        }]
      ])

    describe "hx.BarSeries", ->

      checkOptionAndSetterGetter(hx.BarSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(hx.BarSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(hx.BarSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(hx.BarSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(hx.BarSeries, 'fillColor', ['rgba(1, 2, 3, 0.5)', 'red', undefined])
      checkOptionAndSetterGetter(hx.BarSeries, 'group', ['group1', 'group2'])

    describe "render", ->
      it 'should display when the height is positive', ->
        selection = hx.detached('div').style('height', '400px')
        hx.select('body').add(selection)
        graph = new hx.Graph(selection.node())
        axis = graph.addAxis('linear', 'linear')
        a1 = axis.addSeries()
        graph.render()
        selection.selectAll('.hx-series').size().should.equal(2)
        selection.remove()

      it 'should display when the height is positive using fluent api', ->
        graphOpts =
          axes: [
            series: [
              type: 'line'
            ]
            x:
              type: 'linear'
            y:
              type: 'linear'
          ]
        selection = hx.detached 'div'
          .style 'height', '400px'
        graph = new hx.Graph selection.node(), graphOpts
        hx.select 'body'
          .add selection
        graph.render()
        selection.selectAll('.hx-series').size().should.equal(2)
        selection.remove()

  describe "hx.PieChart", ->

    describe 'setter/getters should work', ->

      checkSetterGetterAndOption = (property, valuesToCheck) ->
        it 'property ' + property + ' should set and get correctly', ->
          valuesToCheck.forEach (v) ->
            graph = new hx.PieChart(hx.detached('div').node())
            graph[property](v).should.equal(graph)
            graph[property]().should.equal(v)

        it 'option ' + property + ' should get passed through', ->
          valuesToCheck.forEach (v) ->
            opts = {}
            opts[property] = v
            graph = new hx.PieChart(hx.detached('div').node(), opts)
            graph[property]().should.equal(v)

      checkSetterGetterAndOption('labelsEnabled', [true, false])
      checkSetterGetterAndOption('legendEnabled', [true, false])
      checkSetterGetterAndOption('segmentTextEnabled', [true, false])
      checkSetterGetterAndOption('legendLocation', ['auto', 'thingthatisnotavalidoption'])
      checkSetterGetterAndOption('fillColor', ['rgba(1, 2, 3, 0.5)', 'red'])

      checkSetterGetterAndOption('segmentPadding', [0, 5, 10])
      checkSetterGetterAndOption('innerPadding', [0, 5, 10])
      checkSetterGetterAndOption('ringPadding', [0, 5, 10])
      checkSetterGetterAndOption('totalAngle', [0, 5, 10])
      checkSetterGetterAndOption('startAngle', [0, 5, 10])

  describe 'hx.Sparkline', ->
    it 'should use the correct default value for redrawOnResize', ->
      sparkLine = new hx.Sparkline(hx.detached('div').node())
      sparkLine._.graph.redrawOnResize().should.equal(true)
      sparkLine.redrawOnResize().should.equal(true)

    it 'should pass the redrawOnResize option to its Graph', ->
      sparkLine = new hx.Sparkline(hx.detached('div').node(), redrawOnResize: false)
      sparkLine._.graph.redrawOnResize().should.equal(false)
      sparkLine.redrawOnResize().should.equal(false)
      sparkLine.redrawOnResize(true)
      sparkLine._.graph.redrawOnResize().should.equal(true)
      sparkLine.redrawOnResize().should.equal(true)

    it 'should set the min value properly', ->
      sparkLine = new hx.Sparkline(hx.detached('div').node(), {min: 5})
      sparkLine._.graph.axes()[0].y.min().should.equal(5)

    it 'should set the max value properly', ->
      sparkLine = new hx.Sparkline(hx.detached('div').node(), {max: 5})
      sparkLine._.graph.axes()[0].y.max().should.equal(5)

    it 'should use auto for the default min/max values', ->
      sparkLine = new hx.Sparkline(hx.detached('div').node())
      sparkLine._.graph.axes()[0].y.min().should.equal('auto')
      sparkLine._.graph.axes()[0].y.max().should.equal('auto')
