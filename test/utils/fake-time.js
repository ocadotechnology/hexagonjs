module.exports = {
  installFakeTimers: () => {
    let time = 0
    let timers = []
    const theRealSetTimeout = setTimeout
    const theRealDateNow = Date.now
    window.setTimeout = (f, timeout) => {
      timers.push({f: f, time: time + timeout})
    }
    Date.now = () => time

    return {
      tick: (delta) => {
        time += delta
        const expiredTimers = timers.filter(t => t.time <= time)
        expiredTimers.forEach(t => t.f())
        timers = timers.filter(t => t.time > time)
      },
      restore: () => {
        window.setTimeout = theRealSetTimeout
        Date.now = theRealDateNow
      }
    }
  }
}
