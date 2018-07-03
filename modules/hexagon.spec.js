'use strict'

import chai from 'chai'
import * as hx from './hexagon'

// Internal utils
import loggerTests from './logger/spec'
import autocompleteFeedTests from './autocomplete-feed/spec'

// Utils
import setTests from './set/spec'
import mapTests from './map/spec'
import listTests from './list/spec'
import utilsTests from './utils/spec'
import colorTests from './color/spec'
import eventEmitterTests from './event-emitter/spec'
import selectionTests from './selection/spec'
import transitionTests from './transition/spec'
import interpolateTests from './interpolate/spec'
import animateTests from './animate/spec'
import pointerEventTests from './pointer-events/spec'
import viewTests from './view/spec'
import sortTests from './sort/spec'
import clickDetectorTests from './click-detector/spec'
import notifyTests from './notify/spec'
import filterTests from './filter/spec'
import userFacingTextTests from './user-facing-text/spec'
import paletteTests from './palette/spec'
import formatTests from './format/spec'
import preferencesTests from './preferences/spec'
import dateTimeLocalizerTests from './date-localizer/spec'

// Components

import modalTests from './modal/spec'
import dropdownTests from './dropdown/spec'
import collapsibleTests from './collapsible/spec'
import titlebarTests from './titlebar/spec'
import menuTests from './menu/spec'
import autocompleteTests from './autocomplete/spec'
import numberPickerTests from './number-picker/spec'
import buttonGroupTests from './button-group/spec'
import pickerTests from './picker/spec'
import inputGroupTests from './input-group/spec'
import dragContainerTests from './drag-container/spec'
import progressBarTests from './progress-bar/spec'
import crumbtrailTests from './crumbtrail/spec'
// import autocompletePickerTests from './autocomplete-picker/spec'
import plotTests from './plot/spec'
import labelTests from './label/spec'
import colorPickerTests from './color-picker/spec'
import sliderTests from './slider/spec'
import timeSliderTests from './time-slider/spec'
import sideCollapsibleTests from './side-collapsible/spec'
import datePickerTests from './date-picker/spec'
import pivotTableTests from './pivot-table/spec'
import timePickerTests from './time-picker/spec'
import tabsTests from './tabs/spec'
import treeTests from './tree/spec'
import dataTableTests from './data-table/spec'
import sidebarTests from './sidebar/spec'
import tagInputTests from './tag-input/spec'
import dateTimePickerTests from './date-time-picker/spec'
import formTests from './form/spec'
import fileInputTests from './file-input/spec'
// import formBuilderTests from './form-builder/spec'

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
  sidebarTests()
  tagInputTests()
  dateTimePickerTests()
  fileInputTests()
  // formBuilderTests()

  // require('modules/tag-input/spec')
  // require('modules/date-time-picker/spec')
  //
})
