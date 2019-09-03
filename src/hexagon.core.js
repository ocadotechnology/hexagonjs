// Initialization
import { initAnimate } from 'utils/animate';
import { initPointerEvents } from 'utils/pointer-events';
import { initView } from 'utils/view';
import { initMorphs } from 'utils/morphs';
import { initResizeEvents } from 'utils/resize-events';
import { initLogos } from 'components/logo';

import { initTitleBar } from 'components/titlebar';

import logger from 'utils/logger';

// Include the version
export { version } from '../package.json';

// Include access to the theme
export { theme, getThemeVariable } from 'utils/theme';

// Utils
export { Set } from 'utils/set';
export { Map } from 'utils/map';
export { List } from 'utils/list';
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
  mergeImpl,
  merge,
  mergeDefined,
  shallowMerge,
  shallowMergeDefined,
  clone,
  shallowClone,
  vendor,
  identity,
} from './utils/utils';
export { EventEmitter } from 'utils/event-emitter';
export { color, isColor, isColorString } from 'utils/color';
export {
  Selection,
  select,
  selectAll,
  isSelection,
  detached,
  div,
  span,
  input,
  button,
  checkbox,
  i,
  icon,
  component,
  components,
} from './utils/selection';
export { loop, transition, ease } from 'utils/transition';
export { interpolate } from 'utils/interpolate';
export { animate, morph } from 'utils/animate';
export {
  sort, sortBy, compare, compareNullsLast, localeCompare,
} from 'utils/sort';
export { ClickDetector } from 'utils/click-detector';
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
  filterTypes,
  filter,
} from 'utils/filter';
export { userFacingText } from 'utils/user-facing-text';
export { palette } from 'utils/palette';
export {
  exp,
  fixed,
  round,
  si,
  zeroPad,
  format,
} from 'utils/format';
export { preferences } from 'utils/preferences';
export { dateTimeLocalizer } from 'utils/date-localizer';
export { ColorScale } from 'utils/color-scale';

// Components

export { spinner, spinnerWide } from 'components/spinner';
export {
  Modal,
  modalDialog,
  modalInput,
  modal,
  modalCenter,
  modalRight,
  modalFullScreen,
} from 'components/modal';
export { Dropdown } from 'components/dropdown';
export { Collapsible, initializeCollapsibles } from 'components/collapsible';
export { titleBar, TitleBar } from 'components/titlebar';
export { dropdownButton } from 'components/dropdown-button';
export { moreButton } from 'components/more-button';
export { Menu } from 'components/menu';
export {
  autocomplete,
  Autocomplete,
  autocomplete as autoComplete,
  Autocomplete as AutoComplete,
} from 'components/autocomplete';
export { AutocompleteFeed } from 'utils/autocomplete-feed';
export { numberPicker, NumberPicker } from 'components/number-picker';
export { buttonGroup, ButtonGroup } from 'components/button-group';
export { picker, Picker } from 'components/picker';
export { inputGroup } from 'components/input-group';
export { group, section } from 'components/layout';
export { dragContainer, DragContainer } from 'components/drag-container';
export { progressBar, ProgressBar } from 'components/progress-bar';
export { visualizationBar, VisualizationBar } from 'components/visualization-bar';
export { toggle, Toggle } from 'components/toggle';
export { crumbtrail, Crumbtrail } from 'components/crumbtrail';
export { notice, noticeHead, noticeBody } from 'components/notice';
export { autocompletePicker, AutocompletePicker } from 'components/autocomplete-picker';
export { StickyTableHeaders } from 'components/sticky-table-headers';
export {
  notify,
  notifyInfo,
  notifyPositive,
  notifyWarning,
  notifyNegative,
  notifyLoading,
  notifyDefaultTimeout,
  NotificationManager,
} from 'components/notify';
export {
  alert,
  message,
  AlertManager,
} from 'components/alert';
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
  plotLabelBasic,
  plot,
} from 'components/plot';
export { label } from 'components/label';
export { badge } from 'components/badge';
export { slider, Slider } from 'components/slider';
export { timeSlider, TimeSlider } from 'components/time-slider';
export { card } from 'components/card';
export { paginator, Paginator } from 'components/paginator';
export { SideCollapsible } from 'components/side-collapsible';
export { DatePicker, datePicker } from 'components/date-picker';
export { pivotTable, PivotTable } from 'components/pivot-table';
export { timePicker, TimePicker } from 'components/time-picker';
export { tabs, Tabs } from 'components/tabs';
export {
  tree,
  Tree,
  initializeTrees, // XXX: Remove this?
} from 'components/tree';
export {
  dataTable,
  DataTable,
  objectFeed,
  getAdvancedSearchFilter,
} from 'components/data-table';
export { Sidebar } from 'components/sidebar';
export { tagInput, TagInput } from 'components/tag-input';
export { dateTimePicker, DateTimePicker } from 'components/date-time-picker';
export { validateForm, Form } from 'components/form';
export { fileInput, FileInput } from 'components/file-input';
export { meter, Meter } from 'components/meter';
export {
  parseHTML,
  cleanNode,
  scrollbarSize,
  parentZIndex,
  checkParents,
  isElement,
} from 'utils/dom-utils';
export {
  request,
  html,
  text,
  json,
  reshapedRequest,
} from 'utils/request';

export {
  drawing,
  Drawing,
} from 'components/drawing';

export {
  InlineMorphSection,
  MorphSection,
} from 'components/morph-section';

export {
  InlineEditable,
  inlineEditable,
} from 'components/inline-editable';

export {
  InlinePicker,
  inlinePicker,
} from 'components/inline-picker';

export {
  SingleSelect,
  singleSelect,
} from 'components/single-select';

export {
  logger,
};

export {
  errorPage,
} from 'components/error-pages';

// XXX: these apis should be opt-in
initAnimate(); // XXX: remove
initMorphs(); // XXX: remove
initView(); // XXX: remove view and replace with reactive lists and reactive objects?
initPointerEvents(); // XXX: make into a selection middleware
initResizeEvents(); // XXX: make into a selection middleware
initLogos(); // XXX: remove
initTitleBar();


const doctypeIsValid = document.doctype
  && document.doctype.name === 'html'
  && !(document.doctype.publicId || document.doctype.systemId);

if (!doctypeIsValid) {
  logger.warn('Missing <!DOCTYPE html> tag - you may have CSS problems without this tag. To fix this add <!DOCTYPE html> to the top of your html file. Detected doctype:', document.doctype);
}
