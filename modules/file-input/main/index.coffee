import { userFacingText } from 'user-facing-text/main'
import { Map as HMap } from 'map/main'
import { select, div, button, i, input, span, detached } from 'selection/main'
import { Dropdown } from 'dropdown/main'
import { section, group } from 'layout/main'
import { EventEmitter } from 'event-emitter/main'
import { merge } from 'utils/main'
import { preferences } from 'preferences/main'
import logger from 'logger/main'

userFacingText({
  fileInput: {
    chooseFile: 'Choose File',
    chooseFiles: 'Choose Files'
    filesSelected: 'Files Selected: $numFiles',
    noFile: 'No File Chosen',
  }
})

getFileUID = (file) -> file.name + file.size + file.lastModified + file.type

fileValidator = (file, acceptedExtensions) ->
  if acceptedExtensions?.length
    extension = file.name.substr(file.name.lastIndexOf('.')+1)
    acceptedExtensions.indexOf(extension) > -1
  else
    true

fileListToMap = (fileList, acceptedExtensions, emitter, options) ->
  # Deals with duplicates if the file has the same UID
  # Also removes invalid files
  map = new HMap()
  for file in fileList
    if fileValidator file, acceptedExtensions
      fileUID = getFileUID file
      map.set(fileUID, file)
      unless options.multiple
        break
    else
      emitter.emit 'fileextensionerror',
        cause: 'user'
        value:
          accepted: acceptedExtensions
          filename: file.name
  map


export class FileInput extends EventEmitter
  constructor: (@selector, options) ->
    super()
    self = this

    resolvedOptions = merge({
      disabled: false
      fullWidth: false
      acceptedExtensions: undefined
      multiple: false
      dragEnabled: true
      buttonClass: 'hx-action'

      buttonText: userFacingText('fileInput', 'chooseFile')
      filesSelectedText: userFacingText('fileInput', 'filesSelected')
      noFilesText: userFacingText('fileInput', 'noFile')
    }, options)

    if resolvedOptions.multiple and not options.buttonText
      resolvedOptions.buttonText = userFacingText('fileInput', 'chooseFiles')

    selection = select(@selector)
      .classed('hx-file-input', true)
      .classed('hx-file-input-full-width', resolvedOptions.fullWidth)
      .api('file-input', this)
      .api(this)

    if resolvedOptions.acceptedExtensions?.length > 0
      acceptedExtensions = resolvedOptions.acceptedExtensions
      acceptedExtensionsString = resolvedOptions.acceptedExtensions
        .map((e) -> ".#{e}").join(',')

    fiInput = input('hx-file-input-hidden')
      .attr 'type', 'file'
      .attr 'accept', acceptedExtensionsString
      .attr 'multiple', if resolvedOptions.multiple then 'multiple' else undefined

    fiInput.on 'change', (e) =>
      if (e.target.files.length)
        handleFiles(fileListToMap(e.target.files, acceptedExtensions, this, resolvedOptions))
        fiInput.value('')

    fiGroup = div('hx-input-group hx-input-group-full-width hx-no-margin')

    fiButton = button("hx-file-input-button hx-btn hx-no-margin #{resolvedOptions.buttonClass}")
      .attr('type', 'button')
      .on('click', -> fiInput.node().click())
      .add i('hx-file-input-icon hx-icon hx-icon-upload')
      .add span().text(resolvedOptions.buttonText)

    noFilesTextDiv = section()
      .text resolvedOptions.noFilesText

    selectedFiles = section()
      .classed 'hx-file-input-selected', true
      .add noFilesTextDiv

    # Regex for checking for image mime type
    imageType = /^image\//
    filePreview = (file) ->
      if imageType.test(file.type)
        img = detached('img').node()
        # img.file = file
        reader = new FileReader()
        reader.onloadend = (e) -> img.src = e.target.result
        reader.readAsDataURL(file)
        image = section({ fixed: true })
          .classed('hx-file-input-preview-image', true)
          .add img

      container = group()
        .classed('hx-file-input-preview', true)

      text = section()
        .classed('hx-file-input-preview-text', true)
        .text file.name

      remove = section({ fixed: true })
        .classed('hx-file-input-preview-remove hx-text-negative', true)
        .add i('hx-icon hx-icon-close')
        .on 'click', ->
          self._.fileMap.delete getFileUID file
          container.remove()
          handleFiles self._.fileMap

      container
        .add text
        .add image
        .add remove

    handleFiles = (fileMap) =>
      selectedFiles.clear()
        .classed 'hx-btn', false
        .off('click', 'hx.file-input')

      length = fileMap.size
      if length
        if length is 1
          dropdown.hide() if dropdown.isOpen()
          selectedFiles.append filePreview(fileMap.values()[0])
        else
          localizedLength = length.toLocaleString(preferences.locale())
          filesSelectedText = resolvedOptions.filesSelectedText.replace('$numFiles', localizedLength)
          selectedFiles
            .classed 'hx-btn', true
            .add section().text filesSelectedText
            .add i('hx-file-input-dropdown-icon hx-icon hx-icon-chevron-down')
            .on('click', 'hx.file-input', -> dropdown.show())
      else
        selectedFiles.append noFilesTextDiv

      @_.fileMap = fileMap

      @emit 'change',
        cause: 'user'
        data: @_.fileMap.values()

    dropdownDiv = div()
    setupDropdown = () ->
      sel = div()
      self._.fileMap.values().map (file) ->
        sel.append filePreview(file)
      sel

    dropdown = new Dropdown(dropdownDiv, setupDropdown, {
      ddClass: 'hx-file-input-dropdown'
    })

    @_ =
      options: resolvedOptions
      fiInput: fiInput
      fiButton: fiButton
      selectedFiles: selectedFiles
      noFilesTextDiv: noFilesTextDiv
      fileMap: new HMap()

    if resolvedOptions.dragEnabled
      preventDefault = (e) ->
        e.preventDefault()
        e.stopPropagation()

      drop = (e) ->
        preventDefault(e)
        unless self._.disabled
          files = e.dataTransfer.files
          handleFiles fileListToMap(files, acceptedExtensions, this, resolvedOptions)

      selection
        .on 'dragenter', preventDefault
        .on 'dragover', preventDefault
        .on 'drop', drop

    if resolvedOptions.disabled then @disabled(resolvedOptions.disabled)

    selection
      .add(fiInput)
      .add(fiGroup
        .add(fiButton)
        .add(selectedFiles))
      .add(dropdownDiv)

  disabled: (disabled) ->
    if arguments.length
      disabledAttr = if disabled then 'disabled' else undefined
      @_.fiInput.attr 'disabled', disabledAttr
      @_.fiButton.attr 'disabled', disabledAttr
      @_.selectedFiles.classed 'hx-text-disabled hx-background-disabled', disabled
      @_.disabled = disabled
      @value(undefined) if disabled
      this
    else
      @_.disabled or false

  value: (value) ->
    if arguments.length
      if value?
        logger.warn(
          'FileInput::value',
          'It is not possible to set the value of a file input for security reasons. The value can only be cleared by passing in "undefined"'
        )
      else
        @_.fiInput.value('')
        @_.selectedFiles.clear()
          .classed 'hx-btn', false
          .off('click', 'hx.file-input')
        @_.selectedFiles.append @_.noFilesTextDiv
        @_.fileMap = new HMap
      this
    else
      @_.fileMap.values()

export fileInput = (options) ->
  selection = div()
  new FileInput(selection, options)
  selection
