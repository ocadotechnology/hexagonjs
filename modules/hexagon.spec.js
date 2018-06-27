'use strict'

import chai from 'chai'
import * as hx from './hexagon'

// Internal utils
import loggerTests from './logger/test/spec'
import autocompleteFeedTests from './autocomplete-feed/test/spec'

// Utils
import setTests from './set/test/spec'
import mapTests from './map/test/spec'
import listTests from './list/test/spec'
import utilsTests from './utils/test/spec'
import colorTests from './color/test/spec'
import eventEmitterTests from './event-emitter/test/spec'
import selectionTests from './selection/test/spec'
import transitionTests from './transition/test/spec'
import interpolateTests from './interpolate/test/spec'
import animateTests from './animate/test/spec'
import pointerEventTests from './pointer-events/test/spec'
import viewTests from './view/test/spec'
import sortTests from './sort/test/spec'
import clickDetectorTests from './click-detector/test/spec'
import notifyTests from './notify/test/spec'
import filterTests from './filter/test/spec'
import userFacingTextTests from './user-facing-text/test/spec'
import formTests from './form/test/spec'
import paletteTests from './palette/test/spec'
import formatTests from './format/test/spec'
import preferencesTests from './preferences/test/spec'
import dateTimeLocalizerTests from './date-localizer/test/spec'

// Components

import modalTests from './modal/test/spec'
import dropdownTests from './dropdown/test/spec'
import collapsibleTests from './collapsible/test/spec'
import titlebarTests from './titlebar/test/spec'
import menuTests from './menu/test/spec'
import autocompleteTests from './autocomplete/test/spec'
import numberPickerTests from './number-picker/test/spec'
import buttonGroupTests from './button-group/test/spec'
import pickerTests from './picker/test/spec'
import inputGroupTests from './input-group/test/spec'
import dragContainerTests from './drag-container/test/spec'
import progressBarTests from './progress-bar/test/spec'
import crumbtrailTests from './crumbtrail/test/spec'
// import autocompletePickerTests from './autocomplete-picker/test/spec'
import plotTests from './plot/test/spec'
import labelTests from './label/test/spec'
import colorPickerTests from './color-picker/test/spec'
import sliderTests from './slider/test/spec'
import timeSliderTests from './time-slider/test/spec'
import sideCollapsibleTests from './side-collapsible/test/spec'
import datePickerTests from './date-picker/test/spec'
import pivotTableTests from './pivot-table/test/spec'
import timePickerTests from './time-picker/test/spec'
import tabsTests from './tabs/test/spec'
import treeTests from './tree/test/spec'
import dataTableTests from './data-table/test/spec'
// import formBuilderTests from './form-builder/test/spec'

const should = chai.should()
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
  animateTests()
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
  // formBuilderTests()

  // require('modules/tag-input/test/spec')
  // require('modules/date-time-picker/test/spec')
  //
})
