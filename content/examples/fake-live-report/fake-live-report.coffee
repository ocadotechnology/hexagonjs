event = new hx.EventEmitter

realtimeUpdate = ->
  event.emit 'update'
  setTimeout realtimeUpdate, 50
realtimeUpdate()

slowUpdate = ->
  event.emit 'slow-update'
  setTimeout slowUpdate, 1000
slowUpdate()


formatTime = (date) -> moment(date).format('hh:mm:ss')

# graph 1

livegraph1 = new hx.Graph('#graph-1')
axis = livegraph1.addAxis()
axis.yMin = 0
axis.yScalePaddingMax = 0.1
axis.yTitle = 'Picks/Second'
axis.xTitle = 'Time'
axis.xTickSpacing = 100

start = new Date().getTime()
xformatter = formatTime
axis.xFormatter = (d) -> xformatter(new Date(d))

series = axis.addSeries('line', 'Picks Per Hour')
series.color = hx.theme.plot.colors[0]
series.fill = true
series.label.formatters['Picks'] = hx.format.si(3)
series.feather = 500

count1 = 500

f1 = (d) ->
  factor = 0.5
  (10000 + (Math.sin(d/count1*factor) + Math.sin(d/count1*100*factor + Math.random()/10) + Math.sin(d/20*factor + Math.random()) )*300 + Math.random()*200) / 1500

data1 = hx.range(count1).map (d) ->
  x: start + d * 50
  y: f1(d)

series.setData data1

livegraph1.render()

counter1 = count1

event.on 'update', ->
  #  livegraph1
  data1.shift()
  data1.push
    x: start + counter1 * 50
    y: f1(counter1)
  counter1++

  livegraph1.render()


# graph 2


livegraph2 = new hx.Graph('#graph-2')
axis = livegraph2.addAxis()
axis.yMin = 0
axis.yScalePaddingMax = 0.1
axis.yTitle = 'Picks/Second'
axis.xTitle = 'Time'
axis.xTickSpacing = 100

start = new Date().getTime()
xformatter = formatTime
axis.xFormatter = (d) -> xformatter(new Date(d))

series = axis.addSeries('line', 'Picks Per Hour')
series.color = hx.theme.plot.colors[1]
series.fill = true
series.label.formatters['Picks'] = hx.format.si(3)
series.feather = 500

count2 = 500

f2 = (d) ->
  factor = 0.5
  offset = 500
  (10000 + (Math.sin(d/count2*factor+ offset) + Math.sin(d/count2*100*factor + Math.random()/10 + offset) + Math.sin(d/20*factor + Math.random() + offset) )*300 + Math.random()*100) / 1500

data2 = hx.range(count2).map (d) ->
  x: start + d * 50
  y: f2(d)

series.setData data2

livegraph2.render()

counter2 = count2

event.on 'update', ->
  data2.shift()
  data2.push
    x: start + counter2 * 50
    y: f2(counter2)
  counter2++

  livegraph2.render()


# picks remaining pie chart
total = 850027
completed = 323456
remaining = total - completed


livepie = new hx.PieChart('#picks-remaining-graph')
livepie.innerPadding = 0.9
livepie.totalAngle = Math.PI
livepie.startAngle = -Math.PI/2
livepie.formatter = hx.format.si(3)

livepie.setData {
  name: "Picks"
  segments: [
    {
      name: "Completed",
      size: completed,
      color: hx.theme.plot.colors[0]
    },
    {
      name: "Remaining",
      size: remaining,
      color: '#DDD'
    }
  ]
}

livepie.render()


fmt = hx.format.si(3)
fmt2 = hx.format.si(4)

hx.select('#picks-remaining').text(fmt2(completed) + '/' + fmt(total))

event.on 'slow-update', ->
  amount = Math.round(Math.random()*100)
  completed+=amount
  remaining-=amount

  livepie.setData {
    name: "Picks"
    segments: [
      {
        name: "Completed",
        size: completed,
        color: hx.theme.plot.colors[0]
      },
      {
        name: "Remaining",
        size: remaining,
        color: '#DDD'
      }
    ]
  }

  livepie.render()

  hx.select('#picks-remaining').text(fmt2(completed) + '/' + fmt(total))

# picks remaining by aisle

livegraph3 = new hx.Graph('#graph-3')
axis = livegraph3.addAxis('discrete', 'linear')
axis.yMin = 0
axis.yScalePaddingMax = 0.1
axis.yTitle = 'Picks Remaining'
axis.xTitle = 'Aisle'
axis.xTickSpacing = 100

series = axis.addSeries('bar', 'Picks Remaining')
series.color = hx.theme.plot.colors[1]
series.fill = true
series.label.formatters['Picks'] = hx.format.si(3)
series.feather = 500

count3 = 20

f3 = (d) ->
  factor = 0.5
  offset = 500
  (10000 + (Math.sin(d/count3*factor+ offset) + Math.sin(d/count3*100*factor + Math.random()/100 + offset) + Math.sin(d/20*factor + Math.random() + offset) )*300 + Math.random()*100) / 1000

data3 = [ "FZP1B", "AZP1B", "AZP2B", "AZP3B", "AZP1C", "AZP2C", "AZP3C", "AZP1D", "AZP2D", "AZP3D", "AZP3A", "AZP3Z", "PZP1D", "CZP3D", "CZP2D", "CZP1D", "PZP1C", "CZP3C", "CZP2C", "PZP1B", "CZP3B", "CZP2B", "PZP1A", "CZP3A"].map (d) ->
  x: d
  y: total/count3 * (1 + (Math.random() - 0.5)*0.2)
  color: hx.hashList(hx.color(hx.theme.plot.colors[0]).range(1, 1, 0.2), d)

series.setData data3

livegraph3.render()

counter3 = count3

# picks remaining by wave

livegraph4 = new hx.Graph('#graph-4')
axis = livegraph4.addAxis('discrete', 'linear')
axis.yMin = 0
axis.yScalePaddingMax = 0.1
axis.yTitle = 'Picks'
axis.xTitle = 'Wave'
axis.xTickSpacing = 100

series = axis.addSeries('bar', 'Picks Remaining')
series.color = hx.theme.plot.colors[1]
series.fill = true
series.label.formatters['Picks'] = hx.format.si(3)
series.feather = 500

count3 = 40

data3 = hx.range(count3).map (d) ->
  x: d
  y: Math.min(Math.max(0, Math.pow(d, 3))*10, 18476 + Math.random()*1000)
  color: hx.cycle(hx.color(hx.theme.plot.colors[3]).range(1, 1, 0.2), d)

series.setData data3

livegraph4.render()

counter3 = count3
