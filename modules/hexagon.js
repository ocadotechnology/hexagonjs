'use strict'

// Initialization
import { initAnimate } from 'animate/main'
import { initPointerEvents } from 'pointer-events/main'
import { initView } from 'view/main'
import { initMorphs } from 'morphs/main'
import { initTitleBar } from 'titlebar/main'
import { initResizeEvents } from 'resize-events/main'
import { initFastClick } from 'fast-click/main'

// Include the version
export { version } from '../package.json'

// Utils
export { Set } from 'set/main'
export { Map } from 'map/main'
export { List } from 'list/main'
export {
  hash,
  transpose,
  supports,
  debounce,
  clamp,
  clampUnit,
  randomId,
  min,
  minBy,
  argmin,
  max,
  maxBy,
  argmax,
  range,
  sum,
  flatten,
  cycle,
  hashList,
  find,
  isNumber,
  isString,
  isFunction,
  isArray,
  isObject,
  isBoolean,
  isPlainObject,
  groupBy,
  unique,
  endsWith,
  startsWith,
  tween,
  defined,
  zip,
  extend,
  mergeImpl,
  merge,
  mergeDefined,
  shallowMerge,
  shallowMergeDefined,
  clone,
  shallowClone,
  vendor,
  identity
} from 'utils/main'
export { EventEmitter } from 'event-emitter/main'
export { color, isColor, isColorString } from 'color/main'
export {
  select,
  selectAll,
  isSelection,
  detached,
  div,
  span,
  input,
  button,
  checkbox,
  i
} from 'selection/main'
export { loop, transition, ease } from 'transition/main'
export { interpolate } from 'interpolate/main'
export { animate, morph } from 'animate/main'
export { sort, sortBy, compare, compareNullsLast, localeCompare } from 'sort/main'
export { ClickDetector } from 'click-detector/main'
export {
  notify,
  notifyInfo,
  notifyPositive,
  notifyWarning,
  notifyNegative,
  notifyLoading,
  notifyDefaultTimeout,
  NotificationManager
} from 'notify/main'
export {
  filterExact,
  filterStartsWith,
  filterContains,
  filterExcludes,
  filterGreater,
  filterLess,
  filterFuzzy,
  filterRegex,
  filterStringTypes,
  filterNumberTypes,
  filterTypes
} from 'filter/main'
export { userFacingText } from 'user-facing-text/main'
export { validateForm } from 'form/main'
export { palette } from 'palette/main'
export { format } from 'format/main'
export { preferences } from 'preferences/main'
export { dateTimeLocalizer } from 'date-localizer/main'
export { ColorScale } from 'color-scale/main'

// Components

export { spinner, spinnerWide } from 'spinner/main'
export { Modal, modalDialog, modalInput } from 'modal/main'
export { Dropdown } from 'dropdown/main'
export { Collapsible, initializeCollapsibles } from 'collapsible/main'
export { titleBar, TitleBar } from 'titlebar/main'
export { Menu } from 'menu/main'
export { autocomplete, Autocomplete } from 'autocomplete/main'
export { numberPicker, NumberPicker } from 'number-picker/main'
export { buttonGroup, ButtonGroup } from 'button-group/main'
export { picker, Picker } from 'picker/main'
export { inputGroup } from 'input-group/main'
export { group, section } from 'layout/main'
export { dragContainer, DragContainer } from 'drag-container/main'
export { progressBar, ProgressBar } from 'progress-bar/main'
export { toggle, Toggle } from 'toggle/main'
export { crumbtrail, Crumbtrail } from 'crumbtrail/main'
export { notice, noticeHead, noticeBody } from 'notice/main'
export { autocompletePicker, AutocompletePicker } from 'autocomplete-picker/main'
export { StickyTableHeaders } from 'sticky-table-headers/main'
export {
  graph,
  Graph,
  Axis,
  pieChart,
  PieChart,
  sparkline,
  Sparkline,
  LineSeries,
  BandSeries,
  ScatterSeries,
  BarSeries,
  StraightLineSeries,
  plotLabelStandard,
  plotLabelBasic
} from 'plot/main'

// XXX: these apis should be opt-in
initAnimate()       // XXX: remove
initPointerEvents() // XXX: make into a selection middleware
initResizeEvents()  // XXX: make into a selection middleware
initFastClick()     // XXX: make into a selection middleware
initView()          // XXX: remove view and replace with reactive lists and reactive objects?
initMorphs()        // XXX: remove

initTitleBar()

// module.exports = window.hx = merge([
//   require('./sticky-table-headers/main'),
//   require('./plot/main'),
//   require('./date-picker/main'),
//   require('./time-picker/main'),
//   require('./tag-input/main'),
//   require('./slider/main'),
//   require('./card/main'),
//   require('./label/main'),
//   require('./color-picker/main'),
//   require('./paginator/main'),
//   require('./time-slider/main'),
//   require('./date-time-picker/main')
// ])
