/*
     ____                    __                      _
    / __ \__  ______ _____  / /___  ______ ___      (_)____
   / / / / / / / __ `/ __ \/ __/ / / / __ `__ \    / / ___/
  / /_/ / /_/ / /_/ / / / / /_/ /_/ / / / / / /   / (__  )
  \___\_\__,_/\__,_/_/ /_/\__/\__,_/_/ /_/ /_(_)_/ /____/
                                              /___/

  Create
  ======

  Api for building parsed ast easily. Most useful when building transformations
  that convert from ast to ast.

*/

function Builder (type) {
  this.type = type
  this.params = []
  this.content = []
}

Builder.prototype = {
  parameters: function (params) {
    this.params = params
    return this
  },
  ps: function (ps) {
    this.params = ps.split(' ')
    return this
  },
  add: function (entity) {
    if (Array.isArray(entity)) {
      this.content = this.content.concat(entity)
    } else {
      this.content.push(entity)
    }
    return this
  },
  build: function () {
    return {
      type: this.type,
      params: this.params,
      content: this.content.map(function (item) {
        if (item instanceof Builder) {
          return item.build()
        } else {
          return item
        }
      })
    }
  }
}

module.exports = function (type) {
  return new Builder(type)
}
