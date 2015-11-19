
# Segments will be sorted by value
percentageSegments = [
  {
    "class": 'hx-positive'
    "value": 0.2
  }
  {
    "class": 'hx-warning'
    "value": 0.3
  }
  {
    "class": 'hx-negative'
    "value": 0.7
  }
  {
    "class": 'hx-info'
    "value": 1
  }
  {
    "value": 0.1
  }
]


# Ratio value defaults to 1. Segments are not sorted.
ratioSegments = [
  {
    "ratio": 1
  }
  {
    "class": 'hx-positive'
  }
  {
    "class": 'hx-warning'
  }
  {
    "class": 'hx-negative'
  }
  {
    "class": 'hx-info'
    "ratio": 4
  }
]

progressbar1 = new hx.ProgressBar '#progressbar-1', {segments: percentageSegments, value: 1}
progressbar2 = new hx.ProgressBar '#progressbar-2', {segments: percentageSegments, animate: true}

progressbar3 = new hx.ProgressBar '#progressbar-3', {segments: ratioSegments, value: 1}
progressbar4 = new hx.ProgressBar '#progressbar-4', {segments: ratioSegments}

progressbar5 = new hx.ProgressBar '#progressbar-5', {value: 1}
progressbar5.value(1) # Set to 1 as the max bar size determines the progress

val = 0
reverse = false

fn = ->
  if reverse
    val -= 0.1
  else
    val += 0.1
  if val >= 1
    reverse = true
    val = 1
  else if val <= 0
    reverse = false
    val = 0
  progressbar2.value(val)
  progressbar4.value(val)

  seg1Val = val * 0.6 + 0.2
  seg2Val = val * 0.4 + 0.1
  segs = [
    {
      "class": 'hx-warning'
      value: seg1Val
    }
    {
      "class": 'hx-positive'
      value: seg2Val
    }
  ]
  progressbar5.segments(segs, true)

setInterval fn, 500
fn()