
import { interpolate } from 'modules/interpolate/main'

export default () ->
  describe 'interpolate', ->
    it 'works for numbers', ->
      interpolate(0, 10)(0.5).should.equal(5)

    it 'works for basic strings', ->
      interpolate('T0', 'T10')(0.5).should.equal('T5')

    it 'works for more complicated strings', ->
      interpolate('Number 1: 500px;', 'Number 1: 200px;')(0.5).should.equal('Number 1: 350px;')

    it 'works for more complicated strings 2', ->
      interpolate('Number 3: 500px;', 'Number 1: 200px;')(0.5).should.equal('Number 2: 350px;')

    it 'uses the second string when non number segments differ', ->
      interpolate('Number 3: 500px;', 'Nombre 1: 200px;')(0.5).should.equal('Nombre 2: 350px;')

    it 'applies special handling for colors', ->
      interpolate('rgba(255, 0, 0, 1)', 'rgba(0, 0, 0, 1)')(0.5).should.equal('rgba(128,0,0,1)')

    it 'applies special handling for colors', ->
      interpolate('#FF0000', '#000000')(0.5).should.equal('rgba(128,0,0,1)')

    it 'when strings dont match, uses the second', ->
      interpolate('T0 5 6', 'T10 7')(0.5).should.equal('T10 7')
