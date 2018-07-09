import { select, div, detached } from 'selection'
import { fileInput, FileInput } from 'file-input'
import { userFacingText } from 'user-facing-text'
import { config as dropdownConfig } from 'dropdown'
import logger from 'logger'

import { installFakeTimers } from 'test/utils/fake-time'
import { emit } from 'test/utils/fake-event'

import chai from 'chai'
should = chai.should()

export default () ->
  crossBrowserMakeFile = (content, name, options) ->
    try
      file = new File(content, name, options)
    catch e
      console.warn('Browser does not support File api')
      file = new Blob(content, options)
      file.name = name
      file.lastModified = options.lastModified

    file

  describe 'file-input', ->
    fakeFileList = undefined
    clock = undefined

    fixture = select('body').append(div())

    origConsoleWarning = logger.warn
    dropdownAnimationDuration = 200

    fakeFile1 = crossBrowserMakeFile(['content'], 'file-1.ext', {
      lastModified: new Date()
      type: 'text/plain'
    })

    fakeFile2 = crossBrowserMakeFile(['content2'], 'file-2.png', {
      lastModified: new Date()
      type: 'image/png'
    })

    fakeEvent = {
      # fake some dom event stuff
      stopPropagation: ->
    }

    beforeEach ->
      fixture.clear()
      clock = installFakeTimers()
      dropdownConfig.attachToSelector = fixture
      logger.warn = chai.spy()

    afterEach ->
      clock.restore()
      dropdownConfig.attachToSelector = 'body'
      logger.warn = origConsoleWarning

    after ->
      fixture.remove()

    testFileInput = (options, callback) ->
      sel = fixture.append('div')
      fi = new FileInput(sel, options)
      logger.warn.should.not.have.been.called()
      callback(sel, fi)


    it 'should have user facing text defined', ->
      userFacingText('fileInput','chooseFile').should.equal('Choose File')
      userFacingText('fileInput','chooseFiles').should.equal('Choose Files')
      userFacingText('fileInput','filesSelected').should.equal('Files Selected: $numFiles')
      userFacingText('fileInput','noFile').should.equal('No File Chosen')


    # Not sure how to test this?
    # it 'should load a preview image', ->


    it 'should show an error when you try to set the value with the api', ->
      testFileInput undefined, (sel, fileInputForTest) ->
        fileInputForTest.value().should.eql([])
        logger.warn.should.not.have.been.called()
        fileInputForTest.value('anything other than undefined').should.equal(fileInputForTest)
        logger.warn.should.have.been.called()


    it 'should pass the click through to the file input', ->
      testFileInput undefined, (sel, fileInputForTest) ->
        input = sel.select('.hx-file-input-hidden').node()
        chai.spy.on(input, 'click', () => undefined)
        emit(sel.select('.hx-file-input-button').node(), 'click', fakeEvent)
        input.click.should.have.been.called()


    it 'should use the default text correctly for single file inputs', ->
      testFileInput undefined, (sel, fileInputForTest) ->
        sel.select('.hx-file-input-button span').text().should.equal(userFacingText('fileInput','chooseFile'))
        sel.select('.hx-file-input-selected div').text().should.equal(userFacingText('fileInput','noFile'))


    it 'should use the default text correctly for multi file inputs', ->
      testFileInput { multiple: true }, (sel, fileInputForTest) ->
        sel.select('.hx-file-input-button span').text().should.equal(userFacingText('fileInput','chooseFiles'))
        sel.select('.hx-file-input-selected div').text().should.equal(userFacingText('fileInput','noFile'))


    it 'should correctly detect and use the full width option', ->
      testFileInput { fullWidth: true }, (sel, fileInputForTest) ->
        sel.classed('hx-file-input-full-width').should.equal(true)


    it 'should allow any files by default', ->
      testFileInput undefined, (sel, fileInputForTest) ->
        emit(sel.select('input').node(), 'change', { target: files: [ fakeFile1 ] })
        logger.warn.should.not.have.been.called()
        fileInputForTest.value().should.eql([ fakeFile1 ])
        emit(sel.select('input').node(), 'change', { target: files: [ fakeFile2 ] })
        logger.warn.should.not.have.been.called()
        fileInputForTest.value().should.eql([ fakeFile2 ])


    it 'should allow only a single file by default', ->
      testFileInput undefined, (sel, fileInputForTest) ->
        emit(sel.select('input').node(), 'change', { target: files: [ fakeFile1, fakeFile2 ] })
        logger.warn.should.not.have.been.called()
        fileInputForTest.value().should.eql([ fakeFile1 ])


    it 'should remove the file from the list when clicking the "x"', ->
      testFileInput undefined, (sel, fileInputForTest) ->
        emit(sel.select('input').node(), 'change', { target: files: [ fakeFile1 ] })
        logger.warn.should.not.have.been.called()
        fileInputForTest.value().should.eql([ fakeFile1 ])
        emit(sel.select('.hx-file-input-preview-remove').node(), 'click', fakeEvent)
        fileInputForTest.value().should.eql([])


    it 'should use the files selected text when selecting multiple files', ->
      testFileInput { multiple: true }, (sel, fileInputForTest) ->
        emit(sel.select('input').node(), 'change', { target: files: [ fakeFile1, fakeFile2 ] })
        logger.warn.should.not.have.been.called()
        fileInputForTest.value().should.eql([ fakeFile1, fakeFile2 ])
        sel.select('.hx-file-input-selected').text().should.equal(userFacingText('fileInput', 'filesSelected').replace('$numFiles', 2))


    it 'should hide the dropdown when the number of files changes from >1 to 1', ->
      testFileInput { multiple: true }, (sel, fileInputForTest) ->
        emit(sel.select('input').node(), 'change', { target: files: [ fakeFile1, fakeFile2 ] })
        logger.warn.should.not.have.been.called()
        fileInputForTest.value().should.eql([ fakeFile1, fakeFile2 ])
        emit(sel.select('.hx-file-input-selected').node(), 'click', fakeEvent)
        clock.tick(dropdownAnimationDuration)
        dropdown = fixture.select('.hx-file-input-dropdown')
        dropdown.empty().should.equal(false)
        emit(dropdown.select('.hx-file-input-preview-remove').node(), 'click', fakeEvent)
        fileInputForTest.value().should.eql([ fakeFile2 ])
        clock.tick(dropdownAnimationDuration)
        fixture.select('.hx-file-input-dropdown').empty().should.equal(true)
        sel.select('.hx-file-input-preview-remove').empty().should.equal(false)


    it 'should allow multiple files when multiple is true', ->
      testFileInput { multiple: true }, (sel, fileInputForTest) ->
        emit(sel.select('input').node(), 'change', { target: files: [ fakeFile1, fakeFile2 ] })
        logger.warn.should.not.have.been.called()
        fileInputForTest.value().should.eql([ fakeFile1, fakeFile2 ])


    it 'should exclude files without an accepted extension', ->
      testFileInput { acceptedExtensions: [ 'png' ] }, (sel, fileInputForTest) ->
        cbSpy = chai.spy()
        fileInputForTest.on 'fileextensionerror', cbSpy
        emit(sel.select('input').node(), 'change', { target: files: [ fakeFile1, fakeFile2 ] })
        cbSpy.should.have.been.called()
        fileInputForTest.value().should.eql([ fakeFile2 ])


    it 'should initialise with the correct disabled state', ->
      testFileInput { disabled: true }, (sel, fileInputForTest) ->
        sel.select('input').attr('disabled').should.equal('disabled')
        sel.select('button').attr('disabled').should.equal('disabled')
        sel.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(true)
        fileInputForTest.disabled().should.equal(true)


    it 'should disable correctly', ->
      testFileInput undefined, (sel, fileInputForTest) ->
        should.not.exist( sel.select('input').attr('disabled') )
        should.not.exist( sel.select('button').attr('disabled') )
        sel.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(false)
        fileInputForTest.disabled().should.equal(false)

        fileInputForTest.disabled(true).should.equal(fileInputForTest)
        sel.select('input').attr('disabled').should.equal('disabled')
        sel.select('button').attr('disabled').should.equal('disabled')
        sel.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(true)
        fileInputForTest.disabled().should.equal(true)

        fileInputForTest.disabled(false).should.equal(fileInputForTest)
        should.not.exist( sel.select('input').attr('disabled') )
        should.not.exist( sel.select('button').attr('disabled') )
        sel.select('.hx-file-input-selected').classed('hx-text-disabled hx-background-disabled').should.equal(false)
        fileInputForTest.disabled().should.equal(false)


    it 'should allow drag and drop by default', ->
      testFileInput undefined, (sel, fileInputForTest) ->
        fakeDragEvent = {
          preventDefault: chai.spy()
          stopPropagation: chai.spy()
          dataTransfer: {
            files: [ fakeFile1 ]
          }
        }
        emit(sel.node(), 'dragenter', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.once
        fakeDragEvent.stopPropagation.should.have.been.called.once

        emit(sel.node(), 'dragover', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.twice
        fakeDragEvent.stopPropagation.should.have.been.called.twice

        emit(sel.node(), 'drop', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.exactly(3)
        fileInputForTest.value().should.eql([ fakeFile1 ])


    it 'should allow drag and drop with multiple files', ->
      testFileInput { multiple: true }, (sel, fileInputForTest) ->
        fakeDragEvent = {
          preventDefault: chai.spy()
          stopPropagation: chai.spy()
          dataTransfer: {
            files: [ fakeFile1, fakeFile2 ]
          }
        }
        emit(sel.node(), 'dragenter', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.once
        fakeDragEvent.stopPropagation.should.have.been.called.once

        emit(sel.node(), 'dragover', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.twice
        fakeDragEvent.stopPropagation.should.have.been.called.twice

        emit(sel.node(), 'drop', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.exactly(3)
        fileInputForTest.value().should.eql([ fakeFile1, fakeFile2 ])


    it 'should not drag and drop when disabled', ->
      testFileInput { disabled: true }, (sel, fileInputForTest) ->
        fakeDragEvent = {
          preventDefault: chai.spy()
          stopPropagation: chai.spy()
          dataTransfer: {
            files: [ fakeFile1 ]
          }
        }
        emit(sel.node(), 'dragenter', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.once
        fakeDragEvent.stopPropagation.should.have.been.called.once

        emit(sel.node(), 'dragover', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.twice
        fakeDragEvent.stopPropagation.should.have.been.called.twice

        emit(sel.node(), 'drop', fakeDragEvent)
        fakeDragEvent.preventDefault.should.have.been.called.exactly(3)
        fileInputForTest.value().should.eql([])


    it 'should not drag and drop when dragEnabled is false', ->
      testFileInput { dragEnabled: false }, (sel, fileInputForTest) ->
        fakeDragEvent = {
          preventDefault: chai.spy()
          stopPropagation: chai.spy()
          dataTransfer: {
            files: [ fakeFile1 ]
          }
        }
        emit(sel.node(), 'dragenter', fakeDragEvent)
        fakeDragEvent.preventDefault.should.not.have.been.called()
        fakeDragEvent.stopPropagation.should.not.have.been.called()

        emit(sel.node(), 'dragover', fakeDragEvent)
        fakeDragEvent.preventDefault.should.not.have.been.called()
        fakeDragEvent.stopPropagation.should.not.have.been.called()

        emit(sel.node(), 'drop', fakeDragEvent)
        fakeDragEvent.preventDefault.should.not.have.been.called()
        fileInputForTest.value().should.eql([])


    it 'the fluid api version should return a sel', ->
      sel = fixture.append fileInput()
      sel.classed('hx-file-input').should.equal(true)
      (sel.api('file-input') instanceof FileInput).should.equal(true)
      (sel.api() instanceof FileInput).should.equal(true)
