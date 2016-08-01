utils = require('modules/util/main/utils')
domUtils = require('modules/util/main/dom-utils')

# expose
module.exports = {
  deprecatedWarning: utils.deprecatedWarning
  consoleWarning: utils.consoleWarning
  hash: utils.hash
  transpose: utils.transpose
  supports: utils.supports
  debounce: utils.debounce
  clamp: utils.clamp
  clampUnit: utils.clampUnit
  randomId: utils.randomId
  min: utils.min
  minBy: utils.minBy
  argmin: utils.argmin
  max: utils.max
  maxBy: utils.maxBy
  argmax: utils.argmax
  range: utils.range
  sum: utils.sum
  flatten: utils.flatten
  cycle: utils.cycle
  hashList: utils.hashList
  find: utils.find
  isNumber: utils.isNumber
  isString: utils.isString
  isFunction: utils.isFunction
  isArray: utils.isArray
  isObject: utils.isObject
  isBoolean: utils.isBoolean
  isPlainObject: utils.isPlainObject
  groupBy: utils.groupBy
  unique: utils.unique
  endsWith: utils.endsWith
  startsWith: utils.startsWith
  tween: utils.tween
  defined: utils.defined
  zip: utils.zip
  merge: utils.merge
  shallowMerge: utils.shallowMerge
  clone: utils.clone
  shallowClone: utils.shallowClone
  vendor: utils.vendor
  identity: utils.identity
  parseHTML: domUtils.parseHTML
  cleanNode: domUtils.cleanNode
  scrollbarSize: domUtils.scrollbarSize
  parentZIndex: domUtils.parentZIndex
  checkParents: domUtils.checkParents
}

# backwards compatibility
module.exports.hx = module.exports
