'use strict'

// Include the version
export { version } from '../package.json'

// Utils
export { Set } from 'modules/set/main'
export { Map } from 'modules/map/main'
export { List } from 'modules/list/main'
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
} from 'modules/utils/main'
export { EventEmitter } from 'modules/event-emitter/main'
export { color, isColor, isColorString } from 'modules/color/main'
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
} from 'modules/selection/main'
export { loop, transition, ease } from 'modules/transition/main'
export { interpolate } from 'modules/interpolate/main'
export { animate, morph } from 'modules/animate/main'
export { sort, sortBy, compare, localeCompare } from 'modules/sort/main'
export { ClickDetector } from 'modules/click-detector/main'
export {
  notify,
  notifyInfo,
  notifyPositive,
  notifyWarning,
  notifyNegative,
  notifyLoading,
  notifyDefaultTimeout,
  NotificationManager
} from 'modules/notify/main'
export {
  filterExact,
  filterStartsWith,
  filterContains,
  filterExcludes,
  filterGreater,
  filterLess,
  filterFuzzy,
  filterRegex
} from 'modules/filter/main'
export { userFacingText } from 'modules/user-facing-text/main'
export { validateForm } from 'modules/form/main'
export { palette } from 'modules/palette/main'
export { format } from 'modules/format/main'

// Components

export { spinner, spinnerWide } from 'modules/spinner/main'
export { Modal, modalDialog, modalInput } from 'modules/modal/main'
export { Dropdown } from 'modules/dropdown/main'
export { Collapsible, initializeCollapsibles } from 'modules/collapsible/main'
export { TitleBar } from 'modules/titlebar/main'
export { Menu } from 'modules/menu/main'
export { autoComplete, AutoComplete } from 'modules/autocomplete/main'
export { numberPicker, NumberPicker } from 'modules/number-picker/main'

// Other things
import { initAnimate } from 'modules/animate/main'
import { initPointerEvents } from 'modules/pointer-events/main'
import { initView } from 'modules/view/main'
import { initMorphs } from 'modules/morphs/main'
import { initTitleBar } from 'modules/titlebar/main'

initTitleBar()

// XXX: these apis should be opt-in
initAnimate()       // XXX: remove
initPointerEvents() // XXX: make into a selection middleware
initView()          // XXX: remove?
initMorphs()        // XXX: remove




// module.exports = window.hx = merge([
//   require('./resize-events/main'),
//   require('./menu/main'),
//   require('./preferences/main'),
//   require('./date-localizer/main'),
//   require('./autocomplete/main'),
//   require('./number-picker/main'),
//   require('./drag-container/main'),
//   require('./progress-bar/main'),
//   require('./sticky-table-headers/main'),
//   require('./autocomplete-feed/main'),
//   require('./picker/main'),
//   require('./button-group/main'),
//   require('./plot/main'),
//   require('./date-picker/main'),
//   require('./time-picker/main'),
//   require('./tag-input/main'),
//   require('./titlebar/main'),
//   require('./slider/main'),
//   require('./card/main'),
//   require('./toggle/main'),
//   require('./spinner/main'),
//   require('./layout/main'),
//   require('./notice/main'),
//   require('./input-group/main'),
//   require('./label/main'),
//   require('./color-picker/main'),
//   require('./crumbtrail/main'),
//   require('./fast-click/main'),
//   require('./paginator/main'),
//   require('./time-slider/main')
//   require('./date-time-picker/main')
// ])
