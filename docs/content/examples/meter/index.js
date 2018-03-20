var meter = new hx.Meter('#example')

var total = 5000

function update(){
  meter.value({
    unitText: 'Completed',
    total: total,
    completed: Math.round(completed.value()*total),
    tracker: Math.round(tracker.value()*total),
    marker: Math.round(marker.value()*total),
    markerText: 'Plan: ' + Math.round(marker.value()*total)
  })
}

var marker = new hx.Slider('#marker-slider')
  .on('change', update)
  .value(0.35)

var tracker = new hx.Slider('#tracker-slider')
  .on('change', update)
  .value(0.45)

var completed = new hx.Slider('#completed-slider')
  .on('change', update)
  .value(0.75)

update()