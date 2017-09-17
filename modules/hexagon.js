'use strict'

// Initialization
import { initAnimate } from 'animate/main'
import { initPointerEvents } from 'pointer-events/main'
import { initView } from 'view/main'
import { initMorphs } from 'morphs/main'
import { initTitleBar } from 'titlebar/main'

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
  filterRegex
} from 'filter/main'
export { userFacingText } from 'user-facing-text/main'
export { validateForm } from 'form/main'
export { palette } from 'palette/main'
export { format } from 'format/main'

// Components

export { spinner, spinnerWide } from 'spinner/main'
export { Modal, modalDialog, modalInput } from 'modal/main'
export { Dropdown } from 'dropdown/main'
export { Collapsible, initializeCollapsibles } from 'collapsible/main'
export { TitleBar } from 'titlebar/main'
export { Menu } from 'menu/main'
export { autoComplete, AutoComplete } from 'autocomplete/main'
export { numberPicker, NumberPicker } from 'number-picker/main'
export { buttonGroup, ButtonGroup } from 'button-group/main'
export { Picker, picker } from 'picker/main'

// XXX: these apis should be opt-in
initAnimate()       // XXX: remove
initPointerEvents() // XXX: make into a selection middleware
initView()          // XXX: remove?
initMorphs()        // XXX: remove

initTitleBar()

// module.exports = window.hx = merge([
//   require('./resize-events/main'),
//   require('./preferences/main'),
//   require('./date-localizer/main'),
//   require('./drag-container/main'),
//   require('./progress-bar/main'),
//   require('./sticky-table-headers/main'),
//   require('./autocomplete-feed/main'),
//   require('./picker/main'),
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
