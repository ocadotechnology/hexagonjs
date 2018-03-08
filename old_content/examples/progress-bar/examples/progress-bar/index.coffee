
progressbars = [1..7].map (i) -> new hx.ProgressBar '#progressbar-' + i

hx.select(document).on 'mousemove', (e) ->
  mouseAsUnit = Math.max(0, Math.min(1, (e.clientX/document.documentElement.clientWidth)*2-0.5))
  progressbars.forEach (p, i) -> p.value Math.pow(mouseAsUnit, 1 + i*0.2)

