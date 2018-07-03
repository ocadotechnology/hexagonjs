import logger from 'logger'

import { select, detached, div, i, Selection } from 'selection'
import { merge, isString, isNumber, isArray, isObject, randomId } from 'utils'

# utility method for setting up notifications
setupNotification = (notification, selection) ->
  icon = if notification.options.icon? and notification.options.icon.length > 0
    div('hx-notification-icon-container')
      .add(detached('i').class('hx-notification-icon ' + notification.options.icon))

  content = div('hx-notification-content')
  msg = notification.message

  # We check `isNumber` here as in some cases it might be sensible to pass a number as the message (e.g. hx.notify.error(404))
  msgIsString = isString(msg) or isNumber(msg)

  msgIsNode = not msgIsString and ((msg instanceof Selection) or (msg instanceof HTMLElement))
  msgIsArrayOfNodes = msgIsNode or isArray(msg) and msg.every (item) ->
    (item instanceof Selection) or (item instanceof HTMLElement)

  msgIsObject = not msgIsString and not msgIsNode and not msgIsArrayOfNodes and isObject(msg)

  if msgIsString
    content.text(msg)
  else if msgIsNode or msgIsArrayOfNodes
    content.add(msg)
  else if msgIsObject and notification.options.renderer
    notification.options.renderer(content.node(), msg)
  else
    if msgIsObject
      logger.warn(
        'Notification created using an object with invalid arguments\n',
        'An object was passed to the notification without a renderer being defined\n'
        "message:",
        msg,
        "\nrenderer:",
        notification.options.renderer
      )
    else
      logger.warn(
        'Notification created using an object with invalid arguments\n',
        'The notification expected a String, Selection, HTMLElement or an Object with matching renderer but was passed:\n',
        "message:",
        msg
      )
    content.text('ERROR CONSTRUCTING NOTIFICATION')

  if notification.options.pinnable
    pin = div('hx-notification-icon-container hx-notification-pin')
      .on('click', 'hx.notify', -> togglePin(notification))
      .add(i('hx-icon hx-icon-thumb-tack'))

    notification.domPin = pin
    updatePinnedStatus(notification)

  close = div('hx-notification-icon-container hx-notification-close')
    .on('click', 'hx.notify', -> notification.close())
    .add(detached('i').class('hx-icon hx-icon-close'))

  selection
    .add(icon)
    .add(content)
    .add(pin)
    .add(close)

nextId = (manager) -> manager.currentId++

redraw = (manager) ->
  selection = select(manager.selector)

  container = selection.select('#' + manager.uniqueId)
  if container.empty()
    container = selection.append('div').class('hx-notification-container')
      .attr('id', manager.uniqueId)

  view = container.view('.hx-notification')
  view.enter (d) ->
    selection = @append('div')
    optionalClass = if d.options.cssclass then " #{d.options.cssclass}" else ''

    selection
      .class("hx-notification#{optionalClass}")
      .forEach (node) ->
        setupNotification(d, selection)
        d.trueHeight = selection.style('height')
      .style('opacity', 0)
      .style('height', 0)
      .style('padding-top', 0)
      .style('padding-bottom', 0)
      .style('margin-top', 0)
      .style('margin-bottom', 0)
      .morph()
        .with('expandv').and('fadein')
        .then -> selection.style('height', '')
        .go()

    selection.node()

  view.exit ->
    @style('overflow', 'hidden')
      .morph()
        .with('fadeout', 100)
        .then('collapsev', 100)
        .then => @remove()
        .go()

  view.apply(manager.notifications, (d) -> d.id)

removeNotification = (manager, notification) ->
  index = manager.notifications.indexOf(notification)
  if index >=0 then manager.notifications.splice(index, 1)
  redraw(manager)

startTimeout = (notification, seconds) ->
  notification.timeoutId = window.setTimeout((=> notification.close()), seconds * 1000)

togglePin = (notification) -> if notification.pinned then notification.unpin() else notification.pin()

updatePinnedStatus = (notification) ->
  notification.domPin.classed('hx-notification-pin-pinned', notification.pinned)

defaultRenderer = (node, message) -> select(node).text(message)

class Notification
  constructor: (@manager, @message, options) ->
    @options = merge({
      icon: undefined,
      cssclass: undefined,
      timeout: @manager._.defaultTimeout,
      pinnable: true,
      renderer: undefined
    }, options)

    @id = nextId(@manager)

    if @options.timeout
      startTimeout this, @options.timeout
      @pinned = false
    else
      @pinned = true

  close: ->
    removeNotification(@manager, this)
    this

  pin: ->
    @pinned = true
    # pinned things don't timeout
    window.clearTimeout(@timeoutId)
    updatePinnedStatus(this)
    this

  unpin: ->
    @pinned = false
    # an unpinned timeout should then disappear quickly, hence 1 second
    startTimeout(this, 1)
    updatePinnedStatus(this)
    this


export class NotificationManager
  # supply the containing div that you wish to attach the notification manager to.
  constructor: (@selector = 'body') ->
    @currentId = 0
    @notifications = []
    @uniqueId = 'hx-notify-' + randomId()

    @_ = {
      defaultTimeout: 5
    }

  notify: (message, options) ->
    notification = new Notification(this, message, options)
    @notifications.push(notification)
    redraw(this)
    notification

  info: (message, options = {}) ->
    @notify(message, merge {
      icon: 'hx-icon hx-icon-info'
      cssclass: 'hx-info'
    }, options)

  warning: (message, options = {}) ->
    @notify(message, merge {
      icon: 'hx-icon hx-icon-warning'
      cssclass: 'hx-warning'
    }, options)

  negative: (message, options = {}) ->
    @notify(message, merge {
      icon: 'hx-icon hx-icon-error'
      cssclass: 'hx-negative'
    }, options)

  positive: (message, options = {}) ->
    @notify(message, merge {
      icon: 'hx-icon hx-icon-check'
      cssclass: 'hx-positive'
    }, options)

  # shows a loading message (a permanent message with the a spinning loading icon)
  loading: (message) ->
    @notify(message, {
      icon: 'hx-spinner'
      cssclass: 'hx-loading'
      timeout: undefined
      pinnable: false
    })

  defaultTimeout: (timeout) ->
    if arguments.length > 0
      @_.defaultTimeout = timeout or 5
      this
    else
      @_.defaultTimeout

# Inbuilt notification manager related functions
inbuiltNotificationManager = new NotificationManager

export notify = (message, options) ->
  inbuiltNotificationManager.notify(message, options)

export notifyInfo = (message, options) ->
  inbuiltNotificationManager.info(message, options)

export notifyPositive = (message, options) ->
  inbuiltNotificationManager.positive(message, options)

export notifyWarning = (message, options) ->
  inbuiltNotificationManager.warning(message, options)

export notifyNegative = (message, options) ->
  inbuiltNotificationManager.negative(message, options)

export notifyLoading = (message) ->
  inbuiltNotificationManager.loading(message)

export notifyDefaultTimeout = (timeout) ->
  inbuiltNotificationManager.defaultTimeout.apply(inbuiltNotificationManager, arguments)
