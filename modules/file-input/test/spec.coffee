describe "File Input", ->
  fakeFileList = undefined
  fixture = hx.select('body').append('div')

  origConsoleWarning = hx.consoleWarning

  fakeFile1 =
    name: 'file-1.ext'
    size: 23
    lastModified: new Date()
    type: 'text/plain'

  fakeFile2 =
    name: 'file-2.png'
    size: 213
    lastModified: new Date()
    type: 'image/png'


  beforeEach ->
    hx.consoleWarning = chai.spy()
    fixture.clear()

  afterEach ->
    hx.consoleWarning = origConsoleWarning

  after ->
    fixture.remove()

  emitEvent = (node, event, data) ->
    hx.select.getHexagonElementDataObject(node).eventEmitter
      .emit event, data

  setValue = (s, f) ->
    emitEvent s.select('input').node(), 'change', target: files: f

  it 'should show an error when you try to set the value with the api', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node())
    hx.consoleWarning.should.not.have.been.called()
    fileInput.value()
    hx.consoleWarning.should.not.have.been.called()
    fileInput.value('anything other than undefined')
    hx.consoleWarning.should.have.been.called()

  it 'should use the default text correctly for single file inputs', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node())
    selection.select('.hx-file-input-button span').text().should.equal('Choose File')
    selection.select('.hx-file-input-selected div').text().should.equal('No File Chosen')

  it 'should use the default text correctly for multi file inputs', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node(), {
      multiple: true
    })
    selection.select('.hx-file-input-button span').text().should.equal('Choose Files')
    selection.select('.hx-file-input-selected div').text().should.equal('No File Chosen')

  it 'should correclty detect and use the full width option', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node(), {
      fullWidth: true
    })
    selection.classed('hx-file-input-full-width').should.equal(true)

  it 'should allow any files by default', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node())
    setValue selection, [ fakeFile1 ]
    hx.consoleWarning.should.not.have.been.called()
    fileInput.value().should.eql([ fakeFile1 ])
    setValue selection, [ fakeFile2 ]
    hx.consoleWarning.should.not.have.been.called()
    fileInput.value().should.eql([ fakeFile2 ])

  it 'should allow only a single file by default', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node())
    setValue selection, [ fakeFile1, fakeFile2 ]
    hx.consoleWarning.should.not.have.been.called()
    fileInput.value().should.eql([ fakeFile1 ])

  it 'should allow multiple files when multiple is true', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node(), { multiple: true })
    setValue selection, [ fakeFile1, fakeFile2 ]
    hx.consoleWarning.should.not.have.been.called()
    fileInput.value().should.eql([ fakeFile1, fakeFile2 ])

  it 'should exclude files without an accepted extension', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node(), { acceptedExtensions: [ 'png' ] })
    cbSpy = chai.spy()
    fileInput.on 'fileextensionerror', cbSpy
    setValue selection, [ fakeFile1, fakeFile2 ]
    cbSpy.should.have.been.called()
    fileInput.value().should.eql([ fakeFile2 ])

  it 'should initialise with the correct disabled state', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node(), { disabled: true })
    selection.select('input').attr('disabled').should.equal('disabled')
    selection.select('button').attr('disabled').should.equal('disabled')
    selection.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(true)
    fileInput.disabled().should.equal(true)

  it 'should disable correctly', ->
    selection = fixture.append('div')
    fileInput = new hx.FileInput(selection.node())
    should.not.exist( selection.select('input').attr('disabled') )
    should.not.exist( selection.select('button').attr('disabled') )
    selection.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(false)
    fileInput.disabled().should.equal(false)

    fileInput.disabled(true).should.equal(fileInput)
    selection.select('input').attr('disabled').should.equal('disabled')
    selection.select('button').attr('disabled').should.equal('disabled')
    selection.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(true)
    fileInput.disabled().should.equal(true)

    fileInput.disabled(false).should.equal(fileInput)
    should.not.exist( selection.select('input').attr('disabled') )
    should.not.exist( selection.select('button').attr('disabled') )
    selection.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(false)
    fileInput.disabled().should.equal(false)

  it 'the fluid api version should return a selection', ->
    sel = fixture.append hx.fileInput()
    sel.classed 'hx-file-input'
      .should.equal(true)
    (sel.component() instanceof hx.FileInput).should.equal(true)