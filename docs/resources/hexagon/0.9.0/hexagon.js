/*
  hexagon.js
  version: 0.9.0
  themes:
    default
  modules:
    set
    map
    list
    util
    color
    selection
    transition
    event-emitter
    interpolate
    animate
    pointer-events
    morphs
    click-detector
    button
    dropdown
    collapsible
    sort
    view
    format
    number-picker
    input-group
    layout
    spinner
    menu
    filter
    date-picker
    time-picker
    request
    tag-input
    modal
    notify
    form
    slider
    autocomplete
    base
    color-picker
    color-scale
    crumbtrail
    dashboard
    date-time-picker
    drawing
    error-pages
    extended-table
    fast-click
    form-builder
    label
    paginator
    palette
    plot
    preferences
    progress-bar
    search-dom
    table
    tabs
    time-slider
    titlebar
    tree
*/

(function(){
var hx = window.hx = {};
hx.theme = {
    "dropdown": {
  "spacing": "0"
},
    "paginator": {
  "arrowButton": "",
  "defaultButton": "hx-compliment",
  "selectedButton": "hx-positive"
},
    "palette": {
  "defaultCol": "#6582A6",
  "positiveCol": "#6FB365",
  "warningCol": "#CB9856",
  "negativeCol": "#C74967",
  "infoCol": "#A36FA9",
  "complimentCol": "#FDFDFD",
  "contrastCol": "#3D3D3D",
  "lightTextCol": "#F3F3F3",
  "darkTextCol": "#3D3D3D"
},
    "plot": {
  "colors": [
    "rgb(177,119,190)",
    "rgb(90,155,212)",
    "rgb(241,90,113)",
    "rgb(151,195,102)",
    "rgb(250,169,91)",
    "rgb(226,212,64)"
  ],
  "warmCol": "rgb(250,169,91)",
  "ambientCol": "rgb(226,212,64)",
  "coldCol": "rgb(90,155,212)",
  "positiveCol": "rgb(151,195,102)",
  "warningCol": "rgb(226,212,64)",
  "negativeCol": "rgb(241,90,113)"
}
  };
// set
(function(){
var Set, checkPrefix, prefix, prefixChar, prefixString;

prefixString = '\0';

prefixChar = prefixString.charCodeAt(0);

prefix = function(string) {
  return prefixString + string;
};

checkPrefix = function(string) {
  return string && string.charCodeAt(0) === prefixChar;
};

Set = (function() {
  function Set(iterable) {
    var x, _i, _len;
    if (iterable) {
      for (_i = 0, _len = iterable.length; _i < _len; _i++) {
        x = iterable[_i];
        this.add(x);
      }
    }
    this.size = 0;
  }

  Set.prototype.add = function(value) {
    if (!(prefix(value) in this)) {
      this.size++;
    }
    this[prefix(value)] = value;
    return this;
  };

  Set.prototype.clear = function() {
    var k;
    for (k in this) {
      if (checkPrefix(k)) {
        delete this[k];
      }
    }
    this.size = 0;
    return void 0;
  };

  Set.prototype["delete"] = function(value) {
    var prefixedKey;
    prefixedKey = prefix(value);
    if (prefixedKey in this && delete this[prefixedKey]) {
      this.size--;
      return true;
    } else {
      return false;
    }
  };

  Set.prototype.entries = function() {
    var items, k, v;
    items = [];
    for (k in this) {
      v = this[k];
      if (checkPrefix(k)) {
        items.push([v, v]);
      }
    }
    return items;
  };

  Set.prototype.forEach = function(f, thisArg) {
    var k, v;
    if (thisArg == null) {
      thisArg = this;
    }
    for (k in this) {
      v = this[k];
      if (checkPrefix(k)) {
        f.call(thisArg, v);
      }
    }
    return void 0;
  };

  Set.prototype.has = function(value) {
    return prefix(value) in this;
  };

  Set.prototype.keys = function() {
    return this.values();
  };

  Set.prototype.values = function() {
    var d, items, v;
    items = [];
    for (d in this) {
      v = this[d];
      if (checkPrefix(d)) {
        items.push(v);
      }
    }
    return items;
  };

  return Set;

})();

hx.Set = Set;

})();

// map
(function(){
var Map, checkPrefix, prefix, prefixChar, prefixString;

prefixString = '\0';

prefixChar = prefixString.charCodeAt(0);

prefix = function(string) {
  return prefixString + string;
};

checkPrefix = function(string) {
  return string && string.charCodeAt(0) === prefixChar;
};

Map = (function() {
  function Map(iterable) {
    var x, _i, _len;
    this.size = 0;
    if (iterable) {
      for (_i = 0, _len = iterable.length; _i < _len; _i++) {
        x = iterable[_i];
        this.set(x[0], x[1]);
      }
    }
  }

  Map.prototype.clear = function() {
    var k;
    for (k in this) {
      if (checkPrefix(k)) {
        delete this[k];
      }
    }
    return this.size = 0;
  };

  Map.prototype["delete"] = function(key) {
    var prefixedKey;
    prefixedKey = prefix(key);
    if (prefixedKey in this && delete this[prefixedKey]) {
      this.size--;
    }
    return this;
  };

  Map.prototype.entries = function() {
    var items, k, v;
    items = [];
    for (k in this) {
      v = this[k];
      if (checkPrefix(k)) {
        items.push([k.substring(1), v]);
      }
    }
    return items;
  };

  Map.prototype.forEach = function(f, thisArg) {
    var k, v;
    if (thisArg == null) {
      thisArg = this;
    }
    for (k in this) {
      v = this[k];
      if (checkPrefix(k)) {
        f.call(thisArg, k.substring(1), v);
      }
    }
    return this;
  };

  Map.prototype.get = function(key) {
    if (prefix(key) in this) {
      return this[prefix(key)];
    }
  };

  Map.prototype.has = function(key) {
    return prefix(key) in this;
  };

  Map.prototype.keys = function() {
    var k, keys;
    keys = [];
    for (k in this) {
      if (checkPrefix(k)) {
        keys.push(k.substring(1));
      }
    }
    return keys;
  };

  Map.prototype.set = function(key, value) {
    if (!(prefix(key) in this)) {
      this.size++;
    }
    this[prefix(key)] = value;
    return this;
  };

  Map.prototype.values = function() {
    var items, k, v;
    items = [];
    for (k in this) {
      v = this[k];
      if (checkPrefix(k)) {
        items.push(v);
      }
    }
    return items;
  };

  return Map;

})();

hx.Map = Map;

})();

// list
(function(){
var List;

List = (function() {
  function List(list) {
    this.list = list != null ? list : [];
    this.size = this.list.length;
  }

  List.prototype.add = function(item) {
    this.list.push(item);
    this.size++;
    return this;
  };

  List.prototype.clear = function() {
    this.list = [];
    this.size = 0;
    return this;
  };

  List.prototype["delete"] = function(index) {
    if ((0 <= index && index < this.list.length)) {
      this.list.splice(index, 1);
      this.size--;
      return true;
    } else {
      return false;
    }
  };

  List.prototype.entries = function() {
    return this.list;
  };

  List.prototype.forEach = function(f, thisArg) {
    var item, _i, _len, _ref;
    if (thisArg == null) {
      thisArg = this;
    }
    _ref = this.list;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      f.call(thisArg, item);
    }
    return void 0;
  };

  List.prototype.get = function(index) {
    if ((0 <= index && index < this.list.length)) {
      return this.list[index];
    } else {
      return void 0;
    }
  };

  List.prototype.has = function(item) {
    return this.list.indexOf(item) !== -1;
  };

  List.prototype.remove = function(value) {
    var i;
    if ((i = this.list.indexOf(value)) !== -1) {
      this.list.splice(i, 1);
      this.size--;
      return true;
    } else {
      return false;
    }
  };

  List.prototype.removeAll = function(value) {
    var i, removed;
    removed = 0;
    while ((i = this.list.indexOf(value)) !== -1) {
      this.list.splice(i, 1);
      this.size--;
      removed++;
    }
    return removed;
  };

  List.prototype.values = function() {
    return this.list;
  };

  return List;

})();

hx.List = List;

})();

// util
(function(){
var hx_extend, hx_merge, hx_parseHTML, supportsDate, supportsTouch, vendorPrefixes,
  __slice = [].slice;

hx.deprecatedWarning = function() {
  var deprecatedItem, messages;
  deprecatedItem = arguments[0], messages = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  console.groupCollapsed("Deprecation Warning: " + deprecatedItem);
  if (messages.length > 0) {
    console.warn.apply(console, ['Alternatives:'].concat(messages));
  }
  console.trace('Stack Trace');
  return console.groupEnd();
};

hx.consoleWarning = function() {
  var groupHeading, messages;
  groupHeading = arguments[0], messages = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  console.groupCollapsed(groupHeading);
  if (messages.length > 0) {
    console.warn.apply(console, messages);
  }
  console.trace('Stack Trace');
  return console.groupEnd();
};

hx.hash = function(str, max) {
  var i, len, res, _i;
  res = 0;
  len = str.length - 1;
  for (i = _i = 0; _i <= len; i = _i += 1) {
    res = res * 31 + str.charCodeAt(i);
    res = res & res;
  }
  if (max) {
    return Math.abs(res) % max;
  } else {
    return res;
  }
};

hx.transpose = function(data) {
  var h, i, j, transposed, w, _i, _j;
  if (data.length == null) {
    return void 0;
  }
  w = data.length;
  if (w === 0 || (data[0].length == null)) {
    return data;
  }
  h = data[0].length;
  transposed = new Array(h);
  for (i = _i = 0; _i < h; i = _i += 1) {
    transposed[i] = new Array(w);
    for (j = _j = 0; _j < w; j = _j += 1) {
      transposed[i][j] = data[j][i];
    }
  }
  return transposed;
};

supportsTouch = void 0;

supportsDate = void 0;

hx.supports = function(name) {
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

hx.isChild = function(parent, child) {
  hx.deprecatedWarning('hx.isChild', 'use Node.contains instead');
  return parent.contains(child);
};

hx.clamp = function(min, max, value) {
  return Math.min(max, Math.max(min, value));
};

hx.clampUnit = function(value) {
  return hx.clamp(0, 1, value);
};

hx.randomId = function(size, alphabet) {
  var alphabetSize, chars, _;
  if (size == null) {
    size = 16;
  }
  if (alphabet == null) {
    alphabet = 'ABCEDEF0123456789';
  }
  chars = alphabet.split('');
  alphabetSize = chars.length;
  return ((function() {
    var _i, _results;
    _results = [];
    for (_ = _i = 0; _i < size; _ = _i += 1) {
      _results.push(chars[Math.floor(Math.random() * alphabetSize)]);
    }
    return _results;
  })()).join('');
};

hx.min = function(values, f) {
  if (f != null) {
    hx.consoleWarning('hx.min', 'hx.min no longer supports a second parameter to do transformations - apply transformations before passing into min:', 'eg hx.min(array.map(f)) instead of hx.min(array, f)');
  }
  return Math.min.apply(null, values != null ? values.filter(hx.defined) : void 0);
};

hx.minBy = function(values, f) {
  var fv, i, min, minValue, v, _i, _j, _len, _ref;
  if ((values == null) || values.length === 0) {
    return void 0;
  }
  if (f) {
    min = values[0];
    minValue = f(min);
    for (i = _i = 1, _ref = values.length - 1; _i < _ref; i = _i += 1) {
      v = values[i];
      if (v !== void 0) {
        fv = f(v);
        if (fv !== void 0 && fv < minValue) {
          min = v;
          minValue = fv;
        }
      }
    }
    return min;
  } else {
    min = values[0];
    for (_j = 0, _len = values.length; _j < _len; _j++) {
      v = values[_j];
      if (v !== void 0 && v < min) {
        min = v;
      }
    }
    return min;
  }
};

hx.max = function(values, f) {
  if (f != null) {
    hx.consoleWarning('hx.max', 'hx.max no longer supports a second parameter to do transformations - apply transformations before passing into max:', 'eg hx.max(array.map(f)) instead of hx.max(array, f)');
  }
  return Math.max.apply(null, values != null ? values.filter(hx.defined) : void 0);
};

hx.maxBy = function(values, f) {
  var fv, i, max, maxValue, v, _i, _j, _len, _ref;
  if ((values == null) || values.length === 0) {
    return void 0;
  }
  if (f) {
    max = values[0];
    maxValue = f(max);
    for (i = _i = 1, _ref = values.length - 1; _i < _ref; i = _i += 1) {
      v = values[i];
      if (v !== void 0) {
        fv = f(v);
        if (fv !== void 0 && fv > maxValue) {
          max = v;
          maxValue = fv;
        }
      }
    }
    return max;
  } else {
    max = values[0];
    for (_j = 0, _len = values.length; _j < _len; _j++) {
      v = values[_j];
      if (v !== void 0 && v > max) {
        max = v;
      }
    }
    return max;
  }
};

hx.range = function(length) {
  var x, _i, _results;
  _results = [];
  for (x = _i = 0; _i < length; x = _i += 1) {
    _results.push(x);
  }
  return _results;
};

hx.sum = function(values, f) {
  if (f != null) {
    hx.consoleWarning('hx.sum no longer supports a second parameter to do transformations - apply transformations before passing into sum:', 'eg hx.sum(array.map(f)) instead of hx.sum(array, f)');
  }
  return values.reduce(function(a, b) {
    return a + b;
  });
};

hx.flatten = function(arr) {
  return [].concat.apply([], arr);
};

hx.cycle = function(list, i) {
  return list[i % list.length];
};

hx.hashList = function(list, str) {
  return list[hx.hash(str, list.length)];
};

hx.find = function(arr, f) {
  var d, _i, _len;
  for (_i = 0, _len = arr.length; _i < _len; _i++) {
    d = arr[_i];
    if (f(d)) {
      return d;
    }
  }
  return void 0;
};

hx.isString = function(x) {
  return typeof x === 'string' || x instanceof String;
};

hx.isFunction = function(x) {
  return typeof x === "function";
};

hx.isArray = function(x) {
  return x instanceof Array;
};

hx.isObject = function(obj) {
  return typeof obj === 'object' && !hx.isArray(obj);
};

hx.isPlainObject = function(obj) {
  return (typeof obj === 'object') && (!obj.nodeType) && obj.constructor && obj.constructor.prototype.hasOwnProperty('isPrototypeOf');
};

hx.groupBy = function(arr, f) {
  var category, map, values, x, _i, _len;
  map = new hx.Map;
  for (_i = 0, _len = arr.length; _i < _len; _i++) {
    x = arr[_i];
    category = f(x);
    if (!map.has(category)) {
      map.set(category, new hx.List);
    }
    map.get(category).add(x);
  }
  values = map.entries();
  values.forEach(function(d) {
    return d[1] = d[1].entries();
  });
  return values;
};

hx.unique = function(list) {
  return new hx.Set(list).values();
};

hx.endsWith = function(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
};

hx.startsWith = function(string, substring) {
  return string.lastIndexOf(substring, 0) === 0;
};

hx.tween = function(start, end, amount) {
  return start + (end - start) * amount;
};

hx.defined = function(x) {
  return x !== void 0;
};

hx.zip = function(arrays) {
  var i, length, _i, _results;
  if (arrays) {
    if (arrays.length > 0) {
      length = hx.min(arrays.map(function(d) {
        return d.length || 0;
      }));
      if (length > 0) {
        _results = [];
        for (i = _i = 0; _i < length; i = _i += 1) {
          _results.push(arrays.map(function(arr) {
            return arr[i];
          }));
        }
        return _results;
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

hx_extend = function(target, overlay, retainUndefined) {
  var k, v, _results;
  _results = [];
  for (k in overlay) {
    v = overlay[k];
    if (hx.isPlainObject(v)) {
      if (target[k] == null) {
        target[k] = {};
      }
      _results.push(hx_extend(target[k], v, retainUndefined));
    } else {
      if (v !== void 0 || retainUndefined) {
        _results.push(target[k] = hx.clone(v));
      } else {
        _results.push(void 0);
      }
    }
  }
  return _results;
};

hx_merge = function(deep, retainUndefined, objects) {
  var k, obj, res, v, _i, _j, _len, _len1;
  if (deep) {
    res = {};
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      obj = objects[_i];
      if (hx.isPlainObject(obj)) {
        hx_extend(res, obj, retainUndefined);
      }
    }
    return res;
  } else {
    res = {};
    for (_j = 0, _len1 = objects.length; _j < _len1; _j++) {
      obj = objects[_j];
      if (hx.isPlainObject(obj)) {
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

hx.merge = function() {
  var objects, retainUndefined;
  retainUndefined = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return hx_merge(true, retainUndefined, objects);
};

hx.shallowMerge = function() {
  var objects, retainUndefined;
  retainUndefined = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return hx_merge(false, retainUndefined, objects);
};

hx.clone = function(obj) {
  if (hx.isArray(obj)) {
    return obj.map(hx.clone);
  } else if (hx.isPlainObject(obj)) {
    return hx.merge(true, {}, obj);
  } else if (hx.isObject(obj)) {
    return {};
  } else {
    return obj;
  }
};

hx.shallowClone = function(obj) {
  if (hx.isArray(obj)) {
    return obj.slice();
  } else if (hx.isPlainObject(obj)) {
    return hx.shallowMerge(true, {}, obj);
  } else if (hx.isObject(obj)) {
    return {};
  } else {
    return obj;
  }
};

vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];

hx.vendor = function(obj, prop) {
  var p, prefixedProp, _i, _len;
  if (prop in obj) {
    return obj[prop];
  }
  for (_i = 0, _len = vendorPrefixes.length; _i < _len; _i++) {
    p = vendorPrefixes[_i];
    if ((prefixedProp = p + prop.charAt(0) + prop.slice(1)) in obj) {
      return obj[prefixedProp];
    }
  }
};

hx.identity = function(d) {
  return d;
};

hx_parseHTML = null;

hx.parseHTML = function(html) {
  var e;
  if (!hx_parseHTML) {

    /* istanbul ignore next: phantom/safari dont support create contextual fragment so use a slower method. */
    try {
      document.createRange().createContextualFragment('');
      hx_parseHTML = function(html) {
        return document.createRange().createContextualFragment(html);
      };
    } catch (_error) {
      e = _error;
      hx_parseHTML = function(html) {
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
  return hx_parseHTML(html);
};

hx.cleanNode = function(node, recurse) {
  var child, n;
  if (recurse == null) {
    recurse = true;
  }
  n = node.childNodes.length - 1;
  while (n >= 0) {
    child = node.childNodes[n];
    if (child.nodeType === 3 && /\s/.test(child.nodeValue)) {
      node.removeChild(child);
    } else if (child.nodeType === 1 && recurse) {
      hx.cleanNode(child);
    }
    n -= 1;
  }
  return node;
};

})();

// color
(function(){
var Color, fromArray, fromString;

Color = (function() {
  var componentToHex, hslFromRGB, hueToRGB, rgbFromHSL;

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

  componentToHex = function(c) {
    var hex;
    hex = c.toString(16);
    if (hex.length === 1) {
      return '0' + hex;
    } else {
      return hex;
    }
  };

  rgbFromHSL = function(hsl) {
    var b, g, h, l, p, q, r, s;
    h = hsl[0];
    s = hsl[1];
    l = hsl[2];
    s = hx.clampUnit(s);
    l = hx.clampUnit(l);
    if (s === 0) {
      r = g = b = l;
    } else {
      q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      p = 2 * l - q;
      r = hueToRGB(p, q, h + 1 / 3);
      g = hueToRGB(p, q, h);
      b = hueToRGB(p, q, h - 1 / 3);
    }
    r *= 255;
    g *= 255;
    b *= 255;
    return [r, g, b];
  };

  hslFromRGB = function(rgb) {
    var b, c, g, h, l, max, min, r, s;
    r = rgb[0] / 255;
    g = rgb[1] / 255;
    b = rgb[2] / 255;
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
    return [h, s, l];
  };

  function Color(r, g, b, a, h, s, l) {
    this.r = r != null ? r : 0;
    this.g = g != null ? g : 0;
    this.b = b != null ? b : 0;
    this.a = a != null ? a : 1;
    this.h = h != null ? h : 0;
    this.s = s != null ? s : 0;
    this.l = l != null ? l : 0;
  }

  Color.prototype.getTextCol = function() {
    var yiq;
    yiq = ((this.r * 299) + (this.g * 587) + (this.b * 114)) / 1000;
    if (yiq >= 128) {
      return 'black';
    } else {
      return 'white';
    }
  };

  Color.prototype.setRGB = function(arr, noCallback) {
    if (arr == null) {
      arr = [];
    }
    if (arr[0] == null) {
      arr[0] = this.r;
    }
    if (arr[1] == null) {
      arr[1] = this.g;
    }
    if (arr[2] == null) {
      arr[2] = this.b;
    }
    if (arr[3] == null) {
      arr[3] = this.a;
    }
    this.r = Math.round(Number(arr[0]));
    this.g = Math.round(Number(arr[1]));
    this.b = Math.round(Number(arr[2]));
    this.a = Math.round(Number(arr[3]) * 100) / 100;
    if (!noCallback) {
      this.setHSL(hslFromRGB([this.r, this.g, this.b]), 1);
    }
    return this;
  };

  Color.prototype.setHSL = function(arr, noCallback) {
    if (arr == null) {
      arr = [];
    }
    if (arr[0] == null) {
      arr[0] = this.h;
    }
    if (arr[1] == null) {
      arr[1] = this.s;
    }
    if (arr[2] == null) {
      arr[2] = this.l;
    }
    if (arr[3] == null) {
      arr[3] = this.a;
    }
    if (arr[0] > 1) {
      arr[0] /= 360;
    }
    if (arr[1] > 1) {
      arr[1] /= 100;
    }
    if (arr[2] > 1) {
      arr[2] /= 100;
    }
    this.h = Number(arr[0]);
    this.s = Number(arr[1]);
    this.l = Number(arr[2]);
    this.a = Math.round(Number(arr[3]) * 100) / 100;
    if (!noCallback) {
      this.setRGB(rgbFromHSL([this.h, this.s, this.l]), 1);
    }
    return this;
  };

  Color.prototype.toString = function(type) {
    var h, l, s;
    h = Math.round(this.h * 360);
    s = Math.round(this.s * 100);
    l = Math.round(this.l * 100);
    switch (type) {
      case 'hsl':
        return "hsl(" + h + "," + s + "%," + l + "%)";
      case 'hsla':
        return "hsla(" + h + "," + s + "%," + l + "%," + this.a + ")";
      case 'rgb':
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
      case 'rgba':
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
      default:
        if (this.a !== 1) {
          return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
        } else {
          return '#' + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
        }
    }
  };

  Color.prototype.toArray = function() {
    return [this.r, this.g, this.b, this.a];
  };

  Color.prototype.mix = function(col, amount) {
    var a, b, g, r;
    if (amount == null) {
      amount = 0.5;
    }
    r = this.r * (1 - amount) + col.r * amount;
    g = this.g * (1 - amount) + col.g * amount;
    b = this.b * (1 - amount) + col.b * amount;
    a = this.a * (1 - amount) + col.a * amount;
    return this.setRGB([r, g, b, a]);
  };

  Color.prototype.range = function(numLight, numDark, maxRange, outputFormat) {
    var dark, light, list, self, step;
    if (numLight == null) {
      numLight = 3;
    }
    if (numDark == null) {
      numDark = 3;
    }
    if (maxRange == null) {
      maxRange = 0.5;
    }
    step = maxRange / Math.max(numLight, numDark, 1);
    self = this;
    light = hx.range(numLight + 1).map(function(i) {
      return self.clone().lighten(step * i);
    });
    dark = hx.range(numDark).reverse().map(function(i) {
      return self.clone().darken(step * (i + 1));
    });
    list = dark.concat(light);
    if (outputFormat) {
      if (outputFormat === 'array') {
        return list.map(function(c) {
          return c.toArray();
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

  Color.prototype.saturate = function(amount) {
    this.s = this.s + (this.s * amount);
    return this.setHSL([this.h, this.s, this.l]);
  };

  Color.prototype.desaturate = function(amount) {
    this.s = this.s - (this.s * amount);
    return this.setHSL([this.h, this.s, this.l]);
  };

  Color.prototype.saturation = function(value) {
    if (this.s !== 0) {
      this.s = value;
    }
    return this.setHSL([this.h, this.s, this.l]);
  };

  Color.prototype.lighten = function(amount) {
    this.l = this.l + (this.l * amount);
    return this.setHSL([this.h, this.s, this.l]);
  };

  Color.prototype.darken = function(amount) {
    this.l = this.l - (this.l * amount);
    return this.setHSL([this.h, this.s, this.l]);
  };

  Color.prototype.lightness = function(value) {
    this.l = value;
    return this.setHSL([this.h, this.s, this.l]);
  };

  Color.prototype.fadeIn = function(amount) {
    this.a = Math.round((this.a + (this.a * amount)) * 100) / 100;
    if (this.a > 1) {
      this.a = 1;
    }
    return this;
  };

  Color.prototype.fadeOut = function(amount) {
    this.a = Math.round((this.a - (this.a * amount)) * 100) / 100;
    if (this.a < 0) {
      this.a = 0;
    }
    return this;
  };

  Color.prototype.alpha = function(value) {
    this.a = value;
    return this;
  };

  Color.prototype.clone = function() {
    return new Color(this.r, this.g, this.b, this.a, this.h, this.s, this.l);
  };

  return Color;

})();

fromString = function(str) {
  var a, b, g, hsl, multiplier, r, rgb, rgbArr, string;
  if (!hx.isString(str)) {
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
    return (new Color).setHSL(hsl);
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
  return (new Color).setRGB(rgb);
};

fromArray = function(arr) {
  arr[0] = hx.clamp(0, 255, arr[0]);
  arr[1] = hx.clamp(0, 255, arr[1]);
  arr[2] = hx.clamp(0, 255, arr[2]);
  if (arr[3] == null) {
    arr[3] = 1;
  }
  arr[3] = hx.clamp(0, 1, arr[3]);
  return (new Color()).setRGB(arr);
};

hx.color = function() {
  if (arguments.length === 4) {
    return (new Color).setRGB([arguments[0], arguments[1], arguments[2], arguments[3]]);
  } else if (arguments.length === 3) {
    return (new Color).setRGB([arguments[0], arguments[1], arguments[2], 1]);
  } else if (arguments.length === 1) {
    if (Array.isArray(arguments[0])) {
      return fromArray(arguments[0]);
    } else {
      return fromString(arguments[0]);
    }
  } else {
    return new Color();
  }
};

hx.color.isColorString = function(str) {
  return fromString(str) !== void 0;
};

hx.color.isColor = function(obj) {
  return obj instanceof Color;
};

})();

// selection
(function(){
var ElementSet, Selection, augmenters, classed, closestParent, flattenNodes, getHexagonElementDataObject, namespaces, reformed, select, selectAll, selectSingle;

namespaces = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};

selectSingle = function(selector, node) {
  return node.querySelector(selector);
};

selectAll = function(selector, node) {
  return node.querySelectorAll(selector);
};

if (typeof Sizzle === "function") {
  selectSingle = function(selector, node) {
    return Sizzle(selector, node)[0] || null;
  };
  selectAll = Sizzle;
}

getHexagonElementDataObject = function(element, createIfNotExists) {
  if (createIfNotExists == null) {
    createIfNotExists = true;
  }
  if (createIfNotExists) {
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

ElementSet = (function() {
  function ElementSet() {
    this.elements = new hx.List;
    this.ids = new hx.Set;
  }

  ElementSet.prototype.add = function(element) {
    var d, id;
    d = getHexagonElementDataObject(element);
    if (d.id == null) {
      d.id = hx.randomId();
    }
    id = d.id;
    if (!this.ids.has(id)) {
      this.ids.add(id);
      return this.elements.add(element);
    }
  };

  ElementSet.prototype.remove = function(element) {
    var d;
    d = getHexagonElementDataObject(element, false);
    if (d && d.id) {
      if (this.ids.has(d.id)) {
        this.elements.remove(element);
        return this.ids["delete"](d.id);
      }
    }
  };

  ElementSet.prototype.entries = function() {
    return this.elements.entries();
  };

  ElementSet.prototype.has = function(element) {
    var d;
    d = getHexagonElementDataObject(element);
    return d && d.id && this.ids.has(d.id) || false;
  };

  return ElementSet;

})();

closestParent = function(selector, node) {
  var matches;
  node = node.parentNode;

  /* istanbul ignore next */
  matches = (function() {
    if (node.matches) {
      return 'matches';
    } else if (node.matchesSelector) {
      return 'matchesSelector';
    } else if (node.mozMatchesSelector) {
      return 'mozMatchesSelector';
    } else if (node.webkitMatchesSelector) {
      return 'webkitMatchesSelector';
    } else if (node.oMatchesSelector) {
      return 'oMatchesSelector';
    } else if (node.msMatchesSelector) {
      return 'msMatchesSelector';
    } else {
      throw new Error("Dom matches method is not available (and is needed for closest())");
    }
  })();
  while (node && node !== document) {
    if (node[matches](selector)) {
      return node;
    }
    node = node.parentNode;
  }
  return void 0;
};

flattenNodes = function(nodes) {
  var node, nodearray, set, _i, _j, _len, _len1;
  set = new ElementSet;
  for (_i = 0, _len = nodes.length; _i < _len; _i++) {
    nodearray = nodes[_i];
    for (_j = 0, _len1 = nodearray.length; _j < _len1; _j++) {
      node = nodearray[_j];
      set.add(node);
    }
  }
  return set.entries();
};

classed = function(node, _class, include) {
  var c, i, list, selection;
  selection = hx.select(node);
  c = selection.attr('class');
  if (!c) {
    if (include) {
      selection.attr('class', _class);
    }
    return selection;
  }
  list = c.split(' ');
  i = list.indexOf(_class);
  if (include && i === -1) {
    list.push(_class);
  } else if (!include && i !== -1) {
    list.splice(i, 1);
  }
  return selection.attr('class', list.join(' '));
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

Selection = (function() {
  var attach, attachSingle;

  function Selection(nodes) {
    this.nodes = nodes;
    this.nodes = this.nodes.filter(function(d) {
      return d != null;
    });
    this.singleSelection = false;
    this.longestTransition = 0;
  }

  Selection.prototype.select = function(selector) {
    var s;
    if (!hx.isString(selector)) {
      hx.consoleWarning('Selection.select was passed the wrong argument type', 'Selection.select only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      s = new Selection(this.nodes.map(function(node) {
        return selectSingle(selector, node);
      }));
      s.singleSelection = this.singleSelection;
      return s;
    }
  };

  Selection.prototype.selectAll = function(selector) {
    if (!hx.isString(selector)) {
      hx.consoleWarning('Selection.selectAll was passed the wrong argument type', 'Selection.selectAll only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      return new Selection(flattenNodes(this.nodes.map(function(node) {
        return selectAll(selector, node);
      })));
    }
  };

  Selection.prototype.closest = function(selector) {
    var s;
    s = !hx.isString(selector) ? (hx.consoleWarning('Selection.closest was passed the wrong argument type', 'Selection.closest only accepts a string argument, you supplied:', selector), new Selection([])) : new Selection(this.nodes.map(function(node) {
      return closestParent(selector, node);
    }));
    s.singleSelection = this.singleSelection;
    return s;
  };

  attachSingle = function(selection, element, attacher) {
    var namespace, newNode, node, _i, _len, _ref, _results;
    if (element instanceof HTMLElement) {
      if (selection.singleSelection) {
        if (selection.nodes.length === 1) {
          attacher(selection.nodes[0], element);
          return [element];
        } else {
          return [];
        }
      } else {
        hx.consoleWarning('Selection Api error when attaching element', 'You can not attach an existing element to a selection with multiple elements');
        return [];
      }
    } else {
      _ref = selection.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        namespace = namespaces.hasOwnProperty(element) ? namespaces[element] : node.namespaceURI;
        newNode = node.ownerDocument.createElementNS(namespace, element);
        attacher(node, newNode);
        _results.push(newNode);
      }
      return _results;
    }
  };

  attach = function(selection, name, attacher, reverse) {
    var dir, element, newNodes, ns, s, singleSelection;
    if (reverse == null) {
      reverse = false;
    }
    singleSelection = selection.singleSelection;
    newNodes = name instanceof Selection ? (singleSelection = singleSelection && name.singleSelection, dir = reverse ? -1 : 1, ns = (function() {
      var _i, _len, _ref, _results;
      _ref = name.nodes;
      _results = [];
      for ((dir > 0 ? (_i = 0, _len = _ref.length) : _i = _ref.length - 1); dir > 0 ? _i < _len : _i >= 0; _i += dir) {
        element = _ref[_i];
        _results.push(attachSingle(selection, element, attacher));
      }
      return _results;
    })(), hx.flatten(reverse ? ns.reverse() : ns)) : hx.isArray(name) ? (singleSelection = false, dir = reverse ? -1 : 1, ns = (function() {
      var _i, _len, _results;
      _results = [];
      for ((dir > 0 ? (_i = 0, _len = name.length) : _i = name.length - 1); dir > 0 ? _i < _len : _i >= 0; _i += dir) {
        element = name[_i];
        _results.push(attachSingle(selection, element, attacher));
      }
      return _results;
    })(), hx.flatten(reverse ? ns.reverse() : ns)) : attachSingle(selection, name, attacher);
    s = new Selection(newNodes);
    s.singleSelection = singleSelection;
    return s;
  };

  Selection.prototype.prepend = function(name) {
    return attach(this, name, (function(parent, node) {
      return parent.insertBefore(node, parent.firstChild);
    }), true);
  };

  Selection.prototype.append = function(name) {
    return attach(this, name, function(parent, node) {
      return parent.appendChild(node);
    });
  };

  Selection.prototype.insertBefore = function(name) {
    return attach(this, name, function(parent, node) {
      return parent.parentNode.insertBefore(node, parent);
    });
  };

  Selection.prototype.insertAfter = function(name) {
    return attach(this, name, (function(parent, node) {
      return parent.parentNode.insertBefore(node, parent.nextSibling);
    }), true);
  };

  Selection.prototype.remove = function() {
    var node, _i, _len, _ref, _ref1, _results;
    _ref = this.nodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push((_ref1 = node.parentNode) != null ? _ref1.removeChild(node) : void 0);
    }
    return _results;
  };

  Selection.prototype.node = function(i) {
    if (i == null) {
      i = 0;
    }
    return this.nodes[i];
  };

  Selection.prototype.clone = function(deep) {
    var newNodes, node, s;
    if (deep == null) {
      deep = true;
    }
    newNodes = (function() {
      var _i, _len, _ref, _results;
      _ref = this.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(node.cloneNode(deep));
      }
      return _results;
    }).call(this);
    s = new Selection(newNodes);
    s.singleSelection = this.singleSelection;
    return s;
  };

  Selection.prototype.prop = function(property, value) {
    var node, _i, _len, _ref;
    if (arguments.length === 2) {
      if (value != null) {
        _ref = this.nodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          node[property] = value;
        }
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.nodes;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          node = _ref1[_j];
          _results.push(node[property]);
        }
        return _results;
      }).call(this));
    }
  };

  Selection.prototype.attr = function(attribute, value) {
    var node, _i, _len, _ref;
    if (arguments.length === 2) {
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (value !== void 0) {
          node.setAttribute(attribute, value);
        } else {
          node.removeAttribute(attribute);
        }
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.nodes;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          node = _ref1[_j];
          _results.push(node.getAttribute(attribute));
        }
        return _results;
      }).call(this));
    }
  };

  Selection.prototype.style = function(property, value) {
    var node, _i, _len, _ref;
    if (arguments.length === 2) {
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.style.setProperty(property, value);
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.nodes;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          node = _ref1[_j];
          _results.push(window.getComputedStyle(node, null).getPropertyValue(property));
        }
        return _results;
      }).call(this));
    }
  };

  Selection.prototype.text = function(text) {
    var node, _i, _len, _ref;
    if (arguments.length === 1) {
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.textContent = text != null ? text : '';
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.nodes;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          node = _ref1[_j];
          _results.push(node.textContent || '');
        }
        return _results;
      }).call(this));
    }
  };

  Selection.prototype.html = function(html) {
    var node, _i, _len, _ref;
    if (arguments.length === 1) {
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.innerHTML = html || '';
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.nodes;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          node = _ref1[_j];
          _results.push(node.innerHTML || '');
        }
        return _results;
      }).call(this));
    }
  };

  Selection.prototype["class"] = function(_class) {
    var node, _i, _len, _ref;
    if (arguments.length === 1) {
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        node.setAttribute('class', _class || '');
      }
      return this;
    } else {
      return reformed(this.singleSelection, (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.nodes;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          node = _ref1[_j];
          _results.push(node.getAttribute('class') || '');
        }
        return _results;
      }).call(this));
    }
  };

  Selection.prototype.classed = function(_class, include) {
    var classes, cls, node, _i, _len, _ref;
    if (arguments.length === 1) {
      classes = (function() {
        var _i, _len, _ref, _results;
        _ref = this.nodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _results.push(node.getAttribute('class') || '');
        }
        return _results;
      }).call(this);
      return reformed(this.singleSelection, (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
          cls = classes[_i];
          _results.push(cls.split(' ').indexOf(_class) !== -1);
        }
        return _results;
      })());
    } else {
      _ref = this.nodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        classed(node, _class, include);
      }
      return this;
    }
  };

  Selection.prototype.value = function(value) {
    if (arguments.length === 1) {
      return this.prop('value', value);
    } else {
      return this.prop('value');
    }
  };

  Selection.prototype.on = function(name, f, retain) {
    var augmenter, data, eventAugmenters, eventEmitter, node, _i, _j, _len, _len1, _ref;
    _ref = this.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      data = getHexagonElementDataObject(node);
      eventEmitter = data.eventEmitter ? data.eventEmitter : data.eventEmitter = new hx.EventEmitter;
      if (data.eventAugmenters == null) {
        data.eventAugmenters = new hx.Map;
      }
      if (!eventEmitter.hasNameRegistered(name)) {
        node.addEventListener(name, function(e) {
          return eventEmitter.emit(name, e);
        });
      }
      if (!retain) {
        eventEmitter.deregisterAll(name);
      }
      if (!data.eventAugmenters.has(name)) {
        eventAugmenters = [];
        for (_j = 0, _len1 = augmenters.length; _j < _len1; _j++) {
          augmenter = augmenters[_j];
          if (augmenter.name === name) {
            eventAugmenters.push(augmenter.setup(node, eventEmitter));
          }
        }
        data.eventAugmenters.set(name, eventAugmenters);
      }
      eventEmitter.on(name, f);
    }
    return this;
  };

  Selection.prototype.off = function(name, f) {
    var data, node, _i, _len, _ref, _ref1;
    _ref = this.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      data = getHexagonElementDataObject(node);
      if ((_ref1 = data.eventEmitter) != null) {
        _ref1.deregister(name, f);
      }
    }
    return this;
  };

  Selection.prototype.data = function(key, value) {
    var data, node, values;
    if (arguments.length === 1) {
      values = (function() {
        var _i, _len, _ref, _results;
        _ref = this.nodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          data = getHexagonElementDataObject(node);
          if (data.data) {
            _results.push(data.data.get(key));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }).call(this);
      return reformed(this.singleSelection, values);
    } else {
      values = (function() {
        var _i, _len, _ref, _results;
        _ref = this.nodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          data = getHexagonElementDataObject(node);
          if (data.data == null) {
            data.data = new hx.Map;
          }
          _results.push(data.data.set(key, value));
        }
        return _results;
      }).call(this);
      return this;
    }
  };

  Selection.prototype.view = function(selector, type) {
    if (type == null) {
      type = 'div';
    }
    if (this.size() === 0) {
      hx.consoleWarning('.view() called on an empty selection');
    }
    return new View(this, selector, type);
  };

  Selection.prototype.each = function(f) {
    this.nodes.forEach(f);
    return this;
  };

  Selection.prototype.map = function(f) {
    return reformed(this.singleSelection, this.nodes.map(f));
  };

  Selection.prototype.filter = function(f) {
    var s;
    s = new Selection(this.nodes.filter(f));
    s.singleSelection = this.singleSelection;
    return s;
  };

  Selection.prototype.box = function() {
    var node;
    return reformed(this.singleSelection, (function() {
      var _i, _len, _ref, _results;
      _ref = this.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(node.getBoundingClientRect());
      }
      return _results;
    }).call(this));
  };

  Selection.prototype.width = function() {
    var node;
    return reformed(this.singleSelection, (function() {
      var _i, _len, _ref, _results;
      _ref = this.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(node.getBoundingClientRect().width);
      }
      return _results;
    }).call(this));
  };

  Selection.prototype.height = function() {
    var node;
    return reformed(this.singleSelection, (function() {
      var _i, _len, _ref, _results;
      _ref = this.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push(node.getBoundingClientRect().height);
      }
      return _results;
    }).call(this));
  };

  Selection.prototype.size = function() {
    return this.nodes.length;
  };

  Selection.prototype.empty = function() {
    return this.nodes.length === 0;
  };

  return Selection;

})();

select = function(selector, isArray) {
  var nodes, s;
  nodes = isArray ? selector : typeof selector === 'string' ? [selectSingle(selector, document)] : [selector];
  s = new Selection(nodes);
  s.singleSelection = !isArray;
  return s;
};

hx.select = function(selector) {
  if (!((selector instanceof HTMLElement) || (selector instanceof SVGElement) || hx.isString(selector) || selector === document || selector === window)) {
    hx.consoleWarning('hx.select was passed the wrong argument type', 'hx.select only accepts a HTMLElement, SVGElement or string argument, you supplied:', selector);
    return new Selection([]);
  } else {
    return select(selector);
  }
};

hx.select.getHexagonElementDataObject = getHexagonElementDataObject;

hx.select.addEventAugmenter = function(augmenter) {
  return augmenters.push(augmenter);
};

hx.selectAll = function(selector) {
  if (!(hx.isString(selector) || hx.isArray(selector))) {
    hx.consoleWarning('hx.selectAll was passed the wrong argument type', 'hx.selectAll only accepts a string argument, you supplied:', selector);
    return new Selection([]);
  } else {
    if (hx.isArray(selector)) {
      return select(selector, true);
    } else {
      return select(document).selectAll(selector);
    }
  }
};

hx.detached = function(name, namespace) {
  namespace = namespaces.hasOwnProperty(name) ? namespaces[name] : namespaces.xhtml;
  return hx.select(document.createElementNS(namespace, name));
};

hx.Selection = Selection;

})();

// transition
(function(){
var hx_ease, loopUpdate, next;

next = hx.vendor(window, "requestAnimationFrame") || function(f) {
  return setTimeout(f, 17);
};

loopUpdate = function(f, g) {
  if (!f()) {
    return next(g);
  }
};

hx.loop = function(f) {
  var g;
  g = function() {
    return loopUpdate(f, g);
  };
  loopUpdate(f, g);
  return void 0;
};

hx.transition = function(millis, f, ease, endCallback) {
  var cancelled, start;
  if (ease == null) {
    ease = hx.ease.linear;
  }
  start = (new Date).getTime();
  if (millis <= 0) {
    f(1, false);
    if (endCallback) {
      endCallback(false);
    }
    return hx.identity;
  } else {
    cancelled = false;
    hx.loop(function() {
      var alpha;
      alpha = ((new Date).getTime() - start) / millis;
      if (alpha >= 1 || cancelled) {
        f(1, cancelled);
        if (endCallback) {
          endCallback(cancelled);
        }
        return true;
      } else {
        f(ease(alpha), false);
        return false;
      }
    });
    return function() {
      return cancelled = true;
    };
  }
};

hx.ease = hx_ease = {
  linear: hx.identity,
  quad: function(t) {
    return t * t;
  },
  cubic: function(t) {
    return t * t * t;
  }
};

})();

// event-emitter
(function(){
var EventEmitter;

EventEmitter = (function() {
  function EventEmitter() {
    this.callbacks = new hx.Map;
    this.allCallbacks = new hx.List;
  }

  EventEmitter.prototype.emit = function(name, data) {
    var cb, _i, _j, _len, _len1, _ref, _ref1;
    if (this.callbacks.has(name)) {
      _ref = this.callbacks.get(name).entries();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        cb(data);
      }
    }
    _ref1 = this.allCallbacks.entries();
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      cb = _ref1[_j];
      cb(name, data);
    }
    return this;
  };

  EventEmitter.prototype.on = function(name, callback) {
    if (name) {
      if (!this.callbacks.has(name)) {
        this.callbacks.set(name, new hx.List);
      }
      this.callbacks.get(name).add(callback);
    } else {
      this.allCallbacks.add(callback);
    }
    return this;
  };

  EventEmitter.prototype.hasNameRegistered = function(name) {
    return this.callbacks.has(name);
  };

  EventEmitter.prototype.has = function(name) {
    return this.allCallbacks.size > 0 || (this.callbacks.has(name) && this.callbacks.get(name).size > 0);
  };

  EventEmitter.prototype.off = function(name, callback) {
    var _ref;
    if (callback) {
      if (name) {
        if ((_ref = this.callbacks.get(name)) != null) {
          _ref.remove(callback);
        }
      } else {
        this.allCallbacks.remove(callback);
      }
    } else {
      if (name) {
        this.callbacks.set(name, new hx.List);
      } else {
        this.callbacks = new hx.Map;
        this.allCallbacks = new hx.List;
      }
    }
    return this;
  };

  EventEmitter.prototype.deregister = function(name, callback) {
    return this.off(name, callback);
  };

  EventEmitter.prototype.deregisterAll = function(name) {
    return this.off(name);
  };

  EventEmitter.prototype.pipe = function(eventEmitter, namespace, filter) {
    var filterer;
    filterer = filter ? function(n) {
      return filter.indexOf(n) !== -1;
    } : function(n) {
      return true;
    };
    if (namespace) {
      this.on(null, function(n, v) {
        if (filterer(n)) {
          return eventEmitter.emit(namespace + '.' + n, v);
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

  return EventEmitter;

})();

hx.EventEmitter = EventEmitter;

})();

// interpolate
(function(){
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

hx.interpolate = function(a, b) {
  var colA, colB, res;
  if (typeof a === "number") {
    return interpolateNumber(a, b);
  }
  colA = hx.color(a);
  colB = hx.color(b);
  if (colA !== void 0 && colB !== void 0) {
    return function(v) {
      return colA.clone().mix(colB, v).toString('rgba');
    };
  } else {
    a = splitString(a);
    b = splitString(b);
    if (a.length === b.length) {
      return function(v) {
        var c, i, _i, _ref;
        c = [];
        for (i = _i = 0, _ref = a.length; _i <= _ref; i = _i += 1) {
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

})();

// animate
(function(){

/* istanbul ignore next: ignore coffeescript generated code that can't be covered */
var Animation, Morph, hx_morphs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Animation = (function(_super) {
  var transition;

  __extends(Animation, _super);

  function Animation(node, ease) {
    this.node = node;
    this.ease = ease != null ? ease : hx.ease.linear;
    Animation.__super__.constructor.apply(this, arguments);
    this.cancelers = [];
    this.remaining = 0;
    this.finished = false;
    this.endCallback = (function(_this) {
      return function(cancelled) {
        _this.remaining--;
        if (_this.remaining <= 0 && !_this.finished && !cancelled) {
          _this.finished = true;
          return _this.emit('end');
        }
      };
    })(this);
  }

  transition = function(iteration, duration) {
    this.remaining++;
    this.cancelers.push(hx.transition(duration, iteration, this.ease, this.endCallback));
    return this;
  };

  Animation.prototype.style = function(property, value, duration) {
    var interpolator, iteration;
    if (this.node) {
      if (arguments.length === 4) {
        interpolator = hx.interpolate(arguments[1], arguments[2]);
        iteration = (function(_this) {
          return function(t, cancel) {
            if (!cancel) {
              return _this.node.style.setProperty(property, interpolator(t));
            }
          };
        })(this);
        transition.call(this, iteration, arguments[3] || 200);
      } else {
        interpolator = hx.interpolate(window.getComputedStyle(this.node, null).getPropertyValue(property), value);
        iteration = (function(_this) {
          return function(t, cancel) {
            if (!cancel) {
              return _this.node.style.setProperty(property, interpolator(t));
            }
          };
        })(this);
        transition.call(this, iteration, duration || 200);
      }
    } else {
      this.endCallback();
    }
    return this;
  };

  Animation.prototype.attr = function(attribute, value, duration) {
    var interpolator, iteration;
    if (this.node) {
      if (arguments.length === 4) {
        interpolator = hx.interpolate(arguments[1], arguments[2]);
        iteration = (function(_this) {
          return function(t, cancel) {
            if (!cancel) {
              return _this.node.setAttribute(attribute, interpolator(t));
            }
          };
        })(this);
        transition.call(this, iteration, arguments[3] || 200);
      } else {
        interpolator = hx.interpolate(this.node.getAttribute(attribute), value);
        iteration = (function(_this) {
          return function(t, cancel) {
            if (!cancel) {
              return _this.node.setAttribute(attribute, interpolator(t));
            }
          };
        })(this);
        transition.call(this, iteration, duration || 200);
      }
    } else {
      this.endCallback();
    }
    return this;
  };

  Animation.prototype.cancel = function() {
    var canceler, _i, _len, _ref;
    this.emit('cancelled');
    _ref = this.cancelers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      canceler = _ref[_i];
      canceler();
    }
    return this;
  };

  return Animation;

})(hx.EventEmitter);

hx.animate = function(node, ease) {
  return new Animation(node, ease);
};

hx.Selection.prototype.animate = function(ease) {
  return hx.animate(this.nodes[0], ease);
};

Morph = (function(_super) {
  var perform;

  __extends(Morph, _super);

  function Morph(node, trigger, start, cancellers) {
    this.node = node;
    this.trigger = trigger;
    Morph.__super__.constructor.apply(this, arguments);
    this.actions = [];
    this.start = start || ((function(_this) {
      return function() {
        return perform.call(_this);
      };
    })(this));
    this.cancelers = cancellers || [];
    this.cancelled = false;
    this.finished = false;
    if (this.trigger) {
      this.trigger.on('end', (function(_this) {
        return function() {
          _this.finished = true;
          if (!_this.cancelled) {
            return perform.call(_this);
          }
        };
      })(this));
    }
  }

  Morph.prototype.and = function(f, duration) {
    var morphFactory;
    if (duration == null) {
      duration = 200;
    }
    if (hx.isFunction(f)) {
      this.actions.push(f);
    } else {
      if (this.node) {
        morphFactory = hx_morphs.get(f);
        if (morphFactory) {
          this.actions.push((function(_this) {
            return function() {
              return morphFactory(_this.node, duration);
            };
          })(this));
        } else {
          hx.consoleWarning(f + ' is not a registered morph', 'The available morphs are', hx_morphs.entries());
        }
      }
    }
    return this;
  };

  Morph.prototype.then = function(f, duration) {
    if (duration == null) {
      duration = 200;
    }
    if (this.actions.length > 0) {
      return (new Morph(this.node, this, this.start, this.cancelers)).and(f, duration);
    } else {
      return this.and(f, duration);
    }
  };

  Morph.prototype.andStyle = function(property, value, duration) {
    var args;
    if (duration == null) {
      duration = 200;
    }
    args = arguments;
    if (args.length === 4) {
      return this.and((function(_this) {
        return function() {
          return hx.animate(_this.node).style(args[0], args[1], args[2], args[3]);
        };
      })(this));
    } else {
      return this.and((function(_this) {
        return function() {
          return hx.animate(_this.node).style(property, value, duration);
        };
      })(this));
    }
  };

  Morph.prototype.thenStyle = function(property, value, duration) {
    var args;
    if (duration == null) {
      duration = 200;
    }
    args = arguments;
    if (args.length === 4) {
      return this.then((function(_this) {
        return function() {
          return hx.animate(_this.node).style(args[0], args[1], args[2], args[3]);
        };
      })(this));
    } else {
      return this.then((function(_this) {
        return function() {
          return hx.animate(_this.node).style(property, value, duration);
        };
      })(this));
    }
  };

  Morph.prototype.andAttr = function(property, value, duration) {
    var args;
    if (duration == null) {
      duration = 200;
    }
    args = arguments;
    if (args.length === 4) {
      return this.and((function(_this) {
        return function() {
          return hx.animate(_this.node).attr(args[0], args[1], args[2], args[3]);
        };
      })(this));
    } else {
      return this.and((function(_this) {
        return function() {
          return hx.animate(_this.node).attr(property, value, duration);
        };
      })(this));
    }
  };

  Morph.prototype.thenAttr = function(property, value, duration) {
    var args;
    if (duration == null) {
      duration = 200;
    }
    args = arguments;
    if (args.length === 4) {
      return this.then((function(_this) {
        return function() {
          return hx.animate(_this.node).attr(args[0], args[1], args[2], args[3]);
        };
      })(this));
    } else {
      return this.then((function(_this) {
        return function() {
          return hx.animate(_this.node).attr(property, value, duration);
        };
      })(this));
    }
  };

  Morph.prototype["with"] = function(f, duration) {
    return this.then(f, duration);
  };

  Morph.prototype.withStyle = function(property, value, duration) {
    var args;
    args = arguments;
    if (args.length === 4) {
      return this.then((function(_this) {
        return function() {
          return hx.animate(_this.node).style(args[0], args[1], args[2], args[3]);
        };
      })(this));
    } else {
      return this.then((function(_this) {
        return function() {
          return hx.animate(_this.node).style(property, value, duration);
        };
      })(this));
    }
  };

  Morph.prototype.withAttr = function(property, value, duration) {
    var args;
    args = arguments;
    if (args.length === 4) {
      return this.then((function(_this) {
        return function() {
          return hx.animate(_this.node).attr(args[0], args[1], args[2], args[3]);
        };
      })(this));
    } else {
      return this.then((function(_this) {
        return function() {
          return hx.animate(_this.node).attr(property, value, duration);
        };
      })(this));
    }
  };

  Morph.prototype.cancel = function() {
    var canceler, _i, _len, _ref;
    if (!this.cancelled) {
      this.emit('cancelled');
      this.cancelled = true;
      _ref = this.cancelers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        canceler = _ref[_i];
        if (hx.isFunction(canceler.cancel)) {
          canceler.cancel();
        }
      }
    }
    return this;
  };

  perform = function() {
    var action, awaiting, onEnd, res, _i, _len, _ref, _results;
    if (this.actions.length > 0) {
      awaiting = this.actions.length;
      onEnd = (function(_this) {
        return function() {
          awaiting--;
          if (awaiting === 0) {
            return _this.emit('end');
          }
        };
      })(this);
      _ref = this.actions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        res = action(onEnd);
        if ((res !== void 0) && res.cancel) {
          this.cancelers.push(res);
        }
        if (res instanceof hx.EventEmitter) {
          _results.push(res.on('end', onEnd));
        } else if (action.length === 0) {
          _results.push(onEnd());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    } else {
      return this.emit('end');
    }
  };

  Morph.prototype.go = function(cancelOngoing) {
    var obj;
    if (cancelOngoing === true) {
      this.cancelOngoing();
    }
    this.start();
    if (this.node) {
      obj = hx.select.getHexagonElementDataObject(this.node, true);
      if (obj.morphs == null) {
        obj.morphs = [];
      }
      obj.morphs = obj.morphs.filter(function(morph) {
        return !morph.cancelled && !morph.finished;
      });
      obj.morphs.push(this);
    }
    return this;
  };

  Morph.prototype.cancelOngoing = function() {
    var morph, obj, _i, _len, _ref;
    if (this.node) {
      obj = hx.select.getHexagonElementDataObject(this.node, false);
      if (obj) {
        if (obj.morphs) {
          _ref = obj.morphs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            morph = _ref[_i];
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

})(hx.EventEmitter);

hx.morph = function(node) {
  return new Morph(node);
};

hx.Selection.prototype.morph = function() {
  return new Morph(this.nodes[0]);
};

hx_morphs = new hx.Map;

hx.morph.register = function(name, morph) {
  return hx_morphs.set(name, morph);
};

})();

// pointer-events
(function(){
hx.select.addEventAugmenter({
  name: 'pointerdown',
  setup: function(node, eventEmitter) {
    node.addEventListener('mousedown', function(e) {
      return eventEmitter.emit('pointerdown', {
        x: e.clientX,
        y: e.clientY,
        event: e
      });
    });
    if (hx.supports('touch')) {
      return node.addEventListener('touchstart', function(e) {
        return eventEmitter.emit('pointerdown', {
          x: e.targetTouches[0].pageX,
          y: e.targetTouches[0].pageY,
          event: e
        });
      });
    }
  }
});

hx.select.addEventAugmenter({
  name: 'pointermove',
  setup: function(node, eventEmitter) {
    node.addEventListener('mousemove', function(e) {
      return eventEmitter.emit('pointermove', {
        x: e.clientX,
        y: e.clientY,
        event: e
      });
    });
    if (hx.supports('touch')) {
      return node.addEventListener('touchmove', function(e) {
        return eventEmitter.emit('pointermove', {
          x: e.targetTouches[0].pageX,
          y: e.targetTouches[0].pageY,
          event: e
        });
      });
    }
  }
});

hx.select.addEventAugmenter({
  name: 'pointerup',
  setup: function(node, eventEmitter) {
    node.addEventListener('mouseup', function(e) {
      return eventEmitter.emit('pointerup', {
        x: e.clientX,
        y: e.clientY,
        event: e
      });
    });
    if (hx.supports('touch')) {
      node.addEventListener('touchend', function(e) {
        return eventEmitter.emit('pointerup', {
          event: e
        });
      });
      return node.addEventListener('touchcancel', function(e) {
        return eventEmitter.emit('pointerup', {
          event: e
        });
      });
    }
  }
});

hx.select.addEventAugmenter({
  name: 'pointerleave',
  setup: function(node, eventEmitter) {
    node.addEventListener('mouseleave', function(e) {
      return eventEmitter.emit('pointerleave', {
        x: e.clientX,
        y: e.clientY,
        event: e
      });
    });
    if (hx.supports('touch')) {
      return node.addEventListener('touchleave', function(e) {
        return eventEmitter.emit('pointerleave', {
          event: e
        });
      });
    }
  }
});

hx.select.addEventAugmenter({
  name: 'pointerenter',
  setup: function(node, eventEmitter) {
    node.addEventListener('mouseenter', function(e) {
      return eventEmitter.emit('pointerenter', {
        x: e.clientX,
        y: e.clientY,
        event: e
      });
    });
    if (hx.supports('touch')) {
      return node.addEventListener('touchenter', function(e) {
        return eventEmitter.emit('pointerenter', {
          event: e
        });
      });
    }
  }
});

})();

// morphs
(function(){
var Delay,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

hx.morph.register('fadeout', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.animate(node).style('opacity', 0, duration);
});

hx.morph.register('fadein', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.animate(node).style('opacity', 1, duration);
});

hx.morph.register('collapse', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.animate(node).style('height', '0px', duration).style('padding-top', '0px', duration).style('padding-bottom', '0px', duration).style('margin-top', '0px', duration).style('margin-bottom', '0px', duration).on('end', function(e) {
    return hx.select(node).style('display', 'none').style('height', '').style('padding-top', '').style('padding-bottom', '').style('margin-top', '').style('margin-bottom', '').style('opacity', '');
  });
});

hx.morph.register('expand', function(node, duration) {
  var endHeight, endMarginBottom, endMarginTop, endPaddingBottom, endPaddingTop, selection, startHeight, startMarginBottom, startMarginTop, startPaddingBottom, startPaddingTop;
  if (duration == null) {
    duration = 100;
  }
  selection = hx.select(node);
  startHeight = selection.style('display') === 'none' ? '0px' : selection.style('height');
  startPaddingTop = selection.style('display') === 'none' ? '0px' : selection.style('padding-top');
  startPaddingBottom = selection.style('display') === 'none' ? '0px' : selection.style('padding-bottom');
  startMarginTop = selection.style('display') === 'none' ? '0px' : selection.style('margin-top');
  startMarginBottom = selection.style('display') === 'none' ? '0px' : selection.style('margin-bottom');
  selection.style('display', '');
  endHeight = selection.style('height', '').style('height');
  endPaddingTop = selection.style('padding-top', '').style('padding-top');
  endPaddingBottom = selection.style('padding-bottom', '').style('padding-bottom');
  endMarginTop = selection.style('margin-top', '').style('margin-top');
  endMarginBottom = selection.style('margin-bottom', '').style('margin-bottom');
  selection.style('height', startHeight).style('padding-top', startPaddingTop).style('padding-bottom', startPaddingBottom).style('margin-top', startMarginTop).style('margin-bottom', startMarginBottom).style('overflow', 'hidden');
  return hx.animate(node).style('height', endHeight, duration).style('padding-top', endPaddingTop, duration).style('padding-bottom', endPaddingBottom, duration).style('margin-top', endMarginTop, duration).style('margin-bottom', endMarginBottom, duration).on('end', function(e) {
    return selection.style('height', '').style('padding-top', '').style('padding-bottom', '').style('margin-top', '').style('margin-bottom', '').style('overflow', '');
  });
});

hx.morph.register('expand-fadein', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.morph(node)["with"](function() {
    return hx.select(node).style('opacity', 0);
  }).then('expand', duration / 2).then('fadein', duration / 2).go();
});

hx.morph.register('fadeout-collapse', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.morph(node)["with"]('fadeout', duration).and('collapse', duration).go();
});

hx.morph.register('rotate-90', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.animate(node).style('-webkit-transform', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(0, 1, -1, 0, 0, 0)', duration).style('transform', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(0, 1, -1, 0, 0, 0)', duration).on('end', function() {
    return hx.select(node).style('transform', '').style('-webkit-transform', '');
  }).on('cancel', function() {
    return hx.select(node).style('transform', '').style('-webkit-transform', '');
  });
});

hx.morph.register('rotate-0', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.animate(node).style('-webkit-transform', 'matrix(0, 1, -1, 0, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)', duration).style('transform', 'matrix(0, 1, -1, 0, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)', duration).on('end', function() {
    return hx.select(node).style('transform', '').style('-webkit-transform', '');
  }).on('cancel', function() {
    return hx.select(node).style('transform', '').style('-webkit-transform', '');
  });
});

Delay = (function(_super) {
  __extends(Delay, _super);

  function Delay(duration) {
    this.cancel = __bind(this.cancel, this);
    Delay.__super__.constructor.apply(this, arguments);
    this.timeout = setTimeout(((function(_this) {
      return function() {
        return _this.emit('end');
      };
    })(this)), duration);
  }

  Delay.prototype.cancel = function() {
    return clearTimeout(this.timeout);
  };

  return Delay;

})(hx.EventEmitter);

hx.morph.register('delay', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return new Delay(duration);
});

})();

// click-detector
(function(){

/* istanbul ignore next: ignores 'extend' method added by coffeescript */
var ClickDetector,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ClickDetector = (function(_super) {
  __extends(ClickDetector, _super);

  function ClickDetector() {
    var container;
    ClickDetector.__super__.constructor.apply(this, arguments);
    this.exceptions = new hx.List;
    container = void 0;
    this.downAction = (function(_this) {
      return function(e) {
        var call, element, _i, _len, _ref;
        e = e.event;
        container = e.target;
        call = true;
        _ref = _this.exceptions.entries();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          if (element.contains(e.target)) {
            call = false;
          }
        }
        if (call) {
          return _this.emit('click');
        }
      };
    })(this);
    this.upAction = (function(_this) {
      return function(e) {
        var call, element, _i, _len, _ref;
        e = e.event;
        call = true;
        if (container && !container.contains(e.target)) {
          call = false;
        }
        container = void 0;
        _ref = _this.exceptions.entries();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          if (element.contains(e.target)) {
            call = false;
          }
        }
        if (call) {
          return _this.emit('click');
        }
      };
    })(this);
    hx.select(document).on('pointerdown', this.downAction, true);
    hx.select(document).on('pointerup', this.upAction, true);
  }

  ClickDetector.prototype.addException = function(element) {
    return this.exceptions.add(element);
  };

  ClickDetector.prototype.removeAllExceptions = function() {
    return this.exceptions.clear();
  };

  ClickDetector.prototype.cleanUp = function() {
    hx.select(document).off('pointerdown', this.downAction);
    return hx.select(document).off('pointerup', this.upAction);
  };

  return ClickDetector;

})(hx.EventEmitter);

hx.ClickDetector = ClickDetector;

})();

// button
(function(){
var initToggleButtons;

initToggleButtons = function(selection) {
  var arr;
  arr = [];
  hx.selectAll(selection).map(function(d) {
    d = hx.select(d);
    if (d.classed("hx-btn-toggle")) {
      arr.push(d.node());
      return d.on("click", (function(e) {
        var val;
        e = hx.select(e.target);
        val = e.classed("hx-btn-toggle-off");
        return e.attr("data", val).classed("hx-btn-toggle-off", !val);
      }), true).attr("data", d.classed("hx-btn-toggle-off") ? false : true);
    }
  });
  return arr;
};

hx.initialiseToggleButtons = initToggleButtons;

initToggleButtons(".hx-btn-toggle");

})();

// dropdown
(function(){

/* istanbul ignore next: ignore coffeescript's extend function */
var Dropdown, checkFixedPos, checkParents, checkZIndex,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

checkFixedPos = function(node) {
  var elem;
  elem = hx.select(node);
  if (elem.size() > 0 && elem.style('position') === 'fixed') {
    return true;
  }
};

checkZIndex = function(node) {
  var elem, index;
  elem = hx.select(node);
  index = Number(elem.style('z-index'));
  if (!isNaN(index) && index > 0) {
    return index;
  }
};

checkParents = function(child, check) {
  var node, result;
  node = child;
  while (node !== null && node.nodeType !== 9) {
    result = check(node);
    if (result != null) {
      return result;
    }
    node = node.parentNode;
  }
  return false;
};

Dropdown = (function(_super) {
  __extends(Dropdown, _super);

  function Dropdown(selector, dropdownContent, mode, align, spacing, matchWidth, ddClass) {
    var alignQuad;
    this.selector = selector;
    this.dropdownContent = dropdownContent;
    if (mode == null) {
      mode = 'click';
    }
    if (align == null) {
      align = 'lblt';
    }
    this.spacing = spacing;
    this.matchWidth = matchWidth != null ? matchWidth : true;
    this.ddClass = ddClass != null ? ddClass : '';
    Dropdown.__super__.constructor.apply(this, arguments);
    this.selection = hx.select(this.selector);
    this.visible = false;
    this.dropdown = void 0;
    this.clickDetector = new hx.ClickDetector;
    this.useScroll = false;
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
    this.alignments = alignQuad.split('');
    switch (mode) {
      case 'click':
        this.selection.on('click', (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this));
        break;
      case 'hover':
        this.selection.on('mouseover', (function(_this) {
          return function() {
            return _this.show();
          };
        })(this));
        this.selection.on('mouseout', (function(_this) {
          return function() {
            return _this.hide();
          };
        })(this));
        this.selection.on('click', (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this));
    }
  }

  Dropdown.prototype.toggle = function() {
    if (this.isOpen()) {
      return this.hide();
    } else {
      return this.show();
    }
  };

  Dropdown.prototype.show = function() {
    var bodyDiff, checkOverlap, ddHeight, ddMaxHeight, dropdownRect, horizontalOverlap, horizontalPos, horizontalWindow, invertY, movedVertical, node, parentFixed, parentZIndex, rect, scrollbarWidth, spacing, verticalOverlap, verticalPos, verticalWindow, yPos;
    spacing = this.spacing != null ? this.spacing : Number(hx.theme.dropdown.spacing);
    if (!this.dropdown) {
      switch (false) {
        case !hx.isString(this.dropdownContent):
          this.dropdown = hx.select('body').append('div').attr('class', 'hx-dropdown');
          this.dropdown.html(this.dropdownContent);
          this.clickDetector.removeAllExceptions();
          this.clickDetector.addException(this.dropdown.node());
          this.clickDetector.addException(this.selection.node());
          break;
        case !hx.isFunction(this.dropdownContent):
          this.dropdown = hx.select('body').append('div').attr('class', 'hx-dropdown');
          node = this.dropdown.node();
          this.dropdownContent(node);
          this.clickDetector.removeAllExceptions();
          this.clickDetector.addException(node);
          this.clickDetector.addException(this.selection.node());
          break;
        default:
          console.error('hexagon: dropdownContent is not a valid type ' + this.selector);
      }
      if (this.ddClass.length > 0) {
        this.dropdown.classed(this.ddClass, true);
      }
    }
    this.clickDetector.on('click', (function(_this) {
      return function() {
        return _this.hide();
      };
    })(this));
    if (!this.visible && this.dropdown) {
      parentZIndex = checkParents(this.selection.node(), checkZIndex);
      if (parentZIndex > 0) {
        this.dropdown.style('z-index', parentZIndex + 1);
      }
      rect = this.selection.box();
      this.dropdown.style('display', 'block');
      if (this.matchWidth) {
        this.dropdown.style('min-width', rect.width + 'px');
      }
      dropdownRect = this.dropdown.box();
      ddMaxHeight = this.dropdown.style('max-height').replace('px', '');
      horizontalPos = rect.left;
      verticalPos = rect.top;
      if (this.alignments[0] === 'r') {
        horizontalPos = rect.right;
      }
      if (this.alignments[1] === 'b') {
        verticalPos = rect.bottom;
      }
      if (this.alignments[2] === 'r') {
        horizontalPos -= dropdownRect.width;
      }
      if (this.alignments[3] === 'b') {
        verticalPos -= dropdownRect.height;
      }
      if (this.alignments[0] !== this.alignments[2]) {
        switch (this.alignments[2]) {
          case 'l':
            horizontalPos += spacing;
            break;
          case 'r':
            horizontalPos -= spacing;
        }
      }
      if (this.alignments[1] !== this.alignments[3]) {
        switch (this.alignments[3]) {
          case 't':
            verticalPos += spacing;
            break;
          case 'b':
            invertY = true;
            verticalPos -= spacing;
        }
      }

      /* istanbul ignore next: device either has scrollbars or doesnt, can't test both at once */
      scrollbarWidth = window.scrollbars ? 16 : 0;
      if (horizontalPos < 0) {
        horizontalPos = 0;
      }
      if ((horizontalWindow = horizontalPos + dropdownRect.width - window.innerWidth + scrollbarWidth) > 0) {
        horizontalPos -= horizontalWindow;
      }
      if (verticalPos < 0) {
        verticalPos = 0;
      }
      ddHeight = !isNaN(ddMaxHeight) ? Math.min(ddMaxHeight, dropdownRect.height) : dropdownRect.height;
      if ((verticalWindow = verticalPos + ddHeight - window.innerHeight) > 0) {
        movedVertical = true;
        verticalPos -= verticalWindow;
      }
      checkOverlap = function(posA, posB, rectA, rectB) {
        var complete, partialA, partialB;
        complete = posA < rectA && posB > rectB;
        partialA = posB >= rectB && posA < rectB && posA >= rectA;
        partialB = posA <= rectA && posB > rectA && posB <= rectB;
        if (complete || partialA) {
          return 2;
        } else if (partialB) {
          return 1;
        } else {
          return 0;
        }
      };
      horizontalOverlap = checkOverlap(horizontalPos, horizontalPos + dropdownRect.width, rect.left, rect.left + rect.width);
      verticalOverlap = checkOverlap(verticalPos, verticalPos + dropdownRect.height, rect.top, rect.top + rect.height);
      if (horizontalOverlap > 0 && verticalOverlap > 0) {
        if (verticalOverlap > 1 && !movedVertical) {
          invertY = false;
          verticalPos = rect.top + rect.height + spacing;
        } else {
          invertY = true;
          verticalPos = rect.top - dropdownRect.height - spacing;
          if (verticalPos < 0) {
            invertY = false;
            verticalPos = rect.top + rect.height + spacing;
          }
        }
      }
      parentFixed = checkParents(this.selection.node(), checkFixedPos);
      if (parentFixed) {
        this.dropdown.style('position', 'fixed');
      } else {
        verticalPos += window.scrollY;
        horizontalPos += window.scrollX;
      }
      yPos = 'top';
      if (invertY) {
        yPos = 'bottom';
        bodyDiff = document.body.scrollHeight - document.body.clientHeight;
        verticalPos = document.body.scrollHeight - verticalPos - bodyDiff - dropdownRect.height;
      }
      this.dropdown.style('top', 'auto').style(yPos, verticalPos + 'px').style('left', horizontalPos + 'px').style('width', dropdownRect.width + 'px');
      this.dropdown.style('height', '0px').style(yPos, (verticalPos + 8) + 'px').style('opacity', 0).morph()["with"]('fadein', 150).and('expand', 150).and((function(_this) {
        return function() {
          return _this.dropdown.animate().style(yPos, verticalPos + 'px', 150);
        };
      })(this)).then((function(_this) {
        return function() {
          if (_this.useScroll && (_this.dropdown != null)) {
            return _this.dropdown.style('overflow-y', 'auto');
          }
        };
      })(this)).go();
      this.visible = true;
      this.emit('show');
      return this.emit('change', true);
    }
  };

  Dropdown.prototype.hide = function() {
    if (this.visible) {
      this.visible = false;
      this.emit('hide');
      this.emit('change', false);
      this.dropdown.remove();
      this.dropdown = void 0;
      return this.clickDetector.off('click');
    }
  };

  Dropdown.prototype.isOpen = function() {
    return this.visible;
  };

  Dropdown.prototype.cleanUp = function() {
    return this.clickDetector.cleanUp();
  };

  return Dropdown;

})(hx.EventEmitter);

hx.Dropdown = Dropdown;

})();

// collapsible
(function(){

/* istanbul ignore next: ignore the uncoverable coffee generated code */
var Collapsible,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collapsible = (function(_super) {
  __extends(Collapsible, _super);

  function Collapsible(selector, lazyContent, visible, addIcon) {
    var content, header, toggleBtn;
    this.lazyContent = lazyContent;
    if (visible == null) {
      visible = false;
    }
    if (addIcon == null) {
      addIcon = true;
    }
    Collapsible.__super__.constructor.apply(this, arguments);
    this.lazyContentCreated = false;
    this.selection = hx.select(selector).classed('hx-openable', true).classed('hx-collapsible', true);
    if (this.selection.classed('hx-collapseable')) {
      hx.deprecatedWarning('the class hx-collapsable has been deprecated', 'use hx-collapsible instead', this.selection.node());
      this.selection.select('.hx-collapseable-heading').classed('hx-collapsible-heading', true);
      this.selection.select('.hx-collapseable-content').classed('hx-collapsible-content', true);
      this.selection.select('.hx-collapseable-toggle').classed('hx-collapsible-toggle', true);
    }
    header = this.selection.select('.hx-collapsible-heading');
    if (!(toggleBtn = header.select('.hx-collapsible-toggle')).empty()) {
      header.classed('hx-collapsible-heading-no-hover', true);
      toggleBtn.on('click', ((function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this)), true);
    } else {
      header.on('click', ((function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this)), true);
    }
    content = this.selection.select('.hx-collapsible-content').style('height', 0).style('opacity', 0);
    if (addIcon) {
      if (toggleBtn.empty()) {
        header.select('i').remove();
        header.prepend('i')["class"]('fa fa-chevron-right hx-collapsible-icon');
      } else {
        toggleBtn.select('i').remove();
        toggleBtn.prepend('i')["class"]('fa fa-chevron-right hx-collapsible-icon');
      }
    }
    hx.select.getHexagonElementDataObject(this.selection.node()).widget = this;
    this.visible = void 0;
    if (visible) {
      this.show(false);
    } else {
      this.hide(false);
    }
  }

  Collapsible.prototype.toggle = function(animate) {
    if (animate == null) {
      animate = true;
    }
    if (this.isOpen()) {
      return this.hide(animate);
    } else {
      return this.show(animate);
    }
  };

  Collapsible.prototype.show = function(animate) {
    var content;
    if (animate == null) {
      animate = true;
    }
    if (!this.lazyContentCreated) {
      this.lazyContentCreated = true;
      if (this.lazyContent) {
        this.lazyContent(this.selection.select(".hx-collapsible-content").node());
      }
    }
    if (this.visible !== true) {
      this.selection.classed('hx-collapsible-expanded', true).classed('hx-opened', true);
      content = this.selection.select('.hx-collapsible-content');
      if (animate) {
        content.morph()["with"]('expand-fadein', 200).go(true);
        this.selection.select('.hx-collapsible-heading').select('.hx-collapsible-icon').morph()["with"]('rotate-90', 200).go(true);
      } else {
        content.style('display', '').style('height', '').style('opacity', '');
      }
      this.visible = true;
      this.emit('show');
      this.emit('change', true);
    }
    return this;
  };

  Collapsible.prototype.hide = function(animate) {
    if (animate == null) {
      animate = true;
    }
    if (this.visible !== false) {
      this.selection.classed('hx-collapsible-expanded', false).classed('hx-opened', false);
      if (animate) {
        this.selection.select('.hx-collapsible-content').morph().then('fadeout-collapse', 100).go(true);
        this.selection.select('.hx-collapsible-heading').select('.hx-collapsible-icon').morph()["with"]('rotate-0', 200).go(true);
      } else {
        this.selection.select('.hx-collapsible-content').style('display', 'none');
      }
      this.visible = false;
      this.emit('hide');
      this.emit('change', false);
    }
    return this;
  };

  Collapsible.prototype.isOpen = function() {
    return this.visible;
  };

  return Collapsible;

})(hx.EventEmitter);

hx.Collapsible = Collapsible;

hx.Collapseable = Collapsible;

hx.initialiseCollapsibles = hx.initialiseCollapseables = function(selector, lazyContent) {
  return hx.selectAll(selector).map(function(d) {
    return new Collapsible(d, lazyContent);
  });
};

})();

// sort
(function(){
var collator, compare, hasCollator, localeCompare;

hasCollator = (typeof Intl !== "undefined" && Intl !== null ? Intl.Collator : void 0) != null;

collator = hasCollator ? new Intl.Collator(void 0, {
  numeric: true
}).compare : function(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

compare = function(a, b) {
  if (!isNaN(Number(a)) && !isNaN(Number(b))) {
    return a - b;
  } else {
    return collator(a, b);
  }
};

localeCompare = function(locale, options) {
  var localeCollator;
  if (options == null) {
    options = {
      numeric: true
    };
  }
  localeCollator = hasCollator ? new Intl.Collator(locale, options).compare : function(a, b) {
    return a.localeCompare(b, locale, options);
  };
  return function(a, b) {
    if (!isNaN(Number(a)) && !isNaN(Number(b))) {
      return a - b;
    } else {
      return localeCollator(a, b);
    }
  };
};

hx.sort = {
  compare: compare,
  localeCompare: localeCompare
};

})();

// view
(function(){
var View;

View = (function() {
  function View(rootSelection, selector, defaultType) {
    var self;
    this.rootSelection = rootSelection;
    this.selector = selector;
    this.defaultType = defaultType;
    self = this;
    this["new"] = function(datum) {
      if (self.selector.charAt(0) === '.') {
        return this.append(self.defaultType)["class"](self.selector.substring(1)).node();
      } else {
        return this.append(self.defaultType).node();
      }
    };
    this.each = function(datum, element) {};
    this.old = function(datum, element) {
      return this.remove();
    };
  }

  View.prototype.enter = function(f) {
    this["new"] = f;
    return this;
  };

  View.prototype.exit = function(f) {
    this.old = f;
    return this;
  };

  View.prototype.update = function(f) {
    this.each = f;
    return this;
  };

  View.prototype.apply = function(data, key) {
    var d, dataByKey, datum, enterSet, exitSet, i, j, k, newNodeSet, node, nodeByKey, nodeData, nodes, updateSet, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _o, _ref, _ref1;
    if (this.rootSelection.size() === 0) {
      return;
    }
    if (!(data instanceof Array)) {
      data = [data];
    }
    enterSet = [];
    updateSet = [];
    exitSet = [];
    nodes = this.rootSelection.selectAll(this.selector).nodes;
    if (key) {
      nodeByKey = new hx.Map;
      dataByKey = new hx.Map;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        datum = data[_i];
        k = key(datum);
        dataByKey.set(k, datum);
      }
      for (_j = 0, _len1 = nodes.length; _j < _len1; _j++) {
        node = nodes[_j];
        nodeData = hx.select.getHexagonElementDataObject(node);
        if (nodeData.datum) {
          d = nodeData.datum;
          k = key(d);
          if (nodeByKey.has(k)) {
            exitSet.push({
              element: node,
              datum: d
            });
          } else {
            nodeByKey.set(k, node);
            if (dataByKey.has(k)) {
              datum = dataByKey.get(k);
              dataByKey["delete"](k);
              updateSet.push({
                element: node,
                datum: datum
              });
            } else {
              exitSet.push({
                element: node,
                datum: d
              });
            }
          }
        } else {
          exitSet.push({
            element: node,
            datum: void 0
          });
        }
      }
      enterSet = (function() {
        var _k, _len2, _ref, _results;
        _ref = dataByKey.entries();
        _results = [];
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          d = _ref[_k];
          _results.push({
            datum: d[1]
          });
        }
        return _results;
      })();
    } else {
      i = 0;
      for (_k = 0, _len2 = nodes.length; _k < _len2; _k++) {
        node = nodes[_k];
        if (i < data.length) {
          nodeData = hx.select.getHexagonElementDataObject(node);
          nodeData.datum = data[i];
          updateSet.push({
            element: node,
            datum: data[i]
          });
        } else {
          nodeData = hx.select.getHexagonElementDataObject(node, false);
          exitSet.push({
            element: node,
            datum: nodeData.datum
          });
        }
        i++;
      }
      if (i < data.length) {
        for (j = _l = i, _ref = data.length - 1; i <= _ref ? _l <= _ref : _l >= _ref; j = i <= _ref ? ++_l : --_l) {
          enterSet.push({
            datum: data[j]
          });
        }
      }
    }
    newNodeSet = (function() {
      var _len3, _m, _results;
      _results = [];
      for (i = _m = 0, _len3 = enterSet.length; _m < _len3; i = ++_m) {
        d = enterSet[i];
        _results.push({
          element: this["new"].call(this.rootSelection, d.datum, i),
          datum: d.datum
        });
      }
      return _results;
    }).call(this);
    for (_m = 0, _len3 = newNodeSet.length; _m < _len3; _m++) {
      d = newNodeSet[_m];
      hx.select.getHexagonElementDataObject(d.element).datum = d.datum;
    }
    for (i = _n = 0, _len4 = exitSet.length; _n < _len4; i = ++_n) {
      d = exitSet[i];
      this.old.call(hx.select(d.element), d.datum, d.element, i);
    }
    _ref1 = updateSet.concat(newNodeSet);
    for (i = _o = 0, _len5 = _ref1.length; _o < _len5; i = ++_o) {
      d = _ref1[i];
      this.each.call(hx.select(d.element), d.datum, d.element, i);
    }
    return this;
  };

  return View;

})();

hx.Selection.prototype.view = function(selector, type) {
  if (type == null) {
    type = 'div';
  }
  if (this.size() === 0) {
    hx.consoleWarning('.view() called on an empty selection');
  }
  return new View(this, selector, type);
};

})();

// format
(function(){
var formatExp, formatFixed, formatRound, formatSI, precision, roundPrecision, siSuffixes, strictCheck, zeroPad;

siSuffixes = ['y', 'z', 'a', 'f', 'p', 'n', 'Âµ', '', '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

zeroPad = function(number, pad) {
  var str, zeros, _;
  str = number.toString();
  if (str.length < pad) {
    zeros = pad - str.length;
    return ((function() {
      var _i, _ref, _results;
      _results = [];
      for (_ = _i = 0, _ref = zeros - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; _ = 0 <= _ref ? ++_i : --_i) {
        _results.push('0');
      }
      return _results;
    })()).join('') + str;
  } else {
    return str;
  }
};

precision = function(n) {
  if (n) {
    return Math.floor(Math.log(Math.abs(n)) / Math.LN10);
  } else {
    return 1;
  }
};

roundPrecision = function(n, base, factor) {
  if (factor >= 0) {
    return Math.round(n / Math.pow(base, factor)) * Math.pow(base, factor);
  } else {
    return Math.round(n * Math.pow(base, -factor)) / Math.pow(base, -factor);
  }
};

formatRound = function(n, sf) {
  var factor;
  if (isNaN(n)) {
    return 'NaN';
  }
  factor = precision(n) - sf + 1;
  return roundPrecision(n, 10, factor).toString();
};

formatSI = function(n, sf) {
  var p, siFactor, suffix, x;
  if (isNaN(n)) {
    return 'NaN';
  }
  p = Math.min(precision(n), 26);
  suffix = siSuffixes[Math.min(Math.max(0, Math.floor(8 + p / 3)), 16)];
  x = Math.abs(n) < 1 && p % 3 && !((-3 < p && p < 0)) ? 1000 : 1;
  if (p === -3) {
    x = 1000;
    suffix = siSuffixes[6];
  }
  siFactor = Math.pow(10, p - p % 3) / x;
  return formatRound(n / siFactor, sf) + suffix;
};

formatExp = function(n, sf) {
  var p;
  if (isNaN(n)) {
    return 'NaN';
  }
  p = precision(n);
  return formatRound(n / Math.pow(10, p), sf) + 'e' + p;
};

formatFixed = function(n, digits) {
  if (isNaN(n)) {
    return 'NaN';
  }
  return n.toFixed(digits);
};

strictCheck = function(f, sf, strict) {
  if (strict) {
    return function(n) {
      return f(n, sf);
    };
  } else {
    return function(n) {
      if (hx.isString(n)) {
        return n;
      } else {
        return f(n, sf);
      }
    };
  }
};

hx.format = {
  round: function(sf, strict) {
    return strictCheck(formatRound, sf, strict);
  },
  si: function(sf, strict) {
    return strictCheck(formatSI, sf, strict);
  },
  exp: function(sf, strict) {
    return strictCheck(formatExp, sf, strict);
  },
  fixed: function(digits, strict) {
    return strictCheck(formatFixed, digits, strict);
  },
  zeroPad: function(length, strict) {
    return strictCheck(zeroPad, length, strict);
  }
};

})();

// number-picker
(function(){
var NumberPicker,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

NumberPicker = (function(_super) {
  __extends(NumberPicker, _super);

  function NumberPicker(selector, buttonClass) {
    var button, container, select;
    this.selector = selector;
    if (buttonClass == null) {
      buttonClass = '';
    }
    NumberPicker.__super__.constructor.apply(this, arguments);
    container = hx.select(this.selector);
    select = container["class"]('hx-number-picker');
    button = select.append('button')["class"]('hx-btn ' + buttonClass);
    button.append('i')["class"]('fa fa-chevron-up');
    button.on('click', (function(_this) {
      return function() {
        return _this.increment();
      };
    })(this));
    this.selectInput = select.append('input');
    this.selectInput.attr('type', 'number');
    this.selectInput.on('blur', (function(_this) {
      return function() {
        if (_this.selectInput.attr('readonly') == null) {
          _this.selectInput.attr('data-value', _this.selectInput.value());
        }
        _this.emit('input-change', {
          value: _this.getValue()
        });
        return _this.emit('change', {
          value: _this.getValue()
        });
      };
    })(this));
    button = select.append('button')["class"]('hx-btn ' + buttonClass);
    button.append('i')["class"]('fa fa-chevron-down');
    button.on('click', (function(_this) {
      return function() {
        return _this.decrement();
      };
    })(this));
  }

  NumberPicker.prototype.getValue = function() {
    return Number(this.selectInput.attr('data-value'));
  };

  NumberPicker.prototype.setValue = function(value, screenValue) {
    if (screenValue && isNaN(screenValue)) {
      this.selectInput.attr('type', 'text').attr('readonly', '');
    } else {
      this.selectInput.attr('type', 'number').node().removeAttribute('readonly');
    }
    this.selectInput.value(screenValue || value);
    this.selectInput.attr('data-value', value);
    return this.emit('change', {
      value: value
    });
  };

  NumberPicker.prototype.increment = function() {
    this.setValue(this.getValue() + 1);
    return this.emit('increment');
  };

  NumberPicker.prototype.decrement = function() {
    this.setValue(this.getValue() - 1);
    return this.emit('decrement');
  };

  return NumberPicker;

})(hx.EventEmitter);

hx.NumberPicker = NumberPicker;

})();

// menu
(function(){
var Menu, MenuItem, checkEvent, dealWithEvent, dropdownContent, getAllItems, moveSelectionDown, moveSelectionUp, setActive, toggleCollapseable,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

dropdownContent = function(getItems, parent) {
  return function(node) {
    var selection;
    selection = hx.select(node).view('.hx-menu-item').update(function(d, element) {
      return d.build(element);
    }).apply(getItems());
    if (parent) {
      return parent.addException(node);
    }
  };
};

getAllItems = function(menu) {
  var allItems, pushItems;
  allItems = [];
  pushItems = function(arr, parentIndex) {
    return arr.forEach(function(d, i) {
      d.parentIndex = parentIndex;
      allItems.push(d);
      if (d.items) {
        return pushItems(d.items, i);
      }
    });
  };
  pushItems(menu.items);
  return allItems;
};

setActive = function(menu, pos, up, click) {
  var allItems, collapsibleHeading, content, dNode, ddScroll, goUp, isEnabled, itemHeight, mNode, menuNode, node, offset, parentNode, parentOffset, totalOffset, _ref, _ref1, _ref2, _ref3;
  if ((_ref = menu.dropdown.dropdown) != null) {
    _ref.selectAll('.hx-menu-item').classed('hx-menu-active', false);
  }
  if (pos >= 0) {
    allItems = getAllItems(menu);
    node = allItems[pos].node;
    content = (_ref1 = allItems[pos]) != null ? _ref1.content : void 0;
    isEnabled = !(content != null ? content.disabled : void 0) && !(content != null ? content.unselectable : void 0);
    while ((node.offsetParent === null || !isEnabled) && !click) {
      if (up) {
        pos -= 1;
      } else {
        pos += 1;
      }
      content = (_ref2 = allItems[pos]) != null ? _ref2.content : void 0;
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
      if (((dNode = (_ref3 = menu.dropdown.dropdown) != null ? _ref3.node() : void 0) != null) && !click) {
        menuNode = hx.select(node).classed('hx-menu-active', true);
        mNode = menuNode.node();
        offset = mNode.offsetTop;
        collapsibleHeading = menuNode.select('.hx-menu-collapsible');
        itemHeight = collapsibleHeading.size() > 0 ? collapsibleHeading.node().clientHeight : mNode.clientHeight;
        parentNode = hx.select(mNode.parentNode);
        parentOffset = parentNode.classed('hx-collapsible-content') ? parentNode.node().offsetTop : 0;
        totalOffset = offset + itemHeight + parentOffset;
        ddScroll = totalOffset > dNode.clientHeight ? totalOffset - dNode.clientHeight : 0;
        dNode.scrollTop = ddScroll;
      }
    }
  }
  if (menu.has('select')) {
    return menu.emit('select', {
      content: allItems != null ? allItems[menu.cursorPos] : void 0,
      index: menu.cursorPos,
      click: click,
      type: click ? 'click' : ''
    });
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
  return setActive(menu, pos);
};

toggleCollapseable = function(collapsible, force) {
  switch (force) {
    case true:
      return collapsible.show();
    case false:
      return collapsible.hide();
    default:
      return collapsible.toggle();
  }
};

dealWithEvent = function(menu, force, eventType) {
  var allItems, pos, selectedItem, _ref;
  if (eventType == null) {
    eventType = 'enter';
  }
  if (eventType === 'tab') {
    pos = Math.max(menu.cursorPos, 0);
  } else {
    pos = menu.cursorPos;
  }
  allItems = getAllItems(menu);
  selectedItem = allItems[pos];
  if ((force != null) && !force && ((selectedItem != null ? (_ref = selectedItem.parent) != null ? _ref.collapsible : void 0 : void 0) != null)) {
    toggleCollapseable(selectedItem.parent.collapsible, force);
    return setTimeout(function() {
      return moveSelectionUp(menu);
    }, 200);
  } else if ((selectedItem != null ? selectedItem.collapsible : void 0) != null) {
    return toggleCollapseable(selectedItem.collapsible, force);
  } else if (((force != null) && force) || (force == null)) {
    return menu.emit('select', {
      type: eventType,
      content: selectedItem
    });
  }
};

checkEvent = function(e, self) {
  switch (e.which) {
    case 9:
      dealWithEvent(self, void 0, 'tab');
      break;
    case 13:
      e.preventDefault();
      dealWithEvent(self, void 0);
      break;
    case 37:
      dealWithEvent(self, false);
      break;
    case 38:
      e.preventDefault();
      moveSelectionUp(self);
      break;
    case 39:
      dealWithEvent(self, true);
      break;
    case 40:
      e.preventDefault();
      moveSelectionDown(self);
  }
  return self.emit('input', e);
};

MenuItem = (function() {
  function MenuItem(content, parent, menu) {
    this.content = content;
    this.parent = parent;
    this.menu = menu;
    this.items = [];
    this.dropdown = void 0;
  }

  MenuItem.prototype.build = function(container) {
    var collapsibleNode, contentNode, headerNode, linkEnabled;
    this.node = container;
    container = hx.select(container);
    if (this.items.length > 0) {
      container.view('.hx-collapsible').apply(this);
      collapsibleNode = container.select('.hx-collapsible');
      collapsibleNode.view('.hx-collapsible-heading').apply(this);
      collapsibleNode.view('.hx-collapsible-content').update(function() {
        return this.style('display', 'none');
      }).apply(this);
      if (this.menu.colorClass) {
        collapsibleNode.classed(this.menu.colorClass, true);
      }
      headerNode = collapsibleNode.select('.hx-collapsible-heading').classed('hx-menu-collapsible', true).node();
      contentNode = container.select('.hx-collapsible-content').node();
      this.menu.renderer(headerNode, this.content);
      this.collapsible = new hx.Collapsible(collapsibleNode.node());
      return dropdownContent(((function(_this) {
        return function() {
          return _this.items;
        };
      })(this)))(contentNode);
    } else {
      linkEnabled = !this.content.unselectable && !this.content.disabled;
      container.classed('hx-menu-link', linkEnabled).classed('hx-menu-item-disabled', this.content.disabled).classed('hx-menu-unselectable', this.content.unselectable);
      return this.menu.renderer(container.node(), this.content);
    }
  };

  MenuItem.prototype.addItem = function(item) {
    var it;
    it = new MenuItem(item, this, this.menu);
    this.items.push(it);
    return it;
  };

  MenuItem.prototype.addItems = function(items) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      _results.push(this.addItem(item));
    }
    return _results;
  };

  MenuItem.prototype.clearItems = function() {
    return this.items = [];
  };

  MenuItem.prototype.addException = function(element) {
    this.dropdown.clickDetector.addException(element);
    return this.parent.addException(element);
  };

  return MenuItem;

})();

Menu = (function(_super) {
  var namedColorColors;

  __extends(Menu, _super);

  namedColorColors = ['hx-positive', 'hx-warning', 'hx-negative', 'hx-info', 'hx-compliment', 'hx-contrast'];

  function Menu(selector, align, mode, ddClass) {
    var cls, isInput, selection, self, targetElem, _i, _len;
    this.selector = selector;
    if (mode == null) {
      mode = 'click';
    }
    Menu.__super__.constructor.apply(this, arguments);
    this.items = [];
    selection = hx.select(this.selector);
    if (!ddClass) {
      ddClass = '';
      for (_i = 0, _len = namedColorColors.length; _i < _len; _i++) {
        cls = namedColorColors[_i];
        if (selection.classed(cls)) {
          this.colorClass = cls;
        }
      }
    }
    if (this.colorClass != null) {
      ddClass = ddClass + ' ' + this.colorClass;
    }
    ddClass = 'hx-menu ' + ddClass;
    this.dropdown = new hx.Dropdown(this.selector, '', mode, align, void 0, true, ddClass);
    this.dropdown.dropdownContent = dropdownContent((function(_this) {
      return function() {
        return _this.items;
      };
    })(this));
    self = this;
    if (selection.node().nodeName.toLowerCase() === 'input') {
      isInput = true;
      targetElem = selection;
    }
    this.dropdown.on('show', function() {
      self.cursorPos = -1;
      if (!isInput) {
        targetElem = self.dropdown.dropdown;
        targetElem.attr('tabindex', '-1');
        targetElem.node().focus();
      }
      targetElem.on('keydown', function(e) {
        if (self.dropdown.isOpen()) {
          checkEvent(e, self);
        }
        return self.emit('keydown', e);
      });
      return self.dropdown.dropdown.on('click', function(e) {
        var allItems, i, index, t, target;
        target = hx.select(e.target).closest('.hx-menu-item').node();
        if (target == null) {
          target = e.target;
        }
        index = -1;
        t = hx.select(target);
        if (t.classed('hx-menu-link')) {
          allItems = getAllItems(self);
          i = 0;
          while (index < 0) {
            if (allItems[i].node === target) {
              index = i;
              break;
            }
            i += 1;
          }
          setActive(self, index, void 0, true);
        }
        return targetElem.node().focus();
      });
    });
    this.dropdown.pipe(this);
  }

  Menu.prototype.renderer = function(element, item) {
    return hx.select(element).html(item).on('click', (function(_this) {
      return function() {
        return _this.emit('select', item);
      };
    })(this));
  };

  Menu.prototype.addItem = function(item) {
    var it;
    it = new MenuItem(item, this, this);
    this.items.push(it);
    return it;
  };

  Menu.prototype.addItems = function(items) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      _results.push(this.addItem(item));
    }
    return _results;
  };

  Menu.prototype.addException = function(element) {
    return this.dropdown.clickDetector.addException(element);
  };

  Menu.prototype.clearItems = function() {
    return this.items = [];
  };

  Menu.prototype.hide = function() {
    return this.dropdown.hide();
  };

  Menu.prototype.render = function(data) {
    var inner;
    inner = function(dropdownData, current) {
      var datum, it, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = dropdownData.length; _i < _len; _i++) {
        datum = dropdownData[_i];
        it = current.addItem(datum);
        if (datum.children) {
          _results.push(inner(datum.children, it));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    this.clearItems();
    return inner(data, this);
  };

  return Menu;

})(hx.EventEmitter);

hx.Menu = Menu;

})();

// filter
(function(){
var buildFilter, filterCaseModifier, filterDefaults, filterMatch;

filterDefaults = {
  caseSensitive: false,
  searchValues: void 0,
  sort: true
};

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
  var e, isMatch, val, _i, _len, _ref;
  val = 0;
  isMatch = false;
  if (options.searchValues != null) {
    _ref = options.searchValues(item);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      val += options.lookup(options.caseModifier(e.toString()));
      if (val > -1) {
        isMatch = true;
      }
    }
  } else {
    val += options.lookup(options.caseModifier(item.toString()));
  }
  if (getIndex === true) {
    return val;
  } else if (isMatch || val > -1) {
    return true;
  } else {
    return false;
  }
};

buildFilter = function(lookupType) {
  return function(array, term, options) {
    if (options == null) {
      options = {};
    }
    options = hx.merge({}, filterDefaults, options);
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
        var aArr, aI, bArr, bI, i, r, _i, _ref;
        aI = filterMatch(a, true, options);
        bI = filterMatch(b, true, options);
        if (aI > bI) {
          return 1;
        } else if (aI < bI) {
          return -1;
        } else if (options.searchValues != null) {
          r = 0;
          aArr = options.searchValues(a);
          bArr = options.searchValues(b);
          for (i = _i = 0, _ref = aArr.length; _i < _ref; i = _i += 1) {
            r = hx.sort.compare(aArr[i], bArr[i]);
            if (r !== 0) {
              break;
            }
          }
          return r;
        } else {
          return hx.sort.compare(a, b);
        }
      });
    }
    return array;
  };
};

hx.filter = {
  exact: buildFilter(function(term) {
    return function(item) {
      if (item === term) {
        return term.length;
      } else {
        return -1;
      }
    };
  }),
  startsWith: buildFilter(function(term) {
    return function(item) {
      if (hx.startsWith(item, term)) {
        return term.length;
      } else {
        return -1;
      }
    };
  }),
  contains: buildFilter(function(term) {
    return function(item) {
      var index;
      index = item.indexOf(term);
      if (index > -1) {
        return index + term.length;
      } else {
        return -1;
      }
    };
  }),
  excludes: buildFilter(function(term) {
    return function(item) {
      var index;
      index = item.indexOf(term);
      if (index === -1) {
        return term.length;
      } else {
        return -1;
      }
    };
  }),
  greater: buildFilter(function(term) {
    return function(item) {
      var val;
      val = hx.sort.compare(item, term);
      if (val !== -1) {
        return val;
      } else {
        return -1;
      }
    };
  }),
  less: buildFilter(function(term) {
    return function(item) {
      var val;
      val = hx.sort.compare(term, item);
      if (val !== -1) {
        return val;
      } else {
        return -1;
      }
    };
  }),
  fuzzy: buildFilter(function(term) {
    var pattern, regStr;
    regStr = '(' + term.split('').join(').*?(') + ').*?';
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
  }),
  regex: buildFilter(function(term) {
    return function(item) {
      var match;
      match = item.match(term);
      if (match != null) {
        return match.index + match[0].length;
      } else {
        return -1;
      }
    };
  })
};

})();

// date-picker
(function(){
var DatePicker, DatePickerFeed, DatePickerMomentFeed,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DatePickerMomentFeed = (function(_super) {
  __extends(DatePickerMomentFeed, _super);

  function DatePickerMomentFeed() {
    DatePickerMomentFeed.__super__.constructor.apply(this, arguments);
    this.selectedDate1 = moment().hour(0).minute(0).seconds(0).millisecond(0);
    this.selectedDate2 = moment().hour(0).minute(0).seconds(0).millisecond(0);
    this.locale = moment.locale();
    this.year = this.getYear();
    this.month = this.getMonth();
    this.momentDate = moment(new Date(this.year, this.month));
  }

  DatePickerMomentFeed.prototype.setDate = function(date, which) {
    var eDate, newDate, sDate;
    newDate = moment(date);
    if (which != null) {
      sDate = this.getWhichDate(true);
      eDate = this.getWhichDate(false);
      this.selectedDate1 = sDate;
      this.selectedDate2 = eDate;
      if (which) {
        this.selectedDate1 = newDate;
        this.selectedDate2 = newDate;
      } else {
        this.selectedDate2 = newDate;
      }
    } else {
      this.selectedDate1 = newDate;
    }
    this.emit('change');
    return void 0;
  };

  DatePickerMomentFeed.prototype.showMonth = function(month, year) {
    this.momentDate = moment(new Date(year, month));
    this.month = this.momentDate.month();
    this.year = this.momentDate.year();
    this.emit('calendarChange');
    return void 0;
  };

  DatePickerMomentFeed.prototype.showNextMonth = function() {
    return this.showMonth(this.month + 1, this.year);
  };

  DatePickerMomentFeed.prototype.showPrevMonth = function() {
    return this.showMonth(this.month - 1, this.year);
  };

  DatePickerMomentFeed.prototype.setDay = function(day) {
    this.selectedDate1.date(day);
    this.emit('change');
    return void 0;
  };

  DatePickerMomentFeed.prototype.setMonth = function(month) {
    this.selectedDate1.month(month);
    this.emit('change');
    return void 0;
  };

  DatePickerMomentFeed.prototype.setYear = function(year) {
    this.selectedDate1.year(year);
    this.emit('change');
    return void 0;
  };

  DatePickerMomentFeed.prototype.addDays = function(days, startDate) {
    return this.setDay(this.getDay(startDate) + days);
  };

  DatePickerMomentFeed.prototype.addMonths = function(months, startDate) {
    return this.setMonth(this.getMonth(startDate) + months);
  };

  DatePickerMomentFeed.prototype.addYears = function(years, startDate) {
    return this.setYear(this.getYear(startDate) + years);
  };

  DatePickerMomentFeed.prototype.getDate = function(startDate) {
    return this.getWhichDate(startDate).toDate();
  };

  DatePickerMomentFeed.prototype.getWhichDate = function(startDate) {
    var theDate;
    theDate = (startDate != null) && startDate ? this.selectedDate1.isBefore(this.selectedDate2) ? this.selectedDate1 : this.selectedDate2 : (startDate != null) && !startDate ? this.selectedDate1.isAfter(this.selectedDate2) ? this.selectedDate1 : this.selectedDate2 : this.selectedDate1;
    return theDate;
  };

  DatePickerMomentFeed.prototype.getDay = function(startDate) {
    return this.getWhichDate(startDate).date();
  };

  DatePickerMomentFeed.prototype.getMonth = function(startDate) {
    return this.getWhichDate(startDate).month();
  };

  DatePickerMomentFeed.prototype.getYear = function(startDate) {
    return this.getWhichDate(startDate).year();
  };

  DatePickerMomentFeed.prototype.getScreenDate = function(useInbuilt, startDate) {
    var date, dateString;
    date = this.getWhichDate(startDate);
    date.locale(this.locale);
    dateString = date.format(!useInbuilt ? 'L' : '');
    return dateString;
  };

  DatePickerMomentFeed.prototype.getDayNames = function() {
    var dayDate, i, _i;
    if (this.locale !== this.oldLocale || (this.dayNames == null)) {
      dayDate = moment('2015-01-11T12:00:00Z');
      dayDate.locale(this.locale);
      this.dayNames = [dayDate.format('dd')];
      for (i = _i = 0; _i < 6; i = ++_i) {
        this.dayNames.push(dayDate.add(1, 'd').format('dd'));
      }
      this.oldLocale = this.locale;
    }
    return this.dayNames;
  };

  DatePickerMomentFeed.prototype.getMonthName = function() {
    return this.momentDate.locale(this.locale).format('MMMM');
  };

  DatePickerMomentFeed.prototype.getYearName = function() {
    return this.momentDate.locale(this.locale).format('YYYY');
  };

  DatePickerMomentFeed.prototype.getCalendarDays = function() {
    var date, day, end, i, results, start, week, _i;
    date = moment({
      year: this.year,
      month: this.month,
      day: 1
    });
    date.locale(this.locale);
    start = date.isoWeekday();
    end = date.daysInMonth();
    results = [];
    week = [];
    if (start % 7 !== 0) {
      for (i = _i = 0; 0 <= start ? _i < start : _i > start; i = 0 <= start ? ++_i : --_i) {
        week.push(void 0);
      }
    }
    i = 0;
    while (i <= 31) {
      i += 1;
      day = date.date(i);
      week.push({
        screenDay: day.format('D'),
        day: i
      });
      if (week.length > 6 || i === end) {
        results.push(week);
        week = [];
      }
      if (i === end) {
        break;
      }
    }
    return results;
  };

  DatePickerMomentFeed.prototype.getPickerOrder = function() {
    var date, dateCheck, dayIndex, i, monthIndex, result, yearIndex, _i, _ref;
    date = moment({
      year: 2003,
      month: 11,
      day: 22
    }).locale(this.locale);
    dateCheck = date.format('L');
    yearIndex = dateCheck.indexOf(date.format('YYYY'));
    monthIndex = dateCheck.indexOf(date.format('MM'));
    dayIndex = dateCheck.indexOf(date.format('DD'));
    result = [];
    for (i = _i = 0, _ref = dateCheck.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      switch (i) {
        case yearIndex:
          result.push('YYYY');
          break;
        case monthIndex:
          result.push('MM');
          break;
        case dayIndex:
          result.push('DD');
      }
    }
    if (result.length === 0) {
      result = ['DD', 'MM', 'YYYY'];
    }
    return result;
  };

  DatePickerMomentFeed.prototype.getCount = function() {
    return Math.abs(this.selectedDate1.diff(this.selectedDate2, 'days')) + 1;
  };

  DatePickerMomentFeed.prototype.dateFromString = function(dateString) {
    var allValid, daysValid, format, i, monthsValid, part, split, w, yearsValid, _i, _len, _ref;
    split = dateString.split('/');
    allValid = !split.some(function(e) {
      return e === '' || e === '0';
    });
    if (allValid) {
      format = '';
      _ref = this.getPickerOrder();
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        w = _ref[i];
        part = split[i];
        switch (w) {
          case 'DD':
            daysValid = part.length < 3 && part !== '';
            format += 'DD';
            break;
          case 'MM':
            monthsValid = part.length < 3 && part !== '';
            format += 'MM';
            break;
          case 'YYYY':
            yearsValid = part.length < 5 && part !== '';
            format += 'YYYY';
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        return moment(dateString, format, this.locale).toDate();
      } else {
        return new Date('Invalid Date');
      }
    } else {
      return new Date('Invalid Date');
    }
  };

  DatePickerMomentFeed.prototype.isSelectedDay = function(year, month, day, startDate) {
    return this.getYear(startDate) === year && this.getMonth(startDate) === month && this.getDay(startDate) === day;
  };

  DatePickerMomentFeed.prototype.isBetweenDays = function(year, month, day) {
    var eDate, sDate, tDate;
    tDate = moment({
      year: year,
      month: month,
      day: day
    });
    sDate = this.getWhichDate(true);
    eDate = this.getWhichDate(false);
    return tDate.isBefore(eDate) && tDate.isAfter(sDate);
  };

  DatePickerMomentFeed.prototype.isToday = function(year, month, day) {
    var today;
    today = moment().hour(0).minute(0).seconds(0).millisecond(0);
    return moment({
      year: year,
      month: month,
      day: day
    }).isSame(today);
  };

  DatePickerMomentFeed.prototype.update = function(locale) {
    this.locale = (locale != null) && locale ? locale === true ? this.locale : locale : moment.locale();
    this.momentDate.locale(this.locale);
    this.selectedDate1.locale(this.locale);
    this.selectedDate2.locale(this.locale);
    return void 0;
  };

  return DatePickerMomentFeed;

})(hx.EventEmitter);

DatePickerFeed = (function(_super) {
  var zeroPad;

  __extends(DatePickerFeed, _super);

  function DatePickerFeed() {
    DatePickerFeed.__super__.constructor.apply(this, arguments);
    this.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.selectedDate1 = new Date;
    this.selectedDate1.setHours(0, 0, 0, 0);
    this.selectedDate2 = new Date;
    this.selectedDate2.setHours(0, 0, 0, 0);
    this.year = this.selectedDate1.getFullYear();
    this.month = this.selectedDate1.getMonth();
  }

  DatePickerFeed.prototype.setDate = function(date, which) {
    var eDate, sDate;
    if (which != null) {
      sDate = this.getWhichDate(true);
      eDate = this.getWhichDate(false);
      this.selectedDate1 = sDate;
      this.selectedDate2 = eDate;
      if (which) {
        this.selectedDate1 = date;
        this.selectedDate2 = date;
      } else {
        this.selectedDate2 = date;
      }
    } else {
      this.selectedDate1 = date;
      this.selectedDate2 = date;
    }
    this.emit('change');
    return void 0;
  };

  DatePickerFeed.prototype.showMonth = function(month, year) {
    var date;
    date = new Date(year, month);
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.emit('calendarChange');
    return void 0;
  };

  DatePickerFeed.prototype.showNextMonth = function() {
    return this.showMonth(this.month + 1, this.year);
  };

  DatePickerFeed.prototype.showPrevMonth = function() {
    return this.showMonth(this.month - 1, this.year);
  };

  DatePickerFeed.prototype.setDay = function(day) {
    this.selectedDate1.setDate(day);
    this.emit('change');
    return void 0;
  };

  DatePickerFeed.prototype.setMonth = function(month) {
    this.selectedDate1.setMonth(month);
    this.emit('change');
    return void 0;
  };

  DatePickerFeed.prototype.setYear = function(year) {
    this.selectedDate1.setFullYear(year);
    this.emit('change');
    return void 0;
  };

  DatePickerFeed.prototype.addDays = function(days, startDate) {
    return this.setDay(this.getDay(startDate) + days);
  };

  DatePickerFeed.prototype.addMonths = function(months, startDate) {
    return this.setMonth(this.getMonth(startDate) + months);
  };

  DatePickerFeed.prototype.addYears = function(years, startDate) {
    return this.setYear(this.getYear(startDate) + years);
  };

  DatePickerFeed.prototype.getDate = function(startDate) {
    return this.getWhichDate(startDate);
  };

  DatePickerFeed.prototype.getWhichDate = function(startDate) {
    var theDate;
    theDate = (startDate != null) && startDate ? this.selectedDate1 < this.selectedDate2 ? this.selectedDate1 : this.selectedDate2 : (startDate != null) && !startDate ? this.selectedDate2 < this.selectedDate1 ? this.selectedDate1 : this.selectedDate2 : this.selectedDate1;
    return theDate;
  };

  DatePickerFeed.prototype.getDay = function(startDate) {
    return this.getWhichDate(startDate).getDate();
  };

  DatePickerFeed.prototype.getMonth = function(startDate) {
    return this.getWhichDate(startDate).getMonth();
  };

  DatePickerFeed.prototype.getYear = function(startDate) {
    return this.getWhichDate(startDate).getFullYear();
  };

  zeroPad = hx.format.zeroPad(2);

  DatePickerFeed.prototype.getScreenDate = function(useInbuilt, startDate) {
    var dateString, padDateString;
    padDateString = function(dateString) {
      return dateString.split('/').map(function(d) {
        return zeroPad(d);
      }).join('/');
    };
    dateString = useInbuilt ? this.getYear(startDate) + "-" + zeroPad(this.getMonth(startDate) + 1) + "-" + zeroPad(this.getDay(startDate)) : padDateString(this.getWhichDate(startDate).toLocaleDateString());
    return dateString;
  };

  DatePickerFeed.prototype.getDayNames = function() {
    return this.dayNames;
  };

  DatePickerFeed.prototype.getMonthName = function() {
    return this.monthNames[this.month];
  };

  DatePickerFeed.prototype.getYearName = function() {
    return this.year;
  };

  DatePickerFeed.prototype.getCalendarDays = function() {
    var e, end, i, results, start, _, _i, _j, _ref, _results, _results1;
    start = (new Date(this.year, this.month)).getDay();
    end = new Date(this.year, this.month + 1, 0).getDate();
    results = [];
    results.push(start > 0 ? ((function() {
      var _j, _ref1, _results1;
      _results1 = [];
      for (_ = _j = 0, _ref1 = start - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; _ = 0 <= _ref1 ? ++_j : --_j) {
        _results1.push(void 0);
      }
      return _results1;
    })()).concat((function() {
      _results = [];
      for (var _i = 1, _ref = 7 - start; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this)) : [1, 2, 3, 4, 5, 6, 7]);
    i = 1 - start;
    while (i < end) {
      i += 7;
      e = Math.min(i + 6, end);
      if (i <= e) {
        results.push((function() {
          _results1 = [];
          for (var _j = i; i <= e ? _j <= e : _j >= e; i <= e ? _j++ : _j--){ _results1.push(_j); }
          return _results1;
        }).apply(this));
      }
    }
    return results;
  };

  DatePickerFeed.prototype.getPickerOrder = function() {
    var date, dateCheck, dayIndex, i, monthIndex, result, yearIndex, _i, _ref;
    date = new Date(2003, 5, 1);
    dateCheck = date.toLocaleDateString();
    yearIndex = dateCheck.indexOf(date.getFullYear());
    monthIndex = dateCheck.indexOf(date.getMonth() + 1);
    dayIndex = dateCheck.indexOf(date.getDate());
    result = [];
    for (i = _i = 0, _ref = dateCheck.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      switch (i) {
        case yearIndex:
          result.push('YYYY');
          break;
        case monthIndex:
          result.push('MM');
          break;
        case dayIndex:
          result.push('DD');
      }
    }
    if (result.length === 0) {
      result = ['DD', 'MM', 'YYYY'];
    }
    return result;
  };

  DatePickerFeed.prototype.getCount = function() {
    var diff, diffDays, oneDay;
    oneDay = 24 * 60 * 60 * 1000;
    diff = this.getWhichDate(true) - this.getWhichDate(false);
    diffDays = Math.round(Math.abs(diff / oneDay));
    return diffDays + 1;
  };

  DatePickerFeed.prototype.dateFromString = function(dateString) {
    var allValid, day, daysValid, format, i, month, monthsValid, part, split, w, year, yearsValid, _i, _len, _ref;
    split = dateString.split('/');
    allValid = !split.some(function(e) {
      return e === '' || e === '0';
    });
    if (allValid) {
      format = '';
      _ref = this.getPickerOrder();
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        w = _ref[i];
        part = split[i];
        switch (w) {
          case 'DD':
            daysValid = part.length < 3 && part !== '';
            day = split[i];
            break;
          case 'MM':
            monthsValid = part.length < 3 && part !== '';
            month = split[i];
            break;
          case 'YYYY':
            yearsValid = part.length < 5 && part !== '';
            year = split[i];
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        return new Date(year, month, day);
      } else {
        return new Date('Invalid Date');
      }
    } else {
      return new Date('Invalid Date');
    }
  };

  DatePickerFeed.prototype.isSelectedDay = function(year, month, day, startDate) {
    return this.getYear(startDate) === year && this.getMonth(startDate) === month && this.getDay(startDate) === day;
  };

  DatePickerFeed.prototype.isBetweenDays = function(year, month, day) {
    var eDate, sDate, tDate;
    tDate = new Date(year, month, day);
    sDate = this.getWhichDate(true);
    eDate = this.getWhichDate(false);
    return tDate < eDate && tDate > sDate;
  };

  DatePickerFeed.prototype.isToday = function(year, month, day) {
    var date, today;
    today = new Date();
    date = new Date(year, month, day);
    return date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
  };

  DatePickerFeed.prototype.update = function() {
    return void 0;
  };

  return DatePickerFeed;

})(hx.EventEmitter);

DatePicker = (function(_super) {
  var setupCalendar, setupDatepicker, setupInput, setupWeek;

  __extends(DatePicker, _super);

  setupWeek = function(element, data, month, year) {
    var self, _f;
    _f = this._.feed;
    self = this;
    return hx.select(element).view('.hx-day').enter(function(d) {
      var node;
      node = this.append('td')["class"]('hx-day');
      if (self.selectRange) {
        node.append('div')["class"]('hx-day-range-bg');
      }
      node.append('div')["class"]('hx-day-text');
      return node.node();
    }).update(function(d) {
      var day, isEndDate, isRange, isStartDate, screenDay;
      if ((d != null) && isNaN(d)) {
        day = d.day;
        screenDay = d.screenDay;
      } else {
        day = d;
        screenDay = d;
      }
      this.classed('hx-day-today', _f.isToday(year, month, day));
      if (self.selectRange) {
        isStartDate = _f.isSelectedDay(year, month, day, true);
        isEndDate = _f.isSelectedDay(year, month, day, false);
        isRange = _f.isBetweenDays(year, month, day);
        this.classed('hx-selected-date', isStartDate || isEndDate).classed('hx-selected-date-start', isStartDate).classed('hx-selected-date-range', isRange).classed('hx-selected-date-end', isEndDate);
      } else {
        this.classed('hx-selected-date', _f.isSelectedDay(year, month, day));
      }
      this.classed('hx-out-of-month', day == null).on('click', (function(_this) {
        return function() {
          self._.clickStart = self.selectRange ? !self._.clickStart : void 0;
          if (d != null) {
            _f.setDate(new Date(year, month, day), self._.clickStart);
          }
          setupInput.call(self);
          if (self.selectRange && !self._.clickStart || !self.selectRange) {
            if (self.closeOnSelect) {
              return self.hideDropdown();
            }
          }
        };
      })(this));
      return this.select('.hx-day-text').text(screenDay || '');
    }).apply(data);
  };

  setupInput = function() {
    if (this.selectRange) {
      this.inputStart.value(this._.feed.getScreenDate(false, true));
      return this.inputEnd.value(this._.feed.getScreenDate(false, false));
    } else {
      return this.input.value(this._.feed.getScreenDate(this.useInbuilt));
    }
  };

  setupCalendar = function(force) {
    var days, month, monthName, self, year, _f;
    if (!this.useInbuilt) {
      if (this.dropdown.isOpen() || force) {
        _f = this._.feed;
        self = this;
        year = _f.year;
        month = _f.month;
        monthName = _f.getMonthName();
        this.monthNameHeader.text(monthName);
        this.yearHeader.text(_f.getYearName());
        days = _f.getCalendarDays();
        this.calendarTable.view('.hx-week', 'tr').update(function(d, element) {
          return setupWeek.call(self, element, d, month, year);
        }).apply(days);
        return this.calendarHeaderView.apply(_f.getDayNames());
      }
    }
  };

  setupDatepicker = function(force) {
    var d, date, i, w, _f, _i, _len, _ref;
    if (!this.useInbuilt) {
      if (this.dropdown.isOpen() || force) {
        _f = this._.feed;
        date = _f.getDate();
        this.supressCallback = true;
        d = _f.getScreenDate().split('/');
        _ref = _f.getPickerOrder();
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          w = _ref[i];
          switch (w) {
            case 'DD':
              this.dayPicker.setValue(date.getDate(), d[i]);
              break;
            case 'MM':
              this.monthPicker.setValue(date.getMonth() + 1, d[i]);
              break;
            case 'YYYY':
              this.yearPicker.setValue(date.getFullYear(), d[i]);
          }
        }
        return this.supressCallback = false;
      }
    }
  };

  function DatePicker(selector, type, closeOnSelect, selectRange) {
    var backMonthButton, calendarElem, calendarMonthHeader, dayNode, forwardMonthButton, icon, inputContainer, monthNode, self, setupDropdown, updateRangePicker, yearNode, _;
    this.selector = selector;
    this.type = type != null ? type : 'calendar';
    this.closeOnSelect = closeOnSelect != null ? closeOnSelect : true;
    this.selectRange = selectRange != null ? selectRange : false;
    DatePicker.__super__.constructor.apply(this, arguments);
    _ = this._ = {};
    self = this;
    if (this.selectRange) {
      this.type = 'calendar';
    }
    _.feed = typeof moment !== "undefined" && moment !== null ? new DatePickerMomentFeed() : new DatePickerFeed();
    _.feed.on('calendarChange', (function(_this) {
      return function(e) {
        return setupCalendar.call(_this);
      };
    })(this)).on('change', (function(_this) {
      return function(e) {
        if (!_this.preventFeedback) {
          _this.preventFeedback = true;
          if (_this.selectRange) {
            _this.inputStart.classed('hx-date-error', false);
            _this.inputEnd.classed('hx-date-error', false);
          } else {
            _this.input.classed('hx-date-error', false);
          }
          if (!_this.dontSetupInput) {
            setupInput.call(_this);
          }
          if (!_this.supressCallback) {
            _this.emit('change');
          }
          _this.dontSetupInput = false;
          _this.supressCallback = false;
          _this.preventFeedback = false;
          if (_this.type === 'calendar') {
            return setupCalendar.call(_this);
          } else {
            return setupDatepicker.call(_this);
          }
        }
      };
    })(this));
    this.supressCallback = false;
    _.clickStart = void 0;
    this.selection = hx.select(this.selector).classed('hx-date-picker', true);
    inputContainer = this.selection.append('div')["class"]('hx-date-input-container');
    icon = inputContainer.append('i')["class"]('fa fa-calendar');
    if (this.selectRange) {
      this.useInbuilt = false;
      updateRangePicker = function(which) {
        var date1, date2, endValid, startValid;
        if (!self.supressCallback) {
          date1 = _.feed.dateFromString(self.inputStart.value());
          date2 = _.feed.dateFromString(self.inputEnd.value());
          if (which && date2 < date1) {
            date1 = date2;
            self.inputStart.value(self.inputEnd.value());
          } else if (!which && date1 > date2) {
            date2 = date1;
            self.inputEnd.value(self.inputStart.value());
          }
          startValid = date1.getTime();
          endValid = date2.getTime();
          if (startValid && endValid) {
            self.setRange(date1, date2, true);
            return self.showMonth(date1.getMonth(), date1.getFullYear());
          } else {
            self.inputStart.classed('hx-date-error', !startValid);
            return self.inputEnd.classed('hx-date-error', !endValid);
          }
        }
      };
      this.inputStart = inputContainer.append('input')["class"]('hx-date-input').on('input', function() {
        return updateRangePicker(false);
      });
      inputContainer.append('i')["class"]('hx-date-to-icon fa fa-angle-double-right');
      this.inputEnd = inputContainer.append('input')["class"]('hx-date-input').on('input', function() {
        return updateRangePicker(true);
      });
    } else {
      this.input = inputContainer.append('input')["class"]('hx-date-input').on('input', (function(_this) {
        return function(event) {
          var date;
          if (!self.supressCallback) {
            date = _.feed.dateFromString(event.target.value);
            if (date.getTime()) {
              self.setDate(date, true);
              return self.showMonth(date.getMonth(), date.getFullYear());
            } else {
              return _this.input.classed('hx-date-error', true);
            }
          }
        };
      })(this));
      this.useInbuilt = hx.supports('date') && hx.supports('touch');
      if (this.useInbuilt) {
        this.input.attr('type', 'date');
      }
    }
    setupInput.call(this);
    if (this.type === 'calendar') {
      calendarElem = hx.detached('div');
      calendarElem["class"]('hx-datepicker-calendar');
      calendarMonthHeader = calendarElem.append('div')["class"]('hx-calendar-month-header');
      this.monthNameHeader = calendarMonthHeader.append('div')["class"]('hx-month');
      calendarMonthHeader.append('div')["class"]('hx-divider').text(' / ');
      this.yearHeader = calendarMonthHeader.append('div')["class"]('hx-year');
      backMonthButton = calendarMonthHeader.append('div')["class"]('hx-calendar-month-back').on('click', function() {
        return _.feed.showPrevMonth();
      }).append('i')["class"]('fa fa-chevron-left');
      forwardMonthButton = calendarMonthHeader.append('div')["class"]('hx-calendar-month-forward').on('click', function() {
        return _.feed.showNextMonth();
      }).append('i')["class"]('fa fa-chevron-right');
      this.calendarTable = calendarElem.append('table')["class"]('hx-calendar').append('tbody');
      this.calendarHeaderView = this.calendarTable.append('tr').view('th', 'th').enter(function(d) {
        return this.append('th').text(d).node();
      }).update(function(d) {
        return this.text(d).node();
      });
      setupDropdown = (function(_this) {
        return function(elem) {
          var selection;
          selection = hx.select(elem);
          selection.append(calendarElem);
          return setupCalendar.call(_this, true);
        };
      })(this);
    } else if (this.type === 'datepicker') {
      dayNode = hx.detached('div').node();
      monthNode = hx.detached('div').node();
      yearNode = hx.detached('div').node();
      this.dayPicker = new hx.NumberPicker(dayNode).on('change', (function(_this) {
        return function(e) {
          if (!_this.supressCallback) {
            return _.feed.setDay(e.value);
          }
        };
      })(this));
      this.monthPicker = new hx.NumberPicker(monthNode).on('change', (function(_this) {
        return function(e) {
          if (!_this.supressCallback) {
            return _.feed.setMonth(e.value - 1);
          }
        };
      })(this));
      this.yearPicker = new hx.NumberPicker(yearNode).on('change', (function(_this) {
        return function(e) {
          if (!_this.supressCallback) {
            return _.feed.setYear(e.value);
          }
        };
      })(this));
      this.dayPicker.selectInput.attr('tabindex', 1);
      this.monthPicker.selectInput.attr('tabindex', 2);
      this.yearPicker.selectInput.attr('tabindex', 3);
      setupDropdown = (function(_this) {
        return function(elem) {
          var i, selection, _i, _len, _ref;
          selection = hx.select(elem);
          _ref = _.feed.getPickerOrder();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
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
          return setupDatepicker.call(_this, true);
        };
      })(this);
    }
    if (!this.useInbuilt) {
      this.dropdown = new hx.Dropdown(this.selector, setupDropdown, 'click', 'down', void 0, false);
    }
  }

  DatePicker.prototype.showDropdown = function() {
    if (!this.useInbuilt) {
      return this.dropdown.show();
    }
  };

  DatePicker.prototype.hideDropdown = function() {
    if (!this.useInbuilt) {
      return this.dropdown.hide();
    }
  };

  DatePicker.prototype.setDate = function(date, dontSetupInput, supressCallback) {
    this.dontSetupInput = dontSetupInput != null ? dontSetupInput : false;
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this._.feed.setDate(date);
  };

  DatePicker.prototype.setRange = function(date1, date2, dontSetupInput, supressCallback) {
    if (dontSetupInput == null) {
      dontSetupInput = false;
    }
    this.supressCallback = supressCallback != null ? supressCallback : false;
    if (this.selectRange) {
      this.dontSetupInput = dontSetupInput;
      this._.feed.setDate(date1, true);
      this.dontSetupInput = dontSetupInput;
      return this._.feed.setDate(date2, false);
    }
  };

  DatePicker.prototype.showMonth = function(month, year) {
    return this._.feed.showMonth(month, year);
  };

  DatePicker.prototype.setDay = function(day, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this._.feed.setDay(day);
  };

  DatePicker.prototype.setMonth = function(month, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this._.feed.setMonth(month);
  };

  DatePicker.prototype.setYear = function(year, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this._.feed.setYear(year);
  };

  DatePicker.prototype.addDays = function(days) {
    return this._.feed.addDays(days);
  };

  DatePicker.prototype.addMonths = function(months) {
    return this._.feed.addMonths(months);
  };

  DatePicker.prototype.addYears = function(years) {
    return this._.feed.addYears(years);
  };

  DatePicker.prototype.getRange = function() {
    return {
      start: this._.feed.getDate(true),
      end: this._.feed.getDate(false),
      count: this._.feed.getCount()
    };
  };

  DatePicker.prototype.getDate = function(endDate) {
    return this._.feed.getDate(!endDate);
  };

  DatePicker.prototype.getScreenDate = function(endDate) {
    return this._.feed.getScreenDate(!endDate);
  };

  DatePicker.prototype.update = function(locale) {
    this._.feed.update(locale);
    setupInput.call(this);
    if (this.type === 'calendar') {
      setupCalendar.call(this, true);
    } else {
      setupDatepicker.call(this, true);
    }
    if (this.dropdown.isOpen()) {
      this.dropdown.hide();
      this.dropdown.show();
    }
    return void 0;
  };

  return DatePicker;

})(hx.EventEmitter);

hx.DatePicker = DatePicker;

})();

// time-picker
(function(){
var TimePicker, TimePickerFeed, TimePickerMomentFeed, zeroPad,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

zeroPad = function(val) {
  val = val.toString();
  if (val.length === 1) {
    return '0' + val;
  } else {
    return val;
  }
};

TimePickerMomentFeed = (function(_super) {
  __extends(TimePickerMomentFeed, _super);

  function TimePickerMomentFeed() {
    TimePickerMomentFeed.__super__.constructor.apply(this, arguments);
    this.selectedDate = moment().millisecond(0);
    this.locale = moment.locale();
  }

  TimePickerMomentFeed.prototype.setDate = function(date, setTime) {
    var newDate;
    if (setTime) {
      this.selectedDate = moment(date);
    } else {
      newDate = moment(date);
      this.selectedDate.date(newDate.date()).month(newDate.month()).year(newDate.year());
    }
    this.emit('change', this.selectedDate.toDate());
    return void 0;
  };

  TimePickerMomentFeed.prototype.setHour = function(hour) {
    this.selectedDate.hours(hour);
    this.emit('change', this.selectedDate.toDate());
    return void 0;
  };

  TimePickerMomentFeed.prototype.setMinute = function(minute) {
    this.selectedDate.minutes(minute);
    this.emit('change', this.selectedDate.toDate());
    return void 0;
  };

  TimePickerMomentFeed.prototype.setSecond = function(second) {
    this.selectedDate.seconds(second);
    this.emit('change', this.selectedDate.toDate());
    return void 0;
  };

  TimePickerMomentFeed.prototype.addHours = function(hours) {
    return this.selectedDate.add(hours, 'hours');
  };

  TimePickerMomentFeed.prototype.addMinutes = function(minutes) {
    return this.selectedDate.add(minutes, 'minutes');
  };

  TimePickerMomentFeed.prototype.addSeconds = function(seconds) {
    return this.selectedDate.add(seconds, 'seconds');
  };

  TimePickerMomentFeed.prototype.getDate = function() {
    return this.selectedDate.toDate();
  };

  TimePickerMomentFeed.prototype.getHour = function() {
    return this.selectedDate.hour();
  };

  TimePickerMomentFeed.prototype.getMinute = function() {
    return this.selectedDate.minute();
  };

  TimePickerMomentFeed.prototype.getSecond = function() {
    return this.selectedDate.second();
  };

  TimePickerMomentFeed.prototype.getScreenTime = function(showSeconds) {
    var format;
    format = showSeconds ? 'H:mm:ss' : 'H:mm';
    return this.selectedDate.format(format);
  };

  TimePickerMomentFeed.prototype.update = function() {
    this.locale = moment.locale();
    this.selectedDate.locale(this.locale);
    return void 0;
  };

  TimePickerMomentFeed.prototype.checkTime = function(time) {
    return moment({
      hours: time[0],
      minutes: time[1],
      seconds: time[2]
    }).isValid();
  };

  return TimePickerMomentFeed;

})(hx.EventEmitter);

TimePickerFeed = (function(_super) {
  __extends(TimePickerFeed, _super);

  function TimePickerFeed() {
    TimePickerFeed.__super__.constructor.apply(this, arguments);
    this.selectedDate = new Date();
    this.selectedDate.setMilliseconds(0);
  }

  TimePickerFeed.prototype.setDate = function(date, setTime) {
    if (setTime) {
      this.selectedDate = date;
    } else {
      date.setHours(this.getHour(), this.getMinute(), this.getSecond(), 0);
      this.selectedDate = date;
    }
    this.emit('change', this.selectedDate);
    return void 0;
  };

  TimePickerFeed.prototype.setHour = function(hour) {
    this.selectedDate.setHours(hour);
    this.emit('change', this.selectedDate);
    return void 0;
  };

  TimePickerFeed.prototype.setMinute = function(minute) {
    this.selectedDate.setMinutes(minute);
    this.emit('change', this.selectedDate);
    return void 0;
  };

  TimePickerFeed.prototype.setSecond = function(second) {
    this.selectedDate.setSeconds(second);
    this.emit('change', this.selectedDate);
    return void 0;
  };

  TimePickerFeed.prototype.addHours = function(hours) {
    return this.setHour(this.getHour() + hours);
  };

  TimePickerFeed.prototype.addMinutes = function(minutes) {
    return this.setMinute(this.getMinute() + minutes);
  };

  TimePickerFeed.prototype.addSeconds = function(seconds) {
    return this.setSeconds(this.getSecond() + seconds);
  };

  TimePickerFeed.prototype.getDate = function() {
    return this.selectedDate;
  };

  TimePickerFeed.prototype.getHour = function() {
    return this.selectedDate.getHours();
  };

  TimePickerFeed.prototype.getMinute = function() {
    return this.selectedDate.getMinutes();
  };

  TimePickerFeed.prototype.getSecond = function() {
    return this.selectedDate.getSeconds();
  };

  TimePickerFeed.prototype.getScreenTime = function(showSeconds) {
    var timeString;
    timeString = this.selectedDate.getHours() + ':' + zeroPad(this.selectedDate.getMinutes());
    if (showSeconds) {
      timeString += ':' + zeroPad(this.selectedDate.getSeconds());
    }
    return timeString;
  };

  TimePickerFeed.prototype.checkTime = function(time) {
    return !isNaN(time[0]) && !isNaN(time[1]) && !isNaN(time[2]);
  };

  return TimePickerFeed;

})(hx.EventEmitter);

TimePicker = (function(_super) {
  var setupInput, setupTimepicker;

  __extends(TimePicker, _super);

  setupTimepicker = function(force) {
    var screenTime, _f;
    if (this.dropdown.isOpen() || force) {
      _f = this._.feed;
      this.supressCallback = true;
      screenTime = this.getScreenTime(true).split(':');
      this.hourPicker.setValue(_f.getHour(), screenTime[0]);
      this.minutePicker.setValue(zeroPad(_f.getMinute()), screenTime[1]);
      this.secondPicker.setValue(zeroPad(_f.getSecond()), screenTime[2]);
      return this.supressCallback = false;
    }
  };

  setupInput = function() {
    this.input.classed('hx-short-time', !this.showSeconds);
    return this.input.value(this._.feed.getScreenTime(this.showSeconds));
  };

  function TimePicker(selector, showSeconds, buttonClass) {
    var hourNode, icon, inputContainer, minuteNode, second, setupDropdown, _;
    this.selector = selector;
    this.showSeconds = showSeconds;
    TimePicker.__super__.constructor.apply(this, arguments);
    _ = this._ = {};
    _.feed = typeof moment !== "undefined" && moment !== null ? new TimePickerMomentFeed() : new TimePickerFeed();
    _.feed.on('change', (function(_this) {
      return function(e) {
        if (!_this.preventFeedback) {
          _this.preventFeedback = true;
          _this.input.classed('hx-time-error', false);
          if (!_this.dontSetupInput) {
            setupInput.call(_this);
          }
          if (!_this.supressCallback) {
            _this.emit('change');
          }
          _this.dontSetupInput = false;
          _this.supressCallback = false;
          _this.preventFeedback = false;
          return setupTimepicker.call(_this);
        }
      };
    })(this));
    this.supressCallback = false;
    this.selection = hx.select(this.selector).classed('hx-time-picker', true);
    inputContainer = this.selection.append('div')["class"]('hx-time-input-container');
    icon = inputContainer.append('i')["class"]('fa fa-clock-o');
    this.input = inputContainer.append('input')["class"]('hx-time-input');
    this.input.on('input', (function(_this) {
      return function(event) {
        var time;
        if (!_this.supressCallback) {
          time = event.target.value.split(':');
          if (time[2] == null) {
            time[2] = 0;
          }
          if (_.feed.checkTime(time)) {
            _.feed.setHour(time[0]);
            _.feed.setMinute(time[1]);
            return _.feed.setSecond(time[2] || 0);
          } else {
            return _this.input.classed('hx-time-error', true);
          }
        }
      };
    })(this));
    setupInput.call(this);
    hourNode = hx.detached('div').node();
    minuteNode = hx.detached('div').node();
    second = hx.detached('div').node();
    this.hourPicker = new hx.NumberPicker(hourNode, buttonClass).on('change', (function(_this) {
      return function(e) {
        if (!_this.supressCallback) {
          return _.feed.setHour(e.value);
        }
      };
    })(this));
    this.hourPicker.selectInput.attr('tabindex', 1).attr('maxlength', '2');
    this.minutePicker = new hx.NumberPicker(minuteNode, buttonClass).on('change', (function(_this) {
      return function(e) {
        if (!_this.supressCallback) {
          return _.feed.setMinute(e.value);
        }
      };
    })(this));
    this.minutePicker.selectInput.attr('tabindex', 2).attr('maxlength', '2');
    this.secondPicker = new hx.NumberPicker(second, buttonClass).on('change', (function(_this) {
      return function(e) {
        if (!_this.supressCallback) {
          return _.feed.setSecond(e.value);
        }
      };
    })(this));
    this.secondPicker.selectInput.attr('tabindex', 3).attr('maxlength', '2');
    setupDropdown = (function(_this) {
      return function(elem) {
        var selection;
        selection = hx.select(elem);
        selection.append(hourNode);
        selection.append(minuteNode);
        if (_this.showSeconds) {
          selection.append(second);
        }
        return setupTimepicker.call(_this, true);
      };
    })(this);
    this.dropdown = new hx.Dropdown(this.selector, setupDropdown, 'click', 'down', void 0, null, 'hx-time-picker-dropdown');
    this;
  }

  TimePicker.prototype.setDate = function(date, setTime, supressCallback) {
    if (setTime == null) {
      setTime = false;
    }
    if (supressCallback == null) {
      supressCallback = false;
    }
    this.supressCallback = supressCallback;
    return this._.feed.setDate(date, setTime);
  };

  TimePicker.prototype.setHour = function(hour, supressCallback) {
    if (supressCallback == null) {
      supressCallback = false;
    }
    this.supressCallback = supressCallback;
    return this._.feed.setHour(hour);
  };

  TimePicker.prototype.setMinute = function(minute, supressCallback) {
    if (supressCallback == null) {
      supressCallback = false;
    }
    this.supressCallback = supressCallback;
    return this._.feed.setMinute(minute);
  };

  TimePicker.prototype.setSecond = function(second, supressCallback) {
    if (supressCallback == null) {
      supressCallback = false;
    }
    this.supressCallback = supressCallback;
    return this._.feed.setSecond(second);
  };

  TimePicker.prototype.addHours = function(hours) {
    return this._.feed.addHours(hours);
  };

  TimePicker.prototype.addMinutes = function(minutes) {
    return this._.feed.addMinutes(minutes);
  };

  TimePicker.prototype.addSeconds = function(seconds) {
    return this._.feed.addSeconds(seconds);
  };

  TimePicker.prototype.getDate = function() {
    return this._.feed.getDate();
  };

  TimePicker.prototype.getHour = function() {
    return this._.feed.getHour();
  };

  TimePicker.prototype.getMinute = function() {
    return this._.feed.getMinute();
  };

  TimePicker.prototype.getSecond = function() {
    return this._.feed.getSecond();
  };

  TimePicker.prototype.getScreenTime = function() {
    return this._.feed.getScreenTime(this.showSeconds);
  };

  TimePicker.prototype.update = function() {
    this._.feed.update();
    setupInput.call(this);
    return setupTimepicker.call(this, true);
  };

  return TimePicker;

})(hx.EventEmitter);

hx.TimePicker = TimePicker;

})();

// request
(function(){
var hasResponse, hx_xhr, performRequest, reshapedRequest, respondToRequest, sendRequest;

hasResponse = function(request) {
  var responseType;
  responseType = request.responseType;
  if (responseType && responseType !== 'text') {
    return request.response;
  } else {
    return request.responseText;
  }
};

respondToRequest = function(request, url, data, callback, options, index) {
  var e, result, source, status;
  status = request.status;
  source = data != null ? {
    url: url,
    data: data
  } : url;
  if (!status && hasResponse(request) || status >= 200 && status < 300 || status === 304) {
    try {
      result = options.formatter(request);
    } catch (_error) {
      e = _error;
      callback(e, void 0, source, index);
      return;
    }
    callback(void 0, result, source, index);
  } else {
    callback(request, void 0, source, index);
  }
};

sendRequest = function(request, url, data, options) {
  var header, sendData, value, _ref;
  request.open(options.requestType, url, true);
  _ref = options.headers;
  for (header in _ref) {
    value = _ref[header];
    request.setRequestHeader(header, value);
  }
  request.responseType = options.responseType || options.contentType || void 0;
  request.overrideMimeType(request.responseType);
  sendData = (data != null) && typeof data !== 'string' ? JSON.stringify(data) : data;
  return request.send(sendData);
};

performRequest = function(url, data, callback, options, index) {
  var defaults, request, respond, _base, _base1;
  if (data == null) {
    data = null;
  }
  if (options == null) {
    options = {};
  }
  defaults = {
    requestType: 'GET',
    formatter: hx.identity,
    headers: {}
  };
  options = hx.merge(true, defaults, options);
  if (options.contentType) {
    if ((_base = options.headers)['Content-Type'] == null) {
      _base['Content-Type'] = options.contentType;
    }
    if ((_base1 = options.headers)['accept'] == null) {
      _base1['accept'] = options.contentType + ',*/*';
    }
  }
  if (options.requestType === 'GET' && data) {
    options.requestType = 'POST';
  }
  request = new XMLHttpRequest();

  /* istanbul ignore next: ie 8.0 - 9.x use xDomainRequest, no other browser uses it */
  if (!('withCredentials' in request) && typeof XDomainRequest !== void 0 && /^(http(s)?:)?\/\//.test(url)) {
    request = new XDomainRequest();
  }
  respond = function() {
    return respondToRequest(request, url, data, callback, options, index);
  };

  /* istanbul ignore next: onload/onerror are part of XMLHttpRequest 2 spec so this is here for older browser support */
  if ('onload' in request) {
    request.onload = request.onerror = respond;
  } else {
    request.onreadystatechange = function() {
      request.readyState > 3 && respond();
    };
  }
  return sendRequest(request, url, data, options);
};

hx_xhr = function(urlType, urls, data, callback, options) {
  var buildResultArr, i, resultArr, url, _i, _len, _results;
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
    _results = [];
    for (i = _i = 0, _len = urls.length; _i < _len; i = ++_i) {
      url = urls[i];
      if (hx.isObject(url)) {
        data = url.data || data;
        url = url.url;
      }
      _results.push(performRequest(url, data, buildResultArr, options, i));
    }
    return _results;
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

hx.request = hx.xhr = function() {
  var callback, data, options, urlType, urls;
  urls = arguments[0];
  urlType = (function() {
    switch (false) {
      case !hx.isArray(urls):
        return 'array';
      case !hx.isObject(urls):
        return 'object';
      case !hx.isString(urls):
        return 'string';
    }
  })();
  if (!urlType || urlType === 'array' && urls.length === 0) {
    console.error('Incorrect URL passed into hx.xhr: ', urls);
    return;
  }
  if (hx.isFunction(arguments[1])) {
    callback = arguments[1];
    options = arguments[2];
  } else {
    data = arguments[1];
    callback = arguments[2];
    options = arguments[3];
  }
  return hx_xhr(urlType, urls, data || null, callback, options);
};

reshapedRequest = function(args, type, formatter) {
  var callback, data, defaults, options, urls;
  urls = args[0];
  if (hx.isFunction(args[1])) {
    callback = args[1];
    options = args[2];
  } else {
    data = args[1];
    callback = args[2];
    options = args[3];
  }
  defaults = {
    contentType: type,
    formatter: formatter
  };
  options = hx.merge(true, defaults, options);
  return hx.xhr(urls, data, callback, options);
};

hx.json = function() {
  return reshapedRequest(arguments, 'application/json', function(result) {
    if (result.responseText) {
      return JSON.parse(result.responseText);
    }
  });
};

hx.html = function() {
  return reshapedRequest(arguments, 'text/html', function(result) {
    return hx.parseHTML(result.responseText);
  });
};

})();

// tag-input
(function(){
var TagInput,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TagInput = (function(_super) {
  __extends(TagInput, _super);

  function TagInput(selector, classifier, validator) {
    var backspacedown;
    this.selector = selector;
    this.classifier = classifier;
    this.validator = validator;
    TagInput.__super__.constructor.apply(this, arguments);
    this.selection = hx.select(this.selector);
    this.tagContainer = this.selection.append('span')["class"]('hx-tags-container');
    this.selection.classed('hx-tag-input', true).classed('hx-input-group', true);
    this.form = this.selection.append('form');
    this.input = this.form.append('input').attr('placeholder', 'add tag...');
    backspacedown = false;
    this.form.on('keypress', (function(_this) {
      return function(event) {
        var name;
        if (event.keyCode === 13) {
          if (_this.form.node().checkValidity()) {
            event.preventDefault();
            name = _this.input.value();
            if (name) {
              _this.add(name, void 0, true);
              _this.emit('add', {
                value: name,
                type: 'user'
              });
              return _this.input.value('');
            }
          }
        }
      };
    })(this));
    this.input.on('input', (function(_this) {
      return function() {
        var error, name;
        name = _this.input.value();
        if (_this.validator) {
          error = _this.validator(name);
          return _this.input.node().setCustomValidity(error || '');
        } else if (name === '') {
          return _this.input.node().setCustomValidity('');
        }
      };
    })(this));
    this.input.on('keydown', (function(_this) {
      return function(event) {
        var nodeSelection, selection, value;
        if (((event.keyCode || event.charCode) === 8) && !backspacedown) {
          backspacedown = true;
          _this.input.node().setCustomValidity('');
          if (_this.input.value() === '') {
            selection = _this.tagContainer.selectAll('.hx-tag');
            if (selection.size() > 0) {
              nodeSelection = hx.select(selection.node(selection.size() - 1));
              value = nodeSelection.text();
              nodeSelection.remove();
              return _this.emit('remove', {
                value: value,
                type: 'user'
              });
            }
          }
        }
      };
    })(this));
    this.input.on('keyup', function(event) {
      if ((event.keyCode || event.charCode) === 8) {
        backspacedown = false;
        return true;
      }
    });
  }

  TagInput.prototype.add = function(name, cssclass, suppressEvent) {
    var cls, n, tagSelection, _i, _len, _results;
    if (hx.isArray(name)) {
      _results = [];
      for (_i = 0, _len = name.length; _i < _len; _i++) {
        n = name[_i];
        _results.push(this.add(n, cssclass, suppressEvent));
      }
      return _results;
    } else {
      tagSelection = this.tagContainer.append('span').text(name);
      if (cssclass) {
        tagSelection["class"]('hx-tag ' + cssclass);
      } else {
        tagSelection["class"]('hx-tag');
      }
      if (this.classifier) {
        cls = this.classifier(name);
        if (cls) {
          tagSelection.classed(cls, true);
        }
      }
      tagSelection.on('click', (function(_this) {
        return function() {
          var value;
          value = tagSelection.text();
          tagSelection.remove();
          return _this.emit('remove', {
            value: value,
            type: 'user'
          });
        };
      })(this));
      if (!suppressEvent) {
        return this.emit('add', {
          value: name,
          type: 'api'
        });
      }
    }
  };

  TagInput.prototype.remove = function(name) {
    return this.tagContainer.selectAll('.hx-tag').filter(function(d) {
      return hx.select(d).text() === name;
    }).each((function(_this) {
      return function(d) {
        return _this.emit('remove', {
          value: hx.select(d).text(),
          type: 'api'
        });
      };
    })(this)).remove().length;
  };

  TagInput.prototype.removeAll = function() {
    var tags, values;
    tags = this.tagContainer.selectAll('.hx-tag').each((function(_this) {
      return function(d) {
        return _this.emit('remove', {
          value: hx.select(d).text(),
          type: 'api'
        });
      };
    })(this));
    values = tags.text();
    tags.remove();
    return values;
  };

  TagInput.prototype.tags = function() {
    return this.tagContainer.selectAll('.hx-tag').text();
  };

  return TagInput;

})(hx.EventEmitter);

hx.TagInput = TagInput;

})();

// modal
(function(){
var Modal, makeButtons, modal_dialog, modal_input,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Modal = (function(_super) {
  var closeModal;

  __extends(Modal, _super);

  closeModal = function(modal, data) {
    var body;
    body = hx.select('body').classed('hx-modal-open', false);
    body.select('.hx-modal-container').remove();
    body.select('.hx-modal-shade').remove();
    return modal.emit('close', data);
  };

  function Modal(title, setup, isClosable) {
    this.title = title;
    this.setup = setup;
    this.isClosable = isClosable != null ? isClosable : true;
    Modal.__super__.constructor.apply(this, arguments);
    this.contentContainer = null;
  }

  Modal.prototype.show = function() {
    var body, modal, modalContainer, shade, title;
    body = hx.select('body').classed('hx-modal-open', true);
    shade = body.select('.hx-modal-shade');
    if (shade.empty()) {
      shade = body.append('div').attr('class', 'hx-modal-shade');
      shade.style('opacity', 0).morph()["with"]('fadein', 150).go();
    }
    modalContainer = body.select('.hx-modal-container');
    if (modalContainer.empty()) {
      modalContainer = body.append('div').attr('class', 'hx-modal-container');
    }
    modal = modalContainer.select('.hx-modal');
    if (modal.empty()) {
      modal = modalContainer.append('div').attr('class', 'hx-modal');
    }
    title = modal.append('div').attr('class', 'hx-modal-title').text(this.title);
    if (this.isClosable) {
      title.append('button')["class"]('hx-modal-close hx-btn').html('<i class="fa fa-times"></i>').on('click', (function(_this) {
        return function() {
          return closeModal(_this, {
            cause: 'button'
          });
        };
      })(this));
      modalContainer.on('click', (function(_this) {
        return function(e) {
          if (!modal.node().contains(e.target)) {
            return closeModal(_this, {
              cause: 'shade'
            });
          }
        };
      })(this));
    }
    this.contentContainer = modal.append('div').attr('class', 'hx-modal-content');
    if (this.setup) {
      this.setup(this.contentContainer.node());
    }
    modal.style('opacity', 0).style('top', '-30px').morph()["with"]('fadein', 150).and(function() {
      return modal.animate().style('top', '0px', 100);
    }).go();
    this.emit('open', this.contentContainer.node());
    return this;
  };

  Modal.prototype.close = function() {
    return closeModal(this, {
      cause: 'api'
    });
  };

  return Modal;

})(hx.EventEmitter);

makeButtons = function(container, buttons, modal, callback) {
  buttons.forEach(function(d) {
    return container.append('button')["class"](d.classes).html("<i class=\"" + d.icon + "\"></i> " + d.text).on('click', function() {
      callback(d.value);
      return modal.close();
    });
  });
  return void 0;
};

modal_dialog = function(title, message, callback, buttons, isClosable) {
  var modal, setup;
  if (isClosable == null) {
    isClosable = false;
  }
  setup = function(element) {
    var buttonContainer, container;
    if (buttons == null) {
      buttons = [
        {
          text: 'Cancel',
          icon: 'fa fa-times',
          value: false,
          classes: 'hx-btn hx-negative'
        }, {
          text: 'Confirm',
          icon: 'fa fa-check',
          value: true,
          classes: 'hx-btn hx-positive'
        }
      ];
    }
    container = hx.select(element);
    message = container.append('div')["class"]('hx-modal-message').text(message);
    buttonContainer = container.append('div')["class"]('hx-modal-buttons');
    return makeButtons(buttonContainer, buttons, this, callback);
  };
  modal = new Modal(title, setup, isClosable);
  modal.on('close', function(d) {
    if (d.cause !== 'api') {
      return callback();
    }
  });
  return modal.show();
};

modal_input = function(title, message, callback, isClosable) {
  var modal, setup;
  if (isClosable == null) {
    isClosable = true;
  }
  setup = function(element) {
    var buttonContainer, buttons, container, input;
    buttons = [
      {
        text: 'Cancel',
        icon: 'fa fa-times',
        value: false,
        classes: 'hx-btn hx-negative'
      }, {
        text: 'Confirm',
        icon: 'fa fa-check',
        value: true,
        classes: 'hx-btn hx-positive'
      }
    ];
    container = hx.select(element);
    message = container.append('span')["class"]('hx-modal-message').text(message);
    input = container.append('input')["class"]('hx-modal-input').text(input);
    buttonContainer = container.append('div')["class"]('hx-modal-buttons');
    return makeButtons(buttonContainer, buttons, this, function(res) {
      if (res) {
        return callback(input.value());
      } else {
        return callback(res);
      }
    });
  };
  modal = new Modal(title, setup);
  modal.on('close', function(d) {
    if (d.cause !== 'api') {
      return callback();
    }
  });
  return modal.show();
};

hx.Modal = Modal;

hx.modal = {
  dialog: modal_dialog,
  input: modal_input
};

})();

// notify
(function(){
var Notification, NotificationManager, inbuiltNotificationManager;

Notification = (function() {
  function Notification(manager, message, icon, cssclass, pinned) {
    this.manager = manager;
    this.message = message;
    this.icon = icon;
    this.cssclass = cssclass;
    this.pinned = pinned;
    this.domPin = hx.detached('i').attr('class', 'hx-notification-pin fa fa-thumb-tack').on('click', (function(_this) {
      return function() {
        return _this.togglePin();
      };
    })(this));
    this.id = this.manager.nextId();
    this.updatePinnedStatus();
  }

  Notification.prototype.startTimeout = function(seconds) {
    return this.timeoutId = window.setTimeout(((function(_this) {
      return function() {
        return _this.close();
      };
    })(this)), seconds * 1000);
  };

  Notification.prototype.close = function() {
    return this.manager.removeNotification(this);
  };

  Notification.prototype.pin = function() {
    this.pinned = true;
    window.clearTimeout(this.timeoutId);
    return this.updatePinnedStatus();
  };

  Notification.prototype.unpin = function() {
    this.pinned = false;
    this.startTimeout(1);
    return this.updatePinnedStatus();
  };

  Notification.prototype.togglePin = function() {
    if (this.pinned) {
      return this.unpin();
    } else {
      return this.pin();
    }
  };

  Notification.prototype.updatePinnedStatus = function() {
    return this.domPin.classed('hx-notification-pin-pinned', this.pinned);
  };

  return Notification;

})();

NotificationManager = (function() {
  var makeNotification, setupNotification;

  setupNotification = function(notification, selection) {
    selection.append('i').attr('class', 'hx-notification-icon ' + notification.icon);
    selection.append('div').attr('class', 'hx-notification-text').text(notification.message);
    selection.append('i').attr('class', 'hx-notification-close fa fa-times').on('click', function() {
      return notification.close();
    });
    return selection.append(notification.domPin);
  };

  function NotificationManager(selector) {
    if (selector == null) {
      selector = 'body';
    }
    this.currentId = 0;
    this.notifications = [];
    this.notificationContainer = hx.select(selector).append('div').attr('class', 'hx-notification-container');
  }

  NotificationManager.prototype.nextId = function() {
    return this.currentId++;
  };

  NotificationManager.prototype.redraw = function() {
    var view;
    view = this.notificationContainer.view('.hx-notification');
    view.enter(function(d) {
      var selection;
      selection = this.append('div');
      selection.attr('class', 'hx-notification ' + d.cssclass).each(function(node) {
        setupNotification(d, selection);
        return d.trueHeight = selection.style('height');
      }).style('opacity', 0).style('height', 0).style('padding-top', 0).style('padding-bottom', 0).style('margin-top', 0).style('margin-bottom', 0).morph()["with"]('expand').and('fadein').then(function() {
        return selection.style('height', '');
      }).go();
      return selection.node();
    });
    view.exit(function() {
      return this.style('overflow', 'hidden').morph()["with"]('fadeout', 100).then('collapse', 100).then((function(_this) {
        return function() {
          return _this.remove();
        };
      })(this)).go();
    });
    return view.apply(this.notifications, function(d) {
      return d.id;
    });
  };

  NotificationManager.prototype.removeNotification = function(notification) {
    var i;
    i = this.notifications.indexOf(notification);
    if (i >= 0) {
      this.notifications.splice(i, 1);
    }
    return this.redraw();
  };

  makeNotification = function(manager, message, icon, cssclass, pinned) {
    var notification;
    notification = new Notification(manager, message, icon, cssclass, pinned);
    manager.notifications.push(notification);
    manager.redraw();
    return notification;
  };

  NotificationManager.prototype.permanent = function(message, icon, cssclass) {
    if (icon == null) {
      icon = '';
    }
    if (cssclass == null) {
      cssclass = '';
    }
    return makeNotification(this, message, icon, cssclass, true);
  };

  NotificationManager.prototype.temporary = function(message, icon, cssclass, timeout) {
    var notification;
    if (icon == null) {
      icon = '';
    }
    if (cssclass == null) {
      cssclass = '';
    }
    if (timeout == null) {
      timeout = 5;
    }
    notification = makeNotification(this, message, icon, cssclass, false);
    notification.startTimeout(timeout);
    return notification;
  };

  NotificationManager.prototype.info = function(message, timeout) {
    if (timeout == null) {
      timeout = 5;
    }
    return this.temporary(message, 'fa fa-info', 'hx-notification-info', timeout);
  };

  NotificationManager.prototype.warning = function(message, timeout) {
    if (timeout == null) {
      timeout = 5;
    }
    return this.temporary(message, 'fa fa-warning', 'hx-notification-warning', timeout);
  };

  NotificationManager.prototype.error = function(message, timeout) {
    if (timeout == null) {
      timeout = 5;
    }
    hx.deprecatedWarning("NotificationManager.error", "use .negative(message, timeout) instead");
    return this.temporary(message, 'fa fa-exclamation-circle', 'hx-notification-negative', timeout);
  };

  NotificationManager.prototype.negative = function(message, timeout) {
    if (timeout == null) {
      timeout = 5;
    }
    return this.temporary(message, 'fa fa-exclamation-circle', 'hx-notification-negative', timeout);
  };

  NotificationManager.prototype.positive = function(message, timeout) {
    if (timeout == null) {
      timeout = 5;
    }
    return this.temporary(message, 'fa fa-check', 'hx-notification-positive', timeout);
  };

  NotificationManager.prototype.loading = function(message) {
    return this.permanent(message, 'hx-spinner', 'hx-notification-loading');
  };

  return NotificationManager;

})();

hx.NotificationManager = NotificationManager;

inbuiltNotificationManager = void 0;

hx.getNotificationManager = function() {
  if (!inbuiltNotificationManager) {
    inbuiltNotificationManager = new NotificationManager;
  }
  return inbuiltNotificationManager;
};

hx.notify = hx.getNotificationManager;

})();

// slider
(function(){
var Slider, sliderRefresh,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

sliderRefresh = function(self) {
  switch (self.type) {
    case 'slider':
      return self.setValue(self.getValue());
    case 'range':
      self.setRangeStartValue(self.getRangeStartValue());
      return self.setRangeEndValue(self.getRangeEndValue());
  }
};

Slider = (function(_super) {
  var getSliderWidth, setValueWithPrecomputedWidth, startSliding;

  __extends(Slider, _super);

  setValueWithPrecomputedWidth = function(slider, sliderSlider, value, slidableWidth, offset, rangeStart) {
    if (offset == null) {
      offset = 0;
    }
    sliderSlider.style('left', (offset + value * slidableWidth) + 'px');
    switch (slider.type) {
      case 'slider':
        slider.emit('change', {
          value: value
        });
        return slider.render(slider, sliderSlider.node(), value, true);
      case 'range':
        slider.emit('change', {
          startValue: slider.getRangeStartValue(),
          endValue: slider.getRangeEndValue()
        });
        return slider.render(slider, sliderSlider.node(), value, true, rangeStart);
    }
  };

  startSliding = function(self, x, set, get, slider, sliderCount, sliderType) {
    var data;
    self.mouseDown = true;
    self.offsetX = slider.box().left - self.container.box().left - x;
    data = {
      value: get()
    };
    if (sliderType) {
      data['type'] = sliderType;
    }
    self.emit('slidestart', data);
    self.selectedSetValue = set;
    return self.selectedWidth = function() {
      return this.container.width() - getSliderWidth(this) * sliderCount;
    };
  };

  getSliderWidth = function(self) {
    switch (self.type) {
      case 'slider':
        return self.slider.width();
      case 'range':
        return self.slider2.width();
    }
  };

  function Slider(selector, type, render) {
    this.type = type != null ? type : 'slider';
    this.render = render;
    Slider.__super__.constructor.apply(this, arguments);
    this.container = hx.select(selector).classed('hx-slider', true);
    this.value = 0.5;
    this.rangeStartValue = 0.25;
    this.rangeEndValue = 0.75;
    if (this.render == null) {
      this.render = function(slider, elem, value, update, rangeStart) {
        return hx.select(elem).text(hx.format.fixed(2)(value));
      };
    }
    switch (this.type) {
      case 'slider':
        this.slider = this.container.append('div').attr('class', 'hx-slider-slider').style('left', 0).on('mousedown', (function(_this) {
          return function(e) {
            return startSliding(_this, e.clientX, _this.setValue, _this.getValue, _this.slider, 1, void 0);
          };
        })(this)).on('touchstart', (function(_this) {
          return function(e) {
            return startSliding(_this, e.touches[0].pageX, _this.setValue, _this.getValue, _this.slider, 1, void 0);
          };
        })(this));
        this.render(this, this.slider.node(), this.value, false);
        break;
      case 'range':
        this.range = this.container.append('div').attr('class', 'hx-slider-range').style('left', 0).style('width', 0);
        this.slider1 = this.container.append('div').attr('class', 'hx-slider-slider hx-slider-slider-left').style('left', 0).on('mousedown', (function(_this) {
          return function(e) {
            return startSliding(_this, e.clientX, (function(d) {
              return _this.setRangeStartValue(Math.min(_this.rangeEndValue, d));
            }), (function() {
              return _this.rangeStartValue;
            }), _this.slider1, 2, 'range-start');
          };
        })(this)).on('touchstart', (function(_this) {
          return function(e) {
            return startSliding(_this, e.touches[0].pageX, (function(d) {
              return _this.setRangeStartValue(Math.min(_this.rangeEndValue, d));
            }), (function() {
              return _this.rangeStartValue;
            }), _this.slider1, 2, 'range-start');
          };
        })(this));
        this.render(this, this.slider1.node(), this.rangeEndValue, false, true);
        this.slider2 = this.container.append('div').attr('class', 'hx-slider-slider hx-slider-slider-right').style('left', 0).on('mousedown', (function(_this) {
          return function(e) {
            return startSliding(_this, e.clientX + getSliderWidth(_this), (function(d) {
              return _this.setRangeEndValue(Math.max(_this.rangeStartValue, d));
            }), (function() {
              return _this.rangeEndValue;
            }), _this.slider2, 2, 'range-end');
          };
        })(this)).on('touchstart', (function(_this) {
          return function(e) {
            return startSliding(_this, e.touches[0].pageX + getSliderWidth(_this), (function(d) {
              return _this.setRangeEndValue(Math.max(_this.rangeStartValue, d));
            }), (function() {
              return _this.rangeEndValue;
            }), _this.slider2, 2, 'range-end');
          };
        })(this));
        this.render(this, this.slider2.node(), this.rangeStartValue, false, false);
    }
    this.offsetX = 0;
    this.mouseDown = false;
    hx.select(document).on('pointermove', (function(_this) {
      return function(e) {
        var event, slidableWidth, x;
        event = e.event;
        if (_this.mouseDown) {
          x = e.x + _this.offsetX;
          slidableWidth = _this.selectedWidth();
          _this.selectedSetValue(x / slidableWidth);
          _this.emit('slide', {
            value: _this.getValue()
          });
          return event.preventDefault();
        }
      };
    })(this), true);
    hx.select(document).on('pointerup', (function(_this) {
      return function(e) {
        if (_this.mouseDown) {
          _this.mouseDown = false;
          return _this.emit('slideend', {
            value: _this.getValue()
          });
        }
      };
    })(this), true);
    sliderRefresh(this);
  }

  Slider.prototype.setValue = function(value) {
    var slidableWidth;
    if (this.type === 'slider') {
      this.value = hx.clampUnit(value);
      slidableWidth = this.container.width() - getSliderWidth(this);
      setValueWithPrecomputedWidth(this, this.slider, this.value, slidableWidth);
    }
    return this;
  };

  Slider.prototype.getValue = function() {
    return this.value;
  };

  Slider.prototype.setRangeStartValue = function(value) {
    var slidableWidth, sliderWidth;
    if (this.type === 'range') {
      this.rangeStartValue = hx.clampUnit(value);
      sliderWidth = getSliderWidth(this);
      slidableWidth = this.container.width() - sliderWidth * 2;
      setValueWithPrecomputedWidth(this, this.slider1, this.rangeStartValue, slidableWidth, 0, true);
      this.range.style('left', (slidableWidth * this.rangeStartValue + sliderWidth) + 'px');
      this.range.style('width', (slidableWidth * (this.rangeEndValue - this.rangeStartValue)) + 'px');
    }
    return this;
  };

  Slider.prototype.setRangeEndValue = function(value) {
    var slidableWidth, sliderWidth;
    if (this.type === 'range') {
      this.rangeEndValue = hx.clampUnit(value);
      sliderWidth = getSliderWidth(this);
      slidableWidth = this.container.width() - sliderWidth * 2;
      setValueWithPrecomputedWidth(this, this.slider2, this.rangeEndValue, slidableWidth, sliderWidth, false);
      this.range.style('width', (slidableWidth * (this.rangeEndValue - this.rangeStartValue)) + 'px');
    }
    return this;
  };

  Slider.prototype.getRangeStartValue = function() {
    return this.rangeStartValue;
  };

  Slider.prototype.getRangeEndValue = function() {
    return this.rangeEndValue;
  };

  return Slider;

})(hx.EventEmitter);

hx.Slider = Slider;

})();

// autocomplete
(function(){
var AutoComplete, buildAutoComplete, findTerm, showAutoComplete,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

findTerm = function(term, forceMatch) {
  var allData, data, dataMatches, filteredData, heading, matches, remainingResults, self, _;
  self = this;
  _ = this._;
  if (_.prevTerm == null) {
    _.prevTerm = '';
  }
  allData = _.data.get(term);
  if (term.length >= _.prevTerm.length) {
    if (allData == null) {
      allData = _.data.get(_.prevTerm);
    }
  }
  if (allData == null) {
    allData = _.data.get('');
  }
  _.prevTerm = term;
  filteredData = this.options.matchType === 'external' ? allData : term.length === 0 && !this.options.showAll ? [] : this.options.filter(allData, term);
  dataMatches = allData.length === filteredData.length && allData.length > 0;
  if (this.options.showOtherResults && !forceMatch && !dataMatches) {
    matches = filteredData.length > 0 ? filteredData : [
      {
        unselectable: true,
        text: self.options.noResultsMessage
      }
    ];
    heading = [
      {
        unselectable: true,
        heading: true,
        text: self.options.otherResultsMessage
      }
    ];
    remainingResults = heading.concat(filteredData.length === 0 ? allData : (data = allData.filter(function(d) {
      if (filteredData.some(function(e) {
        return e === d;
      })) {
        return false;
      } else {
        return true;
      }
    }), (this.options.filterOptions.sort == null) || this.options.filterOptions.sort ? this.options.inputMap != null ? data = data.sort(function(a, b) {
      a = self.options.inputMap(a);
      b = self.options.inputMap(b);
      return hx.sort.compare(a, b);
    }) : data = data.sort(hx.sort.compare) : void 0, data));
    filteredData = matches.concat(remainingResults);
  }
  return filteredData;
};

buildAutoComplete = function(searchTerm, fromCallback, loading) {
  var filteredData, message, self, _;
  self = this;
  _ = this._;
  if ((_.callback != null) && !fromCallback) {
    if (searchTerm.length < this.options.minLength || (!this.options.showAll && searchTerm.length === 0)) {
      _.data.set(searchTerm, []);
      buildAutoComplete.call(self, searchTerm, true);
    } else {
      buildAutoComplete.call(self, searchTerm, true, true);
      _.currentSearch = searchTerm;
      if (!_.data.get(searchTerm)) {
        _.data.set(searchTerm, true);
        _.callback.call(self, searchTerm, function(returnData) {
          if (!_.cleanUp) {
            _.data.set(searchTerm, returnData);
            if (_.currentSearch === searchTerm) {
              return buildAutoComplete.call(self, searchTerm, true);
            }
          }
        });
      } else {
        buildAutoComplete.call(self, searchTerm, true);
      }
    }
  } else {
    _.menu.cursorPos = -1;
    filteredData = !loading ? this.options.matchType === 'external' ? _.data.get(searchTerm) : findTerm.call(self, searchTerm) : void 0;
    message = {
      unselectable: true,
      text: ''
    };
    _.menu.clearItems();
    if (filteredData == null) {
      message.text = 'Loading...';
    } else if (searchTerm.length < this.options.minLength) {
      message.text = "Please enter " + this.options.minLength + " or more characters";
    } else if ((searchTerm.length > 0 || this.options.showAll) && filteredData.length === 0) {
      if (this.options.noResultsMessage.length > 0 && (this.options.noResultsMessage != null)) {
        message.text = this.options.noResultsMessage;
      }
    } else if (searchTerm.length >= this.options.minLength && filteredData.length > 0) {
      _.menu.addItems(filteredData);
    }
    if (message.text.length > 0) {
      _.menu.addItem(message);
    }
    if (_.menu.items.length > 0) {
      if (_.menu.dropdown.isOpen()) {
        _.menu.dropdown.dropdownContent(_.menu.dropdown.dropdown.node());
      } else {
        _.menu.dropdown.show();
      }
    } else {
      _.menu.hide();
    }
  }
  return void 0;
};

showAutoComplete = function() {
  this._.cleanUp = false;
  return buildAutoComplete.call(this, this._.input.value() || '');
};

AutoComplete = (function(_super) {
  __extends(AutoComplete, _super);

  function AutoComplete(selector, data, options) {
    var defaults, input, menu, self, timeout, _, _base, _base1, _base2, _filterOpts;
    this.selector = selector;
    this.data = data;
    this.options = options != null ? options : {};
    AutoComplete.__super__.constructor.apply(this, arguments);
    this._ = _ = {};
    _.ignoreMatch = false;
    _.ignoreNextFocus = false;
    self = this;
    defaults = {
      minLength: 0,
      showAll: true,
      mustMatch: false,
      inputMap: void 0,
      renderer: void 0,
      matchType: 'contains',
      placeholder: void 0,
      filter: void 0,
      filterOptions: void 0,
      showOtherResults: false,
      allowTabCompletion: true,
      noResultsMessage: 'No results found',
      otherResultsMessage: 'Other Results'
    };
    _.data = new hx.Map();
    if (hx.isFunction(this.data)) {
      _.callback = this.data;
    } else {
      _.data.set('', this.data);
    }
    if (!hx.isArray(this.data) && !hx.isFunction(this.data)) {
      hx.consoleWarning('AutoComplete - ', this.selector, ': data set incorrectly - you supplied: ', this.data, ' but should have been an array of items or a function');
    } else {
      this.options = hx.merge(true, defaults, this.options);
      if (this.options.inputMap != null) {
        _filterOpts = {
          searchValues: function(d) {
            return [self.options.inputMap(d)];
          }
        };
      }
      this.options.filterOptions = hx.merge({}, _filterOpts, this.options.filterOptions);
      if ((_base = this.options).filter == null) {
        _base.filter = function(arr, term) {
          return hx.filter[self.options.matchType](arr, term, self.options.filterOptions);
        };
      }
      if ((_base1 = this.options).renderer == null) {
        _base1.renderer = this.options.inputMap != null ? function(elem, item) {
          return hx.select(elem).text(self.options.inputMap(item));
        } : function(elem, item) {
          return hx.select(elem).text(item);
        };
      }
      if ((_base2 = this.options).placeholder == null) {
        _base2.placeholder = this.options.minLength > 0 ? "Min length " + this.options.minLength + " characters" : void 0;
      }
      input = hx.select(this.selector);
      menu = new hx.Menu(this.selector, 'down', '', 'hx-autocomplete-dropdown');
      menu.on('input', function(e) {
        if (self.options.allowTabCompletion) {
          if ((e.which || e.keyCode) === 9) {
            return e.preventDefault();
          }
        }
      });
      menu.pipe(this, void 0, ['keydown']);
      _.setInputValue = this.options.inputMap != null ? function(d) {
        input.value(self.options.inputMap(d));
        if (!_.suppressEvents) {
          return self.emit('change', d);
        }
      } : function(d) {
        input.value(d);
        if (!_.suppressEvents) {
          return self.emit('change', d);
        }
      };
      if (this.options.placeholder != null) {
        input.attr('placeholder', this.options.placeholder);
      }
      input.on('focus', function(e) {
        if (!_.ignoreNextFocus) {
          _.cleanUp = false;
          return self.show();
        }
      }, true);
      input.on('blur', function(e) {
        if (e.relatedTarget != null) {
          self.hide();
        }
        return _.ignoreNextFocus = false;
      }, true);
      timeout = void 0;
      input.on('input', function() {
        _.cleanUp = false;
        clearTimeout(timeout);
        _.initialValue = input.value();
        return timeout = setTimeout(function() {
          if (input.value() !== _.prevTerm) {
            return buildAutoComplete.call(self, input.value() || '');
          }
        }, 200);
      });
      menu.renderer = function(elem, item) {
        var selection;
        selection = hx.select(elem);
        selection.style('font-weight', '');
        if (item.unselectable || item.heading) {
          selection.text(item.text).on('click', function() {
            return void 0;
          });
          if (item.heading) {
            return selection.style('font-weight', '600');
          }
        } else {
          return self.options.renderer(elem, item);
        }
      };
      menu.on('select', function(d) {
        var content, _ref;
        content = d != null ? (_ref = d.content) != null ? _ref.content : void 0 : void 0;
        if (content != null) {
          if (!(content != null ? content.unselectable : void 0) && !(content != null ? content.heading : void 0) && !(content != null ? content.disabled : void 0)) {
            if (d.type === 'tab') {
              if (self.options.allowTabCompletion) {
                _.setInputValue(content);
                _.ignoreMatch = true;
                self.hide();
                return self.emit('select', content);
              }
            } else if ((_.initialValue == null) && d.index > -1) {
              return _.initialValue = input.value();
            } else if (d.index === -1 && (_.initialValue != null)) {
              return input.value(_.initialValue);
            } else {
              _.setInputValue(content);
              if (d.type === 'click' || d.type === 'enter') {
                _.ignoreMatch = true;
                self.hide();
                self.emit('select', content);
                return _.ignoreNextFocus = true;
              }
            }
          }
        } else if (d.type === 'enter') {
          _.ignoreMatch = false;
          self.hide();
          if (input.value().length > 0) {
            self.emit('select', input.value());
          }
          return _.ignoreNextFocus = true;
        }
      });
      menu.on('show', function() {
        _.initialValue = input.value();
        return menu.dropdown.useScroll = true;
      });
      menu.on('hide', function() {
        var exactMatch;
        _.cleanUp = true;
        if (!_.ignoreMatch) {
          if (self.options.mustMatch) {
            if (input.value().length > 0) {
              exactMatch = self.options.matchType === 'external' ? _.data.get(input.value()) : findTerm.call(self, input.value(), true);
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
        if (!_.suppressEvents) {
          self.emit('hide', input.value());
        }
        _.suppressEvents = false;
        return void 0;
      });
      menu.on('click', function() {
        return _.ignoreMatch = true;
      }, true);
      _.menu = menu;
      _.input = input;
    }
    this;
  }

  AutoComplete.prototype.clearCache = function() {
    this._.data = new hx.Map();
    if ((this.data != null) && !hx.isFunction(this.data)) {
      this._.data.set('', this.data);
    }
    return this;
  };

  AutoComplete.prototype.show = function() {
    this._.ignoreNextFocus = false;
    showAutoComplete.call(this);
    return this;
  };

  AutoComplete.prototype.hide = function(suppressEvents) {
    var _;
    if (suppressEvents == null) {
      suppressEvents = false;
    }
    _ = this._;
    _.suppressEvents = suppressEvents;
    _.ignoreNextFocus = false;
    if (_.menu.dropdown.isOpen()) {
      _.menu.hide();
      _.prevTerm = void 0;
      _.cleanUp = true;
    }
    return this;
  };

  return AutoComplete;

})(hx.EventEmitter);

hx.AutoComplete = AutoComplete;

})();

// color-picker
(function(){
var ColorPicker, Position,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Position = (function() {
  function Position(x, y) {
    this.x = x;
    this.y = y;
  }

  Position.prototype.add = function(val) {
    var newPos;
    newPos = new Position(this.x, this.y);
    if (val !== null) {
      if (!isNaN(val.x)) {
        newPos.x += val.x;
      }
      if (!isNaN(val.y)) {
        newPos.y += val.y;
      }
    }
    return newPos;
  };

  Position.prototype.subtract = function(val) {
    var newPos;
    newPos = new Position(this.x, this.y);
    if (val !== null) {
      if (!isNaN(val.x)) {
        newPos.x -= val.x;
      }
      if (!isNaN(val.y)) {
        newPos.y -= val.y;
      }
    }
    return newPos;
  };

  Position.prototype.min = function(val) {
    var newPos;
    newPos = new Position(this.x, this.y);
    if (val !== null) {
      if (!isNaN(val.x) && this.x > val.x) {
        newPos.x = val.x;
      }
      if (!isNaN(val.y) && this.y > val.y) {
        newPos.y = val.y;
      }
    }
    return newPos;
  };

  Position.prototype.max = function(val) {
    var newPos;
    newPos = new Position(this.x, this.y);
    if (val !== null) {
      if (!isNaN(val.x) && this.x < val.x) {
        newPos.x = val.x;
      }
      if (!isNaN(val.y) && this.y < val.y) {
        newPos.y = val.y;
      }
    }
    return newPos;
  };

  Position.prototype.bound = function(min, max) {
    var newPos;
    newPos = this.max(min);
    return newPos.min(max);
  };

  Position.prototype.check = function() {
    var newPos;
    newPos = new Position(this.x, this.y);
    if (isNaN(newPos.x)) {
      newPos.x = 0;
    }
    if (isNaN(newPos.y)) {
      newPos.y = 0;
    }
    return newPos;
  };

  Position.prototype.apply = function(elem) {
    if (!isNaN(this.x)) {
      elem.style('left', this.x + 'px');
    }
    if (!isNaN(this.y)) {
      return elem.style('top', this.y + 'px');
    }
  };

  return Position;

})();

ColorPicker = (function(_super) {
  __extends(ColorPicker, _super);

  function ColorPicker(selector, startColor, showInputs, align) {
    var buildDropdown;
    if (startColor == null) {
      startColor = '#000';
    }
    this.showInputs = showInputs != null ? showInputs : 0;
    if (align == null) {
      align = 'lblt';
    }
    ColorPicker.__super__.constructor.apply(this, arguments);
    if (typeof startColor === 'string') {
      this.currentColor = hx.color(startColor);
    } else {
      this.currentColor = startColor;
    }
    buildDropdown = (function(_this) {
      return function(elem) {
        var absoluteCursorPosition, blueBoxChanged, blueInput, cancelEvent, circleDown, circleDragObject, circleHeight, circleMoved, circleOffset, circlePicker, circlemax, circlemin, colorChanged, correctOffset, dragObject, endMovement, getEventTarget, getMousePos, greenBoxChanged, greenInput, grid, gridSize, hexBoxChanged, hexInput, hueBoxChanged, hueInput, inputHTML, lightnessBoxChanged, lightnessInput, picker, pickerHTML, pointerOffset, quickColorBox, randomID, redBoxChanged, redInput, saturationBoxChanged, saturationInput, slider, sliderDown, sliderDragObject, sliderHeight, sliderMoved, sliderOffset, sliderPicker, slidermax, slidermin, staticColorBox;
        cancelEvent = function(e) {
          e = e ? e : window.event;
          if (e.stopPropogation) {
            e.stopPropogation();
          }
          if (e.preventDefault) {
            e.preventDefault();
          }
          e.cancelBubble = e.cancel = true;
          e.returnValue = false;
          return false;
        };
        correctOffset = function(pos, offset, neg) {
          if (neg) {
            return pos.subtract(offset);
          } else {
            return pos.add(offset);
          }
        };
        getMousePos = function(e) {
          var pos, touches;
          e = e ? e : window.event;
          if (isNaN(e.layerX) && e.offsetX) {
            pos = new Position(e.offsetX, e.offsetY);
          } else if (touches = e.touches || e.targetTouches) {
            elem = hx.select(touches[0].target).box();
            pos = new Position(touches[0].pageX - elem.left - window.scrollX, touches[0].pageY - elem.top - window.scrollY);
          } else {
            pos = new Position(e.layerX, e.layerY);
          }
          return correctOffset(pos, pointerOffset, true);
        };
        absoluteCursorPosition = function(e) {
          var touches;
          e = e ? e : window.event;
          if (isNaN(window.scrollX) && e.clientX) {
            return new Position(e.clientX + document.documentElement.scrollLeft + document.body.scrollLeft, e.clientY + document.documentElement.scrollTop + document.body.scrollTop);
          } else if (touches = e.touches || e.targetTouches) {
            return new Position(touches[0].clientX + window.scrollX, touches[0].clientY + window.scrollY);
          } else {
            return new Position(e.clientX + window.scrollX, e.clientY + window.scrollY);
          }
        };
        getEventTarget = function(e) {
          e = e ? e : window.event;
          if (e.target) {
            return e.target;
          } else {
            return e.srcElement;
          }
        };
        endMovement = function() {
          if (_this.showInputs) {
            staticColorBox.style('background', _this.currentColor.toString());
          }
          return _this.emit('changeend', _this.currentColor);
        };
        colorChanged = function(source) {
          var gridBG, pos;
          if (_this.showInputs) {
            hexInput.value(_this.currentColor.toString().toUpperCase());
            redInput.value(_this.currentColor.r);
            greenInput.value(_this.currentColor.g);
            blueInput.value(_this.currentColor.b);
            hueInput.value(Math.round(_this.currentColor.h * 360));
            saturationInput.value(Math.round(_this.currentColor.s * 100));
            lightnessInput.value(Math.round(_this.currentColor.l * 100));
            quickColorBox.style('background', _this.currentColor.toString());
          }
          if (source === 'slider' || source === 'box') {
            gridBG = hx.color().setHSL([_this.currentColor.h, 1, 0.5]);
            grid.style('background-color', gridBG.toString());
          }
          if (source === 'box') {
            sliderPicker.style('top', (gridSize - (_this.currentColor.h * gridSize) - sliderOffset.y) + 'px');
            pos = new Position(_this.currentColor.s * gridSize, (1 - _this.currentColor.l) * gridSize);
            pos = correctOffset(pos, circleOffset, true);
            pos.apply(circlePicker);
            endMovement();
          }
          return _this.emit('change', _this.currentColor);
        };
        hexBoxChanged = function(e) {
          if (hx.color.isColorString(hexInput.value())) {
            _this.currentColor = hx.color(hexInput.value());
            return colorChanged('box');
          }
        };
        redBoxChanged = function(e) {
          _this.currentColor.setRGB([parseInt(redInput.value()) || 0, _this.currentColor.g, _this.currentColor.b]);
          return colorChanged('box');
        };
        greenBoxChanged = function(e) {
          _this.currentColor.setRGB([_this.currentColor.r, parseInt(greenInput.value()) || 0, _this.currentColor.b]);
          return colorChanged('box');
        };
        blueBoxChanged = function(e) {
          _this.currentColor.setRGB([_this.currentColor.r, _this.currentColor.g, parseInt(blueInput.value()) || 0]);
          return colorChanged('box');
        };
        hueBoxChanged = function(e) {
          _this.currentColor.setHSL([parseFloat(hueInput.value()) || 0, _this.currentColor.s, _this.currentColor.l]);
          return colorChanged('box');
        };
        saturationBoxChanged = function(e) {
          _this.currentColor.setHSL([_this.currentColor.h, (parseFloat(saturationInput.value()) / 100.0) || 0, _this.currentColor.l]);
          return colorChanged('box');
        };
        lightnessBoxChanged = function(e) {
          _this.currentColor.setHSL([_this.currentColor.h, _this.currentColor.s, (parseFloat(lightnessInput.value()) / 100.0) || 0]);
          return colorChanged('box');
        };
        sliderMoved = function(pos, elem) {
          pos = correctOffset(pos, sliderOffset, false);
          _this.currentColor.setHSL([(gridSize - pos.y) / gridSize, _this.currentColor.s, _this.currentColor.l]);
          return colorChanged('slider');
        };
        circleMoved = function(pos, elem) {
          pos = correctOffset(pos, circleOffset, false);
          _this.currentColor.setHSL([_this.currentColor.h, pos.x / gridSize, 1 - pos.y / gridSize]);
          return colorChanged('circle');
        };
        sliderDown = function(e, elem) {
          var pos;
          pos = getMousePos(e);
          if (getEventTarget(e) === elem.node()) {
            pos.y += parseInt(elem.style('top'));
          }
          pos = correctOffset(pos, sliderOffset, true);
          pos = pos.bound(slidermin, slidermax);
          pos.apply(elem);
          return sliderMoved(pos);
        };
        circleDown = function(e, elem) {
          var pos;
          pos = getMousePos(e);
          if (getEventTarget(e) === elem.node()) {
            pos.x += parseInt(elem.style('left'));
            pos.y += parseInt(elem.style('top'));
          }
          pos = correctOffset(pos, circleOffset, true);
          pos = pos.bound(circlemin, circlemax);
          pos.apply(elem);
          return circleMoved(pos);
        };
        dragObject = function(elem, parent, min, max, startCallback, moveCallback, endCallback) {
          var StartListening, StopListening, cursorStartPos, disposed, dragGo, dragStart, dragStop, dragStopHook, dragging, elementStartPos, listening, temp;
          cursorStartPos = elementStartPos = dragging = listening = disposed = null;
          if (min !== null && max !== null) {
            temp = min.min(max);
            max = min.max(max);
            min = temp;
          }
          dragStart = function(e) {
            if (dragging || !listening || disposed) {
              return;
            }
            dragging = true;
            if (startCallback !== null) {
              startCallback(e, elem);
            }
            cursorStartPos = absoluteCursorPosition(e);
            elementStartPos = new Position(parseInt(elem.style('left')), parseInt(elem.style('top')));
            elementStartPos = elementStartPos.check();
            hx.select(document).on('touchmove', dragGo);
            hx.select(document).on('touchend', dragStopHook);
            hx.select(document).on('mousemove', dragGo);
            return hx.select(document).on('mouseup', dragStopHook);
          };
          dragGo = function(e) {
            var newPos;
            if (!dragging || disposed) {
              return;
            }
            newPos = absoluteCursorPosition(e);
            newPos = newPos.add(elementStartPos).subtract(cursorStartPos);
            newPos = newPos.bound(min, max);
            newPos.apply(elem);
            if (moveCallback !== null) {
              moveCallback(newPos, elem);
            }
            return cancelEvent(e);
          };
          dragStopHook = function(e) {
            dragStop();
            return cancelEvent(e);
          };
          dragStop = function() {
            if (!dragging || disposed) {
              return true;
            }
            hx.select(document).off('touchmove', dragGo);
            hx.select(document).off('touchend', dragStopHook);
            hx.select(document).off('mousemove', dragGo);
            hx.select(document).off('mouseup', dragStopHook);
            cursorStartPos = elementStartPos = null;
            if (endCallback !== null) {
              endCallback(elem);
            }
            return dragging = false;
          };
          ({
            dispose: function() {
              if (disposed) {
                return;
              }
              this.StopListening(true);
              elem = parent = min = max = startCallback = moveCallback = endCallback = null;
              return disposed = true;
            }
          });
          StartListening = function() {
            if (listening || disposed) {
              return;
            }
            listening = true;
            parent.on('touchstart', dragStart);
            return parent.on('mousedown', dragStart);
          };
          StopListening = function() {
            if (!listening || disposed) {
              return;
            }
            parent.deregister('touchstart', dragStart);
            parent.deregister('mousedown', dragStart);
            if (stopCurrentDragging && dragging) {
              return dragStop();
            }
          };
          return StartListening();
        };
        randomID = Math.round(Math.random() * 99999);
        inputHTML = _this.showInputs ? "<div id='hx-colorpicker-inputs_" + randomID + "' class='hx-colorpicker-inputs'>\n  <div class='hx-colorpicker-input-group'>\n    <div id='hx-colorpicker-quickColor_" + randomID + "' class='hx-colorpicker-quickColor'></div><div id='hx-colorpicker-staticColor_" + randomID + "' class='hx-colorpicker-quickColor'></div>\n  </div>\n  <div class='hx-colorpicker-input'><label for='hex'>Hex:</label><input name='hex' id='hx-colorpicker-input-hex_" + randomID + "' type='text' size='7' maxlength='7' /></div>\n  <div class='hx-colorpicker-input-group'>\n    <div class='hx-colorpicker-input'><label for='red'>R:</label><input name='red' id='hx-colorpicker-input-red_" + randomID + "' type='text' size='7' maxlength='3' /></div>\n    <div class='hx-colorpicker-input'><label for='green'>G:</label><input name='green' id='hx-colorpicker-input-green_" + randomID + "' type='text' size='7' maxlength='3' /></div>\n    <div class='hx-colorpicker-input'><label for='blue'>B:</label><input name='blue' id='hx-colorpicker-input-blue_" + randomID + "' type='text' size='7' maxlength='3' /></div>\n  </div>\n  <div class='hx-colorpicker-input-group'>\n    <div class='hx-colorpicker-input'><label for='hue'>H:</label><input name='hue' id='hx-colorpicker-input-hue_" + randomID + "' type='text' size='7' maxlength='3' /></div>\n    <div class='hx-colorpicker-input'><label for='saturation'>S:</label><input name='saturation' id='hx-colorpicker-input-saturation_" + randomID + "' type='text' size='7' maxlength='3' /></div>\n    <div class='hx-colorpicker-input'><label for='lightness'>L:</label><input name='lightness' id='hx-colorpicker-input-lightness_" + randomID + "' type='text' size='7' maxlength='3' /></div>\n  </div>\n</div>" : '';
        pickerHTML = "<div id='hx-colorpicker_" + randomID + "' class='hx-colorpicker'>\n  <div class='hx-colorpicker-inner'>\n    <div class='hx-colorpicker-fields'>\n      <div id='hx-colorpicker-grid_" + randomID + "' class='hx-colorpicker-grid'>\n        <div id='hx-colorpicker-circlePicker_" + randomID + "' class='hx-colorpicker-picker'></div>\n      </div>\n      <div id='hx-colorpicker-slider_" + randomID + "' class='hx-colorpicker-slider'>\n        <div id='hx-colorpicker-sliderPicker_" + randomID + "' class='hx-colorpicker-picker'></div>\n      </div>\n    </div>\n    " + inputHTML + "\n  </div>\n</div>";
        if (typeof selector === 'string') {
          selector = hx.select(selector);
        }
        picker = hx.select(elem).html(pickerHTML);
        grid = hx.select('#hx-colorpicker-grid_' + randomID);
        slider = hx.select('#hx-colorpicker-slider_' + randomID);
        sliderPicker = hx.select('#hx-colorpicker-sliderPicker_' + randomID);
        circlePicker = hx.select('#hx-colorpicker-circlePicker_' + randomID);
        if (_this.showInputs) {
          hexInput = hx.select('#hx-colorpicker-input-hex_' + randomID);
          redInput = hx.select('#hx-colorpicker-input-red_' + randomID);
          greenInput = hx.select('#hx-colorpicker-input-green_' + randomID);
          blueInput = hx.select('#hx-colorpicker-input-blue_' + randomID);
          hueInput = hx.select('#hx-colorpicker-input-hue_' + randomID);
          saturationInput = hx.select('#hx-colorpicker-input-saturation_' + randomID);
          lightnessInput = hx.select('#hx-colorpicker-input-lightness_' + randomID);
          quickColorBox = hx.select('#hx-colorpicker-quickColor_' + randomID);
          staticColorBox = hx.select('#hx-colorpicker-staticColor_' + randomID);
          hexInput.on('change', hexBoxChanged);
          redInput.on('change', redBoxChanged);
          greenInput.on('change', greenBoxChanged);
          blueInput.on('change', blueBoxChanged);
          hueInput.on('change', hueBoxChanged);
          saturationInput.on('change', saturationBoxChanged);
          lightnessInput.on('change', lightnessBoxChanged);
          quickColorBox.style('background', _this.currentColor.toString());
          staticColorBox.style('background', _this.currentColor.toString());
        }
        sliderHeight = sliderPicker.node().offsetHeight;
        circleHeight = circlePicker.node().offsetHeight;
        gridSize = grid.node().offsetHeight - 2;
        slidermin = new Position(0, -sliderHeight / 2);
        slidermax = new Position(0, gridSize - sliderHeight / 2);
        circlemin = new Position(-(circleHeight / 2), -(circleHeight / 2));
        circlemax = new Position(gridSize - (circleHeight / 2), gridSize - (circleHeight / 2));
        pointerOffset = new Position((navigator.userAgent.indexOf('Firefox') >= 0 ? 1 : 0), (navigator.userAgent.indexOf('Firefox') >= 0 ? 1 : 0));
        circleOffset = new Position(circleHeight / 2, circleHeight / 2);
        sliderOffset = new Position(0, sliderHeight / 2);
        sliderDragObject = circleDragObject = '';
        sliderDragObject = new dragObject(sliderPicker, slider, slidermin, slidermax, sliderDown, sliderMoved, endMovement);
        circleDragObject = new dragObject(circlePicker, grid, circlemin, circlemax, circleDown, circleMoved, endMovement);
        return colorChanged('box');
      };
    })(this);
    new hx.Dropdown(selector, buildDropdown, 'click', align);
    this;
  }

  return ColorPicker;

})(hx.EventEmitter);

hx.ColorPicker = ColorPicker;

})();

// color-scale
(function(){
var ColorScale;

ColorScale = (function() {
  var setFactor;

  setFactor = function(dMin, dMax, rMin, rMax) {
    var den;
    den = dMax - dMin;
    if (den !== 0) {
      return (rMax - rMin) / den;
    } else {
      return 1;
    }
  };

  function ColorScale(domainMin, domainMax, rangeArr) {
    this.domainMin = domainMin != null ? domainMin : 0;
    this.domainMax = domainMax != null ? domainMax : 10;
    this.rangeArr = rangeArr;
    this.rangeArr = this.rangeArr.sort(function(a, b) {
      return a.val - b.val;
    });
    this.rangeMin = this.rangeArr[0].val;
    this.rangeMax = this.rangeArr[this.rangeArr.length - 1].val;
    this.factor = setFactor(this.domainMin, this.domainMax, this.rangeMin, this.rangeMax);
    this;
  }

  ColorScale.prototype.apply = function(v) {
    var col, i, m, mDiff, percentage, point, pointDiff, _i, _ref;
    m = this.rangeMin + (v - this.domainMin) * this.factor;
    switch (false) {
      case !(m < this.rangeMin):
        col = this.rangeArr[0].color;
        break;
      case !(m > this.rangeMax):
        col = this.rangeArr[this.rangeArr.length - 1].color;
        break;
      default:
        for (i = _i = 0, _ref = this.rangeArr.length - 1; _i < _ref; i = _i += 1) {
          if ((m >= this.rangeArr[i].val) && (m <= this.rangeArr[i + 1].val)) {
            point = i + 1;
            break;
          }
        }
        mDiff = m - this.rangeArr[point - 1].val;
        pointDiff = this.rangeArr[point].val - this.rangeArr[point - 1].val;
        percentage = hx.clamp(0, 1, mDiff / pointDiff);
        col = hx.color(this.rangeArr[point - 1].color).mix(hx.color(this.rangeArr[point].color), percentage);
    }
    return col.toString();
  };

  ColorScale.prototype.domain = function(start, end) {
    this.domainMin = start;
    this.domainMax = end;
    this.factor = setFactor(this.domainMin, this.domainMax, this.rangeMin, this.rangeMax);
    return this;
  };

  ColorScale.prototype.range = function(range) {
    this.rangeArr = range;
    this.factor = setFactor(this.domainMin, this.domainMax, this.rangeMin, this.rangeMax);
    return this;
  };

  return ColorScale;

})();

hx.ColorScale = ColorScale;

})();

// crumbtrail
(function(){
var Crumbtrail;

Crumbtrail = (function() {
  function Crumbtrail(selector) {
    this.selector = selector;
  }

  Crumbtrail.prototype.render = function(data, renderer, separator) {
    var enter, preppedData, update, view;
    if (separator == null) {
      separator = '/';
    }
    enter = function(d, i) {
      if (i % 2 === 0) {
        return this.append('span')["class"]('hx-crumbtrail-node').node();
      } else {
        return this.append('span')["class"]('hx-crumbtrail-separator').html(separator).node();
      }
    };
    update = function(d, element, i) {
      if (i % 2 === 0) {
        return renderer(element, d);
      }
    };
    preppedData = hx.flatten(data.map(function(d) {
      return [d, 0];
    })).slice(0, -1);
    return view = hx.select(this.selector).view('span').enter(enter).update(update).apply(preppedData);
  };

  return Crumbtrail;

})();

hx.Crumbtrail = Crumbtrail;

})();

// dashboard
(function(){
var Dashboard, DashboardWidget;

Dashboard = (function() {
  function Dashboard(selector) {
    this.selection = hx.select(selector).classed('hx-layout', true).classed('hx-group', true).classed('hx-horizontal', true).classed('hx-no-margin', true);
  }

  Dashboard.prototype.createWidget = function(options) {
    return new DashboardWidget(this.selection.append('div').node(), options);
  };

  return Dashboard;

})();

DashboardWidget = (function() {
  function DashboardWidget(selector, options) {
    var heading, self;
    self = this;
    this.selection = hx.select(selector);
    this.selection["class"]('hx-widget hx-group hx-vertical').style('flex-basis', (options.width || 500) + 'px');
    heading = this.selection.append('div')["class"]('hx-widget-heading hx-section hx-fixed');
    heading.append('span').text(options.title);
    this.menuButton = heading.append('button')["class"]('hx-btn hx-btn-invisible');
    this.menuButton.append('i')["class"]('fa fa-bars');
    this.body = this.selection.append('div')["class"]('hx-widget-body-wrapper hx-section').append('div')["class"]('hx-widget-body');
    this.menu = new hx.Menu(this.menuButton.node(), 'rbrt');
    this.menu.renderer = function(element, d) {
      var it;
      it = hx.select(element).classed('hx-widget-menu-item', true);
      it.append('i')["class"]('fa ' + d.icon);
      return it.append('span').text(d.name);
    };
    this.showMenu(options.showMenu);
  }

  DashboardWidget.prototype.remove = function() {
    return this.selection.style('max-width', this.selection.style('width')).morph()["with"]('fadeout').thenStyle('max-width', '0px').andStyle('height', '0px').then((function(_this) {
      return function() {
        return _this.selection.remove();
      };
    })(this)).go();
  };

  DashboardWidget.prototype.title = function(title) {
    return this.selection.select('.hx-widget-heading').select('span').text(title);
  };

  DashboardWidget.prototype.showMenu = function(visible) {
    return this.menuButton.style('display', visible ? '' : 'none');
  };

  return DashboardWidget;

})();

hx.Dashboard = Dashboard;

})();

// date-time-picker
(function(){
var DateTimePicker,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DateTimePicker = (function(_super) {
  __extends(DateTimePicker, _super);

  function DateTimePicker(selector, type, showSeconds) {
    var dtNode, tpNode;
    this.selector = selector;
    this.type = type;
    this.showSeconds = showSeconds;
    DateTimePicker.__super__.constructor.apply(this, arguments);
    this.supressCallback = false;
    this.selection = hx.select(this.selector).classed('hx-date-time-picker', true);
    dtNode = this.selection.append('div').node();
    tpNode = this.selection.append('div').node();
    this.datePicker = new hx.DatePicker(dtNode, this.type);
    this.timePicker = new hx.TimePicker(tpNode, this.showSeconds);
    this.datePicker.on('change', (function(_this) {
      return function() {
        _this.timePicker.setDate(_this.datePicker.getDate(), false, true);
        if (!_this.supressCallback) {
          _this.emit('change', _this.getDate());
        }
        return _this.supressCallback = false;
      };
    })(this));
    this.timePicker.on('change', (function(_this) {
      return function() {
        _this.datePicker.setDate(_this.getDate(), false, true);
        if (!_this.supressCallback) {
          _this.emit('change', _this.getDate());
        }
        return _this.supressCallback = false;
      };
    })(this));
  }

  DateTimePicker.prototype.getDate = function() {
    return this.timePicker.getDate();
  };

  DateTimePicker.prototype.getHour = function() {
    return this.timePicker.getHour();
  };

  DateTimePicker.prototype.getMinute = function() {
    return this.timePicker.getMinute();
  };

  DateTimePicker.prototype.getSecond = function() {
    return this.timePicker.getSecond();
  };

  DateTimePicker.prototype.getScreenDate = function() {
    return this.datePicker.getScreenDate();
  };

  DateTimePicker.prototype.getScreenTime = function() {
    return this.timePicker.getScreenTime();
  };

  DateTimePicker.prototype.setDate = function(date, setTime, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this.timePicker.setDate(date, setTime);
  };

  DateTimePicker.prototype.setDay = function(day, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this.datePicker.setDay(day);
  };

  DateTimePicker.prototype.setMonth = function(month, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this.datePicker.setMonth(month);
  };

  DateTimePicker.prototype.setYear = function(year, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this.datePicker.setYear(year);
  };

  DateTimePicker.prototype.setHour = function(hour, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this.timePicker.setHour(hour);
  };

  DateTimePicker.prototype.setMinute = function(minute, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this.timePicker.setMinute(minute);
  };

  DateTimePicker.prototype.setSecond = function(second, supressCallback) {
    this.supressCallback = supressCallback != null ? supressCallback : false;
    return this.timePicker.setSecond(second);
  };

  DateTimePicker.prototype.addDays = function(days) {
    return this.datePicker.addDays(days);
  };

  DateTimePicker.prototype.addMonths = function(months) {
    return this.datePicker.addMonths(months);
  };

  DateTimePicker.prototype.addYears = function(years) {
    return this.datePicker.addYears(years);
  };

  DateTimePicker.prototype.addHours = function(hours) {
    return this.timePicker.addHours(hours);
  };

  DateTimePicker.prototype.addMinutes = function(minutes) {
    return this.timePicker.addMinutes(minutes);
  };

  DateTimePicker.prototype.addSeconds = function(seconds) {
    return this.timePicker.addSeconds(seconds);
  };

  DateTimePicker.prototype.update = function() {
    var _base, _base1;
    if (typeof (_base = this.timePicker).update === "function") {
      _base.update();
    }
    return typeof (_base1 = this.datePicker).update === "function" ? _base1.update() : void 0;
  };

  return DateTimePicker;

})(hx.EventEmitter);

hx.DateTimePicker = DateTimePicker;

})();

// drawing
(function(){
var Camera, Circle, ColorProperty, Composite, DiscreteProperty, Drawing, DrawingColor, DrawingObject, Grid, Layer, Line, NumberProperty, PerformanceGauge, Point, Rectangle, Shape, StringProperty, Text, horizontalLineIntersection, lineIntersection, pointRectangleIntersection, verticalLineIntersection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

pointRectangleIntersection = function(x, y, x1, y1, x2, y2) {
  return x1 <= x && x <= x2 && y1 <= y && y <= y2;
};

lineIntersection = function(x1, y1, x2, y2, x3, y3, x4, y4) {
  var s, sx1, sx2, sy1, sy2, t;
  sx1 = x2 - x1;
  sy1 = y2 - y1;
  sx2 = x4 - x3;
  sy2 = y4 - y3;
  s = (-sy1 * (x1 - x3) + sx1 * (y1 - y3)) / (-sx2 * sy1 + sx1 * sy2);
  t = (sx2 * (y1 - y3) - sy2 * (x1 - x3)) / (-sx2 * sy1 + sx1 * sy2);
  return s >= 0 && s <= 1 && t >= 0 && t <= 1;
};

horizontalLineIntersection = function(x1, y1, x2, y2, xh1, xh2, y) {
  var ix;
  if (y1 === y2) {
    return y === y1 && (((xh1 <= x1 && x1 <= xh2)) || ((xh1 <= x2 && x2 <= xh2)) || (x1 < xh1 && x2 > xh2));
  } else {
    ix = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
    return xh1 <= ix && ix <= xh2;
  }
};

verticalLineIntersection = function(x1, y1, x2, y2, yv1, yv2, x) {
  var iy;
  if (x1 === x2) {
    return x === x1 && (((yv1 <= y1 && y1 <= yv2)) || ((yv1 <= y2 && y2 <= yv2)) || (y1 < yv1 && y2 > yv2));
  } else {
    iy = y1 + (x - x1) * (y2 - y1) / (x2 - x1);
    return yv1 <= iy && iy <= yv2;
  }
};

DrawingColor = (function() {
  function DrawingColor() {
    this.c = hx.color();
  }

  DrawingColor.prototype.set = function(name, value) {
    switch (name) {
      case 'color':
        return this.c = hx.color(value);
      case 'color.red':
        return this.c.r = hx.clamp(0, 255, value);
      case 'color.green':
        return this.c.g = hx.clamp(0, 255, value);
      case 'color.blue':
        return this.c.b = hx.clamp(0, 255, value);
      case 'color.alpha':
        return this.c.a = hx.clampUnit(value);
    }
  };

  return DrawingColor;

})();

DrawingObject = (function() {
  function DrawingObject(id) {
    this.id = id != null ? id : hx.randomId();
    this.attr = new hx.Map;
    this.properties = new hx.Map;
    this.selectable = this.addDiscreteProperty('selectable');
    this.selected = false;
  }

  DrawingObject.prototype.addDiscreteProperty = function(name, initial) {
    var prop;
    if (initial == null) {
      initial = false;
    }
    prop = new DiscreteProperty(initial);
    this.properties.set(name, prop);
    return prop;
  };

  DrawingObject.prototype.addNumberProperty = function(name, initial) {
    var prop;
    if (initial == null) {
      initial = 0;
    }
    prop = new NumberProperty(initial);
    this.properties.set(name, prop);
    return prop;
  };

  DrawingObject.prototype.addColorProperty = function(name, initial) {
    var prop;
    if (initial == null) {
      initial = '#FFF';
    }
    prop = new ColorProperty(initial);
    this.properties.set(name, prop);
    return prop;
  };

  DrawingObject.prototype.addStringProperty = function(name, initial) {
    var prop;
    if (initial == null) {
      initial = '';
    }
    prop = new StringProperty(initial);
    this.properties.set(name, prop);
    return prop;
  };

  DrawingObject.prototype.set = function(name, value, duration, callback) {
    if (this.properties.has(name)) {
      this.properties.get(name).set(value, duration, callback);
    } else if (hx.startsWith(name, 'attr.')) {
      this.attr.set(name.substring(5), value);
    } else {
      console.warn('unknown property: ', name, Error().stack);
    }
    return this;
  };

  DrawingObject.prototype.get = function(name) {
    if (this.properties.has(name)) {
      return this.properties.get(name).value;
    } else if (hx.startsWith(name, 'attr.')) {
      return this.attr.get(name.substring(5));
    } else {
      return void 0;
    }
  };

  DrawingObject.prototype.drawBoundingBox = function(ctx, drawing) {
    var bb, padding;
    bb = this.getBoundingBox(ctx);
    if (bb) {
      drawing.setStrokeColor(hx.color('rgba(64, 64, 64, 1)'));
      padding = 2;
      drawing.setStrokeWidth(Math.min(1, 0.95 / drawing.camera.actualZoom));
      ctx.strokeRect(bb[0] - padding, bb[1] - padding, bb[2] - bb[0] + padding * 2, bb[3] - bb[1] + padding * 2);
      drawing.setFillColor(hx.color('rgba(128, 128, 128, 0.1)'));
      return ctx.fillRect(bb[0] - padding, bb[1] - padding, bb[2] - bb[0] + padding * 2, bb[3] - bb[1] + padding * 2);
    }
  };

  DrawingObject.prototype.pointInBoundingBox = function(p, ctx) {
    var bb;
    bb = this.getBoundingBox(ctx);
    return pointRectangleIntersection(p.x, p.y, bb[0], bb[1], bb[2], bb[3]);
  };

  return DrawingObject;

})();

ColorProperty = (function() {
  function ColorProperty(initial) {
    this.value = hx.color();
    if (hx.defined(initial)) {
      this.set(initial);
    }
  }

  ColorProperty.prototype.set = function(value, duration, callback) {
    var c, cb, ea, eb, eg, er, sa, sb, sg, sr, update;
    if (hx.defined(this.stop)) {
      this.stop();
      this.stop = void 0;
    }
    if (hx.defined(duration)) {
      sr = this.value.r;
      sg = this.value.g;
      sb = this.value.b;
      sa = this.value.a;
      c = hx.color(value);
      er = c.r;
      eg = c.g;
      eb = c.b;
      ea = c.a;
      cb = callback ? (function(_this) {
        return function(cancelled) {
          _this.stop = void 0;
          return callback(!cancelled, _this.value);
        };
      })(this) : void 0;
      update = (function(_this) {
        return function(x, cancelled) {
          if (!cancelled) {
            _this.value.r = sr + (er - sr) * x;
            _this.value.g = sg + (eg - sg) * x;
            _this.value.b = sb + (eb - sb) * x;
            return _this.value.a = sa + (ea - sa) * x;
          }
        };
      })(this);
      return this.stop = hx.transition(duration, update, hx.ease.linear, cb);
    } else {
      return this.value = hx.color(value);
    }
  };

  return ColorProperty;

})();

NumberProperty = (function() {
  function NumberProperty(value) {
    this.value = value;
    this.stop = void 0;
  }

  NumberProperty.prototype.set = function(value, duration, callback) {
    var cb, start, update;
    if (hx.defined(this.stop)) {
      this.stop();
      this.stop = void 0;
    }
    if (hx.defined(duration)) {
      start = this.value;
      cb = callback ? (function(_this) {
        return function(cancelled) {
          _this.stop = void 0;
          return callback(!cancelled, _this.value);
        };
      })(this) : void 0;
      update = (function(_this) {
        return function(x, cancelled) {
          if (!cancelled) {
            return _this.value = start + (value - start) * x;
          }
        };
      })(this);
      return this.stop = hx.transition(duration, update, hx.ease.linear, cb);
    } else {
      return this.value = value;
    }
  };

  return NumberProperty;

})();

StringProperty = (function() {
  function StringProperty(value) {
    this.value = value;
    this.stop = void 0;
  }

  StringProperty.prototype.set = function(value, duration, callback) {
    var cb, interpolater, update;
    if (hx.defined(this.stop)) {
      this.stop();
      this.stop = void 0;
    }
    if (hx.defined(duration)) {
      interpolater = hx.interpolate(this.value, value);
      cb = callback ? (function(_this) {
        return function(cancelled) {
          _this.stop = void 0;
          return callback(!cancelled, _this.value);
        };
      })(this) : void 0;
      update = (function(_this) {
        return function(x, cancelled) {
          if (!cancelled) {
            return _this.value = interpolater(x);
          }
        };
      })(this);
      return this.stop = hx.transition(duration, update, hx.ease.linear);
    } else {
      return this.value = value;
    }
  };

  return StringProperty;

})();

DiscreteProperty = (function() {
  function DiscreteProperty(value) {
    this.value = value;
  }

  DiscreteProperty.prototype.set = function(value) {
    return this.value = value;
  };

  return DiscreteProperty;

})();

Point = (function() {
  function Point(x, y) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
  }

  Point.prototype.set = function(point) {
    this.x = point.x;
    return this.y = point.y;
  };

  Point.prototype.tweenTo = function(point, mixAmount) {
    this.x += (point.x - this.x) * mixAmount;
    return this.y += (point.y - this.y) * mixAmount;
  };

  Point.prototype.distanceTo = function(point) {
    return Math.sqrt((this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y));
  };

  Point.prototype.distanceToSquared = function(point) {
    return (this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y);
  };

  return Point;

})();

Camera = (function(_super) {
  var onClick, onLongPress, onMouseDown, onMouseMove, onMouseUp, onMouseWheel, onTouchEnd, onTouchMove, onTouchStart, onTranslate, setZoom;

  __extends(Camera, _super);

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
    var delta, deltaTranformed, mx, my, wx, wy;
    if (this.zoomEnabled) {
      e.preventDefault();
      e.stopPropagation();
      if (e.wheelDelta != null) {
        delta = e.wheelDelta;
      } else if (e.detail != null) {
        delta = -e.detail;
      }
      deltaTranformed = Math.min(0.99, Math.abs(delta / 120 * 0.2));
      if (e.ctrlKey) {
        deltaTranformed /= 5;
      }
      mx = e.clientX;
      my = e.clientY;
      wx = this.getWorldX(mx);
      wy = this.getWorldY(my);
      return setZoom.call(this, delta > 0 ? this.zoom / (1 - deltaTranformed) : this.zoom * (1 - deltaTranformed));
    }
  };

  onTouchStart = function(e, state) {
    var changed, didLongPress, i, x, y, _i, _ref;
    e.preventDefault();
    this.mouseDown = true;
    changed = e.changedTouches;
    if (changed.length > 0) {
      for (i = _i = 0, _ref = changed.length - 1; _i <= _ref; i = _i += 1) {
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
      return state.longPressTimer = setTimeout((function(_this) {
        return function() {
          onLongPress.call(_this, state.touchStart.x - state.selection.box().left, state.touchStart.y - state.selection.box().top);
          return didLongPress = true;
        };
      })(this), state.longPressTime);
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
    var changed, didLongPress, i, x, y, _i, _ref;
    if (!this.mouseDown) {
      return;
    }
    e.preventDefault();
    changed = e.changedTouches;
    if (changed.length > 0) {
      for (i = _i = 0, _ref = changed.length - 1; _i <= _ref; i = _i += 1) {
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

  function Camera(drawing) {
    var mouseControlState;
    this.drawing = drawing;
    Camera.__super__.constructor.apply(this, arguments);
    this.position = new Point;
    this.zoom = 1;
    this.actualPosition = new Point;
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
      selection: hx.select(this.drawing.canvasNode),
      positionLast: new Point,
      touchStart: new Point,
      mouseDown: false,
      moveThreshold: 5 * this.drawing.dpr,
      longPressTime: 1000,
      longPressTimer: null,
      didLongPress: false
    };
    hx.select(document).on('mousemove', ((function(_this) {
      return function(e) {
        return onMouseMove.call(_this, e, mouseControlState);
      };
    })(this)), true);
    hx.select(document).on('mouseup', ((function(_this) {
      return function(e) {
        return onMouseUp.call(_this, e, mouseControlState);
      };
    })(this)), true);
    mouseControlState.selection.on('mousedown', (function(_this) {
      return function(e) {
        return onMouseDown.call(_this, e, mouseControlState);
      };
    })(this));
    mouseControlState.selection.on('mousewheel', (function(_this) {
      return function(e) {
        return onMouseWheel.call(_this, e, mouseControlState);
      };
    })(this));
    mouseControlState.selection.on('DOMMouseScroll', (function(_this) {
      return function(e) {
        return onMouseWheel.call(_this, e, mouseControlState);
      };
    })(this));
    hx.select(document).on('touchstart', ((function(_this) {
      return function(e) {
        return onTouchStart.call(_this, e, mouseControlState);
      };
    })(this)), true);
    mouseControlState.selection.on('touchmove', (function(_this) {
      return function(e) {
        return onTouchMove.call(_this, e, mouseControlState);
      };
    })(this));
    hx.select(document).on('touchend', ((function(_this) {
      return function(e) {
        return onTouchEnd.call(_this, e, mouseControlState);
      };
    })(this)), true);
    mouseControlState.selection.on('touchcancel', (function(_this) {
      return function(e) {
        return onTouchEnd.call(_this, e, mouseControlState);
      };
    })(this));
  }

  Camera.prototype.setupBounds = function(zoomMin, zoomMax, xMin, yMin, xMax, yMax) {
    this.zoomMin = zoomMin;
    this.zoomMax = zoomMax;
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    return this.yMax = yMax;
  };

  Camera.prototype.clearTransform = function(ctx) {
    return ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  Camera.prototype.applyTransform = function(ctx) {
    ctx.translate(this.drawing.width / 2, this.drawing.height / 2);
    ctx.scale(this.actualZoom, this.actualZoom);
    return ctx.translate(-this.actualPosition.x, -this.actualPosition.y);
  };

  Camera.prototype.update = function() {
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
      if (this.actualPosition.distanceTo(this.position) < 1) {
        this.smoothToNextTargetPosition = false;
      }
    } else {
      this.actualPosition.set(this.position);
    }
    if (this.smoothZoom) {
      return this.actualZoom = hexagon.tween(this.actualZoom, this.zoom, this.zoomSmoothingFactor);
    } else {
      return this.actualZoom = this.zoom;
    }
  };

  Camera.prototype.getWorldRect = function() {
    return [this.actualPosition.x - this.drawing.width / (2 * this.actualZoom), this.actualPosition.y - this.drawing.height / (2 * this.actualZoom), this.actualPosition.x + this.drawing.width / (2 * this.actualZoom), this.actualPosition.y + this.drawing.height / (2 * this.actualZoom)];
  };

  Camera.prototype.getWorldX = function(x) {
    return (x * this.drawing.dpr - this.drawing.width / 2) / this.actualZoom + this.actualPosition.x;
  };

  Camera.prototype.getWorldY = function(y) {
    return (y * this.drawing.dpr - this.drawing.height / 2) / this.actualZoom + this.actualPosition.y;
  };

  Camera.prototype.screenPointToWorldPoint = function(p) {
    var result;
    return result = {
      x: (p.x * this.drawing.dpr - this.drawing.width / 2) / this.actualZoom + this.actualPosition.x,
      y: (p.y * this.drawing.dpr - this.drawing.height / 2) / this.actualZoom + this.actualPosition.y
    };
  };

  Camera.prototype.worldPointToScreenPoint = function(p) {
    var result;
    return result = {
      x: (p.x * this.drawing.dpr - this.actualPosition.x) * this.actualZoom + this.drawing.width / 2,
      y: (p.y * this.drawing.dpr - this.actualPosition.y) * this.actualZoom + this.drawing.height / 2
    };
  };

  Camera.prototype.calculateZoomForBoundingBox = function(bb, zoomOut) {
    return Math.min(this.drawing.width / ((bb[2] - bb[0]) * zoomOut), this.drawing.height / ((bb[3] - bb[1]) * zoomOut));
  };

  Camera.prototype.follow = function(object, zoomOut, continuallyEvaluateZoom) {
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

  Camera.prototype.stopFollowing = function() {
    this.mode = null;
    return this.followObject = null;
  };

  Camera.prototype.show = function(object, zoomOut) {
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

})(hx.EventEmitter);

Drawing = (function(_super) {
  var drawingLoop;

  __extends(Drawing, _super);

  drawingLoop = function() {
    var run;
    run = false;
    hx.loop((function(_this) {
      return function() {
        var layer, _i, _len, _ref;
        if (_this.stats) {
          _this.stats.start();
        }
        _this.camera.clearTransform(_this.ctx);
        _this.ctx.clearRect(0, 0, _this.width, _this.height);
        _this.camera.update();
        _this.camera.applyTransform(_this.ctx);
        _ref = _this.layers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          layer = _ref[_i];
          layer.render(_this.ctx);
        }
        if (_this.stats) {
          _this.camera.clearTransform(_this.ctx);
          _this.stats.end();
          _this.stats.update();
          _this.stats.render();
        }
        _this.emit('update', _this.frame);
        _this.frame++;
        return run;
      };
    })(this));
    return function() {
      return run = true;
    };
  };

  function Drawing(selector, autoStart) {
    var container, containerHeight, containerWidth;
    if (autoStart == null) {
      autoStart = true;
    }
    Drawing.__super__.constructor.apply(this, arguments);
    container = hx.select(selector);
    container.classed('hx-drawing', true);
    this.canvas = container.append('canvas');
    this.overlay = container.append('div');
    containerWidth = container.node().clientWidth;
    containerHeight = container.node().clientHeight;
    this.dpr = window.devicePixelRatio != null ? window.devicePixelRatio : 1;
    this.canvas.prop('width', containerWidth * this.dpr);
    this.canvas.prop('height', containerHeight * this.dpr);
    this.canvas.style('width', containerWidth + "px");
    this.canvas.style('height', containerHeight + "px");
    this.canvas.style('position', 'relative');
    this.width = containerWidth * this.dpr;
    this.height = containerHeight * this.dpr;
    this.canvasNode = this.canvas.node();
    this.ctx = this.canvasNode.getContext('2d');
    this.overlay["class"]("hx-drawing-overlay");
    this.overlay.style('width', containerWidth + "px");
    this.overlay.style('height', containerHeight + "px");
    this.defaultLayer = new Layer(this);
    this.layers = [this.defaultLayer];
    this.camera = new Camera(this);
    this.camera.pipe(this);
    this.globalAlpha = 1;
    this.state = {
      height: containerWidth,
      width: containerHeight
    };
    this.stats = null;
    this.selectedObjects = new hx.List;
    this.frame = 0;
    if (autoStart) {
      this.resume();
    }
  }

  Drawing.prototype.resume = function() {
    if (!this.stopFunc) {
      return this.stopFunc = drawingLoop.call(this);
    }
  };

  Drawing.prototype.stop = function() {
    if (this.stopFunc) {
      this.stopFunc();
      return this.stopFunc = void 0;
    }
  };

  Drawing.prototype.find = function(id) {
    var layer, res, _i, _len, _ref;
    _ref = this.layers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      layer = _ref[_i];
      res = layer.find(id);
      if (res) {
        return res;
      }
    }
  };

  Drawing.prototype.findBy = function(ind) {
    var layer, res, _i, _len, _ref;
    _ref = this.layers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      layer = _ref[_i];
      res = layer.findBy(ind);
      if (res) {
        return res;
      }
    }
  };

  Drawing.prototype.createLayer = function() {
    var layer;
    layer = new Layer(this);
    this.layers.push(layer);
    return layer;
  };

  Drawing.prototype.showLayer = function(layer) {
    var l, _i, _len, _ref, _results;
    _ref = this.layers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      l = _ref[_i];
      _results.push(l.visible = l === layer);
    }
    return _results;
  };

  Drawing.prototype.follow = function(obj, zoomOut, continuallyEvaluateZoom) {
    if (zoomOut == null) {
      zoomOut = 1;
    }
    if (continuallyEvaluateZoom == null) {
      continuallyEvaluateZoom = false;
    }
    return this.camera.follow(obj, zoomOut, continuallyEvaluateZoom);
  };

  Drawing.prototype.stopFollowing = function() {
    return this.camera.stopFollowing;
  };

  Drawing.prototype.show = function(obj, zoomOut) {
    if (zoomOut == null) {
      zoomOut = 1;
    }
    return this.camera.show(obj, zoomOut);
  };

  Drawing.prototype.enablePan = function() {
    return this.camera.panEnabled = true;
  };

  Drawing.prototype.enableZoom = function() {
    return this.camera.zoomEnabled = true;
  };

  Drawing.prototype.enableSelection = function() {
    return this.camera.selectionEnabled = true;
  };

  Drawing.prototype.enablePerformanceGauge = function() {
    return this.stats = new PerformanceGauge(this);
  };

  Drawing.prototype.enableSearchbox = function() {
    var input;
    this.searchbox = this.overlay.append('div').classed('hx-drawing-searchbox', true);
    input = this.searchbox.append('input').attr('placeholder', 'Search');
    return input.on('keypress', (function(_this) {
      return function(e) {
        if (e.which === 13) {
          return _this.emit('search', input.prop('value'));
        }
      };
    })(this));
  };

  Drawing.prototype.create = function(objectType, id) {
    return this.defaultLayer.create(objectType, id);
  };

  Drawing.prototype["delete"] = function(obj) {
    var layer, _i, _len, _ref, _results;
    _ref = this.layers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      layer = _ref[_i];
      _results.push(layer["delete"](obj));
    }
    return _results;
  };

  Drawing.prototype.deleteAll = function() {
    var layer, _i, _len, _ref;
    _ref = this.layers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      layer = _ref[_i];
      layer.deleteAll();
    }
    return void 0;
  };

  Drawing.prototype.setGlobalAlpha = function(alpha) {
    return this.globalAlpha = alpha;
  };

  Drawing.prototype.setFillColor = function(color) {
    var a, b, g, r;
    r = color.r;
    g = color.g;
    b = color.b;
    a = color.a * this.globalAlpha;
    return this.ctx.fillStyle = "rgba(" + (Math.floor(r)) + "," + (Math.floor(g)) + "," + (Math.floor(b)) + "," + a + ")";
  };

  Drawing.prototype.setStrokeColor = function(color) {
    var a, b, g, r;
    r = color.r;
    g = color.g;
    b = color.b;
    a = color.a * this.globalAlpha;
    return this.ctx.strokeStyle = "rgba(" + (Math.floor(r)) + "," + (Math.floor(g)) + "," + (Math.floor(b)) + "," + a + ")";
  };

  Drawing.prototype.setStrokeWidth = function(width) {
    return this.ctx.lineWidth = width;
  };

  Drawing.prototype.setStrokeCap = function(style) {
    return this.ctx.lineCap = style;
  };

  Drawing.prototype.getBoundingBox = function() {
    var bb, i, result, _i, _ref;
    if (this.layers.length > 0) {
      result = this.layers[0].getBoundingBox(this.ctx);
      if (this.layers.length > 1) {
        for (i = _i = 1, _ref = this.layers.length - 1; _i <= _ref; i = _i += 1) {
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

  Drawing.prototype.select = function(drawingObject, append) {
    var obj, _i, _len, _ref;
    if (append == null) {
      append = false;
    }
    if (append) {
      this.selectedObjects.add(drawingObject);
    } else {
      _ref = this.selectedObjects.values();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        if (obj !== drawingObject) {
          obj.selected = false;
          this.emit('unselect', obj);
        }
      }
      this.selectedObjects = new hx.List([drawingObject]);
    }
    drawingObject.selected = true;
    return this.emit('select', drawingObject);
  };

  Drawing.prototype.unselect = function(drawingObject) {
    if (this.selectedObjects.remove(drawingObject)) {
      drawingObject.selected = false;
      return this.emit('unselect', drawingObject);
    }
  };

  Drawing.prototype.unselectAll = function() {
    var obj, _i, _len, _ref;
    _ref = this.selectedObjects.values();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obj = _ref[_i];
      obj.selected = false;
      this.emit('unselect', obj);
    }
    return this.selectedObjects.clear();
  };

  Drawing.prototype.selected = function() {
    return this.selectedObjects.values();
  };

  return Drawing;

})(hx.EventEmitter);

hx.Drawing = Drawing;

Layer = (function() {
  var ramp, triangle;

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

  function Layer(drawing) {
    this.drawing = drawing;
    this.objects = [];
    this.visible = true;
    this.alpha = 1;
    this.alphaCurveFunction = null;
  }

  Layer.prototype.render = function() {
    var object, _i, _len, _ref, _results;
    if (this.alphaCurveFunction) {
      this.alpha = hx.clampUnit(this.alphaCurveFunction(this.drawing.camera.actualZoom));
      this.visible = this.alpha > 0.01;
    }
    if (this.visible) {
      this.drawing.setGlobalAlpha(this.alpha);
      _ref = this.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        _results.push(object.render(this.drawing.ctx, this.drawing, 0, 0));
      }
      return _results;
    }
  };

  Layer.prototype.create = function(objectType, id) {
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

  Layer.prototype["delete"] = function(obj) {
    var id;
    id = this.objects.indexOf(obj);
    if (id !== -1) {
      return this.objects.splice(id, 1);
    }
  };

  Layer.prototype.deleteAll = function() {
    this.objects = [];
    return void 0;
  };

  Layer.prototype.find = function(id) {
    var object, _i, _len, _ref;
    _ref = this.objects;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      object = _ref[_i];
      if (object.id === id) {
        return object;
      }
    }
  };

  Layer.prototype.findBy = function(ind) {
    var object, _i, _len, _ref;
    _ref = this.objects;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      object = _ref[_i];
      if (ind(object)) {
        return object;
      }
    }
  };

  Layer.prototype.getBoundingBox = function() {
    var bb, i, result, _i, _ref;
    if (this.objects.length > 0) {
      result = this.objects[0].getBoundingBox(this.drawing.ctx);
      if (this.objects.length > 1) {
        for (i = _i = 1, _ref = this.objects.length - 1; _i <= _ref; i = _i += 1) {
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

  Layer.prototype.setAlphaCurve = function(type, start, end) {
    return this.alphaCurveFunction = (function() {
      switch (type) {
        case 'triangle':
          return triangle(start, end);
        case 'ramp':
          return ramp(start, end);
      }
    })();
  };

  return Layer;

})();

PerformanceGauge = (function() {
  function PerformanceGauge(drawing) {
    this.drawing = drawing;
    this.position = new Point(3, 3);
    this.fps = void 0;
    this.ms = void 0;
    this.lastEnd = void 0;
    this.frameStart = void 0;
    this.frameEnd = void 0;
  }

  PerformanceGauge.prototype.start = function() {
    return this.frameStart = (new Date()).getTime();
  };

  PerformanceGauge.prototype.end = function() {
    this.lastEnd = this.frameEnd;
    return this.frameEnd = (new Date()).getTime();
  };

  PerformanceGauge.prototype.update = function() {
    var thisFrameFps, thisFrameMs;
    thisFrameFps = 1000 / (this.frameEnd - this.lastEnd);
    if (!isNaN(thisFrameFps)) {
      if (this.fps) {
        this.fps = hx.tween(this.fps, thisFrameFps, 0.05);
      } else {
        this.fps = thisFrameFps;
      }
    }
    thisFrameMs = this.frameEnd - this.frameStart;
    if (this.ms) {
      return this.ms = hx.tween(this.ms, thisFrameMs, 0.05);
    } else {
      return this.ms = thisFrameMs;
    }
  };

  PerformanceGauge.prototype.render = function() {
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

})();

Circle = (function(_super) {
  __extends(Circle, _super);

  function Circle() {
    Circle.__super__.constructor.apply(this, arguments);
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

  Circle.prototype.render = function(ctx, drawing, cullOffsetX, cullOffsetY) {
    var clip;
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

  Circle.prototype.getBoundingBox = function() {
    return [this.position.x.value - this.radius.value, this.position.y.value - this.radius.value, this.position.x.value + this.radius.value, this.position.y.value + this.radius.value];
  };

  return Circle;

})(DrawingObject);

Composite = (function(_super) {
  __extends(Composite, _super);

  function Composite() {
    Composite.__super__.constructor.apply(this, arguments);
    this.position = {
      x: this.addNumberProperty('position.x'),
      y: this.addNumberProperty('position.y')
    };
    this.angle = this.addNumberProperty('angle');
    this.scale = this.addNumberProperty('scale', 1);
    this.objectList = new hx.List;
    this.objectMap = new hx.Map;
  }

  Composite.prototype.set = function(name, value, duration, callback) {
    var components, obj, objectName, property;
    if (this.properties.has(name) || hx.startsWith(name, 'attr.')) {
      Composite.__super__.set.call(this, name, value, duration, callback);
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

  Composite.prototype.get = function(name) {
    var components, obj, objectName, property;
    if (this.properties.has(name) || hx.startsWith(name, 'attr.')) {
      return Composite.__super__.get.call(this, name);
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

  Composite.prototype.create = function(objectType, name) {
    var object;
    object = (function() {
      switch (objectType) {
        case 'circle':
          return new Circle;
        case 'rectangle':
          return new Rectangle;
        case 'line':
          return new Line;
        case 'grid':
          return new Grid;
        case 'text':
          return new Text;
        case 'shape':
          return new Shape;
        case 'composite':
          return new Composite;
      }
    })();
    if (object) {
      this.objectList.add(object);
      this.objectMap.set(name, object);
    }
    return this;
  };

  Composite.prototype["delete"] = function(name) {
    this.objectList["delete"](object);
    return this.objectMap["delete"](name);
  };

  Composite.prototype.render = function(ctx, drawing, cullOffsetX, cullOffsetY) {
    var bb, clip, obj, _i, _len, _ref;
    if (this.objectList.size > 0) {
      bb = this.getBoundingBox(ctx);
      clip = drawing.camera.getWorldRect();
      clip[0] -= cullOffsetX;
      clip[1] -= cullOffsetY;
      clip[2] -= cullOffsetX;
      clip[3] -= cullOffsetY;
      if (!bb || bb[2] > clip[0] && bb[0] < clip[2] && bb[3] > clip[1] && bb[1] < clip[3]) {
        _ref = this.objectList.values();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          obj = _ref[_i];
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

  Composite.prototype.getBoundingBox = function(ctx) {
    var bb, i, result, _i, _ref;
    if (this.objectList.size > 0) {
      result = this.objectList.get(0).getBoundingBox(ctx);
      if (this.objectList.size > 1) {
        for (i = _i = 1, _ref = this.objectList.size - 1; _i <= _ref; i = _i += 1) {
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
      result[0] += this.position.x.value;
      result[1] += this.position.y.value;
      result[2] += this.position.x.value;
      result[3] += this.position.y.value;
      return result;
    }
  };

  return Composite;

})(DrawingObject);

Grid = (function(_super) {
  __extends(Grid, _super);

  function Grid() {
    var colorPalette, _;
    Grid.__super__.constructor.apply(this, arguments);
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
      var _i, _results;
      _results = [];
      for (_ = _i = 0; _i <= 15; _ = _i += 1) {
        _results.push(new DrawingColor(Math.random(), Math.random() / 2, 0, 0.5));
      }
      return _results;
    })();
    this.cells = {
      enabled: this.addDiscreteProperty('cells.enabled', false),
      states: this.addDiscreteProperty('cells.states', void 0),
      palette: this.addDiscreteProperty('cells.palette', colorPalette)
    };
  }

  Grid.prototype.render = function(ctx, drawing, cullOffsetX, cullOffsetY) {
    var cellColor, clip, cx, cy, endX, endY, gx, gy, px, py, rowColorMap, startX, startY, x, y, _i, _j, _k, _l, _ref, _ref1;
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    startX = Math.max(0, Math.floor((clip[0] - this.position.x.value) / this.cellSize.x.value));
    startY = Math.max(0, Math.floor((clip[1] - this.position.y.value) / this.cellSize.y.value));
    endX = Math.min(this.gridSize.x.value - 1, Math.ceil((clip[2] - this.position.x.value) / this.cellSize.x.value));
    endY = Math.min(this.gridSize.y.value - 1, Math.ceil((clip[3] - this.position.y.value) / this.cellSize.y.value));
    if (startX <= endX && startY <= endY) {
      if (this.cells.enabled.value) {
        for (y = _i = startY; _i <= endY; y = _i += 1) {
          rowColorMap = this.cells.states.value[y];
          for (x = _j = startX; _j <= endX; x = _j += 1) {
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
        for (x = _k = startX, _ref = endX + 1; _k <= _ref; x = _k += 1) {
          ctx.moveTo(px + x * cx + 0.5, py + 0.5);
          ctx.lineTo(px + x * cx + 0.5, py + cy * gy + 0.5);
        }
        for (y = _l = startY, _ref1 = endY + 1; _l <= _ref1; y = _l += 1) {
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

  Grid.prototype.getBoundingBox = function() {
    return [this.position.x.value, this.position.y.value, this.position.x.value + this.gridSize.x.value * this.cellSize.x.value, this.position.y.value + this.gridSize.y.value * this.cellSize.y.value];
  };

  return Grid;

})(DrawingObject);

Line = (function(_super) {
  __extends(Line, _super);

  function Line() {
    Line.__super__.constructor.apply(this, arguments);
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

  Line.prototype.render = function(ctx, drawing, cullOffsetX, cullOffsetY) {
    var clip, width;
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    width = this.width.value === 0 ? Math.min(1, 0.95 / drawing.camera.actualZoom) : this.width.value;
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

  Line.prototype.getBoundingBox = function() {
    return [Math.min(this.start.x.value, this.end.x.value), Math.min(this.start.y.value, this.end.y.value), Math.max(this.start.x.value, this.end.x.value), Math.max(this.start.y.value, this.end.y.value)];
  };

  return Line;

})(DrawingObject);

Rectangle = (function(_super) {
  __extends(Rectangle, _super);

  function Rectangle() {
    Rectangle.__super__.constructor.apply(this, arguments);
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

  Rectangle.prototype.render = function(ctx, drawing, cullOffsetX, cullOffsetY) {
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

  Rectangle.prototype.getBoundingBox = function() {
    return [this.position.x.value, this.position.y.value, this.position.x.value + this.width.value, this.position.y.value + this.height.value];
  };

  return Rectangle;

})(DrawingObject);

Shape = (function(_super) {
  __extends(Shape, _super);

  function Shape() {
    Shape.__super__.constructor.apply(this, arguments);
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
    this.curve = this.addDiscreteProperty('curve', []);
    this.type = '';
  }

  Shape.prototype.set = function(name, value, duration, callback) {
    if (name === 'curve') {
      this.type = 'curve';
    }
    if (name === 'polygon') {
      this.type = 'polygon';
      name = 'curve';
    }
    return Shape.__super__.set.call(this, name, value, duration, callback);
  };

  Shape.prototype.get = function(name) {
    if (name === 'polygon') {
      name = 'curve';
    }
    return Shape.__super__.get.call(this, name);
  };

  Shape.prototype.render = function(ctx, drawing, cullOffsetX, cullOffsetY) {
    var bb, clip, i, p, point, _i, _j, _len, _len1, _ref, _ref1;
    bb = this.getBoundingBox(ctx);
    clip = drawing.camera.getWorldRect();
    clip[0] -= cullOffsetX;
    clip[1] -= cullOffsetY;
    clip[2] -= cullOffsetX;
    clip[3] -= cullOffsetY;
    if (bb && bb[2] > clip[0] && bb[0] < clip[2] && bb[3] > clip[1] && bb[1] < clip[3]) {
      ctx.beginPath();
      if (this.type === 'polygon') {
        _ref = this.curve.value;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          point = _ref[i];
          if (i === 0) {
            ctx.moveTo(this.position.x.value + point[0], this.position.y.value + point[1]);
          } else {
            ctx.lineTo(this.position.x.value + point[0], this.position.y.value + point[1]);
          }
        }
      }
      if (this.type === 'curve') {
        _ref1 = this.curve.value;
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          p = _ref1[i];
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

  Shape.prototype.getBoundingBox = function() {
    var i, p, x1, x2, y1, y2, _i, _j, _len, _len1, _ref, _ref1;
    if (this.type === 'polygon') {
      x1 = x2 = this.curve.value[0][0];
      y1 = y2 = this.curve.value[0][1];
      _ref = this.curve.value;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        p = _ref[i];
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
    } else if (this.type === 'curve') {
      x1 = x2 = this.curve.value[0][0];
      y1 = y2 = this.curve.value[0][1];
      _ref1 = this.curve.value;
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        p = _ref1[i];
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

})(DrawingObject);

Text = (function(_super) {
  __extends(Text, _super);

  function Text() {
    Text.__super__.constructor.apply(this, arguments);
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

  Text.prototype.render = function(ctx, drawing, cullOffsetX, cullOffsetY) {
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
      ctx.textAlign = this.align.x.value;
      ctx.textBaseline = this.align.y.value;
      ctx.fillText(this.text.value, this.position.x.value / (this.size.value / 12), this.position.y.value / (this.size.value / 12));
      ctx.restore();
      if (this.selected) {
        return this.drawBoundingBox(ctx, drawing);
      }
    }
  };

  Text.prototype.getWidth = function(ctx) {
    if (this.textWidth === void 0) {
      ctx.font = '12px ' + this.font.value;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.textWidth = ctx.measureText(this.text.value).width;
      ctx.restore();
    }
    return this.textWidth;
  };

  Text.prototype.getBoundingBox = function(ctx) {
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

})(DrawingObject);

})();

// extended-table
(function(){
var Table, TableFeed, TableFeedModifiers,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TableFeed = (function(_super) {
  var cloneData;

  __extends(TableFeed, _super);

  function TableFeed(source, modifiers, extra) {
    var self;
    this.modifiers = modifiers;
    this.extra = extra;
    TableFeed.__super__.constructor.apply(this, arguments);
    self = this;
    this.sortedData = void 0;
    this.filteredData = void 0;
    switch (false) {
      case !hx.isFunction(source):
        this.source = source;
        break;
      case !hx.isString(source):
        this.source = function(request, callback) {
          return hx.json(source, request, function(error, result) {
            if (error) {
              callback(void 0);
              return self.emit('error', error);
            } else {
              switch (request.type) {
                case 'header':
                  return callback(result.head);
                case 'rowCount':
                  return callback(result.count);
                case 'rows':
                  return callback(result.rows, result.processedSize);
              }
            }
          });
        };
        break;
      default:
        this.source = function(request, callback) {
          switch (request.type) {
            case 'header':
              return callback(source.head);
            case 'rowCount':
              return callback(source.body.length);
            case 'rows':
              return self.getProcessedData(function(rows) {
                return callback(rows.slice(request.startRow, request.endRow), rows.length);
              });
            case 'data':
              return callback(source);
          }
        };
    }
    this.modifiers.on('sort-change', (function(_this) {
      return function(e) {
        _this.sortedData = void 0;
        return _this.emit('sort-change', e);
      };
    })(this));
    this.modifiers.on('filter-change', (function(_this) {
      return function(e) {
        _this.filteredData = void 0;
        return _this.emit('filter-change', e);
      };
    })(this));
    this.modifiers.pipe(this, void 0, ['change']);
  }

  cloneData = function(rows) {
    return rows.slice();
  };

  TableFeed.prototype.getFilteredData = function(callback) {
    if (this.filteredData === void 0) {
      this.source({
        type: 'data'
      }, (function(_this) {
        return function(data) {
          var allFilters, cellLookup, column, columnIndex, filterDataOnType, getColumnIndex, hasFilters, head, preparedFilters, rows, terms, type, _i, _len, _ref, _ref1, _results;
          rows = data.body;
          head = data.head;
          getColumnIndex = function(name) {
            var column, i, lowerCaseName, _i, _len, _ref;
            lowerCaseName = name.toLowerCase();
            _ref = head.columns;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              column = _ref[i];
              if (column.value.toLowerCase() === lowerCaseName) {
                return i;
              }
            }
            return void 0;
          };
          hasFilters = false;
          preparedFilters = {};
          for (column in _this.modifiers.filters) {
            cellLookup = _this.modifiers.cellFilterValueLookup[column] || _this.modifiers.cellValueLookup[column] || _this.modifiers.defaultCellFilterValueLookup || _this.modifiers.defaultCellValueLookup || function(d) {
              return d;
            };
            columnIndex = getColumnIndex(column);
            _ref = _this.modifiers.filters[column];
            for (type in _ref) {
              terms = _ref[type];
              if (terms !== void 0) {
                hasFilters = true;
                if (typeof terms === 'string') {
                  terms = terms.split(' ').map(function(d) {
                    return d.trim();
                  }).filter(function(d) {
                    return d;
                  });
                }
                if (preparedFilters[type] == null) {
                  preparedFilters[type] = [];
                }
                preparedFilters[type].push({
                  columnIndex: columnIndex,
                  terms: terms,
                  cellLookup: cellLookup
                });
              }
            }
          }
          if (!hasFilters) {
            return _this.filteredData = rows;
          } else {
            filterDataOnType = function(data, type) {
              var col, filter, options, term, _i, _j, _len, _len1, _ref1, _ref2;
              _ref1 = preparedFilters[type];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                filter = _ref1[_i];
                col = filter.columnIndex;
                cellLookup = filter.cellLookup;
                options = {
                  caseSensitive: false,
                  searchValues: function(row) {
                    if (row.columns) {
                      return [cellLookup(row.columns[col])];
                    } else {
                      return [cellLookup(row[col])];
                    }
                  },
                  sort: false
                };
                if (hx.isArray(terms)) {
                  _ref2 = filter.terms;
                  for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                    term = _ref2[_j];
                    data = hx.filter[type](data, term, options);
                  }
                } else {
                  data = hx.filter[type](data, terms, options);
                }
              }
              return data;
            };
            allFilters = Object.keys(hx.filter);
            _this.filteredData = cloneData(rows);
            _results = [];
            for (_i = 0, _len = allFilters.length; _i < _len; _i++) {
              type = allFilters[_i];
              if (((_ref1 = preparedFilters[type]) != null ? _ref1.length : void 0) > 0) {
                _results.push(_this.filteredData = filterDataOnType(_this.filteredData, type));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        };
      })(this));
    }
    return callback(this.filteredData);
  };

  TableFeed.prototype.getSortedData = function(callback) {
    if (this.filteredData === void 0) {
      this.sortedData = void 0;
    }
    return this.getFilteredData((function(_this) {
      return function(filteredData) {
        var cellLookup, column;
        if (_this.sortedData === void 0) {
          if (_this.modifiers.sortColumn !== void 0 && _this.modifiers.sortDirection !== void 0) {
            column = _this.modifiers.sortColumn.toLowerCase();
            cellLookup = _this.modifiers.cellSortValueLookup[column] || _this.modifiers.cellValueLookup[column] || _this.modifiers.defaultCellSortValueLookup || _this.modifiers.defaultCellValueLookup || function(d) {
              return d;
            };
            _this.getColumnIndex(_this.modifiers.sortColumn, function(columnIndex) {
              var compare, dirFactor;
              dirFactor = _this.modifiers.sortDirection ? 1 : -1;
              _this.sortedData = cloneData(filteredData);
              compare = hx.sort.localeCompare();
              return _this.sortedData.sort(function(a, b) {
                return compare(cellLookup((a.columns || a)[columnIndex]), cellLookup((b.columns || b)[columnIndex])) * dirFactor;
              });
            });
          } else {
            _this.sortedData = filteredData;
          }
        }
        return callback(_this.sortedData);
      };
    })(this));
  };

  TableFeed.prototype.getProcessedData = function(callback) {
    return this.getSortedData(callback);
  };

  TableFeed.prototype.getHeader = function(callback) {
    return this.source({
      type: 'header',
      extra: this.extra
    }, callback);
  };

  TableFeed.prototype.getRows = function(startRow, endRow, callback) {
    return this.source({
      type: 'rows',
      startRow: startRow,
      endRow: endRow,
      filters: this.modifiers.filters,
      sortColumn: this.modifiers.sortColumn,
      sortDirection: this.modifiers.sortDirection,
      extra: this.extra
    }, callback);
  };

  TableFeed.prototype.getRowCount = function(callback) {
    return this.source({
      type: 'rowCount',
      extra: this.extra
    }, callback);
  };

  TableFeed.prototype.getColumnIndex = function(name, callback) {
    return this.getHeader(function(head) {
      var column, i, lowerCaseName, _i, _len, _ref;
      lowerCaseName = name.toLowerCase();
      _ref = head.columns;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        column = _ref[i];
        if (column.value.toLowerCase() === lowerCaseName) {
          callback(i);
          return;
        }
      }
      return callback(void 0);
    });
  };

  return TableFeed;

})(hx.EventEmitter);

TableFeedModifiers = (function(_super) {
  var fixSortMode;

  __extends(TableFeedModifiers, _super);

  function TableFeedModifiers() {
    var self;
    TableFeedModifiers.__super__.constructor.apply(this, arguments);
    self = this;
    this.filters = {};
    this.sortDirection = void 0;
    this.sortColumn = void 0;
    this.defaultCellValueLookup = void 0;
    this.defaultCellFilterValueLookup = void 0;
    this.defaultCellSortValueLookup = void 0;
    this.cellValueLookup = {};
    this.cellFilterValueLookup = {};
    this.cellSortValueLookup = {};
  }

  fixSortMode = function(mode) {
    switch (mode) {
      case 'ascending':
      case 'asc':
      case true:
        return true;
      case 'descending':
      case 'desc':
      case false:
        return false;
      default:
        return void 0;
    }
  };

  TableFeedModifiers.prototype.sort = function(column, mode, cb) {
    var changed;
    mode = fixSortMode(mode);
    changed = false;
    if (arguments.length === 1) {
      this.sortDirection = (function() {
        switch (false) {
          case this.sortColumn === column:
            return true;
          case this.sortDirection !== true:
            return false;
          case this.sortDirection !== false:
            return void 0;
          default:
            return true;
        }
      }).call(this);
      this.sortColumn = column;
      changed = true;
    } else if (this.sortDirection !== mode || this.sortColumn !== column) {
      this.sortDirection = mode;
      this.sortColumn = column;
      if (this.sortColumn === void 0) {
        this.sortDirection = void 0;
      }
      changed = true;
    }
    if (changed) {
      this.emit('sort-change', {
        column: this.sortColumn,
        direction: this.sortDirection
      });
      return this.emit('change', {
        callback: cb
      });
    }
  };

  TableFeedModifiers.prototype.filter = function(column, filter, type, cb) {
    var changed, oldFilter, _base;
    if (type == null) {
      type = 'contains';
    }
    if (column !== void 0) {
      if ((_base = this.filters)[column] == null) {
        _base[column] = {};
      }
      changed = this.filters[column][type] !== filter;
      if (changed) {
        oldFilter = this.filters[column][type];
        this.filters[column][type] = filter;
        this.emit('filter-change', {
          column: column,
          type: type,
          filter: filter,
          oldFilter: oldFilter
        });
        this.emit('change', {
          callback: cb
        });
      }
    }
    return this;
  };

  TableFeedModifiers.prototype.addFilter = function(column, filter, type, cb) {
    var filt, _i, _len, _ref, _ref1;
    if (type == null) {
      type = 'contains';
    }
    _ref = filter.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      filt = _ref[_i];
      if (((_ref1 = this.filters[column]) != null ? _ref1[type] : void 0) !== void 0) {
        if (this.filters[column][type].indexOf(filt) === -1) {
          this.filter(column, this.filters[column][type] + ' ' + filt, type, cb);
        }
      } else {
        this.filter(column, filt, type, cb);
      }
    }
    return this;
  };

  TableFeedModifiers.prototype.removeFilter = function(column, filter, type, cb) {
    var filterFilters, filterType, k, v, _ref, _ref1, _ref2, _ref3;
    filterFilters = function(val) {
      var filt, newFilter, _i, _len, _ref;
      newFilter = val.split(' ').map(function(d) {
        return d.toLowerCase();
      });
      _ref = filter.split(' ').map(function(d) {
        return d.toLowerCase();
      });
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        filt = _ref[_i];
        newFilter = newFilter.filter(function(d) {
          return d !== filt;
        });
      }
      newFilter = newFilter.join(' ');
      if (newFilter === '') {
        return void 0;
      } else {
        return newFilter;
      }
    };
    if (arguments.length === 0) {
      for (k in this.filters) {
        _ref = this.filters[k];
        for (filterType in _ref) {
          v = _ref[filterType];
          this.filter(k, void 0, filterType, cb);
        }
      }
    } else if (arguments.length === 2 || type !== void 0) {
      if (type == null) {
        type = 'contains';
      }
      if (column === void 0) {
        _ref1 = this.filters;
        for (k in _ref1) {
          v = _ref1[k];
          this.filter(k, filterFilters(v[type]), type, cb);
        }
      } else if (this.filters[column] !== void 0 && this.filters[column][type]) {
        this.filter(column, filterFilters(this.filters[column][type]), type, cb);
      }
    } else {
      if (column === void 0) {
        for (k in this.filters) {
          _ref2 = this.filters[k];
          for (type in _ref2) {
            v = _ref2[type];
            this.filter(k, filterFilters(v), type, cb);
          }
        }
      } else if (this.filters[column] !== void 0) {
        _ref3 = this.filters[column];
        for (type in _ref3) {
          v = _ref3[type];
          this.filter(column, filterFilters(v), type, cb);
        }
      }
    }
    return this;
  };

  return TableFeedModifiers;

})(hx.EventEmitter);

Table = (function(_super) {
  var appendFilterDropdown, lowerCaseKeys, render, updateIcons, updateSelectedText;

  __extends(Table, _super);

  lowerCaseKeys = function(obj) {
    var k, res, v;
    res = {};
    for (k in obj) {
      if (!__hasProp.call(obj, k)) continue;
      v = obj[k];
      res[k.toLowerCase()] = v;
    }
    return res;
  };

  function Table(selector, options) {
    var _;
    if (options == null) {
      options = {};
    }
    Table.__super__.constructor.apply(this, arguments);
    this.options = hx.merge(false, {
      rowsPerPage: 100,
      showSorts: true,
      showFilters: true,
      showSelection: false,
      rowSelectable: true,
      cellRenderers: {},
      alwaysMobile: false,
      useResponsive: true,
      noDataMessage: 'No Data',
      defaultCellValueLookup: void 0,
      defaultCellFilterValueLookup: void 0,
      defaultCellSortValueLookup: void 0,
      cellValueLookup: {},
      cellFilterLookup: {},
      cellSortValueLookup: {},
      enabledFilters: ['exact', 'startsWith', 'less', 'greater', 'excludes']
    }, options);
    _ = this._ = {
      selectedRows: []
    };
    _.container = hx.select(selector).classed("hx-table-widget hx-layout hx-group hx-vertical", true);
    _.tableWrapper = _.container.append('div')["class"]('hx-section hx-table-wrapper hx-no-margin');
    _.tableMessage = _.container.append('div')["class"]('hx-section hx-table-message');
    _.rowCountMessage = hx.select(document.createElement('div'));
    _.rowCountMessage.append('span');
    _.rowCountMessage.append('a').text('(clear selection)').on('click', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.clearSelection();
      };
    })(this));
    _.paginatorContainer = _.container.append('div')["class"]('hx-section hx-table-paginator');
    this.paginator = new hx.Paginator(_.paginatorContainer.node());
    this.paginator.on('change', (function(_this) {
      return function(event) {
        if (event.cause === 'user') {
          return render(_this);
        }
      };
    })(this));
    _.modifiers = new TableFeedModifiers;
    _.modifiers.defaultCellValueLookup = this.options.defaultCellValueLookup;
    _.modifiers.defaultCellFilterValueLookup = this.options.defaultCellFilterValueLookup;
    _.modifiers.defaultCellSortValueLookup = this.options.defaultCellSortValueLookup;
    _.modifiers.cellValueLookup = lowerCaseKeys(this.options.cellValueLookup);
    _.modifiers.cellFilterValueLookup = lowerCaseKeys(this.options.cellFilterValueLookup);
    _.modifiers.cellSortValueLookup = lowerCaseKeys(this.options.cellSortValueLookup);
    _.feedChange = (function(_this) {
      return function(cb) {
        render(_this, cb);
        return _this.emit('change');
      };
    })(this);
    _.sortChange = (function(_this) {
      return function(e) {
        var icons, index, sortIcon, titles;
        if (_.rendered) {
          if (!_.useMobileView) {
            titles = _.header.columns.map(function(d) {
              return d.value.toLowerCase();
            });
            index = titles.indexOf(e.column.toLowerCase());
            if (index !== -1) {
              updateIcons(_.tableWrapper.selectAll('.hx-table-sort-icon'));
              icons = _.tableWrapper.select('.hx-table-header-sticky').selectAll('.hx-table-sort-icon');
              sortIcon = icons.node(index);
              updateIcons(hx.select(sortIcon), e.direction);
            }
          }
          _this.clearSelection();
        }
        _this.paginator.setPage(1);
        return _this.emit('sort-change', e);
      };
    })(this);
    _.filterChange = (function(_this) {
      return function(e) {
        _this.paginator.setPage(1);
        _this.clearSelection();
        return _this.emit('filter-change', e);
      };
    })(this);
  }

  Table.prototype.setData = function(source, extra, clearSorts, clearFilters, cb) {
    var _, _ref;
    _ = this._;
    if ((_ref = _.feed) != null) {
      _ref.deregisterAll();
    }
    _.modifiers.deregisterAll();
    if (clearSorts) {
      _.modifiers.sort();
    }
    if (clearFilters) {
      _.modifiers.removeFilter();
    }
    _.feed = new TableFeed(source, _.modifiers, extra);
    _.feed.on('change', function(d) {
      return _.feedChange(d.callback);
    });
    _.feed.on('sort-change', _.sortChange);
    _.feed.on('filter-change', _.filterChange);
    _.newSource = true;
    _.selectedRows = [];
    this.paginator.setPage(1);
    render(this, cb);
    return this;
  };

  Table.prototype.render = function(cb) {
    return render(this, cb);
  };

  Table.prototype.filter = function(column, filter, type, cb) {
    return this._.modifiers.filter(column, filter, type, cb);
  };

  Table.prototype.addFilter = function(column, filter, type, cb) {
    return this._.modifiers.addFilter(column, filter, type, cb);
  };

  Table.prototype.removeFilter = function(column, filter, type, cb) {
    return this._.modifiers.removeFilter(column, filter, type, cb);
  };

  Table.prototype.sort = function(column, direction, cb) {
    return this._.modifiers.sort(column, direction, cb);
  };

  Table.prototype.getSelected = function() {
    var k, _i, _len, _ref, _results;
    _ref = this._.selectedRows;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      if (k) {
        _results.push(k);
      }
    }
    return _results;
  };

  Table.prototype.clearSelection = function() {
    var _;
    _ = this._;
    _.tableWrapper.selectAll(".hx-table-row-selected").classed("hx-table-row-selected", false);
    _.selectedRows = _.selectedRows.map(function(d) {
      return false;
    });
    updateSelectedText(this);
    return this.emit('clearselection');
  };

  updateIcons = function(selection, direction) {
    return selection.classed("fa-sort-asc", direction === true).classed("fa-sort-desc", direction === false).classed("fa-unsorted", direction === void 0);
  };

  updateSelectedText = function(table) {
    var end, i, pageSelected, s, start, total, _, _i;
    _ = table._;
    total = _.selectedRows.filter(function(d) {
      return d;
    }).length;
    if (total > 0) {
      if (_.rowCount !== void 0) {
        _.rowCountMessage.select('span').text(total + ' of ' + _.rowCount + ' rows selected ');
      } else {
        s = total > 1 ? 's' : '';
        _.rowCountMessage.select('span').text(total + ' row' + s + ' selected ');
      }
      _.tableMessage.node().appendChild(_.rowCountMessage.node());
    } else {
      _.tableMessage.text('');
    }
    pageSelected = 0;
    start = _.startRowIndex;
    end = start + _.rows.length;
    for (i = _i = start; _i <= end; i = _i += 1) {
      if (_.selectedRows[i]) {
        pageSelected++;
      }
    }
    return _.tableWrapper.selectAll("thead").select("tr").classed("hx-table-row-selected", pageSelected > 0);
  };

  appendFilterDropdown = function(targetElement, clickElement, lowerCaseName, table) {
    var direction, dropdown, input, inputBox, oldValue, populateDropdown, _;
    _ = table._;
    input = {};
    inputBox = {};
    oldValue = {};
    populateDropdown = function(element) {
      var appendFilterInput, dd, filterDD, filterType, moreFilters, moreFiltersLink, moreFiltersVis, moreVisible, oldFilterObj, _i, _len, _ref, _ref1, _results;
      dd = this;
      filterDD = hx.select(element).classed('hx-table-filter-dropdown', true);
      appendFilterInput = function(elem, type) {
        var clearBtn, filterPlaceholder, timeout, typeStr, updateFilter;
        timeout = void 0;
        updateFilter = function(value) {
          oldValue[type] = input[type].value();
          return _.modifiers.filter(lowerCaseName, value, type);
        };
        if (type !== 'contains') {
          typeStr = type === 'greater' || type === 'less' ? type + ' than' : type === 'startsWith' ? 'Starts with' : type;
          typeStr = typeStr.charAt(0).toUpperCase() + typeStr.slice(1);
          filterPlaceholder = typeStr + ' filters...';
        } else {
          filterPlaceholder = 'Filters...';
        }
        inputBox[type] = elem.append('div').classed('hx-table-input-group hx-input-group', true);
        input[type] = inputBox[type].append('input').attr('placeholder', filterPlaceholder).value(oldValue[type]);
        if (type === 'regex') {
          input[type].on('input', (function(_this) {
            return function() {
              clearTimeout(timeout);
              return timeout = setTimeout(function() {
                var e, filterRegex, inputVal;
                inputVal = input[type].value();
                input[type].style('border-color', '');
                if (inputVal.length > 0) {
                  try {
                    filterRegex = new RegExp(inputVal);
                  } catch (_error) {
                    e = _error;
                  }
                  if (!e) {
                    return updateFilter(filterRegex);
                  } else {
                    return input[type].style('border-color', 'red');
                  }
                } else {
                  return updateFilter();
                }
              }, 200);
            };
          })(this));
        } else {
          input[type].on('input', function(e) {
            clearTimeout(timeout);
            return timeout = setTimeout(function() {
              return updateFilter(input[type].value());
            }, 200);
          }).on('keydown', function(e) {
            var code;
            code = (e.keyCode ? e.keyCode : e.which);
            if (code === 27) {
              updateFilter();
            }
            if (code === 13 || code === 27) {
              return dd.hide();
            }
          });
        }
        clearBtn = inputBox[type].append('button')["class"]('hx-btn hx-btn-negative');
        clearBtn.append('i')["class"]('fa fa-times');
        return clearBtn.on('click', function() {
          input[type].value('');
          updateFilter();
          if (table.options.enabledFilters.length === 0) {
            return dd.hide();
          }
        });
      };
      appendFilterInput(filterDD, 'contains');
      if (table.options.enabledFilters.length > 0) {
        moreVisible = false;
        moreFiltersVis = function(vis, dontAnimate) {
          var text;
          text = vis ? 'Less' : 'More';
          moreFiltersLink.text(text);
          if (dontAnimate) {
            moreFilters.style('display', (vis ? 'block' : 'none'));
          } else {
            moreFilters.morph()["with"]((vis ? 'expand' : 'collapse'), 150).go();
          }
          return moreVisible = vis;
        };
        moreFiltersLink = filterDD.append('div')["class"]('hx-table-more-filters-link').append('a');
        moreFilters = filterDD.append('div')["class"]('hx-table-more-filters');
        moreFiltersVis(false, true);
        moreFiltersLink.on('click', function() {
          return moreFiltersVis(moreFilters.style('display') === 'none');
        });
        oldFilterObj = _.modifiers.filters[lowerCaseName];
        _ref = table.options.enabledFilters;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          filterType = _ref[_i];
          if (filterType !== 'contains') {
            if (((_ref1 = oldValue[filterType]) != null ? _ref1.length : void 0) > 0 && moreVisible === false) {
              moreFiltersVis(true, true);
            }
            _results.push(appendFilterInput(moreFilters, filterType));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };
    direction = _.useMobileView ? 'lblt' : 'rbrt';
    dropdown = new hx.Dropdown(targetElement, populateDropdown, '', direction, 0);
    dropdown.on('show', function() {
      _.filterDropdown = dropdown;
      return input['contains'].node().focus();
    });
    return hx.select(clickElement).on('click', function(e) {
      e.stopPropagation();
      return dropdown.toggle();
    });
  };

  render = function(table, callback) {
    var displayLoading, filterEnabled, fixTableSize, getDataForPage, getHeaderData, getRowCount, headerCellEnter, maybeDestroyTable, renderDesktopPage, renderHeader, renderMobilePage, renderReponsivePage, renderResponsiveHeader, renderStickyHeader, rowCollapseableEnabled, rowSelectCellEnter, rowSelectionEnabled, rowTickSelectionEnabled, selectMultiRows, selectRow, sortEnabled, tidyUp, updatePaginator, _;
    _ = table._;
    _.modifiers.defaultCellValueLookup = table.options.defaultCellValueLookup;
    _.modifiers.defaultCellFilterValueLookup = table.options.defaultCellFilterValueLookup;
    _.modifiers.defaultCellSortValueLookup = table.options.defaultCellSortValueLookup;
    _.modifiers.cellValueLookup = lowerCaseKeys(table.options.cellValueLookup);
    _.modifiers.cellFilterValueLookup = lowerCaseKeys(table.options.cellFilterValueLookup);
    _.modifiers.cellSortValueLookup = lowerCaseKeys(table.options.cellSortValueLookup);
    _.lastRowSelected;
    _.shiftWasDown = false;
    rowTickSelectionEnabled = table.options.showSelection;
    rowCollapseableEnabled = table.options.collapsibleRow != null;
    rowSelectionEnabled = table.options.rowSelectable && rowTickSelectionEnabled && !rowCollapseableEnabled;
    sortEnabled = table.options.showSorts;
    filterEnabled = table.options.showFilters;
    if (table.options.alwaysMobile) {
      _.useMobileView = true;
    } else if (table.options.useResponsive) {
      _.useMobileView = _.container.width() < 480;
    } else {
      _.useMobileView = false;
    }
    displayLoading = function(next) {
      _.container.classed('hx-table-loading', true);
      return setTimeout(next, 0);
    };
    getHeaderData = function(next) {
      return _.feed.getHeader(function(header) {
        _.header = header;
        return next();
      });
    };
    getRowCount = function(next) {
      return _.feed.getRowCount(function(count) {
        _.rowCount = count;
        if (count === 0) {
          rowTickSelectionEnabled = false;
          rowCollapseableEnabled = false;
          rowSelectionEnabled = false;
          sortEnabled = false;
          filterEnabled = false;
        }
        return next();
      });
    };
    updatePaginator = function(next) {
      var pageCount;
      if (_.processedSize === void 0) {
        table.paginator.setPageCount(void 0);
        _.paginatorContainer.style('display', '');
      } else {
        pageCount = Math.ceil(_.processedSize / table.options.rowsPerPage);
        if (pageCount > 1) {
          table.paginator.setPageCount(pageCount);
          _.paginatorContainer.style('display', '');
        } else {
          _.paginatorContainer.style('display', 'none');
        }
      }
      return next();
    };
    getDataForPage = function(next) {
      var page, rowsPerPage;
      page = (table.paginator.getPage() - 1) || 0;
      rowsPerPage = table.options.rowsPerPage;
      return _.feed.getRows(page * rowsPerPage, (page + 1) * rowsPerPage, function(rows, processedSize) {
        _.rows = rows;
        _.processedSize = processedSize;
        return next();
      });
    };
    maybeDestroyTable = function(next) {
      var t;
      if (_.newSource) {
        _.tableWrapper.selectAll('table').remove();
        t = _.tableWrapper.append('table')["class"]('hx-table hx-table-non-sticky');
        t.append('thead').append('tr')["class"]('hx-table-header-row');
        t.append('tbody');
        t = _.tableWrapper.append('table')["class"]('hx-table hx-table-header-sticky');
        t.append('thead').append('tr')["class"]('hx-table-header-row');
      }
      return next();
    };
    rowSelectCellEnter = function(parent) {
      var cell;
      cell = parent.append('th')["class"]('hx-table-cell hx-table-selection');
      cell.append('i')["class"]('fa fa-check');
      return cell.node();
    };
    headerCellEnter = function(d, i) {
      var cell, container, left, right;
      if (i === 0 && rowTickSelectionEnabled) {
        return rowSelectCellEnter(this);
      } else {
        cell = this.append('th');
        container = cell.append('div');
        left = container.append('span')["class"]("hx-table-header-left");
        right = container.append('span')["class"]("hx-table-header-right");
        left.append('span')["class"]('hx-table-header-name');
        left.append('i')["class"]('hx-table-sort-icon fa fa-unsorted');
        right.append('i')["class"]('fa fa-search');
        return cell.node();
      }
    };
    renderHeader = function(next) {
      var colHeaderDepth, colHeaderDepthArr, headRowsData, headerData, headerGroupCellEnter, headerGroupUpdate, headerUpdate, reducedHeadRowsData, _i, _results;
      headerUpdate = function(d, e, i) {
        if (i !== 0 && rowTickSelectionEnabled || !rowTickSelectionEnabled) {
          this.select('.hx-table-header-name').text(d.value);
          this.classed('hx-table-header-sort', sortEnabled);
          return this.classed('hx-table-header-filter', filterEnabled);
        }
      };
      headerGroupCellEnter = function(d, i) {
        var cell;
        cell = this.append('th');
        cell.append('div')["class"]('hx-table-header-grouped-cell');
        return cell.node();
      };
      headerGroupUpdate = function(row, rowElem, rowIndex, max, array) {
        if (rowTickSelectionEnabled) {
          row.unshift(void 0);
        }
        hx.select(rowElem).view('th').enter(headerGroupCellEnter).update(function(cell) {
          var text;
          if (cell != null) {
            text = cell[1] ? cell[1] : rowIndex === 0 ? cell[0] : void 0;
            this.attr('colspan', cell[2]);
            this.select('.hx-table-header-grouped-cell').text(text);
          }
          return cell;
        }).apply(row);
        return rowElem;
      };
      if (_.header.columns.some(function(d) {
        return (d != null ? d.groups : void 0) != null;
      })) {
        headerData = _.header.columns;
        colHeaderDepthArr = headerData.map(function(d) {
          var _ref;
          return ((d != null ? (_ref = d.groups) != null ? _ref.length : void 0 : void 0) || 0) * 1;
        });
        colHeaderDepth = hx.max(colHeaderDepthArr);
        headRowsData = (function() {
          _results = [];
          for (var _i = 0; 0 <= colHeaderDepth ? _i < colHeaderDepth : _i > colHeaderDepth; 0 <= colHeaderDepth ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this).map(function(i) {
          return headerData.map(function(d) {
            var arr, first;
            if ((d != null ? d.groups : void 0) != null) {
              arr = d.groups.slice(0);
              first = arr[0];
              while (arr.length < colHeaderDepth) {
                arr.unshift('');
              }
              return [arr.slice(0, +i + 1 || 9e9).toString(), arr[i]];
            } else {
              return ["", ""];
            }
          });
        });
        reducedHeadRowsData = headRowsData.map(function(d) {
          var _ref, _ref1;
          return d.reduce(function(a, b) {
            if (b[0] === a[a.length - 1][0]) {
              a[a.length - 1][2] += 1;
              return a;
            } else {
              return a.concat([[b[0], b[1], 1]]);
            }
          }, [[(_ref = d[0]) != null ? _ref[0] : void 0, (_ref1 = d[0]) != null ? _ref1[1] : void 0, 0]]);
        });
        _.tableWrapper.select('table').select('thead').view('.hx-table-header-group-row', 'tr').update(function(d, e, i) {
          return headerGroupUpdate(d, e, i, colHeaderDepth, reducedHeadRowsData);
        }).apply(reducedHeadRowsData);
      }
      headerData = rowTickSelectionEnabled ? [void 0].concat(_.header.columns) : _.header.columns;
      _.tableWrapper.select('table').select('thead').select('.hx-table-header-row').view('th').enter(headerCellEnter).update(headerUpdate).apply(headerData);
      return next();
    };
    renderStickyHeader = function(next) {
      var groupHead, headerData, stickyHeader, stickyHeaderEnter, stickyHeaderUpdate;
      stickyHeaderEnter = function(d, i) {
        var element, left, right;
        element = headerCellEnter.call(this, d, i);
        if (i === 0 && rowTickSelectionEnabled) {
          hx.select(element).on("click", function(evt) {
            var rowClassed, rowSelection;
            evt.stopPropagation();
            rowSelection = hx.select(element.parentNode);
            rowClassed = rowSelection.classed("hx-table-row-selected");
            rowSelection.classed("hx-table-row-selected", !rowClassed);
            table._.lastRowSelected = void 0;
            selectMultiRows(0, table._.rows.length - 1);
            return updateSelectedText(table);
          });
        } else {
          left = hx.select(element).select('.hx-table-header-left');
          right = hx.select(element).select('.hx-table-header-right');
          appendFilterDropdown(element, right.node(), d.value.toLowerCase(), table);
        }
        return element;
      };
      stickyHeaderUpdate = function(d, e, i) {
        if (!(i === 0 && rowTickSelectionEnabled) || !rowTickSelectionEnabled) {
          this.select('.hx-table-header-name').text(d.value);
          this.classed('hx-table-header-sort', sortEnabled);
          this.classed('hx-table-header-filter', filterEnabled);
        }
        return this.select('.hx-table-header-left').on('click', function() {
          if (sortEnabled) {
            return _.modifiers.sort(d.value);
          }
        });
      };
      stickyHeader = _.tableWrapper.select('.hx-table-header-sticky');
      stickyHeader.style('top', (_.tableWrapper.node().scrollTop) + 'px');
      headerData = rowTickSelectionEnabled ? [void 0].concat(_.header.columns) : _.header.columns;
      stickyHeader.select('thead').select('.hx-table-header-row').view('th').enter(stickyHeaderEnter).update(stickyHeaderUpdate).apply(headerData);
      stickyHeader.selectAll('.hx-table-header-group-row').remove();
      groupHead = _.tableWrapper.selectAll('.hx-table-header-group-row');
      if (!groupHead.empty()) {
        groupHead.each(function(elem) {
          return stickyHeader.select('.hx-table-header-row').insertBefore(elem.cloneNode(true));
        });
      }
      _.tableWrapper.on("scroll", function(e) {
        return stickyHeader.style("top", (_.tableWrapper.node().scrollTop) + 'px');
      });
      return next();
    };
    renderResponsiveHeader = function(next) {
      if (_.useMobileView) {
        _.tableWrapper.selectAll("thead").remove();
        return next();
      } else {
        return renderHeader(function() {
          return renderStickyHeader(function() {
            return next();
          });
        });
      }
    };
    selectRow = function(rowSelection, rowIndex, screenRowIndex, shiftDown, force, dontUpdateText) {
      var currentState, rowClassed, rowData;
      if (shiftDown && (_.lastRowSelected != null)) {
        _.shiftWasDown = true;
        selectMultiRows(_.lastRowSelected, screenRowIndex);
        _.lastRowSelected = screenRowIndex;
      } else {
        _.shiftWasDown = false;
        currentState = rowSelection.classed("hx-table-row-selected");
        if (screenRowIndex != null) {
          _.lastRowSelected = screenRowIndex;
        }
        if (force != null) {
          rowClassed = !force;
        } else {
          rowClassed = rowSelection.classed("hx-table-row-selected");
        }
        if (!rowClassed !== currentState) {
          rowData = _.rows[screenRowIndex];
          if (rowClassed) {
            delete _.selectedRows[rowIndex];
          } else {
            _.selectedRows[rowIndex] = rowData;
          }
          if (table.has("rowselect")) {
            table.emit("rowselect", {
              rowData: rowData,
              selected: !rowClassed
            });
          }
        } else {
          _.selectedRows[rowIndex] = void 0;
        }
        rowSelection.classed("hx-table-row-selected", !rowClassed);
      }
      if (!dontUpdateText) {
        updateSelectedText(table);
      }
      return void 0;
    };
    selectMultiRows = function(startScreenRow, endScreenRow, force) {
      var array, i, lastSelected, rowIndex, rowSelections, z, _i, _j, _len;
      lastSelected = endScreenRow;
      if (startScreenRow > endScreenRow) {
        endScreenRow = startScreenRow;
        startScreenRow = lastSelected;
        lastSelected = endScreenRow;
      }
      rowSelections = _.tableWrapper.select('tbody').selectAll('tr').nodes.map(hx.select);
      array = [];
      for (i = _i = startScreenRow; _i <= endScreenRow; i = _i += 1) {
        rowIndex = _.startRowIndex + i;
        array.push({
          row: rowSelections[i],
          index: rowIndex,
          isSelected: _.selectedRows[rowIndex] !== void 0
        });
      }
      if ((force == null) && array.some(function(b) {
        return !b.isSelected && b.index !== _.lastRowSelected;
      })) {
        force = true;
      }
      if ((force == null) && _.shiftWasDown) {
        force = false;
      }
      for (_j = 0, _len = array.length; _j < _len; _j++) {
        z = array[_j];
        if (z.index !== _.lastRowSelected || _.shiftWasDown) {
          selectRow(z.row, z.index, z.index - _.startRowIndex, false, force, true);
        }
      }
      updateSelectedText(table);
      return void 0;
    };
    renderDesktopPage = function(next) {
      var body, cellEnter, cellRenderer, defaultCellRenderer, k, lowerCaseCellRenderers, renderer, rowRenderer, rowSelectCellUpdate, t, v, _ref;
      defaultCellRenderer = table.options.defaultCellRenderer || function(d, e, i) {
        return this.text(d);
      };
      rowSelectCellUpdate = function(d, element, i, screenRowIndex) {
        var rowIndex, rowSelection;
        rowIndex = _.startRowIndex + screenRowIndex;
        rowSelection = hx.select(element.parentNode);
        rowSelection.classed("hx-table-row-selected", !!_.selectedRows[rowIndex]);
        return this.on("click", function(e) {
          e.stopPropagation();
          return selectRow(rowSelection, rowIndex, screenRowIndex, e.shiftKey);
        });
      };
      lowerCaseCellRenderers = {};
      _ref = table.options.cellRenderers;
      for (k in _ref) {
        v = _ref[k];
        lowerCaseCellRenderers[k.toLowerCase()] = v;
      }
      renderer = _.header.columns.map(function(column) {
        return lowerCaseCellRenderers[column.value.toLowerCase()] || defaultCellRenderer;
      });
      if (rowTickSelectionEnabled) {
        renderer = [rowSelectCellUpdate].concat(renderer);
      }
      cellEnter = function(d, i) {
        if (i === 0 && rowTickSelectionEnabled) {
          return rowSelectCellEnter(this, d, i);
        } else {
          return this.append('td')["class"]('hx-table-cell').node();
        }
      };
      cellRenderer = function(d, e, i, screenRowIndex) {
        return renderer[i].call(this, d, e, i, screenRowIndex);
      };
      rowRenderer = function(d, rowElement, i) {
        var buildCollapseable, collapsibleContent, isLastRow, rowArray, rowData, screenRowIndex, toggleCollapseable;
        screenRowIndex = i;
        _.startRowIndex = (table.paginator.getPage() - 1) * table.options.rowsPerPage;
        rowArray = d.columns ? d.columns : d;
        rowData = rowTickSelectionEnabled ? [void 0].concat(rowArray) : rowArray;
        this.view('.hx-table-cell').enter(cellEnter).update(function(d, e, i) {
          return cellRenderer.call(this, d, e, i, screenRowIndex);
        }).apply(rowData);
        if (rowSelectionEnabled) {
          this.on("click", (function(_this) {
            return function(e) {
              e.stopPropagation();
              return selectRow(_this, _.startRowIndex + i, screenRowIndex, e.shiftKey);
            };
          })(this));
        }
        if (rowCollapseableEnabled) {
          isLastRow = false;
          buildCollapseable = function(node) {
            var contentDiv, contentRow, hiddenRow, nextSibling, selParent;
            contentRow = hx.select(document.createElement('tr')).classed('hx-collapsible-content-row', true);
            hiddenRow = hx.select(document.createElement('tr')).classed('hx-collapsible-content-row-hidden', true);
            if (rowTickSelectionEnabled) {
              contentRow.append('th');
            }
            contentDiv = contentRow.append('td').attr('colspan', '99').style('padding', '10px').append('div').classed('hx-collapsible-content', true);
            nextSibling = node.nextElementSibling;
            selParent = node.parentNode;
            if (nextSibling) {
              selParent.insertBefore(hiddenRow.node(), nextSibling);
              selParent.insertBefore(contentRow.node(), nextSibling);
            } else {
              isLastRow = true;
              contentRow.classed('hx-lastrow', true);
              selParent.appendChild(hiddenRow.node());
              selParent.appendChild(contentRow.node());
            }
            table.options.collapsibleRow(contentDiv.node(), d);
            return {
              contentRow: contentRow,
              hiddenRow: hiddenRow,
              visible: false
            };
          };
          toggleCollapseable = function() {
            var cc;
            cc = collapsibleContent;
            if (isLastRow) {
              hx.select(rowElement).classed('hx-lastrow', cc.visible);
            }
            if (cc.visible) {
              cc.visible = false;
              cc.contentRow.style('display', 'none');
              return cc.hiddenRow.style('display', 'none');
            } else {
              cc.visible = true;
              cc.contentRow.style('display', '');
              return cc.hiddenRow.style('display', '');
            }
          };
          collapsibleContent = void 0;
          return this.on('click', (function(_this) {
            return function(e) {
              if (collapsibleContent == null) {
                collapsibleContent = buildCollapseable(_this.node());
              }
              toggleCollapseable();
              if (table.has('rowcollapsible')) {
                return table.emit('rowcollapsible', {
                  rowData: d,
                  isOpen: collapsibleContent.visible
                });
              }
            };
          })(this));
        }
      };
      _.tableWrapper.select('.hx-table-non-sticky').classed('hx-table-mobile', false);
      _.tableWrapper.selectAll('.hx-collapsible-content-row').remove();
      _.tableWrapper.selectAll('.hx-collapsible-content-row-hidden').remove();
      if (_.rows.length > 0) {
        body = _.tableWrapper.select('.hx-table-non-sticky').select('tbody');
        body.select('.hx-table-no-data').remove();
        body.view('tr', 'tr').update(rowRenderer).apply(_.rows);
      } else {
        t = _.tableWrapper.select('.hx-table-non-sticky');
        t.select('tbody').remove();
        t.append('tbody').append('tr')["class"]('hx-table-no-data').append('td').attr('colspan', 99).text(table.options.noDataMessage);
      }
      updateSelectedText(table);
      return next();
    };
    renderMobilePage = function(next) {
      var cellRenderer, defaultCellRenderer, renderer, responsiveCellEnter, responsiveCellUpdate, responsiveNoDataUpdate, rowEnter, rowUpdate, rows;
      defaultCellRenderer = table.options.defaultCellRenderer || function(d, e, i) {
        return this.text(d);
      };
      renderer = _.header.columns.map(function(column) {
        return table.options.cellRenderers[column.value.toLowerCase()] || defaultCellRenderer;
      });
      cellRenderer = function(d, e, i, screenRowIndex) {
        return renderer[i].call(this, d, e, i, screenRowIndex);
      };
      responsiveCellEnter = function(d, i, screenRowIndex) {
        var container, left, right, selection, th;
        selection = this.append('tr')["class"]('hx-table-responsive-row');
        if (i === 0) {
          selection.classed('hx-table-responsive-row-first', true);
        }
        th = selection.append('th');
        container = th.append('div');
        right = container.append('span')["class"]("hx-table-header-right");
        left = container.append('span')["class"]("hx-table-header-left");
        left.append('i')["class"]('hx-table-sort-icon fa');
        left.append('span')["class"]('hx-table-header-name');
        right.append('i')["class"]('fa fa-search');
        appendFilterDropdown(right.node(), right.node(), d[0].toLowerCase(), table);
        selection.append('td');
        return selection.node();
      };
      responsiveCellUpdate = function(d, e, i, screenRowIndex) {
        var sortDirection, td, th;
        td = this.select('td');
        td.attr('rowspan', '');
        td.style('display', '');
        cellRenderer.call(td, d[1], td.node(), i, screenRowIndex);
        th = this.select('th');
        this.select('.hx-table-header-name').text(d[0]);
        th.classed('hx-table-header-sort', sortEnabled && screenRowIndex === 0);
        th.classed('hx-table-header-filter', filterEnabled && screenRowIndex === 0);
        this.select('.hx-table-header-left').on('click', function(e) {
          if (sortEnabled) {
            e.stopPropagation();
            return _.modifiers.sort(d[0]);
          }
        });
        sortDirection = _.modifiers.sortColumn === d[0] ? _.modifiers.sortDirection : void 0;
        return updateIcons(this.select('.hx-table-sort-icon'), sortDirection);
      };
      responsiveNoDataUpdate = function(d, e, i, screenRowIndex) {
        var sortDirection, td, th;
        td = this.select('td');
        if (i === 0) {
          td.text(table.options.noDataMessage);
          td.style('display', '');
          td.attr('rowspan', _.header.columns.length + 1);
        } else {
          td.text('');
          td.style('display', 'none');
        }
        th = this.select('th');
        this.select('.hx-table-header-name').text(d);
        th.classed('hx-table-header-sort', sortEnabled && screenRowIndex === 0);
        th.classed('hx-table-header-filter', filterEnabled && screenRowIndex === 0);
        this.select('.hx-table-header-left').on('click', function(e) {
          if (sortEnabled) {
            e.stopPropagation();
            return _.modifiers.sort(d[0]);
          }
        });
        sortDirection = _.modifiers.sortColumn === d[0] ? _.modifiers.sortDirection : void 0;
        return updateIcons(this.select('.hx-table-sort-icon'), sortDirection);
      };
      rowEnter = function() {
        var tbody, th;
        tbody = this.append('tbody');
        if (rowTickSelectionEnabled) {
          th = tbody.append('tr').append('th')["class"]('hx-table-selection').attr('rowspan', _.header.columns.length + 1);
          th.append('i')["class"]('fa fa-check');
        }
        return tbody.node();
      };
      rowUpdate = function(d, rowElement, i) {
        var buildCollapseable, collapsibleContent, headerNames, screenRowIndex, toggleCollapseable;
        headerNames = _.header.columns.map(function(d) {
          return d.value;
        });
        screenRowIndex = i;
        _.startRowIndex = (table.paginator.getPage() - 1) * table.options.rowsPerPage;
        this.classed('hx-table-no-data', d === void 0);
        if (d === void 0) {
          this.view('.hx-table-responsive-row').enter(function(d, i) {
            return responsiveCellEnter.call(this, d, i, screenRowIndex);
          }).update(function(d, e, i) {
            return responsiveNoDataUpdate.call(this, d, e, i, screenRowIndex);
          }).apply(headerNames);
        } else {
          this.view('.hx-table-responsive-row').enter(function(d, i) {
            return responsiveCellEnter.call(this, d, i, screenRowIndex);
          }).update(function(d, e, i) {
            return responsiveCellUpdate.call(this, d, e, i, screenRowIndex);
          }).apply(hx.zip([headerNames, d]));
        }
        if (rowTickSelectionEnabled) {
          this.select('.hx-table-selection').on("click", (function(_this) {
            return function(e) {
              if (d !== void 0) {
                e.stopPropagation();
                return selectRow(_this, _.startRowIndex + i, screenRowIndex, e.shiftKey);
              }
            };
          })(this));
        }
        if (rowSelectionEnabled) {
          this.on("click", (function(_this) {
            return function(e) {
              if (d !== void 0) {
                e.stopPropagation();
                return selectRow(_this, _.startRowIndex + i, screenRowIndex, e.shiftKey);
              }
            };
          })(this));
        }
        if (rowCollapseableEnabled) {
          buildCollapseable = function(node) {
            var contentDiv, contentRow, hiddenRow;
            contentRow = hx.select(document.createElement('tr')).classed('hx-collapsible-content-row', true);
            hiddenRow = hx.select(document.createElement('tr')).classed('hx-collapsible-content-row-hidden', true);
            contentRow.append('th');
            if (rowTickSelectionEnabled) {
              contentRow.append('th');
            }
            contentDiv = contentRow.append('td').attr('colspan', '99').style('padding', '10px').append('div').classed('hx-collapsible-content', true);
            contentRow.classed('hx-lastrow', true);
            node.appendChild(hiddenRow.node());
            node.appendChild(contentRow.node());
            table.options.collapsibleRow(contentDiv.node(), d);
            return {
              contentRow: contentRow,
              hiddenRow: hiddenRow,
              visible: false
            };
          };
          toggleCollapseable = (function(_this) {
            return function() {
              var cc, responsiveRows;
              cc = collapsibleContent;
              responsiveRows = _this.selectAll('.hx-table-responsive-row');
              hx.select(responsiveRows.node(responsiveRows.size() - 1)).classed('hx-lastrow', cc.visible);
              if (cc.visible) {
                cc.visible = false;
                cc.contentRow.style('display', 'none');
                return cc.hiddenRow.style('display', 'none');
              } else {
                cc.visible = true;
                cc.contentRow.style('display', '');
                return cc.hiddenRow.style('display', '');
              }
            };
          })(this);
          collapsibleContent = void 0;
          return this.on('click', (function(_this) {
            return function(e) {
              var preventToggle;
              if (collapsibleContent != null) {
                preventToggle = e.target.contains(collapsibleContent.contentRow.node());
              }
              if (!preventToggle) {
                if (collapsibleContent == null) {
                  collapsibleContent = buildCollapseable(_this.node());
                }
                toggleCollapseable();
                if (table.has('rowcollapsible')) {
                  return table.emit('rowcollapsible', {
                    rowData: d,
                    isOpen: collapsibleContent.visible
                  });
                }
              }
            };
          })(this));
        }
      };
      _.tableWrapper.select('.hx-table-non-sticky').classed('hx-table-mobile', true);
      rows = _.rows.length > 0 ? _.rows : [void 0];
      _.tableWrapper.on("scroll", function(e) {
        if (_.filterDropdown != null) {
          _.filterDropdown.hide();
          return _.filterDropdown = void 0;
        }
      });
      _.tableWrapper.select('.hx-table-non-sticky').select('tbody').remove();
      _.tableWrapper.select('.hx-table-non-sticky').view('tbody').enter(rowEnter).update(rowUpdate).apply(rows);
      updateSelectedText(table);
      return next();
    };
    renderReponsivePage = function(next) {
      if (_.useMobileView) {
        return renderMobilePage(next);
      } else {
        return renderDesktopPage(next);
      }
    };
    fixTableSize = function(next) {
      var nonStickyHeadersWidths, tableWidth;
      tableWidth = _.tableWrapper.select('.hx-table-non-sticky').style('width');
      _.tableWrapper.select('.hx-table-header-sticky').style('width', tableWidth);
      nonStickyHeadersWidths = _.tableWrapper.select('.hx-table-non-sticky').select('thead').select('.hx-table-header-row').selectAll('th').style('width');
      _.tableWrapper.select('.hx-table-header-sticky').select('thead').select('.hx-table-header-row').selectAll('th').each(function(element, i) {
        return hx.select(element).style('width', nonStickyHeadersWidths[i]);
      });
      return next();
    };
    tidyUp = function(next) {
      _.newSource = false;
      _.container.classed('hx-table-loading', false);
      _.rendered = true;
      return next();
    };
    displayLoading(function() {
      return getHeaderData(function() {
        return getRowCount(function() {
          return getDataForPage(function() {
            return updatePaginator(function() {
              return maybeDestroyTable(function() {
                return renderReponsivePage(function() {
                  return renderResponsiveHeader(function() {
                    return fixTableSize(function() {
                      return tidyUp(function() {
                        table.emit('render');
                        return typeof callback === "function" ? callback() : void 0;
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    return table;
  };

  return Table;

})(hx.EventEmitter);

hx.Table = Table;

})();

// fast-click
(function(){
var setupFastClick;

if (hx.supports('touch')) {
  setupFastClick = function(node, eventEmitter) {
    var cancel, getCoords, resetTimer, scrollTolerance, startX, startY, tapHandling;
    tapHandling = cancel = resetTimer = null;
    scrollTolerance = 10;
    getCoords = function(e) {
      var ev, touches;
      ev = e.originalEvent || e;
      touches = ev.touches || ev.targetTouches;
      if (touches) {
        return [touches[0].pageX, touches[0].pageY];
      }
    };
    startX = void 0;
    startY = void 0;
    node.addEventListener('touchstart', function(e) {
      var _ref;
      if (e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1) {
        return false;
      }
      return _ref = getCoords(e), startX = _ref[0], startY = _ref[1], _ref;
    });
    node.addEventListener('touchmove', function(e) {
      var coords;
      if (!cancel) {
        coords = getCoords(e);
        if (coords && ((Math.abs(startY - coords[1])) > scrollTolerance || (Math.abs(startX - coords[0])) > scrollTolerance)) {
          return cancel = true;
        }
      }
    });
    return node.addEventListener('touchend', function(e) {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function() {
        tapHandling = false;
        return cancel = false;
      }, 1000);
      if ((e.which && e.which > 1) || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) {
        return;
      }
      e.preventDefault();
      if (cancel || tapHandling && tapHandling !== e.type) {
        cancel = false;
        return;
      }
      tapHandling = e.type;
      return eventEmitter.emit('click', e);
    });
  };
  hx.select.addEventAugmenter({
    name: 'click',
    setup: setupFastClick
  });
}

})();

// form-builder
(function(){
var Form,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Form = (function(_super) {
  __extends(Form, _super);

  function Form(selector) {
    this.selector = selector;
    Form.__super__.constructor.apply(this, arguments);
    this.formId = "form-" + hx.randomId() + '-';
    this.properties = new hx.Map;
    hx.select(this.selector).classed('hx-form', true).on('keypress', function(e) {
      var target;
      target = hx.select(e.target || e.srcElement);
      if (e.keyCode === 13 && target.attr('type') !== 'submit') {
        return e.preventDefault();
      }
    });
  }

  Form.prototype.add = function(name, type, nodeType, f) {
    var entry, extras, id, key, selection;
    id = this.formId + name.split(" ").join("-");
    entry = hx.select(this.selector).append('div');
    entry.append('label').attr("for", id).text(name);
    selection = entry.append(nodeType).attr("id", id);
    extras = f.call(selection) || {};
    if (extras.key != null) {
      key = extras.key;
      delete extras.key;
      this.properties.set(key, {
        type: type,
        node: selection.node(),
        extras: extras
      });
    } else {
      this.properties.set(name, {
        type: type,
        node: selection.node(),
        extras: extras
      });
    }
    return this;
  };

  Form.prototype.addText = function(name, options) {
    if (options == null) {
      options = {};
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.attrs == null) {
      options.attrs = [];
    }
    return this.add(name, 'text', 'input', function() {
      var attr, selection, _i, _len, _ref;
      selection = this.attr('type', options.type);
      if ((options.autoCompleteData != null) && options.type !== "password" && options.type !== "number") {
        new hx.AutoComplete(selection.node(), options.autoCompleteData, options.autoCompleteOptions != null ? options.autoCompleteOptions : options.autoCompleteOptions = void 0);
      }
      if (options.placeholder != null) {
        selection.attr('placeholder', options.placeholder);
      }
      if (options.required) {
        selection.attr('required', options.required);
      }
      _ref = options.attrs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        selection.attr(attr.type, attr.value);
      }
      if (options.validator != null) {
        selection.node().oninput = (function(_this) {
          return function(e) {
            return e.target.setCustomValidity(options.validator(e) || "");
          };
        })(this);
      }
      return {
        required: options.required,
        key: options.key
      };
    });
  };

  Form.prototype.addEmail = function(name, options) {
    if (options == null) {
      options = {};
    }
    options.type = "email";
    return this.addText(name, options);
  };

  Form.prototype.addUrl = function(name, options) {
    if (options == null) {
      options = {};
    }
    options.type = "url";
    return this.addText(name, options);
  };

  Form.prototype.addNumber = function(name, options) {
    if (options == null) {
      options = {};
    }
    options.type = "number";
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

  Form.prototype.addPassword = function(name, options) {
    if (options == null) {
      options = {};
    }
    options.type = "password";
    return this.addText(name, options);
  };

  Form.prototype.addSelect = function(name, values, options) {
    if (options == null) {
      options = {};
    }
    return this.add(name, 'select', 'select', function() {
      var value, _i, _len;
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        this.append('option').text(value);
      }
      if (typeof options.required === "boolean") {
        this.prop('selectedIndex', -1);
        if (options.required === true) {
          this.attr('required', true);
        }
      }
      return {
        required: options.required,
        key: options.key
      };
    });
  };

  Form.prototype.addCheckbox = function(name, options) {
    if (options == null) {
      options = {};
    }
    return this.add(name, 'checkbox', 'input', function() {
      this.attr('type', 'checkbox');
      if (options.required != null) {
        this.attr('required', options.required);
      }
      return {
        required: options.required,
        key: options.key
      };
    });
  };

  Form.prototype.addRadio = function(name, values, options) {
    var self;
    if (options == null) {
      options = {};
    }
    self = this;
    return this.add(name, 'radio', 'div', function() {
      var count, id, input, selection, value, _i, _len;
      id = self.formId + name.split(" ").join("-");
      count = 0;
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        selection = this.append('div')["class"]('hx-radio-container');
        input = selection.append('input').attr('type', 'radio').attr('name', id).attr("id", id + "-" + count).value(value);
        if (options.required != null) {
          input.attr('required', options.required);
        }
        selection.append('label').attr("for", id + "-" + count).text(value);
        count += 1;
      }
      return {
        required: options.required,
        key: options.key
      };
    });
  };

  Form.prototype.addSubmit = function(text, icon) {
    hx.select(this.selector).append('button').attr('type', 'submit')["class"]('hx-btn hx-positive hx-form-submit').html("<i class=\"" + icon + "\"></i> " + text).on('click', (function(_this) {
      return function(e) {
        if (hx.select(_this.selector).node().checkValidity() || e.keyCode === 13) {
          e.preventDefault();
          return _this.submit();
        }
      };
    })(this));
    return this;
  };

  Form.prototype.addTagInput = function(name, options) {
    var self;
    if (options == null) {
      options = {};
    }
    self = this;
    this.add(name, 'tagInput', 'div', function() {
      var classifier, validator;
      classifier = options.classifier;
      validator = options.validator;
      return {
        tagInput: new hx.TagInput(this.node(), classifier, validator),
        key: options.key
      };
    });
    return this;
  };

  Form.prototype.getData = function() {
    var result;
    result = {};
    this.properties.forEach(function(key, it) {
      var value;
      value = (function() {
        switch (it.type) {
          case 'checkbox':
            return hx.select(it.node).prop('checked');
          case 'radio':
            return hx.select(it.node).select('input:checked').value();
          case 'tagInput':
            return it.extras.tagInput.tags();
          default:
            return hx.select(it.node).value();
        }
      })();
      return result[key] = value;
    });
    return result;
  };

  Form.prototype.submit = function() {
    return this.emit('submit', this.getData());
  };

  Form.prototype.fill = function(data) {
    var key, node, v, value, _results;
    _results = [];
    for (key in data) {
      if (!__hasProp.call(data, key)) continue;
      value = data[key];
      if (this.properties.has(key)) {
        v = this.properties.get(key);
        node = v.node;
        switch (v.type) {
          case 'checkbox':
            _results.push(hx.select(node).prop('checked', value));
            break;
          case 'radio':
            _results.push(hx.select(node).selectAll('input').filter(function(d) {
              return hx.select(d).value() === value;
            }).prop('checked', true));
            break;
          case 'tagInput':
            _results.push(value.forEach(function(e) {
              return v.extras.tagInput.add(e);
            }));
            break;
          default:
            _results.push(hx.select(node).value(value));
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Form.prototype.render = function(data) {};

  return Form;

})(hx.EventEmitter);

hx.Form = Form;

})();

// paginator
(function(){
var Paginator,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Paginator = (function(_super) {

  /* Private */
  var render, select;

  __extends(Paginator, _super);

  render = function(paginator) {
    var data, end, start;
    if (paginator.pageCount === void 0) {
      data = [
        {
          value: paginator.selected,
          selected: true
        }
      ];
    } else {
      start = Math.max(1, paginator.selected - Math.floor(paginator.visibleCount / 2));
      end = Math.min(start + paginator.visibleCount, paginator.pageCount + 1);
      start = Math.max(1, end - paginator.visibleCount);
      data = hx.range(end - start).map(function(i) {
        return {
          value: start + i,
          selected: paginator.selected === start + i
        };
      });
    }
    return paginator.view.apply(data);
  };

  select = function(paginator, i, cause) {
    var newPage;
    if (paginator.pageCount === void 0) {
      newPage = Math.max(i, 1);
    } else {
      newPage = hx.clamp(1, paginator.pageCount, i);
    }
    if (newPage !== paginator.selected) {
      paginator.selected = newPage;
      render(paginator);
      return paginator.emit('change', {
        cause: cause,
        selected: paginator.selected
      });
    }
  };


  /* Public */

  function Paginator(selector) {
    var container, pageButtons, self;
    Paginator.__super__.constructor.apply(this, arguments);
    container = hx.select(selector).classed('hx-paginator', true);
    self = this;
    container.append('button')["class"]('hx-btn ' + hx.theme.paginator.arrowButton).html('<i class="fa fa-step-backward"></i>').on('click', function() {
      if (self.pageCount === void 0) {
        return select(self, self.selected - 1, 'user');
      } else {
        return select(self, 0, 'user');
      }
    });
    pageButtons = container.append('span')["class"]('hx-input-group');
    this.view = pageButtons.view('.hx-btn', 'button').update(function(d, e, i) {
      return this.text(d.value).classed(hx.theme.paginator.defaultButton, !d.selected).classed(hx.theme.paginator.selectedButton, d.selected).classed('hx-no-border', true).on('click', function() {
        return select(self, d.value, 'user');
      });
    });
    container.append('button')["class"]('hx-btn ' + hx.theme.paginator.arrowButton).html('<i class="fa fa-step-forward"></i>').on('click', function() {
      if (self.pageCount === void 0) {
        return select(self, self.selected + 1, 'user');
      } else {
        return select(self, self.pageCount, 'user');
      }
    });
    this.visibleCount = 10;
    this.pageCount = 10;
    this.selected = 1;
    render(this);
  }

  Paginator.prototype.setPage = function(i) {
    select(this, i, 'api');
    return this;
  };

  Paginator.prototype.getPage = function() {
    return this.selected;
  };

  Paginator.prototype.setPageCount = function(n) {
    this.pageCount = n;
    render(this);
    return this;
  };

  Paginator.prototype.setVisibleCount = function(n) {
    this.visibleCount = n;
    render(this);
    return this;
  };

  return Paginator;

})(hx.EventEmitter);

hx.Paginator = Paginator;

})();

// plot
(function(){
var Axis, BandSeries, BarSeries, DateScale, DiscreteScale, Graph, Label, LabelMeta, LineSeries, LinearScale, PieChart, ScatterSeries, Series, StandardLabel, StraightLineSeries, arcCurve, axisPadding, boundLabel, extent, extent2, feather, graph, inefficientSearch, labelOffset, pie, plot, splitAndFeather, splitData, stackSegments, svgCurve, tickSize, updatePath,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

svgCurve = function(data, close) {
  var i, l, segments, _i;
  if (data.length > 1) {
    segments = new Array(data.length);
    segments[0] = 'M' + data[0].x + ',' + data[0].y;
    l = data.length - 1;
    for (i = _i = 1; 1 <= l ? _i <= l : _i >= l; i = 1 <= l ? ++_i : --_i) {
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

arcCurve = function(x, y, innerRadius, outerRadius, startRadians, endRadians, padding, segmentCount) {
  var pixelsToRadians, points, pointsRequired, pushPoints, r, radians;
  pixelsToRadians = function(pixels, radius) {
    return pixels / radius;
  };
  pushPoints = function(startPoint, endPoint, radius) {
    var i, max, r, radpad, theta, _i, _results;
    radpad = pixelsToRadians(padding, radius);
    max = Math.abs(endPoint - startPoint);
    _results = [];
    for (i = _i = startPoint; startPoint <= endPoint ? _i <= endPoint : _i >= endPoint; i = startPoint <= endPoint ? ++_i : --_i) {
      r = radians - radpad;
      theta = r > 0 ? startRadians + (radpad / 2) + ((i / max) * r) : endRadians - (radpad / 2) - ((i / max) * r);
      theta = hx.clamp(startRadians, endRadians, theta);
      _results.push(points.push({
        x: x + radius * Math.cos(theta),
        y: y + radius * Math.sin(theta)
      }));
    }
    return _results;
  };
  radians = endRadians - startRadians;
  pointsRequired = Math.min(100, Math.max(3, Math.floor(radians * Math.sqrt(outerRadius)) - 1));
  points = [];
  if (innerRadius <= padding) {
    r = Math.max(padding, innerRadius) / (2 * Math.sin(Math.PI * 2 / segmentCount));
    points.push({
      x: x + r * Math.cos((startRadians + endRadians) / 2),
      y: y + r * Math.sin((startRadians + endRadians) / 2)
    });
  } else {
    pushPoints(0, pointsRequired, innerRadius);
  }
  pushPoints(pointsRequired, 0, outerRadius);
  return svgCurve(points, true);
};

extent = function(data, f) {
  var d, max, min, _i, _len;
  if (data.length > 0) {
    min = f(data[0]);
    max = f(data[0]);
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      min = hx.min([min, f(d)]);
      max = hx.max([max, f(d)]);
    }
    return [min, max];
  } else {
    return void 0;
  }
};

extent2 = function(data, f, g) {
  var d, max, min, _i, _len;
  if (data.length > 0) {
    min = f(data[0]);
    max = f(data[0]);
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      min = hx.min([min, f(d), g(d)]);
      max = hx.max([max, f(d), g(d)]);
    }
    return [min, max];
  } else {
    return void 0;
  }
};

feather = function(array, maxSize) {
  var i, newData, originalLength, _i, _ref;
  if (maxSize == null) {
    maxSize = 200;
  }
  if (maxSize > 0) {
    originalLength = array.length;
    if (originalLength > maxSize) {
      newData = new Array(maxSize);
      for (i = _i = 0, _ref = maxSize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        newData[i] = array[Math.floor(i * (originalLength - 1) / (maxSize - 1))];
      }
      return newData;
    } else {
      return array.slice(0);
    }
  } else {
    return [];
  }
};

splitData = function(data, defined) {
  var awaitingReal, current, d, datas, l, _i, _len;
  if (defined == null) {
    defined = function() {};
  }
  l = data.length;
  datas = [];
  current = void 0;
  awaitingReal = true;
  for (_i = 0, _len = data.length; _i < _len; _i++) {
    d = data[_i];
    if (hx.defined(d)) {
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

splitAndFeather = function(data, maxSize, defined) {
  var d, featherFactor, _i, _len, _ref, _results;
  if (defined == null) {
    defined = function() {};
  }
  featherFactor = maxSize / data.length;
  _ref = splitData(data, defined);
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    d = _ref[_i];
    _results.push(feather(d, Math.floor(d.length * featherFactor)));
  }
  return _results;
};

stackSegments = function(array, arrayNames, xvalue) {
  var i, result, sum, y, _i, _len;
  result = [];
  sum = 0;
  for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
    y = array[i];
    result.push({
      y0: sum,
      y1: sum + y.value,
      yname: arrayNames[i],
      y: y.value,
      data: y,
      x: xvalue
    });
    sum += y.value;
  }
  return result;
};

inefficientSearch = function(array, find, nearest, v) {
  var i, _i, _ref;
  for (i = _i = 0, _ref = array.length - 1; _i < _ref; i = _i += 1) {
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

boundLabel = function(label, graph) {
  label.bounding = graph.plotArea;
  return label;
};

Series = (function() {
  function Series() {
    this.data = null;
    this.axis = null;
    this.label = new StandardLabel;
    this.name = null;
  }

  Series.prototype.setData = function(data) {
    return this.data = data;
  };

  Series.prototype.getX = function(y) {
    var d, i;
    if (hx.isString(y)) {
      d = hx.find(this.data, function(d) {
        return d.y === y;
      });
      if (hx.defined(d)) {
        return d.x;
      } else {
        return void 0;
      }
    } else {
      i = inefficientSearch(this.data, y, true, function(d) {
        return d.y;
      });
      return this.data[i].x;
    }
  };

  Series.prototype.getY = function(x) {
    var d, i, x1, x2, y1, y2;
    if (hx.isString(x)) {
      d = hx.find(this.data, function(d) {
        return d.x === x;
      });
      if (hx.defined(d)) {
        return d.y;
      } else {
        return void 0;
      }
    } else {
      i = inefficientSearch(this.data, x, false, function(d) {
        return d.x;
      });
      if ((0 <= i && i < this.data.length - 1)) {
        x1 = this.data[i].x;
        x2 = this.data[i + 1].x;
        y1 = this.data[i].y;
        y2 = this.data[i + 1].y;
        return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
      } else {
        if (x > this.data[this.data.length - 1].x) {
          return this.data[this.data.length - 1].y;
        } else {
          return this.data[0].y;
        }
      }
    }
  };

  Series.prototype.setLabel = function(label) {
    return this.label = label;
  };

  Series.prototype.getLabelMeta = function(x, y) {};

  Series.prototype.updateSvg = function(element) {};

  return Series;

})();

Axis = (function() {
  var scalePad, supportsGroup;

  function Axis(xScaleType, yScaleType) {
    this.xScaleType = xScaleType != null ? xScaleType : 'linear';
    this.yScaleType = yScaleType != null ? yScaleType : 'linear';
    this.xVisible = true;
    this.xFormatter = hx.format.si(2);
    this.xTickRotation = 0;
    this.xMin = 'auto';
    this.xMax = 'auto';
    this.xDiscretePadding = 0.1;
    this.xDiscreteLabels = void 0;
    this.xTickSpacing = 50;
    this.xTitle = null;
    this.xScalePaddingMin = 0;
    this.xScalePaddingMax = 0;
    this.xTicksAll = false;
    this.xGridLines = true;
    this.xNthTickVisible = 1;
    this.yVisible = true;
    this.yFormatter = hx.format.si(2);
    this.yMin = 'auto';
    this.yMax = 'auto';
    this.yDiscretePadding = 0.1;
    this.yDiscreteLabels = void 0;
    this.yTickSpacing = 50;
    this.yTitle = null;
    this.yScalePaddingMin = 0;
    this.yScalePaddingMax = 0;
    this.yTicksAll = false;
    this.yGridLines = true;
    this.yNthTickVisible = 1;
    this.series = new hx.List;
    this.xScale = new LinearScale(0, 1, 0, 1);
    this.yScale = new LinearScale(0, 1, 0, 1);
    this.graph = null;
    this.xAxisSize = 50;
    this.yAxisSize = 50;
    this.xTitleHeight = 0;
    this.yTitleHeight = 0;
  }

  supportsGroup = function(series) {
    return series instanceof BarSeries || series instanceof LineSeries;
  };

  Axis.prototype.addSeries = function(series, name) {
    if (series == null) {
      series = 'line';
    }
    if (name == null) {
      name = '';
    }
    if (hx.isString(series)) {
      series = (function() {
        switch (series) {
          case 'line':
            return new LineSeries;
          case 'band':
            return new BandSeries;
          case 'bar':
            return new BarSeries;
          case 'scatter':
            return new ScatterSeries;
          case 'straight-line':
            return new StraightLineSeries;
          default:
            console.error(series + ' is not a valid series type');
            return void 0;
        }
      })();
      if (series !== void 0) {
        series.name = name;
      }
    }
    if (series !== void 0) {
      this.series.add(series);
      series.axis = this;
      return series;
    }
  };

  Axis.prototype.removeSeries = function(series) {
    this.series.remove(series);
    return series.axis = null;
  };

  Axis.prototype.setupAxisSvg = function(element) {
    var gridGroup, xAxisGroup, yAxisGroup;
    gridGroup = hx.select(element).append('g')["class"]('hx-axis-grid');
    xAxisGroup = hx.select(element).append('g')["class"]('hx-x-axis');
    xAxisGroup.append('g')["class"]('hx-axis-scale');
    yAxisGroup = hx.select(element).append('g')["class"]('hx-y-axis');
    return yAxisGroup.append('g')["class"]('hx-axis-scale');
  };

  scalePad = function(value, range, padding) {
    return value + (range || 1) * padding;
  };

  Axis.prototype.tagSeries = function() {
    var groupTypeEntries, series, typeEntry, types, _i, _j, _len, _len1, _ref, _ref1, _results;
    groupTypeEntries = function(data) {
      var entry, group, groups, i, internalGroupId, series, typeSize, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
      groups = new hx.Map;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        series = data[_i];
        if (!groups.has(series.group)) {
          groups.set(series.group, new hx.List);
        }
        groups.get(series.group).add(series);
      }
      internalGroupId = 0;
      typeSize = groups.size;
      typeSize += groups.has(void 0) ? groups.get(void 0).size - 1 : 0;
      _ref = groups.entries();
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        entry = _ref[_j];
        group = entry[0];
        if (group === "undefined") {
          _ref1 = entry[1].entries();
          for (i = _k = 0, _len2 = _ref1.length; _k < _len2; i = ++_k) {
            series = _ref1[i];
            series.groupId = internalGroupId;
            internalGroupId++;
            series.seriesId = 0;
            series.groupSize = 1;
            series.typeSize = typeSize;
          }
        } else {
          _ref2 = entry[1].entries();
          for (i = _l = 0, _len3 = _ref2.length; _l < _len3; i = ++_l) {
            series = _ref2[i];
            series.groupId = internalGroupId;
            series.seriesId = i;
            series.groupSize = entry[1].size;
            series.typeSize = typeSize;
          }
          internalGroupId++;
        }
        entry;
      }
      return internalGroupId;
    };
    types = new hx.Map;
    _ref = this.series.entries();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      series = _ref[_i];
      if (!types.has(series.type)) {
        types.set(series.type, new hx.List);
      }
      types.get(series.type).add(series);
    }
    _ref1 = types.entries();
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      typeEntry = _ref1[_j];
      _results.push(groupTypeEntries(typeEntry[1].entries()));
    }
    return _results;
  };

  Axis.prototype.preupdateXAxisSvg = function(element) {
    var alpha, alphaDeg, axisGroupSelection, d, domain, getXTicks, s, self, series, set, xLabelTickSize, xmax, xmin, xs;
    self = this;
    switch (this.xScaleType) {
      case 'linear':
        this.xScale = new LinearScale().range(0, this.graph.width);
        break;
      case 'discrete':
        this.xScale = new DiscreteScale(this.xDiscretePadding).range(0, this.graph.width);
        break;
      case 'log':
        this.xScale = new LogScale().range(0, this.graph.width);
        break;
      case 'date':
        this.xScale = new DateScale().range(0, this.graph.width);
    }
    if (this.xScaleType === 'discrete') {
      domain = (function() {
        var _i, _j, _len, _len1, _ref, _ref1;
        if (this.xDiscreteLabels) {
          return this.xDiscreteLabels;
        } else {
          set = new hx.Set;
          _ref = this.series.entries();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            series = _ref[_i];
            _ref1 = series.data;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              d = _ref1[_j];
              set.add(d.x);
            }
          }
          return set.values();
        }
      }).call(this);
      this.xScale.domain(domain);
    } else {
      xs = (function() {
        var _i, _len, _ref, _results;
        _ref = this.series.entries();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          if (s instanceof StraightLineSeries) {
            if (!s.data.dx && !s.data.dy && s.data.x) {
              _results.push([s.data.x, s.data.x]);
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(extent(s.data, function(d) {
              return d.x;
            }));
          }
        }
        return _results;
      }).call(this);
      xs = xs.filter(hx.identity);
      xmin = hx.min(xs.map(function(d) {
        return d[0];
      }));
      xmax = hx.max(xs.map(function(d) {
        return d[1];
      }));
      xmin = this.xMin === 'auto' ? xmin : this.xMin;
      xmax = this.xMax === 'auto' ? xmax : this.xMax;
      if (this.xMin === 'auto') {
        xmin = scalePad(xmin, xmax - xmin, -this.xScalePaddingMin);
      }
      if (this.xMax === 'auto') {
        xmax = scalePad(xmax, xmax - xmin, this.xScalePaddingMax);
      }
      this.xScale.domain(xmin, xmax);
    }
    xLabelTickSize = 0;
    if (this.xVisible) {
      axisGroupSelection = hx.select(element).select('.hx-x-axis');
      alphaDeg = this.xTickRotation;
      alpha = alphaDeg / 180 * Math.PI;
      getXTicks = (function(_this) {
        return function(scale) {
          var _i, _j, _len, _len1, _ref, _ref1;
          if (self.xTicksAll) {
            set = new hx.Set;
            _ref = _this.series.entries();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              series = _ref[_i];
              _ref1 = series.data;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                d = _ref1[_j];
                set.add(d.x);
              }
            }
            return set.values().map(function(d) {
              return [d, scale.apply(d)];
            });
          } else {
            return scale.ticks(self.xTickSpacing);
          }
        };
      })(this);
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        return this.view('.hx-tick', 'g').update(function(tick) {
          return this.view('.hx-tick-text-x', 'text').update(function(t) {
            var bbox, size;
            this.text(self.xFormatter(t));
            bbox = this.node().getBBox();
            size = bbox.height * Math.cos(alpha) + bbox.width * Math.sin(alpha);
            xLabelTickSize = Math.max(xLabelTickSize, size);
            if (alpha === 0) {
              return this.attr("transform", "translate(" + (-bbox.width / 2) + "," + labelOffset + ")").style("dominant-baseline", "hanging");
            } else {
              return this.attr("transform", "translate(0," + labelOffset + ") rotate(" + alphaDeg + ")");
            }
          }).apply(tick[0]);
        }).apply(getXTicks(scale));
      }).apply(this.xScale);
      if (this.xTitle) {
        axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          return d.xTitleHeight = this.text(d.xTitle).height();
        }).apply(this);
        xLabelTickSize += this.xTitleHeight;
      }
      xLabelTickSize += labelOffset + axisPadding;
    }
    return this.xAxisSize = xLabelTickSize;
  };

  Axis.prototype.preupdateYAxisSvg = function(element, totalXAxisSize) {
    var axisGroupSelection, d, domain, group, rmin, s, self, series, set, stackGroups, stackHeight, topSeries, type, types, yLabelTickSize, ymax, ymin, ys, yymax, yymin, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
    self = this;
    rmin = this.graph.height - totalXAxisSize;
    switch (this.yScaleType) {
      case 'linear':
        this.yScale = new LinearScale().range(rmin, 0);
        break;
      case 'discrete':
        this.yScale = new DiscreteScale(this.yDiscretePadding).range(rmin, 0);
        break;
      case 'log':
        this.yScale = new LogScale().range(rmin, 0);
        break;
      case 'date':
        this.yScale = new DateScale().range(rmin, 0);
    }
    if (this.yScaleType === 'discrete') {
      domain = (function() {
        var _i, _j, _len, _len1, _ref, _ref1;
        if (this.yDiscreteLabels) {
          return this.yDiscreteLabels;
        } else {
          set = new hx.Set;
          _ref = this.series.entries();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            series = _ref[_i];
            _ref1 = series.data;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              d = _ref1[_j];
              set.add(d.y);
            }
          }
          return set.values();
        }
      }).call(this);
      this.yScale.domain(domain);
    } else {
      ymin = void 0;
      ymax = void 0;
      types = hx.groupBy(this.series.entries(), function(d) {
        return d.type;
      });
      stackGroups = types.map(function(d) {
        return {
          type: d[0],
          group: hx.groupBy(d[1], function(d) {
            if (supportsGroup(d)) {
              return d.group;
            } else {
              return void 0;
            }
          })
        };
      });
      for (_i = 0, _len = stackGroups.length; _i < _len; _i++) {
        type = stackGroups[_i];
        _ref = type.group;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          group = _ref[_j];
          series = group[1];
          if (group[0] === 'undefined') {
            ys = (function() {
              var _k, _len2, _ref1, _results;
              _ref1 = this.series.entries();
              _results = [];
              for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                s = _ref1[_k];
                if (s instanceof StraightLineSeries) {
                  if (!s.data.dx && !s.data.dy && s.data.y) {
                    _results.push([s.data.y, s.data.y]);
                  } else {
                    _results.push(void 0);
                  }
                } else if (s instanceof BandSeries) {
                  _results.push(extent2(s.data, (function(d) {
                    return d.y1;
                  }), function(d) {
                    return d.y2;
                  }));
                } else {
                  _results.push(extent(s.data, function(d) {
                    return d.y;
                  }));
                }
              }
              return _results;
            }).call(this);
            ys = ys.filter(function(d) {
              return d != null;
            });
            yymin = hx.min(ys.map(function(d) {
              return d[0];
            }));
            yymax = hx.max(ys.map(function(d) {
              return d[1];
            }));
            if (ymin === void 0 || yymin < ymin) {
              ymin = yymin;
            }
            if (ymax === void 0 || yymax > ymax) {
              ymax = yymax;
            }
          } else {
            topSeries = series[series.length - 1];
            if (ymin === void 0) {
              ymin = 0;
            } else {
              ymin = Math.min(ymin, 0);
            }
            if (ymax === void 0) {
              ymax = 0;
            } else {
              ymax = Math.max(ymax, 0);
            }
            _ref1 = topSeries.data;
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              d = _ref1[_k];
              stackHeight = this.getYStack(topSeries.type, topSeries.group, d.x, topSeries.seriesId + 1, this.yScale.domainMin);
              if (ymin === void 0 || stackHeight < ymin) {
                ymin = stackHeight;
              }
              if (ymax === void 0 || stackHeight > ymax) {
                ymax = stackHeight;
              }
            }
          }
        }
      }
      ymin = this.yMin === 'auto' ? ymin : this.yMin;
      ymax = this.yMax === 'auto' ? ymax : this.yMax;
      if (this.yMin === 'auto') {
        ymin = scalePad(ymin, ymax - ymin, -this.yScalePaddingMin);
      }
      if (this.yMax === 'auto') {
        ymax = scalePad(ymax, ymax - ymin, this.yScalePaddingMax);
      }
      this.yScale.domain(ymin, ymax);
    }
    yLabelTickSize = 0;
    if (this.yVisible) {
      axisGroupSelection = hx.select(element).select('.hx-y-axis');
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        return this.view('.hx-tick', 'g').update(function(tick) {
          return this.view('.hx-tick-text-y', 'text').update(function(t) {
            var size;
            size = this.text(self.yFormatter(t)).attr('x', -labelOffset).width();
            if (size > yLabelTickSize) {
              return yLabelTickSize = size;
            }
          }).apply(tick[0]);
        }).apply(scale.ticks(self.yTickSpacing));
      }).apply(this.yScale);
      if (this.yTitle) {
        axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          return d.yTitleHeight = this.text(d.yTitle).attr('transform', 'rotate(90)').width();
        }).apply(this);
        yLabelTickSize += this.yTitleHeight;
      }
      yLabelTickSize += labelOffset + axisPadding;
    }
    return this.yAxisSize = yLabelTickSize;
  };

  Axis.prototype.updateAxisSvg = function(element, xOffset, yOffset, totalXOffset, totalYOffset) {
    var axisGroupSelection, gridSelection, height, self, width;
    self = this;
    width = this.graph.width;
    height = this.graph.height;
    switch (this.xScaleType) {
      case 'linear':
      case 'date':
        this.xScale.range(totalXOffset, width);
        break;
      case 'discrete':
        this.xScale.range(totalXOffset, width);
        break;
      case 'log':
        this.xScale.range(totalXOffset, width);
    }
    switch (this.yScaleType) {
      case 'linear':
      case 'date':
        this.yScale.range(height - totalYOffset, 0);
        break;
      case 'discrete':
        this.yScale.range(height - totalYOffset, 0);
        break;
      case 'log':
        this.yScale.range(height - totalYOffset, 0);
    }
    gridSelection = hx.select(element).select('.hx-axis-grid');
    if (this.xVisible) {
      if (this.xGridLines) {
        gridSelection.view('.hx-vertical-grid-line', 'line').update(function(tick) {
          return this.attr('x1', tick[1]).attr('x2', tick[1]).attr('y1', self.yScale.rangeMax).attr('y2', self.yScale.rangeMin);
        }).apply(this.xScale.ticks(self.xTickSpacing));
      }
      axisGroupSelection = hx.select(element).select('.hx-x-axis').attr("transform", "translate(" + 0 + "," + (height - yOffset - this.xAxisSize) + ")");
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        this.view('.hx-axis-line', 'line').update(function(s) {
          return this.attr('x1', s.rangeMin).attr('x2', s.rangeMax);
        }).apply(scale);
        return this.view('.hx-tick', 'g').update(function(tick, e, i) {
          this.attr("transform", "translate(" + tick[1] + "," + 0 + ")");
          this.view('.hx-tick-line', 'line').update(function(t) {
            return this.attr('y1', 0).attr('y2', tickSize);
          }).apply(this);
          return this.view('.hx-tick-text-x', 'text').update(function(t) {
            return this.text((i % self.xNthTickVisible) === 0 ? self.xFormatter(t) : '');
          }).apply(tick[0]);
        }).apply(scale.ticks(self.xTickSpacing));
      }).apply(this.xScale);
      if (this.xTitle) {
        axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          return this.attr('transform', 'translate(' + ((width + totalXOffset) / 2) + ', ' + (d.xAxisSize - d.xTitleHeight / 2 - axisPadding / 2) + ')').text(self.xTitle);
        }).apply(this);
      }
    }
    if (this.yVisible) {
      if (this.yGridLines) {
        gridSelection.view('.hx-horizontal-grid-line', 'line').update(function(tick) {
          return this.attr('y1', tick[1]).attr('y2', tick[1]).attr('x1', self.xScale.rangeMax).attr('x2', self.xScale.rangeMin);
        }).apply(this.yScale.ticks(self.yTickSpacing));
      }
      axisGroupSelection = hx.select(element).select('.hx-y-axis').attr("transform", "translate(" + (xOffset + this.yAxisSize) + "," + 0 + ")");
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        this.view('.hx-axis-line', 'line').update(function(s) {
          return this.attr('y1', s.rangeMin).attr('y2', s.rangeMax);
        }).apply(scale);
        return this.view('.hx-tick', 'g').update(function(tick, e, i) {
          this.attr("transform", "translate(" + 0 + "," + tick[1] + ")");
          this.view('.hx-tick-line', 'line').update(function(t) {
            return this.attr('x1', -tickSize).attr('x2', 0);
          }).apply(this);
          return this.view('.hx-tick-text-y', 'text').update(function(t) {
            return this.attr('x', -labelOffset).text((i % self.yNthTickVisible) === 0 ? self.yFormatter(t) : '');
          }).apply(tick[0]);
        }).apply(scale.ticks(self.yTickSpacing));
      }).apply(this.yScale);
      if (this.yTitle) {
        return axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          return this.attr('transform', 'translate(' + (-d.yAxisSize + d.yTitleHeight / 2 + axisPadding / 2) + ', ' + ((height - totalYOffset) / 2) + ') rotate(-90)').text(self.yTitle);
        }).apply(this);
      }
    }
  };

  Axis.prototype.updateDataSvg = function(fillLayer, sparseLayer) {
    var fill, i, s, sparse, _i, _len, _ref, _results;
    fill = [];
    sparse = [];
    hx.select(fillLayer).view('.hx-series', 'g').update(function(d, e) {
      return fill.push(e);
    }).apply(this.series.entries());
    hx.select(sparseLayer).view('.hx-series', 'g').update(function(d, e) {
      return sparse.push(e);
    }).apply(this.series.entries());
    _ref = this.series.entries();
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      s = _ref[i];
      _results.push(s.updateSvg(fill[i], sparse[i]));
    }
    return _results;
  };

  Axis.prototype.getLabelPositions = function(x, y) {
    var labels, series;
    labels = hx.flatten((function() {
      var _i, _len, _ref, _results;
      _ref = this.series.entries();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        series = _ref[_i];
        _results.push(series.getLabelMetas(x, y));
      }
      return _results;
    }).call(this));
    return labels.filter(function(d) {
      return d;
    });
  };

  Axis.prototype.getXStack = function(type, group, y, seriesId, start) {
    var j, series, xStack, xs, _i, _len, _ref;
    if (start == null) {
      start = 0;
    }
    if (group) {
      xStack = Math.max(this.xScale.domainMin, 0);
      _ref = this.series.entries();
      for (j = _i = 0, _len = _ref.length; _i < _len; j = ++_i) {
        series = _ref[j];
        if (series.seriesId < seriesId && series.group === group && series.type === type) {
          xs = series.getX(y);
          if (hx.defined(ys)) {
            xStack += xs;
          }
        }
      }
      return xStack;
    } else {
      return Math.max(start, 0);
    }
  };

  Axis.prototype.getYStack = function(type, group, x, seriesId, start) {
    var j, series, yStack, ys, _i, _len, _ref;
    if (start == null) {
      start = 0;
    }
    if (group) {
      yStack = Math.max(this.yScale.domainMin, 0);
      _ref = this.series.entries();
      for (j = _i = 0, _len = _ref.length; _i < _len; j = ++_i) {
        series = _ref[j];
        if (series.seriesId < seriesId && series.group === group && series.type === type) {
          ys = series.getY(x);
          if (hx.defined(ys)) {
            yStack += ys;
          }
        }
      }
      return yStack;
    } else {
      return Math.max(start, 0);
    }
  };

  return Axis;

})();

hx.Axis = Axis;

tickSize = 6;

labelOffset = tickSize + 4;

axisPadding = 4;

Graph = (function() {
  var updateLabels;

  function Graph(selector) {
    var clipPath, defs, id;
    this.selector = selector;
    this.axes = new hx.List;
    id = hx.randomId();
    this.svgTarget = hx.select(this.selector).append("svg").attr('class', 'hx-graph');
    defs = this.svgTarget.append('defs');
    this.axesTarget = this.svgTarget.append('g').attr('class', 'hx-axes');
    this.plotTarget = this.svgTarget.append('g').attr('class', 'hx-plot');
    this.labelTarget = this.svgTarget.append('g').attr('class', 'hx-label');
    clipPath = defs.append('clipPath').attr('id', 'clip-series-' + id);
    this.clipRect = clipPath.append('rect');
    this.plotTarget.attr('clip-path', 'url(#clip-series-' + id + ')');
    this.labelsView = this.labelTarget.view('.hx-plot-label', 'g').update(function(d, element) {
      return d.render(element);
    });
    this.svgTarget.on('pointermove', (function(_this) {
      return function(p) {
        var x, y;
        x = Math.round(p.x - _this.svgTarget.box().left);
        y = Math.round(p.y - _this.svgTarget.box().top);
        return updateLabels.call(_this, x, y);
      };
    })(this));
    this.svgTarget.on('pointerleave', (function(_this) {
      return function(p) {
        return _this.labelsView.apply([]);
      };
    })(this));
  }

  Graph.prototype.addAxis = function() {
    var axis;
    axis = arguments.length >= 2 ? new Axis(arguments[0], arguments[1]) : arguments.length === 1 ? hx.isString(arguments[0]) ? new Axis(arguments[0], arguments[0]) : arguments[0] : new Axis('linear', 'linear');
    axis.graph = this;
    this.axes.add(axis);
    return axis;
  };

  Graph.prototype.removeAxis = function(axis) {
    this.axes.remove(axis);
    return axis.graph = null;
  };

  Graph.prototype.render = function() {
    var enter, hpx, svgHeight, svgWidth, totalX, totalY, wpx, x, y;
    wpx = hx.select(this.selector).style('width');
    hpx = hx.select(this.selector).style('height');
    this.width = Number(wpx.slice(0, -2));
    this.height = Number(hpx.slice(0, -2));
    svgWidth = Number(this.svgTarget.style('width').slice(0, -2));
    svgHeight = Number(this.svgTarget.style('height').slice(0, -2));
    this.svgTarget.attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);
    this.axes.forEach(function(a) {
      return a.tagSeries();
    });
    enter = function(d) {
      var node;
      node = this.append('g')["class"]('hx-axis').node();
      d.setupAxisSvg(node);
      return node;
    };
    totalX = 0;
    this.axesTarget.view('.hx-axis', 'g').enter(enter).update(function(d, element) {
      d.preupdateXAxisSvg(element);
      return totalX += d.xAxisSize;
    }).apply(this.axes.entries());
    totalY = 0;
    this.axesTarget.view('.hx-axis', 'g').enter(enter).update(function(d, element) {
      d.preupdateYAxisSvg(element, totalX);
      return totalY += d.yAxisSize;
    }).apply(this.axes.entries());
    x = 0;
    y = 0;
    this.axesTarget.view('.hx-axis', 'g').enter(enter).update(function(d, element) {
      d.updateAxisSvg(element, y, x, totalY, totalX);
      x += d.xAxisSize;
      return y += d.yAxisSize;
    }).apply(this.axes.entries());
    this.plotArea = {
      x1: y,
      y1: 0,
      x2: this.width,
      y2: this.height - x
    };
    this.plotTarget.view('.hx-axis-data', 'g').enter(function() {
      var g;
      g = this.append('g')["class"]('hx-axis-data');
      g.append('g')["class"]('hx-graph-fill-layer');
      g.append('g')["class"]('hx-graph-sparse-layer');
      return g.node();
    }).update(function(d, element) {
      return d.updateDataSvg(this.select('.hx-graph-fill-layer').node(), this.select('.hx-graph-sparse-layer').node());
    }).apply(this.axes.entries());
    return this.clipRect.attr('x', this.plotArea.x1).attr('y', this.plotArea.y1).attr('width', this.plotArea.x2 - this.plotArea.x1).attr('height', this.plotArea.y2 - this.plotArea.y1);
  };

  updateLabels = function(x, y) {
    var axis, bestDistance, bestMeta, distance, l, labels, singleLabel, xx, yy, _i, _len;
    x = hx.clamp(this.plotArea.x1, this.plotArea.x2, x);
    y = hx.clamp(this.plotArea.y1, this.plotArea.y2, y);
    labels = hx.flatten((function() {
      var _i, _len, _ref, _results;
      _ref = this.axes.entries();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        axis = _ref[_i];
        _results.push(axis.getLabelPositions(x, y));
      }
      return _results;
    }).call(this));
    labels = labels.filter((function(_this) {
      return function(label) {
        var _ref, _ref1;
        return (_this.plotArea.x1 <= (_ref = label.x) && _ref <= _this.plotArea.x2) && (_this.plotArea.y1 <= (_ref1 = label.y) && _ref1 <= _this.plotArea.y2);
      };
    })(this));
    singleLabel = true;
    if (singleLabel) {
      bestMeta = void 0;
      bestDistance = void 0;
      for (_i = 0, _len = labels.length; _i < _len; _i++) {
        l = labels[_i];
        xx = l.x - x;
        yy = l.y - y;
        distance = xx * xx + yy * yy;
        if (bestDistance === void 0 || distance < bestDistance) {
          bestMeta = l;
          bestDistance = distance;
        }
      }
      if (bestMeta) {
        return this.labelsView.apply(boundLabel(bestMeta, this));
      } else {
        return this.labelsView.apply([]);
      }
    } else {
      return this.labelsView.apply(labels.map((function(_this) {
        return function(l) {
          return boundLabel(l, _this);
        };
      })(this)));
    }
  };

  return Graph;

})();

hx.Graph = Graph;

Label = (function() {
  function Label() {
    this.formatters = {};
    this.interpolate = false;
  }

  Label.prototype.render = function(element, meta) {};

  return Label;

})();

LabelMeta = (function() {
  function LabelMeta(labelType, name, x, y) {
    this.labelType = labelType;
    this.name = name;
    this.x = x;
    this.y = y;
    this.values = [];
  }

  LabelMeta.prototype.render = function(element) {
    return this.labelType.render(element, this);
  };

  return LabelMeta;

})();

LinearScale = (function() {
  function LinearScale(domainMin, domainMax, rangeMin, rangeMax) {
    var den;
    this.domainMin = domainMin != null ? domainMin : 0;
    this.domainMax = domainMax != null ? domainMax : 10;
    this.rangeMin = rangeMin != null ? rangeMin : 0;
    this.rangeMax = rangeMax != null ? rangeMax : 10;
    den = this.domainMax - this.domainMin;
    this.factor = den !== 0 ? (this.rangeMax - this.rangeMin) / den : 1;
  }

  LinearScale.prototype.apply = function(v) {
    return this.rangeMin + (v - this.domainMin) * this.factor;
  };

  LinearScale.prototype.inverse = function(v) {
    return this.domainMin + (v - this.rangeMin) / this.factor;
  };

  LinearScale.prototype.domain = function(start, end) {
    var den;
    this.domainMin = start;
    this.domainMax = end;
    den = this.domainMax - this.domainMin;
    this.factor = den !== 0 ? (this.rangeMax - this.rangeMin) / den : 1;
    return this;
  };

  LinearScale.prototype.range = function(start, end) {
    var den;
    this.rangeMin = start;
    this.rangeMax = end;
    den = this.domainMax - this.domainMin;
    this.factor = den !== 0 ? (this.rangeMax - this.rangeMin) / den : 1;
    return this;
  };

  LinearScale.prototype.ticks = function(targetSpacing) {
    var d, domainEnd, domainSpan, domainStart, error, i, niceCount, niceDomainSpacing, targetCount, _i, _results;
    domainSpan = this.domainMax - this.domainMin;
    targetCount = Math.abs(this.rangeMax - this.rangeMin) / targetSpacing;
    niceDomainSpacing = Math.pow(10, Math.floor(Math.log(domainSpan / targetCount) / Math.LN10));
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
    _results = [];
    for (i = _i = 0; 0 <= niceCount ? _i < niceCount : _i > niceCount; i = 0 <= niceCount ? ++_i : --_i) {
      d = domainStart + i * niceDomainSpacing;
      _results.push([d, this.apply(d)]);
    }
    return _results;
  };

  return LinearScale;

})();

DiscreteScale = (function() {
  function DiscreteScale(bandPadding) {
    this.bandPadding = bandPadding != null ? bandPadding : 0.1;
    this.domainCategories = [];
    this.rangeMin = 0;
    this.rangeMax = 10;
  }

  DiscreteScale.prototype.apply = function(v) {
    var i;
    i = this.domainCategories.indexOf(v);
    if (i !== -1) {
      return this.rangeMin + (i / this.domainCategories.length) * (this.rangeMax - this.rangeMin) + this.tickOffset() + this.tickWidth() / 2;
    } else {
      return void 0;
    }
  };

  DiscreteScale.prototype.inverse = function(v) {
    var i;
    i = Math.floor(((v - this.tickOffset()) - this.rangeMin) / (this.rangeMax - this.rangeMin) * this.domainCategories.length);
    if ((0 <= i && i < this.domainCategories.length)) {
      return this.domainCategories[i];
    } else {
      return void 0;
    }
  };

  DiscreteScale.prototype.domain = function(categories) {
    this.domainCategories = categories;
    return this;
  };

  DiscreteScale.prototype.range = function(start, end) {
    this.rangeMin = start;
    this.rangeMax = end;
    return this;
  };

  DiscreteScale.prototype.ticks = function(targetSpacing) {
    var c, _i, _len, _ref, _results;
    if (targetSpacing == null) {
      targetSpacing = 50;
    }
    _ref = this.domainCategories;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      _results.push([c, this.apply(c)]);
    }
    return _results;
  };

  DiscreteScale.prototype.tickWidth = function() {
    return (this.rangeMax - this.rangeMin) / this.domainCategories.length * (1 - this.bandPadding);
  };

  DiscreteScale.prototype.tickOffset = function() {
    return (this.rangeMax - this.rangeMin) / this.domainCategories.length * this.bandPadding / 2;
  };

  return DiscreteScale;

})();

DateScale = (function(_super) {
  __extends(DateScale, _super);

  function DateScale(domainMin, domainMax, rangeMin, rangeMax) {
    this.domainMin = domainMin;
    this.domainMax = domainMax;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    DateScale.__super__.constructor.apply(this, arguments);
  }

  DateScale.prototype.ticks = function(targetSpacing) {
    var checkVal, d, domainEnd, domainSpan, domainStart, error, i, niceCount, niceDomainSpacing, round, targetCount, timeStep, timeSteps, _i, _results;
    timeSteps = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6];
    domainSpan = this.domainMax - this.domainMin;
    checkVal = function(val) {
      var step, _i, _len;
      for (_i = 0, _len = timeSteps.length; _i < _len; _i++) {
        step = timeSteps[_i];
        if (val <= step) {
          return step;
        }
      }
      return 1;
    };
    targetCount = Math.abs(this.rangeMax - this.rangeMin) / targetSpacing;
    niceDomainSpacing = Math.pow(10, Math.floor(Math.log(domainSpan / targetCount) / Math.LN10));
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
    _results = [];
    for (i = _i = 0; 0 <= niceCount ? _i <= niceCount : _i >= niceCount; i = 0 <= niceCount ? ++_i : --_i) {
      d = domainStart + i * niceDomainSpacing;
      _results.push([d, this.apply(d)]);
    }
    return _results;
  };

  return DateScale;

})(LinearScale);

BandSeries = (function(_super) {
  var createLabels, scale;

  __extends(BandSeries, _super);

  scale = function(data, axis) {
    var d, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push({
        x: axis.xScale.apply(d.x),
        y: axis.yScale.apply(d.y)
      });
    }
    return _results;
  };

  function BandSeries() {
    BandSeries.__super__.constructor.apply(this, arguments);
    this.color = hx.color(hx.theme.plot.colors[2]).alpha(0.2).toString();
    this.feather = 200;
  }

  BandSeries.prototype.updateSvg = function(fillLayer) {
    var areas, data, preped, self;
    self = this;
    areas = (function() {
      var _i, _len, _ref, _results;
      _ref = splitAndFeather(this.data, this.feather, function(d) {
        return d.y1 !== void 0 && d.y2 !== void 0;
      });
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        preped = data.map(function(d) {
          return {
            x: d.x,
            y: d.y1
          };
        }).concat(data.reverse().map(function(d) {
          return {
            x: d.x,
            y: d.y2
          };
        }));
        _results.push(svgCurve(scale(preped, this.axis), true));
      }
      return _results;
    }).call(this);
    return hx.select(fillLayer).view('.hx-series-data', 'path', 'hx-series-area').update(function(d) {
      return this.attr('d', d).attr('fill', self.color);
    }).apply(areas);
  };

  BandSeries.prototype.getLabelMetas = function(x, y) {
    var interpolateLabels, lower, upper;
    if (this.label) {
      interpolateLabels = false;
      upper = createLabels(this.label, this.data, this.axis, x, this.color, this, interpolateLabels, function(d) {
        return d.y1;
      });
      lower = createLabels(this.label, this.data, this.axis, x, this.color, this, interpolateLabels, function(d) {
        return d.y2;
      });
      return upper.concat(lower);
    } else {
      return [void 0];
    }
  };

  createLabels = function(label, data, axis, x, color, series, interpolateLabels, f) {
    var i, meta, x1, x2, xx, y1, y2, yy;
    i = inefficientSearch(data, x, !interpolateLabels, function(d) {
      return axis.xScale.apply(d.x);
    });
    if (i !== -1) {
      if (interpolateLabels) {
        if ((0 <= i && i < data.length)) {
          x1 = axis.xScale.apply(data[i].x);
          x2 = axis.xScale.apply(data[i + 1].x);
          y1 = axis.yScale.apply(f(data[i]));
          y2 = axis.yScale.apply(f(data[i + 1]));
          xx = x;
          yy = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
        } else {
          [void 0];
        }
      } else {
        xx = axis.xScale.apply(data[i].x);
        yy = axis.yScale.apply(f(data[i]));
      }
      meta = new LabelMeta(label, series.name, xx, yy);
      meta.color = color;
      meta.values.push({
        name: series.axis.xTitle,
        value: data[i].x,
        formatter: label.formatters[series.axis.xTitle] || series.axis.xFormatter
      });
      meta.values.push({
        name: series.axis.yTitle,
        value: f(data[i]),
        formatter: label.formatters[series.axis.yTitle] || series.axis.yFormatter
      });
      return [meta];
    } else {
      return [void 0];
    }
  };

  return BandSeries;

})(Series);

BarSeries = (function(_super) {
  __extends(BarSeries, _super);

  function BarSeries() {
    BarSeries.__super__.constructor.apply(this, arguments);
    this.color = hx.theme.plot.colors[1];
    this.type = 'bar';
    this.group = void 0;
  }

  BarSeries.prototype.updateSvg = function(fillLayer) {
    var axis, self;
    self = this;
    axis = this.axis;
    return hx.select(fillLayer).view('.hx-series-data', 'rect').update(function(d) {
      var height, width, x, y;
      if (axis.xScaleType === 'discrete') {
        width = axis.xScale.tickWidth() / self.typeSize;
        x = axis.xScale.apply(d.x) - width * self.typeSize / 2 + self.groupId * width;
        height = Math.abs(axis.yScale.apply(d.y) - axis.yScale.apply(0));
        y = axis.yScale.apply(axis.getYStack(self.type, self.group, d.x, self.seriesId));
        if (d.y > 0) {
          y -= height;
        }
      } else {
        width = Math.abs(axis.xScale.apply(d.x) - axis.xScale.apply(0));
        x = axis.xScale.apply(axis.getXStack(self.type, self.group, d.y, self.seriesId));
        height = Math.abs(axis.yScale.tickWidth() / self.typeSize);
        y = axis.yScale.apply(d.y) - height * self.typeSize / 2 + self.groupId * height;
        if (d.y > 0) {
          y -= height;
        }
      }
      return this.attr('class', 'hx-series-data hx-series-bar').attr("y", y).attr("x", x).attr("height", height).attr("width", width).style("fill", d.color || self.color);
    }).apply(this.data);
  };

  BarSeries.prototype.getLabelMetas = function(x, y) {
    var barData, barX, barY, height, max, meta, min, width, xx, yy;
    if (this.label) {
      xx = this.axis.xScale.inverse(x);
      yy = this.axis.yScale.inverse(y);
      barData = hx.find(this.data, function(d) {
        return d.x === xx;
      });
      if (barData) {
        width = this.axis.xScale.tickWidth() / this.typeSize;
        barX = this.axis.xScale.apply(barData.x) - width * this.typeSize / 2 + this.groupId * width;
        height = Math.abs(this.axis.yScale.apply(barData.y) - this.axis.yScale.apply(0));
        barY = this.axis.yScale.apply(this.axis.getYStack(this.type, this.group, barData.x, this.seriesId));
        if (barData.y > 0) {
          barY -= height;
        }
        if ((xx != null) && (yy != null) && (barData != null)) {
          min = Math.min(barY, this.axis.yScale.apply(0));
          max = Math.max(barY, barY + height);
          yy = hx.clamp(min, max, this.axis.yScale.apply(yy));
          meta = new LabelMeta(this.label, this.name, barX + width / 2, yy);
          meta.color = barData.color || this.color;
          meta.values.push({
            name: this.axis.xTitle,
            value: xx,
            formatter: this.label.formatters[this.axis.xTitle] || this.axis.xFormatter
          });
          meta.values.push({
            name: this.axis.yTitle,
            value: barData.y,
            formatter: this.label.formatters[this.axis.yTitle] || this.axis.yFormatter
          });
          return [meta];
        } else {
          return [void 0];
        }
      } else {
        return [void 0];
      }
    } else {
      return [void 0];
    }
  };

  return BarSeries;

})(Series);

updatePath = function(element, _class, data, type, update) {
  return hx.select(element).view('.hx-series-data', 'g').update(function(d) {
    return this.attr('class', 'hx-series-data hx-series-line').view(_class, type).update(update).apply(d);
  }).apply(data);
};

LineSeries = (function(_super) {
  var scale;

  __extends(LineSeries, _super);

  scale = function(data, axis) {
    var d, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push({
        x: axis.xScale.apply(d.x),
        y: axis.yScale.apply(d.y)
      });
    }
    return _results;
  };

  function LineSeries() {
    LineSeries.__super__.constructor.apply(this, arguments);
    this.type = 'line';
    this.stroke = true;
    this.color = hx.theme.plot.colors[0];
    this.fill = false;
    this.fillColor = void 0;
    this.feather = 200;
    this.markers = false;
    this.markerRadius = 2;
    this.markerColor = void 0;
  }

  LineSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
    var applyStack, areas, axis, curves, data, featheredData, fillPreparedData, fillToY, preparedData, self;
    self = this;
    axis = this.axis;
    featheredData = splitAndFeather(this.data, this.feather, function(d) {
      return d.y !== void 0;
    });
    applyStack = function(dataToStack, calculateBaseline) {
      var d, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = dataToStack.length; _i < _len; _i++) {
        d = dataToStack[_i];
        _results.push({
          x: d.x,
          y: axis.getYStack(self.type, self.group, d.x, self.seriesId) + (calculateBaseline ? 0 : d.y)
        });
      }
      return _results;
    };
    if (this.fill) {
      fillToY = Math.max(Math.min(this.axis.yScale.domainMax, 0), this.axis.yScale.domainMin);
      fillPreparedData = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = featheredData.length; _i < _len; _i++) {
          data = featheredData[_i];
          _results.push(applyStack(data).concat(applyStack(data.reverse(), true)));
        }
        return _results;
      })();
      areas = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = fillPreparedData.length; _i < _len; _i++) {
          data = fillPreparedData[_i];
          _results.push(svgCurve(scale(data, this.axis), true));
        }
        return _results;
      }).call(this);
      updatePath(fillLayer, '.hx-series-line-fill', areas, 'path', function(d) {
        return this.attr('d', d).attr('fill', self.fillColor || hx.color(self.color).alpha(0.2).toString('rgba'));
      });
    }
    if (this.stroke) {
      if (this.axis.yScaleType !== 'discrete') {
        curves = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = featheredData.length; _i < _len; _i++) {
            data = featheredData[_i];
            _results.push(svgCurve(scale(applyStack(data), this.axis)));
          }
          return _results;
        }).call(this);
      } else {
        curves = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = featheredData.length; _i < _len; _i++) {
            data = featheredData[_i];
            _results.push(svgCurve(scale(data, this.axis)));
          }
          return _results;
        }).call(this);
      }
      updatePath(sparseLayer, '.hx-series-line-stroke', curves, 'path', function(d) {
        return this.attr('d', d).attr('stroke', self.color);
      });
    }
    if (this.markers) {
      preparedData = this.axis.yScaleType !== 'discrete' ? applyStack(hx.flatten(featheredData)) : hx.flatten(featheredData);
      return updatePath(sparseLayer, '.hx-series-line-markers', scale(preparedData, this.axis), 'circle', function(d) {
        return this.attr('cx', d.x).attr('cy', d.y).attr('r', self.markerRadius).attr('fill', self.markerColor || self.color);
      });
    }
  };

  LineSeries.prototype.getLabelMetas = function(x, y) {
    var baseline, baseline1, baseline2, i, meta, x1, x2, xx, y1, y2, yy;
    if (this.label) {
      i = inefficientSearch(this.data, x, !this.label.interpolate, (function(_this) {
        return function(d) {
          return _this.axis.xScale.apply(d.x);
        };
      })(this));
      if (i !== -1) {
        if (this.label.interpolate) {
          if ((0 <= i && i < this.data.length)) {
            x1 = this.axis.xScale.apply(this.data[i].x);
            x2 = this.axis.xScale.apply(this.data[i + 1].x);
            baseline1 = this.axis.getYStack(this.type, this.group, this.data[i].x, this.seriesId);
            baseline2 = this.axis.getYStack(this.type, this.group, this.data[i + 1].x, this.seriesId);
            y1 = this.axis.yScale.apply(baseline1 + this.data[i].y);
            y2 = this.axis.yScale.apply(baseline2 + this.data[i + 1].y);
            xx = x;
            yy = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
          } else {
            [void 0];
          }
        } else {
          xx = this.axis.xScale.apply(this.data[i].x);
          if (this.axis.yScaleType !== 'discrete') {
            baseline = this.axis.getYStack(this.type, this.group, this.data[i].x, this.seriesId);
            yy = this.axis.yScale.apply(baseline + this.data[i].y);
          } else {
            yy = this.axis.yScale.apply(this.data[i].y);
          }
        }
        meta = new LabelMeta(this.label, this.name, xx, yy);
        meta.color = this.color;
        meta.values.push({
          name: this.axis.xTitle,
          value: this.data[i].x,
          formatter: this.label.formatters[this.axis.xTitle] || this.axis.xFormatter
        });
        meta.values.push({
          name: this.axis.yTitle,
          value: this.data[i].y,
          formatter: this.label.formatters[this.axis.yTitle] || this.axis.yFormatter
        });
        return [meta];
      } else {
        return [void 0];
      }
    } else {
      return [void 0];
    }
  };

  return LineSeries;

})(Series);

ScatterSeries = (function(_super) {
  var filter, scale;

  __extends(ScatterSeries, _super);

  filter = function(data) {
    return data.filter(function(d) {
      return d.x !== void 0 && d.y !== void 0;
    });
  };

  scale = function(data, axis) {
    var d, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push({
        x: axis.xScale.apply(d.x),
        y: axis.yScale.apply(d.y),
        color: d.color,
        size: d.size
      });
    }
    return _results;
  };

  function ScatterSeries() {
    ScatterSeries.__super__.constructor.apply(this, arguments);
    this.color = hx.theme.plot.colors[3];
    this.size = 2;
  }

  ScatterSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
    var self;
    self = this;
    return hx.select(sparseLayer).view('.hx-series-data', 'circle').update(function(d) {
      return this.attr('class', 'hx-series-data hx-series-scatter').attr('cx', d.x).attr('cy', d.y).attr('r', d.size || self.size).style('fill', d.color || self.color);
    }).apply(scale(filter(this.data), this.axis));
  };

  ScatterSeries.prototype.getLabelMetas = function(x, y) {
    var best, bestDistance, d, distance, meta, xx, yy, _i, _len, _ref;
    if (this.label) {
      xx = x;
      yy = y;
      best = void 0;
      bestDistance = 0;
      _ref = filter(this.data);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        distance = (this.axis.xScale.apply(d.x) - xx) * (this.axis.xScale.apply(d.x) - xx) + (this.axis.yScale.apply(d.y) - yy) * (this.axis.yScale.apply(d.y) - yy);
        if (best === void 0 || distance < bestDistance) {
          best = d;
          bestDistance = distance;
        }
      }
      if (best) {
        meta = new LabelMeta(this.label, this.name, this.axis.xScale.apply(best.x), this.axis.yScale.apply(best.y));
        meta.color = best.color || this.color;
        meta.values.push({
          name: this.axis.xTitle,
          value: best.x,
          formatter: this.label.formatters[this.axis.xTitle] || this.axis.xFormatter
        });
        meta.values.push({
          name: this.axis.yTitle,
          value: best.y,
          formatter: this.label.formatters[this.axis.yTitle] || this.axis.yFormatter
        });
        return [meta];
      }
    } else {
      return [void 0];
    }
  };

  return ScatterSeries;

})(Series);

StraightLineSeries = (function(_super) {
  var endpoints;

  __extends(StraightLineSeries, _super);

  function StraightLineSeries() {
    StraightLineSeries.__super__.constructor.apply(this, arguments);
    this.color = hx.theme.plot.colors[4];
  }

  StraightLineSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
    var data, self;
    data = endpoints.call(this);
    if (data) {
      self = this;
      return hx.select(sparseLayer).view('.hx-series-data', 'line').update(function(d) {
        return this["class"]('hx-series-data hx-series-constant').attr('x1', self.axis.xScale.apply(d[0].x)).attr('y1', self.axis.yScale.apply(d[0].y)).attr('x2', self.axis.xScale.apply(d[1].x)).attr('y2', self.axis.yScale.apply(d[1].y)).attr('d', d).attr('stroke', self.color);
      }).apply([data]);
    }
  };

  StraightLineSeries.prototype.getLabelMetas = function(x, y) {
    var dx, dy, meta, xx, yy;
    if (this.label) {
      dx = this.data.dx || 0;
      dy = this.data.dy || 0;
      xx = this.axis.xScale.inverse(x);
      yy = this.axis.yScale.inverse(y);
      if (dx !== 0 && dy !== 0 && (this.data.x != null) && (this.data.y != null)) {
        yy = this.data.y + (xx - this.data.x) * dy / dx;
      } else if (this.data.x != null) {
        xx = this.data.x;
      } else if (this.data.y != null) {
        yy = this.data.y;
      }
      if ((this.axis.xScale.domainMin < xx && xx < this.axis.xScale.domainMax) && (this.axis.yScale.domainMin < yy && yy < this.axis.yScale.domainMax)) {
        meta = new LabelMeta(this.label, this.name, this.axis.xScale.apply(xx), this.axis.yScale.apply(yy));
        meta.color = this.color;
        meta.values.push({
          name: this.axis.xTitle,
          value: xx,
          formatter: this.label.formatters[this.axis.xTitle] || this.axis.xFormatter
        });
        meta.values.push({
          name: this.axis.yTitle,
          value: yy,
          formatter: this.label.formatters[this.axis.yTitle] || this.axis.yFormatter
        });
        return [meta];
      } else {
        return [void 0];
      }
    } else {
      return [void 0];
    }
  };

  endpoints = function() {
    var domX1, domX2, domY1, domY2, domdx, domdy, dx, dy, p1, p2, quotient, t, x, x0, x1, y, y0, y1, _i, _j, _len, _len1, _ref, _ref1, _results, _results1;
    dx = this.data.dx || 0;
    dy = this.data.dy || 0;
    if (dx !== 0 && dy !== 0 && (this.data.x != null) && (this.data.y != null)) {
      x = this.data.x || 0;
      y = this.data.y || 0;
      domX1 = this.axis.xScale.domainMin;
      domX2 = this.axis.xScale.domainMax;
      domY1 = this.axis.yScale.domainMin;
      domY2 = this.axis.yScale.domainMax;
      domdx = x - domX1;
      domdy = y - domY1;
      quotient = domdy * dx - dy * domdx;
      p1 = (function() {
        switch (false) {
          case !(quotient > 0):
            x0 = domX1;
            t = (domX1 - x) / dx;
            y0 = y + t * dy;
            return {
              x: x0,
              y: y0
            };
          case quotient !== 0:
            x0 = domX1;
            y0 = domY1;
            return {
              x: x0,
              y: y0
            };
          case !(quotient < 0):
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
          case !(quotient < 0):
            x1 = domX2;
            t = (domX2 - x) / dx;
            y1 = y + t * dy;
            return {
              x: x1,
              y: y1
            };
          case quotient !== 0:
            x1 = domX2;
            y1 = domY2;
            return {
              x: x1,
              y: y1
            };
          case !(quotient > 0):
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
    } else if (this.data.x != null) {
      _ref = [this.axis.yScale.domainMin, this.axis.yScale.domainMax];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        y = _ref[_i];
        _results.push({
          x: this.data.x,
          y: y
        });
      }
      return _results;
    } else if (this.data.y != null) {
      _ref1 = [this.axis.xScale.domainMin, this.axis.xScale.domainMax];
      _results1 = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        x = _ref1[_j];
        _results1.push({
          x: x,
          y: this.data.y
        });
      }
      return _results1;
    }
  };

  return StraightLineSeries;

})(Series);

PieChart = (function() {
  var calculateTotal, getSegmentSize;

  function PieChart(selector) {
    this.selector = selector;
    this.segmentPadding = 0;
    this.innerPadding = 0;
    this.ringPadding = 0.1;
    this.totalAngle = Math.PI * 2;
    this.startAngle = 0;
    this.color = hx.theme.plot.colors[1];
    this.label = new StandardLabel;
    this.formatter = hx.format.si(2);
  }

  PieChart.prototype.setData = function(data) {
    if (!(data instanceof Array)) {
      return this.data = [data];
    } else {
      return this.data = data;
    }
  };

  calculateTotal = function(segments) {
    var allZero, preTotal, total;
    allZero = false;
    preTotal = hx.sum(segments.map(function(x) {
      return x.size;
    }));
    total = preTotal === 0 ? (allZero = true, segments.length) : hx.sum(segments.map(function(x) {
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

  PieChart.prototype.render = function() {
    var P, approxRingSize, diffX, diffY, enterChart, height, innerRadius, outerRadius, r, radius, ringSize, segmentPadding, selection, self, svgHeight, svgWidth, updateChart, updateRing, updateSegment, width;
    self = this;
    selection = hx.select(this.selector);
    width = selection.width();
    height = selection.height();
    r = Math.min(width, height) / 2;
    this.circle = {
      x: width / 2,
      y: height / 2,
      r: r
    };
    P = Math.PI;
    while (this.startAngle < 0) {
      this.startAngle += 2 * P;
    }
    switch (false) {
      case !(this.totalAngle === P && this.startAngle % (P / 2) === 0):
        switch (false) {
          case !(this.startAngle === 0 || this.startAngle % (2 * P) === 0 || this.startAngle % P === 0):
            r = hx.clamp(0, height / 2, r * 2);
            break;
          case !(this.startAngle % (P * (3 / 2)) === 0 || this.startAngle % (P / 2) === 0):
            r = hx.clamp(0, width / 2, r * 2);
        }
        switch (false) {
          case !(this.startAngle === 0 || this.startAngle % (2 * P) === 0):
            diffX = -r / 2;
            diffY = 0;
            break;
          case this.startAngle % (P * (3 / 2)) !== 0:
            diffX = 0;
            diffY = r / 2;
            break;
          case this.startAngle % P !== 0:
            diffX = r / 2;
            diffY = 0;
            break;
          case this.startAngle % (P / 2) !== 0:
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
    approxRingSize = (r * (1 - this.innerPadding)) / this.data.length + (r * (1 - this.innerPadding) / this.data.length * this.ringPadding / this.data.length);
    segmentPadding = approxRingSize * this.segmentPadding;
    innerRadius = r * this.innerPadding;
    radius = r - innerRadius;
    outerRadius = r;
    ringSize = radius / this.data.length + (radius / this.data.length * this.ringPadding / this.data.length);
    updateSegment = function(size, color, runningTotal, total, ring, count) {
      var end, start, startOffset;
      startOffset = self.startAngle + Math.PI * 1.5;
      start = startOffset + runningTotal / total * self.totalAngle;
      end = startOffset + (runningTotal + size) / total * self.totalAngle;
      return this.attr('d', arcCurve(self.circle.x, self.circle.y, innerRadius + ringSize * ring, innerRadius + ringSize * (ring + 1 - self.ringPadding), start, end, segmentPadding, count)).attr('fill', color);
    };
    updateRing = function(d, e, i) {
      var allZero, runningTotal, segments, total, _ref;
      segments = d.segments;
      runningTotal = 0;
      _ref = calculateTotal(segments), total = _ref.total, allZero = _ref.allZero;
      return this.view('.hx-pie-segment', 'path').update(function(s) {
        var size;
        size = getSegmentSize(s, total, allZero);
        updateSegment.call(this, size, s.color, runningTotal, total, i, segments.length);
        return runningTotal += size;
      }).apply(segments);
    };
    enterChart = function(d) {
      var labelGroup;
      self.svgTarget = this.append('svg')["class"]('hx-graph');
      self.plotTarget = self.svgTarget.append('g')["class"]('hx-plot');
      labelGroup = self.svgTarget.append('g')["class"]('hx-label');
      self.svgTarget.on('pointermove', function(p) {
        var x, y;
        x = Math.round(p.x - selection.box().left);
        y = Math.round(p.y - selection.box().top);
        return self.updateLabels(x, y);
      });
      self.svgTarget.on('pointerleave', function(p) {
        return self.labelsView.apply([]);
      });
      self.labelsView = labelGroup.view('.hx-plot-label', 'g').update(function(d, element) {
        return d.render(element);
      });
      return self.svgTarget.node();
    };
    updateChart = function(d) {
      return this.select('.hx-plot').view('.hx-pie-ring', 'g').update(updateRing).apply(d.data);
    };
    selection.view('.hx-graph', 'svg').enter(enterChart).update(updateChart).apply(this);
    svgWidth = Number(this.svgTarget.style('width').slice(0, -2));
    svgHeight = Number(this.svgTarget.style('height').slice(0, -2));
    return this.svgTarget.attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);
  };

  PieChart.prototype.updateLabels = function(x, y) {
    var a1, a2, allZero, angle, approxRingSize, chosenSegment, chosenSegmentAngleEnd, chosenSegmentAngleMid, chosenSegmentAngleStart, cx, cy, end, height, innerRadius, labelRadius, labelX, labelY, meta, outerRadius, r, radius, ring, ringSize, runningTotal, segment, segmentPadding, selection, size, start, total, whichRing, width, _i, _len, _ref, _ref1;
    if (this.label) {
      selection = hx.select(this.selector);
      width = selection.width();
      height = selection.height();
      r = this.circle.r;
      approxRingSize = (r * (1 - this.innerPadding)) / this.data.length + (r * (1 - this.innerPadding) / this.data.length * this.ringPadding / this.data.length);
      segmentPadding = approxRingSize * this.segmentPadding;
      innerRadius = r * this.innerPadding;
      radius = r - innerRadius;
      outerRadius = r;
      ringSize = radius / this.data.length + (radius / this.data.length * this.ringPadding / this.data.length);
      cx = this.circle.x;
      cy = this.circle.y;
      r = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      if (r < innerRadius || r > outerRadius) {
        this.labelsView.apply([]);
        return;
      }
      whichRing = hx.clamp(0, this.data.length - 1, Math.floor((r + this.ringPadding * ringSize / 2 - innerRadius) / ringSize));
      ring = this.data[whichRing];
      angle = (Math.atan2(y - cy, x - cx) + Math.PI * 0.5) - this.startAngle;
      if (angle < 0) {
        angle += Math.PI * 2;
      }
      chosenSegment = void 0;
      runningTotal = 0;
      _ref = calculateTotal(ring.segments), total = _ref.total, allZero = _ref.allZero;
      _ref1 = ring.segments;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        segment = _ref1[_i];
        size = getSegmentSize(segment, total, allZero);
        a1 = runningTotal / total * this.totalAngle;
        a2 = (runningTotal + size) / total * this.totalAngle;
        start = Math.min(a1, a2);
        end = Math.max(a1, a2);
        if ((start < angle && angle < end)) {
          chosenSegment = segment;
          chosenSegmentAngleStart = start;
          chosenSegmentAngleEnd = end;
          chosenSegmentAngleMid = (end - start) / 2 + start - (Math.PI / 2) + this.startAngle;
          break;
        }
        runningTotal += size;
      }
      if (chosenSegment) {
        labelRadius = (ringSize * whichRing) + ((radius / this.data.length) / 2) + innerRadius;
        labelX = cx + (labelRadius * Math.cos(chosenSegmentAngleMid));
        labelY = cy + (labelRadius * Math.sin(chosenSegmentAngleMid));
        meta = new LabelMeta(this.label, ring.name, labelX, labelY);
        meta.color = chosenSegment.color || this.color;
        meta.values.push({
          name: chosenSegment.name,
          value: segment.size,
          formatter: this.label.formatters[ring.name] || this.formatter
        });
        return this.labelsView.apply(meta);
      } else {
        return this.labelsView.apply([]);
      }
    }
  };

  return PieChart;

})();

hx.PieChart = PieChart;

StandardLabel = (function(_super) {
  __extends(StandardLabel, _super);

  function StandardLabel() {
    StandardLabel.__super__.constructor.apply(this, arguments);
  }

  StandardLabel.prototype.render = function(element, meta) {
    var padding, prepareBox, updateBox, updateContainer, updateDividers, updateHeaderText, updateProp, updateValues;
    padding = 5;
    hx.select(element).view('.hx-plot-label-marker', 'circle').update(function(d) {
      return this.attr('cx', d.x).attr('cy', d.y).attr('r', 4).attr('fill', d.color).attr('stroke', 'white').attr('stroke-width', 3);
    }).apply(meta);
    prepareBox = function() {
      return this.view('.hx-plot-label-box', 'rect').apply(1);
    };
    updateBox = function(d, width, height) {
      return this.view('.hx-plot-label-box', 'rect').update(function(d) {
        return this.attr('width', width).attr('height', height).attr('rx', 1).attr('ry', 1);
      }).apply(d);
    };
    updateDividers = function(d, start, end) {
      return this.view('.hx-plot-label-divider', 'line').update(function(d) {
        return this.attr('x1', start).attr('y1', d).attr('x2', end).attr('y2', d);
      }).apply(d);
    };
    updateProp = function(selector, text, xoffset, yoffset) {
      this.view(selector, 'text').update(function(d) {
        return this.text(d).attr('x', xoffset).attr('y', yoffset);
      }).apply(text);
      return this.select(selector).map(function(node) {
        return node.getComputedTextLength();
      });
    };
    updateHeaderText = function(d, x, y) {
      var width;
      this.view('.hx-plot-label-header', 'text').update(function(d) {
        return this.text(d).attr('x', x + padding).attr('y', y + padding);
      }).apply(d.name);
      width = this.select('text').map(function(node) {
        return node.getComputedTextLength();
      });
      return {
        width: width + padding * 2,
        height: 12 + padding * 2
      };
    };
    updateValues = function(d, x, y) {
      var headerHeight, keyHeight, maxKeyWidth, maxValueWidth, xoffset, yoffset;
      xoffset = x + padding;
      yoffset = y;
      maxKeyWidth = 0;
      keyHeight = 0;
      this.view('.hx-plot-label-keys', 'g').update(function(d) {
        var keyWidth;
        keyWidth = updateProp.call(this, '.hx-plot-label-key', d.name, xoffset, yoffset + padding);
        yoffset += 12 + padding * 2;
        keyHeight += 12 + padding * 2;
        return maxKeyWidth = Math.max(keyWidth, maxKeyWidth);
      }).apply(d.values);
      xoffset = x + padding * 3 + maxKeyWidth;
      yoffset = y;
      maxValueWidth = 0;
      headerHeight = 0;
      this.view('.hx-plot-label-values', 'g').update(function(d) {
        var keyWidth;
        keyWidth = updateProp.call(this, '.hx-plot-label-value', d.formatter(d.value), xoffset, yoffset + padding);
        yoffset += 12 + padding * 2;
        headerHeight += 12 + padding * 2;
        return maxValueWidth = Math.max(keyWidth, maxValueWidth);
      }).apply(d.values);
      return {
        width: maxKeyWidth + maxValueWidth + padding * 4,
        height: Math.max(keyHeight, headerHeight)
      };
    };
    updateContainer = function(d) {
      var dividers, headerHeight, headerWidth, height, valuesHeight, valuesWidth, width, x, xoff, yoff, _ref, _ref1;
      prepareBox.call(this);
      _ref = updateHeaderText.call(this, d, 0, 0), width = _ref.width, height = _ref.height;
      headerWidth = width;
      headerHeight = height;
      _ref1 = updateValues.call(this, d, 0, 0 + headerHeight), width = _ref1.width, height = _ref1.height;
      valuesWidth = width;
      valuesHeight = height;
      width = Math.max(headerWidth, valuesWidth);
      height = headerHeight + valuesHeight;
      updateBox.call(this, d, width, height);
      dividers = (function() {
        var _i, _ref2, _results;
        _results = [];
        for (x = _i = 0, _ref2 = d.values.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; x = 0 <= _ref2 ? ++_i : --_i) {
          _results.push(headerHeight + (x * (12 + padding * 2)));
        }
        return _results;
      })();
      updateDividers.call(this, dividers, 0, width);
      if (d.bounding) {
        xoff = d.x + 10 + width > d.bounding.x2 ? d.x - width - 10 : Math.max(d.x + 10, d.bounding.x1);
        yoff = Math.max(Math.min(d.bounding.y2 - height / 2, d.y), d.bounding.y1 + height / 2) - height / 2;
      } else {
        xoff = d.x + 10;
        yoff = d.y - height / 2;
      }
      return this.attr('transform', 'translate(' + xoff + ', ' + yoff + ')');
    };
    return hx.select(element).view('.hx-plot-label-container', 'g').update(updateContainer).apply(meta);
  };

  return StandardLabel;

})(Label);

hx.StandardLabel = StandardLabel;

pie = function(selector, data) {};

graph = function(selector, data) {
  var axis, axisData, series, seriesData, _i, _j, _len, _len1, _ref, _ref1;
  graph = new hx.Graph(selector);
  _ref = data.axes;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    axisData = _ref[_i];
    axis = graph.addAxis(axisData.xType || 'linear', axisData.yType || 'linear');
    ['xTitle', 'yTitle', 'xMin', 'xMax', 'yMin', 'yMax', 'xScalePaddingMax', 'xScalePaddingMin', 'yScalePaddingMax', 'yScalePaddingMin', 'xFormatter', 'yFormatter'].forEach(function(p) {
      if (hx_defined(axisData[p])) {
        return axis[p] = axisData[p];
      }
    });
    _ref1 = axisData.series;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      seriesData = _ref1[_j];
      series = axis.addSeries(seriesData.type || 'line', seriesData.name);
      series.setData(seriesData.data);
      series.color = seriesData.color;
      series.label.interpolate = seriesData.label.interpolate;
      series.group = seriesData.group;
      series.fill = seriesData.fill;
      series.fillColor = seriesData.fillColor;
      series.markers = seriesData.markers;
      series.markerColor = seriesData.markerColor;
      series.markerRadius = seriesData.markerRadius || 2;
    }
  }
  graph.render();
  return graph;
};

plot = function(selector, data) {
  switch (data.type) {
    case 'pie':
      return pie(selector, data);
    default:
      return graph(selector, data);
  }
};

hx.plot = plot;

})();

// preferences
(function(){
var UserPreferences, loadPreferences, localeList, preferences,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

localeList = [
  {
    code: "af",
    full: "Afrikaans"
  }, {
    code: "sq",
    full: "Albanian"
  }, {
    code: "ar",
    full: "Arabic"
  }, {
    code: "ar-ma",
    full: "Arabic (Morocco)"
  }, {
    code: "ar-sa",
    full: "Arabic (Saudi Arabia)"
  }, {
    code: "ar-tn",
    full: "Arabic (Tunisia)"
  }, {
    code: "hy-am",
    full: "Armenian"
  }, {
    code: "az",
    full: "Azerbaijani"
  }, {
    code: "id",
    full: "Bahasa Indonesia"
  }, {
    code: "ms-my",
    full: "Bahasa Malayu"
  }, {
    code: "eu",
    full: "Basque"
  }, {
    code: "be",
    full: "Belarusian"
  }, {
    code: "bn",
    full: "Bengali"
  }, {
    code: "bs",
    full: "Bosnian"
  }, {
    code: "br",
    full: "Breton"
  }, {
    code: "bg",
    full: "Bulgarian"
  }, {
    code: "my",
    full: "Burmese"
  }, {
    code: "ca",
    full: "Catalan"
  }, {
    code: "zh-cn",
    full: "Chinese"
  }, {
    code: "zh-tw",
    full: "Chinese (Traditional)"
  }, {
    code: "cv",
    full: "Chuvash"
  }, {
    code: "hr",
    full: "Croatian"
  }, {
    code: "cs",
    full: "Czech"
  }, {
    code: "da",
    full: "Danish"
  }, {
    code: "nl",
    full: "Dutch"
  }, {
    code: "en",
    full: "English (US)"
  }, {
    code: "en-au",
    full: "English (Australia)"
  }, {
    code: "en-ca",
    full: "English (Canada)"
  }, {
    code: "en-gb",
    full: "English"
  }, {
    code: "eo",
    full: "Esperanto"
  }, {
    code: "et",
    full: "Estonian"
  }, {
    code: "fo",
    full: "Farose"
  }, {
    code: "fi",
    full: "Finnish"
  }, {
    code: "fr",
    full: "French"
  }, {
    code: "fr-ca",
    full: "French (Canada)"
  }, {
    code: "fy",
    full: "Frisian"
  }, {
    code: "gl",
    full: "Galician"
  }, {
    code: "ka",
    full: "Georgian"
  }, {
    code: "de",
    full: "German"
  }, {
    code: "de-at",
    full: "German (Austria)"
  }, {
    code: "el",
    full: "Greek"
  }, {
    code: "he",
    full: "Hebrew"
  }, {
    code: "hi",
    full: "Hindi"
  }, {
    code: "hu",
    full: "Hungarian"
  }, {
    code: "is",
    full: "Icelandic"
  }, {
    code: "it",
    full: "Italian"
  }, {
    code: "ja",
    full: "Japanese"
  }, {
    code: "km",
    full: "Khmer (Cambodia)"
  }, {
    code: "ko",
    full: "Korean"
  }, {
    code: "lv",
    full: "Latvian"
  }, {
    code: "lt",
    full: "Lithuanian"
  }, {
    code: "lb",
    full: "Luxembourgish"
  }, {
    code: "mk",
    full: "Macedonian"
  }, {
    code: "ml",
    full: "Malayalam"
  }, {
    code: "mr",
    full: "Marathi"
  }, {
    code: "ne",
    full: "Nepalese"
  }, {
    code: "nb",
    full: "Norwegian"
  }, {
    code: "nn",
    full: "Norwegian Nynorsk"
  }, {
    code: "fa",
    full: "Persian"
  }, {
    code: "pl",
    full: "Polish"
  }, {
    code: "pt",
    full: "Portuguese"
  }, {
    code: "pt-br",
    full: "Portuguese (Brazil)"
  }, {
    code: "ro",
    full: "Romanian"
  }, {
    code: "ru",
    full: "Russian"
  }, {
    code: "sr",
    full: "Serbian"
  }, {
    code: "sr-cyrl",
    full: "Serbian Cyrillic"
  }, {
    code: "sk",
    full: "Slovak"
  }, {
    code: "sl",
    full: "Slovenian"
  }, {
    code: "es",
    full: "Spanish"
  }, {
    code: "sv",
    full: "Swedish"
  }, {
    code: "tl-ph",
    full: "Tagalog (Filipino)"
  }, {
    code: "tzm",
    full: "TamaziÉ£t"
  }, {
    code: "tzm-latn",
    full: "TamaziÉ£t Latin"
  }, {
    code: "ta",
    full: "Tamil"
  }, {
    code: "th",
    full: "Thai"
  }, {
    code: "bo",
    full: "Tibetan"
  }, {
    code: "tr",
    full: "Turkish"
  }, {
    code: "uk",
    full: "Ukrainian"
  }, {
    code: "uz",
    full: "Uzbek"
  }, {
    code: "vi",
    full: "Vietnamese"
  }, {
    code: "cy",
    full: "Welsh"
  }
];

preferences = void 0;

loadPreferences = function() {
  return preferences != null ? preferences : preferences = [
    {
      name: 'Time Zone',
      type: 'Text',
      options: {
        key: 'timeZone',
        required: true,
        autoCompleteData: typeof moment !== "undefined" && moment !== null ? moment.tz.names() : void 0,
        autoCompleteOptions: {
          mustMatch: true,
          showOtherResults: true
        }
      }
    }, {
      name: 'Locale',
      type: 'Text',
      options: {
        key: 'locale',
        required: true,
        autoCompleteData: [],
        autoCompleteOptions: {
          mustMatch: true,
          showOtherResults: true,
          renderer: function(elem, item) {
            return elem = hx.select(elem).text("" + item.full + " - (" + item.code + ")");
          },
          inputMap: function(item) {
            return item.code;
          },
          filter: function(array, term) {
            var options;
            options = {
              searchValues: function(item) {
                return [item.full, item.code];
              }
            };
            array = hx.filter.contains(array, term, options);
            array = array.sort(function(a, b) {
              if (!a.disabled && b.disabled) {
                return -1;
              } else if (a.disabled && !b.disabled) {
                return 1;
              } else {
                return hx.sort.compare(a.full, b.full);
              }
            });
            return array;
          }
        }
      }
    }
  ];
};

UserPreferences = (function(_super) {
  var checkChanged, setupModal;

  __extends(UserPreferences, _super);

  function UserPreferences() {
    UserPreferences.__super__.constructor.apply(this, arguments);
    this._ = {};
    this.supportedLocales = localeList.slice();
  }

  setupModal = function(elem, data, userPreferences) {
    var form, node;
    node = document.createElement('form');
    hx.select(node).style('display', 'block');
    form = new hx.Form(node).on('submit', function(formData) {
      var savingLoading;
      savingLoading = hx.notify().loading('Saving preferences...');
      return userPreferences.setPreferences(formData, function(error, result) {
        savingLoading.close();
        if (error != null) {
          return hx.notify().error('Preferences were not saved successfully');
        } else {
          hx.notify().info('Preferences were saved successfully', 'fa fa-check');
          return userPreferences._.modal.close();
        }
      });
    });
    loadPreferences().forEach(function(pref) {
      var _ref;
      if (pref.name === 'Locale' && ((_ref = userPreferences.supportedLocales) != null ? _ref.length : void 0) > 0) {
        pref.options.autoCompleteData = localeList.map(function(d) {
          d.disabled = userPreferences.supportedLocales.some(function(e) {
            return e === d.code;
          }) ? false : true;
          return d;
        });
        return form['add' + pref.type](pref.name, pref.options);
      } else if (pref.name !== 'Locale') {
        if (pref.type === 'Radio' || pref.type === 'Select') {
          return form['add' + pref.type](pref.name, pref.values, pref.options);
        } else {
          return form['add' + pref.type](pref.name, pref.options);
        }
      }
    });
    form.addSubmit('Submit', 'fa fa-check');
    form.fill(data);
    return elem.appendChild(node);
  };

  UserPreferences.prototype.show = function() {
    var loading, self, _;
    _ = this._;
    if (!_.modal) {
      self = this;
      loading = hx.notify().loading("Getting preferences...");
      this.getPreferences(function(error, data) {
        loading.close();
        if (error) {
          return hx.notify().error('');
        } else {
          _.modal = new hx.Modal('Settings', function(elem) {
            return setupModal(elem, data, self);
          });
          _.modal.show();
          return _.modal.on('close', function() {
            return _.modal = void 0;
          });
        }
      });
    }
    return void 0;
  };

  UserPreferences.prototype.hide = function() {
    if (this._.modal) {
      this._.modal.close();
    }
    return void 0;
  };

  checkChanged = function(error, data, cb) {
    var newPrefString, prefString;
    prefString = JSON.stringify(this._.preferences);
    newPrefString = JSON.stringify(data);
    if (prefString !== newPrefString) {
      this._.preferences = data;
      this.emit('change', this._.preferences);
    }
    if (typeof cb === "function") {
      cb(error, hx.merge(true, this._.preferences));
    }
    return void 0;
  };

  UserPreferences.prototype.getPreferences = function(cb) {
    var data, prefs;
    data = (prefs = localStorage.getItem('preferences')) ? JSON.parse(prefs) : void 0;
    return checkChanged.call(this, void 0, data, cb);
  };

  UserPreferences.prototype.setPreferences = function(data, cb) {
    localStorage.setItem('preferences', JSON.stringify(data));
    return checkChanged.call(this, void 0, data, cb);
  };

  UserPreferences.prototype.clearPreferences = function() {
    localStorage.removeItem('preferences');
    this._.preferences = void 0;
    return void 0;
  };

  UserPreferences.prototype.getLocaleList = function() {
    return localeList.slice();
  };


  /* XXX: server-side storage (global)
  getPreferences: (cb) ->
    id = 'USERID' # XXX: implement method of getting user id
    file =
      url:
      data: @preferences

    hx.json 'SERVER_URL' + id, (error, response) =>
      checkChanged.call this, data, cb

  setPreferences: (data, cb) ->
    id = 'USERID' # XXX: implement method of getting user id
    file =
      url: 'SERVER_URL' + id
      data: JSON.stringify(data)

    hx.xhr 'PUT', file, 'application/json', (error, response) =>
      if error?
        cb? error, @preferences
      else
        checkChanged.call this, data, cb
   */

  return UserPreferences;

})(hx.EventEmitter);

hx.preferences = new UserPreferences;

})();

// progress-bar
(function(){
var ProgressBar;

ProgressBar = (function() {
  function ProgressBar(selector) {
    this.selection = hx.select(selector).classed('hx-progress-bar', true);
    this.innerBar = this.selection.append('div').attr('class', 'hx-progress-bar-inner');
    this.setProgress(0);
  }

  ProgressBar.prototype.setProgress = function(value) {
    if (!isNaN(value)) {
      this.progress = Math.max(0, Math.min(1, value));
      return this.innerBar.style('width', (this.progress * 100) + '%');
    }
  };

  ProgressBar.prototype.getProgress = function() {
    return this.progress;
  };

  return ProgressBar;

})();

hx.ProgressBar = ProgressBar;

})();

// search-dom
(function(){
var clearSearch, searchDOM;

searchDOM = function(selector, string, callback, options) {
  var findString, found, foundNodes, hideAll, highlightStr, makeVis, makeVisible, regex, removeHighlights, root;
  if (selector == null) {
    selector = 'body';
  }
  if (options == null) {
    options = {};
  }
  hideAll = function(cb) {
    root.selectAll('.hx-opened').each(function(elem) {
      var hxObj, _ref;
      hxObj = hx.select.getHexagonElementDataObject(elem, false);
      return hxObj != null ? (_ref = hxObj.widget) != null ? _ref.hide(false) : void 0 : void 0;
    });
    return typeof cb === "function" ? cb() : void 0;
  };
  highlightStr = function(match) {
    found += 1;
    return '<span class="hx-highlight-selected">' + match + '</span>';
  };
  removeHighlights = function(rootElem, cb) {
    rootElem.selectAll('.hx-highlighted-content').each(function(elem) {
      var children, textNode;
      children = elem.childNodes;
      textNode = document.createTextNode(elem.textContent);
      return elem.parentNode.replaceChild(textNode, elem);
    });
    return typeof cb === "function" ? cb() : void 0;
  };
  makeVis = function(child, node) {
    var hxObj, _ref;
    if (node == null) {
      node = child;
    }
    if (child.offsetParent === null && ((node != null ? node.parentNode : void 0) != null)) {
      hxObj = hx.select.getHexagonElementDataObject(node, false);
      if (hxObj != null) {
        if ((_ref = hxObj.widget) != null) {
          if (typeof _ref.show === "function") {
            _ref.show(false, child);
          }
        }
      }
      return makeVis(child, node.parentNode);
    }
  };
  makeVisible = function(start, node) {
    var i;
    i = start;
    start = foundNodes.length < 50 ? foundNodes.length : (start * 1) + 10;
    while (i < start && i < foundNodes.length) {
      makeVis(foundNodes[i]);
      i += 1;
    }
    if (i < foundNodes.length) {
      setTimeout((function() {
        return makeVisible(i);
      }), 150);
    }
    return void 0;
  };
  findString = function(elem) {
    var child, children, newNode, strFound, _i, _len, _ref;
    if (strFound = ((_ref = elem.textContent) != null ? _ref.search(regex) : void 0) > -1) {
      if (elem.nodeName === '#text') {
        newNode = hx.detached('span')["class"]('hx-highlighted-content').node();
        newNode.innerHTML = elem.data.replace(regex, highlightStr);
        elem.parentNode.replaceChild(newNode, elem);
        if (newNode.offsetParent === null && ((newNode != null ? newNode.parentNode : void 0) != null)) {
          foundNodes.push(newNode);
        }
      } else {
        if (typeof options.elemMatch === "function") {
          options.elemMatch(elem, true);
        }
        children = elem.childNodes;
        if (children.length > 0) {
          for (_i = 0, _len = children.length; _i < _len; _i++) {
            child = children[_i];
            findString(child);
          }
        }
      }
    } else if (elem.nodeName !== '#text') {
      if (typeof options.elemMatch === "function") {
        options.elemMatch(elem, false);
      }
    }
    return void 0;
  };
  root = hx.select(selector);
  root.style('min-height', root.style('height'));
  foundNodes = [];
  found = 0;
  if ((string != null) && string.length > 0) {
    string = string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    regex = new RegExp(string, 'ig');
    hideAll(function() {
      return removeHighlights(root, function() {
        if (string.length >= (options.minLength || 2)) {
          findString(root.node());
          if (typeof callback === "function") {
            callback(found);
          }
        } else {
          if (typeof callback === "function") {
            callback();
          }
        }
        if (foundNodes.length > 0) {
          return setTimeout((function() {
            return makeVisible(0);
          }), 0);
        }
      });
    });
  } else {
    hideAll(function() {
      return removeHighlights(root, function() {
        return typeof callback === "function" ? callback() : void 0;
      });
    });
  }
  setTimeout(function() {
    return root.style('min-height', '');
  }, 10);
  return void 0;
};

clearSearch = function(selector) {
  if (selector == null) {
    selector = 'body';
  }
  return searchDOM(selector);
};

hx.searchDOM = searchDOM;

hx.clearSearch = clearSearch;

})();

// tabs
(function(){
var Tabs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tabs = (function(_super) {
  var onTabSelected;

  __extends(Tabs, _super);

  function Tabs(selector) {
    var self;
    this.selector = selector;
    Tabs.__super__.constructor.apply(this, arguments);
    this.selected = -1;
    self = this;
    hx.select(this.selector).selectAll('.hx-tab').each(function(node, i) {
      return hx.select(node).on('click', function() {
        return onTabSelected(self, node, i);
      });
    });
    this.select(0);
  }

  onTabSelected = function(tabs, element, i) {
    tabs.selected = i;
    hx.select(tabs.selector).selectAll('.hx-tab').classed('hx-tab-active', false);
    hx.select(element).classed('hx-tab-active', true);
    hx.select(tabs.selector).selectAll('.hx-tab-content').classed('hx-tab-content-hidden', true);
    hx.select('#' + hx.select(element).attr('data-content')).classed('hx-tab-content-hidden', false);
    return tabs.emit('change', {
      id: i
    });
  };

  Tabs.prototype.select = function(i, force) {
    var tab;
    if (this.selected !== i || force) {
      tab = hx.select(this.selector).selectAll('.hx-tab').nodes[i];
      return onTabSelected(this, tab, i);
    }
  };

  return Tabs;

})(hx.EventEmitter);

hx.Tabs = Tabs;

})();

// time-slider
(function(){
var TimeSlider,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TimeSlider = (function(_super) {
  var maybeConvertDate, zeroPad;

  __extends(TimeSlider, _super);

  maybeConvertDate = function(slider, value) {
    if (value instanceof Date) {
      return (value.getTime() - slider.start) / (slider.end - slider.start);
    } else {
      return value;
    }
  };

  function TimeSlider(selector, type, render) {
    var start;
    start = new Date();
    start.setMilliseconds(0);
    start.setMinutes(0);
    start.setHours(0);
    this.start = start.getTime();
    this.end = new Date(this.start + 24 * 60 * 60 * 1000 - 1);
    if (render == null) {
      render = function(slider, elem, value, update, rangeStart) {
        return hx.select(elem).text(slider.formatter(slider.valueToDate(value)));
      };
    }
    TimeSlider.__super__.constructor.call(this, selector, type, render);
  }

  TimeSlider.prototype.valueToDate = function(value) {
    return new Date(this.start + (this.end - this.start) * value);
  };

  TimeSlider.prototype.formatter = typeof moment !== "undefined" && moment !== null ? function(date) {
    return moment(date).format('HH:mm');
  } : (zeroPad = hx.format.zeroPad(2), function(date) {
    return zeroPad(date.getHours()) + ':' + zeroPad(date.getMinutes());
  });

  TimeSlider.prototype.setRange = function(startDate, endDate) {
    this.start = startDate.getTime();
    this.end = endDate.getTime();
    sliderRefresh(this);
    return this;
  };

  TimeSlider.prototype.setValue = function(value) {
    return TimeSlider.__super__.setValue.call(this, maybeConvertDate(this, value));
  };

  TimeSlider.prototype.setRangeStartValue = function(value) {
    return TimeSlider.__super__.setRangeStartValue.call(this, maybeConvertDate(this, value));
  };

  TimeSlider.prototype.setRangeEndValue = function(value) {
    return TimeSlider.__super__.setRangeEndValue.call(this, maybeConvertDate(this, value));
  };

  TimeSlider.prototype.getValue = function() {
    return new Date(this.start + (this.end - this.start) * this.value);
  };

  TimeSlider.prototype.getRangeStartValue = function() {
    return new Date(this.start + (this.end - this.start) * this.rangeStartValue);
  };

  TimeSlider.prototype.getRangeEndValue = function() {
    return new Date(this.start + (this.end - this.start) * this.rangeEndValue);
  };

  return TimeSlider;

})(hx.Slider);

hx.TimeSlider = TimeSlider;

})();

// titlebar
(function(){
var TitleBar;

TitleBar = (function() {
  var setVisibility;

  function TitleBar(selector) {
    var hasLinkBar, isFixed, isFullScreen;
    this.selector = selector;
    this.isMobileFriendly = hx.select(this.selector).select(".hx-titlebar-menu-icon-mobile").size() > 0;
    hasLinkBar = hx.select(this.selector).select(".hx-titlebar-linkbar").size() > 0;
    isFixed = hx.select('body').classed('hx-titlebar-fixed');
    isFullScreen = hx.select('body').classed('hx-full-screen');
    if (this.isMobileFriendly) {
      hx.select(this.selector).select(".hx-titlebar-menu-icon-mobile").on('click', (function(_this) {
        return function() {
          return setVisibility.call(_this, !_this.visible, true);
        };
      })(this));
      this.visible = true;
      setVisibility.call(this, false, false);
    }
    if (hasLinkBar && (isFixed || isFullScreen)) {
      hx.select("body").classed('hx-titlebar-link-padding', true);
    }
  }

  setVisibility = function(show, animate) {
    var animateTitlebar;
    if (animate == null) {
      animate = true;
    }
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
          return elem.style('height', '0px').morph()["with"]('expand', 150).go();
        }
      } else {
        if (animate) {
          return elem.morph()["with"]('collapse', 50).then(function() {
            return elem.classed('hx-titlebar-mobile-hide', true);
          }).thenStyle('display', '').go();
        } else {
          return elem.classed('hx-titlebar-mobile-hide', true);
        }
      }
    };
    animateTitlebar(hx.select(this.selector).selectAll('.hx-titlebar-menu-icons'));
    return animateTitlebar(hx.select(this.selector).selectAll('.hx-titlebar-linkbar'));
  };

  TitleBar.prototype.show = function(animate) {
    return setVisibility.call(this, true, animate);
  };

  TitleBar.prototype.hide = function(animate) {
    return setVisibility.call(this, false, animate);
  };

  TitleBar.prototype.setActive = function(id) {
    var selection;
    selection = hx.selectAll('.hx-titlebar-link').classed('hx-selected', false);
    if (id != null) {
      if (hx.isString(id)) {
        return hx.select(id).classed('hx-selected', true);
      } else {
        return hx.select(selection.node(id)).classed('hx-selected', true);
      }
    }
  };

  return TitleBar;

})();

hx.TitleBar = TitleBar;

if (hx.select('.hx-heading').size() > 0) {
  hx.titlebar = new hx.TitleBar('.hx-heading');
}

})();

// tree
(function(){
var Tree;

Tree = (function() {
  var format, recurseUpTree;

  format = function(element, hideDisabledButtons, animate) {
    var elem, expand, formatIcon, innerElem, newElem, parent, selection, showDisabled;
    expand = (function(_this) {
      return function(iconElement) {
        var display, selection;
        selection = hx.select(element).select('.hx-tree-node-children');
        display = selection.style('display') === 'none' ? 'block' : 'none';
        selection.style('display', display);
        return formatIcon(iconElement, true);
      };
    })(this);
    formatIcon = (function(_this) {
      return function(iconElement, animate) {
        var children, open;
        children = hx.select(element).select('.hx-tree-node-children');
        if (!children.selectAll('.hx-tree-node').empty()) {
          open = children.style('display') === 'block';
          hx.select(element).classed('hx-tree-node-open', open);
          if (animate) {
            return hx.select(iconElement).select('i').morph().then(open ? 'rotate-90' : 'rotate-0').go(true);
          }
        }
      };
    })(this);
    showDisabled = hx.select(element.parentNode).selectAll('.hx-tree-node').select('.hx-tree-node-children').selectAll('.hx-tree-node').size() > 0;
    showDisabled = hideDisabledButtons ? false : showDisabled;
    if (hx.select(element).select('.hx-tree-node-children').selectAll('.hx-tree-node').size() > 0 || showDisabled) {
      innerElem = hx.select(element).select('.hx-tree-node-parent');
      if (innerElem.size() > 0) {
        return innerElem.view('.hx-tree-node-parent-icon').enter(function() {
          var selection;
          selection = this.append('div');
          selection.attr('class', 'hx-tree-node-parent-icon').append('i').attr('class', 'fa fa-chevron-right hx-tree-node-state-icon');
          return selection.node();
        }).update(function(d, node) {
          this.on('click', function() {
            return expand(node);
          });
          return formatIcon(node, animate);
        }).apply(this);
      } else {
        parent = hx.select(element);
        elem = parent.select(".hx-tree-node-content").node();
        newElem = parent.append("div").attr("class", "hx-tree-node-parent").node();
        newElem.appendChild(elem);
        selection = hx.select(newElem).append('div');
        return selection.attr('class', 'hx-tree-node-parent-icon hx-tree-node-parent-icon-disabled').append('i').attr('class', 'fa fa-chevron-right');
      }
    }
  };

  function Tree(selector, hideDisabledButtons) {
    this.selector = selector;
    this.hideDisabledButtons = hideDisabledButtons != null ? hideDisabledButtons : false;
    this.selection = hx.select(this.selector).classed('hx-openable', true);
    hx.select.getHexagonElementDataObject(this.selection.node()).widget = this;
    this.refresh();
  }

  Tree.prototype.refresh = function(animate) {
    if (animate == null) {
      animate = false;
    }
    return this.selection.selectAll('.hx-tree-node').each((function(_this) {
      return function(d) {
        return format(d, _this.hideDisabledButtons, animate);
      };
    })(this));
  };

  Tree.prototype.render = function(data, renderer) {
    var setup, setupNodeList;
    setup = function(element, data) {
      var content, parent, parentContent;
      if ((data.children != null) && data.children.length > 0) {
        parent = hx.select(element).append('div').attr('class', 'hx-tree-node-parent');
        parentContent = parent.append('div').attr('class', 'hx-tree-node-content');
        renderer(parentContent.node(), data);
        content = hx.select(element).append('div').attr('class', 'hx-tree-node-children');
        return setupNodeList(content, data.children);
      } else {
        content = hx.select(element).append('div').attr('class', 'hx-tree-node-content');
        return renderer(content.node(), data);
      }
    };
    setupNodeList = function(selection, data) {
      var nodes;
      return nodes = selection.view('.hx-tree-node').enter(function(d) {
        var node;
        node = this.append('div').attr('class', 'hx-tree-node').node();
        setup(node, d);
        return node;
      }).apply(data);
    };
    this.selection.selectAll('.hx-tree-node').remove();
    setupNodeList(this.selection, data);
    return this.refresh();
  };

  recurseUpTree = function(node) {
    var closestParent, nodeSel;
    nodeSel = hx.select(node);
    if (nodeSel.classed('hx-tree-node')) {
      node = node.parentNode;
      nodeSel.select(':scope > .hx-tree-node-children').style('display', 'block');
    }
    closestParent = node.parentNode;
    if ((closestParent != null) && this.selection.node().contains(node)) {
      return recurseUpTree.call(this, closestParent);
    }
  };

  Tree.prototype.show = function(animate, node) {
    if (animate == null) {
      animate = true;
    }
    if (node != null) {
      recurseUpTree.call(this, node);
    } else {
      this.selection.selectAll('.hx-tree-node-children').style('display', 'block');
    }
    this.selection.classed('hx-opened', true);
    return this.refresh(animate);
  };

  Tree.prototype.hide = function(animate, node) {
    var childArr, nodeSel;
    if (animate == null) {
      animate = true;
    }
    if (node != null) {
      nodeSel = hx.select(node);
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
    return this.refresh(animate);
  };

  return Tree;

})();

hx.Tree = Tree;

hx.initialiseTrees = function(selector) {
  return hx.selectAll(selector).map(function(d) {
    return new Tree(d);
  });
};

})();


})();