// resolves dependency trees

// Note: once we open source, and feel comfortable publishing to public npm, this can be made
// its own node module - its has nothing sepecific to hexagon in it.

// Given a list of things with dependencies, determines the correct order for
// them to be combined in order for the dependency chain to work

// items should be an array of objects of the form
// {name: 'some-name', dependencies:['dependency-1', 'dependency-2']}
module.exports = function (items) {
  var i, j, item, wrappedItem, len, len2

  if (items.length === 0) {
    return []
  }

  // turn the array into a map (for faster access)
  var map = {}
  var wrappedItems = []
  for (i = 0, len = items.length; i < len; i++) {
    item = items[i]
    wrappedItem = {
      dependsOn: [],
      dependedOnBy: [],
      item: item
    }
    wrappedItems.push(wrappedItem)
    map[item.name] = wrappedItem
  }

  // create the links
  for (i = 0, len = wrappedItems.length; i < len; i++) {
    item = wrappedItems[i]
    if (item.item.name) {
      deps = item.item.dependencies || []
      for (j = 0, len2 = deps.length; j < len2; j++) {
        var d = deps[j]
        if (d === item.item.name) {
          throw new Error('"' + item.item.name + '" depends upon itself')
        }
        if (map[d] === void 0) {
          throw new Error('"' + item.item.name + '" depends on undefined item "' + d + '"')
        }
        item.dependsOn.push(map[d])
        map[d].dependedOnBy.push(item)
      }
    } else {
      throw new Error('Item missing name property')
    }
  }

  // now collect up all things that are not depended on by anything
  var endItems = wrappedItems.filter(function (d) {
    return d.dependedOnBy.length === 0
  })

  if (endItems.length === 0) {
    throw new Error('Impossible to resolve the dependency tree - there is a cycle')
  }

  // create a fake node which depends on all endItems
  var fakeEnd = {
    dependsOn: endItems,
    dependedOnBy: [],
    item: undefined
  }

  // link all the end items to the fake end
  endItems.forEach(function (d) {
    d.dependedOnBy.push(fakeEnd)
  })

  // create arrays or all possible paths to the end of the tree
  var paths = function (item) {
    var results = []
    item.dependsOn.forEach(function (dependency) {
      var subpaths = paths(dependency)
      if (subpaths.length > 0) {
        subpaths.forEach(function (path) {
          results.push([dependency.item.name].concat(path))
        })
      } else {
        results.push([dependency.item.name])
      }
    })
    return results
  }

  var allPaths = paths(fakeEnd)

  var longestPathLength = Math.max.apply(null, allPaths.map(function (d) { return d.length; }))

  var seen = {}
  var order = []

  for (i = longestPathLength - 1; i >= 0; i--) {
    allPaths.forEach(function (path) {
      if ((path[i] != null) && !seen[path[i]]) {
        seen[path[i]] = true
        order.push(path[i])
      }
    })
  }

  return order
}
