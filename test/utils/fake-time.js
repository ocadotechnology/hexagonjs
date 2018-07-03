export function installFakeTimers () {
  let time = 0
  let timers = []
  let intervals = []
  let animationFrames = []
  const theRealSetTimeout = setTimeout
  const theRealDateNow = Date.now
  const theRealRequestAnimationFrame = requestAnimationFrame
  window.setTimeout = (f, timeout) => {
    const t = { f: f, time: time + timeout }
    timers.push(t)
    return t
  }
  window.setInterval = (f, timeout) => {
    const t = { f: f, start: time, timeout: timeout }
    intervals.push(t)
    return t
  }
  window.requestAnimationFrame = (f) => {
    animationFrames.push(f)
  }
  window.clearTimeout = (timeout) => {
    timers = timers.filter(t => t !== timeout)
  }
  window.clearInterval = (interval) => {
    intervals = intervals.filter(t => t !== interval)
  }
  Date.now = () => time

  return {
    tick: (delta) => {
      const oldAnimationFrames = animationFrames
      animationFrames = []
      oldAnimationFrames.forEach(f => f())

      time += delta
      const expiredTimers = timers.filter(t => t.time <= time)
      expiredTimers.forEach(t => t.f())
      timers = timers.filter(t => t.time > time)

      const triggeredIntervals = intervals.filter(t => {
        if (time >= t.start + t.timeout) {
          return (time - t.start - t.timeout) % t.timeout === 0
        } else {
          return false
        }
      })
      triggeredIntervals.forEach(t => t.f())
    },
    restore: () => {
      window.setTimeout = theRealSetTimeout
      Date.now = theRealDateNow
      window.requestAnimationFrame = theRealRequestAnimationFrame
    }
  }
}
