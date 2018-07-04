# use http://js2.coffee/ to convert the js to coffee and replace
# do ->
#  with:
# export default () ->

# replace window.addResizeListener with addResizeListener
# replace window.removeResizeListener with removeResizeListener
# change the retun value of the function to return an object {addResizeListener, removeResizeListener}


#~~~~~~~~~~~~~~~~~~~
# Define Detect element resize script here:
#~~~~~~~~~~~~~~~~~~~

###*
* Detect Element Resize
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
*
###

export default () ->
  attachEvent = document.attachEvent
  stylesCreated = false

  resetTriggers = (element) ->
    triggers = element.__resizeTriggers__
    expand = triggers.firstElementChild
    contract = triggers.lastElementChild
    expandChild = expand.firstElementChild
    contract.scrollLeft = contract.scrollWidth
    contract.scrollTop = contract.scrollHeight
    expandChild.style.width = expand.offsetWidth + 1 + 'px'
    expandChild.style.height = expand.offsetHeight + 1 + 'px'
    expand.scrollLeft = expand.scrollWidth
    expand.scrollTop = expand.scrollHeight
    return

  checkTriggers = (element) ->
    element.offsetWidth != element.__resizeLast__.width or element.offsetHeight != element.__resizeLast__.height

  scrollListener = (e) ->
    element = this
    resetTriggers this
    if @__resizeRAF__
      cancelFrame @__resizeRAF__
    @__resizeRAF__ = requestFrame(->
      if checkTriggers(element)
        element.__resizeLast__.width = element.offsetWidth
        element.__resizeLast__.height = element.offsetHeight
        element.__resizeListeners__.forEach (fn) ->
          fn.call element, e
          return
      return
    )
    return

  createStyles = ->
    if !stylesCreated
      #opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
      css = (if animationKeyframes then animationKeyframes else '') + '.resize-triggers { ' + (if animationStyle then animationStyle else '') + 'visibility: hidden; opacity: 0; z-index: -1;} ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }'
      head = document.head or document.getElementsByTagName('head')[0]
      style = document.createElement('style')
      style.type = 'text/css'
      if style.styleSheet
        style.styleSheet.cssText = css
      else
        style.appendChild document.createTextNode(css)
      head.appendChild style
      stylesCreated = true
    return

  if !attachEvent
    requestFrame = do ->
      raf = window.requestAnimationFrame or window.mozRequestAnimationFrame or window.webkitRequestAnimationFrame or (fn) ->
        window.setTimeout fn, 20
      (fn) ->
        raf fn
    cancelFrame = do ->
      cancel = window.cancelAnimationFrame or window.mozCancelAnimationFrame or window.webkitCancelAnimationFrame or window.clearTimeout
      (id) ->
        cancel id

    ### Detect CSS Animations support to detect element display/re-attach ###

    animation = false
    animationstring = 'animation'
    keyframeprefix = ''
    animationstartevent = 'animationstart'
    domPrefixes = 'Webkit Moz O ms'.split(' ')
    startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ')
    pfx = ''
    elm = document.createElement('fakeelement')
    if elm.style.animationName != undefined
      animation = true
    if animation == false
            i = 0
      while i < domPrefixes.length
        if elm.style[domPrefixes[i] + 'AnimationName'] != undefined
          pfx = domPrefixes[i]
          animationstring = pfx + 'Animation'
          keyframeprefix = '-' + pfx.toLowerCase() + '-'
          animationstartevent = startEvents[i]
          animation = true
          break
        i++
    animationName = 'resizeanim'
    animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } '
    animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; '

  addResizeListener = (element, fn) ->
    if attachEvent
      element.attachEvent 'onresize', fn
    else
      if !element.__resizeTriggers__
        if getComputedStyle(element).position == 'static'
          element.style.position = 'relative'
        createStyles()
        element.__resizeLast__ = {}
        element.__resizeListeners__ = []
        (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers'
        element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>'
        element.appendChild element.__resizeTriggers__
        resetTriggers element
        element.addEventListener 'scroll', scrollListener, true

        ### Listen for a css animation to detect element display/re-attach ###

        animationstartevent and element.__resizeTriggers__.addEventListener(animationstartevent, (e) ->
          if e.animationName == animationName
            resetTriggers element
          return
        )
      element.__resizeListeners__.push fn
    return

  removeResizeListener = (element, fn) ->
    if attachEvent
      element.detachEvent 'onresize', fn
    else
      element.__resizeListeners__.splice element.__resizeListeners__.indexOf(fn), 1
      if !element.__resizeListeners__.length
        element.removeEventListener 'scroll', scrollListener
        element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__)
    return

  return {
    addResizeListener: addResizeListener,
    removeResizeListener: removeResizeListener
  }
