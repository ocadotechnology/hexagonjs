describe "file-input", ->
  fakeFileList = undefined
  fixture = undefined
  clock = undefined
  origConsoleWarning = hx.consoleWarning
  origDropdownAttachSelector = hx._.dropdown.attachToSelector
  dropdownAnimationDuration = 200

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

  fakeEvent = {
    # fake some dom event stuff
    stopPropagation: ->
  }

  before ->
    hx.consoleWarning = chai.spy()
    hx._.dropdown.attachToSelector = '#fixture'
    clock = sinon.useFakeTimers()

  beforeEach ->
    hx.consoleWarning.reset()
    fixture?.remove()
    fixture = hx.select('body').append('div').attr('id', 'fixture')

  after ->
    fixture.remove()
    hx.consoleWarning = origConsoleWarning
    hx._.dropdown.attachToSelector = origDropdownAttachSelector
    clock.restore()

  fakeNodeEvent = (node, eventName) ->
    if node?
      (e) -> hx.select.getHexagonElementDataObject(node).eventEmitter?.emit((if eventName? and isNaN(eventName) then eventName else 'click'), e)

  testFileInput = (options, callback) ->
    sel = fixture.append('div')
    fileInput = new hx.FileInput(sel.node(), options)
    hx.consoleWarning.should.not.have.been.called()
    callback(sel, fileInput)


  it 'should have user facing text defined', ->
    hx.userFacingText('fileInput','chooseFile').should.equal('Choose File')
    hx.userFacingText('fileInput','chooseFiles').should.equal('Choose Files')
    hx.userFacingText('fileInput','filesSelected').should.equal('Files Selected: $numFiles')
    hx.userFacingText('fileInput','noFile').should.equal('No File Chosen')


  # Not sure how to test this?
  # it 'should load a preview image', ->


  it 'should show an error when you try to set the value with the api', ->
    testFileInput undefined, (sel, fileInput) ->
      fileInput.value().should.eql([])
      hx.consoleWarning.should.not.have.been.called()
      fileInput.value('anything other than undefined').should.equal(fileInput)
      hx.consoleWarning.should.have.been.called()


  it 'should pass the click through to the file input', ->
    testFileInput undefined, (sel, fileInput) ->
      input = sel.select('.hx-file-input-hidden').node()
      chai.spy.on(input, 'click')
      fakeNodeEvent(sel.select('.hx-file-input-button').node(), 'click')(fakeEvent)
      input.click.should.have.been.called()


  it 'should use the default text correctly for single file inputs', ->
    testFileInput undefined, (sel, fileInput) ->
      sel.select('.hx-file-input-button span').text().should.equal(hx.userFacingText('fileInput','chooseFile'))
      sel.select('.hx-file-input-selected div').text().should.equal(hx.userFacingText('fileInput','noFile'))


  it 'should use the default text correctly for multi file inputs', ->
    testFileInput { multiple: true }, (sel, fileInput) ->
      sel.select('.hx-file-input-button span').text().should.equal(hx.userFacingText('fileInput','chooseFiles'))
      sel.select('.hx-file-input-selected div').text().should.equal(hx.userFacingText('fileInput','noFile'))


  it 'should correctly detect and use the full width option', ->
    testFileInput { fullWidth: true }, (sel, fileInput) ->
      sel.classed('hx-file-input-full-width').should.equal(true)


  it 'should allow any files by default', ->
    testFileInput undefined, (sel, fileInput) ->
      fakeNodeEvent(sel.select('input').node(), 'change')({ target: files: [ fakeFile1 ] })
      hx.consoleWarning.should.not.have.been.called()
      fileInput.value().should.eql([ fakeFile1 ])
      fakeNodeEvent(sel.select('input').node(), 'change')({ target: files: [ fakeFile2 ] })
      hx.consoleWarning.should.not.have.been.called()
      fileInput.value().should.eql([ fakeFile2 ])


  it 'should allow only a single file by default', ->
    testFileInput undefined, (sel, fileInput) ->
      fakeNodeEvent(sel.select('input').node(), 'change')({ target: files: [ fakeFile1, fakeFile2 ] })
      hx.consoleWarning.should.not.have.been.called()
      fileInput.value().should.eql([ fakeFile1 ])


  it 'should remove the file from the list when clicking the "x"', ->
    testFileInput undefined, (sel, fileInput) ->
      fakeNodeEvent(sel.select('input').node(), 'change')({ target: files: [ fakeFile1 ] })
      hx.consoleWarning.should.not.have.been.called()
      fileInput.value().should.eql([ fakeFile1 ])
      fakeNodeEvent(sel.select('.hx-file-input-preview-remove').node(), 'click')(fakeEvent)
      fileInput.value().should.eql([])


  it 'should use the files selected text when selecting multiple files', ->
    testFileInput { multiple: true }, (sel, fileInput) ->
      fakeNodeEvent(sel.select('input').node(), 'change')({ target: files: [ fakeFile1, fakeFile2 ] })
      hx.consoleWarning.should.not.have.been.called()
      fileInput.value().should.eql([ fakeFile1, fakeFile2 ])
      sel.select('.hx-file-input-selected').text().should.equal(hx.userFacingText('fileInput', 'filesSelected').replace('$numFiles', 2))


  it 'should hide the dropdown when the number of files changes from >1 to 1', ->
    testFileInput { multiple: true }, (sel, fileInput) ->
      fakeNodeEvent(sel.select('input').node(), 'change')({ target: files: [ fakeFile1, fakeFile2 ] })
      hx.consoleWarning.should.not.have.been.called()
      fileInput.value().should.eql([ fakeFile1, fakeFile2 ])
      fakeNodeEvent(sel.select('.hx-file-input-selected').node(), 'click')(fakeEvent)
      clock.tick(dropdownAnimationDuration)
      dropdown = hx.select('#fixture').select('.hx-file-input-dropdown')
      dropdown.empty().should.equal(false)
      fakeNodeEvent(dropdown.select('.hx-file-input-preview-remove').node(), 'click')(fakeEvent)
      fileInput.value().should.eql([ fakeFile2 ])
      clock.tick(dropdownAnimationDuration)
      hx.select('#fixture').select('.hx-file-input-dropdown').empty().should.equal(true)
      sel.select('.hx-file-input-preview-remove').empty().should.equal(false)


  it 'should allow multiple files when multiple is true', ->
    testFileInput { multiple: true }, (sel, fileInput) ->
      fakeNodeEvent(sel.select('input').node(), 'change')({ target: files: [ fakeFile1, fakeFile2 ] })
      hx.consoleWarning.should.not.have.been.called()
      fileInput.value().should.eql([ fakeFile1, fakeFile2 ])


  it 'should exclude files without an accepted extension', ->
    testFileInput { acceptedExtensions: [ 'png' ] }, (sel, fileInput) ->
      cbSpy = chai.spy()
      fileInput.on 'fileextensionerror', cbSpy
      fakeNodeEvent(sel.select('input').node(), 'change')({ target: files: [ fakeFile1, fakeFile2 ] })
      cbSpy.should.have.been.called()
      fileInput.value().should.eql([ fakeFile2 ])


  it 'should initialise with the correct disabled state', ->
    testFileInput { disabled: true }, (sel, fileInput) ->
      sel.select('input').attr('disabled').should.equal('disabled')
      sel.select('button').attr('disabled').should.equal('disabled')
      sel.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(true)
      fileInput.disabled().should.equal(true)


  it 'should disable correctly', ->
    testFileInput undefined, (sel, fileInput) ->
      should.not.exist( sel.select('input').attr('disabled') )
      should.not.exist( sel.select('button').attr('disabled') )
      sel.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(false)
      fileInput.disabled().should.equal(false)

      fileInput.disabled(true).should.equal(fileInput)
      sel.select('input').attr('disabled').should.equal('disabled')
      sel.select('button').attr('disabled').should.equal('disabled')
      sel.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(true)
      fileInput.disabled().should.equal(true)

      fileInput.disabled(false).should.equal(fileInput)
      should.not.exist( sel.select('input').attr('disabled') )
      should.not.exist( sel.select('button').attr('disabled') )
      sel.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(false)
      fileInput.disabled().should.equal(false)


  it 'should allow drag and drop by default', ->
    testFileInput undefined, (sel, fileInput) ->
      fakeDragEvent = {
        preventDefault: chai.spy()
        stopPropagation: chai.spy()
        dataTransfer: {
          files: [ fakeFile1 ]
        }
      }
      fakeNodeEvent(sel.node(), 'dragenter')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.once()
      fakeDragEvent.stopPropagation.should.have.been.called.once()

      fakeNodeEvent(sel.node(), 'dragover')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.twice()
      fakeDragEvent.stopPropagation.should.have.been.called.twice()

      fakeNodeEvent(sel.node(), 'drop')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.exactly(3)
      fileInput.value().should.eql([ fakeFile1 ])


  it 'should allow drag and drop with multiple files', ->
    testFileInput { multiple: true }, (sel, fileInput) ->
      fakeDragEvent = {
        preventDefault: chai.spy()
        stopPropagation: chai.spy()
        dataTransfer: {
          files: [ fakeFile1, fakeFile2 ]
        }
      }
      fakeNodeEvent(sel.node(), 'dragenter')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.once()
      fakeDragEvent.stopPropagation.should.have.been.called.once()

      fakeNodeEvent(sel.node(), 'dragover')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.twice()
      fakeDragEvent.stopPropagation.should.have.been.called.twice()

      fakeNodeEvent(sel.node(), 'drop')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.exactly(3)
      fileInput.value().should.eql([ fakeFile1, fakeFile2 ])


  it 'should not drag and drop when disabled', ->
    testFileInput { disabled: true }, (sel, fileInput) ->
      fakeDragEvent = {
        preventDefault: chai.spy()
        stopPropagation: chai.spy()
        dataTransfer: {
          files: [ fakeFile1 ]
        }
      }
      fakeNodeEvent(sel.node(), 'dragenter')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.once()
      fakeDragEvent.stopPropagation.should.have.been.called.once()

      fakeNodeEvent(sel.node(), 'dragover')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.twice()
      fakeDragEvent.stopPropagation.should.have.been.called.twice()

      fakeNodeEvent(sel.node(), 'drop')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.have.been.called.exactly(3)
      fileInput.value().should.eql([])


  it 'should not drag and drop when dragEnabled is false', ->
    testFileInput { dragEnabled: false }, (sel, fileInput) ->
      fakeDragEvent = {
        preventDefault: chai.spy()
        stopPropagation: chai.spy()
        dataTransfer: {
          files: [ fakeFile1 ]
        }
      }
      fakeNodeEvent(sel.node(), 'dragenter')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.not.have.been.called()
      fakeDragEvent.stopPropagation.should.not.have.been.called()

      fakeNodeEvent(sel.node(), 'dragover')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.not.have.been.called()
      fakeDragEvent.stopPropagation.should.not.have.been.called()

      fakeNodeEvent(sel.node(), 'drop')(fakeDragEvent)
      fakeDragEvent.preventDefault.should.not.have.been.called()
      fileInput.value().should.eql([])


  it 'the fluid api version should return a sel', ->
    sel = fixture.append hx.fileInput()
    sel.classed 'hx-file-input'
      .should.equal(true)
    (sel.component() instanceof hx.FileInput).should.equal(true)