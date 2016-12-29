chai = require('chai')

select = require('modules/selection/main')
should = chai.should()

describe 'component', ->
  describe 'Selection::api', ->
    it 'should return undefined when no api is registered', ->
      should.not.exist(select.detached('div').api())

    it 'should get and set an api object on a component', ->
      api = {}
      selection = select.detached('div')
      selection.api(api).should.equal(selection)
      selection.api().should.equal(api)

    it 'should not register an api object on a multi selection', ->
      api = {}
      selection = select.detached('div')
        .add('div')
        .add('div')
        .add('div')
        .selectAll('div')
      selection.api(api).should.equal(selection)
      selection.api().should.eql([undefined, undefined, undefined])

    it 'should return all apis from a multi-selection', ->
      api1 = {}
      api2 = {}
      api3 = {}
      selection = select.detached('div')
        .add(select.detached('div').api(api1))
        .add(select.detached('div').api(api2))
        .add(select.detached('div').api(api3))
        .selectAll('div')
      selection.api().should.eql([api1, api2, api3])
