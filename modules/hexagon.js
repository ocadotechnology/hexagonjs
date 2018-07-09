'use strict'

// Initialization
import { initAnimate } from 'animate'
import { initPointerEvents } from 'pointer-events'
import { initView } from 'view'
import { initMorphs } from 'morphs'
import { initTitleBar } from 'titlebar'
import { initResizeEvents } from 'resize-events'
import { initFastClick } from 'fast-click'
import logger from 'logger'

// Include the version
export { version } from '../package.json'

// Utils
export { Set } from 'set'
export { Map } from 'map'
export { List } from 'list'
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
} from 'utils'
export { EventEmitter } from 'event-emitter'
export { color, isColor, isColorString } from 'color'
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
} from 'selection'
export { loop, transition, ease } from 'transition'
export { interpolate } from 'interpolate'
export { animate, morph } from 'animate'
export { sort, sortBy, compare, compareNullsLast, localeCompare } from 'sort'
export { ClickDetector } from 'click-detector'
export {
  notify,
  notifyInfo,
  notifyPositive,
  notifyWarning,
  notifyNegative,
  notifyLoading,
  notifyDefaultTimeout,
  NotificationManager
} from 'notify'
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
} from 'filter'
export { userFacingText } from 'user-facing-text'
export { palette } from 'palette'
export { format } from 'format'
export { preferences } from 'preferences'
export { dateTimeLocalizer } from 'date-localizer'
export { ColorScale } from 'color-scale'

// Components

export { spinner, spinnerWide } from 'spinner'
export { Modal, modalDialog, modalInput } from 'modal'
export { Dropdown } from 'dropdown'
export { Collapsible, initializeCollapsibles } from 'collapsible'
export { titleBar, TitleBar } from 'titlebar'
export { Menu } from 'menu'
export { autocomplete, Autocomplete } from 'autocomplete'
export { numberPicker, NumberPicker } from 'number-picker'
export { buttonGroup, ButtonGroup } from 'button-group'
export { picker, Picker } from 'picker'
export { inputGroup } from 'input-group'
export { group, section } from 'layout'
export { dragContainer, DragContainer } from 'drag-container'
export { progressBar, ProgressBar } from 'progress-bar'
export { toggle, Toggle } from 'toggle'
export { crumbtrail, Crumbtrail } from 'crumbtrail'
export { notice, noticeHead, noticeBody } from 'notice'
export { autocompletePicker, AutocompletePicker } from 'autocomplete-picker'
export { StickyTableHeaders } from 'sticky-table-headers'
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
} from 'plot'
export { theme } from 'theme'
export { label } from 'label'
export { colorPicker, ColorPicker } from 'color-picker'
export { slider, Slider } from 'slider'
export { timeSlider, TimeSlider } from 'time-slider'
export { card } from 'card'
export { paginator, Paginator } from 'paginator'
export { SideCollapsible } from 'side-collapsible'
export { DatePicker, datePicker } from 'date-picker'
export { pivotTable, PivotTable } from 'pivot-table'
export { timePicker, TimePicker } from 'time-picker'
export { tabs, Tabs } from 'tabs'
export {
  tree,
  Tree,
  initializeTrees // XXX: Remove this?
} from 'tree'
export {
  dataTable,
  DataTable,
  objectFeed,
  getAdvancedSearchFilter
} from 'data-table'
export { Sidebar } from 'sidebar'
export { tagInput, TagInput } from 'tag-input'
export { dateTimePicker, DateTimePicker } from 'date-time-picker'
export { validateForm, Form } from 'form'
export { fileInput, FileInput } from 'file-input'

// XXX: these apis should be opt-in
initAnimate()       // XXX: remove
initPointerEvents() // XXX: make into a selection middleware
initResizeEvents()  // XXX: make into a selection middleware
initFastClick()     // XXX: make into a selection middleware
initView()          // XXX: remove view and replace with reactive lists and reactive objects?
initMorphs()        // XXX: remove

initTitleBar()

const doctypeIsValid = document.doctype &&
  document.doctype.name === 'html' &&
  !(document.doctype.publicId || document.doctype.systemId)

if (!doctypeIsValid) {
  logger.warn('Missing <!DOCTYPE html> tag - you may have CSS problems without this tag. To fix this add <!DOCTYPE html> to the top of your html file. Detected doctype:', document.doctype)
}
