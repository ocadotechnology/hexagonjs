next = hx.vendor(window, "requestAnimationFrame") or (f) -> setTimeout(f, 17)

loopUpdate = (f, g) -> if not f() then next(g)

hx.loop = (f) ->
  g = -> loopUpdate(f, g)
  loopUpdate(f, g)
  undefined

hx.transition = (millis, f, ease = hx.ease.linear, endCallback) ->
  start = (new Date).getTime()
  if millis <= 0
    f(1, false)
    if endCallback then endCallback(false)
    hx.identity
  else
    cancelled = false
    hx.loop ->
      alpha = ((new Date).getTime() - start) / millis
      if alpha >= 1 or cancelled
        f(1, cancelled)
        if endCallback then endCallback(cancelled)
        true
      else
        f(ease(alpha), false)
        false
    -> cancelled = true

hx.ease = hx_ease = {
  linear: hx.identity
  quad: (t) -> t*t
  cubic: (t) -> t*t*t
}
