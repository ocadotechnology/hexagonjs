/*
     ____                    __                      _
    / __ \__  ______ _____  / /___  ______ ___      (_)____
   / / / / / / / __ `/ __ \/ __/ / / / __ `__ \    / / ___/
  / /_/ / /_/ / /_/ / / / / /_/ /_/ / / / / / /   / (__  )
  \___\_\__,_/\__,_/_/ /_/\__/\__,_/_/ /_/ /_(_)_/ /____/
                                              /___/

  Select
  ======

  An api for working with entities, which makes it easier to extract information from them.
  It is possible to work with the parsed ast without the use of this api -- this api
  simply makes some things easier.

*/

var merge = require('merge')
var Promise = require('bluebird')

// utils
function isString (x) {
  return typeof (x) === 'string' || x instanceof String
}

// duck type check for an entity
function looksLikeAnEntity (d) {
  return isString(d.type) && Array.isArray(d.params) && Array.isArray(d.content)
}

// A small selection api for making building renderers easier
function Selection (type, params, content, original) {
  this.type = type
  this.params = params
  this.content = content
  this.original = original
}

Selection.prototype.select = function (type, options) {
  return this.selectAll(type, options)[0] || select(undefined)
}

// options.required: Boolean (default: false) (throws an error if the type is required and is not there)
// options.recursive: Boolean (default: false) (search recursively for the type specified)
Selection.prototype.selectAll = function (type, options) {
  if (Array.isArray(type)) {
    var types = type
    var res = this.content.filter(function (d) { return types.indexOf(d.type) > -1 }).map(select)
  } else {
    var res = this.content.filter(function (d) { return d.type === type }).map(select)
  }

  if (options && options.recursive) {
    this.content.forEach(function (r) {
      res = res.concat(select(r).selectAll(type, options))
    })
  }

  if (options && options.required && res.length === 0) {
    throw new Error('the field ' + type + ' is options (and missing)')
  }

  return res
}

Selection.prototype.param = function (i) {
  return i === undefined ? this.params[0] : this.params[i]
}

Selection.prototype.empty = function () {
  return !this.content.some(function (d) {
    return looksLikeAnEntity(d) || d.trim() !== ''
  })
}

Selection.prototype.nonEmpty = function () {
  return this.filter(function (d) {
    return looksLikeAnEntity(d) || d.trim() !== ''
  })
}

Selection.prototype.entityContent = function () {
  return this.filter(function (d) {
    return looksLikeAnEntity(d)
  })
}

Selection.prototype.textContent = function () {
  return this.filter(function (d) {
    return !looksLikeAnEntity(d)
  })
}

// get the parameter string
Selection.prototype.ps = function (joinWith) {
  if (joinWith === undefined) {
    return this.params.join(' ')
  } else {
    return this.params.join(joinWith)
  }
}

// get the content string
Selection.prototype.cs = function (joinWith) {
  if (joinWith === undefined) {
    return this.content.filter(isString).join('\n')
  } else {
    return this.content.filter(isString).join(joinWith)
  }
}

// returns true if the selection has content
Selection.prototype.hasContent = function () {
  return this.content.length > 0
}

// transforms the content to some other form - depends entirely on the transform function - returns a promise
Selection.prototype.transform = function (transform) {
  return select.Promise.all(this.content.map(maybeSelect).map(transform))
}

Selection.prototype.filter = function (f) {
  if (Array.isArray(f)) {
    return this.filter(function (entity) {
      return f.indexOf(entity.type) > -1
    })
  } else if (isString(f)) {
    return this.filter(function (entity) {
      return entity.type === f
    })
  } else {
    return new Selection(this.type, this.params, this.content.filter(f), this.original)
  }
}

Selection.prototype.clone = function () {
  return select(merge(true, this))
}

Selection.prototype.has = function (type, options) {
  if (Array.isArray(type)) {
    var self = this
    return type.some(function (t) { return self.has(t, options) })
  } else {
    if (options && options.recursive) {
      return this.content.some(function (d) { return d.type == type }) || this.content.some(function (r) {
        return select(r).has(type, options)
      })
    } else {
      return this.content.some(function (d) { return d.type == type })
    }
  }
}

Selection.prototype.json = function () {
  return JSON.stringify(this, null, 2)
}

Selection.prototype.replaceContent = function (content) {
  Array.prototype.splice.apply(this.content, [0, this.content.length].concat(content))
  return this
}

Selection.prototype.replaceParams = function (params) {
  Array.prototype.splice.apply(this.params, [0, this.params.length].concat(params))
  return this
}

Selection.prototype.remove = function (type) {
  if (Array.isArray(type)) {
    var self = this
    return type.map(function (t) {
      return self.remove(t)
    })
  } else {
    var i = 0
    while(i < this.content.length) {
      var entity = this.content[i]
      if (looksLikeAnEntity(entity) && entity.type === type) {
        this.content.splice(i, 1)
        return entity
      }
      i++
    }
  }
}

Selection.prototype.removeAll = function (type) {
  if (Array.isArray(type)) {
    var self = this
    return type.map(function (t) {
      return self.removeAll(t)
    })
  } else {
    var result = []
    var i = 0
    while(i < this.content.length) {
      var entity = this.content[i]
      if (looksLikeAnEntity(entity) && entity.type === type) {
        this.content.splice(i, 1)
        result.push(entity)
      } else {
        i++
      }
    }
    return result
  }
}

function select (item) {
  if (item) {
    var params = item.params !== undefined ? item.params : []
    var content = item.content !== undefined ? item.content : []
    return new Selection(item.type, params, content, item)
  } else {
    return new Selection(undefined, [], [], undefined)
  }
}

function maybeSelect (item) {
  return looksLikeAnEntity(item) ? select(item) : item
}

// allows swapping out the promise implementation (if wanted)
select.Promise = Promise

module.exports = select
module.exports.isEntity = looksLikeAnEntity
