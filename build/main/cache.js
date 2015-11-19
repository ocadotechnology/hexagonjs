/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Cache
  -----

  This keeps compiled versions of the modules in memory for speedy
  incremental recompiles

*/

var cache = {}

module.exports = {
  set: function (key, value) {
    cache[key] = value
    return this
  },
  has: function (key) {
    return key in cache
  },
  get: function (key) {
    return cache[key]
  },
  delete: function (key) {
    delete cache[key]
    return this
  },
  clear: function () {
    cache = {}
    return
  }
}
