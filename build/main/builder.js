/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Builder
  -------

  This file contains the code for defining custom builds/themes of hexagon.
  The Builder prototype in this file is what should be exposed when creating a theme.

*/

function mergeAssets (a, b) {
  var merged = {}
  if (a) {
    Object.keys(a).forEach(function (key) {
      merged[key] = a[key]
    })
  }
  if (b) {
    Object.keys(b).forEach(function (key) {
      merged[key] = b[key]
    })
  }
  return merged
}

function Builder (themeResources, assetFiles, moduleDirectories) {
  this._themeResources = themeResources || []
  this._assetFiles = assetFiles || {}
  this._moduleDirectories = moduleDirectories || []
}

Builder.prototype = {
  // add a theme to the stack of themes to be used. (they all get squished down
  // into a single theme, where the theme that was supplied latest overrides ones
  // set before)
  theme: function (themeResource) {
    return new Builder(this._themeResources.concat([{ type: 'theme', theme: themeResource }]), this._assetFiles, this._moduleDirectories)
  },
  // used to create a multi-theme build of hexagon
  // themes: function (themeResources) {
  //   // XXX: implement
  //   return this
  // },
  // this applies any variables in the themes and removes the variables, so that new variables can be
  // set up without old ones hanging around
  flatten: function () {
    return new Builder(this._themeResources.concat([{ type: 'flatten' }]), this._assetFiles, this._moduleDirectories)
  },
  // sets the assets that should be exported when building. an object of the form {exportFilenameRelativeToHexagonJs: filename}
  assets: function (assets, reset) {
    // XXX: add the option for inlinable assets
    if (reset) {
      return new Builder(this._themeResources, assets, this._moduleDirectories)
    } else {
      return new Builder(this._themeResources, mergeAssets(this._assetFiles, assets), this._moduleDirectories)
    }
  },
  moduleDirectory: function (moduleDirectory) {
    // You can specify one additional module directory
    return new Builder(this._themeResources, this._assetFiles, this._moduleDirectories.concat([moduleDirectory]))
  },
  // builds the library into the directory specified
  build: function (options) {
    // XXX: implement with webpack / rollup
  },
  // builds the library into the directory specified, and then watches for changes. options it expects are the same as build()
  watch: function (options) {
    // XXX: implement with webpack / rollup
  }
}

module.exports = Builder
