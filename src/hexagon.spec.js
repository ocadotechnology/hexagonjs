'use strict'

import chai from 'chai'
import * as hx from 'hexagon'

// Internal utils
import loggerTests from 'utils/logger/spec'

// Utils
import setTests from 'utils/set/spec'
import mapTests from 'utils/map/spec'
import listTests from 'utils/list/spec'
import utilsTests from 'utils/utils/spec'
import colorTests from 'utils/color/spec'
import eventEmitterTests from 'utils/event-emitter/spec'
import selectionTests from 'utils/selection/spec'
import transitionTests from 'utils/transition/spec'
import interpolateTests from 'utils/interpolate/spec'
import pointerEventTests from 'utils/pointer-events/spec'
import viewTests from 'utils/view/spec'
import sortTests from 'utils/sort/spec'
import clickDetectorTests from 'utils/click-detector/spec'
import filterTests from 'utils/filter/spec'
import userFacingTextTests from 'utils/user-facing-text/spec'
import paletteTests from 'utils/palette/spec'
import formatTests from 'utils/format/spec'
import preferencesTests from 'utils/preferences/spec'
import dateTimeLocalizerTests from 'utils/date-localizer/spec'

// Components

import modalTests from 'components/modal/spec'
import dropdownTests from 'components/dropdown/spec'
import collapsibleTests from 'components/collapsible/spec'
import titlebarTests from 'components/titlebar/spec'
import menuTests from 'components/menu/spec'
import autocompleteTests from 'components/autocomplete/spec'
import autocompleteFeedTests from 'components/autocomplete-feed/spec'
import numberPickerTests from 'components/number-picker/spec'
import buttonGroupTests from 'components/button-group/spec'
import pickerTests from 'components/picker/spec'
import inputGroupTests from 'components/input-group/spec'
import dragContainerTests from 'components/drag-container/spec'
import progressBarTests from 'components/progress-bar/spec'
import crumbtrailTests from 'components/crumbtrail/spec'
// import autocompletePickerTests from 'components/autocomplete-picker/spec'
import notifyTests from 'components/notify/spec'
import plotTests from 'components/plot/spec'
import labelTests from 'components/label/spec'
import colorPickerTests from 'components/color-picker/spec'
import sliderTests from 'components/slider/spec'
import timeSliderTests from 'components/time-slider/spec'
import sideCollapsibleTests from 'components/side-collapsible/spec'
import datePickerTests from 'components/date-picker/spec'
import pivotTableTests from 'components/pivot-table/spec'
import timePickerTests from 'components/time-picker/spec'
import tabsTests from 'components/tabs/spec'
import treeTests from 'components/tree/spec'
import dataTableTests from 'components/data-table/spec'
import sidebarTests from 'components/sidebar/spec'
import tagInputTests from 'components/tag-input/spec'
import dateTimePickerTests from 'components/date-time-picker/spec'
import formTests from 'components/form/spec'
import fileInputTests from 'components/file-input/spec'
// import formBuilderTests from 'components/form-builder/spec'

chai.should()
const expect = chai.expect

