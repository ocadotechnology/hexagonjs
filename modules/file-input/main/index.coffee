hx.userFacingText({
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
  map = new hx.Map()
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


class FileInput extends hx.EventEmitter
  constructor: (@selector, options) ->
    super()
    hx.component.register(@selector, this)
    self = this

    defaults =
      disabled: false
      fullWidth: false
      acceptedExtensions: undefined
      multiple: false
      dragEnabled: true
      buttonClass: 'hx-action'

      buttonText: hx.userFacingText('fileInput', 'chooseFile')
      filesSelectedText: hx.userFacingText('fileInput', 'filesSelected')
      noFilesText: hx.userFacingText('fileInput', 'noFile')

    resolvedOptions = hx.merge defaults, options

    if resolvedOptions.multiple and not options.buttonText
      resolvedOptions.buttonText = hx.userFacingText('fileInput', 'chooseFiles')

    selection = hx.select @selector
      .classed 'hx-file-input', true
      .classed 'hx-file-input-full-width', resolvedOptions.fullWidth

    if resolvedOptions.acceptedExtensions?.length > 0
      acceptedExtensions = resolvedOptions.acceptedExtensions
      acceptedExtensionsString = resolvedOptions.acceptedExtensions
        .map((e) -> ".#{e}").join(',')

    input = hx.detached 'input'
      .class 'hx-file-input-hidden'
      .attr 'type', 'file'
      .attr 'accept', acceptedExtensionsString
      .attr 'multiple', if resolvedOptions.multiple then 'multiple' else undefined

    group = hx.detached 'div'
      .class "hx-input-group hx-input-group-full-width hx-no-margin"

    button = hx.detached 'button'
      .attr 'type', 'button'
      .class "hx-file-input-button hx-btn hx-no-margin #{resolvedOptions.buttonClass}"
      .on 'click', -> input.node().click()
      .add hx.detached('i').class('hx-file-input-icon hx-icon hx-icon-upload')
      .add hx.detached('span').text resolvedOptions.buttonText

    noFilesTextDiv = hx.section()
      .text resolvedOptions.noFilesText

    selectedFiles = hx.section()
      .classed 'hx-file-input-selected', true
      .add noFilesTextDiv

    # Regex for checking for image mime type
    imageType = /^image\//
    filePreview = (file) ->
      if imageType.test(file.type)
        img = hx.detached('img').node()
        img.file = file
        reader = new FileReader()
        reader.onload = (e) -> img.src = e.target.result
        reader.readAsDataURL(file)
        image = hx.section.fixed()
          .classed('hx-file-input-preview-image', true)
          .add img

      container = hx.group()
        .classed('hx-file-input-preview', true)

      text = hx.section()
        .classed('hx-file-input-preview-text', true)
        .text file.name

      remove = hx.section.fixed()
        .classed('hx-file-input-preview-remove hx-text-negative', true)
        .add hx.icon({class: 'hx-icon hx-icon-close'})
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
          localizedLength = length.toLocaleString(hx.preferences.locale())
          filesSelectedText = resolvedOptions.filesSelectedText.replace('$numFiles', localizedLength)
          selectedFiles
            .classed 'hx-btn', true
            .add hx.section().text filesSelectedText
            .add hx.detached('i').class 'hx-file-input-dropdown-icon hx-icon hx-icon-chevron-down'
            .on 'click', 'hx.file-input', -> dropdown.show()
      else
        selectedFiles.append noFilesTextDiv

      @_.fileMap = fileMap

      @emit 'change',
        cause: 'user'
        data: @_.fileMap.values()

    dropdownDiv = hx.detached 'div'
    setupDropdown = (element) ->
      sel = hx.select element
      self._.fileMap.values().map (file) ->
        sel.append filePreview(file)

    dropdown = new hx.Dropdown(dropdownDiv.node(), setupDropdown, {
      ddClass: 'hx-file-input-dropdown'
    })

    input.on 'change', (e) =>
      if (e.target.files.length)
        handleFiles fileListToMap(e.target.files, acceptedExtensions, this, resolvedOptions)
        input.value('')

    @_ =
      options: resolvedOptions
      input: input
      button: button
      selectedFiles: selectedFiles
      noFilesTextDiv: noFilesTextDiv
      fileMap: new hx.Map()

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
      .add(input)
      .add(group
        .add(button)
        .add(selectedFiles))
      .add(dropdownDiv)

  disabled: (disabled) ->
    if arguments.length
      disabledAttr = if disabled then 'disabled' else undefined
      @_.input.attr 'disabled', disabledAttr
      @_.button.attr 'disabled', disabledAttr
      @_.selectedFiles.classed 'hx-text-disabled hx-background-disabled', disabled
      @_.disabled = disabled
      @value(undefined) if disabled
      this
    else
      @_.disabled or false

  value: (value) ->
    if arguments.length
      if value?
        hx.consoleWarning 'hx.FileInput.value: It is not possible to set the value of a file input for security reasons. The value can only be cleared by passing in "undefined"'
      else
        @_.input.value('')
        @_.selectedFiles.clear()
          .classed 'hx-btn', false
          .off('click', 'hx.file-input')
        @_.selectedFiles.append @_.noFilesTextDiv
        @_.fileMap = new hx.Map
      this
    else
      @_.fileMap.values()


hx.FileInput = FileInput

hx.fileInput = (options) ->
  selection = hx.detached('div')
  new FileInput(selection.node(), options)
  selection
