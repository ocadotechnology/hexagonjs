'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plotColor1 = 'rgb(177,119,190)';
var plotColor2 = 'rgb(90,155,212)';
var plotColor3 = 'rgb(241,90,113)';
var plotColor4 = 'rgb(151,195,102)';
var plotColor5 = 'rgb(250,169,91)';
var plotColor6 = 'rgb(226,212,64)';

var palette = {
  defaultCol: '#FFFFFF',
  actionCol: '#00ADA8',
  positiveCol: '#92BF17',
  warningCol: '#D69B24',
  negativeCol: '#EC3A65',
  infoCol: '#B36ABB',
  complementCol: '#F7F7F9',
  contrastCol: '#4A4E4E',
  lightTextCol: '#F3F3F3',
  darkTextCol: '#3D3D3D',
  disabledCol: '#FAFAFA',
  disabledTextCol: '#939393',
  dividerCol: '#D0D0D0',
};

var currentTheme = {
  plotColor1: plotColor1,
  plotColor2: plotColor2,
  plotColor3: plotColor3,
  plotColor4: plotColor4,
  plotColor5: plotColor5,
  plotColor6: plotColor6,
  plotColors: [
    plotColor1,
    plotColor2,
    plotColor3,
    plotColor4,
    plotColor5,
    plotColor6 ],
  palette: palette,
  plot: {
    ambientCol: plotColor6,
    axisLineCol: palette.dividerCol,
    axisTitleTextCol: palette.darkTextCol,
    coldCol: plotColor2,
    colors: [
      plotColor1,
      plotColor2,
      plotColor3,
      plotColor4,
      plotColor5,
      plotColor6 ],
    darkTextCol: palette.darkTextCol,
    lightTextCol: palette.lightTextCol,
    labelBackgroundCol: palette.complementCol,
    gridLineCol: palette.disabledCol,
    labelBorderCol: palette.disabledCol,
    labelBoxShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)',
    labelHeaderBackgroundCol: palette.complementCol,
    labelHeaderBorderCol: palette.dividerCol,
    labelKeyTextCol: palette.darkTextCol,
    labelTextCol: palette.darkTextCol,
    negativeCol: plotColor3,
    pieSegmentTextCol: palette.lightTextCol,
    positiveCol: plotColor4,
    tickLineCol: palette.dividerCol,
    tickTextCol: palette.darkTextCol,
    tickTextSize: '10px',
    warmCol: plotColor5,
    warningCol: plotColor6,
  },
  paginator: {
    arrowButton: 'n-a',
    defaultButton: 'hx-complement',
    selectedButton: 'hx-action',
  },
};

// `console` is only allowed in this file.`
/* eslint-disable no-console */

function deprecated(deprecatedItem) {
  var messages = [], len = arguments.length - 1;
  while ( len-- > 0 ) messages[ len ] = arguments[ len + 1 ];

  var heading = "Deprecation Warning: " + deprecatedItem;
  console.warn.apply(console, [ heading ].concat( messages ));
}

function warn() {
  var messages = [], len = arguments.length;
  while ( len-- ) messages[ len ] = arguments[ len ];

  console.warn.apply(console, messages);
}

/* eslint-enable no-console */
var logger = {
  deprecated: deprecated,
  warn: warn,
};

// Proper sets are coming in ECMAScript 6 (which at time of writing has a scheduled release date of June 2015).
  // This set object tries to keep as close as possible to the currently planned spec for maps, which should make it
  // easy to swap out for the native implementation when it arrives and is well supported enough in browsers.

// used to avoid naming clashes when using objects as maps
var checkPrefix, prefix, prefixChar, prefixString,
  indexOf = [].indexOf;

prefixString = '\0';

prefixChar = prefixString.charCodeAt(0);

prefix = function(string) {
  return prefixString + string;
};

checkPrefix = function(string) {
  return string && string.charCodeAt(0) === prefixChar;
};

var Set = /*@__PURE__*/(function () {
  function Set(iterable) {
    var i, len, x;
    this.size = 0;
    this.nan = false;
    this.items = {};
    if (iterable) {
      for (i = 0, len = iterable.length; i < len; i++) {
        x = iterable[i];
        this.add(x);
      }
    }
  }

  // add a value to the set (if it isn't already there). returns this Set object
  Set.prototype.add = function add (value) {
    var base, prefixedKey, row;
    if (typeof value === "number" && isNaN(value)) {
      if (!this.nan) {
        this.size++;
        this.nan = true;
      }
    } else {
      prefixedKey = prefix(value);
      if ((base = this.items)[prefixedKey] == null) {
        base[prefixedKey] = [];
      }
      row = this.items[prefixedKey];
      if (indexOf.call(row, value) < 0) {
        this.size++;
        row.push(value);
      }
    }
    return this;
  };

  // removes all entries from this Set object.
  Set.prototype.clear = function clear () {
    this.items = {};
    this.nan = false;
    this.size = 0;
    return void 0;
  };

  // remove an entry from the set (if it exists)
  Set.prototype.delete = function delete$1 (value) {
    var index, out, prefixedKey, row;
    if (typeof value === "number" && isNaN(value)) {
      if (this.nan) {
        this.size--;
        return this.nan = false;
      }
    } else {
      prefixedKey = prefix(value);
      if (prefixedKey in this.items) {
        row = this.items[prefixedKey];
        index = row.indexOf(value);
        out = index !== -1;
        if (out) {
          this.size--;
          row.splice(index, 1);
          if (!row.length) {
            delete this.items[prefixedKey];
          }
        }
        return out;
      } else {
        return false;
      }
    }
  };

  // returns an array of [value, value] arrays
  Set.prototype.entries = function entries () {
    var items, k, ref, v;
    items = [];
    ref = this.items;
    for (k in ref) {
      v = ref[k];
      if (checkPrefix(k)) {
        items = items.concat(v.map(function(elem) {
          return [elem, elem];
        }));
      }
    }
    if (this.nan) {
      items.push([0/0, 0/0]);
    }
    return items;
  };

  // calls f once for each value present in this Set object. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
  Set.prototype.forEach = function forEach (f, thisArg) {
    if ( thisArg === void 0 ) thisArg = this;

    var i, len, ref, v;
    ref = this.entries();
    for (i = 0, len = ref.length; i < len; i++) {
      v = ref[i];
      f.call(thisArg, v[1]);
    }
    return void 0;
  };

  // check if the set contains a value
  Set.prototype.has = function has (value) {
    var prefixedKey;
    if (typeof value === "number" && isNaN(value)) {
      return this.nan;
    } else {
      prefixedKey = prefix(value);
      return prefixedKey in this.items && indexOf.call(this.items[prefixedKey], value) >= 0;
    }
  };

  // returns an array that contains the keys for each element in the Map.
  Set.prototype.keys = function keys () {
    return this.values();
  };

  // get the items in the set
  Set.prototype.values = function values () {
    var i, len, ref, results, v;
    ref = this.entries();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      v = ref[i];
      results.push(v[1]);
    }
    return results;
  };

  return Set;
}());

// Proper maps are coming in ECMAScript 6 (which at time of writing has a scheduled release date of June 2015).
// This map object tries to keep as close as possible to the currently planned spec for maps, which should make it
// easier to swap out for the native implementation when it arrives and is well supported enough in browsers.

// used to avoid naming clashes when using objects as maps
var checkPrefix$1, prefix$1, prefixChar$1, prefixString$1;

prefixString$1 = '\0';

prefixChar$1 = prefixString$1.charCodeAt(0);

prefix$1 = function(string) {
  return prefixString$1 + string;
};

checkPrefix$1 = function(string) {
  return string && string.charCodeAt(0) === prefixChar$1;
};

var Map = /*@__PURE__*/(function () {
  function Map(iterable) {
    var j, len, x;
    this.size = 0;
    this.items = {};
    this.nan = void 0;
    if (iterable) {
      for (j = 0, len = iterable.length; j < len; j++) {
        x = iterable[j];
        this.set(x[0], x[1]);
      }
    }
  }

  // removes all key/value pairs from this Map object. returns this Map object
  Map.prototype.clear = function clear () {
    this.items = {};
    this.nan = void 0;
    return this.size = 0;
  };

  // remove an entry from the map (if it exists)
  Map.prototype.delete = function delete$1 (key) {
    var index, prefixedKey, ref, row;
    if (typeof key === "number" && isNaN(key)) {
      if (this.nan !== void 0) {
        this.size--;
        this.nan = void 0;
      }
    } else {
      prefixedKey = prefix$1(key);
      row = this.items[prefixedKey];
      index = row != null ? (ref = row.keys) != null ? ref.indexOf(key) : void 0 : void 0;
      if ((index != null) && index !== -1) {
        row.keys.splice(index, 1);
        row.values.splice(index, 1);
        if (!row.keys.length) {
          delete this.items[prefixedKey];
        }
        this.size--;
      }
    }
    return this;
  };

  // returns an array of [key, value] arrays
  Map.prototype.entries = function entries () {
    var items, k, ref, v;
    items = [];
    ref = this.items;
    for (k in ref) {
      v = ref[k];
      if (checkPrefix$1(k)) {
        items = items.concat(v.keys.map(function(key, i) {
          return [key, v.values[i]];
        }));
      }
    }
    if (this.nan !== void 0) {
      items.push([0/0, this.nan]);
    }
    return items;
  };

  // calls f once for each key-value pair present in this Map object. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
  Map.prototype.forEach = function forEach (f, thisArg) {
    if ( thisArg === void 0 ) thisArg = this;

    var j, len, ref, v;
    ref = this.entries();
    for (j = 0, len = ref.length; j < len; j++) {
      v = ref[j];
      f.call(thisArg, v[0], v[1]);
    }
    return this;
  };

  // returns the value associated to the key, or undefined if there is none.
  Map.prototype.get = function get (key) {
    var index, prefixedKey, ref, row;
    if (typeof key === "number" && isNaN(key)) {
      return this.nan;
    } else {
      prefixedKey = prefix$1(key);
      row = this.items[prefixedKey];
      index = row != null ? (ref = row.keys) != null ? ref.indexOf(key) : void 0 : void 0;
      if ((index != null) && index !== -1) {
        return row.values[index];
      } else {
        return void 0;
      }
    }
  };

  // check if the map contains a value
  Map.prototype.has = function has (key) {
    var index, ref, ref1;
    if (typeof key === "number" && isNaN(key)) {
      return this.nan !== void 0;
    } else {
      index = (ref = this.items[prefix$1(key)]) != null ? (ref1 = ref.keys) != null ? ref1.indexOf(key) : void 0 : void 0;
      return (index != null) && index !== -1;
    }
  };

  // returns returns an array that contains the keys for each element in the Map.
  Map.prototype.keys = function keys () {
    var j, len, ref, results, v;
    ref = this.entries();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      v = ref[j];
      results.push(v[0]);
    }
    return results;
  };

  // add an entry to the map (if it isn't already there)
  Map.prototype.set = function set (key, value) {
    var base, emptyRow, index, prefixedKey, row;
    if (typeof key === "number" && isNaN(key)) {
      if (this.nan === void 0) {
        this.size++;
      }
      this.nan = value;
    } else {
      prefixedKey = prefix$1(key);
      emptyRow = {
        keys: [],
        values: []
      };
      row = (base = this.items)[prefixedKey] != null ? base[prefixedKey] : base[prefixedKey] = emptyRow;
      index = row.keys.indexOf(key);
      if (index !== -1) {
        row.values[index] = value;
      } else {
        this.size++;
        row.keys.push(key);
        row.values.push(value);
      }
    }
    return this;
  };

  // get the values of the entries in the map
  Map.prototype.values = function values () {
    var j, len, ref, results, v;
    ref = this.entries();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      v = ref[j];
      results.push(v[1]);
    }
    return results;
  };

  return Map;
}());

// Provides a layer over standard javascript arrays that makes adding and removing objects from a list easier
var List = /*@__PURE__*/(function () {
  function List(list) {
  if ( list === void 0 ) list = [];

    this.list = list;
    this.size = this.list.length;
  }

  // adds an item to the list
  List.prototype.add = function add (item) {
    this.list.push(item);
    this.size++;
    return this;
  };

  // removes all entries from the list
  List.prototype.clear = function clear () {
    this.list = [];
    this.size = 0;
    return this;
  };

  // removes the item at the index given
  List.prototype.delete = function delete$1 (index) {
    if ((0 <= index && index < this.list.length)) {
      this.list.splice(index, 1);
      this.size--;
      return true;
    } else {
      return false;
    }
  };

  // returns all items in the list as an array
  List.prototype.entries = function entries () {
    return this.list;
  };

  // runs a function for each item in the list
  List.prototype.forEach = function forEach (f, thisArg) {
    if ( thisArg === void 0 ) thisArg = this;

    var item, j, len, ref;
    ref = this.list;
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      f.call(thisArg, item);
    }
    return void 0;
  };

  // gets an item by index if it exists, or returns undefined otherwise
  List.prototype.get = function get (index) {
    if ((0 <= index && index < this.list.length)) {
      return this.list[index];
    } else {
      return void 0;
    }
  };

  // checks if the value is in the list. returns true if the values is found
  List.prototype.has = function has (item) {
    return this.list.indexOf(item) !== -1;
  };

  // removes the first occurance of this value found
  List.prototype.remove = function remove (value) {
    var i;
    if ((i = this.list.indexOf(value)) !== -1) {
      this.list.splice(i, 1);
      this.size--;
      return true;
    } else {
      return false;
    }
  };

  // removes all occuratnce of the value supplied from the list
  List.prototype.removeAll = function removeAll (value) {
    var i, removed;
    removed = 0;
    while ((i = this.list.indexOf(value)) !== -1) {
      this.list.splice(i, 1);
      this.size--;
      removed++;
    }
    return removed;
  };

  // the same as entries()
  List.prototype.values = function values () {
    return this.list;
  };

  return List;
}());

var extend, supportsDate, supportsTouch, vendorPrefixes;

// consistent string to int hashing
exports.hash = function(str, maxValue) {
  var i, l, len, ref, res;
  res = 0;
  len = str.length - 1;
  for (i = l = 0, ref = len; l <= ref; i = l += 1) {
    res = res * 31 + str.charCodeAt(i);
    res = res & res;
  }
  if (maxValue) {
    return Math.abs(res) % maxValue;
  } else {
    return res;
  }
};

// transposes a 2d array
exports.transpose = function(data) {
  var h, i, j, l, m, ref, ref1, transposed, w;
  if (data.length == null) {
    return void 0;
  }
  w = data.length;
  if (w === 0 || (data[0].length == null)) {
    return data;
  }
  h = data[0].length;
  transposed = new Array(h);
  for (i = l = 0, ref = h; l < ref; i = l += 1) {
    transposed[i] = new Array(w);
    for (j = m = 0, ref1 = w; m < ref1; j = m += 1) {
      transposed[i][j] = data[j][i];
    }
  }
  return transposed;
};

supportsTouch = void 0;

supportsDate = void 0;

exports.supports = function(name) {
  var input;
  switch (name) {
    case 'touch':
      return supportsTouch != null ? supportsTouch : supportsTouch = 'ontouchstart' in window;
    case 'date':
      if (supportsDate === void 0) {
        input = document.createElement("input");
        input.setAttribute("type", "date");
        supportsDate = input.type !== "text";
      }
      return supportsDate;
  }
};

exports.debounce = function(duration, fn) {
  var timeout;
  timeout = void 0;
  return function() {
    var f, origArgs;
    if (timeout) {
      clearTimeout(timeout);
    }
    origArgs = arguments;
    f = function() {
      timeout = void 0;
      return fn.apply(fn, origArgs);
    };
    return timeout = setTimeout(f, duration);
  };
};

exports.clamp = function(min, max, value) {
  return Math.min(max, Math.max(min, value));
};

exports.clampUnit = function(value) {
  return exports.clamp(0, 1, value);
};

exports.randomId = function(size, alphabet) {
  if ( size === void 0 ) size = 16;
  if ( alphabet === void 0 ) alphabet = 'ABCEDEF0123456789';

  var _, alphabetSize, chars, v;
  chars = alphabet.split('');
  alphabetSize = chars.length;
  v = (function() {
    var l, ref, results;
    results = [];
    for (_ = l = 0, ref = size; l < ref; _ = l += 1) {
      results.push(chars[Math.floor(Math.random() * alphabetSize)]);
    }
    return results;
  })();
  return v.join('');
};

exports.min = function(values) {
  return Math.min.apply(null, values != null ? values.filter(exports.defined) : void 0);
};

exports.minBy = function(values, f) {
  var fv, i, l, len1, m, minValue, minimum, ref, v;
  if ((values == null) || values.length === 0) {
    return void 0;
  }
  if (f) {
    minimum = values[0];
    minValue = f(minimum);
    for (i = l = 1, ref = values.length; l < ref; i = l += 1) {
      v = values[i];
      fv = f(v);
      if (minValue === void 0 || (fv !== void 0 && fv < minValue)) {
        minimum = v;
        minValue = fv;
      }
    }
    return minimum;
  } else {
    minimum = values[0];
    for (m = 0, len1 = values.length; m < len1; m++) {
      v = values[m];
      if (v !== void 0 && v < minimum) {
        minimum = v;
      }
    }
    return minimum;
  }
};

exports.argmin = function(values, f) {
  var i, l, m, minIndex, minValue, ref, ref1, v;
  if ((values == null) || values.length === 0) {
    return void 0;
  }
  minIndex = 0;
  minValue = void 0;
  if (f) {
    minValue = f(values[0]);
    if (values.length > 1) {
      for (i = l = 1, ref = values.length; l < ref; i = l += 1) {
        v = f(values[i]);
        if (minValue === void 0 || (v !== void 0 && v < minValue)) {
          minValue = v;
          minIndex = i;
        }
      }
    }
  } else {
    minValue = values[0];
    if (values.length > 1) {
      for (i = m = 1, ref1 = values.length; m < ref1; i = m += 1) {
        v = values[i];
        if (minValue === void 0 || (v !== void 0 && v < minValue)) {
          minValue = v;
          minIndex = i;
        }
      }
    }
  }
  if (minValue === void 0) {
    return void 0;
  } else {
    return minIndex;
  }
};

exports.max = function(values) {
  return Math.max.apply(null, values != null ? values.filter(exports.defined) : void 0);
};

exports.maxBy = function(values, f) {
  var fv, i, l, len1, m, maxValue, maximum, ref, v;
  if ((values == null) || values.length === 0) {
    return void 0;
  }
  if (f) {
    maximum = values[0];
    maxValue = f(maximum);
    for (i = l = 1, ref = values.length; l < ref; i = l += 1) {
      v = values[i];
      fv = f(v);
      if (maxValue === void 0 || (fv !== void 0 && fv > maxValue)) {
        maximum = v;
        maxValue = fv;
      }
    }
    return maximum;
  } else {
    maximum = values[0];
    for (m = 0, len1 = values.length; m < len1; m++) {
      v = values[m];
      if (v !== void 0 && v > maximum) {
        maximum = v;
      }
    }
    return maximum;
  }
};

exports.argmax = function(values, f) {
  var i, l, m, maxIndex, maxValue, ref, ref1, v;
  if ((values == null) || values.length === 0) {
    return void 0;
  }
  maxIndex = 0;
  maxValue = void 0;
  if (f) {
    maxValue = f(values[0]);
    if (values.length > 1) {
      for (i = l = 1, ref = values.length; l < ref; i = l += 1) {
        v = f(values[i]);
        if (maxValue === void 0 || (v !== void 0 && v > maxValue)) {
          maxValue = v;
          maxIndex = i;
        }
      }
    }
  } else {
    maxValue = values[0];
    if (values.length > 1) {
      for (i = m = 1, ref1 = values.length; m < ref1; i = m += 1) {
        v = values[i];
        if (maxValue === void 0 || (v !== void 0 && v > maxValue)) {
          maxValue = v;
          maxIndex = i;
        }
      }
    }
  }
  if (maxValue === void 0) {
    return void 0;
  } else {
    return maxIndex;
  }
};

exports.range = function(length) {
  var l, ref, results, x;
  results = [];
  for (x = l = 0, ref = length; l < ref; x = l += 1) {
    results.push(x);
  }
  return results;
};

exports.sum = function(values, f) {
  return values.reduce((function(a, b) {
    return a + b;
  }), 0);
};

exports.flatten = function(arr) {
  return [].concat.apply([], arr);
};

exports.cycle = function(list, i) {
  return list[i % list.length];
};

exports.hashList = function(list, str) {
  return list[exports.hash(str, list.length)];
};

exports.find = function(arr, f) {
  var d, l, len1;
  for (l = 0, len1 = arr.length; l < len1; l++) {
    d = arr[l];
    if (f(d)) {
      return d;
    }
  }
  return void 0;
};

exports.isNumber = function(x) {
  return typeof x === 'number' || x instanceof Number;
};

exports.isString = function(x) {
  return typeof x === 'string' || x instanceof String;
};

exports.isFunction = function(x) {
  return typeof x === "function";
};

exports.isArray = Array.isArray;

// returns true if the thing passed in is an object, except for arrays
// which technically are objects, but in the eyes of this function are not
// objects
exports.isObject = function(obj) {
  return typeof obj === 'object' && !exports.isArray(obj) && obj !== null;
};

exports.isBoolean = function(x) {
  return x === true || x === false || typeof x === 'boolean';
};

// Not plain objects:
// - Anything created with new (or equivalent)
// - DOM nodes
// - window
exports.isPlainObject = function(obj) {
  return (typeof obj === 'object') && (obj !== null) && (!obj.nodeType) && obj.constructor && obj.constructor.prototype.hasOwnProperty('isPrototypeOf');
};

exports.groupBy = function(arr, f) {
  var category, l, len1, map, values, x;
  map = new Map();
  for (l = 0, len1 = arr.length; l < len1; l++) {
    x = arr[l];
    category = f(x);
    if (!map.has(category)) {
      map.set(category, new List());
    }
    map.get(category).add(x);
  }
  values = map.entries();
  values.forEach(function(d) {
    return d[1] = d[1].entries();
  });
  return values;
};

exports.unique = function(list) {
  return new Set(list).values();
};

exports.endsWith = function(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
};

exports.startsWith = function(string, substring) {
  return string.lastIndexOf(substring, 0) === 0;
};

exports.tween = function(start, end, amount) {
  return start + (end - start) * amount;
};

exports.defined = function(x) {
  return x !== void 0 && x !== null;
};

exports.zip = function(arrays) {
  var i, l, length, ref, results;
  if (arrays) {
    if (arrays.length > 0) {
      length = exports.min(arrays.map(function(d) {
        return d.length || 0;
      }));
      if (length > 0) {
        results = [];
        for (i = l = 0, ref = length; l < ref; i = l += 1) {
          results.push(arrays.map(function(arr) {
            return arr[i];
          }));
        }
        return results;
      } else {
        return [];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
};

// gets all the things from the second object and plonks them into the first
// this does mutation, which is why it is not exposed
extend = function(target, overlay, retainUndefined) {
  var k, results, v;
  results = [];
  for (k in overlay) {
    v = overlay[k];
    if (exports.isPlainObject(v)) {
      if (target[k] == null) {
        target[k] = {};
      }
      results.push(extend(target[k], v, retainUndefined));
    } else {
      if (v !== void 0 || retainUndefined) {
        results.push(target[k] = exports.clone(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
};

exports.mergeImpl = function(deep, retainUndefined, objects) {
  var k, l, len1, len2, m, obj, res, v;
  if (deep) {
    res = {};
    for (l = 0, len1 = objects.length; l < len1; l++) {
      obj = objects[l];
      if (exports.isPlainObject(obj)) {
        extend(res, obj, retainUndefined);
      }
    }
    return res;
  } else {
    res = {};
    for (m = 0, len2 = objects.length; m < len2; m++) {
      obj = objects[m];
      if (exports.isPlainObject(obj)) {
        for (k in obj) {
          v = obj[k];
          if (v !== void 0 || retainUndefined) {
            res[k] = v;
          }
        }
      }
    }
    return res;
  }
};

exports.merge = function() {
  var objects = [], len = arguments.length;
  while ( len-- ) objects[ len ] = arguments[ len ];

  return exports.mergeImpl(true, true, objects);
};

exports.mergeDefined = function() {
  var objects = [], len = arguments.length;
  while ( len-- ) objects[ len ] = arguments[ len ];

  return exports.mergeImpl(true, false, objects);
};

// XXX Deprecated: Remove in next major
exports.merge.defined = exports.mergeDefined;

exports.shallowMerge = function() {
  var objects = [], len = arguments.length;
  while ( len-- ) objects[ len ] = arguments[ len ];

  return exports.mergeImpl(false, true, objects);
};

exports.shallowMergeDefined = function() {
  var objects = [], len = arguments.length;
  while ( len-- ) objects[ len ] = arguments[ len ];

  return exports.mergeImpl(false, false, objects);
};

// XXX Deprecated: Remove in next major
exports.shallowMerge.defined = exports.shallowMergeDefined;

exports.clone = function(obj) {
  var ref;
  if (exports.isArray(obj)) {
    return obj.map(exports.clone);
  } else if (exports.isPlainObject(obj)) {
    return exports.merge({}, obj);
  } else if (obj instanceof List) {
    return new List(obj.entries().map(exports.clone));
  } else if (obj instanceof Map) {
    return new Map(obj.entries().map(function(ref) {
      var k = ref[0];
      var v = ref[1];

      return [exports.clone(k), exports.clone(v)];
    }));
  } else if (obj instanceof Set) {
    return new Set(obj.keys().map(exports.clone));
  } else if (obj instanceof Date) {
    return new Date(obj.getTime());
  } else if (exports.isObject(obj) && obj !== null) {
    logger.warn(("Trying to clone " + obj + " with constructor " + (obj != null ? (ref = obj.constructor) != null ? ref.name : void 0 : void 0) + ", it isn't really cloneable! Carrying on anyway."));
    return {};
  } else {
    return obj;
  }
};

exports.shallowClone = function(obj) {
  var ref;
  if (exports.isArray(obj)) {
    return obj.slice();
  } else if (exports.isPlainObject(obj)) {
    return exports.shallowMerge({}, obj);
  } else if (obj instanceof List) {
    return new List(obj.entries());
  } else if (obj instanceof Map) {
    return new Map(obj.entries());
  } else if (obj instanceof Set) {
    return new Set(obj.keys());
  } else if (obj instanceof Date) {
    return new Date(obj.getTime());
  } else if (exports.isObject(obj) && obj !== null) {
    logger.warn(("Trying to shallow clone " + obj + " with constructor " + (obj != null ? (ref = obj.constructor) != null ? ref.name : void 0 : void 0) + ", it isn't really cloneable! Carrying on anyway."));
    return {};
  } else {
    return obj;
  }
};

vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];

exports.vendor = function(obj, prop) {
  var l, len1, p, prefixedProp;
  if (prop in obj) {
    return obj[prop];
  }
  for (l = 0, len1 = vendorPrefixes.length; l < len1; l++) {
    p = vendorPrefixes[l];
    if ((prefixedProp = p + prop.charAt(0).toUpperCase() + prop.slice(1)) in obj) {
      return obj[prefixedProp];
    }
  }
};

exports.identity = function(d) {
  return d;
};

function loopUpdate(f, g) {
  if (!f()) {
    window.requestAnimationFrame(g);
  }
}

function loop(f) {
  function g() {
    loopUpdate(f, g);
  }
  loopUpdate(f, g);
}

function transition(millis, f, ease, endCallback) {
  if ( ease === void 0 ) ease = exports.identity;

  var start = Date.now();

  var cancelled = false;
  function cancel() {
    cancelled = true;
  }

  if (millis <= 0) {
    f(1, false);
    if (endCallback) {
      endCallback(false);
    }
    return exports.identity;
  }
  loop(function () {
    var alpha = (Date.now() - start) / millis;
    if (alpha >= 1 || cancelled) {
      f(1, cancelled);
      if (endCallback) {
        endCallback(cancelled);
      }
      return true;
    }
    f(ease(alpha), false);
    return false;
  });

  return cancel;
}

var ease = {
  linear: exports.identity,
  quad: function (t) { return t * t; },
  cubic: function (t) { return t * t * t; },
};

var BasicEventEmitter;

BasicEventEmitter = /*@__PURE__*/(function () {
  function BasicEventEmitter() {
    this.callbacks = new Map();
    this.allCallbacks = new List();
  }

  // emit an object to all callbacks registered with the name given
  BasicEventEmitter.prototype.emit = function emit (name, data) {
    var cb, i, j, len, len1, ref, ref1;
    if (this.callbacks.has(name)) {
      ref = this.callbacks.get(name).entries();
      for (i = 0, len = ref.length; i < len; i++) {
        cb = ref[i];
        cb(data);
      }
    }
    ref1 = this.allCallbacks.entries();
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      cb = ref1[j];
      cb(name, data);
    }
    return this;
  };

  BasicEventEmitter.prototype.isEmpty = function isEmpty () {
    return this.callbacks.values().every(function(list) {
      return list.size === 0;
    }) && this.allCallbacks.size === 0;
  };

  // register a callback against the name given
  BasicEventEmitter.prototype.on = function on (name, callback) {
    if (name) {
      if (!this.callbacks.has(name)) {
        this.callbacks.set(name, new List());
      }
      this.callbacks.get(name).add(callback);
    } else {
      this.allCallbacks.add(callback);
    }
    return this;
  };

  // returns true if emitting an event under the name given will actually call any callbacks
  // this makes it possible to avoid emitting events, when no registered callbacks exist - and
  // avoid the cost of building data that goes with the events. This should only be used in
  // exceptional circumstances where lots of calls to emit have to be done at once.
  BasicEventEmitter.prototype.has = function has (name) {
    return this.allCallbacks.size > 0 || (this.callbacks.has(name) && this.callbacks.get(name).size > 0);
  };

  // deregisters a callback
  BasicEventEmitter.prototype.off = function off (name, callback) {
    var ref;
    if (callback) {
      if (name) {
        if ((ref = this.callbacks.get(name)) != null) {
          ref.remove(callback);
        }
      } else {
        this.allCallbacks.remove(callback);
      }
    } else {
      if (name) {
        this.callbacks.set(name, new List());
      } else {
        this.callbacks = new Map();
        this.allCallbacks = new List();
      }
    }
    return this;
  };

  // lets you pipe events through to another event emitter
  BasicEventEmitter.prototype.pipe = function pipe (eventEmitter, prefix, filter) {
    var filterer;
    filterer = filter ? function(n) {
      return filter.indexOf(n) !== -1;
    } : function(n) {
      return true;
    };
    if (prefix) {
      this.on(null, function(n, v) {
        if (filterer(n)) {
          return eventEmitter.emit(prefix + '.' + n, v);
        }
      });
    } else {
      this.on(null, function(n, v) {
        if (filterer(n)) {
          return eventEmitter.emit(n, v);
        }
      });
    }
    return this;
  };

  return BasicEventEmitter;
}());

var EventEmitter = (function() {
  var addEmitter, removeEmitter;

  var EventEmitter = function EventEmitter() {
    this.suppressedMap = new Map();
    this.emitters = new List();
    this.emittersMap = new Map();
    this.global = addEmitter(this, 'default');
  };

  // emit an object to all callbacks registered with the name given
  EventEmitter.prototype.emit = function emit (name, data) {
    var emitter, i, len, ref;
    if (!this.suppressedMap.get(name)) {
      ref = this.emitters.entries();
      // XXX: Deprecated event check - This is useful to have if we need to deprecated events in the future
      // if @deprecatedEvents?
      // for e of @deprecatedEvents
      //   if @deprecatedEvents[e].event is name
      //     @emit e, data
      for (i = 0, len = ref.length; i < len; i++) {
        emitter = ref[i];
        emitter.emit(name, data);
      }
    }
    return this;
  };

  // supresses all events of the given name (so calling emit will have no effect until re-enabled)
  EventEmitter.prototype.suppressed = function suppressed (name, suppressed$1) {
    if (arguments.length > 1) {
      this.suppressedMap.set(name, !!suppressed$1);
      return this;
    } else {
      return !!this.suppressedMap.get(name);
    }
  };

  // register a callback against the name given
  EventEmitter.prototype.on = function on (name, namespace, callback) {
    var ee;
    if (namespace === 'default') {
      throw new Error('hx.EventEmitter: "default" is a reserved namespace. It can not be used as a namespace name.');
    }
    if (exports.isString(namespace)) {
      ee = this.emittersMap.get(namespace);
      if (!ee) {
        ee = addEmitter(this, namespace);
      }
      ee.on(name, callback);
    } else {
      this.global.on(name, namespace);
    }
    return this;
  };

  EventEmitter.prototype.has = function has (name) {
    var emitter, i, len, ref;
    if (this.global.has(name)) {
      return true;
    }
    ref = this.emitters.entries();
    for (i = 0, len = ref.length; i < len; i++) {
      emitter = ref[i];
      if (emitter.has(name)) {
        return true;
      }
    }
    return false;
  };

  // deregisters a callback
  EventEmitter.prototype.off = function off (name, namespace, callback) {
      var this$1 = this;

    var be, emitters, emittersToRemove;
    if (exports.isString(namespace)) {
      if (this.emittersMap.has(namespace)) {
        be = this.emittersMap.get(namespace);
        be.off(name, callback);
        if (be.isEmpty()) {
          removeEmitter(this, be, namespace);
        }
      }
    } else {
      if (!callback && !exports.isString(namespace)) {
        callback = namespace;
      }
      emitters = this.emitters.entries();
      emittersToRemove = [];
      emitters.forEach(function (emitter) {
        emitter.off(name, callback);
        if (emitter !== this$1.global && emitter.isEmpty()) {
          return emittersToRemove.push(emitter);
        }
      });
      emittersToRemove.map(function (e) {
        return removeEmitter(this$1, e);
      });
    }
    return this;
  };

  // lets you pipe events through to another event emitter
  EventEmitter.prototype.pipe = function pipe (eventEmitter, prefix, filter) {
    this.global.pipe(eventEmitter, prefix, filter);
    return this;
  };
  addEmitter = function(ee, namespace) {
    var be;
    be = new BasicEventEmitter();
    ee.emittersMap.set(namespace, be);
    ee.emitters.add(be);
    return be;
  };

  removeEmitter = function(ee, be, namespace) {
    var lookedUpNamespace, ref;
    if (namespace && ee.emittersMap.has(namespace)) {
      ee.emittersMap.delete(namespace);
    } else {
      lookedUpNamespace = (ref = ee.emittersMap.entries().filter(function(ref) {
        var _ = ref[0];
        var e = ref[1];

        return e === be;
      })[0]) != null ? ref[0] : void 0;
      if (lookedUpNamespace) {
        ee.emittersMap.delete(lookedUpNamespace);
      }
    }
    return ee.emitters.remove(be);
  };

  return EventEmitter;

}).call(undefined);

var Color, componentToHex, fromString, hueToRGB, update, wrapDeprecated;

componentToHex = function(c) {
  var hex;
  hex = c.toString(16);
  if (hex.length === 1) {
    return '0' + hex;
  } else {
    return hex;
  }
};

hueToRGB = function(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
};

update = function(obj, hslToRgb) {
  var b, c, g, h, l, max, min, p, q, r, s;
  if (hslToRgb) {
    h = obj.h / 360;
    s = obj.s / 100;
    l = obj.l / 100;
    if (s === 0) {
      r = g = b = l;
    } else {
      q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      p = 2 * l - q;
      r = hueToRGB(p, q, h + 1 / 3);
      g = hueToRGB(p, q, h);
      b = hueToRGB(p, q, h - 1 / 3);
    }
    obj.r = r * 255;
    obj.g = g * 255;
    obj.b = b * 255;
  } else {
    r = obj.r / 255;
    g = obj.g / 255;
    b = obj.b / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;
    c = max - min;
    if (max === min) {
      h = s = 0;
    } else {
      s = l > 0.5 ? c / (2 - max - min) : c / (max + min);
      switch (max) {
        case r:
          h = (g - b) / c + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / c + 2;
          break;
        case b:
          h = (r - g) / c + 4;
      }
      h /= 6;
    }
    obj.h = h * 360;
    obj.s = s * 100;
    obj.l = l * 100;
  }
  return obj;
};

Color = (function() {
  var property;

  var Color = function Color() {
    this._ = { // Max:
      r: 0, // 255
      g: 0, // 255
      b: 0, // 255
      h: 0, // 360
      s: 0, // 100
      l: 0, // 100
      a: 1 // 1
    };
  };

  Color.prototype.hsl = function hsl (arr) {
    if (arguments.length > 0) {
      if (arr == null) {
        arr = [];
      }
      property('h', true, false).call(this, arr[0]);
      property('s', true, false).call(this, arr[1]);
      property('l', true, false).call(this, arr[2]);
      this.alpha(arr[3]);
      update(this._, true);
      return this;
    } else {
      return [this.hue(), this.saturation(), this.lightness(), this.alpha()];
    }
  };

  Color.prototype.rgb = function rgb (arr) {
    if (arguments.length > 0) {
      if (arr == null) {
        arr = [];
      }
      property('r', false, false).call(this, arr[0]);
      property('g', false, false).call(this, arr[1]);
      property('b', false, false).call(this, arr[2]);
      this.alpha(arr[3]);
      update(this._, false);
      return this;
    } else {
      return [this.red(), this.green(), this.blue(), this.alpha()];
    }
  };

  // Modifiers
  Color.prototype.saturate = function saturate (amount) {
    return this.saturation(this._.s + (this._.s * amount));
  };

  Color.prototype.lighten = function lighten (amount) {
    return this.lightness(this._.l + (this._.l * amount));
  };

  Color.prototype.fade = function fade (amount) {
    return this.alpha(this._.a + (this._.a * amount));
  };

  Color.prototype.mix = function mix (col, amount) {
      if ( amount === void 0 ) amount = 0.5;

    var a, b, c, g, r;
    c = !isColor(col) ? color(col) : col;
    r = this._.r * (1 - amount) + c._.r * amount;
    g = this._.g * (1 - amount) + c._.g * amount;
    b = this._.b * (1 - amount) + c._.b * amount;
    a = this._.a * (1 - amount) + c._.a * amount;
    return this.rgb([r, g, b, a]);
  };

  // Getters
  Color.prototype.textCol = function textCol () {
    var yiq;
    yiq = ((this.red() * 299) + (this.green() * 587) + (this.blue() * 114)) / 1000;
    if (yiq >= 128) {
      return 'black';
    } else {
      return 'white';
    }
  };

  Color.prototype.toString = function toString (type) {
    var a, b, g, h, l, r, s;
    h = this.hue();
    s = this.saturation();
    l = this.lightness();
    r = this.red();
    g = this.green();
    b = this.blue();
    a = this.alpha();
    switch (type) {
      case 'hsla':
        return ("hsla(" + h + "," + s + "%," + l + "%," + a + ")");
      case 'rgba':
        return ("rgba(" + r + "," + g + "," + b + "," + a + ")");
      case 'hsl':
        return ("hsl(" + h + "," + s + "%," + l + "%)");
      case 'rgb':
        return ("rgb(" + r + "," + g + "," + b + ")");
      default:
        if (a !== 1) {
          return ("rgba(" + r + "," + g + "," + b + "," + a + ")");
        } else {
          return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
    }
  };

  Color.prototype.range = function range$1 (numLight, numDark, maxRange, outputFormat) {
      if ( numLight === void 0 ) numLight = 3;
      if ( numDark === void 0 ) numDark = 3;
      if ( maxRange === void 0 ) maxRange = 0.5;

    var dark, light, list, self, step;
    step = maxRange / Math.max(numLight, numDark, 1);
    self = this;
    light = exports.range(numLight + 1).map(function(i) {
      return self.clone().lighten(step * i);
    });
    dark = exports.range(numDark).reverse().map(function(i) {
      return self.clone().lighten(-step * (i + 1));
    });
    list = dark.concat(light);
    if (outputFormat) {
      if (outputFormat === 'array') {
        return list.map(function(c) {
          return c.rgb();
        });
      } else {
        return list.map(function(c) {
          return c.toString(outputFormat);
        });
      }
    } else {
      return list;
    }
  };

  Color.prototype.clone = function clone () {
    return new Color().rgb(this.rgb());
  };
  property = function(prop, isHSL, isAlphaValue) {
    var max, min;
    min = 0;
    max = (function() {
      switch (prop) {
        case 'h':
          return 360;
        case 's':
        case 'l':
          return 100;
        case 'r':
        case 'g':
        case 'b':
          return 255;
        case 'a':
          return 1;
      }
    })();
    return function(value) {
      if (arguments.length > 0) {
        if ((value != null) && !isNaN(value)) {
          this._[prop] = exports.clamp(min, max, value);
          if (!isAlphaValue) {
            update(this._, isHSL);
          }
        }
        return this;
      } else {
        if (isAlphaValue) {
          return Math.round(this._[prop] * 100) / 100;
        } else {
          return Math.round(this._[prop]);
        }
      }
    };
  };

  Color.prototype.red = property('r', false);

  Color.prototype.green = property('g', false);

  Color.prototype.blue = property('b', false);

  Color.prototype.hue = property('h', true);

  Color.prototype.saturation = property('s', true);

  Color.prototype.lightness = property('l', true);

  Color.prototype.alpha = property('a', null, true);

  return Color;

}).call(undefined);

fromString = function(str) {
  var a, b, g, hsl, multiplier, r, rgb, rgbArr, string;
  if (!exports.isString(str)) {
    return void 0;
  }
  if (str.indexOf('#') !== -1) {
    str = str.substring(1);
    if (str.length === 3) {
      multiplier = 1;
    } else {
      multiplier = 2;
    }
    rgbArr = [str.substring(0, multiplier), str.substring(multiplier, 2 * multiplier), str.substring(2 * multiplier, 3 * multiplier)];
    if (multiplier === 1) {
      rgbArr[0] += '' + rgbArr[0];
      rgbArr[1] += '' + rgbArr[1];
      rgbArr[2] += '' + rgbArr[2];
    }
    r = parseInt(rgbArr[0], 16);
    g = parseInt(rgbArr[1], 16);
    b = parseInt(rgbArr[2], 16);
    a = 1;
    rgb = [r, g, b, a];
  } else if (str.indexOf('rgb') !== -1) {
    string = str.replace('rgb(', '').replace('rgba(', '').replace(')', '');
    rgb = string.split(',');
  } else if (str.indexOf('hsl') !== -1) {
    string = str.replace('hsl(', '').replace('hsla(', '').replace(')', '').replace('%', '').replace('%', '').replace('%', '');
    hsl = string.split(',');
    if (hsl.some(function(d) {
      return isNaN(Number(d));
    })) {
      return void 0;
    }
    if (hsl[3] == null) {
      hsl[3] = 1;
    }
    return (new Color()).hsl(hsl);
  } else {
    return void 0;
  }
  if (rgb[3] == null) {
    rgb[3] = 1;
  }
  if (rgb.some(function(d) {
    return isNaN(Number(d));
  })) {
    return void 0;
  }
  return (new Color()).rgb(rgb);
};

var color = function() {
  if (arguments.length >= 3) {
    return (new Color()).rgb([arguments[0], arguments[1], arguments[2], arguments[3]]);
  } else if (arguments.length === 1) {
    if (Array.isArray(arguments[0])) {
      return (new Color()).rgb(arguments[0]);
    } else if (isColor(arguments[0])) {
      return arguments[0];
    } else {
      return fromString(arguments[0]);
    }
  } else {
    return new Color();
  }
};

// returns true if the string passed in represents a color
var isColorString = function(str) {
  return fromString(str) !== void 0;
};

// check if an object is a Color instance
var isColor = function(obj) {
  return obj instanceof Color;
};

// XXX Deprecated: Color
wrapDeprecated = function(name, method) {
  return function() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    logger.deprecated(name, ("Replaced by hx." + name));
    return method.apply(void 0, args);
  };
};

color.isColorString = wrapDeprecated('isColorString', isColorString);

color.isColor = wrapDeprecated('isColor', isColor);

var interpolateNumber, splitString;

splitString = function(string) {
  var a, array, regex;
  regex = new RegExp(/[-+]?(?:\d+\.?\d*|\.?\d+)|((?:[^-+\d])+|\D+)/g);
  array = [];
  while ((a = regex.exec(string)) !== null) {
    array.push(isNaN(parseInt(a[0])) ? a[0] : Number(a[0]));
  }
  return array;
};

interpolateNumber = function(a, b) {
  a = +a;
  b = +b;
  return function(v) {
    return a * (1 - v) + b * v;
  };
};

var interpolate = function(a, b) {
  var colA, colB, res;
  if (typeof a === "number") {
    return interpolateNumber(a, b);
  }
  colA = color(a);
  colB = color(b);
  if (colA !== void 0 && colB !== void 0) {
    return function(v) {
      return colA.clone().mix(colB, v).toString('rgba');
    };
  } else {
    a = splitString(a);
    b = splitString(b);
    if (a.length === b.length) {
      return function(v) {
        var c, i, j, ref;
        c = [];
        for (i = j = 0, ref = a.length; j <= ref; i = j += 1) {
          if (!isNaN(parseInt(a[i])) && !isNaN(parseInt(b[i]))) {
            c[i] = interpolateNumber(a[i], b[i])(v);
          } else if (a[i] === b[i]) {
            c[i] = a[i];
          } else {
            c[i] = b[i];
          }
        }
        return c.join('');
      };
    } else {
      res = b.join('');
      return function(v) {
        return res;
      };
    }
  }
};

var augmenters, bareSelect, classed, closestParent, domSelectAll, domSelectSingle, flattenNodes, getMatches, getMethod, matchPolyfill, namespaces, reformed, shallowSelectAll, shallowSelectSingle;

var ElementSet = /*@__PURE__*/(function () {
  function ElementSet() {
    this.elements = new List();
    this.ids = new Set();
  }

  ElementSet.prototype.add = function add (element) {
    var d, id;
    d = getHexagonElementDataObject(element);
    if (d.id == null) {
      d.id = exports.randomId();
    }
    id = d.id;
    if (!this.ids.has(id)) {
      this.ids.add(id);
      return this.elements.add(element);
    }
  };

  ElementSet.prototype.remove = function remove (element) {
    var d;
    d = getHexagonElementDataObject(element, false);
    if (d && d.id) {
      if (this.ids.has(d.id)) {
        this.elements.remove(element);
        return this.ids.delete(d.id);
      }
    }
  };

  ElementSet.prototype.entries = function entries () {
    return this.elements.entries();
  };

  ElementSet.prototype.has = function has (element) {
    var d;
    d = getHexagonElementDataObject(element);
    return d && d.id && this.ids.has(d.id) || false;
  };

  return ElementSet;
}());

var getHexagonElementDataObject = function(element, createIfDoesNotExist) {
  if ( createIfDoesNotExist === void 0 ) createIfDoesNotExist = true;

  if (createIfDoesNotExist) {
    if (element.__hx__ == null) {
      element.__hx__ = {};
    }
    return element.__hx__;
  } else {
    if (element.__hx__) {
      return element.__hx__;
    }
  }
};

namespaces = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};

// protect against dom clobbering
getMethod = function(node, methodName) {
  if (node === window) {
    return window[methodName];
  } else if (node instanceof Document) {
    return Document.prototype[methodName];
  } else {
    return Element.prototype[methodName] || Node.prototype[methodName] || HTMLBodyElement.prototype[methodName];
  }
};

// Should only be called with Function.call(node, selector)
matchPolyfill = function(selector) {
  var matchingNodes, node;
  node = this;
  matchingNodes = (node.document || node.ownerDocument).querySelectorAll(selector);
  return [].slice.call(matchingNodes).indexOf(node) > -1;
};

getMatches = function(node) {
  return node.matches || exports.vendor(node, 'matchesSelector') || matchPolyfill;
};

domSelectSingle = function(selector, node) {
  return getMethod(node, 'querySelector').call(node, selector);
};

domSelectAll = function(selector, node) {
  return getMethod(node, 'querySelectorAll').call(node, selector);
};

shallowSelectSingle = function(selector, node) {
  var child, j, len, matchFn, ref;
  matchFn = getMatches(node);
  if (node.children) {
    ref = node.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if (matchFn.call(child, selector)) {
        return child;
      }
    }
  }
};

shallowSelectAll = function(selector, node) {
  var child, j, len, matchFn, matchingNodes, ref;
  matchFn = getMatches(node);
  matchingNodes = [];
  if (node.children) {
    ref = node.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if (matchFn.call(child, selector)) {
        matchingNodes.push(child);
      }
    }
  }
  return matchingNodes;
};

closestParent = function(selector, node) {
  node = node.parentNode;
  while (node && node !== document) {
    if (getMatches(node).call(node, selector)) {
      return node;
    }
    node = node.parentNode;
  }
  return void 0;
};

flattenNodes = function(nodes) {
  var j, k, len, len1, node, nodearray, set;
  set = new ElementSet();
  for (j = 0, len = nodes.length; j < len; j++) {
    nodearray = nodes[j];
    for (k = 0, len1 = nodearray.length; k < len1; k++) {
      node = nodearray[k];
      set.add(node);
    }
  }
  return set.entries();
};

//XXX: could check for the existance of classList (https://developer.mozilla.org/en-US/docs/Web/API/element.classList)
classed = function(node, _class, include) {
  var c, cls, current, i, j, len, newList, selection;
  selection = select(node);
  c = selection.attr('class');
  newList = _class.split(' ').filter(function(d) {
    return d !== '';
  });
  if (!c) {
    if (include) {
      selection.attr('class', newList.join(' '));
    }
    return;
  }
  current = c.split(' ');
  for (j = 0, len = newList.length; j < len; j++) {
    cls = newList[j];
    if (cls !== '') {
      i = current.indexOf(cls);
      if (include && i === -1) {
        current.push(cls);
      } else if (!include && i !== -1) {
        current.splice(i, 1);
      }
      selection.attr('class', current.join(' '));
    }
  }
};

reformed = function(flatten, values) {
  if (!flatten) {
    return values;
  } else {
    if (values.length === 0) {
      return void 0;
    } else {
      if (values.length === 1) {
        return values[0];
      } else {
        return values;
      }
    }
  }
};

augmenters = [];

var Selection = (function() {
  var attach, attachSingle;

  var Selection = function Selection(nodes1) {
    this.nodes = nodes1;
    this.nodes = this.nodes.filter(function(d) {
      return d != null;
    });
    this.singleSelection = false;
  };

  // selects the first node matching the selector relative to this selection's nodes
  Selection.prototype.select = function select (selector) {
    var s;
    // XXX Breaking: Selection select error
    // if not isString(selector)
    // throw new Error('Selection::select expects a string argument')
    if (!exports.isString(selector)) {
      logger.warn('Selection.select was passed the wrong argument type', 'Selection.select only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      s = new Selection(this.nodes.map(function(node) {
        return domSelectSingle(selector, node);
      }));
      s.singleSelection = this.singleSelection;
      return s;
    }
  };

  // selects all nodes matching the selector relative to this selection's nodes
  Selection.prototype.selectAll = function selectAll (selector) {
    // XXX Breaking: Selection select error
    // if not isString(selector)
    // throw new Error('Selection::selectAll expects a string argument')
    if (!exports.isString(selector)) {
      logger.warn('Selection.selectAll was passed the wrong argument type', 'Selection.selectAll only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      return new Selection(flattenNodes(this.nodes.map(function(node) {
        return domSelectAll(selector, node);
      })));
    }
  };

  // selects the first node matching the selector that is a direct descendent of this selection
  Selection.prototype.shallowSelect = function shallowSelect (selector) {
    var s;
    // XXX Breaking: Selection select error
    // if not isString(selector)
    // throw new Error('Selection::shallowSelect expects a string argument')
    if (!exports.isString(selector)) {
      logger.warn('Selection.selectAll was passed the wrong argument type', 'Selection.selectAll only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      s = new Selection(this.nodes.map(function(node) {
        return shallowSelectSingle(selector, node);
      }));
      s.singleSelection = this.singleSelection;
      return s;
    }
  };

  // selects all the nodes matching the selector that are a direct descendent of this selection
  Selection.prototype.shallowSelectAll = function shallowSelectAll$1 (selector) {
    // XXX Breaking: Selection select error
    // if not isString(selector)
    // throw new Error('Selection::shallowSelectAll expects a string argument')
    if (!exports.isString(selector)) {
      logger.warn('Selection.selectAll was passed the wrong argument type', 'Selection.selectAll only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      return new Selection(flattenNodes(this.nodes.map(function(node) {
        return shallowSelectAll(selector, node);
      })));
    }
  };

  // traverses up the dom to find the closest matching element. returns a selection containing the result
  Selection.prototype.closest = function closest (selector) {
    var s;
    // XXX Breaking: Selection select error
    // if not isString(selector)
    // throw new Error('Selection::closest expects a string argument')
    if (!exports.isString(selector)) {
      logger.warn('Selection.closest was passed the wrong argument type', 'Selection.closest only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      s = new Selection(this.nodes.map(function(node) {
        return closestParent(selector, node);
      }));
      s.singleSelection = this.singleSelection;
      return s;
    }
  };

  Selection.prototype.parent = function parent () {
    if (!this.singleSelection) {
      throw new Error('Selection::parent can only be used on a single selection');
    } else {
      return select(this.node().parentNode);
    }
  };

  // inserts the element inside the selected elements as the last child
  Selection.prototype.prepend = function prepend (name) {
    return attach(this, name, (function(parent, node) {
      return parent.insertBefore(node, parent.firstChild);
    }), true);
  };

  // inserts the elements inside the selected elements as the first child
  Selection.prototype.append = function append (name) {
    return attach(this, name, function(parent, node) {
      return parent.appendChild(node);
    });
  };

  // does the same as append, but returns the current selection for chaining.
  Selection.prototype.add = function add (name) {
    this.append(name);
    return this;
  };

  // inserts the element before the selected (at the same level in the dom tree)
  Selection.prototype.insertBefore = function insertBefore (name) {
    return attach(this, name, function(parent, node) {
      return parent.parentNode.insertBefore(node, parent);
    });
  };

  // inserts the element after the selected (at the same level in the dom tree)
  Selection.prototype.insertAfter = function insertAfter (name) {
    return attach(this, name, (function(parent, node) {
      return parent.parentNode.insertBefore(node, parent.nextSibling);
    }), true);
  };

  // removes the selected elements from the dom
  Selection.prototype.remove = function remove () {
    var j, len, node, ref, ref1, results;
    ref = this.nodes;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      results.push((ref1 = node.parentNode) != null ? ref1.removeChild(node) : void 0);
    }
    return results;
  };

  // removes all children from the selected nodes
  Selection.prototype.clear = function clear () {
    var j, len, node, ref, removeChild;
    ref = this.nodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      removeChild = getMethod(node, 'removeChild');
      while (node.firstChild) {
        removeChild.call(node, node.firstChild);
      }
    }
    return this;
  };

  // clears the contents of a node and then adds the children passed in
  Selection.prototype.set = function set (children) {
      var this$1 = this;

    // The use of Promise.resolve can delay when the replacement happens, so
    // check to only do this when needed. This makes testing nicer when adding
    // non-promise content
    if (children.then) {
      Promise.resolve(children).then(function (sel) {
        return this$1.clear().add(sel);
      });
    } else {
      this.clear().add(children);
    }
    return this;
  };

  // replaces this selection with some other content
  Selection.prototype.replace = function replace (content) {
      var this$1 = this;

    // The use of Promise.resolve can delay when the replacement happens, so
    // check to only do this when needed. This makes testing nicer when adding
    // non-promise content
    if (content.then) {
      Promise.resolve(content).then(function (sel) {
        this$1.insertAfter(sel);
        return this$1.remove();
      });
    } else {
      this.insertAfter(content);
      this.remove();
    }
    return this;
  };

  // gets the nth node in the selection, defaulting to the first
  Selection.prototype.node = function node (i) {
      if ( i === void 0 ) i = 0;

    return this.nodes[i];
  };

  // clones the nodes in the selection, and returns a new selection holding the cloned nodes
  Selection.prototype.clone = function clone (deep) {
      if ( deep === void 0 ) deep = true;

    var newNodes, node, s;
    newNodes = (function() {
      var j, len, ref, results;
      ref = this.nodes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        results.push(getMethod(node, 'cloneNode').call(node, deep));
      }
      return results;
    }).call(this);
    s = new Selection(newNodes);
    s.singleSelection = this.singleSelection;
    return s;
  };

  // gets or sets a property for the nodes in the selection
  Selection.prototype.prop = function prop (property, value) {
    var node;
    if (arguments.length === 2) {
      if (value != null) {
        (function() {
          var j, len, ref, results;
          ref = this.nodes;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            node = ref[j];
            results.push(node[property] = value);
          }
          return results;
        }).call(this);
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var j, len, ref, results;
        ref = this.nodes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          node = ref[j];
          results.push(node[property]);
        }
        return results;
      }).call(this));
    }
  };

  // gets or sets an attribute of the nodes in the selection
  Selection.prototype.attr = function attr (attribute, value) {
    var attr, getVal, j, len, namespace, node, parts, ref, val;
    if (attribute.indexOf(':') >= 0) {
      parts = attribute.split(':');
      namespace = namespaces[parts[0]];
      attr = parts[1];
    } else {
      attr = attribute;
    }
    if (arguments.length === 2) {
      ref = this.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        if (namespace) {
          if (value !== void 0) {
            getMethod(node, 'setAttributeNS').call(node, namespace, attr, value);
          } else {
            getMethod(node, 'removeAttributeNS').call(node, namespace, attr);
          }
        } else {
          if (value !== void 0) {
            getMethod(node, 'setAttribute').call(node, attr, value);
          } else {
            getMethod(node, 'removeAttribute').call(node, attr);
          }
        }
      }
      return this;
    } else {
      getVal = namespace ? function(node) {
        return getMethod(node, 'getAttributeNS').call(node, namespace, attr);
      } : function(node) {
        return getMethod(node, 'getAttribute').call(node, attr);
      };
      return reformed(this.singleSelection, (function() {
        var k, len1, ref1, results;
        ref1 = this.nodes;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          node = ref1[k];
          results.push((val = getVal(node)) !== null ? val : void 0);
        }
        return results;
      }).call(this));
    }
  };

  // gets or sets a style attribute of the nodes in the selection
  Selection.prototype.style = function style (property, value) {
    var j, len, node, ref;
    if (arguments.length === 2) {
      ref = this.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        if (value !== void 0) {
          node.style.setProperty(property, value);
        } else {
          node.style.removeProperty(property);
        }
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var k, len1, ref1, results;
        ref1 = this.nodes;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          node = ref1[k];
          results.push(window.getComputedStyle(node, null).getPropertyValue(property));
        }
        return results;
      }).call(this));
    }
  };

  // gets or sets the text of the nodes in the selection
  Selection.prototype.text = function text (text$1) {
    var j, len, node, ref;
    if (arguments.length === 1) {
      ref = this.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        node.textContent = text$1 != null ? text$1 : '';
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var k, len1, ref1, results;
        ref1 = this.nodes;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          node = ref1[k];
          results.push(node.textContent || '');
        }
        return results;
      }).call(this));
    }
  };

  // gets or sets the inner html of the nodes in the selection
  Selection.prototype.html = function html (html$1) {
    var j, len, node, ref;
    logger.deprecated('Selection::html', 'N/A - This method has been removed for security reasons');
    if (arguments.length === 1) {
      ref = this.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        node.innerHTML = html$1 != null ? html$1 : '';
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var k, len1, ref1, results;
        ref1 = this.nodes;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          node = ref1[k];
          results.push(node.innerHTML || '');
        }
        return results;
      }).call(this));
    }
  };

  // gets or sets the class attribute of the nodes in the selection
  Selection.prototype.class = function class$1 (_class) {
    var j, len, node, ref;
    if (arguments.length === 1) {
      ref = this.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        getMethod(node, 'setAttribute').call(node, 'class', _class || '');
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var k, len1, ref1, results;
        ref1 = this.nodes;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          node = ref1[k];
          results.push(getMethod(node, 'getAttribute').call(node, 'class') || '');
        }
        return results;
      }).call(this));
    }
  };

  // adds, removes or gets a class in the class list for a node
  Selection.prototype.classed = function classed$1 (_class, include) {
    var classes, cls, j, len, node, ref;
    if (arguments.length === 1) {
      classes = (function() {
        var j, len, ref, results;
        ref = this.nodes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          node = ref[j];
          results.push(getMethod(node, 'getAttribute').call(node, 'class') || '');
        }
        return results;
      }).call(this);
      return reformed(this.singleSelection, (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = classes.length; j < len; j++) {
          cls = classes[j];
          results.push(_class.split(' ').every(function(_cls) {
            return cls.split(' ').indexOf(_cls) !== -1;
          }));
        }
        return results;
      })());
    } else {
      ref = this.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        classed(node, _class, include);
      }
      return this;
    }
  };

  // gets or sets the value property of a node
  Selection.prototype.value = function value (value$1) {
    if (arguments.length === 1) {
      return this.prop('value', value$1);
    } else {
      return this.prop('value');
    }
  };

  // subscribe for dom events from the underlying nodes
  Selection.prototype.on = function on (name, namespace, f) {
    var augmenter, data, eventEmitter, handler, handlerRemoverFunctions, j, k, len, len1, node, ref;
    if (!exports.isString(namespace)) {
      f = namespace;
      namespace = 'selection';
    }
    if (namespace === 'default') {
      namespace = 'selection';
    }
    ref = this.nodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      data = getHexagonElementDataObject(node);
      eventEmitter = data.eventEmitter ? data.eventEmitter : data.eventEmitter = new EventEmitter();
      if (data.eventAugmenters == null) {
        data.eventAugmenters = new Map();
      }
      if (data.listenerNamesRegistered == null) {
        data.listenerNamesRegistered = new Set();
      }
      if (name.indexOf('pointer') !== 0 && !data.listenerNamesRegistered.has(name)) {
        handler = function(e) {
          return eventEmitter.emit(name, e);
        };
        data.listenerNamesRegistered.add(name);
        getMethod(node, 'addEventListener').call(node, name, handler);
      }
      eventEmitter.off(name, namespace);
      // set up any event augmenters that have not yet been set up
      if (!data.eventAugmenters.has(name)) {
        handlerRemoverFunctions = [];
        for (k = 0, len1 = augmenters.length; k < len1; k++) {
          augmenter = augmenters[k];
          if (augmenter.name === name) {
            handlerRemoverFunctions.push(augmenter.setup(node, eventEmitter));
          }
        }
        data.eventAugmenters.set(name, handlerRemoverFunctions);
      }
      if (namespace) {
        eventEmitter.on(name, namespace, f);
      } else {
        eventEmitter.on(name, f);
      }
    }
    return this;
  };

  // unsubscribe for dom events from the underlying nodes
  Selection.prototype.off = function off (name, namespace, f) {
    var data, j, k, len, len1, node, ref, ref1, ref2, ref3, remover;
    if (!exports.isString(namespace)) {
      f = namespace;
      namespace = void 0;
    }
    if (namespace === 'default') {
      namespace = 'selection';
    }
    ref = this.nodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      data = getHexagonElementDataObject(node);
      // Remove listeners added by event augmenters
      if ((ref1 = data.eventAugmenters) != null ? ref1.has(name) : void 0) {
        ref2 = data.eventAugmenters.get(name);
        for (k = 0, len1 = ref2.length; k < len1; k++) {
          remover = ref2[k];
          remover();
        }
        data.eventAugmenters.delete(name);
      }
      if ((ref3 = data.eventEmitter) != null) {
        ref3.off(name, namespace, f);
      }
    }
    return this;
  };

  // attaches or reads some data from the underlying nodes
  Selection.prototype.data = function data (key, value) {
    var data, node, values;
    if (arguments.length === 1) {
      values = (function() {
        var j, len, ref, results;
        ref = this.nodes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          node = ref[j];
          data = getHexagonElementDataObject(node);
          if (data.data) {
            results.push(data.data.get(key));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }).call(this);
      return reformed(this.singleSelection, values);
    } else {
      values = (function() {
        var j, len, ref, results;
        ref = this.nodes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          node = ref[j];
          data = getHexagonElementDataObject(node);
          if (data.data == null) {
            data.data = new Map();
          }
          results.push(data.data.set(key, value));
        }
        return results;
      }).call(this);
      return this;
    }
  };

  // runs some function for each node in the selection
  Selection.prototype.forEach = function forEach (f) {
    this.nodes.map(function(node) {
      return select(node);
    }).forEach(f);
    return this;
  };

  // maps the selection to an array
  Selection.prototype.map = function map (f) {
    return reformed(this.singleSelection, this.nodes.map(function(node) {
      return select(node);
    }).map(f));
  };

  // creates a new selection with some of the nodes filtered out
  Selection.prototype.filter = function filter (f) {
    var s;
    s = new Selection(this.nodes.filter(function(node) {
      return f(select(node));
    }));
    s.singleSelection = this.singleSelection;
    return s;
  };

  // gets the client rect box for nodes in the selection
  Selection.prototype.box = function box () {
    var node;
    return reformed(this.singleSelection, (function() {
      var j, len, ref, results;
      ref = this.nodes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        results.push(getMethod(node, 'getBoundingClientRect').call(node));
      }
      return results;
    }).call(this));
  };

  // gets the widths of the nodes in the selection (in pixels)
  Selection.prototype.width = function width () {
    var node;
    return reformed(this.singleSelection, (function() {
      var j, len, ref, results;
      ref = this.nodes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        results.push(getMethod(node, 'getBoundingClientRect').call(node).width);
      }
      return results;
    }).call(this));
  };

  // gets the heights of the nodes in the selection (in pixels)
  Selection.prototype.height = function height () {
    var node;
    return reformed(this.singleSelection, (function() {
      var j, len, ref, results;
      ref = this.nodes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        results.push(getMethod(node, 'getBoundingClientRect').call(node).height);
      }
      return results;
    }).call(this));
  };

  // gets the number of nodes in the selection
  Selection.prototype.size = function size () {
    return this.nodes.length;
  };

  // checks if the selection is empty
  Selection.prototype.empty = function empty () {
    return this.nodes.length === 0;
  };

  // checks if any of the nodes in the selection contain the supplied node
  Selection.prototype.contains = function contains (element) {
    var j, len, node, ref;
    ref = this.nodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      if (getMethod(node, 'contains').call(node, element)) {
        return true;
      }
    }
    return false;
  };

  Selection.prototype.component = function component$1 () {
    if (this.singleSelection) {
      if (this.nodes[0]) {
        return component(this.nodes[0]);
      }
    } else {
      return this.nodes.map(component);
    }
  };

  Selection.prototype.components = function components$1 () {
    if (this.singleSelection) {
      if (this.nodes[0]) {
        return components(this.nodes[0]);
      }
    } else {
      return this.nodes.map(components);
    }
  };

  Selection.prototype.api = function api (name, apiObject) {
    var hedo, ref;
    if (!this.singleSelection) {
      throw new Error('Selection::api - can only be used for a single selection');
    }
    hedo = getHexagonElementDataObject(this.nodes[0]);
    if (hedo.components == null) {
      hedo.components = [];
    }
    if (arguments.length === 0) {
      return hedo.defaultApi;
    } else if (arguments.length === 1) {
      if (exports.isString(name)) {
        return (ref = hedo.api) != null ? ref[name] : void 0;
      } else if (exports.isObject(name)) {
        hedo.defaultApi = arguments[0];
        // XXX Deprecated: Component
        hedo.components.push(arguments[0]);
        return this;
      } else {
        throw new Error('Selection::api - the api passed in should be an object');
      }
    } else if (arguments.length === 2) {
      if (!exports.isString(name)) {
        throw new Error('Selection::api - name should be a string');
      }
      if (!exports.isObject(apiObject)) {
        throw new Error('Selection::api - the api passed in should be an object');
      }
      hedo.api = hedo.api || {};
      hedo.api[name] = apiObject;
      // XXX Deprecated: Component
      if (!hedo.components.indexOf(apiObject) === -1) {
        hedo.components.push(apiObject);
      }
      return this;
    }
  };
  // returns an array of the newly created nodes
  attachSingle = function(selection, element, attacher) {
    var j, k, len, len1, namespace, newNode, node, ref, ref1, results;
    if (element === void 0) {
      return [];
    }
    // XXX Breaking: Selection select error
    // if not (isString(element) or (element instanceof Selection) or (element instanceof Element))
    //   throw new Error('Selection: Expecting an Element, Selection or string argument')
    // if not selection.singleSelection and (element instanceof Element or element instanceof Selection)
    //   throw new Error('Selection: You can not attach an existing element to a selection with multiple elements')
    // if selection.empty()
    //   logger.warn('Selection: Attaching an element to an empty selection has no effect')
    //   return []
    if (!(exports.isString(element) || (element instanceof Selection) || (element instanceof Element))) {
      logger.warn('Selection Api error when attaching element', 'Expecting an Element, Selection or string argument, you supplied:', element);
      return [];
    }
    if (!selection.singleSelection && (element instanceof Element || element instanceof Selection)) {
      logger.warn('Selection Api error when attaching element', 'You can not attach an existing element to a selection with multiple elements');
      return [];
    }
    if (selection.empty()) {
      logger.warn('Selection Api error when attaching element', 'You can not attach an element to an empty selection');
      return [];
    }
    if (element instanceof Element) {
      attacher(selection.nodes[0], element);
      return [element];
    } else if (element instanceof Selection) {
      ref = element.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        attacher(selection.nodes[0], node);
      }
      return element.nodes;
    } else {
      ref1 = selection.nodes;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        node = ref1[k];
        namespace = namespaces.hasOwnProperty(element) ? namespaces[element] : node.namespaceURI;
        newNode = node.ownerDocument.createElementNS(namespace, element);
        attacher(node, newNode);
        results.push(newNode);
      }
      return results;
    }
  };

  attach = function(selection, name, attacher, reverse) {
    if ( reverse === void 0 ) reverse = false;

    var dir, element, newNodes, ns, s, singleSelection;
    singleSelection = selection.singleSelection;
    newNodes = exports.isArray(name) ? (singleSelection = false, dir = reverse ? -1 : 1, ns = (function() {
      var j, len, ref, results;
      ref = dir;
      results = [];
      for ((ref > 0 ? (j = 0, len = name.length) : j = name.length - 1); ref > 0 ? j < len : j >= 0; j += ref) {
        element = name[j];
        results.push(attachSingle(selection, element, attacher));
      }
      return results;
    })(), exports.flatten(reverse ? ns.reverse() : ns)) : attachSingle(selection, name, attacher);
    s = new Selection(newNodes);
    s.singleSelection = singleSelection;
    return s;
  };

  return Selection;

}).call(undefined);

bareSelect = function(selector, selectorIsArray) {
  var nodes, s;
  nodes = selectorIsArray ? selector : typeof selector === 'string' ? [domSelectSingle(selector, document)] : [selector];
  s = new Selection(nodes);
  s.singleSelection = !selectorIsArray;
  return s;
};

// expose
var select = function(selector) {
  if (selector instanceof Selection) {
    return selector;
  } else if (!((selector instanceof HTMLElement) || (selector instanceof SVGElement) || exports.isString(selector) || selector === document || selector === window)) {
    // XXX Breaking: Selection select error
    // throw new Error('select only accepts a HTMLElement, SVGElement or string argument')
    logger.warn('hx.select was passed the wrong argument type', 'hx.select only accepts a HTMLElement, SVGElement or string argument, you supplied:', selector);
    return new Selection([]);
  } else {
    return bareSelect(selector);
  }
};

// returns the first component for an element (this will be the most commonly used function)
var component = function(selector) {
  logger.deprecated('component', 'Deprecated in favour of Selection::api()');
  return getHexagonElementDataObject(select(selector).node()).components[0];
};

// lists the components for an element
var components = function(selector) {
  logger.deprecated('components', 'Deprecated in favour of Selection::api(\'name\')');
  // take a copy in case the user does something to the array
  return (getHexagonElementDataObject(select(selector).node()).components || []).slice();
};

// clears components from an element
components.clear = function(selector) {
  logger.deprecated('components.clear', 'Removed, clearing the components from an element is not recommended. Components are attached to nodes so removing them from the DOM will remove associated components');
  getHexagonElementDataObject(select(selector).node()).components = [];
};

// registers a component against an element
component.register = function(selector, component) {
  logger.deprecated('component.register', 'Deprecated in favour of Selection::api(component) and Selection::api(\'name\', component)');
  select(selector).api(component);
};

var addEventAugmenter = function(augmenter) {
  return augmenters.push(augmenter);
};

var selectAll = function(selector) {
  if (!(exports.isString(selector) || exports.isArray(selector))) {
    // XXX Breaking: Selection select error
    // throw new Error('selectAll only accepts a string or array as its argument')
    logger.warn('hx.selectAll was passed the wrong argument type', 'hx.selectAll only accepts a string argument, you supplied:', selector);
    return new Selection([]);
  } else {
    if (exports.isArray(selector)) {
      return bareSelect(selector, true);
    } else {
      return bareSelect(document).selectAll(selector);
    }
  }
};

var detached = function(name, namespace) {
  namespace = namespaces.hasOwnProperty(name) ? namespaces[name] : namespaces.xhtml;
  return bareSelect(document.createElementNS(namespace, name));
};

var isSelection = function(selection) {
  return selection instanceof Selection;
};

var context, contexts, paletteContexts;

contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled'];

paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast', 'disabled'];

context = function(contextArray, contextPrefix) {
  var mappedContexts;
  mappedContexts = contextArray.map(function(context) {
    return contextPrefix + '-' + context;
  }).join(' ');
  return function(selector, context) {
    var i, len, selection;
    selection = select(selector);
    if (arguments.length > 1) {
      selection.classed(mappedContexts, false);
      if (contextArray.indexOf(context) !== -1) {
        selection.classed(contextPrefix + '-' + context, true);
      } else if (context) {
        logger.warn(context + ' is not a known context. Accepted values are ' + contextArray.join(', '));
      }
      return selection;
    } else {
      for (i = 0, len = paletteContexts.length; i < len; i++) {
        context = paletteContexts[i];
        if (selection.classed(contextPrefix + '-' + context)) {
          return context;
        }
      }
      return void 0;
    }
  };
};

var palette$1 = {
  context: context(contexts, 'hx'),
  textContext: context(paletteContexts, 'hx-text'),
  backgroundContext: context(paletteContexts, 'hx-background'),
  borderContext: context(paletteContexts, 'hx-border')
};

var div = function(cls) {
  return detached('div').class(cls);
};

var span = function(cls) {
  return detached('span').class(cls);
};

var input = function(cls) {
  return detached('input').class(cls);
};

var checkbox = function(cls) {
  return detached('input').attr('type', 'checkbox').class(cls);
};

var i = function(cls) {
  return detached('i').class(cls);
};

var icon = function(options) {
  logger.deprecated('icon', 'The icon fluid API has been replaced by: i(\'class\')');
  return detached('i').class(options != null ? options.class : void 0);
};

var button = function(cls) {
  var btn;
  if (cls && !exports.isString(cls)) {
    logger.deprecated('button', ("The button fluid API has been updated to take a single class string, you passed: " + cls), "button('class')");
    btn = detached('button').attr('type', 'button').class('hx-btn');
    return palette$1.context(btn, cls.context);
  }
  return detached('button').class(cls);
};

var Animation, Morph, animateState, initAnimate, registerMorph;

// XXX: [2.0.0] Remove, and replace with promise based transitions for props, attrs and style on selection
animateState = {
  morphs: new Map()
};

Animation = (function() {
  var doTransition;

  // works on the single node given
  var Animation = /*@__PURE__*/(function (EventEmitter) {
    function Animation(node1, ease1) {
      var this$1 = this;
      if ( ease1 === void 0 ) ease1 = ease.linear;

      EventEmitter.call(this);
      this.node = node1;
      this.ease = ease1;
      this.cancelers = [];
      this.remaining = 0;
      this.finished = false;
      this.endCallback = function (cancelled) {
        this$1.remaining--;
        if (this$1.remaining <= 0 && !this$1.finished && !cancelled) {
          this$1.finished = true;
          return this$1.emit('end');
        }
      };
    }

    if ( EventEmitter ) Animation.__proto__ = EventEmitter;
    Animation.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    Animation.prototype.constructor = Animation;

    Animation.prototype.style = function style (property, value, duration) {
      var this$1 = this;

      var interpolator, iteration;
      if (this.node) {
        if (arguments.length === 4) {
          interpolator = interpolate(arguments[1], arguments[2]);
          iteration = function (t, cancel) {
            if (!cancel) {
              return this$1.node.style.setProperty(property, interpolator(t));
            }
          };
          doTransition.call(this, iteration, arguments[3] || 200);
        } else {
          interpolator = interpolate(window.getComputedStyle(this.node, null).getPropertyValue(property), value);
          iteration = function (t, cancel) {
            if (!cancel) {
              return this$1.node.style.setProperty(property, interpolator(t));
            }
          };
          doTransition.call(this, iteration, duration || 200);
        }
      } else {
        this.endCallback();
      }
      return this;
    };

    Animation.prototype.attr = function attr (attribute, value, duration) {
      var this$1 = this;

      var interpolator, iteration;
      if (this.node) {
        if (arguments.length === 4) {
          interpolator = interpolate(arguments[1], arguments[2]);
          iteration = function (t, cancel) {
            if (!cancel) {
              return this$1.node.setAttribute(attribute, interpolator(t));
            }
          };
          doTransition.call(this, iteration, arguments[3] || 200);
        } else {
          interpolator = interpolate(this.node.getAttribute(attribute), value);
          iteration = function (t, cancel) {
            if (!cancel) {
              return this$1.node.setAttribute(attribute, interpolator(t));
            }
          };
          doTransition.call(this, iteration, duration || 200);
        }
      } else {
        this.endCallback();
      }
      return this;
    };

    Animation.prototype.cancel = function cancel () {
      var canceler, i, len, ref;
      this.emit('cancelled');
      ref = this.cancelers;
      for (i = 0, len = ref.length; i < len; i++) {
        canceler = ref[i];
        canceler();
      }
      return this;
    };

    return Animation;
  }(EventEmitter));
  doTransition = function(iteration, duration) {
    this.remaining++;
    this.cancelers.push(transition(duration, iteration, this.ease, this.endCallback));
    return this;
  };

  return Animation;

}).call(undefined);

exports.animate = function(node, ease) {
  return new Animation(node, ease);
};

Morph = (function() {
  var applyAttr, applyStyle, perform;

  // class for chaining animations and things together
  var Morph = /*@__PURE__*/(function (EventEmitter) {
    function Morph(node1, trigger, start, cancellers) {
      var this$1 = this;

      EventEmitter.call(this);
      this.node = node1;
      this.trigger = trigger;
      this.actions = [];
      this.start = start || (function () {
        return perform.call(this$1);
      });
      this.cancelers = cancellers || [];
      this.cancelled = false;
      this.finished = false;
      // when the previous action ends, start this morph off
      if (this.trigger) {
        this.trigger.on('end', 'hx.animate', function () {
          this$1.finished = true;
          if (!this$1.cancelled) {
            return perform.call(this$1);
          }
        });
      }
    }

    if ( EventEmitter ) Morph.__proto__ = EventEmitter;
    Morph.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    Morph.prototype.constructor = Morph;

    Morph.prototype.and = function and (f, duration) {
      var this$1 = this;
      if ( duration === void 0 ) duration = 200;

      var morphFactory;
      if (exports.isFunction(f)) {
        this.actions.push(f);
      } else {
        if (this.node) {
          morphFactory = animateState.morphs.get(f);
          if (morphFactory) {
            this.actions.push(function () {
              return morphFactory(this$1.node, duration);
            });
          } else {
            logger.warn(f + ' is not a registered morph', 'The available morphs are', animateState.morphs.entries());
          }
        }
      }
      return this;
    };

    Morph.prototype.then = function then (f, duration) {
      if ( duration === void 0 ) duration = 200;

      if (this.actions.length > 0) {
        return (new Morph(this.node, this, this.start, this.cancelers)).and(f, duration);
      } else {
        return this.and(f, duration);
      }
    };

    // aliases for 'then', so that the chain of commands reads more like a sentence morph.with().and().then().and()
    Morph.prototype.with = function with$1 (f, duration) {
      return this.then(f, duration);
    };

    Morph.prototype.andStyle = function andStyle (property, value, duration) {
      return this.and(applyStyle(this.node, arguments));
    };

    Morph.prototype.thenStyle = function thenStyle (property, value, duration) {
      return this.then(applyStyle(this.node, arguments));
    };

    Morph.prototype.withStyle = function withStyle (property, value, duration) {
      return this.then(applyStyle(this.node, arguments));
    };

    Morph.prototype.andAttr = function andAttr (property, value, duration) {
      return this.and(applyAttr(this.node, arguments));
    };

    Morph.prototype.thenAttr = function thenAttr (property, value, duration) {
      return this.then(applyAttr(this.node, arguments));
    };

    Morph.prototype.withAttr = function withAttr (property, value, duration) {
      return this.then(applyAttr(this.node, arguments));
    };

    Morph.prototype.cancel = function cancel () {
      var canceler, i, len, ref;
      if (!this.cancelled) {
        this.emit('cancelled');
        this.cancelled = true;
        ref = this.cancelers;
        for (i = 0, len = ref.length; i < len; i++) {
          canceler = ref[i];
          if (exports.isFunction(canceler.cancel)) {
            canceler.cancel();
          }
        }
      }
      return this;
    };

    Morph.prototype.go = function go (cancelOngoing) {
      var obj;
      if (cancelOngoing === true) {
        this.cancelOngoing();
      }
      this.start();
      if (this.node) {
        obj = getHexagonElementDataObject(this.node, true);
        if (obj.morphs == null) {
          obj.morphs = [];
        }
        // remove all cancelled and finished morphs
        obj.morphs = obj.morphs.filter(function(morph) {
          return !morph.cancelled && !morph.finished;
        });
        obj.morphs.push(this);
      }
      return this;
    };

    // cancels ongoing morphs for this node
    Morph.prototype.cancelOngoing = function cancelOngoing () {
      var i, len, morph, obj, ref;
      if (this.node) {
        obj = getHexagonElementDataObject(this.node, false);
        if (obj) {
          if (obj.morphs) {
            ref = obj.morphs;
            for (i = 0, len = ref.length; i < len; i++) {
              morph = ref[i];
              if (!(morph.finished || morph.cancelled)) {
                morph.cancel();
              }
            }
            obj.morphs = [];
          }
        }
      }
      return this;
    };

    return Morph;
  }(EventEmitter));
  // Style util methods
  applyStyle = function(node, args) {
    return function() { // Return function so the @and and @then work correctly.
      var animElem;
      animElem = exports.animate(node);
      return animElem.style.apply(animElem, args);
    };
  };

  // Attr util methods
  applyAttr = function(node, args) {
    return function() { // Return function so the @and and @then work correctly.
      var animElem;
      animElem = exports.animate(node);
      return animElem.attr.apply(animElem, args);
    };
  };

  perform = function() {
    var this$1 = this;

    var action, awaiting, i, len, onEnd, ref, res, results;
    if (this.actions.length > 0) {
      awaiting = this.actions.length;
      onEnd = function () {
        awaiting--;
        if (awaiting === 0) {
          return this$1.emit('end');
        }
      };
      ref = this.actions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        res = action(onEnd);
        if ((res !== void 0) && res.cancel) {
          this.cancelers.push(res);
        }
        if (res instanceof EventEmitter) {
          results.push(res.on('end', 'hx.animate', onEnd));
        } else if (action.length === 0) { // the non async case
          results.push(onEnd());
        } else {
          results.push(void 0);
        }
      }
      return results;
    } else {
      // if there is nothing to do, emit end straight away
      return this.emit('end');
    }
  };

  return Morph;

}).call(undefined);

exports.morph = function(node) {
  return new Morph(node);
};

registerMorph = function(name, morph) {
  return animateState.morphs.set(name, morph);
};

initAnimate = function() {
  Selection.prototype.animate = function(ease) {
    return exports.animate(this.nodes[0], ease);
  };
  return Selection.prototype.morph = function() {
    return new Morph(this.nodes[0]);
  };
};

// normalisation for mouse + touch events

var initPointerEvents = function() {
  var addAugmentor, addAugmentorWithLocation, addAugmentorWithoutLocation;
  addAugmentor = function(name, mouseName, touchNames, node, eventEmitter, mouseEventFactory, touchEventFactory) {
    return addEventAugmenter({
      name: name,
      setup: function(node, eventEmitter) {
        var i, len, mouseHandler, touch, touchHandler, touchName;
        mouseHandler = function(e) {
          return eventEmitter.emit(name, mouseEventFactory(e));
        };
        node.addEventListener(mouseName, mouseHandler);
        touch = exports.supports('touch');
        if (touch) {
          touchHandler = function(e) {
            return eventEmitter.emit(name, touchEventFactory(e));
          };
          for (i = 0, len = touchNames.length; i < len; i++) {
            touchName = touchNames[i];
            node.addEventListener(touchName, touchHandler);
          }
        }
        return function() {
          var j, len1, results;
          node.removeEventListener(mouseName, mouseHandler);
          if (touch) {
            results = [];
            for (j = 0, len1 = touchNames.length; j < len1; j++) {
              touchName = touchNames[j];
              results.push(node.removeEventListener(touchName, touchHandler));
            }
            return results;
          }
        };
      }
    });
  };
  addAugmentorWithLocation = function(name, mouseName, touchNames, node, eventEmitter) {
    var mouseEventFactory, touchEventFactory;
    mouseEventFactory = function(e) {
      return {
        x: e.clientX,
        y: e.clientY,
        event: e
      };
    };
    touchEventFactory = function(e) {
      return {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
        event: e
      };
    };
    return addAugmentor(name, mouseName, touchNames, node, eventEmitter, mouseEventFactory, touchEventFactory);
  };
  addAugmentorWithoutLocation = function(name, mouseName, touchNames, node, eventEmitter) {
    var handler;
    handler = function(e) {
      return {
        event: e
      };
    };
    return addAugmentor(name, mouseName, touchNames, node, eventEmitter, handler, handler);
  };
  addAugmentorWithLocation('pointerdown', 'mousedown', ['touchstart']);
  addAugmentorWithLocation('pointermove', 'mousemove', ['touchmove']);
  addAugmentorWithoutLocation('pointerup', 'mouseup', ['touchend', 'touchcancel']);
  addAugmentorWithoutLocation('pointerleave', 'mouseleave', ['touchleave']);
  return addAugmentorWithoutLocation('pointerenter', 'mouseenter', ['touchenter']);
};

var View;

View = /*@__PURE__*/(function () {
  function View(rootSelection, selector1, defaultType) {
    var classes, elementType, self;
    this.rootSelection = rootSelection;
    this.selector = selector1;
    this.defaultType = defaultType;
    self = this;
    elementType = self.selector.split('.')[0];
    classes = self.selector.split('.').slice(1).join(' ');
    this.new = function(datum) {
      return this.append(elementType || self.defaultType).class(classes).node();
    };
    this.each = function(datum, element) {};
    this.old = function(datum, element) {
      return this.remove();
    };
  }

  View.prototype.enter = function enter (f) {
    this.new = f;
    return this;
  };

  View.prototype.exit = function exit (f) {
    this.old = f;
    return this;
  };

  View.prototype.update = function update (f) {
    this.each = f;
    return this;
  };

  View.prototype.apply = function apply (data, key) {
    var this$1 = this;

    var classString, classes, d, dataByKey, datum, enterSet, exitSet, i, j, k, l, len, len1, len2, len3, m, n, newNodeSet, node, nodeByKey, nodeData, nodes, o, p, ref, ref1, ref2, selectorContainsClasses, updateSet, viewEnterWarning;
    if (this.rootSelection.size()) {
      data = Array.isArray(data) ? data : [data];
      enterSet = [];
      updateSet = [];
      exitSet = [];
      nodes = this.rootSelection.shallowSelectAll(this.selector).nodes;
      if (key) {
        // some temporary maps for keeping track of which nodes are entering, and which are exiting
        nodeByKey = new Map();
        dataByKey = new Map(data.map(function(datum) {
          return [key(datum), datum];
        }));
        for (l = 0, len = nodes.length; l < len; l++) {
          node = nodes[l];
          nodeData = getHexagonElementDataObject(node);
          if (nodeData.datum) {
            d = nodeData.datum;
            k = key(d);
            if (nodeByKey.has(k)) {
              // found a duplicate - do it should go into the exit set
              exitSet.push({
                element: node,
                datum: d
              });
            } else {
              nodeByKey.set(k, node);
              if (dataByKey.has(k)) {
                datum = dataByKey.get(k);
                dataByKey.delete(k);
                updateSet.push({
                  element: node,
                  datum: datum
                });
              } else {
                // the data no longer exists - the node should disappear
                exitSet.push({
                  element: node,
                  datum: d
                });
              }
            }
          } else {
            // remove unknown nodes
            exitSet.push({
              element: node,
              datum: void 0
            });
          }
        }
        enterSet = (function() {
          var len1, m, ref, results;
          ref = dataByKey.entries();
          results = [];
          for (m = 0, len1 = ref.length; m < len1; m++) {
            d = ref[m];
            results.push({
              datum: d[1]
            });
          }
          return results;
        })();
      } else {
        i = 0;
        for (m = 0, len1 = nodes.length; m < len1; m++) {
          node = nodes[m];
          if (i < data.length) {
            nodeData = getHexagonElementDataObject(node);
            nodeData.datum = data[i];
            updateSet.push({
              element: node,
              datum: data[i]
            });
          } else {
            nodeData = getHexagonElementDataObject(node, false);
            exitSet.push({
              element: node,
              datum: nodeData.datum
            });
          }
          i++;
        }
        if (i < data.length) {
          for (j = n = ref = i, ref1 = data.length - 1; (ref <= ref1 ? n <= ref1 : n >= ref1); j = ref <= ref1 ? ++n : --n) {
            enterSet.push({
              datum: data[j]
            });
          }
        }
      }
      viewEnterWarning = function(element, selector) {
        return logger.warn("view enter function returned", element, ". It didn't match selector", selector, ", so you may encounter odd behavior");
      };
      classes = this.selector.split('.');
      selectorContainsClasses = classes.length > 1;
      classString = classes.slice(1).join(' ');
      newNodeSet = enterSet.map(function (d, i) {
        var element, hedo, isChild, isClassedCorrectly, ret;
        datum = d.datum;
        element = this$1.new.call(this$1.rootSelection, datum, i, data.indexOf(datum));
        // Checks isChild first as it's the quickest operation
        isChild = this$1.rootSelection.contains(element);
        if (!isChild) {
          viewEnterWarning(element, this$1.selector);
        // Only do this check if the selector actually contains classes to check
        } else if (selectorContainsClasses) {
          isClassedCorrectly = select(element).classed(classString);
          if (!isClassedCorrectly) {
            viewEnterWarning(element, this$1.selector);
          }
        }
        hedo = getHexagonElementDataObject(element);
        hedo.datum = datum;
        return ret = {
          element: element,
          datum: d.datum
        };
      });
      for (i = o = 0, len2 = exitSet.length; o < len2; i = ++o) {
        d = exitSet[i];
        this.old.call(select(d.element), d.datum, d.element, i);
      }
      ref2 = updateSet.concat(newNodeSet);
      for (i = p = 0, len3 = ref2.length; p < len3; i = ++p) {
        d = ref2[i];
        this.each.call(select(d.element), d.datum, d.element, i);
      }
      return this;
    }
  };

  return View;
}());

var initView = function() {
  return Selection.prototype.view = function(selector, type) {
    if ( type === void 0 ) type = 'div';

    if (this.size() === 0) {
      logger.warn('.view() called on an empty selection');
    }
    return new View(this, selector, type);
  };
};

var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

// XXX: [2.0.0] Remove

// XXX: rather than modifying the global hx state, these should be exposed as functions/objects
//      that can be used with the selection api in some way

// built in animations and morphs
var initMorphs = function() {
  var Delay, animateStyles, clearAndGet, getStyles, setStyles;
  registerMorph('fadeout', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    return exports.animate(node).style('opacity', 0, duration);
  });
  registerMorph('fadein', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    return exports.animate(node).style('opacity', 1, duration);
  });
  // should only be used for size values
  getStyles = function(selection, properties) {
    var i, j, len, len1, p, results, results1;
    if (selection.style('display') !== 'none') {
      results = [];
      for (i = 0, len = properties.length; i < len; i++) {
        p = properties[i];
        results.push({
          name: p,
          value: selection.style(p)
        });
      }
      return results;
    } else {
      results1 = [];
      for (j = 0, len1 = properties.length; j < len1; j++) {
        p = properties[j];
        results1.push({
          name: p,
          value: '0px'
        });
      }
      return results1;
    }
  };
  clearAndGet = function(selection, properties) {
    var i, len, p, results;
    results = [];
    for (i = 0, len = properties.length; i < len; i++) {
      p = properties[i];
      results.push({
        name: p,
        value: selection.style(p, '').style(p)
      });
    }
    return results;
  };
  setStyles = function(selection, properties) {
    var i, item, len;
    for (i = 0, len = properties.length; i < len; i++) {
      item = properties[i];
      selection.style(item.name, item.value);
    }
  };
  animateStyles = function(selection, properties, duration) {
    var animation, i, item, len;
    animation = selection.animate();
    for (i = 0, len = properties.length; i < len; i++) {
      item = properties[i];
      animation.style(item.name, item.value, duration);
    }
    return animation;
  };
  registerMorph('expand', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    var end, properties, selection, start;
    properties = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom', 'width', 'padding-left', 'padding-right', 'margin-left', 'margin-right'];
    // get the start and end style values
    selection = select(node);
    start = getStyles(selection, properties);
    selection.style('display', '');
    end = clearAndGet(selection, properties);
    // restore the styles
    setStyles(selection, start);
    selection.classed('hx-morph-hidden', true);
    // animate the styles
    return animateStyles(selection, end, duration).on('end', 'hx.morphs', function(e) {
      clearAndGet(selection, properties);
      return selection.classed('hx-morph-hidden', false);
    });
  });
  registerMorph('expandv', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    var end, properties, selection, start;
    properties = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom'];
    // get the start and end style values
    selection = select(node);
    start = getStyles(selection, properties);
    selection.style('display', '');
    end = clearAndGet(selection, properties);
    // restore the styles
    setStyles(selection, start);
    selection.classed('hx-morph-hidden', true);
    // animate the styles
    return animateStyles(selection, end, duration).on('end', 'hx.morphs', function(e) {
      clearAndGet(selection, properties);
      return selection.classed('hx-morph-hidden', false);
    });
  });
  registerMorph('expandh', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    var end, properties, selection, start;
    properties = ['width', 'padding-left', 'padding-right', 'margin-left', 'margin-right'];
    // get the start and end style values
    selection = select(node);
    start = getStyles(selection, properties);
    selection.style('display', '');
    end = clearAndGet(selection, properties);
    // restore the styles
    setStyles(selection, start);
    selection.classed('hx-morph-hidden', true);
    // animate the styles
    return animateStyles(selection, end, duration).on('end', 'hx.morphs', function(e) {
      clearAndGet(selection, properties);
      return selection.classed('hx-morph-hidden', false);
    });
  });
  registerMorph('collapse', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    var selection;
    selection = select(node).classed('hx-morph-hidden', true);
    return exports.animate(node).style('height', '0px', duration).style('padding-top', '0px', duration).style('padding-bottom', '0px', duration).style('margin-top', '0px', duration).style('margin-bottom', '0px', duration).style('width', '0px', duration).style('padding-left', '0px', duration).style('padding-right', '0px', duration).style('margin-left', '0px', duration).style('margin-right', '0px', duration).on('end', 'hx.morphs', function(e) {
      return selection.style('display', 'none').style('height', '').style('padding-top', '').style('padding-bottom', '').style('margin-top', '').style('margin-bottom', '').style('width', '').style('padding-left', '').style('padding-right', '').style('margin-left', '').style('margin-right', '').classed('hx-morph-hidden', false);
    });
  });
  registerMorph('collapsev', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    var selection;
    selection = select(node).classed('hx-morph-hidden', true);
    return exports.animate(node).style('height', '0px', duration).style('padding-top', '0px', duration).style('padding-bottom', '0px', duration).style('margin-top', '0px', duration).style('margin-bottom', '0px', duration).on('end', 'hx.morphs', function(e) {
      return selection.style('display', 'none').style('height', '').style('padding-top', '').style('padding-bottom', '').style('margin-top', '').style('margin-bottom', '').classed('hx-morph-hidden', false);
    });
  });
  registerMorph('collapseh', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    var selection;
    selection = select(node).classed('hx-morph-hidden', true);
    return exports.animate(node).style('width', '0px', duration).style('padding-left', '0px', duration).style('padding-right', '0px', duration).style('margin-left', '0px', duration).style('margin-right', '0px', duration).on('end', 'hx.morphs', function(e) {
      return selection.style('display', 'none').style('width', '').style('padding-left', '').style('padding-right', '').style('margin-left', '').style('margin-right', '').classed('hx-morph-hidden', false);
    });
  });
  registerMorph('rotate-90', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    return exports.animate(node).style('-webkit-transform', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(0, 1, -1, 0, 0, 0)', duration).style('transform', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(0, 1, -1, 0, 0, 0)', duration).on('end', 'hx.morphs', function() {
      return select(node).style('transform', '').style('-webkit-transform', '');
    }).on('cancel', 'hx.morphs', function() {
      return select(node).style('transform', '').style('-webkit-transform', '');
    });
  });
  registerMorph('rotate-0', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    return exports.animate(node).style('-webkit-transform', 'matrix(0, 1, -1, 0, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)', duration).style('transform', 'matrix(0, 1, -1, 0, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)', duration).on('end', 'hx.morphs', function() {
      return select(node).style('transform', '').style('-webkit-transform', '');
    }).on('cancel', 'hx.morphs', function() {
      return select(node).style('transform', '').style('-webkit-transform', '');
    });
  });
  Delay = /*@__PURE__*/(function (EventEmitter) {
    function Delay(duration) {
      var this$1 = this;

      EventEmitter.call(this);
      this.cancel = this.cancel.bind(this);
      this.timeout = setTimeout((function () {
        return this$1.emit('end');
      }), duration);
    }

    if ( EventEmitter ) Delay.__proto__ = EventEmitter;
    Delay.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    Delay.prototype.constructor = Delay;

    Delay.prototype.cancel = function cancel () {
      boundMethodCheck(this, Delay);
      return clearTimeout(this.timeout);
    };

    return Delay;
  }(EventEmitter));
  return registerMorph('delay', function(node, duration) {
    if ( duration === void 0 ) duration = 100;

    return new Delay(duration);
  });
};

// use http://js2.coffee/ to convert the js to coffee and replace
// do ->
//  with:
// export default () ->

// replace window.addResizeListener with addResizeListener
// replace window.removeResizeListener with removeResizeListener
// change the retun value of the function to return an object {addResizeListener, removeResizeListener}

//~~~~~~~~~~~~~~~~~~~
// Define Detect element resize script here:
//~~~~~~~~~~~~~~~~~~~
/**
* Detect Element Resize
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
*
 */
function initializeResizeListeners() {
  /* Detect CSS Animations support to detect element display/re-attach */
  var addResizeListener, animation, animationKeyframes, animationName, animationStyle, animationstartevent, attachEvent, cancelFrame, checkTriggers, createStyles, domPrefixes, elm, i, keyframeprefix, pfx, removeResizeListener, requestFrame, resetTriggers, scrollListener, startEvents, stylesCreated;
  attachEvent = document.attachEvent;
  stylesCreated = false;
  resetTriggers = function(element) {
    var contract, expand, expandChild, triggers;
    triggers = element.__resizeTriggers__;
    expand = triggers.firstElementChild;
    contract = triggers.lastElementChild;
    expandChild = expand.firstElementChild;
    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  };
  checkTriggers = function(element) {
    return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height;
  };
  scrollListener = function(e) {
    var element;
    element = this;
    resetTriggers(this);
    if (this.__resizeRAF__) {
      cancelFrame(this.__resizeRAF__);
    }
    this.__resizeRAF__ = requestFrame(function() {
      if (checkTriggers(element)) {
        element.__resizeLast__.width = element.offsetWidth;
        element.__resizeLast__.height = element.offsetHeight;
        element.__resizeListeners__.forEach(function(fn) {
          fn.call(element, e);
        });
      }
    });
  };
  createStyles = function() {
    var css, head, style;
    if (!stylesCreated) {
      //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
      css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; z-index: -1;} ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }';
      head = document.head || document.getElementsByTagName('head')[0];
      style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      head.appendChild(style);
      stylesCreated = true;
    }
  };
  if (!attachEvent) {
    requestFrame = (function() {
      var raf;
      raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
        return window.setTimeout(fn, 20);
      };
      return function(fn) {
        return raf(fn);
      };
    })();
    cancelFrame = (function() {
      var cancel;
      cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
      return function(id) {
        return cancel(id);
      };
    })();
    animation = false;
    keyframeprefix = '';
    animationstartevent = 'animationstart';
    domPrefixes = 'Webkit Moz O ms'.split(' ');
    startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ');
    pfx = '';
    elm = document.createElement('fakeelement');
    if (elm.style.animationName !== void 0) {
      animation = true;
    }
    if (animation === false) {
      i = 0;
    }
    while (i < domPrefixes.length) {
      if (elm.style[domPrefixes[i] + 'AnimationName'] !== void 0) {
        pfx = domPrefixes[i];
        keyframeprefix = '-' + pfx.toLowerCase() + '-';
        animationstartevent = startEvents[i];
        animation = true;
        break;
      }
      i++;
    }
    animationName = 'resizeanim';
    animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
    animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
  }
  addResizeListener = function(element, fn) {
    if (attachEvent) {
      element.attachEvent('onresize', fn);
    } else {
      if (!element.__resizeTriggers__) {
        if (getComputedStyle(element).position === 'static') {
          element.style.position = 'relative';
        }
        createStyles();
        element.__resizeLast__ = {};
        element.__resizeListeners__ = [];
        (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
        element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
        element.appendChild(element.__resizeTriggers__);
        resetTriggers(element);
        element.addEventListener('scroll', scrollListener, true);
        /* Listen for a css animation to detect element display/re-attach */
        animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
          if (e.animationName === animationName) {
            resetTriggers(element);
          }
        });
      }
      element.__resizeListeners__.push(fn);
    }
  };
  removeResizeListener = function(element, fn) {
    if (attachEvent) {
      element.detachEvent('onresize', fn);
    } else {
      element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
      if (!element.__resizeListeners__.length) {
        element.removeEventListener('scroll', scrollListener);
        element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
      }
    }
  };
  return {
    addResizeListener: addResizeListener,
    removeResizeListener: removeResizeListener
  };
}

var initResizeEvents = function() {
  var addResizeListener, removeResizeListener;
  addResizeListener = void 0;
  removeResizeListener = void 0;
  return addEventAugmenter({
    name: 'resize',
    setup: function(node, eventEmitter) {
      var handler, registers;
      if (addResizeListener === void 0) {
        registers = initializeResizeListeners();
        addResizeListener = registers.addResizeListener;
        removeResizeListener = registers.removeResizeListener;
      }
      handler = function(e) {
        var box;
        box = select(node).box();
        return eventEmitter.emit('resize', {
          clientRect: box,
          event: e
        });
      };
      addResizeListener(node, handler);
      return function() {
        return removeResizeListener(node, handler);
      };
    }
  });
};

var initLogos, replaceWithDiv;

replaceWithDiv = function(sel) {
  return sel.replace(div('hx-logo'));
};

initLogos = function() {
  var logos;
  logos = selectAll('img.hx-logo');
  if (logos.size()) {
    logger.warn('Logo:', 'The .hx-logo class should only be applied to <div> elements.', 'You supplied: ', logos.nodes);
    return logos.forEach(replaceWithDiv);
  }
};

function actionRenderer(ref) {
  var text = ref.text;
  var onClick = ref.onClick;
  var disabled = ref.disabled;

  if (!onClick) {
    throw new Error('Action items require an onClick function or url');
  }
  if (exports.isString(onClick)) {
    var link = detached('a')
      .text(text);
    if (!disabled) {
      link.attr('href', onClick);
    }
    return link;
  }
  var sel = div()
    .text(text);

  if (!disabled) {
    sel.on('click', onClick);
  }
  return sel;
}

function actionRenderWrapper(elem, item) {
  var sel = select(elem);
  var cls = sel.class();
  var retSel = actionRenderer(item);
  retSel.classed(cls, true);
  sel.insertBefore(retSel);
  sel.remove();
  return retSel;
}

var cachedParseHtml, cachedScrollbarSize;

//XXX [2.0.0]: remove - not used in hexagon anymore since request.node().innerHTML = has gone
cachedParseHtml = null;

var parseHTML = function(html) {
  if (!cachedParseHtml) {
    try {
      // This try/catch is only run once, the first time parseHTML is called.
      // Subsequent calls use the cached cachedParseHtml function
      document.createRange().createContextualFragment('');
      cachedParseHtml = function(html) {
        return document.createRange().createContextualFragment(html);
      };
    } catch (error) {
      cachedParseHtml = function(html) {
        var child, docFrag, template;
        docFrag = document.createDocumentFragment();
        template = document.createElement('div');
        template.innerHTML = html;
        while (child = template.firstChild) {
          docFrag.appendChild(child);
        }
        return docFrag;
      };
    }
  }
  return cachedParseHtml(html);
};

//XXX [2.0.0]: remove - its not used in hexagon and is too specialist to be exposed
var cleanNode = function(node, recurse) {
  if ( recurse === void 0 ) recurse = true;

  var child, n;
  n = node.childNodes.length - 1;
  while (n >= 0) {
    child = node.childNodes[n];
    if (child.nodeType === 3 && /\s/.test(child.nodeValue)) {
      node.removeChild(child);
    } else if (child.nodeType === 1 && recurse) {
      cleanNode(child);
    }
    n -= 1;
  }
  return node;
};

//XXX [2.0.0]: move to another module (for dom-related utils)
cachedScrollbarSize = void 0;

var scrollbarSize = function() {
  var inner, outer, w1, w2;
  if (cachedScrollbarSize == null) {
    inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    outer = document.createElement('div');
    inner = detached('p').style('width', '100%').style('height', '200px');
    outer = detached('div').style('position', 'absolute').style('top', '0').style('left', '0').style('visiblity', 'hidden').style('width', '200px').style('height', '150px').style('overflow', 'hidden');
    outer.append(inner);
    select('body').append(outer);
    w1 = inner.node().offsetWidth;
    outer.style('overflow', 'scroll');
    w2 = inner.node().offsetWidth;
    if (w1 === w2) {
      w2 = outer.node().clientWidth;
    }
    outer.remove();
    cachedScrollbarSize = w1 - w2;
  }
  return cachedScrollbarSize;
};

// XXX: [2.0.0]: If Selection::parents is added, this doesn't need to be a special function
// zIndexes = selection.parents()
//  .map(s => Number(s.style('z-index'))
//  .filter(x => !isNaN(x))
// parentZindex = max(zIndexes)
var parentZIndex = function(node, findMax) {
  var check, res;
  check = function(node) {
    var index;
    index = Number(select(node).style('z-index'));
    if (!isNaN(index) && index > 0) {
      return index;
    }
  };
  res = checkParents(node, check, findMax);
  if (findMax) {
    return exports.max(res);
  } else {
    return res;
  }
};

//XXX [2.0.0]: replace with the simpler Selection::parents
var checkParents = function(node, check, returnArray) {
  var checkNode, result, resultArr;
  if (node != null) {
    checkNode = node;
    resultArr = [];
    while (checkNode.nodeType !== 9) {
      result = check(checkNode);
      if (returnArray) {
        if (result != null) {
          resultArr.push(result);
        }
      } else if (result != null) {
        return result;
      }
      checkNode = checkNode.parentNode;
      if (checkNode == null) {
        break;
      }
      if (returnArray && checkNode.nodeType === 9) {
        return resultArr;
      }
    }
    if (returnArray) {
      return [];
    } else {
      return false;
    }
  }
};

var isElement = function(obj) {
  return !!(obj && obj.nodeType === 1);
};

var setVisibility, titlebar;

setVisibility = function(show, animate) {
  if ( animate === void 0 ) animate = true;

  var animateTitlebar;
  if (!this.isMobileFriendly) {
    return;
  }
  if (show === this.visible) {
    return;
  }
  this.visible = show;
  animateTitlebar = function(elem) {
    if (show) {
      elem.classed('hx-titlebar-mobile-hide', false);
      if (animate) {
        return elem.style('height', '0px').morph().with('expandv', 150).go();
      }
    } else {
      if (animate) {
        return elem.morph().with('collapsev', 50).then(function() {
          return elem.classed('hx-titlebar-mobile-hide', true);
        }).thenStyle('display', '').go();
      } else {
        return elem.classed('hx-titlebar-mobile-hide', true);
      }
    }
  };
  animateTitlebar(select(this.selector).selectAll('.hx-titlebar-menu-icons'));
  return animateTitlebar(select(this.selector).selectAll('.hx-titlebar-linkbar'));
};

var TitleBar = /*@__PURE__*/(function () {
  function TitleBar(selector) {
  var this$1 = this;

    var hasLinkBar, isFixed, isFullScreen, selection;
    this.selector = selector;
    this._ = {};
    selection = select(this.selector).api('titlebar', this).api(this);
    this.isMobileFriendly = selection.select('.hx-titlebar-menu-icon-mobile').size() > 0;
    hasLinkBar = selection.select('.hx-titlebar-linkbar').selectAll('.hx-titlebar-link').size() > 0;
    isFixed = select('body').classed('hx-heading-fixed');
    isFullScreen = select('body').classed('hx-full-screen');
    if (this.isMobileFriendly) {
      selection.select('.hx-titlebar-menu-icon-mobile').on('click', 'hx.titlebar', function () {
        return setVisibility.call(this$1, !this$1.visible, true);
      });
      this.visible = true;
      setVisibility.call(this, false, false);
    }
    if (hasLinkBar && (isFixed || isFullScreen)) {
      select('body').classed('hx-titlebar-link-padding', true);
    }
  }

  TitleBar.prototype.show = function show (animate) {
    return setVisibility.call(this, true, animate);
  };

  TitleBar.prototype.hide = function hide (animate) {
    return setVisibility.call(this, false, animate);
  };

  TitleBar.prototype.contextClass = function contextClass (cls) {
    var d, i, len, ref;
    if (arguments.length > 0) {
      if (cls != null) {
        this._.cls = void 0;
        ref = ['hx-action', 'hx-positive', 'hx-negative', 'hx-warning', 'hx-info'];
        for (i = 0, len = ref.length; i < len; i++) {
          d = ref[i];
          if (cls === d) {
            this._.cls = d; // Inside loop to confirm that the class being set is real.
          }
          select(this.selector).select('.hx-titlebar').classed(d, cls === d);
        }
      }
      return this;
    } else {
      return this._.cls;
    }
  };

  TitleBar.prototype.active = function active (id) {
    var node, selection;
    if (arguments.length > 0) {
      selection = selectAll('.hx-titlebar-link').classed('hx-selected', false);
      if (id != null) {
        this._.active = exports.isString(id) || isElement(id) || isSelection(id) ? select(id).classed('hx-selected', true) : (node = selection.node(id), node != null ? select(node).classed('hx-selected', true) : void 0);
        return this;
      }
    } else {
      return this._.active;
    }
  };

  return TitleBar;
}());

var initTitleBar = function() {
  var titlebar;
  // set up the titlebar
  if (select('.hx-heading').size() > 0) {
    titlebar = new TitleBar('.hx-heading');
    // backwards compatibility
    if (window.hx) {
      window.hx.titlebar = titlebar;
    }
    return titlebar;
  }
};

var titleBar = function(options) {
  var assign;

  if ( options === void 0 ) options = {};
  var icon, iconClass, iconLink, selection, showIcon, subtitle, title;
  ((assign = options, title = assign.title, title = title === void 0 ? 'Title' : title, subtitle = assign.subtitle, subtitle = subtitle === void 0 ? '' : subtitle, showIcon = assign.showIcon, showIcon = showIcon === void 0 ? true : showIcon, iconLink = assign.iconLink, iconLink = iconLink === void 0 ? '#' : iconLink, iconClass = assign.iconClass, iconClass = iconClass === void 0 ? 'hx-logo' : iconClass));
  icon = showIcon ? detached('a').class('hx-titlebar-icon').attr('href', iconLink).add(detached('img').class(iconClass)) : void 0;
  selection = div('hx-heading').add(div('hx-titlebar').add(div('hx-titlebar-container').add(div('hx-titlebar-header').add(icon).add(title ? div('hx-titlebar-title').text(title) : void 0).add(subtitle ? div('hx-titlebar-subtitle').text(subtitle) : void 0))));
  new TitleBar(selection);
  return selection;
};

// set up the titlebar
if (select('.hx-heading').size() > 0) {
  titlebar = new TitleBar('.hx-heading');
}

var version = "2.7.1";

var currentTheme$1 = {};
var themeSet = false;


function theme(t) {
  if (arguments.length > 0) {
    themeSet = true;
    currentTheme$1 = t;
  }
  if (!themeSet) {
    logger.warn('No JS theme has been set, use hx.theme(obj) to initialise theme variables');
  }
  return currentTheme$1;
}

function getThemeVariable(varName) {
  return getComputedStyle(document.body).getPropertyValue(varName);
}

var collatorFn, defaultCollator, hasCollator, localeCollatorFn, nullsLastCollator, state;

// Intl.Collator isn't supported by safari
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
// using a collator is supposed to be faster than doing localeCompare
hasCollator = function() {
  return (typeof Intl !== "undefined" && Intl !== null ? Intl.Collator : void 0) != null;
};

state = {};

collatorFn = function() {
  if (hasCollator()) {
    return new Intl.Collator(void 0, {
      numeric: true
    }).compare;
  } else {
    return function(a, b) {
      if (a === b) {
        return 0;
      } else if (String(a) < String(b)) {
        return -1;
      } else {
        return 1;
      }
    };
  }
};

nullsLastCollator = function(collator) {
  return function(a, b) {
    if (a === b) {
      return 0;
    } else if (a === void 0) {
      return 1;
    } else if (b === void 0) {
      return -1;
    } else if (a === null) {
      return 1;
    } else if (b === null) {
      return -1;
    } else if (!isNaN(Number(a)) && !isNaN(Number(b))) {
      return a - b;
    } else {
      return collator(a, b);
    }
  };
};

defaultCollator = function(collator) {
  return function(a, b) {
    if ((a != null) && (b != null) && !isNaN(Number(a)) && !isNaN(Number(b))) {
      return a - b;
    } else {
      return collator(a, b);
    }
  };
};

exports.compare = function(a, b) {
  if (state.collator == null) {
    state.collator = collatorFn();
  }
  return defaultCollator(state.collator)(a, b);
};

exports.compareNullsLast = function(a, b) {
  if (state.collator == null) {
    state.collator = collatorFn();
  }
  return nullsLastCollator(state.collator)(a, b);
};

localeCollatorFn = function(locale, options) {
  if (hasCollator()) {
    return new Intl.Collator(locale, options).compare;
  } else {
    return function(a, b) {
      return String(a).localeCompare(String(b), locale, options);
    };
  }
};

// slower than compare but enforces locale comparison for browsers that
// dont support Intl.Collator.
exports.localeCompare = function(locale, options) {
  var localeCollator;
  options = exports.mergeDefined({
    numeric: true
  }, options);
  localeCollator = localeCollatorFn(locale, options);
  if (options.nullsLast) {
    return nullsLastCollator(localeCollator);
  } else {
    return defaultCollator(localeCollator);
  }
};

exports.sortBy = function(arr, f) {
  var newArr;
  newArr = [].concat( arr );
  newArr.sort(function(left, right) {
    var fLeft, fRight;
    fLeft = f(left);
    fRight = f(right);
    return exports.compare(fLeft, fRight);
  });
  return newArr;
};

exports.sort = function(arr) {
  return exports.sortBy(arr, function(x) {
    return x;
  });
};

// XXX Deprecated: Sort
exports.sort.compare = exports.compare;

exports.sort.compareNullsLast = exports.compareNullsLast;

exports.sort.localeCompare = exports.localeCompare;

exports.ClickDetector = /*@__PURE__*/(function (EventEmitter) {
  function ClickDetector() {
    var this$1 = this;

    var container;
    EventEmitter.call(this);
    this.eventId = exports.randomId();
    this.exceptions = new List();
    // the original element clicked
    container = void 0;
    this.downAction = function (e) {
      var call, element, i, len, ref;
      e = e.event;
      container = e.target;
      call = true;
      ref = this$1.exceptions.entries();
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        if (element.contains(e.target)) {
          call = false;
        }
      }
      if (call) {
        return this$1.emit('click');
      }
    };
    this.upAction = function (e) {
      var call, element, i, isInDom, len, ref, releasedOutside;
      e = e.event;
      call = true;
      isInDom = document.documentElement.contains(e.target);
      releasedOutside = container && !container.contains(e.target);
      if (releasedOutside || !isInDom) {
        call = false;
      }
      container = void 0;
      ref = this$1.exceptions.entries();
      for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        if (element.contains(e.target)) {
          call = false;
        }
      }
      if (call) {
        return this$1.emit('click');
      }
    };
    select(document).on('pointerdown', 'hx.click-detector.' + this.eventId, this.downAction);
    select(document).on('pointerup', 'hx.click-detector.' + this.eventId, this.upAction);
  }

  if ( EventEmitter ) ClickDetector.__proto__ = EventEmitter;
  ClickDetector.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  ClickDetector.prototype.constructor = ClickDetector;

  ClickDetector.prototype.addException = function addException (element) {
    this.exceptions.add(element);
    return this;
  };

  ClickDetector.prototype.removeException = function removeException (element) {
    this.exceptions.remove(element);
    return this;
  };

  ClickDetector.prototype.removeAllExceptions = function removeAllExceptions () {
    this.exceptions.clear();
    return this;
  };

  ClickDetector.prototype.cleanUp = function cleanUp () {
    select(document).off('pointerdown', 'hx.click-detector.' + this.eventId, this.downAction);
    select(document).off('pointerup', 'hx.click-detector.' + this.eventId, this.upAction);
    return this;
  };

  return ClickDetector;
}(EventEmitter));

var buildFilter, filterCaseModifier, filterMatch;

filterCaseModifier = function(caseSensitive) {
  if (caseSensitive) {
    return function(string) {
      return string;
    };
  } else {
    return function(string) {
      return string.toLowerCase();
    };
  }
};

filterMatch = function(item, getIndex, options) {
  var e, isMatch, j, len, ref, val;
  val = 0;
  isMatch = false;
  // If we've defined 'searchValues', use it to build a combined index
  if (options.searchValues != null) {
    ref = options.searchValues(item);
    for (j = 0, len = ref.length; j < len; j++) {
      e = ref[j];
      val += options.lookup(options.caseModifier(e.toString()));
      // This is set in case there are mulitple non-matching items in e that
      // cause val to be negative
      if (val > -1) {
        isMatch = true;
      }
    }
  } else {
    val += options.lookup(options.caseModifier(item.toString()));
  }
  // getIndex passed in as false when filtering we only care about whether there
  // is a match.
  // It's passed in as true when sorting to let us sort on the strength of the
  // match.
  if (getIndex === true) {
    return val;
  } else if (isMatch || val > -1) {
    return true;
  } else {
    return false;
  }
};

buildFilter = function(lookupType) {
  return function(array, term, opts) {
    if ( opts === void 0 ) opts = {};

    var options;
    options = exports.mergeDefined({
      caseSensitive: false,
      searchValues: void 0,
      sort: true
    }, opts);
    // set the case modifier - we add it to options so we can easily pass to
    // filterMatch. We set this once to reduce the amount of checking we need
    // to do.
    options.caseModifier = filterCaseModifier(options.caseSensitive);
    if (typeof term === 'string') {
      term = options.caseModifier(term);
    }
    options.lookup = lookupType(term);
    array = array.filter(function(d) {
      return filterMatch(d, false, options);
    });
    if (options.sort === true) {
      array = array.sort(function(a, b) {
        var aArr, aI, bArr, bI, i, j, r, ref;
        aI = filterMatch(a, true, options);
        bI = filterMatch(b, true, options);
        if (aI > bI) {
          return 1;
        } else if (aI < bI) {
          return -1;
        // If the strength for both matches is equal, we compare the strings
        // instead.
        } else if (options.searchValues != null) {
          r = 0;
          aArr = options.searchValues(a);
          bArr = options.searchValues(b);
          for (i = j = 0, ref = aArr.length; j < ref; i = j += 1) {
            r = exports.compare(aArr[i], bArr[i]);
            // If the two terms dont match (and there is one better than the
            // other) then we use that value, else we keep moving down the
            // properties until we find something that can be compared.
            if (r !== 0) {
              break;
            }
          }
          return r;
        } else {
          return exports.compare(a, b);
        }
      });
    }
    // return the filtered/sorted array
    return array;
  };
};

// All filter lookup functions should return the index + the length of
// the term within the item, allowing us to sort based on the strength
// of the match.
exports.filterExact = buildFilter(function(term) {
  return function(item) {
    if (item === term) {
      return term.length;
    } else {
      return -1;
    }
  };
});

exports.filterStartsWith = buildFilter(function(term) {
  return function(item) {
    if (exports.startsWith(item, term)) {
      return term.length;
    } else {
      return -1;
    }
  };
});

exports.filterContains = buildFilter(function(term) {
  return function(item) {
    var index;
    index = item.indexOf(term);
    if (index > -1) {
      return index + term.length;
    } else {
      return -1;
    }
  };
});

exports.filterExcludes = buildFilter(function(term) {
  return function(item) {
    var index;
    index = item.indexOf(term);
    if (index === -1) {
      return term.length;
    } else {
      return -1;
    }
  };
});

exports.filterGreater = buildFilter(function(term) {
  return function(item) {
    var val;
    val = exports.compare(item, term);
    if (val !== -1) {
      return val;
    } else {
      return -1;
    }
  };
});

exports.filterLess = buildFilter(function(term) {
  return function(item) {
    var val;
    val = exports.compare(term, item);
    if (val !== -1) {
      return val;
    } else {
      return -1;
    }
  };
});

exports.filterFuzzy = buildFilter(function(term) {
  var escapeRegExp, pattern, regStr;
  escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };
  regStr = '(' + term.split('').map(escapeRegExp).join(').*?(') + ').*?';
  pattern = new RegExp(regStr);
  return function(item) {
    var match;
    match = item.match(pattern);
    if (match != null) {
      return match.index + match[0].length;
    } else {
      return -1;
    }
  };
});

exports.filterRegex = buildFilter(function(term) {
  return function(item) {
    var match;
    match = item.match(term);
    if (match != null) {
      return match.index + match[0].length;
    } else {
      return -1;
    }
  };
});

exports.filterStringTypes = function() {
  return ['contains', 'exact', 'excludes', 'startsWith', 'regex', 'fuzzy'];
};

exports.filterNumberTypes = function() {
  return ['exact', 'greater', 'less'];
};

exports.filterTypes = function() {
  return ['contains', 'exact', 'greater', 'less', 'excludes', 'startsWith', 'regex', 'fuzzy'];
};

// XXX Deprecated: Filters
exports.filter = {
  exact: exports.filterExact,
  startsWith: exports.filterStartsWith,
  contains: exports.filterContains,
  excludes: exports.filterExcludes,
  greater: exports.filterGreater,
  less: exports.filterLess,
  fuzzy: exports.filterFuzzy,
  regex: exports.filterRegex,
  stringTypes: exports.filterStringTypes,
  numberTypes: exports.filterNumberTypes,
  types: exports.filterTypes
};

var filter = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get filterExact () { return exports.filterExact; },
  get filterStartsWith () { return exports.filterStartsWith; },
  get filterContains () { return exports.filterContains; },
  get filterExcludes () { return exports.filterExcludes; },
  get filterGreater () { return exports.filterGreater; },
  get filterLess () { return exports.filterLess; },
  get filterFuzzy () { return exports.filterFuzzy; },
  get filterRegex () { return exports.filterRegex; },
  get filterStringTypes () { return exports.filterStringTypes; },
  get filterNumberTypes () { return exports.filterNumberTypes; },
  get filterTypes () { return exports.filterTypes; },
  get filter () { return exports.filter; }
});

var defaultReplacer, format, getValue, isCorrectlyFormattedArray, isNullOrNumber, isStringWithLength, lookupPlural, paramRegex, setValue, setWholeObject, toMultilineSelection, userFacingTextDefaults;

var state$1 = {
  initialValues: {},
  localisedText: {}
};

setWholeObject = function(object) {
  var key, module;
  // Setter - set multiple module/key values
  if (exports.isPlainObject(object)) {
    for (module in object) {
      for (key in object[module]) {
        setValue(module, key, object[module][key]);
      }
    }
  } else {
    logger.warn(("userFacingText: Expected a plain object but was instead passed: " + object));
  }
  return void 0;
};

isStringWithLength = function(value) {
  return exports.isString(value) && value.length;
};

defaultReplacer = function(str, key, params) {
  return str.replace(new RegExp(("\\$" + key), 'g'), params[key]);
};

format = function(string, params, replacer) {
  if ( replacer === void 0 ) replacer = defaultReplacer;

  var replaceStringValues;
  replaceStringValues = function (str, key) {
    return replacer(str, key, params);
  };
  return Object.keys(params).sort().reverse().reduce(replaceStringValues, string);
};

toMultilineSelection = function(string, textElement, dontAddBreak) {
  if ( textElement === void 0 ) textElement = 'span';

  var elements;
  elements = string.split('\n').reduce((function(prev, curr, i) {
    return prev.concat( [(!dontAddBreak && i > 0 ? detached('br').node() : null)], [detached(textElement).text(curr).node()]);
  }), []);
  return new Selection(elements);
};

lookupPlural = function(valueToGet, n) {
  var assign;

  var a, max, min, string;
  a = valueToGet.filter(function(ref) {
    var min = ref[0];
    var max = ref[1];

    return n >= min && (n <= max || max === null);
  });
  (assign = a[0], min = assign[0], max = assign[1], string = assign[2]);
  return string;
};

// Getter - get the localised text for a module/key
paramRegex = /\$\D/g;

getValue = function(module, key, parseLater, params) {
  var n, ref, val, valueToGet;
  valueToGet = (ref = state$1.localisedText[module]) != null ? ref[key] : void 0;
  if (!valueToGet) {
    logger.warn(("userFacingText: No text was found for key: " + key + " in module: " + module));
    return void 0;
  }
  val = exports.isArray(valueToGet) ? (n = !params || isNaN(params.n) ? 1 : params.n, lookupPlural(valueToGet, n)) : valueToGet;
  if (parseLater !== true && val.match(paramRegex)) {
    if (params) {
      return format(val, params);
    }
    logger.warn(("userFacingText: Parameterised string was returned without parsing parameters: " + val + ".\nCall userFacingText(module, key, parameters) to replace the parameters or userFacingText(module, key, true) if you are handling this externally."));
  }
  return val;
};

isNullOrNumber = function(val) {
  return val === null || !isNaN(val);
};

isCorrectlyFormattedArray = function(valueToSet) {
  return (exports.isArray(valueToSet) && valueToSet.every(function(item) {
    return exports.isArray(item) && item.length === 3;
  }) && valueToSet.every(function(ref) {
    var min = ref[0];
    var max = ref[1];
    var value = ref[2];

    return isNullOrNumber(min) && isNullOrNumber(max) && isStringWithLength(value);
  })) || false;
};

// Setter - set the localised text for a module/key
setValue = function(module, key, valueToSet) {
  var base, base1, base2;
  if (!isCorrectlyFormattedArray(valueToSet) && !isStringWithLength(valueToSet)) {
    logger.warn(("userFacingText: The value provided must be a string but was passed value: " + valueToSet));
    return void 0;
  }
  if ((base = state$1.localisedText)[module] == null) {
    base[module] = {};
  }
  state$1.localisedText[module][key] = valueToSet;
  if ((base1 = state$1.initialValues)[module] == null) {
    base1[module] = {};
  }
  // Set the initial value, don't update it
  if ((base2 = state$1.initialValues[module])[key] == null) {
    base2[key] = valueToSet;
  }
  return void 0;
};

// Interface
// interface UserFacingTextData {
//   [module: string]: {
//     [key: string]: value
//   }
// }

// API

// userFacingText() => UserFacingTextData

// userFacingText(textObject: UserFacingTextData)

// userFacingText(module: string, key: string) => string
// userFacingText(module: string, key: string, parseLater: boolean) => string // Throws a warning when parseLater = false and there is a parameter in string
// userFacingText(module: string, key: string, parameters: { [key: string]: string }) => string

// userFacingText(module: string, key: string, value: string)
exports.userFacingText = function() {
  var key, module, paramsToParse, parseLater, valueToSet;
  if (!arguments.length) {
    // Get the current localised text
    return exports.clone(state$1.localisedText);
  }
  if (arguments.length === 1) {
    // Set the entire localised text
    return setWholeObject(arguments[0]);
  }
  module = arguments[0];
  key = arguments[1];
  if (!isStringWithLength(module) || !isStringWithLength(key)) {
    logger.warn(("userFacingText: A module and key are expected as strings but was passed module: " + module + " and key: " + key));
    return void 0;
  }
  if (arguments.length === 2) {
    // Get the value for a key
    return getValue(module, key, false);
  }
  if (arguments[2] === true) {
    // Get the parameterised value for a key but inject the value later
    parseLater = arguments[2];
    return getValue(module, key, parseLater);
  }
  if (exports.isPlainObject(arguments[2])) {
    // Get the parameterised value for a key with the values to inject
    paramsToParse = arguments[2];
    return getValue(module, key, false, paramsToParse);
  }
  // Set the value for a key
  valueToSet = arguments[2];
  return setValue(module, key, valueToSet);
};

userFacingTextDefaults = function() {
  return exports.clone(state$1.initialValues);
};

// XXX Deprecated: Remove in next major
exports.userFacingText.format = format;

exports.userFacingText.defaults = userFacingTextDefaults;

exports.userFacingText.toMultilineSelection = toMultilineSelection;

var deprecatedWarning, formatExp, formatFixed, formatRound, formatSI, formatZeroPad, precision, roundPrecision, siSuffixes, strictCheck;

siSuffixes = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', '', '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

formatZeroPad = function(number, options) {
  var _, str, zeros;
  if (options.length == null) {
    options.length = 2;
  }
  str = number.toString();
  if (str.length < options.length) {
    zeros = options.length - str.length;
    return ((function() {
      var i, ref, results;
      results = [];
      for (_ = i = 0, ref = zeros - 1; (0 <= ref ? i <= ref : i >= ref); _ = 0 <= ref ? ++i : --i) {
        results.push('0');
      }
      return results;
    })()).join('') + str;
  } else {
    return str;
  }
};

precision = function(number) {
  if (number) {
    return Math.floor(Math.log(Math.abs(number)) / Math.LN10);
  } else {
    return 0;
  }
};

roundPrecision = function(number, base, factor) {
  // have to deal with the +ve and -ve cases separately so that numerical errors are less likely
  if (factor >= 0) {
    return Math.round(number / Math.pow(base, factor)) * Math.pow(base, factor);
  } else {
    return Math.round(number * Math.pow(base, -factor)) / Math.pow(base, -factor);
  }
};

// takes a number, and the number of significant numbers
formatRound = function(number, options) {
  var factor;
  if (options.sf == null) {
    options.sf = 2;
  }
  factor = precision(number) - options.sf + 1;
  return roundPrecision(number, 10, factor).toString();
};

formatSI = function(number, options) {
  var p, siFactor, suffix, x;
  p = Math.min(precision(number), 26); // up to yotta is supported (hence the 26)
  suffix = siSuffixes[Math.min(Math.max(0, Math.floor(8 + p / 3)), 16)];
  // calculate the scaling factor to divide by, so that the number makes sense with its si suffix
  x = Math.abs(number) < 1 && p % 3 && !((-3 < p && p < 0)) ? 1000 : 1;
  if (p === -3) {
    x = 1000;
    suffix = siSuffixes[6];
  }
  siFactor = Math.pow(10, p - p % 3) / x;
  return formatRound(number / siFactor, options) + suffix;
};

formatExp = function(number, options) {
  var mod, p;
  p = precision(number);
  mod = p >= 0 ? '+' : '';
  return formatRound(number / Math.pow(10, p), options) + 'e' + mod + p;
};

formatFixed = function(number, options) {
  if (options.digits == null) {
    options.digits = 2;
  }
  return number.toFixed(options.digits);
};

strictCheck = function(number, formatFn, options) {
  if ( options === void 0 ) options = {};

  if (options.strict) {
    if (isNaN(number)) {
      return 'NaN';
    } else {
      return formatFn(number, options);
    }
  } else {
    if (exports.isString(number)) {
      return number;
    } else {
      return formatFn(number, options);
    }
  }
};

exports.round = function(number, options) {
  return strictCheck(number, formatRound, options);
};

exports.si = function(number, options) {
  return strictCheck(number, formatSI, options);
};

exports.exp = function(number, options) {
  return strictCheck(number, formatExp, options);
};

exports.fixed = function(number, options) {
  return strictCheck(number, formatFixed, options);
};

exports.zeroPad = function(number, options) {
  return strictCheck(number, formatZeroPad, options);
};

// XXX: Remove in next major in favour of hx.round etc.
deprecatedWarning = function(which) {
  return logger.deprecated(("hx.format." + which + ": The formatter factory pattern is deprecated and will be removed in the next major release, please use hx." + which + "(number, options)"));
};

exports.format = {
  round: function(sf, strict) {
    deprecatedWarning('round');
    return function(number) {
      return exports.round(number, {strict: strict, sf: sf});
    };
  },
  si: function(sf, strict) {
    deprecatedWarning('si');
    return function(number) {
      return exports.si(number, {strict: strict, sf: sf});
    };
  },
  exp: function(sf, strict) {
    deprecatedWarning('exp');
    return function(number) {
      return exports.exp(number, {strict: strict, sf: sf}).replace('+', '');
    };
  },
  fixed: function(digits, strict) {
    deprecatedWarning('fixed');
    return function(number) {
      return exports.fixed(number, {digits: digits, strict: strict});
    };
  },
  zeroPad: function(length, strict) {
    deprecatedWarning('zeroPad');
    return function(number) {
      return exports.zeroPad(number, {length: length, strict: strict});
    };
  }
};

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var errors = {
  missingTitle: 'Modal: options.title - A title is required when creating a Modal',
  missingBody: 'Modal: options.renderBody/renderFooter - A body or footer renderer is required when creating a Modal',
  noCloseButton: 'Modal: options.onClose was passed in but no close button is visible for this type of modal',
};

var config = {
  attachToSelector: 'body',
  backdropAnimationDuration: 200,
};

var Modal = /*@__PURE__*/(function (EventEmitter) {
  function Modal(modalSettings, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

    EventEmitter.call(this);

    this.options = exports.mergeDefined({
      title: '',
      isOpen: true,
      animate: true,
      onClose: undefined,
      renderBody: undefined,
      renderFooter: undefined,
    }, options);

    var ref = this.options;
    var isOpen = ref.isOpen;
    var onClose = ref.onClose;
    var titleOption = ref.title;
    var renderBody = ref.renderBody;
    var renderFooter = ref.renderFooter;

    var showClose = modalSettings.showClose; if ( showClose === void 0 ) showClose = false;
    var type = modalSettings.type; if ( type === void 0 ) type = 'center';
    var extraClass = modalSettings.extraClass;
    var modalAnimateFn = modalSettings.modalAnimateFn;

    if (onClose && !showClose) {
      throw new Error(errors.noCloseButton);
    }

    if (!titleOption) {
      throw new Error(errors.missingTitle);
    }

    if (!(renderBody || renderFooter)) {
      throw new Error(errors.missingBody);
    }

    var parent = select(config.attachToSelector);

    var modal = div('hx-modal hx-flag-modal hx-flag-button')
      .classed(("hx-modal-" + type), true)
      .classed(("hx-modal-" + extraClass), extraClass);

    var backdrop = div('hx-modal-backdrop');
    var container = div('hx-modal-container');
    var content = div('hx-modal-content');
    var header = div('hx-modal-header');
    var bodyContainer = div('hx-modal-body-container');
    var body = div('hx-modal-body');
    var footer = div('hx-modal-footer');
    var title = detached('h1').class('hx-modal-title');

    var closeBtn = showClose
      ? div('hx-modal-close')
        .add(detached('i').class('hx-icon hx-icon-close'))
        .on('click', 'hx-modal', function () { return this$1.close(); })
      : undefined;

    this._ = {
      parent: parent,
      modal: modal,
      content: content,
      backdrop: backdrop,
      body: body,
      footer: footer,
      title: title,
      eventId: ("hx-modal-" + (exports.randomId())),
      showClose: showClose,
      modalAnimateFn: modalAnimateFn,
    };

    modal
      .add(backdrop)
      .add(container
        .add(content
          .add(header
            .add(title)
            .add(closeBtn))
          .add(bodyContainer
            .add(body)
            .add(footer))));

    if (isOpen) {
      this.isOpen(true);
    }
  }

  if ( EventEmitter ) Modal.__proto__ = EventEmitter;
  Modal.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Modal.prototype.constructor = Modal;

  Modal.prototype.render = function render () {
    var ref = this._;
    var body = ref.body;
    var footer = ref.footer;
    var title = ref.title;

    var ref$1 = this.options;
    var titleText = ref$1.title;
    var renderBody = ref$1.renderBody;
    var renderFooter = ref$1.renderFooter;

    title.text(titleText);
    body.set(renderBody ? renderBody(this) : []);
    footer.set(renderFooter ? renderFooter(this) : []);
  };

  Modal.prototype.isOpen = function isOpen (isOpen$1, cb) {
    var this$1 = this;

    if (isOpen$1 === this._.isOpen) {
      return this;
    }
    if (!arguments.length) {
      return this._.isOpen;
    }

    this._.isOpen = isOpen$1;
    var callback = cb || (function () { return undefined; });

    var ref = this._;
    var modal = ref.modal;
    var content = ref.content;
    var backdrop = ref.backdrop;
    var parent = ref.parent;
    var eventId = ref.eventId;
    var modalAnimateFn = ref.modalAnimateFn;
    var showClose = ref.showClose;

    var ref$1 = this.options;
    var animate = ref$1.animate;

    parent.classed('hx-modal-open', isOpen$1);

    if (isOpen$1) {
      // Clears the focus so pressing 'enter' does not cause buttons to call modal.show()
      try {
        document.activeElement.blur();
      } catch (e) {
        // In some browsers document.activeElement is null instead of <body>
      }

      if (showClose) {
        parent.on('keydown', eventId, function (e) {
          var isEscape = (e.key && (e.key === 'Esc' || e.key === 'Escape')) || e.which === 27;
          if (isEscape) {
            this$1.close();
          }
        });
      }

      this.emit('showstart');
      this.emit('show');
      this.render();

      parent.add(modal);

      backdrop
        .style('opacity', 0)
        .morph()
        .with('fadein', config.backdropAnimationDuration)
        .go();

      var doneFn = function () {
        this$1.emit('showend');
        callback();
      };

      if (animate) {
        modalAnimateFn(content, doneFn, true);
      } else {
        doneFn();
      }
    } else {
      parent.off('keydown', eventId);
      this.emit('hidestart');
      this.emit('hide');

      backdrop
        .style('opacity', 1)
        .morph()
        .with('fadeout', config.backdropAnimationDuration)
        .go();

      var doneFn$1 = function () {
        this$1.emit('hideend');
        modal.remove();
        callback();
      };

      if (animate) {
        modalAnimateFn(content, doneFn$1, false);
      } else {
        doneFn$1();
      }
    }

    return this;
  };

  Modal.prototype.show = function show (cb) {
    return this.isOpen(true, cb);
  };

  Modal.prototype.hide = function hide (cb) {
    return this.isOpen(false, cb);
  };

  Modal.prototype.close = function close (cb) {
    var ref = this.options;
    var onClose = ref.onClose;
    return onClose ? onClose(this, cb) : this.hide(cb);
  };

  return Modal;
}(EventEmitter));

function getModalAnimationFn(direction, duration, distance) {
  return function (modal, callback, animateIn) {
    if (animateIn) {
      modal
        .style('opacity', 0)
        .style(direction, ("-" + distance + "px"))
        .morph()
        .and('fadein', duration)
        .andStyle(direction, '0px', duration)
        .then(function () {
          modal
            .style('opacity', undefined)
            .style(direction, undefined);

          callback();
        })
        .go();
    } else {
      modal
        .style('opacity', 1)
        .style(direction, '0px')
        .morph()
        .andStyle(direction, ("-" + distance + "px"), duration)
        .and('fadeout', duration)
        .then(function () {
          modal
            .style('opacity', undefined)
            .style(direction, undefined);

          callback();
        })
        .go();
    }
  };
}

function modalCenter(options) {
  return new Modal({
    type: 'center',
    modalAnimateFn: getModalAnimationFn('top', 150, 100),
  }, options);
}

function modalFullScreen(options) {
  return new Modal({
    showClose: true,
    type: 'full-screen',
    modalAnimateFn: getModalAnimationFn('top', 300, 300),
  }, options);
}

function modalRight(options) {
  if ( options === void 0 ) options = {};

  var wide = options.wide;
  var rest = objectWithoutProperties( options, ["wide"] );
  var opts = rest;
  return new Modal({
    showClose: true,
    type: 'right',
    extraClass: wide ? 'right-wide' : undefined,
    modalAnimateFn: getModalAnimationFn('right', 300, 300),
  }, opts);
}

var ModalBase, getHeaderRender, getTitleRender, makeButtons;

ModalBase = (function() {
  var closeModal;

  var ModalBase = /*@__PURE__*/(function (EventEmitter) {
    function ModalBase(title1, setup1, options) {
      EventEmitter.call(this);
      this.title = title1;
      this.setup = setup1;
      this.options = exports.merge({
        closeWithShadeEnabled: true,
        closeButtonEnabled: true,
        titlebarRenderer: function(node) {
          return select(node).text(this.title);
        },
        headerRenderer: function(node, titleNode, closeButtonNode) {
          return select(node).add(titleNode).add(closeButtonNode);
        }
      }, options);
      this.contentContainer = null;
    }

    if ( EventEmitter ) ModalBase.__proto__ = EventEmitter;
    ModalBase.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    ModalBase.prototype.constructor = ModalBase;

    ModalBase.prototype.show = function show (cb) {
      var this$1 = this;

      var body, closeButton, modal, modalContainer, ref, self, shade, title, titleContainer;
      // Clears the focus so pressing 'enter' does not cause buttons to call modal.show()
      if ((ref = document.activeElement) != null) {
        ref.blur();
      }
      body = select('body').classed('hx-modal-open', true);
      shade = body.select('.hx-modal-shade');
      if (shade.empty()) {
        shade = body.append('div').attr('class', 'hx-modal-shade');
        shade.style('opacity', 0).morph().with('fadein', 150).go();
      }
      body.select('.hx-modal-container').remove();
      modalContainer = body.append('div').attr('class', 'hx-modal-container');
      modal = modalContainer.append('div').attr('class', 'hx-modal');
      titleContainer = modal.append('div').class('hx-modal-title-container hx-header');
      title = detached('div').class('hx-modal-title');
      if (this.options.closeButtonEnabled) {
        closeButton = detached('div').add(detached('i').class('hx-icon hx-icon-close')).class('hx-modal-close hx-fixed').on('click', 'hx.modal', function () {
          return closeModal(this$1, {
            cause: 'button'
          });
        });
      } else {
        if ((this.title == null) || this.title.length === 0) {
          titleContainer.classed('hx-modal-title-empty', true);
        }
      }
      if (this.options.closeWithShadeEnabled) {
        modalContainer.on('click', 'hx.modal', function (e) {
          if (!modal.contains(e.target) && select('body').contains(e.target)) {
            return closeModal(this$1, {
              cause: 'shade'
            });
          }
        });
      }
      this.options.titlebarRenderer.call(this, title.node(), this);
      this.options.headerRenderer.call(this, titleContainer.node(), title.node(), closeButton != null ? closeButton.node() : void 0, this);
      this.contentContainer = modal.append('div').attr('class', 'hx-modal-content');
      if (this.setup) {
        this.setup(this.contentContainer.node(), this);
      }
      this.emit('show', this.contentContainer.node());
      this.emit('showstart');
      self = this;
      modal.style('opacity', 0).style('top', '-30px').morph().with('fadein', 150).and(function() {
        return modal.animate().style('top', '0px', 100);
      }).then(function() {
        self.emit('showend');
        return typeof cb === "function" ? cb() : void 0;
      }).go();
      return this;
    };

    ModalBase.prototype.hide = function hide () {
      closeModal(this, {
        cause: 'api'
      });
      return this;
    };

    return ModalBase;
  }(EventEmitter));
  closeModal = function(modal, event) {
    var body;
    body = select('body').classed('hx-modal-open', false);
    body.select('.hx-modal-container').remove();
    body.select('.hx-modal-shade').remove();
    modal.emit('hidestart');
    modal.emit('hide', event);
    return modal.emit('hideend');
  };

  return ModalBase;

}).call(undefined);

makeButtons = function(container, buttons, modal, callback) {
  buttons.forEach(function(d) {
    return container.append('button').attr('type', 'button').class(d.classes).add(detached('i').class(d.icon)).add(detached('span').text(' ' + d.text)).on('click', 'hx.modal', function() {
      if (typeof callback === "function") {
        callback(d.value);
      }
      return modal.hide();
    });
  });
};

getTitleRender = function(icon) {
  return function(elem, modal) {
    elem = select(elem);
    if (icon != null) {
      elem.append('i').class(icon);
    }
    return elem.append('span').text(this.title);
  };
};

getHeaderRender = function(titleClass) {
  return function(elem, title, button, modal) {
    return select(elem).classed('hx-background-' + titleClass, true).add(title).add(button);
  };
};

exports.modalDialog = function(title, message, callback, options) {
  var modal, setup;
  options = exports.mergeDefined({
    callback: void 0,
    buttons: [
      {
        text: 'Cancel',
        icon: 'hx-icon hx-icon-close',
        value: false,
        classes: 'hx-btn hx-negative'
      },
      {
        text: 'Confirm',
        icon: 'hx-icon hx-icon-check',
        value: true,
        classes: 'hx-btn hx-positive'
      }
    ],
    titleClass: void 0,
    icon: void 0
  }, options);
  setup = function(element) {
    var buttonContainer, container;
    container = select(element);
    message = container.append('div').class('hx-modal-message').text(message);
    buttonContainer = container.append('div').class('hx-modal-buttons');
    return makeButtons(buttonContainer, options.buttons, this, callback);
  };
  modal = new exports.Modal(title, setup, {
    closeWithShadeEnabled: options.closeWithShadeEnabled,
    closeButtonEnabled: options.closeButtonEnabled
  });
  if (options.titleClass != null) {
    modal.options.headerRenderer = getHeaderRender(options.titleClass);
    modal.options.titlebarRenderer = getTitleRender(options.icon);
  }
  modal.on('hide', 'hx.modal', function(d) {
    if (d.cause !== 'api') {
      return callback();
    }
  });
  return modal.show();
};

exports.modalInput = function(title, message, callback, options) {
  var modal, setup;
  options = exports.mergeDefined({
    value: ''
  }, options);
  setup = function(element) {
    var buttonContainer, buttons, container, input;
    buttons = [
      {
        text: 'Cancel',
        icon: 'hx-icon hx-icon-close',
        value: false,
        classes: 'hx-btn hx-negative'
      },
      {
        text: 'Confirm',
        icon: 'hx-icon hx-icon-check',
        value: true,
        classes: 'hx-btn hx-positive'
      }
    ];
    container = select(element);
    message = container.append('span').class('hx-modal-message').text(message);
    input = container.append('input').class('hx-modal-input').text(this.options.value);
    buttonContainer = container.append('div').class('hx-modal-buttons');
    return makeButtons(buttonContainer, buttons, this, function(res) {
      if (res) {
        return callback(input.value());
      } else {
        return callback(res);
      }
    });
  };
  modal = new exports.Modal(title, setup, {
    closeWithShadeEnabled: options.closeWithShadeEnabled,
    closeButtonEnabled: options.closeButtonEnabled
  });
  modal.on('close', 'hx.modal', function(d) {
    if (d.cause !== 'api') {
      return callback();
    }
  });
  return modal.show();
};

exports.Modal = /*@__PURE__*/(function (ModalBase) {
  function Modal(title, setup, options) {
    logger.deprecated('Modal', 'The Modal (and associated fluid methods modalDialog, modalInput etc.) has been replaced by the modalCenter, modalRight and modalFullScreen functions.');
    ModalBase.call(this, title, setup, options);
  }

  if ( ModalBase ) Modal.__proto__ = ModalBase;
  Modal.prototype = Object.create( ModalBase && ModalBase.prototype );
  Modal.prototype.constructor = Modal;

  return Modal;
}(ModalBase));

// XXX: Remove in next major
exports.modal = {
  input: exports.modalInput,
  dialog: exports.modalDialog
};

var Notification, inbuiltNotificationManager, nextId, notifyInfoPlain, notifyLoadingPlain, notifyNegativePlain, notifyPlain, notifyPositivePlain, notifyWarningPlain, redraw, removeNotification, setupNotification, startTimeout, togglePin, updatePinnedStatus, wrapDeprecated$1;

// utility method for setting up notifications
setupNotification = function(notification, selection) {
  var close, content, icon, msg, msgIsArrayOfNodes, msgIsNode, msgIsObject, msgIsString, pin;
  icon = (notification.options.icon != null) && notification.options.icon.length > 0 ? div('hx-notification-icon-container').add(detached('i').class('hx-notification-icon ' + notification.options.icon)) : void 0;
  content = div('hx-notification-content');
  msg = notification.message;
  // We check `isNumber` here as in some cases it might be sensible to pass a number as the message (e.g. hx.notify.error(404))
  msgIsString = exports.isString(msg) || exports.isNumber(msg);
  msgIsNode = !msgIsString && ((msg instanceof Selection) || (msg instanceof HTMLElement));
  msgIsArrayOfNodes = msgIsNode || exports.isArray(msg) && msg.every(function(item) {
    return (item instanceof Selection) || (item instanceof HTMLElement);
  });
  msgIsObject = !msgIsString && !msgIsNode && !msgIsArrayOfNodes && exports.isObject(msg);
  if (msgIsString) {
    content.text(msg);
  } else if (msgIsNode || msgIsArrayOfNodes) {
    content.add(msg);
  } else if (msgIsObject && notification.options.renderer) {
    notification.options.renderer(content.node(), msg);
  } else {
    if (msgIsObject) {
      logger.warn('Notification created using an object with invalid arguments\n', 'An object was passed to the notification without a renderer being defined\n', "message:", msg, "\nrenderer:", notification.options.renderer);
    } else {
      logger.warn('Notification created using an object with invalid arguments\n', 'The notification expected a String, Selection, HTMLElement or an Object with matching renderer but was passed:\n', "message:", msg);
    }
    content.text('ERROR CONSTRUCTING NOTIFICATION');
  }
  if (notification.options.pinnable) {
    pin = div('hx-notification-icon-container hx-notification-pin').on('click', 'hx.notify', function() {
      return togglePin(notification);
    }).add(i('hx-icon hx-icon-thumb-tack'));
    notification.domPin = pin;
    updatePinnedStatus(notification);
  }
  close = div('hx-notification-icon-container hx-notification-close').on('click', 'hx.notify', function() {
    return notification.close();
  }).add(detached('i').class('hx-icon hx-icon-close'));
  return selection.add(icon).add(content).add(pin).add(close);
};

nextId = function(manager) {
  return manager.currentId++;
};

redraw = function(manager) {
  var container, selection, view;
  selection = select(manager.selector);
  container = selection.select('#' + manager.uniqueId);
  if (container.empty()) {
    container = selection.append('div').class('hx-notification-container').attr('id', manager.uniqueId);
  }
  view = container.view('.hx-notification');
  view.enter(function(d) {
    var optionalClass;
    selection = this.append('div');
    optionalClass = d.options.cssclass ? (" " + (d.options.cssclass)) : '';
    selection.class(("hx-notification" + optionalClass)).forEach(function(node) {
      setupNotification(d, selection);
      return d.trueHeight = selection.style('height');
    }).style('opacity', 0).style('height', 0).style('padding-top', 0).style('padding-bottom', 0).style('margin-top', 0).style('margin-bottom', 0).morph().with('expandv').and('fadein').then(function() {
      return selection.style('height', '');
    }).go();
    return selection.node();
  });
  view.exit(function() {
    var this$1 = this;

    return this.style('overflow', 'hidden').morph().with('fadeout', 100).then('collapsev', 100).then(function () {
      return this$1.remove();
    }).go();
  });
  return view.apply(manager.notifications, function(d) {
    return d.id;
  });
};

removeNotification = function(manager, notification) {
  var index;
  index = manager.notifications.indexOf(notification);
  if (index >= 0) {
    manager.notifications.splice(index, 1);
  }
  return redraw(manager);
};

startTimeout = function(notification, seconds) {
  return notification.timeoutId = window.setTimeout((function () {
    return notification.close();
  }), seconds * 1000);
};

togglePin = function(notification) {
  if (notification.pinned) {
    return notification.unpin();
  } else {
    return notification.pin();
  }
};

updatePinnedStatus = function(notification) {
  return notification.domPin.classed('hx-notification-pin-pinned', notification.pinned);
};

Notification = /*@__PURE__*/(function () {
  function Notification(manager1, message1, options) {
    this.manager = manager1;
    this.message = message1;
    this.options = exports.merge({
      icon: void 0,
      cssclass: void 0,
      timeout: this.manager._.defaultTimeout,
      pinnable: true,
      renderer: void 0
    }, options);
    this.id = nextId(this.manager);
    if (this.options.timeout) {
      startTimeout(this, this.options.timeout);
      this.pinned = false;
    } else {
      this.pinned = true;
    }
  }

  Notification.prototype.close = function close () {
    removeNotification(this.manager, this);
    return this;
  };

  Notification.prototype.pin = function pin () {
    this.pinned = true;
    // pinned things don't timeout
    window.clearTimeout(this.timeoutId);
    updatePinnedStatus(this);
    return this;
  };

  Notification.prototype.unpin = function unpin () {
    this.pinned = false;
    // an unpinned timeout should then disappear quickly, hence 1 second
    startTimeout(this, 1);
    updatePinnedStatus(this);
    return this;
  };

  return Notification;
}());

var NotificationManager = /*@__PURE__*/(function () {
  function NotificationManager(selector) {
  if ( selector === void 0 ) selector = 'body';

    this.selector = selector;
    this.currentId = 0;
    this.notifications = [];
    this.uniqueId = 'hx-notify-' + exports.randomId();
    this._ = {
      defaultTimeout: 5
    };
  }

  NotificationManager.prototype.notify = function notify (message, options) {
    var notification;
    notification = new Notification(this, message, options);
    this.notifications.push(notification);
    redraw(this);
    return notification;
  };

  NotificationManager.prototype.info = function info (message, options) {
    if ( options === void 0 ) options = {};

    return this.notify(message, exports.merge({
      icon: 'hx-icon hx-icon-info',
      cssclass: 'hx-info'
    }, options));
  };

  NotificationManager.prototype.warning = function warning (message, options) {
    if ( options === void 0 ) options = {};

    return this.notify(message, exports.merge({
      icon: 'hx-icon hx-icon-warning',
      cssclass: 'hx-warning'
    }, options));
  };

  NotificationManager.prototype.negative = function negative (message, options) {
    if ( options === void 0 ) options = {};

    return this.notify(message, exports.merge({
      icon: 'hx-icon hx-icon-error',
      cssclass: 'hx-negative'
    }, options));
  };

  NotificationManager.prototype.positive = function positive (message, options) {
    if ( options === void 0 ) options = {};

    return this.notify(message, exports.merge({
      icon: 'hx-icon hx-icon-check',
      cssclass: 'hx-positive'
    }, options));
  };

  // shows a loading message (a permanent message with the a spinning loading icon)
  NotificationManager.prototype.loading = function loading (message) {
    return this.notify(message, {
      icon: 'hx-spinner',
      cssclass: 'hx-loading',
      timeout: void 0,
      pinnable: false
    });
  };

  NotificationManager.prototype.defaultTimeout = function defaultTimeout (timeout) {
    if (arguments.length > 0) {
      this._.defaultTimeout = timeout || 5;
      return this;
    } else {
      return this._.defaultTimeout;
    }
  };

  return NotificationManager;
}());

// Inbuilt notification manager related functions
inbuiltNotificationManager = new NotificationManager();

wrapDeprecated$1 = function(name, method) {
  return function() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    logger.deprecated(name, 'Replaced by hx.alert/hx.message.');
    return method.apply(void 0, args);
  };
};

notifyInfoPlain = function(message, options) {
  return inbuiltNotificationManager.info(message, options);
};

notifyPositivePlain = function(message, options) {
  return inbuiltNotificationManager.positive(message, options);
};

notifyWarningPlain = function(message, options) {
  return inbuiltNotificationManager.warning(message, options);
};

notifyNegativePlain = function(message, options) {
  return inbuiltNotificationManager.negative(message, options);
};

notifyLoadingPlain = function(message) {
  return inbuiltNotificationManager.loading(message);
};

notifyPlain = function(message, options) {
  return inbuiltNotificationManager.notify(message, options);
};

exports.notifyDefaultTimeout = function(timeout) {
  logger.deprecated('notifyDefaultTimeout', 'NotificationManager is replaced by AlertManager which does not require this method');
  return inbuiltNotificationManager.defaultTimeout.apply(inbuiltNotificationManager, arguments);
};

// XXX Deprecated: Remove in next major
exports.notify = wrapDeprecated$1('notify', notifyPlain);

exports.notifyInfo = wrapDeprecated$1('notifyInfo', notifyInfoPlain);

exports.notifyPositive = wrapDeprecated$1('notifyPositive', notifyPositivePlain);

exports.notifyWarning = wrapDeprecated$1('notifyWarning', notifyWarningPlain);

exports.notifyNegative = wrapDeprecated$1('notifyNegative', notifyNegativePlain);

exports.notifyLoading = wrapDeprecated$1('notifyLoading', notifyLoadingPlain);

exports.notify.info = wrapDeprecated$1('hx.notify.info', notifyInfoPlain);

exports.notify.positive = wrapDeprecated$1('hx.notify.positive', notifyPositivePlain);

exports.notify.warning = wrapDeprecated$1('hx.notify.warning', notifyWarningPlain);

exports.notify.negative = wrapDeprecated$1('hx.notify.negative', notifyNegativePlain);

exports.notify.loading = wrapDeprecated$1('hx.notify.loading', notifyLoadingPlain);

exports.notify.defaultTimeout = exports.notifyDefaultTimeout;

var Collapsible = /*@__PURE__*/(function (EventEmitter) {
  function Collapsible(selector, options) {
    var this$1 = this;

    var content, header, toggleBtn;
    EventEmitter.call(this);
    this.options = exports.mergeDefined({
      lazyContent: void 0,
      visible: false,
      addIcon: true,
      animate: true
    }, options);
    this.lazyContentCreated = false;
    this.selection = select(selector).classed('hx-openable', true).classed('hx-collapsible', true).api(this);
    header = this.selection.select('.hx-collapsible-heading');
    if (!(toggleBtn = header.select('.hx-collapsible-toggle')).empty()) {
      header.classed('hx-collapsible-heading-no-hover', true);
      toggleBtn.on('click', 'hx.collapsible', function () {
        return this$1.toggle();
      });
    } else {
      header.on('click', 'hx.collapsible', function () {
        return this$1.toggle();
      });
    }
    content = this.selection.select('.hx-collapsible-content').style('height', 0).style('opacity', 0);
    if (this.options.addIcon) {
      if (toggleBtn.empty()) {
        header.select('i').remove();
        header.prepend('i').class('hx-icon hx-icon-chevron-right hx-collapsible-icon');
      } else {
        toggleBtn.select('i').remove();
        toggleBtn.prepend('i').class('hx-icon hx-icon-chevron-right hx-collapsible-icon');
      }
    }
    this.visible = void 0;
    if (this.options.visible) {
      this.show(false);
    } else {
      this.hide(false);
    }
  }

  if ( EventEmitter ) Collapsible.__proto__ = EventEmitter;
  Collapsible.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Collapsible.prototype.constructor = Collapsible;

  Collapsible.prototype.toggle = function toggle (animate, cb) {
    animate = animate != null ? animate : this.options.animate;
    if (this.isOpen()) {
      return this.hide(animate, cb);
    } else {
      return this.show(animate, cb);
    }
  };

  Collapsible.prototype.show = function show (animate, cb) {
    var content, self;
    animate = animate != null ? animate : this.options.animate;
    if (!this.lazyContentCreated) {
      this.lazyContentCreated = true;
      if (this.options.lazyContent) {
        this.options.lazyContent(this.selection.select('.hx-collapsible-content').node());
      }
    }
    if (this.visible !== true) {
      // update the styles
      this.selection.classed('hx-collapsible-expanded', true).classed('hx-opened', true);
      content = this.selection.select('.hx-collapsible-content');
      if (animate) {
        self = this;
        content.morph().with('expandv', 100).and('fadein', 100).then(function() {
          self.emit('showend');
          return typeof cb === "function" ? cb() : void 0;
        }).go(true);
        this.selection.select('.hx-collapsible-heading').select('.hx-collapsible-icon').morph().with('rotate-90', 200).go(true);
      } else {
        content.style('display', '').style('height', '').style('opacity', '');
        this.emit('showend');
      }
      // update the state + emit events
      this.visible = true;
      this.emit('showstart');
      this.emit('change', true);
    }
    return this;
  };

  Collapsible.prototype.hide = function hide (animate, cb) {
    var self;
    animate = animate != null ? animate : this.options.animate;
    if (this.visible !== false) {
      // update the styles
      this.selection.classed('hx-collapsible-expanded', false).classed('hx-opened', false);
      if (animate) {
        self = this;
        this.selection.select('.hx-collapsible-content').morph().with('fadeout', 100).and('collapsev', 100).then(function() {
          self.emit('hideend');
          return typeof cb === "function" ? cb() : void 0;
        }).go(true);
        this.selection.select('.hx-collapsible-heading').select('.hx-collapsible-icon').morph().with('rotate-0', 200).go(true);
      } else {
        this.selection.select('.hx-collapsible-content').style('display', 'none');
        this.emit('hideend');
      }
      // update the state + emit events
      this.visible = false;
      this.emit('hidestart');
      this.emit('change', false);
    }
    return this;
  };

  Collapsible.prototype.isOpen = function isOpen () {
    return this.visible;
  };

  return Collapsible;
}(EventEmitter));

// initialise all collapsibles that match the css selector, and return the result as an array of Collapsibles
var initializeCollapsibles = function(selector, options) {
  return selectAll(selector).nodes.map(function(d) {
    return new Collapsible(d, options);
  });
};

var calculateDropdownPosition = function(align, selectionRect, dropdownRect, windowRect, ddMaxHeight, scrollbarWidth) {
  var alignQuad, alignments, direction, x, y;
  alignQuad = (function() {
    switch (align) {
      case 'up':
        return 'ltlb';
      case 'down':
        return 'lblt';
      case 'left':
        return 'ltrt';
      case 'right':
        return 'rtlt';
      default:
        return align;
    }
  })();
  alignments = alignQuad.split('');
  // figure out the direction the drop-down should be revealed (for the animation)
  direction = alignments[1] === alignments[3] && alignments[0] !== alignments[2] ? alignments[0] === 'l' ? 'left' : 'right' : alignments[3] === 't' ? 'down' : 'up';
  // work out where the drop-down would go when there is ample space
  x = selectionRect.x;
  y = selectionRect.y;
  if (alignments[0] === 'r') {
    x += selectionRect.width;
  }
  if (alignments[1] === 'b') {
    y += selectionRect.height;
  }
  if (alignments[2] === 'r') {
    x -= dropdownRect.width;
  }
  if (alignments[3] === 'b') {
    y -= dropdownRect.height;
  }
  // adjust the position of the drop-down when there is not enough space

  // slide into view (in the appropriate direction)
  if (direction === 'down' || direction === 'up') {
    x = exports.clamp(0, windowRect.width - dropdownRect.width, x);
  } else {
    y = exports.clamp(0, windowRect.height - dropdownRect.height, y);
  }
  // flip from downwards to upwards (if needed and there is the space to)
  if (direction === 'down' && y > windowRect.height - dropdownRect.height && selectionRect.y - dropdownRect.height > 0) {
    direction = 'up';
    y = selectionRect.y - dropdownRect.height;
    if (alignments[1] === alignments[3]) {
      y += selectionRect.height;
    }
  // flip from upwards to downwards (if needed and there is the space to)
  } else if (direction === 'up' && y < 0 && selectionRect.y + selectionRect.height + dropdownRect.height < windowRect.height) {
    direction = 'down';
    y = selectionRect.y + selectionRect.height;
    if (alignments[1] === alignments[3]) {
      y -= selectionRect.height;
    }
  // flip from right to left (if needed and there is the space to)
  } else if (direction === 'right' && x > windowRect.width - dropdownRect.width && selectionRect.x - dropdownRect.width > 0) {
    direction = 'left';
    x = selectionRect.x - dropdownRect.width;
  // flip from upwards to downwards (if needed and there is the space to)
  } else if (direction === 'left' && x < 0 && selectionRect.x + selectionRect.width + dropdownRect.width < windowRect.width) {
    direction = 'right';
    x = selectionRect.x + selectionRect.width;
  }
  return {
    x: x,
    y: y,
    direction: direction
  };
};

var checkFixedPos, dropdownContentToSetupDropdown, positionDropdown;

var config$1 = {
  attachToSelector: 'body',
  dropdownAnimateSlideDistance: 8
};

checkFixedPos = function(node) {
  if (select(node).style('position') === 'fixed') {
    return true;
  }
};

positionDropdown = function(ref, ref$1) {
  var assign;

  var selection = ref.selection;
  var dropdown = ref.dropdown;
  var useScroll = ref.useScroll;
  var align = ref$1.align;
  var matchWidth = ref$1.matchWidth;
  var ddMaxHeight, direction, dropdownRect, parentFixed, rect, x, y, zIndex;
  dropdown.style('display', 'block');
  // extract measurements from the dom
  rect = selection.box();
  dropdownRect = dropdown.box();
  ddMaxHeight = dropdown.style('max-height').replace('px', '');
  parentFixed = checkParents(selection.node(), checkFixedPos);
  zIndex = parentZIndex(selection.node(), true);
  // calculate the position of the dropdown
  ((assign = calculateDropdownPosition(dropdown.attr('data-direction') || align, {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  }, {
    width: dropdownRect.width,
    height: dropdownRect.height
  }, {
    width: window.innerWidth,
    height: window.innerHeight
  }, ddMaxHeight, scrollbarSize()), x = assign.x, y = assign.y, direction = assign.direction));
  if (!parentFixed) {
    x += window.scrollX || window.pageXOffset;
    y += window.scrollY || window.pageYOffset;
  }
  // update the styles for the dropdown
  if (zIndex > 0) {
    dropdown.style('z-index', zIndex + 1);
  }
  if (parentFixed) {
    dropdown.style('position', 'fixed');
  }
  if (matchWidth) {
    dropdown.style('min-width', rect.width + 'px');
  }
  if (useScroll && (dropdown != null)) {
    dropdown.style('overflow-y', 'auto');
  }
  return dropdown.classed('hx-dropdown-up', direction === 'up').classed('hx-dropdown-down', direction === 'down').classed('hx-dropdown-left', direction === 'left').classed('hx-dropdown-right', direction === 'right').attr('data-direction', direction).style('top', 'auto').style('bottom', void 0).style('top', y + 'px').style('left', x + 'px');
};

dropdownContentToSetupDropdown = function(dropdownContent) {
  switch (false) {
    // XXX Breaking: Renderer
    // Needs updating to new renderer pattern
    case !isSelection(dropdownContent):
      return function(node) {
        return select(node).set(dropdownContent);
      };
    // XXX Breaking: html -> text
    // when isString(dropdownContent)
    //   (node) -> select(node).text(dropdownContent)
    case !exports.isString(dropdownContent):
      return function(node) {
        return select(node).html(dropdownContent);
      };
    // XXX Breaking: Renderer
    // when isFunction(dropdownContent)
    //   (node) -> select(node).set(dropdownContent())
    case !exports.isFunction(dropdownContent):
      return function(node) {
        return dropdownContent(node);
      };
    default:
      logger.warn('dropdown: dropdownContent is not a valid type. dropdownContent: ', dropdownContent);
      return function() {
        return void 0;
      };
  }
};

var Dropdown = /*@__PURE__*/(function (EventEmitter) {
  function Dropdown(selector, dropdownContent, options) {
    var this$1 = this;

    var clickDetector, onclick, onmouseout, onmouseover, selection, setupDropdown;
    EventEmitter.call(this);
    // XXX [2.0.0]: this should not be part of the public api (but should use setterGetter methods instead)
    // it has been documented so will have to stay here for the 1.x.x series (it should be removed in 2.0.0)
    this.options = exports.mergeDefined({
      mode: 'click',
      align: 'lblt',
      matchWidth: true,
      ddClass: ''
    }, options);
    setupDropdown = dropdownContentToSetupDropdown(dropdownContent);
    clickDetector = new exports.ClickDetector();
    clickDetector.on('click', 'hx.dropdown', function () {
      return this$1.hide();
    });
    onclick = function () {
      return this$1.toggle();
    };
    onmouseover = function () {
      return this$1.show();
    };
    onmouseout = function () {
      return this$1.hide();
    };
    selection = select(selector).api('dropdown', this).api(this);
    this._ = {
      setupDropdown: setupDropdown,
      clickDetector: clickDetector,
      onclick: onclick,
      onmouseover: onmouseover,
      onmouseout: onmouseout,
      visible: false,
      dropdown: void 0,
      selection: selection,
      useScroll: false // XXX: used by autocomplete - this should be part of the public api if it is used by other modules
    };
    if (this.options.mode === 'click' || this.options.mode === 'hover') {
      selection.on('click', 'hx.dropdown', onclick);
    }
    if (this.options.mode === 'hover') {
      selection.on('mouseover', 'hx.dropdown', onmouseover);
      selection.on('mouseout', 'hx.dropdown', onmouseout);
    }
  }

  if ( EventEmitter ) Dropdown.__proto__ = EventEmitter;
  Dropdown.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Dropdown.prototype.constructor = Dropdown;

  Dropdown.prototype.dropdownContent = function dropdownContent (dropdownContent$1) {
    var setupDropdown;
    if (arguments.length) {
      setupDropdown = dropdownContentToSetupDropdown(dropdownContent$1);
      this._ = exports.shallowMerge(this._, {setupDropdown: setupDropdown, dropdownContent: dropdownContent$1});
      this.render();
      return this;
    } else {
      return this._.dropdownContent;
    }
  };

  Dropdown.prototype.addException = function addException (node) {
    this._.clickDetector.addException(node);
    return this;
  };

  Dropdown.prototype.removeException = function removeException (node) {
    this._.clickDetector.removeException(node);
    return this;
  };

  Dropdown.prototype.toggle = function toggle (cb) {
    if (this.isOpen()) {
      this.hide(cb);
    } else {
      this.show(cb);
    }
    return this;
  };

  Dropdown.prototype.render = function render () {
    if (this._.dropdown) {
      this._.setupDropdown(this._.dropdown.node());
    }
    this.emit('render');
    return this;
  };

  Dropdown.prototype.show = function show (cb) {
    var this$1 = this;

    var _, contentChangeObserver, position;
    _ = this._;
    if (_.visible) {
      this.render();
      if (typeof cb === "function") {
        cb();
      }
    } else {
      _.visible = true;
      _.dropdown = select(config$1.attachToSelector).append('div').attr('class', 'hx-dropdown');
      if (this.options.ddClass.length > 0) {
        _.dropdown.classed(this.options.ddClass, true);
      }
      this.render();
      _.clickDetector.removeAllExceptions();
      _.clickDetector.addException(_.dropdown.node());
      _.clickDetector.addException(_.selection.node());
      position = function () {
        return positionDropdown(_, this$1.options);
      };
      position();
      if (MutationObserver) {
        contentChangeObserver = new MutationObserver(function(mutationsList, observer) {
          return position();
        });
        contentChangeObserver.observe(_.dropdown.node(), {
          attributes: false,
          childList: true,
          subtree: true
        });
        _.contentChangeObserver = contentChangeObserver;
      }
      this.emit('showstart');
      this.emit('change', true);
      this.emit('showend');
      if (typeof cb === "function") {
        cb();
      }
    }
    return this;
  };

  Dropdown.prototype.hide = function hide (cb) {
    var _, ref;
    _ = this._;
    if (_.visible) {
      _.visible = false;
      if ((ref = _.contentChangeObserver) != null) {
        ref.disconnect();
      }
      this.emit('hidestart'); // future proofing for addition of animations
      this.emit('change', false);
      this.emit('hideend'); // future proofing for addition of animations
      if (typeof cb === "function") {
        cb();
      }
      _.dropdown.remove();
      _.dropdown = void 0;
    }
    return this;
  };

  Dropdown.prototype.isOpen = function isOpen () {
    return this._.visible;
  };

  // to be called when this dropdown is removed from the page, and is no longer going to be referenced
  // it unlikely that you will need to call this, but if using dropdowns in dynamic content, it might be needed
  Dropdown.prototype.cleanUp = function cleanUp () {
    var _;
    _ = this._;
    _.clickDetector.cleanUp();
    if (this.options.mode === 'click' || this.options.mode === 'hover') {
      _.selection.off(_.onclick);
    }
    if (this.options.mode === 'hover') {
      _.selection.off('mouseover', 'hx.dropdown', _.onmouseover);
      _.selection.off('mouseout', 'hx.dropdown', _.onmouseout);
    }
    return this;
  };

  return Dropdown;
}(EventEmitter));

function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var MenuBase, MenuItem, addItem, checkEvent, dealWithEvent, emitItem, getAllItems, moveSelectionDown, moveSelectionUp, populateNode, setActive, setupInner, toggleCollapsible;

addItem = function(item, context, menu) {
  var it;
  it = new MenuItem(item, context, menu);
  context._.menuItems.push(it);
  return it;
};

setupInner = function(menu, dropdownData, current) {
  var datum, it, j, len, results;
  // Clear menu items for the current item
  current._.menuItems = [];
  results = [];
  for (j = 0, len = dropdownData.length; j < len; j++) {
    datum = dropdownData[j];
    it = addItem(datum, current, menu);
    if (datum.children) {
      results.push(setupInner(menu, datum.children, it));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

populateNode = function(node, items) {
  return select(node).view('.hx-menu-item').update(function(d, element) {
    return d.build(element);
  }).apply(items);
};

// Generate a list of all the items in the order they appear, including children.
getAllItems = function(menu) {
  var allItems, pushItems;
  allItems = [];
  pushItems = function(arr, parentIndex) {
    return arr.forEach(function(d, i) {
      d.parentIndex = parentIndex;
      allItems.push(d);
      if (d._.menuItems) {
        return pushItems(d._.menuItems, i);
      }
    });
  };
  pushItems(menu._.menuItems);
  return allItems;
};

// If setActive is called on click, the dropdown is already hidden so
// offsetParent checking doesn't work.
setActive = function(menu, pos, up, click) {
  var allItems, collapsibleHeading, content, dNode, ddScroll, goUp, isEnabled, isParent, itemHeight, mNode, menuNode, node, offset, parentNode, parentOffset, ref, ref1, ref2, ref3, ref4, selectedItem, totalOffset;
  if ((ref = menu.dropdown._.dropdown) != null) {
    ref.selectAll('.hx-menu-item').classed('hx-menu-active', false);
  }
  if (pos >= 0) {
    allItems = getAllItems(menu);
    node = allItems[pos].node;
    select(node).classed('hx-menu-active', true);
    content = (ref1 = allItems[pos]) != null ? ref1.content : void 0;
    isParent = ((ref2 = menu.options.featureFlags) != null ? ref2.useUpdatedStructure : void 0) && (content != null ? content.children : void 0);
    isEnabled = !(content != null ? content.disabled : void 0) && !(content != null ? content.unselectable : void 0) && !isParent;
    while ((node.offsetParent === null || !isEnabled) && !click) {
      if (up) {
        pos -= 1;
      } else {
        pos += 1;
      }
      content = (ref3 = allItems[pos]) != null ? ref3.content : void 0;
      isEnabled = !(content != null ? content.disabled : void 0) && !(content != null ? content.unselectable : void 0);
      if (allItems[pos] != null) {
        node = allItems[pos].node;
      } else {
        goUp = true;
        break;
      }
    }
    if (goUp && !up) {
      setActive(menu, pos - 1, true);
      return void 0;
    } else {
      menu.cursorPos = pos;
      if (((dNode = (ref4 = menu.dropdown._.dropdown) != null ? ref4.node() : void 0) != null) && !click) {
        menuNode = select(node).classed('hx-menu-active', true);
        mNode = menuNode.node();
        offset = mNode.offsetTop;
        collapsibleHeading = menuNode.select('.hx-menu-collapsible');
        itemHeight = collapsibleHeading.size() > 0 ? collapsibleHeading.node().clientHeight : mNode.clientHeight;
        parentNode = select(mNode.parentNode);
        parentOffset = parentNode.classed('hx-collapsible-content') ? parentNode.node().offsetTop : 0;
        totalOffset = offset + itemHeight + parentOffset;
        ddScroll = totalOffset > dNode.clientHeight ? totalOffset - dNode.clientHeight : 0;
        dNode.scrollTop = ddScroll;
      }
    }
  }
  if ((selectedItem = allItems != null ? allItems[menu.cursorPos] : void 0) != null) {
    emitItem(menu, selectedItem, 'highlight', click ? 'click' : 'arrow');
    // Item selected and active has been set.
    if (click) {
      return emitItem(menu, selectedItem, 'change', 'click');
    }
  }
};

moveSelectionUp = function(menu) {
  var pos;
  pos = menu.cursorPos;
  if (pos > 0) {
    pos -= 1;
  } else if (pos === 0) {
    pos = -1;
  }
  menu.cursorPos = pos;
  return setActive(menu, pos, true);
};

moveSelectionDown = function(menu) {
  var allItems, pos;
  pos = menu.cursorPos;
  allItems = getAllItems(menu);
  if (pos < allItems.length - 1) {
    pos += 1;
  }
  menu.cursorPos = pos;
  return setActive(menu, pos, false);
};

toggleCollapsible = function(collapsible, force, cb) {
  switch (force) {
    case true:
      return collapsible.show(true, cb);
    case false:
      return collapsible.hide(true, cb);
    default:
      return collapsible.toggle(true, cb);
  }
};

dealWithEvent = function(menu, force, eventType) {
  if ( eventType === void 0 ) eventType = 'enter';

  var allItems, pos, ref, selectedItem;
  if (eventType === 'tab') {
    pos = Math.max(menu.cursorPos, 0);
  } else {
    pos = menu.cursorPos;
  }
  allItems = getAllItems(menu);
  selectedItem = allItems[pos];
  if ((force != null) && !force && ((selectedItem != null ? (ref = selectedItem.parent) != null ? ref.collapsible : void 0 : void 0) != null)) {
    return toggleCollapsible(selectedItem.parent.collapsible, force, function() {
      if (!selectedItem._.menuItems) {
        return moveSelectionUp(menu);
      }
    });
  } else if ((selectedItem != null ? selectedItem.collapsible : void 0) != null) {
    return toggleCollapsible(selectedItem.collapsible, force);
  } else if (((force != null) && force) || (force == null)) {
    return emitItem(menu, selectedItem, 'change', eventType);
  }
};

emitItem = function(menu, item, type, eventType) {
  if (menu.has(type)) { // select or activeset
    return menu.emit(type, {
      eventType: eventType, // click, enter, tab or arrows
      content: item != null ? item.content : void 0,
      menu: menu
    });
  }
};

checkEvent = function(e, self) {
  switch (e.which) {
    case 9: // tab
      dealWithEvent(self, void 0, 'tab');
      break;
    case 13: // enter
      e.preventDefault();
      dealWithEvent(self, void 0);
      break;
    case 37: // left
      dealWithEvent(self, false);
      break;
    case 38: // up
      e.preventDefault();
      moveSelectionUp(self);
      break;
    case 39: // right
      dealWithEvent(self, true);
      break;
    case 40: // down
      e.preventDefault();
      moveSelectionDown(self);
  }
  return self.emit('input', e);
};

MenuItem = /*@__PURE__*/(function () {
  function MenuItem(content1, parent, menu1) {
    this.content = content1;
    this.parent = parent;
    this.menu = menu1;
    this._ = {};
  }

  MenuItem.prototype.build = function build (selector) {
    var children, collapsibleNode, container, contentNode, headerNode, ref, ref1;
    this.node = selector;
    container = select(selector);
    if (((ref = this._.menuItems) != null ? ref.length : void 0) > 0) {
      if ((ref1 = this.menu.options.featureFlags) != null ? ref1.useUpdatedStructure : void 0) {
        headerNode = div('hx-menu-item hx-menu-unselectable');
        children = div('hx-menu-item-children');
        container.class('hx-menu-item').set([headerNode, children]);
        // XXX Breaking: Renderer
        // headerNode.set(@menu.options.renderer(@content))
        this.menu.options.renderer(headerNode, this.content);
        populateNode(children, this._.menuItems);
        return;
      }
      container.view('.hx-collapsible').apply(this);
      collapsibleNode = container.select('.hx-collapsible');
      collapsibleNode.view('.hx-collapsible-heading').apply(this);
      collapsibleNode.view('.hx-collapsible-content').update(function() {
        return this.style('display', 'none');
      }).apply(this);
      // XXX Breaking: Renderer
      // collapsibleNode.select('.hx-collapsible-heading')
      //   .classed('hx-menu-collapsible', true)
      //   .set(@menu.renderer()(@content))
      headerNode = collapsibleNode.select('.hx-collapsible-heading').classed('hx-menu-collapsible', true).node();
      this.menu.options.renderer(headerNode, this.content);
      contentNode = container.select('.hx-collapsible-content').node();
      this.collapsible = new Collapsible(collapsibleNode);
      return populateNode(contentNode, this._.menuItems);
    } else {
      container.classed('hx-menu-link', !this.content.unselectable && !this.content.disabled).classed('hx-menu-active', false).classed('hx-menu-item-disabled', this.content.disabled).classed('hx-menu-unselectable', this.content.unselectable);
      // XXX Breaking: Renderer
      // .set(@menu.renderer()(@content))
      return this.menu.options.renderer(container.node(), this.content);
    }
  };

  return MenuItem;
}());

MenuBase = /*@__PURE__*/(function (EventEmitter) {
  function MenuBase(selector1, options) {
    var this$1 = this;
    var assign, rest$1;

    if ( options === void 0 ) options = {};
    var colorClass, dropdownContainer, extraContent, isInput, rawItems, ref, ref1, rest, selection, self, setup, targetElem;
    EventEmitter.call(this);
    this.selector = selector1;
    // Suppress warning when trying to `merge` with a `Selection`
    ((assign = options, extraContent = assign.extraContent, rest$1 = objectWithoutProperties$1( assign, ["extraContent"] ), rest = rest$1));
    this.options = exports.mergeDefined({
      dropdownOptions: {
        align: void 0,
        mode: 'click',
        ddClass: '',
        disabled: false,
        featureFlags: {
          useUpdatedStructure: false
        }
      },
      // XXX Breaking: Renderer
      // renderer: (data) -> span().text(data.text or data)
      renderer: function(node, data) {
        return select(node).text(data.text || data);
      },
      items: []
    }, rest);
    this.options.extraContent = extraContent;
    self = this;
    this._ = {
      items: this.options.items,
      itemsChanged: true // First time in this should be true
    };
    select(this.selector).api('menu', this).api(this);
    if ((this.options.dropdownOptions.ddClass != null) && this.options.dropdownOptions.ddClass.length === 0) {
      colorClass = palette$1.context(this.selector);
    }
    this.options.dropdownOptions.ddClass = ((ref = this.options.featureFlags) != null ? ref.useUpdatedStructure : void 0) ? 'hx-menu hx-flag-menu' : 'hx-menu ' + (colorClass != null ? 'hx-' + colorClass : this.options.dropdownOptions.ddClass);
    dropdownContainer = div('hx-menu-items');
    // Items as set by the user.
    rawItems = self._.items;
    setup = function(items) {
      if (self._.itemsChanged) { // We don't want to keep making lots of new menu items if the items haven't changed
        self._.itemsChanged = false;
        setupInner(self, items, self);
      }
      return populateNode(dropdownContainer.node(), self._.menuItems);
    };
    self._.setup = setup;
    if (exports.isFunction(rawItems)) {
      self._.itemsChanged = true; // Items have always changed when being returned from a function
      rawItems(function(items) {
        return setup(items);
      });
    } else {
      setup(rawItems);
    }
    this.dropdown = new Dropdown(this.selector, dropdownContainer, this.options.dropdownOptions);
    this.dropdown.on('hideend', 'hx.menu', function() {
      self.cursorPos = -1;
      return dropdownContainer.selectAll('.hx-menu-item').classed('hx-menu-active', false);
    });
    if (((ref1 = this.options.featureFlags) != null ? ref1.useUpdatedStructure : void 0)) {
      this.dropdown.on('showstart', 'hx.menu', function() {
        return dropdownContainer.insertBefore(options.extraContent);
      });
    } else {
      dropdownContainer.add(options.extraContent);
    }
    this.dropdown.on('showend', 'hx.menu', function () {
      var ddNode, node;
      if (this$1.dropdown._.dropdown != null) {
        node = this$1.dropdown._.dropdown.node();
        ddNode = select(node);
        if (node.scrollTop < node.scrollHeight - node.clientHeight) {
          ddNode.style('width', ddNode.width() + scrollbarSize() + 'px');
          if (this$1.dropdown._.alignments[2] === 'r') {
            return ddNode.style('left', Math.max(0, ddNode.box().left - scrollbarSize()) + 'px');
          }
        }
      }
    });
    selection = select(this.selector);
    selection.off('click', 'hx.dropdown');
    selection.on('click', 'hx.menu', function () {
      var loading;
      if (!this$1.options.disabled) {
        if (this$1.dropdown.isOpen()) {
          return this$1.dropdown.hide();
        } else {
          if (!this$1.loading) {
            if ((this$1.data != null) && exports.isFunction(this$1.data)) {
              this$1.loading = true;
              loading = selection.prepend('span');
              loading.append('i').class('hx-menu-loading hx-icon hx-icon-spin hx-icon-spinner');
              this$1.data(function(data) {
                self.loading = false;
                loading.remove();
                return setup(data);
              });
            }
            return this$1.dropdown.show();
          }
        }
      }
    });
    if (selection.node().nodeName.toLowerCase() === 'input') {
      isInput = true;
      targetElem = selection;
    }
    this.dropdown.on('showstart', 'hx.menu', function() {
      var ref2;
      self.cursorPos = -1;
      if (!isInput) {
        targetElem = self.dropdown._.dropdown;
        targetElem.attr('tabindex', '-1');
        targetElem.node().focus();
      }
      targetElem.on('keydown', 'hx.menu', function(e) {
        if (self.dropdown.isOpen()) {
          checkEvent(e, self);
        }
        return self.emit('keydown', e);
      });
      return (ref2 = self.dropdown._.dropdown) != null ? ref2.on('click', 'hx.menu', function(e) {
        var allItems, i, index, t, target;
        // get the closest menu item - uses nodes as blank selection can be
        // returned if the target is a hx-menu-item
        target = select(e.target).classed('hx-menu-link') ? e.target : select(e.target).closest('.hx-menu-item').node();
        if (target) {
          index = -1;
          t = select(target);
          if (t.classed('hx-menu-link')) {
            allItems = getAllItems(self);
            i = 0;
            while (index < 0 && i < allItems.length) {
              if (allItems[i].node === target) {
                index = i;
                break;
              }
              i += 1;
            }
            setActive(self, index, void 0, true);
          }
          return targetElem.node().focus();
        }
      }) : void 0;
    });
    // pipe the dropdown events through
    this.dropdown.pipe(this, 'dropdown');
    if (this.options.disabled) {
      this.disabled(this.options.disabled);
    }
  }

  if ( EventEmitter ) MenuBase.__proto__ = EventEmitter;
  MenuBase.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  MenuBase.prototype.constructor = MenuBase;

  MenuBase.prototype.render = function render () {
    return this._.setup(this.items());
  };

  MenuBase.prototype.renderer = function renderer (f) {
    if (arguments.length > 0) {
      this.options.renderer = f;
      this.render();
      return this;
    } else {
      return this.options.renderer;
    }
  };

  MenuBase.prototype.addException = function addException (element) {
    this.dropdown.clickDetector.addException(element);
    return this;
  };

  MenuBase.prototype.hide = function hide () {
    this.dropdown.hide();
    return this;
  };

  MenuBase.prototype.items = function items (items$1) {
    if (arguments.length > 0) {
      if (items$1 == null) {
        items$1 = [];
      }
      this._.itemsChanged = true;
      this._.items = items$1;
      this.render();
      return this;
    } else {
      return this._.items;
    }
  };

  MenuBase.prototype.disabled = function disabled (disabled$1) {
    if (disabled$1 != null) {
      this.options.disabled = disabled$1;
      select(this.selector).attr('disabled', disabled$1 ? true : void 0).classed('hx-disabled', disabled$1);
      if (this.dropdown.isOpen() && disabled$1 === true) {
        this.hide();
      }
      return this;
    } else {
      return !!this.options.disabled;
    }
  };

  return MenuBase;
}(EventEmitter));

exports.Menu = /*@__PURE__*/(function (MenuBase) {
  function Menu(sel, opt) {
    logger.deprecated('hx.Menu', 'Replaced by DropdownButton / MoreButton');
    MenuBase.call(this, sel, opt);
  }

  if ( MenuBase ) Menu.__proto__ = MenuBase;
  Menu.prototype = Object.create( MenuBase && MenuBase.prototype );
  Menu.prototype.constructor = Menu;

  return Menu;
}(MenuBase));

var buildAutocomplete, findTerm, showAutocomplete, sortActive;

exports.userFacingText({
  autocomplete: {
    loading: 'Loading...',
    noResultsFound: 'No results found',
    otherResults: 'Other Results',
    pleaseEnterMinCharacters: 'Please enter $minLength or more characters',
    minCharacters: 'Min length $minLength characters'
  }
});

sortActive = function(items) {
  var active, groupedActive, inactive;
  groupedActive = new Map(exports.groupBy(items, function(i) {
    return !i.disabled;
  }));
  active = groupedActive.get(true) || [];
  inactive = groupedActive.get(false) || [];
  return {active: active, inactive: inactive};
};

// Force match is used when closing the dd and options.mustMatch is true
// It checks if the term is exactly a term in the data and should only
// be called when the menu is hidden.
findTerm = function(term, forceMatch) {
  var assign;

  var _, active, allData, data, dataMatches, filteredData, heading, inactive, matches, remainingResults, self;
  self = this;
  _ = this._;
  if (_.prevTerm == null) {
    _.prevTerm = '';
  }
  // Should use previous data as the user types more characters to reduce the
  // amount of filtering/sorting required
  allData = _.data.get(term);
  // if the term length is less than the previous term length then the data is
  // irrelevant
  if (term.length >= _.prevTerm.length) {
    if (allData == null) {
      allData = _.data.get(_.prevTerm);
    }
  }
  // if we haven't got cached data for the current or previous term we get all
  // the data
  if (allData == null) {
    allData = _.data.get('');
  }
  _.prevTerm = term;
  filteredData = this.options.matchType === 'external' ? allData : term.length === 0 && !this.options.showAll ? [] : this.options.filter(allData, term);
  // checks if all the data and the filtered data are the same. If they are, we
  // don't need to show any other results
  dataMatches = allData.length === filteredData.length && allData.length > 0;
  // Adds 'Other Data' heading and shows the data that was filtered out under it
  if (this.options.showOtherResults && !forceMatch && !dataMatches) {
    matches = filteredData.length > 0 ? filteredData : [
      {
        unselectable: true,
        text: self.options.noResultsMessage
      }
    ];
    // find values that are in the original data but not in the filtered data
    heading = {
      unselectable: true,
      heading: true,
      text: self.options.otherResultsMessage
    };
    remainingResults = filteredData.length === 0 ? allData : (data = allData.filter(function(d) {
      return !filteredData.some(function(e) {
        return e === d;
      });
    }), (this.options.filterOptions.sort == null) || this.options.filterOptions.sort ? this.options.inputMap != null ? data.sort(function(a, b) {
      return exports.sort.compare(self.options.inputMap(a), self.options.inputMap(b));
    }) : data.sort(exports.sort.compare) : void 0, data);
    ((assign = sortActive(remainingResults), active = assign.active, inactive = assign.inactive));
    filteredData = matches.concat( [heading], active, inactive);
  }
  return filteredData;
};

buildAutocomplete = function(searchTerm, fromCallback, loading) {
  var _, filteredData, items, message, self, trimAndReload;
  // 'this' in this context is the autocomplete object, passed to callback
  self = this;
  _ = this._;
  // we get in here if callback is defined and we haven't tried to call it
  if ((_.callback != null) && !fromCallback) {
    if (searchTerm.length < this.options.minLength || (!this.options.showAll && searchTerm.length === 0)) {
      _.data.set(searchTerm, []);
      buildAutocomplete.call(self, searchTerm, true);
    } else {
      // call the autocomplete to show the loading message
      buildAutocomplete.call(self, searchTerm, true, true);
      _.currentSearch = searchTerm;
      // check for the data in the cache before trying to load a new set
      if (!_.data.get(searchTerm)) {
        // set the value to true to prevent errors caused by filtering undefined
        _.data.set(searchTerm, true);
        _.callback.call(self, searchTerm, function(returnData) {
          // cleanUp prevents calling the callback when the user has changed focus
          if (!_.cleanUp) {
            // store the returned data
            _.data.set(searchTerm, returnData);
            // check that the  Prevents calls that take a long time conflicting
            // when they return in a different order than they were called in.
            if (_.currentSearch === searchTerm) {
              return buildAutocomplete.call(self, searchTerm, true);
            }
          }
        });
      } else {
        buildAutocomplete.call(self, searchTerm, true);
      }
    }
  } else {
    _.menu.cursorPos = -1;
    // loading is true when we're waiting for a callback to return data
    filteredData = !loading ? this.options.matchType === 'external' ? _.data.get(searchTerm) : findTerm.call(self, searchTerm) : void 0;
    message = {
      unselectable: true,
      text: ''
    };
    _.menu.items([]);
    items = [];
    trimAndReload = false;
    if (filteredData == null) {
      message.text = this.options.loadingMessage;
    } else if (searchTerm.length < this.options.minLength) {
      message.text = exports.userFacingText.format(this.options.pleaseEnterMinCharactersMessage, {
        minLength: this.options.minLength
      });
    } else if ((searchTerm.length > 0 || this.options.showAll) && filteredData.length === 0) {
      if (this.options.trimTrailingSpaces && _.input.value().lastIndexOf(' ') === _.input.value().length - 1) {
        trimAndReload = true;
      } else if (this.options.noResultsMessage.length > 0 && (this.options.noResultsMessage != null)) {
        message.text = this.options.noResultsMessage;
      }
    } else if (searchTerm.length >= this.options.minLength && filteredData.length > 0) {
      items = items.concat(filteredData);
    }
    // add the message if the text was set in the previous step
    if (message.text.length) {
      items = [message].concat(items);
    }
    // show the dropdown if there are items, or update it if it's already visible
    if (items.length > 0) {
      _.menu.items(items);
      if (_.menu.dropdown.isOpen()) {
        // XXX Breaking: Render
        // _.menu.dropdown.render()
        _.menu.dropdown._.setupDropdown(_.menu.dropdown._.dropdown.node());
      } else {
        _.menu.dropdown.show(); // Hide the dropdown as there are no items
      }
    } else {
      _.menu.hide();
    }
    if (trimAndReload) {
      _.input.value(_.input.value().substring(0, _.input.value().length - 1));
      buildAutocomplete.call(self, _.input.value(), fromCallback, loading);
    }
  }
  return void 0;
};

showAutocomplete = function() {
  this._.cleanUp = false;
  return buildAutocomplete.call(this, this._.input.value() || '');
};

exports.Autocomplete = /*@__PURE__*/(function (EventEmitter) {
  function Autocomplete(selector, data1, opts) {
    if ( opts === void 0 ) opts = {};

    var _, _filterOpts, base, base1, base2, input, menu, self, timeout;
    EventEmitter.call(this);
    this.selector = selector;
    this.data = data1;
    // do a sanity check on the data
    if (!exports.isArray(this.data) && !exports.isFunction(this.data)) {
      logger.warn('Autocomplete - ', this.selector, ': data set incorrectly - you supplied: ', this.data, ' but should have been an array of items or a function');
    } else {
      this.options = exports.merge({
        minLength: 0,
        showAll: true,
        trimTrailingSpaces: false,
        mustMatch: false,
        inputMap: void 0,
        renderer: void 0,
        matchType: 'contains',
        placeholder: void 0,
        filter: void 0,
        filterOptions: void 0,
        showOtherResults: false,
        allowTabCompletion: true,
        value: void 0,
        // XXX Breaking: Text keys (autocomplete -> autocomplete)
        loadingMessage: exports.userFacingText('autocomplete', 'loading'),
        noResultsMessage: exports.userFacingText('autocomplete', 'noResultsFound'),
        otherResultsMessage: exports.userFacingText('autocomplete', 'otherResults'),
        pleaseEnterMinCharactersMessage: exports.userFacingText('autocomplete', 'pleaseEnterMinCharacters', true),
        minCharactersMessage: exports.userFacingText('autocomplete', 'minCharacters', true)
      }, opts);
      this._ = _ = {};
      _.ignoreMatch = false;
      _.ignoreNextFocus = false;
      self = this;
      // create the data cache for storing the datasets based on their search term
      _.data = new Map();
      if (exports.isFunction(this.data)) {
        _.callback = this.data;
      } else {
        _.data.set('', this.data);
      }
      if (this.options.inputMap != null) {
        // default searchValue if inputMap is defined
        _filterOpts = {
          searchValues: function(d) {
            return [self.options.inputMap(d)];
          }
        };
      }
      this.options.filterOptions = exports.merge({}, _filterOpts, opts.filterOptions);
      if ((base = this.options).filter == null) {
        base.filter = function (arr, term) {
          var assign;

          var active, filterName, filtered, inactive;
          // XXX: this feels hacky. Maybe the api should be simplified for autocomplete?
          filterName = 'filter' + self.options.matchType[0].toUpperCase() + self.options.matchType.slice(1);
          filtered = filter[filterName](arr, term, self.options.filterOptions);
          ((assign = sortActive(filtered), active = assign.active, inactive = assign.inactive));
          return active.concat( inactive);
        };
      }
      // create renderer based on inputMap
      // XXX Breaking: Renderer
      if ((base1 = this.options).renderer == null) {
        // (item) -> div().text(self.options.inputMap(item))
        base1.renderer = this.options.inputMap != null ? function(elem, item) {
          return select(elem).text(self.options.inputMap(item));
        // (item) -> div().text(item.text or item)
        } : function(elem, item) {
          return select(elem).text(item);
        };
      }
      if ((base2 = this.options).placeholder == null) {
        base2.placeholder = this.options.minLength > 0 ? exports.userFacingText.format(this.options.minCharactersMessage, {
          minLength: this.options.minLength
        }) : void 0;
      }
      input = select(this.selector).api('autocomplete', this).api(this);
      menu = new MenuBase(this.selector, {
        dropdownOptions: {
          ddClass: 'hx-autocomplete-dropdown'
        }
      });
      menu.pipe(this, '', ['highlight']);
      menu.dropdown.pipe(this, 'dropdown');
      select(this.selector).off('click', 'hx.menu');
      menu.on('input', 'hx.autocomplete', function(e) {
        if (self.options.allowTabCompletion) {
          if ((e.which || e.keyCode) === 9) {
            return e.preventDefault();
          }
        }
      });
      // set properties and functions for input
      _.setInputValue = this.options.inputMap != null ? function(d) {
        if ( d === void 0 ) d = '';

        input.value(self.options.inputMap(d));
        return self.emit('change', d);
      } : function(d) {
        if ( d === void 0 ) d = '';

        input.value(d);
        return self.emit('change', d);
      };
      if (this.options.placeholder != null) {
        input.attr('placeholder', this.options.placeholder);
      }
      // focus is here for when user tabs to input box
      input.on('focus', 'hx.autocomplete', function(e) {
        if (!_.ignoreNextFocus) {
          _.cleanUp = false;
          return self.show();
        }
      });
      // prevent callback when user has tabbed out of input box
      input.on('blur', 'hx.autocomplete', function(e) {
        if (e.relatedTarget != null) {
          self.hide();
        }
        return _.ignoreNextFocus = false;
      });
      timeout = void 0;
      input.on('input', 'hx.autocomplete', function() {
        _.cleanUp = false;
        clearTimeout(timeout);
        _.initialValue = input.value();
        return timeout = setTimeout(function() {
          if (input.value() !== _.prevTerm) {
            return buildAutocomplete.call(self, input.value() || '');
          }
        }, 200);
      });
      // set properties and functions for menu
      // XXX Breaking: Renderer
      // menu.renderer (elem, item) ->
      //   return this.options.renderer(item)
      //     .classed('hx-autocomplete-item-unselectable', item.unselectable or item.heading)
      menu.renderer(function(elem, item) {
        var selection;
        // if the item is a unselectable item or a heading, we use a set renderer
        // and ignore the passed in renderer
        selection = select(elem);
        selection.style('font-weight', '');
        if (item.unselectable || item.heading) {
          selection.text(item.text).off();
          if (item.heading) {
            return selection.style('font-weight', '600');
          }
        } else {
          return self.options.renderer(elem, item);
        }
      });
      // called when a menu item is selected. Updates the input field when using
      // the arrow keys.
      menu.on('change', 'hx.autocomplete', function(d) {
        var content;
        content = d != null ? d.content : void 0;
        if (content != null) {
          if (!(content != null ? content.unselectable : void 0) && !(content != null ? content.heading : void 0) && !(content != null ? content.disabled : void 0)) {
            if (d.eventType === 'tab') {
              if (self.options.allowTabCompletion) {
                _.setInputValue(content);
                _.ignoreMatch = true;
                return self.hide();
              }
            } else if (menu.cursorPos === -1 && (_.initialValue != null)) {
              return input.value(_.initialValue);
            } else {
              _.setInputValue(content);
              if (d.eventType === 'click' || d.eventType === 'enter') {
                _.ignoreMatch = true;
                self.hide();
                return _.ignoreNextFocus = true;
              }
            }
          }
        } else if (d.eventType === 'enter') {
          _.ignoreMatch = false;
          self.hide();
          return _.ignoreNextFocus = true;
        }
      });
      _.checkValidity = function() {
        var exactMatch;
        _.cleanUp = true;
        if (!_.ignoreMatch) {
          if (self.options.mustMatch) {
            if (input.value().length > 0) {
              exactMatch = self.options.matchType === 'external' ? _.data.get(input.value()) : _.data.get(input.value()) === true ? setTimeout(_.checkValidity, 5) : findTerm.call(self, input.value(), true);
              if (exactMatch !== true && (exactMatch != null ? exactMatch.length : void 0) > 0) {
                exactMatch = exactMatch != null ? exactMatch.filter(function(e) {
                  e = self.options.inputMap != null ? self.options.inputMap(e) : e;
                  return e.toLowerCase() === input.value().toLowerCase();
                }) : void 0;
                if ((exactMatch != null ? exactMatch.length : void 0) > 0) {
                  _.setInputValue(exactMatch[0]);
                } else {
                  input.value('');
                }
              } else {
                input.value('');
              }
            }
          }
        }
        _.ignoreMatch = false;
        self.clearCache();
        return self.emit('hide', input.value());
      };
      menu.on('dropdown.change', 'hx.autocomplete', function(visible) {
        if (!!visible) {
          _.initialValue = input.value();
          return menu.dropdown._.useScroll = true;
        } else {
          _.checkValidity();
        }
      });
      menu.on('click', 'hx.autocomplete', function() {
        return _.ignoreMatch = true;
      });
      _.menu = menu;
      _.input = input;
      if (this.options.value) {
        this.value(this.options.value);
      }
    }
  }

  if ( EventEmitter ) Autocomplete.__proto__ = EventEmitter;
  Autocomplete.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Autocomplete.prototype.constructor = Autocomplete;

  Autocomplete.prototype.clearCache = function clearCache () {
    this._.data = new Map();
    if ((this.data != null) && !exports.isFunction(this.data)) {
      this._.data.set('', this.data);
    }
    return this;
  };

  Autocomplete.prototype.show = function show () {
    this._.ignoreNextFocus = false;
    showAutocomplete.call(this);
    return this;
  };

  Autocomplete.prototype.value = function value (value$1) {
    if (arguments.length > 0) {
      this._.setInputValue(value$1);
      this._.checkValidity();
      return this;
    } else {
      return this._.input.value();
    }
  };

  Autocomplete.prototype.hide = function hide () {
    var _;
    _ = this._;
    _.ignoreNextFocus = false;
    if (_.menu.dropdown.isOpen()) {
      _.menu.hide();
      _.prevTerm = void 0;
      _.cleanUp = true;
    }
    return this;
  };

  return Autocomplete;
}(EventEmitter));

exports.autocomplete = function(data, options) {
  var selection;
  selection = detached('input');
  new exports.Autocomplete(selection, data, options);
  return selection;
};

var supportedTypes = ['success', 'danger', 'warning'];

function badge(options) {
  if ( options === void 0 ) options = {};

  var type = options.type;
  var inverse = options.inverse;
  var validType = !type || supportedTypes.includes(type);
  if (!validType) {
    logger.warn(("badge: Badge was called with an invalid type: '" + type + "'. Supported types: " + (supportedTypes.join(', '))));
  }
  return span('hx-badge')
    .classed('hx-badge-inverse', inverse)
    .classed(("hx-" + type), type && validType);
}

var defaultLocaleObjects = [
  { value: 'af', full: 'Afrikaans' },
  { value: 'sq', full: 'Albanian' },
  { value: 'ar', full: 'Arabic' },
  { value: 'ar-MA', full: 'Arabic (Morocco)' },
  { value: 'ar-SA', full: 'Arabic (Saudi Arabia)' },
  { value: 'ar-TN', full: 'Arabic (Tunisia)' },
  { value: 'hy-AM', full: 'Armenian' },
  { value: 'az', full: 'Azerbaijani' },
  { value: 'id', full: 'Bahasa Indonesia' },
  { value: 'ms-MY', full: 'Bahasa Malayu' },
  { value: 'eu', full: 'Basque' },
  { value: 'be', full: 'Belarusian' },
  { value: 'bn', full: 'Bengali' },
  { value: 'bs', full: 'Bosnian' },
  { value: 'br', full: 'Breton' },
  { value: 'bg', full: 'Bulgarian' },
  { value: 'my', full: 'Burmese' },
  { value: 'ca', full: 'Catalan' },
  { value: 'zh-CN', full: 'Chinese' },
  { value: 'zh-TW', full: 'Chinese (Traditional)' },
  { value: 'cv', full: 'Chuvash' },
  { value: 'hr', full: 'Croatian' },
  { value: 'cs', full: 'Czech' },
  { value: 'da', full: 'Danish' },
  { value: 'nl', full: 'Dutch' },
  { value: 'en', full: 'English' },
  { value: 'en-US', full: 'English (US)' },
  { value: 'en-AU', full: 'English (Australia)' },
  { value: 'en-CA', full: 'English (Canada)' },
  { value: 'en-GB', full: 'English (UK) ' },
  { value: 'eo', full: 'Esperanto' },
  { value: 'et', full: 'Estonian' },
  { value: 'fo', full: 'Farose' },
  { value: 'fi', full: 'Finnish' },
  { value: 'fr', full: 'French' },
  { value: 'fr-CA', full: 'French (Canada)' },
  { value: 'fy', full: 'Frisian' },
  { value: 'gl', full: 'Galician' },
  { value: 'ka', full: 'Georgian' },
  { value: 'de', full: 'German' },
  { value: 'de-AT', full: 'German (Austria)' },
  { value: 'el', full: 'Greek' },
  { value: 'he', full: 'Hebrew' },
  { value: 'hi', full: 'Hindi' },
  { value: 'hu', full: 'Hungarian' },
  { value: 'is', full: 'Icelandic' },
  { value: 'it', full: 'Italian' },
  { value: 'ja', full: 'Japanese' },
  { value: 'km', full: 'Khmer (Cambodia)' },
  { value: 'ko', full: 'Korean' },
  { value: 'lv', full: 'Latvian' },
  { value: 'lt', full: 'Lithuanian' },
  { value: 'lb', full: 'Luxembourgish' },
  { value: 'mk', full: 'Macedonian' },
  { value: 'ml', full: 'Malayalam' },
  { value: 'mr', full: 'Marathi' },
  { value: 'ne', full: 'Nepalese' },
  { value: 'nb', full: 'Norwegian' },
  { value: 'nn', full: 'Norwegian Nynorsk' },
  { value: 'fa', full: 'Persian' },
  { value: 'pl', full: 'Polish' },
  { value: 'pt', full: 'Portuguese' },
  { value: 'pt-BR', full: 'Portuguese (Brazil)' },
  { value: 'ro', full: 'Romanian' },
  { value: 'ru', full: 'Russian' },
  { value: 'sr', full: 'Serbian' },
  { value: 'sr-CYRL', full: 'Serbian Cyrillic' },
  { value: 'sk', full: 'Slovak' },
  { value: 'sl', full: 'Slovenian' },
  { value: 'es', full: 'Spanish' },
  { value: 'sv', full: 'Swedish' },
  { value: 'tl-PH', full: 'Tagalog (Filipino)' },
  { value: 'tzm', full: 'Tamaziɣt' },
  { value: 'tzm-LATN', full: 'Tamaziɣt Latin' },
  { value: 'ta', full: 'Tamil' },
  { value: 'th', full: 'Thai' },
  { value: 'bo', full: 'Tibetan' },
  { value: 'tr', full: 'Turkish' },
  { value: 'uk', full: 'Ukrainian' },
  { value: 'uz', full: 'Uzbek' },
  { value: 'vi', full: 'Vietnamese' },
  { value: 'cy', full: 'Welsh' } ];

var defaultTimezoneList = [
  'UTC-12:00',
  'UTC-11:00',
  'UTC-10:00',
  'UTC-09:30',
  'UTC-09:00',
  'UTC-08:00',
  'UTC-07:00',
  'UTC-06:00',
  'UTC-05:00',
  'UTC-04:30',
  'UTC-04:00',
  'UTC-03:30',
  'UTC-03:00',
  'UTC-02:00',
  'UTC-01:00',
  'UTC+00:00',
  'UTC+01:00',
  'UTC+02:00',
  'UTC+03:00',
  'UTC+03:30',
  'UTC+04:00',
  'UTC+04:30',
  'UTC+05:00',
  'UTC+05:30',
  'UTC+05:45',
  'UTC+06:00',
  'UTC+06:30',
  'UTC+07:00',
  'UTC+08:00',
  'UTC+08:30',
  'UTC+08:45',
  'UTC+09:00',
  'UTC+09:30',
  'UTC+10:00',
  'UTC+10:30',
  'UTC+11:00',
  'UTC+12:00',
  'UTC+12:45',
  'UTC+13:00',
  'UTC+14:00' ];

var defaultLocaleList = defaultLocaleObjects.map(function (ref) {
  var value = ref.value;

  return value;
});

// List of language tags according to RFC 5646.
// See <http://tools.ietf.org/html/rfc5646> for info on how to parse
// these language tags. Some duplicates have been removed.
var RFC5646_LANGUAGE_TAGS = {
  af: 'Afrikaans',
  'af-ZA': 'Afrikaans (South Africa)',
  ar: 'Arabic',
  'ar-AE': 'Arabic (U.A.E.)',
  'ar-BH': 'Arabic (Bahrain)',
  'ar-DZ': 'Arabic (Algeria)',
  'ar-EG': 'Arabic (Egypt)',
  'ar-IQ': 'Arabic (Iraq)',
  'ar-JO': 'Arabic (Jordan)',
  'ar-KW': 'Arabic (Kuwait)',
  'ar-LB': 'Arabic (Lebanon)',
  'ar-LY': 'Arabic (Libya)',
  'ar-MA': 'Arabic (Morocco)',
  'ar-OM': 'Arabic (Oman)',
  'ar-QA': 'Arabic (Qatar)',
  'ar-SA': 'Arabic (Saudi Arabia)',
  'ar-SY': 'Arabic (Syria)',
  'ar-TN': 'Arabic (Tunisia)',
  'ar-YE': 'Arabic (Yemen)',
  az: 'Azeri (Latin)',
  'az-AZ': 'Azeri (Latin) (Azerbaijan)',
  'az-Cyrl-AZ': 'Azeri (Cyrillic) (Azerbaijan)',
  be: 'Belarusian',
  'be-BY': 'Belarusian (Belarus)',
  bg: 'Bulgarian',
  'bg-BG': 'Bulgarian (Bulgaria)',
  'bs-BA': 'Bosnian (Bosnia and Herzegovina)',
  ca: 'Catalan',
  'ca-ES': 'Catalan (Spain)',
  cs: 'Czech',
  'cs-CZ': 'Czech (Czech Republic)',
  cy: 'Welsh',
  'cy-GB': 'Welsh (United Kingdom)',
  da: 'Danish',
  'da-DK': 'Danish (Denmark)',
  de: 'German',
  'de-AT': 'German (Austria)',
  'de-CH': 'German (Switzerland)',
  'de-DE': 'German (Germany)',
  'de-LI': 'German (Liechtenstein)',
  'de-LU': 'German (Luxembourg)',
  dv: 'Divehi',
  'dv-MV': 'Divehi (Maldives)',
  el: 'Greek',
  'el-GR': 'Greek (Greece)',
  en: 'English',
  'en-AU': 'English (Australia)',
  'en-BZ': 'English (Belize)',
  'en-CA': 'English (Canada)',
  'en-CB': 'English (Caribbean)',
  'en-GB': 'English (United Kingdom)',
  'en-IE': 'English (Ireland)',
  'en-JM': 'English (Jamaica)',
  'en-NZ': 'English (New Zealand)',
  'en-PH': 'English (Republic of the Philippines)',
  'en-TT': 'English (Trinidad and Tobago)',
  'en-US': 'English (United States)',
  'en-ZA': 'English (South Africa)',
  'en-ZW': 'English (Zimbabwe)',
  eo: 'Esperanto',
  es: 'Spanish',
  'es-AR': 'Spanish (Argentina)',
  'es-BO': 'Spanish (Bolivia)',
  'es-CL': 'Spanish (Chile)',
  'es-CO': 'Spanish (Colombia)',
  'es-CR': 'Spanish (Costa Rica)',
  'es-DO': 'Spanish (Dominican Republic)',
  'es-EC': 'Spanish (Ecuador)',
  'es-ES': 'Spanish (Spain)',
  'es-GT': 'Spanish (Guatemala)',
  'es-HN': 'Spanish (Honduras)',
  'es-MX': 'Spanish (Mexico)',
  'es-NI': 'Spanish (Nicaragua)',
  'es-PA': 'Spanish (Panama)',
  'es-PE': 'Spanish (Peru)',
  'es-PR': 'Spanish (Puerto Rico)',
  'es-PY': 'Spanish (Paraguay)',
  'es-SV': 'Spanish (El Salvador)',
  'es-UY': 'Spanish (Uruguay)',
  'es-VE': 'Spanish (Venezuela)',
  et: 'Estonian',
  'et-EE': 'Estonian (Estonia)',
  eu: 'Basque',
  'eu-ES': 'Basque (Spain)',
  fa: 'Farsi',
  'fa-IR': 'Farsi (Iran)',
  fi: 'Finnish',
  'fi-FI': 'Finnish (Finland)',
  fo: 'Faroese',
  'fo-FO': 'Faroese (Faroe Islands)',
  fr: 'French',
  'fr-BE': 'French (Belgium)',
  'fr-CA': 'French (Canada)',
  'fr-CH': 'French (Switzerland)',
  'fr-FR': 'French (France)',
  'fr-LU': 'French (Luxembourg)',
  'fr-MC': 'French (Principality of Monaco)',
  gl: 'Galician',
  'gl-ES': 'Galician (Spain)',
  gu: 'Gujarati',
  'gu-IN': 'Gujarati (India)',
  he: 'Hebrew',
  'he-IL': 'Hebrew (Israel)',
  hi: 'Hindi',
  'hi-IN': 'Hindi (India)',
  hr: 'Croatian',
  'hr-BA': 'Croatian (Bosnia and Herzegovina)',
  'hr-HR': 'Croatian (Croatia)',
  hu: 'Hungarian',
  'hu-HU': 'Hungarian (Hungary)',
  hy: 'Armenian',
  'hy-AM': 'Armenian (Armenia)',
  id: 'Indonesian',
  'id-ID': 'Indonesian (Indonesia)',
  is: 'Icelandic',
  'is-IS': 'Icelandic (Iceland)',
  it: 'Italian',
  'it-CH': 'Italian (Switzerland)',
  'it-IT': 'Italian (Italy)',
  ja: 'Japanese',
  'ja-JP': 'Japanese (Japan)',
  ka: 'Georgian',
  'ka-GE': 'Georgian (Georgia)',
  kk: 'Kazakh',
  'kk-KZ': 'Kazakh (Kazakhstan)',
  kn: 'Kannada',
  'kn-IN': 'Kannada (India)',
  ko: 'Korean',
  'ko-KR': 'Korean (Korea)',
  kok: 'Konkani',
  'kok-IN': 'Konkani (India)',
  ky: 'Kyrgyz',
  'ky-KG': 'Kyrgyz (Kyrgyzstan)',
  lt: 'Lithuanian',
  'lt-LT': 'Lithuanian (Lithuania)',
  lv: 'Latvian',
  'lv-LV': 'Latvian (Latvia)',
  mi: 'Maori',
  'mi-NZ': 'Maori (New Zealand)',
  mk: 'FYRO Macedonian',
  'mk-MK': 'FYRO Macedonian (Former Yugoslav Republic of Macedonia)',
  mn: 'Mongolian',
  'mn-MN': 'Mongolian (Mongolia)',
  mr: 'Marathi',
  'mr-IN': 'Marathi (India)',
  ms: 'Malay',
  'ms-BN': 'Malay (Brunei Darussalam)',
  'ms-MY': 'Malay (Malaysia)',
  mt: 'Maltese',
  'mt-MT': 'Maltese (Malta)',
  nb: 'Norwegian (Bokm?l)',
  'nb-NO': 'Norwegian (Bokm?l) (Norway)',
  nl: 'Dutch',
  'nl-BE': 'Dutch (Belgium)',
  'nl-NL': 'Dutch (Netherlands)',
  'nn-NO': 'Norwegian (Nynorsk) (Norway)',
  ns: 'Northern Sotho',
  'ns-ZA': 'Northern Sotho (South Africa)',
  pa: 'Punjabi',
  'pa-IN': 'Punjabi (India)',
  pl: 'Polish',
  'pl-PL': 'Polish (Poland)',
  ps: 'Pashto',
  'ps-AR': 'Pashto (Afghanistan)',
  pt: 'Portuguese',
  'pt-BR': 'Portuguese (Brazil)',
  'pt-PT': 'Portuguese (Portugal)',
  qu: 'Quechua',
  'qu-BO': 'Quechua (Bolivia)',
  'qu-EC': 'Quechua (Ecuador)',
  'qu-PE': 'Quechua (Peru)',
  ro: 'Romanian',
  'ro-RO': 'Romanian (Romania)',
  ru: 'Russian',
  'ru-RU': 'Russian (Russia)',
  sa: 'Sanskrit',
  'sa-IN': 'Sanskrit (India)',
  se: 'Sami',
  'se-FI': 'Sami (Finland)',
  'se-NO': 'Sami (Norway)',
  'se-SE': 'Sami (Sweden)',
  sk: 'Slovak',
  'sk-SK': 'Slovak (Slovakia)',
  sl: 'Slovenian',
  'sl-SI': 'Slovenian (Slovenia)',
  sq: 'Albanian',
  'sq-AL': 'Albanian (Albania)',
  'sr-BA': 'Serbian (Latin) (Bosnia and Herzegovina)',
  'sr-Cyrl-BA': 'Serbian (Cyrillic) (Bosnia and Herzegovina)',
  'sr-SP': 'Serbian (Latin) (Serbia and Montenegro)',
  'sr-Cyrl-SP': 'Serbian (Cyrillic) (Serbia and Montenegro)',
  sv: 'Swedish',
  'sv-FI': 'Swedish (Finland)',
  'sv-SE': 'Swedish (Sweden)',
  sw: 'Swahili',
  'sw-KE': 'Swahili (Kenya)',
  syr: 'Syriac',
  'syr-SY': 'Syriac (Syria)',
  ta: 'Tamil',
  'ta-IN': 'Tamil (India)',
  te: 'Telugu',
  'te-IN': 'Telugu (India)',
  th: 'Thai',
  'th-TH': 'Thai (Thailand)',
  tl: 'Tagalog',
  'tl-PH': 'Tagalog (Philippines)',
  tn: 'Tswana',
  'tn-ZA': 'Tswana (South Africa)',
  tr: 'Turkish',
  'tr-TR': 'Turkish (Turkey)',
  tt: 'Tatar',
  'tt-RU': 'Tatar (Russia)',
  ts: 'Tsonga',
  uk: 'Ukrainian',
  'uk-UA': 'Ukrainian (Ukraine)',
  ur: 'Urdu',
  'ur-PK': 'Urdu (Islamic Republic of Pakistan)',
  uz: 'Uzbek (Latin)',
  'uz-UZ': 'Uzbek (Latin) (Uzbekistan)',
  'uz-Cyrl-UZ': 'Uzbek (Cyrillic) (Uzbekistan)',
  vi: 'Vietnamese',
  'vi-VN': 'Vietnamese (Viet Nam)',
  xh: 'Xhosa',
  'xh-ZA': 'Xhosa (South Africa)',
  zh: 'Chinese',
  'zh-CN': 'Chinese (S)',
  'zh-HK': 'Chinese (Hong Kong)',
  'zh-MO': 'Chinese (Macau)',
  'zh-SG': 'Chinese (Singapore)',
  'zh-TW': 'Chinese (T)',
  zu: 'Zulu',
  'zu-ZA': 'Zulu (South Africa)',
};

var RFC5456LocaleList = Object.keys(RFC5646_LANGUAGE_TAGS);
var RFC5456LocaleObjects = RFC5456LocaleList.map(function (loc) { return ({
  value: loc,
  full: RFC5646_LANGUAGE_TAGS[loc],
}); });

// List of language tags according to the IANA timeZone Database.
var IANATimezoneList = [
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Asmara',
  'Africa/Asmera',
  'Africa/Bamako',
  'Africa/Bangui',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Blantyre',
  'Africa/Brazzaville',
  'Africa/Bujumbura',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Ceuta',
  'Africa/Conakry',
  'Africa/Dakar',
  'Africa/Dar_es_Salaam',
  'Africa/Djibouti',
  'Africa/Douala',
  'Africa/El_Aaiun',
  'Africa/Freetown',
  'Africa/Gaborone',
  'Africa/Harare',
  'Africa/Johannesburg',
  'Africa/Juba',
  'Africa/Kampala',
  'Africa/Khartoum',
  'Africa/Kigali',
  'Africa/Kinshasa',
  'Africa/Lagos',
  'Africa/Libreville',
  'Africa/Lome',
  'Africa/Luanda',
  'Africa/Lubumbashi',
  'Africa/Lusaka',
  'Africa/Malabo',
  'Africa/Maputo',
  'Africa/Maseru',
  'Africa/Mbabane',
  'Africa/Mogadishu',
  'Africa/Monrovia',
  'Africa/Nairobi',
  'Africa/Ndjamena',
  'Africa/Niamey',
  'Africa/Nouakchott',
  'Africa/Ouagadougou',
  'Africa/Porto-Novo',
  'Africa/Sao_Tome',
  'Africa/Timbuktu',
  'Africa/Tripoli',
  'Africa/Tunis',
  'Africa/Windhoek',
  'America/Adak',
  'America/Anchorage',
  'America/Anguilla',
  'America/Antigua',
  'America/Araguaina',
  'America/Argentina/Buenos_Aires',
  'America/Argentina/Catamarca',
  'America/Argentina/ComodRivadavia',
  'America/Argentina/Cordoba',
  'America/Argentina/Jujuy',
  'America/Argentina/La_Rioja',
  'America/Argentina/Mendoza',
  'America/Argentina/Rio_Gallegos',
  'America/Argentina/Salta',
  'America/Argentina/San_Juan',
  'America/Argentina/San_Luis',
  'America/Argentina/Tucuman',
  'America/Argentina/Ushuaia',
  'America/Aruba',
  'America/Asuncion',
  'America/Atikokan',
  'America/Atka',
  'America/Bahia',
  'America/Bahia_Banderas',
  'America/Barbados',
  'America/Belem',
  'America/Belize',
  'America/Blanc-Sablon',
  'America/Boa_Vista',
  'America/Bogota',
  'America/Boise',
  'America/Buenos_Aires',
  'America/Cambridge_Bay',
  'America/Campo_Grande',
  'America/Cancun',
  'America/Caracas',
  'America/Catamarca',
  'America/Cayenne',
  'America/Cayman',
  'America/Chicago',
  'America/Chihuahua',
  'America/Coral_Harbour',
  'America/Cordoba',
  'America/Costa_Rica',
  'America/Creston',
  'America/Cuiaba',
  'America/Curacao',
  'America/Danmarkshavn',
  'America/Dawson',
  'America/Dawson_Creek',
  'America/Denver',
  'America/Detroit',
  'America/Dominica',
  'America/Edmonton',
  'America/Eirunepe',
  'America/El_Salvador',
  'America/Ensenada',
  'America/Fort_Nelson',
  'America/Fort_Wayne',
  'America/Fortaleza',
  'America/Glace_Bay',
  'America/Godthab',
  'America/Goose_Bay',
  'America/Grand_Turk',
  'America/Grenada',
  'America/Guadeloupe',
  'America/Guatemala',
  'America/Guayaquil',
  'America/Guyana',
  'America/Halifax',
  'America/Havana',
  'America/Hermosillo',
  'America/Indiana/Indianapolis',
  'America/Indiana/Knox',
  'America/Indiana/Marengo',
  'America/Indiana/Petersburg',
  'America/Indiana/Tell_City',
  'America/Indiana/Vevay',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Indianapolis',
  'America/Inuvik',
  'America/Iqaluit',
  'America/Jamaica',
  'America/Jujuy',
  'America/Juneau',
  'America/Kentucky/Louisville',
  'America/Kentucky/Monticello',
  'America/Knox_IN',
  'America/Kralendijk',
  'America/La_Paz',
  'America/Lima',
  'America/Los_Angeles',
  'America/Louisville',
  'America/Lower_Princes',
  'America/Maceio',
  'America/Managua',
  'America/Manaus',
  'America/Marigot',
  'America/Martinique',
  'America/Matamoros',
  'America/Mazatlan',
  'America/Mendoza',
  'America/Menominee',
  'America/Merida',
  'America/Metlakatla',
  'America/Mexico_City',
  'America/Miquelon',
  'America/Moncton',
  'America/Monterrey',
  'America/Montevideo',
  'America/Montreal',
  'America/Montserrat',
  'America/Nassau',
  'America/New_York',
  'America/Nipigon',
  'America/Nome',
  'America/Noronha',
  'America/North_Dakota/Beulah',
  'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem',
  'America/Ojinaga',
  'America/Panama',
  'America/Pangnirtung',
  'America/Paramaribo',
  'America/Phoenix',
  'America/Port-au-Prince',
  'America/Port_of_Spain',
  'America/Porto_Acre',
  'America/Porto_Velho',
  'America/Puerto_Rico',
  'America/Punta_Arenas',
  'America/Rainy_River',
  'America/Rankin_Inlet',
  'America/Recife',
  'America/Regina',
  'America/Resolute',
  'America/Rio_Branco',
  'America/Rosario',
  'America/Santa_Isabel',
  'America/Santarem',
  'America/Santiago',
  'America/Santo_Domingo',
  'America/Sao_Paulo',
  'America/Scoresbysund',
  'America/Shiprock',
  'America/Sitka',
  'America/St_Barthelemy',
  'America/St_Johns',
  'America/St_Kitts',
  'America/St_Lucia',
  'America/St_Thomas',
  'America/St_Vincent',
  'America/Swift_Current',
  'America/Tegucigalpa',
  'America/Thule',
  'America/Thunder_Bay',
  'America/Tijuana',
  'America/Toronto',
  'America/Tortola',
  'America/Vancouver',
  'America/Virgin',
  'America/Whitehorse',
  'America/Winnipeg',
  'America/Yakutat',
  'America/Yellowknife',
  'Antarctica/Casey',
  'Antarctica/Davis',
  'Antarctica/DumontDUrville',
  'Antarctica/Macquarie',
  'Antarctica/Mawson',
  'Antarctica/McMurdo',
  'Antarctica/Palmer',
  'Antarctica/Rothera',
  'Antarctica/South_Pole',
  'Antarctica/Syowa',
  'Antarctica/Troll',
  'Antarctica/Vostok',
  'Arctic/Longyearbyen',
  'Asia/Aden',
  'Asia/Almaty',
  'Asia/Amman',
  'Asia/Anadyr',
  'Asia/Aqtau',
  'Asia/Aqtobe',
  'Asia/Ashgabat',
  'Asia/Ashkhabad',
  'Asia/Atyrau',
  'Asia/Baghdad',
  'Asia/Bahrain',
  'Asia/Baku',
  'Asia/Bangkok',
  'Asia/Barnaul',
  'Asia/Beirut',
  'Asia/Bishkek',
  'Asia/Brunei',
  'Asia/Calcutta',
  'Asia/Chita',
  'Asia/Choibalsan',
  'Asia/Chongqing',
  'Asia/Chungking',
  'Asia/Colombo',
  'Asia/Dacca',
  'Asia/Damascus',
  'Asia/Dhaka',
  'Asia/Dili',
  'Asia/Dubai',
  'Asia/Dushanbe',
  'Asia/Famagusta',
  'Asia/Gaza',
  'Asia/Harbin',
  'Asia/Hebron',
  'Asia/Ho_Chi_Minh',
  'Asia/Hong_Kong',
  'Asia/Hovd',
  'Asia/Irkutsk',
  'Asia/Istanbul',
  'Asia/Jakarta',
  'Asia/Jayapura',
  'Asia/Jerusalem',
  'Asia/Kabul',
  'Asia/Kamchatka',
  'Asia/Karachi',
  'Asia/Kashgar',
  'Asia/Kathmandu',
  'Asia/Katmandu',
  'Asia/Khandyga',
  'Asia/Kolkata',
  'Asia/Krasnoyarsk',
  'Asia/Kuala_Lumpur',
  'Asia/Kuching',
  'Asia/Kuwait',
  'Asia/Macao',
  'Asia/Macau',
  'Asia/Magadan',
  'Asia/Makassar',
  'Asia/Manila',
  'Asia/Muscat',
  'Asia/Nicosia',
  'Asia/Novokuznetsk',
  'Asia/Novosibirsk',
  'Asia/Omsk',
  'Asia/Oral',
  'Asia/Phnom_Penh',
  'Asia/Pontianak',
  'Asia/Pyongyang',
  'Asia/Qatar',
  'Asia/Qostanay',
  'Asia/Qyzylorda',
  'Asia/Rangoon',
  'Asia/Riyadh',
  'Asia/Saigon',
  'Asia/Sakhalin',
  'Asia/Samarkand',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Srednekolymsk',
  'Asia/Taipei',
  'Asia/Tashkent',
  'Asia/Tbilisi',
  'Asia/Tehran',
  'Asia/Tel_Aviv',
  'Asia/Thimbu',
  'Asia/Thimphu',
  'Asia/Tokyo',
  'Asia/Tomsk',
  'Asia/Ujung_Pandang',
  'Asia/Ulaanbaatar',
  'Asia/Ulan_Bator',
  'Asia/Urumqi',
  'Asia/Ust-Nera',
  'Asia/Vientiane',
  'Asia/Vladivostok',
  'Asia/Yakutsk',
  'Asia/Yangon',
  'Asia/Yekaterinburg',
  'Asia/Yerevan',
  'Atlantic/Azores',
  'Atlantic/Bermuda',
  'Atlantic/Canary',
  'Atlantic/Cape_Verde',
  'Atlantic/Faeroe',
  'Atlantic/Faroe',
  'Atlantic/Jan_Mayen',
  'Atlantic/Madeira',
  'Atlantic/Reykjavik',
  'Atlantic/South_Georgia',
  'Atlantic/St_Helena',
  'Atlantic/Stanley',
  'Australia/ACT',
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Broken_Hill',
  'Australia/Canberra',
  'Australia/Currie',
  'Australia/Darwin',
  'Australia/Eucla',
  'Australia/Hobart',
  'Australia/LHI',
  'Australia/Lindeman',
  'Australia/Lord_Howe',
  'Australia/Melbourne',
  'Australia/NSW',
  'Australia/North',
  'Australia/Perth',
  'Australia/Queensland',
  'Australia/South',
  'Australia/Sydney',
  'Australia/Tasmania',
  'Australia/Victoria',
  'Australia/West',
  'Australia/Yancowinna',
  'Brazil/Acre',
  'Brazil/DeNoronha',
  'Brazil/East',
  'Brazil/West',
  'CET',
  'CST6CDT',
  'Canada/Atlantic',
  'Canada/Central',
  'Canada/Eastern',
  'Canada/Mountain',
  'Canada/Newfoundland',
  'Canada/Pacific',
  'Canada/Saskatchewan',
  'Canada/Yukon',
  'Chile/Continental',
  'Chile/EasterIsland',
  'Cuba',
  'EET',
  'EST',
  'EST5EDT',
  'Egypt',
  'Eire',
  'Etc/GMT',
  'Etc/GMT+0',
  'Etc/GMT+1',
  'Etc/GMT+10',
  'Etc/GMT+11',
  'Etc/GMT+12',
  'Etc/GMT+2',
  'Etc/GMT+3',
  'Etc/GMT+4',
  'Etc/GMT+5',
  'Etc/GMT+6',
  'Etc/GMT+7',
  'Etc/GMT+8',
  'Etc/GMT+9',
  'Etc/GMT-0',
  'Etc/GMT-1',
  'Etc/GMT-10',
  'Etc/GMT-11',
  'Etc/GMT-12',
  'Etc/GMT-13',
  'Etc/GMT-14',
  'Etc/GMT-2',
  'Etc/GMT-3',
  'Etc/GMT-4',
  'Etc/GMT-5',
  'Etc/GMT-6',
  'Etc/GMT-7',
  'Etc/GMT-8',
  'Etc/GMT-9',
  'Etc/GMT0',
  'Etc/Greenwich',
  'Etc/UCT',
  'Etc/UTC',
  'Etc/Universal',
  'Etc/Zulu',
  'Europe/Amsterdam',
  'Europe/Andorra',
  'Europe/Astrakhan',
  'Europe/Athens',
  'Europe/Belfast',
  'Europe/Belgrade',
  'Europe/Berlin',
  'Europe/Bratislava',
  'Europe/Brussels',
  'Europe/Bucharest',
  'Europe/Budapest',
  'Europe/Busingen',
  'Europe/Chisinau',
  'Europe/Copenhagen',
  'Europe/Dublin',
  'Europe/Gibraltar',
  'Europe/Guernsey',
  'Europe/Helsinki',
  'Europe/Isle_of_Man',
  'Europe/Istanbul',
  'Europe/Jersey',
  'Europe/Kaliningrad',
  'Europe/Kiev',
  'Europe/Kirov',
  'Europe/Lisbon',
  'Europe/Ljubljana',
  'Europe/London',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Malta',
  'Europe/Mariehamn',
  'Europe/Minsk',
  'Europe/Monaco',
  'Europe/Moscow',
  'Europe/Nicosia',
  'Europe/Oslo',
  'Europe/Paris',
  'Europe/Podgorica',
  'Europe/Prague',
  'Europe/Riga',
  'Europe/Rome',
  'Europe/Samara',
  'Europe/San_Marino',
  'Europe/Sarajevo',
  'Europe/Saratov',
  'Europe/Simferopol',
  'Europe/Skopje',
  'Europe/Sofia',
  'Europe/Stockholm',
  'Europe/Tallinn',
  'Europe/Tirane',
  'Europe/Tiraspol',
  'Europe/Ulyanovsk',
  'Europe/Uzhgorod',
  'Europe/Vaduz',
  'Europe/Vatican',
  'Europe/Vienna',
  'Europe/Vilnius',
  'Europe/Volgograd',
  'Europe/Warsaw',
  'Europe/Zagreb',
  'Europe/Zaporozhye',
  'Europe/Zurich',
  'GB',
  'GB-Eire',
  'GMT',
  'GMT+0',
  'GMT-0',
  'GMT0',
  'Greenwich',
  'HST',
  'Hongkong',
  'Iceland',
  'Indian/Antananarivo',
  'Indian/Chagos',
  'Indian/Christmas',
  'Indian/Cocos',
  'Indian/Comoro',
  'Indian/Kerguelen',
  'Indian/Mahe',
  'Indian/Maldives',
  'Indian/Mauritius',
  'Indian/Mayotte',
  'Indian/Reunion',
  'Iran',
  'Israel',
  'Jamaica',
  'Japan',
  'Kwajalein',
  'Libya',
  'MET',
  'MST',
  'MST7MDT',
  'Mexico/BajaNorte',
  'Mexico/BajaSur',
  'Mexico/General',
  'NZ',
  'NZ-CHAT',
  'Navajo',
  'PRC',
  'PST8PDT',
  'Pacific/Apia',
  'Pacific/Auckland',
  'Pacific/Bougainville',
  'Pacific/Chatham',
  'Pacific/Chuuk',
  'Pacific/Easter',
  'Pacific/Efate',
  'Pacific/Enderbury',
  'Pacific/Fakaofo',
  'Pacific/Fiji',
  'Pacific/Funafuti',
  'Pacific/Galapagos',
  'Pacific/Gambier',
  'Pacific/Guadalcanal',
  'Pacific/Guam',
  'Pacific/Honolulu',
  'Pacific/Johnston',
  'Pacific/Kiritimati',
  'Pacific/Kosrae',
  'Pacific/Kwajalein',
  'Pacific/Majuro',
  'Pacific/Marquesas',
  'Pacific/Midway',
  'Pacific/Nauru',
  'Pacific/Niue',
  'Pacific/Norfolk',
  'Pacific/Noumea',
  'Pacific/Pago_Pago',
  'Pacific/Palau',
  'Pacific/Pitcairn',
  'Pacific/Pohnpei',
  'Pacific/Ponape',
  'Pacific/Port_Moresby',
  'Pacific/Rarotonga',
  'Pacific/Saipan',
  'Pacific/Samoa',
  'Pacific/Tahiti',
  'Pacific/Tarawa',
  'Pacific/Tongatapu',
  'Pacific/Truk',
  'Pacific/Wake',
  'Pacific/Wallis',
  'Pacific/Yap',
  'Poland',
  'Portugal',
  'ROC',
  'ROK',
  'Singapore',
  'Turkey',
  'UCT',
  'US/Alaska',
  'US/Aleutian',
  'US/Arizona',
  'US/Central',
  'US/East-Indiana',
  'US/Eastern',
  'US/Hawaii',
  'US/Indiana-Starke',
  'US/Michigan',
  'US/Mountain',
  'US/Pacific',
  'US/Pacific-New',
  'US/Samoa',
  'UTC',
  'Universal',
  'W-SU',
  'WET',
  'Zulu' ];

var moment$1 = window.moment;

exports.userFacingText({
  preferences: {
    locale: 'Locale',
    preferences: 'Preferences',
    preferencesSaved: 'Preferences Saved',
    save: 'Save',
    timezone: 'Timezone',
  },
});

var localStorageKey = 'hx_preferences';

var LocalStoragePreferencesStore = {
  save: function save(prefs, cb) {
    localStorage.setItem(localStorageKey, prefs);
    return cb();
  },
  load: function load(cb) {
    return cb(undefined, localStorage.getItem(localStorageKey));
  },
};

function defaultTimezoneLookup(offset) {
  var modifier = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var minutes = absOffset % 60;
  var hours = (absOffset - minutes) / 60;
  return ("UTC" + modifier + (exports.zeroPad(hours)) + ":" + (exports.zeroPad(minutes)));
}

function getLocaleObject(locale, localeObjects) {
  return localeObjects.find(function (l) { return l.full.toLowerCase() === locale.toLowerCase()
    || l.value.toLowerCase() === locale.toLowerCase(); });
}

function validateLocales(locales, localeObjects) {
  return locales.filter(function (loc) { return !getLocaleObject(loc, localeObjects); });
}

function validateTimezones(timezones, timezoneList) {
  return timezones.filter(function (timezone) { return !timezoneList
    .find(function (tz) { return tz.toLowerCase() === timezone.toLowerCase(); }); });
}

function defaultTZOffsetLookup(timezone) {
  var stampParts = timezone.replace('UTC', '').replace('+', '').replace('-0', '-').split(':')
    .map(Number);
  return stampParts[0] + (stampParts[0] >= 0 ? stampParts[1] / 60 : -(stampParts[1] / 60));
}

function IntlTZOffsetLookup(timeZone, dateMs) {
  var utcFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  var tzFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: timeZone,
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  var dateForDiff = new Date(dateMs || Date.now());

  var ref = tzFormatter.formatToParts(dateForDiff);
  var tzDay = ref[0].value;
  var tzMonth = ref[2].value;
  var tzYear = ref[4].value;
  var tzHour = ref[6].value;
  var tzMinute = ref[8].value;

  var ref$1 = utcFormatter.formatToParts(dateForDiff);
  var utcDay = ref$1[0].value;
  var utcMonth = ref$1[2].value;
  var utcYear = ref$1[4].value;
  var utcHour = ref$1[6].value;
  var utcMinute = ref$1[8].value;

  var utcMs = Date.UTC(utcYear, utcMonth, utcDay, utcHour, utcMinute);
  var tzMs = Date.UTC(tzYear, tzMonth, tzDay, tzHour, tzMinute);

  var hourMs = 1000 * 60 * 60;

  var diff = (tzMs - utcMs) / hourMs;
  return diff;
}

var Preferences = /*@__PURE__*/(function (EventEmitter) {
  function Preferences() {
    EventEmitter.call(this);
    this.setup();
  }

  if ( EventEmitter ) Preferences.__proto__ = EventEmitter;
  Preferences.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Preferences.prototype.constructor = Preferences;

  Preferences.prototype.setup = function setup (options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

    var overrides;
    if (options.featureFlags && options.featureFlags.useIntlFormat && (typeof Intl === 'undefined' || Intl === null)) {
      logger.warn('preferences', 'Intl is not supported in this browser, use a polyfill to enable this feature. Setting "options.featureFlags.useIntlFormat" to false');
      overrides = {
        featureFlags: {
          useIntlFormat: false,
        },
      };
    }

    var defaults = {
      backingStore: LocalStoragePreferencesStore,
      supportedLocales: [],
      supportedTimezones: [],
      timezone: undefined,
      locale: undefined,
      featureFlags: {
        useIntlFormat: false,
      },
    };

    this.options = exports.merge(defaults, options, overrides);

    var useIntl = this.options.featureFlags.useIntlFormat;

    var timezoneListToUse = useIntl ? IANATimezoneList : defaultTimezoneList;
    var allLocaleObjects = useIntl ? RFC5456LocaleObjects : defaultLocaleObjects;
    var localeListToUse = useIntl ? RFC5456LocaleList : defaultLocaleList;

    var invalidLocales = validateLocales(this.options.supportedLocales, allLocaleObjects);

    var invalidTimezones = validateTimezones(this.options.supportedTimezones, timezoneListToUse);

    if (invalidLocales.length) {
      logger.warn('preferences.setup: supportedLocales', ("The provided locale(s) are not supported: " + (invalidLocales.join(', '))));
      this.options.supportedLocales = localeListToUse;
    }

    if (!this.options.supportedLocales.length) {
      this.options.supportedLocales = localeListToUse;
    }

    if (invalidTimezones.length) {
      logger.warn('preferences.setup: supportedTimezones', ("The provided timezone(s) are not supported: " + (invalidTimezones.join(', '))));
      this.options.supportedTimezones = timezoneListToUse;
    }

    if (!this.options.supportedTimezones.length) {
      this.options.supportedTimezones = timezoneListToUse;
    }

    var setupModal = function (element, thisModal) {
      var localeAutocompleteElement = detached('input').class('hx-preferences-locale');
      var localeValues = this$1.options.supportedLocales
        .map(function (loc) { return getLocaleObject(loc, allLocaleObjects); });

      var locAutocomplete = new exports.Autocomplete(
        localeAutocompleteElement.node(),
        localeValues,
        {
          renderer: function renderer(acElem, datum) {
            return select(acElem)
              .add(div('hx-compact-group')
                .add(div('hx-section')
                  .add(span().text(datum.full)))
                .add(div('hx-section hx-fixed')
                  .add(badge({ inverse: true }).classed('hx-margin-left', true).text(datum.value))));
          },
          inputMap: function inputMap(item) {
            return item.full;
          },
          showOtherResults: true,
          mustMatch: true,
          value: getLocaleObject(this$1.locale(), allLocaleObjects),
        }
      );
      var localeSection = div().add(detached('label').text(exports.userFacingText('preferences', 'locale'))).add(localeAutocompleteElement);

      var timezoneAutocompleteElement = detached('input').class('hx-preferences-timezone');
      var tzAutocomplete = new exports.Autocomplete(
        timezoneAutocompleteElement.node(),
        this$1.options.supportedTimezones,
        {
          showOtherResults: true,
          mustMatch: true,
          value: this$1.timezone(),
        }
      );
      var timezoneSection = div().add(detached('label').text(exports.userFacingText('preferences', 'timezone'))).add(timezoneAutocompleteElement);

      var saveButton = detached('button').class('hx-preferences-save hx-btn hx-positive')
        .add(detached('i').class('hx-icon hx-icon-check'))
        .add(detached('span').text((" " + (exports.userFacingText('preferences', 'save')))))
        .on('click', function () {
          this$1.locale(locAutocomplete.value());
          this$1.timezone(tzAutocomplete.value());
          return this$1.save(function (err) {
            if (err) {
              return exports.notifyNegative(err);
            }
            exports.notifyPositive(exports.userFacingText('preferences', 'preferencesSaved'));
            return thisModal.hide();
          });
        });

      return select(element).append('div').class('hx-form').add(localeSection)
        .add(timezoneSection)
        .add(saveButton);
    };

    var modal = new ModalBase(exports.userFacingText('preferences', 'preferences'), setupModal);
    this._ = {
      timezoneOffsetLookup: useIntl ? IntlTZOffsetLookup : defaultTZOffsetLookup,
      preferences: {},
      modal: modal,
      localeListToUse: localeListToUse,
      allLocaleObjects: allLocaleObjects,
      timezoneListToUse: timezoneListToUse,
      useIntl: useIntl,
    };
    if (useIntl) {
      var ref = new Intl.DateTimeFormat().resolvedOptions();
      var locale = ref.locale;
      var timeZone = ref.timeZone;
      this.locale(this.options.locale || locale);
      this.timezone(this.options.timezone || timeZone);
      return;
    }

    var defaultLocaleId = (navigator.languages && navigator.languages[0]) || navigator.language;
    if (!(exports.isString(defaultLocaleId) && getLocaleObject(defaultLocaleId, allLocaleObjects))) {
      defaultLocaleId = 'en';
    }
    this.locale(defaultLocaleId);

    var guessedMomentTimezone = moment$1 && moment$1.tz && moment$1.tz.guess();
    if (guessedMomentTimezone != null) {
      this.supportedTimezones(moment$1.tz.names());
      this.timezoneOffsetLookup(
        function (timezone, timestamp) { return -(moment$1.tz.zone(timezone).offset(timestamp) / 60); }
      );
      this.timezone(guessedMomentTimezone);
      return;
    }
    this.timezone(defaultTimezoneLookup((new Date()).getTimezoneOffset()));
  };

  Preferences.prototype.timezone = function timezone (timezone$1) {
    if (arguments.length > 0) {
      if (this.isTimezoneSupported(timezone$1)) {
        if (this.options.timezone !== timezone$1) {
          this.options.timezone = timezone$1;
          this.emit('timezonechange', timezone$1);
        }
      } else {
        logger.warn('preferences.timezone:', (timezone$1 + " is not a valid timezone"));
      }
      return this;
    }
    return this.options.timezone;
  };

  Preferences.prototype.locale = function locale (locale$1) {
    if (arguments.length > 0) {
      // check that the locale being set is supported
      if (this.isLocaleSupported(locale$1)) {
        var localeObject = getLocaleObject(locale$1, this._.allLocaleObjects);
        if (this.options.locale !== localeObject.value) {
          this.options.locale = localeObject.value;
          // moment doesn't look up the 'default' locale so we set it here
          // Moment issue: https://github.com/moment/moment/issues/2621
          if (typeof moment$1 !== 'undefined' && moment$1 !== null) {
            moment$1.locale(localeObject.value);
          }
          this.emit('localechange', localeObject.value);
        }
      } else {
        logger.warn('preferences.locale', (locale$1 + " is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon"));
      }
      return this;
    }
    return this.options.locale;
  };

  Preferences.prototype.isTimezoneSupported = function isTimezoneSupported (timeZone) {
    return exports.isString(timeZone)
      && this.options.supportedTimezones.find(function (tz) { return tz.toLowerCase() === timeZone.toLowerCase(); });
  };

  Preferences.prototype.isLocaleSupported = function isLocaleSupported (locale) {
    return exports.isString(locale)
      && this.options.supportedLocales.find(function (lc) { return lc.toLowerCase() === locale.toLowerCase(); });
  };

  Preferences.prototype.getTimezoneOffset = function getTimezoneOffset (date, timezoneOrOffset) {
    var numericOffset = Number(timezoneOrOffset);

    if (timezoneOrOffset && Number.isNaN(numericOffset)) {
      return this._.timezoneOffsetLookup(timezoneOrOffset, date.getTime());
    }
    if (!Number.isNaN(numericOffset)) {
      return numericOffset;
    }
    return this._.timezoneOffsetLookup(this.timezone(), date.getTime());
  };

  Preferences.prototype.applyTimezoneOffset = function applyTimezoneOffset (date, timezoneOrOffset, inverse) {
    var offset = this.getTimezoneOffset(date, timezoneOrOffset);
    var timezoneOffsetMS = offset * 60 * 60 * 1000 * (inverse ? -1 : 1);
    var browserOffsetMS = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() + timezoneOffsetMS + browserOffsetMS);
  };


  // sets the backingStore to use - currently the only one available is localStorage
  // getting the backingStore should not be possible
  Preferences.prototype.backingStore = function backingStore (backingStore$1) {
    if (backingStore$1 != null) {
      this.options.backingStore = backingStore$1;
    }
    return this;
  };

  // saves the preferences
  Preferences.prototype.save = function save (cb) {
    var e;
    try {
      var ref = this.options;
      var locale = ref.locale;
      var timezone = ref.timezone;
      var prefs = { locale: locale, timezone: timezone };
      return this.options.backingStore.save(JSON.stringify(prefs), function (err) { return (typeof cb === 'function' ? cb(err) : undefined); });
    } catch (error) {
      e = error;
      return typeof cb === 'function' ? cb(e) : undefined;
    }
  };

  // loads the preferences
  Preferences.prototype.load = function load (cb) {
    var this$1 = this;

    var e;
    try {
      return this.options.backingStore.load(function (err, prefs) {
        if (prefs != null) {
          var ref = JSON.parse(prefs);
          var locale = ref.locale;
          var timezone = ref.timezone;
          this$1.timezone(timezone);
          this$1.locale(locale);
        }
        return typeof cb === 'function' ? cb(err) : undefined;
      });
    } catch (error) {
      e = error;
      return typeof cb === 'function' ? cb(e) : undefined;
    }
  };

  // shows the standard preferences modal
  Preferences.prototype.show = function show () {
    this._.modal.show();
    return this;
  };

  Preferences.prototype.timezoneOffsetLookup = function timezoneOffsetLookup (value) {
    if (arguments.length > 0) {
      this._.timezoneOffsetLookup = value;
      return this;
    }
    return this._.timezoneOffsetLookup;
  };

  return Preferences;
}(EventEmitter));

function option(name) {
  return function optionSetterGetter(value) {
    if (arguments.length > 0) {
      this.options[name] = value;
      return this;
    }
    return this.options[name];
  };
}


// sets the locales this app supports
Preferences.prototype.supportedLocales = option('supportedLocales');
Preferences.prototype.supportedTimezones = option('supportedTimezones');

var preferences = new Preferences();

// XXX Deprecated: Remove this in favour of proper import reference
preferences.localStorageStore = LocalStoragePreferencesStore;

exports.userFacingText({
  'date-localizer': {
    today: 'Today',
  },
});

function isNumeric(stringOrNumber) {
  return !Number.isNaN(Number(stringOrNumber));
}

var PreferencesHandler = /*@__PURE__*/(function (EventEmitter) {
  function PreferencesHandler() {
    var this$1 = this;

    EventEmitter.call(this);
    this._ = {
      uniqueId: exports.randomId(),
    };
    preferences.on('localechange', ("hx.date-time-localizer" + (this._.uniqueId)), function () {
      if (!this$1._.instanceLocale) {
        this$1.emit('localechange', {
          cause: 'api',
          value: preferences.locale(),
        });
      }
    });
    preferences.on('timezonechange', ("hx.date-time-localizer" + (this._.uniqueId)), function () {
      if (!this$1._.instanceTimezone) {
        this$1.emit('timezonechange', {
          cause: 'api',
          value: preferences.timezone(),
        });
      }
    });
  }

  if ( EventEmitter ) PreferencesHandler.__proto__ = EventEmitter;
  PreferencesHandler.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  PreferencesHandler.prototype.constructor = PreferencesHandler;

  PreferencesHandler.prototype.locale = function locale (locale$1) {
    if (arguments.length) {
      if ((locale$1 == null) || preferences.isLocaleSupported(locale$1)) {
        this._.instanceLocale = !!locale$1;
        this._.locale = locale$1;
        this.emit('localechange', {
          cause: 'api',
          value: locale$1 || preferences.locale(),
        });
      } else {
        logger.warn((locale$1 + " is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon"));
      }
      return this;
    }
    return this._.locale || preferences.locale();
  };

  PreferencesHandler.prototype.timezone = function timezone (timezone$1) {
    if (arguments.length) {
      if ((timezone$1 == null) || preferences.isTimezoneSupported(timezone$1)) {
        this._.instanceTimezone = !!timezone$1;
        this._.timezone = timezone$1;
        this.emit('timezonechange', {
          cause: 'api',
          value: timezone$1 || preferences.timezone(),
        });
      } else {
        logger.warn((timezone$1 + " is not a valid timezone"));
      }
      return this;
    }
    return this._.timezone || preferences.timezone();
  };

  return PreferencesHandler;
}(EventEmitter));

/* eslint-disable class-methods-use-this */
var DateTimeLocalizer = /*@__PURE__*/(function (PreferencesHandler) {
  function DateTimeLocalizer () {
    PreferencesHandler.apply(this, arguments);
  }

  if ( PreferencesHandler ) DateTimeLocalizer.__proto__ = PreferencesHandler;
  DateTimeLocalizer.prototype = Object.create( PreferencesHandler && PreferencesHandler.prototype );
  DateTimeLocalizer.prototype.constructor = DateTimeLocalizer;

  DateTimeLocalizer.prototype.dateOrder = function dateOrder () {
    return ['DD', 'MM', 'YYYY'];
  };

  // get the day the week starts on, 0 for sunday, 1 for monday etc.
  DateTimeLocalizer.prototype.weekStart = function weekStart () {
    return 1;
  };

  // localise the days of the week and return as array of 2 char days ('Su', 'Mo' etc.)
  DateTimeLocalizer.prototype.weekDays = function weekDays () {
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  };

  // localise 'today' text
  DateTimeLocalizer.prototype.todayText = function todayText () {
    return exports.userFacingText('date-localizer', 'today');
  };

  // localise the day of the month and optionally zero pad (01, 02)
  DateTimeLocalizer.prototype.day = function day (day$1, pad) {
    if (pad) {
      return exports.zeroPad(day$1);
    }
    return day$1;
  };

  // localise the month in the format of mmm (Jan, Feb etc.) or 01, 02 etc.
  DateTimeLocalizer.prototype.month = function month (month$1, short) {
    if (short) {
      return exports.zeroPad(month$1 + 1);
    }
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month$1];
  };

  DateTimeLocalizer.prototype.fullMonth = function fullMonth (month) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
  };

  // localise the full year in the format of yyyy
  DateTimeLocalizer.prototype.year = function year (year$1) {
    return year$1;
  };

  // localise a date object to return a date string of dd/mm/yyyy (or localised format)
  DateTimeLocalizer.prototype.date = function date (date$1, useInbuilt) {
    if (useInbuilt) {
      return ((date$1.getFullYear()) + "-" + (exports.zeroPad(date$1.getMonth() + 1)) + "-" + (exports.zeroPad(date$1.getDate())));
    }
    return ((exports.zeroPad(date$1.getDate())) + "/" + (exports.zeroPad(date$1.getMonth() + 1)) + "/" + (date$1.getFullYear()));
  };

  // localise a date object to return a time string of hh:mm or hh:mm:ss (or localised format)
  DateTimeLocalizer.prototype.time = function time (date, showSeconds) {
    var timeString;
    var dateToUse = preferences.applyTimezoneOffset(date, this.timezone());
    timeString = (dateToUse.getHours()) + ":" + (exports.zeroPad(dateToUse.getMinutes()));
    if (showSeconds) {
      timeString += ":" + (exports.zeroPad(dateToUse.getSeconds()));
    }
    return timeString;
  };

  // check if a time is a valid time (time as array of [hh, mm, ss])
  DateTimeLocalizer.prototype.checkTime = function checkTime (time) {
    return isNumeric(time[0]) && isNumeric(time[1]) && isNumeric(time[2]);
  };

  // convert a localised date string back to a date object (unlocalise)
  DateTimeLocalizer.prototype.stringToDate = function stringToDate (dateString, useInbuilt) {
    var day;
    var i;
    var len;
    var month;
    var order;
    var part;
    var w;
    var year;

    var daysValid;
    var monthsValid;
    var yearsValid;

    var split;
    if (useInbuilt) {
      order = ['YYYY', 'MM', 'DD'];
      split = dateString.split('-');
    } else {
      order = this.dateOrder();
      split = dateString.split('/');
    }
    var allValid = split.length === 3 && !split.some(function (e) { return e === '' || e === '0'; });
    if (allValid) {
      for (i = 0, len = order.length; i < len; i += 1) {
        w = order[i];
        part = split[i];
        switch (w) {
          case 'DD':
            daysValid = part.length < 3 && part !== '';
            day = Number(split[i]);
            break;
          case 'MM':
            monthsValid = part.length < 3 && part !== '';
            month = Number(split[i]);
            break;
          case 'YYYY':
            yearsValid = part.length < 5 && part !== '';
            year = Number(split[i]);
            if (year.toString().length === 2) {
              year += 2000;
            }
            break;
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        return new Date(Date.UTC(year, month - 1, day));
      }
      return new Date('Invalid Date');
    }
    return new Date('Invalid Date');
  };

  return DateTimeLocalizer;
}(PreferencesHandler));

var IntlDateTimeLocalizer = /*@__PURE__*/(function (PreferencesHandler) {
  function IntlDateTimeLocalizer() {
    var this$1 = this;

    PreferencesHandler.call(this);
    this.on('localechange', function () { return this$1.setupFormatters(); });
    this.on('timezonechange', function () { return this$1.setupFormatters(); });
    this.setupFormatters();
  }

  if ( PreferencesHandler ) IntlDateTimeLocalizer.__proto__ = PreferencesHandler;
  IntlDateTimeLocalizer.prototype = Object.create( PreferencesHandler && PreferencesHandler.prototype );
  IntlDateTimeLocalizer.prototype.constructor = IntlDateTimeLocalizer;

  IntlDateTimeLocalizer.prototype.setupFormatters = function setupFormatters () {
    var this$1 = this;

    var locale = this.locale();
    var timeZone = this.timezone();

    var weekDay = new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      weekday: 'narrow',
    });

    var month = new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      month: 'short',
    });

    var fullMonth = new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      month: 'long',
    });

    var year = new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      year: 'numeric',
    });

    var date = new Intl.DateTimeFormat(locale, {
      timeZone: timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    var gbDate = new Intl.DateTimeFormat('en-GB', {
      timeZone: timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    var time = new Intl.DateTimeFormat(locale, {
      timeZone: timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    var timeWithSeconds = new Intl.DateTimeFormat(locale, {
      timeZone: timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    var dateOrderYear = '2019';
    var dateOrderMonth = '05';
    var dateOrderDay = '08';

    function getDateOrder(dateString) {
      var yearIndex = dateString.indexOf(dateOrderYear);
      var monthIndex = dateString.indexOf(dateOrderMonth);
      var dayIndex = dateString.indexOf(dateOrderDay);
      var result = [];
      for (var i = 0; i < dateString.length; i += 1) {
        switch (i) {
          case yearIndex:
            result.push('YYYY');
            break;
          case monthIndex:
            result.push('MM');
            break;
          case dayIndex:
            result.push('DD');
            break;
        }
      }
      if (result.length === 0) {
        result = ['DD', 'MM', 'YYYY'];
      }
      return result;
    }

    var staticDate = new Date(Date.UTC(
      Number(dateOrderYear),
      Number(dateOrderMonth) - 1,
      Number(dateOrderDay),
      12
    ));

    var dateOrder = getDateOrder(date.format(staticDate));
    var ref = date.formatToParts(staticDate);
    var dateSeparator = ref[1].value;

    // 2019-05-19 is a Sunday
    var weekDays = exports.range(7).map(function (_, i) { return weekDay
      .format(new Date(Date.UTC(2019, 4, 19 + this$1.weekStart() + i, 12))); });

    var months = exports.range(12).map(function (_, i) { return month.format(new Date(Date.UTC(2019, i, 1))); });
    var fullMonths = exports.range(12).map(function (_, i) { return fullMonth.format(new Date(Date.UTC(2019, i, 1))); });
    this._.formatters = {
      year: year,
      date: date,
      time: time,
      timeWithSeconds: timeWithSeconds,
      gbDate: gbDate,
    };
    this._.constants = {
      weekDays: weekDays,
      months: months,
      fullMonths: fullMonths,
      dateOrder: dateOrder,
      dateSeparator: dateSeparator,
    };
    return this;
  };

  // get the display order for the date so dates can be displayed correctly when localised
  IntlDateTimeLocalizer.prototype.dateOrder = function dateOrder () {
    return this._.constants.dateOrder;
  };

  // get the day the week starts on, 0 for sunday, 1 for monday etc.
  IntlDateTimeLocalizer.prototype.weekStart = function weekStart () {
    return 1;
  };

  // localise the days of the week and return as array of 2 char days ('Su', 'Mo' etc.)
  IntlDateTimeLocalizer.prototype.weekDays = function weekDays () {
    return this._.constants.weekDays;
  };

  // localise 'today' text
  IntlDateTimeLocalizer.prototype.todayText = function todayText () {
    return exports.userFacingText('date-localizer', 'today');
  };

  // localise the day of the month and optionally zero pad (01, 02)
  IntlDateTimeLocalizer.prototype.day = function day (day$1, pad) {
    if (pad) {
      return exports.zeroPad(day$1);
    }
    return day$1;
  };

  // localise the month in the format of mmm (Jan, Feb etc.) or 01, 02 etc.
  IntlDateTimeLocalizer.prototype.month = function month (month$1, numeric) {
    if (numeric) {
      return exports.zeroPad(month$1 + 1);
    }
    return this._.constants.months[month$1];
  };

  IntlDateTimeLocalizer.prototype.fullMonth = function fullMonth (month) {
    return this._.constants.fullMonths[month];
  };

  // localise the full year in the format of yyyy
  IntlDateTimeLocalizer.prototype.year = function year (year$1) {
    return this._.formatters.year.format(new Date(Date.UTC(year$1, 0, 1, 12)));
  };

  IntlDateTimeLocalizer.prototype.date = function date (date$1, useInbuilt) {
    if (useInbuilt) {
      var ref = this._.formatters.gbDate.formatToParts(date$1);
      var day = ref[0].value;
      var month = ref[2].value;
      var year = ref[4].value;
      return (year + "-" + month + "-" + day);
    }
    return this._.formatters.date.format(date$1);
  };

  // localise a date object to return a time string of hh:mm or hh:mm:ss (or localised format)
  IntlDateTimeLocalizer.prototype.time = function time (date, showSeconds) {
    if (showSeconds) {
      return this._.formatters.timeWithSeconds.format(date);
    }
    return this._.formatters.time.format(date);
  };

  IntlDateTimeLocalizer.prototype.checkTime = function checkTime (time) {
    return isNumeric(time[0]) && isNumeric(time[1]) && isNumeric(time[2]);
  };

  // convert a localised date string back to a date object (unlocalise)
  IntlDateTimeLocalizer.prototype.stringToDate = function stringToDate (dateString, useInbuilt) {
    var daysValid;
    var monthsValid;
    var yearsValid;
    var year;
    var month;
    var day;
    var order;
    var split;
    if (useInbuilt) {
      order = ['YYYY', 'MM', 'DD'];
      split = dateString.split('-');
    } else {
      order = this.dateOrder();
      split = dateString.split(this._.constants.dateSeparator);
    }
    var allValid = split.length === 3 && !split.some(function (e) { return e === '' || e === '0'; });
    if (allValid) {
      for (var i = 0, len = order.length; i < len; i += 1) {
        var w = order[i];
        var part = split[i];
        switch (w) {
          case 'DD':
            daysValid = part.length < 3 && part !== '';
            day = Number(split[i]);
            break;
          case 'MM':
            monthsValid = part.length < 3 && part !== '';
            month = Number(split[i]);
            break;
          case 'YYYY':
            yearsValid = part.length < 5 && part !== '';
            year = Number(split[i]);
            if (year.toString().length === 2) {
              year += 2000;
            }
            break;
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        var convertedDate = new Date(Date.UTC(year, month - 1, day));
        var timezoneOffset = preferences.getTimezoneOffset(convertedDate, this.timezone());
        return new Date(convertedDate.getTime() - (timezoneOffset * 1000 * 60 * 60));
      }
      return new Date('Invalid Date');
    }
    return new Date('Invalid Date');
  };

  return IntlDateTimeLocalizer;
}(PreferencesHandler));

var DateTimeLocalizerMoment = /*@__PURE__*/(function (PreferencesHandler) {
  function DateTimeLocalizerMoment () {
    PreferencesHandler.apply(this, arguments);
  }

  if ( PreferencesHandler ) DateTimeLocalizerMoment.__proto__ = PreferencesHandler;
  DateTimeLocalizerMoment.prototype = Object.create( PreferencesHandler && PreferencesHandler.prototype );
  DateTimeLocalizerMoment.prototype.constructor = DateTimeLocalizerMoment;

  DateTimeLocalizerMoment.prototype.dateOrder = function dateOrder () {
    var date = moment({
      year: 2003,
      month: 11,
      day: 22,
    }).locale(this.locale());
    var dateCheck = date.format('L');
    var yearIndex = dateCheck.indexOf(date.format('YYYY'));
    var monthIndex = dateCheck.indexOf(date.format('MM'));
    var dayIndex = dateCheck.indexOf(date.format('DD'));
    var result = [];
    for (var i = 0; i < dateCheck.length; i += 1) {
      switch (i) {
        case yearIndex:
          result.push('YYYY');
          break;
        case monthIndex:
          result.push('MM');
          break;
        case dayIndex:
          result.push('DD');
          break;
      }
    }
    if (result.length === 0) {
      result = ['DD', 'MM', 'YYYY'];
    }
    return result;
  };

  DateTimeLocalizerMoment.prototype.weekStart = function weekStart () {
    return moment().locale(this.locale()).weekday(0).toDate()
      .getDay();
  };

  DateTimeLocalizerMoment.prototype.weekDays = function weekDays () {
    var dayDate = moment().weekday(0);
    dayDate.locale(this.locale());
    var dayNames = [dayDate.format('dd')];
    for (var i = 0; i < 6; i += 1) {
      dayNames.push(dayDate.add(1, 'd').format('dd'));
    }
    return dayNames;
  };

  DateTimeLocalizerMoment.prototype.todayText = function todayText () {
    var today = moment({
      hour: 12,
      minute: 0,
      second: 0,
    }).locale(this.locale());
    var tomorrow = today.clone().add(1, 'day');
    var todayArr = today.calendar().split('').reverse();
    var tomorrowArr = tomorrow.calendar().split('').reverse();
    var i;
    for (i = 0; i < todayArr.length; i += 1) {
      if (todayArr[i] !== tomorrowArr[i]) {
        break;
      }
    }
    todayArr.splice(0, i);
    return todayArr.reverse().join('');
  };

  DateTimeLocalizerMoment.prototype.day = function day (day$1, pad) {
    return moment({
      day: day$1,
      month: 0,
    }).locale(this.locale()).format(pad ? 'DD' : 'D');
  };

  DateTimeLocalizerMoment.prototype.month = function month (month$1, short) {
    return moment({
      month: month$1,
    }).locale(this.locale()).format(short ? 'MM' : 'MMM');
  };

  DateTimeLocalizerMoment.prototype.fullMonth = function fullMonth (month) {
    return moment({
      month: month,
    }).locale(this.locale()).format('MMMM');
  };

  DateTimeLocalizerMoment.prototype.year = function year (year$1) {
    return moment({
      year: year$1,
    }).locale(this.locale()).format('YYYY');
  };

  DateTimeLocalizerMoment.prototype.decade = function decade (start, end) {
    return ((this.year(start)) + " - " + (this.year(end)));
  };

  DateTimeLocalizerMoment.prototype.date = function date (date$1) {
    return moment(date$1).locale(this.locale()).format('L');
  };

  DateTimeLocalizerMoment.prototype.time = function time (date, showSeconds) {
    var dateToUse = preferences.applyTimezoneOffset(date, this.timezone());
    var format = showSeconds ? 'H:mm:ss' : 'H:mm';
    return moment(dateToUse).locale(this.locale()).format(format);
  };

  DateTimeLocalizerMoment.prototype.checkTime = function checkTime (time) {
    return moment({
      hours: time[0],
      minutes: time[1],
      seconds: time[2],
    }).locale(this.locale()).isValid();
  };

  DateTimeLocalizerMoment.prototype.stringToDate = function stringToDate (dateString) {
    var daysValid;
    var monthsValid;
    var yearsValid;
    var fmt = '';
    var order = this.dateOrder();
    var split = dateString.split('/');
    var allValid = split.length === 3 && !split.some(function (e) { return e === '' || e === '0'; });
    if (allValid) {
      for (var i = 0, len = order.length; i < len; i += 1) {
        var w = order[i];
        var part = split[i];
        switch (w) {
          case 'DD':
            daysValid = part.length < 3 && part !== '';
            fmt += 'DD';
            break;
          case 'MM':
            monthsValid = part.length < 3 && part !== '';
            fmt += 'MM';
            break;
          case 'YYYY':
            yearsValid = part.length < 5 && part !== '';
            fmt += 'YYYY';
            break;
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        return moment(dateString, fmt, this.locale()).toDate();
      }
      return new Date('Invalid Date');
    }
    return new Date('Invalid Date');
  };

  return DateTimeLocalizerMoment;
}(PreferencesHandler));

// XXX: [2.0.0] this doesn't need to be a function
function dateTimeLocalizer() {
  if (typeof moment !== 'undefined' && moment !== null) {
    return new DateTimeLocalizerMoment();
  }
  return new DateTimeLocalizer();
}

exports.ColorScale = (function() {
  var setFactor;

  var ColorScale = function ColorScale(domainMin, domainMax, rangeArr) {
    if ( domainMin === void 0 ) domainMin = 0;
    if ( domainMax === void 0 ) domainMax = 10;

    this.domainMin = domainMin;
    this.domainMax = domainMax;
    this.rangeArr = rangeArr;
    this.rangeArr = this.rangeArr.sort(function(a, b) {
      return a.val - b.val;
    });
    this.rangeMin = this.rangeArr[0].val;
    this.rangeMax = this.rangeArr[this.rangeArr.length - 1].val;
    this.factor = setFactor(this.domainMin, this.domainMax, this.rangeMin, this.rangeMax);
  };

  ColorScale.prototype.apply = function apply (v) {
    var col, i, j, m, mDiff, percentage, point, pointDiff, ref;
    m = this.rangeMin + (v - this.domainMin) * this.factor;
    switch (false) {
      case !(m < this.rangeMin):
        col = this.rangeArr[0].color;
        break;
      case !(m > this.rangeMax):
        col = this.rangeArr[this.rangeArr.length - 1].color;
        break;
      default:
        for (i = j = 0, ref = this.rangeArr.length - 1; j < ref; i = j += 1) {
          if ((m >= this.rangeArr[i].val) && (m <= this.rangeArr[i + 1].val)) {
            point = i + 1;
            break;
          }
        }
        mDiff = m - this.rangeArr[point - 1].val;
        pointDiff = this.rangeArr[point].val - this.rangeArr[point - 1].val;
        percentage = exports.clamp(0, 1, mDiff / pointDiff);
        col = color(this.rangeArr[point - 1].color).mix(color(this.rangeArr[point].color), percentage);
    }
    return col.toString();
  };

  ColorScale.prototype.domain = function domain (start, end) {
    this.domainMin = start;
    this.domainMax = end;
    this.factor = setFactor(this.domainMin, this.domainMax, this.rangeMin, this.rangeMax);
    return this;
  };

  ColorScale.prototype.range = function range (range$1) {
    this.rangeArr = range$1;
    this.factor = setFactor(this.domainMin, this.domainMax, this.rangeMin, this.rangeMax);
    return this;
  };
  setFactor = function(dMin, dMax, rMin, rMax) {
    var den;
    den = dMax - dMin;
    if (den !== 0) {
      return (rMax - rMin) / den;
    } else {
      return 1;
    }
  };

  return ColorScale;

}).call(undefined);

// XXX: 2.0.0: this api has moved and has changed - document these changes
// - moved from fluid to spinner
// spinner.wide has become spinnerWide

function spinner() {
  return span('hx-spinner');
}

function spinnerWide() {
  return div('hx-spinner-wide');
}

// XXX Deprecated: Fluid
spinner.wide = spinnerWide;

var supportedTypes$1 = ['primary', 'secondary'];
var supportedSizes = ['small', 'micro'];

function dropdownButton(options) {
  var text = options.text;
  var type = options.type;
  var size = options.size;

  var forcedOptions = {
    renderer: actionRenderWrapper,
  };

  var opts = exports.merge({
    items: [],
  }, options, forcedOptions);

  if (!opts.items.length) {
    throw new Error('dropdownButton: Items are required when creating a dropdown button');
  }

  var validType = supportedTypes$1.includes(type);
  var validSize = supportedSizes.includes(size);

  if (type && !validType) {
    logger.warn(("dropdownButton: Called with an invalid type: '" + type + "'. Supported types: " + (supportedTypes$1.join(', '))));
  }
  if (size && !validSize) {
    logger.warn(("dropdownButton: Called with an invalid size: '" + size + "'. Supported sizes: " + (supportedSizes.join(', '))));
  }

  var sel = button('hx-btn hx-dropdown-button hx-flag-button')
    .classed(("hx-" + type), validType)
    .classed(("hx-btn-" + size), validSize);

  if (text) {
    sel.text(text);
  }

  new MenuBase(sel, opts);
  return sel;
}

var supportedSizes$1 = ['small', 'micro'];
function moreButton(options) {
  var text = options.text;
  var size = options.size;

  var forcedOptions = {
    renderer: actionRenderWrapper,
  };

  var opts = exports.merge({
    items: [],
    dropdownOptions: {
      align: 'rbrt',
    },
  }, options, forcedOptions);

  if (!opts.items.length) {
    throw new Error('moreButton: Items are required when creating a more button');
  }

  var validSize = supportedSizes$1.includes(size);

  if (size && !validSize) {
    logger.warn(("moreButton: Called with an invalid size: '" + size + "'. Supported sizes: " + (supportedSizes$1.join(', '))));
  }

  var sel = button('hx-btn hx-more-button hx-flag-button')
    .classed(("hx-btn-" + size), validSize);

  if (text) {
    sel.text(text);
  }

  new MenuBase(sel, opts);
  return sel;
}

function tooltip(ref) {
  if ( ref === void 0 ) ref = {};
  var icon = ref.icon;
  var label = ref.label;
  var text = ref.text;

  if (!text) {
    throw new Error('tooltip: No text provided for the tooltip');
  }

  if (icon && label) {
    throw new Error('tooltip: You can only use an icon or a label when creating a tooltip');
  }

  var tooltipParent = span(label ? 'hx-tooltip-label' : 'hx-tooltip-icon');
  var iconElement = icon ? i(icon) : undefined;


  tooltipParent.text(label);
  tooltipParent.add(iconElement);

  var ddText = div().text(text);

  var ddClass = icon
    ? 'hx-tooltip hx-tooltip-from-icon'
    : 'hx-tooltip hx-tooltip-from-label';

  new Dropdown(tooltipParent, ddText,
    {
      ddClass: ddClass,
      align: 'up',
      mode: 'hover',
      matchWidth: false,
    });

  return tooltipParent;
}

var filterNested, sortActive$1, sortItems, trimTrailingSpaces;

sortItems = function(valueLookup) {
  if ( valueLookup === void 0 ) valueLookup = exports.identity;

  return function(a, b) {
    return exports.compare(valueLookup(a), valueLookup(b));
  };
};

trimTrailingSpaces = function(term) {
  var newTerm;
  newTerm = term;
  while (newTerm.lastIndexOf(' ') === newTerm.length - 1) {
    newTerm = newTerm.slice(0, newTerm.length - 1);
  }
  return newTerm;
};

sortActive$1 = function(items) {
  var active, groupedActive, inactive;
  groupedActive = new Map(exports.groupBy(items, function(i) {
    return !i.disabled;
  }));
  active = groupedActive.get(true) || [];
  inactive = groupedActive.get(false) || [];
  return {active: active, inactive: inactive};
};

filterNested = function(items, term, filterName, filterOptions) {
  if (items.some(function(item) {
    var ref;
    return (ref = item.children) != null ? ref.length : void 0;
  })) {
    return items.reduce(function(acc, item) {
      var children, filterSingle;
      if (item.children) {
        children = filterNested(item.children, term, filterName, filterOptions);
        if (children.length) {
          return acc.concat( [Object.assign({}, item, {children: children})]);
        }
      }
      filterSingle = filter[filterName]([item], term, filterOptions);
      return acc.concat( filterSingle);
    }, []);
  } else {
    return filter[filterName](items, term, filterOptions);
  }
};

exports.AutocompleteFeed = /*@__PURE__*/(function () {
  function AutocompleteFeed(options) {
  if ( options === void 0 ) options = {};

    var defaults, resolvedOptions, self;
    self = this;
    defaults = {
      filter: void 0,
      filterOptions: void 0,
      matchType: 'contains',
      useCache: true,
      showOtherResults: false,
      trimTrailingSpaces: false,
      valueLookup: void 0
    };
    if (options.valueLookup != null) {
      // default searchValue if valueLookup is defined
      defaults.filterOptions = {
        searchValues: function(datum) {
          return [self._.options.valueLookup(datum)];
        }
      };
    }
    resolvedOptions = exports.mergeDefined(defaults, options);
    // defined here so we can use the resolved options
    if (resolvedOptions.filter == null) {
      resolvedOptions.filter = function(items, term) {
      var assign;

        var active, filterName, filtered, inactive;
        filterName = 'filter' + resolvedOptions.matchType[0].toUpperCase() + resolvedOptions.matchType.slice(1);
        filtered = filterNested(items, term, filterName, resolvedOptions.filterOptions);
        ((assign = sortActive$1(filtered), active = assign.active, inactive = assign.inactive));
        return active.concat( inactive);
      };
    }
    this._ = {
      options: resolvedOptions,
      resultsCache: new Map()
    };
  }

  AutocompleteFeed.prototype.clearCache = function clearCache () {
    this._.resultsCache = new Map();
    return this;
  };

  AutocompleteFeed.prototype.filter = function filter (term, callback) {
    var this$1 = this;

    var _, cacheItemsThenCallback, cacheditems, filterAndCallback, thisFilter;
    _ = this._;
    if (term === void 0) {
      return callback([]);
    } else {
      if (term == null) {
        term = '';
      }
      thisFilter = term + exports.randomId();
      _.lastFilter = thisFilter;
      cacheItemsThenCallback = function (results, otherResults) {
        if ( otherResults === void 0 ) otherResults = [];

        if (_.options.trimTrailingSpaces && results.length === 0 && term.lastIndexOf(' ') === term.length - 1) {
          // The term has trailing spaces and no results were found
          return this$1.filter(trimTrailingSpaces(term), callback);
        } else {
          // Cache the currently searched term items
          if (_.options.useCache) {
            _.resultsCache.set(term, {
              results: results,
              otherResults: otherResults
            });
          }
          // Only call back if this is the filter that was called last
          if (thisFilter === _.lastFilter) {
            return callback(results, otherResults);
          }
        }
      };
      if (_.options.useCache && _.resultsCache.has(term)) {
        // Get the result from the cache
        cacheditems = _.resultsCache.get(term);
        return callback(cacheditems.results, cacheditems.otherResults);
      } else if (_.options.matchType === 'external' && exports.isFunction(_.items)) {
        // The matching is external so we don't filter here
        return _.items(term, cacheItemsThenCallback);
      } else {
        filterAndCallback = function(unfilteredItems) {
          var assign;

          var active, filteredItems, inactive, otherResults, unpartitioned;
          filteredItems = _.options.filter(unfilteredItems, term);
          if (_.options.showOtherResults) {
            unpartitioned = unfilteredItems.filter(function(datum) {
              return filteredItems.indexOf(datum) === -1;
            }).sort(sortItems(_.options.valueLookup));
            ((assign = sortActive$1(unpartitioned), active = assign.active, inactive = assign.inactive));
            otherResults = active.concat( inactive);
          }
          return cacheItemsThenCallback(filteredItems, otherResults);
        };
        if (exports.isFunction(_.items)) {
          // Call the function then apply filtering
          return _.items(term, filterAndCallback);
        } else if (term.length) {
          // Apply filtering to the static object
          return filterAndCallback(_.items);
        } else {
          // Skip filtering and return the entire itemsset
          return cacheItemsThenCallback(_.items);
        }
      }
    }
  };

  AutocompleteFeed.prototype.validateItems = function validateItems (items) {
    return Array.isArray(items) || exports.isFunction(items);
  };

  AutocompleteFeed.prototype.items = function items (items$1) {
    // Validation should be external to the feed and show relevant error message(s)
    if (arguments.length) {
      this._.items = items$1;
      return this;
    } else {
      return this._.items;
    }
  };

  return AutocompleteFeed;
}());

var addHoldHandler, checkValue, getDisabled;

checkValue = function(value, min, max) {
  if (max !== void 0) {
    value = Math.min(value, max);
  }
  if (min !== void 0) {
    value = Math.max(value, min);
  }
  return value;
};

getDisabled = function(disabled, val, edge) {
  if (disabled || (val === edge)) {
    return 'disabled';
  } else {
    return void 0;
  }
};

addHoldHandler = function(incrementOnHold, incrementDelay, selection, incrementFn) {
  var clearTimers, holdStart, incrementTimeout;
  if (incrementOnHold) {
    holdStart = void 0;
    incrementTimeout = void 0;
    clearTimers = function() {
      clearTimeout(incrementTimeout);
      return incrementTimeout = void 0;
    };
    selection.on('pointerdown', 'hx.number-picker', function(e) {
      var fn, ref;
      holdStart = Date.now();
      if ((ref = document.activeElement) != null) {
        ref.blur();
      }
      e.event.preventDefault();
      fn = function() {
        incrementFn();
        return incrementTimeout = setTimeout(fn, incrementDelay);
      };
      return incrementTimeout = setTimeout(fn, 200);
    });
    selection.on('pointerup', 'hx.number-picker', function() {
      clearTimers();
      if ((Date.now() - holdStart) < 200) {
        return incrementFn();
      }
    });
    return selection.on('pointerleave', 'hx.number-picker', clearTimers);
  } else {
    return selection.on('click', 'hx.number-picker', incrementFn);
  }
};

var NumberPicker = /*@__PURE__*/(function (EventEmitter) {
  function NumberPicker(selector, options) {
    var this$1 = this;

    var decrementButton, incrementButton, selection;
    EventEmitter.call(this);
    this.selector = selector;
    this.options = exports.mergeDefined({
      buttonClass: '',
      min: void 0,
      max: void 0,
      disabled: false,
      value: 0,
      incrementOnHold: true,
      incrementDelay: 50,
      step: void 0
    }, options);
    this._ = {};
    selection = select(this.selector).class('hx-number-picker').api('number-picker', this).api(this);
    incrementButton = selection.append('button').attr('type', 'button').class('hx-number-picker-increment hx-btn ' + this.options.buttonClass);
    incrementButton.append('i').class('hx-icon hx-icon-chevron-up');
    addHoldHandler(this.options.incrementOnHold, this.options.incrementDelay, incrementButton, function () {
      return this$1.increment();
    });
    this.selectInput = selection.append('input').class('hx-number-picker-input');
    this.selectInput.attr('type', 'number');
    this.selectInput.on('blur', 'hx.number-picker', function () {
      if (this$1.selectInput.attr('readonly') === void 0) {
        this$1.value(void 0, this$1.selectInput.value());
        return this$1.emit('input-change', {
          value: this$1.value()
        });
      }
    });
    decrementButton = selection.append('button').attr('type', 'button').class('hx-number-picker-decrement hx-btn ' + this.options.buttonClass);
    decrementButton.append('i').class('hx-icon hx-icon-chevron-down');
    addHoldHandler(this.options.incrementOnHold, this.options.incrementDelay, decrementButton, function () {
      return this$1.decrement();
    });
    if (this.options.max !== void 0) {
      this.max(this.options.max);
    }
    if (this.options.min !== void 0) {
      this.min(this.options.min);
    }
    if (this.options.step !== void 0) {
      this.step(this.options.step);
    }
    if (this.options.disabled) {
      this.disabled(this.options.disabled);
    }
    this.value(this.options.value);
  }

  if ( EventEmitter ) NumberPicker.__proto__ = EventEmitter;
  NumberPicker.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  NumberPicker.prototype.constructor = NumberPicker;

  NumberPicker.prototype.value = function value (value$1, screenValue) {
    var newVal, prevValue, selection, valueToUse;
    if (arguments.length > 0) {
      prevValue = this.value();
      valueToUse = (value$1 == null) && screenValue ? Number(screenValue) : value$1;
      newVal = checkValue(valueToUse, this.min(), this.max());
      // If both value and screen value are defined, we set the input text to be the screen value
      // otherwise we use the provided value (as it is set via the input)
      this.selectInput.attr('type', 'text').attr('data-value', newVal).attr('readonly', screenValue && isNaN(screenValue) ? 'readonly' : void 0).value((value$1 != null) && (screenValue != null) ? screenValue : newVal);
      selection = select(this.selector);
      selection.select('.hx-number-picker-decrement').attr('disabled', getDisabled(this.options.disabled, newVal, this.min()));
      selection.select('.hx-number-picker-increment').attr('disabled', getDisabled(this.options.disabled, newVal, this.max()));
      if (prevValue !== newVal) {
        this.emit('change', {
          value: newVal
        });
      }
      return this;
    } else {
      return Number(this.selectInput.attr('data-value'));
    }
  };

  NumberPicker.prototype.min = function min (val) {
    if (arguments.length > 0) {
      this._.min = val;
      this.selectInput.attr('min', val);
      this.value(this.value());
      return this;
    } else {
      return this._.min;
    }
  };

  NumberPicker.prototype.max = function max (val) {
    if (arguments.length > 0) {
      this._.max = val;
      this.selectInput.attr('max', val);
      this.value(this.value());
      return this;
    } else {
      return this._.max;
    }
  };

  NumberPicker.prototype.increment = function increment () {
    var prevValue, step;
    if (!this.options.disabled) {
      prevValue = this.value();
      step = this.options.step || 1;
      this.value(this.value() + step);
      if (prevValue !== this.value()) {
        this.emit('increment');
      }
    }
    return this;
  };

  NumberPicker.prototype.decrement = function decrement () {
    var prevValue, step;
    if (!this.options.disabled) {
      prevValue = this.value();
      step = this.options.step || 1;
      this.value(this.value() - step);
      if (prevValue !== this.value()) {
        this.emit('decrement');
      }
    }
    return this;
  };

  NumberPicker.prototype.disabled = function disabled (disable) {
    var dis;
    if (disable != null) {
      this.options.disabled = disable;
      dis = disable ? 'disabled' : void 0;
      select(this.selector).selectAll('button').forEach(function(e) {
        return e.attr('disabled', dis);
      });
      this.selectInput.attr('disabled', dis);
      return this;
    } else {
      return this.options.disabled;
    }
  };

  NumberPicker.prototype.step = function step (val) {
    if (val != null) {
      this.options.step = val;
      this.selectInput.attr('step', val);
      this.value(this.value());
      return this;
    } else {
      return this.options.step;
    }
  };

  return NumberPicker;
}(EventEmitter));

var numberPicker = function(options) {
  var selection;
  selection = div();
  new NumberPicker(selection, options);
  return selection;
};

exports.ButtonGroup = /*@__PURE__*/(function (EventEmitter) {
  function ButtonGroup(selector, options) {
    var group, self;
    EventEmitter.call(this);
    self = this;
    this.options = exports.mergeDefined({
      buttonClass: 'hx-complement',
      activeClass: 'hx-action',
      fullWidth: false,
      // XXX Breaking: Renderer
      // renderer: (data, current) ->
      //   return div().text(if data.value? then data.value else data)
      renderer: function(node, data, current) {
        select(node).text(data.value != null ? data.value : data);
      },
      items: [],
      disabled: false
    }, options);
    this.current = void 0;
    group = select(selector).api('button-group', this).api(this).classed('hx-button-group', true).append('div').class('hx-input-group').classed('hx-input-group-full-width', this.options.fullWidth);
    this.view = group.view('button').enter(function() {
      return this.append('button').class('hx-btn').classed('hx-section hx-no-margin', self.options.fullWidth).classed(self.options.buttonClass, true).node();
    }).update(function(item, node) {
      var buttonClass;
      buttonClass = (item.activeClass != null) && item === self.current ? item.activeClass : item === self.current ? self.options.activeClass : self.options.buttonClass;
      // XXX Breaking: Renderer
      // .set(self.options.renderer(item, item is self.current))
      this.class('hx-btn').classed('hx-section hx-no-margin', self.options.fullWidth).classed(buttonClass, true).attr('disabled', self.options.disabled ? true : void 0).on('click', 'hx.button-group', function() {
        return self.value(item, true);
      });
      self.options.renderer(node, item, item === self.current);
    });
    if ((this.options.items != null) && this.options.items.length > 0) {
      this.items(this.options.items);
    }
  }

  if ( EventEmitter ) ButtonGroup.__proto__ = EventEmitter;
  ButtonGroup.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  ButtonGroup.prototype.constructor = ButtonGroup;

  ButtonGroup.prototype.renderer = function renderer (f) {
    if (f != null) {
      this.options.renderer = f;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  ButtonGroup.prototype.items = function items (items$1) {
    if (items$1 != null) {
      this.options.items = items$1;
      this.view.apply(this.options.items);
      return this;
    } else {
      return this.options.items;
    }
  };

  ButtonGroup.prototype.value = function value (value$1) {
    var arguments$1 = arguments;

    var i, item, len, ref;
    if (arguments.length > 0) {
      ref = this.options.items;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (item === value$1 || item.value === value$1) {
          this.current = item;
          this.view.apply(this.options.items);
          this.emit('change', {
            value: item,
            cause: arguments$1[1] ? 'user' : 'api'
          });
          break;
        }
      }
      return this;
    } else {
      return this.current;
    }
  };

  ButtonGroup.prototype.disabled = function disabled (disabled$1) {
    if (arguments.length > 0) {
      this.options.disabled = disabled$1;
      this.items(this.items());
      return this;
    } else {
      return this.options.disabled;
    }
  };

  return ButtonGroup;
}(EventEmitter));

exports.buttonGroup = function(options) {
  var selection;
  selection = div();
  new exports.ButtonGroup(selection.node(), options);
  return selection;
};

var PickerBase, pickerBase, setValue$1;

exports.userFacingText({
  picker: {
    chooseValue: 'Choose a value...'
  }
});

setValue$1 = function(picker, value, items, cause) {
  if ( cause === void 0 ) cause = 'api';

  var item, j, len, newVal;
  newVal = void 0;
  for (j = 0, len = items.length; j < len; j++) {
    item = items[j];
    if (item === value || (exports.isObject(item) && (item.value === value || item.value === (value != null ? value.value : void 0)))) {
      newVal = item;
      break;
    }
  }
  if (newVal != null) {
    // XXX Breaking: Renderer
    // picker._.selectedText.set(picker._.renderer(newVal))
    picker._.renderer(picker._.selectedText.node(), newVal);
  } else {
    picker._.selectedText.text(picker._.options.noValueText);
  }
  if (picker._.current !== newVal) {
    picker._.current = newVal;
    return picker.emit('change', {
      value: newVal,
      cause: cause
    });
  }
};

PickerBase = /*@__PURE__*/(function (EventEmitter) {
  function PickerBase(selector, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

    var menu, resolvedOptions, selectedText;
    EventEmitter.call(this);
    resolvedOptions = exports.mergeDefined({
      dropdownOptions: {},
      items: [],
      noValueText: exports.userFacingText('picker', 'chooseValue'),
      renderer: void 0,
      value: void 0,
      disabled: false,
      fullWidth: false
    }, options);
    selectedText = span('hx-picker-text');
    this.selection = select(selector).classed('hx-picker hx-btn', true).classed('hx-picker-full-width', resolvedOptions.fullWidth).add(span('hx-picker-inner').attr('type', 'button').add(selectedText).add(span('hx-picker-icon').add(i('hx-icon hx-icon-caret-down')))).api('picker', this).api(this);
    menu = new MenuBase(selector, {
      dropdownOptions: resolvedOptions.dropdownOptions,
      items: resolvedOptions.items,
      disabled: resolvedOptions.disabled
    });
    menu.pipe(this, '', ['highlight']);
    menu.dropdown.pipe(this, 'dropdown');
    menu.on('change', 'hx.picker', function (item) {
      if ((item != null ? item.content : void 0) != null) {
        setValue$1(this$1, item.content, this$1.items(), 'user');
        return menu.hide();
      }
    });
    this._ = {
      menu: menu,
      options: resolvedOptions,
      renderer: resolvedOptions.renderer,
      selectedText: selectedText,
      current: void 0
    };
    if (resolvedOptions.renderer == null) {
      this.renderer(menu.renderer());
    }
    // XXX Breaking: Renderer
    // menu.renderer((item) => @renderer()(item))
    menu.renderer(function (node, item) {
      return this$1._.renderer(node, item);
    });
    if (resolvedOptions.items != null) {
      this.items(resolvedOptions.items);
    }
    if (resolvedOptions.value != null) {
      this.value(resolvedOptions.value);
    }
    if ((this._.current == null) && (resolvedOptions.noValueText != null)) {
      selectedText.text(resolvedOptions.noValueText);
    }
  }

  if ( EventEmitter ) PickerBase.__proto__ = EventEmitter;
  PickerBase.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  PickerBase.prototype.constructor = PickerBase;

  PickerBase.prototype.renderer = function renderer (f) {
    if (f != null) {
      this._.renderer = f;
      return this;
    } else {
      return this._.renderer;
    }
  };

  PickerBase.prototype.items = function items (items$1) {
    if (items$1 != null) {
      this._.items = items$1;
      this._.menu.items(items$1);
      this.value(this._.current);
      return this;
    } else {
      return this._.items;
    }
  };

  PickerBase.prototype.value = function value (value$1) {
    var this$1 = this;

    var loading;
    if (arguments.length > 0) {
      if (exports.isFunction(this.items())) {
        loading = this.selection.prepend('span');
        loading.append('i').class('hx-menu-loading hx-icon hx-icon-spin hx-icon-spinner');
        this.items()(function (data) {
          loading.remove();
          return setValue$1(this$1, value$1, data);
        });
      } else {
        setValue$1(this, value$1, this.items());
      }
      return this;
    } else {
      return this._.current;
    }
  };

  PickerBase.prototype.disabled = function disabled (disable) {
    var menuDisable;
    menuDisable = this._.menu.disabled(disable);
    // menu.disabled returns the wrong 'this' so we return the correct things below
    if (disable != null) {
      return this;
    } else {
      return menuDisable;
    }
  };

  return PickerBase;
}(EventEmitter));

exports.Picker = /*@__PURE__*/(function (PickerBase) {
  function Picker(selector, options) {
    logger.deprecated('Picker', 'Deprecated in favour of the SingleSelect component');
    PickerBase.call(this, selector, options);
  }

  if ( PickerBase ) Picker.__proto__ = PickerBase;
  Picker.prototype = Object.create( PickerBase && PickerBase.prototype );
  Picker.prototype.constructor = Picker;

  return Picker;
}(PickerBase));

pickerBase = function(options) {
  var selection;
  // XXX [2.0.0] added options.class
  selection = button(options.class);
  new PickerBase(selection, options);
  return selection;
};

exports.picker = function(options) {
  var selection;
  // XXX [2.0.0] added options.class
  selection = button(options.class);
  new exports.Picker(selection, options);
  return selection;
};

function inputGroup() {
  return div('hx-input-group');
}

// XXX 2.0.0: this has changed - needs documenting (it has moved module, and the api has changed)

function group(options) {
  if ( options === void 0 ) options = {};

  var vertical = options.vertical; if ( vertical === void 0 ) vertical = false;
  var fixed = options.fixed; if ( fixed === void 0 ) fixed = false;
  var compact = options.compact; if ( compact === void 0 ) compact = false;

  return div(compact ? 'hx-compact-group' : 'hx-group')
    .classed('hx-horizontal', !vertical)
    .classed('hx-vertical', vertical)
    .classed('hx-fixed', fixed);
}

var sectionSizes = ['small', 'medium', 'large'];
function section(options) {
  if ( options === void 0 ) options = {};

  var fixed = options.fixed; if ( fixed === void 0 ) fixed = false;
  var size = options.size; if ( size === void 0 ) size = undefined;

  var sectionSel = div('hx-section')
    .classed('hx-fixed', fixed);

  if (size && sectionSizes.includes(size)) {
    sectionSel.classed(("hx-" + size), true);
  }

  return sectionSel;
}

// XXX Deprecated: Fluid
group.vertical = function () { return group({ vertical: true }); };
group.vertical.fixed = function () { return group({ vertical: true, fixed: true }); };
group.fixed = function () { return group({ fixed: true }); };
section.fixed = function () { return section({ fixed: true }); };

var containerChildren, drag, endDrag, getGrid, startDrag;

// A function for getting the grid of widgets and supplying the positions for
// each one to make working out where the placeholder should go while dragging.
getGrid = function(container, elem) {
  var count, grid;
  grid = [];
  count = -1;
  containerChildren(container).forEach(function(e) {
    var box;
    e = select(e);
    box = e.box();
    return grid.push({
      index: count += 1,
      x1: box.left,
      x2: box.left + box.width,
      y1: box.top,
      y2: box.top + box.height,
      width: e.style('width').replace('px', ''),
      height: e.style('height').replace('px', ''),
      elem: e
    });
  });
  return grid;
};

startDrag = function(container, elem, controlElem, e) {
  var _;
  _ = container._;
  e.event.preventDefault();
  if (_.dragging) {
    return endDrag(container, elem); // This deals with right clicks whilst dragging
  } else if (e.event.which < 2) { // We only care about primary mouse events.
    
    // Add listeners to the dom for the events. There can only be one element dragged at a time so these don't need unique id's
    select(document).on('pointermove', 'hx.drag-container', function(e) {
      return drag(container, elem, controlElem, e);
    }).on('pointerup', 'hx.drag-container', function(e) {
      return endDrag(container, elem, e);
    });
    // Used when accounting for scrolling.
    _.origPageYOffset = window.pageYOffset;
    _.origPageXOffset = window.pageXOffset;
    _.dragging = true;
    _.grid = getGrid(container);
    _.origWidth = elem.style('width').replace('px', '');
    _.origHeight = elem.style('height').replace('px', '');
    _.placeholder = elem.insertAfter(elem.clone(true).clear()).classed('hx-drag-placeholder', true);
    // Use min height to allow flexbox to deal with sizing and append div so the
    // borders can be applied without changing the layout.
    _.placeholder.style('height', _.origHeight + 'px').style('width', _.origWidth + 'px').style('max-height', _.origHeight + 'px').style('max-width', _.origWidth + 'px').style('min-height', _.origHeight + 'px').style('min-width', _.origWidth + 'px').append('div');
    // fix the width to prevent the element being resized when absolutely positioned
    elem.classed('hx-drag-current', true).style('width', _.origWidth + 'px');
    // Get the sizes of the various components used for positioning the element being dragged.
    _.selectionBox = elem.box();
    _.controlBox = controlElem.box();
    _.containerBox = container.selection.box();
    // We call this to move the element to the correct place as users won't click the exact centre of the drag control (and we don't want it to jump about)
    drag(container, elem, controlElem, e);
    _.currentPos = -1;
    return container.emit('dragstart', elem.node());
  }
};

drag = function(container, elem, controlElem, e, preventGridMove) {
  var _, before, box, controlOffsetX, controlOffsetY, inX, inY, j, len, ref, results, scrollOffsetX, scrollOffsetY, selectionOffsetX, selectionOffsetY, xPos, xVal, yPos, yVal;
  _ = container._;
  if (_.dragging) {
    e.event.preventDefault();
    // Calculate position to give the elem to align cursor with the center of the controlElem
    controlOffsetX = _.controlBox.left + (_.controlBox.width / 2);
    controlOffsetY = _.controlBox.top + (_.controlBox.height / 2);
    selectionOffsetX = _.containerBox.left - _.selectionBox.left;
    selectionOffsetY = _.containerBox.top - _.selectionBox.top;
    // Account for scrolling
    scrollOffsetX = window.pageXOffset - _.origPageXOffset;
    scrollOffsetY = window.pageYOffset - _.origPageYOffset;
    xVal = e.x - selectionOffsetX - controlOffsetX + scrollOffsetX;
    yVal = e.y - selectionOffsetY - controlOffsetY + scrollOffsetY;
    elem.style('left', xVal + 'px');
    elem.style('top', yVal + 'px');
    if (!preventGridMove) {
      // Check which grid position the mouse is in and move the placeholder to the
      // correct location.
      xPos = e.x + scrollOffsetX;
      yPos = e.y + scrollOffsetY;
      before = true;
      ref = _.grid;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        inX = xPos >= box.x1 && xPos <= box.x2;
        inY = yPos >= box.y1 && yPos <= box.y2;
        if (box.elem.node() === elem.node()) {
          before = false;
        }
        if (inX && inY) {
          if (_.currentPos !== box.index && _.currentPos > -1) {
            // Elements before the currently dragged element need to have the placeholder inserted before them because
            // of the currently dragged element being absolute positioned.
            if (before) {
              box.elem.insertBefore(_.placeholder);
            } else {
              box.elem.insertAfter(_.placeholder);
            }
            if (_.options.resizeOnDrag) {
              // Resize the placeholder to fit the space it has been moved to
              _.placeholder.style('height', box.height + 'px').style('width', box.width + 'px').style('max-height', box.height + 'px').style('max-width', box.width + 'px').style('min-height', box.height + 'px').style('min-width', box.width + 'px');
              // We only change the width as the content size may be different and we don't want to cause overlaps
              elem.style('width', _.placeholder.style('width'));
              // Re-create the boxes used by drag
              _.selectionBox = elem.box();
              _.controlBox = controlElem.box();
              drag(container, elem, controlElem, e, true);
            }
            container.emit('drag', elem.node());
          }
          _.currentPos = box.index;
          break;
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  }
};

endDrag = function(container, elem) {
  var _;
  _ = container._;
  if (_.dragging) {
    _.dragging = false;
    // Remove document listeners
    select(document).off('pointermove', 'hx.drag-container').off('pointerup', 'hx.drag-container');
    // The position of the placeholder is important here as it is where the
    // currently selected element will be placed.
    _.placeholder.insertAfter(elem);
    _.placeholder.remove();
    // Reset styles and classes here. Don't change the height as it will break
    // widgets that have had the height option specified
    elem.style('top', '').style('left', '').style('width', '').classed('hx-drag-current', false);
    return container.emit('dragend', elem.node());
  }
};

// Find all the defined child elements and return them in an array (instead of a NodeList)
containerChildren = function(container) {
  var children, i, items;
  children = container.selection.node().children;
  items = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 0, ref = children.length; j <= ref; i = j += 1) {
      if (children[i] != null) {
        results.push(children[i]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  })();
  return items.filter(exports.defined);
};

exports.DragContainer = /*@__PURE__*/(function (EventEmitter) {
  function DragContainer(selector, options) {
    EventEmitter.call(this);
    this.selection = select(selector).classed('hx-drag-container', true).api(this);
    options = exports.merge({
      lookup: function(node) {
        return select(node).attr('data-id');
      },
      resizeOnDrag: false,
      order: void 0
    }, options);
    this._ = {};
    this._.options = options;
    this._.initialOrder = this.order();
    if (options.order) {
      this.order(options.order);
    }
    this.setup();
  }

  if ( EventEmitter ) DragContainer.__proto__ = EventEmitter;
  DragContainer.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  DragContainer.prototype.constructor = DragContainer;

  // Should be called whenever the direct children are changed to find new draggable elements.
  DragContainer.prototype.setup = function setup () {
    var this$1 = this;

    this.selection.selectAll('.hx-drag-control').off('pointerdown', 'hx.drag-container');
    containerChildren(this).forEach(function (elem) {
      var controlElem;
      elem = select(elem);
      if (elem.classed('hx-drag-element')) { // Only elements with hx-drag-element should be draggable.
        controlElem = select(elem.select('.hx-drag-control').node() || elem.node());
        return controlElem.classed('hx-drag-control', true).on('pointerdown', 'hx.drag-container', function (evt) {
          if (!controlElem.classed('hx-drag-disabled')) {
            return startDrag(this$1, elem, controlElem, evt);
          }
        });
      }
    });
    return this;
  };

  DragContainer.prototype.order = function order (order$1) {
    var id, j, k, len, len1, map, node, ref, ref1;
    if (arguments.length > 0) {
      map = {};
      ref = containerChildren(this);
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        map[this.lookup()(node)] = node;
      }
      ref1 = order$1 || this._.initialOrder;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        id = ref1[k];
        this.selection.append(map[id]);
      }
      return this;
    } else {
      return containerChildren(this).map(this.lookup()).filter(exports.defined);
    }
  };

  DragContainer.prototype.lookup = function lookup (fn) {
    if (fn != null) {
      this._.options.lookup = fn;
      return this;
    } else {
      return this._.options.lookup;
    }
  };

  return DragContainer;
}(EventEmitter));

exports.dragContainer = function(options) {
  var selection;
  selection = div();
  new exports.DragContainer(selection.node(), options);
  return selection;
};

var ProgressBar;

ProgressBar = /*@__PURE__*/(function () {
  function ProgressBar(selector, options) {
    this.selector = selector;
    logger.deprecated('ProgressBar: This version of progress bar is deprecated. Please add "featureFlags: { useUpdatedClass: true }" to the options when creating your progress bar');
    options = exports.mergeDefined({
      segments: void 0,
      value: 0,
      animate: false
    }, options);
    this.selection = select(this.selector).classed('hx-progress-bar', true).api('progress-bar', this).api(this);
    this.innerBars = this.selection.append('div').attr('class', 'hx-progress-bar-inner');
    this.value(options.value);
    if (options.segments != null) {
      this.segments(options.segments, true);
    }
    if (options.animate) {
      this.selection.classed('hx-animate', true);
    }
  }

  ProgressBar.prototype.value = function value (value$1) {
    if (arguments.length > 0) {
      if (!isNaN(value$1)) {
        this.progress = Math.max(0, Math.min(1, value$1));
        this.innerBars.style('width', (this.progress * 100) + '%');
      }
      return this;
    } else {
      return this.progress;
    }
  };

  ProgressBar.prototype.segments = function segments (segments$1, retainProgress) {
    var this$1 = this;

    var runningTotal, total;
    if (arguments.length > 0) {
      if (segments$1 != null) {
        this.progressSegments = segments$1.filter(function(e) {
          return (e.value != null) || (e.ratio != null) || (e.class != null);
        });
        if (this.progressSegments.length > 0) {
          this.selection.selectAll('.hx-progress-bar-inner').remove();
          if (!this.progressSegments.some(function(e) {
            return e.value != null;
          })) {
            runningTotal = 0;
            total = this.progressSegments.map(function(e) {
              return e.ratio || 1;
            }).reduce(function(a, b) {
              return a + b;
            });
          } else {
            this.progressSegments = this.progressSegments.sort(function(a, b) {
              return (a.value || 1) - (b.value || 1);
            });
          }
          this.progressSegments.forEach(function (segment, i) {
            var bar, maxWidth;
            // Create a new bar for each segment
            bar = this$1.selection.append('div').attr('class', 'hx-progress-bar-inner');
            // If a class is not provided, the class applied to the @selector will be used by the css
            if (segment.class != null) {
              bar.classed(segment.class, true);
            }
            // Percentage value provided in the unit range (0-1)
            // If ratio is provided, the max width for the segment is calculated using the total. Ratio defaults to 1.
            maxWidth = runningTotal == null ? (segment.value || 1) * 100 : (runningTotal += segment.ratio || 1, runningTotal / total * 100);
            // max-width limits the size of each bar - allowing the existing @value method to work.
            // z-index layers the bars in the correct order (smallest on top)
            return bar.style('max-width', maxWidth + '%').style('z-index', this$1.progressSegments.length - i);
          });
        }
      } else {
        this.progressSegments = void 0;
        this.selection.selectAll('.hx-progress-bar-inner').remove();
        this.selection.append('div').attr('class', 'hx-progress-bar-inner');
      }
      this.innerBars = this.selection.selectAll('.hx-progress-bar-inner');
      if (retainProgress) {
        this.value(this.progress);
      } else {
        this.progress = 0;
      }
      return this;
    } else {
      return this.progressSegments;
    }
  };

  return ProgressBar;
}());

var toMultilineSelection$1 = exports.userFacingText.toMultilineSelection;

var segmentTypes = [
  'default',
  'light',
  'medium',
  'dark',
  'danger',
  'warning',
  'done',
  'in-progress',
  'todo' ];

function optionSetterGetter(name, fn, statusBar, defaultVal) {
  if ( fn === void 0 ) fn = exports.identity;

  return function inner(value) {
    if (arguments.length) {
      this.options[name] = value || defaultVal;
      fn();
      if (statusBar) {
        statusBar[name](value);
      } else {
        this.render();
      }
      return this;
    }
    return this.options[name];
  };
}

var StatusBar = function StatusBar(selector, options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  this.options = exports.mergeDefined({
    segments: [],
    title: undefined,
    breakdown: undefined,
    plan: undefined,
    compact: false,
    disabled: false,
  }, options);

  this._ = {};

  this.segments = optionSetterGetter('segments', function () {
    this$1._.segmentTotal = this$1.options.segments.reduce(function (tot, ref) {
      var count = ref.count;

      return tot + count;
    }, 0);
  }, undefined, []).bind(this);

  this.title = optionSetterGetter('title').bind(this);
  this.breakdown = optionSetterGetter('breakdown').bind(this);
  this.plan = optionSetterGetter('plan').bind(this);
  this.compact = optionSetterGetter('compact').bind(this);
  this.disabled = optionSetterGetter('disabled').bind(this);

  this.selection = select(selector)
    .classed('hx-status-bar', true);

  this._.titleGroupSel = group({ compact: true }).classed('hx-status-bar-title-section', true);
  this._.titleSel = div('hx-status-bar-title');
  this._.planSel = div('hx-status-bar-plan');
  this._.segmentsSel = div('hx-status-bar-segments');
  this._.breakdownSel = div('hx-status-bar-breakdown');

  this.selection
    .add(this._.titleGroupSel
      .add(section().add(this._.titleSel))
      .add(section({ fixed: true }).add(this._.planSel)))
    .add(this._.segmentsSel)
    .add(this._.breakdownSel);

  this.createView();
  this.segments(this.options.segments, false);
};

StatusBar.prototype.render = function render () {
  var ref = this._;
    var view = ref.view;
    var titleGroupSel = ref.titleGroupSel;
    var titleSel = ref.titleSel;
    var planSel = ref.planSel;
    var breakdownSel = ref.breakdownSel;
    var segmentsSel = ref.segmentsSel;

  var ref$1 = this.options;
    var segments = ref$1.segments;
    var title = ref$1.title;
    var breakdown = ref$1.breakdown;
    var plan = ref$1.plan;
    var compact = ref$1.compact;
    var disabled = ref$1.disabled;

  this.selection
    .classed('hx-status-bar-compact', compact)
    .classed('hx-status-bar-disabled', disabled);

  titleGroupSel.classed('hx-header-small', !compact);
  titleSel.text(title);
  planSel.text(plan);
  breakdownSel.set(breakdown ? toMultilineSelection$1(breakdown, 'p', true) : []);

  if (compact) {
    segmentsSel.insertAfter(planSel);
  } else {
    titleGroupSel.append(planSel);
  }

  view.apply(segments);
};

StatusBar.prototype.createView = function createView () {
  var self = this;
  this._.view = this._.segmentsSel.view('.hx-status-bar-section')
    .enter(function enterView() {
      var sel = div('hx-status-bar-section')
        .add(div('hx-status-bar-section-bar'))
        .add(div('hx-status-bar-section-text')
          .add(div('hx-status-bar-section-label'))
          .add(div('hx-status-bar-section-percent')));

      return this.append(sel).node();
    })
    .update(function (ref, e) {
        var id = ref.id;
        var count = ref.count;
        var type = ref.type;
        var label = ref.label;

      if (!id) {
        throw new Error('StatusBar: an "id" is required for each segment');
      }

      if (typeof count === 'undefined') {
        throw new Error('StatusBar: a count must be defined for each segment');
      }

      var ref$1 = self._;
        var segmentTotal = ref$1.segmentTotal;

      var ref$2 = self.options;
        var compact = ref$2.compact;

      var percent = segmentTotal === 0
        ? 0
        : Math.round((count / segmentTotal) * 100);

      var sel = select(e);

      sel.style('flex-grow', percent || 1);

      var bar = sel.select('.hx-status-bar-section-bar')
        .class('hx-status-bar-section-bar')
        .text(compact ? undefined : count);

      if (type && segmentTypes.includes(type)) {
        bar.classed(("hx-status-bar-" + type), true);
      }

      if (type && !segmentTypes.includes(type)) {
        logger.warn(("StatusBar: invalid segment type provided \"" + type + "\", expected one of [" + (segmentTypes.join(', ')) + "]"));
      }

      sel.select('.hx-status-bar-section-text')
        .classed('hx-status-bar-section-hidden', !label);

      sel.select('.hx-status-bar-section-label')
        .text(label);

      sel.select('.hx-status-bar-section-percent')
        .text(("(" + percent + "%)"));
    });
};

var ProgressBar$1 = function ProgressBar(selector, options) {
  this.options = exports.mergeDefined({
    title: undefined,
    breakdown: undefined,
    plan: 0,
    inProgress: 0,
    done: 0,
    hidePlan: false,
    compact: false,
    disabled: false,
  }, options);

  var ref = this.options;
  var compact = ref.compact;
  var disabled = ref.disabled;
  var title = ref.title;
  var breakdown = ref.breakdown;

  this.selection = select(selector)
    .classed('hx-progress-bar hx-flag-progress-bar', true)
    .api('progress-bar', this)
    .api(this);

  this.selection = select(selector);

  this._ = {};

  this._.segments = {
    done: {
      id: 'done',
      count: 0,
      type: 'done',
    },
    inProgress: {
      id: 'inProgress',
      count: 0,
      type: 'in-progress',
    },
    todo: {
      id: 'todo',
      count: 0,
      type: 'todo',
    },
  };

  this._.bar = new StatusBar(this.selection, {
    title: title,
    breakdown: breakdown,
    compact: compact,
    disabled: disabled,
  });

  this.title = optionSetterGetter('title', undefined, this._.bar).bind(this);
  this.breakdown = optionSetterGetter('breakdown', undefined, this._.bar).bind(this);
  this.disabled = optionSetterGetter('disabled', undefined, this._.bar).bind(this);
  this.compact = optionSetterGetter('compact', undefined, this._.bar).bind(this);

  this.render();
};

ProgressBar$1.prototype.render = function render () {
  var ref = this._;
    var bar = ref.bar;
    var segments = ref.segments;

  var ref$1 = this.options;
    var plan = ref$1.plan; if ( plan === void 0 ) plan = 0;
    var done = ref$1.done; if ( done === void 0 ) done = 0;
    var inProgress = ref$1.inProgress; if ( inProgress === void 0 ) inProgress = 0;
    var disabled = ref$1.disabled;
    var hidePlan = ref$1.hidePlan;

  var inProgressAndDone = done + inProgress;
  var todo = Math.max(0, plan - inProgressAndDone);

  if (hidePlan) {
    bar.options.plan = !disabled ? done : undefined;
  } else {
    bar.options.plan = !disabled ? (done + " / " + (plan || '-')) : undefined;
  }

  segments.done.count = done;
  segments.inProgress.count = inProgress;
  segments.todo.count = todo;

  bar.segments([
    segments.done,
    segments.inProgress,
    segments.todo ].filter(function (ref) {
      var count = ref.count;

      return count;
    }));
};

ProgressBar$1.prototype.hidePlan = function hidePlan (hide) {
  if (arguments.length) {
    this.options.hidePlan = hide;
    this.render();
  }
  return this.options.hidePlan;
};

ProgressBar$1.prototype.done = function done (count) {
  if (arguments.length) {
    this.options.done = count;
    this.render();
  }
  return this.options.done;
};

ProgressBar$1.prototype.inProgress = function inProgress (count) {
  if (arguments.length) {
    this.options.inProgress = count;
    this.render();
  }
  return this.options.inProgress;
};

ProgressBar$1.prototype.plan = function plan (count) {
  if (arguments.length) {
    this.options.plan = count;
    this.render();
  }
  return this.options.plan;
};

function ProgressBar$2(selector, options) {
  if ( options === void 0 ) options = {};

  if (options.featureFlags && options.featureFlags.useUpdatedClass) {
    return new ProgressBar$1(selector, options);
  }
  return new ProgressBar(selector, options);
}

function progressBar(options) {
  if ( options === void 0 ) options = {};

  var sel = div();
  if (options.featureFlags && options.featureFlags.useUpdatedClass) {
    new ProgressBar$1(sel, options);
  } else {
    new ProgressBar(sel, options);
  }
  return sel;
}

var VisualizationBar = function VisualizationBar(selector, options) {
  this.options = exports.mergeDefined({
    title: undefined,
    breakdown: undefined,
    segments: [],
  }, options);

  this.selection = select(selector)
    .classed('hx-visualization-bar', true)
    .api('visualization-bar', this)
    .api(this);

  this._ = {};

  if (!this.options.segments.length) {
    throw new Error('VisualizationBar: Expected at least one segment to display');
  }

  this._.bar = new StatusBar(this.selection, {
    title: this.options.title,
    breakdown: this.options.breakdown,
    segments: this.options.segments,
  });

  this.title = optionSetterGetter('title', undefined, this._.bar).bind(this);
  this.breakdown = optionSetterGetter('breakdown', undefined, this._.bar).bind(this);
  this.segments = optionSetterGetter('segments', undefined, this._.bar).bind(this);
};

function visualizationBar(options) {
  var sel = div();
  new VisualizationBar(sel, options);
  return sel;
}

exports.Toggle = /*@__PURE__*/(function (EventEmitter) {
  function Toggle(selector, options) {
    var this$1 = this;

    EventEmitter.call(this);
    this.options = exports.mergeDefined({
      value: false,
      disabled: false
    }, options);
    this.selection = select(selector).classed('hx-toggle', true).api('toggle', this).api(this);
    this.toggle = this.selection.append('div').class('hx-toggle-box');
    this.value(this.options.value);
    this.disabled(this.options.disabled);
    this.selection.on('click', 'hx.toggle', function (e) {
      if (!this$1.disabled()) {
        this$1.value(!this$1.value());
        return this$1.emit('change', this$1.value());
      }
    });
  }

  if ( EventEmitter ) Toggle.__proto__ = EventEmitter;
  Toggle.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Toggle.prototype.constructor = Toggle;

  Toggle.prototype.value = function value (val) {
    if (val != null) {
      this.options.value = val;
      this.toggle.classed('hx-toggle-box-on', val);
      return this;
    } else {
      return this.options.value;
    }
  };

  Toggle.prototype.disabled = function disabled (val) {
    if (val != null) {
      this.options.disabled = val;
      this.toggle.classed('hx-toggle-disabled', val);
      return this;
    } else {
      return this.options.disabled;
    }
  };

  return Toggle;
}(EventEmitter));

exports.toggle = function(options) {
  var selection;
  selection = div();
  new exports.Toggle(selection.node(), options);
  return selection;
};

exports.Crumbtrail = /*@__PURE__*/(function () {
  function Crumbtrail(selector, options) {
    var section, self, update;
    this.selector = selector;
    self = this;
    section = select(this.selector).api(this);
    section.classed('hx-crumbtrail', true);
    this.options = exports.mergeDefined({
      renderer: function(node, data) {
        return select(node).text(data);
      },
      items: [],
      separator: '/'
    }, options);
    update = function(d, element, i) {
      if (i % 2 === 0) {
        this.class('hx-crumbtrail-node');
        return self.options.renderer(element, d);
      } else {
        return this.class('hx-crumbtrail-separator').text(self.options.separator).node();
      }
    };
    this.view = section.view('span', 'span').update(update);
    if ((this.options.items != null) && this.options.items.length > 0) {
      this.items(this.options.items);
    }
  }

  Crumbtrail.prototype.renderer = function renderer (render) {
    if (render != null) {
      this.options.renderer = render;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  Crumbtrail.prototype.items = function items (data) {
    if (data != null) {
      this.options.items = data;
      this.view.apply(exports.flatten(data.map(function(d) {
        return [d, 0];
      })).slice(0, -1));
      return this;
    } else {
      return this.options.items;
    }
  };

  return Crumbtrail;
}());

exports.crumbtrail = function(options) {
  var selection;
  selection = div();
  new exports.Crumbtrail(selection.node(), options);
  return selection;
};

function notice() {
  return div('hx-notice');
}

function noticeHead() {
  return div('hx-notice-head');
}

function noticeBody() {
  return div('hx-notice-body');
}

// XXX Deprecated: Fluid
notice.head = noticeHead;
notice.body = noticeBody;

var AutocompletePickerBase, debounceDuration, enterKeyCode, setPickerValue, validateItems;

exports.userFacingText({
  autocompletePicker: {
    chooseValue: 'Choose a value...',
    loading: 'Loading...',
    noResults: 'No Results Found',
    otherResults: 'Other Results'
  }
});

enterKeyCode = 13;

debounceDuration = 200;

validateItems = function(feed, items) {
  if (!feed.validateItems(items)) {
    logger.warn(("hx.AutocompletePicker: the items was expected to be an array of items or a function, you supplied: " + items));
    return false;
  } else {
    return true;
  }
};

setPickerValue = function(picker, results, cause) {
  var _;
  _ = picker._;
  _.valueText.clear();
  if (results.length) {
    _.current = results[0];
    picker.emit('change', {
      cause: cause,
      value: results[0]
    });
    // XXX Breaking: Renderer
    // _.valueText.set(_.renderer(_.current))
    return _.renderer(_.valueText.node(), results[0]);
  } else {
    _.current = void 0;
    return _.valueText.text(_.options.chooseValueText);
  }
};

AutocompletePickerBase = /*@__PURE__*/(function (EventEmitter) {
  function AutocompletePickerBase(selector, items, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

    var debouncedPopulate, defaults, feed, feedOptions, input, loadingItem, menu, noResultsItem, otherResultsItem, populateMenu, renderMenu, renderWrapper, resolvedOptions, selection, setValue, valueText;
    EventEmitter.call(this);
    defaults = {
      // Options passed to the feed - defaults defined there
      filter: void 0,
      filterOptions: void 0,
      matchType: void 0,
      useCache: void 0,
      showOtherResults: void 0,
      trimTrailingSpaces: void 0,
      valueLookup: void 0, // Used by the feed and by the `value` method
      
      // Options used by the picker
      buttonClass: void 0,
      disabled: false,
      renderer: void 0,
      value: void 0,
      chooseValueText: exports.userFacingText('autocompletePicker', 'chooseValue'),
      loadingText: exports.userFacingText('autocompletePicker', 'loading'),
      noResultsText: exports.userFacingText('autocompletePicker', 'noResults'),
      otherResultsText: exports.userFacingText('autocompletePicker', 'otherResults')
    };
    if (options.valueLookup) {
      // XXX Breaking: Renderer
      // defaults.renderer = (item) ->
      //   return div().text(options.valueLookup(item))
      defaults.renderer = function(element, item) {
        return select(element).text(options.valueLookup(item));
      };
    }
    resolvedOptions = exports.merge(defaults, options);
    selection = select(selector).classed('hx-autocomplete-picker hx-btn', true);
    if (resolvedOptions.buttonClass) {
      selection.classed(resolvedOptions.buttonClass, true);
    }
    valueText = div('hx-autocomplete-picker-text');
    selection.add(valueText).add(span('hx-autocomplete-picker-icon').add(i('hx-icon hx-icon-caret-down')));
    feedOptions = {
      filter: resolvedOptions.filter,
      filterOptions: resolvedOptions.filterOptions,
      matchType: resolvedOptions.matchType,
      showOtherResults: resolvedOptions.showOtherResults,
      trimTrailingSpaces: resolvedOptions.trimTrailingSpaces,
      valueLookup: resolvedOptions.valueLookup,
      useCache: resolvedOptions.useCache
    };
    feed = new exports.AutocompleteFeed(feedOptions);
    this._ = {
      selection: selection,
      options: resolvedOptions,
      valueText: valueText,
      feed: feed,
      valueLookup: resolvedOptions.valueLookup || exports.identity
    };
    if (!validateItems(feed, items)) {
      return;
    }
    feed.items(items);
    // XXX Breaking: Renderer
    // renderWrapper = (element, item) =>
    //   if item.unselectable or item.heading
    //     return div()
    //       .classed('hx-autocomplete-picker-heading', item.heading)
    //       .text(item.text)
    //   else
    //     return @_.renderer(item)
    //       .classed('hx-autocomplete-picker-heading', item.heading)
    renderWrapper = function (element, item) {
      selection = select(element).clear().classed('hx-autocomplete-picker-heading', item.heading);
      if (item.unselectable || item.heading) {
        return selection.text(item.text).off();
      } else {
        return this$1._.renderer(element, item);
      }
    };
    input = detached('input').class('hx-autocomplete-picker-input').on('input', function(e) {
      renderMenu([loadingItem]);
      return debouncedPopulate(e.target.value);
    }).on('keydown', function(e) {
      var topItem;
      if (input.value().length) {
        if ((e.which || e.keyCode) === enterKeyCode && menu.cursorPos === -1) {
          topItem = menu.items()[0];
          if (!topItem.unselectable) {
            return setValue(topItem);
          }
        }
      }
    });
    menu = new MenuBase(selector, {
      dropdownOptions: {
        ddClass: 'hx-autocomplete-picker-dropdown'
      },
      extraContent: input
    });
    this._.renderer = resolvedOptions.renderer || menu.renderer();
    this._.menu = menu;
    menu.renderer(renderWrapper);
    noResultsItem = {
      text: resolvedOptions.noResultsText,
      unselectable: true
    };
    loadingItem = {
      text: resolvedOptions.loadingText,
      unselectable: true
    };
    otherResultsItem = {
      text: resolvedOptions.otherResultsText,
      unselectable: true,
      heading: true
    };
    renderMenu = function(items) {
      menu.items(items);
      return menu.render();
    };
    populateMenu = function(term) {
      return feed.filter(term, function(results, otherResults) {
        if (results.length === 0) {
          results.push(noResultsItem);
        }
        if (otherResults.length > 0) {
          otherResults = [otherResultsItem].concat(otherResults);
        }
        return renderMenu(results.concat(otherResults));
      });
    };
    debouncedPopulate = exports.debounce(debounceDuration, populateMenu);
    setValue = function (item) {
      setPickerValue(this$1, [item], 'user');
      return menu.hide();
    };
    menu.dropdown.on('showstart', function() {
      input.value('');
      renderMenu([loadingItem]);
      populateMenu(input.value());
      return input.node().focus();
    });
    menu.dropdown.on('showend', function() {
      return input.node().focus();
    });
    menu.on('change', function (item) {
      if ((item != null) && (item.content != null)) {
        return setValue(item.content);
      }
    });
    menu.pipe(this, '', ['highlight']);
    menu.dropdown.pipe(this, 'dropdown');
    if (resolvedOptions.value) {
      this.value(resolvedOptions.value);
    } else {
      valueText.text(resolvedOptions.chooseValueText);
    }
    if (resolvedOptions.disabled) {
      this.disabled(resolvedOptions.disabled);
    }
    selection.api('autocomplete-picker', this).api(this);
  }

  if ( EventEmitter ) AutocompletePickerBase.__proto__ = EventEmitter;
  AutocompletePickerBase.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  AutocompletePickerBase.prototype.constructor = AutocompletePickerBase;

  AutocompletePickerBase.prototype.clearCache = function clearCache () {
    this._.feed.clearCache();
    return this;
  };

  AutocompletePickerBase.prototype.hide = function hide () {
    this._.menu.hide();
    return this;
  };

  AutocompletePickerBase.prototype.disabled = function disabled (disable) {
    var menuDisable;
    menuDisable = this._.menu.disabled(disable);
    // menu.disabled returns the wrong 'this' so we return the correct things below
    if (disable != null) {
      return this;
    } else {
      return menuDisable;
    }
  };

  AutocompletePickerBase.prototype.items = function items (items$1) {
    if (arguments.length) {
      if (validateItems(this._.feed, items$1)) {
        this._.feed.items(items$1);
        this.value(this._.current);
      }
      return this;
    } else {
      return this._.feed.items();
    }
  };

  AutocompletePickerBase.prototype.value = function value (value$1, callback) {
    var this$1 = this;

    var _;
    _ = this._;
    if (arguments.length) {
      _.valueText.text(_.options.loadingText);
      _.feed.filter(_.valueLookup(value$1), function (results) {
        setPickerValue(this$1, results, 'api');
        return typeof callback === "function" ? callback(results[0]) : void 0;
      });
      return this;
    } else {
      return _.current;
    }
  };

  AutocompletePickerBase.prototype.renderer = function renderer (f) {
    if (f != null) {
      this._.renderer = f;
      return this;
    } else {
      return this._.renderer;
    }
  };

  return AutocompletePickerBase;
}(EventEmitter));

exports.AutocompletePicker = /*@__PURE__*/(function (AutocompletePickerBase) {
  function AutocompletePicker(selector, options) {
    logger.deprecated('AutocompletePicker', 'Deprecated in favour of the SingleSelect component');
    AutocompletePickerBase.call(this, selector, options);
  }

  if ( AutocompletePickerBase ) AutocompletePicker.__proto__ = AutocompletePickerBase;
  AutocompletePicker.prototype = Object.create( AutocompletePickerBase && AutocompletePickerBase.prototype );
  AutocompletePicker.prototype.constructor = AutocompletePicker;

  return AutocompletePicker;
}(AutocompletePickerBase));

exports.autocompletePicker = function(items, options) {
  var selection;
  selection = div();
  new exports.AutocompletePicker(selection, items, options);
  return selection;
};

var cloneEvents, cloneTableAndNodeEvents, createStickyHeaderNodes, getChildren, getChildrenFromTable, updateHeaderPositions, updateScrollIndicators;

// XXX: webpack: how does the resize-events dependency work now?
//      should there be a requirement on it here?
//      should it be made more explicit with something like select.use(resizeEvents()) ?
updateScrollIndicators = function(wrapper, top, right, bottom, left) {
  var canScrollDown, canScrollLeft, canScrollRight, canScrollUp, node;
  // Sets the visibility of the scroll indicators (for devices with 0 width scrollbars)
  node = wrapper.node();
  canScrollUp = node.scrollTop > 0;
  canScrollDown = node.scrollTop < node.scrollHeight - node.clientHeight;
  canScrollLeft = node.scrollLeft > 0;
  canScrollRight = node.scrollLeft < node.scrollWidth - node.clientWidth;
  top.style('display', canScrollUp ? 'block' : '');
  right.style('display', canScrollRight ? 'block' : '');
  bottom.style('display', canScrollDown ? 'block' : '');
  return left.style('display', canScrollLeft ? 'block' : '');
};

updateHeaderPositions = function(container, wrapperNode) {
  var leftNode, leftOffset, topNode, topOffset;
  // Set the relative positions of the two headers.
  // This method reduces flickering when scrolling on mobile devices.
  leftOffset = -wrapperNode.scrollLeft;
  topOffset = -wrapperNode.scrollTop;
  topNode = container.shallowSelect('.hx-sticky-table-header-top');
  if (topNode != null) {
    topNode.select('.hx-table').style('left', leftOffset + 'px');
  }
  leftNode = container.shallowSelect('.hx-sticky-table-header-left');
  if (leftNode != null) {
    return leftNode.select('.hx-table').style('top', topOffset + 'px');
  }
};

cloneEvents = function(elem, clone) {
  var cloneChildren, cloneElem, cloneEmitter, elemChildren, elemData, i, j, k, len, listener, listenerNamesRegistered, origEmitter, ref, ref1, results;
  // Copy all events and recurse through children.
  if ((elem != null) && (clone != null)) {
    elemData = getHexagonElementDataObject(elem);
    listenerNamesRegistered = (ref = elemData.listenerNamesRegistered) != null ? ref.values() : void 0;
    if (listenerNamesRegistered && listenerNamesRegistered.length > 0) {
      origEmitter = elemData.eventEmitter;
      cloneElem = select(clone);
      for (j = 0, len = listenerNamesRegistered.length; j < len; j++) {
        listener = listenerNamesRegistered[j];
        cloneElem.on(listener, function() {});
      }
      cloneEmitter = getHexagonElementDataObject(clone).eventEmitter;
      cloneEmitter.pipe(origEmitter);
    }
    elemChildren = elem.childNodes;
    if (elemChildren) {
      cloneChildren = clone.childNodes;
      results = [];
      for (i = k = 0, ref1 = elemChildren.length; (0 <= ref1 ? k <= ref1 : k >= ref1); i = 0 <= ref1 ? ++k : --k) {
        results.push(cloneEvents(elemChildren[i], cloneChildren[i]));
      }
      return results;
    }
  }
};

getChildrenFromTable = function(t, body, single) {
  var realParents;
  realParents = getChildren(t.select(body ? 'tbody' : 'thead'), 'tr');
  return exports.flatten(realParents.map(function(parent) {
    return getChildren(select(parent), 'th, td', single);
  }));
};

getChildren = function(parent, selector, single) {
  var children;
  children = single ? parent.select(selector) : parent.selectAll(selector);
  return children.filter(function(node) {
    return node.node().parentNode === parent.node();
  }).nodes;
};

createStickyHeaderNodes = function(real, cloned) {
  var i, j, ref, results;
  results = [];
  for (i = j = 0, ref = real.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    cloneEvents(real[i], cloned[i]);
    // The real table shouldn't show the sticky header nodes
    select(real[i]).classed('hx-sticky-table-invisible', true);
    results.push(select(cloned[i]).classed('hx-sticky-table-invisible', false));
  }
  return results;
};

cloneTableAndNodeEvents = function(selection, realTable, tableClone, body, single) {
  var clonedNodes, innerTableClone, realNodes;
  innerTableClone = selection.append(tableClone.clone(true));
  // We make all the cells invisible by default and then only make the ones we care about visible in `createStickyHeaderNodes`
  innerTableClone.selectAll('th, td').classed('hx-sticky-table-invisible', true);
  realNodes = getChildrenFromTable(realTable, body, single);
  clonedNodes = getChildrenFromTable(innerTableClone, body, single);
  createStickyHeaderNodes(realNodes, clonedNodes);
  return innerTableClone;
};

exports.StickyTableHeaders = /*@__PURE__*/(function () {
  function StickyTableHeaders(selector, options) {
    var bottomIndicator, container, leftIndicator, resolvedOptions, rightIndicator, selection, self, showScrollIndicators, table, tableIsRootElement, topIndicator, wrapper;
    resolvedOptions = exports.mergeDefined({
      stickTableHead: true, // stick thead element
      stickFirstColumn: false, // stick first column
      useResponsive: true,
      fullWidth: void 0,
      containerClass: void 0 // Class to add to container to allow styling - useful for situations where table is the root element
    }, options);
    selection = select(selector).api('sticky-table-headers', this).api(this);
    table = selection.classed('hx-table') || selection.node().nodeName.toLowerCase() === 'table' ? (tableIsRootElement = true, selection) : (tableIsRootElement = false, selection.select('.hx-table'));
    if (table.classed('hx-table-full') && (options.fullWidth == null)) {
      options.fullWidth = true;
    }
    if (resolvedOptions.stickTableHead && table.select('thead').selectAll('tr').empty()) {
      // Cant stick something that isn't there
      logger.warn('hx.StickyTableHeaders - ' + selector, 'Sticky table headers initialized with stickTableHead of true without a thead element present');
      resolvedOptions.stickTableHead = false;
    }
    if (resolvedOptions.stickFirstColumn && table.select('tbody').select('tr').selectAll('th, td').empty()) {
      // Cant stick something that isn't there
      logger.warn('hx.StickyTableHeaders - ' + selector, 'Sticky table headers initialized with stickFirstColumn of true without any columns to stick');
      resolvedOptions.stickFirstColumn = false;
    }
    // Create the container, this will always be the root element.
    // If the table is the root element, we have to create a div alongside it
    // to allow structuring of the Sticky headers.
    // There's a higher chance of visual issues using this method.
    container = tableIsRootElement ? table.insertAfter('div').class('hx-sticky-table-headers') : selection.classed('hx-sticky-table-headers', true);
    if (resolvedOptions.containerClass) {
      container.classed(resolvedOptions.containerClass, true);
    }
    // Table wrapper that allows scrolling on the table.
    wrapper = container.append('div').class('hx-sticky-table-wrapper');
    // Put the original table into the wrapper.
    wrapper.append(table);
    showScrollIndicators = scrollbarSize() === 0;
    if (showScrollIndicators) {
      // We use four separate divs as using one overlay div prevents click-through
      topIndicator = container.append('div').class('hx-sticky-table-scroll-top');
      rightIndicator = container.append('div').class('hx-sticky-table-scroll-right');
      bottomIndicator = container.append('div').class('hx-sticky-table-scroll-bottom');
      leftIndicator = container.append('div').class('hx-sticky-table-scroll-left');
    }
    // Does all the work of rendering the headers correctly
    wrapper.on('scroll', 'hx.sticky-table-headers', function() {
      if (showScrollIndicators) {
        updateScrollIndicators(wrapper, topIndicator, rightIndicator, bottomIndicator, leftIndicator);
      }
      return updateHeaderPositions(container, wrapper.node());
    });
    this._ = {
      options: resolvedOptions,
      container: container,
      wrapper: wrapper,
      table: table,
      selection: selection,
      showScrollIndicators: showScrollIndicators
    };
    this.render();
    if (resolvedOptions.useResponsive) {
      self = this;
      container.on('resize', 'hx.sticky-table-headers', function() {
        self.render();
        return setTimeout((function() {
          return self.render();
        }), 100);
      });
    }
  }

  StickyTableHeaders.prototype.render = function render () {
    var _, background, bottomIndicator, container, hasHorizontalScroll, hasVerticalScroll, heightScrollbarOffset, leftHead, leftIndicator, leftTable, offsetHeight, offsetWidth, offsetWidthElem, options, origScroll, rightIndicator, scrollOffsetHeight, scrollOffsetWidth, table, tableBox, tableClone, topHead, topIndicator, topLeftHead, topLeftTable, topTable, totalHeight, totalWidth, widthScrollbarOffset, wrapper, wrapperBox, wrapperNode;
    _ = this._;
    container = _.container;
    wrapper = _.wrapper;
    wrapperNode = wrapper.node();
    table = _.table;
    options = _.options;
    origScroll = wrapperNode.scrollTop;
    container.style('height', void 0).style('width', void 0);
    wrapper.style('height', void 0).style('width', void 0).style('margin-top', void 0).style('margin-left', void 0).style('max-width', void 0).style('max-height', void 0);
    table.style('margin-top', void 0).style('margin-left', void 0).style('min-width', void 0).style('min-height', void 0);
    offsetHeight = 0;
    offsetWidth = 0;
    if (options.fullWidth) {
      table.style('width', '100%');
    }
    if (options.stickTableHead) {
      offsetHeight = table.select('thead').height();
    }
    if (options.stickFirstColumn) {
      offsetWidthElem = select(table.select('tbody').select('tr').select('th, td').nodes[0]);
      offsetWidth = offsetWidthElem.width();
    }
    totalHeight = container.style('height').replace('px', '') - offsetHeight;
    totalWidth = container.style('width').replace('px', '') - offsetWidth;
    wrapper.style('width', totalWidth + 'px').style('height', totalHeight + 'px').style('margin-top', offsetHeight + 'px').style('margin-left', offsetWidth + 'px');
    // resize and reposition stuff
    table.style('margin-top', -offsetHeight + 'px').style('margin-left', -offsetWidth + 'px');
    tableBox = table.box();
    hasVerticalScroll = wrapperNode.scrollHeight > (wrapperNode.clientHeight + scrollbarSize());
    hasHorizontalScroll = wrapperNode.scrollWidth > (wrapperNode.clientWidth + scrollbarSize());
    heightScrollbarOffset = hasHorizontalScroll ? scrollbarSize() : 0;
    widthScrollbarOffset = hasVerticalScroll ? scrollbarSize() : 0;
    wrapperBox = wrapper.box();
    if (options.fullWidth) {
      table.style('width', void 0).style('min-width', wrapperBox.width + offsetWidth - widthScrollbarOffset - 1 + 'px');
    } else {
      wrapper.style('max-width', tableBox.width - offsetWidth + widthScrollbarOffset + 'px').style('max-height', tableBox.height - offsetHeight + heightScrollbarOffset + 'px');
    }
    tableClone = table.clone(true).style('height', table.style('height')).style('width', table.style('width'));
    if (options.stickTableHead) {
      // Append top
      topHead = container.shallowSelect('.hx-sticky-table-header-top');
      if (topHead.empty()) {
        topHead = container.prepend('div').class('hx-sticky-table-header-top');
        // We don't need to do this when the scrollbar size is 0 as there's no empty space shown
        // at the end of each sticky header when scrolling to the bottom right corner of a table.
        if (!_.showScrollIndicators && options.fullWidth) {
          background = table.select('th').style('background-color');
          topHead.style('background-color', background);
        }
      }
      topHead.clear();
      topTable = cloneTableAndNodeEvents(topHead, table, tableClone);
    }
    if (options.stickFirstColumn) {
      // Append left
      leftHead = container.shallowSelect('.hx-sticky-table-header-left');
      if (leftHead.empty()) {
        leftHead = container.prepend('div').class('hx-sticky-table-header-left');
        if (!_.showScrollIndicators && options.fullWidth) {
          background = table.select('th').style('background-color');
          leftHead.style('background-color', background);
        }
      }
      leftHead.clear();
      leftTable = cloneTableAndNodeEvents(leftHead, table, tableClone, true, true);
    }
    if (options.stickTableHead && options.stickFirstColumn) {
      // Append top left
      topLeftHead = container.shallowSelect('.hx-sticky-table-header-top-left');
      if (topLeftHead.empty()) {
        topLeftHead = container.prepend('div').class('hx-sticky-table-header-top-left');
      }
      topLeftHead.clear();
      topLeftTable = cloneTableAndNodeEvents(topLeftHead, table, tableClone, false, true);
    }
    if (topHead != null) {
      topHead.style('height', offsetHeight + 'px').style('width', wrapperBox.width + 'px').style('left', offsetWidth + 'px');
    }
    if (topTable != null) {
      topTable.style('margin-left', -offsetWidth + 'px');
    }
    if (leftHead != null) {
      leftHead.style('height', wrapperBox.height + 'px').style('width', offsetWidth + 'px').style('top', offsetHeight + 'px');
    }
    if (leftTable != null) {
      leftTable.style('margin-top', -offsetHeight + 'px');
    }
    if (topLeftHead != null) {
      topLeftHead.style('width', (leftHead != null ? leftHead.style('width') : void 0) || offsetWidth + 'px').style('height', (topHead != null ? topHead.style('height') : void 0) || offsetHeight + 'px');
    }
    wrapperNode.scrollTop = origScroll;
    if (_.showScrollIndicators) {
      scrollOffsetWidth = offsetWidth - 1;
      scrollOffsetHeight = offsetHeight - 1;
      topIndicator = container.shallowSelect('.hx-sticky-table-scroll-top').style('top', scrollOffsetHeight + 'px').style('left', scrollOffsetWidth + 'px').style('width', wrapperBox.width + 'px');
      rightIndicator = container.shallowSelect('.hx-sticky-table-scroll-right').style('top', scrollOffsetHeight + 'px').style('height', wrapperBox.height + 'px');
      bottomIndicator = container.shallowSelect('.hx-sticky-table-scroll-bottom').style('left', scrollOffsetWidth + 'px').style('width', wrapperBox.width + 'px');
      leftIndicator = container.shallowSelect('.hx-sticky-table-scroll-left').style('top', scrollOffsetHeight + 'px').style('left', scrollOffsetWidth + 'px').style('height', wrapperBox.height + 'px');
      updateScrollIndicators(wrapper, topIndicator, rightIndicator, bottomIndicator, leftIndicator);
    }
    return updateHeaderPositions(container, wrapper.node());
  };

  return StickyTableHeaders;
}());

var defaultCalculateMessageDurationOptions = {
  minMessageDuration: 2000,
  maxMessageDuration: 7000,
};
function calculateMessageDuration(
  title,
  body,
  ref
) {
  if ( title === void 0 ) title = '';
  if ( body === void 0 ) body = '';
  if ( ref === void 0 ) ref = defaultCalculateMessageDurationOptions;
  var minMessageDuration = ref.minMessageDuration; if ( minMessageDuration === void 0 ) minMessageDuration = 2000;
  var maxMessageDuration = ref.maxMessageDuration; if ( maxMessageDuration === void 0 ) maxMessageDuration = 7000;

  var length = title.length + body.length;
  var readingDuration = length * 50;
  return Math.min(Math.max(readingDuration, minMessageDuration), maxMessageDuration);
}

var Alert = function Alert(id, closeAction, options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  this.id = id;
  this.closeAction = closeAction;
  this.options = options;

  if (this.options.duration) {
    this.activeTimeout = window.setTimeout(
      function () { return this$1.close(); },
      this.options.duration
    );
  }
};

Alert.prototype.render = function render () {
    var this$1 = this;

  var ref = this.options;
    var title = ref.title;
    var body = ref.body;
    var type = ref.type;
    var duration = ref.duration;

  var titleSpan = title
    ? span('hx-alert-title').text((title + " "))
    : undefined;

  var bodySpan = body
    ? span('hx-alert-body').text(body)
    : undefined;

  var closeDiv = !duration
    ? div('hx-alert-close')
      .add(i('hx-alert-icon fas fa-times'))
      .on('click', function () { return this$1.close(); })
    : undefined;

  return div('hx-alert')
    .classed(("hx-alert-" + type), type)
    .add(div('hx-alert-content')
      .add(titleSpan)
      .add(bodySpan))
    .add(closeDiv);
};

Alert.prototype.close = function close () {
  window.clearTimeout(this.activeTimeout);
  delete this.activeTimeout;
  this.closeAction(this.id);
  return this;
};

var AlertManager = function AlertManager(selector, options) {
  if ( selector === void 0 ) selector = 'body';
  if ( options === void 0 ) options = {};

  this.options = exports.merge({
    animationInDuration: 200,
    animationOutDuration: 200,
  }, defaultCalculateMessageDurationOptions, options);

  this._ = {
    container: undefined,
    currentId: 0,
    alerts: [],
  };

  this.selection = select(selector);
};

AlertManager.prototype.message = function message (options) {
  if (!options) {
    throw new Error('AlertManager::message - No options were provided. An object with title or body should be provided');
  }

  var title = options.title;
    var body = options.body;
    var type = options.type;
    var duration = options.duration;

  var types = ['success'];
  if (type && !types.includes(type)) {
    throw new Error(("AlertManager::message - Invalid message type provided: '" + type + "'.\nAccepted types: ['" + (types.join('\', \'')) + "']"));
  }
  return this.addAlert({
    title: title,
    body: body,
    duration: duration || calculateMessageDuration(title, body, this.options),
    type: type,
  });
};

AlertManager.prototype.alert = function alert (options) {
  if (!options) {
    throw new Error('AlertManager::alert - No options were provided. An object with title or body should be provided');
  }

  var title = options.title;
    var body = options.body;
    var type = options.type;
    var duration = options.duration;

  var types = ['success', 'warning', 'danger'];
  if (type && !types.includes(type)) {
    throw new Error(("AlertManager::alert - Invalid alert type provided: '" + type + "'.\nAccepted types: ['" + (types.join('\', \'')) + "']"));
  }
  if (duration) {
    logger.warn('AlertManager::alert called with "duration" but can only be closed by user interaction. Ignoring passed in duration');
  }
  return this.addAlert({
    title: title,
    body: body,
    duration: undefined,
    type: type,
  });
};

AlertManager.prototype.render = function render () {
  var container = this.createOrGetContainer();

  container.api('_alerts-view')
    .apply(this._.alerts, function (d) { return d.id; });

  return this;
};

AlertManager.prototype.addAlert = function addAlert (options) {
    var this$1 = this;

  var nextId = "alert-" + (exports.randomId());
  var alertToAdd = new Alert(nextId, function (id) { return this$1.closeAlert(id); }, options);
  this._.alerts.unshift(alertToAdd);
  this.render();
  return alertToAdd;
};

AlertManager.prototype.closeAlert = function closeAlert (idToClose) {
  var alertToClose = this._.alerts.find(function (ref) {
      var id = ref.id;

      return id === idToClose;
    });
  var index = this._.alerts.indexOf(alertToClose);
  if (index >= 0) {
    this._.alerts.splice(index, 1);
    this.render();
  }
};

AlertManager.prototype.createOrGetContainer = function createOrGetContainer () {
  var alertMgr = this;
  var ref = alertMgr._;
    var container = ref.container;

  if (!container) {
    var newContainer = alertMgr.selection.append(div('hx-alert-container'));
    var view = newContainer.view('.hx-alert')
      .enter(function enter(thisAlert) {
        var nSel = thisAlert.render();

        this.prepend(nSel);

        nSel
          .style('opacity', 0)
          .style('height', 0)
          .style('padding-top', 0)
          .style('padding-bottom', 0)
          .morph()
          .with('fadein', alertMgr.options.animationInDuration)
          .and('expandv', alertMgr.options.animationInDuration)
          .then(function () { return nSel
            .style('padding-top', undefined)
            .style('padding-bottom', undefined)
            .style('height', undefined)
            .style('opacity', undefined); })
          .go();

        return nSel.node();
      })
      .exit(function exit() {
          var this$1 = this;

        this.style('opacity', '1')
          .morph()
          .with('collapsev', alertMgr.options.animationOutDuration)
          .and('fadeout', alertMgr.options.animationOutDuration)
          .then(function () { return this$1.remove(); })
          .go();
      });

    newContainer.api('_alerts-view', view);
    alertMgr._.container = newContainer;
  }
  return alertMgr._.container;
};

var inbuiltAlertManager = new AlertManager();

function message(options) {
  return inbuiltAlertManager.message(options);
}

function alert(options) {
  return inbuiltAlertManager.alert(options);
}

var LTTBFeather, arcCurve, arcCurveMinimumRadius, boundLabel, createLabelPoint, createLinearGradient, dataAverage, doCollisionDetection, extent, findLabel, inefficientSearch, makeLabelDetails, maxTriangle, optionSetterGetter$1, populateLegendSeries, search, splitAndFeather, splitData, svgCurve;

doCollisionDetection = function(nodesRaw) {
  var distance, nodes, reductor;
  nodes = nodesRaw.map(function(node, index) {
    return {
      node: node,
      index: index,
      box: node.getBoundingClientRect()
    };
  });
  reductor = function(oldDistance, ref) {
    var currentIndex = ref.index;
    var currBox = ref.box;

    var previousNodes, tuple;
    previousNodes = nodes.slice(0, currentIndex - oldDistance + 1);
    tuple = exports.find(previousNodes, function(ref) {
      var previousIndex = ref.index;
      var prevBox = ref.box;

      return currBox.left < prevBox.right;
    });
    if (tuple) {
      return currentIndex - tuple.index;
    } else {
      return oldDistance;
    }
  };
  distance = nodes.reduce(reductor, 1);
  return nodes.forEach(function(ref) {
    var node = ref.node;
    var currentIndex = ref.index;

    if (currentIndex % (distance + 1)) {
      return select(node).text('');
    }
  });
};

// encodes the data into an svg path string
svgCurve = function(data, close) {
  var i, j, l, ref, segments;
  if (data.length > 1) {
    //OPTIM: it might actually be faster to do standard string concatination here. need to test...
    segments = new Array(data.length);
    segments[0] = 'M' + data[0].x + ',' + data[0].y;
    l = data.length - 1;
    for (i = j = 1, ref = l; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
      segments[i] = 'L' + data[i].x + ',' + data[i].y;
    }
    if (close) {
      return segments.join('') + 'z';
    } else {
      return segments.join('');
    }
  } else {
    return '';
  }
};

arcCurveMinimumRadius = function(startRadians, endRadians, padding) {
  var DELTA, radians, theta;
  if (padding === 0) {
    return 0;
  }
  DELTA = 1e-4;
  radians = endRadians - startRadians;
  theta = radians < Math.PI ? radians / 2 : Math.PI - radians / 2;
  if (Math.abs(Math.sin(theta)) < DELTA) {
    return 0;
  } else {
    return padding / 2 / Math.sin(theta);
  }
};

arcCurve = function(x, y, innerRadius, outerRadius, startRadians, endRadians, padding, dontCurveCenter) {
  var pixelsToRadians, points, pointsRequired, pushPoints, radians;
  radians = endRadians - startRadians;
  //convert padding (in pixels) into radians (for a radius r)
  pixelsToRadians = function(pixels, radius) {
    return pixels / radius;
  };
  pushPoints = function(startPoint, endPoint, radius) {
    var i, j, pmax, r, radpad, ref, ref1, results, theta;
    radpad = pixelsToRadians(padding, radius);
    pmax = Math.abs(endPoint - startPoint);
    results = [];
    for (i = j = ref = startPoint, ref1 = endPoint; (ref <= ref1 ? j <= ref1 : j >= ref1); i = ref <= ref1 ? ++j : --j) {
      r = radians - radpad;
      theta = r > 0 ? startRadians + (radpad / 2) + ((i / pmax) * r) : endRadians - (radpad / 2) - ((i / pmax) * r);
      theta = exports.clamp(startRadians, endRadians, theta);
      results.push(points.push({
        x: x + radius * Math.cos(theta),
        y: y + radius * Math.sin(theta)
      }));
    }
    return results;
  };
  pointsRequired = Math.min(100, Math.max(3, Math.floor(radians * Math.sqrt(outerRadius)) - 1));
  points = [];
  // if there is no inner radius set, then we only need one point at the middle
  if (innerRadius === 0 || dontCurveCenter) {
    points.push({
      x: x + innerRadius * Math.cos((startRadians + endRadians) / 2),
      y: y + innerRadius * Math.sin((startRadians + endRadians) / 2)
    });
  } else {
    pushPoints(0, pointsRequired, innerRadius);
  }
  pushPoints(pointsRequired, 0, outerRadius);
  return svgCurve(points, true);
};

// calculates the min and max of some data using an accessor function to select the value to use
extent = function(data, f) {
  var d, dmax, dmin, j, len;
  if (data.length > 0) {
    dmin = f(data[0]);
    dmax = f(data[0]);
    for (j = 0, len = data.length; j < len; j++) {
      d = data[j];
      dmin = exports.min([dmin, f(d)]);
      dmax = exports.max([dmax, f(d)]);
    }
    return [dmin, dmax];
  } else {
    return void 0;
  }
};

splitData = function(data, defined) {
  if ( defined === void 0 ) defined = function() {};

  var awaitingReal, current, d, datas, j, l, len;
  l = data.length;
  datas = [];
  current = void 0;
  awaitingReal = true;
  for (j = 0, len = data.length; j < len; j++) {
    d = data[j];
    if (defined(d)) {
      if (awaitingReal) {
        current = [];
        datas.push(current);
        awaitingReal = false;
      }
      current.push(d);
    } else {
      awaitingReal = true;
    }
  }
  return datas.filter(function(d) {
    return d.length > 0;
  });
};

//choose n values so that the maximum number of values returned in the new array doesn't exceed maxSize
splitAndFeather = function(data, maxSize, defined) {
  if ( defined === void 0 ) defined = function() {};

  var d, featherFactor, j, len, ref, results;
  if (maxSize) {
    featherFactor = maxSize / data.length;
    ref = splitData(data, defined);
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      d = ref[j];
      results.push(LTTBFeather(d, Math.floor(d.length * featherFactor)));
    }
    return results;
  } else {
    return splitData(data, defined);
  }
};

//Largest-Triangle-Three-Buckets Algorithm for feathering
LTTBFeather = function(array, maxSize) {
  if ( maxSize === void 0 ) maxSize = 200;

  var bucket, bucketSize, data1, data2, i, j, newData, originalLength, ref;
  if (maxSize > 1) {
    originalLength = array.length;
    if (originalLength > maxSize) {
      newData = new Array(maxSize);
      newData[0] = array[0];
      newData[maxSize - 1] = array[originalLength - 1];
      bucketSize = (originalLength - 2) / (maxSize - 2);
      for (i = j = 1, ref = maxSize - 1; j < ref; i = j += 1) {
        data1 = newData[i - 1];
        bucket = array.slice(Math.floor((i - 1) * bucketSize) + 1, Math.floor(i * bucketSize) + 1);
        data2 = dataAverage(array.slice(Math.floor(i * bucketSize) + 1, Math.floor((i + 1) * bucketSize) + 1));
        newData[i] = maxTriangle(data1, bucket, data2);
      }
      return newData;
    } else {
      return array.slice(0);
    }
  } else if (maxSize === 1 && array.length > 0) {
    return [array[Math.floor(array.length / 2)]];
  } else {
    return [];
  }
};

//calculate the average point in a data point array
dataAverage = function(array) {
  var length, sum;
  length = array.length;
  if (array[0].y !== void 0) {
    sum = array.reduce(function(a, b) {
      return {
        x: a.x + b.x,
        y: a.y + b.y
      };
    });
    return {
      x: sum.x / length,
      y: sum.y / length
    };
  } else {
    sum = array.reduce(function(a, b) {
      return {
        x: a.x + b.x,
        y1: a.y1 + b.y1,
        y2: a.y2 + b.y2
      };
    });
    return {
      x: sum.x / length,
      y1: sum.y1 / length,
      y2: sum.y2 / length
    };
  }
};

//find the data point in an array with the largest triangle forming with two selected points
maxTriangle = function(data1, array, data2) {
  var area, d, data, j, len, maxArea;
  maxArea = -1;
  for (j = 0, len = array.length; j < len; j++) {
    d = array[j];
    if (d.y !== void 0) {
      area = Math.abs((data1.x - data2.x) * (d.y - data1.y) - (data2.y - data1.y) * (data1.x - d.x));
    } else {
      area = Math.abs((data1.x - data2.x) * (Math.abs(d.y1 - d.y2) - Math.abs(data1.y2 - data1.y1)) - (Math.abs(data2.y2 - data2.y1) - Math.abs(data1.y2 - data1.y1)) * (data1.x - d.x));
    }
    if (area > maxArea) {
      maxArea = area;
      data = d;
    }
  }
  return data;
};

// XXX: make this use binary search (since array should be sorted)
inefficientSearch = function(array, find, nearest, v) {
  var i, j, ref;
  for (i = j = 0, ref = array.length - 1; j < ref; i = j += 1) {
    if ((v(array[i]) <= find && find <= v(array[i + 1]))) {
      if (nearest) {
        if (Math.abs(v(array[i]) - find) < Math.abs(v(array[i + 1]) - find)) {
          return i;
        } else {
          return i + 1;
        }
      } else {
        return i;
      }
    }
  }
  return -1;
};

// performs a binary search for the closest value
search = function(array, find, lookup) {
  var ibest, imax, imid, imin;
  if (array.length < 2) {
    return array.length - 1;
  }
  imin = 0;
  imax = array.length - 1;
  ibest = imin;
  while (imin <= imax) {
    imid = Math.floor((imax + imin) / 2);
    if (lookup(array[imid]) < find) {
      imin = imid + 1;
    } else if (lookup(array[imid]) > find) {
      imax = imid - 1;
    } else {
      return imid;
    }
    if (Math.abs(lookup(array[imid]) - find) < Math.abs(lookup(array[ibest]) - find)) {
      ibest = imid;
    }
  }
  return ibest;
};

// works out the label to show given the x value
findLabel = function(array, find, interpolate, interpolateValues) {
  var closest, dist, i, inLower, inUpper, interpolated, nextClosest;
  i = search(array, find, function(d) {
    return d.x;
  });
  if (i > -1) {
    if (interpolate) {
      closest = array[i];
      dist = find - closest.x;
      inLower = dist < 0 && i > 0;
      inUpper = dist > 0 && i < array.length - 1;
      if (inLower || inUpper) {
        nextClosest = array[inLower ? i - 1 : i + 1];
        interpolated = interpolateValues(find, closest, nextClosest, function(yClosest, yNextClosest) {
          return yClosest + (yClosest - yNextClosest) * dist / (closest.x - nextClosest.x);
        });
        if (interpolated != null) {
          return interpolated;
        } else {
          return array[i];
        }
      } else {
        return array[i];
      }
    } else {
      return array[i];
    }
  }
};

// creates label canditate label points for all the sections of data in a series, then picks the
// one that is closest to the mouse
createLabelPoint = function(series, x, y, interpolator) {
  var bestDist, bestPoint, data, dist, j, len, point, ref, xx;
  if (series.labelsEnabled()) {
    bestPoint = void 0;
    bestDist = -1;
    xx = series.axis.xScale.inverse(x);
    ref = series._.featheredData;
    for (j = 0, len = ref.length; j < len; j++) {
      data = ref[j];
      point = findLabel(series.data(), xx, series.labelInterpolated(), interpolator);
      if (point) {
        dist = Math.abs(point.x - xx);
        if (dist < bestDist || (bestPoint == null)) {
          bestDist = dist;
          bestPoint = point;
        }
      }
    }
    return bestPoint;
  }
};

makeLabelDetails = function(series, point, yAccessor, xProperty, yProperty) {
  if ( xProperty === void 0 ) xProperty = 'x';
  if ( yProperty === void 0 ) yProperty = 'y';

  return {
    series: series,
    title: series.title(),
    x: series.axis.xScale.apply(point.x),
    y: series.axis.yScale.apply(yAccessor(point)),
    color: series.legendColor(),
    values: series.labelValuesExtractor()(series, point, void 0, yAccessor, xProperty, yProperty)
  };
};

boundLabel = function(label, graph) {
  label.bounding = graph.plotArea;
  return label;
};

createLinearGradient = function(parent, values, series) {
  var gradientId, linearGradient;
  gradientId = exports.randomId();
  select(parent).select('.hx-linear-gradient').remove();
  linearGradient = select(parent).append('linearGradient').attr('class', 'hx-linear-gradient').attr('id', gradientId).attr('gradientUnits', "userSpaceOnUse").attr('x1', 0).attr('x2', 0).attr('y1', series.axis.yScale.rangeMin).attr('y2', series.axis.yScale.rangeMax);
  values.forEach(function(value) {
    return linearGradient.append('stop').attr('offset', ((value.yValue - series.axis.yScale.domainMin) / (series.axis.yScale.domainMax - series.axis.yScale.domainMin) * 100) + '%').attr('stop-color', color(value.color).alpha(1).toString()).attr('stop-opacity', color(value.color).alpha());
  });
  return gradientId;
};

populateLegendSeries = function(selection, series) {
  var background, width;
  background = selection.select('.hx-legend-box');
  if (background.size() === 0) {
    background = selection.append('rect').class('hx-legend-box');
  }
  selection.view('.hx-legend-entry', 'g').enter(function() {
    selection = this.append('g').class('hx-legend-entry');
    selection.append('text');
    selection.append('rect');
    return selection.node();
  }).update(function(s, e, i) {
    this.select('text').text(exports.isFunction(s.title) ? s.title() : s.name).attr('y', i * 20 + 10).attr('x', 15);
    return this.select('rect').text(exports.isFunction(s.title) ? s.title() : s.name).attr('y', i * 20).attr('x', 0).attr('width', 10).attr('height', 10).attr('fill', s.legendColor ? s.legendColor() : s.fillColor); // XXX: the else s.fillColor is there for PieCharts... which should be fixed when pie charts are refactored
  }).apply(series);
  width = exports.max(selection.selectAll('text').nodes.map(function(node) {
    return node.getComputedTextLength();
  }));
  background.attr('width', width + 6 + 20);
  background.attr('x', -5);
  background.attr('height', series.length * 20);
  background.attr('y', -5);
  return selection;
};

optionSetterGetter$1 = function(name) {
  return function(value) {
    if (arguments.length > 0) {
      this._.options[name] = value;
      return this;
    } else {
      return this._.options[name];
    }
  };
};

exports.plotLabelStandard = function(element, meta) {
  var createEntry, details, header, midX, midY;
  createEntry = function(value) {
    return div('hx-plot-label-details-entry').add(span('hx-plot-label-details-entry-key').text(value.name)).add(span('hx-plot-label-details-entry-value').text(value.formatter(value.value)));
  };
  header = div('hx-plot-label-marker').style('background', meta.color);
  details = div('hx-plot-label-details').add(div('hx-plot-label-details-header').text(meta.title)).add(meta.values.map(createEntry));
  midX = (meta.bounding.x1 + meta.bounding.x2) / 2;
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2;
  details.classed('hx-plot-label-details-left', meta.x >= midX);
  details.classed('hx-plot-label-details-bottom', meta.y >= midY);
  return select(element).clear().add(header).add(details);
};

exports.plotLabelBasic = function(element, meta) {
  var details, marker, midX, midY, value;
  marker = div('hx-plot-label-marker').style('background', meta.color);
  value = meta.values[1];
  midX = (meta.bounding.x1 + meta.bounding.x2) / 2;
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2;
  details = div('hx-plot-label-details-basic').classed('hx-plot-label-details-left', meta.x >= midX).classed('hx-plot-label-details-bottom', meta.y >= midY).text(value.formatter(value.value));
  return select(element).clear().add(marker).add(details);
};

var Series;

Series = (function() {
  var defaultLabelValuesExtractor;

  var Series = /*@__PURE__*/(function (EventEmitter) {
    function Series(options) {
      var base;
      EventEmitter.call(this);
      this._ = {
        options: exports.merge({
          title: void 0,
          data: void 0,
          labelsEnabled: true,
          labelRenderer: exports.plotLabelStandard,
          labelInterpolated: false,
          labelFormatters: {},
          class: '',
          type: void 0, // used to determine which type of series we are dealing with,
          labelValuesExtractor: defaultLabelValuesExtractor
        }, options),
        featheredData: [],
        axis: void 0,
        seriesId: void 0
      };
      if ((base = this._.options).data == null) {
        base.data = [];
      }
    }

    if ( EventEmitter ) Series.__proto__ = EventEmitter;
    Series.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    Series.prototype.constructor = Series;

    Series.prototype.labelFormatter = function labelFormatter (name, value) {
      if (arguments.length > 1) {
        this._.options.labelFormatters[name] = value;
        return this;
      } else {
        return this._.options.labelFormatters[name];
      }
    };

    Series.prototype.getX = function getX (y) {
      var d, data, i;
      data = this.data();
      if (exports.isString(y)) {
        d = exports.find(data, function(d) {
          return d.y === y;
        });
        if (exports.defined(d)) {
          return d.x;
        } else {
          return void 0;
        }
      } else {
        i = inefficientSearch(data, y, true, function(d) {
          return d.y;
        });
        return data[i].x;
      }
    };

    Series.prototype.getY = function getY (x, isDiscrete) {
      var d, data, i, x1, x2, y1, y2;
      data = this.data();
      if (exports.isString(x)) {
        d = exports.find(data, function(d) {
          return d.x === x;
        });
        if (exports.defined(d)) {
          return d.y;
        } else {
          return void 0;
        }
      } else {
        i = inefficientSearch(data, x, false, function(d) {
          return d.x;
        });
        if ((0 <= i && i < data.length - 1)) {
          x1 = data[i].x;
          x2 = data[i + 1].x;
          y1 = data[i].y;
          y2 = data[i + 1].y;
          return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
        } else {
          if (x > data[data.length - 1].x) {
            if (!isDiscrete) {
              return data[data.length - 1].y;
            }
          } else {
            return data[0].y;
          }
        }
      }
    };

    // returns an array of label detail objects (often of length one)
    Series.prototype.getLabelDetails = function getLabelDetails (x, y) {};

    // Implemented by the series type
    Series.prototype.updateSvg = function updateSvg (element) {};

    // Implemented by the series type
    Series.prototype.legendColor = function legendColor () {};

    return Series;
  }(EventEmitter));
  defaultLabelValuesExtractor = function(series, dataPoint, xAccessor, yAccessor, xProperty, yProperty) {
    if ( xProperty === void 0 ) xProperty = 'x';
    if ( yProperty === void 0 ) yProperty = 'y';

    return [
      {
        name: series.axis.x.title(),
        value: dataPoint[xProperty + 'Label'] || (xAccessor ? xAccessor(dataPoint) : dataPoint.x),
        formatter: series.labelFormatter(xProperty) || series.axis.x.formatter()
      },
      {
        name: series.axis.y.title(),
        value: dataPoint[yProperty + 'Label'] || (yAccessor ? yAccessor(dataPoint) : dataPoint.y),
        formatter: series.labelFormatter(yProperty) || series.axis.y.formatter()
      }
    ];
  };

  Series.prototype.title = optionSetterGetter$1('title');

  Series.prototype.data = optionSetterGetter$1('data');

  Series.prototype.labelsEnabled = optionSetterGetter$1('labelsEnabled');

  Series.prototype.labelRenderer = optionSetterGetter$1('labelRenderer');

  Series.prototype.labelInterpolated = optionSetterGetter$1('labelInterpolated');

  Series.prototype.labelValuesExtractor = optionSetterGetter$1('labelValuesExtractor');

  Series.prototype.class = optionSetterGetter$1('class');

  return Series;

}).call(undefined);

var updatePath;

updatePath = function(series, element, _class, data, type, update) {
  return select(element).view('.hx-series-data', 'g').update(function(d) {
    return this.class('hx-series-data hx-series-line ' + series.class()).view(_class, type).update(update).apply(d);
  }).apply(data);
};

exports.LineSeries = (function() {
  var lineSeriesDataInterpolator, scale;

  var LineSeries = /*@__PURE__*/(function (Series) {
    function LineSeries(options) {
      Series.call(this, exports.merge({
        strokeEnabled: true,
        strokeColor: theme().plotColor1,
        fillEnabled: false,
        fillColor: void 0,
        markersEnabled: false,
        markerRadius: 2,
        markerFillColor: void 0,
        sampleThreshold: 200,
        group: void 0
      }, options));
      this._.type = 'line';
    }

    if ( Series ) LineSeries.__proto__ = Series;
    LineSeries.prototype = Object.create( Series && Series.prototype );
    LineSeries.prototype.constructor = LineSeries;

    LineSeries.prototype.legendColor = function legendColor () {
      return this._.options.strokeColor;
    };

    LineSeries.prototype.updateSvg = function updateSvg (fillLayer, sparseLayer) {
      var applyStack, areas, axis, curves, data, featheredData, fillCol, fillPreparedData, fillToY, gradientCols, gradientId, preparedData, self, strokeCol;
      self = this;
      axis = this.axis;
      featheredData = splitAndFeather(this.data(), this.sampleThreshold(), function(d) {
        return d.y !== void 0;
      });
      this._.featheredData = featheredData;
      applyStack = function(dataToStack, calculateBaseline) {
        var d, i, len, results;
        results = [];
        for (i = 0, len = dataToStack.length; i < len; i++) {
          d = dataToStack[i];
          results.push({
            x: d.x,
            y: axis.getYStack(self._.type, self.group(), d.x, self._.seriesId) + (calculateBaseline ? 0 : d.y)
          });
        }
        return results;
      };
      if (this.fillEnabled()) {
        if (Array.isArray(self.fillColor() || self.strokeColor())) {
          gradientCols = self.fillColor() || self.strokeColor().map(function(d) {
            return {
              value: d.value,
              color: color(d.color).alpha(0.1).toString('rgba')
            };
          });
          gradientId = createLinearGradient(fillLayer, gradientCols, self);
          fillCol = 'url(#' + gradientId + ')';
        } else {
          fillCol = self.fillColor() || color(self.strokeColor()).alpha(0.1).toString();
        }
        fillToY = Math.max(Math.min(this.axis.yScale.domainMax, 0), this.axis.yScale.domainMin);
        fillPreparedData = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = featheredData.length; i < len; i++) {
            data = featheredData[i];
            results.push(applyStack(data).concat(applyStack(data.slice(0).reverse(), true)));
          }
          return results;
        })();
        areas = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = fillPreparedData.length; i < len; i++) {
            data = fillPreparedData[i];
            results.push(svgCurve(scale(data, this.axis), true));
          }
          return results;
        }).call(this);
        updatePath(this, fillLayer, '.hx-series-line-fill', areas, 'path', function(d) {
          return this.attr('d', d).attr('fill', fillCol);
        });
      }
      if (this.strokeEnabled()) {
        if (this.axis.y.scaleType() !== 'discrete') {
          curves = (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = featheredData.length; i < len; i++) {
              data = featheredData[i];
              results.push(svgCurve(scale(applyStack(data), this.axis)));
            }
            return results;
          }).call(this);
        } else {
          curves = (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = featheredData.length; i < len; i++) {
              data = featheredData[i];
              results.push(svgCurve(scale(data, this.axis)));
            }
            return results;
          }).call(this);
        }
        if (Array.isArray(this.strokeColor())) {
          gradientId = createLinearGradient(sparseLayer, this.strokeColor(), self);
          strokeCol = 'url(#' + gradientId + ')';
        } else {
          strokeCol = self.strokeColor();
        }
        updatePath(this, sparseLayer, '.hx-series-line-stroke', curves, 'path', function(d) {
          return this.attr('d', d).attr('stroke', strokeCol);
        });
      }
      if (this.markersEnabled()) {
        preparedData = this.axis.y.scaleType() !== 'discrete' ? applyStack(exports.flatten(featheredData)) : exports.flatten(featheredData);
        return updatePath(this, sparseLayer, '.hx-series-line-markers', scale(preparedData, this.axis), 'circle', function(d) {
          return this.attr('cx', d.x).attr('cy', d.y).attr('r', self.markerRadius()).attr('fill', self.markerFillColor() || self.strokeColor());
        });
      }
    };

    LineSeries.prototype.getLabelDetails = function getLabelDetails (x, y) {
      var this$1 = this;

      var point;
      if (point = createLabelPoint(this, x, y, lineSeriesDataInterpolator)) {
        return [
          makeLabelDetails(this,
          point,
          function (d) {
            return this$1.axis.getYStack(this$1._.type,
          this$1.group(),
          d.x,
          this$1._.seriesId) + d.y;
          })
        ];
      } else {
        return [];
      }
    };

    return LineSeries;
  }(Series));
  scale = function(data, axis) {
    var d, i, len, results;
    results = [];
    for (i = 0, len = data.length; i < len; i++) {
      d = data[i];
      results.push({
        x: axis.xScale.apply(d.x),
        y: axis.yScale.apply(d.y)
      });
    }
    return results;
  };

  LineSeries.prototype.strokeEnabled = optionSetterGetter$1('strokeEnabled');

  LineSeries.prototype.strokeColor = optionSetterGetter$1('strokeColor');

  LineSeries.prototype.fillEnabled = optionSetterGetter$1('fillEnabled');

  LineSeries.prototype.fillColor = optionSetterGetter$1('fillColor');

  LineSeries.prototype.markersEnabled = optionSetterGetter$1('markersEnabled');

  LineSeries.prototype.markerRadius = optionSetterGetter$1('markerRadius');

  LineSeries.prototype.markerFillColor = optionSetterGetter$1('markerFillColor');

  LineSeries.prototype.sampleThreshold = optionSetterGetter$1('sampleThreshold');

  LineSeries.prototype.group = optionSetterGetter$1('group');

  // usage for line series
  lineSeriesDataInterpolator = function(x, d1, d2, yInterp) {
    if ((d1.y != null) && (d2.y != null)) {
      return {
        x: x,
        y: yInterp(d1.y, d2.y)
      };
    }
  };

  return LineSeries;

}).call(undefined);

exports.BandSeries = (function() {
  var bandSeriesDataInterpolator, scale;

  var BandSeries = /*@__PURE__*/(function (Series) {
    function BandSeries(options) {
      Series.call(this, exports.merge({
        fillColor: color(theme().plotColor3).alpha(0.2).toString(),
        sampleThreshold: 200
      }, options));
      this._.type = 'band';
    }

    if ( Series ) BandSeries.__proto__ = Series;
    BandSeries.prototype = Object.create( Series && Series.prototype );
    BandSeries.prototype.constructor = BandSeries;

    BandSeries.prototype.legendColor = function legendColor () {
      return this._.options.fillColor;
    };

    BandSeries.prototype.updateSvg = function updateSvg (fillLayer) {
      var areas, data, fillCol, gradientCols, gradientId, preped, self;
      self = this;
      this._.featheredData = splitAndFeather(this.data(), this.sampleThreshold(), function(d) {
        return d.y1 !== void 0 && d.y2 !== void 0;
      });
      areas = (function() {
        var i, len, ref, results;
        ref = this._.featheredData;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          data = ref[i];
          preped = data.map(function(d) {
            return {
              x: d.x,
              y: d.y1
            };
          }).concat(data.slice(0).reverse().map(function(d) {
            return {
              x: d.x,
              y: d.y2
            };
          }));
          results.push(svgCurve(scale(preped, this.axis), true));
        }
        return results;
      }).call(this);
      if (Array.isArray(self.fillColor())) {
        gradientCols = self.fillColor().map(function(d) {
          return {
            value: d.value,
            color: d.color
          };
        });
        gradientId = createLinearGradient(fillLayer, gradientCols, this);
        fillCol = 'url(#' + gradientId + ')';
      } else {
        fillCol = self.fillColor();
      }
      return select(fillLayer).view('.hx-series-data', 'path', 'hx-series-area').update(function(d) {
        return this.attr('d', d).class('hx-series-data ' + self.class()).attr('fill', fillCol);
      }).apply(areas);
    };

    BandSeries.prototype.getLabelDetails = function getLabelDetails (x, y) {
      var point;
      if (point = createLabelPoint(this, x, y, bandSeriesDataInterpolator)) {
        return [
          makeLabelDetails(this,
          point,
          (function(d) {
            return d.y1;
          }),
          'x',
          'y1'),
          makeLabelDetails(this,
          point,
          (function(d) {
            return d.y2;
          }),
          'x',
          'y2')
        ];
      } else {
        return [];
      }
    };

    return BandSeries;
  }(Series));
  scale = function(data, axis) {
    var d, i, len, results;
    results = [];
    for (i = 0, len = data.length; i < len; i++) {
      d = data[i];
      results.push({
        x: axis.xScale.apply(d.x),
        y: axis.yScale.apply(d.y)
      });
    }
    return results;
  };

  BandSeries.prototype.fillColor = optionSetterGetter$1('fillColor');

  BandSeries.prototype.sampleThreshold = optionSetterGetter$1('sampleThreshold');

  bandSeriesDataInterpolator = function(x, d1, d2, yInterp) {
    if ((d1.y1 != null) && (d2.y1 != null) && (d1.y2 != null) && (d2.y2 != null)) {
      return {
        x: x,
        y1: yInterp(d1.y1, d2.y1),
        y2: yInterp(d1.y2, d2.y2)
      };
    }
  };

  return BandSeries;

}).call(undefined);

exports.ScatterSeries = (function() {
  var filter, scale;

  var ScatterSeries = /*@__PURE__*/(function (Series) {
    function ScatterSeries(options) {
      Series.call(this, exports.merge({
        fillColor: '',
        radius: 2
      }, options));
      this._.type = 'scatter';
    }

    if ( Series ) ScatterSeries.__proto__ = Series;
    ScatterSeries.prototype = Object.create( Series && Series.prototype );
    ScatterSeries.prototype.constructor = ScatterSeries;

    ScatterSeries.prototype.legendColor = function legendColor () {
      return this._.options.fillColor;
    };

    ScatterSeries.prototype.updateSvg = function updateSvg (fillLayer, sparseLayer) {
      var self;
      self = this;
      return select(sparseLayer).view('.hx-series-data', 'circle').update(function(d) {
        return this.class('hx-series-data hx-series-scatter ' + self.class()).attr('cx', d.x).attr('cy', d.y).attr('r', Math.max(d.radius || self.radius(), 0)).style('fill', d.fillColor || self.fillColor());
      }).apply(scale(filter(this.data()), this.axis));
    };

    ScatterSeries.prototype.getLabelDetails = function getLabelDetails (x, y) {
      var best, bestSquaredDistance, d, i, len, meta, ref, squaredDistance;
      if (this.labelsEnabled()) {
        // find the closest point - this has the potential to be slow, so might have to rethink this one
        best = void 0;
        bestSquaredDistance = 0;
        ref = filter(this.data());
        for (i = 0, len = ref.length; i < len; i++) {
          d = ref[i];
          squaredDistance = (this.axis.xScale.apply(d.x) - x) * (this.axis.xScale.apply(d.x) - x) + (this.axis.yScale.apply(d.y) - y) * (this.axis.yScale.apply(d.y) - y);
          if (best === void 0 || squaredDistance < bestSquaredDistance) {
            best = d;
            bestSquaredDistance = squaredDistance;
          }
        }
        if (best) {
          meta = {
            series: this,
            title: this.title(),
            x: this.axis.xScale.apply(best.x),
            y: this.axis.yScale.apply(best.y),
            color: best.color || this.fillColor(),
            values: this.labelValuesExtractor()(this, best)
          };
          return [meta];
        }
      } else {
        return [];
      }
    };

    return ScatterSeries;
  }(Series));
  // private functions
  filter = function(data) {
    return data.filter(function(d) {
      return d.x !== void 0 && d.y !== void 0;
    });
  };

  scale = function(data, axis) {
    var d, i, len, results;
    results = [];
    for (i = 0, len = data.length; i < len; i++) {
      d = data[i];
      results.push({
        x: axis.xScale.apply(d.x),
        y: axis.yScale.apply(d.y),
        radius: d.radius,
        fillColor: d.fillColor,
        color: d.color,
        size: d.size
      });
    }
    return results;
  };

  ScatterSeries.prototype.fillColor = optionSetterGetter$1('fillColor');

  ScatterSeries.prototype.radius = optionSetterGetter$1('radius');

  return ScatterSeries;

}).call(undefined);

exports.BarSeries = (function() {
  var BarSeries = /*@__PURE__*/(function (Series) {
    function BarSeries(options) {
      Series.call(this, exports.merge({
        fillColor: theme().plotColor2,
        group: void 0
      }, options));
      this._.type = 'bar';
    }

    if ( Series ) BarSeries.__proto__ = Series;
    BarSeries.prototype = Object.create( Series && Series.prototype );
    BarSeries.prototype.constructor = BarSeries;

    BarSeries.prototype.legendColor = function legendColor () {
      return this._.options.fillColor;
    };

    BarSeries.prototype.updateSvg = function updateSvg (fillLayer) {
      var axis, self;
      self = this;
      axis = this.axis;
      return select(fillLayer).view('.hx-series-data', 'rect').update(function(d) {
        var height, width, x, y;
        if (axis.x.scaleType() === 'discrete') {
          // width of the category
          width = axis.xScale.tickWidth() / self._.typeSize;
          // x position of the bar
          x = axis.xScale.apply(d.x) - width * self._.typeSize / 2 + self.groupId * width;
          // height of the bar in pixels
          height = Math.abs(axis.yScale.apply(d.y) - axis.yScale.apply(0));
          // y position of the bar
          y = axis.yScale.apply(axis.getYStack(self._.type, self.group(), d.x, self._.seriesId));
          if (d.y > 0) {
            y -= height;
          }
        } else {
          // width of the category
          width = Math.abs(axis.xScale.apply(d.x) - axis.xScale.apply(0));
          // x position of the bar
          x = axis.xScale.apply(axis.getXStack(self._.type, self.group(), d.y, self._.seriesId));
          // height of the bar in pixels
          height = Math.abs(axis.yScale.tickWidth() / self._.typeSize);
          // y position of the bar
          y = axis.yScale.apply(d.y) - height * self._.typeSize / 2 + self.groupId * height;
          if (d.y > 0) {
            y -= height;
          }
        }
        return this.class('hx-series-data hx-series-bar ' + self.class()).attr("y", y).attr("x", x).attr("height", Math.max(height, 0)).attr("width", Math.max(width, 0)).style("fill", d.color || self.fillColor());
      }).apply(this.data());
    };

    BarSeries.prototype.getLabelDetails = function getLabelDetails (x, y) {
      var barData, barX, barY, height, max, meta, min, width, xx, yy;
      if (this.labelsEnabled()) {
        xx = this.axis.xScale.inverse(x);
        yy = this.axis.yScale.inverse(y);
        barData = exports.find(this.data(), function(d) {
          return d.x === xx;
        });
        // XXX: this only works for vertically stacked bars
        if (barData) {
          // width of the bar
          width = this.axis.xScale.tickWidth() / this._.typeSize;
          // x position of the bar
          barX = this.axis.xScale.apply(barData.x) - width * this._.typeSize / 2 + this.groupId * width;
          // height of the bar in pixels
          height = Math.abs(this.axis.yScale.apply(barData.y) - this.axis.yScale.apply(0));
          // y position of the bar
          barY = this.axis.yScale.apply(this.axis.getYStack(this._.type, this.group(), barData.x, this._.seriesId));
          if (barData.y > 0) {
            barY -= height;
          }
          if ((xx != null) && (yy != null) && (barData != null)) { // and barX <= x < barX + width
            min = Math.min(barY, this.axis.yScale.apply(0));
            max = Math.max(barY, barY + height);
            yy = exports.clamp(min, max, this.axis.yScale.apply(yy));
            meta = {
              series: this,
              title: this.title(),
              x: barX + width / 2,
              y: yy,
              color: barData.color || this.fillColor(),
              values: this.labelValuesExtractor()(this, barData)
            };
            return [meta];
          } else {
            return [];
          }
        } else {
          return [];
        }
      } else {
        return [];
      }
    };

    return BarSeries;
  }(Series));
  BarSeries.prototype.fillColor = optionSetterGetter$1('fillColor');

  BarSeries.prototype.group = optionSetterGetter$1('group');

  return BarSeries;

}).call(undefined);

exports.StraightLineSeries = (function() {
  var endpoints;

  var StraightLineSeries = /*@__PURE__*/(function (Series) {
    function StraightLineSeries(options) {
      Series.call(this, exports.merge({
        strokeColor: theme().plotColor5,
        data: {}
      }, options));
      this._.type = 'straight-line';
    }

    if ( Series ) StraightLineSeries.__proto__ = Series;
    StraightLineSeries.prototype = Object.create( Series && Series.prototype );
    StraightLineSeries.prototype.constructor = StraightLineSeries;

    StraightLineSeries.prototype.legendColor = function legendColor () {
      return this._.options.strokeColor;
    };

    StraightLineSeries.prototype.updateSvg = function updateSvg (fillLayer, sparseLayer) {
      var data, self;
      data = endpoints.call(this);
      if (data) {
        self = this;
        return select(sparseLayer).view('.hx-series-data', 'line').update(function(d) {
          return this.class('hx-series-data hx-series-constant ' + self.class()).attr('x1', self.axis.xScale.apply(d[0].x)).attr('y1', self.axis.yScale.apply(d[0].y)).attr('x2', self.axis.xScale.apply(d[1].x)).attr('y2', self.axis.yScale.apply(d[1].y)).attr('d', d).attr('stroke', self.strokeColor());
        }).apply([data]);
      }
    };

    // should return a list of LabelMetas
    StraightLineSeries.prototype.getLabelDetails = function getLabelDetails (x, y) {
      var data, dx, dy, meta, xx, yy;
      data = this.data();
      if (this.labelsEnabled()) {
        dx = data.dx || 0;
        dy = data.dy || 0;
        xx = this.axis.xScale.inverse(x);
        yy = this.axis.yScale.inverse(y);
        if (dx !== 0 && dy !== 0 && (data.x != null) && (data.y != null)) {
          yy = data.y + (xx - data.x) * dy / dx;
        } else if (data.x != null) {
          xx = data.x;
        } else if (data.y != null) {
          yy = data.y;
        }
        if ((this.axis.xScale.domainMin < xx && xx < this.axis.xScale.domainMax) && (this.axis.yScale.domainMin < yy && yy < this.axis.yScale.domainMax)) {
          meta = {
            series: this,
            title: this.title(),
            x: this.axis.xScale.apply(xx),
            y: this.axis.yScale.apply(yy),
            color: this.strokeColor(),
            values: this.labelValuesExtractor()(this, {
              x: xx,
              y: yy
            })
          };
          return [meta];
        } else {
          return [];
        }
      } else {
        return [];
      }
    };

    return StraightLineSeries;
  }(Series));
  StraightLineSeries.prototype.strokeColor = optionSetterGetter$1('strokeColor');

  endpoints = function() {
    var data, domX1, domX2, domY1, domY2, domdx, domdy, dx, dy, i, j, len, len1, p1, p2, quotient, ref, ref1, results, results1, t, x, x0, x1, y, y0, y1;
    data = this.data();
    dx = data.dx || 0;
    dy = data.dy || 0;
    if (dx !== 0 && dy !== 0 && (data.x != null) && (data.y != null)) {
      // The maths for this was worked out on some paper, and will be a bit
      // fiddly to type up the details here. Essentially what this does is figure
      // out where the line will cross the axis, and computes the start and end
      // points of a line with gradient dy/dx. It works even when dx = 0
      x = data.x || 0;
      y = data.y || 0;
      domX1 = this.axis.xScale.domainMin;
      domX2 = this.axis.xScale.domainMax;
      domY1 = this.axis.yScale.domainMin;
      domY2 = this.axis.yScale.domainMax;
      domdx = x - domX1;
      domdy = y - domY1;
      quotient = domdy * dx - dy * domdx;
      p1 = (function() {
        switch (false) {
          case !(quotient > 0): // when it crosses the y axis
            x0 = domX1;
            t = (domX1 - x) / dx;
            y0 = y + t * dy;
            return {
              x: x0,
              y: y0
            };
          case quotient !== 0: // when it crosses the axis origin
            x0 = domX1;
            y0 = domY1;
            return {
              x: x0,
              y: y0
            };
          case !(quotient < 0): // when it crosses the x axis
            y0 = domY1;
            t = (domY1 - y) / dy;
            x0 = x + t * dx;
            return {
              x: x0,
              y: y0
            };
        }
      })();
      domdx = x - domX2;
      domdy = y - domY2;
      quotient = domdy * dx - dy * domdx;
      p2 = (function() {
        switch (false) {
          case !(quotient < 0): // when it crosses the y axis (far side)
            x1 = domX2;
            t = (domX2 - x) / dx;
            y1 = y + t * dy;
            return {
              x: x1,
              y: y1
            };
          case quotient !== 0: // when it crosses the top corner
            x1 = domX2;
            y1 = domY2;
            return {
              x: x1,
              y: y1
            };
          case !(quotient > 0): // when it crosses the x axis (top)
            y1 = domY2;
            t = (domY2 - y) / dy;
            x1 = x + t * dx;
            return {
              x: x1,
              y: y1
            };
        }
      })();
      return [p1, p2];
    } else if (data.x != null) {
      ref = [this.axis.yScale.domainMin, this.axis.yScale.domainMax];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        y = ref[i];
        results.push({
          x: data.x,
          y: y
        });
      }
      return results;
    } else if (data.y != null) {
      ref1 = [this.axis.xScale.domainMin, this.axis.xScale.domainMax];
      results1 = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        x = ref1[j];
        results1.push({
          x: x,
          y: data.y
        });
      }
      return results1;
    }
  };

  return StraightLineSeries;

}).call(undefined);

var LinearScale;

LinearScale = /*@__PURE__*/(function () {
  function LinearScale(domainMin, domainMax, rangeMin, rangeMax) {
  if ( domainMin === void 0 ) domainMin = 0;
  if ( domainMax === void 0 ) domainMax = 10;
  if ( rangeMin === void 0 ) rangeMin = 0;
  if ( rangeMax === void 0 ) rangeMax = 10;

    var den;
    this.domainMin = domainMin;
    this.domainMax = domainMax;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    den = this.domainMax - this.domainMin;
    this.factor = den !== 0 ? (this.rangeMax - this.rangeMin) / den : 1;
  }

  LinearScale.prototype.apply = function apply (v) {
    return this.rangeMin + (v - this.domainMin) * this.factor;
  };

  LinearScale.prototype.inverse = function inverse (v) {
    return this.domainMin + (v - this.rangeMin) / this.factor;
  };

  LinearScale.prototype.domain = function domain (start, end) {
    var den;
    this.domainMin = start;
    this.domainMax = end;
    den = this.domainMax - this.domainMin;
    this.factor = den !== 0 ? (this.rangeMax - this.rangeMin) / den : 1;
    return this;
  };

  LinearScale.prototype.range = function range (start, end) {
    var den;
    this.rangeMin = start;
    this.rangeMax = end;
    den = this.domainMax - this.domainMin;
    this.factor = den !== 0 ? (this.rangeMax - this.rangeMin) / den : 1;
    return this;
  };

  LinearScale.prototype.ticks = function ticks (targetSpacing) {
    var d, domainEnd, domainSpan, domainStart, error, i, j, niceCount, niceDomainSpacing, ref, results, targetCount;
    domainSpan = this.domainMax - this.domainMin;
    // the number of ticks wanted, based off of the target spacing - we may end up with a different number than this, depending on how things pan out
    targetCount = Math.abs(this.rangeMax - this.rangeMin) / targetSpacing;
    niceDomainSpacing = Math.pow(10, Math.floor(Math.log(domainSpan / targetCount) / Math.LN10));
    // how far off are we from the target count? 1 means spot on, 2 means there were twice the amount expected
    error = domainSpan / (targetCount * niceDomainSpacing);
    switch (false) {
      case !(error >= 7.5):
        niceDomainSpacing *= 10;
        break;
      case !(error >= 3):
        niceDomainSpacing *= 5;
        break;
      case !(error >= 1.25):
        niceDomainSpacing *= 2;
    }
    domainStart = Math.ceil(this.domainMin / niceDomainSpacing) * niceDomainSpacing;
    domainEnd = (Math.floor(this.domainMax / niceDomainSpacing) + .5) * niceDomainSpacing;
    niceCount = (domainEnd - domainStart) / niceDomainSpacing;
    results = [];
    for (i = j = 0, ref = niceCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      d = domainStart + i * niceDomainSpacing;
      results.push([d, this.apply(d)]);
    }
    return results;
  };

  return LinearScale;
}());

var DiscreteScale;

DiscreteScale = /*@__PURE__*/(function () {
  function DiscreteScale(bandPadding) {
  if ( bandPadding === void 0 ) bandPadding = 0.1;

    this.bandPadding = bandPadding;
    this.domainCategories = [];
    this.rangeMin = 0;
    this.rangeMax = 10;
  }

  DiscreteScale.prototype.apply = function apply (v) {
    var i;
    i = this.domainCategories.indexOf(v);
    if (i !== -1) {
      return this.rangeMin + (i / this.domainCategories.length) * (this.rangeMax - this.rangeMin) + this.tickOffset() + this.tickWidth() / 2;
    } else {
      return void 0;
    }
  };

  DiscreteScale.prototype.inverse = function inverse (v) {
    var i;
    i = Math.floor(((v - this.tickOffset()) - this.rangeMin) / (this.rangeMax - this.rangeMin) * this.domainCategories.length);
    if ((0 <= i && i < this.domainCategories.length)) {
      return this.domainCategories[i];
    } else {
      return void 0;
    }
  };

  DiscreteScale.prototype.domain = function domain (categories) {
    this.domainCategories = categories;
    return this;
  };

  DiscreteScale.prototype.range = function range (start, end) {
    this.rangeMin = start;
    this.rangeMax = end;
    return this;
  };

  DiscreteScale.prototype.ticks = function ticks (targetSpacing) {

    var c, j, len, ref, results;
    ref = this.domainCategories;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      results.push([c, this.apply(c)]);
    }
    return results;
  };

  DiscreteScale.prototype.tickWidth = function tickWidth () {
    return (this.rangeMax - this.rangeMin) / this.domainCategories.length * (1 - this.bandPadding);
  };

  DiscreteScale.prototype.tickOffset = function tickOffset () {
    return (this.rangeMax - this.rangeMin) / this.domainCategories.length * this.bandPadding / 2;
  };

  return DiscreteScale;
}());

var DateScale;

DateScale = /*@__PURE__*/(function (LinearScale) {
  function DateScale(domainMin, domainMax, rangeMin, rangeMax) {
    LinearScale.call(this);
    this.domainMin = domainMin;
    this.domainMax = domainMax;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
  }

  if ( LinearScale ) DateScale.__proto__ = LinearScale;
  DateScale.prototype = Object.create( LinearScale && LinearScale.prototype );
  DateScale.prototype.constructor = DateScale;

  DateScale.prototype.ticks = function ticks (targetSpacing) {
    var checkVal, d, domainEnd, domainSpan, domainStart, error, i, j, niceCount, niceDomainSpacing, ref, results, round, targetCount, timeStep, timeSteps;
    // stolen from D3 (with some extras added)
    timeSteps = [
      1,
      2,
      5,
      10,
      25,
      50,
      100,
      250,
      500,
      1e3, // 1-second
      5e3, // 5-seconds
      15e3, // 15-seconds
      3e4, // 30-seconds
      6e4, // 1-minute
      3e5, // 5-minutes
      9e5, // 15-minutes
      18e5, // 30-minutes
      36e5, // 1-hour
      108e5, // 3-hours
      216e5, // 6-hours
      432e5, // 12-hours
      864e5, // 1-day
      1728e5, // 2-days
      6048e5, // 1-week
      2592e6, // 1-month
      7776e6, // 3-months
      31536e6 // 1-year
    ];
    domainSpan = this.domainMax - this.domainMin;
    checkVal = function(val) {
      var j, len, step;
      for (j = 0, len = timeSteps.length; j < len; j++) {
        step = timeSteps[j];
        if (val <= step) {
          return step;
        }
      }
      return 1;
    };
    // the number of ticks wanted, based off of the target spacing - we may end up with a different number than this, depending on how things pan out
    targetCount = Math.abs(this.rangeMax - this.rangeMin) / targetSpacing;
    niceDomainSpacing = Math.pow(10, Math.floor(Math.log(domainSpan / targetCount) / Math.LN10));
    // how far off are we from the target count? 1 means spot on, 2 means there were twice the amount expected
    error = domainSpan / (targetCount * niceDomainSpacing);
    niceDomainSpacing *= error >= 7.5 ? 10 : error >= 3 ? 5 : error >= 2 ? 3 : error >= 1.25 ? 2 : error >= 1.025 ? 1.5 : 1;
    domainStart = Math.ceil(this.domainMin / niceDomainSpacing) * niceDomainSpacing;
    domainEnd = Math.floor(this.domainMax / niceDomainSpacing) * niceDomainSpacing;
    round = function(val, ceil) {
      if (ceil) {
        return Math.ceil(val / timeStep) * timeStep;
      } else {
        return Math.floor(val / timeStep) * timeStep;
      }
    };
    timeStep = checkVal(niceDomainSpacing);
    niceDomainSpacing = round(niceDomainSpacing, true);
    domainStart = round(domainStart);
    if (domainStart < this.domainMin) {
      domainStart += niceDomainSpacing;
    }
    niceCount = (domainEnd - domainStart) / niceDomainSpacing;
    results = [];
    for (i = j = 0, ref = niceCount; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
      d = domainStart + i * niceDomainSpacing;
      results.push([d, this.apply(d)]);
    }
    return results;
  };

  return DateScale;
}(LinearScale));

var tickSize = 6;

var labelOffset = 10;

var axisPadding = 4;

var dimension, supportsGroup;

supportsGroup = function(series) {
  return series instanceof exports.BarSeries || series instanceof exports.LineSeries;
};

dimension = function(axis, options) {
  var setterGetter, state;
  state = exports.merge({
    scaleType: 'linear',
    visible: true,
    formatter: exports.si,
    tickRotation: 0,
    doCollisionDetection: true,
    min: 'auto',
    max: 'auto',
    discretePadding: 0.1,
    discreteLabels: void 0,
    tickSpacing: 50,
    title: null,
    scalePaddingMin: 0,
    scalePaddingMax: 0,
    ticksAll: false,
    gridLines: true,
    nthTickVisible: 1,
    axisTickLabelPosition: 'bottom',
    showTicks: true
  }, options);
  setterGetter = function(name) {
    return function(value) {
      if (arguments.length > 0) {
        state[name] = value;
        return axis;
      } else {
        return state[name];
      }
    };
  };
  return {
    doCollisionDetection: setterGetter('doCollisionDetection'),
    scaleType: setterGetter('scaleType'),
    visible: setterGetter('visible'),
    formatter: setterGetter('formatter'),
    tickRotation: setterGetter('tickRotation'),
    min: setterGetter('min'),
    max: setterGetter('max'),
    discretePadding: setterGetter('discretePadding'),
    discreteLabels: setterGetter('discreteLabels'),
    tickSpacing: setterGetter('tickSpacing'),
    title: setterGetter('title'),
    scalePaddingMin: setterGetter('scalePaddingMin'),
    scalePaddingMax: setterGetter('scalePaddingMax'),
    ticksAll: setterGetter('ticksAll'),
    gridLines: setterGetter('gridLines'),
    nthTickVisible: setterGetter('nthTickVisible'),
    axisTickLabelPosition: setterGetter('axisTickLabelPosition'),
    showTicks: setterGetter('showTicks'),
    axisSize: setterGetter('axisSize'),
    titleHeight: setterGetter('titleHeight')
  };
};

exports.Axis = (function() {
  var scalePad;

  var Axis = function Axis(options) {
    var this$1 = this;

    var opts, ref;
    opts = exports.merge({
      x: {
        axisTickLabelPosition: 'bottom'
      },
      y: {
        axisTickLabelPosition: 'left'
      }
    }, options);
    this._ = {
      series: new List()
    };
    this.x = dimension(this, exports.merge({
      axisTickLabelPosition: 'bottom'
    }, options != null ? options.x : void 0));
    this.y = dimension(this, exports.merge({
      axisTickLabelPosition: 'left'
    }, options != null ? options.y : void 0));
    //XXX: move these to the underscore object

    // private values which can't be made private since they are members
    this.xScale = new LinearScale(0, 1, 0, 1);
    this.yScale = new LinearScale(0, 1, 0, 1);
    this.graph = null; // gets set when it is attached to a graph
    this.xAxisSize = 50;
    this.xTitleHeight = 0;
    this.yAxisSize = 50;
    this.yTitleHeight = 0;
    if (options != null) {
      if ((ref = options.series) != null) {
        ref.forEach(function (seriesObj) {
          return this$1.addSeries(seriesObj.type, seriesObj.options);
        });
      }
    }
  };

  // series: string (which indicates the type of series to create) or a Series object, or nothing for a line series
  // possible types: line, area, area-stacked, bar, bar-stacked, scatter, constant (line)
  Axis.prototype.addSeries = function addSeries (series, options) {
    if (exports.isString(series)) {
      series = (function() {
        switch (series) {
          case 'line':
            return new exports.LineSeries(options);
          case 'band':
            return new exports.BandSeries(options);
          case 'bar':
            return new exports.BarSeries(options);
          case 'scatter':
            return new exports.ScatterSeries(options);
          case 'straight-line':
            return new exports.StraightLineSeries(options);
          default:
            logger.warn(series + ' is not a valid series type');
            return void 0;
        }
      })();
      this._.series.add(series);
      series.axis = this;
      return series;
    } else if (series instanceof Series) {
      this._.series.add(series);
      series.axis = this;
      return series;
    } else if (arguments.length === 0) {
      series = new exports.LineSeries();
      this._.series.add(series);
      series.axis = this;
      return series;
    } else {
      logger.warn(series + ' is not a valid series type');
    }
  };

  Axis.prototype.series = function series (series$1) {
    var k, len, s;
    if (arguments.length > 0) {
      this._.series = new List(series$1);
      for (k = 0, len = series$1.length; k < len; k++) {
        s = series$1[k];
        s.axis = this;
      }
      return this;
    } else {
      return this._.series.values();
    }
  };

  Axis.prototype.removeSeries = function removeSeries (series) {
    if (this._.series.remove(series)) {
      series.axis = void 0;
      return series;
    }
  };

  Axis.prototype.setupAxisSvg = function setupAxisSvg (element) {
    var gridGroup, xAxisGroup, yAxisGroup;
    gridGroup = select(element).append('g').class('hx-axis-grid');
    xAxisGroup = select(element).append('g').class('hx-x-axis');
    xAxisGroup.append('g').class('hx-axis-scale');
    yAxisGroup = select(element).append('g').class('hx-y-axis');
    return yAxisGroup.append('g').class('hx-axis-scale');
  };

  Axis.prototype.tagSeries = function tagSeries () {
    var groupTypeEntries, k, l, len, len1, ref, ref1, results, series, typeEntry, types;
    groupTypeEntries = function(data) {
      var entry, group, groups, i, internalGroupId, k, l, len, len1, len2, len3, m, n, ref, ref1, ref2, series, typeSize;
      groups = new Map();
      for (k = 0, len = data.length; k < len; k++) {
        series = data[k];
        group = supportsGroup(series) ? series.group() : void 0;
        if (!groups.has(group)) {
          groups.set(group, new List());
        }
        groups.get(group).add(series);
      }
      internalGroupId = 0;
      typeSize = groups.size;
      typeSize += groups.has(void 0) ? groups.get(void 0).size - 1 : 0;
      ref = groups.entries();
      for (l = 0, len1 = ref.length; l < len1; l++) {
        entry = ref[l];
        group = entry[0];
        if (group === void 0) {
          ref1 = entry[1].entries();
          for (i = m = 0, len2 = ref1.length; m < len2; i = ++m) {
            series = ref1[i];
            series.groupId = internalGroupId;
            internalGroupId++;
            series._.seriesId = 0;
            series.groupSize = 1;
            series._.typeSize = typeSize;
          }
        } else {
          ref2 = entry[1].entries();
          for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
            series = ref2[i];
            series.groupId = internalGroupId;
            series._.seriesId = i;
            series.groupSize = entry[1].size;
            series._.typeSize = typeSize;
          }
          internalGroupId++;
        }
      }
      return internalGroupId;
    };
    // collect the series by type
    types = new Map();
    ref = this.series();
    for (k = 0, len = ref.length; k < len; k++) {
      series = ref[k];
      if (!types.has(series._.type)) {
        types.set(series._.type, new List());
      }
      types.get(series._.type).add(series);
    }
    ref1 = types.entries();
    results = [];
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      typeEntry = ref1[l];
      results.push(groupTypeEntries(typeEntry[1].entries()));
    }
    return results;
  };

  Axis.prototype.preupdateXAxisSvg = function preupdateXAxisSvg (element) {
      var this$1 = this;

    var alpha, alphaDeg, axisGroupSelection, d, data, domain, end, getXTicks, s, self, series, set, start, xLabelTickSize, xmax, xmin, xs;
    self = this;
    switch (this.x.scaleType()) {
      case 'linear':
        this.xScale = new LinearScale().range(0, this.graph.width);
        break;
      case 'discrete':
        this.xScale = new DiscreteScale(this.x.discretePadding()).range(0, this.graph.width);
        break;
      // when 'log' then @xScale = new LogScale().range(0, @graph.width)
      case 'date':
        this.xScale = new DateScale().range(0, this.graph.width);
    }
    if (this.x.scaleType() === 'discrete') {
      domain = (function() {
        var k, l, len, len1, ref, ref1;
        if (this.x.discreteLabels()) {
          return this.x.discreteLabels();
        } else {
          set = new Set();
          ref = this.series();
          for (k = 0, len = ref.length; k < len; k++) {
            series = ref[k];
            ref1 = series.data();
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              d = ref1[l];
              set.add(d.x);
            }
          }
          return set.values();
        }
      }).call(this);
      this.xScale.domain(domain);
    } else {
      // OPTIM: this expensive calculation is not needed if the scales are non auto
      // XXX: band series?
      xs = (function() {
        var k, len, ref, results;
        ref = this.series();
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          s = ref[k];
          if (s instanceof exports.StraightLineSeries) {
            data = s.data();
            if (!data.dx && !data.dy && data.x) {
              results.push([data.x, data.x]);
            } else {
              results.push(void 0);
            }
          } else {
            results.push(extent(s.data(), function(d) {
              return d.x;
            }));
          }
        }
        return results;
      }).call(this);
      xs = xs.filter(exports.identity);
      xmin = exports.min(xs.map(function(d) {
        return d[0];
      }));
      xmax = exports.max(xs.map(function(d) {
        return d[1];
      }));
      xmin = this.x.min() === 'auto' ? xmin : this.x.min();
      xmax = this.x.max() === 'auto' ? xmax : this.x.max();
      if (this.x.min() === 'auto') {
        xmin = scalePad(xmin, xmax - xmin, -this.x.scalePaddingMin());
      }
      if (this.x.max() === 'auto') {
        xmax = scalePad(xmax, xmax - xmin, this.x.scalePaddingMax());
      }
      start = xmin + (xmax - xmin) * this.graph.zoomRangeStart();
      end = xmin + (xmax - xmin) * this.graph.zoomRangeEnd();
      this.xScale.domain(start, end);
    }
    xLabelTickSize = 0;
    if (!this.x.visible()) {
      select(element).select('.hx-x-axis').remove();
    } else {
      axisGroupSelection = select(element).select('.hx-x-axis');
      alphaDeg = this.x.tickRotation();
      alpha = alphaDeg / 180 * Math.PI;
      getXTicks = function (scale) {
        var k, l, len, len1, ref, ref1;
        if (self.x.ticksAll()) {
          set = new Set();
          ref = this$1.series();
          for (k = 0, len = ref.length; k < len; k++) {
            series = ref[k];
            ref1 = series.data();
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              d = ref1[l];
              set.add(d.x);
            }
          }
          return set.values().map(function(d) {
            return [d, scale.apply(d)];
          });
        } else {
          return scale.ticks(self.x.tickSpacing());
        }
      };
      // view update view update view update!
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        return this.view('.hx-tick', 'g').update(function(tick) {
          return this.view('.hx-tick-text-x', 'text').update(function(t) {
            var bbox, size;
            this.text(self.x.formatter()(t));
            bbox = this.node().getBBox();
            size = bbox.height * Math.cos(alpha) + bbox.width * Math.sin(alpha);
            xLabelTickSize = Math.max(xLabelTickSize, size);
            if (alpha === 0) {
              return this.attr("transform", ("translate(" + (-bbox.width / 2) + "," + labelOffset + ")")).style("dominant-baseline", "hanging");
            } else {
              return this.attr("transform", ("translate(0," + labelOffset + ") rotate(" + alphaDeg + ")"));
            }
          }).apply(tick[0]);
        }).apply(getXTicks(scale));
      }).apply(this.xScale);
      if (this.x.title()) {
        axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          return d.xTitleHeight = this.text(d.x.title()).height();
        }).apply(this);
        xLabelTickSize += this.xTitleHeight;
      }
      xLabelTickSize += labelOffset + axisPadding;
    }
    return this.xAxisSize = xLabelTickSize;
  };

  Axis.prototype.preupdateYAxisSvg = function preupdateYAxisSvg (element, totalXAxisSize) {
      var assign;

    var axisGroupSelection, d, domain, rmin, self, series, set, yLabelTickSize, yMaxMightBeAuto, yMinMightBeAuto, ymax, ymin;
    self = this;
    rmin = this.graph.height - totalXAxisSize;
    switch (this.y.scaleType()) {
      case 'linear':
        this.yScale = new LinearScale().range(rmin, 0);
        break;
      case 'discrete':
        this.yScale = new DiscreteScale(this.y.discretePadding()).range(rmin, 0);
        break;
      // when 'log' then @yScale = new LogScale().range(rmin, 0)
      case 'date':
        this.yScale = new DateScale().range(rmin, 0);
    }
    if (this.y.scaleType() === 'discrete') {
      domain = (function() {
        var k, l, len, len1, ref, ref1;
        if (this.yDiscreteLabels) {
          return this.yDiscreteLabels;
        } else {
          set = new Set();
          ref = this.series();
          for (k = 0, len = ref.length; k < len; k++) {
            series = ref[k];
            ref1 = series.data();
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              d = ref1[l];
              set.add(d.y);
            }
          }
          return set.values();
        }
      }).call(this);
      this.yScale.domain(domain);
    } else {
      yMinMightBeAuto = this.y.min();
      yMaxMightBeAuto = this.y.max();
      ((assign = this.calculateYBounds(yMinMightBeAuto, yMaxMightBeAuto), ymin = assign.ymin, ymax = assign.ymax));
      this.yScale.domain(ymin, ymax);
    }
    yLabelTickSize = 0;
    if (!this.y.visible()) {
      select(element).select('.hx-y-axis').remove();
    } else {
      axisGroupSelection = select(element).select('.hx-y-axis');
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        return this.view('.hx-tick', 'g').update(function(tick) {
          return this.view('.hx-tick-text-y', 'text').update(function(t) {
            var size;
            size = this.text(self.y.formatter()(t)).attr('x', -labelOffset).width();
            if (size > yLabelTickSize) {
              return yLabelTickSize = size;
            }
          }).apply(tick[0]);
        }).apply(scale.ticks(self.y.tickSpacing()));
      }).apply(this.yScale);
      if (this.y.title()) {
        axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          return d.yTitleHeight = this.text(d.y.title()).attr('transform', 'rotate(90)').width();
        }).apply(this);
        yLabelTickSize += this.yTitleHeight;
      }
      yLabelTickSize += labelOffset + axisPadding;
    }
    return this.yAxisSize = yLabelTickSize;
  };

  Axis.prototype.updateAxisSvg = function updateAxisSvg (element, xOffset, yOffset, totalXOffset, totalYOffset) {
    var axisGroupSelection, axisUpdateFunc, axisX, axisY, gridSelection, height, markerX, markerY, self, width, xline, yline;
    self = this;
    // save some values into local variables
    width = this.graph.width;
    height = this.graph.height;
    // calculate axis ranges (pixel coordinates)
    switch (this.x.scaleType()) {
      case 'linear':
      case 'date':
        this.xScale.range(totalXOffset, width);
        break;
      case 'discrete':
        this.xScale.range(totalXOffset, width);
    }
    // when 'log' then @xScale.range(totalXOffset, width)
    switch (this.y.scaleType()) {
      case 'linear':
      case 'date':
        this.yScale.range(height - totalYOffset, 0);
        break;
      case 'discrete':
        this.yScale.range(height - totalYOffset, 0);
    }
    // when 'log' then @yScale.range(height - totalYOffset, 0)
    gridSelection = select(element).select('.hx-axis-grid');
    // render the axis
    if (!this.x.visible()) {
      select(element).select('.hx-x-axis').remove();
    } else {
      if (this.x.gridLines()) {
        gridSelection.view('.hx-vertical-grid-line', 'line').update(function(tick) {
          return this.attr('x1', tick[1]).attr('x2', tick[1]).attr('y1', self.yScale.rangeMax).attr('y2', self.yScale.rangeMin);
        }).apply(this.xScale.ticks(self.x.tickSpacing()));
      }
      axisGroupSelection = select(element).select('.hx-x-axis');
      yline = this.yScale.apply(0);
      if (isNaN(yline) || this.y.scaleType() === 'discrete') {
        axisY = height - yOffset - this.xAxisSize;
        markerY = height - yOffset - this.xAxisSize;
      } else {
        axisY = Math.min(height - yOffset - this.xAxisSize, yline);
        if (this.x.axisTickLabelPosition() === 'axis') {
          markerY = Math.min(height - yOffset - this.xAxisSize, yline);
        } else {
          markerY = height - yOffset - this.xAxisSize;
        }
      }
      axisUpdateFunc = function(scale) {
        var nodes;
        this.view('.hx-axis-line', 'line').update(function(s) {
          this.attr('x1', s.rangeMin).attr('x2', s.rangeMax);
          return this.attr('y1', axisY).attr('y2', axisY);
        }).apply(scale);
        this.view('.hx-tick', 'g').update(function(tick, e, i) {
          this.attr("transform", "translate(" + tick[1] + "," + markerY + ")");
          this.view('.hx-tick-line', 'line').update(function(t) {
            return this.attr('y1', 0).attr('y2', tickSize);
          }).apply(this);
          return this.view('.hx-tick-text-x', 'text').update(function(t) {
            return this.text((i % self.x.nthTickVisible()) === 0 ? self.x.formatter()(t) : '');
          }).apply(tick[0]);
        }).apply(self.x.showTicks() ? scale.ticks(self.x.tickSpacing()) : []);
        if (self.x.showTicks() && self.x.doCollisionDetection()) {
          nodes = this.selectAll('.hx-tick-text-x').filter(function(x) {
            return x.text();
          }).nodes;
          if (nodes.length) {
            return doCollisionDetection(nodes);
          }
        }
      };
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(axisUpdateFunc).apply(this.xScale);
      if (this.x.title()) {
        axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          var translateX, translateY;
          translateX = (width + totalXOffset) / 2;
          translateY = markerY + d.xAxisSize - d.xTitleHeight / 2 - axisPadding / 2;
          return this.attr('transform', 'translate(' + translateX + ', ' + translateY + ')').text(self.x.title());
        }).apply(this);
      }
    }
    if (!this.y.visible()) {
      return select(element).select('.hx-y-axis').remove();
    } else {
      if (this.y.gridLines()) {
        gridSelection.view('.hx-horizontal-grid-line', 'line').update(function(tick) {
          return this.attr('y1', tick[1]).attr('y2', tick[1]).attr('x1', self.xScale.rangeMax).attr('x2', self.xScale.rangeMin);
        }).apply(this.yScale.ticks(self.y.tickSpacing()));
      }
      axisGroupSelection = select(element).select('.hx-y-axis');
      //.attr("transform", "translate(" + (xOffset + @yAxisSize) + "," + 0 + ")")
      xline = this.xScale.apply(0);
      if (isNaN(xline) || this.x.scaleType() === 'discrete') {
        axisX = xOffset + this.yAxisSize;
        markerX = xOffset + this.yAxisSize;
      } else {
        axisX = Math.max(xOffset + this.yAxisSize, xline);
        if (this.y.axisTickLabelPosition() === 'axis') {
          markerX = Math.max(xOffset + this.yAxisSize, xline);
        } else {
          markerX = xOffset + this.yAxisSize;
        }
      }
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        this.view('.hx-axis-line', 'line').update(function(s) {
          return this.attr('y1', s.rangeMin).attr('y2', s.rangeMax).attr('x1', axisX).attr('x2', axisX);
        }).apply(scale);
        return this.view('.hx-tick', 'g').update(function(tick, e, i) {
          this.attr("transform", "translate(" + markerX + "," + tick[1] + ")");
          this.view('.hx-tick-line', 'line').update(function(t) {
            return this.attr('x1', -tickSize).attr('x2', 0);
          }).apply(this);
          return this.view('.hx-tick-text-y', 'text').update(function(t) {
            return this.attr('x', -labelOffset).text((i % self.y.nthTickVisible()) === 0 ? self.y.formatter()(t) : '');
          }).apply(tick[0]);
        }).apply(self.y.showTicks() ? scale.ticks(self.y.tickSpacing()) : []);
      }).apply(this.yScale);
      if (this.y.title()) {
        return axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          var translateX, translateY;
          translateX = markerX - d.yAxisSize + d.yTitleHeight / 2 + axisPadding / 2;
          translateY = (height - totalYOffset) / 2;
          return this.attr('transform', 'translate(' + translateX + ', ' + translateY + ') rotate(-90)').text(self.y.title());
        }).apply(this);
      }
    }
  };

  Axis.prototype.updateDataSvg = function updateDataSvg (fillLayer, sparseLayer) {
    var fill, i, k, len, ref, results, s, sparse;
    fill = [];
    sparse = [];
    select(fillLayer).view('.hx-series', 'g').update(function(d, e) {
      return fill.push(e);
    }).apply(this.series());
    select(sparseLayer).view('.hx-series', 'g').update(function(d, e) {
      return sparse.push(e);
    }).apply(this.series());
    ref = this.series();
    results = [];
    for (i = k = 0, len = ref.length; k < len; i = ++k) {
      s = ref[i];
      results.push(s.updateSvg(fill[i], sparse[i]));
    }
    return results;
  };

  // return the label object that this axis wants to render based off the x,y coords.
  // the graph object may choose to ignore it if one of the other axes offers a better
  // alternative
  Axis.prototype.getLabelDetails = function getLabelDetails (x, y) {
    var labels;
    labels = exports.flatten(this.series().map(function(series) {
      return series.getLabelDetails(x, y);
    }));
    return labels.filter(function(d) {
      return d;
    });
  };

  // gets the width of the stack for a particular type, group and x value (the seriesId is the series that you want to get the baseline for)
  Axis.prototype.getXStack = function getXStack (type, group, y, seriesId, start) {
      if ( start === void 0 ) start = 0;

    var j, k, len, ref, series, xStack, xs;
    if (group) {
      xStack = Math.max(this.xScale.domainMin, 0);
      ref = this.series();
      for (j = k = 0, len = ref.length; k < len; j = ++k) {
        series = ref[j];
        if (series._.seriesId < seriesId && series.group() === group && series._.type === type) {
          xs = series.getX(y);
          if (exports.defined(xs)) {
            xStack += xs;
          }
        }
      }
      return xStack;
    } else {
      return Math.max(start, 0);
    }
  };

  Axis.prototype.getYStack = function getYStack (type, group, x, seriesId, start) {
      if ( start === void 0 ) start = 0;

    var allSeries, maybeys, xScaleType, yScaleDomainMin, yStack;
    allSeries = this.series();
    xScaleType = this.x.scaleType();
    yScaleDomainMin = this.yScale.domainMin;
    if (group) {
      yStack = Math.max(yScaleDomainMin, 0);
      maybeys = allSeries.map(function(series) {
        if (series._.seriesId < seriesId && series.group() === group && series._.type === type) {
          return series.getY(x, xScaleType === 'discrete');
        }
      });
      return yStack + exports.sum(maybeys.filter(exports.identity));
    } else {
      return Math.max(start, 0);
    }
  };

  Axis.prototype.calculateYBounds = function calculateYBounds (yMinMightBeAuto, yMaxMightBeAuto) {
      var assign;

    var allSeries, initValue, stackGroupReductor, stackGroups, typeGroupReductor, types, xScaleType, ymax, ymaxscaled, ymin, yminscaled;
    if ('auto' === yMaxMightBeAuto || 'auto' === yMinMightBeAuto) {
      // XXX: band series?
      allSeries = this.series();
      xScaleType = this.x.scaleType();
      initValue = {
        ymin: 0,
        ymax: 0
      };
      types = exports.groupBy(allSeries, function(d) {
        return d._.type;
      });
      stackGroups = types.map(function(ref) {
          var type = ref[0];
          var series = ref[1];

        return {
          type: type,
          group: exports.groupBy(series, function(s) {
            if (supportsGroup(s)) {
              return s.group();
            } else {
              return void 0;
            }
          })
        };
      });
      typeGroupReductor = function(type) {
        return function(ref, ref$1) {
            var assign;

            var ymin = ref.ymin;
            var ymax = ref.ymax;
            var seriesGroup = ref$1[0];
            var series = ref$1[1];
          var allX, maybeys, stackHeights, ys, yymax, yymin;
          ((assign = seriesGroup === void 0 ? (maybeys = allSeries.map(function(s) {
            var data;
            data = s.data();
            if (s instanceof exports.StraightLineSeries) {
              if (!data.dx && !data.dy && data.y) {
                return [data.y, data.y];
              } else {
                return void 0;
              }
            } else if (s instanceof exports.BandSeries) {
              return extent(data, (function(d) {
                return d.y1;
              }), function(d) {
                return d.y2;
              });
            } else {
              return extent(data, function(d) {
                return d.y;
              });
            }
          }), ys = maybeys.filter(function(d) {
            return d != null;
          }), {
            yymin: exports.min(ys.map(function(d) {
              return d[0];
            })),
            yymax: exports.max(ys.map(function(d) {
              return d[1];
            }))
          }) : (allX = exports.unique(exports.flatten(series.map(function(s) {
            return s.data().map(function(ref) {
                var x = ref.x;

              return x;
            });
          }))), stackHeights = allX.map(function(x) {
            maybeys = series.map(function(series) {
              return series.getY(x, xScaleType === 'discrete');
            });
            return exports.sum(maybeys.filter(exports.identity));
          }), {
            yymin: exports.min(stackHeights),
            yymax: exports.max(stackHeights)
          }), yymin = assign.yymin, yymax = assign.yymax));
          return {
            ymin: Math.min(ymin, yymin),
            ymax: Math.max(ymax, yymax)
          };
        };
      };
      stackGroupReductor = function(prev, ref) {
          var type = ref.type;
          var group = ref.group;

        var reductor;
        reductor = typeGroupReductor(type);
        return group.reduce(reductor, prev);
      };
      ((assign = stackGroups.reduce(stackGroupReductor, initValue), ymin = assign.ymin, ymax = assign.ymax));
      yminscaled = yMinMightBeAuto === 'auto' ? scalePad(ymin, ymax - ymin, -this.y.scalePaddingMin()) : yMinMightBeAuto;
      ymaxscaled = yMaxMightBeAuto === 'auto' ? scalePad(ymax, ymax - ymin, this.y.scalePaddingMax()) : yMaxMightBeAuto;
      return {
        ymin: yminscaled,
        ymax: ymaxscaled
      };
    } else {
      return {
        ymin: yMinMightBeAuto,
        ymax: yMaxMightBeAuto
      };
    }
  };
  scalePad = function(value, range, padding) {
    return value + (range || 1) * padding;
  };

  return Axis;

}).call(undefined);

exports.userFacingText({
  plot: {
    noData: 'No Data'
  }
});

exports.Graph = (function() {
  var clearLabels, getClosestMeta, updateLabels;

  var Graph = /*@__PURE__*/(function (EventEmitter) {
    function Graph(selector, options) {
      var this$1 = this;

      var clipPath, defs, id, ref, savedZoomEnd, savedZoomStart, selection, threshold, touchX1, touchX2;
      EventEmitter.call(this);
      this.selector = selector;
      this._ = {
        options: exports.shallowMerge({
          zoomRangeStart: 0,
          zoomRangeEnd: 1,
          labelsEnabled: true,
          legendsEnabled: false,
          legendLocation: 'auto',
          noDataText: exports.userFacingText('plot', 'noData'),
          redrawOnResize: true
        }, options),
        axes: new List()
      };
      //XXX: move to the underscore object
      id = exports.randomId();
      selection = select(this.selector).api('graph', this).api(this);
      selection.on('resize', 'hx.plot', function () {
        if (this$1._.options.redrawOnResize) {
          return this$1.render();
        }
      });
      this.svgTarget = selection.append("svg").attr('class', 'hx-graph');
      defs = this.svgTarget.append('defs');
      this.axesTarget = this.svgTarget.append('g').attr('class', 'hx-axes');
      this.plotTarget = this.svgTarget.append('g').attr('class', 'hx-plot');
      // used to clip the drawing inside the graph
      clipPath = defs.append('clipPath').attr('id', 'clip-series-' + id);
      this.clipRect = clipPath.append('rect');
      this.plotTarget.attr('clip-path', 'url(#clip-series-' + id + ')');
      touchX1 = 0;
      touchX2 = 0;
      savedZoomStart = 0;
      savedZoomEnd = 1;
      this.svgTarget.on('pointerdown', 'hx.plot', function (p) {
        var x, y;
        x = Math.round(p.x - this$1.svgTarget.box().left);
        y = Math.round(p.y - this$1.svgTarget.box().top);
        updateLabels(this$1, x, y);
        if (p.event.targetTouches && p.event.targetTouches.length > 1) {
          p.event.preventDefault();
          p.event.stopPropagation();
          touchX1 = p.event.targetTouches[0].clientX - this$1.svgTarget.box().left - this$1.plotArea.x1;
          touchX2 = p.event.targetTouches[1].clientX - this$1.svgTarget.box().left - this$1.plotArea.x1;
          savedZoomStart = this$1.zoomRangeStart();
          return savedZoomEnd = this$1.zoomRangeEnd();
        }
      });
      threshold = 0.01;
      this.svgTarget.on('touchmove', 'hx.plot', function (e) {
        var endFactor, startFactor, w, x1, x2, xhat, xn, z;
        if (e.targetTouches.length > 1 && this$1.zoomEnabled()) {
          e.preventDefault();
          e.stopPropagation();
          w = this$1.plotArea.x2 - this$1.plotArea.x1;
          x1 = e.targetTouches[0].clientX - this$1.svgTarget.box().left - this$1.plotArea.x1;
          x2 = e.targetTouches[1].clientX - this$1.svgTarget.box().left - this$1.plotArea.x1;
          xn = (touchX1 + touchX2) / (2 * w);
          xhat = savedZoomStart + (savedZoomEnd - savedZoomStart) * xn;
          z = Math.abs(touchX1 - touchX2) / Math.abs(x1 - x2);
          startFactor = savedZoomStart - xhat;
          endFactor = savedZoomEnd - xhat;
          if (this$1.zoomRangeEnd === 1 && startFactor > -threshold) {
            startFactor = -threshold;
          }
          if (this$1.zoomRangeStart() === 0 && endFactor < threshold) {
            endFactor = threshold;
          }
          this$1.zoomRangeStart(exports.clampUnit(xhat + z * startFactor));
          this$1.zoomRangeEnd(exports.clampUnit(xhat + z * endFactor));
          this$1.emit('zoom', {
            start: this$1.zoomRangeStart(),
            end: this$1.zoomRangeEnd()
          });
          return this$1.render();
        }
      });
      this.svgTarget.on('mousemove', 'hx.plot', function (p) {
        var legendContainer, x, y;
        x = Math.round(p.clientX - this$1.svgTarget.box().left);
        y = Math.round(p.clientY - this$1.svgTarget.box().top);
        if (this$1.labelsEnabled()) {
          updateLabels(this$1, x, y);
        }
        if (this$1.legendEnabled()) {
          legendContainer = this$1.svgTarget.select('.hx-legend-container');
          if (this$1.legendLocation() === 'hover') {
            legendContainer.style('display', '');
          }
          // update the legend position
          if (this$1.legendLocation() === 'auto' || this$1.legendLocation() === 'hover') {
            if (x - this$1.plotArea.x1 < (this$1.plotArea.x1 + this$1.plotArea.x2) / 2) {
              // bottom-right
              return legendContainer.attr('transform', 'translate(' + (this$1.plotArea.x2 - 10 - legendContainer.width()) + ',' + (this$1.plotArea.y1 + 10) + ')');
            } else {
              // top-left
              return legendContainer.attr('transform', 'translate(' + (this$1.plotArea.x1 + 10) + ',' + (this$1.plotArea.y1 + 10) + ')');
            }
          }
        }
      });
      this.svgTarget.on('mouseleave', 'hx.plot', function () {
        if (this$1.legendEnabled() && this$1.legendLocation() === 'hover') {
          return this$1.svgTarget.select('.hx-legend-container').style('display', 'none');
        }
      });
      this.svgTarget.on('pointerleave', 'hx.plot', function(p) {
        return clearLabels();
      });
      this.svgTarget.on('click', 'hx.plot', function (p) {
        var data, labelMeta, x, y;
        x = Math.round(p.x - this$1.svgTarget.box().left);
        y = Math.round(p.y - this$1.svgTarget.box().top);
        labelMeta = getClosestMeta(this$1, x, y);
        if (labelMeta) {
          data = {
            event: p,
            data: labelMeta.values,
            series: labelMeta.series
          };
          this$1.emit('click', data);
          return labelMeta.series.emit('click', data);
        }
      });
      this.svgTarget.on('wheel', 'hx.plot', function (e) {
        var delta, endFactor, startFactor, w, x, xhat, xn, z, zoomRangeEnd, zoomRangeStart;
        if (this$1.zoomEnabled()) {
          e.preventDefault();
          e.stopPropagation();
          threshold = 0.01;
          delta = -e.deltaY;
          if (e.deltaMode === 1) {
            delta *= 20;
          }
          zoomRangeStart = this$1.zoomRangeStart();
          zoomRangeEnd = this$1.zoomRangeEnd();
          x = e.clientX - this$1.svgTarget.box().left - this$1.plotArea.x1;
          w = this$1.plotArea.x2 - this$1.plotArea.x1;
          xn = exports.clampUnit(x / w);
          xhat = zoomRangeStart + (zoomRangeEnd - zoomRangeStart) * xn;
          z = 1 - delta / 600;
          startFactor = zoomRangeStart - xhat;
          endFactor = zoomRangeEnd - xhat;
          if (zoomRangeEnd === 1 && startFactor > -threshold) {
            startFactor = -threshold;
          }
          if (zoomRangeStart === 0 && endFactor < threshold) {
            endFactor = threshold;
          }
          this$1.zoomRangeStart(exports.clampUnit(xhat + z * startFactor));
          this$1.zoomRangeEnd(exports.clampUnit(xhat + z * endFactor));
          this$1.emit('zoom', {
            start: this$1.zoomRangeStart(),
            end: this$1.zoomRangeEnd()
          });
          return this$1.render();
        }
      });
      if (options != null) {
        if ((ref = options.axes) != null) {
          ref.forEach(function (axis) {
            return this$1.addAxis(axis);
          });
        }
      }
    }

    if ( EventEmitter ) Graph.__proto__ = EventEmitter;
    Graph.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    Graph.prototype.constructor = Graph;

    Graph.prototype.axes = function axes (axes$1) {
      if (arguments.length > 0) {
        this._.axes = new List(axes$1);
        this.axes().forEach(function(a) {
          return a.graph = this;
        });
        return this;
      } else {
        return this._.axes.values();
      }
    };

    Graph.prototype.addAxis = function addAxis (options) {
      var axis;
      axis = options instanceof exports.Axis ? options : new exports.Axis(options);
      axis.graph = this;
      this._.axes.add(axis);
      return axis;
    };

    Graph.prototype.removeAxis = function removeAxis (axis) {
      if (this._.axes.remove(axis)) {
        axis.graph = null;
        return axis;
      }
    };

    Graph.prototype.render = function render () {
      var enter, hasData, legendContainer, legendContainerTransformX, legendContainerTransformY, selection, self, totalX, totalY, x, y;
      selection = select(this.selector);
      this.width = Number(selection.width());
      this.height = Number(selection.height());
      // if @width <= 0 or @height <= 0 then return
      hasData = this.axes().some(function(axis) {
        return axis.series().some(function(series) {
          var data;
          data = series.data();
          return exports.isObject(data) || data.length > 0;
        });
      });
      self = this;
      this.svgTarget.view('.hx-plot-no-data', 'text').update(function() {
        return this.text(self._.options.noDataText).attr('x', self.width / 2).attr('y', self.height / 2);
      }).apply(hasData ? [] : [true]);
      // prepare the group data by tagging the series with group and series ids
      this.axes().forEach(function(a) {
        return a.tagSeries();
      });
      enter = function(d) {
        var node;
        node = this.append('g').class('hx-axis').node();
        d.setupAxisSvg(node);
        return node;
      };
      // preprocessing step to get all the measurement details for the axes
      totalX = 0;
      this.axesTarget.view('.hx-axis', 'g').enter(enter).update(function(d, element) {
        d.preupdateXAxisSvg(element);
        return totalX += d.xAxisSize;
      }).apply(this.axes());
      totalY = 0;
      this.axesTarget.view('.hx-axis', 'g').enter(enter).update(function(d, element) {
        d.preupdateYAxisSvg(element, totalX);
        return totalY += d.yAxisSize;
      }).apply(this.axes());
      // draw the axes
      x = 0;
      y = 0;
      this.axesTarget.view('.hx-axis', 'g').enter(enter).update(function(d, element) {
        d.updateAxisSvg(element, y, x, totalY, totalX);
        x += d.xAxisSize;
        return y += d.yAxisSize;
      }).apply(this.axes());
      // calculate the plot area. (the x and y are the correct way around here!)
      this.plotArea = {
        x1: y,
        y1: 0,
        x2: this.width,
        y2: this.height - x
      };
      // dont render anything more if the plot area has no area - this is to prevent divide by 0 errors
      if (((this.plotArea.x2 - this.plotArea.x1) <= 0) || ((this.plotArea.y2 - this.plotArea.y1) <= 0)) {
        return;
      }
      // draw the data
      this.plotTarget.view('.hx-axis-data', 'g').enter(function() {
        var g;
        g = this.append('g').class('hx-axis-data');
        g.append('g').class('hx-graph-fill-layer');
        g.append('g').class('hx-graph-sparse-layer');
        return g.node();
      }).update(function(d, element) {
        return d.updateDataSvg(this.select('.hx-graph-fill-layer').node(), this.select('.hx-graph-sparse-layer').node());
      }).apply(this.axes());
      if (this.legendEnabled()) {
        legendContainer = this.svgTarget.select('.hx-legend-container');
        if (legendContainer.size() === 0) {
          legendContainer = this.svgTarget.append('g').class('hx-legend-container');
        }
        // collect up the series and update the legend container
        populateLegendSeries(legendContainer, exports.flatten(this.axes().map(function(axis) {
          return axis.series();
        })));
        switch (this.legendLocation()) {
          case 'top-left':
            legendContainer.attr('transform', 'translate(' + (this.plotArea.x1 + 10) + ',' + (this.plotArea.y1 + 10) + ')');
            break;
          case 'bottom-right':
            legendContainerTransformX = this.plotArea.x2 - 10 - legendContainer.width();
            legendContainerTransformY = this.plotArea.y2 - 5 - legendContainer.height();
            legendContainer.attr('transform', 'translate(' + legendContainerTransformX + ',' + legendContainerTransformY + ')');
            break;
          case 'bottom-left':
            legendContainer.attr('transform', 'translate(' + (this.plotArea.x1 + 10) + ',' + (this.plotArea.y2 - 5 - legendContainer.height()) + ')');
            break;
          case 'hover':
            legendContainer.style('display', 'none');
            break;
          default:
            legendContainer.attr('transform', 'translate(' + (this.plotArea.x2 - 10 - legendContainer.width()) + ',' + (this.plotArea.y1 + 10) + ')');
        }
      } else {
        this.svgTarget.select('.hx-legend-container').remove();
      }
      // recalculate the clip path for the plot area
      this.clipRect.attr('x', this.plotArea.x1).attr('y', this.plotArea.y1).attr('width', this.plotArea.x2 - this.plotArea.x1).attr('height', this.plotArea.y2 - this.plotArea.y1);
      this.emit('render');
      return this;
    };

    return Graph;
  }(EventEmitter));
  Graph.prototype.zoomRangeStart = optionSetterGetter$1('zoomRangeStart');

  Graph.prototype.zoomRangeEnd = optionSetterGetter$1('zoomRangeEnd');

  Graph.prototype.zoomEnabled = optionSetterGetter$1('zoomEnabled');

  Graph.prototype.labelsEnabled = optionSetterGetter$1('labelsEnabled');

  Graph.prototype.legendEnabled = optionSetterGetter$1('legendEnabled');

  Graph.prototype.legendLocation = optionSetterGetter$1('legendLocation');

  Graph.prototype.redrawOnResize = optionSetterGetter$1('redrawOnResize');

  getClosestMeta = function(graph, x, y) {
    var bestDistance, bestMeta, distance, i, l, labels, len, xx, yy;
    x = exports.clamp(graph.plotArea.x1, graph.plotArea.x2, x);
    y = exports.clamp(graph.plotArea.y1, graph.plotArea.y2, y);
    labels = exports.flatten(graph.axes().map(function(axis) {
      return axis.getLabelDetails(x, y);
    }));
    labels = labels.filter(function(label) {
      var ref, ref1;
      return (graph.plotArea.x1 <= (ref = label.x) && ref <= graph.plotArea.x2) && (graph.plotArea.y1 <= (ref1 = label.y) && ref1 <= graph.plotArea.y2);
    });
    bestMeta = void 0;
    bestDistance = void 0;
    for (i = 0, len = labels.length; i < len; i++) {
      l = labels[i];
      xx = l.x - x;
      yy = l.y - y;
      distance = xx * xx + yy * yy;
      if (bestDistance === void 0 || distance < bestDistance) {
        bestMeta = l;
        bestDistance = distance;
      }
    }
    return bestMeta;
  };

  clearLabels = function() {
    return select('body').select('.hx-plot-label-container').clear();
  };

  updateLabels = function(graph, x, y) {
    var bestMeta, updateLabel;
    updateLabel = function(data, element) {
      select(element).style('left', Math.round(window.pageXOffset + graph.svgTarget.box().left + data.x) + 'px').style('top', Math.round(window.pageYOffset + graph.svgTarget.box().top + data.y) + 'px');
      return data.series.labelRenderer()(element, data);
    };
    bestMeta = getClosestMeta(graph, x, y);
    if (select('body').select('.hx-plot-label-container').empty()) {
      select('body').append('div').class('hx-plot-label-container');
    }
    return select('body').select('.hx-plot-label-container').view('.hx-plot-label', 'div').update(updateLabel).apply(bestMeta ? boundLabel(bestMeta, graph) : []);
  };

  return Graph;

}).call(undefined);

exports.graph = function(options) {
  var selection;
  selection = div();
  exports.graph = new exports.Graph(selection, options);
  // There is no point rendering it now, the selection is of zero size.
  // The resize event should trigger a render when the div is added to the document
  return selection;
};

exports.PieChart = (function() {
  var calculateTotal, defaultLabelFormatter, defaultLabelValuesExtractor, defaultSegmentTextFormatter, getClosestMeta, getSegmentSize, updateLabels;

  // not part of the core graphing api, since polar coordinates are difficult to mix with axes
  var PieChart = /*@__PURE__*/(function (EventEmitter) {
    function PieChart(selector, options) {
      var this$1 = this;

      var selection;
      EventEmitter.call(this);
      this.selector = selector;
      selection = select(this.selector).classed('hx-pie-chart', true).on('resize', 'hx.plot', function () {
        return this$1.render();
      }).api('pie-chart', this).api(this);
      this._ = {
        options: exports.merge({
          segmentPadding: 0,
          innerPadding: 0,
          ringPadding: 0.1,
          totalAngle: Math.PI * 2,
          startAngle: 0,
          fillColor: theme().plotColor1,
          labelsEnabled: true,
          labelRenderer: exports.plotLabelStandard,
          labelValuesExtractor: defaultLabelValuesExtractor,
          labelFormatter: defaultLabelFormatter,
          segmentTextEnabled: false,
          segmentTextFormatter: defaultSegmentTextFormatter,
          legendEnabled: false,
          legendLocation: 'auto'
        }, options)
      };
    }

    if ( EventEmitter ) PieChart.__proto__ = EventEmitter;
    PieChart.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    PieChart.prototype.constructor = PieChart;

    PieChart.prototype.render = function render () {
      var P, approxRingSize, data, diffX, diffY, enterChart, height, innerRadius, legendContainer, midpoint, r, radius, ringSize, segmentPadding, selection, self, startAngle, svgHeight, svgWidth, totalAngle, updateChart, updateRing, updateSegment, updateText, width;
      self = this;
      selection = select(this.selector);
      width = selection.width();
      height = selection.height();
      r = Math.min(width, height) / 2;
      this.circle = {
        x: width / 2,
        y: height / 2,
        r: r
      };
      startAngle = this.startAngle();
      totalAngle = this.totalAngle();
      P = Math.PI;
      while (startAngle < 0) {
        startAngle += 2 * P;
      }
      switch (false) {
        // When the start angle is a multiple of PI / 2 radians (1 / 4 of a circle) and the total angle is half a circle
        case !(totalAngle === P && startAngle % (P / 2) === 0):
          switch (false) {
            case !(startAngle === 0 || startAngle % (2 * P) === 0 || startAngle % P === 0):
              r = exports.clamp(0, height / 2, r * 2);
              break;
            case !(startAngle % (P * (3 / 2)) === 0 || startAngle % (P / 2) === 0):
              r = exports.clamp(0, width / 2, r * 2);
          }
          switch (false) {
            case !(startAngle === 0 || startAngle % (2 * P) === 0):
              diffX = -r / 2;
              diffY = 0;
              break;
            case startAngle % (P * (3 / 2)) !== 0:
              diffX = 0;
              diffY = r / 2;
              break;
            case startAngle % P !== 0:
              diffX = r / 2;
              diffY = 0;
              break;
            case startAngle % (P / 2) !== 0:
              diffX = 0;
              diffY = -r / 2;
              break;
            default:
              diffX = 0;
              diffY = 0;
          }
          this.circle.x += diffX;
          this.circle.y += diffY;
          this.circle.r = r;
      }
      data = this.data();
      if (!Array.isArray(data)) {
        data = [data];
      }
      approxRingSize = (r * (1 - this.innerPadding())) / data.length + (r * (1 - this.innerPadding()) / data.length * this.ringPadding() / data.length);
      segmentPadding = approxRingSize * this.segmentPadding();
      innerRadius = r * this.innerPadding();
      radius = r - innerRadius;
      ringSize = radius / data.length + (radius / data.length * this.ringPadding() / data.length);
      updateSegment = function(selection, size, color, runningTotal, total, ring, minimumInnerRadius) {
        var actualInnerRadius, diameter, end, start, startOffset, straightInnerSegments;
        startOffset = self.startAngle() + Math.PI * 1.5;
        start = startOffset + runningTotal / total * self.totalAngle();
        end = startOffset + (runningTotal + size) / total * self.totalAngle();
        straightInnerSegments = ring === 0 && innerRadius === 0;
        actualInnerRadius = straightInnerSegments ? Math.max(innerRadius + ringSize * ring, arcCurveMinimumRadius(start, end, segmentPadding)) : Math.max(innerRadius + ringSize * ring, minimumInnerRadius);
        diameter = arcCurve(self.circle.x, self.circle.y, actualInnerRadius, innerRadius + ringSize * (ring + 1 - self.ringPadding()), start, end, segmentPadding, straightInnerSegments);
        return selection.attr('d', diameter).attr('fill', color);
      };
      updateRing = function(d, e, i) {
        var assign, assign$1;

        var allZero, end, j, len, minimumInnerRadius, runningTotal, segment, segments, size, start, startOffset, total;
        segments = d.segments;
        ((assign = calculateTotal(segments), total = assign.total, allZero = assign.allZero));
        runningTotal = 0;
        minimumInnerRadius = 0;
        for (j = 0, len = segments.length; j < len; j++) {
          segment = segments[j];
          size = getSegmentSize(segment, total, allZero);
          startOffset = self.startAngle() + Math.PI * 1.5;
          start = startOffset + runningTotal / total * self.totalAngle();
          end = startOffset + (runningTotal + size) / total * self.totalAngle();
          minimumInnerRadius = Math.max(arcCurveMinimumRadius(start, end, segmentPadding), minimumInnerRadius);
        }
        ((assign$1 = calculateTotal(segments), total = assign$1.total, allZero = assign$1.allZero));
        runningTotal = 0;
        return this.view('.hx-pie-segment', 'path').update(function(s) {
          size = getSegmentSize(s, total, allZero);
          updateSegment(this, size, s.fillColor, runningTotal, total, i, minimumInnerRadius);
          return runningTotal += size;
        }).apply(segments);
      };
      midpoint = function(size, runningTotal, total, ring, count) {
        var end, start, startOffset;
        startOffset = self.startAngle() + Math.PI * 1.5;
        start = startOffset + runningTotal / total * self.totalAngle();
        end = startOffset + (runningTotal + size) / total * self.totalAngle();
        return {
          x: self.circle.x + Math.cos((start + end) / 2) * (innerRadius + (ring + 0.5) * ringSize),
          y: self.circle.y + Math.sin((start + end) / 2) * (innerRadius + (ring + 0.5) * ringSize)
        };
      };
      updateText = function(d, e, i) {
        var assign;

        var allZero, runningTotal, segments, total;
        segments = d.segments;
        runningTotal = 0;
        ((assign = calculateTotal(segments), total = assign.total, allZero = assign.allZero));
        return this.view('.hx-pie-segment-text', 'text').update(function(s) {
          var assign;

          var size, x, y;
          size = getSegmentSize(s, total, allZero);
          ((assign = midpoint(size, runningTotal, total, i, segments.length), x = assign.x, y = assign.y));
          this.text(self.segmentTextFormatter()(s, segments)).attr('x', x).attr('y', y);
          return runningTotal += size;
        }).apply(segments);
      };
      enterChart = function(d) {
        var labelGroup;
        self.svgTarget = this.append('svg').class('hx-graph');
        self.plotTarget = self.svgTarget.append('g').class('hx-plot');
        labelGroup = self.svgTarget.append('g').class('hx-label');
        self.svgTarget.on('pointermove', 'hx.plot', function(p) {
          var legendContainer, x, y;
          x = Math.round(p.x - selection.box().left);
          y = Math.round(p.y - selection.box().top);
          if (self.labelsEnabled()) {
            updateLabels(self, x, y);
          }
          if (self.legendEnabled()) {
            legendContainer = self.svgTarget.select('.hx-legend-container');
            if (self.legendLocation() === 'hover') {
              legendContainer.style('display', '');
            }
            // update the legend position
            if (self.legendLocation() === 'auto' || self.legendLocation() === 'hover') {
              width = self.svgTarget.width();
              height = self.svgTarget.height();
              if (x < width / 2) {
                // bottom-right
                return legendContainer.attr('transform', 'translate(' + (width - 10 - legendContainer.width()) + ', 10)');
              } else {
                // top-left
                return legendContainer.attr('transform', 'translate(10, 10)');
              }
            }
          }
        });
        self.svgTarget.on('pointerleave', 'hx.plot', function() {
          if (self.legendEnabled() && self.legendLocation() === 'hover') {
            return self.svgTarget.select('.hx-legend-container').style('display', 'none');
          }
        });
        self.svgTarget.on('click', 'hx.plot', function(p) {
          if (self.closestMeta != null) {
            return self.emit('click', {
              event: p,
              data: self.closestMeta.values,
              series: self.closestMeta.series
            });
          }
        });
        return self.svgTarget.node();
      };
      updateChart = function(d) {
        data = d.data();
        if (!Array.isArray(data)) {
          data = [data];
        }
        this.select('.hx-plot').view('.hx-pie-ring', 'g').update(updateRing).apply(data);
        return this.select('.hx-plot').view('.hx-pie-text', 'g').update(updateText).apply(self.segmentTextEnabled() ? data : []);
      };
      selection.view('.hx-graph', 'svg').enter(enterChart).update(updateChart).apply(this);
      svgWidth = Number(this.svgTarget.style('width').slice(0, -2));
      svgHeight = Number(this.svgTarget.style('height').slice(0, -2));
      if (this.legendEnabled()) {
        legendContainer = this.svgTarget.select('.hx-legend-container');
        if (legendContainer.size() === 0) {
          legendContainer = this.svgTarget.append('g').class('hx-legend-container');
        }
        // collect up the series and update the legend container
        data = this.data();
        if (!Array.isArray(data)) {
          data = [data];
        }
        populateLegendSeries(legendContainer, exports.flatten(data.map(function(d) {
          return d.segments;
        })));
        switch (this.legendLocation()) {
          case 'top-left':
            return legendContainer.attr('transform', 'translate(10, 10)');
          case 'bottom-right':
            return legendContainer.attr('transform', 'translate(' + (width - 10 - legendContainer.width()) + ',' + (height - 5 - legendContainer.height()) + ')');
          case 'bottom-left':
            return legendContainer.attr('transform', 'translate(10, ' + (height - 5 - legendContainer.height()) + ')');
          case 'hover':
            return legendContainer.style('display', 'none');
          default:
            return legendContainer.attr('transform', 'translate(' + (width - 10 - legendContainer.width()) + ', 10)');
        }
      } else {
        return this.svgTarget.select('.hx-legend-container').remove();
      }
    };

    return PieChart;
  }(EventEmitter));
  defaultLabelValuesExtractor = function(segment, ring, pie) {
    return [
      {
        name: segment.name,
        value: segment.size,
        formatter: pie.labelFormatter()
      }
    ];
  };

  defaultSegmentTextFormatter = function(segment, segments) {
    if (segment.size / exports.sum(segments.map(function(s) {
      return s.size;
    })) > 0.05) {
      return segment.size;
    } else {
      return '';
    }
  };

  defaultLabelFormatter = exports.si;

  PieChart.prototype.labelsEnabled = optionSetterGetter$1('labelsEnabled');

  PieChart.prototype.legendEnabled = optionSetterGetter$1('legendEnabled');

  PieChart.prototype.legendLocation = optionSetterGetter$1('legendLocation');

  PieChart.prototype.fillColor = optionSetterGetter$1('fillColor');

  PieChart.prototype.segmentTextEnabled = optionSetterGetter$1('segmentTextEnabled');

  PieChart.prototype.segmentTextFormatter = optionSetterGetter$1('segmentTextFormatter');

  PieChart.prototype.labelValuesExtractor = optionSetterGetter$1('labelValuesExtractor');

  PieChart.prototype.labelFormatter = optionSetterGetter$1('labelFormatter');

  PieChart.prototype.labelRenderer = optionSetterGetter$1('labelRenderer');

  PieChart.prototype.segmentPadding = optionSetterGetter$1('segmentPadding');

  PieChart.prototype.innerPadding = optionSetterGetter$1('innerPadding');

  PieChart.prototype.ringPadding = optionSetterGetter$1('ringPadding');

  PieChart.prototype.totalAngle = optionSetterGetter$1('totalAngle');

  PieChart.prototype.startAngle = optionSetterGetter$1('startAngle');

  PieChart.prototype.data = optionSetterGetter$1('data');

  calculateTotal = function(segments) {
    var allZero, preTotal, total;
    allZero = false;
    preTotal = exports.sum(segments.map(function(x) {
      return x.size;
    }));
    total = preTotal === 0 ? (allZero = true, segments.length) : exports.sum(segments.map(function(x) {
      return getSegmentSize(x, preTotal);
    }));
    return {
      total: total,
      allZero: allZero
    };
  };

  getSegmentSize = function(segment, total, allZero) {
    if (allZero) {
      return 1;
    } else if (segment.size > 0) {
      return segment.size;
    } else {
      return total / 100;
    }
  };

  getClosestMeta = function(pie, x, y) {
    var assign;

    var a1, a2, allZero, angle, approxRingSize, chosenSegment, chosenSegmentAngleMid, cx, cy, data, end, height, innerRadius, j, labelRadius, labelX, labelY, len, outerRadius, r, radius, ref, ring, ringSize, runningTotal, segment, segmentPadding, selection, size, start, total, whichRing, width;
    data = pie.data();
    if (!Array.isArray(data)) {
      data = [data];
    }
    selection = select(pie.selector);
    width = selection.width();
    height = selection.height();
    r = pie.circle.r;
    approxRingSize = (r * (1 - pie.innerPadding())) / pie.data.length + (r * (1 - pie.innerPadding()) / data.length * pie.ringPadding() / data.length);
    segmentPadding = approxRingSize * pie.segmentPadding();
    innerRadius = r * pie.innerPadding();
    radius = r - innerRadius;
    outerRadius = r;
    ringSize = radius / data.length + (radius / data.length * pie.ringPadding() / data.length);
    cx = pie.circle.x;
    cy = pie.circle.y;
    r = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
    if (r < innerRadius || r > outerRadius) {
      return;
    }
    // find out which ring we are in
    whichRing = exports.clamp(0, data.length - 1, Math.floor((r + pie.ringPadding() * ringSize / 2 - innerRadius) / ringSize));
    ring = data[whichRing];
    // find out which segment we are in
    angle = (Math.atan2(y - cy, x - cx) + Math.PI * 0.5) - pie.startAngle();
    if (angle < 0) {
      angle += Math.PI * 2;
    }
    chosenSegment = void 0;
    runningTotal = 0;
    ((assign = calculateTotal(ring.segments), total = assign.total, allZero = assign.allZero));
    ref = ring.segments;
    for (j = 0, len = ref.length; j < len; j++) {
      segment = ref[j];
      size = getSegmentSize(segment, total, allZero);
      a1 = runningTotal / total * pie.totalAngle();
      a2 = (runningTotal + size) / total * pie.totalAngle();
      start = Math.min(a1, a2);
      end = Math.max(a1, a2);
      if ((start < angle && angle < end)) {
        chosenSegment = segment;
        chosenSegmentAngleMid = (end - start) / 2 + start - (Math.PI / 2) + pie.startAngle();
        break;
      }
      runningTotal += size;
    }
    if (chosenSegment) {
      labelRadius = (ringSize * whichRing) + ((radius / data.length) / 2) + innerRadius;
      labelX = cx + (labelRadius * Math.cos(chosenSegmentAngleMid));
      labelY = cy + (labelRadius * Math.sin(chosenSegmentAngleMid));
      return {
        series: ring,
        title: ring.title,
        color: chosenSegment.fillColor || pie.fillColor(),
        x: labelX,
        y: labelY,
        bounding: {
          x1: 0,
          x2: width,
          y1: 0,
          y2: height
        },
        values: pie.labelValuesExtractor()(chosenSegment, ring, pie)
      };
    }
  };

  updateLabels = function(pie, x, y) {
    var bestMeta, updateLabel;
    updateLabel = function(data, element) {
      select(element).style('left', Math.round(window.pageXOffset + pie.svgTarget.box().left + data.x) + 'px').style('top', Math.round(window.pageYOffset + pie.svgTarget.box().top + data.y) + 'px');
      return pie.labelRenderer()(element, data);
    };
    bestMeta = getClosestMeta(pie, x, y);
    if (select('body').select('.hx-plot-label-container').empty()) {
      select('body').append('div').class('hx-plot-label-container');
    }
    return select('body').select('.hx-plot-label-container').view('.hx-plot-label', 'div').update(updateLabel).apply(bestMeta ? bestMeta : []);
  };

  return PieChart;

}).call(undefined);

exports.pieChart = function(options) {
  var selection;
  selection = div();
  new exports.PieChart(selection.node(), options);
  return selection;
};

exports.Sparkline = (function() {
  var Sparkline = function Sparkline(selector, options) {
    var axis, axisOptions, graph, innerLabelRenderer, opts, series;
    opts = exports.mergeDefined({
      strokeColor: theme().plotColor1,
      data: [],
      type: 'line',
      min: void 0,
      max: void 0,
      labelRenderer: function(element, obj) {
        return select(element).text(obj.y + ' (' + obj.x + ')');
      },
      redrawOnResize: true
    }, options);
    innerLabelRenderer = function(element, meta) {
      var details, labelNode, marker, midX, midY, xValue, yValue;
      marker = div('hx-plot-label-marker').style('background', meta.color);
      xValue = meta.values[0];
      yValue = meta.values[1];
      midX = (meta.bounding.x1 + meta.bounding.x2) / 2;
      midY = (meta.bounding.y1 + meta.bounding.y2) / 2;
      labelNode = div().node();
      opts.labelRenderer(labelNode, {
        x: xValue.value,
        y: yValue.value
      });
      details = div('hx-plot-label-details-basic').classed('hx-plot-label-details-left', meta.x >= midX).classed('hx-plot-label-details-bottom', meta.y >= midY).add(span('hx-plot-label-sparkline-x').add(labelNode));
      return select(element).clear().add(marker).add(details);
    };
    select(selector).classed('hx-sparkline', true).api(this);
    graph = new exports.Graph(selector, {
      redrawOnResize: opts.redrawOnResize
    });
    if (opts.type !== 'bar' && opts.type !== 'line') {
      logger.warn('options.type can only be "line" or "bar", you supplied "' + opts.type + '"');
      this.render = function() {
        return graph.render();
      };
      return;
    }
    axisOptions = {
      x: {
        scaleType: opts.type === 'bar' ? 'discrete' : 'linear',
        visible: false
      },
      y: {
        visible: false,
        scalePaddingMin: 0.1,
        scalePaddingMax: 0.1
      }
    };
    if (opts.min != null) {
      axisOptions.y.min = opts.min;
    }
    if (opts.max != null) {
      axisOptions.y.max = opts.max;
    }
    axis = graph.addAxis(axisOptions);
    series = axis.addSeries(opts.type, {
      fillEnabled: true,
      labelRenderer: innerLabelRenderer
    });
    this._ = {
      options: opts,
      graph: graph,
      series: series
    };
  };

  Sparkline.prototype.redrawOnResize = function redrawOnResize (value) {
    this._.graph.redrawOnResize(value);
    return optionSetterGetter$1('redrawOnResize').apply(this, arguments);
  };

  Sparkline.prototype.render = function render () {
    this._.series.data(this.data());
    if (this.fillColor() != null) {
      this._.series.fillColor(this.fillColor());
    }
    if (this._.options.type === 'line') {
      this._.series.strokeColor(this.strokeColor());
    }
    return this._.graph.render();
  };
  Sparkline.prototype.data = optionSetterGetter$1('data');

  Sparkline.prototype.fillColor = optionSetterGetter$1('fillColor');

  Sparkline.prototype.strokeColor = optionSetterGetter$1('strokeColor');

  Sparkline.prototype.labelRenderer = optionSetterGetter$1('labelRenderer');

  return Sparkline;

}).call(undefined);

exports.sparkline = function(options) {
  var selection, sl;
  selection = div();
  sl = new exports.Sparkline(selection, options);
  sl.render();
  return selection;
};

exports.plot = {
  label: {
    basic: exports.plotLabelBasic,
    standard: exports.plotLabelStandard
  },
  arcCurve: arcCurve,
  svgCurve: svgCurve
};

// XXX: 2.0.0 moved modules (from fluid) - document this change
function label(options) {
  if ( options === void 0 ) options = {};

  logger.deprecated('label', 'The label module has been replaced by the badge module');
  var context = options.context;
  return palette$1.context(span('hx-label'), context);
}

var discreteToPos, posToDiscrete, posToValue, renderValues, slide, slideEnd;

posToValue = function(unit) {
  if (this._.isDiscrete) {
    return posToDiscrete.call(this, unit);
  } else {
    return (unit * (this.options.max - this.options.min)) + this.options.min;
  }
};

discreteToPos = function(discrete) {
  return this._.discreteValues.get(discrete);
};

posToDiscrete = function(pos) {
  var assign;

  var _, j, k, len, ref, space, v;
  _ = this._;
  space = _.discreteSpacing / 2;
  ref = _.discreteValues.entries();
  for (j = 0, len = ref.length; j < len; j++) {
    (assign = ref[j], k = assign[0], v = assign[1]);
    if (pos >= (v - space) && pos < (v + space)) {
      return k;
    }
  }
  return pos;
};

// Slide handles all the value updating, including working out which control
// is being dragged.
slide = function(e) {
  var this$1 = this;

  var _, diff, end, isEnd, offset, pos, prevValue, start, val;
  _ = this._;
  _.mouseDown = true;
  _.pointerMoveHandler = function (e) {
    return slide.call(this$1, e);
  };
  _.pointerUpHandler = function (e) {
    return slideEnd.call(this$1, e);
  };
  select(document).on('pointermove', 'hx.slider', _.pointerMoveHandler);
  select(document).on('pointerup', 'hx.slider', _.pointerUpHandler);
  _.slidableWidth = this.options.type === 'range' ? _.container.width() - _.controlWidth : _.container.width();
  e.event.preventDefault();
  pos = exports.clamp(0, _.container.width(), e.x - _.container.box().left) / _.slidableWidth;
  val = {};
  if (this.options.type === 'range') {
    start = _.isDiscrete ? discreteToPos.call(this, this.values.start) : this.values.start;
    end = _.isDiscrete ? discreteToPos.call(this, this.values.end) : this.values.end;
    start = (start - this.options.min) / (this.options.max - this.options.min);
    end = (end - this.options.min) / (this.options.max - this.options.min);
    diff = (end - start) / 2;
    offset = _.controlWidth / _.slidableWidth;
    isEnd = (pos - offset / 2) >= (end - diff);
    if (_.dragging === 'end' || (isEnd && _.dragging !== 'start')) {
      _.dragging = 'end';
      pos -= offset;
      pos = exports.clamp(start, 1, pos);
      val.end = posToValue.call(this, pos);
    } else {
      _.dragging = 'start';
      pos = exports.clamp(0, end, pos);
      val.start = posToValue.call(this, pos);
    }
  } else {
    _.dragging = 'value';
    val.value = posToValue.call(this, pos);
  }
  prevValue = this.value();
  this.value(val);
  if (prevValue !== this.value()) {
    this.emit('change', this.value());
  }
};

slideEnd = function(e) {
  var _, node;
  _ = this._;
  if (_.mouseDown) {
    select(document).off('pointermove', 'hx.slider', _.pointerMoveHandler);
    select(document).off('pointerup', 'hx.slider', _.pointerUpHandler);
    _.mouseDown = false;
    _.dragging = void 0;
    node = _.range.select('.hx-slider-active');
    node.morph().with('delay', 100).then('fadeout', 200).then(function() {
      node.classed('hx-slider-active', false);
      return _.valueVis = false;
    }).go(true);
  }
  return this.emit('slideend', this.value());
};

// Render values handles the updates to the slider itself.
renderValues = function() {
  var _, box, endValue, height, node, points, startValue, val;
  _ = this._;
  points = _.container.selectAll('.hx-slider-point');
  if (!points.empty()) {
    height = points.nodes[0].offsetHeight;
    points.forEach(function(d) {
      return d.style('width', height + 'px').style('margin-left', -height / 2 + 'px');
    });
  }
  if (this.options.type === 'range') {
    startValue = _.isDiscrete ? discreteToPos.call(this, this.values.start) : this.values.start;
    endValue = _.isDiscrete ? discreteToPos.call(this, this.values.end) : this.values.end;
  } else {
    startValue = this.options.min;
    endValue = _.isDiscrete ? discreteToPos.call(this, this.values.value) : this.values.value;
  }
  if (!_.isDiscrete) {
    startValue = (startValue - this.options.min) / (this.options.max - this.options.min);
    endValue = (endValue - this.options.min) / (this.options.max - this.options.min);
  }
  _.range.style('left', startValue * 100 + '%').style('width', (endValue - startValue) * 100 + '%');
  if (_.dragging === 'start') {
    node = _.valueL;
    val = this.values.start;
  } else if (_.dragging != null) {
    node = _.valueR;
    val = _.dragging === 'end' ? this.values.end : this.values.value;
  }
  if ((node != null) && (val != null)) {
    if (!_.valueVis) {
      _.valueVis = true;
      node.classed('hx-slider-active', true).classed('hx-slider-under', false);
      // Check if the value box will go off the screen, we must do an extra render here
      // to get the correct height for the label
      this.options.renderer(this, node.node(), val);
      box = node.box();
      node.classed('hx-slider-under', box.top - box.height < 0);
      node.morph().with('fadein', 30).go(true);
    }
    this.options.renderer(this, node.node(), val);
  }
};

exports.Slider = /*@__PURE__*/(function (EventEmitter) {
  function Slider(selector, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

    var _, curr, end, inc, max, mid, min, ref, start, steps, value;
    EventEmitter.call(this);
    this.selector = selector;
    this.options = exports.merge({
      type: 'slider',
      discreteValues: void 0,
      // XXX Breaking: Renderer
      renderer: function(slider, elem, value) {
        return select(elem).text(exports.fixed(value));
      },
      min: 0,
      max: 1,
      step: void 0,
      disabled: false
    }, options);
    this._ = _ = {};
    _.isDiscrete = ((ref = this.options.discreteValues) != null ? ref.length : void 0) > 0 || (this.options.step != null);
    _.container = select(this.selector).classed('hx-slider', true).api('slider', this).api(this).append('div').classed('hx-slider-inner', true).classed('hx-slider-double', this.options.type === 'range').classed('hx-slider-discrete', _.isDiscrete).on('pointerdown', 'hx.slider', function (e) {
      if (!_.disabled) {
        this$1.emit('slidestart', this$1.value());
        return slide.call(this$1, e);
      }
    });
    _.range = _.container.append('div').class('hx-slider-range');
    if (_.controlWidth == null) {
      _.controlWidth = Number(window.getComputedStyle(_.range.node(), ':after').width.replace('px', ''));
    }
    _.valueL = _.range.append('div').class('hx-slider-value').style('left', 0);
    _.valueR = _.range.append('div').class('hx-slider-value').style('left', '100%');
    _.slidableWidth = this.options.type === 'range' ? _.container.width() - _.controlWidth : _.container.width();
    if (this.options.step != null) {
      steps = [];
      curr = this.options.min;
      while (curr <= this.options.max) {
        steps.push(curr);
        curr += this.options.step;
      }
      this.options.max = 1;
      this.options.min = 0;
      this.discreteValues(steps, false);
    } else if (_.isDiscrete) {
      this.discreteValues(this.options.discreteValues, false);
    }
    inc = this.options.max - this.options.min;
    min = (0.25 * inc) + this.options.min;
    mid = (0.5 * inc) + this.options.min;
    max = (0.75 * inc) + this.options.min;
    if (this.options.type === 'range') {
      start = this.options.start != null ? this.options.start : _.isDiscrete ? posToDiscrete.call(this, min) : min;
      end = this.options.end != null ? this.options.end : _.isDiscrete ? posToDiscrete.call(this, max) : max;
      this.values = {
        start: start,
        end: end
      };
    } else {
      value = this.options.end != null ? this.options.end : _.isDiscrete ? posToDiscrete.call(this, mid) : mid;
      this.values = {
        value: value
      };
    }
    if (this.values.value) {
      this.value(this.values.value);
    } else {
      this.value({
        start: this.values.start,
        end: this.values.end
      });
    }
    if (this.options.disabled) {
      this.disabled(this.options.disabled);
    }
  }

  if ( EventEmitter ) Slider.__proto__ = EventEmitter;
  Slider.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Slider.prototype.constructor = Slider;

  Slider.prototype.discreteValues = function discreteValues (array, render) {
    if ( render === void 0 ) render = true;

    var _, i, j, point, pos, ref, ref1;
    if (array != null) {
      this.options.discreteValues = array;
      _ = this._;
      _.isDiscrete = ((ref = this.options.discreteValues) != null ? ref.length : void 0) > 0 || (this.options.step != null);
      _.discreteValues = new Map();
      _.discreteSpacing = 1 / (array.length - 1);
      _.container.selectAll('.hx-slider-point').remove();
      for (i = j = 0, ref1 = array.length; (0 <= ref1 ? j < ref1 : j > ref1); i = 0 <= ref1 ? ++j : --j) {
        pos = i * _.discreteSpacing;
        _.discreteValues.set(array[i], pos);
        if (this.options.type === 'range' || i > 0) {
          point = _.range.insertBefore('div').class('hx-slider-point').style('left', pos * 100 + '%');
        }
      }
      if (render) {
        renderValues.call(this);
      }
      return this;
    } else {
      return this.options.discreteValues;
    }
  };

  Slider.prototype.max = function max (max$1) {
    if (arguments.length > 0) {
      this.options.max = max$1;
      renderValues.call(this);
      return this;
    } else {
      return this.options.max;
    }
  };

  Slider.prototype.step = function step (step$1) {
    if (arguments.length > 0) {
      this.options.step = step$1;
      renderValues.call(this);
      return this;
    } else {
      return this.options.step;
    }
  };

  Slider.prototype.min = function min (min$1) {
    if (arguments.length > 0) {
      this.options.min = min$1;
      renderValues.call(this);
      return this;
    } else {
      return this.options.min;
    }
  };

  Slider.prototype.value = function value (value$1) {
    var this$1 = this;

    var clampValue;
    if (arguments.length > 0) {
      clampValue = function (val) {
        if (this$1._.isDiscrete) {
          return val;
        } else {
          return exports.clamp(this$1.options.min, this$1.options.max, val);
        }
      };
      if (this.options.type === 'range') {
        if (value$1.start != null) {
          this.values.start = clampValue(value$1.start);
        }
        if (value$1.end != null) {
          this.values.end = clampValue(value$1.end);
        }
      } else {
        if (exports.isObject(value$1)) {
          if (value$1.value != null) {
            this.values.value = clampValue(value$1.value);
          }
        } else {
          if (value$1 != null) {
            this.values.value = clampValue(value$1);
          }
        }
      }
      renderValues.call(this);
      return this;
    } else {
      if (this.options.type === 'range') {
        return {
          start: this.values.start,
          end: this.values.end
        };
      } else {
        return this.values.value;
      }
    }
  };

  Slider.prototype.renderer = function renderer (f) {
    if (f != null) {
      this.options.renderer = f;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  Slider.prototype.disabled = function disabled (disable) {
    if (disable != null) {
      this._.disabled = disable;
      return select(this.selector).classed('hx-disabled', disable);
    } else {
      return !!this._.disabled;
    }
  };

  return Slider;
}(EventEmitter));

exports.slider = function(options) {
  var selection;
  selection = div();
  new exports.Slider(selection.node(), options);
  return selection;
};

exports.TimeSlider = (function() {
  var maybeDateToMillis;

  var TimeSlider = /*@__PURE__*/(function (Slider) {
    function TimeSlider(selector, opts) {
      if ( opts === void 0 ) opts = {};

      var max, min, options, start;
      // no need to register this as a component - Slider does that for us
      min = opts.min != null ? maybeDateToMillis(opts.min) : (start = new Date(), start.setMilliseconds(0), start.setSeconds(0), start.setMinutes(0), start.setHours(0), (new Date(start.getTime())).getTime());
      max = opts.max != null ? maybeDateToMillis(opts.max) : min + 24 * 60 * 60 * 1000 - 1;
      options = exports.merge({
        renderer: function(slider, elem, value) {
          return select(elem).text(slider.options.formatter(new Date(value)));
        }
      }, opts);
      options.min = min;
      options.max = max;
      if (typeof moment !== "undefined" && moment !== null) {
        if (options.formatter == null) {
          options.formatter = function(date) {
            return moment(date).format('HH:mm');
          };
        }
      } else {
        if (options.formatter == null) {
          options.formatter = function(date) {
            return exports.zeroPad(date.getHours()) + ':' + exports.zeroPad(date.getMinutes());
          };
        }
      }
      Slider.call(this, selector, options);
    }

    if ( Slider ) TimeSlider.__proto__ = Slider;
    TimeSlider.prototype = Object.create( Slider && Slider.prototype );
    TimeSlider.prototype.constructor = TimeSlider;

    TimeSlider.prototype.value = function value (value$1) {
      var end, start;
      if (arguments.length > 0) {
        if (this.options.type === 'range') {
          start = value$1.start != null ? maybeDateToMillis(value$1.start) : void 0;
          end = value$1.end != null ? maybeDateToMillis(value$1.end) : void 0;
          Slider.prototype.value.call(this, {
            start: start,
            end: end
          });
        } else {
          Slider.prototype.value.call(this, maybeDateToMillis(value$1));
        }
        return this;
      } else {
        if (this.options.type === 'range') {
          return {
            start: new Date(this.values.start),
            end: new Date(this.values.end)
          };
        } else {
          return new Date(this.values.value);
        }
      }
    };

    TimeSlider.prototype.min = function min (min$1) {
      if (arguments.length > 0) {
        return Slider.prototype.min.call(this, maybeDateToMillis(min$1));
      } else {
        return new Date(Slider.prototype.min.call(this));
      }
    };

    TimeSlider.prototype.max = function max (max$1) {
      if (arguments.length > 0) {
        return Slider.prototype.max.call(this, maybeDateToMillis(max$1));
      } else {
        return new Date(Slider.prototype.max.call(this));
      }
    };

    return TimeSlider;
  }(exports.Slider));
  maybeDateToMillis = function(date) {
    if (date instanceof Date) {
      return date.getTime();
    } else {
      return date;
    }
  };

  return TimeSlider;

}).call(undefined);

exports.timeSlider = function(options) {
  var selection;
  selection = div();
  new exports.TimeSlider(selection.node(), options);
  return selection;
};

var backgroundContext, defineComponent, directions, fixes, getComponentParent, headers, i$1, joints, len, ref, size, sizes, textContext, textLikeComponent;

textContext = function(selection, context) {
  if (context) {
    return selection.classed('hx-text-' + context, true);
  } else {
    return selection;
  }
};

backgroundContext = function(selection, context) {
  if (context) {
    return selection.classed('hx-background-' + context, true);
  } else {
    return selection;
  }
};

// core card layout (card + sections + horizontal groups)
exports.card = function() {
  return div('hx-card');
};

exports.card.small = function() {
  return div('hx-card-small hx-card');
};

sizes = [void 0, 'small', 'normal'];

fixes = [void 0, 'fixed'];

joints = [void 0, 'joint'];

directions = [void 0, 'vertical'];

headers = [void 0, 'header'];

sizes.forEach(function(size) {
  return fixes.forEach(function(fixed) {
    return joints.forEach(function(joint) {
      return directions.forEach(function(direction) {
        return headers.forEach(function(header) {
          var base, types;
          types = [size, fixed, joint, direction, header].filter(exports.defined);
          base = exports.card;
          return types.forEach(function(type) {
            if (base[type] == null) {
              base[type] = {};
            }
            return base = base[type];
          });
        });
      });
    });
  });
});

getComponentParent = function(identifierParts) {
  var base;
  base = exports.card;
  identifierParts.forEach(function(type) {
    if (base[type] == null) {
      base[type] = {};
    }
    return base = base[type];
  });
  return base;
};

defineComponent = function(identifier, setup) {
  var identifierParts, name, parent;
  identifierParts = identifier.split('.');
  name = identifierParts.pop();
  parent = getComponentParent(identifierParts);
  return parent[name] = function(options) {
    var selection;
    selection = div(identifier.split('.').map(function(d) {
      return 'hx-card-' + d;
    }).join(' ')).api({
      context: function(context) {
        return backgroundContext(selection, context);
      }
    });
    backgroundContext(selection, options != null ? options.context : void 0);
    if (typeof setup === "function") {
      setup(selection, options);
    }
    return selection;
  };
};

// sections and groups
defineComponent('section');

defineComponent('group');

defineComponent('vertical.group');

defineComponent('header.section');

defineComponent('header.group');

defineComponent('vertical.header.group');

defineComponent('joint.section');

defineComponent('joint.group');

defineComponent('joint.vertical.group');

defineComponent('joint.header.section');

defineComponent('joint.header.group');

defineComponent('joint.vertical.header.group');

defineComponent('fixed.section');

defineComponent('fixed.group');

defineComponent('fixed.vertical.group');

defineComponent('fixed.header.section');

defineComponent('fixed.header.group');

defineComponent('fixed.vertical.header.group');

defineComponent('fixed.joint.section');

defineComponent('fixed.joint.group');

defineComponent('fixed.joint.vertical.group');

defineComponent('fixed.joint.header.section');

defineComponent('fixed.joint.header.group');

defineComponent('fixed.joint.vertical.header.group');

ref = ['small', 'normal', 'slim'];
for (i$1 = 0, len = ref.length; i$1 < len; i$1++) {
  size = ref[i$1];
  defineComponent(size + '.section');
  defineComponent(size + '.group');
  defineComponent(size + '.vertical.group');
  defineComponent(size + '.header.section');
  defineComponent(size + '.header.group');
  defineComponent(size + '.vertical.header.group');
  defineComponent(size + '.joint.section');
  defineComponent(size + '.joint.group');
  defineComponent(size + '.joint.vertical.group');
  defineComponent(size + '.joint.header.section');
  defineComponent(size + '.joint.header.group');
  defineComponent(size + '.joint.vertical.header.group');
  defineComponent(size + '.fixed.section');
  defineComponent(size + '.fixed.group');
  defineComponent(size + '.fixed.vertical.group');
  defineComponent(size + '.fixed.header.section');
  defineComponent(size + '.fixed.header.group');
  defineComponent(size + '.fixed.vertical.header.group');
  defineComponent(size + '.fixed.joint.section');
  defineComponent(size + '.fixed.joint.group');
  defineComponent(size + '.fixed.joint.vertical.group');
  defineComponent(size + '.fixed.joint.header.section');
  defineComponent(size + '.fixed.joint.header.group');
  defineComponent(size + '.fixed.joint.vertical.header.group');
}

exports.card.aligned = function() {
  return div('hx-card-aligned');
};

/* building blocks */
exports.card.large = {};

textLikeComponent = function(elementType, clasz) {
  return function(options) {
    var context, selection;
    context = options != null ? options.context : void 0;
    selection = detached(elementType).class(clasz).text(options.text).api({
      text: function(text) {
        if (arguments.length > 0) {
          selection.text(text);
          return this;
        } else {
          return selection.text();
        }
      },
      context: function(c) {
        if (arguments.length > 0) {
          context = c;
          textContext(selection, context);
          return this;
        } else {
          return context;
        }
      }
    });
    textContext(selection, context);
    return selection;
  };
};

exports.card.text = textLikeComponent('span', 'hx-card-text');

exports.card.small.text = function(options) {
  return exports.card.text(options).classed('hx-card-small', true);
};

exports.card.large.text = function(options) {
  return exports.card.text(options).classed('hx-card-large', true);
};

exports.card.title = textLikeComponent('span', 'hx-card-title hx-header');

exports.card.small.title = function(options) {
  return exports.card.title(options).classed('hx-card-small', true);
};

exports.card.large.title = function(options) {
  return exports.card.title(options).classed('hx-card-large', true);
};

exports.card.icon = function(options) {
  var selection;
  selection = detached('i').class('hx-card-icon ' + (options.icon || '')).api({
    icon: function(icon) {
      selection.class('hx-card-icon ' + (icon || ''));
      return this;
    },
    context: function(context) {
      textContext(selection, context);
      return this;
    }
  });
  textContext(selection, options != null ? options.context : void 0);
  return selection;
};

exports.card.small.icon = function(options) {
  return exports.card.icon(options).classed('hx-card-small', true);
};

exports.card.large.icon = function(options) {
  return exports.card.icon(options).classed('hx-card-large', true);
};

/* sections */
exports.card.action = {
  icon: {}
};

exports.card.icon.action = {};

exports.card.action.section = function(options) {
  return exports.card.section(options).add(detached('a').attr('href', options.link).class('hx-card-action').add(exports.card.text(options)));
};

exports.card.action.icon.section = function(options) {
  return exports.card.section(options).add(detached('a').attr('href', options.link).class('hx-card-action').add(exports.card.text(options)).add(exports.card.icon(options)));
};

exports.card.icon.action.section = function(options) {
  return exports.card.section(options).add(detached('a').attr('href', options.link).class('hx-card-action').add(exports.card.icon(options)).add(exports.card.text(options)));
};

// Complete cards
exports.card.notice = function(options) {
  if ( options === void 0 ) options = {};

  return exports.card().classed('hx-card-small', true).add(exports.card.header.section({
    sectionContext: options.context || 'info'
  }).add(exports.card.title({
    titleText: options.title || 'Note'
  }))).add(exports.card.section().add(exports.card.text({
    text: options.message
  })));
};

var getPageItems, getRange, makeItem, makeRange;

exports.userFacingText({
  paginator: {
    paginatorAria: 'Pagination navigation',
    currentPageAria: 'Current page, page $page',
    gotoPageAria: 'Goto page $page',
    prevPageAria: 'Goto previous page, page $page',
    nextPageAria: 'Goto next page, page $page',
    prev: 'Prev',
    next: 'Next'
  }
});

getRange = function(obj) {
  var end, start;
  start = Math.max(1, obj.page - Math.floor(obj.visibleCount / 2));
  end = Math.min(start + obj.visibleCount, obj.pageCount + 1);
  start = Math.max(1, end - obj.visibleCount);
  return {
    start: start,
    end: end
  };
};

makeItem = function(page, currentPage) {
  return ("" + page + (currentPage === page ? '~' : ''));
};

makeRange = function(first, last) {
  return exports.range(last - first + 1).map(function(_, index) {
    return index + first;
  });
};

getPageItems = function(currentPage, pageCount, padding) {
  var assign;

  if ( currentPage === void 0 ) currentPage = 1;
  var distanceFromEnd, distanceFromStart, items, maxPadding, maxPage, minPage;
  // Calculate the contiguous page number links range tht includes the currentPage page
  items = pageCount ? (maxPadding = (padding * 2) + 1, distanceFromStart = currentPage - maxPadding, distanceFromEnd = -(currentPage + maxPadding - pageCount), (assign = distanceFromEnd >= distanceFromStart && distanceFromStart <= 0 ? [1, Math.min(maxPadding, pageCount)] : distanceFromEnd < 0 ? [Math.max(pageCount - maxPadding + 1, 1), pageCount] : [Math.max(currentPage - padding, 1), Math.min(currentPage + padding, pageCount)], minPage = assign[0], maxPage = assign[1], assign), minPage = minPage <= 3 ? 1 : minPage, maxPage = maxPage >= pageCount - 2 ? pageCount : maxPage, [
    currentPage !== 1 && 'prev',
    minPage > 1 && makeItem(1,
    currentPage),
    minPage > 2 && '...' ].concat( makeRange(minPage,
    maxPage).map(function(p) {
      return makeItem(p,
    currentPage);
    }),
    [maxPage < pageCount - 1 && '...'],
    [maxPage < pageCount && makeItem(pageCount,
    currentPage)],
    [currentPage !== pageCount && 'next']
  )) : [currentPage !== 1 && 'prev', makeItem(currentPage, currentPage), 'next'];
  return items.filter(function(x) {
    return x;
  });
};

exports.Paginator = (function() {
  var selectPage, setterGetter;

  var Paginator = /*@__PURE__*/(function (EventEmitter) {
    function Paginator(selector, options) {
      var this$1 = this;

      var links, nav, navItemEnter, navItemUpdate, pageButtons, self;
      EventEmitter.call(this);
      this.container = select(selector).classed('hx-paginator', true).api('paginator', this).api(this);
      this._ = exports.merge({
        page: 1,
        pageCount: 10,
        visibleCount: 10,
        updatePageOnSelect: true,
        paginatorAria: exports.userFacingText('paginator', 'paginatorAria'),
        currentPageAria: exports.userFacingText('paginator', 'currentPageAria', true),
        gotoPageAria: exports.userFacingText('paginator', 'gotoPageAria', true),
        prevPageAria: exports.userFacingText('paginator', 'prevPageAria', true),
        nextPageAria: exports.userFacingText('paginator', 'nextPageAria', true),
        prevText: exports.userFacingText('paginator', 'prev'),
        nextText: exports.userFacingText('paginator', 'next'),
        v2Features: {
          showCentered: false,
          padding: 2,
          useAccessibleRendering: false
        }
      }, options);
      this._.selector = selector;
      if (this._.v2Features.useAccessibleRendering) {
        // 2.x
        this.container.classed('hx-paginator-center', this._.v2Features.showCentered);
        navItemEnter = function() {
          var navItem;
          navItem = detached('li').class('hx-paginator-button-container').add(detached('a').class('hx-paginator-button'));
          return this.append(navItem).node();
        };
        navItemUpdate = function(ref, element) {
          var text = ref.text;
          var aria = ref.aria;
          var selected = ref.selected;
          var disabled = ref.disabled;
          var isEllipsis = ref.isEllipsis;
          var onClick = ref.onClick;
          var isPrevNextButton = ref.isPrevNextButton;

          var link, navItem;
          navItem = select(element).classed('hx-paginator-selected-container', selected).classed('hx-paginator-ellipsis-container', isEllipsis).classed('hx-paginator-prev-next-container', isPrevNextButton);
          link = navItem.select('a').classed('hx-paginator-selected', selected).attr('aria-current', selected ? true : void 0).classed('hx-paginator-ellipsis', isEllipsis).attr('aria-hidden', isEllipsis ? true : void 0);
          link.text(text);
          link.attr('aria-label', aria);
          link.off();
          if (onClick) {
            return link.on('click', 'paginator', onClick);
          }
        };
        links = detached('ul');
        this.view = links.view('li').enter(navItemEnter).update(navItemUpdate);
        nav = detached('nav').class('hx-paginator-nav').attr('role', 'navigation').attr('aria-label', this._.paginatorAria).add(links).attr('tabindex', '0').on('keydown', function (e) {
          var currentPage, currentPageCount;
          currentPage = this$1.page();
          currentPageCount = this$1.pageCount();
          switch (e.which) {
            case 37: // Left
              if (currentPage !== 1) {
                return selectPage.call(this$1, 'user', currentPage - 1);
              }
              break;
            case 39: // Right
              if (currentPage !== currentPageCount) {
                return selectPage.call(this$1, 'user', currentPage + 1);
              }
          }
        });
        this.container.add(nav);
      } else {
        // 1.x
        // go-to-start button
        self = this;
        this.container.append('button').attr('type', 'button').class('hx-btn ' + theme().paginator.arrowButton).add(detached('i').class('hx-icon hx-icon-step-backward')).on('click', 'paginator', function() {
          if (self._.pageCount === void 0) {
            return selectPage.call(self, 'user', self._.page - 1);
          } else {
            return selectPage.call(self, 'user', 0);
          }
        });
        pageButtons = this.container.append('span').class('hx-input-group');
        this.view = pageButtons.view('.hx-btn', 'button').update(function(d, e, i) {
          return this.text(d.value).attr('type', 'button').classed('hx-paginator-three-digits', d.dataLength === 3).classed('hx-paginator-more-digits', d.dataLength > 3).classed(theme().paginator.defaultButton, !d.selected).classed(theme().paginator.selectedButton, d.selected).classed('hx-no-border', true).on('click', 'paginator', function() {
            return selectPage.call(self, 'user', d.value);
          });
        });
        // go-to-end button
        this.container.append('button').attr('type', 'button').class('hx-btn ' + theme().paginator.arrowButton).add(detached('i').class('hx-icon hx-icon-step-forward')).on('click', 'paginator', function() {
          if (self._.pageCount === void 0) {
            return selectPage.call(self, 'user', self._.page + 1);
          } else {
            return selectPage.call(self, 'user', self._.pageCount);
          }
        });
        this.container.on('resize', 'paginator', function () {
          return this$1.render();
        });
      }
      this.render();
    }

    if ( EventEmitter ) Paginator.__proto__ = EventEmitter;
    Paginator.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    Paginator.prototype.constructor = Paginator;

    Paginator.prototype.page = function page (value) {
      // Set
      if (arguments.length > 0) {
        selectPage.call(this, 'api', value, true);
        return this;
      } else {
        // Get
        return this._.page;
      }
    };

    Paginator.prototype.render = function render () {
      var this$1 = this;
      var assign, assign$1;

      var buttonSize, buttonSpace, currentPage, currentPageCount, data, end, maxButtons, maxLength, start, visibleCount;
      currentPage = this.page();
      currentPageCount = this.pageCount();
      data = this._.v2Features.useAccessibleRendering ? getPageItems(currentPage, currentPageCount, this._.v2Features.padding).map(function (item) {
        var aria, numericItem, selected;
        if (item === 'prev') {
          return {
            isPrevNextButton: true,
            text: this$1.prevText(),
            aria: exports.userFacingText.format(this$1.prevPageAria(), {
              page: currentPage - 1
            }),
            onClick: function () {
              return selectPage.call(this$1, 'user', currentPage - 1);
            }
          };
        }
        if (item === 'next') {
          return {
            isPrevNextButton: true,
            text: this$1.nextText(),
            aria: exports.userFacingText.format(this$1.nextPageAria(), {
              page: currentPage + 1
            }),
            onClick: function () {
              return selectPage.call(this$1, 'user', currentPage + 1);
            }
          };
        }
        if (item === '...') {
          return {
            isEllipsis: true
          };
        }
        selected = item.indexOf('~') > -1;
        numericItem = parseInt(item);
        aria = selected ? this$1.currentPageAria() : this$1.gotoPageAria();
        return {
          text: numericItem,
          aria: exports.userFacingText.format(aria, {
            page: numericItem
          }),
          selected: selected,
          onClick: function () {
            return selectPage.call(this$1, 'user', numericItem);
          }
        };
      }) : currentPageCount === void 0 ? [
        {
          value: currentPage,
          selected: true,
          dataLength: currentPage.toString().length
        }
      // 85 is the width of the back/forward buttons which never changes
      // XXX: Probably shouldn't run this twice every time
      ] : (((assign = getRange(this._), start = assign.start, end = assign.end, assign)), maxLength = Math.max(start.toString().length, (end - 1).toString().length), buttonSize = 30 + (5 * Math.max(0, maxLength - 2)), buttonSpace = this.container.width() - 81, maxButtons = Math.floor(buttonSpace / buttonSize), visibleCount = Math.min(maxButtons, this._.visibleCount), visibleCount = Math.max(visibleCount, 1), ((assign$1 = getRange(this._), start = assign$1.start, end = assign$1.end, assign$1)), exports.range(end - start).map(function (i) {
        return {
          value: start + i,
          selected: this$1._.page === start + i,
          dataLength: maxLength
        };
      }));
      return this.view.apply(data);
    };

    return Paginator;
  }(EventEmitter));
  setterGetter = function(key, onChange) {
    return function(val) {
      // Set
      if (arguments.length > 0) {
        this._[key] = val;
        this.render();
        return this;
      } else {
        // Get
        return this._[key];
      }
    };
  };

  Paginator.prototype.pageCount = setterGetter('pageCount');

  Paginator.prototype.visibleCount = setterGetter('visibleCount');

  Paginator.prototype.updatePageOnSelect = setterGetter('updatePageOnSelect');

  Paginator.prototype.paginatorAria = setterGetter('paginatorAria');

  Paginator.prototype.currentPageAria = setterGetter('currentPageAria');

  Paginator.prototype.gotoPageAria = setterGetter('gotoPageAria');

  Paginator.prototype.prevPageAria = setterGetter('prevPageAria');

  Paginator.prototype.nextPageAria = setterGetter('nextPageAria');

  Paginator.prototype.prevText = setterGetter('prevText');

  Paginator.prototype.nextText = setterGetter('nextText');

  selectPage = function(cause, value) {
    if ( value === void 0 ) value = 1;

    var currentPage, currentPageCount, newPage;
    currentPageCount = this.pageCount();
    currentPage = this.page();
    newPage = currentPageCount === void 0 ? Math.max(value, 1) : exports.clamp(1, currentPageCount, value);
    if (newPage !== currentPage) {
      if (cause === 'api' || this.updatePageOnSelect()) {
        this._.page = newPage;
        this.render();
      }
      // DEPRECATED: 'selected' is deprecated in the event
      return this.emit('change', {
        cause: cause,
        value: value,
        selected: value
      });
    }
  };

  return Paginator;

}).call(undefined);

exports.paginator = function(options) {
  var selection;
  selection = div();
  new exports.Paginator(selection.node(), options);
  return selection;
};

exports.SideCollapsible = /*@__PURE__*/(function (EventEmitter) {
  function SideCollapsible(selector, options) {
    var this$1 = this;

    var closedToggle, openToggle, padding, whichOpp, whichSize;
    EventEmitter.call(this);
    this.options = exports.mergeDefined({
      position: 'left',
      animate: true,
      visible: false,
      rotateHeading: true
    }, options);
    this.selection = select(selector).classed('hx-side-collapsible', true).api('side-collapsible', this).api(this);
    this.openHeading = this.selection.select('.hx-side-collapsible-heading-open').classed('hx-side-collapsible-heading', true);
    this.closedHeading = this.selection.select('.hx-side-collapsible-heading-closed').classed('hx-side-collapsible-heading', true).classed('hx-side-collapsible-heading-' + this.options.position, true).classed('hx-side-collapsible-heading-no-rotate', !this.options.rotateHeading);
    this.content = this.selection.select('.hx-side-collapsible-content');
    padding = Number(this.closedHeading.style('padding').replace('px', ''));
    whichSize = this.options.rotateHeading ? 'height' : 'width';
    whichOpp = this.options.rotateHeading ? 'width' : 'height';
    this.closedSize = Number(this.closedHeading.style(whichSize).replace('px', '')) + 2 + 2 * padding;
    this.selection.style('min-height', this.closedSize + 'px');
    this.closedHeading.style('min-' + whichOpp, Math.ceil(this.selection.style('height').replace('px', '') - 2 * padding) + 'px');
    if ((closedToggle = this.closedHeading.select('.hx-side-collapsible-toggle')).empty()) {
      this.closedHeading.on('click', 'hx.side-collapsible', function () {
        return this$1.show();
      });
    } else {
      this.closedHeading.classed('hx-side-collapsible-heading-no-hover', true);
      closedToggle.on('click', 'hx.side-collapsible', function () {
        return this$1.show();
      });
    }
    if ((openToggle = this.openHeading.select('.hx-side-collapsible-toggle')).empty()) {
      this.openHeading.on('click', 'hx.side-collapsible', function () {
        return this$1.hide();
      });
    } else {
      this.openHeading.classed('hx-side-collapsible-heading-no-hover', true);
      openToggle.on('click', 'hx.side-collapsible', function () {
        return this$1.hide();
      });
    }
    this.visible = !this.options.visible;
    if (this.options.visible) {
      this.show(false);
    } else {
      this.hide(false);
    }
  }

  if ( EventEmitter ) SideCollapsible.__proto__ = EventEmitter;
  SideCollapsible.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  SideCollapsible.prototype.constructor = SideCollapsible;

  SideCollapsible.prototype.show = function show (animate, cb) {
    var this$1 = this;

    var morph;
    animate = animate != null ? animate : this.options.animate;
    if (!this.visible) {
      this.visible = true;
      if (animate) {
        this.selection.style('width', this.closedSize + 'px');
        this.openHeading.style('width', this.closedSize + 'px');
        this.content.style('width', this.closedSize + 'px');
        this.openHeading.style('opacity', 0).style('display', 'block');
        this.content.style('opacity', 0).style('display', 'block');
        morph = function () {
          this$1.closedHeading.style('display', 'none');
          this$1.selection.style('width', '');
          this$1.content.morph().with('expandh', 100).and('fadein', 100).and(function () {
            return this$1.openHeading.morph().with('expandh', 100).and('fadein', 100).go(true);
          }).go(true);
          this$1.emit('showend');
          return typeof cb === "function" ? cb() : void 0;
        };
        this.closedHeading.morph().with('fadeout', 100).then(morph).go(true);
      } else {
        this.selection.style('width', '');
        this.closedHeading.style('display', 'none');
        this.openHeading.style('display', 'block');
        this.content.style('display', 'block');
        this.emit('showend');
      }
    }
    this.emit('showstart');
    this.emit('change', true);
    return this;
  };

  SideCollapsible.prototype.hide = function hide (animate, cb) {
    var this$1 = this;
    animate = animate != null ? animate : this.options.animate;
    if (this.visible) {
      this.visible = false;
      if (animate) {
        this.closedHeading.style('opacity', 0).style('display', 'block');
        this.content.morph().with('collapseh', 100).and('fadeout', 100).and(function () {
          return this$1.openHeading.morph().with('collapseh', 100).and('fadeout', 100).go(true);
        }).then(function () {
          this$1.selection.style('width', this$1.closedSize + 'px');
          this$1.openHeading.style('width', this$1.closedSize + 'px');
          this$1.content.style('width', this$1.closedSize + 'px');
          this$1.closedHeading.morph().with('fadein', 100).go(true);
          this$1.emit('hideend');
          return typeof cb === "function" ? cb() : void 0;
        }).go(true);
      } else {
        this.selection.style('width', this.closedSize + 'px');
        this.closedHeading.style('display', 'block');
        this.openHeading.style('display', 'none');
        this.content.style('display', 'none');
        this.emit('hideend');
      }
    }
    this.emit('hidestart');
    this.emit('change', false);
    return this;
  };

  SideCollapsible.prototype.toggle = function toggle (animate) {
    animate = animate != null ? animate : this.options.animate;
    if (this.visible) {
      this.show(animate);
    } else {
      this.hide(animate);
    }
    return this;
  };

  return SideCollapsible;
}(EventEmitter));

var buildCalendar, buildDatepicker, calendarGridRowUpdate, calendarGridUpdate, getCalendarDecade, getCalendarMonth, getCalendarYear, isBetweenDates, isSelectable, isSelected, isToday, setupInput, toggleInputValidity, updateDatepicker, validateDates;

// Builds the array of days to display on the calendar in 'm' view
getCalendarMonth = function(year, month, weekStart) {
  var _, e, end, i, results, start;
  start = (new Date(year, month)).getDay() - weekStart;
  if (start < 0) {
    start += 7;
  }
  end = new Date(year, month + 1, 0).getDate();
  results = [];
  results.push(start > 0 ? ((function() {
    var j, ref1, results1;
    results1 = [];
    for (_ = j = 0, ref1 = start - 1; (0 <= ref1 ? j <= ref1 : j >= ref1); _ = 0 <= ref1 ? ++j : --j) {
      results1.push(void 0);
    }
    return results1;
  })()).concat((function() {
    var results1 = [];
    for (var j = 1, ref = 7 - start; 1 <= ref ? j <= ref : j >= ref; 1 <= ref ? j++ : j--){ results1.push(j); }
    return results1;
  }).apply(this)) : [1, 2, 3, 4, 5, 6, 7]);
  i = 1 - start;
  while (i < end) {
    i += 7;
    e = Math.min(i + 6, end);
    if (i <= e) {
      results.push((function() {
        var results1 = [];
        for (var j = i; i <= e ? j <= e : j >= e; i <= e ? j++ : j--){ results1.push(j); }
        return results1;
      }).apply(this));
    }
  }
  if (results[results.length - 1].length < 7) {
    results[results.length - 1].length = 7;
  }
  return results;
};

// Returns the array of months to display on the calendar in 'y' view
getCalendarYear = function() {
  return [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];
};

// Builds the array of years to display on the calendar in 'd' view
getCalendarDecade = function(year) {
  var i, j, res, row;
  // Get start of current decade
  while (year % 10 !== 0) {
    year -= 1;
  }
  res = [];
  row = [];
  for (i = j = 0; j <= 11; i = ++j) {
    if (i > 0 && i % 3 === 0) {
      res.push(row);
      row = [];
    }
    row.push(year - 1 + i);
  }
  res.push(row);
  return res;
};

isSelectable = function(datepicker, year, month, day) {
  var endIsSelectable, startIsSelectable, testDate, validEnd, validRange, validStart, visible;
  validRange = datepicker.validRange();
  if (validRange.start != null) {
    validStart = new Date(validRange.start.getTime());
  }
  if (validRange.end != null) {
    validEnd = new Date(validRange.end.getTime());
  }
  // If we don't pass in month/day here then we assume the month/day will be
  // halfway through the year/month and use that to validate against.
  if ((year != null) && (month == null) && (day == null)) {
    month = 6;
    day = 15;
    if (validStart != null) {
      validStart.setDate(0);
    }
    if (validEnd != null) {
      validEnd.setDate(28);
    }
    if (validStart != null) {
      validStart.setMonth(0);
    }
    if (validEnd != null) {
      validEnd.setMonth(11);
    }
  }
  if ((month != null) && (day == null)) {
    day = 15;
    if (validStart != null) {
      validStart.setDate(0);
    }
    if (validEnd != null) {
      validEnd.setDate(28);
    }
  }
  visible = datepicker.visibleMonth();
  if (year == null) {
    year = visible.year;
  }
  if (month == null) {
    month = visible.month;
  }
  testDate = new Date(year, month, day);
  startIsSelectable = validStart != null ? testDate >= validStart : true;
  endIsSelectable = validEnd != null ? testDate <= validEnd : true;
  return startIsSelectable && endIsSelectable;
};

isSelected = function(selectedDate, year, month, day) {
  var assign;

  var selectedDay, selectedMonth, selectedYear;
  (assign = selectedDate.split('-').map(Number), selectedYear = assign[0], selectedMonth = assign[1], selectedDay = assign[2]);
  return selectedYear === year && ((month == null) || selectedMonth - 1 === month) && ((day == null) || selectedDay === day);
};

isBetweenDates = function(range, year, month, day) {
  var testDate;
  testDate = new Date(year, month, day);
  return testDate > range.start && testDate < range.end;
};

isToday = function(year, month, day) {
  var date, today;
  today = new Date();
  date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime();
};

toggleInputValidity = function(input, dateValidityCallback, valid, type) {
  if (input != null) {
    if (dateValidityCallback) {
      return dateValidityCallback(valid, type);
    } else {
      return input.classed('hx-date-error', !valid);
    }
  }
};

// Checks that the start and end dates fall within the valid range and that the
// end date is always after the start date.
validateDates = function(datepicker) {
  var _, isRangePicker, ref, ref1, ref2, ref3, ref4, ref5, tDate, validityFn;
  _ = datepicker._;
  isRangePicker = datepicker.options.selectRange;
  if (datepicker.options.v2Features.dontModifyDateOnError) {
    validityFn = _.inputOnlyMode && datepicker.options.v2Features.dateValidityCallback;
    toggleInputValidity(_.input, validityFn, true);
    if ((ref = _.inputStart) != null) {
      ref.classed('hx-date-error', false);
    }
    if ((ref1 = _.inputEnd) != null) {
      ref1.classed('hx-date-error', false);
    }
    if (_.validRange != null) {
      if (_.validRange.start != null) {
        if (_.startDate < _.validRange.start) {
          toggleInputValidity(_.input, validityFn, false, 'DATE_OUTSIDE_RANGE_START');
          if ((ref2 = _.inputStart) != null) {
            ref2.classed('hx-date-error', true);
          }
        }
        if (isRangePicker && _.endDate < _.validRange.start) {
          if ((ref3 = _.inputEnd) != null) {
            ref3.classed('hx-date-error', true);
          }
        }
      }
      if (_.validRange.end != null) {
        if (_.startDate > _.validRange.end) {
          toggleInputValidity(_.input, validityFn, false, 'DATE_OUTSIDE_RANGE_END');
          if ((ref4 = _.inputStart) != null) {
            ref4.classed('hx-date-error', true);
          }
        }
        if (isRangePicker && _.endDate > _.validRange.end) {
          if ((ref5 = _.inputEnd) != null) {
            ref5.classed('hx-date-error', true);
          }
        }
      }
    }
  } else {
    if (_.validRange != null) {
      if (_.validRange.start != null) {
        if (_.startDate < _.validRange.start) {
          _.startDate = new Date(_.validRange.start.getTime());
        }
        if (isRangePicker && _.endDate < _.validRange.start) {
          _.endDate = new Date(_.validRange.start.getTime());
        }
      }
      if (_.validRange.end != null) {
        if (_.startDate > _.validRange.end) {
          _.startDate = new Date(_.validRange.end.getTime());
        }
        if (isRangePicker && _.endDate > _.validRange.end) {
          _.endDate = new Date(_.validRange.end.getTime());
        }
      }
    }
    if (!isRangePicker) {
      _.endDate = _.startDate;
    } else {
      if (_.endDate < _.startDate) {
        tDate = _.endDate;
        _.endDate = _.startDate;
        _.startDate = tDate;
      }
    }
  }
};

// Functions for setting up the calendar picker
buildCalendar = function(datepicker, mode) {
  var _, cls, data, localizer, ref, text, visible;
  _ = datepicker._;
  _.calendarGrid.selectAll('.hx-grid-row').remove();
  _.calendarView = _.calendarGrid.view('.hx-grid-row', 'div').update(function(d, e, i) {
    return calendarGridUpdate(datepicker, d, e, i, mode);
  });
  if (mode == null) {
    mode = _.mode;
  }
  _.mode = mode;
  localizer = datepicker.localizer;
  visible = datepicker.visibleMonth();
  switch (mode) {
    case 'd':
      data = getCalendarDecade(visible.year);
      cls = 'hx-calendar-decade';
      text = localizer.year(data[0][1]) + ' - ' + localizer.year(data[3][1]);
      break;
    case 'y':
      data = getCalendarYear();
      cls = 'hx-calendar-year';
      text = localizer.year(visible.year);
      break;
    default:
      data = getCalendarMonth(visible.year, visible.month - 1, localizer.weekStart());
      data.unshift('days'); // When the update gets to this it adds the days of the week as a row
      cls = 'hx-calendar-month';
      if (datepicker.options.v2Features.displayLongMonthInCalendar) {
        text = (localizer.fullMonth(visible.month - 1)) + " " + (localizer.year(visible.year));
      } else {
        text = localizer.month(visible.month - 1) + ' / ' + localizer.year(visible.year);
      }
  }
  _.calendarGrid.class('hx-calendar-grid ' + cls);
  _.calendarHeadBtn.text(text);
  if ((ref = _.calendarTodayButton) != null) {
    ref.text(localizer.todayText());
  }
  return _.calendarView.apply(data);
};

calendarGridUpdate = function(datepicker, data, elem, index, mode) {
  var _, element;
  _ = datepicker._;
  element = select(elem);
  if (data === 'days') {
    return element.classed('hx-grid-row-heading', true).view('.hx-grid').update(function(d) {
      return this.text(d).node();
    }).apply(datepicker.localizer.weekDays());
  } else {
    return element.view('.hx-grid').enter(function(d) {
      var node;
      node = this.append('div').class('hx-grid');
      if (datepicker.options.selectRange) {
        node.append('div').class('hx-grid-range-bg');
      }
      node.append('div').class('hx-grid-text');
      return node.node();
    }).update(function(d, e, i) {
      return calendarGridRowUpdate(datepicker, d, e, i, index, mode);
    }).apply(data);
  }
};

calendarGridRowUpdate = function(datepicker, data, elem, index, rowIndex, mode) {
  var _, betweenDates, day, element, isValid, month, range, screenVal, selectable, selected, selectedE, selectedS, today, visible, year;
  _ = datepicker._;
  element = select(elem);
  if (data == null) {
    return element.classed('hx-grid-out-of-range', true).classed('hx-grid-selected', false).classed('hx-grid-selected-start', false).classed('hx-grid-selected-end', false).classed('hx-grid-selected-range', false).classed('hx-grid-today', false);
  } else {
    year = null;
    month = null;
    day = null;
    visible = datepicker.visibleMonth();
    selectable = true;
    switch (mode) {
      case 'd':
        year = data;
        screenVal = datepicker.localizer.year(data);
        selectable = rowIndex === 0 ? index !== 0 : rowIndex === 3 ? index !== 2 : true;
        break;
      case 'y':
        month = data;
        year = visible.year;
        screenVal = datepicker.localizer.month(data);
        break;
      default:
        day = data;
        month = visible.month - 1;
        year = visible.year;
        screenVal = datepicker.localizer.day(data);
    }
    isValid = isSelectable(datepicker, year, month, day) && selectable;
    if (datepicker.options.selectRange) {
      range = datepicker.range();
      selectedS = isSelected(datepicker.localizer.date(range.start, true), year, month, day);
      selectedE = isSelected(datepicker.localizer.date(range.end, true), year, month, day);
      betweenDates = isBetweenDates(range, year, month, day);
      selected = selectedS || selectedE;
    } else {
      selected = isSelected(datepicker.localizer.date(_.startDate, true), year, month, day);
    }
    today = day && isToday(year, month, day);
    element.classed('hx-grid-out-of-range', !isValid).classed('hx-grid-selected', selected).classed('hx-grid-selected-start', selectedS).classed('hx-grid-selected-end', selectedE).classed('hx-grid-selected-range', betweenDates).classed('hx-grid-today', today);
    element.select('.hx-grid-text').text(screenVal);
    if (isValid) {
      return element.on('click', 'hx-date-picker', function() {
        var assign;

        var currentDate, currentDay, date, dayDiff, localizedDay, nMode;
        _.userEvent = true;
        if (mode !== 'd' && mode !== 'y') {
          if (day != null) {
            currentDate = _.startDate;
            currentDay = _.startDate.getDate();
            (assign = datepicker.localizer.date(_.startDate, true).split('-').map(Number), localizedDay = assign[2]);
            dayDiff = currentDay - localizedDay;
            date = new Date(visible.year, visible.month - 1, day + dayDiff, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds());
            if (!datepicker.options.selectRange) {
              datepicker.date(date);
              if (datepicker.options.closeOnSelect) {
                datepicker.hide();
              }
            } else {
              if (_.clickStart == null) {
                _.clickStart = true;
              }
              if (_.clickStart) {
                _.clickStart = false;
                datepicker.range({
                  start: date,
                  end: date
                });
              } else {
                _.clickStart = true;
                datepicker.range({
                  start: _.startDate,
                  end: date
                });
                if (datepicker.options.closeOnSelect) {
                  datepicker.hide();
                }
              }
            }
          }
        } else {
          if (mode === 'd') {
            nMode = 'y';
            datepicker.visibleMonth(6, data);
          } else {
            nMode = 'm';
            datepicker.visibleMonth(data + 1, visible.year);
          }
        }
        setupInput(datepicker);
        return buildCalendar(datepicker, nMode);
      });
    } else {
      return element.on('click', function() {});
    }
  }
};

// Functions for setting up the datepicker picker
buildDatepicker = function(datepicker) {
  var _, day, localizer, month, year;
  _ = datepicker._;
  day = datepicker.day();
  month = datepicker.month();
  year = datepicker.year();
  localizer = datepicker.localizer;
  _.dayPicker.suppressed('change', true);
  _.monthPicker.suppressed('change', true);
  _.yearPicker.suppressed('change', true);
  _.dayPicker.value(day, localizer.day(day, true));
  _.monthPicker.value(month, localizer.month(month - 1, true));
  _.yearPicker.value(year, localizer.year(year));
  _.dayPicker.suppressed('change', false);
  _.monthPicker.suppressed('change', false);
  return _.yearPicker.suppressed('change', false);
};

// Shared Functions for both picker types
setupInput = function(datepicker, initial) {
  var _, range;
  _ = datepicker._;
  if (datepicker.options.selectRange) {
    range = datepicker.range();
    _.inputStart.value(datepicker.localizer.date(range.start, _.useInbuilt));
    return _.inputEnd.value(datepicker.localizer.date(range.end || range.start, _.useInbuilt));
  } else {
    if (!(datepicker.options.v2Features.dontSetInitialInputValue && initial)) {
      return _.input.value(datepicker.localizer.date(_.startDate, _.useInbuilt));
    }
  }
};

// Function for updating the input fields and emitting the change event.
updateDatepicker = function(datepicker, suppress, initial) {
  var _, base;
  _ = datepicker._;
  validateDates(datepicker);
  if (!_.preventFeedback) {
    _.preventFeedback = true;
    if (datepicker.options.selectRange) {
      _.inputStart.classed('hx-date-error', false);
      _.inputEnd.classed('hx-date-error', false);
    } else if (_.inputOnlyMode) {
      if (typeof (base = datepicker.options).dateValidationChange === "function") {
        base.dateValidationChange(true);
      }
    } else {
      _.input.classed('hx-date-error', false);
    }
    setupInput(datepicker, initial);
    if (!suppress) {
      datepicker.emit('change', {
        type: _.userEvent ? 'user' : 'api'
      });
    }
    _.userEvent = false;
    _.preventFeedback = false;
    if (datepicker.options.type === 'calendar') {
      return buildCalendar(datepicker);
    } else {
      return buildDatepicker(datepicker);
    }
  }
};

exports.DatePicker = /*@__PURE__*/(function (EventEmitter) {
  function DatePicker(selector, options) {
    var this$1 = this;

    var _, calendarElem, calendarHeader, changeVis, dayNode, icon, inputContainer, inputUpdate, monthNode, self, setupDropdown, timeout, yearNode;
    EventEmitter.call(this);
    this.selector = selector;
    self = this;
    this.options = exports.mergeDefined({
      type: 'calendar', // 'calendar' or 'datepicker'
      defaultView: 'm', // 'm' for month, 'y' for year, or 'd' for decade
      allowViewChange: true, // Allow changing between month/year/decade views
      closeOnSelect: true,
      selectRange: false,
      validRange: void 0,
      range: void 0,
      showTodayButton: true,
      allowInbuiltPicker: true, // Option to allow preventing use of the inbuilt datepicker
      disabled: false,
      date: void 0,
      v2Features: {
        outputFullDate: false,
        dontModifyDateOnError: false,
        displayLongMonthInCalendar: false,
        dontSetInitialInputValue: false,
        updateVisibleMonthOnDateChange: false,
        dateValidityCallback: void 0 // Called when validating the input when using dontModifyDateOnError
      }
    }, options);
    _ = this._ = {
      disabled: this.options.disabled,
      mode: this.options.defaultView,
      startDate: new Date(this.options.date || Date.now()),
      endDate: new Date(this.options.date || Date.now())
    };
    this.localizer = preferences._.useIntl ? new IntlDateTimeLocalizer() : dateTimeLocalizer();
    this.localizer.on('localechange', 'hx.date-picker', function () {
      return updateDatepicker(this$1, true);
    });
    this.localizer.on('timezonechange', 'hx.date-picker', function () {
      return updateDatepicker(this$1, true);
    });
    this.selection = select(this.selector).api('date-picker', this).api(this);
    _.inputOnlyMode = this.selection.node().tagName.toLowerCase() === 'input';
    if (!this.options.allowViewChange) {
      this.options.defaultView = 'm';
    }
    if (_.inputOnlyMode) {
      if (this.options.selectRange) {
        logger.warn('DatePicker: options.selectRange is not supported when using an input');
        this.options.selectRange = false;
      }
    } else {
      this.selection.classed('hx-date-picker', true);
      inputContainer = this.selection.append('div').class('hx-date-input-container');
      icon = inputContainer.append('i').class('hx-icon hx-icon-calendar');
    }
    timeout = void 0;
    if (this.options.selectRange) {
      // For range selection, we don't want the today button and have to use a calendar.
      this.options.type = 'calendar';
      this.options.showTodayButton = false;
      _.preventFeedback = true;
      this.range(this.options.range || {});
      _.preventFeedback = false;
      inputUpdate = function(which) {
        self.hide();
        clearTimeout(timeout);
        return timeout = setTimeout(function() {
          var date1, date2, endValid, startValid;
          date1 = self.localizer.stringToDate(_.inputStart.value(), _.useInbuilt);
          date2 = self.localizer.stringToDate(_.inputEnd.value(), _.useInbuilt);
          if (which && date2 < date1) {
            date1 = date2;
            _.inputStart.value(_.inputEnd.value());
          } else if (!which && date1 > date2) {
            date2 = date1;
            _.inputEnd.value(_.inputStart.value());
          }
          startValid = date1.getTime();
          endValid = date2.getTime();
          if (startValid && endValid) {
            self.range({
              start: date1,
              end: date2
            });
            self.visibleMonth(date1.getMonth() + 1, date1.getFullYear());
          }
          _.inputStart.classed('hx-date-error', !startValid);
          return _.inputEnd.classed('hx-date-error', !endValid);
        }, 500);
      };
      _.inputStart = inputContainer.append('input').class('hx-date-input').on('input', 'hx.date-picker', function() {
        return inputUpdate(false);
      });
      inputContainer.append('i').class('hx-date-to-icon hx-icon hx-icon-angle-double-right');
      _.inputEnd = inputContainer.append('input').class('hx-date-input').on('input', 'hx.date-picker', function() {
        return inputUpdate(true);
      });
    } else {
      _.useInbuilt = this.options.allowInbuiltPicker ? (typeof moment === "undefined" || moment === null) && exports.supports('date') && exports.supports('touch') : false;
      _.input = _.inputOnlyMode ? this.selection : inputContainer.append('input').class('hx-date-input');
      _.input.on((_.useInbuilt ? 'blur' : 'input'), 'hx.date-picker', function() {
        self.hide();
        clearTimeout(timeout);
        return timeout = setTimeout(function() {
          var date;
          if (self.options.v2Features.dontSetInitialInputValue && _.input.value() === '') {
            if (self.options.v2Features.dateValidityCallback) {
              self.options.v2Features.dateValidityCallback(true);
            } else {
              _.input.classed('hx-date-error', false);
            }
            return;
          }
          date = self.localizer.stringToDate(_.input.value(), _.useInbuilt);
          if (date.getTime()) {
            if (date.getTime() !== _.startDate.getTime()) {
              self.date(date);
              if (!self.options.v2Features.updateVisibleMonthOnDateChange && self.options.type === 'calendar') {
                return self.visibleMonth(date.getMonth() + 1, date.getFullYear());
              }
            }
          } else {
            if (self.options.v2Features.dateValidityCallback) {
              return self.options.v2Features.dateValidityCallback(false, 'INVALID_DATE');
            } else {
              return _.input.classed('hx-date-error', true);
            }
          }
        }, 500);
      });
      if (_.useInbuilt) {
        _.input.attr('type', 'date').on('focus', 'hx.date-picker', function() {
          return self.emit('show');
        });
      }
    }
    if (this.options.type === 'calendar') {
      this.visibleMonth(void 0);
      changeVis = function(multiplier) {
        if ( multiplier === void 0 ) multiplier = 1;

        var month, visible, year;
        visible = self.visibleMonth();
        switch (_.mode) {
          case 'd':
            month = visible.month;
            year = visible.year + (10 * multiplier);
            break;
          case 'y':
            month = visible.month;
            year = visible.year + (1 * multiplier);
            break;
          default:
            month = visible.month + (1 * multiplier);
            year = visible.year;
        }
        self.visibleMonth(month, year);
        return buildCalendar(self);
      };
      calendarElem = div('hx-date-picker-calendar');
      calendarHeader = calendarElem.append('div').class('hx-calendar-header');
      calendarHeader.append('button').class('hx-btn hx-btn-outline hx-calendar-back').on('click', 'hx.date-picker', function() {
        return changeVis(-1);
      }).append('i').class('hx-icon hx-icon-chevron-left');
      if (this.options.allowViewChange) {
        calendarHeader.classed('hx-input-group', true);
        _.calendarHeadBtn = calendarHeader.append('button').class('hx-btn hx-btn-invert').on('click', 'hx.date-picker', function() {
          switch (_.mode) {
            case 'd':
              break;
            case 'y':
              return buildCalendar(self, 'd');
            default:
              return buildCalendar(self, 'y');
          }
        });
      } else {
        calendarHeader.classed('hx-compact-group', true);
        _.calendarHeadBtn = calendarHeader.append('div');
      }
      _.calendarHeadBtn.classed('hx-calendar-header-title', true);
      calendarHeader.append('button').class('hx-btn hx-btn-outline hx-calendar-forward').on('click', 'hx.date-picker', function() {
        return changeVis();
      }).append('i').class('hx-icon hx-icon-chevron-right');
      _.calendarGrid = calendarElem.append('div').class('hx-calendar-grid');
      if (this.options.showTodayButton) {
        _.calendarTodayButton = calendarElem.append('div').class('hx-calendar-today-btn').append('button').class('hx-btn hx-btn-outline').on('click', 'hx.date-picker', function() {
          var date;
          date = new Date();
          self.date(date);
          buildCalendar(self, 'm');
          if (self.options.closeOnSelect) {
            return self.hide();
          }
        });
      }
      // XXX Breaking: Renderer
      // setupDropdown = () ->
      //   if _.disabled
      //     self.hide()
      //     return
      //   else
      //     _.clickStart = true
      //     selection = div()
      //     selection.append(calendarElem)
      //     buildCalendar self, self.options.defaultView
      //     return selection
      setupDropdown = function(elem) {
        var selection;
        if (_.disabled) {
          self.hide();
          return;
        }
        _.clickStart = true;
        selection = select(elem);
        selection.append(calendarElem);
        return buildCalendar(self, self.options.defaultView);
      };
    } else {
      // set up datepicker nodes for attaching to dropdown
      dayNode = div().node();
      monthNode = div().node();
      yearNode = div().node();
      _.dayPicker = new NumberPicker(dayNode, {
        buttonClass: 'hx-btn-outline'
      }).on('change', 'hx.date-picker', function(e) {
        _.userEvent = true;
        return self.day(e.value);
      });
      _.monthPicker = new NumberPicker(monthNode, {
        buttonClass: 'hx-btn-outline'
      }).on('change', 'hx.date-picker', function(e) {
        _.userEvent = true;
        return self.month(e.value);
      });
      _.yearPicker = new NumberPicker(yearNode, {
        buttonClass: 'hx-btn-outline'
      }).on('change', 'hx.date-picker', function(e) {
        _.userEvent = true;
        return self.year(e.value);
      });
      _.dayPicker.selectInput.attr('tabindex', 1);
      _.monthPicker.selectInput.attr('tabindex', 2);
      _.yearPicker.selectInput.attr('tabindex', 3);
      // XXX Breaking: Renderer
      // setupDropdown = () ->
      //   if _.disabled
      //     self.dropdown.hide()
      //     return
      //   else
      //     selection = div()

      //     # add nodes in the correct order
      //     for i in self.localizer.dateOrder()
      //       switch i
      //         when 'DD' then selection.append(dayNode)
      //         when 'MM' then selection.append(monthNode)
      //         when 'YYYY' then selection.append(yearNode)

      //     buildDatepicker(self)

      //     return selection
      setupDropdown = function(elem) {
        var i, j, len, ref, selection;
        if (_.disabled) {
          self.dropdown.hide();
          return;
        }
        selection = select(elem);
        ref = self.localizer.dateOrder();
        // add nodes in the correct order
        for (j = 0, len = ref.length; j < len; j++) {
          i = ref[j];
          switch (i) {
            case 'DD':
              selection.append(dayNode);
              break;
            case 'MM':
              selection.append(monthNode);
              break;
            case 'YYYY':
              selection.append(yearNode);
          }
        }
        return buildDatepicker(self);
      };
    }
    if (!_.useInbuilt) {
      this.dropdown = new Dropdown(this.selector, setupDropdown, {
        matchWidth: false
      });
      // showstart etc. don't make sense here as we don't care about the animations
      this.dropdown.on('hidestart', function () {
        return this$1.emit('hide');
      });
      this.dropdown.on('showstart', function () {
        return this$1.emit('show');
      });
    }
    setupInput(this, true);
    if (_.disable) {
      this.disabled(_.disabled);
    }
    if (this.options.validRange) {
      this.validRange(this.options.validRange, true);
    }
  }

  if ( EventEmitter ) DatePicker.__proto__ = EventEmitter;
  DatePicker.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  DatePicker.prototype.constructor = DatePicker;

  DatePicker.prototype.disabled = function disabled (disable) {
    var _, val;
    _ = this._;
    if (disable != null) {
      if ((this.dropdown != null) && this.dropdown.isOpen()) {
        this.dropdown.hide();
      }
      val = disable ? '' : void 0;
      _.disabled = disable;
      if (this.options.selectRange) {
        _.inputStart.attr('disabled', val);
        _.inputEnd.attr('disabled', val);
      } else {
        _.input.attr('disabled', val);
      }
      return this;
    } else {
      return !!_.disabled;
    }
  };

  DatePicker.prototype.show = function show () {
    if (!this._.useInbuilt) {
      this.dropdown.show();
    } else {
      this._.input.node().focus();
    }
    return this;
  };

  DatePicker.prototype.hide = function hide () {
    if (!this._.useInbuilt) {
      this.dropdown.hide();
    } else {
      this.emit('hide');
    }
    return this;
  };

  DatePicker.prototype.getScreenDate = function getScreenDate (endDate) {
    return this.localizer.date(!endDate ? this._.startDate : this._.endDate);
  };

  DatePicker.prototype.visibleMonth = function visibleMonth (month, year) {
    var _;
    _ = this._;
    if (this.options.type === 'calendar') {
      if (arguments.length > 0) {
        if (year == null) {
          year = _.visibleYear || this.year();
        }
        if (month == null) {
          month = _.visibleMonth || this.month();
        }
        if (month < 1) {
          month += 12;
          year -= 1;
        }
        if (month > 12) {
          month = month % 12;
          year += 1;
        }
        _.visibleMonth = month - 1;
        _.visibleYear = year;
        return this;
      } else {
        return {
          month: _.visibleMonth + 1,
          year: _.visibleYear
        };
      }
    } else {
      logger.warn('Setting the visible month only applies to date pickers of type \'calendar\'');
      return this;
    }
  };

  DatePicker.prototype.date = function date (date$1) {
    var _, returnDate;
    _ = this._;
    if (date$1 != null) {
      date$1 = new Date(date$1.getTime());
      if (this.options.v2Features.updateVisibleMonthOnDateChange && this.options.type === 'calendar') {
        this.visibleMonth(date$1.getMonth() + 1, date$1.getFullYear());
      }
      _.startDate = date$1;
      updateDatepicker(this);
      return this;
    } else {
      returnDate = new Date(_.startDate.getTime());
      if (!this.options.outputFullDate) {
        returnDate.setHours(0, 0, 0, 0);
      }
      return returnDate;
    }
  };

  DatePicker.prototype.day = function day (day$1) {
    var _;
    _ = this._;
    if (day$1 != null) {
      _.startDate.setDate(day$1);
      updateDatepicker(this);
      return this;
    } else {
      return _.startDate.getDate();
    }
  };

  DatePicker.prototype.month = function month (month$1) {
    var _;
    _ = this._;
    if (month$1 != null) {
      _.startDate.setMonth(month$1 - 1); // JS month is 0 based
      updateDatepicker(this);
      return this;
    } else {
      return _.startDate.getMonth() + 1;
    }
  };

  DatePicker.prototype.year = function year (year$1) {
    var _;
    _ = this._;
    if (year$1 != null) {
      _.startDate.setFullYear(year$1);
      updateDatepicker(this);
      return this;
    } else {
      return _.startDate.getFullYear();
    }
  };

  DatePicker.prototype.range = function range (range$1) {
    var _, returnEndDate, returnStartDate;
    _ = this._;
    if (this.options.selectRange) {
      if (arguments.length > 0) {
        if (range$1.start != null) {
          _.startDate = range$1.start;
        }
        if (range$1.end != null) {
          _.endDate = range$1.end;
        }
        updateDatepicker(this);
        return this;
      } else {
        returnStartDate = new Date(_.startDate.getTime());
        returnEndDate = new Date(_.endDate.getTime());
        if (!this.options.outputFullDate) {
          returnStartDate.setHours(0, 0, 0, 0);
          returnEndDate.setHours(0, 0, 0, 0);
        }
        return {
          start: returnStartDate,
          end: returnEndDate
        };
      }
    } else {
      logger.warn('datePicker.range can only be used for datepickers with \'selectRange\' of true');
      return this;
    }
  };

  DatePicker.prototype.validRange = function validRange (validRange$1, initial) {
    var _;
    _ = this._;
    if (_.validRange == null) {
      _.validRange = {
        start: void 0,
        end: void 0
      };
    }
    if (arguments.length > 0) {
      if ('start' in validRange$1) {
        _.validRange.start = validRange$1.start;
      }
      if ('end' in validRange$1) {
        _.validRange.end = validRange$1.end;
      }
      updateDatepicker(this, false, initial);
      return this;
    } else {
      return _.validRange;
    }
  };

  DatePicker.prototype.locale = function locale (locale$1) {
    if (arguments.length > 0) {
      this.localizer.locale(locale$1);
      return this;
    } else {
      return this.localizer.locale();
    }
  };

  return DatePicker;
}(EventEmitter));

exports.datePicker = function(options) {
  var ref, selection;
  selection = (options != null ? (ref = options.v2Features) != null ? ref.useInput : void 0 : void 0) ? detached('input') : div();
  new exports.DatePicker(selection, options);
  return selection;
};

var createTableView;

createTableView = function(table, head, body) {
  var bodyView, cellViewEnter, cellViewUpdate, headView, rowViewEnter, rowViewUpdate;
  cellViewEnter = function(data, index, isHead) {
    var cell, cellIsHead, cellIsTopLeft, isFirstColum, type;
    isFirstColum = table._.leftShifted && index === 0;
    cellIsHead = isHead || isFirstColum;
    cellIsTopLeft = isHead && isFirstColum;
    type = cellIsHead || exports.isFunction(data) ? 'th' : 'td';
    cell = this.append(type).class('hx-pivot-table-cell');
    if (cellIsHead) {
      cell.classed('hx-pivot-table-head-cell', true);
    }
    if (cellIsTopLeft) {
      cell.classed('hx-table-head-no-border', true);
    }
    return cell.node();
  };
  cellViewUpdate = function(data, node, index, isHead) {
    var cellIsHead, isFirstColum, selection;
    isFirstColum = table._.leftShifted && index === 0;
    cellIsHead = isHead || isFirstColum;
    selection = select(node);
    if (exports.isFunction(data)) { // Top left cell
      return data(node);
    } else if (data == null) { // Top left cell when no renderer provided
      return selection.text('');
    } else {
      return table.options.cellRender(data, node, cellIsHead, index); // Head / Body cells
    }
  };
  rowViewEnter = function(data, isHead) {
    var row, rowView;
    row = this.append('tr');
    rowView = select(row).view('.hx-pivot-table-cell').enter(function(datum) {
      var index;
      index = data.indexOf(datum);
      return cellViewEnter.call(this, datum, index, isHead);
    }).update(function(datum, node, index) {
      return cellViewUpdate(datum, node, index, isHead);
    });
    // create the view once on enter and re-use it in the update
    row.api({
      view: rowView
    });
    return row.node();
  };
  rowViewUpdate = function(data, node, index, isHead) {
    return select(node).api().view.apply(data);
  };
  headView = head.view('tr').enter(function(data) {
    return rowViewEnter.call(this, data, true);
  }).update(function(data, node) {
    return rowViewUpdate(data, node, true);
  });
  bodyView = body.view('tr').enter(function(data) {
    return rowViewEnter.call(this, data, false);
  }).update(function(data, node) {
    return rowViewUpdate(data, node, false);
  });
  return [headView, bodyView];
};

exports.PivotTable = /*@__PURE__*/(function (EventEmitter) {
  function PivotTable(selector, options) {
    var assign;
    EventEmitter.call(this);
    this.selector = selector;
    this.options = exports.mergeDefined({
      stickyHeaders: true,
      topLeftCellRender: void 0,
      // XXX Breaking: Renderer
      cellRender: function(data, element, isHead, column) {
        return select(element).text(data);
      },
      useResponsive: true,
      data: void 0,
      fullWidth: void 0,
      highlightOnHover: true
    }, options);
    this._ = {};
    this.selection = select(this.selector).classed('hx-pivot-table', true).api('pivot-table', this).api(this);
    this.table = this.selection.append('table').class('hx-table').classed('hx-table-no-hover', !this.options.highlightOnHover);
    this.tableHead = this.table.append('thead');
    this.tableBody = this.table.append('tbody');
    // Create the re-usable views
    (assign = createTableView(this, this.tableHead, this.tableBody), this.tableHeadView = assign[0], this.tableBodyView = assign[1]);
    if (this.options.data != null) {
      this.data(this.options.data);
    }
  }

  if ( EventEmitter ) PivotTable.__proto__ = EventEmitter;
  PivotTable.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  PivotTable.prototype.constructor = PivotTable;

  PivotTable.prototype.data = function data (data$1) {
    var _, bodyData, clonedData, leftData, ref, ref1, ref2, topData;
    if (data$1 != null) {
      _ = this._;
      _.data = data$1;
      _.leftShifted = false;
      clonedData = exports.clone(data$1);
      topData = ((ref = clonedData.topHead) != null ? ref.length : void 0) > 0 ? clonedData.topHead : [];
      leftData = ((ref1 = clonedData.leftHead) != null ? ref1.length : void 0) > 0 ? clonedData.leftHead : [];
      bodyData = ((ref2 = clonedData.body) != null ? ref2.length : void 0) > 0 ? clonedData.body : [];
      if (topData.length > 0 && bodyData.length > 0) {
        if (topData.length !== bodyData[0].length) {
          logger.warn('hx.PivotTable - ' + this.selector, 'The number of columns in the dataset is not equal to the number of headers provided in data.topHead');
        }
      }
      if (leftData.length > 0) {
        if (leftData.length !== bodyData.length) {
          logger.warn('hx.PivotTable - ' + this.selector, 'The number of rows in the dataset is not equal to the number of headers provided in data.leftHead');
        }
        bodyData = bodyData.map(function(e, i) {
          e.unshift(leftData[i]);
          return e;
        });
        _.leftShifted = true;
      }
      if (topData.length > 0 && _.leftShifted) {
        if (topData != null) {
          topData.unshift(this.options.topLeftCellRender || void 0);
        }
      }
      if ((topData != null ? topData.length : void 0) > 0) {
        this.tableHeadView.apply([topData]);
      }
      this.tableBodyView.apply(bodyData);
      this.table.classed('hx-table-full', false);
      if (this.options.stickyHeaders) {
        if (!this.stickyTableHeaders) {
          this.stickyTableHeaders = new exports.StickyTableHeaders(this.selector, {
            stickTableHead: topData.length > 0,
            stickFirstColumn: leftData.length > 0,
            useResponsive: this.options.useResponsive,
            fullWidth: this.options.fullWidth
          });
        } else {
          this.stickyTableHeaders.render();
        }
      } else if (this.options.fullWidth) {
        this.table.classed('hx-table-full', this.options.fullWidth);
      }
      return this;
    } else {
      return this._.data;
    }
  };

  return PivotTable;
}(EventEmitter));

exports.pivotTable = function(options) {
  var selection;
  selection = div();
  new exports.PivotTable(selection, options);
  return selection;
};

var setupInput$1, setupTimepicker, updateTimePicker;

setupTimepicker = function(timepicker) {
  var screenTime;
  screenTime = timepicker.getScreenTime().split(':');
  timepicker.hourPicker.suppressed('change', true);
  timepicker.minutePicker.suppressed('change', true);
  timepicker.secondPicker.suppressed('change', true);
  timepicker.hourPicker.value(timepicker.hour(), screenTime[0]);
  timepicker.minutePicker.value(timepicker.minute(), screenTime[1]);
  timepicker.secondPicker.value(timepicker.second(), screenTime[2]);
  timepicker.hourPicker.suppressed('change', false);
  timepicker.minutePicker.suppressed('change', false);
  return timepicker.secondPicker.suppressed('change', false);
};

setupInput$1 = function(timepicker) {
  timepicker.input.classed('hx-short-time', !timepicker.options.showSeconds);
  return timepicker.input.value(timepicker.getScreenTime(timepicker.options.showSeconds));
};

updateTimePicker = function(timepicker, suppress) {
  var _;
  if (!timepicker.preventFeedback) {
    _ = timepicker._;
    timepicker.preventFeedback = true;
    timepicker.input.classed('hx-time-error', false);
    setupInput$1(timepicker);
    if (!suppress) {
      timepicker.emit('change', {
        type: _.userEvent ? 'user' : 'api'
      });
    }
    _.userEvent = false;
    timepicker.preventFeedback = false;
    return setupTimepicker(timepicker);
  }
};

exports.TimePicker = /*@__PURE__*/(function (EventEmitter) {
  function TimePicker(selector, options) {
    var this$1 = this;

    var _, hourNode, icon, inputContainer, minuteNode, second, setupDropdown, timeout;
    EventEmitter.call(this);
    this.selector = selector;
    this.options = exports.merge({
      date: void 0,
      showSeconds: false,
      buttonClass: 'hx-btn-outline',
      disabled: false
    }, options);
    _ = this._ = {
      disabled: this.options.disabled
    };
    this.localizer = preferences._.useIntl ? new IntlDateTimeLocalizer() : dateTimeLocalizer();
    this.localizer.on('localechange', 'hx.time-picker', function () {
      return updateTimePicker(this$1, true);
    });
    this.localizer.on('timezonechange', 'hx.time-picker', function () {
      return updateTimePicker(this$1, true);
    });
    _.selectedDate = new Date(this.options.date || Date.now());
    _.selectedDate.setMilliseconds(0);
    if (!this.showSeconds) {
      _.selectedDate.setSeconds(0);
    }
    // set up everything that is needed to turn the div into a calendar input
    this.selection = select(this.selector).classed('hx-time-picker', true).api('time-picker', this).api(this);
    // input text box + icon
    inputContainer = this.selection.append('div').class('hx-time-input-container');
    icon = inputContainer.append('i').class('hx-icon hx-icon-clock-o');
    this.input = inputContainer.append('input').class('hx-time-input');
    timeout = void 0;
    if (exports.supports('date') && exports.supports('touch')) {
      // disable text input for touch devices as it conflicts with the dropdown
      this.input.attr('readonly', true);
      this.input.on('click', 'hx.time-picker', function(event) {
        return event.preventDefault();
      });
    } else {
      this.input.on('input', 'hx.time-picker', function (event) {
        clearTimeout(timeout);
        return timeout = setTimeout(function () {
          var time;
          time = event.target.value.split(':');
          if (time[2] == null) {
            time[2] = 0;
          }
          if (this$1.localizer.checkTime(time)) {
            this$1.hour(time[0]);
            this$1.minute(time[1]);
            return this$1.second(time[2] || 0);
          } else {
            return this$1.input.classed('hx-time-error', true);
          }
        }, 200);
      });
    }
    setupInput$1(this);
    // set up datepicker nodes for attaching to dropdown
    hourNode = div().node();
    minuteNode = div().node();
    second = div().node();
    this.hourPicker = new NumberPicker(hourNode, {
      buttonClass: this.options.buttonClass
    }).on('change', 'hx.time-picker', function (e) {
      _.userEvent = true;
      return this$1.hour(e.value);
    });
    this.hourPicker.selectInput.attr('tabindex', 1).attr('maxlength', '2');
    this.minutePicker = new NumberPicker(minuteNode, {
      buttonClass: this.options.buttonClass
    }).on('change', 'hx.time-picker', function (e) {
      _.userEvent = true;
      return this$1.minute(e.value);
    });
    this.minutePicker.selectInput.attr('tabindex', 2).attr('maxlength', '2');
    this.secondPicker = new NumberPicker(second, {
      buttonClass: this.options.buttonClass
    }).on('change', 'hx.time-picker', function (e) {
      _.userEvent = true;
      return this$1.second(e.value);
    });
    this.secondPicker.selectInput.attr('tabindex', 3).attr('maxlength', '2');
    // XXX Breaking: Renderer
    setupDropdown = function (elem) {
      var selection;
      if (!_.disabled) {
        if (this$1.input.attr('disabled') === void 0) {
          selection = div().add(hourNode).add(minuteNode);
          if (this$1.options.showSeconds) {
            selection.add(second);
          }
          setupTimepicker(this$1);
          return select(elem).add(selection);
        } else {
          return this$1.dropdown.hide();
        }
      }
    };
    this.dropdown = new Dropdown(this.selector, setupDropdown, {
      matchWidth: false,
      ddClass: 'hx-time-picker-dropdown'
    });
    // showstart etc. don't make sense here as we don't care about the animations
    this.dropdown.on('hidestart', function () {
      return this$1.emit('hide');
    });
    this.dropdown.on('showstart', function () {
      return this$1.emit('show');
    });
    if (_.disabled) {
      this.disabled(_.disabled);
    }
  }

  if ( EventEmitter ) TimePicker.__proto__ = EventEmitter;
  TimePicker.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  TimePicker.prototype.constructor = TimePicker;

  TimePicker.prototype.date = function date (date$1, retainTime) {
    var _;
    _ = this._;
    if (arguments.length > 0 && (date$1 != null)) {
      date$1 = new Date(date$1.getTime());
      if (retainTime) {
        date$1.setHours(this.hour(), this.minute(), this.second(), 0);
      }
      _.selectedDate = date$1;
      updateTimePicker(this);
      return this;
    } else {
      return new Date(_.selectedDate.getTime());
    }
  };

  TimePicker.prototype.hour = function hour (hour$1) {
    var _;
    _ = this._;
    if (arguments.length > 0 && (hour$1 != null)) {
      _.selectedDate.setHours(hour$1);
      updateTimePicker(this);
      return this;
    } else {
      return _.selectedDate.getHours();
    }
  };

  TimePicker.prototype.minute = function minute (minute$1) {
    var _;
    _ = this._;
    if (arguments.length > 0 && (minute$1 != null)) {
      _.selectedDate.setMinutes(minute$1);
      updateTimePicker(this);
      return this;
    } else {
      return _.selectedDate.getMinutes();
    }
  };

  TimePicker.prototype.second = function second (second$1) {
    var _;
    _ = this._;
    if (arguments.length > 0 && (second$1 != null)) {
      _.selectedDate.setSeconds(second$1);
      updateTimePicker(this);
      return this;
    } else {
      return _.selectedDate.getSeconds();
    }
  };

  TimePicker.prototype.getScreenTime = function getScreenTime () {
    return this.localizer.time(this.date(), this.options.showSeconds);
  };

  TimePicker.prototype.locale = function locale (locale$1) {
    if (arguments.length > 0) {
      this.localizer.locale(locale$1);
      return this;
    } else {
      return this.localizer.locale();
    }
  };

  TimePicker.prototype.timezone = function timezone (timezone$1) {
    if (arguments.length > 0) {
      this.localizer.timezone(timezone$1);
      return this;
    } else {
      return this.localizer.timezone();
    }
  };

  TimePicker.prototype.disabled = function disabled (disable) {
    var _, val;
    _ = this._;
    if (disable != null) {
      if ((this.dropdown != null) && this.dropdown.isOpen()) {
        this.dropdown.hide();
      }
      _.disabled = disable;
      val = disable ? '' : void 0;
      this.input.attr('disabled', val);
      return this;
    } else {
      return !!_.disabled;
    }
  };

  return TimePicker;
}(EventEmitter));

exports.timePicker = function(options) {
  var selection;
  selection = div();
  new exports.TimePicker(selection, options);
  return selection;
};

var onTabSelected;

onTabSelected = function(tabs, sel, idx, cause) {
  var context, item, tabToSelect, tabToSelectSelector, tabsContent;
  tabs.selected = idx;
  tabs.selection.selectAll('.hx-tab').classed('hx-tab-active', false);
  sel.classed('hx-tab-active', true);
  if (!tabs.selection.classed('hx-flag-tabs')) {
    context = palette$1.context(sel);
    tabsContent = tabs.selection.select('.hx-tabs-content');
    palette$1.borderContext(tabsContent, context);
  }
  tabs.selection.selectAll('.hx-tab-content').classed('hx-tab-content-hidden', true);
  item = tabs.items()[idx];
  if (item != null) {
    tabsContent.clear();
    // XXX Breaking: Renderer
    tabs._.options.contentRenderer(tabsContent.node(), item.content);
  } else {
    tabToSelectSelector = '#' + sel.attr('data-content');
    tabToSelect = tabs.selection.select(tabToSelectSelector);
    tabToSelect.classed('hx-tab-content-hidden', false);
  }
  return tabs.emit('change', {
    id: idx,
    value: idx,
    cause: cause
  });
};

exports.Tabs = /*@__PURE__*/(function (EventEmitter) {
  function Tabs(selector, opts) {
    var defaultRenderer, options, self, tabsContent;
    EventEmitter.call(this);
    this.selector = selector;
    // XXX Breaking: Renderer
    defaultRenderer = function(node, value) {
      return select(node).text(value);
    };
    options = exports.merge({
      items: [],
      titleRenderer: defaultRenderer,
      contentRenderer: defaultRenderer
    }, opts);
    this._ = {};
    this._.options = options;
    // XXX: Renamed for consistency - realised we now have selector,
    // selection, select and selected as properties of hx.Tabs
    // Need to standardise naming here?
    this.selection = select(this.selector).classed('hx-tabs', true).api('tabs', this).api(this);
    tabsContent = this.selection.select('.hx-tabs-content');
    if (tabsContent.empty()) {
      tabsContent = this.selection.append('div').class('hx-tabs-content');
    }
    // XXX: Should this be `selectedTab`
    this.selected = -1;
    self = this;
    // register callbacks for when the tabs are clicked
    if (options.items.length) {
      this.items(options.items);
    } else {
      this.selection.selectAll('.hx-tab').forEach(function(sel, idx) {
        return sel.on('click', 'hx.tabs', function() {
          return onTabSelected(self, sel, idx, 'user');
        });
      });
    }
    // make the first tab active
    this.select(0);
  }

  if ( EventEmitter ) Tabs.__proto__ = EventEmitter;
  Tabs.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Tabs.prototype.constructor = Tabs;

  Tabs.prototype.items = function items (newItems) {
    var this$1 = this;

    var tabsContent, titleBarsToAdd;
    if (arguments.length) {
      if (newItems.length === 0) {
        logger.warn('hx.Tabs::items', 'Setting items to empty array');
      } else {
        tabsContent = this.selection.select('.hx-tabs-content');
        this.selection.selectAll('.hx-tab').remove();
        tabsContent.clear();
        titleBarsToAdd = newItems.map(function (ref, idx) {
          var title = ref.title;
          var context = ref.context;
          var content = ref.content;

          var tab;
          tab = detached('div').class('hx-tab');
          // XXX Breaking: Renderer
          this$1._.options.titleRenderer(tab.node(), title);
          palette$1.context(tab.node(), context);
          tab.on('click', 'hx.tabs', function () {
            return onTabSelected(this$1, tab, idx, 'user');
          });
          return tab;
        });
        tabsContent.insertBefore(titleBarsToAdd);
        this.select(0, true);
      }
      this._.options.items = newItems;
      return this;
    } else {
      return this._.options.items;
    }
  };

  Tabs.prototype.value = function value (newValue) {
    if (arguments.length) {
      return this.select(newValue, false);
    } else {
      return this.selected;
    }
  };

  Tabs.prototype.select = function select$1 (idx, force) {
    var tab;
    if (this.selected !== idx || force) {
      tab = select(this.selection.selectAll('.hx-tab').node(idx));
      return onTabSelected(this, tab, idx, 'api');
    }
  };

  return Tabs;
}(EventEmitter));

exports.tabs = function(opts) {
  var selection;
  selection = detached('div');
  new exports.Tabs(selection, opts);
  return selection;
};

var createChildren, createNodeView, createTreeNode, format$1, formatChildren, formatIcon, recurseUpTree;

createNodeView = function(node, renderer, lazy) {
  return node.view('.hx-tree-node').enter(function(d) {
    return this.append(createTreeNode(d, renderer, lazy)).node();
  });
};

createChildren = function(children, renderer, lazy) {
  return children.map(function(child) {
    return createTreeNode(child, renderer, lazy);
  });
};

createTreeNode = function(data, renderer, lazy) {
  var childContainer, childView, nodeContent, treeNode;
  treeNode = div('hx-tree-node');
  nodeContent = div('hx-tree-node-content');
  renderer(nodeContent.node(), data);
  if ((data.children != null) && data.children.length > 0) {
    childContainer = div('hx-tree-node-children').style('display', 'none');
    if (lazy) {
      childView = createNodeView(childContainer, renderer, lazy);
      treeNode.api({
        renderChildren: function() {
          return childView.apply(data.children);
        }
      });
    } else {
      childContainer.append(createChildren(data.children, renderer, lazy));
    }
    return treeNode.add(div('hx-tree-node-parent').add(nodeContent)).add(childContainer);
  } else {
    return treeNode.add(nodeContent);
  }
};

formatChildren = function(tree, children, animate) {
  return children.forEach(function (d) {
    return format$1(tree, d.node(), animate);
  });
};

formatIcon = function (node, iconElement, animate) {
  var children, open;
  children = select(node).shallowSelect('.hx-tree-node-children');
  if (!children.selectAll('.hx-tree-node').empty()) {
    open = children.style('display') === 'block';
    select(node).classed('hx-tree-node-open', open);
    if (animate) {
      return select(iconElement).select('i').morph().then(open ? 'rotate-90' : 'rotate-0').go(true);
    }
  }
};

format$1 = function(tree, element, animate) {
  var childTreeNodes, elem, innerElem, newElem, openAllOrToggle, parent, renderLazyChildren, selection, showDisabled, siblings, siblingsHaveChildren, siblingsHaveLazyChildren, toggle, treeNode, treeNodeApi;
  treeNode = select(element);
  treeNodeApi = treeNode.api();
  renderLazyChildren = function(rootNode, recursive) {
    if ((rootNode.api() != null) && rootNode.selectAll('.hx-tree-node').empty()) {
      rootNode.api().renderChildren();
      formatChildren(tree, rootNode.selectAll('.hx-tree-node'), animate);
    }
    if (recursive) {
      return rootNode.selectAll('.hx-tree-node').map(function(sel) {
        return renderLazyChildren(sel, recursive);
      });
    }
  };
  toggle = function (iconElement) {
    var display, selection;
    selection = treeNode.select('.hx-tree-node-children');
    renderLazyChildren(treeNode);
    display = selection.style('display') === 'none' ? 'block' : 'none';
    selection.style('display', display);
    return formatIcon(element, iconElement, tree.options.animate);
  };
  // tries to open all children of the target toggle if it is already open, or if the node is closed, it simply opens it
  openAllOrToggle = function (iconElement) {
    renderLazyChildren(treeNode, true);
    treeNode.selectAll('.hx-tree-node-children').style('display', 'block');
    if (treeNode.shallowSelect('.hx-tree-node-children').style('display') === 'block') {
      return formatChildren(tree, treeNode.selectAll('.hx-tree-node'), animate);
    } else {
      return toggle(iconElement);
    }
  };
  siblings = select(element.parentNode).shallowSelectAll('.hx-tree-node');
  siblingsHaveChildren = siblings.shallowSelect('.hx-tree-node-children').shallowSelectAll('.hx-tree-node').size() > 0;
  siblingsHaveLazyChildren = siblingsHaveChildren || siblings.nodes.map(function(node) {
    return select(node).api() != null;
  }).some(exports.identity);
  showDisabled = tree.options.hideDisabledButtons ? false : siblingsHaveLazyChildren;
  childTreeNodes = treeNode.select('.hx-tree-node-children');
  if ((treeNodeApi != null) || childTreeNodes.selectAll('.hx-tree-node').size() > 0 || showDisabled) {
    innerElem = select(element).select('.hx-tree-node-parent');
    if (innerElem.size() > 0) {
      return innerElem.view('.hx-tree-node-parent-icon').enter(function() {
        var selection;
        selection = div('hx-tree-node-parent-icon').add(i('hx-icon hx-icon-chevron-right hx-tree-node-state-icon'));
        return this.append(selection).node();
      }).update(function(d, node) {
        var cancelDouble, isDouble;
        isDouble = false;
        cancelDouble = function() {
          return isDouble = false;
        };
        this.on('click', function() {
          if (isDouble) {
            openAllOrToggle(node);
          } else {
            toggle(node);
          }
          setTimeout(cancelDouble, 250);
          return isDouble = true;
        });
        return formatIcon(node.parentNode.parentNode, node, animate);
      }).apply(this);
    } else {
      parent = select(element);
      elem = parent.select('.hx-tree-node-content').node();
      newElem = parent.append('div').attr('class', 'hx-tree-node-parent').node();
      newElem.appendChild(elem);
      selection = select(newElem).append('div');
      return selection.attr('class', 'hx-tree-node-parent-icon hx-tree-node-parent-icon-disabled').append('i').attr('class', 'hx-icon hx-icon-chevron-right');
    }
  }
};

recurseUpTree = function(node) {
  var closestParent, nodeSel;
  nodeSel = select(node);
  if (nodeSel.classed('hx-tree-node')) {
    // jump an extra step as we know the tree structure means the parent will
    // be another tree node
    node = node.parentNode;
    nodeSel.select(':scope > .hx-tree-node-children').style('display', 'block');
  }
  closestParent = node.parentNode;
  if ((closestParent != null) && this.selection.node().contains(node)) {
    return recurseUpTree.call(this, closestParent);
  }
};

exports.Tree = /*@__PURE__*/(function () {
  function Tree(selector1, options) {
    this.selector = selector1;
    this.options = exports.mergeDefined({
      hideDisabledButtons: false,
      animate: true,
      // XXX: Security - innerHTML
      // XXX Breaking: Renderer
      renderer: function(elem, data) {
        return select(elem).node().innerHTML = data.name || data;
      },
      items: [],
      lazy: false
    }, options);
    this.selection = select(this.selector).classed('hx-tree hx-openable', true).api('tree', this).api(this);
    if ((this.options.items != null) && this.options.items.length > 0) {
      this.items(this.options.items);
    }
    this.refresh(false);
  }

  Tree.prototype.refresh = function refresh (animate) {
    animate = animate != null ? animate : this.options.animate;
    formatChildren(this, this.selection.selectAll('.hx-tree-node'), animate);
    return this;
  };

  // useful for contructing a tree from something like json - lets you define the content of the node from the json description of that node
  // only requires you to define how to create the content for one node, and it will be called multiple times to construct the whole tree.
  // this means that the renderer you supply must be capable of returning the content for any of the nodes in your tree.
  Tree.prototype.renderer = function renderer (render) {
    if (render != null) {
      this.options.renderer = render;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  Tree.prototype.items = function items (data) {
    if (data != null) {
      this.options.items = data;
      this.selection.clear();
      createNodeView(this.selection, this.renderer(), this.options.lazy).apply(data);
      this.refresh(false);
      return this;
    } else {
      return this.options.items;
    }
  };

  Tree.prototype.show = function show (animate, node) {
    animate = animate != null ? animate : this.options.animate;
    if (node != null) {
      recurseUpTree.call(this, node);
    } else {
      this.selection.selectAll('.hx-tree-node-children').style('display', 'block');
    }
    this.selection.classed('hx-opened', true);
    this.refresh(animate);
    return this;
  };

  Tree.prototype.hide = function hide (animate, node) {
    var childArr, nodeSel;
    if (node != null) {
      nodeSel = select(node);
      if (!nodeSel.classed('hx-tree-node')) {
        nodeSel = nodeSel.closest('.hx-tree-node');
      }
      nodeSel.select(':scope > .hx-tree-node-children').style('display', 'none');
      childArr = this.selection.selectAll('.hx-tree-node-children').style('display');
      if (!childArr.some(function(d) {
        return d === 'block';
      })) {
        this.selection.classed('hx-opened', false);
      }
    } else {
      this.selection.classed('hx-opened', false);
      this.selection.selectAll('.hx-tree-node-children').style('display', 'none');
    }
    animate = animate != null ? animate : this.options.animate;
    this.refresh(animate);
    return this;
  };

  return Tree;
}());

exports.tree = function(options) {
  var selection;
  selection = div();
  new exports.Tree(selection.node(), options);
  return selection;
};

// initialise all trees that match the css selector and return the result as an array of Trees
exports.initializeTrees = function(selector) {
  return selectAll(selector).nodes.map(function(d) {
    return new exports.Tree(d);
  });
};

var deprecatedWarning$1, hx_xhr, parsers, performRequest, respondToRequest, sendRequest, standardRequest;

deprecatedWarning$1 = function (fn) {
  return logger.deprecated(fn, 'fetch (native browser function) - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API');
};

respondToRequest = function(request, url, data, callback, options, index) {
  var e, result, source, status;
  status = request.status;
  source = data != null ? {
    url: url,
    data: data
  } : url;
  if (status >= 200 && status < 300 || status === 304) {
    try {
      result = options.formatter(request);
    } catch (error1) {
      e = error1;
      callback(e, void 0, source, index);
      return;
    }
    callback(void 0, result, source, index);
  } else {
    callback(request, void 0, source, index);
  }
};

sendRequest = function(request, url, data, options) {
  var header, ref, sendData, value;
  request.open(options.requestType, url, true);
  ref = options.headers;
  for (header in ref) {
    value = ref[header];
    request.setRequestHeader(header, value);
  }
  if (options.responseType) {
    request.responseType = options.responseType;
  }
  if (options.contentType) {
    request.overrideMimeType(options.contentType);
  }
  sendData = (data != null) && typeof data !== 'string' ? JSON.stringify(data) : data;
  return request.send(sendData);
};

performRequest = function(url, data, callback, options, index) {
  if ( data === void 0 ) data = null;
  if ( options === void 0 ) options = {};

  var base, base1, defaults, request, respond;
  defaults = {
    requestType: 'GET',
    formatter: exports.identity,
    headers: {}
  };
  options = exports.merge(defaults, options);
  if (options.contentType) {
    if ((base = options.headers)['Content-Type'] == null) {
      base['Content-Type'] = options.contentType;
    }
    if ((base1 = options.headers)['accept'] == null) {
      base1['accept'] = options.contentType + ',*/*';
    }
  }
  if (options.requestType === 'GET' && data) {
    options.requestType = 'POST';
  }
  request = new XMLHttpRequest();
  respond = function() {
    return respondToRequest(request, url, data, callback, options, index);
  };
  request.onload = request.onerror = respond;
  return sendRequest(request, url, data, options);
};

hx_xhr = function(urlType, urls, data, callback, options) {
  var buildResultArr, i, j, len, resultArr, results, url;
  if (urlType === 'array') {
    resultArr = [];
    buildResultArr = function(error, result, source, index) {
      var resultData, resultSource;
      resultArr[index] = {
        data: result,
        source: source
      };
      callback(error, result, source, index);
      if (resultArr.filter(function(d) {
        return d !== void 0;
      }).length === urls.length) {
        resultSource = resultArr.map(function(d) {
          return d.source;
        });
        resultData = resultArr.map(function(d) {
          return d.data;
        });
        return callback(error, resultData, resultSource, -1);
      }
    };
    results = [];
    for (i = j = 0, len = urls.length; j < len; i = ++j) {
      url = urls[i];
      if (exports.isObject(url)) {
        data = url.data || data;
        url = url.url;
      }
      results.push(performRequest(url, data, buildResultArr, options, i));
    }
    return results;
  } else {
    if (urlType === 'object') {
      data = urls.data || data;
      url = urls.url;
    } else {
      url = urls;
    }
    return performRequest(url, data, callback, options);
  }
};

standardRequest = function() { // url, callback, options || url, data, callback, options
  var callback, data, options, urlType, urls;
  urls = arguments[0];
  urlType = (function() {
    switch (false) {
      case !exports.isArray(urls):
        return 'array';
      case !exports.isObject(urls):
        return 'object';
      case !exports.isString(urls):
        return 'string';
    }
  })();
  if (!urlType || urlType === 'array' && urls.length === 0) {
    console.error('Incorrect URL passed into request: ', urls);
    return;
  }
  if (exports.isFunction(arguments[1])) {
    callback = arguments[1];
    options = arguments[2];
  } else {
    data = arguments[1];
    callback = arguments[2];
    options = arguments[3];
  }
  return hx_xhr(urlType, urls, data || null, callback, options);
};

var request = function() {
  deprecatedWarning$1('request');
  return standardRequest.apply(null, arguments);
};

parsers = {
  'application/json': function(text) {
    if (text) {
      return JSON.parse(text);
    }
  },
  'text/html': function(text) {
    return parseHTML.call(request, text);
  },
  'text/plain': function(text) {
    return text;
  }
};

exports.reshapedRequest = function(type) {
  var fn;
  fn = (function() {
    switch (type) {
      case 'application/json':
        return 'hx.json';
      case 'text/html':
        return 'hx.html';
      case 'text/plain':
        return 'hx.text';
      case void 0:
        return 'hx.reshapedRequest';
    }
  })();
  return function(urls, data, callback, options) {
    var assign;

    var defaults;
    deprecatedWarning$1(fn);
    if (exports.isFunction(data)) {
      (assign = [void 0, data, callback], data = assign[0], callback = assign[1], options = assign[2]);
    }
    defaults = type ? {
      contentType: type,
      formatter: function(xhr) {
        return parsers[type](xhr.responseText);
      }
    } : {
      formatter: function(xhr) {
        var assign;

        var mimeType, parser;
        (assign = xhr.getResponseHeader('content-type').split(';'), mimeType = assign[0]);
        parser = parsers[mimeType];
        if (parser) {
          return parser(xhr.responseText);
        } else {
          logger.warn(("Unknown parser for mime type " + mimeType + ", carrying on anyway"));
          return xhr;
        }
      }
    };
    options = exports.merge(defaults, options);
    return standardRequest(urls, data, callback, options);
  };
};

var json = exports.reshapedRequest('application/json');

var html = exports.reshapedRequest('text/html');

var text = exports.reshapedRequest('text/plain');

exports.reshapedRequest = exports.reshapedRequest();

/*
  Feeds

  A feed should be an object with the following functions:

  {
    headers: (cb) ->        # returns a list of header objects ({name, id})
    totalCount: (cb) ->     # returns the total number of rows in the data set
    rows: (range, cb) ->    # returns the row data for the range object specified (range = { start, end, filter, sort }) along with the filtered count
    rowsForIds: (ids, lookupRow, cb) ->  # returns the rows for the ids supplied
  }

  There are predefined feeds for objects and urls.

*/
var advancedSearchCriteriaValidate, capitalize, collapseBreakPoint, columnOptionLookup, createAdvancedSearchView, createPageSizeBlock, createPaginationBlock, defaultTermLookup, fullWidthColSpan, getFiltered, getRowSearchTerm, spacer, splitArray, stripLeadingAndTrailingWhitespaceRegex, toCriteriaItems, urlFeed, whitespaceSplitRegex,
  splice = [].splice;

exports.userFacingText({
  dataTable: {
    addFilter: 'Add Filter',
    advancedSearch: 'Advanced Search',
    and: 'and',
    anyColumn: 'Any column',
    clearFilters: 'Clear Filters',
    clearSelection: 'clear selection',
    loading: 'Loading',
    noData: 'No Data',
    noSort: 'No Sort',
    or: 'or',
    rowsPerPage: 'Rows Per Page',
    search: 'Search',
    selectedRows: '$selected of $total selected.',
    sortBy: 'Sort By',
    contains: 'contains',
    excludes: 'does not contain',
    startsWith: 'starts with',
    fuzzy: 'fuzzy matches',
    regex: 'matches regex',
    exact: 'is exactly',
    greater: 'is greater than',
    less: 'is less than'
  }
});

fullWidthColSpan = 999; // the colspan used to make a cell display as an entire row

collapseBreakPoint = 480;

columnOptionLookup = function(options, name, id) {
  if (options.columns !== void 0 && options.columns[id] !== void 0 && options.columns[id][name] !== void 0) {
    return options.columns[id][name];
  } else {
    return options[name];
  }
};

toCriteriaItems = function(list) {
  return exports.unique(list).map(function(item) {
    return {
      value: item,
      text: exports.userFacingText('dataTable', item)
    };
  });
};

advancedSearchCriteriaValidate = function(value) {
  var allowedTypes, invalidTypes;
  allowedTypes = exports.filterTypes();
  if ((exports.isArray(value) && value.every(function(c) {
    return ~allowedTypes.indexOf(c);
  })) || value === void 0) {
    return value || [];
  } else if (exports.isArray(value)) {
    invalidTypes = value.filter(function(c) {
      return !~allowedTypes.indexOf(c);
    });
    logger.warn('Invalid Filter Criteria Specified:', invalidTypes, '\nPlease select a value from filterStringTypes()', allowedTypes);
    return [];
  } else {
    logger.warn('Expected an array of filter criteria but was passed:', value);
    return [];
  }
};

splitArray = function(array, index) {
  var left, right;
  left = index === 0 ? [] : array.slice(0, index);
  right = index === array.length - 1 ? [] : array.slice(index + 1, array.length);
  return [left, array[index], right];
};

// pagination block (the page selector and the rows per page selector)
createPaginationBlock = function(table) {
  var back, container, dtPicker, forward, pickerNode, totalRows;
  container = div('hx-data-table-paginator');
  pickerNode = container.append('button').class('hx-data-table-paginator-picker hx-btn hx-btn-invisible').node();
  dtPicker = new PickerBase(pickerNode, {
    dropdownOptions: {
      align: 'rbrt'
    }
  }).on('change', 'hx.data-table', function (d) {
    if (d.cause === 'user') {
      return table.page(d.value.value, void 0, d.cause);
    }
  });
  totalRows = container.append('span').class('hx-data-table-paginator-total-rows');
  back = container.append('button').class('hx-data-table-paginator-back hx-btn hx-btn-invisible');
  back.append('i').class('hx-icon hx-icon-chevron-left');
  back.on('click', 'hx.data-table', function () {
    if (!back.classed('hx-data-table-btn-disabled')) {
      return table.page(table.page() - 1);
    }
  });
  forward = container.append('button').class('hx-data-table-paginator-forward hx-btn hx-btn-invisible');
  forward.append('i').class('hx-icon hx-icon-chevron-right');
  forward.on('click', 'hx.data-table', function () {
    if (!forward.classed('hx-data-table-btn-disabled')) {
      return table.page(table.page() + 1);
    }
  });
  return [container, dtPicker];
};

// pageSizeOptions select
createPageSizeBlock = function(table, options) {
  var container, dtPicker, node;
  container = div('hx-data-table-page-size');
  container.append('span').text(options.rowsPerPageText + ': ');
  node = container.append('button').class('hx-data-table-page-size-picker hx-btn hx-btn-invisible').node();
  dtPicker = new PickerBase(node, {
    dropdownOptions: {
      align: 'rbrt'
    }
  }).on('change', 'hx.data-table', function(d) {
    if (d.cause === 'user') {
      table.pageSize(d.value.value, void 0, 'user');
      return table.page(1, void 0, 'user');
    }
  });
  return [container, dtPicker];
};

spacer = function() {
  return div('hx-data-table-spacer');
};

createAdvancedSearchView = function(selection, dataTable, options) {
  var advancedSearchGroupEnter, advancedSearchGroupUpdate, advancedSearchRowEnter, advancedSearchRowUpdate;
  // Render individual row
  advancedSearchRowEnter = function(filterGroup, filterGroupIndex) {
    return function(filterRow, index, trueIndex) {
      var anyColumn, columnItems, columnPickerOptions, columnPickerSel, columnRenderer, criteriaAnyPlaceholder, criteriaPickerOptions, criteriaPickerSel, debouncedInput, removeBtn, termInput, typePickerOptions, typePickerSel;
      typePickerOptions = {
        items: [
          {
            text: exports.userFacingText('dataTable',
          'and'),
            value: 'and'
          },
          {
            text: exports.userFacingText('dataTable',
          'or'),
            value: 'or'
          }
        ],
        fullWidth: true
      };
      typePickerSel = pickerBase(typePickerOptions).classed('hx-btn-outline hx-data-table-advanced-search-type hx-section hx-fixed', true);
      typePickerSel.api('picker').on('change', function(data) {
        var assign, assign$1, assign$2, assign$3;

        var currFilter, leftAllButLast, leftFilterGroups, leftFilters, leftLast, newFilters, prevFilters, rightFilterGroups, rightFilters;
        if (data.cause === 'user') {
          prevFilters = dataTable.advancedSearch();
          (assign = splitArray(prevFilters, filterGroupIndex), leftFilterGroups = assign[0], filterGroup = assign[1], rightFilterGroups = assign[2]);
          newFilters = data.value.value === 'or' ? ((assign$1 = splitArray(filterGroup, trueIndex), leftFilters = assign$1[0], currFilter = assign$1[1], rightFilters = assign$1[2], assign$1), leftFilterGroups.concat( [leftFilters], [[currFilter ].concat( rightFilters)], rightFilterGroups)) : (((assign$2 = leftFilterGroups, leftAllButLast = assign$2.slice(0), assign$2), (assign$3 = splice.call(leftAllButLast, -1), leftLast = assign$3[0], assign$3), leftFilterGroups), leftAllButLast.concat( [leftLast.concat( filterGroup)], rightFilterGroups));
          return dataTable.advancedSearch(newFilters);
        }
      });
      anyColumn = {
        text: options.anyColumnText,
        value: 'any',
        anyColumn: true
      };
      columnItems = filterRow.headers.map(function(header) {
        return {
          value: header.id,
          orig: header
        };
      });
      // XXX Breaking: Renderer
      // columnRenderer = (cell) ->
      //   if cell.anyColumn then span().text(cell.text)
      //   else columnOptionLookup(options, 'headerCellRenderer', cell.orig.id)(cell.orig, filterRow.headers)
      columnRenderer = function(element, cell) {
        if (cell.anyColumn) {
          return select(element).text(cell.text);
        } else {
          return columnOptionLookup(options, 'headerCellRenderer', cell.orig.id)(element, cell.orig, filterRow.headers);
        }
      };
      columnPickerOptions = {
        items: [anyColumn ].concat( columnItems),
        renderer: columnRenderer,
        fullWidth: true
      };
      columnPickerSel = pickerBase(columnPickerOptions).classed('hx-btn-outline hx-data-table-advanced-search-column hx-section hx-fixed', true);
      columnPickerSel.api('picker').on('change', function(data) {
        var assign, assign$1;

        var columnCriteria, criteriaItems, currFilter, leftFilterGroups, leftFilters, newFilter, prevFilters, rightFilterGroups, rightFilters;
        if (data.cause === 'user') {
          prevFilters = dataTable.advancedSearch();
          (assign = splitArray(prevFilters, filterGroupIndex), leftFilterGroups = assign[0], filterGroup = assign[1], rightFilterGroups = assign[2]);
          (assign$1 = splitArray(filterGroup, trueIndex), leftFilters = assign$1[0], currFilter = assign$1[1], rightFilters = assign$1[2]);
          newFilter = exports.merge(currFilter, {
            column: data.value.value
          });
          delete newFilter.criteria;
          columnCriteria = columnOptionLookup(options, 'advancedSearchCriteria', data.value.value) || [];
          criteriaItems = ['contains' ].concat( advancedSearchCriteriaValidate(columnCriteria));
          criteriaPickerSel.api('picker').items(toCriteriaItems(criteriaItems));
          return dataTable.advancedSearch(leftFilterGroups.concat( [leftFilters.concat( [newFilter], rightFilters)], rightFilterGroups));
        }
      });
      criteriaPickerOptions = {
        items: toCriteriaItems(['contains' ].concat( advancedSearchCriteriaValidate(options.advancedSearchCriteria))),
        fullWidth: true
      };
      criteriaPickerSel = pickerBase(criteriaPickerOptions).classed('hx-btn-outline hx-data-table-advanced-search-criteria hx-section hx-fixed', true);
      criteriaPickerSel.api('picker').on('change', function(data) {
        var assign, assign$1;

        var currFilter, leftFilterGroups, leftFilters, newFilter, prevFilters, rightFilterGroups, rightFilters;
        if (data.cause === 'user') {
          prevFilters = dataTable.advancedSearch();
          (assign = splitArray(prevFilters, filterGroupIndex), leftFilterGroups = assign[0], filterGroup = assign[1], rightFilterGroups = assign[2]);
          (assign$1 = splitArray(filterGroup, trueIndex), leftFilters = assign$1[0], currFilter = assign$1[1], rightFilters = assign$1[2]);
          newFilter = exports.merge(currFilter, {
            criteria: data.value.value
          });
          return dataTable.advancedSearch(leftFilterGroups.concat( [leftFilters.concat( [newFilter], rightFilters)], rightFilterGroups));
        }
      });
      criteriaAnyPlaceholder = div('hx-data-table-advanced-search-criteria-placeholder hx-text-disabled hx-background-disabled').text(exports.userFacingText('dataTable', 'contains'));
      debouncedInput = exports.debounce(200, function(e) {
        var assign, assign$1;

        var currFilter, leftFilterGroups, leftFilters, newFilter, prevFilters, rightFilterGroups, rightFilters;
        prevFilters = dataTable.advancedSearch();
        (assign = splitArray(prevFilters, filterGroupIndex), leftFilterGroups = assign[0], filterGroup = assign[1], rightFilterGroups = assign[2]);
        (assign$1 = splitArray(filterGroup, trueIndex), leftFilters = assign$1[0], currFilter = assign$1[1], rightFilters = assign$1[2]);
        newFilter = exports.merge(currFilter, {
          term: e.target.value
        });
        return dataTable.advancedSearch(leftFilterGroups.concat( [leftFilters.concat( [newFilter], rightFilters)], rightFilterGroups));
      });
      termInput = detached('input').attr('placeholder', options.advancedSearchPlaceholder).class('hx-data-table-advanced-search-input hx-section').attr('required', 'required').on('input', debouncedInput);
      removeBtn = button('hx-btn hx-negative hx-btn-outline hx-data-table-advanced-search-remove').add(i('hx-icon hx-icon-close')).on('click', function() {
        var assign, assign$1, assign$2, assign$3, assign$4;

        var _, filterToUse, filters, leftFilterGroup, leftFilterGroupLast, leftFilterGroups, leftFilters, newFilters, prevFilters, rightFilterGroups, rightFilters;
        prevFilters = dataTable.advancedSearch();
        (assign = splitArray(prevFilters, filterGroupIndex), leftFilterGroups = assign[0], filterGroup = assign[1], rightFilterGroups = assign[2]);
        (assign$1 = splitArray(filterGroup, trueIndex), leftFilters = assign$1[0], _ = assign$1[1], rightFilters = assign$1[2]);
        newFilters = trueIndex === 0 && filterGroupIndex === 0 ? [rightFilters ].concat( rightFilterGroups) : trueIndex === 0 ? (((assign$2 = leftFilterGroups, leftFilterGroup = assign$2.slice(0), assign$2), (assign$3 = splice.call(leftFilterGroup, -1), leftFilterGroupLast = assign$3[0], assign$3), leftFilterGroups), (assign$4 = filterGroup, _ = assign$4[0], filters = assign$4.slice(1), assign$4), leftFilterGroup.concat( [leftFilterGroupLast.concat( filters)], rightFilterGroups)) : leftFilterGroups.concat( [leftFilters.concat( rightFilters)], rightFilterGroups);
        filterToUse = newFilters.filter(function (group) {
          return group.length;
        });
        return dataTable.advancedSearch(filterToUse.length ? filterToUse : void 0);
      });
      return this.append('div').class('hx-data-table-advanced-search-filter hx-section hx-input-group hx-input-group-full-width').add(typePickerSel).add(columnPickerSel).add(criteriaAnyPlaceholder).add(criteriaPickerSel).add(div('hx-data-table-advanced-search-filter-input-container hx-input-group hx-no-pad hx-no-border').add(termInput).add(removeBtn)).node();
    };
  };
  advancedSearchRowUpdate = function(ref, element, index) {
    var term = ref.term;
    var column = ref.column;
    var criteria = ref.criteria;

    var columnCriteria, criteriaItems, filterRowSel, trueColumn;
    filterRowSel = select(element);
    filterRowSel.select('.hx-data-table-advanced-search-type').api('picker').value(index === 0 ? 'or' : 'and');
    trueColumn = column || 'any';
    filterRowSel.select('.hx-data-table-advanced-search-column').api('picker').value(trueColumn);
    columnCriteria = columnOptionLookup(options, 'advancedSearchCriteria', column) || [];
    criteriaItems = trueColumn === 'any' ? ['contains'] : ['contains' ].concat( advancedSearchCriteriaValidate(columnCriteria));
    filterRowSel.select('.hx-data-table-advanced-search-criteria').style('display', criteriaItems.length === 1 ? 'none' : 'block').api('picker').items(toCriteriaItems(criteriaItems)).value(criteria || 'contains');
    filterRowSel.select('.hx-data-table-advanced-search-criteria-placeholder').style('display', criteriaItems.length === 1 ? 'block' : 'none');
    return filterRowSel.select('.hx-data-table-advanced-search-input').value(term || '');
  };
  // Render grouped filters
  advancedSearchGroupEnter = function(filterGroup, index, trueIndex) {
    var filterGroupSel, filterGroupView;
    filterGroupSel = div('hx-data-table-advanced-search-filter-group');
    filterGroupView = filterGroupSel.view('.hx-data-table-advanced-search-filter').enter(advancedSearchRowEnter(filterGroup, trueIndex)).update(advancedSearchRowUpdate);
    filterGroupSel.api('data-table.group', {filterGroupView: filterGroupView});
    return this.append(filterGroupSel).node();
  };
  advancedSearchGroupUpdate = function(filterGroup, element, index) {
    return select(element).api('data-table.group').filterGroupView.apply(filterGroup);
  };
  return selection.view('.hx-data-table-advanced-search-filter-group').enter(advancedSearchGroupEnter).update(advancedSearchGroupUpdate);
};

exports.DataTable = (function() {
  var columnOnlyOption, columnOption, option;

  var DataTable = /*@__PURE__*/(function (EventEmitter) {
    function DataTable(selector, options) {
      var this$1 = this;
      var assign, assign$1, assign$2, assign$3, assign$4;

      var addFilter, advancedSearch, advancedSearchAddFilterButton, advancedSearchButtons, advancedSearchClearFilterButton, advancedSearchContainer, advancedSearchToggle, advancedSearchToggleButton, advancedSearchView, clearFilters, compactSort, content, controlPanel, controlPanelBottom, controlPanelCompact, controlPanelCompactToggle, controlPanelInner, dtRandomId, filterContainer, filterInput, loadingDiv, onInput, pagePicker, pagePickerBottom, pagePickerCompact, pageSize, pageSizeBottom, pageSizePicker, pageSizePickerBottom, pagination, paginationBottom, paginationCompact, resolvedOptions, selection, sortColPicker, statusBar, statusBarClear, statusBarText;
      EventEmitter.call(this);
      resolvedOptions = exports.merge({
        allowHeaderWrap: false,
        compact: 'auto', // 'auto', true, false
        displayMode: 'paginate', // 'paginate', 'all'
        feed: void 0,
        showSearchAboveTable: false,
        filter: void 0,
        filterEnabled: true,
        showAdvancedSearch: false,
        advancedSearchEnabled: false,
        advancedSearchCriteria: void 0,
        advancedSearch: void 0,
        pageSize: 15,
        pageSizeOptions: void 0, // supply an array of numbers to show the user
        retainHorizontalScrollOnRender: true,
        retainVerticalScrollOnRender: false,
        selectEnabled: false,
        singleSelection: false,
        sort: void 0,
        sortEnabled: true,
        highlightOnHover: true,
        useStickyHeaders: true,
        selectedRows: [],
        expandedRows: [],
        // functions used for getting row state
        rowIDLookup: function(row) {
          return row.id;
        },
        rowEnabledLookup: function(row) {
          return !row.disabled;
        },
        rowSelectableLookup: function(row) {
          return true;
        },
        rowCollapsibleLookup: function(row) {
          return false;
        },
        // functions for rendering
        collapsibleRenderer: void 0,
        // XXX Breaking: Renderer
        // cellRenderer: (cell, row) -> span().text(cell)
        // headerCellRenderer: (cell, headers) -> span().text(cell.name)
        cellRenderer: function(element, cell, row) {
          return select(element).text(cell);
        },
        headerCellRenderer: function(element, cell, headers) {
          return select(element).text(cell.name);
        },
        // per column options (headerCellRenderer, cellRenderer, sortEnabled)
        columns: {},
        clearSelectionText: exports.userFacingText('dataTable', 'clearSelection'),
        loadingText: exports.userFacingText('dataTable', 'loading'),
        noDataMessage: exports.userFacingText('dataTable', 'noData'),
        noSortText: exports.userFacingText('dataTable', 'noSort'),
        rowsPerPageText: exports.userFacingText('dataTable', 'rowsPerPage'),
        searchPlaceholder: exports.userFacingText('dataTable', 'search'),
        selectedRowsText: exports.userFacingText('dataTable', 'selectedRows', true),
        sortByText: exports.userFacingText('dataTable', 'sortBy'),
        addFilterText: exports.userFacingText('dataTable', 'addFilter'),
        clearFiltersText: exports.userFacingText('dataTable', 'clearFilters'),
        anyColumnText: exports.userFacingText('dataTable', 'anyColumn'),
        advancedSearchText: exports.userFacingText('dataTable', 'advancedSearch'),
        advancedSearchPlaceholder: exports.userFacingText('dataTable', 'search')
      }, options);
      resolvedOptions.pageSize = Math.min(resolvedOptions.pageSize, 1000);
      if (resolvedOptions.advancedSearch) {
        resolvedOptions.advancedSearchEnabled = true;
      }
      if (resolvedOptions.advancedSearchEnabled) {
        resolvedOptions.showAdvancedSearch = true;
      }
      selection = select(selector).classed('hx-data-table', true).api('data-table', this).api(this);
      content = div('hx-data-table-content');
      // loading div
      loadingDiv = div('hx-data-table-loading').add(div('hx-data-table-loading-inner').add(div('hx-spinner')).add(span().text(' ' + resolvedOptions.loadingText)));
      statusBar = div('hx-data-table-status-bar');
      statusBarText = span('hx-data-table-status-bar-text');
      statusBarClear = span('hx-data-table-status-bar-clear').text((" (" + (resolvedOptions.clearSelectionText) + ")")).on('click', 'hx.data-table', function () {
        this$1._.selectedRows.clear();
        selection.select('.hx-data-table-content').selectAll('.hx-data-table-row-selected').classed('hx-data-table-row-selected', false);
        this$1.updateSelected();
        return this$1.emit('selectedrowsclear');
      });
      controlPanelCompact = div('hx-data-table-control-panel-compact');
      controlPanelCompactToggle = button('hx-data-table-control-panel-compact-toggle hx-btn hx-btn-invisible').add(i('hx-icon hx-icon-bars')).on('click', function() {
        var toggleElem;
        toggleElem = controlPanel;
        if (toggleElem.classed('hx-data-table-compact-hide')) {
          return toggleElem.classed('hx-data-table-compact-hide', false).style('height', '0px').morph().with('expandv', 150).then(function() {
            return controlPanelCompact.classed('hx-data-table-control-panel-compact-open', true);
          }).go();
        } else {
          return toggleElem.morph().with('collapsev', 50).then(function() {
            toggleElem.classed('hx-data-table-compact-hide', true);
            return controlPanelCompact.classed('hx-data-table-control-panel-compact-open', false);
          }).thenStyle('display', '').go();
        }
      });
      controlPanel = div('hx-data-table-control-panel hx-data-table-compact-hide');
      controlPanelInner = div('hx-data-table-control-panel-inner');
      // compact sort - always on the page, only visible in compact mode (so we can just change the class and everything will work)
      compactSort = div('hx-data-table-sort').classed('hx-data-table-sort-visible', resolvedOptions.sortEnabled).add(span().text(resolvedOptions.sortByText + ': '));
      sortColPicker = new PickerBase(compactSort.append('button').class('hx-btn hx-btn-invisible').node());
      sortColPicker.on('change', 'hx.data-table', function (d) {
        if (d.cause === 'user') {
          return this$1.sort({
            column: sortColPicker.value().column,
            direction: sortColPicker.value().direction
          });
        }
      });
      filterContainer = div('hx-data-table-filter-container');
      onInput = exports.debounce(200, function () {
        return this$1.filter(filterInput.value(), void 0, 'user');
      });
      filterInput = detached('input').class('hx-data-table-filter').attr('placeholder', resolvedOptions.searchPlaceholder).classed('hx-data-table-filter-visible', resolvedOptions.filterEnabled).on('input', 'hx.data-table', onInput);
      advancedSearchContainer = div('hx-data-table-advanced-search-container');
      advancedSearchToggle = button('hx-data-table-advanced-search-toggle hx-btn hx-btn-invisible').text(resolvedOptions.advancedSearchText);
      advancedSearchToggleButton = new exports.Toggle(advancedSearchToggle.node());
      advancedSearchToggleButton.on('change', function (data) {
        return this$1.advancedSearchEnabled(data);
      });
      advancedSearch = div('hx-data-table-advanced-search');
      advancedSearchView = createAdvancedSearchView(advancedSearch, this, resolvedOptions);
      advancedSearchButtons = div('hx-data-table-advanced-search-buttons');
      addFilter = function () {
        var assign, assign$1;

        var currentFilters, lastFilterGroup, newLastFilterGroup, previousFilterGroups;
        currentFilters = this$1.advancedSearch() || [[]];
        (assign = currentFilters, previousFilterGroups = assign.slice(0), assign), (assign$1 = splice.call(previousFilterGroups, -1), lastFilterGroup = assign$1[0], assign$1);
        newLastFilterGroup = lastFilterGroup.concat( [{
            column: 'any',
            term: ''
          }]
        );
        return this$1.advancedSearch(previousFilterGroups.concat( [newLastFilterGroup]));
      };
      clearFilters = function () {
        return this$1.advancedSearch(void 0);
      };
      advancedSearchAddFilterButton = button('hx-btn hx-positive hx-data-table-advanced-search-add-filter hx-data-table-advanced-search-button hx-btn-outline').add(i('hx-data-table-advanced-search-icon hx-icon hx-icon-plus hx-text-positive')).add(span().text(resolvedOptions.addFilterText)).on('click', addFilter);
      advancedSearchClearFilterButton = button('hx-btn hx-negative hx-data-table-advanced-search-clear-filters hx-data-table-advanced-search-button hx-btn-outline').add(i('hx-data-table-advanced-search-icon hx-icon hx-icon-close hx-text-negative')).add(span().text(resolvedOptions.clearFiltersText)).on('click', clearFilters);
      // We create multiple copies of these to show in different places
      // This makes it easier to change the UI as we can show/hide instead of moving them
      (assign = createPageSizeBlock(this, resolvedOptions), pageSize = assign[0], pageSizePicker = assign[1]);
      (assign$1 = createPageSizeBlock(this, resolvedOptions), pageSizeBottom = assign$1[0], pageSizePickerBottom = assign$1[1]);
      (assign$2 = createPaginationBlock(this), pagination = assign$2[0], pagePicker = assign$2[1]);
      (assign$3 = createPaginationBlock(this), paginationBottom = assign$3[0], pagePickerBottom = assign$3[1]);
      (assign$4 = createPaginationBlock(this), paginationCompact = assign$4[0], pagePickerCompact = assign$4[1]);
      // The main pagination is hidden as the compact control panel contains a version of it
      pagination.classed('hx-data-table-compact-hide', true);
      controlPanelBottom = div('hx-data-table-control-panel-bottom');
      // Create the structure in one place
      // Some entities still make sense to be built individually (e.g. the loading div)
      // Control panel displayed at the top for compact mode
      // Main control panel - contains all the components
      // The advanced search container isn't in the main control panel as it is easier to style outside
      // Bottom control panel - shown in compact mode and when the search is at the top
      // Add the loading div last - helps keep it on top of everything
      selection.add(content).add(statusBar.add(statusBarText).add(statusBarClear)).add(controlPanelCompact.add(paginationCompact).add(spacer()).add(controlPanelCompactToggle)).add(controlPanel.add(controlPanelInner.add(compactSort).add(pagination).add(pageSize).add(spacer()).add(filterContainer.add(advancedSearchToggle).add(filterInput))).add(advancedSearchContainer.add(advancedSearch).add(advancedSearchButtons.add(advancedSearchAddFilterButton).add(advancedSearchClearFilterButton)))).add(controlPanelBottom.add(spacer()).add(pageSizeBottom).add(paginationBottom)).add(loadingDiv);
      // 'private' variables
      this._ = {
        selection: selection,
        options: resolvedOptions,
        page: 1,
        pagePickers: [pagePicker, pagePickerCompact, pagePickerBottom],
        pageSizePickers: [pageSizePicker, pageSizePickerBottom],
        statusBar: statusBar,
        sortColPicker: sortColPicker,
        selectedRows: new Set(resolvedOptions.selectedRows), // holds the ids of the selected rows
        expandedRows: new Set(resolvedOptions.expandedRows),
        renderedCollapsibles: {},
        compactState: (resolvedOptions.compact === 'auto' && selection.width() < collapseBreakPoint) || resolvedOptions.compact === true,
        advancedSearchView: advancedSearchView,
        advancedSearchToggleButton: advancedSearchToggleButton
      };
      // responsive page resize when compact is 'auto'
      selection.on('resize', 'hx.data-table', function () {
        var state;
        selection.selectAll('.hx-data-table-collapsible-content-container').map(function (e) {
          return e.style('max-width', (parseInt(selection.style('width')) - this$1._.collapsibleSizeDiff) + 'px');
        });
        state = (this$1.compact() === 'auto' && selection.width() < collapseBreakPoint) || this$1.compact() === true;
        selection.classed('hx-data-table-compact', state);
        if (this$1._.compactState !== state) {
          this$1._.compactState = state;
          return this$1.emit('compactchange', {
            value: this$1.compact(),
            state: state,
            cause: 'user'
          });
        }
      });
      dtRandomId = exports.randomId();
      // deal with shift being down - prevents the text in the table being selected when shift
      // selecting multiple rows (as it looks bad) but also means that data can be selected if required
      // XXX: make this work better / come up with a better solution
      select('body').on('keydown', 'hx.data-table.shift.' + dtRandomId, function (e) {
        if (e.shiftKey && this$1.selectEnabled()) {
          return selection.classed('hx-data-table-disable-text-selection', true);
        }
      });
      select('body').on('keyup', 'hx.data-table.shift.' + dtRandomId, function (e) {
        if (!e.shiftKey && this$1.selectEnabled()) {
          return selection.classed('hx-data-table-disable-text-selection', false);
        }
      });
    }

    if ( EventEmitter ) DataTable.__proto__ = EventEmitter;
    DataTable.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    DataTable.prototype.constructor = DataTable;

    // Methods for changing the state of the table
    // -------------------------------------------
    DataTable.prototype.page = function page (value, cb, cause) {
      if (arguments.length > 0) {
        this._.page = Math.max(1, value);
        if (this._.numPages != null) {
          this._.page = Math.min(this._.page, this._.numPages);
        }
        this.emit('pagechange', {
          value: this._.page,
          cause: cause || 'api'
        });
        this.render(cb);
        return this;
      } else {
        return this._.page;
      }
    };

    DataTable.prototype.selectedRows = function selectedRows (value, cb) {
      var newSelectedRows;
      if (arguments.length > 0 && !exports.isFunction(value)) {
        // Deal with single select mode when setting the selected rows
        if (this.singleSelection() && exports.isArray(value) && value.length) {
          value = [value[0]];
        }
        this._.selectedRows = new Set(value);
        newSelectedRows = this._.selectedRows.values();
        this.emit('selectedrowschange', {
          value: newSelectedRows,
          cause: 'api'
        });
        this._.userLastSelectedIndex = void 0;
        this.render(cb);
        return this;
      } else {
        return this._.selectedRows.values();
      }
    };

    DataTable.prototype.expandedRows = function expandedRows (value, cb) {
      if (arguments.length > 0 && !exports.isFunction(value)) {
        this._.expandedRows = new Set(value);
        this.render(cb);
        this.emit('expandedrowschange', {
          value: this._.expandedRows.values(),
          cause: 'api'
        });
        return this;
      } else {
        return this._.expandedRows.values();
      }
    };

    DataTable.prototype.rowsForIds = function rowsForIds (ids, cb) {
      if (cb != null) {
        this.feed().rowsForIds(ids, this.rowIDLookup(), cb);
      }
      return this;
    };

    // Methods that perform an action on the table
    // -------------------------------------------
    DataTable.prototype.renderSuppressed = function renderSuppressed (value) {
      if (arguments.length > 0) {
        this._.renderSuppressed = value;
        return this;
      } else {
        return this._.renderSuppressed;
      }
    };

    // redraws the table
    DataTable.prototype.render = function render (cb) {
      var this$1 = this;

      var advancedSearchVisibleAndEnabled, container, feed, filterSel, getColumnOption, headerRow, nextFilterValue, options, prevFilterValue, ref, rowToArray, selection, showCompactControlPanelToggle, table, tbody, thead;
      if (this._.renderSuppressed) {
        return;
      }
      feed = this.feed();
      // check that the feed has been defined - if it hasn't then there is no point in continuing
      if (feed === void 0 || (feed.headers === void 0 || feed.totalCount === void 0 || feed.rows === void 0)) {
        logger.warn('No feed specified when rendering data table');
        return;
      }
      selection = this._.selection;
      options = this._.options;
      // some utility functions
      getColumnOption = function(name, id) {
        return columnOptionLookup(options, name, id);
      };
      rowToArray = function(headers, obj) {
        return headers.map(function(header) {
          return obj.cells[header.id];
        });
      };
      // build the main structure of the table in a detached container
      container = div('hx-data-table-content');
      table = container.append('table').class('hx-data-table-table hx-table').classed('hx-table-no-hover', !options.highlightOnHover);
      thead = table.append('thead').class('hx-data-table-head');
      tbody = table.append('tbody').class('hx-data-table-body');
      headerRow = thead.append('tr').class('hx-data-table-row');
      // make the loading div visible
      selection.select('.hx-data-table-loading').style('display', '');
      advancedSearchVisibleAndEnabled = (!options.filterEnabled || options.showAdvancedSearch) && options.advancedSearchEnabled;
      filterSel = selection.select('.hx-data-table-filter').classed('hx-data-table-filter-visible', options.filterEnabled && !advancedSearchVisibleAndEnabled);
      nextFilterValue = this.filter();
      prevFilterValue = filterSel.value();
      if (nextFilterValue !== prevFilterValue) {
        filterSel.value(nextFilterValue);
      }
      this._.advancedSearchToggleButton.value(options.advancedSearchEnabled);
      selection.select('.hx-data-table-advanced-search-toggle').classed('hx-data-table-advanced-search-visible', options.filterEnabled && options.showAdvancedSearch);
      selection.select('.hx-data-table-advanced-search-container').classed('hx-data-table-advanced-search-visible', advancedSearchVisibleAndEnabled);
      selection.select('.hx-data-table-control-panel').classed('hx-data-table-filter-enabled', options.filterEnabled);
      showCompactControlPanelToggle = options.filterEnabled || options.sortEnabled || options.advancedSearchEnabled || ((ref = options.pageSizeOptions) != null ? ref.length : void 0);
      selection.select('.hx-data-table-control-panel-compact-toggle').classed('hx-data-table-control-panel-compact-toggle-visible', showCompactControlPanelToggle);
      // load in the data needed
      // XXX: how much of this could be split out so it's not re-defined every time render is called?
      feed.headers(function (headers) {
        var currentFilters;
        if (advancedSearchVisibleAndEnabled) {
          currentFilters = this$1.advancedSearch() || [];
          this$1._.advancedSearchView.apply(currentFilters.filter(function(x) {
            return x.length;
          }).map(function(filterGroup) {
            return filterGroup.map(function(filterRow) {
              return exports.merge(filterRow, {headers: headers, getColumnOption: getColumnOption});
            });
          }));
        }
        selection.select('.hx-data-table-sort').classed('hx-data-table-sort-visible', options.sortEnabled || headers.some(function(header) {
          return getColumnOption('sortEnabled', header.id);
        }));
        return feed.totalCount(function (totalCount) {
          var end, range, start;
          if (options.displayMode === 'paginate') {
            start = (this$1.page() - 1) * options.pageSize;
            end = this$1.page() * options.pageSize - 1;
          } else {
            start = void 0;
            end = void 0;
          }
          range = {
            start: start,
            end: end,
            sort: this$1.sort(),
            filter: this$1.filter(),
            advancedSearch: this$1.advancedSearch(),
            useAdvancedSearch: options.showAdvancedSearch && options.advancedSearchEnabled
          };
          return feed.rows(range, function (ref) {
            var rows = ref.rows;
            var filteredCount = ref.filteredCount;

            var buildCollapsible, col, column, count, currentSort, groupedRow, headerCheckBox, headerControlBox, headerGroups, idx, items, j, l, maxHeaderDepth, multiPage, num, numText, pageSizeOptions, parent, prevCol, prevParent, ref1, ref2, ref3, relevantHeaders, row, scrollLeft, scrollTop, selectMulti, selectPageSize, selectRow, sortColumns, stickFirstColumn, stickyOpts, toggleCollapsible, wrapperNode;
            if (options.displayMode === 'paginate') {
              multiPage = false;
              selection.classed('hx-data-table-infinite', filteredCount === void 0);
              if (filteredCount === void 0) {
                this$1._.numPages = void 0;
                numText = (start + 1) + ' - ' + (end + 1);
                multiPage = true;
              } else {
                this$1._.numPages = Math.max(1, Math.ceil(filteredCount / options.pageSize));
                if (this$1.page() > this$1._.numPages) {
                  this$1.page(this$1._.numPages);
                }
                multiPage = this$1._.numPages > 1;
                if (filteredCount > 0 && this$1._.numPages > 1) {
                  numText = 'of ' + filteredCount;
                  items = (function() {
                    var j, ref1, results;
                    results = [];
                    for (idx = j = 1, ref1 = this._.numPages; j <= ref1; idx = j += 1) {
                      num = idx * options.pageSize;
                      results.push({
                        text: (num + 1 - options.pageSize) + ' - ' + Math.min(num, filteredCount), // e.g. 1 - 15
                        value: idx
                      });
                    }
                    return results;
                  }).call(this$1);
                  this$1._.pagePickers.forEach(function (picker) {
                    return picker.items(items).value(this$1.page());
                  });
                }
              }
              selection.selectAll('.hx-data-table-paginator').classed('hx-data-table-paginator-visible', multiPage);
              selection.selectAll('.hx-data-table-paginator-total-rows').text(numText || '');
              selection.selectAll('.hx-data-table-paginator-back').classed('hx-data-table-btn-disabled', this$1.page() === 1);
              selection.selectAll('.hx-data-table-paginator-forward').classed('hx-data-table-btn-disabled', this$1.page() === this$1._.numPages);
            }
            selection.select('.hx-data-table-control-panel-compact').classed('hx-data-table-control-panel-compact-visible', multiPage || showCompactControlPanelToggle);
            selection.select('.hx-data-table-control-panel-bottom').classed('hx-data-table-control-panel-bottom-visible', multiPage || ((ref1 = options.pageSizeOptions) != null ? ref1.length : void 0));
            selection.select('.hx-data-table-control-panel').classed('hx-data-table-control-panel-visible', multiPage || showCompactControlPanelToggle);
            if (headers.some(function(header) {
              return getColumnOption('sortEnabled', header.id);
            })) {
              currentSort = this$1.sort() || {};
              // filter out columns that are not sortable so they don't show in the list for compact mode
              sortColumns = exports.flatten(headers.map(function(header) {
                if (getColumnOption('sortEnabled', header.id)) {
                  return [
                    {
                      text: header.name,
                      value: header.id + 'asc',
                      column: header.id,
                      direction: 'asc',
                      cell: header
                    },
                    {
                      text: header.name,
                      value: header.id + 'desc',
                      column: header.id,
                      direction: 'desc',
                      cell: header
                    }
                  ];
                }
              }).filter(exports.defined));
              // set the values for the compact sort control
              // XXX Breaking: Renderer
              // .renderer((option) ->
              //   if option.value
              //     getColumnOption('headerCellRenderer', option.cell.id)(option.cell, headers)
              //       .add(i('hx-data-table-compact-sort-arrow hx-icon hx-icon-chevron-' + (if option.direction is 'asc' then 'up' else 'down')))
              //   else
              //     span().text(option.text)
              // )
              this$1._.sortColPicker.renderer(function(element, option) {
                if (option.value) {
                  getColumnOption('headerCellRenderer', option.cell.id)(element, option.cell, headers);
                  return select(element).append('i').class('hx-data-table-compact-sort-arrow hx-icon hx-icon-chevron-' + (option.direction === 'asc' ? 'up' : 'down'));
                } else {
                  return select(element).text(option.text);
                }
              }).items([
                {
                  text: options.noSortText,
                  value: void 0
                }
              ].concat(sortColumns));
              if (currentSort.column && this$1._.sortColPicker.value().value !== (currentSort.column + currentSort.direction)) {
                this$1._.sortColPicker.value({
                  value: currentSort.column + currentSort.direction
                });
              }
            }
            // populate the page size picker if there are options set
            selectPageSize = (options.pageSizeOptions != null) && options.pageSizeOptions.length > 0;
            selection.selectAll('.hx-data-table-page-size').classed('hx-data-table-page-size-visible', selectPageSize);
            if (selectPageSize) {
              if (options.pageSizeOptions.indexOf(options.pageSize) === -1) {
                options.pageSizeOptions.push(options.pageSize);
              }
              pageSizeOptions = options.pageSizeOptions.sort(exports.compare).map(function(item) {
                return {
                  text: item,
                  value: item
                };
              });
              this$1._.pageSizePickers.forEach(function(picker) {
                return picker.items(pageSizeOptions).value(options.pageSize);
              });
            }
            // build the grouped header
            if (headers.some(function(header) {
              return header.groups != null;
            })) {
              relevantHeaders = headers.filter(function(e) {
                return e.groups != null;
              }).map(function(e) {
                return e.groups.length;
              });
              maxHeaderDepth = Math.max.apply(null, relevantHeaders);
              // Map over to populate columns with groups of '' where not included
              headerGroups = headers.map(function(e) {
                var groups;
                groups = e.groups || [];
                while (groups.length < maxHeaderDepth) {
                  groups.push('');
                }
                return groups;
              });
              for (row = j = ref2 = maxHeaderDepth - 1; j >= 0; row = j += -1) {
                groupedRow = headerRow.insertBefore('tr');
                if (options.selectEnabled || (options.collapsibleRenderer != null)) {
                  groupedRow.append('th').class('hx-data-table-control');
                }
                count = 1;
                for (column = l = 1, ref3 = headerGroups.length; l <= ref3; column = l += 1) {
                  col = headerGroups[column];
                  prevCol = headerGroups[column - 1];
                  if ((col != null) && (prevCol != null)) {
                    parent = col.slice(row, maxHeaderDepth).toString();
                    prevParent = prevCol.slice(row, maxHeaderDepth).toString();
                  }
                  if (column === headerGroups.length || col[row] !== prevCol[row] || parent !== prevParent) {
                    groupedRow.append('th').attr('colspan', count).class('hx-data-table-cell-grouped').text(prevCol[row]);
                    count = 0;
                  }
                  count++;
                }
              }
            }
            // add the 'select all' checkbox to the header
            if (options.selectEnabled || (options.collapsibleRenderer != null)) {
              headerControlBox = headerRow.append('th').class('hx-data-table-control hx-table-head-no-border');
            }
            if (options.selectEnabled && !options.singleSelection) {
              headerCheckBox = headerControlBox.append('div').class('hx-data-table-checkbox').on('click', 'hx.data-table', function () {
                var enabledRows;
                if (rows.length > 0) {
                  enabledRows = rows.filter(function(row) {
                    return options.rowEnabledLookup(row);
                  });
                  return selectMulti(0, rows.length - 1, !enabledRows.every(function (row) {
                    return this$1._.selectedRows.has(options.rowIDLookup(row));
                  }));
                }
              });
              headerCheckBox.append('i').class('hx-icon hx-icon-check');
            }
            // build the header
            headers.forEach(function (header, i) {
              var cellDiv, cellDivContent, dirClass;
              cellDiv = headerRow.append('th').class('hx-data-table-cell').classed('hx-table-header-allow-wrap', getColumnOption('allowHeaderWrap', header.id));
              cellDivContent = cellDiv.append('div').class('hx-data-table-cell-inner');
              // XXX Breaking: Renderer
              // cellDivContent
              //   .add(div('hx-data-table-title')
              //     .add(getColumnOption('headerCellRenderer', header.id)(header, headers)))
              getColumnOption('headerCellRenderer', header.id)(cellDivContent.append('span').class('hx-data-table-title').node(), header, headers);
              if (getColumnOption('sortEnabled', header.id)) {
                cellDiv.classed('hx-data-table-cell-sort-enabled', true);
                currentSort = this$1.sort();
                dirClass = currentSort && currentSort.column === header.id ? 'hx-icon-sort-' + currentSort.direction + ' hx-data-table-sort-on' : 'hx-icon-sort';
                cellDivContent.append('i').class('hx-icon ' + dirClass + ' hx-data-table-sort-icon');
                return cellDiv.on('click', 'hx.data-table', function () {
                  var direction;
                  currentSort = this$1.sort() || {};
                  direction = currentSort.column === header.id ? currentSort.direction === 'asc' ? 'desc' : void 0 : 'asc';
                  column = direction !== void 0 ? header.id : void 0;
                  return this$1.sort({
                    column: column,
                    direction: direction
                  }, void 0, 'user');
                });
              }
            });
            this$1.updateSelected = function () {
              var checkBoxDivs, getSelectableRows, leftHeaderBody, len, m, pageHasSelection, parentFilter, rowDivs, rowIndex;
              parentFilter = function(parent) {
                return function(sel) {
                  return sel.node().parentNode === parent.node();
                };
              };
              getSelectableRows = function(parent) {
                return parent.selectAll('.hx-data-table-row').filter(parentFilter(parent)).classed('hx-data-table-row-selected', false);
              };
              rowDivs = getSelectableRows(tbody);
              leftHeaderBody = container.select('.hx-sticky-table-header-left').select('tbody');
              checkBoxDivs = getSelectableRows(leftHeaderBody);
              if (this$1._.selectedRows.size > 0) {
                for (rowIndex = m = 0, len = rows.length; m < len; rowIndex = ++m) {
                  row = rows[rowIndex];
                  if (this$1._.selectedRows.has(options.rowIDLookup(row))) {
                    select(rowDivs.nodes[rowIndex]).classed('hx-data-table-row-selected', true);
                    if (checkBoxDivs.nodes[rowIndex] != null) {
                      select(checkBoxDivs.nodes[rowIndex]).classed('hx-data-table-row-selected', true);
                    }
                  }
                }
              }
              pageHasSelection = tbody.selectAll('.hx-data-table-row-selected').size() > 0;
              selection.classed('hx-data-table-has-page-selection', pageHasSelection && !options.singleSelection);
              selection.classed('hx-data-table-has-selection', this$1._.selectedRows.size > 0 && !options.singleSelection);
              if (totalCount !== void 0) {
                return this$1._.statusBar.select('.hx-data-table-status-bar-text').text(exports.userFacingText.format(options.selectedRowsText, {
                  selected: this$1._.selectedRows.size,
                  total: totalCount
                }));
              }
            };
            // handles multi row selection ('select all' and shift selection)
            selectMulti = function (start, end, force) {
              var id, len, m, n, newRows, ref4, ref5;
              newRows = [];
              for (idx = m = ref4 = start, ref5 = end; m <= ref5; idx = m += 1) {
                newRows.push(rows[idx]);
              }
              for (n = 0, len = newRows.length; n < len; n++) {
                row = newRows[n];
                if (options.rowEnabledLookup(row) && options.rowSelectableLookup(row)) {
                  id = options.rowIDLookup(row);
                  this$1._.selectedRows[force ? 'add' : 'delete'](id);
                  this$1.emit('selectedrowschange', {
                    row: row,
                    rowValue: this$1._.selectedRows.has(id),
                    value: this$1.selectedRows(),
                    cause: 'user'
                  });
                }
              }
              return this$1.updateSelected();
            };
            // handles row selection.
            selectRow = function (row, index, shiftDown) {
              var deleteOrAdd, force, id;
              if (this$1._.userLastSelectedIndex != null) {
                if (options.singleSelection && index !== this$1._.userLastSelectedIndex) {
                  this$1._.selectedRows.clear();
                } else {
                  // does the check for whether we're shift selecting and calls into selectMulti if we are
                  if (shiftDown && index !== this$1._.userLastSelectedIndex) {
                    force = this$1._.selectedRows.has(options.rowIDLookup(rows[this$1._.userLastSelectedIndex]));
                    if (index > this$1._.userLastSelectedIndex) {
                      selectMulti(this$1._.userLastSelectedIndex + 1, index, force);
                    } else {
                      selectMulti(index, this$1._.userLastSelectedIndex, force);
                    }
                    return;
                  }
                }
              }
              this$1._.userLastSelectedIndex = index;
              if (options.rowSelectableLookup(row)) {
                id = options.rowIDLookup(row);
                deleteOrAdd = this$1._.selectedRows.has(id) ? 'delete' : 'add';
                this$1._.selectedRows[deleteOrAdd](id);
                this$1.emit('selectedrowschange', {
                  row: row,
                  rowValue: this$1._.selectedRows.has(id),
                  value: this$1.selectedRows(),
                  cause: 'user'
                });
              }
              return this$1.updateSelected();
            };
            // Deal with collapsible rows
            buildCollapsible = function() {
              var contentDiv, contentRow, hiddenRow;
              contentRow = detached('tr').class('hx-data-table-collapsible-content-row');
              hiddenRow = detached('tr').class('hx-data-table-collapsible-row-spacer');
              // Add an empty cell so the sticky headers display correctly
              contentRow.append('td').class('hx-data-table-collapsible-cell hx-data-table-collapsible-cell-empty');
              // The div that the user will populate with the collapsibleRender function
              contentDiv = contentRow.append('td').class('hx-data-table-collapsible-cell').attr('colspan', fullWidthColSpan).append('div').class('hx-data-table-collapsible-content-container').append('div').class('hx-data-table-collapsible-content');
              return {
                contentRow: contentRow,
                hiddenRow: hiddenRow,
                contentDiv: contentDiv
              };
            };
            toggleCollapsible = function (node, row, force) {
              var cc, currentVis, ref4, rowId;
              // once rows have been clicked once, the nodes are stored in the _.renderedCollapsibles object for re-use
              rowId = options.rowIDLookup(row);
              cc = this$1._.renderedCollapsibles[rowId] || buildCollapsible(row);
              this$1._.renderedCollapsibles[rowId] = cc;
              // We always insert after here to make sure the nodes are added when setting the collapsible rows with the API
              node.insertAfter(cc.hiddenRow).insertAfter(cc.contentRow);
              currentVis = force != null ? force : !cc.contentRow.classed('hx-data-table-collapsible-row-visible');
              cc.contentRow.classed('hx-data-table-collapsible-row-visible', currentVis);
              node.classed('hx-data-table-collapsible-row-visible', currentVis);
              node.select('.hx-data-table-collapsible-toggle').select('i').class(currentVis ? 'hx-icon hx-icon-minus' : 'hx-icon hx-icon-plus');
              // XXX Breaking: Renderer
              // if currentVis then cc.contentDiv.append(options.collapsibleRenderer(row))
              if (currentVis) {
                options.collapsibleRenderer(cc.contentDiv.node(), row);
              } else {
                this$1._.renderedCollapsibles[rowId].contentRow.remove();
                this$1._.renderedCollapsibles[rowId].hiddenRow.remove();
                delete this$1._.renderedCollapsibles[rowId];
              }
              this$1._.expandedRows[currentVis ? 'add' : 'delete'](rowId);
              if ((ref4 = this$1._.stickyHeaders) != null) {
                ref4.render();
              }
              this$1._.collapsibleSizeDiff = parseInt(selection.style('width')) - parseInt(select(cc.contentDiv.node().parentNode).style('width'));
              return currentVis;
            };
            // build the rows
            if (filteredCount === void 0 || filteredCount > 0) {
              rows.forEach(function (row, rowIndex) {
                var cell, cellDiv, cellElem, checkbox, collapsibleControl, columnIndex, columnMaxWidth, controlDiv, keyDiv, len, m, ref4, results, rowIsCollapsible, tr;
                tr = tbody.append('tr').class('hx-data-table-row').classed('hx-data-table-row-selected', this$1._.selectedRows.has(options.rowIDLookup(row))).classed('hx-data-table-row-disabled', !options.rowEnabledLookup(row));
                tr.on('click', 'hx.data-table', function (e) {
                  return this$1.emit('rowclick', {
                    data: row,
                    node: tr.node()
                  });
                });
                rowIsCollapsible = options.rowCollapsibleLookup(row); // stored as we use it more than once
                
                // used in compact mode to display the tick correctly without letting text flow behind it.
                tr.classed('hx-data-table-row-select-enabled', options.selectEnabled);
                if (options.selectEnabled || (options.collapsibleRenderer != null)) {
                  controlDiv = tr.append('th').class('hx-data-table-control');
                  if (options.selectEnabled) {
                    checkbox = controlDiv.append('div').class('hx-data-table-checkbox');
                    checkbox.append('i').class('hx-icon hx-icon-check');
                    if (options.rowEnabledLookup(row)) {
                      checkbox.on('click', 'hx.data-table', function(e) {
                        e.stopPropagation(); // prevent collapsibles being toggled by tick selection in compact mode
                        return selectRow(row, rowIndex, e.shiftKey);
                      });
                    }
                  }
                  if (options.collapsibleRenderer != null) {
                    collapsibleControl = controlDiv.append('div').class('hx-data-table-collapsible-toggle').classed('hx-data-table-collapsible-disabled', !rowIsCollapsible);
                    collapsibleControl.append('i').class('hx-icon hx-icon-plus');
                  }
                  if (rowIsCollapsible) {
                    // restore open collapsibles on render
                    if (this$1._.expandedRows.has(options.rowIDLookup(row))) {
                      toggleCollapsible(tr, row, true);
                    }
                    collapsibleControl.on('click', 'hx.data-table.collapse-row', function (e) {
                      var currentVis;
                      currentVis = toggleCollapsible(tr, row);
                      return this$1.emit('expandedrowschange', {
                        value: this$1._.expandedRows.values(),
                        row: row,
                        rowValue: currentVis,
                        cause: 'user'
                      });
                    });
                  }
                }
                ref4 = rowToArray(headers, row);
                // populate the row
                results = [];
                for (columnIndex = m = 0, len = ref4.length; m < len; columnIndex = ++m) {
                  cell = ref4[columnIndex];
                  // Render the 'key' value using the headerCellRenderer
                  // XXX Breaking: Renderer
                  // keyDiv = div('hx-data-table-cell-key')
                  //   .add(getColumnOption('headerCellRenderer', headers[columnIndex].id)(headers[columnIndex], headers))
                  keyDiv = div('hx-data-table-cell-key');
                  getColumnOption('headerCellRenderer', headers[columnIndex].id)(keyDiv.node(), headers[columnIndex], headers);
                  cellElem = tr.append('td').class('hx-data-table-cell');
                  columnMaxWidth = getColumnOption('maxWidth', headers[columnIndex].id);
                  if (columnMaxWidth != null) {
                    columnMaxWidth = parseInt(columnMaxWidth) + 'px';
                    cellElem.style('max-width', columnMaxWidth).style('width', columnMaxWidth).style('min-width', columnMaxWidth);
                  }
                  // XXX Breaking: Renderer
                  // cellDiv = cellElem.add(keyDiv)
                  //   .append('div').class('hx-data-table-cell-value')
                  //   .add(getColumnOption('cellRenderer', headers[columnIndex].id)(cell, row)).node()
                  cellDiv = cellElem.add(keyDiv).append('div').class('hx-data-table-cell-value').node();
                  results.push(getColumnOption('cellRenderer', headers[columnIndex].id)(cellDiv, cell, row)); // append the 'No Data' row.
                }
                return results;
              });
            } else {
              tbody.append('tr').class('hx-data-table-row-no-data').append('td').attr('colspan', fullWidthColSpan).text(options.noDataMessage);
            }
            this$1.updateSelected();
            // retain the horizontal scroll unless the page has been changed.
            // We only retain the horizontal scroll as when sorting/filtering on
            // the first page it retains the vertical scroll which looks weird.
            if (options.useStickyHeaders && this$1.page() === this$1._.oldPage) {
              wrapperNode = selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node();
              if (options.retainHorizontalScrollOnRender) {
                scrollLeft = wrapperNode.scrollLeft;
              }
              if (options.retainVerticalScrollOnRender) {
                scrollTop = wrapperNode.scrollTop;
              }
            }
            // store the old page - only used for retaining the scroll positions
            this$1._.oldPage = this$1.page();
            // remove the old content div, and slot in the new one
            selection.select('.hx-data-table-content').insertAfter(container);
            selection.select('.hx-data-table-content').remove();
            selection.classed('hx-data-table-compact', ((options.compact === 'auto') && (selection.width() < collapseBreakPoint)) || (options.compact === true)).classed('hx-data-table-show-search-above-content', options.showSearchAboveTable);
            // set up the sticky headers
            if (options.useStickyHeaders) {
              stickFirstColumn = options.selectEnabled || (options.collapsibleRenderer != null);
              stickyOpts = {
                stickFirstColumn: stickFirstColumn && (filteredCount === void 0 || filteredCount > 0),
                fullWidth: true
              };
              this$1._.stickyHeaders = new exports.StickyTableHeaders(container.node(), stickyOpts);
            }
            if (scrollLeft != null) {
              // restore horizontal scroll position
              selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node().scrollLeft = scrollLeft;
            }
            if (scrollTop != null) {
              selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node().scrollTop = scrollTop;
            }
            // hide the loading spinner as we're done rendering
            selection.shallowSelect('.hx-data-table-loading').style('display', 'none');
            this$1.emit('render');
            return typeof cb === "function" ? cb() : void 0;
          });
        });
      });
      return this;
    };

    return DataTable;
  }(EventEmitter));
  // Methods for changing the options
  //---------------------------------

  // general purpose function for setting / getting an option
  option = function(name) {
    return function(value, cb, cause) {
      var options;
      options = this._.options;
      if (arguments.length > 0) {
        options[name] = value;
        this.emit(name.toLowerCase() + 'change', {
          value: value,
          cause: cause || 'api'
        });
        this.render(cb);
        return this;
      } else {
        return options[name];
      }
    };
  };

  DataTable.prototype.collapsibleRenderer = option('collapsibleRenderer');

  DataTable.prototype.compact = option('compact');

  DataTable.prototype.displayMode = option('displayMode');

  DataTable.prototype.feed = option('feed');

  DataTable.prototype.filter = option('filter');

  DataTable.prototype.advancedSearch = option('advancedSearch');

  DataTable.prototype.showAdvancedSearch = option('showAdvancedSearch');

  DataTable.prototype.advancedSearchEnabled = option('advancedSearchEnabled');

  DataTable.prototype.showSearchAboveTable = option('showSearchAboveTable');

  DataTable.prototype.filterEnabled = option('filterEnabled');

  DataTable.prototype.noDataMessage = option('noDataMessage');

  DataTable.prototype.pageSize = option('pageSize');

  DataTable.prototype.pageSizeOptions = option('pageSizeOptions');

  DataTable.prototype.retainHorizontalScrollOnRender = option('retainHorizontalScrollOnRender');

  DataTable.prototype.retainVerticalScrollOnRender = option('retainVerticalScrollOnRender');

  DataTable.prototype.rowCollapsibleLookup = option('rowCollapsibleLookup');

  DataTable.prototype.rowEnabledLookup = option('rowEnabledLookup');

  DataTable.prototype.rowIDLookup = option('rowIDLookup');

  DataTable.prototype.rowSelectableLookup = option('rowSelectableLookup');

  DataTable.prototype.selectEnabled = option('selectEnabled');

  DataTable.prototype.highlightOnHover = option('highlightOnHover');

  DataTable.prototype.singleSelection = option('singleSelection');

  DataTable.prototype.useStickyHeaders = option('useStickyHeaders');

  DataTable.prototype.sort = option('sort');

  // general purpose function for setting / getting a column option (or the default option of the column id is not specified)
  columnOption = function(name) {
    return function(columnId, value, cb) {
      var base, options;
      options = this._.options;
      if (arguments.length > 1 && exports.isString(columnId)) {
        if ((base = options.columns)[columnId] == null) {
          base[columnId] = {};
        }
        options.columns[columnId][name] = value;
        this.emit(name.toLowerCase() + 'change', {
          column: columnId,
          value: value,
          cause: 'api'
        });
        this.render(cb);
        return this;
      } else if (arguments.length > 0) {
        if (exports.isString(columnId) && options.columns[columnId]) {
          return options.columns[columnId][name];
        } else {
          options[name] = arguments[0];
          this.emit(name.toLowerCase() + 'change', {
            value: value,
            cause: 'api'
          });
          this.render(arguments[1]);
          return this;
        }
      } else {
        return options[name];
      }
    };
  };

  DataTable.prototype.advancedSearchCriteria = columnOption('advancedSearchCriteria');

  DataTable.prototype.allowHeaderWrap = columnOption('allowHeaderWrap');

  DataTable.prototype.cellRenderer = columnOption('cellRenderer');

  DataTable.prototype.headerCellRenderer = columnOption('headerCellRenderer');

  DataTable.prototype.sortEnabled = columnOption('sortEnabled');

  // function for setting / getting options that are only column specific and cannot be set for the whole table
  columnOnlyOption = function(name) {
    return function(columnId, value, cb) {
      var base, options;
      options = this._.options;
      if (exports.isString(columnId)) {
        if (arguments.length > 1) {
          if ((base = options.columns)[columnId] == null) {
            base[columnId] = {};
          }
          options.columns[columnId][name] = value;
          this.emit(name.toLowerCase() + 'change', {
            column: columnId,
            value: value,
            cause: 'api'
          });
          this.render(cb);
          return this;
        } else if (options.columns[columnId]) {
          return options.columns[columnId][name];
        }
      }
    };
  };

  DataTable.prototype.maxWidth = columnOnlyOption('maxWidth');

  return DataTable;

}).call(undefined);

whitespaceSplitRegex = /\s+/;

stripLeadingAndTrailingWhitespaceRegex = /^\s+|\s+$/g;

getRowSearchTerm = function(cellValueLookup, row) {
  var k, v;
  return ((function() {
    var ref, results;
    ref = row.cells;
    results = [];
    for (k in ref) {
      v = ref[k];
      results.push(v);
    }
    return results;
  })()).map(cellValueLookup).join(' ').toLowerCase();
};

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

defaultTermLookup = function(term, rowSearchTerm, criteria) {
  if ( criteria === void 0 ) criteria = 'contains';

  var arr, lookupArr, validPart;
  lookupArr = exports.isString(rowSearchTerm) ? [rowSearchTerm] : rowSearchTerm;
  arr = term.replace(stripLeadingAndTrailingWhitespaceRegex, '').split(whitespaceSplitRegex);
  validPart = exports.find(arr, function(part) {
    return filter["filter" + capitalize(criteria)](lookupArr, part.toLowerCase()).length;
  });
  return exports.defined(validPart);
};

exports.getAdvancedSearchFilter = function(cellValueLookup, termLookup) {
  if ( cellValueLookup === void 0 ) cellValueLookup = exports.identity;
  if ( termLookup === void 0 ) termLookup = defaultTermLookup;

  return function(filters, row) {
    var k, rowSearchTerm, v, validFilters;
    rowSearchTerm = ((function() {
      var ref, results;
      ref = row.cells;
      results = [];
      for (k in ref) {
        v = ref[k];
        results.push(v);
      }
      return results;
    })()).map(cellValueLookup).join(' ').toLowerCase();
    // If term is empty this will return false
    validFilters = exports.find(filters, function(groupedFilters) {
      var invalidFilter;
      invalidFilter = exports.find(groupedFilters, function(currFilter) {
        var searchTerm;
        searchTerm = currFilter.column === 'any' ? rowSearchTerm : (cellValueLookup(row.cells[currFilter.column]) + '').toLowerCase();
        return currFilter.term && !termLookup(currFilter.term.toLowerCase(), searchTerm, currFilter.criteria);
      });
      return !exports.defined(invalidFilter);
    });
    return exports.defined(validFilters);
  };
};

getFiltered = function(rows, term, filterCache, filterCacheTerm, fn) {
  // term can be a string (regular filter) or an array (advanced search)
  if ((term != null ? term.length : void 0) && (filterCache === void 0 || filterCacheTerm !== term)) {
    return rows.filter(fn);
  } else if (filterCache === void 0 || !(term != null ? term.length : void 0)) {
    return rows.slice();
  } else {
    return filterCache;
  }
};

exports.objectFeed = function(data, options) {
  var filterCache, filterCacheTerm, rowsByIdMap, sortCacheTerm, sorted;
  options = exports.merge({
    cellValueLookup: exports.identity,
    termLookup: defaultTermLookup,
    //XXX: should this provide more information - like the column id being sorted on?
    compare: exports.compare
  }, options);
  if (options.filter == null) {
    options.filter = function(term, row) {
      return options.termLookup(term.toLowerCase(), getRowSearchTerm(options.cellValueLookup, row));
    };
  }
  if (options.advancedSearch == null) {
    options.advancedSearch = exports.getAdvancedSearchFilter(options.cellValueLookup, options.termLookup);
  }
  // cached values
  filterCache = void 0;
  filterCacheTerm = void 0;
  sorted = void 0;
  sortCacheTerm = {};
  rowsByIdMap = void 0;
  return {
    data: data, // for debugging
    headers: function(cb) {
      return cb(data.headers);
    },
    totalCount: function(cb) {
      return cb(data.rows.length);
    },
    rows: function(range, cb) {
      var advancedSearchFilterFn, column, direction, filterFn, ref, ref1, ref2, ref3, ref4;
      if (((ref = range.sort) != null ? ref.column : void 0) !== sortCacheTerm.column) {
        filterCache = void 0;
      }
      if (range.useAdvancedSearch) {
        advancedSearchFilterFn = function(row) {
          return options.advancedSearch(range.advancedSearch, row);
        };
        filterCache = getFiltered(data.rows, range.advancedSearch, filterCache, filterCacheTerm, advancedSearchFilterFn);
        filterCacheTerm = range.advancedSearch;
        sorted = void 0;
      } else {
        filterFn = function(row) {
          return options.filter(range.filter, row);
        };
        filterCache = getFiltered(data.rows, range.filter, filterCache, filterCacheTerm, filterFn);
        filterCacheTerm = range.filter;
        sorted = void 0;
      }
      if (sorted === void 0 || sortCacheTerm.column !== ((ref1 = range.sort) != null ? ref1.column : void 0) || sortCacheTerm.direction !== ((ref2 = range.sort) != null ? ref2.direction : void 0)) {
        sorted = range.sort && range.sort.column ? (direction = range.sort.direction === 'asc' ? 1 : -1, column = range.sort.column, filterCache.sort(function(r1, r2) {
          return direction * options.compare(r1.cells[column], r2.cells[column]);
        }), filterCache) : filterCache;
        sortCacheTerm.column = (ref3 = range.sort) != null ? ref3.column : void 0;
        sortCacheTerm.direction = (ref4 = range.sort) != null ? ref4.direction : void 0;
      }
      return cb({
        rows: sorted.slice(range.start, +range.end + 1 || 9e9),
        filteredCount: sorted.length
      });
    },
    rowsForIds: function(ids, lookupRow, cb) {
      var id, j, len, ref, row;
      if (rowsByIdMap === void 0) {
        rowsByIdMap = {};
        ref = data.rows;
        for (j = 0, len = ref.length; j < len; j++) {
          row = ref[j];
          rowsByIdMap[lookupRow(row)] = row;
        }
      }
      return cb((function() {
        var l, len1, results;
        results = [];
        for (l = 0, len1 = ids.length; l < len1; l++) {
          id = ids[l];
          results.push(rowsByIdMap[id]);
        }
        return results;
      })());
    }
  };
};

// XXX Deprecated: alongside request
urlFeed = function(url, options) {
  var jsonCallback, maybeCached;
  //XXX: when new calls come in, ignore the ongoing request if there is one / cancel the request if possible
  options = exports.merge({
    extra: void 0,
    cache: false
  }, options);
  // creates a function that might perform caching, depending on the options.cache value
  maybeCached = function(fetcher) {
    var value;
    if (options.cache) {
      value = void 0;
      return function(cb) {
        if (value) {
          return cb(value);
        } else {
          return fetcher(function(res) {
            value = res;
            return cb(value);
          });
        }
      };
    } else {
      return function(cb) {
        return fetcher(cb);
      };
    }
  };
  jsonCallback = function(cb) {
    return function(err, value) {
      if (err) {
        logger.warn(err);
      }
      return cb(value);
    };
  };
  return {
    url: url, // for debugging
    headers: maybeCached(function(cb) {
      return json(url, {
        type: 'headers',
        extra: options.extra
      }, jsonCallback(cb));
    }),
    totalCount: maybeCached(function(cb) {
      return json(url, {
        type: 'totalCount',
        extra: options.extra
      }, function(err, res) {
        return jsonCallback(cb)(err, res.count);
      });
    }),
    rows: function(range, cb) {
      return json(url, {
        type: 'rows',
        range: range,
        extra: options.extra
      }, jsonCallback(cb));
    },
    rowsForIds: function(ids, lookupRow, cb) {
      return json(url, {
        type: 'rowsForIds',
        ids: ids,
        extra: options.extra
      }, jsonCallback(cb));
    }
  };
};

exports.dataTable = function(options) {
  var dt, selection;
  selection = div();
  dt = new exports.DataTable(selection, options);
  if (options && options.feed) {
    dt.render();
  }
  return selection;
};

exports.dataTable.objectFeed = exports.objectFeed;

exports.dataTable.urlFeed = urlFeed;

var Sidebar = /*@__PURE__*/(function (EventEmitter) {
  function Sidebar(selector, opts) {
    var this$1 = this;

    var btn, opened, options;
    EventEmitter.call(this);
    options = exports.mergeDefined({
      autoAddSidebarClass: true
    }, opts);
    options.headerSelector = opts.headerSelector || '.hx-titlebar';
    options.contentSelector = opts.contentSelector || '.hx-content';
    this.selection = select(selector).api('sidebar', this).api(this);
    opened = select('body').width() > 320 + 240;
    this.selection.classed('hx-sidebar', true).classed('hx-openable', true).classed('hx-opened', opened);
    select('body').classed('hx-sidebar-opened', opened).node().offsetHeight; // force a reflow
    if (options.autoAddSidebarClass) {
      select('body').classed('hx-sidebar-page', true);
    }
    this.selection.classed('hx-animate', true);
    select(options.contentSelector).classed('hx-animate', true);
    btn = select(options.headerSelector).prepend('button').attr('type', 'button').class('hx-titlebar-sidebar-button').add(i('hx-icon hx-icon-bars')).on('click', 'hx.sidebar', function () {
      return this$1.toggle();
    });
  }

  if ( EventEmitter ) Sidebar.__proto__ = EventEmitter;
  Sidebar.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Sidebar.prototype.constructor = Sidebar;

  Sidebar.prototype.toggle = function toggle () {
    if (this.selection.classed('hx-opened')) {
      this.hide();
    } else {
      this.show();
    }
    return this;
  };

  Sidebar.prototype.hide = function hide () {
    this.selection.classed('hx-opened', false);
    select('body').classed('hx-sidebar-opened', false);
    this.emit('hide');
    return this;
  };

  Sidebar.prototype.show = function show () {
    this.selection.classed('hx-opened', true);
    select('body').classed('hx-sidebar-opened', true);
    this.emit('show');
    return this;
  };

  return Sidebar;
}(EventEmitter));

var getValidationMessage;

// Swaps out poor validation messages for more descriptive ones.
getValidationMessage = function(message, type) {
  switch (message.toLowerCase()) {
    case 'value missing':
      if (type === 'radio') {
        return exports.userFacingText('form', 'missingRadioValue');
      } else {
        return exports.userFacingText('form', 'missingValue');
      }
    case 'type mismatch':
      return exports.userFacingText('form', 'typeMismatch');
    default:
      return message;
  }
};

var validateForm = function(formSelector, options) {
  var defaultOptions, element, error, errors, featureFlagMode, focusedElement, form, i, idx, input, ref, selection, type;
  selection = select(formSelector);
  featureFlagMode = selection.classed('hx-flag-form');
  form = select(formSelector).node();
  defaultOptions = {
    showMessage: true
  };
  options = exports.mergeDefined(defaultOptions, options);
  select(formSelector).selectAll('.hx-form-error').remove();
  errors = [];
  focusedElement = document.activeElement;
  for (idx = i = 0, ref = form.children.length; (0 <= ref ? i < ref : i > ref); idx = 0 <= ref ? ++i : --i) {
    // Loop through all direct child divs of form element ()
    if (form.children[idx].nodeName.toLowerCase() === 'div') {
      element = form.children[idx].children[1];
      // Don't check the validity of hidden or undefined elements
      if (element && element.offsetParent !== null) {
        // Deal with standard label/input pairs
        if (element.nodeName.toLowerCase() === 'input' || element.nodeName.toLowerCase() === 'textarea') {
          if (!element.checkValidity()) {
            type = select(element).attr('type');
            errors.push({
              message: getValidationMessage(element.validationMessage, type),
              node: element,
              validity: element.validity,
              focused: focusedElement === element
            });
          }
        } else {
          // Deal with radio groups and other similar structured elements
          input = select(element).select('input').node();
          type = select(element).select('input').attr('type');
          if (input && !input.checkValidity()) {
            errors.push({
              message: getValidationMessage(input.validationMessage, type),
              node: element,
              validity: input.validity,
              focused: focusedElement === input
            });
          }
        }
      }
    }
  }
  if (options.showMessage && errors.length > 0) {
    if (featureFlagMode) {
      selection.selectAll('.hx-form-message').remove();
      errors.forEach(function(error) {
        select(error.node).insertAfter(div('hx-form-message hx-form-message-wrap').text(error.message));
        return select(error.node).on('click', 'hx.form-error', function(e) {
          var next;
          next = select(error.node.nextElementSibling);
          if (next.classed('hx-form-message')) {
            next.remove();
          }
          return select(error.node).off('click', 'hx.form-error');
        });
      });
    } else {
      // Show the error for the focused element (if there is one) or the first error in the form
      error = errors.filter(function(error) {
        return error.focused;
      })[0] || errors[0];
      // XXX: This structure lets us jump out of the forced table layout. If we change
      // to match the full-width aeris forms, this will need changing.
      select(error.node.parentNode).insertAfter('div').class('hx-form-error').append('div').insertAfter('div').class('hx-form-error-text-container').append('div').class('hx-form-error-text').text(error.message);
      select(error.node).on('click', 'hx.form', function(e) {
        var next;
        next = select(error.node.parentNode.nextElementSibling);
        if (next.classed('hx-form-error')) {
          next.remove();
        }
        return select(error.node).off('click', 'hx.form');
      });
    }
  }
  return {
    // Return the errors so we can still check how many there are.
    valid: errors.length === 0,
    errors: errors
  };
};

var createFilteredData;

exports.userFacingText({
  tagInput: {
    placeholder: 'add tag...'
  }
});

createFilteredData = function(filterFn, data) {
  if (exports.isFunction(data)) {
    return function(term, callback) {
      return data(term, function(result) {
        return callback(result.filter(filterFn));
      });
    };
  } else if (exports.isArray(data)) {
    return function(term, callback) {
      return callback(data.filter(filterFn));
    };
  } else {
    return data;
  }
};

exports.TagInput = (function() {
  var addTag;

  var TagInput = /*@__PURE__*/(function (EventEmitter) {
    function TagInput(selector, options) {
      var this$1 = this;

      var _, acData, backspacedown, filterFn, hasError, inputContainer, inputMap, isInsideForm, isValid, ref, validateTagInput;
      EventEmitter.call(this);
      this.selector = selector;
      _ = this._ = {};
      this.options = exports.mergeDefined({
        classifier: void 0,
        validator: void 0,
        draggable: true,
        items: [],
        placeholder: exports.userFacingText('tagInput', 'placeholder'),
        autocompleteData: void 0,
        autocompleteOptions: {},
        excludeTags: true,
        mustMatchAutocomplete: true,
        isInsideForm: false,
        featureFlags: {
          useInputClass: false
        }
      }, options);
      if (this.options.mustMatchAutocomplete) {
        this.options.autocompleteOptions.mustMatch = true;
      }
      this.selection = select(this.selector).classed('hx-tag-input', true).classed('hx-flag-tag-input', this.options.featureFlags.useInputClass).api('tag-input', this).api(this);
      this.tagContainer = this.selection.append('span').class('hx-tags-container');
      if (this.options.draggable) {
        _.dragContainer = new exports.DragContainer(this.tagContainer.node());
      }
      isInsideForm = this.options.isInsideForm || !this.selection.closest('form').empty();
      inputContainer = this.selection.append(isInsideForm ? 'div' : 'form').class('hx-tag-input-container');
      this.input = inputContainer.append('input').attr('placeholder', this.options.placeholder).classed('hx-input', this.options.featureFlags.useInputClass);
      if (this.options.autocompleteData != null) {
        isValid = this.options.validator != null ? function (item) {
          return !this$1.options.validator(item);
        } : exports.identity;
        filterFn = this.options.excludeTags ? function (item) {
          return isValid(item) && !~this$1.items().indexOf(item.toString());
        } : isValid;
        acData = createFilteredData(filterFn, this.options.autocompleteData);
        this._.autocomplete = new exports.Autocomplete(this.input.node(), acData, this.options.autocompleteOptions);
        inputMap = ((ref = this._.autocomplete.options) != null ? ref.inputMap : void 0) || exports.identity;
        this._.autocomplete.on('change', 'hx.taginput', function (value) { // add the item to the tag list on first enter/tab
          this$1.add(inputMap(value));
          return setTimeout((function () {
            return this$1._.autocomplete.show();
          }), 0);
        });
      }
      backspacedown = false;
      hasError = function () {
        var error, name;
        name = this$1.input.value();
        this$1.input.node().setCustomValidity('');
        validateTagInput(true);
        if (name !== '' && this$1.options.validator) {
          error = this$1.options.validator(name) || '';
          this$1.input.node().setCustomValidity(error);
          return error.length > 0;
        } else {
          return false;
        }
      };
      validateTagInput = function (clear) {
        var validationForm;
        validationForm = isInsideForm ? this$1.selection.closest('.hx-form') : inputContainer;
        if (isInsideForm) {
          if (clear) {
            return validationForm.selectAll('.hx-form-error').remove();
          } else {
            return validateForm(validationForm.node()).valid;
          }
        } else {
          return validationForm.node().checkValidity();
        }
      };
      this.input.on('keypress', 'hx.tag-input', function (event) {
        var name;
        if (event.keyCode === 13) {
          validateTagInput();
          if (this$1.input.node().checkValidity()) {
            event.preventDefault();
            if (!this$1._.autocomplete) {
              name = this$1.input.value();
              if (name) {
                _.userEvent = true;
                return this$1.add(name);
              }
            }
          }
        }
      });
      this.input.on('input', 'hx.tag-input', hasError);
      this.input.on('keydown', 'hx.tag-input', function (event) {
        var nodeSelection, ref1, ref2, selection, value;
        if (((event.keyCode || event.charCode) === 8) && !backspacedown) {
          backspacedown = true;
          this$1.input.node().setCustomValidity('');
          validateTagInput(true);
          if (this$1.input.value() === '') {
            selection = this$1.tagContainer.selectAll('.hx-tag');
            if (selection.size() > 0) {
              if ((ref1 = this$1._.autocomplete) != null) {
                ref1.hide();
              }
              nodeSelection = select(selection.node(selection.size() - 1));
              value = nodeSelection.text();
              nodeSelection.remove();
              if ((ref2 = this$1._.autocomplete) != null) {
                ref2.show();
              }
              return this$1.emit('remove', {
                value: value,
                type: 'user'
              });
            }
          }
        }
      });
      this.input.on('keyup', 'hx.tag-input', function(event) {
        if ((event.keyCode || event.charCode) === 8) {
          backspacedown = false;
          return true;
        }
      });
      if (!this._.autocomplete) {
        this.input.on('blur', 'hx.tag-input', function (event) {
          if (this$1.input.value().length > 0 && !hasError()) {
            _.userEvent = true;
            return this$1.add(this$1.input.value(), void 0);
          }
        });
      }
      this.input.on('focus', 'hx.tag-input', function (event) {
        if (!isInsideForm && hasError()) {
          return validateTagInput();
        }
      });
      if (this.options.disabled) {
        this.disabled(this.options.disabled);
      }
      if (this.options.items) {
        this.items(this.options.items);
      }
    }

    if ( EventEmitter ) TagInput.__proto__ = EventEmitter;
    TagInput.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    TagInput.prototype.constructor = TagInput;

    TagInput.prototype.add = function add (name, cssclass) {
      var j, len, n;
      if (exports.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          n = name[j];
          addTag(this, n, cssclass);
        }
      } else if (name) {
        addTag(this, name, cssclass);
      } else {
        logger.warn('TagInput::add', 'Expected an array or string argument, you supplied:', name);
      }
      this.input.value('');
      if (this.options.draggable) {
        this._.dragContainer.setup();
      }
      return this;
    };

    // removes a tag by name
    TagInput.prototype.remove = function remove (name) {
      var this$1 = this;

      var returnValue, tagsToRemove;
      if (name != null) {
        tagsToRemove = this.tagContainer.selectAll('.hx-tag').filter(function(d) {
          return d.text() === name;
        });
        returnValue = tagsToRemove.size();
        tagsToRemove.remove();
        tagsToRemove.forEach(function (d) {
          return this$1.emit('remove', {
            value: d.text(),
            type: 'api'
          });
        });
      } else {
        tagsToRemove = this.tagContainer.selectAll('.hx-tag');
        returnValue = tagsToRemove.text();
        tagsToRemove.remove();
        tagsToRemove.forEach(function (d) {
          return this$1.emit('remove', {
            value: d.text(),
            type: 'api'
          });
        });
      }
      if (this.options.draggable) {
        this._.dragContainer.setup();
      }
      return returnValue;
    };

    // returns the tags as an array of strings
    TagInput.prototype.items = function items (items$1, cssclass) {
      if (arguments.length > 0) {
        this.remove();
        if (exports.isArray(items$1)) {
          this.add(items$1, cssclass);
        } else if (items$1) {
          logger.warn('TagInput::items', 'Expected an array of items, you supplied:', items$1);
        }
        return this;
      } else {
        return this.tagContainer.selectAll('.hx-tag').select('.hx-tag-text').text();
      }
    };

    TagInput.prototype.disabled = function disabled (disable) {
      if (disable != null) {
        this._.disabled = disable;
        this.input.attr('disabled', disable ? true : void 0);
        this.tagContainer.selectAll('.hx-tag').classed('hx-disabled', disable).classed('hx-drag-element', this.options.draggable && !disable);
        if (this.options.draggable) {
          this._.dragContainer.setup();
        }
        return this;
      } else {
        return !!this._.disabled;
      }
    };

    return TagInput;
  }(EventEmitter));
  // adds a tag, or an array of tags
  addTag = function(tagInput, name, clasz) {
    var cls, tagSelection;
    tagSelection = tagInput.tagContainer.append('div').class('hx-tag').add(span('hx-tag-text').text(name)).add(span('hx-tag-remove').add(i('hx-icon hx-icon-close')));
    if (tagInput.options.draggable) {
      tagSelection.classed('hx-drag-element', true).select('.hx-tag-text').classed('hx-drag-control', true);
    }
    if (clasz) {
      tagSelection.classed(clasz, true);
    }
    tagSelection.classed('hx-disabled', tagInput._.disabled);
    if (tagInput.options.classifier) {
      cls = tagInput.options.classifier(name);
      if (cls) {
        tagSelection.classed(cls, true);
      }
    }
    tagSelection.select('.hx-tag-remove').on('click', 'hx.tag-input', function () {
      var value;
      if (!tagInput._.disabled && !tagSelection.classed('hx-disabled')) {
        value = tagSelection.text();
        tagSelection.remove();
        return tagInput.emit('remove', {
          value: value,
          type: 'user'
        });
      }
    });
    tagInput.emit('add', {
      value: name,
      type: tagInput._.userEvent ? 'user' : 'api'
    });
    return tagInput._.userEvent = false;
  };

  return TagInput;

}).call(undefined);

exports.tagInput = function(options) {
  var selection;
  selection = div();
  new exports.TagInput(selection, options);
  return selection;
};

var DateTimePicker = /*@__PURE__*/(function (EventEmitter) {
  function DateTimePicker(selector, options) {
    var this$1 = this;

    var base, dtNode, tpNode, updateDatePicker, updateTimePicker;
    EventEmitter.call(this);
    this.selector = selector;
    this.options = exports.merge({
      datePickerOptions: {},
      timePickerOptions: {}
    }, options);
    // You can't select a range for a date-time picker.
    delete this.options.datePickerOptions.selectRange;
    if (this.options.date) {
      this.options.datePickerOptions.date = this.options.date;
      this.options.timePickerOptions.date = this.options.date;
    }
    if ((base = this.options.datePickerOptions).v2Features == null) {
      base.v2Features = {};
    }
    this.options.datePickerOptions.v2Features.outputFullDate = true;
    this.suppressCallback = false;
    this.selection = select(this.selector).classed('hx-date-time-picker', true).api('date-time-picker', this).api(this);
    dtNode = this.selection.append('div');
    tpNode = this.selection.append('div');
    // To prevent the two pickers being initialised with separate disabled properties.
    this.options.timePickerOptions.disabled = this.options.datePickerOptions.disabled;
    this.datePicker = new exports.DatePicker(dtNode, this.options.datePickerOptions);
    this.timePicker = new exports.TimePicker(tpNode, this.options.timePickerOptions);
    this.localizer = this.timePicker.localizer;
    this.datePicker.localizer = this.localizer;
    this.localizer.on('localechange', 'hx.date-time-picker', function() {
      updateTimePicker();
      return updateDatePicker();
    });
    this.localizer.on('timezonechange', 'hx.date-time-picker', function () {
      updateTimePicker();
      return updateDatePicker();
    });
    this.datePicker.pipe(this, 'date', ['show', 'hide']);
    this.timePicker.pipe(this, 'time', ['show', 'hide']);
    updateTimePicker = function (data) {
      this$1.timePicker.suppressed('change', true);
      this$1.timePicker.date(this$1.datePicker.date(), true);
      this$1.timePicker.suppressed('change', false);
      if (data != null) {
        // Called here as otherwise calling @date() would return the previously set date
        this$1.emit('date.change', data);
        return this$1.emit('change', this$1.date());
      }
    };
    updateDatePicker = function (data) {
      this$1.datePicker.suppressed('change', true);
      this$1.datePicker.date(this$1.date());
      this$1.datePicker.suppressed('change', false);
      if (data != null) {
        // Called here as otherwise calling @date() would return the previously set date
        this$1.emit('time.change', data);
        return this$1.emit('change', this$1.date());
      }
    };
    this.datePicker.on('change', 'hx.date-time-picker', updateTimePicker);
    this.timePicker.on('change', 'hx.date-time-picker', updateDatePicker);
  }

  if ( EventEmitter ) DateTimePicker.__proto__ = EventEmitter;
  DateTimePicker.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  DateTimePicker.prototype.constructor = DateTimePicker;

  DateTimePicker.prototype.date = function date (val, retainTime) {
    if (arguments.length > 0) {
      this.timePicker.date(val, retainTime);
      return this;
    } else {
      return this.timePicker.date();
    }
  };

  DateTimePicker.prototype.year = function year (val) {
    if (arguments.length > 0) {
      this.datePicker.year(val);
      return this;
    } else {
      return this.datePicker.year();
    }
  };

  DateTimePicker.prototype.month = function month (val) {
    if (arguments.length > 0) {
      this.datePicker.month(val);
      return this;
    } else {
      return this.datePicker.month();
    }
  };

  DateTimePicker.prototype.day = function day (val) {
    if (arguments.length > 0) {
      this.datePicker.day(val);
      return this;
    } else {
      return this.datePicker.day();
    }
  };

  DateTimePicker.prototype.hour = function hour (val) {
    if (arguments.length > 0) {
      this.timePicker.hour(val);
      return this;
    } else {
      return this.timePicker.hour();
    }
  };

  DateTimePicker.prototype.minute = function minute (val) {
    if (arguments.length > 0) {
      this.timePicker.minute(val);
      return this;
    } else {
      return this.timePicker.minute();
    }
  };

  DateTimePicker.prototype.second = function second (val) {
    if (arguments.length > 0) {
      this.timePicker.second(val);
      return this;
    } else {
      return this.timePicker.second();
    }
  };

  DateTimePicker.prototype.getScreenDate = function getScreenDate () {
    return this.datePicker.getScreenDate();
  };

  DateTimePicker.prototype.getScreenTime = function getScreenTime () {
    return this.timePicker.getScreenTime();
  };

  // XXX [2.0.0]: remove?
  // See note in 2.0.0.md about retaining this method
  DateTimePicker.prototype.locale = function locale (locale$1) {
    if (arguments.length > 0) {
      this.localizer.locale(locale$1);
      return this;
    } else {
      return this.datePicker.localizer.locale();
    }
  };

  DateTimePicker.prototype.timezone = function timezone (timezone$1) {
    if (arguments.length > 0) {
      this.localizer.timezone(timezone$1);
      return this;
    } else {
      return this.localizer.timezone();
    }
  };

  DateTimePicker.prototype.disabled = function disabled (disable) {
    var dpDisabled;
    dpDisabled = this.datePicker.disabled(disable);
    this.timePicker.disabled(disable);
    if (disable != null) {
      return this;
    } else {
      return dpDisabled;
    }
  };

  return DateTimePicker;
}(EventEmitter));

var dateTimePicker = function(options) {
  var selection;
  selection = div();
  new DateTimePicker(selection, options);
  return selection;
};

var fileListToMap, fileValidator, getFileUID;

exports.userFacingText({
  fileInput: {
    chooseFile: 'Choose File',
    chooseFiles: 'Choose Files',
    filesSelected: 'Files Selected: $numFiles',
    noFile: 'No File Chosen'
  }
});

getFileUID = function(file) {
  return file.name + file.size + file.lastModified + file.type;
};

fileValidator = function(file, acceptedExtensions) {
  var extension;
  if (acceptedExtensions != null ? acceptedExtensions.length : void 0) {
    extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    return acceptedExtensions.indexOf(extension) > -1;
  } else {
    return true;
  }
};

fileListToMap = function(fileList, acceptedExtensions, emitter, options) {
  var file, fileUID, j, len, map;
  // Deals with duplicates if the file has the same UID
  // Also removes invalid files
  map = new Map();
  for (j = 0, len = fileList.length; j < len; j++) {
    file = fileList[j];
    if (fileValidator(file, acceptedExtensions)) {
      fileUID = getFileUID(file);
      map.set(fileUID, file);
      if (!options.multiple) {
        break;
      }
    } else {
      emitter.emit('fileextensionerror', {
        cause: 'user',
        value: {
          accepted: acceptedExtensions,
          filename: file.name
        }
      });
    }
  }
  return map;
};

var FileInput = /*@__PURE__*/(function (EventEmitter) {
  function FileInput(selector, options) {
    var this$1 = this;

    var acceptedExtensions, acceptedExtensionsString, drop, dropdown, dropdownDiv, fiButton, fiGroup, fiInput, filePreview, handleFiles, imageType, noFilesTextDiv, preventDefault, ref, resolvedOptions, selectedFiles, selection, self, setupDropdown;
    EventEmitter.call(this);
    this.selector = selector;
    self = this;
    resolvedOptions = exports.merge({
      disabled: false,
      fullWidth: false,
      acceptedExtensions: void 0,
      multiple: false,
      dragEnabled: true,
      buttonClass: 'hx-action',
      buttonText: exports.userFacingText('fileInput', 'chooseFile'),
      filesSelectedText: exports.userFacingText('fileInput', 'filesSelected', true),
      noFilesText: exports.userFacingText('fileInput', 'noFile')
    }, options);
    if (resolvedOptions.multiple && !options.buttonText) {
      resolvedOptions.buttonText = exports.userFacingText('fileInput', 'chooseFiles');
    }
    selection = select(this.selector).classed('hx-file-input', true).classed('hx-file-input-full-width', resolvedOptions.fullWidth).api('file-input', this).api(this);
    if (((ref = resolvedOptions.acceptedExtensions) != null ? ref.length : void 0) > 0) {
      acceptedExtensions = resolvedOptions.acceptedExtensions;
      acceptedExtensionsString = resolvedOptions.acceptedExtensions.map(function(e) {
        return ("." + e);
      }).join(',');
    }
    fiInput = input('hx-file-input-hidden').attr('type', 'file').attr('accept', acceptedExtensionsString).attr('multiple', resolvedOptions.multiple ? 'multiple' : void 0);
    fiInput.on('change', function (e) {
      if (e.target.files.length) {
        handleFiles(fileListToMap(e.target.files, acceptedExtensions, this$1, resolvedOptions));
        return fiInput.value('');
      }
    });
    fiGroup = div('hx-input-group hx-input-group-full-width hx-no-margin');
    fiButton = button(("hx-file-input-button hx-btn hx-no-margin " + (resolvedOptions.buttonClass))).attr('type', 'button').on('click', function() {
      return fiInput.node().click();
    }).add(i('hx-file-input-icon hx-icon hx-icon-upload')).add(span().text(resolvedOptions.buttonText));
    noFilesTextDiv = section().text(resolvedOptions.noFilesText);
    selectedFiles = section().classed('hx-file-input-selected', true).add(noFilesTextDiv);
    // Regex for checking for image mime type
    imageType = /^image\//;
    filePreview = function(file) {
      var container, image, img, reader, remove, text;
      if (imageType.test(file.type)) {
        img = detached('img').node();
        img.file = file;
        reader = new FileReader();
        reader.onloadend = function(e) {
          return img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        image = section({
          fixed: true
        }).classed('hx-file-input-preview-image', true).add(img);
      }
      container = group().classed('hx-file-input-preview', true);
      text = section().classed('hx-file-input-preview-text', true).text(file.name);
      remove = section({
        fixed: true
      }).classed('hx-file-input-preview-remove hx-text-negative', true).add(i('hx-icon hx-icon-close')).on('click', function() {
        self._.fileMap.delete(getFileUID(file));
        container.remove();
        return handleFiles(self._.fileMap);
      });
      return container.add(text).add(image).add(remove);
    };
    handleFiles = function (fileMap) {
      var filesSelectedText, length, localizedLength;
      selectedFiles.clear().classed('hx-btn', false).off('click', 'hx.file-input');
      length = fileMap.size;
      if (length) {
        if (length === 1) {
          if (dropdown.isOpen()) {
            dropdown.hide();
          }
          selectedFiles.append(filePreview(fileMap.values()[0]));
        } else {
          localizedLength = length.toLocaleString(preferences.locale());
          filesSelectedText = resolvedOptions.filesSelectedText.replace('$numFiles', localizedLength);
          selectedFiles.classed('hx-btn', true).add(section().text(filesSelectedText)).add(i('hx-file-input-dropdown-icon hx-icon hx-icon-chevron-down')).on('click', 'hx.file-input', function() {
            return dropdown.show();
          });
        }
      } else {
        selectedFiles.append(noFilesTextDiv);
      }
      this$1._.fileMap = fileMap;
      return this$1.emit('change', {
        cause: 'user',
        data: this$1._.fileMap.values()
      });
    };
    dropdownDiv = div();
    // XXX Breaking: Renderer
    // setupDropdown = () ->
    //   sel = div()
    //   self._.fileMap.values().map (file) ->
    //     sel.append filePreview(file)
    //   sel
    setupDropdown = function(element) {
      var sel;
      sel = select(element);
      return self._.fileMap.values().map(function(file) {
        return sel.append(filePreview(file));
      });
    };
    dropdown = new Dropdown(dropdownDiv, setupDropdown, {
      ddClass: 'hx-file-input-dropdown'
    });
    this._ = {
      options: resolvedOptions,
      fiInput: fiInput,
      fiButton: fiButton,
      selectedFiles: selectedFiles,
      noFilesTextDiv: noFilesTextDiv,
      fileMap: new Map()
    };
    if (resolvedOptions.dragEnabled) {
      preventDefault = function(e) {
        e.preventDefault();
        return e.stopPropagation();
      };
      drop = function(e) {
        var files;
        preventDefault(e);
        if (!self._.disabled) {
          files = e.dataTransfer.files;
          return handleFiles(fileListToMap(files, acceptedExtensions, this, resolvedOptions));
        }
      };
      selection.on('dragenter', preventDefault).on('dragover', preventDefault).on('drop', drop);
    }
    if (resolvedOptions.disabled) {
      this.disabled(resolvedOptions.disabled);
    }
    selection.add(fiInput).add(fiGroup.add(fiButton).add(selectedFiles)).add(dropdownDiv);
  }

  if ( EventEmitter ) FileInput.__proto__ = EventEmitter;
  FileInput.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  FileInput.prototype.constructor = FileInput;

  FileInput.prototype.disabled = function disabled (disabled$1) {
    var disabledAttr;
    if (arguments.length) {
      disabledAttr = disabled$1 ? 'disabled' : void 0;
      this._.fiInput.attr('disabled', disabledAttr);
      this._.fiButton.attr('disabled', disabledAttr);
      this._.selectedFiles.classed('hx-text-disabled hx-background-disabled', disabled$1);
      this._.disabled = disabled$1;
      if (disabled$1) {
        this.value(void 0);
      }
      return this;
    } else {
      return this._.disabled || false;
    }
  };

  FileInput.prototype.value = function value (value$1) {
    if (arguments.length) {
      if (value$1 != null) {
        logger.warn('FileInput::value', 'It is not possible to set the value of a file input for security reasons. The value can only be cleared by passing in "undefined"');
      } else {
        this._.fiInput.value('');
        this._.selectedFiles.clear().classed('hx-btn', false).off('click', 'hx.file-input');
        this._.selectedFiles.append(this._.noFilesTextDiv);
        this._.fileMap = new Map();
      }
      return this;
    } else {
      return this._.fileMap.values();
    }
  };

  return FileInput;
}(EventEmitter));

var fileInput = function(options) {
  var selection;
  selection = div();
  new FileInput(selection, options);
  return selection;
};

exports.userFacingText({
  singleSelect: {
    chooseValue: 'Choose a value...',
    search: 'Search...',
    loading: 'Loading...',
    noResults: 'No Results Found',
    otherResults: 'Other Results',
    pleaseSelectAValueText: 'Please select a value from the list',
  },
});

var enterKeyCode$1 = 13;
var debounceDuration$1 = 200;

function validateItems$1(feed, items) {
  if (!feed.validateItems(items)) {
    logger.warn(("SingleSelect: the items was expected to be an array of items or a function, you supplied: " + items));
    return false;
  }
  return true;
}

function setValue$2(ss, value, cause) {
  var assign;

  var _ = ss._;
  _.valueInput.value('');
  _.current = undefined;
  if (value) {
    if (value.children) {
      (assign = value.children, _.current = assign[0]);
    } else {
      _.current = value;
    }
  }
  _.valueInput.value(_.current ? _.valueLookup(_.current) : '');
  ss.emit('change', { cause: cause, value: _.current });
}

var SingleSelect = /*@__PURE__*/(function (EventEmitter) {
  function SingleSelect(selector, items, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

    EventEmitter.call(this);
    var defaultOptions = {
      // Options passed to the feed - defaultOptions defined there
      filter: undefined,
      filterOptions: undefined,
      matchType: undefined,
      useCache: undefined,
      trimTrailingSpaces: undefined,

      // Options used by the ss
      disabled: false,
      valueLookup: function (item) { return (item ? (item.value || item) : undefined); },
      renderer: function (element, item) {
        var sel = select(element);
        if (item && item.children) {
          sel.text(item.text);
        } else {
          sel.text(this$1._.options.valueLookup(item));
        }
      },
      value: undefined,
      showSearch: false,
      required: false,
      chooseValueText: exports.userFacingText('singleSelect', 'chooseValue'),
      searchText: exports.userFacingText('singleSelect', 'search'),
      loadingText: exports.userFacingText('singleSelect', 'loading'),
      noResultsText: exports.userFacingText('singleSelect', 'noResults'),
      pleaseSelectAValueText: exports.userFacingText('singleSelect', 'pleaseSelectAValueText'),
    };

    var resolvedOptions = exports.merge({}, defaultOptions, options);

    var filter = resolvedOptions.filter;
    var filterOptions = resolvedOptions.filterOptions;
    var matchType = resolvedOptions.matchType;
    var showOtherResults = resolvedOptions.showOtherResults;
    var trimTrailingSpaces = resolvedOptions.trimTrailingSpaces;
    var valueLookup = resolvedOptions.valueLookup;
    var useCache = resolvedOptions.useCache;
    var chooseValueText = resolvedOptions.chooseValueText;
    var required = resolvedOptions.required;
    var pleaseSelectAValueText = resolvedOptions.pleaseSelectAValueText;
    var noResultsText = resolvedOptions.noResultsText;
    var showSearch = resolvedOptions.showSearch;
    var searchText = resolvedOptions.searchText;
    var loadingText = resolvedOptions.loadingText;
    var renderer = resolvedOptions.renderer;
    var value = resolvedOptions.value;
    var disabled = resolvedOptions.disabled;

    var selection = select(selector);

    var valueInput = input('hx-input hx-single-select-value')
      .attr('placeholder', chooseValueText)
      .attr('tabindex', -1)
      .attr('required', required ? true : undefined);

    var setValidity = function (val) {
      var node = valueInput.node();
      if (val === undefined) {
        node.setCustomValidity(pleaseSelectAValueText);
      } else {
        node.setCustomValidity('');
      }
    };

    var shouldDebounce = exports.isFunction(items);

    var feed = new exports.AutocompleteFeed({
      filter: filter,
      filterOptions: filterOptions,
      matchType: matchType,
      showOtherResults: showOtherResults,
      trimTrailingSpaces: trimTrailingSpaces,
      valueLookup: valueLookup,
      useCache: useCache,
    });

    var noResultsItem = {
      text: noResultsText,
      unselectable: true,
    };

    var loadingItem = {
      text: loadingText,
      unselectable: true,
    };

    this._ = {
      selection: selection,
      options: resolvedOptions,
      valueInput: valueInput,
      feed: feed,
      valueLookup: valueLookup,
    };
    if (!validateItems$1(feed, items)) {
      return;
    }
    feed.items(items);
    // XXX Breaking: Renderer
    var renderWrapper = function (element, item) {
      var sel = select(element);
      sel.classed('hx-single-select-heading', item.heading);
      if (item.unselectable || item.heading) {
        sel.text(item.text);
        return;
      }
      this$1._.renderer(element, item);
    };

    var searchInput = detached('input').class('hx-input hx-single-select-input')
      .attr('placeholder', searchText);

    var menu = new MenuBase(selection, {
      dropdownOptions: {
        ddClass: 'hx-single-select-dropdown',
      },
      featureFlags: {
        useUpdatedStructure: true,
      },
      extraContent: showSearch ? div('hx-single-select-input-container').add(searchInput) : undefined,
    });

    var renderMenuItems = function (itemsToRender) {
      menu.items(itemsToRender);
      menu.render();
    };

    var filterAndRenderMenu = function (term) { return (
      feed.filter(term, function (results) {
        if (results.length === 0) {
          results.push(noResultsItem);
        }
        renderMenuItems(results);
      })
    ); };

    var debouncedPopulate = exports.debounce(debounceDuration$1, filterAndRenderMenu);

    var setValueAndHide = function (item) {
      setValue$2(this$1, item, 'user');
      menu.hide();
    };

    searchInput
      .on('input', function (e) {
        if (shouldDebounce) {
          renderMenuItems([loadingItem]);
          debouncedPopulate(e.target.value);
          return;
        }
        filterAndRenderMenu(e.target.value);
      })
      .on('keydown', function (e) {
        if (searchInput.value().length) {
          if ((e.which || e.keyCode) === enterKeyCode$1 && menu.cursorPos === -1) {
            var ref = menu.items();
            var topItem = ref[0];
            if (!topItem.unselectable) {
              setValueAndHide(topItem);
            }
          }
        }
      });

    this._.renderer = renderer || menu.renderer();
    this._.menu = menu;

    menu
      .renderer(renderWrapper)
      .on('change', function (item) {
        if ((item != null) && (item.content != null)) {
          setValueAndHide(item.content);
        }
      })
      .on('highlight', 'hx.single-select', function (ref) {
        var content = ref.content;
        var eventType = ref.eventType;

        return this$1.emit('highlight', {
        cause: 'user',
        value: {
          item: content,
          eventType: eventType,
        },
      });
    });

    menu.dropdown
      .on('showstart', function () {
        searchInput.value('');
        renderMenuItems([loadingItem]);
        filterAndRenderMenu(searchInput.value());
        searchInput.node().focus();
      })
      .on('showend', function () { return searchInput.node().focus(); });

    menu.dropdown.pipe(this, 'dropdown');

    if (value) {
      this.value(value);
    }
    if (disabled) {
      this.disabled(disabled);
    }

    if (required) {
      setValidity();
      this.on('change', 'hx.single-select', function (event) { return setValidity(event.value); });
    }

    selection
      .add(valueInput)
      .add(span('hx-single-select-icon').add(i('hx-icon hx-icon-caret-down')))
      .classed('hx-single-select', true)
      .api('single-select', this)
      .api(this);
  }

  if ( EventEmitter ) SingleSelect.__proto__ = EventEmitter;
  SingleSelect.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  SingleSelect.prototype.constructor = SingleSelect;

  SingleSelect.prototype.clearCache = function clearCache () {
    this._.feed.clearCache();
    return this;
  };

  SingleSelect.prototype.hide = function hide () {
    this._.menu.hide();
    return this;
  };

  SingleSelect.prototype.disabled = function disabled (disable) {
    var menuDisable = this._.menu.disabled(disable);
    // menu.disabled returns the wrong 'this' so we return the correct things below
    if (disable != null) {
      this._.valueInput.attr('disabled', disable ? 'disabled' : undefined);
      return this;
    }
    return menuDisable;
  };

  SingleSelect.prototype.items = function items (items$1) {
    if (arguments.length) {
      if (validateItems$1(this._.feed, items$1)) {
        this._.feed.items(items$1);
        this.value(this._.current);
      }
      return this;
    }
    return this._.feed.items();
  };

  SingleSelect.prototype.value = function value (value$1, callback) {
    var this$1 = this;

    var ref = this;
    var _ = ref._;
    if (arguments.length) {
      if (value$1) {
        _.valueInput.value(_.options.loadingText);
        _.feed.filter(_.valueLookup(value$1), function (results) {
          var retVal = results[0];
          setValue$2(this$1, retVal, 'api');
          return typeof callback === 'function' ? callback(retVal) : undefined;
        });
      } else {
        setValue$2(this, undefined, 'api');
      }
      return this;
    }
    return _.current;
  };

  SingleSelect.prototype.renderer = function renderer (renderer$1) {
    if (renderer$1 != null) {
      this._.renderer = renderer$1;
      return this;
    }
    return this._.renderer;
  };

  return SingleSelect;
}(EventEmitter));

function singleSelect(items, options) {
  var selection = div();
  new SingleSelect(selection, items, options);
  return selection;
}

var getButtons,
  hasProp = {}.hasOwnProperty,
  boundMethodCheck$1 = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

// XXX: Refactor into constructor in next major
getButtons = function(form, createIfEmpty) {
  if ( createIfEmpty === void 0 ) createIfEmpty = true;

  var buttons, sel, selection;
  selection = select(form.selector);
  sel = selection.select('.hx-form-buttons');
  return buttons = createIfEmpty && sel.empty() ? selection.append('div').class('hx-form-buttons') : sel;
};

var Form = /*@__PURE__*/(function (EventEmitter) {
  function Form(selector, options) {
    EventEmitter.call(this);
    this.addButton = this.addButton.bind(this);
    this.selector = selector;
    this.options = exports.merge({
      featureFlags: {
        useUpdatedStructure: false, // Whether to use the new form classes
        displayVertical: false
      }
    }, options);
    if (this.options.featureFlags.displayVertical) {
      this.options.featureFlags.useUpdatedStructure = true;
    }
    this.formId = 'form-' + exports.randomId() + '-';
    this.properties = new Map();
    select(this.selector).classed('hx-form', true).classed('hx-flag-form hx-flag-button', this.options.featureFlags.useUpdatedStructure).classed('hx-form-vertical', this.options.featureFlags.useUpdatedStructure && this.options.featureFlags.displayVertical).api('form-builder', this).api(this).on('keypress', 'hx.form-builder', function(e) {
      var target;
      target = select(e.target || e.srcElement);
      if (e.keyCode === 13 && target.attr('type') !== 'submit' && target.attr('type') !== 'textarea') {
        return e.preventDefault();
      }
    });
  }

  if ( EventEmitter ) Form.__proto__ = EventEmitter;
  Form.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Form.prototype.constructor = Form;

  Form.prototype.submit = function submit () {
    var assign;

    var errors, valid;
    ((assign = validateForm(this.selector), valid = assign.valid, errors = assign.errors));
    if (valid) {
      this.emit('submit', this.data());
    }
    return this;
  };

  Form.prototype.data = function data (data$1) {
    var this$1 = this;

    var key, result, value;
    if (arguments.length > 0) {
      for (key in data$1) {
        if (!hasProp.call(data$1, key)) { continue; }
        value = data$1[key];
        this.value(key, value);
      }
      return this;
    } else {
      result = {};
      this.properties.forEach(function (key, it) {
        if (!it.options.hidden && it.type !== 'button') {
          return result[key] = this$1.value(key);
        }
      });
      return result;
    }
  };

  Form.prototype.option = function option (optionKey, setFnKey, property, value) {
    var this$1 = this;

    var prop, res;
    if (exports.isArray(property)) {
      res = property.map(function (prop) {
        return this$1[optionKey](prop, value);
      });
      if (value != null) {
        return this;
      } else {
        return res;
      }
    } else if (this.properties.has(property)) {
      prop = this.properties.get(property);
      if (value != null) {
        prop.options[optionKey] = value;
        prop[setFnKey](value);
        this.properties.set(property, prop);
        return this;
      } else {
        return !!prop.options[optionKey];
      }
    }
  };

  Form.prototype.hidden = function hidden (property, hidden$1) {
    return this.option('hidden', 'hide', property, hidden$1);
  };

  Form.prototype.disabled = function disabled (property, disabled$1) {
    return this.option('disabled', 'disable', property, disabled$1);
  };

  Form.prototype.errorMessage = function errorMessage (property, value) {
    var node;
    node = this.node(property);
    if (arguments.length > 1) {
      if (value == null) {
        value = '';
      }
      if (node) {
        if (node.setCustomValidity) {
          node.setCustomValidity(value);
        } else {
          select(node).selectAll('input').nodes.map(function(e) {
            return e.setCustomValidity(value);
          });
        }
      }
      return this;
    } else {
      if (node) {
        if (node.setCustomValidity) {
          return node.validationMessage;
        } else {
          return select(node).select('input').node.validationMessage;
        }
      }
    }
  };

  Form.prototype.value = function value (property, value$1) {
    var prop;
    if (this.properties.has(property)) {
      prop = this.properties.get(property);
      if (arguments.length > 1) {
        return prop.setValue(value$1);
      } else {
        if (!prop.options.hidden) {
          return prop.getValue();
        }
      }
    }
  };

  Form.prototype.component = function component (property) {
    var prop;
    if ((prop = this.properties.get(property)) != null) {
      return prop.component || select(prop.elem).api(prop.type);
    }
  };

  Form.prototype.node = function node (property) {
    var prop;
    if ((prop = this.properties.get(property)) != null) {
      return prop.elem.node();
    }
  };

  Form.prototype.add = function add (name, type, f) {
    var entry, formSel, id, key, prop, selection;
    id = this.formId + name.split(' ').join('-');
    formSel = select(this.selector);
    entry = formSel.append('div').classed('hx-form-group', this.options.featureFlags.useUpdatedStructure);
    // Append buttons container to the end of the form
    formSel.append(getButtons(this, false));
    entry.append('label').classed('hx-form-label', this.options.featureFlags.useUpdatedStructure).attr('for', id).text(name);
    prop = f.call(this) || {};
    key = prop.key || name;
    selection = entry.append(prop.elem).attr('id', id);
    // Define the default function for enabling/disabling a form property
    if (prop.disable == null) {
      prop.disable = function(disable) {
        if (prop.component) {
          return prop.component.disabled(disable);
        } else {
          return selection.attr('disabled', disable ? 'disabled' : void 0);
        }
      };
    }
    prop.hide = function(hide) {
      return entry.style('display', hide ? 'none' : '');
    };
    if (prop.setValue == null) {
      prop.setValue = function(value) {
        if (prop.component) {
          return prop.component.value(value);
        } else {
          return prop.elem.value(value);
        }
      };
    }
    if (prop.getValue == null) {
      prop.getValue = function() {
        var base;
        if (prop.component) {
          return typeof (base = prop.component).value === "function" ? base.value() : void 0;
        } else {
          return prop.elem.value();
        }
      };
    }
    this.properties.set(key, {
      type: type,
      elem: prop.elem,
      component: prop.component,
      getValue: prop.getValue,
      setValue: prop.setValue,
      disable: prop.disable,
      hide: prop.hide,
      options: prop.options
    });
    if (prop.options.hidden) {
      this.hidden(key, true);
    }
    if (prop.options.disabled) {
      this.disabled(key, true);
    }
    return this;
  };

  Form.prototype.addButton = function addButton (text, action, opts) {
    var this$1 = this;
    if ( opts === void 0 ) opts = {};

    var elem, formBtn, id, options;
    boundMethodCheck$1(this, Form);
    id = this.formId + text.split(" ").join("-");
    options = exports.merge({
      key: text,
      context: 'action',
      buttonType: 'button',
      icon: void 0,
      hidden: false,
      disabled: false
    }, opts);
    formBtn = button(("hx-btn hx-" + (options.context))).attr('type', options.buttonType).attr('id', id).add((!this.options.featureFlags.useUpdatedStructure) && options.icon ? i(options.icon) : void 0).add(span().text(" " + text)).on('click', 'hx.form-builder', function (e) {
      e.preventDefault();
      return typeof action === "function" ? action(this$1.data()) : void 0;
    });
    elem = this.options.featureFlags.useUpdatedStructure ? formBtn : div().add(formBtn);
    getButtons(this).add(elem);
    this.properties.set(options.key, {
      type: 'button',
      elem: elem,
      options: {
        hidden: options.hidden,
        disabled: options.disabled
      },
      disable: function(disabled) {
        return formBtn.attr('disabled', disabled ? 'disabled' : void 0);
      },
      hide: function(hide) {
        return elem.style('display', hide ? 'none' : '');
      }
    });
    if (options.hidden) {
      this.hidden(options.key, options.hidden);
    }
    if (options.disabled) {
      this.disabled(options.key, options.disabled);
    }
    return this;
  };

  Form.prototype.addSubmit = function addSubmit (text, icon, submitAction, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

    var defaultSubmitAction;
    defaultSubmitAction = function () {
      return this$1.submit();
    };
    return this.addButton(text, submitAction || defaultSubmitAction, {
      key: text || options.key,
      context: options.context || 'action',
      buttonType: 'submit',
      icon: icon,
      hidden: options.hidden,
      disabled: options.disabled
    });
  };

  Form.prototype.addText = function addText (name, options) {
    if ( options === void 0 ) options = {};

    if (options.type == null) {
      options.type = 'text';
    }
    if (options.attrs == null) {
      options.attrs = [];
    }
    return this.add(name, 'text', function() {
      var attr, component, elem, j, len, ref;
      elem = detached('input').attr('type', options.type).classed('hx-input', this.options.featureFlags.useUpdatedStructure);
      if (options.autoCompleteData || options.autoCompleteOptions) {
        logger.deprecated('Form::addText autoCompleteData/Options', 'Deprecated in favour of using the correct casing (autocompleteData and autocompleteOptions)');
        options.autocompleteData = options.autocompleteData || options.autoCompleteData;
        options.autocompleteOptions = options.autocompleteOptions || options.autoCompleteOptions;
      }
      if ((options.autocompleteData != null) && options.type !== 'password' && options.type !== 'number') {
        component = new exports.Autocomplete(elem, options.autocompleteData, options.autocompleteOptions != null ? options.autocompleteOptions : options.autocompleteOptions = void 0);
      }
      if (options.placeholder != null) {
        elem.attr('placeholder', options.placeholder);
      }
      if (options.required) {
        elem.attr('required', options.required);
      }
      ref = options.attrs;
      for (j = 0, len = ref.length; j < len; j++) {
        attr = ref[j];
        elem.attr(attr.type, attr.value);
      }
      if (options.validator != null) {
        elem.node().oninput = function (e) {
          return e.target.setCustomValidity(options.validator(e) || '');
        };
      }
      if (options.value) {
        elem.node().value = options.value;
      }
      return {
        key: options.key,
        elem: elem,
        component: component,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addEmail = function addEmail (name, options) {
    if ( options === void 0 ) options = {};

    options.type = 'email';
    return this.addText(name, options);
  };

  Form.prototype.addUrl = function addUrl (name, options) {
    if ( options === void 0 ) options = {};

    options.type = 'url';
    return this.addText(name, options);
  };

  Form.prototype.addPassword = function addPassword (name, options) {
    if ( options === void 0 ) options = {};

    options.type = 'password';
    return this.addText(name, options);
  };

  Form.prototype.addNumber = function addNumber (name, options) {
    if ( options === void 0 ) options = {};

    options.type = 'number';
    options.attrs = [
      {
        type: 'step',
        value: options.step
      }
    ];
    if (options.min != null) {
      options.attrs.push({
        type: 'min',
        value: options.min
      });
    }
    if (options.max != null) {
      options.attrs.push({
        type: 'max',
        value: options.max
      });
    }
    return this.addText(name, options);
  };

  Form.prototype.addTextArea = function addTextArea (name, options) {
    if ( options === void 0 ) options = {};

    if (options.attrs == null) {
      options.attrs = [];
    }
    return this.add(name, 'textarea', function() {
      var attr, elem, j, len, ref;
      elem = detached('textarea').classed('hx-input-textarea', this.options.featureFlags.useUpdatedStructure);
      if (options.placeholder != null) {
        elem.attr('placeholder', options.placeholder);
      }
      if (options.required) {
        elem.attr('required', options.required);
      }
      ref = options.attrs;
      for (j = 0, len = ref.length; j < len; j++) {
        attr = ref[j];
        elem.attr(attr.type, attr.value);
      }
      if (options.validator != null) {
        elem.node().oninput = function (e) {
          return e.target.setCustomValidity(options.validator(e) || '');
        };
      }
      if (options.value) {
        elem.node().value = options.value;
      }
      return {
        key: options.key,
        elem: elem,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addCheckbox = function addCheckbox (name, options) {
    if ( options === void 0 ) options = {};

    return this.add(name, 'checkbox', function() {
      var elem, getValue, input, setValue;
      input = detached('input').attr('type', 'checkbox').classed('hx-input-checkbox', this.options.featureFlags.useUpdatedStructure);
      elem = this.options.featureFlags.useUpdatedStructure ? div('hx-form-items').add(div('hx-form-item').add(input)) : input;
      if (options.required != null) {
        input.attr('required', options.required);
      }
      if (options.value) {
        input.prop('checked', true);
      }
      setValue = function(value) {
        return input.prop('checked', value);
      };
      getValue = function() {
        return input.prop('checked');
      };
      return {
        key: options.key,
        elem: elem,
        getValue: getValue,
        setValue: setValue,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addRadio = function addRadio (name, values, options) {
    if ( options === void 0 ) options = {};

    var self;
    self = this;
    return this.add(name, 'radio', function() {
      var count, elem, getValue, id, input, item, j, len, setValue, value;
      elem = div().classed('hx-form-items', this.options.featureFlags.useUpdatedStructure);
      id = self.formId + name.split(' ').join('-');
      count = 0;
      for (j = 0, len = values.length; j < len; j++) {
        value = values[j];
        item = div('hx-radio-container').classed('hx-form-item', this.options.featureFlags.useUpdatedStructure);
        input = item.append('input').classed('hx-input-radio', this.options.featureFlags.useUpdatedStructure).attr('type', 'radio').attr('name', id).attr('id', id + '-' + count).value(value);
        if (options.required != null) {
          input.attr('required', options.required);
        }
        if (options.value === value) {
          input.prop('checked', true);
        }
        item.append('label').classed('hx-form-label', this.options.featureFlags.useUpdatedStructure).attr('for', id + '-' + count).text(value);
        elem.add(item);
        count += 1;
      }
      getValue = function() {
        return elem.select('input:checked').value();
      };
      setValue = function(value) {
        return elem.selectAll('input').filter(function(d) {
          return d.value() === value;
        }).prop('checked', true);
      };
      return {
        key: options.key,
        elem: elem,
        getValue: getValue,
        setValue: setValue,
        disable: function(disable) {
          return elem.selectAll('input').attr('disabled', disable ? true : void 0);
        },
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addToggle = function addToggle (name, options) {
    if ( options === void 0 ) options = {};
    return this.add(name, 'toggle', function() {
      var component, componentElem;
      componentElem = div('hx-btn hx-btn-invisible hx-no-pad-left');
      component = new exports.Toggle(componentElem, options.toggleOptions);
      return {
        key: options.key,
        elem: div().add(componentElem),
        component: component,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addPicker = function addPicker (name, values, options) {
    if ( options === void 0 ) options = {};

    return this.add(name, 'picker', function() {
      var component, componentElem, hiddenInput, pickerOptions, setValidity;
      componentElem = button(options.buttonClass).attr('type', 'button').style('position', 'relative');
      pickerOptions = exports.merge({}, options.pickerOptions);
      if (values.length > 0) {
        pickerOptions.items = values;
      }
      component = new exports.Picker(componentElem, pickerOptions);
      hiddenInput = detached('input').class('hx-form-builder-hidden-form-input').attr('size', 0);
      if (typeof options.required !== 'boolean') {
        component.value(values[0]);
      }
      setValidity = function() {
        return hiddenInput.node().setCustomValidity(exports.userFacingText('form', 'pleaseSelectAValue'));
      };
      if (options.required) {
        setValidity();
        component.on('change', 'hx.form-builder', function(ref) {
          var value = ref.value;
          var cause = ref.cause;

          if (value === void 0) {
            return setValidity();
          } else {
            return hiddenInput.node().setCustomValidity('');
          }
        });
      }
      return {
        key: options.key,
        elem: div().add(componentElem).add(hiddenInput),
        component: component,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addDatePicker = function addDatePicker (name, options) {
    if ( options === void 0 ) options = {};

    return this.add(name, 'date-picker', function() {
      var component, componentElem, dpOpts, getValue, setValue;
      componentElem = this.options.featureFlags.useUpdatedStructure ? detached('input').class('hx-input') : div();
      dpOpts = this.options.featureFlags.useUpdatedStructure ? exports.merge({}, options.datePickerOptions, {
        v2Features: {
          dontModifyDateOnError: true,
          displayLongMonthInCalendar: true,
          dontSetInitialInputValue: true,
          updateVisibleMonthOnDateChange: true
        }
      }) : options.datePickerOptions;
      component = new exports.DatePicker(componentElem, dpOpts);
      if ((options.validStart != null) || (options.validEnd != null)) {
        component.validRange(options.validStart, options.validEnd);
      }
      if (options.selectRange != null) {
        getValue = function() {
          return component.range();
        };
        setValue = function(value) {
          return component.range(value.startDate, value.endDate, false, true);
        };
        if ((options.startDate != null) && (options.endDate != null)) {
          component.range(options.startDate, options.endDate, false, true);
        }
      } else {
        getValue = function() {
          return component.date();
        };
        setValue = function(value) {
          return component.date(value);
        };
      }
      return {
        key: options.key,
        elem: div().add(componentElem),
        component: component,
        getValue: getValue,
        setValue: setValue,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addTimePicker = function addTimePicker (name, options) {
    if ( options === void 0 ) options = {};

    return this.add(name, 'time-picker', function() {
      var component, componentElem, getValue, setValue;
      componentElem = div();
      component = new exports.TimePicker(componentElem, options.timePickerOptions);
      getValue = function() {
        return component.date();
      };
      setValue = function(value) {
        return component.date(value);
      };
      return {
        key: options.key,
        elem: div().add(componentElem),
        component: component,
        getValue: getValue,
        setValue: setValue,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addDateTimePicker = function addDateTimePicker (name, options) {
    if ( options === void 0 ) options = {};

    return this.add(name, 'date-time-picker', function() {
      var component, componentElem, getValue, setValue;
      componentElem = div();
      component = new DateTimePicker(componentElem, options.dateTimePickerOptions);
      getValue = function() {
        return component.date();
      };
      setValue = function(value) {
        return component.date(value);
      };
      return {
        key: options.key,
        elem: div().add(componentElem),
        component: component,
        getValue: getValue,
        setValue: setValue,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addTagInput = function addTagInput (name, options) {
    if ( options === void 0 ) options = {};
    return this.add(name, 'tag-input', function() {
      var base, change, component, componentElem, getValue, input, setValidity, setValue, tiOpts;
      componentElem = div();
      tiOpts = this.options.featureFlags.useUpdatedStructure ? exports.merge({}, options.tagInputOptions, {
        featureFlags: {
          useInputClass: true
        }
      }) : options.tagInputOptions;
      if (options.placeholder) {
        if (options.tagInputOptions == null) {
          options.tagInputOptions = {};
        }
        if ((base = options.tagInputOptions).placeholder == null) {
          base.placeholder = options.placeholder;
        }
      }
      if (options.tagInputOptions == null) {
        options.tagInputOptions = {};
      }
      options.tagInputOptions.isInsideForm = true;
      component = new exports.TagInput(componentElem, tiOpts);
      getValue = function() {
        return component.items();
      };
      setValue = function(items) {
        return component.items(items);
      };
      if (options.required) {
        input = componentElem.select('input');
        setValidity = function() {
          return input.node().setCustomValidity(exports.userFacingText('form', 'pleaseAddAValue'));
        };
        change = function() {
          var value;
          value = component.items();
          if (value === void 0 || !value.length) {
            return setValidity();
          } else {
            return input.node().setCustomValidity('');
          }
        };
        setValidity();
        component.on('add', 'hx.form-builder', change);
        component.on('remove', 'hx.form-builder', change);
      }
      return {
        key: options.key,
        elem: div().add(componentElem),
        component: component,
        getValue: getValue,
        setValue: setValue,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addFileInput = function addFileInput (name, options) {
    if ( options === void 0 ) options = {};
    return this.add(name, 'file-input', function() {
      var component, componentElem;
      componentElem = div();
      component = new FileInput(componentElem, options.fileInputOptions);
      return {
        key: options.key,
        elem: div().add(componentElem),
        component: component,
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addAutocompletePicker = function addAutocompletePicker (name, values, options) {
    if ( options === void 0 ) options = {};

    return this.add(name, 'select', function() {
      var autocompletePickerOptions, component, componentElem, input, setValidity;
      componentElem = button().attr('type', 'button').class(options.buttonClass);
      autocompletePickerOptions = exports.merge({
        buttonClass: options.buttonClass
      }, options.autocompletePickerOptions);
      if (values.length > 0) {
        autocompletePickerOptions.items = values;
      }
      component = new exports.AutocompletePicker(componentElem, values, autocompletePickerOptions);
      input = componentElem.append('input').class('hx-form-builder-hidden-form-input').attr('size', 0);
      componentElem.style('position', 'relative');
      if (typeof options.required !== 'boolean') {
        component.value(values[0]);
      }
      setValidity = function() {
        return input.node().setCustomValidity(exports.userFacingText('form', 'pleaseSelectAValue'));
      };
      if (options.required) {
        setValidity();
        component.on('change', 'hx.form-builder', function(ref) {
          var value = ref.value;
          var cause = ref.cause;

          if (value === void 0) {
            return setValidity();
          } else {
            return input.node().setCustomValidity('');
          }
        });
      }
      return {
        key: options.key,
        elem: div().add(componentElem),
        component: component,
        disable: function(disabled) {
          return component.disabled(disabled);
        },
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  Form.prototype.addSingleSelect = function addSingleSelect (name, items, options) {
    if ( options === void 0 ) options = {};

    return this.add(name, 'select', function() {
      var assign;

      var component, componentElem, required, singleSelectOptions;
      componentElem = div();
      ((assign = options, required = assign.required));
      singleSelectOptions = exports.merge({required: required}, options.singleSelectOptions);
      component = new SingleSelect(componentElem, items, singleSelectOptions);
      return {
        key: options.key,
        elem: componentElem,
        component: component,
        disable: function(disabled) {
          return component.disabled(disabled);
        },
        options: {
          hidden: options.hidden,
          disabled: options.disabled
        }
      };
    });
  };

  return Form;
}(EventEmitter));

exports.userFacingText({
  form: {
    pleaseSelectAValue: 'Please select a value from the list',
    pleaseAddAValue: 'Please add at least one item',
    missingRadioValue: 'Please select one of these options',
    missingValue: 'Please fill in this field',
    typeMismatch: 'Please enter a valid value for this field'
  }
});

exports.userFacingText({
  meter: {
    of: 'of'
  }
});

var Meter = /*@__PURE__*/(function (EventEmitter) {
  function Meter(selector, options) {
    var this$1 = this;

    var _, container, innerText, meterRandomId, selection, svg;
    EventEmitter.call(this);
    logger.deprecated('Meter is deprecated and will be removed from Hexagon in the next major release.');
    this._ = _ = {};
    _.data = {
      total: 0,
      completed: 0
    };
    this.options = exports.merge({
      useMarker: true,
      useTracker: true,
      trackerWidth: 0.03,
      progressWidth: 0.175,
      markerSize: 0.01,
      markerInnerExtend: 0.01,
      markerOuterExtend: -0.01,
      arcPadding: 0.02,
      markerPadding: 0.1,
      progressBackgroundCol: color(theme().palette.contrastCol).alpha(0.05).toString(),
      progressCol: theme().palette.positiveCol,
      trackerCol: color(theme().palette.positiveCol).alpha(0.5).toString(),
      trackerBackgroundCol: color(theme().palette.contrastCol).alpha(0.05).toString(),
      markerCol: theme().palette.contrastCol,
      valueFormatter: function(value, isTotal) {
        if (isTotal) {
          return ((exports.userFacingText('meter', 'of')) + " " + value);
        } else {
          return value;
        }
      },
      redrawOnResize: true
    }, options);
    meterRandomId = exports.randomId();
    _.selection = selection = select(selector).api('meter', this).api(this).classed('hx-meter', true).on('resize', function () {
      if (this$1.options.redrawOnResize) {
        return this$1.render('user');
      }
    });
    _.container = container = selection.append('div').class('hx-meter-container');
    _.svg = svg = container.append('svg').style('width', '100%').style('height', '100%');
    _.progressBackgroundArc = svg.append('path');
    _.progressArc = svg.append('path');
    _.trackerBackgroundArc = svg.append('path');
    _.trackerArc = svg.append('path');
    _.markerArc = svg.append('path');
    _.markerTextCurve = svg.append('defs').append('path').attr('id', meterRandomId);
    _.markerText = svg.append('g').append('text').class('hx-meter-marker-text').append('textPath').attr('xlink:href', '#' + meterRandomId);
    innerText = container.append('div').class('hx-meter-inner-text');
    _.completedText = innerText.append('div').class('hx-meter-completed');
    _.totalText = innerText.append('div').class('hx-meter-total');
    _.typeText = innerText.append('div').class('hx-meter-type');
  }

  if ( EventEmitter ) Meter.__proto__ = EventEmitter;
  Meter.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Meter.prototype.constructor = Meter;

  Meter.prototype.value = function value (data) {
    if (arguments.length > 0) {
      this._.data = exports.merge(this._.data, data);
      this.render();
      return this;
    } else {
      return this._.data;
    }
  };

  Meter.prototype.render = function render (cause) {
    if ( cause === void 0 ) cause = 'api';

    var _, container, data, i, markerProgress, markerR1, markerR2, markerWidth, options, path, points, progress, progressR1, progressR2, radius, selection, size, svg, textOffset, trackerProgress, trackerR1, trackerR2, updateArc, x, y;
    _ = this._;
    options = this.options;
    data = _.data;
    selection = _.selection;
    container = _.container;
    svg = _.svg;
    progress = Math.max(0, Math.min(1, (data.completed / data.total) || 0));
    trackerProgress = Math.max(0, Math.min(1, (data.tracker / data.total) || 0));
    markerProgress = Math.max(0, Math.min(1, (data.marker / data.total) || 0));
    _.completedText.text(options.valueFormatter(data.completed, false));
    _.totalText.text(options.valueFormatter(data.total, true));
    _.typeText.text(data.unitText);
    size = Math.min(selection.width(), selection.height() * 2);
    if (size > 0) {
      // 14 is the standard font size, 150 is the assumed size, and size is the actual
      // size of the container. This scales the fonts appropriately
      container.style('font-size', Math.round(14 / 150 * (size / 2)) + 'px');
      textOffset = 10 * (size / 2) / 150;
      x = size / 2;
      y = size / 2;
      markerR2 = 1 + options.markerOuterExtend;
      trackerR2 = options.useMarker ? 1 - options.markerPadding : 1;
      trackerR1 = trackerR2 - options.trackerWidth;
      if (options.useTracker) {
        progressR2 = trackerR1 - options.arcPadding;
      } else {
        progressR2 = options.useMarker ? 1 - options.markerPadding : 1;
      }
      progressR1 = progressR2 - options.progressWidth;
      markerR1 = progressR1 - options.markerInnerExtend;
      markerWidth = options.markerWidth;
      updateArc = function(selection, start, end, r1, r2, col) {
        var endRadians, innerRadius, outerRadius, padding, path, startRadians;
        innerRadius = size / 2 * r1;
        outerRadius = size / 2 * r2;
        startRadians = Math.PI + Math.PI * start;
        endRadians = Math.PI + Math.PI * end;
        padding = 0;
        path = arcCurve(x, y, innerRadius, outerRadius, startRadians, endRadians, padding);
        return selection.attr('d', path).attr('fill', col).style('visibility', void 0);
      };
      // update the inner container size to match the outer container
      container.style('width', size + 'px');
      container.style('height', size / 2 + 'px');
      // main progress
      updateArc(_.progressArc, 0, progress, progressR1, progressR2, options.progressCol);
      updateArc(_.progressBackgroundArc, progress, 1, progressR1, progressR2, options.progressBackgroundCol);
      // tracker progress
      if (options.useTracker) {
        updateArc(_.trackerArc, 0, trackerProgress, trackerR1, trackerR2, options.trackerCol);
        updateArc(_.trackerBackgroundArc, trackerProgress, 1, trackerR1, trackerR2, options.trackerBackgroundCol);
      } else {
        _.trackerArc.style('visibility', 'hidden');
        _.trackerBackgroundArc.style('visibility', 'hidden');
      }
      // marker
      if (options.useMarker) {
        radius = size / 2 - textOffset;
        points = (function() {
          var j, results;
          results = [];
          for (i = j = 0; j <= 100; i = ++j) {
            results.push({
              x: x + radius * Math.cos((i / 100 + 1) * Math.PI),
              y: y + radius * Math.sin((i / 100 + 1) * Math.PI)
            });
          }
          return results;
        })();
        path = svgCurve(points, false);
        _.markerTextCurve.attr('d', path);
        if (markerProgress < 0.5) {
          _.markerText.attr('startOffset', (markerProgress * 100 + 1) + '%').attr('text-anchor', 'start');
        } else {
          _.markerText.attr('startOffset', (markerProgress * 100 - 1) + '%').attr('text-anchor', 'end');
        }
        _.markerText.style('visibility', void 0).text(data.markerText);
        updateArc(_.markerArc, markerProgress - options.markerSize / 2, markerProgress + options.markerSize / 2, markerR1, markerR2, this.options.markerCol);
      } else {
        _.markerArc.style('visibility', 'hidden');
        _.markerText.style('visibility', 'hidden');
      }
      this.emit('render', {cause: cause, data: data});
    }
    return this;
  };

  return Meter;
}(EventEmitter));

var meter = function(options) {
  var selection;
  selection = detached('div');
  new Meter(selection.node(), options);
  return selection;
};

var Camera, Circle, ColorProperty, Composite, DiscreteProperty, DrawingColor, DrawingObject, Grid, Layer, Line, NumberProperty, PerformanceGauge, Point, Rectangle, Shape, Sidebar$1, StringProperty, Text, horizontalLineIntersection, pointRectangleIntersection, verticalLineIntersection;

pointRectangleIntersection = function(x, y, x1, y1, x2, y2) {
  return x1 <= x && x <= x2 && y1 <= y && y <= y2;
};

// more efficient check that can be done if one of the lines is horizontal
horizontalLineIntersection = function(x1, y1, x2, y2, xh1, xh2, y) {
  var ix;
  if (y1 === y2) {
    return y === y1 && (((xh1 <= x1 && x1 <= xh2)) || ((xh1 <= x2 && x2 <= xh2)) || (x1 < xh1 && x2 > xh2));
  } else {
    ix = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
    return xh1 <= ix && ix <= xh2;
  }
};

// more efficient check that can be done if one of the lines is vertical
verticalLineIntersection = function(x1, y1, x2, y2, yv1, yv2, x) {
  var iy;
  if (x1 === x2) {
    return x === x1 && (((yv1 <= y1 && y1 <= yv2)) || ((yv1 <= y2 && y2 <= yv2)) || (y1 < yv1 && y2 > yv2));
  } else {
    iy = y1 + (x - x1) * (y2 - y1) / (x2 - x1);
    return yv1 <= iy && iy <= yv2;
  }
};

//XXX: remove - replace with PointProperty
//XXX: what about the camera - it uses this class, but isn't a drawing primitive
Point = /*@__PURE__*/(function () {
  function Point(x5, y5) {
  if ( x5 === void 0 ) x5 = 0;
  if ( y5 === void 0 ) y5 = 0;

    this.x = x5;
    this.y = y5;
  }

  Point.prototype.set = function set (point) {
    this.x = point.x;
    return this.y = point.y;
  };

  Point.prototype.tweenTo = function tweenTo (point, mixAmount) {
    this.x += (point.x - this.x) * mixAmount;
    return this.y += (point.y - this.y) * mixAmount;
  };

  Point.prototype.distanceTo = function distanceTo (point) {
    return Math.sqrt((this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y));
  };

  Point.prototype.distanceToSquared = function distanceToSquared (point) {
    return (this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y);
  };

  return Point;
}());

ColorProperty = /*@__PURE__*/(function () {
  function ColorProperty(initial) {
    this.value = color();
    if (exports.defined(initial)) {
      this.set(initial);
    }
  }

  ColorProperty.prototype.set = function set (value, duration, callback) {
    var this$1 = this;

    var c, cb, ea, eb, eg, er, sa, sb, sg, sr, update;
    if (exports.defined(this.stop)) {
      this.stop();
      this.stop = void 0;
    }
    if (exports.defined(duration)) {
      sr = this.value.red();
      sg = this.value.green();
      sb = this.value.blue();
      sa = this.value.alpha();
      c = color(value);
      er = c.red();
      eg = c.green();
      eb = c.blue();
      ea = c.alpha();
      cb = callback ? function (cancelled) {
        this$1.stop = void 0;
        return callback(!cancelled, this$1.value);
      } : void 0;
      update = function (x, cancelled) {
        if (!cancelled) {
          this$1.value.red(sr + (er - sr) * x);
          this$1.value.green(sg + (eg - sg) * x);
          this$1.value.blue(sb + (eb - sb) * x);
          return this$1.value.alpha(sa + (ea - sa) * x);
        }
      };
      return this.stop = transition(duration, update, ease.linear, cb);
    } else {
      return this.value = color(value);
    }
  };

  return ColorProperty;
}());

NumberProperty = /*@__PURE__*/(function () {
  function NumberProperty(value1) {
    this.value = value1;
    this.stop = void 0;
  }

  NumberProperty.prototype.set = function set (value, duration, callback) {
    var this$1 = this;

    var cb, start, update;
    if (exports.defined(this.stop)) {
      this.stop();
      this.stop = void 0;
    }
    if (exports.defined(duration)) {
      start = this.value;
      cb = callback ? function (cancelled) {
        this$1.stop = void 0;
        return callback(!cancelled, this$1.value);
      } : void 0;
      update = function (x, cancelled) {
        if (!cancelled) {
          return this$1.value = start + (value - start) * x;
        }
      };
      return this.stop = transition(duration, update, ease.linear, cb);
    } else {
      return this.value = value;
    }
  };

  return NumberProperty;
}());

StringProperty = /*@__PURE__*/(function () {
  function StringProperty(value1) {
    this.value = value1;
    this.stop = void 0;
  }

  StringProperty.prototype.set = function set (value, duration, callback) {
    var this$1 = this;

    var interpolater, update;
    if (exports.defined(this.stop)) {
      this.stop();
      this.stop = void 0;
    }
    if (exports.defined(duration)) {
      interpolater = interpolate(this.value, value);
      update = function (x, cancelled) {
        if (!cancelled) {
          return this$1.value = interpolater(x);
        }
      };
      return this.stop = transition(duration, update, ease.linear);
    } else {
      return this.value = value;
    }
  };

  return StringProperty;
}());

// a property that cannot be animated
DiscreteProperty = /*@__PURE__*/(function () {
  function DiscreteProperty(value1) {
    this.value = value1;
  }

  DiscreteProperty.prototype.set = function set (value) {
    return this.value = value;
  };

  return DiscreteProperty;
}());

//XXX: rename to DrawingPrimitive
DrawingObject = /*@__PURE__*/(function () {
  function DrawingObject(id1) {
  if ( id1 === void 0 ) id1 = exports.randomId();

    this.id = id1;
    this.attr = new Map();
    this.properties = new Map();
    this.selectable = this.addDiscreteProperty('selectable');
    this.selected = false;
  }

  DrawingObject.prototype.addDiscreteProperty = function addDiscreteProperty (name, initial) {
    if ( initial === void 0 ) initial = false;

    var prop;
    prop = new DiscreteProperty(initial);
    this.properties.set(name, prop);
    return prop;
  };

  DrawingObject.prototype.addNumberProperty = function addNumberProperty (name, initial) {
    if ( initial === void 0 ) initial = 0;

    var prop;
    prop = new NumberProperty(initial);
    this.properties.set(name, prop);
    return prop;
  };

  DrawingObject.prototype.addColorProperty = function addColorProperty (name, initial) {
    if ( initial === void 0 ) initial = '#FFF';

    var prop;
    prop = new ColorProperty(initial);
    this.properties.set(name, prop);
    return prop;
  };

  DrawingObject.prototype.addStringProperty = function addStringProperty (name, initial) {
    if ( initial === void 0 ) initial = '';

    var prop;
    prop = new StringProperty(initial);
    this.properties.set(name, prop);
    return prop;
  };

  // callback will be called with up to two arguments:
  //  callback(reachedEnd, [valueAtInterrupt])
  DrawingObject.prototype.set = function set (name, value, duration, callback) {
    if (this.properties.has(name)) {
      this.properties.get(name).set(value, duration, callback);
    } else if (exports.startsWith(name, 'attr.')) {
      this.attr.set(name.substring(5), value);
    } else {
      console.warn('unknown property: ', name, Error().stack);
    }
    return this;
  };

  DrawingObject.prototype.get = function get (name) {
    if (this.properties.has(name)) {
      return this.properties.get(name).value;
    } else if (exports.startsWith(name, 'attr.')) {
      return this.attr.get(name.substring(5));
    } else {
      return void 0;
    }
  };

  DrawingObject.prototype.drawBoundingBox = function drawBoundingBox (ctx, drawing) {
    var bb, padding;
    //XXX: hardcoded colors
    bb = this.getBoundingBox(ctx);
    if (bb) {
      drawing.setStrokeColor(color('rgba(64, 64, 64, 1)'));
      padding = 2;
      drawing.setStrokeWidth(Math.min(1, 0.95 / drawing.camera.actualZoom));
      ctx.strokeRect(bb[0] - padding, bb[1] - padding, bb[2] - bb[0] + padding * 2, bb[3] - bb[1] + padding * 2);
      drawing.setFillColor(color('rgba(128, 128, 128, 0.1)'));
      return ctx.fillRect(bb[0] - padding, bb[1] - padding, bb[2] - bb[0] + padding * 2, bb[3] - bb[1] + padding * 2);
    }
  };

  DrawingObject.prototype.pointInBoundingBox = function pointInBoundingBox (p, ctx) {
    var bb;
    bb = this.getBoundingBox(ctx);
    return pointRectangleIntersection(p.x, p.y, bb[0], bb[1], bb[2], bb[3]);
  };

  return DrawingObject;
}());

//XXX: remove - replace with ColorProperty
DrawingColor = /*@__PURE__*/(function () {
  function DrawingColor() {
    this.c = color();
  }

  DrawingColor.prototype.set = function set (name, value) {
    switch (name) {
      case 'color':
        return this.c = color(value);
      case 'color.red':
        return this.c.red(exports.clamp(0, 255, value));
      case 'color.green':
        return this.c.green(exports.clamp(0, 255, value));
      case 'color.blue':
        return this.c.blue(exports.clamp(0, 255, value));
      case 'color.alpha':
        return this.c.alpha(exports.clampUnit(value));
    }
  };

  return DrawingColor;
}());

Text = /*@__PURE__*/(function (DrawingObject) {
  function Text() {
    DrawingObject.call(this);
    this.position = {
      x: this.addNumberProperty('position.x'),
      y: this.addNumberProperty('position.y')
    };
    this.color = this.addColorProperty('color');
    this.size = this.addNumberProperty('size', 12);
    this.align = {
      x: this.addDiscreteProperty('align.x', 'start'),
      y: this.addDiscreteProperty('align.y', 'top')
    };
    this.font = this.addDiscreteProperty('font', 'Helvetica,Arial');
    this.text = this.addStringProperty('text');
  }

  if ( DrawingObject ) Text.__proto__ = DrawingObject;
  Text.prototype = Object.create( DrawingObject && DrawingObject.prototype );
  Text.prototype.constructor = Text;

  Text.prototype.render = function render (ctx, drawing, cullOffsetX, cullOffsetY) {
    var bb, clip;
    bb = this.getBoundingBox(ctx);
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    if (bb[2] > clip[0] && bb[0] < clip[2] && bb[3] > clip[1] && bb[1] < clip[3]) {
      ctx.font = '12px ' + this.font.value;
      drawing.setFillColor(this.color.value);
      ctx.save();
      ctx.scale(this.size.value / 12, this.size.value / 12);
      //XXX: go through the drawing caching
      ctx.textAlign = this.align.x.value;
      ctx.textBaseline = this.align.y.value;
      ctx.fillText(this.text.value, this.position.x.value / (this.size.value / 12), this.position.y.value / (this.size.value / 12));
      ctx.restore();
      if (this.selected) {
        return this.drawBoundingBox(ctx, drawing);
      }
    }
  };

  Text.prototype.getWidth = function getWidth (ctx) {
    if (this.textWidth === void 0) {
      ctx.font = '12px ' + this.font.value;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.textWidth = ctx.measureText(this.text.value).width;
      ctx.restore();
    }
    return this.textWidth;
  };

  Text.prototype.getBoundingBox = function getBoundingBox (ctx) {
    var height, width, xoffset, yoffset;
    width = this.getWidth(ctx) * (this.size.value / 12);
    height = this.size.value;
    switch (this.align.x.value) {
      case "start":
        xoffset = 0;
        break;
      case "end":
        xoffset = width;
        break;
      case "center":
        xoffset = width / 2;
        break;
      default:
        xoffset = 0;
    }
    switch (this.align.y.value) {
      case "top":
        yoffset = 0;
        break;
      case "end":
        yoffset = height;
        break;
      case "middle":
        yoffset = height / 2;
        break;
      default:
        yoffset = 0;
    }
    return [this.position.x.value - xoffset, this.position.y.value - yoffset, this.position.x.value + width - xoffset, this.position.y.value + height - yoffset];
  };

  return Text;
}(DrawingObject));

Shape = /*@__PURE__*/(function (DrawingObject) {
  function Shape() {
    DrawingObject.call(this);
    this.position = {
      x: this.addNumberProperty('position.x'),
      y: this.addNumberProperty('position.y')
    };
    this.fill = {
      enabled: this.addDiscreteProperty('fill.enabled', true),
      color: this.addColorProperty('fill.color')
    };
    this.outline = {
      enabled: this.addDiscreteProperty('outline.enabled', false),
      width: this.addNumberProperty('outline.width'),
      color: this.addColorProperty('outline.color')
    };
    // There is no reason that this couldn't be animatable - it would just require a
    // new ArrayProperty type to deal with the animation
    this.curve = this.addDiscreteProperty('curve', []);
    // internal state - not a property
    this.type = '';
  }

  if ( DrawingObject ) Shape.__proto__ = DrawingObject;
  Shape.prototype = Object.create( DrawingObject && DrawingObject.prototype );
  Shape.prototype.constructor = Shape;

  Shape.prototype.set = function set (name, value, duration, callback) {
    if (name === 'curve') {
      this.type = 'curve';
    }
    if (name === 'polygon') {
      this.type = 'polygon';
      name = 'curve';
    }
    return DrawingObject.prototype.set.call(this, name, value, duration, callback);
  };

  Shape.prototype.get = function get (name) {
    if (name === 'polygon') {
      name = 'curve';
    }
    return DrawingObject.prototype.get.call(this, name);
  };

  Shape.prototype.render = function render (ctx, drawing, cullOffsetX, cullOffsetY) {
    var bb, clip, i, j, k, len, len1, p, point, ref, ref1;
    bb = this.getBoundingBox(ctx);
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    if (bb && bb[2] > clip[0] && bb[0] < clip[2] && bb[3] > clip[1] && bb[1] < clip[3]) {
      ctx.beginPath();
      if (this.type === 'polygon') {
        ref = this.curve.value;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          point = ref[i];
          if (i === 0) {
            ctx.moveTo(this.position.x.value + point[0], this.position.y.value + point[1]);
          } else {
            ctx.lineTo(this.position.x.value + point[0], this.position.y.value + point[1]);
          }
        }
      }
      if (this.type === 'curve') {
        ref1 = this.curve.value;
        for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
          p = ref1[i];
          if (i === 0) {
            ctx.moveTo(this.position.x.value + p[0], this.position.y.value + p[1]);
          } else {
            ctx.quadraticCurveTo(this.position.x.value + this.curve.value[i - 1][2], this.position.y.value + this.curve.value[i - 1][3], this.position.x.value + p[0], this.position.y.value + p[1]);
          }
        }
      }
      ctx.closePath();
      if (this.outline.enabled.value) {
        drawing.setStrokeColor(this.outline.color.value);
        drawing.setStrokeWidth(this.outline.width.value);
        ctx.stroke();
      }
      if (this.fill.enabled.value) {
        drawing.setFillColor(this.fill.color.value);
        ctx.fill();
      }
      if (this.selected) {
        return this.drawBoundingBox(ctx, drawing);
      }
    }
  };

  Shape.prototype.getBoundingBox = function getBoundingBox () {
    var i, j, k, len, len1, p, ref, ref1, x1, x2, y1, y2;
    if (this.type === 'polygon') {
      x1 = x2 = this.curve.value[0][0];
      y1 = y2 = this.curve.value[0][1];
      ref = this.curve.value;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        p = ref[i];
        if (p[0] < x1) {
          x1 = p[0];
        }
        if (p[1] < y1) {
          y1 = p[1];
        }
        if (p[0] > x2) {
          x2 = p[0];
        }
        if (p[1] > y2) {
          y2 = p[1];
        }
      }
      return [this.position.x.value + x1, this.position.y.value + y1, this.position.x.value + x2, this.position.y.value + y2];
    // This which won't be accurate at the edges. Doing perfect bounding
    // box detection for curves is not that easy, so can wait for now.
    // This simply calculates the bounding box for the control points and
    // actual points
    } else if (this.type === 'curve') {
      x1 = x2 = this.curve.value[0][0];
      y1 = y2 = this.curve.value[0][1];
      ref1 = this.curve.value;
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        p = ref1[i];
        if (p[0] < x1) {
          x1 = p[0];
        }
        if (p[1] < y1) {
          y1 = p[1];
        }
        if (p[0] > x2) {
          x2 = p[0];
        }
        if (p[1] > y2) {
          y2 = p[1];
        }
        if (p[2] < x1) {
          x1 = p[2];
        }
        if (p[3] < y1) {
          y1 = p[3];
        }
        if (p[2] > x2) {
          x2 = p[2];
        }
        if (p[3] > y2) {
          y2 = p[3];
        }
      }
      return [this.position.x.value + x1, this.position.y.value + y1, this.position.x.value + x2, this.position.y.value + y2];
    }
  };

  return Shape;
}(DrawingObject));

Rectangle = /*@__PURE__*/(function (DrawingObject) {
  function Rectangle() {
    DrawingObject.call(this);
    this.position = {
      x: this.addNumberProperty('position.x'),
      y: this.addNumberProperty('position.y')
    };
    this.fill = {
      enabled: this.addDiscreteProperty('fill.enabled', true),
      color: this.addColorProperty('fill.color')
    };
    this.outline = {
      enabled: this.addDiscreteProperty('outline.enabled', false),
      width: this.addNumberProperty('outline.width'),
      color: this.addColorProperty('outline.color')
    };
    this.width = this.addNumberProperty('width', 10);
    this.height = this.addNumberProperty('height', 10);
  }

  if ( DrawingObject ) Rectangle.__proto__ = DrawingObject;
  Rectangle.prototype = Object.create( DrawingObject && DrawingObject.prototype );
  Rectangle.prototype.constructor = Rectangle;

  Rectangle.prototype.render = function render (ctx, drawing, cullOffsetX, cullOffsetY) {
    var clip;
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    if (this.position.x.value + this.width.value > clip[0] && this.position.x.value < clip[2] && this.position.y.value + this.height.value > clip[1] && this.position.y.value < clip[3]) {
      if (this.fill.enabled.value) {
        drawing.setFillColor(this.fill.color.value);
        ctx.fillRect(this.position.x.value, this.position.y.value, this.width.value, this.height.value);
      }
      if (this.outline.enabled.value) {
        drawing.setStrokeColor(this.outline.color.value);
        drawing.setStrokeWidth(this.outline.width.value);
        ctx.strokeRect(this.position.x.value, this.position.y.value, this.width.value, this.height.value);
      }
      if (this.selected) {
        return this.drawBoundingBox(ctx, drawing);
      }
    }
  };

  Rectangle.prototype.getBoundingBox = function getBoundingBox () {
    // XXX: can be cached
    return [this.position.x.value, this.position.y.value, this.position.x.value + this.width.value, this.position.y.value + this.height.value];
  };

  return Rectangle;
}(DrawingObject));

Line = /*@__PURE__*/(function (DrawingObject) {
  function Line() {
    DrawingObject.call(this);
    this.start = {
      x: this.addNumberProperty('start.x'),
      y: this.addNumberProperty('start.y')
    };
    this.end = {
      x: this.addNumberProperty('end.x'),
      y: this.addNumberProperty('end.y')
    };
    this.color = this.addColorProperty('color');
    this.width = this.addNumberProperty('width');
  }

  if ( DrawingObject ) Line.__proto__ = DrawingObject;
  Line.prototype = Object.create( DrawingObject && DrawingObject.prototype );
  Line.prototype.constructor = Line;

  Line.prototype.render = function render (ctx, drawing, cullOffsetX, cullOffsetY) {
    var clip, width;
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    width = this.width.value === 0 ? Math.min(1, 0.95 / drawing.camera.actualZoom) : this.width.value;
    // this is a lot of checking to do, just to check if a line should be drawn - can this be reduced?
    if (pointRectangleIntersection(this.start.x.value, this.start.y.value, clip[0] - width, clip[1] - width, clip[2] + width, clip[3] + width) || pointRectangleIntersection(this.end.x.value, this.end.y.value, clip[0] - width, clip[1] - width, clip[2] + width, clip[3] + width) || horizontalLineIntersection(this.start.x.value, this.start.y.value, this.end.x.value, this.end.y.value, clip[0] - width, clip[2] + width, clip[1] - width) || horizontalLineIntersection(this.start.x.value, this.start.y.value, this.end.x.value, this.end.y.value, clip[0] - width, clip[2] + width, clip[3] + width) || verticalLineIntersection(this.start.x.value, this.start.y.value, this.end.x.value, this.end.y.value, clip[1] - width, clip[3] + width, clip[0] - width) || verticalLineIntersection(this.start.x.value, this.start.y.value, this.end.x.value, this.end.y.value, clip[1] - width, clip[3] + width, clip[2] + width)) {
      ctx.beginPath();
      drawing.setStrokeColor(this.color.value);
      drawing.setStrokeWidth(width);
      ctx.moveTo(this.start.x.value, this.start.y.value);
      ctx.lineTo(this.end.x.value, this.end.y.value);
      ctx.closePath();
      ctx.stroke();
      if (this.selected) {
        return this.drawBoundingBox(ctx, drawing);
      }
    }
  };

  Line.prototype.getBoundingBox = function getBoundingBox () {
    // XXX: can be cached
    return [Math.min(this.start.x.value, this.end.x.value), Math.min(this.start.y.value, this.end.y.value), Math.max(this.start.x.value, this.end.x.value), Math.max(this.start.y.value, this.end.y.value)];
  };

  return Line;
}(DrawingObject));

Grid = /*@__PURE__*/(function (DrawingObject) {
  function Grid() {
    var _, colorPalette;
    DrawingObject.call(this);
    this.position = {
      x: this.addNumberProperty('position.x'),
      y: this.addNumberProperty('position.y')
    };
    this.cellSize = {
      x: this.addNumberProperty('cellSize.x'),
      y: this.addNumberProperty('cellSize.y')
    };
    this.gridSize = {
      x: this.addNumberProperty('gridSize.x'),
      y: this.addNumberProperty('gridSize.y')
    };
    this.gridLines = {
      color: this.addColorProperty('gridLines.color'),
      width: this.addNumberProperty('gridLines.width'),
      enabled: this.addDiscreteProperty('gridLines.enabled', false)
    };
    colorPalette = (function() {
      var j, results;
      results = [];
      for (_ = j = 0; j <= 15; _ = j += 1) {
        results.push(new DrawingColor(Math.random(), Math.random() / 2, 0, 0.5));
      }
      return results;
    })();
    this.cells = {
      enabled: this.addDiscreteProperty('cells.enabled', false),
      states: this.addDiscreteProperty('cells.states', void 0),
      palette: this.addDiscreteProperty('cells.palette', colorPalette)
    };
  }

  if ( DrawingObject ) Grid.__proto__ = DrawingObject;
  Grid.prototype = Object.create( DrawingObject && DrawingObject.prototype );
  Grid.prototype.constructor = Grid;

  Grid.prototype.render = function render (ctx, drawing, cullOffsetX, cullOffsetY) {
    var cellColor, clip, cx, cy, endX, endY, gx, gy, j, k, m, n, px, py, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, rowColorMap, startX, startY, x, y;
    // only draw things in view
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    // work out the grid area that actually is visible
    startX = Math.max(0, Math.floor((clip[0] - this.position.x.value) / this.cellSize.x.value));
    startY = Math.max(0, Math.floor((clip[1] - this.position.y.value) / this.cellSize.y.value));
    endX = Math.min(this.gridSize.x.value - 1, Math.ceil((clip[2] - this.position.x.value) / this.cellSize.x.value));
    endY = Math.min(this.gridSize.y.value - 1, Math.ceil((clip[3] - this.position.y.value) / this.cellSize.y.value));
    // only draw if the grid is in view
    if (startX <= endX && startY <= endY) {
      if (this.cells.enabled.value) {
// draw the cell colors
        for (y = j = ref = startY, ref1 = endY; j <= ref1; y = j += 1) {
          rowColorMap = this.cells.states.value[y];
          for (x = k = ref2 = startX, ref3 = endX; k <= ref3; x = k += 1) {
            cellColor = rowColorMap[x];
            drawing.setFillColor(this.cells.palette.value[cellColor]);
            ctx.fillRect(this.position.x.value + x * this.cellSize.x.value + 1, this.position.y.value + y * this.cellSize.y.value + 1, this.cellSize.x.value - 1, this.cellSize.y.value - 1);
          }
        }
      }
      if (this.gridLines.enabled) {
        ctx.beginPath();
        drawing.setStrokeColor(this.gridLines.color.value);
        drawing.setStrokeWidth(this.gridLines.width.value);
        drawing.setStrokeCap('square');
        px = this.position.x.value;
        py = this.position.y.value;
        cx = this.cellSize.x.value;
        cy = this.cellSize.y.value;
        gx = this.gridSize.x.value;
        gy = this.gridSize.y.value;
        for (x = m = ref4 = startX, ref5 = endX + 1; m <= ref5; x = m += 1) {
          ctx.moveTo(px + x * cx + 0.5, py + 0.5);
          ctx.lineTo(px + x * cx + 0.5, py + cy * gy + 0.5);
        }
        for (y = n = ref6 = startY, ref7 = endY + 1; n <= ref7; y = n += 1) {
          ctx.moveTo(px + 0.5, py + y * cy + 0.5);
          ctx.lineTo(px + cx * gx + 0.5, py + y * cy + 0.5);
        }
        ctx.closePath();
        ctx.stroke();
      }
      if (this.selected) {
        return this.drawBoundingBox(ctx, drawing);
      }
    }
  };

  Grid.prototype.getBoundingBox = function getBoundingBox () {
    // XXX: can be cached
    return [this.position.x.value, this.position.y.value, this.position.x.value + this.gridSize.x.value * this.cellSize.x.value, this.position.y.value + this.gridSize.y.value * this.cellSize.y.value];
  };

  return Grid;
}(DrawingObject));

Composite = /*@__PURE__*/(function (DrawingObject) {
  function Composite() {
    DrawingObject.call(this);
    this.position = {
      x: this.addNumberProperty('position.x'),
      y: this.addNumberProperty('position.y')
    };
    this.angle = this.addNumberProperty('angle');
    this.scale = this.addNumberProperty('scale', 1);
    this.objectList = new List();
    this.objectMap = new Map();
  }

  if ( DrawingObject ) Composite.__proto__ = DrawingObject;
  Composite.prototype = Object.create( DrawingObject && DrawingObject.prototype );
  Composite.prototype.constructor = Composite;

  Composite.prototype.set = function set (name, value, duration, callback) {
    var components, obj, objectName, property;
    if (this.properties.has(name) || exports.startsWith(name, 'attr.')) {
      DrawingObject.prototype.set.call(this, name, value, duration, callback);
    } else {
      components = name.split('.');
      if (components.length > 1) {
        objectName = components[0];
        property = components.slice(1).join('.');
        obj = this.objectMap.get(objectName);
        if (obj) {
          obj.set(property, value);
        } else {
          console.warn('unknown property: ', name, Error().stack);
        }
      } else {
        console.warn('unknown property: ', name, Error().stack);
      }
    }
    return this;
  };

  Composite.prototype.get = function get (name) {
    var components, obj, objectName, property;
    if (this.properties.has(name) || exports.startsWith(name, 'attr.')) {
      return DrawingObject.prototype.get.call(this, name);
    } else {
      components = name.split('.');
      if (components.length > 1) {
        objectName = components[0];
        property = components.slice(1).join('.');
        obj = this.objectMap.get(objectName);
        if (obj) {
          return obj.get(property);
        }
      }
    }
  };

  // create a new object inside this composite object
  Composite.prototype.create = function create (objectType, name) {
    var object;
    object = (function() {
      switch (objectType) {
        case 'circle':
          return new Circle();
        case 'rectangle':
          return new Rectangle();
        case 'line':
          return new Line();
        case 'grid':
          return new Grid();
        case 'text':
          return new Text();
        case 'shape':
          return new Shape();
        case 'composite':
          return new Composite();
      }
    })();
    if (object) {
      this.objectList.add(object);
      this.objectMap.set(name, object);
    }
    return this;
  };

  Composite.prototype.delete = function delete$1 (name) {
    var object;
    object = this.objectMap.get(name);
    this.objectList.delete(object);
    return this.objectMap.delete(name);
  };

  Composite.prototype.render = function render (ctx, drawing, cullOffsetX, cullOffsetY) {
    var bb, clip, j, len, obj, ref;
    if (this.objectList.size > 0) {
      bb = this.getBoundingBox(ctx);
      clip = drawing.camera.getWorldRect();
      clip[0] -= cullOffsetX;
      clip[1] -= cullOffsetY;
      clip[2] -= cullOffsetX;
      clip[3] -= cullOffsetY;
      if (!bb || bb[2] > clip[0] && bb[0] < clip[2] && bb[3] > clip[1] && bb[1] < clip[3]) {
        ref = this.objectList.values();
        for (j = 0, len = ref.length; j < len; j++) {
          obj = ref[j];
          ctx.save();
          ctx.translate(this.position.x.value, this.position.y.value);
          ctx.scale(this.scale.value, this.scale.value);
          ctx.rotate(this.angle.value);
          obj.render(ctx, drawing, this.position.x.value + cullOffsetX, this.position.y.value + cullOffsetY);
          ctx.restore();
        }
      }
    }
    if (this.selected) {
      return this.drawBoundingBox(ctx, drawing);
    }
  };

  Composite.prototype.getBoundingBox = function getBoundingBox (ctx) {
    var bb, i, j, ref, result;
    if (this.objectList.size > 0) {
      result = this.objectList.get(0).getBoundingBox(ctx);
      if (this.objectList.size > 1) {
        for (i = j = 1, ref = this.objectList.size - 1; j <= ref; i = j += 1) {
          bb = this.objectList.get(i).getBoundingBox(ctx);
          if (bb) {
            if (result) {
              if (bb[0] < result[0]) {
                result[0] = bb[0];
              }
              if (bb[1] < result[1]) {
                result[1] = bb[1];
              }
              if (bb[2] > result[2]) {
                result[2] = bb[2];
              }
              if (bb[3] > result[3]) {
                result[3] = bb[3];
              }
            } else {
              result = bb;
            }
          }
        }
      }
      //XXX: this bounding box technically isn't correct since it doesn't account for scale and rotation - things might be culled
      // when they shouldn't be as a result. This is a known issue
      result[0] += this.position.x.value;
      result[1] += this.position.y.value;
      result[2] += this.position.x.value;
      result[3] += this.position.y.value;
      return result;
    }
  };

  return Composite;
}(DrawingObject));

Circle = /*@__PURE__*/(function (DrawingObject) {
  function Circle() {
    DrawingObject.call(this);
    this.position = {
      x: this.addNumberProperty('position.x'),
      y: this.addNumberProperty('position.y')
    };
    this.fill = {
      enabled: this.addDiscreteProperty('fill.enabled', true),
      color: this.addColorProperty('fill.color')
    };
    this.outline = {
      enabled: this.addDiscreteProperty('outline.enabled', false),
      width: this.addNumberProperty('outline.width'),
      color: this.addColorProperty('outline.color')
    };
    this.radius = this.addNumberProperty('radius', 10);
  }

  if ( DrawingObject ) Circle.__proto__ = DrawingObject;
  Circle.prototype = Object.create( DrawingObject && DrawingObject.prototype );
  Circle.prototype.constructor = Circle;

  Circle.prototype.render = function render (ctx, drawing, cullOffsetX, cullOffsetY) {
    var clip;
    // this clipping assumes that the circle is in fact a square - so it is possible to
    // do better clipping (when the circle is just outside the corner of the screen)
    // It may be that improving the clipping will result in worse performance though, since
    // checking rectangle-circle collision accurately will be more costly than this simple, yet inacurate check.
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    if (this.position.x.value + this.radius.value > clip[0] && this.position.x.value - this.radius.value < clip[2] && this.position.y.value + this.radius.value > clip[1] && this.position.y.value - this.radius.value < clip[3]) {
      ctx.beginPath();
      ctx.arc(this.position.x.value, this.position.y.value, this.radius.value, 0, Math.PI * 2, true);
      ctx.closePath();
      if (this.fill.enabled.value) {
        drawing.setFillColor(this.fill.color.value);
        ctx.fill();
      }
      if (this.outline.enabled.value) {
        drawing.setStrokeColor(this.outline.color.value);
        drawing.setStrokeWidth(this.outline.width.value);
        ctx.stroke();
      }
      if (this.selected) {
        return this.drawBoundingBox(ctx, drawing);
      }
    }
  };

  Circle.prototype.getBoundingBox = function getBoundingBox () {
    // XXX: can be cached
    return [this.position.x.value - this.radius.value, this.position.y.value - this.radius.value, this.position.x.value + this.radius.value, this.position.y.value + this.radius.value];
  };

  return Circle;
}(DrawingObject));

Sidebar$1 = /*@__PURE__*/(function (EventEmitter) {
  function Sidebar(container, pos, togglePos, populate) {
    var this$1 = this;
    if ( pos === void 0 ) pos = 'l';

    EventEmitter.call(this);
    this.visible = false;
    this.selection = container.append('div').class('hx-drawing-sidebar hx-drawing-sidebar-' + pos);
    switch (pos) {
      case 't':
      case 'b':
        this.selection.style('height', '0px');
        this.expandEvt = 'expandv';
        this.collapseEvt = 'collapsev';
        break;
      default:
        this.selection.style('width', '0px');
        this.expandEvt = 'expandh';
        this.collapseEvt = 'collapseh';
    }
    if (togglePos) {
      togglePos.split('');
      this.toggleBtn = container.append('div').class('hx-btn hx-drawing-sidebar-toggle').classed('hx-drawing-sidebar-toggle-' + togglePos[0], true).classed('hx-drawing-sidebar-toggle-' + togglePos[1], true).on('click', function () {
        return this$1.toggle();
      }).append('i').class('hx-icon hx-icon-bars');
    }
    if (typeof populate === "function") {
      populate(this.selection.node());
    }
  }

  if ( EventEmitter ) Sidebar.__proto__ = EventEmitter;
  Sidebar.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Sidebar.prototype.constructor = Sidebar;

  Sidebar.prototype.toggle = function toggle () {
    if (this.visible) {
      return this.hide();
    } else {
      return this.show();
    }
  };

  Sidebar.prototype.show = function show () {
    if (!this.visible) {
      this.visible = true;
      this.selection.morph().with(this.expandEvt, 100).and('fadein', 100).go(true);
    }
    return this;
  };

  Sidebar.prototype.hide = function hide () {
    if (this.visible) {
      this.visible = false;
      this.selection.morph().with('fadeout', 100).and(this.collapseEvt, 100).go(true);
    }
    return this;
  };

  return Sidebar;
}(EventEmitter));

PerformanceGauge = /*@__PURE__*/(function () {
  function PerformanceGauge(drawing1) {
    this.drawing = drawing1;
    this.position = new Point(3, 3);
    this.fps = void 0;
    this.ms = void 0;
    this.lastEnd = void 0;
    this.frameStart = void 0;
    this.frameEnd = void 0;
  }

  PerformanceGauge.prototype.start = function start () {
    return this.frameStart = (new Date()).getTime();
  };

  PerformanceGauge.prototype.end = function end () {
    this.lastEnd = this.frameEnd;
    return this.frameEnd = (new Date()).getTime();
  };

  PerformanceGauge.prototype.update = function update () {
    var thisFrameFps, thisFrameMs;
    thisFrameFps = 1000 / (this.frameEnd - this.lastEnd);
    if (!isNaN(thisFrameFps)) {
      if (this.fps) {
        this.fps = exports.tween(this.fps, thisFrameFps, 0.05);
      } else {
        this.fps = thisFrameFps;
      }
    }
    thisFrameMs = this.frameEnd - this.frameStart;
    if (this.ms) {
      return this.ms = exports.tween(this.ms, thisFrameMs, 0.05);
    } else {
      return this.ms = thisFrameMs;
    }
  };

  PerformanceGauge.prototype.render = function render () {
    this.drawing.ctx.fillStyle = 'rgba(0, 0, 40, 1)';
    this.drawing.ctx.strokeStyle = '#ffffff';
    this.drawing.ctx.lineCap = 'square';
    this.drawing.ctx.lineWidth = 1;
    this.drawing.ctx.fillRect(this.position.x, this.position.y, 70, 42);
    this.drawing.ctx.strokeRect(this.position.x, this.position.y, 70, 42);
    this.drawing.ctx.font = "10pt Helvetica,Arial";
    this.drawing.ctx.fillStyle = '#ffffff';
    this.drawing.ctx.fillText("FPS: " + Math.round(this.fps), 8 + this.position.x, 18 + this.position.y);
    if (this.ms < 17) {
      this.drawing.ctx.fillStyle = '#ffffff';
    } else {
      this.drawing.ctx.fillStyle = '#ff5555';
    }
    return this.drawing.ctx.fillText("MS: " + Math.round(this.ms), 8 + this.position.x, 33 + this.position.y);
  };

  return PerformanceGauge;
}());

Layer = (function() {
  var ramp, triangle;

  var Layer = function Layer(drawing1) {
    this.drawing = drawing1;
    this.objects = [];
    this.visible = true;
    this.alpha = 1;
    this.alphaCurveFunction = null;
  };

  Layer.prototype.render = function render () {
    var j, len, object, ref, results;
    if (this.alphaCurveFunction) {
      this.alpha = exports.clampUnit(this.alphaCurveFunction(this.drawing.camera.actualZoom));
      this.visible = this.alpha > 0.01;
    }
    if (this.visible) {
      this.drawing.setGlobalAlpha(this.alpha);
      ref = this.objects;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        object = ref[j];
        results.push(object.render(this.drawing.ctx, this.drawing, 0, 0));
      }
      return results;
    }
  };

  // create a new object
  Layer.prototype.create = function create (objectType, id) {
    var object;
    object = (function() {
      switch (objectType) {
        case 'circle':
          return new Circle(id);
        case 'rectangle':
          return new Rectangle(id);
        case 'line':
          return new Line(id);
        case 'grid':
          return new Grid(id);
        case 'text':
          return new Text(id);
        case 'shape':
          return new Shape(id);
        case 'composite':
          return new Composite(id);
      }
    })();
    if (object) {
      this.objects.push(object);
    }
    return object;
  };

  Layer.prototype.delete = function delete$1 (obj) {
    var id;
    id = this.objects.indexOf(obj);
    if (id !== -1) {
      return this.objects.splice(id, 1);
    }
  };

  // removes all objects from the layer
  Layer.prototype.deleteAll = function deleteAll () {
    this.objects = [];
    return void 0;
  };

  Layer.prototype.find = function find (id) {
    var j, len, object, ref;
    ref = this.objects;
    for (j = 0, len = ref.length; j < len; j++) {
      object = ref[j];
      if (object.id === id) {
        return object;
      }
    }
  };

  Layer.prototype.findBy = function findBy (ind) {
    var j, len, object, ref;
    ref = this.objects;
    for (j = 0, len = ref.length; j < len; j++) {
      object = ref[j];
      if (ind(object)) {
        return object;
      }
    }
  };

  // returns a bounding box [x1, y1, x2, y2] that all objects in the layer are contained within
  Layer.prototype.getBoundingBox = function getBoundingBox () {
    var bb, i, j, ref, result;
    if (this.objects.length > 0) {
      result = this.objects[0].getBoundingBox(this.drawing.ctx);
      if (this.objects.length > 1) {
        for (i = j = 1, ref = this.objects.length - 1; j <= ref; i = j += 1) {
          bb = this.objects[i].getBoundingBox(this.drawing.ctx);
          if (bb) {
            if (result) {
              if (bb[0] < result[0]) {
                result[0] = bb[0];
              }
              if (bb[1] < result[1]) {
                result[1] = bb[1];
              }
              if (bb[2] > result[2]) {
                result[2] = bb[2];
              }
              if (bb[3] > result[3]) {
                result[3] = bb[3];
              }
            } else {
              result = bb;
            }
          }
        }
      }
      return result;
    } else {
      return null;
    }
  };

  // set a function which transforms the current zoom into an alpha level for the layer. Setting this function will cause the alpha value of the layer to be calculated automatically every step
  Layer.prototype.setAlphaCurve = function setAlphaCurve (type, start, end) {
    return this.alphaCurveFunction = (function() {
      switch (type) {
        case 'triangle':
          return triangle(start, end);
        case 'ramp':
          return ramp(start, end);
      }
    })();
  };
  triangle = function(start, end) {
    return function(x) {
      return 1 - Math.abs((Math.log(x) - start) * 2 / (end - start) - 1);
    };
  };

  ramp = function(start, end) {
    return function(x) {
      return 1 + Math.min((Math.log(x) - start) * 2 / (end - start) - 1, 0);
    };
  };

  return Layer;

}).call(undefined);

Camera = (function() {
  var onClick, onLongPress, onMouseDown, onMouseMove, onMouseUp, onMouseWheel, onTouchEnd, onTouchMove, onTouchStart, onTranslate, setZoom;

  var Camera = /*@__PURE__*/(function (EventEmitter) {
    function Camera(drawing1) {
      var this$1 = this;

      var mouseControlState, mouseUpHandler, namespace, touchUpHandler;
      EventEmitter.call(this);
      this.drawing = drawing1;
      this.position = new Point();
      this.zoom = 1;
      this.actualPosition = new Point();
      this.actualZoom = 1;
      this.smoothPosition = false;
      this.positionSmoothingFactor = 0.15;
      this.smoothZoom = true;
      this.zoomSmoothingFactor = 0.15;
      this.zoomMax = null;
      this.zoomMin = null;
      this.xMin = null;
      this.yMin = null;
      this.xMax = null;
      this.yMax = null;
      this.mode = null;
      this.followContinualZoom = false;
      this.smoothToNextTargetPosition = false;
      //XXX: move into a hidden state object
      this.lastx1 = 0;
      this.lasty1 = 0;
      this.lastx2 = 0;
      this.lasty2 = 0;
      this.lastZoom = 1;
      this.isZoomTouch = false;
      this.moving = false;
      this.panEnabled = false;
      this.zoomEnabled = false;
      this.selectionEnabled = false;
      mouseControlState = {
        selection: select(this.drawing.canvasNode),
        positionLast: new Point(),
        touchStart: new Point(),
        mouseDown: false,
        moveThreshold: 5 * this.drawing.dpr,
        longPressTime: 1000, // in milliseconds
        longPressTimer: null,
        didLongPress: false
      };
      mouseUpHandler = function (e) {
        return onMouseUp.call(this$1, e, mouseControlState);
      };
      touchUpHandler = function (e) {
        return onTouchEnd.call(this$1, e, mouseControlState);
      };
      namespace = 'drawing-' + exports.randomId();
      select(document).on('mouseup', namespace, mouseUpHandler);
      select(document).on('touchend', namespace, touchUpHandler);
      //mouse events
      select(this.drawing.canvasNode).on('mousemove', 'hx.drawing', function (e) {
        return onMouseMove.call(this$1, e, mouseControlState);
      });
      mouseControlState.selection.on('mousedown', 'hx.drawing', function (e) {
        return onMouseDown.call(this$1, e, mouseControlState);
      });
      mouseControlState.selection.on('wheel', 'hx.drawing', function (e) {
        return onMouseWheel.call(this$1, e, mouseControlState);
      });
      // touch events
      //XXX: test if using touch events from the document rather than the canvas works well...
      select(this.drawing.canvasNode).on('touchstart', 'hx.drawing', function (e) {
        return onTouchStart.call(this$1, e, mouseControlState);
      });
      mouseControlState.selection.on('touchmove', 'hx.drawing', function (e) {
        return onTouchMove.call(this$1, e, mouseControlState);
      });
      mouseControlState.selection.on('touchcancel', 'hx.drawing', function (e) {
        return onTouchEnd.call(this$1, e, mouseControlState);
      });
    }

    if ( EventEmitter ) Camera.__proto__ = EventEmitter;
    Camera.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    Camera.prototype.constructor = Camera;

    Camera.prototype.setupBounds = function setupBounds (zoomMin, zoomMax, xMin, yMin, xMax, yMax) {
      this.zoomMin = zoomMin;
      this.zoomMax = zoomMax;
      this.xMin = xMin;
      this.yMin = yMin;
      this.xMax = xMax;
      return this.yMax = yMax;
    };

    Camera.prototype.clearTransform = function clearTransform (ctx) {
      return ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    Camera.prototype.applyTransform = function applyTransform (ctx) {
      ctx.translate(this.drawing.width / 2, this.drawing.height / 2);
      ctx.scale(this.actualZoom, this.actualZoom);
      return ctx.translate(-this.actualPosition.x, -this.actualPosition.y);
    };

    Camera.prototype.update = function update () {
      var bb;
      switch (this.mode) {
        case 'follow':
          bb = this.followObject.getBoundingBox(this.drawing.ctx);
          if (bb) {
            if (this.followContinualZoom) {
              this.zoom = this.calculateZoomForBoundingBox(bb, this.followZoomOut);
            }
            this.position.x = (bb[0] + bb[2]) / 2;
            this.position.y = (bb[1] + bb[3]) / 2;
          }
      }
      if (this.zoomMin) {
        if (this.zoom < this.zoomMin) {
          this.zoom = this.zoomMin;
        }
      }
      if (this.zoomMax) {
        if (this.zoom > this.zoomMax) {
          this.zoom = this.zoomMax;
        }
      }
      if (this.xMin) {
        if (this.position.x < this.xMin) {
          this.position.x = this.xMin;
        }
      }
      if (this.yMin) {
        if (this.position.y < this.yMin) {
          this.position.y = this.yMin;
        }
      }
      if (this.xMax) {
        if (this.position.x > this.xMax) {
          this.position.x = this.xMax;
        }
      }
      if (this.yMax) {
        if (this.position.y > this.yMax) {
          this.position.y = this.yMax;
        }
      }
      if (this.smoothPosition || this.smoothToNextTargetPosition) {
        this.actualPosition.tweenTo(this.position, this.positionSmoothingFactor);
        if (this.actualPosition.distanceTo(this.position) < 1) { // magic number
          this.smoothToNextTargetPosition = false;
        }
      } else {
        this.actualPosition.set(this.position);
      }
      if (this.smoothZoom) {
        return this.actualZoom = exports.tween(this.actualZoom, this.zoom, this.zoomSmoothingFactor);
      } else {
        return this.actualZoom = this.zoom;
      }
    };

    // gets the visible area in world coordinates
    Camera.prototype.getWorldRect = function getWorldRect () {
      return [this.actualPosition.x - this.drawing.width / (2 * this.actualZoom), this.actualPosition.y - this.drawing.height / (2 * this.actualZoom), this.actualPosition.x + this.drawing.width / (2 * this.actualZoom), this.actualPosition.y + this.drawing.height / (2 * this.actualZoom)];
    };

    Camera.prototype.getWorldX = function getWorldX (x) {
      return (x * this.drawing.dpr - this.drawing.width / 2) / this.actualZoom + this.actualPosition.x;
    };

    Camera.prototype.getWorldY = function getWorldY (y) {
      return (y * this.drawing.dpr - this.drawing.height / 2) / this.actualZoom + this.actualPosition.y;
    };

    Camera.prototype.screenPointToWorldPoint = function screenPointToWorldPoint (p) {
      var result;
      return result = {
        x: (p.x * this.drawing.dpr - this.drawing.width / 2) / this.actualZoom + this.actualPosition.x,
        y: (p.y * this.drawing.dpr - this.drawing.height / 2) / this.actualZoom + this.actualPosition.y
      };
    };

    Camera.prototype.worldPointToScreenPoint = function worldPointToScreenPoint (p) {
      var result;
      return result = {
        x: (p.x * this.drawing.dpr - this.actualPosition.x) * this.actualZoom + this.drawing.width / 2,
        y: (p.y * this.drawing.dpr - this.actualPosition.y) * this.actualZoom + this.drawing.height / 2
      };
    };

    Camera.prototype.calculateZoomForBoundingBox = function calculateZoomForBoundingBox (bb, zoomOut) {
      return Math.min(this.drawing.width / ((bb[2] - bb[0]) * zoomOut), this.drawing.height / ((bb[3] - bb[1]) * zoomOut));
    };

    Camera.prototype.follow = function follow (object, zoomOut, continuallyEvaluateZoom) {
      var bb;
      this.smoothToNextTargetPosition = true;
      if (object) {
        this.mode = 'follow';
        this.followObject = object;
        this.followZoomOut = zoomOut;
        this.followContinualZoom = continuallyEvaluateZoom;
        bb = this.followObject.getBoundingBox(this.drawing.ctx);
        if (bb) {
          return this.zoom = this.calculateZoomForBoundingBox(bb, zoomOut);
        }
      }
    };

    Camera.prototype.stopFollowing = function stopFollowing () {
      this.mode = null;
      return this.followObject = null;
    };

    Camera.prototype.show = function show (object, zoomOut) {
      var bb;
      this.smoothToNextTargetPosition = true;
      if (object) {
        bb = object.getBoundingBox(this.drawing.ctx);
        if (bb) {
          this.zoom = this.calculateZoomForBoundingBox(bb, zoomOut);
          this.position.x = (bb[0] + bb[2]) / 2;
          return this.position.y = (bb[1] + bb[3]) / 2;
        }
      }
    };

    return Camera;
  }(EventEmitter));
  setZoom = function(zoom) {
    this.zoom = zoom;
    return this.emit('zoom', {
      zoom: zoom
    });
  };

  onMouseDown = function(e, state) {
    var x, y;
    e.preventDefault();
    this.mouseDown = true;
    x = e.clientX;
    y = e.clientY;
    state.touchStart.x = x;
    state.touchStart.y = y;
    return this.emit('pointerdown', {
      x: x,
      y: y
    });
  };

  onMouseMove = function(e, state) {
    var dx, dy, x, y;
    if (this.panEnabled && this.mouseDown) {
      e.preventDefault();
    }
    x = e.clientX;
    y = e.clientY;
    if (this.mouseDown) {
      if (!this.moving && (state.touchStart.x - x) * (state.touchStart.x - x) + (state.touchStart.y - y) * (state.touchStart.y - y) > state.moveThreshold * state.moveThreshold) {
        this.moving = true;
        state.positionLast.set(state.touchStart);
        if (this.panEnabled) {
          state.selection.style('cursor', 'move');
        }
      }
      if (this.moving) {
        dx = x - state.positionLast.x;
        dy = y - state.positionLast.y;
        state.positionLast.x = e.clientX;
        state.positionLast.y = e.clientY;
        return onTranslate.call(this, dx, dy);
      }
    }
  };

  onMouseUp = function(e, state) {
    if (!this.mouseDown) {
      return;
    }
    e.preventDefault();
    this.mouseDown = false;
    if (this.moving) {
      this.moving = false;
    } else {
      onClick.call(this, state.touchStart.x - state.selection.box().left, state.touchStart.y - state.selection.box().top);
    }
    state.selection.style('cursor', 'default');
    return this.emit('pointerup', {
      x: state.touchStart.x,
      y: state.touchStart.y
    });
  };

  onTranslate = function(dx, dy, state) {
    if (this.panEnabled) {
      this.mode = void 0;
      this.smoothToNextTargetPosition = false;
      this.position.x -= dx * this.drawing.dpr / this.actualZoom;
      this.position.y -= dy * this.drawing.dpr / this.actualZoom;
      return this.emit('move', {
        dx: dx,
        dy: dy
      });
    }
  };

  onMouseWheel = function(e, state) {
    var delta, deltaTransformed, mx, my, wx, wy;
    if (this.zoomEnabled) {
      e.preventDefault();
      e.stopPropagation();
      delta = -e.deltaY;
      if (e.deltaMode === 1) { // Scroll by line enabled - delta value ~20 times lower
        delta *= 20;
      }
      deltaTransformed = Math.min(0.99, Math.abs(delta / 120 * 0.2));
      mx = e.clientX;
      my = e.clientY;
      wx = this.getWorldX(mx);
      wy = this.getWorldY(my);
      return setZoom.call(this, delta > 0 ? this.zoom / (1 - deltaTransformed) : this.zoom * (1 - deltaTransformed));
    }
  };

  onTouchStart = function(e, state) {
    var this$1 = this;

    var changed, didLongPress, i, j, ref, x, y;
    e.preventDefault();
    this.mouseDown = true;
    changed = e.changedTouches;
    if (changed.length > 0) {
      for (i = j = 0, ref = changed.length - 1; j <= ref; i = j += 1) {
        x = changed[i].clientX;
        y = changed[i].clientY;
        this.emit('pointerdown', {
          x: x,
          y: y
        });
      }
    }
    if (e.targetTouches.length === 1) {
      x = e.targetTouches[0].clientX;
      y = e.targetTouches[0].clientY;
      state.touchStart.x = x;
      state.touchStart.y = y;
      didLongPress = false;
      return state.longPressTimer = setTimeout(function () {
        onLongPress.call(this$1, state.touchStart.x - state.selection.box().left, state.touchStart.y - state.selection.box().top);
        return didLongPress = true;
      }, state.longPressTime);
    } else if (e.targetTouches.length === 2) {
      if (state.longPressTimer) {
        clearTimeout(state.longPressTimer);
        state.longPressTimer = null;
      }
      this.isZoomTouch = true;
      this.lastx1 = e.targetTouches[0].clientX;
      this.lasty1 = e.targetTouches[0].clientY;
      this.lastx2 = e.targetTouches[1].clientX;
      this.lasty2 = e.targetTouches[1].clientY;
      this.startPinchDistance = Math.sqrt((this.lastx1 - this.lastx2) * (this.lastx1 - this.lastx2) + (this.lasty1 - this.lasty2) * (this.lasty1 - this.lasty2));
      return this.lastZoom = this.zoom;
    }
  };

  onTouchMove = function(e, state) {
    var distance, dx, dy, x, x1, x2, y, y1, y2;
    e.preventDefault();
    if (e.targetTouches.length === 1 && !this.isZoomTouch) {
      x = e.targetTouches[0].clientX;
      y = e.targetTouches[0].clientY;
      if (!this.moving && (state.touchStart.x - x) * (state.touchStart.x - x) + (state.touchStart.y - y) * (state.touchStart.y - y) > state.moveThreshold * state.moveThreshold) {
        this.moving = true;
        state.positionLast.set(state.touchStart);
        if (state.longPressTimer) {
          clearTimeout(state.longPressTimer);
          state.longPressTimer = null;
        }
      }
      if (this.moving) {
        dx = x - state.positionLast.x;
        dy = y - state.positionLast.y;
        state.positionLast.x = x;
        state.positionLast.y = y;
        if (this.mouseDown) {
          return onTranslate.call(this, dx, dy);
        }
      }
    } else if (e.targetTouches.length === 2) {
      if (this.zoomEnabled) {
        x1 = e.targetTouches[0].clientX;
        y1 = e.targetTouches[0].clientY;
        x2 = e.targetTouches[1].clientX;
        y2 = e.targetTouches[1].clientY;
        distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return setZoom.call(this, this.lastZoom * distance / this.startPinchDistance);
      }
    }
  };

  onTouchEnd = function(e, state) {
    var changed, didLongPress, i, j, ref, x, y;
    if (!this.mouseDown) {
      return;
    }
    e.preventDefault();
    changed = e.changedTouches;
    if (changed.length > 0) {
      for (i = j = 0, ref = changed.length - 1; j <= ref; i = j += 1) {
        x = changed[i].clientX;
        y = changed[i].clientY;
        this.emit('pointerup', {
          x: x,
          y: y
        });
      }
    }
    if (e.targetTouches.length === 0) {
      this.isZoomTouch = false;
      if (state.longPressTimer) {
        clearTimeout(state.longPressTimer);
        state.longPressTimer = null;
      }
      if (this.moving) {
        this.moving = false;
      } else {
        if (!didLongPress) {
          onClick.call(this, state.touchStart.x - state.selection.box().left, state.touchStart.y - state.selection.box().top);
        }
      }
      return didLongPress = false;
    }
  };

  onClick = function(x, y) {
    var ctx, obj, wp;
    wp = this.screenPointToWorldPoint(new Point(x, y));
    if (this.selectionEnabled) {
      ctx = this.drawing.ctx;
      obj = this.drawing.findBy(function(d) {
        return d.selectable.value && d.pointInBoundingBox(wp, ctx);
      });
      if (obj) {
        this.drawing.select(obj);
      } else {
        this.drawing.unselectAll();
      }
    }
    return this.emit('click', {
      x: x,
      y: y,
      wx: wp.x,
      wy: wp.y
    });
  };

  onLongPress = function(x, y) {
    return this.emit('longpress', {
      x: x,
      y: y
    });
  };

  return Camera;

}).call(undefined);

exports.Drawing = (function() {
  var drawingLoop, resize;

  var Drawing = /*@__PURE__*/(function (EventEmitter) {
    function Drawing(selector, autoStart) {
      var this$1 = this;
      if ( autoStart === void 0 ) autoStart = true;

      var container, node;
      EventEmitter.call(this);
      logger.deprecated('hx.Drawing', 'N/A - This module will be removed in the next major release');
      container = select(selector).classed('hx-drawing', true).api('drawing', this).api(this);
      this.canvas = container.append('canvas');
      this.overlay = container.append('div').class('hx-drawing-overlay');
      node = container.node();
      resize.call(this, node);
      container.on('resize', function () {
        return resize.call(this$1, node);
      });
      this.canvasNode = this.canvas.node();
      this.ctx = this.canvasNode.getContext('2d');
      this.defaultLayer = new Layer(this);
      this.layers = [this.defaultLayer];
      this.camera = new Camera(this);
      // pipe events through from the camera
      this.camera.pipe(this);
      this.globalAlpha = 1;
      this.stats = null;
      this.selectedObjects = new List();
      // start the loop
      this.frame = 0;
      if (autoStart) {
        this.resume();
      }
    }

    if ( EventEmitter ) Drawing.__proto__ = EventEmitter;
    Drawing.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    Drawing.prototype.constructor = Drawing;

    // starts the drawing updating
    Drawing.prototype.resume = function resume () {
      if (!this.stopFunc) {
        return this.stopFunc = drawingLoop.call(this);
      }
    };

    // stops the drawing updating
    Drawing.prototype.stop = function stop () {
      if (this.stopFunc) {
        this.stopFunc();
        return this.stopFunc = void 0;
      }
    };

    // find an object by id
    Drawing.prototype.find = function find (id) {
      var j, layer, len, ref, res;
      ref = this.layers;
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        res = layer.find(id);
        if (res) {
          return res;
        }
      }
    };

    // find an object by indicator function
    Drawing.prototype.findBy = function findBy (ind) {
      var j, layer, len, ref, res;
      ref = this.layers;
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        res = layer.findBy(ind);
        if (res) {
          return res;
        }
      }
    };

    // create a new layer
    Drawing.prototype.createLayer = function createLayer () {
      var layer;
      layer = new Layer(this);
      this.layers.push(layer);
      return layer;
    };

    Drawing.prototype.showLayer = function showLayer (layer) {
      var j, l, len, ref, results;
      ref = this.layers;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        l = ref[j];
        results.push(l.visible = l === layer);
      }
      return results;
    };

    // continuously follow an object (until interruped by a pan)
    Drawing.prototype.follow = function follow (obj, zoomOut, continuallyEvaluateZoom) {
      if ( zoomOut === void 0 ) zoomOut = 1;
      if ( continuallyEvaluateZoom === void 0 ) continuallyEvaluateZoom = false;

      return this.camera.follow(obj, zoomOut, continuallyEvaluateZoom);
    };

    Drawing.prototype.stopFollowing = function stopFollowing () {
      return this.camera.stopFollowing;
    };

    // put the object in view (this will not follow the object after)
    Drawing.prototype.show = function show (obj, zoomOut) {
      if ( zoomOut === void 0 ) zoomOut = 1;

      return this.camera.show(obj, zoomOut);
    };

    Drawing.prototype.enablePan = function enablePan () {
      return this.camera.panEnabled = true;
    };

    Drawing.prototype.enableZoom = function enableZoom () {
      return this.camera.zoomEnabled = true;
    };

    Drawing.prototype.enableSelection = function enableSelection () {
      return this.camera.selectionEnabled = true;
    };

    // enable the performance gauge
    Drawing.prototype.enablePerformanceGauge = function enablePerformanceGauge () {
      return this.stats = new PerformanceGauge(this);
    };

    // enable the search box
    Drawing.prototype.enableSearchbox = function enableSearchbox () {
      var this$1 = this;

      var input;
      this.searchbox = this.overlay.append('div').classed('hx-drawing-searchbox', true);
      input = this.searchbox.append('input').attr('placeholder', 'Search');
      return input.on('keypress', function (e) {
        if (e.which === 13) {
          return this$1.emit('search', input.prop('value'));
        }
      });
    };

    Drawing.prototype.enableSidebar = function enableSidebar (position, togglePos, populate) {
      var this$1 = this;

      if (arguments.length === 2) {
        populate = togglePos;
        togglePos = null;
      }
      this.sidebar = new Sidebar$1(this.overlay, position, togglePos, populate);
      this.showSidebar = function () {
        return this$1.sidebar.show();
      };
      this.hideSidebar = function () {
        return this$1.sidebar.hide();
      };
      return this.toggleSidebar = function () {
        return this$1.sidebar.toggle();
      };
    };

    // create a new object (id is optional)
    Drawing.prototype.create = function create (objectType, id) {
      return this.defaultLayer.create(objectType, id);
    };

    // remove an object from the drawing
    Drawing.prototype.delete = function delete$1 (obj) {
      var j, layer, len, ref, results;
      ref = this.layers;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        results.push(layer.delete(obj));
      }
      return results;
    };

    // removes all objects from the drawing
    Drawing.prototype.deleteAll = function deleteAll () {
      var j, layer, len, ref;
      ref = this.layers;
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        layer.deleteAll();
      }
      return void 0;
    };

    Drawing.prototype.setGlobalAlpha = function setGlobalAlpha (alpha) {
      return this.globalAlpha = alpha;
    };

    Drawing.prototype.setFillColor = function setFillColor (color) {
      var a, b, g, r;
      r = color.red();
      g = color.green();
      b = color.blue();
      a = color.alpha() * this.globalAlpha;
      // can potentially optimise this by only updating the color only when it changes
      return this.ctx.fillStyle = "rgba(" + (Math.floor(r)) + "," + (Math.floor(g)) + "," + (Math.floor(b)) + "," + a + ")";
    };

    Drawing.prototype.setStrokeColor = function setStrokeColor (color) {
      var a, b, g, r;
      r = color.red();
      g = color.green();
      b = color.blue();
      a = color.alpha() * this.globalAlpha;
      // can potentially optimise this by only updating the color only when it changes
      return this.ctx.strokeStyle = "rgba(" + (Math.floor(r)) + "," + (Math.floor(g)) + "," + (Math.floor(b)) + "," + a + ")";
    };

    Drawing.prototype.setStrokeWidth = function setStrokeWidth (width) {
      return this.ctx.lineWidth = width;
    };

    Drawing.prototype.setStrokeCap = function setStrokeCap (style) {
      return this.ctx.lineCap = style;
    };

    // returns a bounding box [x1, y1, x2, y2] that all objects in the scene are contained within
    Drawing.prototype.getBoundingBox = function getBoundingBox () {
      var bb, i, j, ref, result;
      if (this.layers.length > 0) {
        result = this.layers[0].getBoundingBox(this.ctx);
        if (this.layers.length > 1) {
          for (i = j = 1, ref = this.layers.length - 1; j <= ref; i = j += 1) {
            bb = this.layers[i].getBoundingBox(this.ctx);
            if (bb) {
              if (result) {
                if (bb[0] < result[0]) {
                  result[0] = bb[0];
                }
                if (bb[1] < result[1]) {
                  result[1] = bb[1];
                }
                if (bb[2] > result[2]) {
                  result[2] = bb[2];
                }
                if (bb[3] > result[3]) {
                  result[3] = bb[3];
                }
              } else {
                result = bb;
              }
            }
          }
        }
        return result;
      } else {
        return null;
      }
    };

    Drawing.prototype.select = function select (drawingObject, append) {
      if ( append === void 0 ) append = false;

      var j, len, obj, ref;
      if (append) {
        this.selectedObjects.add(drawingObject);
      } else {
        ref = this.selectedObjects.values();
        for (j = 0, len = ref.length; j < len; j++) {
          obj = ref[j];
          if (obj !== drawingObject) {
            obj.selected = false;
            this.emit('unselect', obj);
          }
        }
        this.selectedObjects = new List([drawingObject]);
      }
      drawingObject.selected = true;
      return this.emit('select', drawingObject);
    };

    Drawing.prototype.unselect = function unselect (drawingObject) {
      if (this.selectedObjects.remove(drawingObject)) {
        drawingObject.selected = false;
        return this.emit('unselect', drawingObject);
      }
    };

    Drawing.prototype.unselectAll = function unselectAll () {
      var j, len, obj, ref;
      ref = this.selectedObjects.values();
      for (j = 0, len = ref.length; j < len; j++) {
        obj = ref[j];
        obj.selected = false;
        this.emit('unselect', obj);
      }
      return this.selectedObjects.clear();
    };

    Drawing.prototype.selected = function selected () {
      return this.selectedObjects.values();
    };

    return Drawing;
  }(EventEmitter));
  drawingLoop = function() {
    var this$1 = this;

    var run;
    run = false;
    loop(function () {
      var j, layer, len, ref;
      if (this$1.stats) {
        this$1.stats.start();
      }
      this$1.camera.clearTransform(this$1.ctx);
      this$1.ctx.clearRect(0, 0, this$1.width, this$1.height);
      this$1.camera.update();
      this$1.camera.applyTransform(this$1.ctx);
      ref = this$1.layers;
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        layer.render(this$1.ctx);
      }
      if (this$1.stats) {
        this$1.camera.clearTransform(this$1.ctx);
        this$1.stats.end();
        this$1.stats.update();
        this$1.stats.render();
      }
      this$1.emit('update', this$1.frame);
      this$1.frame++;
      return run;
    });
    return function() {
      return run = true;
    };
  };

  resize = function(container) {
    var containerHeight, containerWidth;
    containerWidth = container.clientWidth;
    containerHeight = container.clientHeight;
    // take into account the device pixel ratio so that things look nice on high resolution screens
    this.dpr = window.devicePixelRatio != null ? window.devicePixelRatio : 1;
    this.canvas.prop('width', containerWidth * this.dpr);
    this.canvas.prop('height', containerHeight * this.dpr);
    this.canvas.style('width', containerWidth + "px");
    this.canvas.style('height', containerHeight + "px");
    this.canvas.style('position', 'relative');
    this.width = containerWidth * this.dpr;
    this.height = containerHeight * this.dpr;
    this.overlay.style('width', containerWidth + "px");
    this.overlay.style('height', containerHeight + "px");
    return this.state = {
      height: containerWidth,
      width: containerHeight
    };
  };

  return Drawing;

}).call(undefined);

exports.drawing = function(options) {
  var selection;
  selection = div();
  new exports.Drawing(selection.node(), options);
  return selection;
};

var MorphSection = /*@__PURE__*/(function (EventEmitter) {
  function MorphSection(selector1, options) {
    var this$1 = this;

    var selection;
    EventEmitter.call(this);
    this.selector = selector1;
    this.options = exports.mergeDefined({
      animate: true
    }, options);
    this.expanded = false;
    selection = select(this.selector).classed('hx-openable', true).classed('hx-morph-section', true).api('morph-section', this).api(this);
    selection.select('.hx-morph-toggle').on('click', 'hx.morph-section', function () {
      return this$1.toggle();
    });
    selection.select('.hx-morph-content').style('display', 'none');
  }

  if ( EventEmitter ) MorphSection.__proto__ = EventEmitter;
  MorphSection.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  MorphSection.prototype.constructor = MorphSection;

  // sets the visibility of the (usually) hidden content
  MorphSection.prototype.visible = function visible (show) {
    var content, selection, toggle;
    if (show === void 0) {
      return this.expanded;
    } else {
      selection = select(this.selector).classed('hx-opened', show);
      toggle = selection.select('.hx-morph-toggle');
      content = selection.select('.hx-morph-content');
      if (this.options.animate) {
        content.morph().cancelOngoing().with((show ? 'expand' : 'fadeout'), 100).and((show ? 'fadein' : 'collapse'), 100).go();
      } else {
        content.style('display', show ? '' : 'none');
      }
      this.expanded = show;
      this.emit((show ? 'show' : 'hide'), {
        toggle: toggle.node(),
        content: content.node()
      });
    }
  };

  MorphSection.prototype.toggle = function toggle () {
    return this.visible(!this.expanded);
  };

  MorphSection.prototype.show = function show () {
    return this.visible(true);
  };

  MorphSection.prototype.hide = function hide () {
    return this.visible(false);
  };

  return MorphSection;
}(EventEmitter));

var InlineMorphSection = /*@__PURE__*/(function (MorphSection) {
  function InlineMorphSection(selector, enterEditMode, exitEditMode, options) {
    var morphSection;
    // MorphSection registers the component
    options = exports.mergeDefined({
      animate: false
    }, options);
    MorphSection.call(this, selector, options);
    morphSection = this;
    this.on('show', 'hx.morph-section', function(data) {
      morphSection.detector = new exports.ClickDetector(data.content);
      enterEditMode.call(morphSection, data.toggle, data.content);
      select(data.toggle).style('display', 'none');
      morphSection.detector.addException(data.content);
      return morphSection.detector.on('click', 'hx.morph-section', function() {
        morphSection.detector.cleanUp();
        morphSection.detector = void 0;
        return morphSection.hide();
      });
    });
    this.on('hide', 'hx.morph-section', function(data) {
      if (exitEditMode != null) {
        exitEditMode.call(morphSection, data.toggle, data.content);
      }
      return select(data.toggle).style('display', '');
    });
  }

  if ( MorphSection ) InlineMorphSection.__proto__ = MorphSection;
  InlineMorphSection.prototype = Object.create( MorphSection && MorphSection.prototype );
  InlineMorphSection.prototype.constructor = InlineMorphSection;

  return InlineMorphSection;
}(MorphSection));

exports.userFacingText({
  inlineEditable: {
    enterValue: 'Enter Value'
  }
});

var InlineEditable = (function() {
  var enterEditMode;

  var InlineEditable = /*@__PURE__*/(function (InlineMorphSection) {
    function InlineEditable(selector, opts) {
      var this$1 = this;

      var confirm, defaultOptions, input, options, selection, setValue, textSelection;
      // MorphSection registers the component
      selection = select(selector).classed('hx-inline-editable', true);
      defaultOptions = {
        enterValueText: exports.userFacingText('inlineEditable', 'enterValue'),
        value: selection.text()
      };
      options = exports.merge(defaultOptions, opts);
      selection.text('');
      textSelection = selection.append('a').class('hx-morph-toggle').text(options.value || options.enterValueText);
      input = detached('input').class('hx-name').attr('placeholder', options.enterValueText);
      confirm = detached('button').class('hx-btn hx-positive hx-confirm').add(detached('i').class('hx-icon hx-icon-check'));
      selection.append('div').class('hx-morph-content hx-input-group').add(input).add(confirm);
      InlineMorphSection.call(this, selector, enterEditMode(options));
      this.textSelection = textSelection;
      setValue = function () {
        var value;
        value = input.value();
        this$1.textSelection.text(value || options.enterValueText).classed('hx-inline-editable-no-value', !value.length);
        this$1.emit('change', {
          cause: 'user',
          value: value
        });
        return this$1.hide();
      };
      confirm.on('click', 'hx.inline-editable', setValue);
      input.on('keydown', 'hx.inline-editable', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
          return setValue();
        }
      });
    }

    if ( InlineMorphSection ) InlineEditable.__proto__ = InlineMorphSection;
    InlineEditable.prototype = Object.create( InlineMorphSection && InlineMorphSection.prototype );
    InlineEditable.prototype.constructor = InlineEditable;

    InlineEditable.prototype.value = function value (value$1) {
      if (value$1 !== void 0) {
        this.textSelection.text(value$1);
        return this.emit('change', {
          cause: 'api',
          value: value$1
        });
      } else {
        return this.textSelection.text();
      }
    };

    return InlineEditable;
  }(InlineMorphSection));
  enterEditMode = function(options) {
    return function(toggle, content) {
      var inputSel, value;
      value = select(toggle).text();
      inputSel = select(content).select('.hx-name');
      if (value !== options.enterValueText) {
        inputSel.value(value);
      }
      return inputSel.node().focus();
    };
  };

  return InlineEditable;

}).call(undefined);

var inlineEditable = function(options) {
  var selection;
  selection = detached('div');
  new InlineEditable(selection.node(), options);
  return selection;
};

var InlinePicker = (function() {
  var enterEditMode, exitEditMode;

  var InlinePicker = /*@__PURE__*/(function (InlineMorphSection) {
    function InlinePicker(selector, options) {
      var this$1 = this;

      var picker, pickerNode, resolvedOptions, selectedText, selection;
      // MorphSection registers the component
      resolvedOptions = exports.merge({
        renderer: void 0,
        items: [],
        contextClass: 'hx-complement',
        ddClass: void 0,
        noValueText: void 0,
        value: void 0
      }, options);
      selection = select(selector).classed('hx-inline-picker', true);
      pickerNode = detached('button').class('hx-btn ' + resolvedOptions.contextClass).node();
      selectedText = selection.append('a').class('hx-morph-toggle');
      selection.append('div').class('hx-morph-content hx-input-group').add(pickerNode).add(detached('button').class('hx-btn hx-positive hx-confirm').add(detached('i').class('hx-icon hx-icon-check')));
      picker = new PickerBase(pickerNode, {
        renderer: resolvedOptions.renderer,
        items: resolvedOptions.items,
        ddClass: resolvedOptions.ddClass,
        noValueText: resolvedOptions.noValueText
      });
      InlineMorphSection.call(this, selector, enterEditMode, exitEditMode, resolvedOptions);
      picker._.menu.dropdown.on('showstart', 'hx.inline-picker', function () {
        return this$1.detector.addException(picker._.menu.dropdown._.dropdown.node());
      });
      this._ = {
        current: void 0,
        renderer: resolvedOptions.renderer,
        options: resolvedOptions,
        picker: picker,
        selector: selector,
        selectedText: selectedText
      };
      if (this.renderer() == null) {
        this.renderer(picker.renderer());
      }
      if (resolvedOptions.value != null) {
        this.value(resolvedOptions.value);
      }
    }

    if ( InlineMorphSection ) InlinePicker.__proto__ = InlineMorphSection;
    InlinePicker.prototype = Object.create( InlineMorphSection && InlineMorphSection.prototype );
    InlinePicker.prototype.constructor = InlinePicker;

    InlinePicker.prototype.renderer = function renderer (f) {
      if (f != null) {
        this._.renderer = f;
        this._.picker.renderer(f);
        return this;
      } else {
        return this._.renderer;
      }
    };

    InlinePicker.prototype.items = function items (items$1) {
      if (items$1 != null) {
        this._.items = items$1;
        this._.picker.items(items$1);
        return this;
      } else {
        return this._.items;
      }
    };

    InlinePicker.prototype.value = function value (value$1) {
      if (arguments.length > 0) {
        this._.picker.value(value$1);
        this._.current = this._.picker.value();
        this._.selectedText.text(this._.current.text || this._.current);
        this.emit('change', {
          api: true,
          value: this._.current
        });
        return this;
      } else {
        return this._.current;
      }
    };

    return InlinePicker;
  }(InlineMorphSection));
  enterEditMode = function(toggle, content) {
    var this$1 = this;

    var _, ref;
    _ = this._;
    _.picker.value(((ref = _.current) != null ? ref.value : void 0) || _.current);
    return select(content).select('.hx-confirm').on('click', 'hx.inline-picker', function () {
      _.current = _.picker.value();
      _.selectedText.text(_.current.text || _.current);
      this$1.emit('change', {
        api: false,
        value: _.current
      });
      return this$1.hide();
    });
  };

  exitEditMode = function(toggle, content) {};

  return InlinePicker;

}).call(undefined);

var inlinePicker = function(options) {
  var selection;
  selection = detached('div');
  new InlinePicker(selection.node(), options);
  return selection;
};

var Stepper = function Stepper(selector, steps, options) {
  if ( options === void 0 ) options = {};

  this.selection = select(selector).classed('hx-stepper', true)
    .api('stepper', this)
    .api(this);

  this._ = {
    steps: [],
    suppressed: true,
    view: undefined,
  };

  this.options = options;

  this.steps(steps);
  this.selectedStep(options.selectedStep || 1);
  this.showTitles(options.showTitles || true);
  this.showError(options.showError || false);

  this._.suppressed = false;

  this.render();
};

Stepper.prototype.steps = function steps (steps$1) {
  if (arguments.length) {
    if (steps$1.length < 2) {
      throw new Error('Stepper: Expected at least two steps to display');
    }
    this._.steps = steps$1;
    this.options.selectedStep = 1;
    this.render();
    return this;
  }
  return this._.steps;
};

Stepper.prototype.selectedStep = function selectedStep (selectedStep$1) {
  if (arguments.length) {
    var numSteps = this.steps().length;
    if (selectedStep$1 && selectedStep$1 > 0 && selectedStep$1 <= numSteps) {
      this.options.selectedStep = selectedStep$1;
      this.options.showError = false;
      this.render();
    } else {
      logger.warn(("Stepper: Provided expected a number between 1 and " + numSteps + ". You provided: " + selectedStep$1));
    }
    return this;
  }
  return this.options.selectedStep;
};

Stepper.prototype.showTitles = function showTitles (showTitles$1) {
  if (arguments.length) {
    if (showTitles$1 !== this.showTitles()) {
      this.options.showTitles = showTitles$1;
      this.render();
    }
    return this;
  }
  return this.options.showTitles;
};

Stepper.prototype.prevStep = function prevStep () {
  if (this.selectedStep() > 1) {
    this.selectedStep(this.selectedStep() - 1);
  } else {
    logger.warn('Stepper: There is no previous step');
  }
  return this;
};

Stepper.prototype.nextStep = function nextStep () {
  if (this.selectedStep() < this.steps().length) {
    this.selectedStep(this.selectedStep() + 1);
  } else {
    logger.warn('Stepper: There is no next step');
  }
  return this;
};

Stepper.prototype.showError = function showError (showError$1) {
  if (arguments.length) {
    if (this.options.showError !== showError$1) {
      this.options.showError = showError$1;
      this.render();
    }
    return this;
  }
  return this.options.showError;
};

Stepper.prototype.render = function render () {
    var this$1 = this;

  if (this._.suppressed) {
    return this;
  }

  if (!this._.view) {
    this._.view = this.selection.view('.hx-stepper-step')
      .enter(function stepperEnter() {
        var enterSel = this;
        var stepNode = div('hx-stepper-step')
          .add(div('hx-stepper-progress-row')
            .add(div('hx-stepper-progress-before'))
            .add(div('hx-stepper-number'))
            .add(div('hx-stepper-progress-after')))
          .add(div('hx-stepper-title'));
        return enterSel.append(stepNode).node();
      })
      .update(function (step, node, nodeIndex) {
        var stepNumber = nodeIndex + 1;
        var stepNode = select(node);
        var numSteps = this$1.steps().length;
        var selectedStep = this$1.selectedStep();
        var showError = this$1.showError();
        var showTitles = this$1.showTitles();

        var stepperNumber = stepNode.select('.hx-stepper-number')
          .classed('hx-stepper-number-selected', stepNumber === selectedStep && !showError)
          .classed('hx-stepper-number-error', stepNumber === selectedStep && showError)
          .classed('hx-stepper-number-complete', stepNumber < selectedStep);

        if (stepNumber < selectedStep) {
          stepperNumber.set([i('hx-icon hx-icon-check')]);
        } else {
          stepperNumber.text(stepNumber);
        }

        stepNode.select('.hx-stepper-progress-before')
          .classed('hx-stepper-progress-incomplete', stepNumber > 1 && stepNumber > selectedStep)
          .classed('hx-stepper-progress-complete', stepNumber > 1 && stepNumber <= selectedStep);

        stepNode.select('.hx-stepper-progress-after')
          .classed('hx-stepper-progress-incomplete', stepNumber < numSteps && stepNumber >= selectedStep)
          .classed('hx-stepper-progress-complete', stepNumber < numSteps && stepNumber < selectedStep);

        stepNode.select('.hx-stepper-title')
          .classed('hx-stepper-title-hidden', !showTitles)
          .classed('hx-stepper-title-error', stepNumber === selectedStep && showTitles && showError)
          .text(step);
      });
  }

  this._.view.apply(this.steps());

  return this;
};

var validTypes = ['primary', 'secondary'];

function makeAction(btn) {
  var text = btn.text;
  var url = btn.url;
  var onClick = btn.onClick;
  var buttonType = btn.buttonType;

  var validButtonType = buttonType && validTypes.includes(buttonType);

  if (buttonType && !validButtonType) {
    logger.warn(("errorPage: Invalid button type selected '" + buttonType + "'. Available types: [" + (validTypes.join(', ')) + "]"));
  }

  var cls = "hx-btn" + (validButtonType ? (" hx-" + buttonType) : '');

  if (onClick) {
    return button(cls)
      .text(text)
      .on('click', onClick);
  }

  if (!url) {
    throw new Error(("errorPage: Button created with no 'onClick' or 'url': " + (JSON.stringify(btn))));
  }

  return detached('a')
    .class(cls)
    .text(text)
    .attr('href', url);
}

function errorPage(options) {
  if ( options === void 0 ) options = {};

  var title = options.title;
  var message = options.message;
  var buttons = options.buttons;

  if (!title) {
    throw new Error('errorPage: Cannot create an error page with no title.');
  }

  var buttonSel = (buttons || []).map(makeAction);

  return div('hx-error-message hx-flag-button hx-flag-typography')
    .add(div('hx-error-message-heading').text(title))
    .add(div('hx-error-message-body')
      .add(toMultilineSelection(message || '', 'p', true)))
    .add(div('hx-error-message-buttons')
      .add(buttonSel));
}

// Initialization

// XXX: these apis should be opt-in
initAnimate(); // XXX: remove
initMorphs(); // XXX: remove
initView(); // XXX: remove view and replace with reactive lists and reactive objects?
initPointerEvents(); // XXX: make into a selection middleware
initResizeEvents(); // XXX: make into a selection middleware
initLogos(); // XXX: remove
initTitleBar();


var doctypeIsValid = document.doctype
  && document.doctype.name === 'html'
  && !(document.doctype.publicId || document.doctype.systemId);

if (!doctypeIsValid) {
  logger.warn('Missing <!DOCTYPE html> tag - you may have CSS problems without this tag. To fix this add <!DOCTYPE html> to the top of your html file. Detected doctype:', document.doctype);
}

theme(currentTheme);

exports.AlertManager = AlertManager;
exports.AutoComplete = exports.Autocomplete;
exports.Collapsible = Collapsible;
exports.DateTimePicker = DateTimePicker;
exports.Dropdown = Dropdown;
exports.EventEmitter = EventEmitter;
exports.FileInput = FileInput;
exports.Form = Form;
exports.InlineEditable = InlineEditable;
exports.InlineMorphSection = InlineMorphSection;
exports.InlinePicker = InlinePicker;
exports.List = List;
exports.Map = Map;
exports.Meter = Meter;
exports.MorphSection = MorphSection;
exports.NotificationManager = NotificationManager;
exports.NumberPicker = NumberPicker;
exports.ProgressBar = ProgressBar$2;
exports.Selection = Selection;
exports.Set = Set;
exports.Sidebar = Sidebar;
exports.SingleSelect = SingleSelect;
exports.Stepper = Stepper;
exports.TitleBar = TitleBar;
exports.VisualizationBar = VisualizationBar;
exports.alert = alert;
exports.autoComplete = exports.autocomplete;
exports.badge = badge;
exports.button = button;
exports.checkParents = checkParents;
exports.checkbox = checkbox;
exports.cleanNode = cleanNode;
exports.color = color;
exports.component = component;
exports.components = components;
exports.dateTimeLocalizer = dateTimeLocalizer;
exports.dateTimePicker = dateTimePicker;
exports.detached = detached;
exports.div = div;
exports.dropdownButton = dropdownButton;
exports.ease = ease;
exports.errorPage = errorPage;
exports.fileInput = fileInput;
exports.getThemeVariable = getThemeVariable;
exports.group = group;
exports.html = html;
exports.i = i;
exports.icon = icon;
exports.initializeCollapsibles = initializeCollapsibles;
exports.inlineEditable = inlineEditable;
exports.inlinePicker = inlinePicker;
exports.input = input;
exports.inputGroup = inputGroup;
exports.interpolate = interpolate;
exports.isColor = isColor;
exports.isColorString = isColorString;
exports.isElement = isElement;
exports.isSelection = isSelection;
exports.json = json;
exports.label = label;
exports.logger = logger;
exports.loop = loop;
exports.message = message;
exports.meter = meter;
exports.modalCenter = modalCenter;
exports.modalFullScreen = modalFullScreen;
exports.modalRight = modalRight;
exports.moreButton = moreButton;
exports.notice = notice;
exports.noticeBody = noticeBody;
exports.noticeHead = noticeHead;
exports.numberPicker = numberPicker;
exports.palette = palette$1;
exports.parentZIndex = parentZIndex;
exports.parseHTML = parseHTML;
exports.preferences = preferences;
exports.progressBar = progressBar;
exports.request = request;
exports.scrollbarSize = scrollbarSize;
exports.section = section;
exports.select = select;
exports.selectAll = selectAll;
exports.singleSelect = singleSelect;
exports.span = span;
exports.spinner = spinner;
exports.spinnerWide = spinnerWide;
exports.text = text;
exports.theme = theme;
exports.titleBar = titleBar;
exports.tooltip = tooltip;
exports.transition = transition;
exports.validateForm = validateForm;
exports.version = version;
exports.visualizationBar = visualizationBar;
