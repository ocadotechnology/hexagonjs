import { identity } from 'utils'

function loopUpdate (f, g) {
  if (!f()) {
    window.requestAnimationFrame(g)
  }
}

export function loop (f) {
  function g () {
    loopUpdate(f, g)
  }
  loopUpdate(f, g)
}

export function transition (millis, f, ease = identity, endCallback) {
  const start = Date.now()

  let cancelled = false
  function cancel () {
    cancelled = true
  }

  if (millis <= 0) {
    f(1, false)
    if (endCallback) {
      endCallback(false)
    }
    return identity
  } else {
    loop(() => {
      const alpha = (Date.now() - start) / millis
      if (alpha >= 1 || cancelled) {
        f(1, cancelled)
        if (endCallback) {
          endCallback(cancelled)
        }
        return true
      } else {
        f(ease(alpha), false)
        return false
      }
    })

    return cancel
  }
}

export const ease = {
  linear: identity,
  quad: (t) => t * t,
  cubic: (t) => t * t * t
}
