import { EventEmitter } from 'event-emitter/main'
import { select, detached } from 'selection/main'
import { merge, mergeDefined } from 'utils/main'

class Modal extends EventEmitter

  closeModal = (modal, event) ->
    body = select('body').classed('hx-modal-open', false)
    body.select('.hx-modal-container').remove()
    body.select('.hx-modal-shade').remove()
    modal.emit('hidestart')
    modal.emit('hide', event)
    modal.emit('hideend')

  constructor: (@title, @setup, options) ->
    super()

    @options = merge {
      closeWithShadeEnabled: true,
      closeButtonEnabled: true,
      titlebarRenderer: (node) -> select(node).text(@title),
      headerRenderer: (node, titleNode, closeButtonNode) ->
        select(node).add(titleNode).add(closeButtonNode)
    }, options

    @contentContainer = null


  show: (cb) ->
    # Clears the focus so pressing 'enter' does not cause buttons to call modal.show()
    document.activeElement?.blur()
    body = select('body').classed('hx-modal-open', true)
    shade = body.select('.hx-modal-shade')
    if shade.empty()
      shade = body.append('div').attr('class', 'hx-modal-shade')
      shade.style('opacity', 0).morph().with('fadein', 150).go()

    body.select('.hx-modal-container').remove()
    modalContainer = body.append('div').attr('class', 'hx-modal-container')
    modal = modalContainer.append('div').attr('class', 'hx-modal')
    titleContainer = modal.append('div')
      .class('hx-modal-title-container hx-header')
    title = detached('div').class('hx-modal-title')

    if @options.closeButtonEnabled
      closeButton = detached('div')
        .add(detached('i').class('hx-icon hx-icon-close'))
        .class('hx-modal-close hx-fixed')
          .on('click', 'hx.modal', => closeModal(this, {cause: 'button'}))
    else
      if not @title? or @title.length is 0
        titleContainer.classed('hx-modal-title-empty', true)

    if @options.closeWithShadeEnabled
      modalContainer.on 'click', 'hx.modal', (e) =>
        if not modal.contains(e.target) && select('body').contains(e.target)
          closeModal(this, {cause: 'shade'})

    @options.titlebarRenderer.call(this, title.node(), this)
    @options.headerRenderer.call(this, titleContainer.node(), title.node(), closeButton?.node(), this)

    @contentContainer = modal.append('div').attr('class', 'hx-modal-content')

    if @setup then @setup(@contentContainer.node(), this)

    @emit('show', @contentContainer.node())
    @emit('showstart')

    self = this
    modal
      .style('opacity', 0)
      .style('top', '-30px')
      .morph()
        .with('fadein', 150)
        .and -> modal.animate().style('top', '0px', 100)
        .then ->
          self.emit('showend')
          cb?()
        .go()

    this

  hide: ->
    closeModal(this, {cause: 'api'})
    this


makeButtons = (container, buttons, modal, callback) ->
  buttons.forEach (d) ->
    container.append('button')
      .attr('type', 'button')
      .class(d.classes)
      .add(detached('i').class(d.icon))
      .add(detached('span').text(' ' + d.text))
      .on 'click', 'hx.modal', ->
        callback?(d.value)
        modal.hide()
  return

getTitleRender = (icon) ->
  (elem, modal) ->
    elem = select(elem)
    if icon?
      elem.append('i').class(icon)
    elem.append('span').text(@title)

getHeaderRender = (titleClass) ->
  (elem, title, button, modal) ->
    select(elem).classed('hx-background-' + titleClass, true)
      .add(title)
      .add(button)

modalDialog = (title, message, callback, options) ->
  options = mergeDefined {
    callback: undefined
    buttons: [
      {text: 'Cancel', icon: 'hx-icon hx-icon-close', value: false, classes: 'hx-btn hx-negative' }
      {text: 'Confirm', icon: 'hx-icon hx-icon-check', value: true, classes: 'hx-btn hx-positive' }
    ]
    titleClass: undefined
    icon: undefined
  }, options

  setup = (element) ->
    container = select(element)
    message = container.append('div').class('hx-modal-message').text(message)
    buttonContainer = container.append('div').class('hx-modal-buttons')
    makeButtons buttonContainer, options.buttons, this, callback

  modal = new Modal(title, setup, {
    closeWithShadeEnabled: options.closeWithShadeEnabled,
    closeButtonEnabled: options.closeButtonEnabled
  })
  if options.titleClass?
    modal.options.headerRenderer = getHeaderRender(options.titleClass)
    modal.options.titlebarRenderer = getTitleRender(options.icon)
  modal.on 'hide', 'hx.modal', (d) -> if d.cause isnt 'api' then callback()
  modal.show()

modalInput = (title, message, callback, options) ->
  options = mergeDefined {
    value: ''
  }, options

  setup = (element) ->
    buttons = [
      {text: 'Cancel', icon: 'hx-icon hx-icon-close', value: false, classes: 'hx-btn hx-negative' }
      {text: 'Confirm', icon: 'hx-icon hx-icon-check', value: true, classes: 'hx-btn hx-positive' }
    ]
    container = select(element)
    message = container.append('span').class('hx-modal-message').text(message)
    input = container.append('input').class('hx-modal-input').text(this.options.value)
    buttonContainer = container.append('div').class('hx-modal-buttons')
    makeButtons buttonContainer, buttons, this, (res) ->
      if res then callback(input.value()) else callback(res)

  modal = new Modal title, setup, {
    closeWithShadeEnabled: options.closeWithShadeEnabled,
    closeButtonEnabled: options.closeButtonEnabled
  }
  modal.on 'close', 'hx.modal', (d) -> if d.cause isnt 'api' then callback()
  modal.show()

export {
  Modal,
  modal,
  modalDialog,
  modalInput
}