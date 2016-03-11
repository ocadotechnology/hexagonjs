class FileInput extends hx.EventEmitter
  constructor: (@selector, options) ->
    super
    hx.component.register(@selector, this)
    self = this

    defaults =
      disabled: false
      fullWidth: false
      accept: undefined
      multiple: false
      dragEnabled: true
      buttonClass: 'hx-action'
      noFilesText: 'No File Chosen'
      filesSelectedText: 'Files Selected'
      buttonText: 'Choose File'

    resolvedOptions = hx.merge defaults, options

    # Regex for checking for image mime type
    imageType = /^image\//
    filePreview = (file) ->
      if imageType.test(file.type)
        image = hx.detached('img').class('hx-file-input-preview-image')
        node = image.node()
        node.file = file
        reader = new FileReader()
        reader.onload = (e) -> node.src = e.target.result
        reader.readAsDataURL(file)

      container = hx.detached('div').class 'hx-file-input-preview'

      removeButton = hx.detached 'span'
        .class 'hx-file-input-remove hx-text-negative'
        .add hx.icon({class: 'hx-icon hx-icon-close'})
        .on 'click', ->
          self._.fileMap.delete getFileUID file
          container.remove()
          handleFiles self._.fileMap

      container
        .add hx.detached('span').class('hx-file-input-preview-text').text(file.name)
        .add image
        .add removeButton

    getFileUID = (file) -> file.name + file.size + file.lastModified + file.type

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
          selectedFiles
            .classed 'hx-btn', true
            .add hx.detached('span').text "#{length} Files Selected"
            .add hx.detached('i').class 'hx-file-input-dropdown-icon hx-icon hx-icon-chevron-down'
            .on 'click', 'hx.file-input', -> dropdown.show()
      else
        selectedFiles.append 'span'
          .text resolvedOptions.noFilesText or ''

      @_.fileMap = fileMap

      @emit 'change',
        cause: 'user'
        data: @_.fileMap.values()

    fileListToMap = (fileList) ->
      # Deals with duplicates if the file has the same UID
      map = new hx.Map()
      for file in fileList
        fileUID = getFileUID file
        map.set(fileUID, file)
      map

    if resolvedOptions.multiple and not options.buttonText
      resolvedOptions.buttonText = 'Choose Files'

    selection = hx.select @selector
      .classed 'hx-file-input', true

    input = hx.detached 'input'
      .class 'hx-file-input-hidden'
      .attr 'type', 'file'
      .attr 'accept', resolvedOptions.accept
      .attr 'multiple', if resolvedOptions.multiple then 'multiple' else undefined

    group = hx.inputGroup()

    button = hx.detached 'button'
      .class "hx-file-input-button hx-btn #{resolvedOptions.buttonClass}"
      .on 'click', -> input.node().click()
      .add hx.detached('i').class('hx-file-input-icon hx-icon hx-icon-upload')
      .add hx.detached('span').text resolvedOptions.buttonText

    selectedFiles = hx.detached 'div'
      .class 'hx-file-input-selected hx-section'
      .text resolvedOptions.noFilesText or ''

    dropdownDiv = hx.detached 'div'
    setupDropdown = (element) ->
      sel = hx.select element
      self._.fileMap.values().map (file) ->
        sel.append filePreview(file)
    dropdown = new hx.Dropdown(dropdownDiv.node(), setupDropdown, {
      ddClass: 'hx-file-input-dropdown'
    })

    input.on 'change', (e) -> handleFiles fileListToMap e.target.files

    @_ =
      options: resolvedOptions
      input: input
      button: button
      fileMap: new hx.Map()

    if resolvedOptions.dragEnabled
      preventDefault = (e) ->
        e.preventDefault()
        e.stopPropagation()

      drop = (e) =>
        preventDefault(e)
        unless @_.disabled
          files = e.dataTransfer.files
          validates = true
          for file in files
            break if not validates
          if validates
            handleFiles fileListToMap files

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
      @_.disabled = disabled
      this
    else
      @_.disabled or false

  value: -> @_.fileMap.values()


hx.FileInput = FileInput