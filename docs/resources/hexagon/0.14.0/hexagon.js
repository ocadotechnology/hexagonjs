/*! 
  hexagon.js 
  ---------- 
  version: 0.14.0
  theme: default
  modules: 
    set
    map
    list
    util
    event-emitter
    color
    selection
    transition
    interpolate
    animate
    pointer-events
    component
    morphs
    click-detector
    dropdown
    collapsible
    button
    menu
    sort
    view
    format
    number-picker
    layout
    resize-events
    select
    spinner
    filter
    date-picker
    time-picker
    request
    table
    tag-input
    morph-section
    input-group
    palette
    plot
    sticky-table-headers
    modal
    notify
    form
    titlebar
    slider
    autocomplete
    base
    button-group
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
    inline-editable
    inline-select
    label
    meter
    paginator
    picker
    pivot-table
    preferences
    progress-bar
    search-dom
    side-collapsible
    sidebar
    tabs
    time-slider
    tree
*/
(function(){
window.hx = hx = window.hx || {};
hx.version = "0.14.0";
hx.theme = {
  "dropdown": {
    "spacing": "0"
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
    "darkTextCol": "#3D3D3D",
    "disabledCol": "#939393",
    "disabledBackgroundCol": "#FAFAFA"
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
  },
  "paginator": {
    "arrowButton": "",
    "defaultButton": "hx-compliment",
    "selectedButton": "hx-positive"
  }
};
(function(){var Set, checkPrefix, prefix, prefixChar, prefixString,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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

  Set.prototype.add = function(value) {
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

  Set.prototype.clear = function() {
    this.items = {};
    this.nan = false;
    this.size = 0;
    return void 0;
  };

  Set.prototype["delete"] = function(value) {
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

  Set.prototype.entries = function() {
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
      items.push([NaN, NaN]);
    }
    return items;
  };

  Set.prototype.forEach = function(f, thisArg) {
    var i, len, ref, v;
    if (thisArg == null) {
      thisArg = this;
    }
    ref = this.entries();
    for (i = 0, len = ref.length; i < len; i++) {
      v = ref[i];
      f.call(thisArg, v[1]);
    }
    return void 0;
  };

  Set.prototype.has = function(value) {
    var prefixedKey;
    if (typeof value === "number" && isNaN(value)) {
      return this.nan;
    } else {
      prefixedKey = prefix(value);
      return prefixedKey in this.items && indexOf.call(this.items[prefixedKey], value) >= 0;
    }
  };

  Set.prototype.keys = function() {
    return this.values();
  };

  Set.prototype.values = function() {
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

})();

hx.Set = Set;
})();
(function(){var Map, checkPrefix, prefix, prefixChar, prefixString;

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

  Map.prototype.clear = function() {
    this.items = {};
    this.nan = void 0;
    return this.size = 0;
  };

  Map.prototype["delete"] = function(key) {
    var index, prefixedKey, ref, row;
    if (typeof key === "number" && isNaN(key)) {
      if (this.nan !== void 0) {
        this.size--;
        this.nan = void 0;
      }
    } else {
      prefixedKey = prefix(key);
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

  Map.prototype.entries = function() {
    var items, k, ref, v;
    items = [];
    ref = this.items;
    for (k in ref) {
      v = ref[k];
      if (checkPrefix(k)) {
        items = items.concat(v.keys.map(function(key, i) {
          return [key, v.values[i]];
        }));
      }
    }
    if (this.nan !== void 0) {
      items.push([NaN, this.nan]);
    }
    return items;
  };

  Map.prototype.forEach = function(f, thisArg) {
    var j, len, ref, v;
    if (thisArg == null) {
      thisArg = this;
    }
    ref = this.entries();
    for (j = 0, len = ref.length; j < len; j++) {
      v = ref[j];
      f.call(thisArg, v[0], v[1]);
    }
    return this;
  };

  Map.prototype.get = function(key) {
    var index, prefixedKey, ref, row;
    if (typeof key === "number" && isNaN(key)) {
      return this.nan;
    } else {
      prefixedKey = prefix(key);
      row = this.items[prefixedKey];
      index = row != null ? (ref = row.keys) != null ? ref.indexOf(key) : void 0 : void 0;
      if ((index != null) && index !== -1) {
        return row.values[index];
      }
    }
  };

  Map.prototype.has = function(key) {
    var index, ref, ref1;
    if (typeof key === "number" && isNaN(key)) {
      return this.nan !== void 0;
    } else {
      index = (ref = this.items[prefix(key)]) != null ? (ref1 = ref.keys) != null ? ref1.indexOf(key) : void 0 : void 0;
      return (index != null) && index !== -1;
    }
  };

  Map.prototype.keys = function() {
    var j, len, ref, results, v;
    ref = this.entries();
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      v = ref[j];
      results.push(v[0]);
    }
    return results;
  };

  Map.prototype.set = function(key, value) {
    var base, emptyRow, index, prefixedKey, row;
    if (typeof key === "number" && isNaN(key)) {
      if (this.nan === void 0) {
        this.size++;
      }
      this.nan = value;
    } else {
      prefixedKey = prefix(key);
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

  Map.prototype.values = function() {
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

})();

hx.Map = Map;
})();
(function(){var List;

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
    var item, j, len, ref;
    if (thisArg == null) {
      thisArg = this;
    }
    ref = this.list;
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
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
(function(){var hx_extend, hx_merge, hx_parseHTML, scrollbarSize, supportsDate, supportsTouch, vendorPrefixes,
  slice = [].slice;

hx.deprecatedWarning = function() {
  var deprecatedItem, heading, messages;
  deprecatedItem = arguments[0], messages = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  heading = "Deprecation Warning: " + deprecatedItem;
  messages = ['Alternatives:'].concat(messages.map(function(d) {
    return '  ' + d;
  }));
  messages = messages.map(function(d) {
    return '  ' + d;
  });
  console.warn([heading].concat(messages).join('\n'));
  return console.trace('Stack Trace');
};

hx.consoleWarning = function() {
  var heading, messages;
  heading = arguments[0], messages = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  messages = messages.map(function(d) {
    return '  ' + d;
  });
  console.warn([heading].concat(messages).join('\n'));
  return console.trace('Stack Trace');
};

hx.hash = function(str, max) {
  var i, l, len, ref, res;
  res = 0;
  len = str.length - 1;
  for (i = l = 0, ref = len; l <= ref; i = l += 1) {
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

hx.clamp = function(min, max, value) {
  return Math.min(max, Math.max(min, value));
};

hx.clampUnit = function(value) {
  return hx.clamp(0, 1, value);
};

hx.randomId = function(size, alphabet) {
  var _, alphabetSize, chars;
  if (size == null) {
    size = 16;
  }
  if (alphabet == null) {
    alphabet = 'ABCEDEF0123456789';
  }
  chars = alphabet.split('');
  alphabetSize = chars.length;
  return ((function() {
    var l, ref, results;
    results = [];
    for (_ = l = 0, ref = size; l < ref; _ = l += 1) {
      results.push(chars[Math.floor(Math.random() * alphabetSize)]);
    }
    return results;
  })()).join('');
};

hx.min = function(values) {
  return Math.min.apply(null, values != null ? values.filter(hx.defined) : void 0);
};

hx.minBy = function(values, f) {
  var fv, i, l, len1, m, min, minValue, ref, v;
  if ((values == null) || values.length === 0) {
    return void 0;
  }
  if (f) {
    min = values[0];
    minValue = f(min);
    for (i = l = 1, ref = values.length - 1; l < ref; i = l += 1) {
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
    for (m = 0, len1 = values.length; m < len1; m++) {
      v = values[m];
      if (v !== void 0 && v < min) {
        min = v;
      }
    }
    return min;
  }
};

hx.max = function(values) {
  return Math.max.apply(null, values != null ? values.filter(hx.defined) : void 0);
};

hx.maxBy = function(values, f) {
  var fv, i, l, len1, m, max, maxValue, ref, v;
  if ((values == null) || values.length === 0) {
    return void 0;
  }
  if (f) {
    max = values[0];
    maxValue = f(max);
    for (i = l = 1, ref = values.length - 1; l < ref; i = l += 1) {
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
    for (m = 0, len1 = values.length; m < len1; m++) {
      v = values[m];
      if (v !== void 0 && v > max) {
        max = v;
      }
    }
    return max;
  }
};

hx.range = function(length) {
  var l, ref, results, x;
  results = [];
  for (x = l = 0, ref = length; l < ref; x = l += 1) {
    results.push(x);
  }
  return results;
};

hx.sum = function(values, f) {
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
  var d, l, len1;
  for (l = 0, len1 = arr.length; l < len1; l++) {
    d = arr[l];
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

hx.isBoolean = function(x) {
  return x === true || x === false || typeof x === 'boolean';
};

hx.isPlainObject = function(obj) {
  return (typeof obj === 'object') && (obj !== null) && (!obj.nodeType) && obj.constructor && obj.constructor.prototype.hasOwnProperty('isPrototypeOf');
};

hx.groupBy = function(arr, f) {
  var category, l, len1, map, values, x;
  map = new hx.Map;
  for (l = 0, len1 = arr.length; l < len1; l++) {
    x = arr[l];
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
  var i, l, length, ref, results;
  if (arrays) {
    if (arrays.length > 0) {
      length = hx.min(arrays.map(function(d) {
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

hx_extend = function(target, overlay, retainUndefined) {
  var k, results, v;
  results = [];
  for (k in overlay) {
    v = overlay[k];
    if (hx.isPlainObject(v)) {
      if (target[k] == null) {
        target[k] = {};
      }
      results.push(hx_extend(target[k], v, retainUndefined));
    } else {
      if (v !== void 0 || retainUndefined) {
        results.push(target[k] = hx.clone(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
};

hx_merge = function(deep, retainUndefined, objects) {
  var k, l, len1, len2, m, obj, res, v;
  if (deep) {
    res = {};
    for (l = 0, len1 = objects.length; l < len1; l++) {
      obj = objects[l];
      if (hx.isPlainObject(obj)) {
        hx_extend(res, obj, retainUndefined);
      }
    }
    return res;
  } else {
    res = {};
    for (m = 0, len2 = objects.length; m < len2; m++) {
      obj = objects[m];
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
  var objects;
  objects = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return hx_merge(true, true, objects);
};

hx.merge.defined = function() {
  var objects;
  objects = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return hx_merge(true, false, objects);
};

hx.shallowMerge = function() {
  var objects;
  objects = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return hx_merge(false, true, objects);
};

hx.shallowMerge.defined = function() {
  var objects;
  objects = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return hx_merge(false, false, objects);
};

hx.clone = function(obj) {
  if (hx.isArray(obj)) {
    return obj.map(hx.clone);
  } else if (hx.isPlainObject(obj)) {
    return hx.merge({}, obj);
  } else if (hx.isObject(obj) && obj !== null) {
    return {};
  } else {
    return obj;
  }
};

hx.shallowClone = function(obj) {
  if (hx.isArray(obj)) {
    return obj.slice();
  } else if (hx.isPlainObject(obj)) {
    return hx.shallowMerge({}, obj);
  } else if (hx.isObject(obj) && obj !== null) {
    return {};
  } else {
    return obj;
  }
};

vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];

hx.vendor = function(obj, prop) {
  var l, len1, p, prefixedProp;
  if (prop in obj) {
    return obj[prop];
  }
  for (l = 0, len1 = vendorPrefixes.length; l < len1; l++) {
    p = vendorPrefixes[l];
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
  var e, error;
  if (!hx_parseHTML) {

    /* istanbul ignore next: phantom/safari dont support create contextual fragment so use a slower method. */
    try {
      document.createRange().createContextualFragment('');
      hx_parseHTML = function(html) {
        return document.createRange().createContextualFragment(html);
      };
    } catch (error) {
      e = error;
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

scrollbarSize = void 0;

hx.scrollbarSize = function() {
  var inner, outer, w1, w2;
  if (scrollbarSize == null) {
    inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    outer = document.createElement('div');
    inner = hx.detached('p').style('width', '100%').style('height', '200px');
    outer = hx.detached('div').style('position', 'absolute').style('top', '0').style('left', '0').style('visiblity', 'hidden').style('width', '200px').style('height', '150px').style('overflow', 'hidden');
    outer.append(inner);
    hx.select('body').append(outer);
    w1 = inner.node().offsetWidth;
    outer.style('overflow', 'scroll');
    w2 = inner.node().offsetWidth;
    if (w1 === w2) {
      w2 = outer.node().clientWidth;
    }
    outer.remove();
    w1 - w2;
    scrollbarSize = w1 - w2;
  }
  return scrollbarSize;
};
})();
(function(){var BasicEventEmitter, EventEmitter, deprecatedEventWarning;

BasicEventEmitter = (function() {
  function BasicEventEmitter() {
    this.callbacks = new hx.Map;
    this.allCallbacks = new hx.List;
  }

  BasicEventEmitter.prototype.emit = function(name, data) {
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

  BasicEventEmitter.prototype.on = function(name, callback) {
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

  BasicEventEmitter.prototype.has = function(name) {
    return this.allCallbacks.size > 0 || (this.callbacks.has(name) && this.callbacks.get(name).size > 0);
  };

  BasicEventEmitter.prototype.off = function(name, callback) {
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
        this.callbacks.set(name, new hx.List);
      } else {
        this.callbacks = new hx.Map;
        this.allCallbacks = new hx.List;
      }
    }
    return this;
  };

  BasicEventEmitter.prototype.pipe = function(eventEmitter, prefix, filter) {
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

})();

EventEmitter = (function() {
  var addEmitter, removeEmitter;

  function EventEmitter() {
    this.suppressedMap = new hx.Map;
    this.emitters = new hx.List;
    this.emittersMap = new hx.Map;
    this.global = addEmitter(this, 'default');
  }

  addEmitter = function(ee, namespace) {
    var be;
    be = new BasicEventEmitter;
    ee.emittersMap.set(namespace, be);
    ee.emitters.add(be);
    return be;
  };

  removeEmitter = function(ee, namespace) {
    if (ee.emittersMap.has(namespace)) {
      ee.emittersMap["delete"](namespace);
      ee.emitters.remove(ee);
    }
    return ee;
  };

  EventEmitter.prototype.emit = function(name, data) {
    var e, emitter, i, len, ref;
    if (!this.suppressedMap.get(name)) {
      if (this.deprecatedEvents != null) {
        for (e in this.deprecatedEvents) {
          if (this.deprecatedEvents[e].event === name) {
            this.emit(e, data);
          }
        }
      }
      ref = this.emitters.entries();
      for (i = 0, len = ref.length; i < len; i++) {
        emitter = ref[i];
        emitter.emit(name, data);
      }
    }
    return this;
  };

  EventEmitter.prototype.suppressed = function(name, suppressed) {
    if (arguments.length > 1) {
      this.suppressedMap.set(name, !!suppressed);
      return this;
    } else {
      return !!this.suppressedMap.get(name);
    }
  };

  EventEmitter.prototype.on = function(name, namespace, callback) {
    var dep, ee, ref;
    if ((dep = (ref = this.deprecatedEvents) != null ? ref[name] : void 0) != null) {
      deprecatedEventWarning(dep.module, name, dep.event);
      name = dep.event;
    }
    if (namespace === 'default') {
      hx.consoleWarning('"default" is a reserved namespace. It can not be used as a namespace name.');
      return this;
    }
    if (hx.isString(namespace)) {
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

  EventEmitter.prototype.has = function(name) {
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

  EventEmitter.prototype.off = function(name, namespace, callback) {
    var emitter, i, len, ref, ref1;
    if (hx.isString(namespace)) {
      if ((ref = this.emittersMap.get(namespace)) != null) {
        ref.off(name, callback);
      }
    } else {
      ref1 = this.emitters.entries();
      for (i = 0, len = ref1.length; i < len; i++) {
        emitter = ref1[i];
        emitter.off(name, callback);
      }
    }
    return this;
  };

  EventEmitter.prototype.pipe = function(eventEmitter, prefix, filter) {
    this.global.pipe(eventEmitter, prefix, filter);
    return this;
  };

  return EventEmitter;

})();

hx.EventEmitter = EventEmitter;

deprecatedEventWarning = function(module, deprecatedEvent, newEvent) {
  var message;
  message = deprecatedEvent === newEvent ? 'Check the docs for alternatives.' : 'Use ' + newEvent + ' instead.';
  return hx.deprecatedWarning(module + ': ' + deprecatedEvent, message);
};
})();
(function(){var Color, fromArray, fromString;

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

  function Color(r1, g1, b1, a1, h1, s1, l1) {
    this.r = r1 != null ? r1 : 0;
    this.g = g1 != null ? g1 : 0;
    this.b = b1 != null ? b1 : 0;
    this.a = a1 != null ? a1 : 1;
    this.h = h1 != null ? h1 : 0;
    this.s = s1 != null ? s1 : 0;
    this.l = l1 != null ? l1 : 0;
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
(function(){var ElementSet, Selection, augmenters, classed, closestParent, flattenNodes, getHexagonElementDataObject, getMethod, namespaces, reformed, select, selectAll, selectSingle;

namespaces = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};

getMethod = function(node, methodName) {
  if (node instanceof Document) {
    return Document.prototype[methodName];
  } else {
    return Element.prototype[methodName];
  }
};

selectSingle = function(selector, node) {
  return getMethod(node, 'querySelector').call(node, selector);
};

selectAll = function(selector, node) {
  return getMethod(node, 'querySelectorAll').call(node, selector);
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
    if (getMethod(node, matches).call(node, selector)) {
      return node;
    }
    node = node.parentNode;
  }
  return void 0;
};

flattenNodes = function(nodes) {
  var j, k, len, len1, node, nodearray, set;
  set = new ElementSet;
  for (j = 0, len = nodes.length; j < len; j++) {
    nodearray = nodes[j];
    for (k = 0, len1 = nodearray.length; k < len1; k++) {
      node = nodearray[k];
      set.add(node);
    }
  }
  return set.entries();
};

classed = function(node, _class, include) {
  var c, cls, current, i, j, len, newList, selection;
  selection = hx.select(node);
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

Selection = (function() {
  var attach, attachSingle;

  function Selection(nodes1) {
    this.nodes = nodes1;
    this.nodes = this.nodes.filter(function(d) {
      return d != null;
    });
    this.singleSelection = false;
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
    var j, len, namespace, newNode, node, ref, results;
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
      ref = selection.nodes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        namespace = namespaces.hasOwnProperty(element) ? namespaces[element] : node.namespaceURI;
        newNode = node.ownerDocument.createElementNS(namespace, element);
        attacher(node, newNode);
        results.push(newNode);
      }
      return results;
    }
  };

  attach = function(selection, name, attacher, reverse) {
    var dir, element, newNodes, ns, s, singleSelection;
    if (reverse == null) {
      reverse = false;
    }
    singleSelection = selection.singleSelection;
    newNodes = name instanceof Selection ? (singleSelection = singleSelection && name.singleSelection, dir = reverse ? -1 : 1, ns = (function() {
      var j, len, ref, ref1, results;
      ref1 = name.nodes;
      ref = dir;
      results = [];
      for ((ref > 0 ? (j = 0, len = ref1.length) : j = ref1.length - 1); ref > 0 ? j < len : j >= 0; j += ref) {
        element = ref1[j];
        results.push(attachSingle(selection, element, attacher));
      }
      return results;
    })(), hx.flatten(reverse ? ns.reverse() : ns)) : hx.isArray(name) ? (singleSelection = false, dir = reverse ? -1 : 1, ns = (function() {
      var j, len, ref, results;
      ref = dir;
      results = [];
      for ((ref > 0 ? (j = 0, len = name.length) : j = name.length - 1); ref > 0 ? j < len : j >= 0; j += ref) {
        element = name[j];
        results.push(attachSingle(selection, element, attacher));
      }
      return results;
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

  Selection.prototype.add = function(name) {
    this.append(name);
    return this;
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
    var j, len, node, ref, ref1, results;
    ref = this.nodes;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      results.push((ref1 = node.parentNode) != null ? ref1.removeChild(node) : void 0);
    }
    return results;
  };

  Selection.prototype.clear = function() {
    var j, len, node, ref;
    ref = this.nodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      while (node.firstChild) {
        getMethod(node, 'removeChild').call(node, node.firstChild);
      }
    }
    return this;
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

  Selection.prototype.prop = function(property, value) {
    var j, len, node, ref;
    if (arguments.length === 2) {
      if (value != null) {
        ref = this.nodes;
        for (j = 0, len = ref.length; j < len; j++) {
          node = ref[j];
          node[property] = value;
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
          results.push(node[property]);
        }
        return results;
      }).call(this));
    }
  };

  Selection.prototype.attr = function(attribute, value) {
    var attr, j, len, namespace, node, parts, ref;
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
      if (namespace) {
        return reformed(this.singleSelection, (function() {
          var k, len1, ref1, results;
          ref1 = this.nodes;
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            node = ref1[k];
            results.push(getMethod(node, 'getAttributeNS').call(node, namespace, attr));
          }
          return results;
        }).call(this));
      } else {
        return reformed(this.singleSelection, (function() {
          var k, len1, ref1, results;
          ref1 = this.nodes;
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            node = ref1[k];
            results.push(getMethod(node, 'getAttribute').call(node, attr));
          }
          return results;
        }).call(this));
      }
    }
  };

  Selection.prototype.style = function(property, value) {
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

  Selection.prototype.text = function(text) {
    var j, len, node, ref;
    if (arguments.length === 1) {
      ref = this.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        node.textContent = text != null ? text : '';
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

  Selection.prototype.html = function(html) {
    var j, len, node, ref;
    if (arguments.length === 1) {
      ref = this.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        node.innerHTML = html || '';
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

  Selection.prototype["class"] = function(_class) {
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

  Selection.prototype.classed = function(_class, include) {
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
          results.push(cls.split(' ').indexOf(_class) !== -1);
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

  Selection.prototype.value = function(value) {
    if (arguments.length === 1) {
      return this.prop('value', value);
    } else {
      return this.prop('value');
    }
  };

  Selection.prototype.on = function(name, namespace, f) {
    var augmenter, data, eventEmitter, handler, handlerRemoverFunctions, j, k, len, len1, node, ref;
    if (!hx.isString(namespace)) {
      f = namespace;
      namespace = 'hx.selection';
    }
    if (namespace === 'default') {
      namespace = 'hx.selection';
    }
    ref = this.nodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      data = getHexagonElementDataObject(node);
      eventEmitter = data.eventEmitter ? data.eventEmitter : data.eventEmitter = new hx.EventEmitter;
      if (data.eventAugmenters == null) {
        data.eventAugmenters = new hx.Map;
      }
      if (data.handlers == null) {
        data.handlers = new hx.Map;
      }
      if (!data.handlers.has(name)) {
        handler = function(e) {
          return eventEmitter.emit(name, e);
        };
        data.handlers.set(name, handler);
        getMethod(node, 'addEventListener').call(node, name, handler);
      }
      eventEmitter.off(name, namespace);
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

  Selection.prototype.off = function(name, namespace, f) {
    var data, j, k, len, len1, node, ref, ref1, ref2, ref3, remover;
    if (!hx.isString(namespace)) {
      f = namespace;
      namespace = void 0;
    }
    if (namespace === 'default') {
      namespace = 'hx.selection';
    }
    ref = this.nodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      data = getHexagonElementDataObject(node);
      if ((ref1 = data.eventAugmenters) != null ? ref1.has(name) : void 0) {
        ref2 = data.eventAugmenters.get(name);
        for (k = 0, len1 = ref2.length; k < len1; k++) {
          remover = ref2[k];
          remover();
        }
        data.eventAugmenters["delete"](name);
      }
      if ((ref3 = data.eventEmitter) != null) {
        ref3.off(name, namespace, f);
      }
    }
    return this;
  };

  Selection.prototype.data = function(key, value) {
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
            data.data = new hx.Map;
          }
          results.push(data.data.set(key, value));
        }
        return results;
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

  Selection.prototype.forEach = function(f) {
    this.nodes.map(function(node) {
      return select(node);
    }).forEach(f);
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

  Selection.prototype.width = function() {
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

  Selection.prototype.height = function() {
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

  Selection.prototype.size = function() {
    return this.nodes.length;
  };

  Selection.prototype.empty = function() {
    return this.nodes.length === 0;
  };

  Selection.prototype.contains = function(element) {
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
  if (selector instanceof Selection) {
    hx.consoleWarning('hx.select was passed a selection', 'Calling hx.select on a selection returns the same selection', selector);
    return selector;
  } else if (!((selector instanceof HTMLElement) || (selector instanceof SVGElement) || hx.isString(selector) || selector === document || selector === window)) {
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
(function(){var hx_ease, loopUpdate, next;

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
(function(){var interpolateNumber, splitString;

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
})();
(function(){
/* istanbul ignore next: ignore coffeescript generated code that can't be covered */
var Animation, Morph, hx_morphs,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Animation = (function(superClass) {
  var transition;

  extend(Animation, superClass);

  function Animation(node1, ease1) {
    this.node = node1;
    this.ease = ease1 != null ? ease1 : hx.ease.linear;
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

})(hx.EventEmitter);

hx.animate = function(node, ease) {
  return new Animation(node, ease);
};

hx.Selection.prototype.animate = function(ease) {
  return hx.animate(this.nodes[0], ease);
};

Morph = (function(superClass) {
  var applyAttr, applyStyle, perform;

  extend(Morph, superClass);

  function Morph(node1, trigger, start, cancellers) {
    this.node = node1;
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
      this.trigger.on('end', 'hx.animate', (function(_this) {
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

  Morph.prototype["with"] = function(f, duration) {
    return this.then(f, duration);
  };

  applyStyle = function(node, args) {
    return function() {
      var animElem;
      animElem = hx.animate(node);
      return animElem.style.apply(animElem, args);
    };
  };

  Morph.prototype.andStyle = function(property, value, duration) {
    return this.and(applyStyle(this.node, arguments));
  };

  Morph.prototype.thenStyle = function(property, value, duration) {
    return this.then(applyStyle(this.node, arguments));
  };

  Morph.prototype.withStyle = function(property, value, duration) {
    return this.then(applyStyle(this.node, arguments));
  };

  applyAttr = function(node, args) {
    return function() {
      var animElem;
      animElem = hx.animate(node);
      return animElem.attr.apply(animElem, args);
    };
  };

  Morph.prototype.andAttr = function(property, value, duration) {
    return this.and(applyAttr(this.node, arguments));
  };

  Morph.prototype.thenAttr = function(property, value, duration) {
    return this.then(applyAttr(this.node, arguments));
  };

  Morph.prototype.withAttr = function(property, value, duration) {
    return this.then(applyAttr(this.node, arguments));
  };

  Morph.prototype.cancel = function() {
    var canceler, i, len, ref;
    if (!this.cancelled) {
      this.emit('cancelled');
      this.cancelled = true;
      ref = this.cancelers;
      for (i = 0, len = ref.length; i < len; i++) {
        canceler = ref[i];
        if (hx.isFunction(canceler.cancel)) {
          canceler.cancel();
        }
      }
    }
    return this;
  };

  perform = function() {
    var action, awaiting, i, len, onEnd, ref, res, results;
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
      ref = this.actions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        res = action(onEnd);
        if ((res !== void 0) && res.cancel) {
          this.cancelers.push(res);
        }
        if (res instanceof hx.EventEmitter) {
          results.push(res.on('end', 'hx.animate', onEnd));
        } else if (action.length === 0) {
          results.push(onEnd());
        } else {
          results.push(void 0);
        }
      }
      return results;
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
    var i, len, morph, obj, ref;
    if (this.node) {
      obj = hx.select.getHexagonElementDataObject(this.node, false);
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
(function(){var addAugmentor, addAugmentorWithLocation, addAugmentorWithoutLocation;

addAugmentor = function(name, mouseName, touchNames, node, addEventAugmenter, mouseEventFactory, touchEventFactory) {
  return hx.select.addEventAugmenter({
    name: name,
    setup: function(node, eventEmitter) {
      var i, len, mouseHandler, touch, touchHandler, touchName;
      mouseHandler = function(e) {
        return eventEmitter.emit(name, mouseEventFactory(e));
      };
      node.addEventListener(mouseName, mouseHandler);
      if (touch = hx.supports('touch')) {
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

addAugmentorWithoutLocation('pointerenter', 'mouseenter', ['touchenter']);
})();
(function(){hx.component = function(selector) {
  var ref, ref1, ref2;
  return (ref = hx.select(selector).node()) != null ? (ref1 = ref.__hx__) != null ? (ref2 = ref1.components) != null ? ref2[0] : void 0 : void 0 : void 0;
};

hx.components = function(selector) {
  var components, ref, ref1;
  components = (ref = hx.select(selector).node()) != null ? (ref1 = ref.__hx__) != null ? ref1.components : void 0 : void 0;
  if (components) {
    return components.slice();
  } else {
    return [];
  }
};

hx.component.register = function(selector, component) {
  var base, node;
  node = hx.select(selector).node();
  if (node.__hx__ == null) {
    node.__hx__ = {};
  }
  if ((base = node.__hx__).components == null) {
    base.components = [];
  }
  node.__hx__.components.push(component);
};
})();
(function(){var Delay, animateStyles, clearAndGet, getStyles, setStyles,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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

hx.morph.register('expand', function(node, duration) {
  var end, properties, selection, start;
  if (duration == null) {
    duration = 100;
  }
  properties = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom', 'width', 'padding-left', 'padding-right', 'margin-left', 'margin-right'];
  selection = hx.select(node);
  start = getStyles(selection, properties);
  selection.style('display', '');
  end = clearAndGet(selection, properties);
  setStyles(selection, start);
  selection.classed('hx-morph-hidden', true);
  return animateStyles(selection, end, duration).on('end', 'hx.morphs', function(e) {
    clearAndGet(selection, properties);
    return selection.classed('hx-morph-hidden', false);
  });
});

hx.morph.register('expandv', function(node, duration) {
  var end, properties, selection, start;
  if (duration == null) {
    duration = 100;
  }
  properties = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom'];
  selection = hx.select(node);
  start = getStyles(selection, properties);
  selection.style('display', '');
  end = clearAndGet(selection, properties);
  setStyles(selection, start);
  selection.classed('hx-morph-hidden', true);
  return animateStyles(selection, end, duration).on('end', 'hx.morphs', function(e) {
    clearAndGet(selection, properties);
    return selection.classed('hx-morph-hidden', false);
  });
});

hx.morph.register('expandh', function(node, duration) {
  var end, properties, selection, start;
  if (duration == null) {
    duration = 100;
  }
  properties = ['width', 'padding-left', 'padding-right', 'margin-left', 'margin-right'];
  selection = hx.select(node);
  start = getStyles(selection, properties);
  selection.style('display', '');
  end = clearAndGet(selection, properties);
  setStyles(selection, start);
  selection.classed('hx-morph-hidden', true);
  return animateStyles(selection, end, duration).on('end', 'hx.morphs', function(e) {
    clearAndGet(selection, properties);
    return selection.classed('hx-morph-hidden', false);
  });
});

hx.morph.register('collapse', function(node, duration) {
  var selection;
  if (duration == null) {
    duration = 100;
  }
  selection = hx.select(node).classed('hx-morph-hidden', true);
  return hx.animate(node).style('height', '0px', duration).style('padding-top', '0px', duration).style('padding-bottom', '0px', duration).style('margin-top', '0px', duration).style('margin-bottom', '0px', duration).style('width', '0px', duration).style('padding-left', '0px', duration).style('padding-right', '0px', duration).style('margin-left', '0px', duration).style('margin-right', '0px', duration).on('end', 'hx.morphs', function(e) {
    return selection.style('display', 'none').style('height', '').style('padding-top', '').style('padding-bottom', '').style('margin-top', '').style('margin-bottom', '').style('width', '').style('padding-left', '').style('padding-right', '').style('margin-left', '').style('margin-right', '').classed('hx-morph-hidden', false);
  });
});

hx.morph.register('collapsev', function(node, duration) {
  var selection;
  if (duration == null) {
    duration = 100;
  }
  selection = hx.select(node).classed('hx-morph-hidden', true);
  return hx.animate(node).style('height', '0px', duration).style('padding-top', '0px', duration).style('padding-bottom', '0px', duration).style('margin-top', '0px', duration).style('margin-bottom', '0px', duration).on('end', 'hx.morphs', function(e) {
    return selection.style('display', 'none').style('height', '').style('padding-top', '').style('padding-bottom', '').style('margin-top', '').style('margin-bottom', '').classed('hx-morph-hidden', false);
  });
});

hx.morph.register('collapseh', function(node, duration) {
  var selection;
  if (duration == null) {
    duration = 100;
  }
  selection = hx.select(node).classed('hx-morph-hidden', true);
  return hx.animate(node).style('width', '0px', duration).style('padding-left', '0px', duration).style('padding-right', '0px', duration).style('margin-left', '0px', duration).style('margin-right', '0px', duration).on('end', 'hx.morphs', function(e) {
    return selection.style('display', 'none').style('width', '').style('padding-left', '').style('padding-right', '').style('margin-left', '').style('margin-right', '').classed('hx-morph-hidden', false);
  });
});

hx.morph.register('rotate-90', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.animate(node).style('-webkit-transform', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(0, 1, -1, 0, 0, 0)', duration).style('transform', 'matrix(1, 0, 0, 1, 0, 0)', 'matrix(0, 1, -1, 0, 0, 0)', duration).on('end', 'hx.morphs', function() {
    return hx.select(node).style('transform', '').style('-webkit-transform', '');
  }).on('cancel', 'hx.morphs', function() {
    return hx.select(node).style('transform', '').style('-webkit-transform', '');
  });
});

hx.morph.register('rotate-0', function(node, duration) {
  if (duration == null) {
    duration = 100;
  }
  return hx.animate(node).style('-webkit-transform', 'matrix(0, 1, -1, 0, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)', duration).style('transform', 'matrix(0, 1, -1, 0, 0, 0)', 'matrix(1, 0, 0, 1, 0, 0)', duration).on('end', 'hx.morphs', function() {
    return hx.select(node).style('transform', '').style('-webkit-transform', '');
  }).on('cancel', 'hx.morphs', function() {
    return hx.select(node).style('transform', '').style('-webkit-transform', '');
  });
});

Delay = (function(superClass) {
  extend(Delay, superClass);

  function Delay(duration) {
    this.cancel = bind(this.cancel, this);
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
(function(){
/* istanbul ignore next: ignores 'extend' method added by coffeescript */
var ClickDetector,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ClickDetector = (function(superClass) {
  extend(ClickDetector, superClass);

  function ClickDetector() {
    var container;
    ClickDetector.__super__.constructor.apply(this, arguments);
    this.eventId = hx.randomId();
    this.exceptions = new hx.List;
    container = void 0;
    this.downAction = (function(_this) {
      return function(e) {
        var call, element, i, len, ref;
        e = e.event;
        container = e.target;
        call = true;
        ref = _this.exceptions.entries();
        for (i = 0, len = ref.length; i < len; i++) {
          element = ref[i];
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
        var call, element, i, isInDom, len, ref, releasedOutside;
        e = e.event;
        call = true;
        isInDom = document.documentElement.contains(e.target);
        releasedOutside = container && !container.contains(e.target);
        if (releasedOutside || !isInDom) {
          call = false;
        }
        container = void 0;
        ref = _this.exceptions.entries();
        for (i = 0, len = ref.length; i < len; i++) {
          element = ref[i];
          if (element.contains(e.target)) {
            call = false;
          }
        }
        if (call) {
          return _this.emit('click');
        }
      };
    })(this);
    hx.select(document).on('pointerdown', 'hx.click-detector.' + this.eventId, this.downAction);
    hx.select(document).on('pointerup', 'hx.click-detector.' + this.eventId, this.upAction);
  }

  ClickDetector.prototype.addException = function(element) {
    this.exceptions.add(element);
    return this;
  };

  ClickDetector.prototype.removeAllExceptions = function() {
    this.exceptions.clear();
    return this;
  };

  ClickDetector.prototype.cleanUp = function() {
    hx.select(document).off('pointerdown', 'hx.click-detector.' + this.eventId, this.downAction);
    hx.select(document).off('pointerup', 'hx.click-detector.' + this.eventId, this.upAction);
    return this;
  };

  return ClickDetector;

})(hx.EventEmitter);

hx.ClickDetector = ClickDetector;
})();
(function(){
/* istanbul ignore next: ignore coffeescript's extend function */
var Dropdown, checkFixedPos, checkParents, checkZIndex, getWindowMeasurement,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

getWindowMeasurement = function(horizontal, scroll) {
  if (horizontal) {
    if (scroll) {
      return window.scrollX;
    } else {
      return window.innerWidth;
    }
  } else {
    if (scroll) {
      return window.scrollY;
    } else {
      return window.innerHeight;
    }
  }
};

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

checkParents = function(child, check, returnArray) {
  var node, result, resultArr;
  node = child;
  resultArr = [];
  while (node !== null && node.nodeType !== 9) {
    result = check(node);
    if (returnArray) {
      if (result != null) {
        resultArr.push(result);
      }
    } else if (result != null) {
      return result;
    }
    node = node.parentNode;
    if (node == null) {
      break;
    }
    if (returnArray && node.nodeType === 9) {
      return resultArr;
    }
  }
  if (returnArray) {
    return [];
  } else {
    return false;
  }
};

Dropdown = (function(superClass) {
  extend(Dropdown, superClass);

  function Dropdown(selector, dropdownContent, options) {
    var alignQuad;
    this.selector = selector;
    this.dropdownContent = dropdownContent;
    Dropdown.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this.options = hx.merge.defined({
      mode: 'click',
      align: 'lblt',
      spacing: Number(hx.theme.dropdown.spacing),
      matchWidth: true,
      ddClass: ''
    }, options);
    this.selection = hx.select(this.selector);
    this.visible = false;
    this.dropdown = void 0;
    this.clickDetector = new hx.ClickDetector;
    this.useScroll = false;
    alignQuad = (function() {
      switch (this.options.align) {
        case 'up':
          return 'ltlb';
        case 'down':
          return 'lblt';
        case 'left':
          return 'ltrt';
        case 'right':
          return 'rtlt';
        default:
          return this.options.align;
      }
    }).call(this);
    this.alignments = alignQuad.split('');
    this.selection.on('click', 'hx.dropdown', (function(_this) {
      return function() {
        return _this.toggle();
      };
    })(this));
    if (this.options.mode === 'hover') {
      this.selection.on('mouseover', 'hx.dropdown', (function(_this) {
        return function() {
          return _this.show();
        };
      })(this));
      this.selection.on('mouseout', 'hx.dropdown', (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this));
    }
  }

  Dropdown.prototype.toggle = function(cb) {
    if (this.isOpen()) {
      this.hide(cb);
    } else {
      this.show(cb);
    }
    return this;
  };

  Dropdown.prototype.show = function(cb) {
    var bodyDiff, checkOverlap, ddHeight, ddMaxHeight, dropdownRect, horizontalOverlap, horizontalPos, horizontalWindow, invertY, movedVertical, node, parentFixed, parentZIndex, rect, scrollbarWidth, verticalOverlap, verticalPos, verticalWindow, yPos;
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
      if (this.options.ddClass.length > 0) {
        this.dropdown.classed(this.options.ddClass, true);
      }
    }
    this.clickDetector.on('click', 'hx.dropdown', (function(_this) {
      return function() {
        return _this.hide();
      };
    })(this));
    if (!this.visible && this.dropdown) {
      parentZIndex = Math.max.apply(null, checkParents(this.selection.node(), checkZIndex, true));
      if (parentZIndex > 0) {
        this.dropdown.style('z-index', parentZIndex + 1);
      }
      rect = this.selection.box();
      this.dropdown.style('display', 'block');
      if (this.options.matchWidth) {
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
            horizontalPos += this.options.spacing;
            break;
          case 'r':
            horizontalPos -= this.options.spacing;
        }
      }
      if (this.alignments[1] !== this.alignments[3]) {
        switch (this.alignments[3]) {
          case 't':
            verticalPos += this.options.spacing;
            break;
          case 'b':
            invertY = true;
            verticalPos -= this.options.spacing;
        }
      }
      scrollbarWidth = hx.scrollbarSize();
      if (horizontalPos < 0) {
        horizontalPos = 0;
      }
      if ((horizontalWindow = horizontalPos + dropdownRect.width - getWindowMeasurement(true) + scrollbarWidth) > 0) {
        horizontalPos -= horizontalWindow;
      }
      if (verticalPos < 0) {
        verticalPos = 0;
      }
      ddHeight = !isNaN(ddMaxHeight) ? Math.min(ddMaxHeight, dropdownRect.height) : dropdownRect.height;
      if ((verticalWindow = verticalPos + ddHeight - getWindowMeasurement()) > 0) {
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
          verticalPos = rect.top + rect.height + this.options.spacing;
        } else {
          invertY = true;
          verticalPos = rect.top - dropdownRect.height - this.options.spacing;
          if (verticalPos < 0) {
            invertY = false;
            verticalPos = rect.top + rect.height + this.options.spacing;
          }
        }
      }
      parentFixed = checkParents(this.selection.node(), checkFixedPos);
      if (parentFixed) {
        this.dropdown.style('position', 'fixed');
      } else {
        verticalPos += getWindowMeasurement(false, true);
        horizontalPos += getWindowMeasurement(true, true);
      }
      yPos = 'top';
      if (invertY) {
        yPos = 'bottom';
        bodyDiff = document.body.scrollHeight - document.body.clientHeight;
        verticalPos = document.body.scrollHeight - verticalPos - bodyDiff - dropdownRect.height;
      }
      this.dropdown.style('top', 'auto').style(yPos, verticalPos + 'px').style('left', horizontalPos + 'px').style('width', dropdownRect.width + 'px');
      this.dropdown.style('height', '0px').style(yPos, (verticalPos + 8) + 'px').style('opacity', 0).morph()["with"]('fadein', 150).and('expandv', 150).and((function(_this) {
        return function() {
          return _this.dropdown.animate().style(yPos, verticalPos + 'px', 150);
        };
      })(this)).then((function(_this) {
        return function() {
          if (_this.useScroll && (_this.dropdown != null)) {
            _this.dropdown.style('overflow-y', 'auto');
          }
          _this.emit('showend');
          return typeof cb === "function" ? cb() : void 0;
        };
      })(this)).go();
      this.visible = true;
      this.emit('showstart');
      this.emit('change', true);
    }
    return this;
  };

  Dropdown.prototype.hide = function(cb) {
    if (this.visible) {
      this.visible = false;
      this.emit('hidestart');
      this.emit('change', false);
      this.emit('hideend');
      if (typeof cb === "function") {
        cb();
      }
      this.dropdown.remove();
      this.dropdown = void 0;
      this.clickDetector.off('click', 'hx.dropdown');
    }
    return this;
  };

  Dropdown.prototype.isOpen = function() {
    return this.visible;
  };

  Dropdown.prototype.cleanUp = function() {
    this.clickDetector.cleanUp();
    return this;
  };

  return Dropdown;

})(hx.EventEmitter);

hx.Dropdown = Dropdown;
})();
(function(){
/* istanbul ignore next: ignore the uncoverable coffee generated code */
var Collapsible,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Collapsible = (function(superClass) {
  extend(Collapsible, superClass);

  function Collapsible(selector, options) {
    var content, header, toggleBtn;
    Collapsible.__super__.constructor.apply(this, arguments);
    this.options = hx.merge.defined({
      lazyContent: void 0,
      visible: false,
      addIcon: true,
      animate: true
    }, options);
    hx.component.register(selector, this);
    this.lazyContentCreated = false;
    this.selection = hx.select(selector).classed('hx-openable', true).classed('hx-collapsible', true);
    header = this.selection.select('.hx-collapsible-heading');
    if (!(toggleBtn = header.select('.hx-collapsible-toggle')).empty()) {
      header.classed('hx-collapsible-heading-no-hover', true);
      toggleBtn.on('click', 'hx.collapsible', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    } else {
      header.on('click', 'hx.collapsible', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    }
    content = this.selection.select('.hx-collapsible-content').style('height', 0).style('opacity', 0);
    if (this.options.addIcon) {
      if (toggleBtn.empty()) {
        header.select('i').remove();
        header.prepend('i')["class"]('fa fa-chevron-right hx-collapsible-icon');
      } else {
        toggleBtn.select('i').remove();
        toggleBtn.prepend('i')["class"]('fa fa-chevron-right hx-collapsible-icon');
      }
    }
    this.visible = void 0;
    if (this.options.visible) {
      this.show(false);
    } else {
      this.hide(false);
    }
  }

  Collapsible.prototype.toggle = function(animate, cb) {
    animate = animate != null ? animate : this.options.animate;
    if (this.isOpen()) {
      return this.hide(animate, cb);
    } else {
      return this.show(animate, cb);
    }
  };

  Collapsible.prototype.show = function(animate, cb) {
    var content, self;
    animate = animate != null ? animate : this.options.animate;
    if (!this.lazyContentCreated) {
      this.lazyContentCreated = true;
      if (this.options.lazyContent) {
        this.options.lazyContent(this.selection.select('.hx-collapsible-content').node());
      }
    }
    if (this.visible !== true) {
      this.selection.classed('hx-collapsible-expanded', true).classed('hx-opened', true);
      content = this.selection.select('.hx-collapsible-content');
      if (animate) {
        self = this;
        content.morph()["with"]('expandv', 100).and('fadein', 100).then(function() {
          self.emit('showend');
          return typeof cb === "function" ? cb() : void 0;
        }).go(true);
        this.selection.select('.hx-collapsible-heading').select('.hx-collapsible-icon').morph()["with"]('rotate-90', 200).go(true);
      } else {
        content.style('display', '').style('height', '').style('opacity', '');
        this.emit('showend');
      }
      this.visible = true;
      this.emit('showstart');
      this.emit('change', true);
    }
    return this;
  };

  Collapsible.prototype.hide = function(animate, cb) {
    var self;
    animate = animate != null ? animate : this.options.animate;
    if (this.visible !== false) {
      this.selection.classed('hx-collapsible-expanded', false).classed('hx-opened', false);
      if (animate) {
        self = this;
        this.selection.select('.hx-collapsible-content').morph()["with"]('fadeout', 100).and('collapsev', 100).then(function() {
          self.emit('hideend');
          return typeof cb === "function" ? cb() : void 0;
        }).go(true);
        this.selection.select('.hx-collapsible-heading').select('.hx-collapsible-icon').morph()["with"]('rotate-0', 200).go(true);
      } else {
        this.selection.select('.hx-collapsible-content').style('display', 'none');
        this.emit('hideend');
      }
      this.visible = false;
      this.emit('hidestart');
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

hx.initializeCollapsibles = function(selector, options) {
  return hx.selectAll(selector).map(function(d) {
    return new Collapsible(d, options);
  });
};
})();
(function(){var ToggleButton,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ToggleButton = (function(superClass) {
  extend(ToggleButton, superClass);

  function ToggleButton(selector, options) {
    ToggleButton.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    this.selection = hx.select(selector).classed('hx-btn hx-btn-toggle', true);
    this.options = hx.merge.defined({
      value: !this.selection.classed('hx-btn-toggle-off')
    }, options);
    this.value(this.options.value);
    this.selection.on('click', 'hx.button', (function(_this) {
      return function() {
        _this.value(!_this.options.value);
        return _this.emit('change', _this.options.value);
      };
    })(this));
  }

  ToggleButton.prototype.value = function(val) {
    if (val != null) {
      this.options.value = val;
      this.selection.classed('hx-btn-toggle-off', !val).attr('data', val);
      return this;
    } else {
      return this.options.value;
    }
  };

  return ToggleButton;

})(hx.EventEmitter);

hx.ToggleButton = ToggleButton;
})();
(function(){var Menu, MenuItem, addItem, checkEvent, dealWithEvent, emitItem, getAllItems, moveSelectionDown, moveSelectionUp, populateNode, setActive, setupInner, toggleCollapsible,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

addItem = function(item, context, menu) {
  var it;
  it = new MenuItem(item, context, menu);
  context._.menuItems.push(it);
  return it;
};

setupInner = function(menu, dropdownData, current) {
  var datum, it, j, len, results;
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
  return hx.select(node).view('.hx-menu-item').update(function(d, element) {
    return d.build(element);
  }).apply(items);
};

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

setActive = function(menu, pos, up, click) {
  var allItems, collapsibleHeading, content, dNode, ddScroll, goUp, isEnabled, itemHeight, mNode, menuNode, node, offset, parentNode, parentOffset, ref, ref1, ref2, ref3, selectedItem, totalOffset;
  if ((ref = menu.dropdown.dropdown) != null) {
    ref.selectAll('.hx-menu-item').classed('hx-menu-active', false);
  }
  if (pos >= 0) {
    allItems = getAllItems(menu);
    node = allItems[pos].node;
    content = (ref1 = allItems[pos]) != null ? ref1.content : void 0;
    isEnabled = !(content != null ? content.disabled : void 0) && !(content != null ? content.unselectable : void 0);
    while ((node.offsetParent === null || !isEnabled) && !click) {
      if (up) {
        pos -= 1;
      } else {
        pos += 1;
      }
      content = (ref2 = allItems[pos]) != null ? ref2.content : void 0;
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
      if (((dNode = (ref3 = menu.dropdown.dropdown) != null ? ref3.node() : void 0) != null) && !click) {
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
  if ((selectedItem = allItems != null ? allItems[menu.cursorPos] : void 0) != null) {
    emitItem(menu, selectedItem, 'highlight', click ? 'click' : 'arrow');
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
  var allItems, pos, ref, selectedItem;
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
  if (menu.has(type)) {
    return menu.emit(type, {
      eventType: eventType,
      content: item != null ? item.content : void 0
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
  function MenuItem(content1, parent, menu1) {
    this.content = content1;
    this.parent = parent;
    this.menu = menu1;
    this._ = {};
  }

  MenuItem.prototype.build = function(container) {
    var collapsibleNode, contentNode, headerNode, linkEnabled, ref;
    this.node = container;
    container = hx.select(container);
    if (((ref = this._.menuItems) != null ? ref.length : void 0) > 0) {
      container.view('.hx-collapsible').apply(this);
      collapsibleNode = container.select('.hx-collapsible');
      collapsibleNode.view('.hx-collapsible-heading').apply(this);
      collapsibleNode.view('.hx-collapsible-content').update(function() {
        return this.style('display', 'none');
      }).apply(this);
      headerNode = collapsibleNode.select('.hx-collapsible-heading').classed('hx-menu-collapsible', true).node();
      contentNode = container.select('.hx-collapsible-content').node();
      this.menu.options.renderer(headerNode, this.content);
      this.collapsible = new hx.Collapsible(collapsibleNode.node());
      return populateNode(contentNode, this._.menuItems);
    } else {
      linkEnabled = !this.content.unselectable && !this.content.disabled;
      container.classed('hx-menu-link', linkEnabled).classed('hx-menu-item-disabled', this.content.disabled).classed('hx-menu-unselectable', this.content.unselectable);
      return this.menu.options.renderer(container.node(), this.content);
    }
  };

  return MenuItem;

})();

Menu = (function(superClass) {
  var namedColorColors;

  extend(Menu, superClass);

  namedColorColors = ['hx-positive', 'hx-warning', 'hx-negative', 'hx-info', 'hx-compliment', 'hx-contrast'];

  function Menu(selector, options) {
    var cls, colorClass, ddClass, dropdownContent, isInput, j, len, selection, self, targetElem;
    this.selector = selector;
    Menu.__super__.constructor.apply(this, arguments);
    this.options = hx.merge.defined({
      align: void 0,
      mode: 'click',
      ddClass: '',
      renderer: function(node, data) {
        return hx.select(node).text(data.text ? data.text : data);
      },
      items: []
    }, options);
    self = this;
    this._ = {
      items: this.options.items,
      itemsChanged: true
    };
    hx.component.register(this.selector, this);
    selection = hx.select(this.selector);
    if ((this.options.ddClass != null) && this.options.ddClass.length === 0) {
      for (j = 0, len = namedColorColors.length; j < len; j++) {
        cls = namedColorColors[j];
        if (selection.classed(cls)) {
          colorClass = cls;
          break;
        }
      }
    }
    ddClass = 'hx-menu ' + (colorClass != null ? colorClass : this.options.ddClass);
    dropdownContent = function(node) {
      var doneFn, rawItems;
      doneFn = function(items) {
        if (self._.itemsChanged) {
          self._.itemsChanged = false;
          setupInner(self, items, self);
        }
        return populateNode(node, self._.menuItems);
      };
      rawItems = self._.items;
      if (hx.isFunction(rawItems)) {
        self._.itemsChanged = true;
        rawItems(function(items) {
          return doneFn(items);
        });
      } else {
        doneFn(rawItems);
      }
    };
    this.dropdown = new hx.Dropdown(this.selector, dropdownContent, {
      mode: this.options.mode,
      align: this.options.align,
      ddClass: ddClass
    });
    selection.off('click', 'hx.dropdown');
    selection.on('click', 'hx.menu', (function(_this) {
      return function() {
        var loading;
        if (_this.dropdown.isOpen()) {
          return _this.dropdown.hide();
        } else {
          if (!_this.loading) {
            if ((_this.data != null) && hx.isFunction(_this.data)) {
              _this.loading = true;
              loading = selection.prepend('span');
              loading.append('i')["class"]('hx-menu-loading fa fa-spin fa-spinner');
              _this.data(function(data) {
                self.loading = false;
                loading.remove();
                return setupItems(self, data);
              });
            }
            return _this.dropdown.show();
          }
        }
      };
    })(this));
    if (selection.node().nodeName.toLowerCase() === 'input') {
      isInput = true;
      targetElem = selection;
    }
    this.dropdown.on('showstart', 'hx.menu', function() {
      self.cursorPos = -1;
      if (!isInput) {
        targetElem = self.dropdown.dropdown;
        targetElem.attr('tabindex', '-1');
        targetElem.node().focus();
      }
      targetElem.on('keydown', 'hx.menu', function(e) {
        if (self.dropdown.isOpen()) {
          checkEvent(e, self);
        }
        return self.emit('keydown', e);
      });
      return self.dropdown.dropdown.on('click', 'hx.menu', function(e) {
        var allItems, i, index, t, target;
        target = hx.select(e.target).classed('hx-menu-link') ? e.target : hx.select(e.target).closest('.hx-menu-item').node();
        if (target) {
          index = -1;
          t = hx.select(target);
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
      });
    });
    this.dropdown.pipe(this, 'dropdown');
  }

  Menu.prototype.renderer = function(f) {
    if (arguments.length > 0) {
      this.options.renderer = f;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  Menu.prototype.addException = function(element) {
    this.dropdown.clickDetector.addException(element);
    return this;
  };

  Menu.prototype.hide = function() {
    this.dropdown.hide();
    return this;
  };

  Menu.prototype.items = function(items) {
    if (arguments.length > 0) {
      if (items == null) {
        items = [];
      }
      this._.itemsChanged = true;
      this._.items = items;
      return this;
    } else {
      return this._.items;
    }
  };

  return Menu;

})(hx.EventEmitter);

hx.Menu = Menu;
})();
(function(){var collator, compare, hasCollator, localeCompare;

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
(function(){var View;

View = (function() {
  function View(rootSelection, selector1, defaultType) {
    var self;
    this.rootSelection = rootSelection;
    this.selector = selector1;
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
    var d, dataByKey, datum, enterSet, exitSet, i, j, k, l, len, len1, len2, len3, len4, len5, m, n, newNodeSet, node, nodeByKey, nodeData, nodes, o, p, q, r, ref, ref1, ref2, updateSet;
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
      for (l = 0, len = data.length; l < len; l++) {
        datum = data[l];
        k = key(datum);
        dataByKey.set(k, datum);
      }
      for (m = 0, len1 = nodes.length; m < len1; m++) {
        node = nodes[m];
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
        var len2, n, ref, results;
        ref = dataByKey.entries();
        results = [];
        for (n = 0, len2 = ref.length; n < len2; n++) {
          d = ref[n];
          results.push({
            datum: d[1]
          });
        }
        return results;
      })();
    } else {
      i = 0;
      for (n = 0, len2 = nodes.length; n < len2; n++) {
        node = nodes[n];
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
        for (j = o = ref = i, ref1 = data.length - 1; ref <= ref1 ? o <= ref1 : o >= ref1; j = ref <= ref1 ? ++o : --o) {
          enterSet.push({
            datum: data[j]
          });
        }
      }
    }
    newNodeSet = (function() {
      var len3, p, results;
      results = [];
      for (i = p = 0, len3 = enterSet.length; p < len3; i = ++p) {
        d = enterSet[i];
        results.push({
          element: this["new"].call(this.rootSelection, d.datum, i),
          datum: d.datum
        });
      }
      return results;
    }).call(this);
    for (p = 0, len3 = newNodeSet.length; p < len3; p++) {
      d = newNodeSet[p];
      hx.select.getHexagonElementDataObject(d.element).datum = d.datum;
    }
    for (i = q = 0, len4 = exitSet.length; q < len4; i = ++q) {
      d = exitSet[i];
      this.old.call(hx.select(d.element), d.datum, d.element, i);
    }
    ref2 = updateSet.concat(newNodeSet);
    for (i = r = 0, len5 = ref2.length; r < len5; i = ++r) {
      d = ref2[i];
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
(function(){var formatExp, formatFixed, formatRound, formatSI, precision, roundPrecision, siSuffixes, strictCheck, zeroPad;

siSuffixes = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', '', '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

zeroPad = function(number, pad) {
  var _, str, zeros;
  str = number.toString();
  if (str.length < pad) {
    zeros = pad - str.length;
    return ((function() {
      var i, ref, results;
      results = [];
      for (_ = i = 0, ref = zeros - 1; 0 <= ref ? i <= ref : i >= ref; _ = 0 <= ref ? ++i : --i) {
        results.push('0');
      }
      return results;
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
(function(){var NumberPicker, checkValue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

checkValue = function(numberPicker, context) {
  var max, min, oldValue, value;
  value = oldValue = context.value();
  max = numberPicker.max();
  min = numberPicker.min();
  if (max !== void 0) {
    value = hx.min([value, max]);
  }
  if (min !== void 0) {
    value = hx.max([value, min]);
  }
  if (value !== oldValue) {
    return context.value(value);
  }
};

NumberPicker = (function(superClass) {
  extend(NumberPicker, superClass);

  function NumberPicker(selector, options) {
    var button, container, select;
    this.selector = selector;
    NumberPicker.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this.options = hx.merge.defined({
      buttonClass: '',
      min: void 0,
      max: void 0
    }, options);
    this._ = {};
    container = hx.select(this.selector);
    select = container["class"]('hx-number-picker');
    button = select.append('button').attr('type', 'button')["class"]('hx-btn ' + this.options.buttonClass);
    button.append('i')["class"]('fa fa-chevron-up');
    button.on('click', 'hx.number-picker', (function(_this) {
      return function() {
        return _this.increment();
      };
    })(this));
    this.selectInput = select.append('input');
    this.selectInput.attr('type', 'number');
    this.selectInput.on('blur', 'hx.number-picker', (function(_this) {
      return function() {
        if (_this.selectInput.attr('readonly') == null) {
          checkValue(_this, _this.selectInput);
          _this.selectInput.attr('data-value', _this.selectInput.value());
        }
        _this.emit('input-change', {
          value: _this.value()
        });
        return _this.emit('change', {
          value: _this.value()
        });
      };
    })(this));
    button = select.append('button').attr('type', 'button')["class"]('hx-btn ' + this.options.buttonClass);
    button.append('i')["class"]('fa fa-chevron-down');
    button.on('click', 'hx.number-picker', (function(_this) {
      return function() {
        return _this.decrement();
      };
    })(this));
    if (this.options.max) {
      this.max(this.options.max);
    }
    if (this.options.min) {
      this.min(this.options.min);
    }
  }

  NumberPicker.prototype.value = function(value, screenValue) {
    if (arguments.length > 0) {
      if (this.options.max !== void 0 && value > this.max) {
        value = this.max;
      }
      if (this.min !== void 0 && value < this.min) {
        value = this.min;
      }
      if (screenValue && isNaN(screenValue)) {
        this.selectInput.attr('type', 'text').attr('readonly', '');
      } else {
        this.selectInput.attr('type', 'number').node().removeAttribute('readonly');
      }
      this.selectInput.value(screenValue || value);
      this.selectInput.attr('data-value', value);
      this.emit('change', {
        value: value
      });
      return this;
    } else {
      return Number(this.selectInput.attr('data-value'));
    }
  };

  NumberPicker.prototype.min = function(val) {
    if (arguments.length > 0) {
      this._.min = val;
      this.selectInput.attr('min', val);
      checkValue(this, this);
      return this;
    } else {
      return this._.min;
    }
  };

  NumberPicker.prototype.max = function(val) {
    if (arguments.length > 0) {
      this._.max = val;
      this.selectInput.attr('max', val);
      checkValue(this, this);
      return this;
    } else {
      return this._.max;
    }
  };

  NumberPicker.prototype.increment = function() {
    this.value(this.value() + 1);
    this.emit('increment');
    return this;
  };

  NumberPicker.prototype.decrement = function() {
    this.value(this.value() - 1);
    this.emit('decrement');
    return this;
  };

  return NumberPicker;

})(hx.EventEmitter);

hx.NumberPicker = NumberPicker;
})();
(function(){var addResizeListener, initializeResizeListeners, removeResizeListener;

addResizeListener = void 0;

removeResizeListener = void 0;


/**
* Detect Element Resize
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
*
 */

initializeResizeListeners = function() {
  var animation, animationKeyframes, animationName, animationStyle, animationstartevent, animationstring, attachEvent, cancelFrame, checkTriggers, createStyles, domPrefixes, elm, i, keyframeprefix, pfx, requestFrame, resetTriggers, scrollListener, startEvents, stylesCreated;
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
      css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }';
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

    /* Detect CSS Animations support to detect element display/re-attach */
    animation = false;
    animationstring = 'animation';
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
        animationstring = pfx + 'Animation';
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
};

hx.select.addEventAugmenter({
  name: 'resize',
  setup: function(node, eventEmitter) {
    var handler;
    if (typeof addResizeListener === "undefined" || addResizeListener === null) {
      initializeResizeListeners();
    }
    handler = function(e) {
      var box;
      box = hx.select(node).box();
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
})();
(function(){var Select, setValue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

setValue = function(select, value, items) {
  var i, item, len, results;
  results = [];
  for (i = 0, len = items.length; i < len; i++) {
    item = items[i];
    if (item === value || item.value === value) {
      select.current = item;
      select.options.renderer(select.selectedText.node(), item);
      break;
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Select = (function(superClass) {
  extend(Select, superClass);

  function Select(selector, options) {
    var button;
    Select.__super__.constructor.apply(this, arguments);
    hx.deprecatedWarning('hx.Select', 'hx.Select has been replaced with hx.Picker to avoid confusion with the selection api. Rename all uses of hx.Select to hx.Picker');
    this.options = hx.merge.defined({
      ddClass: '',
      items: [],
      noValueText: 'Choose a value...',
      renderer: void 0,
      startValue: void 0
    }, options);
    hx.component.register(selector, this);
    this.selection = hx.select(selector);
    this.current = void 0;
    button = this.selection.classed('hx-select', true).append('span')["class"]('hx-select-inner');
    this.selectedText = button.append('span')["class"]('hx-select-text');
    button.append('span')["class"]('hx-select-icon').append('i')["class"]('fa fa fa-caret-down');
    this.menu = new hx.Menu(selector, {
      ddClass: this.options.ddClass
    });
    this.menu.on('change', 'hx.select', (function(_this) {
      return function(item) {
        if ((item != null ? item.content : void 0) != null) {
          _this.current = item.content;
          _this.selectedText.text(_this.current.text || _this.current);
          _this.menu.hide();
          return _this.emit('change', _this.current);
        }
      };
    })(this));
    if (this.options.renderer != null) {
      this.renderer(this.options.renderer);
    } else {
      this.options.renderer = this.menu.renderer();
    }
    if ((this.options.items != null) && this.options.items.length > 0) {
      this.items(this.options.items);
    }
    if (this.options.startValue != null) {
      this.value(this.options.startValue);
    }
    if ((this.current == null) && (this.options.noValueText != null)) {
      this.selectedText.text(this.options.noValueText);
    }
    this.menu.pipe(this, '', ['highlight']);
    this.menu.dropdown.pipe(this, 'dropdown');
  }

  Select.prototype.renderer = function(f) {
    if (f != null) {
      this.options.renderer = f;
      this.menu.renderer(f);
      return this;
    } else {
      return this.options.renderer;
    }
  };

  Select.prototype.items = function(items) {
    if (items != null) {
      this.options.items = items;
      this.menu.items(items);
      return this;
    } else {
      return this.options.items;
    }
  };

  Select.prototype.value = function(value) {
    var loading;
    if (arguments.length > 0) {
      if (hx.isFunction(this.items())) {
        loading = this.selection.prepend('span');
        loading.append('i')["class"]('hx-menu-loading fa fa-spin fa-spinner');
        this.items()((function(_this) {
          return function(data) {
            loading.remove();
            return setValue(_this, value, data);
          };
        })(this));
      } else {
        setValue(this, value, this.items());
      }
      return this;
    } else {
      return this.current;
    }
  };

  return Select;

})(hx.EventEmitter);

hx.Select = Select;
})();
(function(){var buildFilter, filterCaseModifier, filterMatch;

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
  if (options.searchValues != null) {
    ref = options.searchValues(item);
    for (j = 0, len = ref.length; j < len; j++) {
      e = ref[j];
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
    options = hx.merge.defined({
      caseSensitive: false,
      searchValues: void 0,
      sort: true
    }, options);
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
        } else if (options.searchValues != null) {
          r = 0;
          aArr = options.searchValues(a);
          bArr = options.searchValues(b);
          for (i = j = 0, ref = aArr.length; j < ref; i = j += 1) {
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
(function(){var DatePicker, Localiser, LocaliserMoment, buildCalendar, buildDatepicker, calendarGridRowUpdate, calendarGridUpdate, disabled, getCalendarDecade, getCalendarMonth, getCalendarYear, isBetweenDates, isSelectable, isSelected, isToday, setupInput, updateDatepicker, validateDates, zeroPad,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

zeroPad = hx.format.zeroPad(2);

getCalendarMonth = function(year, month, weekStart) {
  var _, e, end, i, j, k, ref, results, results1, results2, start;
  start = (new Date(year, month)).getDay() - weekStart;
  if (start < 0) {
    start += 7;
  }
  end = new Date(year, month + 1, 0).getDate();
  results = [];
  results.push(start > 0 ? ((function() {
    var k, ref1, results2;
    results2 = [];
    for (_ = k = 0, ref1 = start - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; _ = 0 <= ref1 ? ++k : --k) {
      results2.push(void 0);
    }
    return results2;
  })()).concat((function() {
    results1 = [];
    for (var j = 1, ref = 7 - start; 1 <= ref ? j <= ref : j >= ref; 1 <= ref ? j++ : j--){ results1.push(j); }
    return results1;
  }).apply(this)) : [1, 2, 3, 4, 5, 6, 7]);
  i = 1 - start;
  while (i < end) {
    i += 7;
    e = Math.min(i + 6, end);
    if (i <= e) {
      results.push((function() {
        results2 = [];
        for (var k = i; i <= e ? k <= e : k >= e; i <= e ? k++ : k--){ results2.push(k); }
        return results2;
      }).apply(this));
    }
  }
  if (results[results.length - 1].length < 7) {
    results[results.length - 1].length = 7;
  }
  return results;
};

getCalendarYear = function() {
  return [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];
};

getCalendarDecade = function(year) {
  var i, j, res, row;
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
  return selectedDate.getFullYear() === year && ((month == null) || selectedDate.getMonth() === month) && ((day == null) || selectedDate.getDate() === day);
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
  return date.toString() === today.toString();
};

validateDates = function(datepicker) {
  var _, isRangePicker, tDate;
  _ = datepicker._;
  isRangePicker = datepicker.options.selectRange;
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
  _.endDate.setHours(0, 0, 0, 0);
  _.startDate.setHours(0, 0, 0, 0);
};

disabled = function(datepicker, disable) {
  var _, val;
  if ((datepicker.dropdown != null) && datepicker.dropdown.isOpen()) {
    datepicker.dropdown.hide();
  }
  val = disable ? '' : void 0;
  _ = datepicker._;
  _.disabled = disable;
  if (datepicker.options.selectRange) {
    _.inputStart.attr('disabled', val);
    _.inputEnd.attr('disabled', val);
  } else {
    _.input.attr('disabled', val);
  }
  return this;
};

buildCalendar = function(datepicker, mode) {
  var _, cls, data, localiser, ref, text, visible;
  _ = datepicker._;
  _.calendarGrid.selectAll('.hx-grid-row').remove();
  _.calendarView = _.calendarGrid.view('.hx-grid-row', 'div').update(function(d, e, i) {
    return calendarGridUpdate(datepicker, d, e, i, mode);
  });
  if (mode == null) {
    mode = _.mode;
  }
  _.mode = mode;
  localiser = datepicker.localiser;
  visible = datepicker.visibleMonth();
  switch (mode) {
    case 'd':
      data = getCalendarDecade(visible.year);
      cls = 'hx-calendar-decade';
      text = localiser.localiseDecade(data[0][1], data[3][1]);
      break;
    case 'y':
      data = getCalendarYear();
      cls = 'hx-calendar-year';
      text = localiser.localiseYear(visible.year);
      break;
    default:
      data = getCalendarMonth(visible.year, visible.month - 1, localiser.localiseWeekStart());
      data.unshift('days');
      cls = 'hx-calendar-month';
      text = localiser.localiseMonth(visible.month - 1) + ' / ' + localiser.localiseYear(visible.year);
  }
  _.calendarGrid["class"]('hx-calendar-grid ' + cls);
  _.calendarHeadBtn.text(text);
  if ((ref = _.calendarTodayButton) != null) {
    ref.text(localiser.localiseToday());
  }
  return _.calendarView.apply(data);
};

calendarGridUpdate = function(datepicker, data, elem, index, mode) {
  var _, element;
  _ = datepicker._;
  element = hx.select(elem);
  if (data === 'days') {
    return element.view('.hx-grid-row-heading').enter(function(d) {
      var node;
      this.classed('hx-grid-row-heading', true);
      node = this.append('div')["class"]('hx-grid');
      return node.node();
    }).update(function(d) {
      return this.text(d).node();
    }).apply(datepicker.localiser.localiseWeek());
  } else {
    return element.view('.hx-grid').enter(function(d) {
      var node;
      node = this.append('div')["class"]('hx-grid');
      if (datepicker.options.selectRange) {
        node.append('div')["class"]('hx-grid-range-bg');
      }
      node.append('div')["class"]('hx-grid-text');
      return node.node();
    }).update(function(d, e, i) {
      return calendarGridRowUpdate(datepicker, d, e, i, index, mode);
    }).apply(data);
  }
};

calendarGridRowUpdate = function(datepicker, data, elem, index, rowIndex, mode) {
  var _, betweenDates, day, element, isValid, month, range, screenVal, selectable, selected, selectedE, selectedS, today, visible, year;
  _ = datepicker._;
  element = hx.select(elem);
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
        screenVal = datepicker.localiser.localiseYear(data);
        selectable = rowIndex === 0 ? index !== 0 : rowIndex === 3 ? index !== 2 : true;
        break;
      case 'y':
        month = data;
        year = visible.year;
        screenVal = datepicker.localiser.localiseMonth(data);
        break;
      default:
        day = data;
        month = visible.month - 1;
        year = visible.year;
        screenVal = datepicker.localiser.localiseDay(data);
    }
    isValid = isSelectable(datepicker, year, month, day) && selectable;
    if (datepicker.options.selectRange) {
      range = datepicker.range();
      selectedS = isSelected(range.start, year, month, day);
      selectedE = isSelected(range.end, year, month, day);
      betweenDates = isBetweenDates(range, year, month, day);
      selected = selectedS || selectedE;
    } else {
      selected = isSelected(datepicker.date(), year, month, day);
    }
    today = day && isToday(year, month, day);
    element.classed('hx-grid-out-of-range', !isValid).classed('hx-grid-selected', selected).classed('hx-grid-selected-start', selectedS).classed('hx-grid-selected-end', selectedE).classed('hx-grid-selected-range', betweenDates).classed('hx-grid-today', today);
    element.select('.hx-grid-text').text(screenVal);
    if (isValid) {
      return element.on('click', 'hx-datepicker', function() {
        var date, nMode;
        _.userEvent = true;
        if (mode !== 'd' && mode !== 'y') {
          if (day != null) {
            date = new Date(visible.year, visible.month - 1, day);
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
                  start: datepicker.date(),
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

buildDatepicker = function(datepicker) {
  var _, day, localiser, month, year;
  _ = datepicker._;
  day = datepicker.day();
  month = datepicker.month();
  year = datepicker.year();
  localiser = datepicker.localiser;
  _.dayPicker.suppressed('change', true);
  _.monthPicker.suppressed('change', true);
  _.yearPicker.suppressed('change', true);
  _.dayPicker.value(day, localiser.localiseDay(day, true));
  _.monthPicker.value(month, localiser.localiseMonth(month - 1, true));
  _.yearPicker.value(year, localiser.localiseYear(year));
  _.dayPicker.suppressed('change', false);
  _.monthPicker.suppressed('change', false);
  return _.yearPicker.suppressed('change', false);
};

setupInput = function(datepicker) {
  var _, range;
  _ = datepicker._;
  if (datepicker.options.selectRange) {
    range = datepicker.range();
    _.inputStart.value(datepicker.localiser.localiseDate(range.start, _.useInbuilt));
    return _.inputEnd.value(datepicker.localiser.localiseDate(range.end || range.start, _.useInbuilt));
  } else {
    return _.input.value(datepicker.localiser.localiseDate(datepicker.date(), _.useInbuilt));
  }
};

updateDatepicker = function(datepicker) {
  var _;
  _ = datepicker._;
  validateDates(datepicker);
  if (!_.preventFeedback) {
    _.preventFeedback = true;
    if (datepicker.options.selectRange) {
      _.inputStart.classed('hx-date-error', false);
      _.inputEnd.classed('hx-date-error', false);
    } else {
      _.input.classed('hx-date-error', false);
    }
    setupInput(datepicker);
    datepicker.emit('change', {
      type: _.userEvent ? 'user' : 'api'
    });
    _.userEvent = false;
    _.preventFeedback = false;
    if (datepicker.options.type === 'calendar') {
      return buildCalendar(datepicker);
    } else {
      return buildDatepicker(datepicker);
    }
  }
};

Localiser = (function() {
  function Localiser() {
    this.currentLocale = 'en-gb';
  }

  Localiser.prototype.dateOrder = function() {
    return ['DD', 'MM', 'YYYY'];
  };

  Localiser.prototype.localiseWeekStart = function() {
    return 0;
  };

  Localiser.prototype.localiseWeek = function() {
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  };

  Localiser.prototype.localiseDay = function(day, pad) {
    if (pad) {
      return zeroPad(day);
    } else {
      return day;
    }
  };

  Localiser.prototype.localiseMonth = function(month, short) {
    if (short) {
      return zeroPad(month + 1);
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
    }
  };

  Localiser.prototype.localiseYear = function(year) {
    return year;
  };

  Localiser.prototype.localiseDecade = function(start, end) {
    return this.localiseYear(start) + ' - ' + this.localiseYear(end);
  };

  Localiser.prototype.localiseDate = function(date, useInbuilt) {
    if (useInbuilt) {
      return date.getFullYear() + '-' + zeroPad(date.getMonth() + 1) + '-' + zeroPad(date.getDate());
    } else {
      return zeroPad(date.getDate()) + '/' + zeroPad(date.getMonth() + 1) + '/' + date.getFullYear();
    }
  };

  Localiser.prototype.localiseToday = function() {
    return 'Today';
  };

  Localiser.prototype.locale = function(locale) {
    if (locale != null) {

    } else {
      return 'en-gb';
    }
  };

  Localiser.prototype.stringToDate = function(dateString, inbuilt) {
    var allValid, day, daysValid, format, i, j, len, month, monthsValid, order, part, split, w, year, yearsValid;
    if (inbuilt) {
      order = ['YYYY', 'MM', 'DD'];
      split = dateString.split('-');
    } else {
      order = this.dateOrder();
      split = dateString.split('/');
    }
    allValid = split.length === 3 && !split.some(function(e) {
      return e === '' || e === '0';
    });
    if (allValid) {
      format = '';
      for (i = j = 0, len = order.length; j < len; i = ++j) {
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
        }
      }
      if (daysValid && monthsValid && yearsValid) {
        return new Date(year, month - 1, day);
      } else {
        return new Date('Invalid Date');
      }
    } else {
      return new Date('Invalid Date');
    }
  };

  return Localiser;

})();

LocaliserMoment = (function() {
  function LocaliserMoment() {
    this.currentLocale = moment.locale();
  }

  LocaliserMoment.prototype.dateOrder = function() {
    var date, dateCheck, dayIndex, i, j, monthIndex, ref, result, yearIndex;
    date = moment({
      year: 2003,
      month: 11,
      day: 22
    }).locale(this.currentLocale);
    dateCheck = date.format('L');
    yearIndex = dateCheck.indexOf(date.format('YYYY'));
    monthIndex = dateCheck.indexOf(date.format('MM'));
    dayIndex = dateCheck.indexOf(date.format('DD'));
    result = [];
    for (i = j = 0, ref = dateCheck.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
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

  LocaliserMoment.prototype.localiseWeekStart = function() {
    return moment().weekday(0).toDate().getDay();
  };

  LocaliserMoment.prototype.localiseWeek = function() {
    var dayDate, dayNames, i, j;
    dayDate = moment().weekday(0);
    dayDate.locale(this.currentLocale);
    dayNames = [dayDate.format('dd')];
    for (i = j = 0; j < 6; i = ++j) {
      dayNames.push(dayDate.add(1, 'd').format('dd'));
    }
    return dayNames;
  };

  LocaliserMoment.prototype.localiseDay = function(day, pad) {
    return moment({
      day: day,
      month: 0
    }).locale(this.currentLocale).format(pad ? 'DD' : 'D');
  };

  LocaliserMoment.prototype.localiseMonth = function(month, short) {
    return moment({
      month: month
    }).locale(this.currentLocale).format(short ? 'MM' : 'MMM');
  };

  LocaliserMoment.prototype.localiseYear = function(year) {
    return moment({
      year: year
    }).locale(this.currentLocale).format('YYYY');
  };

  LocaliserMoment.prototype.localiseDecade = function(start, end) {
    return this.localiseYear(start) + ' - ' + this.localiseYear(end);
  };

  LocaliserMoment.prototype.localiseDate = function(date) {
    return moment(date).locale(this.currentLocale).format('L');
  };

  LocaliserMoment.prototype.localiseToday = function() {
    var i, j, ref, today, todayArr, tomorrow, tomorrowArr;
    today = moment({
      hour: 12,
      minute: 0,
      second: 0
    }).locale(this.currentLocale);
    tomorrow = today.clone().add(1, 'day');
    todayArr = today.calendar().split('').reverse();
    tomorrowArr = tomorrow.calendar().split('').reverse();
    for (i = j = 0, ref = todayArr.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (todayArr[i] !== tomorrowArr[i]) {
        break;
      }
    }
    todayArr.splice(0, i);
    return todayArr.reverse().join('');
  };

  LocaliserMoment.prototype.locale = function(locale) {
    if (locale != null) {
      return this.currentLocale = locale;
    } else {
      return this.currentLocale;
    }
  };

  LocaliserMoment.prototype.stringToDate = function(dateString) {
    var allValid, daysValid, format, i, j, len, monthsValid, order, part, split, w, yearsValid;
    order = this.dateOrder();
    split = dateString.split('/');
    allValid = split.length === 3 && !split.some(function(e) {
      return e === '' || e === '0';
    });
    if (allValid) {
      format = '';
      for (i = j = 0, len = order.length; j < len; i = ++j) {
        w = order[i];
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
        return moment(dateString, format, this.currentLocale).toDate();
      } else {
        return new Date('Invalid Date');
      }
    } else {
      return new Date('Invalid Date');
    }
  };

  return LocaliserMoment;

})();

DatePicker = (function(superClass) {
  extend(DatePicker, superClass);

  function DatePicker(selector, options) {
    var _, calendarElem, calendarHeader, changeVis, dayNode, icon, inputContainer, inputUpdate, monthNode, self, setupDropdown, timeout, yearNode;
    this.selector = selector;
    DatePicker.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    self = this;
    this.options = hx.merge.defined({
      type: 'calendar',
      defaultView: 'm',
      closeOnSelect: true,
      selectRange: false,
      showTodayButton: true,
      allowInbuiltPicker: true,
      disabled: false
    }, options);
    _ = this._ = {
      disabled: this.options.disabled,
      mode: this.options.defaultView,
      startDate: new Date,
      endDate: new Date
    };
    _.startDate.setHours(0, 0, 0, 0);
    _.endDate.setHours(0, 0, 0, 0);
    this.localiser = typeof moment !== "undefined" && moment !== null ? new LocaliserMoment : new Localiser;
    this.selection = hx.select(this.selector).classed('hx-date-picker', true);
    inputContainer = this.selection.append('div')["class"]('hx-date-input-container');
    icon = inputContainer.append('i')["class"]('fa fa-calendar');
    timeout = void 0;
    if (this.options.selectRange) {
      this.options.type = 'calendar';
      this.options.showTodayButton = false;
      _.preventFeedback = true;
      this.range({});
      _.preventFeedback = false;
      inputUpdate = function(which) {
        self.hide();
        clearTimeout(timeout);
        return timeout = setTimeout(function() {
          var date1, date2, endValid, startValid;
          date1 = self.localiser.stringToDate(_.inputStart.value(), _.useInbuilt);
          date2 = self.localiser.stringToDate(_.inputEnd.value(), _.useInbuilt);
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
      _.inputStart = inputContainer.append('input')["class"]('hx-date-input').on('input', 'hx.date-picker', function() {
        return inputUpdate(false);
      });
      inputContainer.append('i')["class"]('hx-date-to-icon fa fa-angle-double-right');
      _.inputEnd = inputContainer.append('input')["class"]('hx-date-input').on('input', 'hx.date-picker', function() {
        return inputUpdate(true);
      });
    } else {
      _.useInbuilt = this.options.allowInbuiltPicker ? (typeof moment === "undefined" || moment === null) && hx.supports('date') && hx.supports('touch') : false;
      _.input = inputContainer.append('input')["class"]('hx-date-input').on((_.useInbuilt ? 'blur' : 'input'), 'hx.date-picker', function() {
        self.hide();
        clearTimeout(timeout);
        return timeout = setTimeout(function() {
          var date;
          date = self.localiser.stringToDate(_.input.value(), _.useInbuilt);
          if (date.getTime()) {
            self.date(date);
            if (self.options.type === 'calendar') {
              return self.visibleMonth(date.getMonth() + 1, date.getFullYear());
            }
          } else {
            return _.input.classed('hx-date-error', true);
          }
        }, 500);
      });
      if (_.useInbuilt) {
        _.input.attr('type', 'date');
      }
    }
    if (this.options.type === 'calendar') {
      this.visibleMonth(void 0);
      changeVis = function(multiplier) {
        var month, visible, year;
        if (multiplier == null) {
          multiplier = 1;
        }
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
      calendarElem = hx.detached('div');
      calendarElem["class"]('hx-datepicker-calendar');
      calendarHeader = calendarElem.append('div')["class"]('hx-calendar-header');
      calendarHeader.append('button')["class"]('hx-btn hx-btn-invisible hx-calendar-back').on('click', 'hx.date-picker', function() {
        return changeVis(-1);
      }).append('i')["class"]('fa fa-chevron-left');
      _.calendarHeadBtn = calendarHeader.append('button')["class"]('hx-btn hx-btn-invisible hx-calendar-button').on('click', 'hx.date-picker', function() {
        switch (_.mode) {
          case 'd':
            break;
          case 'y':
            return buildCalendar(self, 'd');
          default:
            return buildCalendar(self, 'y');
        }
      });
      calendarHeader.append('button')["class"]('hx-btn hx-btn-invisible hx-calendar-forward').on('click', 'hx.date-picker', function() {
        return changeVis();
      }).append('i')["class"]('fa fa-chevron-right');
      _.calendarGrid = calendarElem.append('div')["class"]('hx-calendar-grid');
      if (this.options.showTodayButton) {
        _.calendarTodayButton = calendarElem.append('div')["class"]('hx-calendar-today-btn').append('button')["class"]('hx-btn hx-btn-invisible').on('click', 'hx.date-picker', function() {
          var date;
          date = new Date();
          date.setHours(0, 0, 0, 0);
          self.date(date);
          buildCalendar(self, 'm');
          if (self.options.closeOnSelect) {
            return self.hide();
          }
        });
      }
      setupDropdown = function(elem) {
        var selection;
        if (!_.disabled) {
          _.clickStart = true;
          selection = hx.select(elem);
          selection.append(calendarElem);
          return buildCalendar(self, self.options.defaultView);
        } else {
          return self.hide();
        }
      };
    } else {
      dayNode = hx.detached('div').node();
      monthNode = hx.detached('div').node();
      yearNode = hx.detached('div').node();
      _.dayPicker = new hx.NumberPicker(dayNode).on('change', 'hx.date-picker', function(e) {
        _.userEvent = true;
        return self.day(e.value);
      });
      _.monthPicker = new hx.NumberPicker(monthNode).on('change', 'hx.date-picker', function(e) {
        _.userEvent = true;
        return self.month(e.value);
      });
      _.yearPicker = new hx.NumberPicker(yearNode).on('change', 'hx.date-picker', function(e) {
        _.userEvent = true;
        return self.year(e.value);
      });
      _.dayPicker.selectInput.attr('tabindex', 1);
      _.monthPicker.selectInput.attr('tabindex', 2);
      _.yearPicker.selectInput.attr('tabindex', 3);
      setupDropdown = function(elem) {
        var i, j, len, ref, selection;
        if (!_.disabled) {
          selection = hx.select(elem);
          ref = self.localiser.dateOrder();
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
        } else {
          return self.dropdown.hide();
        }
      };
    }
    if (!_.useInbuilt) {
      this.dropdown = new hx.Dropdown(this.selector, setupDropdown, {
        matchWidth: false
      });
      this.dropdown.pipe(this, void 0, ['show', 'hide']);
    }
    setupInput(this);
    if (_.disabled) {
      this.disable();
    }
  }

  DatePicker.prototype.disable = function() {
    return disabled(this, true);
  };

  DatePicker.prototype.enable = function() {
    return disabled(this, false);
  };

  DatePicker.prototype.show = function() {
    if (!this._.useInbuilt) {
      this.dropdown.show();
    }
    return this;
  };

  DatePicker.prototype.hide = function() {
    if (!this._.useInbuilt) {
      this.dropdown.hide();
    }
    return this;
  };

  DatePicker.prototype.getScreenDate = function(endDate) {
    return this.localiser.localiseDate(!endDate ? _.startDate : _.endDate);
  };

  DatePicker.prototype.visibleMonth = function(month, year) {
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
      hx.consoleWarning('Setting the visible month only applies to date pickers of type \'calendar\'');
      return this;
    }
  };

  DatePicker.prototype.date = function(date) {
    var _;
    _ = this._;
    if (date != null) {
      date = new Date(date.getTime());
      date.setHours(0, 0, 0, 0);
      _.startDate = date;
      updateDatepicker(this);
      return this;
    } else {
      return new Date(_.startDate.getTime());
    }
  };

  DatePicker.prototype.day = function(day) {
    var _;
    _ = this._;
    if (day != null) {
      _.startDate.setDate(day);
      updateDatepicker(this);
      return this;
    } else {
      return _.startDate.getDate();
    }
  };

  DatePicker.prototype.month = function(month) {
    var _;
    _ = this._;
    if (month != null) {
      _.startDate.setMonth(month - 1);
      updateDatepicker(this);
      return this;
    } else {
      return _.startDate.getMonth() + 1;
    }
  };

  DatePicker.prototype.year = function(year) {
    var _;
    _ = this._;
    if (year != null) {
      _.startDate.setFullYear(year);
      updateDatepicker(this);
      return this;
    } else {
      return _.startDate.getFullYear();
    }
  };

  DatePicker.prototype.range = function(range) {
    var _;
    _ = this._;
    if (this.options.selectRange) {
      if (arguments.length > 0) {
        if (range.start != null) {
          range.start.setHours(0, 0, 0, 0);
          _.startDate = range.start;
        }
        if (range.end != null) {
          range.end.setHours(0, 0, 0, 0);
          _.endDate = range.end;
        }
        updateDatepicker(this);
        return this;
      } else {
        return {
          start: _.startDate,
          end: _.endDate
        };
      }
    } else {
      hx.consoleWarning('datePicker.range can only be used for datepickers with \'selectRange\' of true');
      return this;
    }
  };

  DatePicker.prototype.validRange = function(validRange) {
    var _, ref, ref1;
    _ = this._;
    if (_.validRange == null) {
      _.validRange = {
        start: void 0,
        end: void 0
      };
    }
    if (arguments.length > 0) {
      if ('start' in validRange) {
        _.validRange.start = validRange.start;
      }
      if ('end' in validRange) {
        _.validRange.end = validRange.end;
      }
      if ((ref = _.validRange.start) != null) {
        ref.setHours(0, 0, 0, 0);
      }
      if ((ref1 = _.validRange.end) != null) {
        ref1.setHours(0, 0, 0, 0);
      }
      updateDatepicker(this);
      return this;
    } else {
      return _.validRange;
    }
  };

  DatePicker.prototype.locale = function(locale) {
    if (arguments.length > 0) {
      this.localiser.locale(locale);
      updateDatepicker(this);
      return this;
    } else {
      return this.localiser.locale();
    }
  };

  return DatePicker;

})(hx.EventEmitter);

hx.DatePicker = DatePicker;
})();
(function(){var Localiser, LocaliserMoment, TimePicker, disabled, setupInput, setupTimepicker, updateTimePicker, zeroPad,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

zeroPad = hx.format.zeroPad(2);

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

setupInput = function(timepicker) {
  timepicker.input.classed('hx-short-time', !timepicker.options.showSeconds);
  return timepicker.input.value(timepicker.getScreenTime(timepicker.options.showSeconds));
};

updateTimePicker = function(timepicker) {
  var _;
  if (!timepicker.preventFeedback) {
    _ = timepicker._;
    timepicker.preventFeedback = true;
    timepicker.input.classed('hx-time-error', false);
    setupInput(timepicker);
    timepicker.emit('change', {
      type: _.userEvent ? 'user' : 'api'
    });
    _.userEvent = false;
    timepicker.preventFeedback = false;
    return setupTimepicker(timepicker);
  }
};

disabled = function(timepicker, disable) {
  var val;
  timepicker.dropdown.hide();
  val = disable ? '' : void 0;
  timepicker.input.attr('disabled', val);
  return this;
};

Localiser = (function() {
  function Localiser() {
    this.currentLocale = 'en-gb';
  }

  Localiser.prototype.localiseTime = function(date, showSeconds) {
    var timeString;
    timeString = date.getHours() + ':' + zeroPad(date.getMinutes());
    if (showSeconds) {
      timeString += ':' + zeroPad(date.getSeconds());
    }
    return timeString;
  };

  Localiser.prototype.checkTime = function(time) {
    return !isNaN(time[0]) && !isNaN(time[1]) && !isNaN(time[2]);
  };

  Localiser.prototype.locale = function(locale) {
    if (locale != null) {

    } else {
      return 'en-gb';
    }
  };

  return Localiser;

})();

LocaliserMoment = (function() {
  function LocaliserMoment() {
    this.currentLocale = moment.locale();
  }

  LocaliserMoment.prototype.localiseTime = function(date, showSeconds) {
    var format;
    format = showSeconds ? 'H:mm:ss' : 'H:mm';
    return moment(date).locale(this.currentLocale).format(format);
  };

  LocaliserMoment.prototype.checkTime = function(time) {
    return moment({
      hours: time[0],
      minutes: time[1],
      seconds: time[2]
    }).locale(this.currentLocale).isValid();
  };

  LocaliserMoment.prototype.locale = function(locale) {
    if (locale) {
      return this.currentLocale = locale;
    } else {
      return this.currentLocale;
    }
  };

  return LocaliserMoment;

})();

TimePicker = (function(superClass) {
  extend(TimePicker, superClass);

  function TimePicker(selector, options) {
    var _, hourNode, icon, inputContainer, minuteNode, second, setupDropdown, timeout;
    this.selector = selector;
    TimePicker.__super__.constructor.apply(this, arguments);
    this.options = hx.merge({
      showSeconds: false,
      buttonClass: ''
    }, options);
    hx.component.register(this.selector, this);
    _ = this._ = {};
    _.localiser = typeof moment !== "undefined" && moment !== null ? new LocaliserMoment() : new Localiser();
    _.selectedDate = new Date;
    _.selectedDate.setMilliseconds(0);
    if (!this.showSeconds) {
      _.selectedDate.setSeconds(0);
    }
    this.selection = hx.select(this.selector).classed('hx-time-picker', true);
    inputContainer = this.selection.append('div')["class"]('hx-time-input-container');
    icon = inputContainer.append('i')["class"]('fa fa-clock-o');
    this.input = inputContainer.append('input')["class"]('hx-time-input');
    timeout = void 0;
    this.input.on('input', 'hx.time-picker', (function(_this) {
      return function(event) {
        clearTimeout(timeout);
        return timeout = setTimeout(function() {
          var time;
          time = event.target.value.split(':');
          if (time[2] == null) {
            time[2] = 0;
          }
          if (_.localiser.checkTime(time)) {
            _this.hour(time[0]);
            _this.minute(time[1]);
            return _this.second(time[2] || 0);
          } else {
            return _this.input.classed('hx-time-error', true);
          }
        }, 200);
      };
    })(this));
    setupInput(this);
    hourNode = hx.detached('div').node();
    minuteNode = hx.detached('div').node();
    second = hx.detached('div').node();
    this.hourPicker = new hx.NumberPicker(hourNode, {
      buttonClass: this.options.buttonClass
    }).on('change', 'hx.time-picker', (function(_this) {
      return function(e) {
        _.userEvent = true;
        return _this.hour(e.value);
      };
    })(this));
    this.hourPicker.selectInput.attr('tabindex', 1).attr('maxlength', '2');
    this.minutePicker = new hx.NumberPicker(minuteNode, {
      buttonClass: this.options.buttonClass
    }).on('change', 'hx.time-picker', (function(_this) {
      return function(e) {
        _.userEvent = true;
        return _this.minute(e.value);
      };
    })(this));
    this.minutePicker.selectInput.attr('tabindex', 2).attr('maxlength', '2');
    this.secondPicker = new hx.NumberPicker(second, {
      buttonClass: this.options.buttonClass
    }).on('change', 'hx.time-picker', (function(_this) {
      return function(e) {
        _.userEvent = true;
        return _this.second(e.value);
      };
    })(this));
    this.secondPicker.selectInput.attr('tabindex', 3).attr('maxlength', '2');
    setupDropdown = (function(_this) {
      return function(elem) {
        var selection;
        if (_this.input.attr('disabled') === null) {
          selection = hx.select(elem);
          selection.append(hourNode);
          selection.append(minuteNode);
          if (_this.options.showSeconds) {
            selection.append(second);
          }
          return setupTimepicker(_this);
        } else {
          return _this.dropdown.hide();
        }
      };
    })(this);
    this.dropdown = new hx.Dropdown(this.selector, setupDropdown, {
      matchWidth: false,
      ddClass: 'hx-time-picker-dropdown'
    });
    this.dropdown.pipe(this, null, ['show', 'hide']);
    this;
  }

  TimePicker.prototype.date = function(date, retainTime) {
    var _;
    _ = this._;
    if (arguments.length > 0 && (date != null)) {
      date = new Date(date.getTime());
      if (retainTime) {
        date.setHours(this.hour(), this.minute(), this.second(), 0);
      }
      _.selectedDate = date;
      updateTimePicker(this);
      return this;
    } else {
      return new Date(_.selectedDate.getTime());
    }
  };

  TimePicker.prototype.hour = function(hour) {
    var _;
    _ = this._;
    if (arguments.length > 0 && (hour != null)) {
      _.selectedDate.setHours(hour);
      updateTimePicker(this);
      return this;
    } else {
      return _.selectedDate.getHours();
    }
  };

  TimePicker.prototype.minute = function(minute) {
    var _;
    _ = this._;
    if (arguments.length > 0 && (minute != null)) {
      _.selectedDate.setMinutes(minute);
      updateTimePicker(this);
      return this;
    } else {
      return _.selectedDate.getMinutes();
    }
  };

  TimePicker.prototype.second = function(second) {
    var _;
    _ = this._;
    if (arguments.length > 0 && (second != null)) {
      _.selectedDate.setSeconds(second);
      updateTimePicker(this);
      return this;
    } else {
      return _.selectedDate.getSeconds();
    }
  };

  TimePicker.prototype.getScreenTime = function() {
    return this._.localiser.localiseTime(this.date(), this.options.showSeconds);
  };

  TimePicker.prototype.locale = function(locale) {
    if (arguments.length > 0) {
      this._.localiser.locale(locale);
      updateTimePicker(this);
      return this;
    } else {
      return this._.localiser.locale();
    }
  };

  TimePicker.prototype.disable = function() {
    disabled(this, true);
    return this;
  };

  TimePicker.prototype.enable = function() {
    disabled(this, false);
    return this;
  };

  return TimePicker;

})(hx.EventEmitter);

hx.TimePicker = TimePicker;
})();
(function(){var hasResponse, hx_xhr, performRequest, reshapedRequest, respondToRequest, sendRequest;

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
  var e, error1, result, source, status;
  status = request.status;
  source = data != null ? {
    url: url,
    data: data
  } : url;
  if (!status && hasResponse(request) || status >= 200 && status < 300 || status === 304) {
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
  request.overrideMimeType(options.contentType);
  sendData = (data != null) && typeof data !== 'string' ? JSON.stringify(data) : data;
  return request.send(sendData);
};

performRequest = function(url, data, callback, options, index) {
  var base, base1, defaults, request, respond;
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
  options = hx.merge(defaults, options);
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
      if (hx.isObject(url)) {
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

hx.request = function() {
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
    console.error('Incorrect URL passed into hx.request: ', urls);
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
  options = hx.merge(defaults, options);
  return hx.request(urls, data, callback, options);
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
(function(){var TagInput,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TagInput = (function(superClass) {
  extend(TagInput, superClass);

  function TagInput(selector, options) {
    var _, backspacedown;
    this.selector = selector;
    TagInput.__super__.constructor.apply(this, arguments);
    _ = this._ = {};
    this.options = hx.merge.defined({
      classifier: void 0,
      validator: void 0
    }, options);
    hx.component.register(this.selector, this);
    this.selection = hx.select(this.selector).classed('hx-tag-input', true);
    this.tagContainer = this.selection.append('span')["class"]('hx-tags-container');
    this.form = this.selection.append('form');
    this.input = this.form.append('input').attr('placeholder', 'add tag...');
    backspacedown = false;
    this.form.on('keypress', 'hx.tag-input', (function(_this) {
      return function(event) {
        var name;
        if (event.keyCode === 13) {
          if (_this.form.node().checkValidity()) {
            event.preventDefault();
            name = _this.input.value();
            if (name) {
              _.userEvent = true;
              _this.add(name, void 0);
              return _this.input.value('');
            }
          }
        }
      };
    })(this));
    this.input.on('input', 'hx.tag-input', (function(_this) {
      return function() {
        var error, name;
        name = _this.input.value();
        if (_this.options.validator) {
          error = _this.options.validator(name);
          return _this.input.node().setCustomValidity(error || '');
        } else if (name === '') {
          return _this.input.node().setCustomValidity('');
        }
      };
    })(this));
    this.input.on('keydown', 'hx.tag-input', (function(_this) {
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
    this.input.on('keyup', 'hx.tag-input', function(event) {
      if ((event.keyCode || event.charCode) === 8) {
        backspacedown = false;
        return true;
      }
    });
  }

  TagInput.prototype.add = function(name, cssclass) {
    var cls, i, len, n, tagSelection;
    if (hx.isArray(name)) {
      for (i = 0, len = name.length; i < len; i++) {
        n = name[i];
        this.add(n, cssclass);
      }
    } else {
      tagSelection = this.tagContainer.append('span').text(name);
      if (cssclass) {
        tagSelection["class"]('hx-tag ' + cssclass);
      } else {
        tagSelection["class"]('hx-tag');
      }
      if (this.options.classifier) {
        cls = this.options.classifier(name);
        if (cls) {
          tagSelection.classed(cls, true);
        }
      }
      tagSelection.on('click', 'hx.tag-input', (function(_this) {
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
      this.emit('add', {
        value: name,
        type: this._.userEvent ? 'user' : 'api'
      });
      this._.userEvent = false;
    }
    return this;
  };

  TagInput.prototype.remove = function(name) {
    var tags, values;
    if (name != null) {
      return this.tagContainer.selectAll('.hx-tag').filter(function(d) {
        return hx.select(d).text() === name;
      }).forEach((function(_this) {
        return function(d) {
          return _this.emit('remove', {
            value: d.text(),
            type: 'api'
          });
        };
      })(this)).remove().length;
    } else {
      tags = this.tagContainer.selectAll('.hx-tag').forEach((function(_this) {
        return function(d) {
          return _this.emit('remove', {
            value: d.text(),
            type: 'api'
          });
        };
      })(this));
      values = tags.text();
      tags.remove();
      return values;
    }
  };

  TagInput.prototype.items = function(items, cssclass) {
    if (arguments.length > 0) {
      this.remove();
      this.add(items, cssclass);
      return this;
    } else {
      return this.tagContainer.selectAll('.hx-tag').text();
    }
  };

  return TagInput;

})(hx.EventEmitter);

hx.TagInput = TagInput;
})();
(function(){var InlineMorphSection, MorphSection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MorphSection = (function(superClass) {
  extend(MorphSection, superClass);

  function MorphSection(selector1, options) {
    var selection;
    this.selector = selector1;
    MorphSection.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this.options = hx.merge.defined({
      animate: true
    }, options);
    this.expanded = false;
    selection = hx.select(this.selector).classed('hx-openable', true).classed('hx-morph-section', true);
    selection.select('.hx-morph-toggle').on('click', 'hx.morph-section', (function(_this) {
      return function() {
        return _this.toggle();
      };
    })(this));
    selection.select('.hx-morph-content').style('display', 'none');
  }

  MorphSection.prototype.visible = function(show) {
    var content, selection, toggle;
    if (show === void 0) {
      return this.expanded;
    } else {
      selection = hx.select(this.selector).classed('hx-opened', show);
      toggle = selection.select('.hx-morph-toggle');
      content = selection.select('.hx-morph-content');
      if (this.options.animate) {
        content.morph().cancelOngoing()["with"]((show ? 'expand' : 'fadeout'), 100).and((show ? 'fadein' : 'collapse'), 100).go();
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

  MorphSection.prototype.toggle = function() {
    return this.visible(!this.expanded);
  };

  MorphSection.prototype.show = function() {
    return this.visible(true);
  };

  MorphSection.prototype.hide = function() {
    return this.visible(false);
  };

  return MorphSection;

})(hx.EventEmitter);

InlineMorphSection = (function(superClass) {
  extend(InlineMorphSection, superClass);

  function InlineMorphSection(selector, enterEditMode, exitEditMode, options) {
    var morphSection;
    options = hx.merge.defined({
      animate: false
    }, options);
    InlineMorphSection.__super__.constructor.call(this, selector, options);
    morphSection = this;
    this.on('show', 'hx.morph-section', function(data) {
      morphSection.detector = new hx.ClickDetector(data.content);
      enterEditMode.call(morphSection, data.toggle, data.content);
      hx.select(data.toggle).style('display', 'none');
      morphSection.detector.addException(data.content);
      return morphSection.detector.on('click', 'hx.morph-section', function() {
        morphSection.detector.cleanUp();
        morphSection.detector = void 0;
        return morphSection.hide();
      });
    });
    this.on('hide', 'hx.morph-section', function(data) {
      exitEditMode.call(morphSection, data.toggle, data.content);
      return hx.select(data.toggle).style('display', '');
    });
  }

  return InlineMorphSection;

})(MorphSection);

hx.MorphSection = MorphSection;

hx.InlineMorphSection = InlineMorphSection;
})();
(function(){var axisProperties, graph, pie, pieProperties, plot, seriesProperties;

axisProperties = hx.flatten(['Visible', 'Formatter', 'TickRotation', 'Min', 'Max', 'DiscretePadding', 'DiscreteLabels', 'TickSpacing', 'Title', 'ScalePaddingMin', 'ScalePaddingMax', 'TicksAll', 'GridLines', 'NthTickVisible'].map(function(d) {
  return ['x' + d, 'y' + d];
}));

seriesProperties = ['class', 'stroke', 'color', 'fill', 'fillColor', 'feather', 'markers', 'markerRadius', 'markerColor', 'group', 'size'];

graph = function(selector, data) {
  var axis, axisData, i, j, k, l, len, len1, len2, len3, p, ref, ref1, series, seriesData;
  graph = new hx.Graph(selector);
  ref = data.axes;
  for (i = 0, len = ref.length; i < len; i++) {
    axisData = ref[i];
    axis = graph.addAxis(axisData.xType || 'linear', axisData.yType || 'linear');
    for (j = 0, len1 = axisProperties.length; j < len1; j++) {
      p = axisProperties[j];
      if (hx.defined(axisData[p])) {
        axis[p] = axisData[p];
      }
    }
    ref1 = axisData.series;
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      seriesData = ref1[k];
      series = axis.addSeries(seriesData.type || 'line', seriesData.name);
      series.setData(seriesData.data);
      series.label.interpolate = seriesData.label.interpolate;
      for (l = 0, len3 = seriesProperties.length; l < len3; l++) {
        p = seriesProperties[l];
        if (hx.defined(seriesData[p])) {
          series[p] = seriesData[p];
        }
      }
    }
  }
  graph.render();
  return graph;
};

pieProperties = ['segmentPadding', 'innerPadding', 'ringPadding', 'totalAngle', 'startAngle', 'color', 'label', 'formatter'];

pie = function(selector, data) {
  var i, len, p;
  graph = new hx.PieChart(selector);
  for (i = 0, len = pieProperties.length; i < len; i++) {
    p = pieProperties[i];
    if (hx.defined(data[p])) {
      graph[p] = data[p];
    }
  }
  graph.setData(data.series);
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

var arcCurve, boundLabel, createLabelPoint, createLinearGradient, extent, extent2, feather, findLabel, inefficientSearch, makeLabelDetails, populateLegendSeries, search, splitAndFeather, splitData, stackSegments, svgCurve;

svgCurve = function(data, close) {
  var i, j, l, ref, segments;
  if (data.length > 1) {
    segments = new Array(data.length);
    segments[0] = 'M' + data[0].x + ',' + data[0].y;
    l = data.length - 1;
    for (i = j = 1, ref = l; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
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
    var i, j, max, r, radpad, ref, ref1, results, theta;
    radpad = pixelsToRadians(padding, radius);
    max = Math.abs(endPoint - startPoint);
    results = [];
    for (i = j = ref = startPoint, ref1 = endPoint; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
      r = radians - radpad;
      theta = r > 0 ? startRadians + (radpad / 2) + ((i / max) * r) : endRadians - (radpad / 2) - ((i / max) * r);
      theta = hx.clamp(startRadians, endRadians, theta);
      results.push(points.push({
        x: x + radius * Math.cos(theta),
        y: y + radius * Math.sin(theta)
      }));
    }
    return results;
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
  var d, j, len, max, min;
  if (data.length > 0) {
    min = f(data[0]);
    max = f(data[0]);
    for (j = 0, len = data.length; j < len; j++) {
      d = data[j];
      min = hx.min([min, f(d)]);
      max = hx.max([max, f(d)]);
    }
    return [min, max];
  } else {
    return void 0;
  }
};

extent2 = function(data, f, g) {
  var d, j, len, max, min;
  if (data.length > 0) {
    min = f(data[0]);
    max = f(data[0]);
    for (j = 0, len = data.length; j < len; j++) {
      d = data[j];
      min = hx.min([min, f(d), g(d)]);
      max = hx.max([max, f(d), g(d)]);
    }
    return [min, max];
  } else {
    return void 0;
  }
};

feather = function(array, maxSize) {
  var i, j, newData, originalLength, ref;
  if (maxSize == null) {
    maxSize = 200;
  }
  if (maxSize > 1) {
    originalLength = array.length;
    if (originalLength > maxSize) {
      newData = new Array(maxSize);
      for (i = j = 0, ref = maxSize; j < ref; i = j += 1) {
        newData[i] = array[Math.floor(i * (originalLength - 1) / (maxSize - 1))];
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

splitData = function(data, defined) {
  var awaitingReal, current, d, datas, j, l, len;
  if (defined == null) {
    defined = function() {};
  }
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

splitAndFeather = function(data, maxSize, defined) {
  var d, featherFactor, j, len, ref, results;
  if (defined == null) {
    defined = function() {};
  }
  if (maxSize) {
    featherFactor = maxSize / data.length;
    ref = splitData(data, defined);
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      d = ref[j];
      results.push(feather(d, Math.floor(d.length * featherFactor)));
    }
    return results;
  } else {
    return splitData(data, defined);
  }
};

stackSegments = function(array, arrayNames, xvalue) {
  var i, j, len, result, sum, y;
  result = [];
  sum = 0;
  for (i = j = 0, len = array.length; j < len; i = ++j) {
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

findLabel = function(array, find, interpolate, interpolateValues) {
  var atEdge, closest, dist, i, inLower, inUpper, interpolated, nextClosest;
  i = search(array, find, function(d) {
    return d.x;
  });
  if (i > -1) {
    atEdge = i === 0 || i === array.length - 1;
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
        } else if (!atEdge) {
          return array[i];
        }
      } else if (!atEdge) {
        return array[i];
      }
    } else if (!atEdge) {
      return array[i];
    }
  }
};

createLabelPoint = function(series, x, y, interpolator) {
  var bestDist, bestPoint, data, dist, j, len, point, ref, xx;
  if (series.label.enabled) {
    bestPoint = void 0;
    bestDist = -1;
    xx = series.axis.xScale.inverse(x);
    ref = series.featheredData;
    for (j = 0, len = ref.length; j < len; j++) {
      data = ref[j];
      point = findLabel(series.data, xx, series.label.interpolate, interpolator);
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

makeLabelDetails = function(series, point, yAccessor) {
  return {
    series: series,
    name: series.name,
    x: series.axis.xScale.apply(point.x),
    y: series.axis.yScale.apply(yAccessor(point)),
    color: series.color,
    values: series.createLabelValues(point, yAccessor)
  };
};

boundLabel = function(label, graph) {
  label.bounding = graph.plotArea;
  return label;
};

createLinearGradient = function(parent, values, series) {
  var gradientId, linearGradient;
  gradientId = hx.randomId();
  hx.select(parent).select('.hx-linear-gradient').remove();
  linearGradient = hx.select(parent).append('linearGradient').attr('class', 'hx-linear-gradient').attr('id', gradientId).attr('gradientUnits', "userSpaceOnUse").attr('x1', 0).attr('x2', 0).attr('y1', series.axis.yScale.rangeMin).attr('y2', series.axis.yScale.rangeMax);
  values.forEach(function(value) {
    return linearGradient.append('stop').attr('offset', ((value.yValue - series.axis.yScale.domainMin) / (series.axis.yScale.domainMax - series.axis.yScale.domainMin) * 100) + '%').attr('stop-color', hx.color(value.color).alpha(1).toString()).attr('stop-opacity', hx.color(value.color).a);
  });
  return gradientId;
};

populateLegendSeries = function(selection, series) {
  var background, width;
  background = selection.select('.hx-legend-box');
  if (background.size() === 0) {
    background = selection.append('rect')["class"]('hx-legend-box');
  }
  selection.view('.hx-legend-entry', 'g').enter(function() {
    var s;
    s = this.append('g')["class"]('hx-legend-entry');
    s.append('text');
    s.append('rect');
    return s.node();
  }).update(function(d, e, i) {
    this.select('text').text(d.name).attr('y', i * 20 + 10).attr('x', 15);
    return this.select('rect').text(d.name).attr('y', i * 20).attr('x', 0).attr('width', 10).attr('height', 10).attr('fill', d.color);
  }).apply(series);
  width = hx.max(selection.selectAll('text').map(function(node) {
    return node.getComputedTextLength();
  }));
  background.attr('width', width + 6 + 20);
  background.attr('x', -5);
  background.attr('height', series.length * 20);
  background.attr('y', -5);
  return selection;
};

var Series,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Series = (function(superClass) {
  extend(Series, superClass);

  function Series() {
    Series.__super__.constructor.apply(this, arguments);
    this.data = [];
    this.featheredData = [];
    this.axis = null;
    this.label = {
      enabled: true,
      type: hx.plot.label.standard,
      formatters: {}
    };
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

  Series.prototype.createLabelValues = function(dataPoint) {
    return [
      {
        name: this.axis.xTitle,
        value: dataPoint.xLabel || dataPoint.x,
        formatter: this.label.formatters[this.axis.xTitle] || this.axis.xFormatter
      }, {
        name: this.axis.yTitle,
        value: dataPoint.yLabel || dataPoint.y,
        formatter: this.label.formatters[this.axis.yTitle] || this.axis.yFormatter
      }
    ];
  };

  Series.prototype.getLabelDetails = function(x, y) {};

  Series.prototype.updateSvg = function(element) {};

  return Series;

})(hx.EventEmitter);

var Axis;

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
    this.xAxisTickLabelPosition = 'bottom';
    this.xShowTicks = true;
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
    this.yAxisTickLabelPosition = 'left';
    this.yShowTicks = true;
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
    var groupTypeEntries, k, l, len, len1, ref, ref1, results, series, typeEntry, types;
    groupTypeEntries = function(data) {
      var entry, group, groups, i, internalGroupId, k, l, len, len1, len2, len3, m, n, ref, ref1, ref2, series, typeSize;
      groups = new hx.Map;
      for (k = 0, len = data.length; k < len; k++) {
        series = data[k];
        if (!groups.has(series.group)) {
          groups.set(series.group, new hx.List);
        }
        groups.get(series.group).add(series);
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
            series.seriesId = 0;
            series.groupSize = 1;
            series.typeSize = typeSize;
          }
        } else {
          ref2 = entry[1].entries();
          for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
            series = ref2[i];
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
    ref = this.series.entries();
    for (k = 0, len = ref.length; k < len; k++) {
      series = ref[k];
      if (!types.has(series.type)) {
        types.set(series.type, new hx.List);
      }
      types.get(series.type).add(series);
    }
    ref1 = types.entries();
    results = [];
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      typeEntry = ref1[l];
      results.push(groupTypeEntries(typeEntry[1].entries()));
    }
    return results;
  };

  Axis.prototype.preupdateXAxisSvg = function(element) {
    var alpha, alphaDeg, axisGroupSelection, d, domain, end, getXTicks, s, self, series, set, start, xLabelTickSize, xmax, xmin, xs;
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
        var k, l, len, len1, ref, ref1;
        if (this.xDiscreteLabels) {
          return this.xDiscreteLabels;
        } else {
          set = new hx.Set;
          ref = this.series.entries();
          for (k = 0, len = ref.length; k < len; k++) {
            series = ref[k];
            ref1 = series.data;
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
      xs = (function() {
        var k, len, ref, results;
        ref = this.series.entries();
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          s = ref[k];
          if (s instanceof StraightLineSeries) {
            if (!s.data.dx && !s.data.dy && s.data.x) {
              results.push([s.data.x, s.data.x]);
            } else {
              results.push(void 0);
            }
          } else {
            results.push(extent(s.data, function(d) {
              return d.x;
            }));
          }
        }
        return results;
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
      start = xmin + (xmax - xmin) * this.graph.zoomStart;
      end = xmin + (xmax - xmin) * this.graph.zoomEnd;
      this.xScale.domain(start, end);
    }
    xLabelTickSize = 0;
    if (!this.xVisible) {
      hx.select(element).select('.hx-x-axis').remove();
    } else {
      axisGroupSelection = hx.select(element).select('.hx-x-axis');
      alphaDeg = this.xTickRotation;
      alpha = alphaDeg / 180 * Math.PI;
      getXTicks = (function(_this) {
        return function(scale) {
          var k, l, len, len1, ref, ref1;
          if (self.xTicksAll) {
            set = new hx.Set;
            ref = _this.series.entries();
            for (k = 0, len = ref.length; k < len; k++) {
              series = ref[k];
              ref1 = series.data;
              for (l = 0, len1 = ref1.length; l < len1; l++) {
                d = ref1[l];
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
    var axisGroupSelection, d, domain, group, k, l, len, len1, len2, m, ref, ref1, rmin, s, self, series, set, stackGroups, stackHeight, topSeries, type, types, yLabelTickSize, ymax, ymin, ys, yymax, yymin;
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
        var k, l, len, len1, ref, ref1;
        if (this.yDiscreteLabels) {
          return this.yDiscreteLabels;
        } else {
          set = new hx.Set;
          ref = this.series.entries();
          for (k = 0, len = ref.length; k < len; k++) {
            series = ref[k];
            ref1 = series.data;
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
      for (k = 0, len = stackGroups.length; k < len; k++) {
        type = stackGroups[k];
        ref = type.group;
        for (l = 0, len1 = ref.length; l < len1; l++) {
          group = ref[l];
          series = group[1];
          if (group[0] === void 0) {
            ys = (function() {
              var len2, m, ref1, results;
              ref1 = this.series.entries();
              results = [];
              for (m = 0, len2 = ref1.length; m < len2; m++) {
                s = ref1[m];
                if (s instanceof StraightLineSeries) {
                  if (!s.data.dx && !s.data.dy && s.data.y) {
                    results.push([s.data.y, s.data.y]);
                  } else {
                    results.push(void 0);
                  }
                } else if (s instanceof BandSeries) {
                  results.push(extent2(s.data, (function(d) {
                    return d.y1;
                  }), function(d) {
                    return d.y2;
                  }));
                } else {
                  results.push(extent(s.data, function(d) {
                    return d.y;
                  }));
                }
              }
              return results;
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
            ref1 = topSeries.data;
            for (m = 0, len2 = ref1.length; m < len2; m++) {
              d = ref1[m];
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
    if (!this.yVisible) {
      hx.select(element).select('.hx-y-axis').remove();
    } else {
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
    var axisGroupSelection, axisX, axisY, gridSelection, height, markerX, markerY, self, width, xline, yline;
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
    if (!this.xVisible) {
      hx.select(element).select('.hx-x-axis').remove();
    } else {
      if (this.xGridLines) {
        gridSelection.view('.hx-vertical-grid-line', 'line').update(function(tick) {
          return this.attr('x1', tick[1]).attr('x2', tick[1]).attr('y1', self.yScale.rangeMax).attr('y2', self.yScale.rangeMin);
        }).apply(this.xScale.ticks(self.xTickSpacing));
      }
      axisGroupSelection = hx.select(element).select('.hx-x-axis');
      yline = this.yScale.apply(0);
      if (isNaN(yline)) {
        axisY = height - yOffset - this.xAxisSize;
        markerY = height - yOffset - this.xAxisSize;
      } else {
        axisY = Math.min(height - yOffset - this.xAxisSize, yline);
        if (this.xAxisTickLabelPosition === 'axis') {
          markerY = Math.min(height - yOffset - this.xAxisSize, yline);
        } else {
          markerY = height - yOffset - this.xAxisSize;
        }
      }
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        this.view('.hx-axis-line', 'line').update(function(s) {
          this.attr('x1', s.rangeMin).attr('x2', s.rangeMax);
          return this.attr('y1', axisY).attr('y2', axisY);
        }).apply(scale);
        return this.view('.hx-tick', 'g').update(function(tick, e, i) {
          this.attr("transform", "translate(" + tick[1] + "," + markerY + ")");
          this.view('.hx-tick-line', 'line').update(function(t) {
            return this.attr('y1', 0).attr('y2', tickSize);
          }).apply(this);
          return this.view('.hx-tick-text-x', 'text').update(function(t) {
            return this.text((i % self.xNthTickVisible) === 0 ? self.xFormatter(t) : '');
          }).apply(tick[0]);
        }).apply(self.xShowTicks ? scale.ticks(self.xTickSpacing) : []);
      }).apply(this.xScale);
      if (this.xTitle) {
        axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          return this.attr('transform', 'translate(' + ((width + totalXOffset) / 2) + ', ' + (markerY + d.xAxisSize - d.xTitleHeight / 2 - axisPadding / 2) + ')').text(self.xTitle);
        }).apply(this);
      }
    }
    if (!this.yVisible) {
      return hx.select(element).select('.hx-y-axis').remove();
    } else {
      if (this.yGridLines) {
        gridSelection.view('.hx-horizontal-grid-line', 'line').update(function(tick) {
          return this.attr('y1', tick[1]).attr('y2', tick[1]).attr('x1', self.xScale.rangeMax).attr('x2', self.xScale.rangeMin);
        }).apply(this.yScale.ticks(self.yTickSpacing));
      }
      axisGroupSelection = hx.select(element).select('.hx-y-axis');
      xline = this.xScale.apply(0);
      if (isNaN(xline)) {
        axisX = xOffset + this.yAxisSize;
        markerX = xOffset + this.yAxisSize;
      } else {
        axisX = Math.max(xOffset + this.yAxisSize, xline);
        if (this.yAxisTickLabelPosition === 'axis') {
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
            return this.attr('x', -labelOffset).text((i % self.yNthTickVisible) === 0 ? self.yFormatter(t) : '');
          }).apply(tick[0]);
        }).apply(self.yShowTicks ? scale.ticks(self.yTickSpacing) : []);
      }).apply(this.yScale);
      if (this.yTitle) {
        return axisGroupSelection.view('.hx-axis-title', 'text').update(function(d) {
          return this.attr('transform', 'translate(' + (markerX - d.yAxisSize + d.yTitleHeight / 2 + axisPadding / 2) + ', ' + ((height - totalYOffset) / 2) + ') rotate(-90)').text(self.yTitle);
        }).apply(this);
      }
    }
  };

  Axis.prototype.updateDataSvg = function(fillLayer, sparseLayer) {
    var fill, i, k, len, ref, results, s, sparse;
    fill = [];
    sparse = [];
    hx.select(fillLayer).view('.hx-series', 'g').update(function(d, e) {
      return fill.push(e);
    }).apply(this.series.entries());
    hx.select(sparseLayer).view('.hx-series', 'g').update(function(d, e) {
      return sparse.push(e);
    }).apply(this.series.entries());
    ref = this.series.entries();
    results = [];
    for (i = k = 0, len = ref.length; k < len; i = ++k) {
      s = ref[i];
      results.push(s.updateSvg(fill[i], sparse[i]));
    }
    return results;
  };

  Axis.prototype.getLabelDetails = function(x, y) {
    var labels, series;
    labels = hx.flatten((function() {
      var k, len, ref, results;
      ref = this.series.entries();
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        series = ref[k];
        results.push(series.getLabelDetails(x, y));
      }
      return results;
    }).call(this));
    return labels.filter(function(d) {
      return d;
    });
  };

  Axis.prototype.getXStack = function(type, group, y, seriesId, start) {
    var j, k, len, ref, series, xStack, xs;
    if (start == null) {
      start = 0;
    }
    if (group) {
      xStack = Math.max(this.xScale.domainMin, 0);
      ref = this.series.entries();
      for (j = k = 0, len = ref.length; k < len; j = ++k) {
        series = ref[j];
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
    var j, k, len, ref, series, yStack, ys;
    if (start == null) {
      start = 0;
    }
    if (group) {
      yStack = Math.max(this.yScale.domainMin, 0);
      ref = this.series.entries();
      for (j = k = 0, len = ref.length; k < len; j = ++k) {
        series = ref[j];
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

var Graph, axisPadding, labelOffset, tickSize,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

tickSize = 6;

labelOffset = tickSize + 4;

axisPadding = 4;

Graph = (function(superClass) {
  var getClosestMeta, updateLabels;

  extend(Graph, superClass);

  function Graph(selector) {
    var clipPath, defs, id, savedZoomEnd, savedZoomStart, selection, threshold, touchX1, touchX2;
    this.selector = selector;
    Graph.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this.axes = new hx.List;
    this.zoomStart = 0;
    this.zoomEnd = 1;
    this.useZoom = false;
    this.useLabels = true;
    this.useLegend = false;
    this.legendPosition = 'auto';
    id = hx.randomId();
    selection = hx.select(this.selector).on('resize', 'hx.plot', (function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
    this.svgTarget = selection.append("svg").attr('class', 'hx-graph');
    defs = this.svgTarget.append('defs');
    this.axesTarget = this.svgTarget.append('g').attr('class', 'hx-axes');
    this.plotTarget = this.svgTarget.append('g').attr('class', 'hx-plot');
    this.labelTarget = this.svgTarget.append('g').attr('class', 'hx-label');
    clipPath = defs.append('clipPath').attr('id', 'clip-series-' + id);
    this.clipRect = clipPath.append('rect');
    this.plotTarget.attr('clip-path', 'url(#clip-series-' + id + ')');
    this.labelsView = this.labelTarget.view('.hx-plot-label', 'g').update(function(d, element) {
      return d.series.label.type(element, d);
    });
    touchX1 = 0;
    touchX2 = 0;
    savedZoomStart = 0;
    savedZoomEnd = 1;
    this.svgTarget.on('pointerdown', 'hx.plot', (function(_this) {
      return function(p) {
        var x, y;
        x = Math.round(p.x - _this.svgTarget.box().left);
        y = Math.round(p.y - _this.svgTarget.box().top);
        updateLabels.call(_this, x, y);
        if (p.event.targetTouches && p.event.targetTouches.length > 1) {
          p.event.preventDefault();
          p.event.stopPropagation();
          touchX1 = p.event.targetTouches[0].clientX - _this.svgTarget.box().left - _this.plotArea.x1;
          touchX2 = p.event.targetTouches[1].clientX - _this.svgTarget.box().left - _this.plotArea.x1;
          savedZoomStart = _this.zoomStart;
          return savedZoomEnd = _this.zoomEnd;
        }
      };
    })(this));
    threshold = 0.01;
    this.svgTarget.on('touchmove', 'hx.plot', (function(_this) {
      return function(e) {
        var endFactor, startFactor, w, x1, x2, xhat, xn, z;
        if (e.targetTouches.length > 1 && _this.useZoom) {
          e.preventDefault();
          e.stopPropagation();
          w = _this.plotArea.x2 - _this.plotArea.x1;
          x1 = e.targetTouches[0].clientX - _this.svgTarget.box().left - _this.plotArea.x1;
          x2 = e.targetTouches[1].clientX - _this.svgTarget.box().left - _this.plotArea.x1;
          xn = (touchX1 + touchX2) / (2 * w);
          xhat = savedZoomStart + (savedZoomEnd - savedZoomStart) * xn;
          z = Math.abs(touchX1 - touchX2) / Math.abs(x1 - x2);
          startFactor = savedZoomStart - xhat;
          endFactor = savedZoomEnd - xhat;
          if (_this.zoomEnd === 1 && startFactor > -threshold) {
            startFactor = -threshold;
          }
          if (_this.zoomStart === 0 && endFactor < threshold) {
            endFactor = threshold;
          }
          _this.zoomStart = hx.clampUnit(xhat + z * startFactor);
          _this.zoomEnd = hx.clampUnit(xhat + z * endFactor);
          _this.emit('zoom', {
            start: _this.zoomStart,
            end: _this.zoomEnd
          });
          return _this.render();
        }
      };
    })(this));
    this.svgTarget.on('mousemove', 'hx.plot', (function(_this) {
      return function(p) {
        var legendContainer, x, y;
        x = Math.round(p.clientX - _this.svgTarget.box().left);
        y = Math.round(p.clientY - _this.svgTarget.box().top);
        if (_this.useLabels) {
          updateLabels.call(_this, x, y);
        }
        if (_this.useLegend) {
          legendContainer = _this.svgTarget.select('.hx-legend-container');
          if (_this.legendPosition === 'hover') {
            legendContainer.style('display', '');
          }
          if (_this.legendPosition === 'auto' || _this.legendPosition === 'hover') {
            if (x - _this.plotArea.x1 < (_this.plotArea.x1 + _this.plotArea.x2) / 2) {
              return legendContainer.attr('transform', 'translate(' + (_this.plotArea.x2 - 10 - legendContainer.width()) + ',' + (_this.plotArea.y1 + 10) + ')');
            } else {
              return legendContainer.attr('transform', 'translate(' + (_this.plotArea.x1 + 10) + ',' + (_this.plotArea.y1 + 10) + ')');
            }
          }
        }
      };
    })(this));
    this.svgTarget.on('mouseleave', 'hx.plot', (function(_this) {
      return function() {
        if (_this.useLegend && _this.legendPosition === 'hover') {
          return _this.svgTarget.select('.hx-legend-container').style('display', 'none');
        }
      };
    })(this));
    this.svgTarget.on('pointerleave', 'hx.plot', (function(_this) {
      return function(p) {
        return _this.labelsView.apply([]);
      };
    })(this));
    this.svgTarget.on('click', 'hx.plot', (function(_this) {
      return function(p) {
        var data, labelMeta, x, y;
        x = Math.round(p.x - _this.svgTarget.box().left);
        y = Math.round(p.y - _this.svgTarget.box().top);
        labelMeta = getClosestMeta.call(_this, x, y);
        if (labelMeta) {
          data = {
            event: p,
            data: labelMeta.values,
            series: labelMeta.series
          };
          _this.emit('click', data);
          return labelMeta.series.emit('click', data);
        }
      };
    })(this));
    this.svgTarget.on('wheel', 'hx.plot', (function(_this) {
      return function(e) {
        var delta, endFactor, startFactor, w, x, xhat, xn, z;
        if (_this.useZoom) {
          e.preventDefault();
          e.stopPropagation();
          threshold = 0.01;
          delta = -e.deltaY;
          if (e.deltaMode === 1) {
            delta *= 20;
          }
          x = e.clientX - _this.svgTarget.box().left - _this.plotArea.x1;
          w = _this.plotArea.x2 - _this.plotArea.x1;
          xn = hx.clampUnit(x / w);
          xhat = _this.zoomStart + (_this.zoomEnd - _this.zoomStart) * xn;
          z = 1 - delta / 600;
          startFactor = _this.zoomStart - xhat;
          endFactor = _this.zoomEnd - xhat;
          if (_this.zoomEnd === 1 && startFactor > -threshold) {
            startFactor = -threshold;
          }
          if (_this.zoomStart === 0 && endFactor < threshold) {
            endFactor = threshold;
          }
          _this.zoomStart = hx.clampUnit(xhat + z * startFactor);
          _this.zoomEnd = hx.clampUnit(xhat + z * endFactor);
          _this.emit('zoom', {
            start: _this.zoomStart,
            end: _this.zoomEnd
          });
          return _this.render();
        }
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
    var enter, hasData, hpx, legendContainer, self, svgHeight, svgWidth, totalX, totalY, wpx, x, y;
    wpx = hx.select(this.selector).style('width');
    hpx = hx.select(this.selector).style('height');
    this.width = Number(wpx.slice(0, -2));
    this.height = Number(hpx.slice(0, -2));
    svgWidth = Number(this.svgTarget.style('width').slice(0, -2));
    svgHeight = Number(this.svgTarget.style('height').slice(0, -2));
    hasData = this.axes.list.some(function(axis) {
      return axis.series.list.some(function(series) {
        return hx.isObject(series.data) || series.data.length > 0;
      });
    });
    self = this;
    this.svgTarget.view('.hx-plot-no-data', 'text').update(function() {
      return this.text('No Data').attr('x', self.width / 2).attr('y', self.height / 2);
    }).apply(hasData ? [] : [true]);
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
    if (this.useLegend) {
      legendContainer = this.svgTarget.select('.hx-legend-container');
      if (legendContainer.size() === 0) {
        legendContainer = this.svgTarget.append('g')["class"]('hx-legend-container');
      }
      populateLegendSeries(legendContainer, hx.flatten(this.axes.list.map(function(d) {
        return d.series.list;
      })));
      switch (this.legendPosition) {
        case 'top-left':
          legendContainer.attr('transform', 'translate(' + (this.plotArea.x1 + 10) + ',' + (this.plotArea.y1 + 10) + ')');
          break;
        case 'bottom-right':
          legendContainer.attr('transform', 'translate(' + (this.plotArea.x2 - 10 - legendContainer.width()) + ',' + (this.plotArea.y2 - 5 - legendContainer.height()) + ')');
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
    return this.clipRect.attr('x', this.plotArea.x1).attr('y', this.plotArea.y1).attr('width', this.plotArea.x2 - this.plotArea.x1).attr('height', this.plotArea.y2 - this.plotArea.y1);
  };

  getClosestMeta = function(x, y) {
    var axis, bestDistance, bestMeta, distance, i, l, labels, len, xx, yy;
    x = hx.clamp(this.plotArea.x1, this.plotArea.x2, x);
    y = hx.clamp(this.plotArea.y1, this.plotArea.y2, y);
    labels = hx.flatten((function() {
      var i, len, ref, results;
      ref = this.axes.entries();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        axis = ref[i];
        results.push(axis.getLabelDetails(x, y));
      }
      return results;
    }).call(this));
    labels = labels.filter((function(_this) {
      return function(label) {
        var ref, ref1;
        return (_this.plotArea.x1 <= (ref = label.x) && ref <= _this.plotArea.x2) && (_this.plotArea.y1 <= (ref1 = label.y) && ref1 <= _this.plotArea.y2);
      };
    })(this));
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

  updateLabels = function(x, y) {
    var bestMeta;
    bestMeta = getClosestMeta.call(this, x, y);
    return this.labelsView.apply(bestMeta ? boundLabel(bestMeta, this) : []);
  };

  return Graph;

})(hx.EventEmitter);

var LinearScale;

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
    var d, domainEnd, domainSpan, domainStart, error, i, j, niceCount, niceDomainSpacing, ref, results, targetCount;
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
    results = [];
    for (i = j = 0, ref = niceCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      d = domainStart + i * niceDomainSpacing;
      results.push([d, this.apply(d)]);
    }
    return results;
  };

  return LinearScale;

})();

var DiscreteScale;

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
    var c, j, len, ref, results;
    if (targetSpacing == null) {
      targetSpacing = 50;
    }
    ref = this.domainCategories;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      results.push([c, this.apply(c)]);
    }
    return results;
  };

  DiscreteScale.prototype.tickWidth = function() {
    return (this.rangeMax - this.rangeMin) / this.domainCategories.length * (1 - this.bandPadding);
  };

  DiscreteScale.prototype.tickOffset = function() {
    return (this.rangeMax - this.rangeMin) / this.domainCategories.length * this.bandPadding / 2;
  };

  return DiscreteScale;

})();

var DateScale,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DateScale = (function(superClass) {
  extend(DateScale, superClass);

  function DateScale(domainMin, domainMax, rangeMin, rangeMax) {
    this.domainMin = domainMin;
    this.domainMax = domainMax;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    DateScale.__super__.constructor.apply(this, arguments);
  }

  DateScale.prototype.ticks = function(targetSpacing) {
    var checkVal, d, domainEnd, domainSpan, domainStart, error, i, j, niceCount, niceDomainSpacing, ref, results, round, targetCount, timeStep, timeSteps;
    timeSteps = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6];
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
    results = [];
    for (i = j = 0, ref = niceCount; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      d = domainStart + i * niceDomainSpacing;
      results.push([d, this.apply(d)]);
    }
    return results;
  };

  return DateScale;

})(LinearScale);

var BandSeries,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BandSeries = (function(superClass) {
  var bandSeriesDataInterpolator, scale;

  extend(BandSeries, superClass);

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

  function BandSeries() {
    BandSeries.__super__.constructor.apply(this, arguments);
    this.color = hx.color(hx.theme.plot.colors[2]).alpha(0.2).toString();
    this.feather = 200;
    this["class"] = '';
  }

  BandSeries.prototype.updateSvg = function(fillLayer) {
    var areas, data, fillCol, gradientCols, gradientId, preped, self;
    self = this;
    this.featheredData = splitAndFeather(this.data, this.feather, function(d) {
      return d.y1 !== void 0 && d.y2 !== void 0;
    });
    areas = (function() {
      var i, len, ref, results;
      ref = this.featheredData;
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
    if (Array.isArray(self.fillColor || self.color)) {
      gradientCols = self.fillColor || self.color.map(function(d) {
        return {
          value: d.value,
          color: hx.color(d.color).alpha(0.2).toString('rgba')
        };
      });
      gradientId = createLinearGradient(fillLayer, gradientCols, this);
      fillCol = 'url(#' + gradientId + ')';
    } else {
      fillCol = self.fillColor || hx.color(self.color).alpha(0.2).toString();
    }
    return hx.select(fillLayer).view('.hx-series-data', 'path', 'hx-series-area').update(function(d) {
      return this.attr('d', d)["class"]('hx-series-data ' + self["class"]).attr('fill', fillCol);
    }).apply(areas);
  };

  BandSeries.prototype.getLabelDetails = function(x, y) {
    var interpolateLabels, lower, upper;
    if (this.label.enabled) {
      interpolateLabels = false;
      upper = createLabels(this.label, this.featheredData, this.axis, x, this.color, this, interpolateLabels, function(d) {
        return d.yLabel1 || d.y1;
      });
      lower = createLabels(this.label, this.featheredData, this.axis, x, this.color, this, interpolateLabels, function(d) {
        return d.yLabel2 || d.y2;
      });
      return upper.concat(lower);
    } else {
      return [void 0];
    }
  };

  BandSeries.prototype.createLabelValues = function(dataPoint, yValueAccessor) {
    return [
      {
        name: this.axis.xTitle,
        value: dataPoint.xLabel || dataPoint.x,
        formatter: this.label.formatters[this.axis.xTitle] || this.axis.xFormatter
      }, {
        name: this.axis.yTitle,
        value: yValueAccessor(dataPoint),
        formatter: this.label.formatters[this.axis.yTitle] || this.axis.yFormatter
      }
    ];
  };

  bandSeriesDataInterpolator = function(x, d1, d2, yInterp) {
    if ((d1.y1 != null) && (d2.y1 != null) && (d1.y2 != null) && (d2.y2 != null)) {
      return {
        x: x,
        y1: yInterp(d1.y1, d2.y1),
        y2: yInterp(d1.y2, d2.y2)
      };
    }
  };

  BandSeries.prototype.getLabelDetails = function(x, y) {
    var point;
    if (point = createLabelPoint(this, x, y, bandSeriesDataInterpolator)) {
      return [
        makeLabelDetails(this, point, function(d) {
          return d.y1;
        }), makeLabelDetails(this, point, function(d) {
          return d.y2;
        })
      ];
    } else {
      return [];
    }
  };

  return BandSeries;

})(Series);

var BarSeries,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BarSeries = (function(superClass) {
  extend(BarSeries, superClass);

  function BarSeries() {
    BarSeries.__super__.constructor.apply(this, arguments);
    this.color = hx.theme.plot.colors[1];
    this.type = 'bar';
    this.group = void 0;
    this["class"] = '';
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
      return this["class"]('hx-series-data hx-series-bar ' + self["class"]).attr("y", y).attr("x", x).attr("height", height).attr("width", width).style("fill", d.color || self.color);
    }).apply(this.data);
  };

  BarSeries.prototype.getLabelDetails = function(x, y) {
    var barData, barX, barY, height, max, meta, min, width, xx, yy;
    if (this.label.enabled) {
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
          meta = {
            series: this,
            name: this.name,
            x: barX + width / 2,
            y: yy,
            color: barData.color || this.color,
            values: this.createLabelValues(barData)
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

})(Series);

var LineSeries, updatePath,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

updatePath = function(series, element, _class, data, type, update) {
  return hx.select(element).view('.hx-series-data', 'g').update(function(d) {
    return this["class"]('hx-series-data hx-series-line ' + series["class"]).view(_class, type).update(update).apply(d);
  }).apply(data);
};

LineSeries = (function(superClass) {
  var lineSeriesDataInterpolator, scale;

  extend(LineSeries, superClass);

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
    this["class"] = '';
  }

  LineSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
    var applyStack, areas, axis, curves, data, featheredData, fillCol, fillPreparedData, fillToY, gradientCols, gradientId, preparedData, self, strokeCol;
    self = this;
    axis = this.axis;
    featheredData = splitAndFeather(this.data, this.feather, function(d) {
      return d.y !== void 0;
    });
    this.featheredData = featheredData;
    applyStack = function(dataToStack, calculateBaseline) {
      var d, i, len, results;
      results = [];
      for (i = 0, len = dataToStack.length; i < len; i++) {
        d = dataToStack[i];
        results.push({
          x: d.x,
          y: axis.getYStack(self.type, self.group, d.x, self.seriesId) + (calculateBaseline ? 0 : d.y)
        });
      }
      return results;
    };
    if (this.fill) {
      if (Array.isArray(self.fillColor || self.color)) {
        gradientCols = self.fillColor || self.color.map(function(d) {
          return {
            value: d.value,
            color: hx.color(d.color).alpha(0.2).toString('rgba')
          };
        });
        gradientId = createLinearGradient(fillLayer, gradientCols, self);
        fillCol = 'url(#' + gradientId + ')';
      } else {
        fillCol = self.fillColor || hx.color(self.color).alpha(0.2).toString();
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
    if (this.stroke) {
      if (this.axis.yScaleType !== 'discrete') {
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
      if (Array.isArray(this.color)) {
        gradientId = createLinearGradient(sparseLayer, this.color, self);
        strokeCol = 'url(#' + gradientId + ')';
      } else {
        strokeCol = self.color;
      }
      updatePath(this, sparseLayer, '.hx-series-line-stroke', curves, 'path', function(d) {
        return this.attr('d', d).attr('stroke', strokeCol);
      });
    }
    if (this.markers) {
      preparedData = this.axis.yScaleType !== 'discrete' ? applyStack(hx.flatten(featheredData)) : hx.flatten(featheredData);
      return updatePath(this, sparseLayer, '.hx-series-line-markers', scale(preparedData, this.axis), 'circle', function(d) {
        return this.attr('cx', d.x).attr('cy', d.y).attr('r', self.markerRadius).attr('fill', self.markerColor || self.color);
      });
    }
  };

  lineSeriesDataInterpolator = function(x, d1, d2, yInterp) {
    if ((d1.y != null) && (d2.y != null)) {
      return {
        x: x,
        y: yInterp(d1.y, d2.y)
      };
    }
  };

  LineSeries.prototype.getLabelDetails = function(x, y) {
    var point;
    if (point = createLabelPoint(this, x, y, lineSeriesDataInterpolator)) {
      return [
        makeLabelDetails(this, point, (function(_this) {
          return function(d) {
            return _this.axis.getYStack(_this.type, _this.group, d.x, _this.seriesId) + d.y;
          };
        })(this))
      ];
    } else {
      return [];
    }
  };

  return LineSeries;

})(Series);

var ScatterSeries,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScatterSeries = (function(superClass) {
  var filter, scale;

  extend(ScatterSeries, superClass);

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
        color: d.color,
        size: d.size
      });
    }
    return results;
  };

  function ScatterSeries() {
    ScatterSeries.__super__.constructor.apply(this, arguments);
    this.color = hx.theme.plot.colors[3];
    this.size = 2;
    this["class"] = '';
  }

  ScatterSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
    var self;
    self = this;
    return hx.select(sparseLayer).view('.hx-series-data', 'circle').update(function(d) {
      return this["class"]('hx-series-data hx-series-scatter ' + self["class"]).attr('cx', d.x).attr('cy', d.y).attr('r', d.size || self.size).style('fill', d.color || self.color);
    }).apply(scale(filter(this.data), this.axis));
  };

  ScatterSeries.prototype.getLabelDetails = function(x, y) {
    var best, bestSquaredDistance, d, i, len, meta, ref, squaredDistance;
    if (this.label.enabled) {
      best = void 0;
      bestSquaredDistance = 0;
      ref = filter(this.data);
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
          name: this.name,
          x: this.axis.xScale.apply(best.x),
          y: this.axis.yScale.apply(best.y),
          color: best.color || this.color,
          values: this.createLabelValues(best)
        };
        return [meta];
      }
    } else {
      return [];
    }
  };

  return ScatterSeries;

})(Series);

var StraightLineSeries,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StraightLineSeries = (function(superClass) {
  var endpoints;

  extend(StraightLineSeries, superClass);

  function StraightLineSeries() {
    StraightLineSeries.__super__.constructor.apply(this, arguments);
    this.color = hx.theme.plot.colors[4];
    this["class"] = '';
  }

  StraightLineSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
    var data, self;
    data = endpoints.call(this);
    if (data) {
      self = this;
      return hx.select(sparseLayer).view('.hx-series-data', 'line').update(function(d) {
        return this["class"]('hx-series-data hx-series-constant ' + self["class"]).attr('x1', self.axis.xScale.apply(d[0].x)).attr('y1', self.axis.yScale.apply(d[0].y)).attr('x2', self.axis.xScale.apply(d[1].x)).attr('y2', self.axis.yScale.apply(d[1].y)).attr('d', d).attr('stroke', self.color);
      }).apply([data]);
    }
  };

  StraightLineSeries.prototype.getLabelDetails = function(x, y) {
    var dx, dy, meta, xx, yy;
    if (this.label.enabled) {
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
        meta = {
          series: this,
          name: this.name,
          x: this.axis.xScale.apply(xx),
          y: this.axis.yScale.apply(yy),
          color: this.color,
          values: this.createLabelValues({
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

  endpoints = function() {
    var domX1, domX2, domY1, domY2, domdx, domdy, dx, dy, i, j, len, len1, p1, p2, quotient, ref, ref1, results, results1, t, x, x0, x1, y, y0, y1;
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
      ref = [this.axis.yScale.domainMin, this.axis.yScale.domainMax];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        y = ref[i];
        results.push({
          x: this.data.x,
          y: y
        });
      }
      return results;
    } else if (this.data.y != null) {
      ref1 = [this.axis.xScale.domainMin, this.axis.xScale.domainMax];
      results1 = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        x = ref1[j];
        results1.push({
          x: x,
          y: this.data.y
        });
      }
      return results1;
    }
  };

  return StraightLineSeries;

})(Series);

var PieChart,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PieChart = (function(superClass) {
  var calculateTotal, getSegmentSize;

  extend(PieChart, superClass);

  function PieChart(selector) {
    var selection;
    this.selector = selector;
    PieChart.__super__.constructor.apply(this, arguments);
    selection = hx.select(this.selector).on('resize', 'hx.plot', (function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
    this.segmentPadding = 0;
    this.innerPadding = 0;
    this.ringPadding = 0.1;
    this.totalAngle = Math.PI * 2;
    this.startAngle = 0;
    this.color = hx.theme.plot.colors[1];
    this.label = {
      type: hx.plot.label.standard,
      formatters: {}
    };
    this.useLabels = true;
    this.formatter = hx.format.si(2);
    this.segmentTextFormatter = function(segment, segments) {
      if (segment.size / hx.sum(segments.map(function(s) {
        return s.size;
      })) > 0.05) {
        return segment.size;
      } else {
        return '';
      }
    };
    this.useSegmentText = false;
    this.useLegend = false;
    this.legendPosition = 'auto';
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
    var P, approxRingSize, diffX, diffY, enterChart, height, innerRadius, legendContainer, midpoint, outerRadius, r, radius, ringSize, segmentPadding, selection, self, svgHeight, svgWidth, updateChart, updateRing, updateSegment, updateText, width;
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
    updateSegment = function(selection, size, color, runningTotal, total, ring, count) {
      var end, start, startOffset;
      startOffset = self.startAngle + Math.PI * 1.5;
      start = startOffset + runningTotal / total * self.totalAngle;
      end = startOffset + (runningTotal + size) / total * self.totalAngle;
      return selection.attr('d', arcCurve(self.circle.x, self.circle.y, innerRadius + ringSize * ring, innerRadius + ringSize * (ring + 1 - self.ringPadding), start, end, segmentPadding, count)).attr('fill', color);
    };
    updateRing = function(d, e, i) {
      var allZero, ref, runningTotal, segments, total;
      segments = d.segments;
      runningTotal = 0;
      ref = calculateTotal(segments), total = ref.total, allZero = ref.allZero;
      return this.view('.hx-pie-segment', 'path').update(function(s) {
        var size;
        size = getSegmentSize(s, total, allZero);
        updateSegment(this, size, s.color, runningTotal, total, i, segments.length);
        return runningTotal += size;
      }).apply(segments);
    };
    midpoint = function(size, runningTotal, total, ring, count) {
      var end, start, startOffset;
      startOffset = self.startAngle + Math.PI * 1.5;
      start = startOffset + runningTotal / total * self.totalAngle;
      end = startOffset + (runningTotal + size) / total * self.totalAngle;
      return {
        x: self.circle.x + Math.cos((start + end) / 2) * (innerRadius + (ring + 0.5) * ringSize),
        y: self.circle.y + Math.sin((start + end) / 2) * (innerRadius + (ring + 0.5) * ringSize)
      };
    };
    updateText = function(d, e, i) {
      var allZero, ref, runningTotal, segments, total;
      segments = d.segments;
      runningTotal = 0;
      ref = calculateTotal(segments), total = ref.total, allZero = ref.allZero;
      return this.view('.hx-pie-segment-text', 'text').update(function(s) {
        var ref1, size, x, y;
        size = getSegmentSize(s, total, allZero);
        ref1 = midpoint(size, runningTotal, total, i, segments.length), x = ref1.x, y = ref1.y;
        this.text(self.segmentTextFormatter(s, segments)).attr('x', x).attr('y', y);
        return runningTotal += size;
      }).apply(segments);
    };
    enterChart = function(d) {
      var labelGroup;
      self.svgTarget = this.append('svg')["class"]('hx-graph');
      self.plotTarget = self.svgTarget.append('g')["class"]('hx-plot');
      labelGroup = self.svgTarget.append('g')["class"]('hx-label');
      self.svgTarget.on('mousemove', 'hx.plot', (function(_this) {
        return function(p) {
          var legendContainer, x, y;
          x = Math.round(p.clientX - self.svgTarget.box().left);
          y = Math.round(p.clientY - self.svgTarget.box().top);
          if (self.useLegend) {
            legendContainer = self.svgTarget.select('.hx-legend-container');
            if (self.legendPosition === 'hover') {
              legendContainer.style('display', '');
            }
            if (self.legendPosition === 'auto' || self.legendPosition === 'hover') {
              width = self.svgTarget.width();
              height = self.svgTarget.height();
              if (x < width / 2) {
                return legendContainer.attr('transform', 'translate(' + (width - 10 - legendContainer.width()) + ', 10)');
              } else {
                return legendContainer.attr('transform', 'translate(10, 10)');
              }
            }
          }
        };
      })(this));
      self.svgTarget.on('pointermove', 'hx.plot', function(p) {
        var x, y;
        x = Math.round(p.x - selection.box().left);
        y = Math.round(p.y - selection.box().top);
        return self.updateLabels(x, y);
      });
      self.svgTarget.on('mouseleave', 'hx.plot', (function(_this) {
        return function() {
          if (_this.useLegend && _this.legendPosition === 'hover') {
            return _this.svgTarget.select('.hx-legend-container').style('display', 'none');
          }
        };
      })(this));
      self.svgTarget.on('pointerleave', 'hx.plot', function(p) {
        return self.labelsView.apply([]);
      });
      self.labelsView = labelGroup.view('.hx-plot-label', 'g').update(function(d, element) {
        return self.label.type(element, d);
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
      this.select('.hx-plot').view('.hx-pie-ring', 'g').update(updateRing).apply(d.data);
      return this.select('.hx-plot').view('.hx-pie-text', 'g').update(updateText).apply(self.useSegmentText ? d.data : []);
    };
    selection.view('.hx-graph', 'svg').enter(enterChart).update(updateChart).apply(this);
    svgWidth = Number(this.svgTarget.style('width').slice(0, -2));
    svgHeight = Number(this.svgTarget.style('height').slice(0, -2));
    if (this.useLegend) {
      legendContainer = this.svgTarget.select('.hx-legend-container');
      if (legendContainer.size() === 0) {
        legendContainer = this.svgTarget.append('g')["class"]('hx-legend-container');
      }
      populateLegendSeries(legendContainer, this.data.segments || hx.flatten(this.data.map(function(d) {
        return d.segments;
      })));
      switch (this.legendPosition) {
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

  PieChart.prototype.createLabelValues = function(segment, ring) {
    return [
      {
        name: segment.name,
        value: segment.size,
        formatter: this.label.formatters[ring.name] || this.formatter
      }
    ];
  };

  PieChart.prototype.updateLabels = function(x, y) {
    var a1, a2, allZero, angle, approxRingSize, chosenSegment, chosenSegmentAngleEnd, chosenSegmentAngleMid, chosenSegmentAngleStart, cx, cy, end, height, innerRadius, j, labelRadius, labelX, labelY, len, meta, outerRadius, r, radius, ref, ref1, ring, ringSize, runningTotal, segment, segmentPadding, selection, size, start, total, whichRing, width;
    if (this.useLabels && this.label) {
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
      ref = calculateTotal(ring.segments), total = ref.total, allZero = ref.allZero;
      ref1 = ring.segments;
      for (j = 0, len = ref1.length; j < len; j++) {
        segment = ref1[j];
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
        meta = {
          series: ring,
          name: ring.name,
          color: chosenSegment.color || this.color,
          x: labelX,
          y: labelY,
          bounding: {
            x1: 0,
            x2: selection.width(),
            y1: 0,
            y2: selection.height()
          },
          values: this.createLabelValues(chosenSegment, ring)
        };
        this.closestMeta = meta;
        return this.labelsView.apply(meta);
      } else {
        this.closestMeta = void 0;
        return this.labelsView.apply([]);
      }
    }
  };

  return PieChart;

})(hx.EventEmitter);

hx.PieChart = PieChart;

var hx_labels;

hx_labels = {};

hx_labels.standard = function(element, meta) {
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
    var dividers, headerHeight, headerWidth, height, ref, ref1, valuesHeight, valuesWidth, width, x, xoff, yoff;
    prepareBox.call(this);
    ref = updateHeaderText.call(this, d, 0, 0), width = ref.width, height = ref.height;
    headerWidth = width;
    headerHeight = height;
    ref1 = updateValues.call(this, d, 0, 0 + headerHeight), width = ref1.width, height = ref1.height;
    valuesWidth = width;
    valuesHeight = height;
    width = Math.max(headerWidth, valuesWidth);
    height = headerHeight + valuesHeight;
    updateBox.call(this, d, width, height);
    dividers = (function() {
      var i, ref2, results;
      results = [];
      for (x = i = 0, ref2 = d.values.length; 0 <= ref2 ? i < ref2 : i > ref2; x = 0 <= ref2 ? ++i : --i) {
        results.push(headerHeight + (x * (12 + padding * 2)));
      }
      return results;
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

hx.plot = plot;

hx.plot.label = hx_labels;

hx.plot.arcCurve = arcCurve;

hx.plot.svgCurve = svgCurve;

hx.Axis = Axis;

hx.Graph = Graph;
})();
(function(){var StickyTableHeaders, fixSizes, renderStickyHeaders, updateHeaderPositions, updateScrollIndicators,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

updateScrollIndicators = function() {
  var canScrollDown, canScrollLeft, canScrollRight, canScrollUp, node;
  node = this.wrapper.node();
  canScrollUp = node.scrollTop > 0;
  canScrollDown = node.scrollTop < node.scrollHeight - node.clientHeight;
  canScrollLeft = node.scrollLeft > 0;
  canScrollRight = node.scrollLeft < node.scrollWidth - node.clientWidth;
  this.topScrollIndicator.style('display', canScrollUp ? 'block' : '');
  this.rightScrollIndicator.style('display', canScrollRight ? 'block' : '');
  this.bottomScrollIndicator.style('display', canScrollDown ? 'block' : '');
  return this.leftScrollIndicator.style('display', canScrollLeft ? 'block' : '');
};

updateHeaderPositions = function() {
  var leftOffset, node, ref, ref1, topOffset;
  node = this.wrapper.node();
  leftOffset = -node.scrollLeft;
  if (this.options.stickTableHead && this.options.stickFirstColumn) {
    leftOffset -= this.widthOffset;
  }
  topOffset = -node.scrollTop;
  if ((ref = this.topHeader) != null) {
    ref.select('.hx-table').style('left', leftOffset + 'px');
  }
  return (ref1 = this.leftHeader) != null ? ref1.select('.hx-table').style('top', topOffset + 'px') : void 0;
};

fixSizes = function(node, fn) {
  var elem, height, width;
  elem = hx.select(node).style('width', '').style('min-width', '').style('height', '').style('min-height', '');
  width = Math.ceil(elem.style('width').replace('px', ''));
  height = Math.ceil(elem.style('height').replace('px', ''));
  elem.style('width', width + 'px').style('min-width', width + 'px').style('height', height + 'px').style('min-height', height + 'px');
  return fn(elem.clone(true));
};

renderStickyHeaders = function() {
  var addedLeftSticky, addedTopSticky, additionalLevel, bodyTable, bodyTableContent, headerTable, headerTableContent, nonStickyHeightOffset, ref, tableClone, totalHeight, totalWidth, wrapperNode;
  this.widthOffset = 0;
  this.heightOffset = 0;
  nonStickyHeightOffset = 0;
  addedTopSticky = false;
  addedLeftSticky = false;
  this.tableSize = {
    width: this.table.style('width').replace('px', ''),
    height: this.table.style('height').replace('px', '')
  };
  wrapperNode = this.wrapper.node();
  tableClone = this.table.clone(true).style('width', '').style('height', '').style('margin-left', '').style('margin-top', '').style('top', '');
  tableClone.selectAll('tbody, thead').remove();
  additionalLevel = false;
  if (tableClone.node().nodeName.toLowerCase() !== 'table') {
    additionalLevel = true;
  }
  if (this.options.stickTableHead) {
    headerTable = tableClone.clone(true);
    headerTableContent = additionalLevel ? headerTable.select('table') : headerTable.append('thead');
    this.table.select('thead').selectAll('tr').forEach(function(rowNode) {
      var newRowNode;
      newRowNode = headerTableContent.append('tr');
      return rowNode.selectAll('th, td').forEach(function(cellNode) {
        return fixSizes(cellNode.node(), function(newNode) {
          return newRowNode.append(newNode);
        });
      });
    });
    this.topHeader.selectAll('.hx-table').remove();
    if (wrapperNode.scrollHeight > wrapperNode.clientHeight) {
      addedTopSticky = true;
      this.topHeader.append(headerTable);
      this.heightOffset = Number(headerTable.style('height').replace('px', ''));
      this.topHeader.select('.hx-table').style('width', this.tableSize.width + 'px').style('height', this.heightOffset + 'px');
    } else {
      nonStickyHeightOffset = Number(this.table.select('thead').style('height').replace('px', ''));
    }
  }
  if (this.options.stickFirstColumn) {
    bodyTable = tableClone.clone(true);
    bodyTableContent = additionalLevel ? bodyTable.select('table') : bodyTable.append('thead');
    this.table.select('tbody').selectAll('tr').select('th, td').forEach(function(node) {
      return fixSizes(node.node(), function(newNode) {
        return bodyTableContent.append('tr').append(newNode);
      });
    });
    this.leftHeader.selectAll('.hx-table').remove();
    if (wrapperNode.scrollWidth > wrapperNode.clientWidth) {
      addedLeftSticky = true;
      this.leftHeader.append(bodyTable);
      this.widthOffset = Number(bodyTable.style('width').replace('px', ''));
      this.leftHeader.style('top', this.heightOffset + nonStickyHeightOffset + 'px').style('max-height', this.container.height() - this.heightOffset - nonStickyHeightOffset + 'px').style('height', this.tableSize.height - this.heightOffset - nonStickyHeightOffset + 'px').select('.hx-table').style('width', this.widthOffset + 'px').style('height', this.tableSize.height - this.heightOffset - nonStickyHeightOffset + 'px');
    }
  }
  if (this.options.stickFirstColumn && addedLeftSticky && this.options.stickTableHead && addedTopSticky) {
    this.topHeader.style('left', this.widthOffset + 'px');
    this.container.select('.hx-sticky-table-header-top-left').style('width', this.widthOffset + 'px').style('height', this.heightOffset + 'px');
  }
  if ((ref = this.topHeader) != null) {
    ref.style('max-width', this.container.width() - this.widthOffset + 'px').style('width', this.tableSize.width - this.widthOffset + 'px');
  }
  totalHeight = this.container.style('height').replace('px', '') - this.heightOffset;
  totalWidth = this.container.style('width').replace('px', '') - this.widthOffset;
  this.wrapper.style('height', totalHeight + 'px').style('width', totalWidth + 'px').style('margin-left', this.widthOffset + 'px').style('margin-top', this.heightOffset + 'px');
  this.table.style('margin-left', -this.widthOffset + 'px').style('margin-top', -this.heightOffset + 'px');
  if (this.showScrollIndicators) {
    this.topScrollIndicator.style('top', this.heightOffset + 'px').style('left', this.widthOffset + 'px');
    this.rightScrollIndicator.style('top', this.heightOffset + 'px');
    this.bottomScrollIndicator.style('left', this.widthOffset + 'px');
    this.leftScrollIndicator.style('left', this.widthOffset + 'px').style('top', this.heightOffset + 'px');
    updateScrollIndicators.call(this);
  }
  updateHeaderPositions.call(this);
  return this.emit('render');
};

StickyTableHeaders = (function(superClass) {
  extend(StickyTableHeaders, superClass);

  function StickyTableHeaders(selector, options) {
    var background, ref, ref1, ref2, tableIsRootElement, topLeftTable;
    StickyTableHeaders.__super__.constructor.apply(this, arguments);
    this.options = hx.merge.defined({
      stickTableHead: true,
      stickFirstColumn: false,
      useResponsive: true,
      containerClass: void 0
    }, options);
    hx.component.register(selector, this);
    this.selection = hx.select(selector);
    if (this.selection.classed('hx-table') || this.selection.node().nodeName.toLowerCase() === 'table') {
      tableIsRootElement = true;
      this.table = this.selection;
    } else {
      tableIsRootElement = false;
      this.table = this.selection.select('.hx-table');
    }
    if (this.options.stickTableHead && this.table.select('thead').select('tr').empty()) {
      hx.consoleWarning('hx.StickyTableHeaders - ' + selector, 'Sticky table headers initialized without thead element');
      this.options.stickTableHead = false;
    }
    this.container = tableIsRootElement ? this.table.insertAfter('div')["class"]('hx-sticky-table-headers') : this.selection.classed('hx-sticky-table-headers', true);
    if (this.showScrollIndicators = hx.scrollbarSize() === 0) {
      this.topScrollIndicator = this.container.append('div')["class"]('hx-sticky-table-scroll-top');
      this.rightScrollIndicator = this.container.append('div')["class"]('hx-sticky-table-scroll-right');
      this.bottomScrollIndicator = this.container.append('div')["class"]('hx-sticky-table-scroll-bottom');
      this.leftScrollIndicator = this.container.append('div')["class"]('hx-sticky-table-scroll-left');
    }
    if (((ref = this.options.containerClass) != null ? ref.length : void 0) > 0) {
      this.container.classed(this.options.containerClass, true);
    }
    if (this.options.stickTableHead) {
      this.topHeader = this.container.append('div')["class"]('hx-sticky-table-header-top');
    }
    if (this.options.stickFirstColumn) {
      this.leftHeader = this.container.append('div')["class"]('hx-sticky-table-header-left');
    }
    if ((this.options.stickTableHead || this.options.stickFirstColumn) && !this.showScrollIndicators) {
      background = this.table.select('th').style('background-color');
      if ((ref1 = this.topHeader) != null) {
        ref1.style('background-color', background);
      }
      if ((ref2 = this.leftHeader) != null) {
        ref2.style('background-color', background);
      }
    }
    if (this.options.stickFirstColumn && this.options.stickTableHead) {
      topLeftTable = this.container.append('table')["class"]('hx-sticky-table-header-top-left hx-table');
      this.table.select('thead').selectAll('tr').forEach(function(rowNode) {
        return topLeftTable.append('tr').append(rowNode.select('th, td').node().cloneNode(true));
      });
    }
    this.wrapper = this.container.append('div')["class"]('hx-sticky-table-wrapper');
    this.wrapper.append(this.table);
    this.wrapper.on('scroll', 'hx.sticky-table-headers', (function(_this) {
      return function() {
        if (_this.showScrollIndicators) {
          updateScrollIndicators.call(_this);
        }
        return updateHeaderPositions.call(_this);
      };
    })(this));
    this.render();
    if (this.options.useResponsive) {
      this.container.on('resize', 'hx.sticky-table-headers', (function(_this) {
        return function() {
          return _this.render();
        };
      })(this));
    }
  }

  StickyTableHeaders.prototype.render = function() {
    return renderStickyHeaders.call(this);
  };

  return StickyTableHeaders;

})(hx.EventEmitter);

hx.StickyTableHeaders = StickyTableHeaders;
})();
(function(){var Modal, getTitleRender, makeButtons, modalDialog, modalInput,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Modal = (function(superClass) {
  var closeModal;

  extend(Modal, superClass);

  closeModal = function(modal, event) {
    var body;
    body = hx.select('body').classed('hx-modal-open', false);
    body.select('.hx-modal-container').remove();
    body.select('.hx-modal-shade').remove();
    modal.emit('hidestart');
    modal.emit('hide', event);
    return modal.emit('hideend');
  };

  function Modal(title1, setup1, options) {
    this.title = title1;
    this.setup = setup1;
    Modal.__super__.constructor.apply(this, arguments);
    this.options = hx.merge({
      isClosable: true,
      titlebarRenderer: function(node) {
        return hx.select(node).text(this.title);
      }
    }, options);
    this.contentContainer = null;
  }

  Modal.prototype.show = function(cb) {
    var body, btn, modal, modalContainer, self, shade, title;
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
    title = modal.append('div').attr('class', 'hx-modal-title');
    if ((this.title == null) || this.title.length === 0) {
      title.classed('hx-modal-title-empty', true);
    }
    this.options.titlebarRenderer.call(this, title.node());
    if (this.options.isClosable) {
      btn = title.append('button').attr('type', 'button')["class"]('hx-modal-close hx-btn').on('click', 'hx.modal', (function(_this) {
        return function() {
          return closeModal(_this, {
            cause: 'button'
          });
        };
      })(this));
      btn.append('i')["class"]('fa fa-times');
      if (this.buttonClass) {
        btn.classed(this.buttonClass, true);
      }
      modalContainer.on('click', 'hx.modal', (function(_this) {
        return function(e) {
          if (!modal.contains(e.target) && hx.select('body').contains(e.target)) {
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
    this.emit('show', this.contentContainer.node());
    this.emit('showstart');
    self = this;
    modal.style('opacity', 0).style('top', '-30px').morph()["with"]('fadein', 150).and(function() {
      return modal.animate().style('top', '0px', 100);
    }).then(function() {
      self.emit('showend');
      return typeof cb === "function" ? cb() : void 0;
    }).go();
    return this;
  };

  Modal.prototype.close = function() {
    hx.deprecatedWarning('Modal.close', 'use Modal.hide instead');
    return this.hide();
  };

  Modal.prototype.hide = function() {
    closeModal(this, {
      cause: 'api'
    });
    return this;
  };

  return Modal;

})(hx.EventEmitter);

makeButtons = function(container, buttons, modal, callback) {
  buttons.forEach(function(d) {
    return container.append('button').attr('type', 'button')["class"](d.classes).add(hx.detached('i')["class"](d.icon)).add(hx.detached('span').text(' ' + d.text)).on('click', 'hx.modal', function() {
      if (typeof callback === "function") {
        callback(d.value);
      }
      return modal.hide();
    });
  });
};

getTitleRender = function(titleClass, icon) {
  return function(elem) {
    elem = hx.select(elem);
    elem.classed('hx-background-' + titleClass, true);
    if (icon != null) {
      elem.append('i')["class"]('fa ' + icon);
    }
    elem.append('span').text(this.title);
    return this.buttonClass = 'hx-' + titleClass;
  };
};

modalDialog = function(title, message, callback, options) {
  var modal, setup;
  options = hx.merge.defined({
    callback: void 0,
    buttons: [
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
    ],
    isClosable: void 0,
    titleClass: void 0,
    icon: void 0
  }, options);
  setup = function(element) {
    var buttonContainer, container;
    container = hx.select(element);
    message = container.append('div')["class"]('hx-modal-message').text(message);
    buttonContainer = container.append('div')["class"]('hx-modal-buttons');
    return makeButtons(buttonContainer, options.buttons, this, callback);
  };
  modal = new Modal(title, setup, {
    isClosable: options.isClosable
  });
  if (options.titleClass != null) {
    modal.options.titlebarRenderer = getTitleRender(options.titleClass, options.icon);
  }
  modal.on('hide', 'hx.modal', function(d) {
    if (d.cause !== 'api') {
      return callback();
    }
  });
  return modal.show();
};

modalInput = function(title, message, callback, options) {
  var modal, setup;
  options = hx.merge.defined({
    isClosable: void 0,
    value: ''
  });
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
    input = container.append('input')["class"]('hx-modal-input').text(this.options.value);
    buttonContainer = container.append('div')["class"]('hx-modal-buttons');
    return makeButtons(buttonContainer, buttons, this, function(res) {
      if (res) {
        return callback(input.value());
      } else {
        return callback(res);
      }
    });
  };
  modal = new Modal(title, setup, {
    isClosable: options.isClosable
  });
  modal.on('close', 'hx.modal', function(d) {
    if (d.cause !== 'api') {
      return callback();
    }
  });
  return modal.show();
};

hx.Modal = Modal;

hx.modal = {
  dialog: modalDialog,
  input: modalInput
};
})();
(function(){var Notification, NotificationManager, inbuiltNotificationManager, nextId, redraw, removeNotification, setupNotification, startTimeout, togglePin, updatePinnedStatus;

setupNotification = function(notification, selection) {
  if ((notification.options.icon != null) && notification.options.icon.length > 0) {
    selection.append('div')["class"]('hx-notification-icon-container hx-section hx-fixed hx-no-margin').append('i')["class"]('hx-notification-icon ' + notification.options.icon);
  }
  selection.append('div')["class"]('hx-notification-text hx-section hx-no-margin').text(notification.message);
  if (notification.options.pinnable) {
    notification.domPin = selection.append('div')["class"]('hx-notification-icon-container hx-notification-pin hx-section hx-fixed hx-no-margin').on('click', 'hx.notify', function() {
      return togglePin(notification);
    });
    notification.domPin.append('i').attr('class', 'fa fa-thumb-tack');
    updatePinnedStatus(notification);
  }
  return selection.append('div')["class"]('hx-notification-icon-container hx-notification-close hx-section hx-fixed hx-no-margin').on('click', 'hx.notify', function() {
    return notification.close();
  }).append('i')["class"]('fa fa-times');
};

nextId = function(manager) {
  return manager.currentId++;
};

redraw = function(manager) {
  var container, selection, view;
  selection = hx.select(manager.selector);
  container = selection.select('.hx-notification-container');
  if (container.empty()) {
    container = selection.append('div')["class"]('hx-notification-container');
  }
  view = container.view('.hx-notification');
  view.enter(function(d) {
    selection = this.append('div');
    selection["class"]('hx-notification hx-group hx-horizontal ' + d.options.cssclass).forEach(function(node) {
      setupNotification(d, selection);
      return d.trueHeight = selection.style('height');
    }).style('opacity', 0).style('height', 0).style('padding-top', 0).style('padding-bottom', 0).style('margin-top', 0).style('margin-bottom', 0).morph()["with"]('expandv').and('fadein').then(function() {
      return selection.style('height', '');
    }).go();
    return selection.node();
  });
  view.exit(function() {
    return this.style('overflow', 'hidden').morph()["with"]('fadeout', 100).then('collapsev', 100).then((function(_this) {
      return function() {
        return _this.remove();
      };
    })(this)).go();
  });
  return view.apply(manager.notifications, function(d) {
    return d.id;
  });
};

removeNotification = function(manager, notification) {
  var i;
  i = manager.notifications.indexOf(notification);
  if (i >= 0) {
    manager.notifications.splice(i, 1);
  }
  return redraw(manager);
};

startTimeout = function(notification, seconds) {
  return notification.timeoutId = window.setTimeout(((function(_this) {
    return function() {
      return notification.close();
    };
  })(this)), seconds * 1000);
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

Notification = (function() {
  function Notification(manager1, message1, options) {
    this.manager = manager1;
    this.message = message1;
    this.options = hx.merge({
      icon: void 0,
      cssClass: void 0,
      timeout: this.manager._.defaultTimeout,
      pinnable: true
    }, options);
    this.id = nextId(this.manager);
    if (this.options.timeout) {
      startTimeout(this, this.options.timeout);
      this.pinned = false;
    } else {
      this.pinned = true;
    }
  }

  Notification.prototype.close = function() {
    removeNotification(this.manager, this);
    return this;
  };

  Notification.prototype.pin = function() {
    this.pinned = true;
    window.clearTimeout(this.timeoutId);
    updatePinnedStatus(this);
    return this;
  };

  Notification.prototype.unpin = function() {
    this.pinned = false;
    startTimeout(this, 1);
    updatePinnedStatus(this);
    return this;
  };

  return Notification;

})();

NotificationManager = (function() {
  function NotificationManager(selector) {
    this.selector = selector != null ? selector : 'body';
    this.currentId = 0;
    this.notifications = [];
    hx.select(this.selector).append('div')["class"]('hx-notification-container');
    this._ = {
      defaultTimeout: 5
    };
  }

  NotificationManager.prototype.notify = function(message, options) {
    var notification;
    notification = new Notification(this, message, options);
    this.notifications.push(notification);
    redraw(this);
    return notification;
  };

  NotificationManager.prototype.info = function(message, options) {
    if (options == null) {
      options = {};
    }
    return this.notify(message, hx.merge({
      icon: 'fa fa-info',
      cssclass: 'hx-info'
    }, options));
  };

  NotificationManager.prototype.warning = function(message, options) {
    if (options == null) {
      options = {};
    }
    return this.notify(message, hx.merge({
      icon: 'fa fa-warning',
      cssclass: 'hx-warning'
    }, options));
  };

  NotificationManager.prototype.negative = function(message, options) {
    if (options == null) {
      options = {};
    }
    return this.notify(message, hx.merge({
      icon: 'fa fa-exclamation-circle',
      cssclass: 'hx-negative'
    }, options));
  };

  NotificationManager.prototype.positive = function(message, options) {
    if (options == null) {
      options = {};
    }
    return this.notify(message, hx.merge({
      icon: 'fa fa-check',
      cssclass: 'hx-positive'
    }, options));
  };

  NotificationManager.prototype.loading = function(message) {
    return this.notify(message, {
      icon: 'hx-spinner',
      cssclass: 'hx-loading',
      timeout: void 0,
      pinnable: false
    });
  };

  NotificationManager.prototype.defaultTimeout = function(timeout) {
    if (arguments.length > 0) {
      this._.defaultTimeout = timeout || 5;
      return this;
    } else {
      return this._.defaultTimeout;
    }
  };

  return NotificationManager;

})();

hx.NotificationManager = NotificationManager;

inbuiltNotificationManager = new NotificationManager;

hx.notify = function(message, options) {
  return inbuiltNotificationManager.notify(message, options);
};

hx.notify.info = function(message, options) {
  return inbuiltNotificationManager.info(message, options);
};

hx.notify.positive = function(message, options) {
  return inbuiltNotificationManager.positive(message, options);
};

hx.notify.warning = function(message, options) {
  return inbuiltNotificationManager.warning(message, options);
};

hx.notify.negative = function(message, options) {
  return inbuiltNotificationManager.negative(message, options);
};

hx.notify.loading = function(message) {
  return inbuiltNotificationManager.loading(message);
};

hx.notify.defaultTimeout = function(timeout) {
  return inbuiltNotificationManager.defaultTimeout.apply(inbuiltNotificationManager, arguments);
};
})();
(function(){var getValidationMessage, validateForm;

getValidationMessage = function(message, type) {
  switch (message.toLowerCase()) {
    case 'value missing':
      if (type === 'radio') {
        return 'Please select one of these options.';
      } else {
        return 'Please fill in this field.';
      }
      break;
    case 'type mismatch':
      return 'Please enter a valid ' + type + '.';
    default:
      return message;
  }
};

validateForm = function(form, options) {
  var element, error, errors, i, input, j, ref, type;
  form = hx.select(form).node();
  options = hx.merge.defined({
    showMessage: true
  }, options);
  errors = [];
  for (i = j = 0, ref = form.children.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    if (form.children[i].nodeName.toLowerCase() === 'div') {
      element = form.children[i].children[1];
      if (element.nodeName.toLowerCase() === 'input') {
        if (!element.checkValidity()) {
          type = hx.select(element).attr('type');
          errors.push({
            message: getValidationMessage(element.validationMessage, type),
            node: element,
            validity: element.validity
          });
        }
      } else {
        input = hx.select(element).select('input').node();
        type = hx.select(element).select('input').attr('type');
        if (input && !input.checkValidity()) {
          errors.push({
            message: getValidationMessage(input.validationMessage, type),
            node: element,
            validity: input.validity
          });
        }
      }
    }
  }
  if (options.showMessage && errors.length > 0) {
    error = errors[0];
    hx.select(error.node.parentNode).insertAfter('div')["class"]('hx-form-error').append('div').insertAfter('div')["class"]('hx-form-error-text-container').append('div')["class"]('hx-form-error-text').text(error.message);
    hx.select(error.node).on('click', 'hx.form', function(e) {
      var next;
      next = hx.select(error.node.parentNode.nextElementSibling);
      if (next.classed('hx-form-error')) {
        next.remove();
      }
      return hx.select(error.node).off('click', 'hx.form');
    });
  }
  return {
    valid: errors.length === 0,
    errors: errors
  };
};

hx.validateForm = validateForm;
})();
(function(){var TitleBar, setVisibility;

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
        return elem.style('height', '0px').morph()["with"]('expandv', 150).go();
      }
    } else {
      if (animate) {
        return elem.morph()["with"]('collapsev', 50).then(function() {
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

TitleBar = (function() {
  function TitleBar(selector) {
    var hasLinkBar, isFixed, isFullScreen;
    this.selector = selector;
    hx.component.register(this.selector, this);
    this._ = {};
    this.isMobileFriendly = hx.select(this.selector).select('.hx-titlebar-menu-icon-mobile').size() > 0;
    hasLinkBar = hx.select(this.selector).select('.hx-titlebar-linkbar').selectAll('.hx-titlebar-link').size() > 0;
    isFixed = hx.select('body').classed('hx-titlebar-fixed');
    isFullScreen = hx.select('body').classed('hx-full-screen');
    if (this.isMobileFriendly) {
      hx.select(this.selector).select('.hx-titlebar-menu-icon-mobile').on('click', 'hx.titlebar', (function(_this) {
        return function() {
          return setVisibility.call(_this, !_this.visible, true);
        };
      })(this));
      this.visible = true;
      setVisibility.call(this, false, false);
    }
    if (hasLinkBar && (isFixed || isFullScreen)) {
      hx.select('body').classed('hx-titlebar-link-padding', true);
    }
  }

  TitleBar.prototype.show = function(animate) {
    return setVisibility.call(this, true, animate);
  };

  TitleBar.prototype.hide = function(animate) {
    return setVisibility.call(this, false, animate);
  };

  TitleBar.prototype.contextClass = function(cls) {
    var d, i, len, ref;
    if (arguments.length > 0) {
      if (cls != null) {
        this._.cls = void 0;
        ref = ['hx-positive', 'hx-negative', 'hx-warning', 'hx-info'];
        for (i = 0, len = ref.length; i < len; i++) {
          d = ref[i];
          if (cls === d) {
            this._.cls = d;
          }
          hx.select(this.selector).select('.hx-titlebar').classed(d, cls === d);
        }
      }
      return this;
    } else {
      return this._.cls;
    }
  };

  TitleBar.prototype.active = function(id) {
    var selection;
    if (arguments.length > 0) {
      selection = hx.selectAll('.hx-titlebar-link').classed('hx-selected', false);
      if (id != null) {
        this._.active = hx.isString(id) ? hx.select(id).classed('hx-selected', true) : hx.select(selection.node(id)).classed('hx-selected', true);
        return this;
      }
    } else {
      return this._.active;
    }
  };

  return TitleBar;

})();

hx.TitleBar = TitleBar;

if (hx.select('.hx-heading').size() > 0) {
  hx.titlebar = new hx.TitleBar('.hx-heading');
}
})();
(function(){var Slider, discreteToPos, posToDiscrete, posToValue, renderValues, slide, slideEnd,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

posToValue = function(unit) {
  if (this._.isDiscrete) {
    return posToDiscrete.call(this, unit);
  } else {
    return (unit * (this.options.max - this.options.min)) + this.options.min;
  }
};

discreteToPos = function(discrete) {
  return this._.discreteValues[discrete];
};

posToDiscrete = function(pos) {
  var _, k, ref, space, v;
  _ = this._;
  space = _.discreteSpacing / 2;
  ref = _.discreteValues;
  for (k in ref) {
    v = ref[k];
    if (pos >= (v - space) && pos < (v + space)) {
      return k;
    }
  }
  return pos;
};

slide = function(e) {
  var _, diff, end, isEnd, offset, pos, start, val;
  _ = this._;
  this.emit('slidestart', this.value());
  _.mouseDown = true;
  _.pointerMoveHandler = (function(_this) {
    return function(e) {
      return slide.call(_this, e);
    };
  })(this);
  _.pointerUpHandler = (function(_this) {
    return function(e) {
      return slideEnd.call(_this, e);
    };
  })(this);
  hx.select(document).on('pointermove', 'hx.slider', _.pointerMoveHandler);
  hx.select(document).on('pointerup', 'hx.slider', _.pointerUpHandler);
  _.slidableWidth = this.options.type === 'range' ? _.container.width() - _.controlWidth : _.container.width();
  e.event.preventDefault();
  pos = hx.clamp(0, _.container.width(), e.x - _.container.box().left) / _.slidableWidth;
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
      pos = hx.clamp(start, 1, pos);
      val.end = posToValue.call(this, pos);
    } else {
      _.dragging = 'start';
      pos = hx.clamp(0, end, pos);
      val.start = posToValue.call(this, pos);
    }
  } else {
    _.dragging = 'value';
    val.value = posToValue.call(this, pos);
  }
  this.value(val);
  this.emit('change', this.value());
};

slideEnd = function(e) {
  var _, node;
  _ = this._;
  if (_.mouseDown) {
    hx.select(document).off('pointermove', 'hx.slider', _.pointerMoveHandler);
    hx.select(document).off('pointerup', 'hx.slider', _.pointerUpHandler);
    _.mouseDown = false;
    _.dragging = void 0;
    node = _.range.select('.hx-slider-active');
    node.morph()["with"]('delay', 100).then('fadeout', 200).then(function() {
      node.classed('hx-slider-active', false);
      return _.valueVis = false;
    }).go(true);
  }
  return this.emit('slideend', this.value());
};

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
      this.options.renderer(this, node.node(), val);
      box = node.box();
      node.classed('hx-slider-under', box.top - box.height < 0);
      node.morph()["with"]('fadein', 30).go(true);
    }
    this.options.renderer(this, node.node(), val);
  }
};

Slider = (function(superClass) {
  extend(Slider, superClass);

  function Slider(selector, options) {
    var _, curr, end, inc, max, mid, min, ref, self, start, steps, value;
    this.selector = selector;
    if (options == null) {
      options = {};
    }
    Slider.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this.options = hx.merge({
      type: 'slider',
      discreteValues: void 0,
      renderer: function(slider, elem, value) {
        return hx.select(elem).text(hx.format.fixed(2)(value));
      },
      min: 0,
      max: 1,
      step: void 0
    }, options);
    this._ = _ = {};
    _.isDiscrete = ((ref = this.options.discreteValues) != null ? ref.length : void 0) > 0 || (this.options.step != null);
    self = this;
    _.container = hx.select(this.selector).classed('hx-slider', true).append('div').classed('hx-slider-inner', true).classed('hx-slider-double', this.options.type === 'range').classed('hx-slider-discrete', _.isDiscrete).on('pointerdown', 'hx.slider', (function(_this) {
      return function(e) {
        return slide.call(_this, e);
      };
    })(this));
    _.range = _.container.append('div')["class"]('hx-slider-range');
    if (_.controlWidth == null) {
      _.controlWidth = Number(window.getComputedStyle(_.range.node(), ':after').width.replace('px', ''));
    }
    _.valueL = _.range.append('div')["class"]('hx-slider-value').style('left', 0);
    _.valueR = _.range.append('div')["class"]('hx-slider-value').style('left', '100%');
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
  }

  Slider.prototype.discreteValues = function(array, render) {
    var _, i, j, point, pos, ref, ref1;
    if (render == null) {
      render = true;
    }
    if (array != null) {
      this.options.discreteValues = array;
      _ = this._;
      _.isDiscrete = ((ref = this.options.discreteValues) != null ? ref.length : void 0) > 0 || (this.options.step != null);
      _.discreteValues = {};
      _.discreteSpacing = 1 / (array.length - 1);
      _.container.selectAll('.hx-slider-point').remove();
      for (i = j = 0, ref1 = array.length; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
        pos = i * _.discreteSpacing;
        _.discreteValues[array[i]] = pos;
        if (this.options.type === 'range' || i > 0) {
          point = _.range.insertBefore('div')["class"]('hx-slider-point').style('left', pos * 100 + '%');
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

  Slider.prototype.max = function(max) {
    if (arguments.length > 0) {
      this.options.max = max;
      renderValues.call(this);
      return this;
    } else {
      return this.options.max;
    }
  };

  Slider.prototype.step = function(step) {
    if (arguments.length > 0) {
      this.options.step = step;
      renderValues.call(this);
      return this;
    } else {
      return this.options.step;
    }
  };

  Slider.prototype.min = function(min) {
    if (arguments.length > 0) {
      this.options.min = min;
      renderValues.call(this);
      return this;
    } else {
      return this.options.min;
    }
  };

  Slider.prototype.value = function(value) {
    var clamp;
    if (arguments.length > 0) {
      clamp = (function(_this) {
        return function(val) {
          if (_this._.isDiscrete) {
            return val;
          } else {
            return hx.clamp(_this.options.min, _this.options.max, val);
          }
        };
      })(this);
      if (this.options.type === 'range') {
        if (value.start != null) {
          this.values.start = clamp(value.start);
        }
        if (value.end != null) {
          this.values.end = clamp(value.end);
        }
      } else {
        if (hx.isObject(value)) {
          if (value.value != null) {
            this.values.value = clamp(value.value);
          }
        } else {
          if (value != null) {
            this.values.value = clamp(value);
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

  Slider.prototype.renderer = function(f) {
    if (f != null) {
      this.options.renderer = f;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  return Slider;

})(hx.EventEmitter);

hx.Slider = Slider;
})();
(function(){var AutoComplete, buildAutoComplete, findTerm, showAutoComplete,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

findTerm = function(term, forceMatch) {
  var _, allData, data, dataMatches, filteredData, heading, matches, remainingResults, self;
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
    remainingResults = filteredData.length === 0 ? allData : (data = allData.filter(function(d) {
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
    }) : data = data.sort(hx.sort.compare) : void 0, data);
    remainingResults = heading.concat(remainingResults.sort(function(a, b) {
      if (!a.disabled && b.disabled) {
        return -1;
      } else if (a.disabled && !b.disabled) {
        return 1;
      } else {
        return hx.sort.compare(a.full, b.full);
      }
    }));
    filteredData = matches.concat(remainingResults);
  }
  return filteredData;
};

buildAutoComplete = function(searchTerm, fromCallback, loading) {
  var _, filteredData, items, message, self, trimAndReload;
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
    _.menu.items([]);
    items = [];
    trimAndReload = false;
    if (filteredData == null) {
      message.text = 'Loading...';
    } else if (searchTerm.length < this.options.minLength) {
      message.text = "Please enter " + this.options.minLength + " or more characters";
    } else if ((searchTerm.length > 0 || this.options.showAll) && filteredData.length === 0) {
      if (this.options.trimTrailingSpaces && _.input.value().lastIndexOf(' ') === _.input.value().length - 1) {
        trimAndReload = true;
      } else if (this.options.noResultsMessage.length > 0 && (this.options.noResultsMessage != null)) {
        message.text = this.options.noResultsMessage;
      }
    } else if (searchTerm.length >= this.options.minLength && filteredData.length > 0) {
      items = items.concat(filteredData);
    }
    if (message.text.length > 0) {
      items = [message].concat(items);
    }
    if (items.length > 0) {
      _.menu.items(items);
      if (_.menu.dropdown.isOpen()) {
        _.menu.dropdown.dropdownContent(_.menu.dropdown.dropdown.node());
      } else {
        _.menu.dropdown.show();
      }
    } else {
      _.menu.hide();
    }
    if (trimAndReload) {
      _.input.value(_.input.value().substring(0, _.input.value().length - 1));
      buildAutoComplete.call(self, _.input.value(), fromCallback, loading);
    }
  }
  return void 0;
};

showAutoComplete = function() {
  this._.cleanUp = false;
  return buildAutoComplete.call(this, this._.input.value() || '');
};

AutoComplete = (function(superClass) {
  extend(AutoComplete, superClass);

  function AutoComplete(selector, data1, options) {
    var _, _filterOpts, base, base1, base2, input, menu, self, timeout;
    this.selector = selector;
    this.data = data1;
    this.options = options != null ? options : {};
    AutoComplete.__super__.constructor.apply(this, arguments);
    this._ = _ = {};
    hx.component.register(this.selector, this);
    _.ignoreMatch = false;
    _.ignoreNextFocus = false;
    self = this;
    _.data = new hx.Map();
    if (hx.isFunction(this.data)) {
      _.callback = this.data;
    } else {
      _.data.set('', this.data);
    }
    if (!hx.isArray(this.data) && !hx.isFunction(this.data)) {
      hx.consoleWarning('AutoComplete - ', this.selector, ': data set incorrectly - you supplied: ', this.data, ' but should have been an array of items or a function');
    } else {
      this.options = hx.merge({
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
        noResultsMessage: 'No results found',
        otherResultsMessage: 'Other Results'
      }, this.options);
      if (this.options.inputMap != null) {
        _filterOpts = {
          searchValues: function(d) {
            return [self.options.inputMap(d)];
          }
        };
      }
      this.options.filterOptions = hx.merge({}, _filterOpts, this.options.filterOptions);
      if ((base = this.options).filter == null) {
        base.filter = function(arr, term) {
          return hx.filter[self.options.matchType](arr, term, self.options.filterOptions).sort(function(a, b) {
            if (!a.disabled && b.disabled) {
              return -1;
            } else if (a.disabled && !b.disabled) {
              return 1;
            } else {
              return hx.sort.compare(a, b);
            }
          });
        };
      }
      if ((base1 = this.options).renderer == null) {
        base1.renderer = this.options.inputMap != null ? function(elem, item) {
          return hx.select(elem).text(self.options.inputMap(item));
        } : function(elem, item) {
          return hx.select(elem).text(item);
        };
      }
      if ((base2 = this.options).placeholder == null) {
        base2.placeholder = this.options.minLength > 0 ? "Min length " + this.options.minLength + " characters" : void 0;
      }
      input = hx.select(this.selector);
      menu = new hx.Menu(this.selector, {
        ddClass: 'hx-autocomplete-dropdown'
      });
      menu.pipe(this, '', ['highlight']);
      menu.dropdown.pipe(this, 'dropdown');
      hx.select(this.selector).off('click', 'hx.menu');
      menu.on('input', 'hx.autocomplete', function(e) {
        if (self.options.allowTabCompletion) {
          if ((e.which || e.keyCode) === 9) {
            return e.preventDefault();
          }
        }
      });
      _.setInputValue = this.options.inputMap != null ? function(d) {
        input.value(self.options.inputMap(d));
        return self.emit('change', d);
      } : function(d) {
        input.value(d);
        return self.emit('change', d);
      };
      if (this.options.placeholder != null) {
        input.attr('placeholder', this.options.placeholder);
      }
      input.on('focus', 'hx.autocomplete', function(e) {
        if (!_.ignoreNextFocus) {
          _.cleanUp = false;
          return self.show();
        }
      });
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
            return buildAutoComplete.call(self, input.value() || '');
          }
        }, 200);
      });
      menu.renderer(function(elem, item) {
        var selection;
        selection = hx.select(elem);
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
            } else if ((_.initialValue == null) && menu.cursorPos > -1) {
              return _.initialValue = input.value();
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
      menu.on('dropdown.show', 'hx.autocomplete', function() {
        _.initialValue = input.value();
        return menu.dropdown.useScroll = true;
      });
      _.checkValidity = function() {
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
        return self.emit('hide', input.value());
      };
      menu.on('dropdown.hide', 'hx.autocomplete', function() {
        _.checkValidity();
      });
      menu.on('click', 'hx.autocomplete', function() {
        return _.ignoreMatch = true;
      });
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

  AutoComplete.prototype.value = function(value) {
    if (arguments.length > 0) {
      this._.setInputValue(value);
      this._.checkValidity();
      return this;
    } else {
      return this._.input.value();
    }
  };

  AutoComplete.prototype.hide = function() {
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

  return AutoComplete;

})(hx.EventEmitter);

hx.AutoComplete = AutoComplete;
})();
(function(){var ButtonGroup,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ButtonGroup = (function(superClass) {
  extend(ButtonGroup, superClass);

  function ButtonGroup(selector, options) {
    var group, self;
    ButtonGroup.__super__.constructor.apply(this, arguments);
    self = this;
    hx.component.register(selector, this);
    this.options = hx.merge.defined({
      buttonClass: 'hx-compliment',
      activeClass: 'hx-contrast',
      fullWidth: false,
      renderer: function(node, data, current) {
        hx.select(node).text(data.value != null ? data.value : data);
      },
      items: []
    }, options);
    this.current = void 0;
    group = hx.select(selector).classed('hx-button-group', true).append('div')["class"]('hx-input-group').classed('hx-input-group-full-width', this.options.fullWidth);
    this.view = group.view('button').enter(function() {
      return this.append('button')["class"]('hx-btn ' + self.options.buttonClass).classed('hx-section hx-no-margin', self.options.fullWidth).node();
    }).update(function(item, node) {
      var buttonClass;
      buttonClass = (item.activeClass != null) && item === self.current ? item.activeClass : item === self.current ? self.options.activeClass : self.options.buttonClass;
      this.classed(self.options.buttonClass, false).classed(self.options.activeClass, false).classed(buttonClass, true).on('click', 'hx.button-group', function() {
        self.value(item);
        return self.emit('change', item);
      });
      self.options.renderer(node, item, item === self.current);
    });
    if ((this.options.items != null) && this.options.items.length > 0) {
      this.items(this.options.items);
    }
  }

  ButtonGroup.prototype.renderer = function(f) {
    if (f != null) {
      this.options.renderer = f;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  ButtonGroup.prototype.items = function(items) {
    if (items != null) {
      this.options.items = items;
      this.view.apply(this.options.items);
      return this;
    } else {
      return this.options.items;
    }
  };

  ButtonGroup.prototype.value = function(value) {
    var i, item, len, ref;
    if (arguments.length > 0) {
      ref = this.options.items;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (item === value || item.value === value) {
          this.current = item;
          this.view.apply(this.options.items);
          break;
        }
      }
      return this;
    } else {
      return this.current;
    }
  };

  return ButtonGroup;

})(hx.EventEmitter);

hx.ButtonGroup = ButtonGroup;
})();
(function(){var ColorPicker, Position,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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

ColorPicker = (function(superClass) {
  extend(ColorPicker, superClass);

  function ColorPicker(selector, options) {
    var _, buildDropdown;
    ColorPicker.__super__.constructor.apply(this, arguments);
    this.options = hx.merge.defined({
      startColor: '#000',
      showInputs: 0,
      align: 'lblt'
    }, options);
    hx.component.register(selector, this);
    this._ = {};
    _ = this._;
    buildDropdown = (function(_this) {
      return function(elem) {
        var absoluteCursorPosition, blueBoxChanged, blueInput, cancelEvent, circleDown, circleDragObject, circleHeight, circleMoved, circleOffset, circlePicker, circlemax, circlemin, colorChanged, colorGroup, correctOffset, dragObject, endMovement, getEventTarget, getMousePos, greenBoxChanged, greenInput, grid, gridSize, hexBoxChanged, hexInput, hslGroup, hueBoxChanged, hueInput, inputs, lightnessBoxChanged, lightnessInput, makeInput, picker, pickerFields, pickerInner, pointerOffset, quickColorBox, redBoxChanged, redInput, rgbGroup, saturationBoxChanged, saturationInput, slider, sliderDown, sliderDragObject, sliderHeight, sliderMoved, sliderOffset, sliderPicker, slidermax, slidermin, staticColorBox;
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
          if (_this.options.showInputs) {
            staticColorBox.style('background', _.currentColor.toString());
          }
          return _this.emit('changeend', _.currentColor);
        };
        colorChanged = function(source) {
          var gridBG, pos;
          if (_this.options.showInputs) {
            hexInput.value(_.currentColor.toString().toUpperCase());
            redInput.value(_.currentColor.r);
            greenInput.value(_.currentColor.g);
            blueInput.value(_.currentColor.b);
            hueInput.value(Math.round(_.currentColor.h * 360));
            saturationInput.value(Math.round(_.currentColor.s * 100));
            lightnessInput.value(Math.round(_.currentColor.l * 100));
            quickColorBox.style('background', _.currentColor.toString());
          }
          if (source === 'slider' || source === 'box') {
            gridBG = hx.color().setHSL([_.currentColor.h, 1, 0.5]);
            grid.style('background-color', gridBG.toString());
          }
          if (source === 'box') {
            sliderPicker.style('top', (gridSize - (_.currentColor.h * gridSize) - sliderOffset.y) + 'px');
            pos = new Position(_.currentColor.s * gridSize, (1 - _.currentColor.l) * gridSize);
            pos = correctOffset(pos, circleOffset, true);
            pos.apply(circlePicker);
            endMovement();
          }
          return _this.emit('change', _.currentColor);
        };
        hexBoxChanged = function(e) {
          if (hx.color.isColorString(hexInput.value())) {
            _.currentColor = hx.color(hexInput.value());
            return colorChanged('box');
          }
        };
        redBoxChanged = function(e) {
          _.currentColor.setRGB([parseInt(redInput.value()) || 0, _.currentColor.g, _.currentColor.b]);
          return colorChanged('box');
        };
        greenBoxChanged = function(e) {
          _.currentColor.setRGB([_.currentColor.r, parseInt(greenInput.value()) || 0, _.currentColor.b]);
          return colorChanged('box');
        };
        blueBoxChanged = function(e) {
          _.currentColor.setRGB([_.currentColor.r, _.currentColor.g, parseInt(blueInput.value()) || 0]);
          return colorChanged('box');
        };
        hueBoxChanged = function(e) {
          _.currentColor.setHSL([parseFloat(hueInput.value()) || 0, _.currentColor.s, _.currentColor.l]);
          return colorChanged('box');
        };
        saturationBoxChanged = function(e) {
          _.currentColor.setHSL([_.currentColor.h, (parseFloat(saturationInput.value()) / 100.0) || 0, _.currentColor.l]);
          return colorChanged('box');
        };
        lightnessBoxChanged = function(e) {
          _.currentColor.setHSL([_.currentColor.h, _.currentColor.s, (parseFloat(lightnessInput.value()) / 100.0) || 0]);
          return colorChanged('box');
        };
        sliderMoved = function(pos, elem) {
          pos = correctOffset(pos, sliderOffset, false);
          _.currentColor.setHSL([(gridSize - pos.y) / gridSize, _.currentColor.s, _.currentColor.l]);
          return colorChanged('slider');
        };
        circleMoved = function(pos, elem) {
          pos = correctOffset(pos, circleOffset, false);
          _.currentColor.setHSL([_.currentColor.h, pos.x / gridSize, 1 - pos.y / gridSize]);
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
            e = e.event;
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
            hx.select(document).on('pointermove', 'hx.color-picker', dragGo);
            return hx.select(document).on('pointerup', 'hx.color-picker', dragStopHook);
          };
          dragGo = function(e) {
            var newPos;
            e = e.event;
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
            e = e.event;
            return cancelEvent(e);
          };
          dragStop = function() {
            if (!dragging || disposed) {
              return true;
            }
            hx.select(document).off('pointermove', 'hx.color-picker', dragGo);
            hx.select(document).off('pointerup', 'hx.color-picker', dragStopHook);
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
            return parent.on('pointerdown', 'hx.color-picker', dragStart);
          };
          StopListening = function() {
            if (!listening || disposed) {
              return;
            }
            parent.off('pointerdown', 'hx.color-picker', dragStart);
            if (stopCurrentDragging && dragging) {
              return dragStop();
            }
          };
          return StartListening();
        };
        picker = hx.select(elem).append('div')["class"]('hx-colorpicker');
        pickerInner = picker.append('div')["class"]('hx-colorpicker-inner');
        pickerFields = pickerInner.append('div')["class"]('hx-colorpicker-fields');
        grid = pickerFields.append('div')["class"]('hx-colorpicker-grid');
        circlePicker = grid.append('div')["class"]('hx-colorpicker-picker');
        slider = pickerFields.append('div')["class"]('hx-colorpicker-slider');
        sliderPicker = slider.append('div')["class"]('hx-colorpicker-picker');
        if (_this.options.showInputs) {
          inputs = pickerInner.append('div')["class"]('hx-colorpicker-inputs');
          colorGroup = inputs.append('div')["class"]('hx-colorpicker-input-group');
          quickColorBox = colorGroup.append('div')["class"]('hx-colorpicker-quick-color');
          staticColorBox = colorGroup.append('div')["class"]('hx-colorpicker-static-color');
          makeInput = function(parent, name, text) {
            return parent.append('div')["class"]('hx-colorpicker-input').append('label').attr('for', name).text(text).insertAfter('input').attr('name', name).attr('size', 7).attr('maxlength', 3);
          };
          hexInput = makeInput(inputs, 'hex', 'Hex:');
          rgbGroup = inputs.append('div')["class"]('hx-colorpicker-input-group');
          redInput = makeInput(rgbGroup, 'red', 'R:');
          greenInput = makeInput(rgbGroup, 'green', 'G:');
          blueInput = makeInput(rgbGroup, 'blue', 'B:');
          hslGroup = inputs.append('div')["class"]('hx-colorpicker-input-group');
          hueInput = makeInput(hslGroup, 'hue', 'H:');
          saturationInput = makeInput(hslGroup, 'saturation', 'S:');
          lightnessInput = makeInput(hslGroup, 'lightness', 'L:');
        }
        if (_this.options.showInputs) {
          hexInput.on('change', 'hx.color-picker', hexBoxChanged);
          redInput.on('change', 'hx.color-picker', redBoxChanged);
          greenInput.on('change', 'hx.color-picker', greenBoxChanged);
          blueInput.on('change', 'hx.color-picker', blueBoxChanged);
          hueInput.on('change', 'hx.color-picker', hueBoxChanged);
          saturationInput.on('change', 'hx.color-picker', saturationBoxChanged);
          lightnessInput.on('change', 'hx.color-picker', lightnessBoxChanged);
          quickColorBox.style('background', _.currentColor.toString());
          staticColorBox.style('background', _.currentColor.toString());
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
    this.dropdown = new hx.Dropdown(selector, buildDropdown, {
      align: this.options.align
    });
    this.value(this.options.startColor);
    this.dropdown.pipe(this, 'dropdown');
    this;
  }

  ColorPicker.prototype.value = function(color) {
    var _;
    _ = this._;
    if (color != null) {
      _.currentColor = typeof color === 'string' ? hx.color(color) : color;
      if (this.dropdown.isOpen()) {
        this.dropdown.hide();
        this.dropdown.show();
      }
      return this;
    } else {
      return _.currentColor.toString();
    }
  };

  return ColorPicker;

})(hx.EventEmitter);

hx.ColorPicker = ColorPicker;
})();
(function(){var ColorScale;

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
  }

  ColorScale.prototype.apply = function(v) {
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
(function(){var Crumbtrail;

Crumbtrail = (function() {
  function Crumbtrail(selector, options) {
    var self, update;
    this.selector = selector;
    hx.component.register(this.selector, this);
    self = this;
    this.options = hx.merge.defined({
      renderer: function(node, data) {
        return hx.select(node).text(data);
      },
      items: [],
      separator: '/'
    }, options);
    update = function(d, element, i) {
      if (i % 2 === 0) {
        this["class"]('hx-crumbtrail-node');
        return self.options.renderer(element, d);
      } else {
        return this["class"]('hx-crumbtrail-separator').html(self.options.separator).node();
      }
    };
    this.view = hx.select(this.selector).view('span', 'span').update(update);
    if ((this.options.items != null) && this.options.items.length > 0) {
      this.items(this.options.items);
    }
  }

  Crumbtrail.prototype.renderer = function(render) {
    if (render != null) {
      this.options.renderer = render;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  Crumbtrail.prototype.items = function(data) {
    if (data != null) {
      this.options.items = hx.flatten(data.map(function(d) {
        return [d, 0];
      })).slice(0, -1);
      this.view.apply(this.options.items);
      return this;
    } else {
      return this.options.items;
    }
  };

  return Crumbtrail;

})();

hx.Crumbtrail = Crumbtrail;
})();
(function(){var Dashboard, DashboardWidget, drag, endDrag, getGrid, startDrag,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

getGrid = function() {
  var before, container, count, grid;
  container = hx.select(this.selection.node().parentNode);
  grid = [];
  count = -1;
  before = true;
  container.selectAll('.hx-widget').forEach(function(e) {
    var box;
    box = e.box();
    if (e.classed('hx-widget-current')) {
      before = false;
    }
    return grid.push({
      index: count += 1,
      x1: box.left,
      x2: box.left + box.width,
      y1: box.top,
      y2: box.top + box.height,
      width: box.width,
      node: e,
      before: before
    });
  });
  return grid;
};

startDrag = function(e) {
  var _, self;
  _ = this._;
  self = this;
  e.event.preventDefault();
  if (_.dragging) {
    return endDrag.call(this, e);
  } else if (e.event.which < 2) {
    hx.select(document).on('pointermove', 'hx.dashboard', function(e) {
      return drag.call(self, e);
    });
    hx.select(document).on('pointerup', 'hx.dashboard', function(e) {
      return endDrag.call(self, e);
    });
    _.dragging = true;
    _.origPageYOffset = window.pageYOffset;
    _.origPageXOffset = window.pageXOffset;
    this.selection.classed('hx-widget-current', true);
    _.grid = getGrid.call(this);
    _.origWidth = this.selection.style('width').replace('px', '');
    _.origHeight = this.selection.style('height').replace('px', '');
    _.placeholder = this.selection.insertAfter('div')["class"]('hx-widget-placeholder hx-group hx-vertical');
    _.placeholder.style('min-height', _.origHeight + 'px').append('div');
    this.selection.classed('hx-widget-drag', true).style('width', _.origWidth + 'px').style('left', '0px').style('top', '0px');
    _.placeholderBox = _.placeholder.box();
    _.controlBox = this.dragControl.box();
    _.selectionBox = this.selection.box();
    _.parentBox = hx.select(this.selection.node().parentNode).box();
    drag.call(this, e);
    _.currentPos = -1;
    return this.emit('dragstart');
  }
};

drag = function(e) {
  var _, box, controlOffsetX, controlOffsetY, i, inX, inY, len, ref, results, scrollOffsetX, scrollOffsetY, selectionOffsetX, selectionOffsetY, wDiff, xPos, xVal, yPos, yVal;
  _ = this._;
  if (_.dragging) {
    e.event.preventDefault();
    wDiff = 0;
    if (_.resizeOnDrag) {
      this.selection.style('width', _.placeholderBox.width + 'px');
      wDiff = _.placeholderBox.width - _.origWidth;
    }
    controlOffsetX = _.controlBox.left + (_.controlBox.width / 2);
    controlOffsetY = _.controlBox.top + (_.controlBox.height / 2);
    selectionOffsetX = _.parentBox.left - _.selectionBox.left;
    selectionOffsetY = _.parentBox.top - _.selectionBox.top;
    scrollOffsetX = window.pageXOffset - _.origPageXOffset;
    scrollOffsetY = window.pageYOffset - _.origPageYOffset;
    xVal = e.x - selectionOffsetX - controlOffsetX + scrollOffsetX - wDiff;
    yVal = e.y - selectionOffsetY - controlOffsetY + scrollOffsetY;
    this.selection.style('left', xVal + 'px');
    this.selection.style('top', yVal + 'px');
    xPos = e.x + scrollOffsetX;
    yPos = e.y + scrollOffsetY;
    ref = _.grid;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      box = ref[i];
      inX = xPos >= box.x1 && xPos <= box.x2;
      inY = yPos >= box.y1 && yPos <= box.y2;
      if (inX && inY) {
        if (_.currentPos !== box.index && _.currentPos > -1) {
          if (box.before) {
            box.node.insertBefore(_.placeholder);
          } else {
            box.node.insertAfter(_.placeholder);
          }
          _.placeholderBox = _.placeholder.box();
          this.emit('drag');
        }
        _.currentPos = box.index;
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
};

endDrag = function(e) {
  var _;
  _ = this._;
  if (_.dragging) {
    hx.select(document).off('pointermove', 'hx.dashboard');
    hx.select(document).off('pointerup', 'hx.dashboard');
    e.event.preventDefault();
    _.dragging = false;
    _.placeholder.insertAfter(this.selection);
    _.placeholder.remove();
    this.selection.style('top', '');
    this.selection.style('left', '');
    this.selection.style('width', '');
    this.selection.classed('hx-widget-drag', false);
    this.selection.classed('hx-widget-current', false);
    return this.emit('dragend');
  }
};

Dashboard = (function() {
  function Dashboard(selector) {
    hx.component.register(selector, this);
    this.selection = hx.select(selector).classed('hx-layout', true).classed('hx-group', true).classed('hx-horizontal', true).classed('hx-dashboard', true);
  }

  Dashboard.prototype.createWidget = function(options) {
    return new DashboardWidget(this.selection.append('div').node(), options);
  };

  Dashboard.prototype.order = function(order) {
    var existingIds, i, id, j, len, len1, node, widgets;
    widgets = this.selection.selectAll('.hx-widget').nodes;
    existingIds = widgets.map(function(e) {
      return hx.component(e).id;
    });
    if (widgets.some(function(e) {
      return !hx.component(e).id;
    })) {
      hx.consoleWarning('Dashboard.order: Id\'s must be specified for every element', 'Some widgets in the dashboard were not created with an id.', 'Every widget must have an id to enable sorting.');
    } else {
      if (arguments.length > 0) {
        if (order.slice(0).sort().join('') === existingIds.sort().join('')) {
          for (i = 0, len = order.length; i < len; i++) {
            id = order[i];
            for (j = 0, len1 = widgets.length; j < len1; j++) {
              node = widgets[j];
              if (hx.component(node).id === id) {
                this.selection.append(node);
                break;
              }
            }
          }
        } else {
          hx.consoleWarning('Dashboard.order(order): Incorrect value(s) specified for order array', 'The widgets in the dashboard does not match the widgets in the order array.', '\nOrder: ', order, '\nWidgets: ', existingIds);
        }
        return this;
      } else {
        return existingIds;
      }
    }
  };

  return Dashboard;

})();

DashboardWidget = (function(superClass) {
  extend(DashboardWidget, superClass);

  function DashboardWidget(selector, options) {
    var _, dragNS, heading, self;
    DashboardWidget.__super__.constructor.apply(this, arguments);
    self = this;
    _ = this._ = {};
    this.selection = hx.select(selector);
    hx.component.register(selector, this);
    options = hx.merge.defined({
      draggable: false,
      resizeOnDrag: true,
      showDragControl: false,
      showMenu: false,
      height: void 0,
      width: '500px',
      id: void 0,
      title: ''
    }, options);
    this.selection["class"]('hx-widget hx-group hx-vertical').style('-webkit-flex-basis', options.width).style('-ms-flex-preferred-size', options.width).style('-o-flex-basis', options.width).style('flex-basis', options.width);
    if (options.id) {
      this.id = options.id;
    }
    heading = this.selection.append('div')["class"]('hx-widget-heading hx-section hx-fixed');
    heading.append('span').text(options.title);
    this.menuButton = heading.append('button')["class"]('hx-btn hx-btn-invisible');
    this.menuButton.append('i')["class"]('fa fa-bars');
    this.body = this.selection.append('div')["class"]('hx-widget-body-wrapper hx-section').append('div')["class"]('hx-widget-body').style('height', options.height ? options.height : '');
    this.menu = new hx.Menu(this.menuButton.node(), {
      align: 'rbrt'
    });
    this.menu.renderer(function(element, d) {
      var it;
      it = hx.select(element).classed('hx-widget-menu-item', true);
      it.append('i')["class"]('fa ' + d.icon);
      return it.append('span').text(d.name);
    });
    this.showMenu(options.showMenu);
    _.draggable = false;
    if (options.draggable || options.showDragControl) {
      _.draggable = true;
      _.resizeOnDrag = options.resizeOnDrag || false;
      this.dragControl = heading.append('button')["class"]('hx-btn hx-btn-invisible hx-drag-control');
      this.dragControl.append('i')["class"]('fa fa-arrows');
      dragNS = 'hx.dashboard.' + hx.randomId();
      this.dragControl.on('pointerdown', 'hx.dashboard', function(e) {
        return startDrag.call(self, e);
      });
      this.showDragControl(options.showDragControl);
    }
  }

  DashboardWidget.prototype.remove = function(cb) {
    this.selection.style('max-width', this.selection.style('width')).morph()["with"]('fadeout').thenStyle('max-width', '0px').andStyle('height', '0px').then((function(_this) {
      return function() {
        return _this.selection.remove();
      };
    })(this)).then(function() {
      return cb();
    }).go();
    return this;
  };

  DashboardWidget.prototype.title = function(title) {
    var selection;
    selection = this.selection.select('.hx-widget-heading').select('span');
    if (arguments.length > 0) {
      selection.text(title);
      return this;
    } else {
      return selection.text();
    }
  };

  DashboardWidget.prototype.showMenu = function(visible) {
    if (arguments.length > 0) {
      this._.menuVisible = visible;
      this.menuButton.style('display', !visible ? 'none' : void 0);
      if (this._.dragVisible) {
        this.dragControl.style('right', this._.menuVisible ? this.menuButton.width() + 'px' : void 0);
      }
      return this;
    } else {
      return this._.menuVisible;
    }
  };

  DashboardWidget.prototype.showDragControl = function(visible) {
    if (arguments.length > 0) {
      if (this._.draggable) {
        this._.dragVisible = visible;
        this.dragControl.style('display', !visible ? 'none' : void 0);
        this.dragControl.style('right', this._.menuVisible ? this.menuButton.width() + 'px' : void 0);
      }
      return this;
    } else {
      return this._.dragVisible;
    }
  };

  return DashboardWidget;

})(hx.EventEmitter);

hx.Dashboard = Dashboard;
})();
(function(){var DateTimePicker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DateTimePicker = (function(superClass) {
  extend(DateTimePicker, superClass);

  function DateTimePicker(selector, options) {
    var dtNode, tpNode;
    this.selector = selector;
    DateTimePicker.__super__.constructor.apply(this, arguments);
    this.options = hx.merge({
      datePickerOptions: {},
      timePickerOptions: {}
    });
    delete this.options.datePickerOptions.selectRange;
    hx.component.register(this.selector, this);
    this.suppressCallback = false;
    this.selection = hx.select(this.selector).classed('hx-date-time-picker', true);
    dtNode = this.selection.append('div').node();
    tpNode = this.selection.append('div').node();
    this.datePicker = new hx.DatePicker(dtNode, this.options.datePickerOptions);
    this.timePicker = new hx.TimePicker(tpNode, this.options.timePickerOptions);
    this.datePicker.pipe(this, 'date');
    this.timePicker.pipe(this, 'time');
    this.datePicker.on('change', 'hx.date-time-picker', (function(_this) {
      return function() {
        _this.timePicker.suppressed('change', true);
        _this.timePicker.date(new Date(_this.datePicker.date().getTime()), true);
        _this.timePicker.suppressed('change', false);
        return _this.emit('change', _this.date());
      };
    })(this));
    this.timePicker.on('change', 'hx.date-time-picker', (function(_this) {
      return function() {
        _this.datePicker.suppressed('change', true);
        _this.datePicker.date(new Date(_this.date().getTime()));
        _this.datePicker.suppressed('change', false);
        return _this.emit('change', _this.date());
      };
    })(this));
  }

  DateTimePicker.prototype.date = function(val, retainTime) {
    if (arguments.length > 0) {
      this.timePicker.date(val, retainTime);
      return this;
    } else {
      return this.timePicker.date();
    }
  };

  DateTimePicker.prototype.year = function(val) {
    if (arguments.length > 0) {
      this.datePicker.year(val);
      return this;
    } else {
      return this.datePicker.year();
    }
  };

  DateTimePicker.prototype.month = function(val) {
    if (arguments.length > 0) {
      this.datePicker.month(val);
      return this;
    } else {
      return this.datePicker.month();
    }
  };

  DateTimePicker.prototype.day = function(val) {
    if (arguments.length > 0) {
      this.datePicker.day(val);
      return this;
    } else {
      return this.datePicker.day();
    }
  };

  DateTimePicker.prototype.hour = function(val) {
    if (arguments.length > 0) {
      this.timePicker.hour(val);
      return this;
    } else {
      return this.timePicker.hour();
    }
  };

  DateTimePicker.prototype.minute = function(val) {
    if (arguments.length > 0) {
      this.timePicker.minute(val);
      return this;
    } else {
      return this.timePicker.minute();
    }
  };

  DateTimePicker.prototype.second = function(val) {
    if (arguments.length > 0) {
      this.timePicker.second(val);
      return this;
    } else {
      return this.timePicker.second();
    }
  };

  DateTimePicker.prototype.getScreenDate = function() {
    return this.datePicker.getScreenDate();
  };

  DateTimePicker.prototype.getScreenTime = function() {
    return this.timePicker.getScreenTime();
  };

  DateTimePicker.prototype.locale = function(locale) {
    if (arguments.length > 0) {
      this.timePicker.locale(locale);
      this.datePicker.locale(locale);
      return this;
    } else {
      return this.timePicker.locale();
    }
  };

  DateTimePicker.prototype.disable = function() {
    this.datePicker.disable();
    this.timePicker.disable();
    return this;
  };

  DateTimePicker.prototype.enable = function() {
    this.datePicker.enable();
    this.timePicker.enable();
    return this;
  };

  return DateTimePicker;

})(hx.EventEmitter);

hx.DateTimePicker = DateTimePicker;
})();
(function(){var horizontalLineIntersection, lineIntersection, pointRectangleIntersection, verticalLineIntersection;

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

var DrawingColor;

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

var DrawingObject;

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

var ColorProperty, DiscreteProperty, NumberProperty, StringProperty;

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
  function NumberProperty(value1) {
    this.value = value1;
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
  function StringProperty(value1) {
    this.value = value1;
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
  function DiscreteProperty(value1) {
    this.value = value1;
  }

  DiscreteProperty.prototype.set = function(value) {
    return this.value = value;
  };

  return DiscreteProperty;

})();

var Point;

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

var Camera,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Camera = (function(superClass) {
  var onClick, onLongPress, onMouseDown, onMouseMove, onMouseUp, onMouseWheel, onTouchEnd, onTouchMove, onTouchStart, onTranslate, setZoom;

  extend(Camera, superClass);

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
      if (e.deltaMode === 1) {
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

  function Camera(drawing) {
    var mouseControlState, mouseUpHandler, namespace, touchUpHandler;
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
    mouseUpHandler = (function(_this) {
      return function(e) {
        return onMouseUp.call(_this, e, mouseControlState);
      };
    })(this);
    touchUpHandler = (function(_this) {
      return function(e) {
        return onTouchEnd.call(_this, e, mouseControlState);
      };
    })(this);
    namespace = 'drawing-' + hx.randomId();
    hx.select(document).on('mouseup', namespace, mouseUpHandler);
    hx.select(document).on('touchend', namespace, touchUpHandler);
    hx.select(this.drawing.canvasNode).on('mousemove', 'hx.drawing', (function(_this) {
      return function(e) {
        return onMouseMove.call(_this, e, mouseControlState);
      };
    })(this));
    mouseControlState.selection.on('mousedown', 'hx.drawing', (function(_this) {
      return function(e) {
        return onMouseDown.call(_this, e, mouseControlState);
      };
    })(this));
    mouseControlState.selection.on('wheel', 'hx.drawing', (function(_this) {
      return function(e) {
        return onMouseWheel.call(_this, e, mouseControlState);
      };
    })(this));
    hx.select(this.drawing.canvasNode).on('touchstart', 'hx.drawing', (function(_this) {
      return function(e) {
        return onTouchStart.call(_this, e, mouseControlState);
      };
    })(this));
    mouseControlState.selection.on('touchmove', 'hx.drawing', (function(_this) {
      return function(e) {
        return onTouchMove.call(_this, e, mouseControlState);
      };
    })(this));
    mouseControlState.selection.on('touchcancel', 'hx.drawing', (function(_this) {
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
      return this.actualZoom = hx.tween(this.actualZoom, this.zoom, this.zoomSmoothingFactor);
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

var Drawing,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Drawing = (function(superClass) {
  var drawingLoop, resize;

  extend(Drawing, superClass);

  drawingLoop = function() {
    var run;
    run = false;
    hx.loop((function(_this) {
      return function() {
        var j, layer, len, ref;
        if (_this.stats) {
          _this.stats.start();
        }
        _this.camera.clearTransform(_this.ctx);
        _this.ctx.clearRect(0, 0, _this.width, _this.height);
        _this.camera.update();
        _this.camera.applyTransform(_this.ctx);
        ref = _this.layers;
        for (j = 0, len = ref.length; j < len; j++) {
          layer = ref[j];
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

  resize = function(container) {
    var containerHeight, containerWidth;
    containerWidth = container.clientWidth;
    containerHeight = container.clientHeight;
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

  function Drawing(selector, autoStart) {
    var container, node;
    if (autoStart == null) {
      autoStart = true;
    }
    Drawing.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    container = hx.select(selector);
    container.classed('hx-drawing', true);
    this.canvas = container.append('canvas');
    this.overlay = container.append('div')["class"]('hx-drawing-overlay');
    node = container.node();
    resize.call(this, node);
    container.on('resize', (function(_this) {
      return function() {
        return resize.call(_this, node);
      };
    })(this));
    this.canvasNode = this.canvas.node();
    this.ctx = this.canvasNode.getContext('2d');
    this.defaultLayer = new Layer(this);
    this.layers = [this.defaultLayer];
    this.camera = new Camera(this);
    this.camera.pipe(this);
    this.globalAlpha = 1;
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

  Drawing.prototype.findBy = function(ind) {
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

  Drawing.prototype.createLayer = function() {
    var layer;
    layer = new Layer(this);
    this.layers.push(layer);
    return layer;
  };

  Drawing.prototype.showLayer = function(layer) {
    var j, l, len, ref, results;
    ref = this.layers;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      l = ref[j];
      results.push(l.visible = l === layer);
    }
    return results;
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

  Drawing.prototype.enableSidebar = function(position, togglePos, populate) {
    if (arguments.length === 2) {
      populate = togglePos;
      togglePos = null;
    }
    this.sidebar = new Sidebar(this.overlay, position, togglePos, populate);
    this.showSidebar = (function(_this) {
      return function() {
        return _this.sidebar.show();
      };
    })(this);
    this.hideSidebar = (function(_this) {
      return function() {
        return _this.sidebar.hide();
      };
    })(this);
    return this.toggleSidebar = (function(_this) {
      return function() {
        return _this.sidebar.toggle();
      };
    })(this);
  };

  Drawing.prototype.create = function(objectType, id) {
    return this.defaultLayer.create(objectType, id);
  };

  Drawing.prototype["delete"] = function(obj) {
    var j, layer, len, ref, results;
    ref = this.layers;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
      results.push(layer["delete"](obj));
    }
    return results;
  };

  Drawing.prototype.deleteAll = function() {
    var j, layer, len, ref;
    ref = this.layers;
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
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

  Drawing.prototype.select = function(drawingObject, append) {
    var j, len, obj, ref;
    if (append == null) {
      append = false;
    }
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
    var j, len, obj, ref;
    ref = this.selectedObjects.values();
    for (j = 0, len = ref.length; j < len; j++) {
      obj = ref[j];
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

var Layer;

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
    var j, len, object, ref, results;
    if (this.alphaCurveFunction) {
      this.alpha = hx.clampUnit(this.alphaCurveFunction(this.drawing.camera.actualZoom));
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
    var j, len, object, ref;
    ref = this.objects;
    for (j = 0, len = ref.length; j < len; j++) {
      object = ref[j];
      if (object.id === id) {
        return object;
      }
    }
  };

  Layer.prototype.findBy = function(ind) {
    var j, len, object, ref;
    ref = this.objects;
    for (j = 0, len = ref.length; j < len; j++) {
      object = ref[j];
      if (ind(object)) {
        return object;
      }
    }
  };

  Layer.prototype.getBoundingBox = function() {
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

var Sidebar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Sidebar = (function(superClass) {
  extend(Sidebar, superClass);

  function Sidebar(container, pos, togglePos, populate) {
    if (pos == null) {
      pos = 'l';
    }
    Sidebar.__super__.constructor.apply(this, arguments);
    this.visible = false;
    this.selection = container.append('div')["class"]('hx-drawing-sidebar hx-drawing-sidebar-' + pos);
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
      this.toggleBtn = container.append('div')["class"]('hx-btn hx-drawing-sidebar-toggle').classed('hx-drawing-sidebar-toggle-' + togglePos[0], true).classed('hx-drawing-sidebar-toggle-' + togglePos[1], true).on('click', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this)).append('i')["class"]('fa fa-bars');
    }
    if (typeof populate === "function") {
      populate(this.selection.node());
    }
  }

  Sidebar.prototype.toggle = function() {
    if (this.visible) {
      return this.hide();
    } else {
      return this.show();
    }
  };

  Sidebar.prototype.show = function() {
    if (!this.visible) {
      this.visible = true;
      this.selection.morph()["with"](this.expandEvt, 100).and('fadein', 100).go(true);
    }
    return this;
  };

  Sidebar.prototype.hide = function() {
    if (this.visible) {
      this.visible = false;
      this.selection.morph()["with"]('fadeout', 100).and(this.collapseEvt, 100).go(true);
    }
    return this;
  };

  return Sidebar;

})(hx.EventEmitter);

var PerformanceGauge;

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

var Circle,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Circle = (function(superClass) {
  extend(Circle, superClass);

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

var Composite,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Composite = (function(superClass) {
  extend(Composite, superClass);

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

  Composite.prototype.getBoundingBox = function(ctx) {
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
      result[0] += this.position.x.value;
      result[1] += this.position.y.value;
      result[2] += this.position.x.value;
      result[3] += this.position.y.value;
      return result;
    }
  };

  return Composite;

})(DrawingObject);

var Grid,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Grid = (function(superClass) {
  extend(Grid, superClass);

  function Grid() {
    var _, colorPalette;
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
      var i, results;
      results = [];
      for (_ = i = 0; i <= 15; _ = i += 1) {
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

  Grid.prototype.render = function(ctx, drawing, cullOffsetX, cullOffsetY) {
    var cellColor, clip, cx, cy, endX, endY, gx, gy, i, j, k, l, px, py, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, rowColorMap, startX, startY, x, y;
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
        for (y = i = ref = startY, ref1 = endY; i <= ref1; y = i += 1) {
          rowColorMap = this.cells.states.value[y];
          for (x = j = ref2 = startX, ref3 = endX; j <= ref3; x = j += 1) {
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
        for (x = k = ref4 = startX, ref5 = endX + 1; k <= ref5; x = k += 1) {
          ctx.moveTo(px + x * cx + 0.5, py + 0.5);
          ctx.lineTo(px + x * cx + 0.5, py + cy * gy + 0.5);
        }
        for (y = l = ref6 = startY, ref7 = endY + 1; l <= ref7; y = l += 1) {
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

var Line,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Line = (function(superClass) {
  extend(Line, superClass);

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

var Rectangle,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Rectangle = (function(superClass) {
  extend(Rectangle, superClass);

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

var Shape,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Shape = (function(superClass) {
  extend(Shape, superClass);

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

  Shape.prototype.getBoundingBox = function() {
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

})(DrawingObject);

var Text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Text = (function(superClass) {
  extend(Text, superClass);

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
(function(){var Table, TableFeed, TableFeedModifiers,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TableFeed = (function(superClass) {
  var cloneData;

  extend(TableFeed, superClass);

  function TableFeed(source, modifiers, extra1) {
    var self;
    this.modifiers = modifiers;
    this.extra = extra1;
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
    this.modifiers.on('sort-change', 'hx.extended-table', (function(_this) {
      return function(e) {
        _this.sortedData = void 0;
        return _this.emit('sort-change', e);
      };
    })(this));
    this.modifiers.on('filter-change', 'hx.extended-table', (function(_this) {
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
          var allFilters, cellLookup, column, columnIndex, filterDataOnType, getColumnIndex, hasFilters, head, j, len, preparedFilters, ref, ref1, results, rows, terms, type;
          rows = data.body;
          head = data.head;
          getColumnIndex = function(name) {
            var column, i, j, len, lowerCaseName, ref;
            lowerCaseName = name.toLowerCase();
            ref = head.columns;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              column = ref[i];
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
            ref = _this.modifiers.filters[column];
            for (type in ref) {
              terms = ref[type];
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
              var col, filter, j, l, len, len1, options, ref1, ref2, term;
              ref1 = preparedFilters[type];
              for (j = 0, len = ref1.length; j < len; j++) {
                filter = ref1[j];
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
                  ref2 = filter.terms;
                  for (l = 0, len1 = ref2.length; l < len1; l++) {
                    term = ref2[l];
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
            results = [];
            for (j = 0, len = allFilters.length; j < len; j++) {
              type = allFilters[j];
              if (((ref1 = preparedFilters[type]) != null ? ref1.length : void 0) > 0) {
                results.push(_this.filteredData = filterDataOnType(_this.filteredData, type));
              } else {
                results.push(void 0);
              }
            }
            return results;
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
              compare = _this.modifiers.columnCompare[column] || _this.modifiers.defaultCompare;
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
      var column, i, j, len, lowerCaseName, ref;
      lowerCaseName = name.toLowerCase();
      ref = head.columns;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        column = ref[i];
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

TableFeedModifiers = (function(superClass) {
  var fixSortMode;

  extend(TableFeedModifiers, superClass);

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
    this.columnCompare = {};
    this.defaultCompare = void 0;
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
    var base, changed, oldFilter;
    if (type == null) {
      type = 'contains';
    }
    if (column !== void 0) {
      if ((base = this.filters)[column] == null) {
        base[column] = {};
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
    var filt, j, len, ref, ref1;
    if (type == null) {
      type = 'contains';
    }
    ref = filter.split(' ');
    for (j = 0, len = ref.length; j < len; j++) {
      filt = ref[j];
      if (((ref1 = this.filters[column]) != null ? ref1[type] : void 0) !== void 0) {
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
    var filterFilters, filterType, k, ref, ref1, ref2, ref3, v;
    filterFilters = function(val) {
      var filt, j, len, newFilter, ref;
      newFilter = val.split(' ').map(function(d) {
        return d.toLowerCase();
      });
      ref = filter.split(' ').map(function(d) {
        return d.toLowerCase();
      });
      for (j = 0, len = ref.length; j < len; j++) {
        filt = ref[j];
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
        ref = this.filters[k];
        for (filterType in ref) {
          v = ref[filterType];
          this.filter(k, void 0, filterType, cb);
        }
      }
    } else if (arguments.length === 2 || type !== void 0) {
      if (type == null) {
        type = 'contains';
      }
      if (column === void 0) {
        ref1 = this.filters;
        for (k in ref1) {
          v = ref1[k];
          this.filter(k, filterFilters(v[type]), type, cb);
        }
      } else if (this.filters[column] !== void 0 && this.filters[column][type]) {
        this.filter(column, filterFilters(this.filters[column][type]), type, cb);
      }
    } else {
      if (column === void 0) {
        for (k in this.filters) {
          ref2 = this.filters[k];
          for (type in ref2) {
            v = ref2[type];
            this.filter(k, filterFilters(v), type, cb);
          }
        }
      } else if (this.filters[column] !== void 0) {
        ref3 = this.filters[column];
        for (type in ref3) {
          v = ref3[type];
          this.filter(column, filterFilters(v), type, cb);
        }
      }
    }
    return this;
  };

  return TableFeedModifiers;

})(hx.EventEmitter);

Table = (function(superClass) {
  var appendFilterDropdown, lowerCaseKeys, render, updateIcons, updateSelectedText;

  extend(Table, superClass);

  lowerCaseKeys = function(obj) {
    var k, res, v;
    res = {};
    for (k in obj) {
      if (!hasProp.call(obj, k)) continue;
      v = obj[k];
      res[k.toLowerCase()] = v;
    }
    return res;
  };

  function Table(selector, options) {
    var _, pageSelectNode, rowSelectNode;
    if (options == null) {
      options = {};
    }
    Table.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    this.options = hx.merge.defined({
      rowsPerPage: 100,
      userSelectRowsPerPage: false,
      showSorts: true,
      showFilters: true,
      showSelection: false,
      rowSelectable: true,
      singleSelectionMode: false,
      rowSelectableLookup: function(d, cb) {
        return cb(true);
      },
      cellRenderers: {},
      alwaysMobile: false,
      useResponsive: true,
      allowHeaderWrap: false,
      noDataMessage: 'No Data',
      defaultCellValueLookup: void 0,
      defaultCellFilterValueLookup: void 0,
      defaultCellSortValueLookup: void 0,
      cellValueLookup: {},
      cellFilterLookup: {},
      cellSortValueLookup: {},
      defaultCompare: hx.sort.localeCompare(),
      columnCompare: {},
      enabledFilters: ['exact', 'startsWith', 'less', 'greater', 'excludes']
    }, options);
    _ = this._ = {
      selectedRows: []
    };
    if (isNaN(this.options.rowsPerPage)) {
      this.options.rowsPerPage = 100;
    }
    this.options.rowsPerPage = Math.max(this.options.rowsPerPage, 1);
    _.container = hx.select(selector).classed("hx-table-widget hx-layout hx-group hx-vertical", true);
    _.tableWrapper = _.container.append('div')["class"]('hx-section hx-table-wrapper hx-no-margin');
    _.tableMessage = _.container.append('div')["class"]('hx-section hx-table-message');
    _.rowCountMessage = hx.select(document.createElement('div'));
    _.rowCountMessage.append('span');
    _.rowCountMessage.append('a').text('(clear selection)').on('click', 'hx.extended-table', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.clearSelection();
      };
    })(this));
    _.controlContainer = _.container.append('div')["class"]('hx-group hx-horizontal hx-table-control-container');
    _.rowsPerPageContainer = _.controlContainer.append('div')["class"]('hx-table-control-rows');
    _.controlContainer.append('div')["class"]('hx-section hx-no-margin');
    _.pageSelectContainer = _.controlContainer.append('div')["class"]('hx-table-control-page');
    _.rowsPerPageContainer.append('div').text('Rows per page: ');
    _.initialRowsPerPage = this.options.rowsPerPage;
    rowSelectNode = _.rowsPerPageContainer.append('button')["class"]('hx-btn hx-btn-invisible').node();
    _.rowsPerPageSelect = new hx.Picker(rowSelectNode, {
      ddClass: 'hx-table-row-select-dropdown'
    });
    _.rowsPerPageSelect.items([10, 25, 50, 100, 150, 200, 250, 500, 1000]);
    _.rowsPerPageSelect.on('change', 'hx.extended-table', (function(_this) {
      return function(data) {
        _this.options.rowsPerPage = data;
        _.currentPage = 1;
        _.pageSelect.value(1);
        return render(_this);
      };
    })(this));
    pageSelectNode = _.pageSelectContainer.append('button')["class"]('hx-btn hx-btn-invisible').node();
    _.pageSelect = new hx.Picker(pageSelectNode, {
      ddClass: 'hx-table-page-select-dropdown'
    });
    _.pageSelect.renderer(function(e, d) {
      return hx.select(e).text(d.text).node();
    });
    _.pageSelect.on('change', 'hx.extended-table', (function(_this) {
      return function(d) {
        _.currentPage = d.value;
        return render(_this);
      };
    })(this));
    _.pageSelectTotalRows = _.pageSelectContainer.append('span');
    _.pageSelectBack = _.pageSelectContainer.append('button')["class"]('hx-btn hx-btn-invisible');
    _.pageSelectBack.append('i')["class"]('fa fa-chevron-left');
    _.pageSelectBack.on('click', 'hx.extended-table', (function(_this) {
      return function() {
        var oldPage;
        oldPage = _.currentPage;
        _.currentPage -= 1;
        _.currentPage = Math.max(1, _.currentPage);
        if (oldPage !== _.currentPage) {
          return render(_this);
        }
      };
    })(this));
    _.pageSelectForward = _.pageSelectContainer.append('button')["class"]('hx-btn hx-btn-invisible');
    _.pageSelectForward.append('i')["class"]('fa fa-chevron-right');
    _.pageSelectForward.on('click', 'hx.extended-table', (function(_this) {
      return function() {
        var oldPage;
        oldPage = _.currentPage;
        _.currentPage += 1;
        if (_.numPages !== -1) {
          _.currentPage = Math.min(_.currentPage, _.numPages);
        }
        if (oldPage !== _.currentPage) {
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
    _.modifiers.defaultCompare = this.options.defaultCompare;
    _.modifiers.columnCompare = this.options.columnCompare;
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
        _.pageSelect.value(1);
        return _this.emit('sort-change', e);
      };
    })(this);
    _.filterChange = (function(_this) {
      return function(e) {
        _.pageSelect.value(1);
        _this.clearSelection();
        return _this.emit('filter-change', e);
      };
    })(this);
  }

  Table.prototype.setData = function(source, extra, clearSorts, clearFilters, cb) {
    var _, ref;
    _ = this._;
    if ((ref = _.feed) != null) {
      ref.off();
    }
    _.modifiers.off();
    if (clearSorts) {
      _.modifiers.sort();
    }
    if (clearFilters) {
      _.modifiers.removeFilter();
    }
    _.feed = new TableFeed(source, _.modifiers, extra);
    _.feed.on('change', 'hx.extended-table', function(d) {
      return _.feedChange(d.callback);
    });
    _.feed.on('sort-change', 'hx.extended-table', _.sortChange);
    _.feed.on('filter-change', 'hx.extended-table', _.filterChange);
    _.newSource = true;
    _.selectedRows = [];
    _.currentPage = 1;
    _.rowsPerPageSelect.value(this.options.rowsPerPage);
    _.pageSelect.value(1);
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

  Table.prototype.page = function(page, cb) {
    this._.currentPage = hx.clamp(1, this._.numPages || page, page);
    return this.render(cb);
  };

  Table.prototype.restoreSelected = function(array) {
    var j, k, len;
    this.clearSelection();
    for (j = 0, len = array.length; j < len; j++) {
      k = array[j];
      this._.selectedRows[k.index] = k.data;
    }
    return render(this);
  };

  Table.prototype.getSelected = function() {
    var j, k, len, ref, results, v;
    ref = this._.selectedRows;
    results = [];
    for (v = j = 0, len = ref.length; j < len; v = ++j) {
      k = ref[v];
      if (k) {
        results.push({
          index: v,
          data: k
        });
      }
    }
    return results;
  };

  Table.prototype.clearSelection = function() {
    var _;
    _ = this._;
    _.tableWrapper.selectAll('.hx-table-row-selected').classed('hx-table-row-selected', false);
    _.selectedRows = _.selectedRows.map(function(d) {
      return false;
    });
    updateSelectedText(this);
    return this.emit('clearselection');
  };

  updateIcons = function(selection, direction) {
    return selection.classed('fa-sort-asc', direction === true).classed('fa-sort-desc', direction === false).classed('fa-unsorted', direction === void 0);
  };

  updateSelectedText = function(table) {
    var _, end, i, j, pageSelected, ref, ref1, s, start, total;
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
    for (i = j = ref = start, ref1 = end; j <= ref1; i = j += 1) {
      if (_.selectedRows[i]) {
        pageSelected++;
      }
    }
    return _.tableWrapper.selectAll('thead').select('.hx-table-header-row').classed('hx-table-row-selected', pageSelected > 0);
  };

  appendFilterDropdown = function(targetElement, clickElement, lowerCaseName, table) {
    var _, direction, dropdown, input, inputBox, oldValue, populateDropdown;
    _ = table._;
    input = {};
    inputBox = {};
    oldValue = {};
    populateDropdown = function(element) {
      var appendFilterInput, dd, filterDD, filterType, j, len, moreFilters, moreFiltersLink, moreFiltersVis, moreVisible, oldFilterObj, ref, ref1, results;
      dd = this;
      filterDD = hx.select(element).classed('hx-table-filter-dropdown', true);
      appendFilterInput = function(elem, type) {
        var clearBtn, filterPlaceholder, ref, timeout, typeStr, updateFilter;
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
        input[type] = inputBox[type].append('input').attr('placeholder', filterPlaceholder).value(oldValue[type] || ((ref = _.modifiers.filters[lowerCaseName]) != null ? ref[type] : void 0) || '');
        if (type === 'regex') {
          input[type].on('input', 'hx.extended-table', (function(_this) {
            return function() {
              clearTimeout(timeout);
              return timeout = setTimeout(function() {
                var e, error1, filterRegex, inputVal;
                inputVal = input[type].value();
                input[type].style('border-color', '');
                if (inputVal.length > 0) {
                  try {
                    filterRegex = new RegExp(inputVal);
                  } catch (error1) {
                    e = error1;
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
          input[type].on('input', 'hx.extended-table', function(e) {
            clearTimeout(timeout);
            return timeout = setTimeout(function() {
              return updateFilter(input[type].value());
            }, 200);
          }).on('keydown', 'hx.extended-table', function(e) {
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
        clearBtn = inputBox[type].append('button').attr('type', 'button')["class"]('hx-btn hx-negative');
        clearBtn.append('i')["class"]('fa fa-times');
        return clearBtn.on('click', 'hx.extended-table', function() {
          input[type].value('');
          updateFilter('');
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
            moreFilters.morph()["with"]((vis ? 'expandv' : 'collapsev'), 150).go();
          }
          return moreVisible = vis;
        };
        moreFiltersLink = filterDD.append('div')["class"]('hx-table-more-filters-link').append('a');
        moreFilters = filterDD.append('div')["class"]('hx-table-more-filters');
        moreFiltersVis(false, true);
        moreFiltersLink.on('click', 'hx.extended-table', function() {
          return moreFiltersVis(moreFilters.style('display') === 'none');
        });
        oldFilterObj = _.modifiers.filters[lowerCaseName];
        ref = table.options.enabledFilters;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          filterType = ref[j];
          if (filterType !== 'contains') {
            if (((ref1 = oldValue[filterType]) != null ? ref1.length : void 0) > 0 && moreVisible === false) {
              moreFiltersVis(true, true);
            }
            results.push(appendFilterInput(moreFilters, filterType));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    };
    direction = _.useMobileView ? 'lblt' : 'rbrt';
    dropdown = new hx.Dropdown(targetElement, populateDropdown, {
      align: direction,
      spacing: 0
    });
    dropdown.on('show', 'hx.extended-table', function() {
      _.filterDropdown = dropdown;
      return input['contains'].node().focus();
    });
    hx.select(targetElement).off('click', 'hx.dropdown');
    return hx.select(clickElement).on('click', 'hx.extended-table', function(e) {
      e.stopPropagation();
      return dropdown.toggle();
    });
  };

  render = function(table, callback) {
    var _, displayLoading, filterEnabled, fixTableSize, getDataForPage, getHeaderData, getRowCount, headerCellEnter, maybeDestroyTable, renderDesktopPage, renderHeader, renderMobilePage, renderReponsivePage, renderResponsiveHeader, renderStickyHeader, rowCollapsibleEnabled, rowSelectCellEnter, rowSelectionEnabled, rowTickSelectionEnabled, selectMultiRows, selectRow, singleSelectionMode, sortEnabled, tidyUp, updateControls;
    _ = table._;
    _.modifiers.defaultCellValueLookup = table.options.defaultCellValueLookup;
    _.modifiers.defaultCellFilterValueLookup = table.options.defaultCellFilterValueLookup;
    _.modifiers.defaultCellSortValueLookup = table.options.defaultCellSortValueLookup;
    _.modifiers.cellValueLookup = lowerCaseKeys(table.options.cellValueLookup);
    _.modifiers.cellFilterValueLookup = lowerCaseKeys(table.options.cellFilterValueLookup);
    _.modifiers.cellSortValueLookup = lowerCaseKeys(table.options.cellSortValueLookup);
    _.modifiers.defaultCompare = table.options.defaultCompare;
    _.modifiers.columnCompare = table.options.columnCompare;
    _.lastRowSelected;
    _.shiftWasDown = false;
    rowTickSelectionEnabled = table.options.showSelection;
    rowCollapsibleEnabled = table.options.collapsibleRow != null;
    rowSelectionEnabled = table.options.rowSelectable && rowTickSelectionEnabled && !rowCollapsibleEnabled;
    sortEnabled = table.options.showSorts;
    filterEnabled = table.options.showFilters;
    singleSelectionMode = table.options.singleSelectionMode;
    if (table.options.alwaysMobile) {
      _.useMobileView = true;
    } else if (table.options.useResponsive) {
      _.useMobileView = _.container.width() < 480;
      _.currentView = _.useMobileView;
      if (!_.responsiveListenerAdded) {
        _.responsiveListenerAdded = true;
        _.container.on('resize', 'hx.extended-table.responsive', (function(_this) {
          return function() {
            if ((_.container.width() > 0) && (_.currentView !== (_.container.width() < 480))) {
              _.newSource = true;
              return table.render();
            }
          };
        })(this));
      }
    } else {
      _.useMobileView = false;
    }
    _.container.on('resize', 'hx.extended-table.header', function() {
      return fixTableSize(function() {});
    });
    displayLoading = function(next) {
      _.container.classed('hx-table-loading', true);
      return setTimeout(next, 0);
    };
    getHeaderData = function(next) {
      var cancelled;
      if (typeof _.getHeaderCbCanceller === "function") {
        _.getHeaderCbCanceller();
      }
      cancelled = false;
      _.getHeaderCbCanceller = (function(_this) {
        return function() {
          return cancelled = true;
        };
      })(this);
      return _.feed.getHeader((function(_this) {
        return function(header) {
          if (!cancelled) {
            _.getHeaderCbCanceller = void 0;
            _.header = header;
            return next();
          }
        };
      })(this));
    };
    getRowCount = function(next) {
      var cancelled;
      if (typeof _.getRowCountCbCanceller === "function") {
        _.getRowCountCbCanceller();
      }
      cancelled = false;
      _.getRowCountCbCanceller = (function(_this) {
        return function() {
          return cancelled = true;
        };
      })(this);
      return _.feed.getRowCount(function(count) {
        if (!cancelled) {
          _.getRowCountCbCanceller = void 0;
          _.rowCount = count;
          if (count === 0) {
            rowTickSelectionEnabled = false;
            rowCollapsibleEnabled = false;
            rowSelectionEnabled = false;
            sortEnabled = false;
            filterEnabled = false;
          }
          return next();
        }
      });
    };
    updateControls = function(next) {
      var i, items, j, num, numText, pageRows, ref, rowsArray;
      rowsArray = table._.rowsPerPageSelect.items();
      if (rowsArray.indexOf(table.options.rowsPerPage) === -1) {
        rowsArray.push(table.options.rowsPerPage);
        rowsArray = rowsArray.sort(function(a, b) {
          return a - b;
        });
      }
      table._.rowsPerPageSelect.items(rowsArray);
      table._.rowsPerPageSelect.value(table.options.rowsPerPage);
      _.pageSelectContainer.classed('hx-no-rows', _.processedSize == null);
      _.numPages = -1;
      numText = '';
      if (_.processedSize > 0) {
        numText = 'of ' + _.processedSize;
        items = [];
        _.numPages = Math.ceil(_.processedSize / table.options.rowsPerPage);
        for (i = j = 1, ref = _.numPages; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
          num = i * table.options.rowsPerPage;
          items.push({
            text: (num + 1 - table.options.rowsPerPage) + ' - ' + Math.min(num, _.processedSize),
            value: i
          });
        }
        table._.pageSelect.items(items);
        table._.pageSelect.value(_.currentPage || 1);
      } else {
        pageRows = _.currentPage * table.options.rowsPerPage;
        numText = (pageRows + 1 - table.options.rowsPerPage) + ' - ' + pageRows;
      }
      _.pageSelectTotalRows.text(numText);
      _.pageSelectBack.classed('hx-table-btn-disabled', _.currentPage === 1);
      _.pageSelectForward.classed('hx-table-btn-disabled', _.currentPage === _.numPages);
      _.controlContainer.classed('hx-table-control-display-rows', table.options.userSelectRowsPerPage && (_.processedSize > 0 || (_.processedSize == null)));
      _.controlContainer.classed('hx-table-control-display-page', _.currentPage > 1 || _.numPages > 1 || (_.numPages === -1 && _.rows.length > 0));
      return next();
    };
    getDataForPage = function(next) {
      var cancelled, page, rowsPerPage;
      if (typeof _.getRowsCbCanceller === "function") {
        _.getRowsCbCanceller();
      }
      cancelled = false;
      _.getRowsCbCanceller = (function(_this) {
        return function() {
          return cancelled = true;
        };
      })(this);
      page = (_.currentPage - 1) || 0;
      rowsPerPage = table.options.rowsPerPage;
      return _.feed.getRows(page * rowsPerPage, (page + 1) * rowsPerPage, function(rows, processedSize) {
        if (!cancelled) {
          _.getRowsCbCanceller = void 0;
          _.rows = rows;
          _.processedSize = processedSize;
          return next();
        }
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
      var cell, container;
      if (!singleSelectionMode && i === 0 && rowTickSelectionEnabled) {
        return rowSelectCellEnter(this);
      } else if (i > 0 && rowTickSelectionEnabled || !rowTickSelectionEnabled) {
        cell = this.append('th');
        container = cell.append('div');
        container.append('span')["class"]('hx-table-header-name');
        container.append('i')["class"]('hx-table-sort-icon fa fa-unsorted');
        container.append('i')["class"]('hx-table-filter-icon fa fa-search');
        return cell.node();
      } else {
        return this.append('th').node();
      }
    };
    renderHeader = function(next) {
      var colHeaderDepth, colHeaderDepthArr, headRowsData, headerData, headerGroupUpdate, headerUpdate, j, reducedHeadRowsData, results;
      headerUpdate = function(d, e, i) {
        if (i !== 0 && rowTickSelectionEnabled || !rowTickSelectionEnabled) {
          this.select('.hx-table-header-name').text(d.value);
          this.classed('hx-table-header-allow-wrap', d.allowWrap != null ? d.allowWrap : table.options.allowHeaderWrap);
          if (d.value === _.modifiers.sortColumn) {
            updateIcons(this.select('.hx-table-sort-icon'), _.modifiers.sortDirection);
          }
          this.classed('hx-table-header-sort', sortEnabled);
          return this.classed('hx-table-header-filter', filterEnabled);
        }
      };
      headerGroupUpdate = function(row, rowElem, rowIndex, max, array) {
        if (rowTickSelectionEnabled) {
          row.unshift(void 0);
        }
        hx.select(rowElem).view('th', 'th').update(function(cell, e, i) {
          var text;
          this.select('.hx-table-header-grouped-cell').remove();
          if (cell != null) {
            text = cell[1] ? cell[1] : rowIndex === 0 ? cell[0] : void 0;
            this.attr('colspan', cell[2]);
            if ((text != null) && text.length > 0) {
              this.append('div')["class"]('hx-table-header-grouped-cell').text(text);
            }
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
          var ref;
          return ((d != null ? (ref = d.groups) != null ? ref.length : void 0 : void 0) || 0) * 1;
        });
        colHeaderDepth = hx.max(colHeaderDepthArr);
        headRowsData = (function() {
          results = [];
          for (var j = 0; 0 <= colHeaderDepth ? j < colHeaderDepth : j > colHeaderDepth; 0 <= colHeaderDepth ? j++ : j--){ results.push(j); }
          return results;
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
          var ref, ref1;
          return d.reduce(function(a, b) {
            if (b[0] === a[a.length - 1][0]) {
              a[a.length - 1][2] += 1;
              return a;
            } else {
              return a.concat([[b[0], b[1], 1]]);
            }
          }, [[(ref = d[0]) != null ? ref[0] : void 0, (ref1 = d[0]) != null ? ref1[1] : void 0, 0]]);
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
        var element, node;
        element = headerCellEnter.call(this, d, i);
        if (!singleSelectionMode && i === 0 && rowTickSelectionEnabled) {
          hx.select(element).on('click', 'hx.extended-table', function(evt) {
            var rowClassed, rowSelection;
            evt.stopPropagation();
            rowSelection = hx.select(element.parentNode);
            rowClassed = rowSelection.classed('hx-table-row-selected');
            table._.lastRowSelected = void 0;
            selectMultiRows(0, table._.rows.length - 1, !rowClassed);
            return updateSelectedText(table);
          });
        } else if (filterEnabled && i > 0 && rowTickSelectionEnabled || !rowTickSelectionEnabled) {
          node = hx.select(element).select('.hx-table-filter-icon').node();
          if (node != null) {
            appendFilterDropdown(element, node, d.value.toLowerCase(), table);
          }
        }
        return element;
      };
      stickyHeaderUpdate = function(d, e, i) {
        var sortFn;
        if (!(i === 0 && rowTickSelectionEnabled) || !rowTickSelectionEnabled) {
          this.select('.hx-table-header-name').text(d.value);
          this.classed('hx-table-header-allow-wrap', d.allowWrap != null ? d.allowWrap : table.options.allowHeaderWrap);
          if (d.value === _.modifiers.sortColumn) {
            updateIcons(this.select('.hx-table-sort-icon'), _.modifiers.sortDirection);
          }
          this.classed('hx-table-header-sort', sortEnabled);
          this.classed('hx-table-header-filter', filterEnabled);
        }
        sortFn = function(e) {
          if (sortEnabled) {
            e.stopPropagation();
            return _.modifiers.sort(d.value);
          }
        };
        this.select('.hx-table-header-name').on('click', 'hx.extended-table', sortFn);
        return this.select('.hx-table-sort-icon').on('click', 'hx.extended-table', sortFn);
      };
      stickyHeader = _.tableWrapper.select('.hx-table-header-sticky');
      stickyHeader.style('top', (_.tableWrapper.node().scrollTop) + 'px');
      headerData = rowTickSelectionEnabled ? [void 0].concat(_.header.columns) : _.header.columns;
      stickyHeader.select('thead').select('.hx-table-header-row').view('th').enter(stickyHeaderEnter).update(stickyHeaderUpdate).apply(headerData);
      stickyHeader.selectAll('.hx-table-header-group-row').remove();
      groupHead = _.tableWrapper.selectAll('.hx-table-header-group-row');
      if (!groupHead.empty()) {
        groupHead.forEach(function(selection) {
          return stickyHeader.select('.hx-table-header-row').insertBefore(selection.node().cloneNode(true));
        });
      }
      _.tableWrapper.on('scroll', 'hx.extended-table', function(e) {
        return stickyHeader.style('top', (_.tableWrapper.node().scrollTop) + 'px');
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
      if (!singleSelectionMode && shiftDown && (_.lastRowSelected != null)) {
        _.shiftWasDown = true;
        selectMultiRows(_.lastRowSelected, screenRowIndex);
        _.lastRowSelected = screenRowIndex;
      } else {
        if (singleSelectionMode && _.lastRowSelected !== screenRowIndex) {
          table.clearSelection();
        }
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
            if (table.has("rowselect")) {
              table.emit("rowselect", {
                rowData: rowData,
                selected: !rowClassed
              });
            }
          } else {
            if (!rowData.unselectable) {
              table.options.rowSelectableLookup(rowData, function(canSelect) {
                if (canSelect) {
                  _.selectedRows[rowIndex] = rowData;
                  if (table.has("rowselect")) {
                    table.emit("rowselect", {
                      rowData: rowData,
                      selected: !rowClassed
                    });
                  }
                  rowSelection.classed('hx-table-row-selected', !rowClassed);
                  if (!dontUpdateText && !singleSelectionMode) {
                    return updateSelectedText(table);
                  }
                }
              });
            }
            return;
          }
        } else {
          _.selectedRows[rowIndex] = void 0;
        }
        rowSelection.classed("hx-table-row-selected", !rowClassed);
      }
      if (!dontUpdateText && !singleSelectionMode) {
        updateSelectedText(table);
      }
      return void 0;
    };
    selectMultiRows = function(startScreenRow, endScreenRow, force) {
      var array, i, j, l, lastSelected, len, ref, ref1, rowIndex, rowSelections, selectionFilter, z;
      lastSelected = endScreenRow;
      if (startScreenRow > endScreenRow) {
        endScreenRow = startScreenRow;
        startScreenRow = lastSelected;
        lastSelected = endScreenRow;
      }
      selectionFilter = function(e) {
        return !hx.select(e).classed('hx-table-collapsible-content-row-hidden') && !hx.select(e).classed('hx-table-collapsible-content-row');
      };
      rowSelections = _.tableWrapper.select('tbody').selectAll('tr').nodes.filter(selectionFilter).map(hx.select);
      array = [];
      for (i = j = ref = startScreenRow, ref1 = endScreenRow; j <= ref1; i = j += 1) {
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
      for (l = 0, len = array.length; l < len; l++) {
        z = array[l];
        if (z.index !== _.lastRowSelected || _.shiftWasDown) {
          selectRow(z.row, z.index, z.index - _.startRowIndex, false, force, true);
        }
      }
      updateSelectedText(table);
      return void 0;
    };
    renderDesktopPage = function(next) {
      var body, cellEnter, cellRenderer, defaultCellRenderer, k, lowerCaseCellRenderers, ref, renderer, rowRenderer, rowSelectCellUpdate, t, v;
      defaultCellRenderer = table.options.defaultCellRenderer || function(d, e, i) {
        return this.text(d);
      };
      rowSelectCellUpdate = function(d, element, i, screenRowIndex, rowData) {
        var rowIndex, rowSelection;
        rowIndex = _.startRowIndex + screenRowIndex;
        rowSelection = hx.select(element.parentNode);
        rowSelection.classed('hx-table-row-selected', !!_.selectedRows[rowIndex]);
        return this.on("click", function(e) {
          e.stopPropagation();
          if (!rowData.unselectable) {
            return table.options.rowSelectableLookup(rowData, function(canSelect) {
              if (canSelect) {
                return selectRow(rowSelection, rowIndex, screenRowIndex, e.shiftKey);
              }
            });
          }
        });
      };
      lowerCaseCellRenderers = {};
      ref = table.options.cellRenderers;
      for (k in ref) {
        v = ref[k];
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
      cellRenderer = function(d, e, i, screenRowIndex, rowData) {
        return renderer[i].call(this, d, e, i, screenRowIndex, rowData);
      };
      rowRenderer = function(d, rowElement, i) {
        var buildCollapsible, collapsibleContent, isLastRow, rowArray, rowData, screenRowIndex, toggleCollapsible;
        screenRowIndex = i;
        _.startRowIndex = (_.currentPage - 1) * table.options.rowsPerPage;
        rowArray = d.columns ? d.columns : d;
        rowData = rowTickSelectionEnabled ? [void 0].concat(rowArray) : rowArray;
        this.view('.hx-table-cell').enter(cellEnter).update(function(cellData, e, i) {
          return cellRenderer.call(this, cellData, e, i, screenRowIndex, d);
        }).apply(rowData);
        this.on('click', 'rowclick', (function(_this) {
          return function() {
            return table.emit('rowclick', {
              data: d,
              node: _this.node()
            });
          };
        })(this));
        this.classed('hx-table-row-unselectable', rowSelectionEnabled && d.unselectable);
        this.classed('hx-table-row-collapsible', rowCollapsibleEnabled);
        if (rowSelectionEnabled) {
          this.on('click', (function(_this) {
            return function(e) {
              e.stopPropagation();
              if (!d.unselectable) {
                return table.options.rowSelectableLookup(d, function(canSelect) {
                  if (canSelect) {
                    return selectRow(_this, _.startRowIndex + i, screenRowIndex, e.shiftKey);
                  }
                });
              }
            };
          })(this));
        }
        if (rowCollapsibleEnabled) {
          isLastRow = false;
          buildCollapsible = function(node) {
            var contentDiv, contentRow, hiddenRow, nextSibling, selParent;
            contentRow = hx.select(document.createElement('tr')).classed('hx-table-collapsible-content-row', true);
            hiddenRow = hx.select(document.createElement('tr')).classed('hx-table-collapsible-content-row-hidden', true);
            contentDiv = contentRow.append('td').attr('colspan', '99').style('padding', '10px').append('div').classed('hx-table-collapsible-content', true);
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
          toggleCollapsible = function() {
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
                collapsibleContent = buildCollapsible(_this.node());
              }
              toggleCollapsible();
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
      _.tableWrapper.selectAll('.hx-table-collapsible-content-row').remove();
      _.tableWrapper.selectAll('.hx-table-collapsible-content-row-hidden').remove();
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
        var container, filterIcon, selection, th;
        selection = this.append('tr')["class"]('hx-table-responsive-row');
        if (i === 0) {
          selection.classed('hx-table-responsive-row-first', true);
        }
        th = selection.append('th');
        container = th.append('div');
        filterIcon = container.append('i')["class"]('hx-table-filter-icon fa fa-search').node();
        appendFilterDropdown(filterIcon, filterIcon, d[0].toLowerCase(), table);
        container.append('i')["class"]('hx-table-sort-icon fa');
        container.append('span')["class"]('hx-table-header-name');
        selection.append('td');
        return selection.node();
      };
      responsiveCellUpdate = function(d, e, i, screenRowIndex) {
        var allowWrap, sortDirection, sortFn, td, th;
        td = this.select('td');
        td.attr('rowspan', '');
        td.style('display', '');
        cellRenderer.call(td, d[1], td.node(), i, screenRowIndex);
        th = this.select('th');
        this.select('.hx-table-header-name').text(d[0]);
        allowWrap = _.header.columns[i].allowWrap;
        th.classed('hx-table-header-allow-wrap', allowWrap != null ? allowWrap : table.options.allowHeaderWrap);
        th.classed('hx-table-header-sort', sortEnabled && screenRowIndex === 0);
        th.classed('hx-table-header-filter', filterEnabled && screenRowIndex === 0);
        sortFn = function(e) {
          if (sortEnabled) {
            e.stopPropagation();
            return _.modifiers.sort(d[0]);
          }
        };
        th.select('.hx-table-header-name').on('click', 'hx.extended-table', sortFn);
        th.select('.hx-table-sort-icon').on('click', 'hx.extended-table', sortFn);
        sortDirection = _.modifiers.sortColumn === d[0] ? _.modifiers.sortDirection : void 0;
        return updateIcons(this.select('.hx-table-sort-icon'), sortDirection);
      };
      responsiveNoDataUpdate = function(d, e, i, screenRowIndex) {
        var allowWrap, sortDirection, td, th;
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
        allowWrap = _.header.columns[i].allowWrap;
        th.classed('hx-table-header-allow-wrap', allowWrap != null ? allowWrap : table.options.allowHeaderWrap);
        th.classed('hx-table-header-sort', sortEnabled && screenRowIndex === 0);
        th.classed('hx-table-header-filter', filterEnabled && screenRowIndex === 0);
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
        var buildCollapsible, collapsibleContent, data, headerNames, rowSelect, screenRowIndex, toggleCollapsible;
        headerNames = _.header.columns.map(function(d) {
          return d.value;
        });
        screenRowIndex = i;
        _.startRowIndex = (_.currentPage - 1) * table.options.rowsPerPage;
        data = (d != null ? d.columns : void 0) ? d.columns : d;
        this.classed('hx-table-no-data', data === void 0);
        if (data === void 0) {
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
          }).apply(hx.zip([headerNames, data]));
        }
        this.on('click', 'rowclick', (function(_this) {
          return function() {
            return table.emit('rowclick', {
              data: d,
              node: _this.node()
            });
          };
        })(this));
        rowSelect = (function(_this) {
          return function(e) {
            if (data !== void 0) {
              e.stopPropagation();
              if (!d.unselectable) {
                return table.options.rowSelectableLookup(d, function(canSelect) {
                  if (canSelect) {
                    return selectRow(_this, _.startRowIndex + i, screenRowIndex, e.shiftKey);
                  }
                });
              }
            }
          };
        })(this);
        this.classed('hx-table-row-unselectable', d.unselectable);
        if (rowTickSelectionEnabled) {
          this.select('.hx-table-selection').on('click', 'hx.extended-table', rowSelect);
        }
        if (rowSelectionEnabled) {
          this.on('click', rowSelect);
        }
        if (rowCollapsibleEnabled) {
          buildCollapsible = function(node) {
            var contentDiv, contentRow, hiddenRow;
            contentRow = hx.select(document.createElement('tr')).classed('hx-table-collapsible-content-row', true);
            hiddenRow = hx.select(document.createElement('tr')).classed('hx-table-collapsible-content-row-hidden', true);
            contentDiv = contentRow.append('td').attr('colspan', '99').style('padding', '10px').append('div').classed('hx-table-collapsible-content', true);
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
          toggleCollapsible = (function(_this) {
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
                preventToggle = collapsibleContent.contentRow.node().contains(e.target);
              }
              if (!preventToggle) {
                if (collapsibleContent == null) {
                  collapsibleContent = buildCollapsible(_this.node());
                }
                toggleCollapsible();
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
      _.tableWrapper.on('scroll', 'hx.extended-table', function(e) {
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
      _.tableWrapper.select('.hx-table-header-sticky').select('thead').select('.hx-table-header-row').selectAll('th').forEach(function(selection, i) {
        return selection.style('width', nonStickyHeadersWidths[i]);
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
            return updateControls(function() {
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
(function(){var DONT_PREVENT_DEFAULT_NODES, setupFastClick,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

if (hx.supports('touch')) {
  DONT_PREVENT_DEFAULT_NODES = ['INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
  setupFastClick = function(node, eventEmitter) {
    var cancel, getCoords, resetTimer, scrollTolerance, startX, startY, tapHandling, touchEndHander, touchMoveHander, touchStartHander;
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
    touchStartHander = function(e) {
      var ref;
      if (e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1) {
        return false;
      }
      return ref = getCoords(e), startX = ref[0], startY = ref[1], ref;
    };
    touchMoveHander = function(e) {
      var coords;
      if (!cancel) {
        coords = getCoords(e);
        if (coords && ((Math.abs(startY - coords[1])) > scrollTolerance || (Math.abs(startX - coords[0])) > scrollTolerance)) {
          return cancel = true;
        }
      }
    };
    touchEndHander = function(e) {
      var ref;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function() {
        tapHandling = false;
        return cancel = false;
      }, 1000);
      if ((e.which && e.which > 1) || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) {
        return;
      }
      if (cancel || tapHandling && tapHandling !== e.type) {
        cancel = false;
        return;
      }
      if (node.contains(e.target) && !(ref = e.target.nodeName, indexOf.call(DONT_PREVENT_DEFAULT_NODES, ref) >= 0)) {
        e.preventDefault();
      }
      tapHandling = e.type;
      return eventEmitter.emit('click', e);
    };
    node.addEventListener('touchstart', touchStartHander);
    node.addEventListener('touchmove', touchMoveHander);
    node.addEventListener('touchend', touchEndHander);
    return function() {
      node.removeEventListener('touchstart', touchStartHander);
      node.removeEventListener('touchmove', touchMoveHander);
      return node.removeEventListener('touchend', touchEndHander);
    };
  };
  hx.select.addEventAugmenter({
    name: 'click',
    setup: setupFastClick
  });
}
})();
(function(){var Form,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Form = (function(superClass) {
  extend(Form, superClass);

  function Form(selector) {
    this.selector = selector;
    Form.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this.formId = "form-" + hx.randomId() + '-';
    this.properties = new hx.Map;
    hx.select(this.selector).classed('hx-form', true).on('keypress', 'hx.form-builder', function(e) {
      var target;
      target = hx.select(e.target || e.srcElement);
      if (e.keyCode === 13 && target.attr('type') !== 'submit' && target.attr('type') !== 'textarea') {
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
      var attr, i, len, ref, selection;
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
      if (options.disabled) {
        selection.attr('disabled', '');
      }
      ref = options.attrs;
      for (i = 0, len = ref.length; i < len; i++) {
        attr = ref[i];
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

  Form.prototype.addTextArea = function(name, options) {
    if (options == null) {
      options = {};
    }
    if (options.type == null) {
      options.type = "textarea";
    }
    if (options.attrs == null) {
      options.attrs = [];
    }
    return this.add(name, 'textarea', 'textarea', function() {
      var attr, i, len, ref, selection;
      selection = this.attr('type', options.type);
      if (options.placeholder != null) {
        selection.attr('placeholder', options.placeholder);
      }
      if (options.required) {
        selection.attr('required', options.required);
      }
      if (options.disabled) {
        selection.attr('disabled', '');
      }
      ref = options.attrs;
      for (i = 0, len = ref.length; i < len; i++) {
        attr = ref[i];
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
    return this.add(name, 'select', 'div', function() {
      var c, elem, input, select, selectOptions;
      c = 'hx-btn';
      elem = this.append('button');
      if (options.disabled) {
        elem.attr('disabled', '');
      } else {
        if (options.buttonClass != null) {
          c += ' ' + options.buttonClass;
        }
      }
      selectOptions = hx.merge({
        renderer: function(node, data) {
          return hx.select(node).text(data);
        }
      }, options.selectOptions);
      if (values.length > 0) {
        selectOptions.items = values;
      }
      select = new hx.Picker(elem.node(), selectOptions);
      elem.classed(c, true).on('click', 'hx.form-builder', function(e) {
        return e.preventDefault();
      });
      if (typeof options.required !== 'boolean') {
        select.value(values[0]);
      }
      if (options.required) {
        input = this.append('input').style('margin', '0.25em 0 0 0').style('padding', 0).style('width', '1.5em').style('height', '1.5em').style('position', 'absolute').style('left', '0.5em').style('top', '13px').style('z-index', -1).attr('size', 0);
        input.node().setCustomValidity('Please select a value from the list');
        this.style('position', 'relative');
        select.on('change', 'hx.form-builder', function() {
          return input.node().setCustomValidity('');
        });
      }
      return {
        required: options.required,
        componentNode: elem.node(),
        select: select,
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
      if (options.disabled) {
        this.attr('disabled', '');
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
      var count, i, id, input, len, selection, value;
      id = self.formId + name.split(" ").join("-");
      count = 0;
      for (i = 0, len = values.length; i < len; i++) {
        value = values[i];
        selection = this.append('div')["class"]('hx-radio-container');
        input = selection.append('input').attr('type', 'radio').attr('name', id).attr("id", id + "-" + count).value(value);
        if (options.required != null) {
          input.attr('required', options.required);
        }
        if (options.disabled) {
          input.attr('disabled', '');
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

  Form.prototype.addDatePicker = function(name, options) {
    if (options == null) {
      options = {};
    }
    this.add(name, 'datepicker', 'div', function() {
      var datepicker, elem, getValue, setValue;
      elem = this.append('div').node();
      datepicker = new hx.DatePicker(elem, options.datePickerOptions);
      if (options.disabled) {
        datepicker.disable();
      }
      if ((options.validStart != null) || (options.validEnd != null)) {
        datepicker.validRange(options.validStart, options.validEnd);
      }
      if (options.selectRange != null) {
        getValue = function() {
          return datepicker.range();
        };
        setValue = function(value) {
          return datepicker.range(value.startDate, value.endDate, false, true);
        };
        if ((options.startDate != null) && (options.endDate != null)) {
          datepicker.range(options.startDate, options.endDate, false, true);
        }
      } else {
        getValue = function() {
          return datepicker.date();
        };
        setValue = function(value) {
          return datepicker.date(value);
        };
      }
      return {
        key: options.key,
        componentNode: elem,
        getValue: getValue,
        setValue: setValue
      };
    });
    return this;
  };

  Form.prototype.addTimePicker = function(name, options) {
    if (options == null) {
      options = {};
    }
    this.add(name, 'timepicker', 'div', function() {
      var elem, getValue, setValue, timepicker;
      elem = this.append('div').node();
      timepicker = new hx.TimePicker(elem, options.timePickerOptions);
      if (options.disabled) {
        timepicker.disable();
      }
      getValue = function() {
        return timepicker.date();
      };
      setValue = function(value) {
        return timepicker.date(value);
      };
      return {
        key: options.key,
        componentNode: elem,
        getValue: getValue,
        setValue: setValue
      };
    });
    return this;
  };

  Form.prototype.addDateTimePicker = function(name, options) {
    if (options == null) {
      options = {};
    }
    this.add(name, 'datetimepicker', 'div', function() {
      var datetimepicker, elem, getValue, setValue;
      elem = this.append('div').node();
      datetimepicker = new hx.DateTimePicker(elem, options.dateTimePickerOptions);
      if (options.disabled) {
        datetimepicker.disable();
      }
      getValue = function() {
        return datetimepicker.date();
      };
      setValue = function(value) {
        return datetimepicker.date(value);
      };
      return {
        key: options.key,
        componentNode: elem,
        getValue: getValue,
        setValue: setValue
      };
    });
    return this;
  };

  Form.prototype.addSubmit = function(text, icon) {
    hx.select(this.selector).append('button').attr('type', 'submit')["class"]('hx-btn hx-positive hx-form-submit').add(hx.detached('i')["class"](icon)).add(hx.detached('span').text(" " + text)).on('click', 'hx.form-builder', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.submit();
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
      new hx.TagInput(this.node(), options.tagInputOptions);
      return {
        key: options.key
      };
    });
    return this;
  };

  Form.prototype.submit = function() {
    var errors, ref, valid;
    ref = hx.validateForm(this.selector), valid = ref.valid, errors = ref.errors;
    if (valid) {
      this.emit('submit', this.data());
    }
    return this;
  };

  Form.prototype.data = function(data) {
    var it, key, node, result, tagInput, value;
    if (arguments.length > 0) {
      for (key in data) {
        if (!hasProp.call(data, key)) continue;
        value = data[key];
        if (this.properties.has(key)) {
          it = this.properties.get(key);
          node = it.node;
          switch (it.type) {
            case 'checkbox':
              hx.select(node).prop('checked', value);
              break;
            case 'radio':
              hx.select(node).selectAll('input').filter(function(d) {
                return hx.select(d).value() === value;
              }).prop('checked', true);
              break;
            case 'tagInput':
              tagInput = hx.component(it.extras.componentNode || node);
              value.forEach(function(e) {
                return tagInput.add(e);
              });
              break;
            case 'select':
              hx.component(it.extras.componentNode || node).value(value);
              break;
            case 'datepicker':
            case 'timepicker':
            case 'datetimepicker':
              it.extras.setValue(value);
              break;
            default:
              hx.select(node).value(value);
          }
        }
      }
      return this;
    } else {
      result = {};
      this.properties.forEach(function(key, it) {
        value = (function() {
          switch (it.type) {
            case 'checkbox':
              return hx.select(it.node).prop('checked');
            case 'radio':
              return hx.select(it.node).select('input:checked').value();
            case 'tagInput':
              return hx.component(it.extras.componentNode || it.node).items();
            case 'select':
              return hx.component(it.extras.componentNode || it.node).value();
            case 'datepicker':
            case 'timepicker':
            case 'datetimepicker':
              return it.extras.getValue();
            default:
              return hx.select(it.node).value();
          }
        })();
        return result[key] = value;
      });
      return result;
    }
  };

  Form.prototype.component = function(property) {
    var node, prop;
    if ((prop = this.properties.get(property)) != null) {
      node = prop.extras.componentNode || prop.node;
      if (node != null) {
        return hx.component(node);
      }
    }
  };

  return Form;

})(hx.EventEmitter);

hx.Form = Form;
})();
(function(){var InlineEditable,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

InlineEditable = (function(superClass) {
  var enterEditMode;

  extend(InlineEditable, superClass);

  enterEditMode = function(toggle, content) {
    hx.select(content).select('.hx-name').value(hx.select(toggle).text());
    return hx.select(content).select('.hx-confirm').on('click', 'hx.inline-editable', (function(_this) {
      return function() {
        var value;
        value = hx.select(content).select('.hx-name').value();
        _this.textSelection.text(value);
        _this.emit('change', {
          api: false,
          value: value
        });
        return _this.hide();
      };
    })(this));
  };

  function InlineEditable(selector) {
    var selection, text;
    this.selector = selector;
    selection = hx.select(this.selector);
    text = selection.text();
    selection.text('');
    this.textSelection = selection.append('a')["class"]('hx-morph-toggle').text(text);
    selection.append('div')["class"]('hx-morph-content hx-input-group').add(hx.detached('input')["class"]('hx-name')).add(hx.detached('button')["class"]('hx-btn hx-positive hx-confirm').add(hx.detached('i')["class"]('fa fa-check')));
    InlineEditable.__super__.constructor.call(this, this.selector, enterEditMode, function() {});
  }

  InlineEditable.prototype.value = function(value) {
    if (value !== void 0) {
      this.textSelection.text(value);
      return this.emit('change', {
        api: false,
        value: value
      });
    } else {
      return this.textSelection.text();
    }
  };

  return InlineEditable;

})(hx.InlineMorphSection);

hx.InlineEditable = InlineEditable;
})();
(function(){var InlineSelect,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

InlineSelect = (function(superClass) {
  var enterEditMode, exitEditMode;

  extend(InlineSelect, superClass);

  enterEditMode = function(toggle, content) {
    var ref;
    this.select.value(((ref = this.current) != null ? ref.value : void 0) || this.current);
    return hx.select(content).select('.hx-confirm').on('click', 'hx.inline-select', (function(_this) {
      return function() {
        _this.current = _this.select.value();
        _this.textSelection.text(_this.current.text || _this.current);
        _this.emit('change', {
          api: false,
          value: _this.current
        });
        return _this.hide();
      };
    })(this));
  };

  exitEditMode = function(toggle, content) {};

  function InlineSelect(selector, options) {
    var selectNode, selection;
    this.selector = selector;
    options = hx.merge({
      renderer: void 0,
      items: [],
      contextClass: 'hx-compliment',
      ddClass: void 0,
      noValueText: void 0,
      startValue: void 0
    }, options);
    this.current = void 0;
    selection = hx.select(this.selector);
    selectNode = hx.detached('button')["class"]('hx-btn hx-inline-select ' + options.contextClass).node();
    this.textSelection = selection.append('a')["class"]('hx-morph-toggle');
    selection.append('div')["class"]('hx-morph-content hx-input-group').add(selectNode).add(hx.detached('button')["class"]('hx-btn hx-positive hx-confirm').add(hx.detached('i')["class"]('fa fa-check')));
    this.select = new hx.Picker(selectNode, {
      renderer: options.renderer,
      items: options.items,
      ddClass: options.ddClass,
      noValueText: options.noValueText
    });
    if (options.renderer == null) {
      options.renderer = this.select.renderer();
    }
    this.select.menu.dropdown.on('showstart', 'hx.inline-select', (function(_this) {
      return function() {
        return _this.detector.addException(_this.select.menu.dropdown.dropdown.node());
      };
    })(this));
    InlineSelect.__super__.constructor.call(this, this.selector, enterEditMode, exitEditMode, options);
    if (this.options.startValue != null) {
      this.value(this.options.startValue);
    }
  }

  InlineSelect.prototype.renderer = function(f) {
    if (f != null) {
      this.options.renderer = f;
      this.select.renderer(this.options.renderer);
      return this;
    } else {
      return this.options.renderer;
    }
  };

  InlineSelect.prototype.items = function(items) {
    if (items != null) {
      this.options.items = items;
      this.select.items(this.options.items);
      return this;
    } else {
      return this.options.items;
    }
  };

  InlineSelect.prototype.value = function(value) {
    if (arguments.length > 0) {
      this.select.value(value);
      this.current = this.select.value();
      this.textSelection.text(this.current.text || this.current);
      this.emit('change', {
        api: true,
        value: this.current
      });
      return this;
    } else {
      return this.current;
    }
  };

  return InlineSelect;

})(hx.InlineMorphSection);

hx.InlineSelect = InlineSelect;
})();
(function(){var Meter;

Meter = (function() {
  function Meter(selector, options) {
    var _, container, innerText, randomId, selection, svg;
    hx.component.register(selector, this);
    this._ = _ = {};
    _.data = {
      total: 0,
      completed: 0
    };
    this.options = hx.merge({
      useMarker: true,
      useTracker: true,
      trackerWidth: 0.03,
      progressWidth: 0.175,
      markerSize: 0.01,
      markerInnerExtend: 0.01,
      markerOuterExtend: -0.01,
      arcPadding: 0.02,
      markerPadding: 0.1,
      progressBackgroundCol: hx.color(hx.theme.palette.contrastCol).alpha(0.05).toString(),
      progressCol: hx.theme.plot.positiveCol,
      trackerCol: hx.color(hx.theme.plot.positiveCol).alpha(0.5).toString(),
      trackerBackgroundCol: hx.color(hx.theme.palette.contrastCol).alpha(0.05).toString(),
      markerCol: hx.theme.palette.contrastCol
    }, options);
    randomId = hx.randomId();
    _.selection = selection = hx.select(selector).classed('hx-meter', true).on('resize', (function(_this) {
      return function() {
        return _this.render();
      };
    })(this));
    _.container = container = selection.append('div')["class"]('hx-meter-container');
    _.svg = svg = container.append('svg').style('width', '100%').style('height', '100%');
    _.progressBackgroundArc = svg.append('path');
    _.progressArc = svg.append('path');
    _.trackerBackgroundArc = svg.append('path');
    _.trackerArc = svg.append('path');
    _.markerArc = svg.append('path');
    _.markerTextCurve = svg.append('defs').append('path').attr('id', randomId);
    _.markerText = svg.append('g').append('text')["class"]('hx-meter-marker-text').append('textPath').attr('xlink:href', '#' + randomId);
    innerText = container.append('div')["class"]('hx-meter-inner-text');
    _.completedText = innerText.append('div')["class"]('hx-meter-completed');
    _.totalText = innerText.append('div')["class"]('hx-meter-total');
    _.typeText = innerText.append('div')["class"]('hx-meter-type');
  }

  Meter.prototype.value = function(data) {
    if (arguments.length > 0) {
      this._.data = hx.merge(this._.data, data);
      this.render();
      return this;
    } else {
      return this._.data;
    }
  };

  Meter.prototype.render = function() {
    var _, container, data, endRadians, i, markerProgress, markerR1, markerR2, markerWidth, options, path, points, progress, progressR1, progressR2, radius, selection, size, startRadians, svg, textOffset, trackerProgress, trackerR1, trackerR2, updateArc, x, y;
    _ = this._;
    options = this.options;
    data = _.data;
    selection = _.selection;
    container = _.container;
    svg = _.svg;
    progress = Math.max(0, Math.min(1, (data.completed / data.total) || 0));
    trackerProgress = Math.max(0, Math.min(1, (data.tracker / data.total) || 0));
    markerProgress = Math.max(0, Math.min(1, (data.marker / data.total) || 0));
    _.completedText.text(data.completed);
    _.totalText.text('of ' + data.total);
    _.typeText.text(data.unitText);
    size = Math.min(selection.width(), selection.height() * 2);
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
      var endRadians, innerRadius, outerRadius, padding, path, segmentCount, startRadians;
      innerRadius = size / 2 * r1;
      outerRadius = size / 2 * r2;
      startRadians = Math.PI + Math.PI * start;
      endRadians = Math.PI + Math.PI * end;
      padding = 0;
      segmentCount = 1;
      path = hx.plot.arcCurve(x, y, innerRadius, outerRadius, startRadians, endRadians, padding, segmentCount);
      return selection.attr('d', path).attr('fill', col).style('visibility', void 0);
    };
    container.style('width', size + 'px');
    container.style('height', size / 2 + 'px');
    updateArc(_.progressArc, 0, progress, progressR1, progressR2, options.progressCol);
    updateArc(_.progressBackgroundArc, progress, 1, progressR1, progressR2, options.progressBackgroundCol);
    if (options.useTracker) {
      updateArc(_.trackerArc, 0, trackerProgress, trackerR1, trackerR2, options.trackerCol);
      updateArc(_.trackerBackgroundArc, trackerProgress, 1, trackerR1, trackerR2, options.trackerBackgroundCol);
    } else {
      _.trackerArc.style('visibility', 'hidden');
      _.trackerBackgroundArc.style('visibility', 'hidden');
    }
    if (options.useMarker) {
      startRadians = Math.PI;
      endRadians = Math.PI * 2;
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
      path = hx.plot.svgCurve(points, false);
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
    return this;
  };

  return Meter;

})();

hx.Meter = Meter;
})();
(function(){var Paginator, getRange, render, select,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

getRange = function(selected, visibleCount, pageCount) {
  var end, start;
  start = Math.max(1, selected - Math.floor(visibleCount / 2));
  end = Math.min(start + visibleCount, pageCount + 1);
  start = Math.max(1, end - visibleCount);
  return {
    start: start,
    end: end
  };
};

render = function(paginator) {
  var buttonSize, buttonSpace, data, end, maxButtons, maxLength, ref, ref1, start, visibleCount;
  if (paginator._.pageCount === void 0) {
    data = [
      {
        value: paginator.selected,
        selected: true,
        dataLength: paginator.selected.toString().length
      }
    ];
  } else {
    ref = getRange(paginator.selected, paginator._.visibleCount, paginator._.pageCount), start = ref.start, end = ref.end;
    maxLength = Math.max(start.toString().length, (end - 1).toString().length);
    buttonSize = 30 + (5 * Math.max(0, maxLength - 2));
    buttonSpace = paginator.container.width() - 81;
    maxButtons = Math.floor(buttonSpace / buttonSize);
    visibleCount = Math.min(maxButtons, paginator._.visibleCount);
    visibleCount = Math.max(visibleCount, 1);
    ref1 = getRange(paginator.selected, visibleCount, paginator._.pageCount), start = ref1.start, end = ref1.end;
    data = hx.range(end - start).map(function(i) {
      return {
        value: start + i,
        selected: paginator.selected === start + i,
        dataLength: maxLength
      };
    });
  }
  return paginator.view.apply(data);
};

select = function(paginator, i, cause) {
  var newPage;
  if (paginator._.pageCount === void 0) {
    newPage = Math.max(i, 1);
  } else {
    newPage = hx.clamp(1, paginator._.pageCount, i);
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

Paginator = (function(superClass) {
  extend(Paginator, superClass);

  function Paginator(selector) {
    var pageButtons, self;
    Paginator.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    this.container = hx.select(selector).classed('hx-paginator', true);
    this._ = {
      selector: selector
    };
    self = this;
    this.container.append('button').attr('type', 'button')["class"]('hx-btn ' + hx.theme.paginator.arrowButton).html('<i class="fa fa-step-backward"></i>').on('click', 'hx.paginator', function() {
      if (self._.pageCount === void 0) {
        return select(self, self.selected - 1, 'user');
      } else {
        return select(self, 0, 'user');
      }
    });
    pageButtons = this.container.append('span')["class"]('hx-input-group');
    this.view = pageButtons.view('.hx-btn', 'button').update(function(d, e, i) {
      return this.text(d.value).attr('type', 'button').classed('hx-paginator-three-digits', d.dataLength === 3).classed('hx-paginator-more-digits', d.dataLength > 3).classed(hx.theme.paginator.defaultButton, !d.selected).classed(hx.theme.paginator.selectedButton, d.selected).classed('hx-no-border', true).on('click', 'hx.paginator', function() {
        return select(self, d.value, 'user');
      });
    });
    this.container.append('button').attr('type', 'button')["class"]('hx-btn ' + hx.theme.paginator.arrowButton).html('<i class="fa fa-step-forward"></i>').on('click', 'hx.paginator', function() {
      if (self._.pageCount === void 0) {
        return select(self, self.selected + 1, 'user');
      } else {
        return select(self, self._.pageCount, 'user');
      }
    });
    this.container.on('resize', 'hx.paginator', function() {
      return render(self);
    });
    this._.visibleCount = 10;
    this._.pageCount = 10;
    this.selected = 1;
    render(this);
  }

  Paginator.prototype.page = function(i) {
    if (arguments.length > 0) {
      select(this, i, 'api');
      return this;
    } else {
      return this.selected;
    }
  };

  Paginator.prototype.pageCount = function(value) {
    if (value != null) {
      this._.pageCount = value;
      render(this);
      return this;
    } else {
      return this._.pageCount;
    }
  };

  Paginator.prototype.visibleCount = function(value) {
    if (value != null) {
      this._.visibleCount = value;
      render(this);
      return this;
    } else {
      return this._.visibleCount;
    }
  };

  return Paginator;

})(hx.EventEmitter);

hx.Paginator = Paginator;
})();
(function(){var Picker, setValue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

setValue = function(select, value, items) {
  var i, item, len, results;
  results = [];
  for (i = 0, len = items.length; i < len; i++) {
    item = items[i];
    if (item === value || item.value === value) {
      select.current = item;
      select.options.renderer(select.selectedText.node(), item);
      break;
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Picker = (function(superClass) {
  extend(Picker, superClass);

  function Picker(selector, options) {
    var button;
    Picker.__super__.constructor.apply(this, arguments);
    this.options = hx.merge.defined({
      ddClass: '',
      items: [],
      noValueText: 'Choose a value...',
      renderer: void 0,
      startValue: void 0
    }, options);
    hx.component.register(selector, this);
    this.selection = hx.select(selector);
    this.current = void 0;
    button = this.selection.classed('hx-picker', true).append('span')["class"]('hx-picker-inner');
    this.selectedText = button.append('span')["class"]('hx-picker-text');
    button.append('span')["class"]('hx-picker-icon').append('i')["class"]('fa fa fa-caret-down');
    this.menu = new hx.Menu(selector, {
      ddClass: this.options.ddClass
    });
    this.menu.on('change', 'hx.picker', (function(_this) {
      return function(item) {
        if ((item != null ? item.content : void 0) != null) {
          _this.current = item.content;
          _this.selectedText.text(_this.current.text || _this.current);
          _this.menu.hide();
          return _this.emit('change', _this.current);
        }
      };
    })(this));
    if (this.options.renderer != null) {
      this.renderer(this.options.renderer);
    } else {
      this.options.renderer = this.menu.renderer();
    }
    if ((this.options.items != null) && this.options.items.length > 0) {
      this.items(this.options.items);
    }
    if (this.options.startValue != null) {
      this.value(this.options.startValue);
    }
    if ((this.current == null) && (this.options.noValueText != null)) {
      this.selectedText.text(this.options.noValueText);
    }
    this.menu.pipe(this, '', ['highlight']);
    this.menu.dropdown.pipe(this, 'dropdown');
  }

  Picker.prototype.renderer = function(f) {
    if (f != null) {
      this.options.renderer = f;
      this.menu.renderer(f);
      return this;
    } else {
      return this.options.renderer;
    }
  };

  Picker.prototype.items = function(items) {
    if (items != null) {
      this.options.items = items;
      this.menu.items(items);
      return this;
    } else {
      return this.options.items;
    }
  };

  Picker.prototype.value = function(value) {
    var loading;
    if (arguments.length > 0) {
      if (hx.isFunction(this.items())) {
        loading = this.selection.prepend('span');
        loading.append('i')["class"]('hx-menu-loading fa fa-spin fa-spinner');
        this.items()((function(_this) {
          return function(data) {
            loading.remove();
            return setValue(_this, value, data);
          };
        })(this));
      } else {
        setValue(this, value, this.items());
      }
      return this;
    } else {
      return this.current;
    }
  };

  return Picker;

})(hx.EventEmitter);

hx.Picker = Picker;
})();
(function(){var PivotTable, cellViewEnter, cellViewUpdate, rowViewUpdate,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

cellViewEnter = function(d, i, isHead) {
  var cell, type;
  type = isHead || hx.isFunction(d) ? 'th' : 'td';
  cell = this.append(type)["class"]('hx-pivot-table-cell');
  if (isHead) {
    cell.classed('hx-pivot-table-head-cell', true);
  }
  return cell.node();
};

cellViewUpdate = function(d, e, i, cellRender, isHead) {
  var elem;
  elem = hx.select(e);
  if (hx.isFunction(d)) {
    return d(e);
  } else if (d == null) {
    return elem.text('');
  } else {
    return cellRender(d, e, isHead, i);
  }
};

rowViewUpdate = function(d, e, i, cellRender, isHead, shifted) {
  return hx.select(e).view('.hx-pivot-table-cell').enter(function(d, i) {
    return cellViewEnter.call(this, d, i, isHead || (shifted && i === 0));
  }).update(function(d, e, i) {
    return cellViewUpdate(d, e, i, cellRender, isHead || (shifted && i === 0));
  }).apply(d);
};

PivotTable = (function(superClass) {
  extend(PivotTable, superClass);

  function PivotTable(selector, options) {
    var self;
    this.selector = selector;
    PivotTable.__super__.constructor.apply(this, arguments);
    self = this;
    hx.component.register(this.selector, this);
    this.options = hx.merge.defined({
      stickyHeaders: true,
      topLeftCellRender: void 0,
      cellRender: function(data, element, isHead, column) {
        return hx.select(element).text(data);
      },
      useResponsive: true
    }, options);
    this._ = {};
    this.selection = hx.select(this.selector).classed('hx-pivot-table', true);
    this.table = this.selection.append('table')["class"]('hx-table');
    this.tableHead = this.table.append('thead');
    this.tableBody = this.table.append('tbody');
  }

  PivotTable.prototype.data = function(data) {
    var bodyData, leftData, ref, ref1, self, shifted, topData;
    if (data != null) {
      self = this;
      this._.data = data;
      topData = ((ref = data.topHead) != null ? ref.length : void 0) > 0 ? data.topHead : [];
      leftData = ((ref1 = data.leftHead) != null ? ref1.length : void 0) > 0 ? data.leftHead : [];
      if (topData.length > 0) {
        if (topData.length !== data.body[0].length) {
          hx.consoleWarning('hx.PivotTable - ' + this.selector, 'The number of columns in the dataset is not equal to the number of headers provided in data.topHead');
        }
      }
      if (leftData.length > 0) {
        if (leftData.length !== data.body.length) {
          hx.consoleWarning('hx.PivotTable - ' + this.selector, 'The number of rows in the dataset is not equal to the number of headers provided in data.leftHead');
        }
        bodyData = data.body.map(function(e, i) {
          e.unshift(leftData[i]);
          return e;
        });
        shifted = true;
      }
      if (topData.length > 0 && shifted) {
        if (topData != null) {
          topData.unshift(this.options.topLeftCellRender || void 0);
        }
      }
      if (bodyData == null) {
        bodyData = data.body;
      }
      this.tableHeadView = this.tableHead.view('tr', 'tr').update(function(d, e, i) {
        return rowViewUpdate(d, e, i, self.options.cellRender, true);
      });
      this.tableBodyView = this.tableBody.view('tr', 'tr').update(function(d, e, i) {
        return rowViewUpdate(d, e, i, self.options.cellRender, false, shifted);
      });
      if ((topData != null ? topData.length : void 0) > 0) {
        this.tableHeadView.apply([topData]);
      }
      this.tableBodyView.apply(bodyData);
      if (this.options.stickyHeaders) {
        if (!this.stickyTableHeaders) {
          this.stickyTableHeaders = new hx.StickyTableHeaders(this.selector, {
            stickTableHead: topData.length > 0,
            stickFirstColumn: leftData.length > 0,
            useResponsive: this.options.useResponsive
          });
        } else {
          this.stickyTableHeaders.render();
        }
      }
      return this;
    } else {
      return this._.data;
    }
  };

  return PivotTable;

})(hx.EventEmitter);

hx.PivotTable = PivotTable;
})();
(function(){var LocalStoragePreferencesStore, Preferences, localeList,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

localeList = [
  {
    value: "af",
    full: "Afrikaans"
  }, {
    value: "sq",
    full: "Albanian"
  }, {
    value: "ar",
    full: "Arabic"
  }, {
    value: "ar-MA",
    full: "Arabic (Morocco)"
  }, {
    value: "ar-SA",
    full: "Arabic (Saudi Arabia)"
  }, {
    value: "ar-TN",
    full: "Arabic (Tunisia)"
  }, {
    value: "hy-AM",
    full: "Armenian"
  }, {
    value: "az",
    full: "Azerbaijani"
  }, {
    value: "id",
    full: "Bahasa Indonesia"
  }, {
    value: "ms-MY",
    full: "Bahasa Malayu"
  }, {
    value: "eu",
    full: "Basque"
  }, {
    value: "be",
    full: "Belarusian"
  }, {
    value: "bn",
    full: "Bengali"
  }, {
    value: "bs",
    full: "Bosnian"
  }, {
    value: "br",
    full: "Breton"
  }, {
    value: "bg",
    full: "Bulgarian"
  }, {
    value: "my",
    full: "Burmese"
  }, {
    value: "ca",
    full: "Catalan"
  }, {
    value: "zh-CN",
    full: "Chinese"
  }, {
    value: "zh-TW",
    full: "Chinese (Traditional)"
  }, {
    value: "cv",
    full: "Chuvash"
  }, {
    value: "hr",
    full: "Croatian"
  }, {
    value: "cs",
    full: "Czech"
  }, {
    value: "da",
    full: "Danish"
  }, {
    value: "nl",
    full: "Dutch"
  }, {
    value: "en",
    full: "English"
  }, {
    value: "en-US",
    full: "English (US)"
  }, {
    value: "en-AU",
    full: "English (Australia)"
  }, {
    value: "en-CA",
    full: "English (Canada)"
  }, {
    value: "en-GB",
    full: "English (UK) "
  }, {
    value: "eo",
    full: "Esperanto"
  }, {
    value: "et",
    full: "Estonian"
  }, {
    value: "fo",
    full: "Farose"
  }, {
    value: "fi",
    full: "Finnish"
  }, {
    value: "fr",
    full: "French"
  }, {
    value: "fr-CA",
    full: "French (Canada)"
  }, {
    value: "fy",
    full: "Frisian"
  }, {
    value: "gl",
    full: "Galician"
  }, {
    value: "ka",
    full: "Georgian"
  }, {
    value: "de",
    full: "German"
  }, {
    value: "de-AT",
    full: "German (Austria)"
  }, {
    value: "el",
    full: "Greek"
  }, {
    value: "he",
    full: "Hebrew"
  }, {
    value: "hi",
    full: "Hindi"
  }, {
    value: "hu",
    full: "Hungarian"
  }, {
    value: "is",
    full: "Icelandic"
  }, {
    value: "it",
    full: "Italian"
  }, {
    value: "ja",
    full: "Japanese"
  }, {
    value: "km",
    full: "Khmer (Cambodia)"
  }, {
    value: "ko",
    full: "Korean"
  }, {
    value: "lv",
    full: "Latvian"
  }, {
    value: "lt",
    full: "Lithuanian"
  }, {
    value: "lb",
    full: "Luxembourgish"
  }, {
    value: "mk",
    full: "Macedonian"
  }, {
    value: "ml",
    full: "Malayalam"
  }, {
    value: "mr",
    full: "Marathi"
  }, {
    value: "ne",
    full: "Nepalese"
  }, {
    value: "nb",
    full: "Norwegian"
  }, {
    value: "nn",
    full: "Norwegian Nynorsk"
  }, {
    value: "fa",
    full: "Persian"
  }, {
    value: "pl",
    full: "Polish"
  }, {
    value: "pt",
    full: "Portuguese"
  }, {
    value: "pt-BR",
    full: "Portuguese (Brazil)"
  }, {
    value: "ro",
    full: "Romanian"
  }, {
    value: "ru",
    full: "Russian"
  }, {
    value: "sr",
    full: "Serbian"
  }, {
    value: "sr-CYRL",
    full: "Serbian Cyrillic"
  }, {
    value: "sk",
    full: "Slovak"
  }, {
    value: "sl",
    full: "Slovenian"
  }, {
    value: "es",
    full: "Spanish"
  }, {
    value: "sv",
    full: "Swedish"
  }, {
    value: "tl-PH",
    full: "Tagalog (Filipino)"
  }, {
    value: "tzm",
    full: "Tamaziɣt"
  }, {
    value: "tzm-LATN",
    full: "Tamaziɣt Latin"
  }, {
    value: "ta",
    full: "Tamil"
  }, {
    value: "th",
    full: "Thai"
  }, {
    value: "bo",
    full: "Tibetan"
  }, {
    value: "tr",
    full: "Turkish"
  }, {
    value: "uk",
    full: "Ukrainian"
  }, {
    value: "uz",
    full: "Uzbek"
  }, {
    value: "vi",
    full: "Vietnamese"
  }, {
    value: "cy",
    full: "Welsh"
  }
];

LocalStoragePreferencesStore = {
  save: function(prefs, cb) {
    localStorage.setItem('hx_preferences', prefs);
    return cb();
  },
  load: function(cb) {
    return cb(void 0, localStorage.getItem('hx_preferences'));
  }
};

Preferences = (function(superClass) {
  extend(Preferences, superClass);

  function Preferences() {
    var modal, setupModal;
    Preferences.__super__.constructor.apply(this, arguments);
    setupModal = (function(_this) {
      return function(element) {
        var locale, localeAutocompleteElement, localeSection, ref, saveButton, supportedLocales, timezone, timezoneAutocompleteElement, timezoneSection;
        locale = _this.locale();
        timezone = _this.timezone();
        localeAutocompleteElement = hx.detached('input');
        localeAutocompleteElement.value((ref = localeList.filter(function(d) {
          return d.value === locale;
        })[0]) != null ? ref.full : void 0);
        supportedLocales = _this._.supportedLocales != null ? localeList.map(function(l) {
          var ref1;
          return {
            value: l.value,
            full: l.full,
            disabled: !(ref1 = l.value, indexOf.call(_this._.supportedLocales, ref1) >= 0)
          };
        }) : localeList;
        new hx.AutoComplete(localeAutocompleteElement.node(), supportedLocales, {
          renderer: function(element, datum) {
            return hx.select(element).text(datum.full);
          },
          inputMap: function(item) {
            return item.full;
          },
          showOtherResults: true,
          mustMatch: true
        }).on('change', function(item) {
          return locale = item.value;
        });
        localeSection = hx.detached('div').add(hx.detached('label').text('Locale')).add(localeAutocompleteElement);
        timezoneAutocompleteElement = hx.detached('input');
        timezoneAutocompleteElement.value(timezone);
        new hx.AutoComplete(timezoneAutocompleteElement.node(), (typeof moment !== "undefined" && moment !== null ? moment.tz.names() : void 0) || [], {
          showOtherResults: true,
          mustMatch: true
        }).on('change', function(value) {
          return timezone = value;
        });
        timezoneSection = hx.detached('div').add(hx.detached('label').text('Time Zone')).add(timezoneAutocompleteElement);
        saveButton = hx.detached('button')["class"]('hx-btn hx-positive').add(hx.detached('i')["class"]('fa fa-check')).add(hx.detached('span').text(' Save')).on('click', function() {
          _this.locale(locale);
          _this.timezone(timezone);
          return _this.save(function(err) {
            if (err) {
              return hx.notify.negative(err);
            } else {
              hx.notify.positive("Preferences Saved");
              return modal.close();
            }
          });
        });
        return hx.select(element).append('div')["class"]('hx-form').add(localeSection).add(timezoneSection).add(saveButton);
      };
    })(this);
    modal = new hx.Modal('Preferences', setupModal);
    this._ = {
      backingStore: LocalStoragePreferencesStore,
      preferences: {},
      modal: modal
    };
  }

  Preferences.prototype.timezone = function(timezone) {
    if (arguments.length > 0) {
      if (this._.preferences['timezone'] !== timezone) {
        this._.preferences['timezone'] = timezone;
        this.emit('timezonechange', timezone);
      }
      return this;
    } else {
      return this._.preferences['timezone'];
    }
  };

  Preferences.prototype.locale = function(locale) {
    var localeObject;
    if (arguments.length > 0) {
      if (locale === void 0) {
        if (this._.preferences['locale'] !== void 0) {
          this._.preferences['locale'] = void 0;
          this.emit('localechange', void 0);
        }
      } else if ((localeObject = localeList.filter(function(l) {
        return l.value.toLowerCase() === locale.toLowerCase();
      })[0])) {
        if (this._.preferences['locale'] !== localeObject.value) {
          this._.preferences['locale'] = localeObject.value;
          this.emit('localechange', localeObject.value);
        }
      } else {
        hx.consoleWarning('preferences.locale', locale + ' is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon');
      }
      return this;
    } else {
      return this._.preferences['locale'];
    }
  };

  Preferences.prototype.supportedLocales = function(locales) {
    if (arguments.length > 0) {
      this._.supportedLocales = locales;
      return this;
    } else {
      return this._.supportedLocales;
    }
  };

  Preferences.prototype.backingStore = function(backingStore) {
    if (backingStore != null) {
      this._.backingStore = backingStore;
    }
    return this;
  };

  Preferences.prototype.save = function(cb) {
    var e, error;
    try {
      return this._.backingStore.save(JSON.stringify(this._.preferences), function(err) {
        return typeof cb === "function" ? cb(err) : void 0;
      });
    } catch (error) {
      e = error;
      return typeof cb === "function" ? cb(e) : void 0;
    }
  };

  Preferences.prototype.load = function(cb) {
    var e, error;
    try {
      return this._.backingStore.load((function(_this) {
        return function(err, prefs) {
          if (prefs != null) {
            _this._.preferences = JSON.parse(prefs);
          }
          return typeof cb === "function" ? cb(err) : void 0;
        };
      })(this));
    } catch (error) {
      e = error;
      return typeof cb === "function" ? cb(e) : void 0;
    }
  };

  Preferences.prototype.show = function() {
    this._.modal.show();
    return this;
  };

  return Preferences;

})(hx.EventEmitter);

hx.preferences = new Preferences;

hx.preferences.localStorageStore = LocalStoragePreferencesStore;
})();
(function(){var ProgressBar;

ProgressBar = (function() {
  function ProgressBar(selector, options) {
    this.selector = selector;
    hx.component.register(this.selector, this);
    options = hx.merge.defined({
      segments: void 0,
      value: 0,
      animate: false
    }, options);
    this.selection = hx.select(this.selector).classed('hx-progress-bar', true);
    this.innerBars = this.selection.append('div').attr('class', 'hx-progress-bar-inner');
    this.value(options.value);
    if (options.segments != null) {
      this.segments(options.segments, true);
    }
    if (options.animate) {
      this.selection.classed('hx-animate', true);
    }
  }

  ProgressBar.prototype.value = function(value) {
    if (arguments.length > 0) {
      if (!isNaN(value)) {
        this.progress = Math.max(0, Math.min(1, value));
        this.innerBars.style('width', (this.progress * 100) + '%');
      }
      return this;
    } else {
      return this.progress;
    }
  };

  ProgressBar.prototype.segments = function(segments, retainProgress) {
    var runningTotal, total;
    if (arguments.length > 0) {
      if (segments != null) {
        this.progressSegments = segments.filter(function(e) {
          return (e.value != null) || (e.ratio != null) || (e["class"] != null);
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
          this.progressSegments.forEach((function(_this) {
            return function(segment, i) {
              var bar, maxWidth;
              bar = _this.selection.append('div').attr('class', 'hx-progress-bar-inner');
              if (segment["class"] != null) {
                bar.classed(segment["class"], true);
              }
              maxWidth = runningTotal == null ? (segment.value || 1) * 100 : (runningTotal += segment.ratio || 1, runningTotal / total * 100);
              return bar.style('max-width', maxWidth + '%').style('z-index', _this.progressSegments.length - i);
            };
          })(this));
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

})();

hx.ProgressBar = ProgressBar;
})();
(function(){var clearSearch, searchDOM;

searchDOM = function(selector, string, callback, options) {
  var findString, found, foundNodes, hideAll, highlightStr, makeVis, makeVisible, regex, removeHighlights, root;
  if (selector == null) {
    selector = 'body';
  }
  if (options == null) {
    options = {};
  }
  hideAll = function(cb) {
    root.selectAll('.hx-opened').forEach(function(elem) {
      var ref;
      return (ref = hx.component(elem.node())) != null ? ref.hide(false) : void 0;
    });
    return typeof cb === "function" ? cb() : void 0;
  };
  highlightStr = function(match) {
    found += 1;
    return '<span class="hx-highlight-selected">' + match + '</span>';
  };
  removeHighlights = function(rootElem, cb) {
    rootElem.selectAll('.hx-highlighted-content').forEach(function(elem) {
      var children, textNode;
      elem = elem.node();
      children = elem.childNodes;
      textNode = document.createTextNode(elem.textContent);
      return elem.parentNode.replaceChild(textNode, elem);
    });
    return typeof cb === "function" ? cb() : void 0;
  };
  makeVis = function(child, node) {
    var ref;
    if (node == null) {
      node = child;
    }
    if (child.offsetParent === null && ((node != null ? node.parentNode : void 0) != null)) {
      if ((ref = hx.component(node)) != null) {
        if (typeof ref.show === "function") {
          ref.show(false, child);
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
    var child, children, j, len, newNode, ref, strFound;
    if (strFound = ((ref = elem.textContent) != null ? ref.search(regex) : void 0) > -1) {
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
          for (j = 0, len = children.length; j < len; j++) {
            child = children[j];
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
(function(){var SideCollapsible,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SideCollapsible = (function(superClass) {
  extend(SideCollapsible, superClass);

  function SideCollapsible(selector, options) {
    var closedToggle, openToggle, padding, whichOpp, whichSize;
    SideCollapsible.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    this.options = hx.merge.defined({
      position: 'left',
      animate: true,
      visible: false,
      rotateHeading: true
    }, options);
    this.selection = hx.select(selector).classed('hx-side-collapsible', true);
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
      this.closedHeading.on('click', 'hx.side-collapsible', (function(_this) {
        return function() {
          return _this.show();
        };
      })(this));
    } else {
      this.closedHeading.classed('hx-side-collapsible-heading-no-hover', true);
      closedToggle.on('click', 'hx.side-collapsible', (function(_this) {
        return function() {
          return _this.show();
        };
      })(this));
    }
    if ((openToggle = this.openHeading.select('.hx-side-collapsible-toggle')).empty()) {
      this.openHeading.on('click', 'hx.side-collapsible', (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this));
    } else {
      this.openHeading.classed('hx-side-collapsible-heading-no-hover', true);
      openToggle.on('click', 'hx.side-collapsible', (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this));
    }
    this.visible = !this.options.visible;
    if (this.options.visible) {
      this.show(false);
    } else {
      this.hide(false);
    }
  }

  SideCollapsible.prototype.show = function(animate, cb) {
    animate = animate != null ? animate : this.options.animate;
    if (!this.visible) {
      this.visible = true;
      if (animate) {
        this.selection.style('width', this.closedSize + 'px');
        this.openHeading.style('width', this.closedSize + 'px');
        this.content.style('width', this.closedSize + 'px');
        this.openHeading.style('opacity', 0).style('display', 'block');
        this.content.style('opacity', 0).style('display', 'block');
        this.closedHeading.morph()["with"]('fadeout', 100).then((function(_this) {
          return function() {
            _this.selection.style('width', '');
            _this.content.morph()["with"]('expandh', 100).and('fadein', 100).and(function() {
              return _this.openHeading.morph()["with"]('expandh', 100).and('fadein', 100).go(true);
            }).go(true);
            _this.emit('showend');
            return typeof cb === "function" ? cb() : void 0;
          };
        })(this)).go(true);
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

  SideCollapsible.prototype.hide = function(animate, cb) {
    var self;
    animate = animate != null ? animate : this.options.animate;
    if (this.visible) {
      this.visible = false;
      if (animate) {
        self = this;
        this.closedHeading.style('opacity', 0).style('display', 'block');
        this.content.morph()["with"]('collapseh', 100).and('fadeout', 100).and((function(_this) {
          return function() {
            return _this.openHeading.morph()["with"]('collapseh', 100).and('fadeout', 100).go(true);
          };
        })(this)).then((function(_this) {
          return function() {
            _this.selection.style('width', _this.closedSize + 'px');
            _this.openHeading.style('width', _this.closedSize + 'px');
            _this.content.style('width', _this.closedSize + 'px');
            _this.closedHeading.morph()["with"]('fadein', 100).go(true);
            _this.emit('hideend');
            return typeof cb === "function" ? cb() : void 0;
          };
        })(this)).go(true);
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

  SideCollapsible.prototype.toggle = function(animate) {
    animate = animate != null ? animate : this.options.animate;
    if (this.visible) {
      this.show(animate);
    } else {
      this.hide(animate);
    }
    return this;
  };

  return SideCollapsible;

})(hx.EventEmitter);

hx.SideCollapsible = SideCollapsible;
})();
(function(){var Sidebar,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Sidebar = (function(superClass) {
  extend(Sidebar, superClass);

  function Sidebar(selector, options) {
    var btn, opened;
    Sidebar.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    options = hx.merge.defined({
      headerSelector: '.hx-titlebar-header',
      contentSelector: '.hx-content',
      autoAddSidebarClass: true
    }, options);
    this.selection = hx.select(selector);
    opened = hx.select('body').width() > 320 + 240;
    this.selection.classed('hx-sidebar', true).classed('hx-openable', true).classed('hx-opened', opened);
    hx.select('body').classed('hx-sidebar-opened', opened).node().offsetHeight;
    if (options.autoAddSidebarClass) {
      hx.select('body').classed('hx-sidebar-page', true);
    }
    this.selection.classed('hx-animate', true);
    hx.select(options.contentSelector).classed('hx-animate', true);
    btn = hx.select(options.headerSelector).prepend('button').attr('type', 'button')["class"]('hx-titlebar-sidebar-button').html('<i class="fa fa-bars"></i>');
    btn.on('click', 'hx.sidebar', (function(_this) {
      return function() {
        return _this.toggle();
      };
    })(this));
  }

  Sidebar.prototype.toggle = function() {
    if (this.selection.classed('hx-opened')) {
      this.hide();
    } else {
      this.show();
    }
    return this;
  };

  Sidebar.prototype.hide = function() {
    this.selection.classed('hx-opened', false);
    hx.select('body').classed('hx-sidebar-opened', false);
    this.emit('hide');
    return this;
  };

  Sidebar.prototype.show = function() {
    this.selection.classed('hx-opened', true);
    hx.select('body').classed('hx-sidebar-opened', true);
    this.emit('show');
    return this;
  };

  return Sidebar;

})(hx.EventEmitter);

hx.Sidebar = Sidebar;
})();
(function(){var Tabs, onTabSelected,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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

Tabs = (function(superClass) {
  extend(Tabs, superClass);

  function Tabs(selector) {
    var self;
    this.selector = selector;
    Tabs.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this.selected = -1;
    self = this;
    hx.select(this.selector).selectAll('.hx-tab').forEach(function(node, i) {
      return node.on('click', 'hx.tabs', function() {
        return onTabSelected(self, node.node(), i);
      });
    });
    this.select(0);
  }

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
(function(){var TimeSlider, zeroPad,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

zeroPad = hx.format.zeroPad(2);

TimeSlider = (function(superClass) {
  var maybeDateToMillis;

  extend(TimeSlider, superClass);

  function TimeSlider(selector, opts) {
    var max, min, options, start;
    if (opts == null) {
      opts = {};
    }
    min = opts.min != null ? maybeDateToMillis(opts.min) : (start = new Date(), start.setMilliseconds(0), start.setSeconds(0), start.setMinutes(0), start.setHours(0), (new Date(start.getTime())).getTime());
    max = opts.max != null ? maybeDateToMillis(opts.max) : min + 24 * 60 * 60 * 1000 - 1;
    options = hx.merge({
      renderer: function(slider, elem, value) {
        return hx.select(elem).text(slider.options.formatter(new Date(value)));
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
          return zeroPad(date.getHours()) + ':' + zeroPad(date.getMinutes());
        };
      }
    }
    TimeSlider.__super__.constructor.call(this, selector, options);
  }

  maybeDateToMillis = function(date) {
    if (date instanceof Date) {
      return date.getTime();
    } else {
      return date;
    }
  };

  TimeSlider.prototype.value = function(value) {
    var end, start;
    if (arguments.length > 0) {
      if (this.options.type === 'range') {
        start = value.start != null ? maybeDateToMillis(value.start) : void 0;
        end = value.end != null ? maybeDateToMillis(value.end) : void 0;
        TimeSlider.__super__.value.call(this, {
          start: start,
          end: end
        });
      } else {
        TimeSlider.__super__.value.call(this, maybeDateToMillis(value));
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

  TimeSlider.prototype.min = function(min) {
    if (arguments.length > 0) {
      return TimeSlider.__super__.min.call(this, maybeDateToMillis(min));
    } else {
      return new Date(TimeSlider.__super__.min.call(this));
    }
  };

  TimeSlider.prototype.max = function(max) {
    if (arguments.length > 0) {
      return TimeSlider.__super__.max.call(this, maybeDateToMillis(max));
    } else {
      return new Date(TimeSlider.__super__.max.call(this));
    }
  };

  return TimeSlider;

})(hx.Slider);

hx.TimeSlider = TimeSlider;
})();
(function(){var Tree, format, formatIcon, recurseUpTree;

formatIcon = (function(_this) {
  return function(node, iconElement, animate) {
    var children, open;
    children = hx.select(node).select('.hx-tree-node-children');
    if (!children.selectAll('.hx-tree-node').empty()) {
      open = children.style('display') === 'block';
      hx.select(node).classed('hx-tree-node-open', open);
      if (animate) {
        return hx.select(iconElement).select('i').morph().then(open ? 'rotate-90' : 'rotate-0').go(true);
      }
    }
  };
})(this);

format = function(tree, element, animate) {
  var elem, innerElem, newElem, openAllOrToggle, parent, selection, showDisabled, toggle;
  toggle = (function(_this) {
    return function(iconElement) {
      var display, selection;
      selection = hx.select(element).select('.hx-tree-node-children');
      display = selection.style('display') === 'none' ? 'block' : 'none';
      selection.style('display', display);
      return formatIcon(element, iconElement, tree.options.animate);
    };
  })(this);
  openAllOrToggle = (function(_this) {
    return function(iconElement) {
      var root, rootNode, selection;
      selection = hx.select(element).selectAll('.hx-tree-node-children');
      root = hx.select(element).select('.hx-tree-node-children');
      rootNode = root.node();
      if (root.style('display') === 'block') {
        return selection.forEach(function(node) {
          var parentNode;
          if (node !== rootNode) {
            if (node.style('display') !== 'block') {
              parentNode = node.node().parentNode;
              iconElement = hx.select(parentNode).select('.hx-tree-node-parent-icon').node();
              node.style('display', 'block');
              return formatIcon(parentNode, iconElement, tree.options.animate);
            }
          }
        });
      } else {
        return toggle(iconElement);
      }
    };
  })(this);
  showDisabled = hx.select(element.parentNode).selectAll('.hx-tree-node').select('.hx-tree-node-children').selectAll('.hx-tree-node').size() > 0;
  showDisabled = tree.options.hideDisabledButtons ? false : showDisabled;
  if (hx.select(element).select('.hx-tree-node-children').selectAll('.hx-tree-node').size() > 0 || showDisabled) {
    innerElem = hx.select(element).select('.hx-tree-node-parent');
    if (innerElem.size() > 0) {
      return innerElem.view('.hx-tree-node-parent-icon').enter(function() {
        var selection;
        selection = this.append('div');
        selection.attr('class', 'hx-tree-node-parent-icon').append('i').attr('class', 'fa fa-chevron-right hx-tree-node-state-icon');
        return selection.node();
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
      parent = hx.select(element);
      elem = parent.select(".hx-tree-node-content").node();
      newElem = parent.append("div").attr("class", "hx-tree-node-parent").node();
      newElem.appendChild(elem);
      selection = hx.select(newElem).append('div');
      return selection.attr('class', 'hx-tree-node-parent-icon hx-tree-node-parent-icon-disabled').append('i').attr('class', 'fa fa-chevron-right');
    }
  }
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

Tree = (function() {
  function Tree(selector1, options) {
    this.selector = selector1;
    hx.component.register(this.selector, this);
    this.options = hx.merge.defined({
      hideDisabledButtons: false,
      animate: true,
      renderer: function(elem, data) {
        return hx.select(elem).html(data);
      },
      items: []
    }, options);
    this.selection = hx.select(this.selector).classed('hx-openable', true);
    if ((this.options.items != null) && this.options.items.length > 0) {
      this.items(this.options.items);
    }
    this.refresh(false);
  }

  Tree.prototype.refresh = function(animate) {
    animate = animate != null ? animate : this.options.animate;
    this.selection.selectAll('.hx-tree-node').forEach((function(_this) {
      return function(d) {
        return format(_this, d.node(), animate);
      };
    })(this));
    return this;
  };

  Tree.prototype.renderer = function(render) {
    if (render != null) {
      this.options.renderer = render;
      return this;
    } else {
      return this.options.renderer;
    }
  };

  Tree.prototype.items = function(data) {
    var self, setup, setupNodeList;
    if (data != null) {
      self = this;
      this.options.items = data;
      setup = function(element, data) {
        var content, parentContent;
        if ((data.children != null) && data.children.length > 0) {
          parentContent = hx.select(element).append('div').attr('class', 'hx-tree-node-parent').append('div').attr('class', 'hx-tree-node-content');
          self.options.renderer(parentContent.node(), data);
          content = hx.select(element).append('div').attr('class', 'hx-tree-node-children');
          return setupNodeList(content, data.children);
        } else {
          content = hx.select(element).append('div').attr('class', 'hx-tree-node-content');
          return self.options.renderer(content.node(), data);
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
      this.refresh(false);
      return this;
    } else {
      return this.options.items;
    }
  };

  Tree.prototype.show = function(animate, node) {
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

  Tree.prototype.hide = function(animate, node) {
    var childArr, nodeSel;
    if (node != null) {
      nodeSel = hx.select(node);
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

})();

hx.Tree = Tree;

hx.initializeTrees = function(selector) {
  return hx.selectAll(selector).map(function(d) {
    return new Tree(d);
  });
};
})();})();