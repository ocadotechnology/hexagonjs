describe 'fluid', ->
  describe 'hx.div', ->
    it 'should create a selection', ->
      hx.div().should.be.an.instanceof(hx.Selection)

    it 'should create a div element', ->
      hx.div().node().nodeName.toLowerCase().should.equal('div')

    it 'should have no class if no class is supplied', ->
      hx.div().class().should.equal('')

    it 'should have a class if a class is supplied', ->
      hx.div('some-class').class().should.equal('some-class')

  describe 'hx.span', ->
    it 'should create a selection', ->
      hx.span().should.be.an.instanceof(hx.Selection)

    it 'should create a span element', ->
      hx.span().node().nodeName.toLowerCase().should.equal('span')

    it 'should have no class if no class is supplied', ->
      hx.span().class().should.equal('')

    it 'should have a class if a class is supplied', ->
      hx.span('some-class').class().should.equal('some-class')
