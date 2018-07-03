import { PieChart } from '../main/pie-chart'
import { div } from 'selection/main'

checkSetterGetterAndOption = (property, valuesToCheck) ->
  it 'property ' + property + ' should set and get correctly', ->
    valuesToCheck.forEach (v) ->
      graph = new PieChart(div())
      graph[property](v).should.equal(graph)
      graph[property]().should.equal(v)

  it 'option ' + property + ' should get passed through', ->
    valuesToCheck.forEach (v) ->
      opts = {}
      opts[property] = v
      graph = new PieChart(div(), opts)
      graph[property]().should.equal(v)

export default () ->
  describe "PieChart", ->
    describe 'setter/getters should work', ->
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
