util = require('modules/util/main/utils')

next = util.vendor(window, "requestAnimationFrame") or (f) -> setTimeout(f, 17)

loopUpdate = (f, g) -> if not f() then next(g)

doLoop = (f) ->
  g = -> loopUpdate(f, g)
  loopUpdate(f, g)
  return

transition = (millis, f, ease = easeFuncs.linear, endCallback) ->
  start = Date.now()
  if millis <= 0
    f(1, false)
    if endCallback then endCallback(false)
    util.identity
  else
    cancelled = false
    module.exports.loop ->
      alpha = (Date.now() - start) / millis
      if alpha >= 1 or cancelled
        f(1, cancelled)
        if endCallback then endCallback(cancelled)
        true
      else
        f(ease(alpha), false)
        false
    -> cancelled = true

easeFuncs = {
  linear: util.identity
  quad: (t) -> t*t
  cubic: (t) -> t*t*t
}

module.exports = {
  loop: doLoop,
  ease: easeFuncs,
  transition: transition,
  # backwards compatibility
  hx: {
    loop: doLoop,
    ease: easeFuncs,
    transition: transition
  }
}