describe('HexagonJS Test Suite', () => {
  // add a handle for when the tests are finished
  after(() => {
    if (window.hxTestFinished) {
      window.hxTestFinished()
    }
  })

  describe('hx', () => {
    it('hx export the right things', () => {
      // We just check the right things are being exposed here - actual type
      // checks for each of these objects/functions should be done in the
      // module tests

      const propertyList = [
        'version',
        'Set',
        'List',
        'Map',
        'hash',
        'transpose',
        'supports',
        'debounce',
        'clamp',
        'clampUnit',
        'randomId',
        'min',
        'minBy',
        'argmin',
        'max',
        'maxBy',
        'argmax',
        'range',
        'sum',
        'flatten',
        'cycle',
        'hashList',
        'find',
        'isNumber',
        'isString',
        'isFunction',
        'isArray',
        'isObject',
        'isBoolean',
        'isPlainObject',
        'groupBy',
        'unique',
        'endsWith',
        'startsWith',
        'tween',
        'defined',
        'zip',
        'extend',
        'mergeImpl',
        'merge',
        'mergeDefined',
        'shallowMerge',
        'shallowMergeDefined',
        'clone',
        'shallowClone',
        'vendor',
        'identity',
        'color',
        'isColor',
        'isColorString',
        'EventEmitter',
        'select',
        'selectAll',
        'isSelection',
        'detached',
        'div',
        'span',
        'input',
        'button',
        'checkbox',
        'i',
        'loop',
        'transition',
        'ease',
        'interpolate',
        'animate',
        'morph',
        'spinner',
        'spinnerWide',
        'sort',
        'sortBy',
        'compare',
        'compareNullsLast',
        'localeCompare',
        'ClickDetector',
        'Modal',
        'modalDialog',
        'modalInput',
        'notify',
        'notifyInfo',
        'notifyPositive',
        'notifyWarning',
        'notifyNegative',
        'notifyLoading',
        'notifyDefaultTimeout',
        'NotificationManager',
        'filterExact',
        'filterStartsWith',
        'filterContains',
        'filterExcludes',
        'filterGreater',
        'filterLess',
        'filterFuzzy',
        'filterRegex',
        'filterStringTypes',
        'filterNumberTypes',
        'filterTypes',
        'userFacingText',
        'validateForm',
        'Dropdown',
        'Collapsible',
        'initializeCollapsibles',
        'palette',
        'format',
        'titleBar',
        'TitleBar',
        'Menu',
        'autocomplete',
        'Autocomplete',
        'numberPicker',
        'NumberPicker',
        'buttonGroup',
        'ButtonGroup',
        'Picker',
        'picker',
        'inputGroup',
        'preferences',
        'dateTimeLocalizer',
        'group',
        'section',
        'dragContainer',
        'DragContainer',
        'progressBar',
        'ProgressBar',
        'ColorScale',
        'toggle',
        'Toggle',
        'crumbtrail',
        'Crumbtrail',
        'notice',
        'noticeHead',
        'noticeBody',
        'autocompletePicker',
        'AutocompletePicker',
        'StickyTableHeaders',
        'graph',
        'Graph',
        'Axis',
        'pieChart',
        'PieChart',
        'sparkline',
        'Sparkline',
        'LineSeries',
        'BandSeries',
        'ScatterSeries',
        'BarSeries',
        'StraightLineSeries',
        'plotLabelStandard',
        'plotLabelBasic',
        'theme',
        'label',
        'colorPicker',
        'ColorPicker',
        'slider',
        'Slider',
        'timeSlider',
        'TimeSlider',
        'card',
        'paginator',
        'Paginator',
        'SideCollapsible',
        'datePicker',
        'DatePicker',
        'pivotTable',
        'PivotTable',
        'timePicker',
        'TimePicker',
        'tabs',
        'Tabs',
        'tree',
        'Tree',
        'initializeTrees',
        'dataTable',
        'objectFeed',
        'DataTable',
        'getAdvancedSearchFilter',
        'Sidebar',
        'tagInput',
        'TagInput',
        'dateTimePicker',
        'DateTimePicker',
        'Form',
        'fileInput',
        'FileInput'
        // 'Form'
      ]

      // console.log(propertyList.filter(x => !(x in hx)))
      // console.log(Object.keys(hx).filter(x => propertyList.indexOf(x) === -1))

      propertyList.filter(x => !(x in hx)).should.eql([])
      Object.keys(hx).filter(x => propertyList.indexOf(x) === -1).should.eql([])

      expect(hx).to.have.keys(propertyList)
    })
  })

  // Internal utils
  loggerTests()
  autocompleteFeedTests()

  // Internal Components
  // ... none yet :)

  // Exposed Utils
  setTests()
  listTests()
  mapTests()
  colorTests()
  utilsTests()
  eventEmitterTests()
  selectionTests()
  transitionTests()
  interpolateTests()
  pointerEventTests()
  viewTests()
  sortTests()
  clickDetectorTests()
  notifyTests()
  filterTests()
  userFacingTextTests()
  paletteTests()
  formatTests()
  preferencesTests()
  dateTimeLocalizerTests()

  // Exposed Components
  modalTests()
  formTests()
  dropdownTests()
  collapsibleTests()
  titlebarTests()
  menuTests()
  autocompleteTests()
  numberPickerTests()
  buttonGroupTests()
  pickerTests()
  inputGroupTests()
  dragContainerTests()
  progressBarTests()
  crumbtrailTests()
  // autocompletePickerTests()
  plotTests()
  labelTests()
  colorPickerTests()
  sliderTests()
  timeSliderTests()
  sideCollapsibleTests()
  datePickerTests()
  pivotTableTests()
  timePickerTests()
  tabsTests()
  treeTests()
  dataTableTests()
  sidebarTests()
  tagInputTests()
  dateTimePickerTests()
  fileInputTests()
  // formBuilderTests()

  // require('modules/tag-input/spec')
  // require('modules/date-time-picker/spec')
  //
})
