import {
  arcCurve,
  svgCurve
} from './utils'

import {
  plotLabelStandard,
  plotLabelBasic
} from './labels'

plot = {
  label:
    basic: plotLabelBasic
    standard: plotLabelStandard
  arcCurve
  svgCurve
}

export {
  arcCurve,
  svgCurve,
  plotLabelBasic,
  plotLabelStandard,
  plot
}

export { LineSeries } from './series/line-series'
export { BandSeries } from './series/band-series'
export { ScatterSeries } from './series/scatter-series'
export { BarSeries } from './series/bar-series'
export { StraightLineSeries } from './series/straight-line-series'
export { Axis } from './axis'

export { graph, Graph } from './graph'
export { pieChart, PieChart } from './pie-chart'
export { sparkline, Sparkline } from './sparkline'
