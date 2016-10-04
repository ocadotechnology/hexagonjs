# utility method for setting up notifications
setupNotification = (notification, selection) ->
  icon = if notification.options.icon? and notification.options.icon.length > 0
    hx.detached('div').class('hx-notification-icon-container')
      .add(hx.detached('i').class('hx-notification-icon ' + notification.options.icon))

  content = hx.detached('div').class('hx-notification-content')
  notification.options.renderer(content.node(), notification.message)

  if notification.options.pinnable
    pin = hx.detached('div')
      .class('hx-notification-icon-container hx-notification-pin')
      .on('click', 'hx.notify', -> togglePin(notification))
      .add(hx.detached('i').attr('class', 'hx-icon hx-icon-thumb-tack'))

    notification.domPin = pin
    updatePinnedStatus(notification)

  close = hx.detached('div')
    .class('hx-notification-icon-container hx-notification-close')
    .on('click', 'hx.notify', -> notification.close())
    .add(hx.detached('i').class('hx-icon hx-icon-close'))


  selection
    .add(icon)
    .add(content)
    .add(pin)
    .add(close)

nextId = (manager) -> manager.currentId++

redraw = (manager) ->
  selection = hx.select(manager.selector)

  container = selection.select('#' + manager.uniqueId)
  if container.empty()
    container = selection.append('div').class('hx-notification-container')
      .attr('id', manager.uniqueId)

  view = container.view('.hx-notification')
  view.enter (d) ->
    selection = @append('div')
    selection
      .class('hx-notification ' + d.options.cssclass)
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
  i = manager.notifications.indexOf(notification)
  if i>=0 then manager.notifications.splice(i, 1)
  redraw(manager)

startTimeout = (notification, seconds) ->
  notification.timeoutId = window.setTimeout((=> notification.close()), seconds * 1000)

togglePin = (notification) -> if notification.pinned then notification.unpin() else notification.pin()

updatePinnedStatus = (notification) ->
  notification.domPin.classed('hx-notification-pin-pinned', notification.pinned)


class Notification
  constructor: (@manager, @message, options) ->
    @options = hx.merge {
      icon: undefined
      cssClass: undefined
      timeout: @manager._.defaultTimeout
      pinnable: true
      renderer: (node, message) -> hx.select(node).text(message)
    }, options

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
    startTimeout this, 1
    updatePinnedStatus(this)
    this


class NotificationManager
  # supply the containing div that you wish to attach the notification manager to.
  constructor: (@selector = 'body') ->
    @currentId = 0
    @notifications = []

    @uniqueId = 'hx-notify-' + hx.randomId()

    @_ = {
      defaultTimeout: 5
    }

  notify: (message, options) ->
    notification = new Notification(this, message, options)
    @notifications.push(notification)
    redraw(this)
    notification

  themedNotification = (manager, contextClass, iconClass, message, options) ->
    mergedOptions = hx.merge({
      icon: 'hx-icon ' + iconClass
    }, options)
    mergedOptions.cssclass = contextClass + ' ' + (options.cssclass or '')
    manager.notify(message, mergedOptions)

  info: (message, options = {}) ->
    themedNotification(this, 'hx-info', 'hx-icon-info', message, options)
  warning: (message, options = {}) ->
    themedNotification(this, 'hx-warning', 'hx-icon-warning', message, options)
  negative: (message, options = {}) ->
    themedNotification(this, 'hx-negative', 'hx-icon-error', message, options)
  positive: (message, options = {}) ->
    themedNotification(this, 'hx-positive', 'hx-icon-check', message, options)

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


hx.NotificationManager = NotificationManager

# Inbuilt notification manager related functions
inbuiltNotificationManager = new NotificationManager

hx.notify = (message, options) -> inbuiltNotificationManager.notify(message, options)
hx.notify.info = (message, options) -> inbuiltNotificationManager.info(message, options)
hx.notify.positive = (message, options) -> inbuiltNotificationManager.positive(message, options)
hx.notify.warning = (message, options) -> inbuiltNotificationManager.warning(message, options)
hx.notify.negative = (message, options) -> inbuiltNotificationManager.negative(message, options)
hx.notify.loading = (message) -> inbuiltNotificationManager.loading(message)
hx.notify.defaultTimeout = (timeout) -> inbuiltNotificationManager.defaultTimeout.apply(inbuiltNotificationManager, arguments)
