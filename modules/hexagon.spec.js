import hx from './hexagon'

const chai = require('chai')
const spies = require('chai-spies')
chai.use(spies)

describe('HexagonJS Test Suite', () => {

  // add a handle for when the tests are finished
  after(() => {
    if (window.hxTestFinished) {
      window.hxTestFinished()
    }
  })

  require('modules/set/test/spec')
  require('modules/map/test/spec')
  require('modules/list/test/spec')
  require('modules/event-emitter/test/spec')
  require('modules/util/test/spec')
  require('modules/color/test/spec')
  require('modules/selection/test/spec')
  require('modules/transition/test/spec')
  require('modules/interpolate/test/spec')
  require('modules/animate/test/spec')
  require('modules/view/test/spec')
  require('modules/sort/test/spec')
  require('modules/component/test/spec')
  require('modules/click-detector/test/spec')
  require('modules/modal/test/spec')
  require('modules/notify/test/spec')
  require('modules/filter/test/spec')
  require('modules/user-facing-text/test/spec')
  require('modules/form/test/spec')
  require('modules/dropdown/test/spec')
  require('modules/collapsible/test/spec')
  require('modules/palette/test/spec')
  require('modules/format/test/spec')
  require('modules/menu/test/spec')
  require('modules/preferences/test/spec')
  require('modules/autocomplete/test/spec')
  require('modules/number-picker/test/spec')
  require('modules/drag-container/test/spec')
  require('modules/date-localizer/test/spec')
  require('modules/progress-bar/test/spec')
  require('modules/autocomplete-feed/test/spec')
  require('modules/picker/test/spec')
  require('modules/button-group/test/spec')
  require('modules/plot/test/spec')
  require('modules/date-picker/test/spec')
  require('modules/time-picker/test/spec')
  require('modules/tag-input/test/spec')
  require('modules/titlebar/test/spec')
  require('modules/slider/test/spec')

  describe('1.x.x backwards compatiblity tests', () => {

    function checkProperty (name, obj = hx) {
      it('hx should have the ' + name + ' function', () => {
        obj.should.have.property(name)
        obj[name].should.be.a('function')
      })
    }

    function checkPropertyIsObject(name, obj = hx) {
      it('hx.' + name + ' is an object', () => {
        obj.should.have.property(name)
        obj[name].should.be.an('object')
      })
    }

    it('hx should be on the window', () => {
      hx.should.be.defined
    })

    describe('set', () => {
      it('hx should have the Set prototype', () => {
        hx.should.have.property('Set')
      })
    })

    describe('map', () => {
      it('hx should have the Map prototype', () => {
        hx.should.have.property('Map')
      })
    })

    describe('list', () => {
      it('hx should have the List prototype', () => {
        hx.should.have.property('List')
      })
    })

    describe('color', () => {
      checkProperty('color')
      checkProperty('isColor', hx.color)
      checkProperty('isColorString', hx.color)
    })

    describe('event-emitter', () => {
      it('hx should have the EventEmitter prototype', () => {
        hx.should.have.property('EventEmitter')
        hx.EventEmitter.should.be.a.function
      })
    })

    describe('util', () => {
      checkProperty('deprecatedWarning')
      checkProperty('consoleWarning')
      checkProperty('hash')
      checkProperty('transpose')
      checkProperty('supports')
      checkProperty('debounce')
      checkProperty('clamp')
      checkProperty('clampUnit')
      checkProperty('randomId')
      checkProperty('min')
      checkProperty('minBy')
      checkProperty('max')
      checkProperty('maxBy')
      checkProperty('range')
      checkProperty('sum')
      checkProperty('flatten')
      checkProperty('cycle')
      checkProperty('hashList')
      checkProperty('find')
      checkProperty('isString')
      checkProperty('isFunction')
      checkProperty('isArray')
      checkProperty('isObject')
      checkProperty('isBoolean')
      checkProperty('isPlainObject')
      checkProperty('groupBy')
      checkProperty('unique')
      checkProperty('endsWith')
      checkProperty('startsWith')
      checkProperty('tween')
      checkProperty('defined')
      checkProperty('zip')
      checkProperty('merge')
      checkProperty('shallowMerge')
      checkProperty('clone')
      checkProperty('shallowClone')
      checkProperty('vendor')
      checkProperty('identity')
      checkProperty('parseHTML')
      checkProperty('cleanNode')
      checkProperty('scrollbarSize')
      checkProperty('parentZIndex')
      checkProperty('checkParents')
    })

    describe('selection', () => {
      checkProperty('select')
      checkProperty('selectAll')
      checkProperty('detached')
      checkProperty('getHexagonElementDataObject', hx.select)
      checkProperty('addEventAugmenter', hx.select)
    })

    describe('transition', () => {
      checkProperty('transition')
      checkProperty('loop')
      checkPropertyIsObject('ease')
    })

    describe('interpolate', () => {
      checkProperty('interpolate')
    })

    describe('animate', () => {
      checkProperty('animate')
      checkProperty('morph')
      checkProperty('animate', hx.detached('div'))
      checkProperty('morph', hx.detached('div'))
    })

    describe('view', () => {
      checkProperty('view', hx.detached('div'))
    })

    describe('sort', () => {
      checkProperty('sort')
      checkProperty('sortBy')
      checkProperty('compare', hx.sort)
      checkProperty('localeCompare', hx.sort)
    })

    describe('component', () => {
      checkProperty('component')
      checkProperty('components')
      checkProperty('register', hx.component)
      checkProperty('clear', hx.components)
    })

    describe('click-detector', () => {
      checkProperty('ClickDetector')
    })

    describe('modal', () => {
      checkProperty('Modal')
      checkProperty('dialog', hx.modal)
      checkProperty('input', hx.modal)
    })

    describe('notify', () => {
      checkProperty('notify')
      checkProperty('NotificationManager')
      checkProperty('info', hx.notify)
      checkProperty('positive', hx.notify)
      checkProperty('warning', hx.notify)
      checkProperty('negative', hx.notify)
      checkProperty('loading', hx.notify)
    })

    describe('filter', () => {
      checkProperty('exact', hx.filter)
      checkProperty('startsWith', hx.filter)
      checkProperty('contains', hx.filter)
      checkProperty('excludes', hx.filter)
      checkProperty('greater', hx.filter)
      checkProperty('less', hx.filter)
      checkProperty('fuzzy', hx.filter)
      checkProperty('regex', hx.filter)
    })

    describe('user-facing-text', () => {
      checkProperty('userFacingText')
    })

    describe('form', () => {
      checkProperty('validateForm')
    })

    describe('dropdown', () => {
      checkProperty('Dropdown')
    })

    describe('collapsible', () => {
      checkProperty('Collapsible')
      checkProperty('initializeCollapsibles')
    })

    describe('palette', () => {
      checkProperty('context', hx.palette)
      checkProperty('textContext', hx.palette)
      checkProperty('backgroundContext', hx.palette)
      checkProperty('borderContext', hx.palette)
    })

    describe('format', () => {
      checkProperty('round', hx.format)
      checkProperty('si', hx.format)
      checkProperty('exp', hx.format)
      checkProperty('fixed', hx.format)
      checkProperty('zeroPad', hx.format)
    })

    describe('menu', () => {
      checkProperty('Menu')
    })

    describe('preferences', () => {
      checkPropertyIsObject('preferences')
      checkPropertyIsObject('LocalStoragePreferencesStore')
    })

    describe('date-localizer', () => {
      checkProperty('dateTimeLocalizer')
    })

    describe('autocomplete', () => {
      checkProperty('autoComplete')
      checkProperty('AutoComplete')
    })

    describe('number-picker', () => {
      checkProperty('numberPicker')
      checkProperty('NumberPicker')
    })

    describe('drag-container', () => {
      checkProperty('dragContainer')
      checkProperty('DragContainer')
    })

    describe('progress-bar', () => {
      checkProperty('progressBar')
      checkProperty('ProgressBar')
    })

    describe('autocomplete-feed', () => {
      checkProperty('AutocompleteFeed')
    })

    describe('picker', () => {
      checkProperty('picker')
      checkProperty('Picker')
    })

    describe('buttonGroup', () => {
      checkProperty('buttonGroup')
      checkProperty('ButtonGroup')
    })

    describe('plot', () => {
      checkProperty('Graph')
      checkProperty('graph')
      checkProperty('Axis')
      checkProperty('LineSeries')
      checkProperty('BarSeries')
      checkProperty('BandSeries')
      checkProperty('ScatterSeries')
      checkProperty('StraightLineSeries')
      checkProperty('Sparkline')
      checkProperty('sparkline')
      checkProperty('PieChart')
      checkProperty('pieChart')
    })

    describe('datePicker', () => {
      checkProperty('datePicker')
      checkProperty('DatePicker')
    })

    describe('timePicker', () => {
      checkProperty('timePicker')
      checkProperty('TimePicker')
    })

    describe('tagInput', () => {
      checkProperty('tagInput')
      checkProperty('TagInput')
    })

    describe('titlebar', () => {
      checkProperty('TitleBar')
    })

    describe('slider', () => {
      checkProperty('slider')
      checkProperty('Slider')
    })

    describe('card', () => {
      checkProperty('card')
      checkProperty('text', hx.card)
      checkProperty('text', hx.card.small)
      checkProperty('text', hx.card.large)
      checkProperty('title', hx.card)
      checkProperty('title', hx.card.small)
      checkProperty('title', hx.card.large)
      checkProperty('icon', hx.card)
      checkProperty('icon', hx.card.small)
      checkProperty('icon', hx.card.large)
      checkProperty('section', hx.card)
      checkProperty('section', hx.card.header)
      checkProperty('section', hx.card.joint)
      checkProperty('section', hx.card.joint.header)
      checkProperty('section', hx.card.fixed)
      checkProperty('section', hx.card.fixed.header)
      checkProperty('section', hx.card.fixed.joint)
      checkProperty('section', hx.card.fixed.joint.header)
      checkProperty('section', hx.card.small.fixed)
      checkProperty('section', hx.card.small.fixed.header)
      checkProperty('section', hx.card.small.fixed.joint)
      checkProperty('section', hx.card.small.fixed.joint.header)
      checkProperty('section', hx.card.normal.fixed)
      checkProperty('section', hx.card.normal.fixed.header)
      checkProperty('section', hx.card.normal.fixed.joint)
      checkProperty('section', hx.card.normal.fixed.joint.header)
      checkProperty('section', hx.card.slim.fixed)
      checkProperty('section', hx.card.slim.fixed.header)
      checkProperty('section', hx.card.slim.fixed.joint)
      checkProperty('section', hx.card.slim.fixed.joint.header)
      checkProperty('group', hx.card)
      checkProperty('group', hx.card.vertical)
      checkProperty('group', hx.card.header)
      checkProperty('group', hx.card.vertical.header)
      checkProperty('group', hx.card.joint)
      checkProperty('group', hx.card.joint.vertical)
      checkProperty('group', hx.card.joint.header)
      checkProperty('group', hx.card.joint.vertical.header)
      checkProperty('group', hx.card.fixed)
      checkProperty('group', hx.card.fixed.vertical)
      checkProperty('group', hx.card.fixed.header)
      checkProperty('group', hx.card.fixed.vertical.header)
      checkProperty('group', hx.card.fixed.joint)
      checkProperty('group', hx.card.fixed.joint.vertical)
      checkProperty('group', hx.card.fixed.joint.header)
      checkProperty('group', hx.card.fixed.joint.vertical.header)
      checkProperty('group', hx.card.small.fixed)
      checkProperty('group', hx.card.small.fixed.vertical)
      checkProperty('group', hx.card.small.fixed.header)
      checkProperty('group', hx.card.small.fixed.vertical.header)
      checkProperty('group', hx.card.small.fixed.joint)
      checkProperty('group', hx.card.small.fixed.joint.vertical)
      checkProperty('group', hx.card.small.fixed.joint.header)
      checkProperty('group', hx.card.small.fixed.joint.vertical.header)
      checkProperty('group', hx.card.normal.fixed)
      checkProperty('group', hx.card.normal.fixed.vertical)
      checkProperty('group', hx.card.normal.fixed.header)
      checkProperty('group', hx.card.normal.fixed.vertical.header)
      checkProperty('group', hx.card.normal.fixed.joint)
      checkProperty('group', hx.card.normal.fixed.joint.vertical)
      checkProperty('group', hx.card.normal.fixed.joint.header)
      checkProperty('group', hx.card.normal.fixed.joint.vertical.header)
      checkProperty('group', hx.card.slim.fixed)
      checkProperty('group', hx.card.slim.fixed.vertical)
      checkProperty('group', hx.card.slim.fixed.header)
      checkProperty('group', hx.card.slim.fixed.vertical.header)
      checkProperty('group', hx.card.slim.fixed.joint)
      checkProperty('group', hx.card.slim.fixed.joint.vertical)
      checkProperty('group', hx.card.slim.fixed.joint.header)
      checkProperty('group', hx.card.slim.fixed.joint.vertical.header)
      checkProperty('aligned', hx.card)
      checkProperty('notice', hx.card)
      checkProperty('section', hx.card.action.icon)
      checkProperty('section', hx.card.icon.action)
      checkProperty('section', hx.card.action)
    })

    describe('toggle', () => {
      checkProperty('toggle')
      checkProperty('Toggle')
    })

    describe('spinner', () => {
      checkProperty('spinner')
      checkProperty('spinnerWide')
    })

    describe('layout', () => {
      checkProperty('group'),
      checkProperty('section')
    })

    describe('notice', () => {
      checkProperty('notice'),
      checkProperty('noticeHead'),
      checkProperty('noticeBody')
    })

    describe('input-group', () => {
      checkProperty('inputGroup')
    })

    describe('label', () => {
      checkProperty('label')
    })
  })
})

module.exports = hx
