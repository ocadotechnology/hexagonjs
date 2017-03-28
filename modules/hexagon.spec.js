'use strict'

import { should, expect } from 'chai'
import * as hx from './hexagon'

// Internal utils
import loggerTests from './logger/test/spec'

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

// Components

import modalTests from './modal/test/spec'
import dropdownTests from './dropdown/test/spec'
import collapsibleTests from './collapsible/test/spec'

should()

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
      expect(hx).to.have.keys([
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
        'userFacingText',
        'validateForm',
        'Dropdown',
        'Collapsible',
        'initializeCollapsibles',
        'palette',
        'format'
      ])
    })
  })

  // Internal utils
  loggerTests()

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
  modalTests()
  notifyTests()
  filterTests()
  userFacingTextTests()
  formTests()
  dropdownTests()
  collapsibleTests()
  paletteTests()
  formatTests()

  // Components

  // require('modules/menu/test/spec')
  // require('modules/preferences/test/spec')
  // require('modules/autocomplete/test/spec')
  // require('modules/number-picker/test/spec')
  // require('modules/drag-container/test/spec')
  // require('modules/date-localizer/test/spec')
  // require('modules/progress-bar/test/spec')
  // require('modules/autocomplete-feed/test/spec')
  // require('modules/picker/test/spec')
  // require('modules/button-group/test/spec')
  // require('modules/plot/test/spec')
  // require('modules/date-picker/test/spec')
  // require('modules/time-picker/test/spec')
  // require('modules/tag-input/test/spec')
  // require('modules/titlebar/test/spec')
  // require('modules/slider/test/spec')
  // require('modules/color-picker/test/spec')
  // require('modules/crumbtrail/test/spec')
  // require('modules/paginator/test/spec')
  // require('modules/time-slider/test/spec')
  // require('modules/date-time-picker/test/spec')
  //
})
