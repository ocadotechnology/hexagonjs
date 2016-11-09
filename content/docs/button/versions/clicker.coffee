all = false
count = 0
unlocked = 0
total = 6
last10 = []
clickFast = false

unlock = (msg) ->
  unlocked++
  hx.notify.info('Achievement Unlocked (' + unlocked + '/' + total + '): ' + msg)

selection = dx.select('.example').selectAll('.hx-btn')
clicks = dx.range(selection.size()).map((d) -> false)
selection.forEach (node, i) ->
  node.on 'click', ->
    count++
    clicks[i] = true

    if clicks.indexOf(false) is -1 and not all
      all = true
      unlock('Clicked every button!')

    millis = Date.now()
    last10.push(millis)
    last10 = last10.slice(-10)
    if dx.max(last10) - dx.min(last10) < 1200 and last10.length is 10 and not clickFast
      unlock('Click really really fast!')
      clickFast = true

    if count==10 then unlock('Clicked 10 buttons!')
    else if count==25 then unlock('Clicked 25 buttons!')
    else if count==100
      unlock('Clicked 100 buttons!')
    else if count==10000
      unlock('Clicked 10000 buttons!')








