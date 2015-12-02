describe "plot", ->

  describe "Graph", ->

    describe 'util functions for plotting', ->
      s = hx._.plot
      array = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}]
      array2 = [{x: 1, y1: 4, y2: 3}, {x: 2, y1: 3, y2: 4}, {x: 3, y1: 5, y2: 5}]
      array3 = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 2}]

      it 'dataAverage: should return the average data point in an array', ->
        expect(s.dataAverage(array)).toEqual({x: 2, y: 3})
        expect(s.dataAverage(array2)).toEqual({x: 2, y1: 4, y2: 4})

      it 'maxTriangle: should return a data point', ->
        data1 = {x: 0, y: 0}
        data2 = {x: 4, y: 1}
        data3 = {x: 0, y1: 1, y2: 3}
        data4 = {x: 4, y1: 3, y2: 4}
        expect(s.maxTriangle(data1, array, data2)).toEqual({x: 3, y: 4})
        expect(s.maxTriangle(data3, array2, data4)).toEqual({x: 3, y1: 5, y2: 5})

      it 'LTTBFeather: should return a data array', ->
        expect(s.LTTBFeather(array, 3)).toEqual(array)
        expect(s.LTTBFeather(array2, 3)).toEqual(array2)
        expect(s.LTTBFeather(array, 2)).toEqual([{x: 1, y: 2}, {x: 3, y: 4}])
        expect(s.LTTBFeather(array2, 2)).toEqual([{x: 1, y1: 4, y2: 3}, {x: 3, y1: 5, y2: 5}])
        expect(s.LTTBFeather(array3, 3)).toEqual([{x: 1, y: 2}, {x: 3, y: 4}, {x: 4, y: 2}])
        expect(s.LTTBFeather(array, 1)).toEqual([{x: 2, y: 3}])
        expect(s.LTTBFeather(array, 0)).toEqual([])
        expect(s.LTTBFeather([], 3)).toEqual([])

      it 'splitAndFeather: should return a data array', ->
        expect(s.splitAndFeather(array, 3, (d)-> d.y != undefined)).toEqual([array])
        expect(s.splitAndFeather(array2, 3, (d)-> d.y1 != undefined and d.y2 != undefined)).toEqual([array2])
        expect(s.splitAndFeather(array3, 3, (d)-> d.y != undefined)).toEqual([[{x: 1, y: 2}, {x: 3, y: 4}, {x: 4, y: 2}]])

    describe 'setter/getters should work', ->

      checkSetterGetterAndOption = (property, valuesToCheck) ->
        it 'property ' + property + ' should set and get correctly', ->
          valuesToCheck.forEach (v) ->
            graph = new hx.Graph(hx.detached('div').node())
            expect(graph[property](v)).toEqual(graph)
            expect(graph[property]()).toEqual(v)

        it 'option ' + property + ' should get passed through', ->
          valuesToCheck.forEach (v) ->
            opts = {}
            opts[property] = v
            graph = new hx.Graph(hx.detached('div').node(), opts)
            expect(graph[property]()).toEqual(v)

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
            expect(axis[dim][property](v)).toEqual(axis)
            expect(axis[dim][property]()).toEqual(v)

        it 'option ' + property + ' should be passed through correctly', ->
          valuesToCheck.forEach (v) ->
            opts = {}
            opts[dim] = {}
            opts[dim][property] = v
            axis = new hx.Axis(opts)
            expect(axis[dim][property]()).toEqual(v)

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
          expect(series[property](v)).toEqual(series)
          expect(series[property]()).toEqual(v)

      it 'option ' + property + ' should get passed through as the initial value', ->
        valuesToCheck.forEach (v) ->
          opts = {}
          opts[property] = v
          series = new SeriesType(opts)
          expect(series[property]()).toEqual(v)

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

      checkOptionAndSetterGetter(hx.StraightLineSeries, 'strokeColor', ['rgba(1, 2, 3, 0.5)', 'red', [{ yValue: -4, color: 'red' }, {yValue: 4, color: 'green'}]])

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

  describe "hx.PieChart", ->

    describe 'setter/getters should work', ->

      checkSetterGetterAndOption = (property, valuesToCheck) ->
        it 'property ' + property + ' should set and get correctly', ->
          valuesToCheck.forEach (v) ->
            graph = new hx.PieChart(hx.detached('div').node())
            expect(graph[property](v)).toEqual(graph)
            expect(graph[property]()).toEqual(v)

        it 'option ' + property + ' should get passed through', ->
          valuesToCheck.forEach (v) ->
            opts = {}
            opts[property] = v
            graph = new hx.PieChart(hx.detached('div').node(), opts)
            expect(graph[property]()).toEqual(v)

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
