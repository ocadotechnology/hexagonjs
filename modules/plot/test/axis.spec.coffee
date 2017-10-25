import { Axis } from '../main/axis'

describe "Axis", ->

  it 'constructing an axis with new Axis should work', ->
    axis = new Axis()
    axis.x.scaleType().should.equal('linear')
    axis.y.scaleType().should.equal('linear')

    axis = new Axis({x: {scaleType: 'discrete'}, y: {scaleType: 'time'}})
    axis.x.scaleType().should.equal('discrete')
    axis.y.scaleType().should.equal('time')

  describe 'setter/getters should work', ->
    checkSetterGetterAndOption = (dim, property, valuesToCheck) ->
      it 'property ' + property + ' should set and get correctly', ->
        valuesToCheck.forEach (v) ->
          axis = new Axis
          axis[dim][property](v).should.equal(axis)
          axis[dim][property]().should.equal(v)

      it 'option ' + property + ' should be passed through correctly', ->
        valuesToCheck.forEach (v) ->
          opts = {}
          opts[dim] = {}
          opts[dim][property] = v
          axis = new Axis(opts)
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
      axis = new Axis
      a1 = axis.addSeries()
      a2 = axis.addSeries()
      axis.series().should.eql([a1, a2])

    it 'should be able to set the list of series', ->
      axis = new Axis
      a1 = axis.addSeries()
      a2 = axis.addSeries()
      axis.series().should.eql([a1, a2])
      axis.series([a2, a1]).should.eql(axis)
      axis.series().should.eql([a2, a1])

    it 'calculateYBounds: should not ignore non-auto parameters', ->
      axis = new Axis()
      axis.calculateYBounds('auto', 'auto').should.eql { ymin: 0, ymax: 0 }
      axis.calculateYBounds(1, 1).should.eql { ymin: 1, ymax: 1 }
      axis.calculateYBounds(-1, 'auto').should.eql { ymin: -1, ymax: 0 }

    it 'calculateYBounds: should correctly calculate y bounds when the data is sparse and the graph is stacked', ->
      axis = new Axis({
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
              fillColor: '#ffffff',
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
              fillColor: '#ffffff',
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

