/*
  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                        |___/             |__/
 
 ----------------------------------------------------
 
 Version: 1.3.2
 Theme: hexagon-light
 Modules:
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
   icon
   spinner
   view
   sort
   component
   morphs
   click-detector
   base
   modal
   notify
   filter
   form
   dropdown
   collapsible
   palette
   format
   preferences
   button
   resize-events
   menu
   input-group
   date-localizer
   number-picker
   layout
   drag-container
   progress-bar
   plot
   sticky-table-headers
   picker
   button-group
   request
   table
   date-picker
   time-picker
   fluid
   tag-input
   morph-section
   titlebar
   slider
   autocomplete
   card
   color-picker
   color-scale
   crumbtrail
   data-table
   date-time-picker
   drawing
   error-pages
   fast-click
   file-input
   form-builder
   inline-editable
   inline-picker
   label
   logo
   meter
   notice
   paginator
   pivot-table
   side-collapsible
   sidebar
   tabs
   time-slider
   toggle
   tree
   user-facing-text
*/
(function(){
var hx = {"_": {}};
window.hx=hx;
hx.theme = {
  "set": {},
  "map": {},
  "list": {},
  "util": {},
  "eventEmitter": {},
  "color": {},
  "selection": {},
  "transition": {},
  "interpolate": {},
  "animate": {},
  "pointerEvents": {},
  "icon": {},
  "spinner": {
    "spinnerCol": "#00ADA8"
  },
  "view": {},
  "sort": {},
  "component": {},
  "morphs": {},
  "clickDetector": {},
  "base": {
    "defaultFontFamily": "'Open Sans', sans-serif",
    "headingFontFamily": "'Open Sans', sans-serif",
    "bodyBackgroundCol": "rgb(247, 247, 249)",
    "defaultTextCol": "#3D3D3D",
    "headingTextCol": "#3D3D3D",
    "inputBackgroundCol": "white",
    "inputBorderCol": "#DADADA",
    "inputTextCol": "#3D3D3D",
    "inputFocusBorderCol": "#00ADA8",
    "inputInvalidBorderCol": "#DE1A4A",
    "inputBorderRadius": "2px",
    "selectBackgroundCol": "#FAFAFA",
    "selectBorderCol": "#D8D8D8",
    "selectTextCol": "#3D3D3D",
    "selectFocusBorderCol": "#B5B5B5",
    "textSelectCol": "#B4B1B5",
    "linkCol": "#00ADA8",
    "dividerCol": "#D0D0D0",
    "dividerStyle": "solid",
    "defaultFontSize": "14px"
  },
  "modal": {
    "shadeCol": "rgba(0,0,0,0.5)",
    "backgroundCol": "#FFFFFF",
    "titleBackgroundCol": "#FFFFFF",
    "titleTextCol": "#3D3D3D",
    "titleFontSize": "1.17em",
    "shadowCol": "rgba(0, 0, 0, 0.5)",
    "borderRadius": "3px",
    "borderColor": "#D0D0D0",
    "boxShadow": "0 5px 15px rgba(0, 0, 0, 0.5)"
  },
  "notify": {
    "backgroundCol": "#FFFFFF",
    "textCol": "#3D3D3D",
    "borderCol": "#D0D0D0",
    "closeCol": "#939393",
    "closeHoverCol": "#3D3D3D",
    "pinnedCol": "#00ADA8",
    "pinnedHoverCol": "darken(desaturate($pinned-col, 5%), 10%)",
    "unpinnedCol": "#939393",
    "unpinnedHoverCol": "#3D3D3D",
    "defaultCol": "#FFFFFF",
    "infoCol": "#B36ABB",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "loadingCol": "#00ADA8",
    "containerBackgroundCol": "rgb(247, 247, 249)",
    "containerBorderCol": "transparent",
    "shadowCol": "rgba(0, 0, 0, 0.05)"
  },
  "filter": {},
  "form": {
    "errorTextCol": "#F7F7F9",
    "errorBackgroundCol": "#4A4E4E"
  },
  "dropdown": {
    "spacing": "0",
    "backgroundCol": "#FFFFFF",
    "shadowCol": "rgba(0, 0, 0, 0.05)",
    "borderCol": "#E7E7E7"
  },
  "collapsible": {
    "headingBackgroundCol": "#FAFAFA",
    "headingTextCol": "#3D3D3D",
    "toggleBackgroundCol": "#FFFFFF",
    "toggleTextCol": "#3D3D3D",
    "toggleHoverBackgroundCol": "#00ADA8",
    "toggleHoverTextCol": "white",
    "contentBorderCol": "''",
    "contentBackgroundCol": "#FFFFFF",
    "contentTextCol": "#3D3D3D",
    "shadowCol": "rgba(0, 0, 0, 0.05)"
  },
  "palette": {
    "defaultCol": "#FFFFFF",
    "actionCol": "#00ADA8",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "infoCol": "#B36ABB",
    "complementCol": "#F7F7F9",
    "contrastCol": "#4A4E4E",
    "lightTextCol": "#F3F3F3",
    "darkTextCol": "#3D3D3D",
    "disabledCol": "#FAFAFA",
    "disabledTextCol": "#939393"
  },
  "format": {},
  "preferences": {},
  "button": {
    "defaultCol": "#FFFFFF",
    "actionCol": "#00ADA8",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "infoCol": "#B36ABB",
    "complementCol": "#F7F7F9",
    "contrastCol": "#4A4E4E",
    "disabledCol": "#FAFAFA",
    "disabledTextCol": "#939393",
    "invertCol": "#FDFDFD",
    "invertTextCol": "gray",
    "invertHoverCol": "#F2F2F2",
    "invisibleTextCol": "#575757",
    "lightTextCol": "#F3F3F3",
    "darkTextCol": "#3D3D3D"
  },
  "resizeEvents": {},
  "menu": {
    "defaultCol": "#FFFFFF",
    "defaultHoverCol": "#F9F9F9",
    "actionCol": "#00ADA8",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "infoCol": "#B36ABB",
    "complementCol": "#F7F7F9",
    "contrastCol": "#4A4E4E",
    "disabledCol": "#FAFAFA",
    "disabledTextCol": "#939393",
    "lightTextCol": "#F3F3F3",
    "darkTextCol": "#3D3D3D",
    "defaultTextCol": "#3D3D3D",
    "collapsibleBackgroundCol": "#FDFDFD",
    "collapsibleTextCol": "#3D3D3D",
    "defaultHoverBorderCol": "transparent",
    "defaultBorderCol": "transparent",
    "borderWidth": "2px"
  },
  "inputGroup": {
    "inputBackgroundCol": "white",
    "inputBorderCol": "#DADADA",
    "inputInvalidOutlineCol": "#DE1A4A",
    "inputFocusBorderCol": "#00ADA8",
    "divBackgroundCol": "#FDFDFD",
    "divBorderCol": "#DADADA",
    "iconBackgroundCol": "#F9F9F9",
    "iconBorderCol": "#DADADA"
  },
  "dateLocalizer": {},
  "numberPicker": {},
  "layout": {
    "contentMaxWidth": "1200px",
    "contentBreakpoint": "1300px, 900px",
    "contentPadding": "1em",
    "margin": "0.3em",
    "namedClassMinWidth": "250px",
    "borderCol": "#D0D0D0",
    "contentBackgroundCol": "transparent"
  },
  "dragContainer": {
    "dragPlaceholderBorderCol": "#D0D0D0"
  },
  "progressBar": {
    "borderCol": "none",
    "borderWidth": "0",
    "defaultCol": "#FFFFFF",
    "actionCol": "#00ADA8",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "infoCol": "#B36ABB",
    "complementCol": "#F7F7F9",
    "contrastCol": "#4A4E4E",
    "backgroundCol": "rgba(227,227,227,0.3)"
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
    "negativeCol": "rgb(241,90,113)",
    "labelBackgroundCol": "#FDFDFD",
    "labelTextCol": "#3D3D3D",
    "tickTextCol": "#3D3D3D",
    "tickTextSize": "10px",
    "tickLineCol": "#D0D0D0",
    "axisLineCol": "#D0D0D0",
    "axisTitleTextCol": "#3D3D3D",
    "labelKeyTextCol": "#3D3D3D",
    "labelBorderCol": "#E7E7E7",
    "gridLineCol": "#E7E7E7",
    "pieSegmentTextCol": "rgba(255, 255, 255, 0.8)",
    "labelBoxShadow": "1px 1px 1px rgba(0, 0, 0, 0.25)",
    "labelHeaderBackgroundCol": "#FFFFFF",
    "labelHeaderBorderCol": "#D0D0D0"
  },
  "stickyTableHeaders": {
    "scrollIndicatorShadowColor": "rgba(0,0,0,0.5)"
  },
  "picker": {},
  "buttonGroup": {},
  "request": {},
  "table": {
    "headerBackgroundCol": "#FFFFFF",
    "headerTextCol": "#3D3D3D",
    "rowBackgroundCol": "rgb(247, 247, 249)",
    "rowHoverBackgroundCol": "#E4E4E4",
    "rowAltBackgroundCol": "#F3F3F3",
    "rowTextCol": "#3D3D3D",
    "rowAltTextCol": "#3D3D3D",
    "borderCol": "#E2E1E1"
  },
  "datePicker": {
    "todayBackgroundCol": "#FFFFFF",
    "lightTextCol": "#F3F3F3",
    "darkTextCol": "#3D3D3D",
    "dayHoverBackgroundCol": "#00ADA8",
    "rangeBackgroundCol": "#F9F9F9",
    "selectedBackgroundCol": "#00ADA8",
    "errorBackgroundCol": "#FCBFBF",
    "errorOutlineCol": "#DE1A4A",
    "dividerCol": "#D0D0D0",
    "headerTextCol": "#3D3D3D",
    "navigationIconCol": "#939393",
    "navigationIconHoverCol": "#3D3D3D",
    "inputBackgroundCol": "white",
    "dayBorderRadius": "2px",
    "outOfRangeCol": "#939393",
    "borderCol": "#DADADA",
    "iconCol": "white",
    "iconBackgroundCol": "#00ADA8"
  },
  "timePicker": {
    "errorBackgroundCol": "#FCBFBF",
    "errorOutlineCol": "#DE1A4A",
    "inputBackgroundCol": "white",
    "borderCol": "#DADADA",
    "iconCol": "white",
    "iconBackgroundCol": "#00ADA8"
  },
  "fluid": {},
  "tagInput": {
    "defaultCol": "#FFFFFF",
    "actionCol": "#00ADA8",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "infoCol": "#B36ABB",
    "lightTextCol": "#F3F3F3",
    "darkTextCol": "#3D3D3D",
    "complementCol": "#F7F7F9",
    "contrastCol": "#4A4E4E",
    "tagContainerBackgroundCol": "#FDFDFD",
    "disabledCol": "#FAFAFA",
    "disabledTextCol": "#939393",
    "borderCol": "#DADADA",
    "tagContainerBorderCol": "#E7E7E7"
  },
  "morphSection": {},
  "titlebar": {
    "defaultBackgroundCol": "#F8F8F8",
    "actionBackgroundCol": "#00ADA8",
    "positiveBackgroundCol": "#92BF17",
    "warningBackgroundCol": "#D69B24",
    "negativeBackgroundCol": "#EC3A65",
    "infoBackgroundCol": "#B36ABB",
    "titleFontFamily": "'Open Sans', sans-serif",
    "headingShadowCol": "rgba(0, 0, 0, 0.05)",
    "headingBorderBottomCol": "#D0D0D0",
    "headingBorderBottomWidth": "0",
    "titlebarTextCol": "#3D3D3D",
    "titlebarIconCol": "rgba(0, 0, 0, 0.3)",
    "titlebarIconHoverCol": "rgba(0, 0, 0, 0.6)",
    "linkbarBackgroundCol": "#FFFFFF",
    "linkTextCol": "#3D3D3D",
    "linkTextHoverCol": "#00ADA8",
    "linkBorderHoverCol": "#00ADA8",
    "linkBorderSelectedCol": "#D0DDEE",
    "mobileViewIconsBackgroundCol": "lighten($default-background-col, 5%)",
    "mobileViewIconsTextCol": "#3D3D3D",
    "mobileViewIconsTextHoverCol": "#3D3D3D",
    "titleFontSize": "1.7em",
    "titlebarHeight": "46px",
    "linkbarHeight": "40px",
    "titlebarMenuContextTextCol": "white",
    "iconTooltipBackgroundCol": "#4A4E4E",
    "iconTooltipTextCol": "#F7F7F9",
    "fontWeight": "100",
    "iconVerticalOffset": "12px",
    "iconBackgroundCol": "transparent",
    "contextTextCol": "#F3F3F3",
    "contextIconBackground": "#FFFFFF",
    "titlebarMenuContextBorderCol": "transparent",
    "titleTextCol": "#00ADA8",
    "titlebarContextIconCol": "rgba(255, 255, 255, 0.5)",
    "titlebarContextIconHoverCol": "rgba(255, 255, 255, 0.85)",
    "complementBackgroundCol": "#F7F7F9",
    "contrastBackgroundCol": "#4A4E4E"
  },
  "slider": {
    "backgroundCol": "#FDFDFD",
    "sliderBackgroundCol": "#DADADA",
    "rangeBackgroundCol": "#00ADA8",
    "innerBorderRadius": "20px",
    "sliderBorderRadius": "20px",
    "sliderLeftBorderRadius": "20px 0 0 20px",
    "sliderRightBorderRadius": "0 20px 20px 0",
    "rangeBorderRadius": "20px",
    "markerBorderRadius": "20px",
    "textCol": "#F7F7F9",
    "rangeHeight": "50%",
    "valueBackgroundCol": "#4A4E4E",
    "valueBorderRadius": "5px",
    "disabledBackgroundCol": "#BBBBBB",
    "sliderMarkerCol": "#E2E2E2",
    "borderRadius": "2px",
    "disabledCol": "#FAFAFA",
    "shadowCol": "transparent"
  },
  "autocomplete": {},
  "card": {
    "backgroundCol": "#FFFFFF",
    "borderCol": "#E7E7E7",
    "shadowCol": "rgba(0, 0, 0, 0.05)",
    "headerTextCol": "#3D3D3D",
    "headerBackgroundCol": "#FAFAFA",
    "sectionBorderCol": "#E7E7E7",
    "textCol": "#3D3D3D",
    "iconCol": "#3D3D3D",
    "actionHoverBackgroundCol": "#F3F3F3",
    "normalPadding": "14px",
    "smallPadding": "7px",
    "contextTextCol": "white"
  },
  "colorPicker": {},
  "colorScale": {},
  "crumbtrail": {},
  "dataTable": {
    "disabledRowBackgroundCol": "#FAFAFA",
    "disabledRowTextCol": "#939393",
    "noDataRowBackgroundCol": "transparent",
    "noDataRowTextCol": "#3D3D3D",
    "selectedRowBackgroundCol": "rgb(149, 216, 243)",
    "statusBarBackgroundCol": "#00ADA8",
    "statusBarTextCol": "white",
    "rowCollapsibleBackgroundCol": "#FFFFFF",
    "rowCollapsibleTextCol": "#3D3D3D",
    "compactRowShadowCol": "rgba(0, 0, 0, 0.05)",
    "footerShadowCol": "rgba(0, 0, 0, 0.05)",
    "compactRowBackgroundCol": "#FFFFFF",
    "compactRowTextCol": "#3D3D3D",
    "compactRowHoverBackgroundCol": "#FAFAFA",
    "compactRowHoverTextCol": "#3D3D3D",
    "loadingBackgroundCol": "rgba(255, 255, 255, 0.4)",
    "footerBackgroundCol": "#FFFFFF"
  },
  "dateTimePicker": {
    "borderCol": "#DADADA"
  },
  "drawing": {
    "sidebarBorderCol": "#E7E7E7",
    "sidebarTitleBackgroundCol": "#F9F9F9",
    "sidebarTitleTextCol": "#3D3D3D",
    "sidebarBackgroundCol": "transparent",
    "sidebarTextCol": "#3D3D3D"
  },
  "errorPages": {
    "shadowCol": "rgba(0, 0, 0, 0.05)",
    "backgroundCol": "#FFFFFF",
    "headingTextCol": "#00ADA8"
  },
  "fastClick": {},
  "fileInput": {},
  "formBuilder": {},
  "inlineEditable": {},
  "inlinePicker": {},
  "label": {
    "defaultCol": "#FFFFFF",
    "actionCol": "#00ADA8",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "infoCol": "#B36ABB",
    "complementCol": "#F7F7F9",
    "contrastCol": "#4A4E4E",
    "lightTextCol": "#F3F3F3",
    "darkTextCol": "#3D3D3D",
    "disabledCol": "#FAFAFA",
    "disabledTextCol": "#939393"
  },
  "logo": {},
  "meter": {},
  "notice": {
    "defaultCol": "#FAFAFA",
    "actionCol": "#00ADA8",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "infoCol": "#B36ABB",
    "complementCol": "#F7F7F9",
    "contrastCol": "#4A4E4E",
    "defaultBodyCol": "#FFFFFF",
    "actionBodyCol": "#0BBDB8",
    "positiveBodyCol": "#9ECA26",
    "warningBodyCol": "#E4AE41",
    "negativeBodyCol": "#EC426C",
    "infoBodyCol": "#B674BD",
    "complementBodyCol": "#FFFFFF",
    "contrastBodyCol": "#3E4444",
    "lightTextCol": "#F3F3F3",
    "darkTextCol": "#3D3D3D",
    "shadowCol": "rgba(0, 0, 0, 0.05)"
  },
  "paginator": {
    "arrowButton": "",
    "defaultButton": "hx-complement",
    "selectedButton": "hx-action"
  },
  "pivotTable": {},
  "sideCollapsible": {
    "headingBackgroundCol": "#FAFAFA",
    "headingTextCol": "#3D3D3D",
    "toggleBackgroundCol": "#FFFFFF",
    "toggleTextCol": "#3D3D3D",
    "toggleHoverBackgroundCol": "#00ADA8",
    "toggleHoverTextCol": "white",
    "contentBorderCol": "''",
    "contentBackgroundCol": "#FFFFFF",
    "shadowCol": "rgba(0, 0, 0, 0.05)"
  },
  "sidebar": {
    "animationDuration": "0.15s",
    "backgroundCol": "#FFFFFF",
    "selectedBackgroundCol": "#00ADA8",
    "selectedTextCol": "#F3F3F3",
    "titleFont": "'Open Sans', sans-serif",
    "titleBackgroundCol": "#FAFAFA",
    "titleTextCol": "#3D3D3D",
    "titlebarIconBackgroundCol": "#F8F8F8",
    "sectionTextCol": "#3D3D3D",
    "sectionHoverBackgroundCol": "#1DBFBB",
    "sectionHoverTextCol": "#F3F3F3",
    "collapsibleBorderCol": "transparent",
    "titlebarButtonBackgroundCol": "#F8F8F8",
    "titlebarButtonTextCol": "rgba(0, 0, 0, 0.3)",
    "titlebarButtonHoverTextCol": "rgba(0, 0, 0, 0.6)",
    "shadowCol": "rgba(0, 0, 0, 0.05)"
  },
  "tabs": {
    "backgroundCol": "#FDFDFD",
    "borderCol": "#D8D8D8",
    "tabBackgroundCol": "#FDFDFD",
    "textCol": "#3D3D3D",
    "tabTextCol": "#3D3D3D",
    "tabInactiveOpacity": "0.25",
    "tabActiveOpacity": "1",
    "defaultCol": "#9F9F9F",
    "actionCol": "#00ADA8",
    "positiveCol": "#92BF17",
    "warningCol": "#D69B24",
    "negativeCol": "#EC3A65",
    "infoCol": "#B36ABB",
    "complementCol": "#F7F7F9",
    "contrastCol": "#4A4E4E",
    "shadowCol": "rgba(0, 0, 0, 0.05)",
    "disabledCol": "#FAFAFA",
    "lightTextCol": "#F3F3F3",
    "darkTextCol": "#3D3D3D",
    "disabledTextCol": "#939393"
  },
  "timeSlider": {},
  "toggle": {
    "backgroundOffCol": "#D5D5D5;",
    "backgroundOnCol": "#D5D5D5;",
    "toggleOffCol": "#ABABAB",
    "toggleOnCol": "#B2BA32"
  },
  "tree": {
    "iconBackgroundCol": "#00ADA8",
    "iconBackgroundHoverCol": "#1DBFBB",
    "iconTextCol": "white",
    "iconTextHoverCol": "white",
    "itemBorderLeftCol": "#00ADA8",
    "iconDisabledBackgroundCol": "#FAFAFA",
    "iconDisabledTextCol": "#F0F0F0",
    "backgroundCol": "#FFFFFF",
    "shadowCol": "rgba(128, 128, 128, 0.17)",
    "iconDisabledCol": "#FAFAFA"
  },
  "userFacingText": {}
};
(function(){
var Set, checkPrefix, prefix, prefixChar, prefixString,
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
(function(){
var hx_extend, hx_merge, hx_parseHTML, scrollbarSize, supportsDate, supportsTouch, vendorPrefixes,
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
  console.warn.apply(console, [heading].concat(messages));
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

hx.debounce = function(duration, fn) {
  var timeout;
  timeout = void 0;
  return function() {
    var f;
    if (timeout) {
      clearTimeout(timeout);
    }
    f = function() {
      timeout = void 0;
      return fn();
    };
    return timeout = setTimeout(f, duration);
  };
};

hx.clamp = function(min, max, value) {
  return Math.min(max, Math.max(min, value));
};

hx.clampUnit = function(value) {
  return hx.clamp(0, 1, value);
};

hx.randomId = function(size, alphabet) {
  var _, alphabetSize, chars, v;
  if (size == null) {
    size = 16;
  }
  if (alphabet == null) {
    alphabet = 'ABCEDEF0123456789';
  }
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
  return values.reduce((function(a, b) {
    return a + b;
  }), 0);
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
  return typeof obj === 'object' && !hx.isArray(obj) && obj !== null;
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
  return x !== void 0 && x !== null;
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
  var ref;
  if (hx.isArray(obj)) {
    return obj.map(hx.clone);
  } else if (hx.isPlainObject(obj)) {
    return hx.merge({}, obj);
  } else if (obj instanceof hx.List) {
    return new hx.List(obj.entries().map(hx.clone));
  } else if (obj instanceof hx.Map) {
    return new hx.Map(obj.entries().map(function(arg) {
      var k, v;
      k = arg[0], v = arg[1];
      return [hx.clone(k), hx.clone(v)];
    }));
  } else if (obj instanceof hx.Set) {
    return new hx.Set(obj.keys().map(hx.clone));
  } else if (obj instanceof Date) {
    return new Date(obj.getTime());
  } else if (hx.isObject(obj) && obj !== null) {
    hx.consoleWarning("Trying to clone " + obj + " with constructor " + (obj != null ? (ref = obj.constructor) != null ? ref.name : void 0 : void 0) + ", it isn't really cloneable! Carrying on anyway.");
    return {};
  } else {
    return obj;
  }
};

hx.shallowClone = function(obj) {
  var ref;
  if (hx.isArray(obj)) {
    return obj.slice();
  } else if (hx.isPlainObject(obj)) {
    return hx.shallowMerge({}, obj);
  } else if (obj instanceof hx.List) {
    return new hx.List(obj.entries());
  } else if (obj instanceof hx.Map) {
    return new hx.Map(obj.entries());
  } else if (obj instanceof hx.Set) {
    return new hx.Set(obj.keys());
  } else if (obj instanceof Date) {
    return new Date(obj.getTime());
  } else if (hx.isObject(obj) && obj !== null) {
    hx.consoleWarning("Trying to shallow clone " + obj + " with constructor " + (obj != null ? (ref = obj.constructor) != null ? ref.name : void 0 : void 0) + ", it isn't really cloneable! Carrying on anyway.");
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

    /*
    istanbul ignore next:
    phantom/safari dont support create contextual fragment so use a slower
    method.
     */
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

hx.parentZIndex = function(node, findMax) {
  var check, res;
  check = function(node) {
    var index;
    index = Number(hx.select(node).style('z-index'));
    if (!isNaN(index) && index > 0) {
      return index;
    }
  };
  res = hx.checkParents(node, check, findMax);
  if (findMax) {
    return hx.max(res);
  } else {
    return res;
  }
};

hx.checkParents = function(node, check, returnArray) {
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

})();
(function(){
var BasicEventEmitter, EventEmitter;

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
    var ee;
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

})();
(function(){
var Color, componentToHex, fromString, hueToRGB, update;

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

  function Color() {
    this._ = {
      r: 0,
      g: 0,
      b: 0,
      h: 0,
      s: 0,
      l: 0,
      a: 1
    };
  }

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
          this._[prop] = hx.clamp(min, max, value);
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

  Color.prototype.hsl = function(arr) {
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

  Color.prototype.rgb = function(arr) {
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

  Color.prototype.saturate = function(amount) {
    return this.saturation(this._.s + (this._.s * amount));
  };

  Color.prototype.lighten = function(amount) {
    return this.lightness(this._.l + (this._.l * amount));
  };

  Color.prototype.fade = function(amount) {
    return this.alpha(this._.a + (this._.a * amount));
  };

  Color.prototype.mix = function(color, amount) {
    var a, b, g, r;
    if (amount == null) {
      amount = 0.5;
    }
    if (!hx.color.isColor(color)) {
      color = hx.color(color);
    }
    r = this._.r * (1 - amount) + color._.r * amount;
    g = this._.g * (1 - amount) + color._.g * amount;
    b = this._.b * (1 - amount) + color._.b * amount;
    a = this._.a * (1 - amount) + color._.a * amount;
    return this.rgb([r, g, b, a]);
  };

  Color.prototype.textCol = function() {
    var yiq;
    yiq = ((this.red() * 299) + (this.green() * 587) + (this.blue() * 114)) / 1000;
    if (yiq >= 128) {
      return 'black';
    } else {
      return 'white';
    }
  };

  Color.prototype.toString = function(type) {
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
        return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
      case 'rgba':
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
      case 'hsl':
        return "hsl(" + h + "," + s + "%," + l + "%)";
      case 'rgb':
        return "rgb(" + r + "," + g + "," + b + ")";
      default:
        if (a !== 1) {
          return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        } else {
          return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
    }
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

  Color.prototype.clone = function() {
    return new Color().rgb(this.rgb());
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
    return (new Color).hsl(hsl);
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
  return (new Color).rgb(rgb);
};

hx.color = function() {
  if (arguments.length >= 3) {
    return (new Color).rgb([arguments[0], arguments[1], arguments[2], arguments[3]]);
  } else if (arguments.length === 1) {
    if (Array.isArray(arguments[0])) {
      return (new Color).rgb(arguments[0]);
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
(function(){
var ElementSet, Selection, augmenters, classed, closestParent, flattenNodes, getHexagonElementDataObject, getMatches, getMethod, matchPolyfill, namespaces, reformed, select, selectAll, selectSingle, shallowSelectAll, shallowSelectSingle;

namespaces = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};

getMethod = function(node, methodName) {
  if (node === window) {
    return window[methodName];
  } else if (node instanceof Document) {
    return Document.prototype[methodName];
  } else {
    return Element.prototype[methodName];
  }
};

matchPolyfill = function(selector) {
  var matchingNodes, node;
  node = this;
  matchingNodes = (node.document || node.ownerDocument).querySelectorAll(selector);
  return [].slice.call(matchingNodes).indexOf(node) > -1;
};

getMatches = function(node) {
  return node.matches || hx.vendor(node, 'matchesSelector') || matchPolyfill;
};

selectSingle = function(selector, node) {
  return getMethod(node, 'querySelector').call(node, selector);
};

selectAll = function(selector, node) {
  return getMethod(node, 'querySelectorAll').call(node, selector);
};

shallowSelectSingle = function(selector, node) {
  var child, j, len, matchFn, ref;
  matchFn = getMatches(node);
  ref = node.children;
  for (j = 0, len = ref.length; j < len; j++) {
    child = ref[j];
    if (matchFn.call(child, selector)) {
      return child;
    }
  }
};

shallowSelectAll = function(selector, node) {
  var child, j, len, matchFn, matchingNodes, ref;
  matchFn = getMatches(node);
  matchingNodes = [];
  ref = node.children;
  for (j = 0, len = ref.length; j < len; j++) {
    child = ref[j];
    if (matchFn.call(child, selector)) {
      matchingNodes.push(child);
    }
  }
  return matchingNodes;
};

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

  Selection.prototype.shallowSelect = function(selector) {
    var s;
    if (!hx.isString(selector)) {
      hx.consoleWarning('Selection.selectAll was passed the wrong argument type', 'Selection.selectAll only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      s = new Selection(this.nodes.map(function(node) {
        return shallowSelectSingle(selector, node);
      }));
      s.singleSelection = this.singleSelection;
      return s;
    }
  };

  Selection.prototype.shallowSelectAll = function(selector) {
    if (!hx.isString(selector)) {
      hx.consoleWarning('Selection.selectAll was passed the wrong argument type', 'Selection.selectAll only accepts a string argument, you supplied:', selector);
      return new Selection([]);
    } else {
      return new Selection(flattenNodes(this.nodes.map(function(node) {
        return shallowSelectAll(selector, node);
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
    var j, k, len, len1, namespace, newNode, node, ref, ref1, results;
    if (element === void 0) {
      return [];
    }
    if (!(hx.isString(element) || (element instanceof Selection) || (element instanceof Element))) {
      hx.consoleWarning('Selection Api error when attaching element', 'Expecting an Element, Selection or string argument, you supplied:', element);
      return [];
    }
    if (!selection.singleSelection && (element instanceof Element || element instanceof Selection)) {
      hx.consoleWarning('Selection Api error when attaching element', 'You can not attach an existing element to a selection with multiple elements');
      return [];
    }
    if (selection.empty()) {
      hx.consoleWarning('Selection Api error when attaching element', 'You can not attach an element to an empty selection');
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
    var dir, element, newNodes, ns, s, singleSelection;
    if (reverse == null) {
      reverse = false;
    }
    singleSelection = selection.singleSelection;
    newNodes = hx.isArray(name) ? (singleSelection = false, dir = reverse ? -1 : 1, ns = (function() {
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
        node.innerHTML = html != null ? html : '';
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
      if (data.listenerNamesRegistered == null) {
        data.listenerNamesRegistered = new hx.Set;
      }
      if (!data.listenerNamesRegistered.has(name)) {
        handler = function(e) {
          return eventEmitter.emit(name, e);
        };
        data.listenerNamesRegistered.add(name);
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

  Selection.prototype.forEach = function(f) {
    this.nodes.map(function(node) {
      return select(node);
    }).forEach(f);
    return this;
  };

  Selection.prototype.map = function(f) {
    return reformed(this.singleSelection, this.nodes.map(function(node) {
      return select(node);
    }).map(f));
  };

  Selection.prototype.filter = function(f) {
    var s;
    s = new Selection(this.nodes.filter(function(node) {
      return f(select(node));
    }));
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

hx._.selection = {
  ElementSet: ElementSet
};

})();
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
(function(){
var addAugmentor, addAugmentorWithLocation, addAugmentorWithoutLocation;

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


(function(){
var View;

View = (function() {
  function View(rootSelection, selector1, defaultType) {
    var classes, elementType, self;
    this.rootSelection = rootSelection;
    this.selector = selector1;
    this.defaultType = defaultType;
    self = this;
    elementType = self.selector.split('.')[0];
    classes = self.selector.split('.').slice(1).join(' ');
    this["new"] = function(datum) {
      return this.append(elementType || self.defaultType)["class"](classes).node();
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
    var classString, classes, d, dataByKey, datum, enterSet, exitSet, i, j, k, l, len, len1, len2, len3, m, n, newNodeSet, node, nodeByKey, nodeData, nodes, o, p, ref, ref1, ref2, selectorContainsClasses, updateSet, viewEnterWarning;
    if (this.rootSelection.size()) {
      if (!hx.isArray(data)) {
        data = [data];
      }
      enterSet = [];
      updateSet = [];
      exitSet = [];
      nodes = this.rootSelection.selectAll(this.selector).nodes;
      if (key) {
        nodeByKey = new hx.Map;
        dataByKey = new hx.Map(data.map(function(datum) {
          return [key(datum), datum];
        }));
        for (l = 0, len = nodes.length; l < len; l++) {
          node = nodes[l];
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
          for (j = n = ref = i, ref1 = data.length - 1; ref <= ref1 ? n <= ref1 : n >= ref1; j = ref <= ref1 ? ++n : --n) {
            enterSet.push({
              datum: data[j]
            });
          }
        }
      }
      viewEnterWarning = function(element, selector) {
        return hx.consoleWarning("view enter fn returned", element, "! It didn't match selector", selector, ", so you may encounter odd behavior");
      };
      classes = this.selector.split('.');
      selectorContainsClasses = classes.length > 1;
      classString = classes.slice(1).join(' ');
      newNodeSet = enterSet.map((function(_this) {
        return function(d, i) {
          var element, hedo, isChild, isClassedCorrectly, ret;
          datum = d.datum;
          element = _this["new"].call(_this.rootSelection, d.datum, i);
          isChild = _this.rootSelection.node().contains(element);
          if (!isChild) {
            viewEnterWarning(element, _this.selector);
          } else if (selectorContainsClasses) {
            isClassedCorrectly = hx.select(element).classed(classString);
            if (!isClassedCorrectly) {
              viewEnterWarning(element, _this.selector);
            }
          }
          hedo = hx.select.getHexagonElementDataObject(element);
          hedo.datum = datum;
          return ret = {
            element: element,
            datum: d.datum
          };
        };
      })(this));
      for (i = o = 0, len2 = exitSet.length; o < len2; i = ++o) {
        d = exitSet[i];
        this.old.call(hx.select(d.element), d.datum, d.element, i);
      }
      ref2 = updateSet.concat(newNodeSet);
      for (i = p = 0, len3 = ref2.length; p < len3; i = ++p) {
        d = ref2[i];
        this.each.call(hx.select(d.element), d.datum, d.element, i);
      }
      return this;
    }
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
(function(){
var collator, compare, hasCollator, localeCompare,
  slice = [].slice;

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

hx.sortBy = function(arr, f) {
  var newArr;
  newArr = slice.call(arr);
  newArr.sort(function(left, right) {
    var fLeft, fRight;
    fLeft = f(left);
    fRight = f(right);
    return compare(fLeft, fRight);
  });
  return newArr;
};

hx.sort = function(arr) {
  return hx.sortBy(arr, function(x) {
    return x;
  });
};

hx.sort.compare = compare;

hx.sort.localeCompare = localeCompare;

})();
(function(){
hx.component = function(selector) {
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

hx.components.clear = function(selector) {
  var node;
  node = hx.select(selector).node();
  if (node.__hx__ == null) {
    node.__hx__ = {};
  }
  node.__hx__.components = [];
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

if (hx.Selection) {
  hx.Selection.prototype.component = function() {
    if (this.singleSelection) {
      if (this.nodes[0]) {
        return hx.component(this.nodes[0]);
      }
    } else {
      return this.nodes.map(hx.component);
    }
  };
  hx.Selection.prototype.components = function() {
    if (this.singleSelection) {
      if (this.nodes[0]) {
        return hx.components(this.nodes[0]);
      }
    } else {
      return this.nodes.map(hx.components);
    }
  };
}

})();
(function(){
var Delay, animateStyles, clearAndGet, getStyles, setStyles,
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

  ClickDetector.prototype.removeException = function(element) {
    this.exceptions.remove(element);
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
var Modal, getHeaderRender, getTitleRender, makeButtons, modalDialog, modalInput,
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
      closeWithShadeEnabled: true,
      closeButtonEnabled: true,
      titlebarRenderer: function(node) {
        return hx.select(node).text(this.title);
      },
      headerRenderer: function(node, titleNode, closeButtonNode) {
        return hx.select(node).add(titleNode).add(closeButtonNode);
      }
    }, options);
    this.contentContainer = null;
  }

  Modal.prototype.show = function(cb) {
    var body, closeButton, modal, modalContainer, ref, self, shade, title, titleContainer;
    if ((ref = document.activeElement) != null) {
      ref.blur();
    }
    body = hx.select('body').classed('hx-modal-open', true);
    shade = body.select('.hx-modal-shade');
    if (shade.empty()) {
      shade = body.append('div').attr('class', 'hx-modal-shade');
      shade.style('opacity', 0).morph()["with"]('fadein', 150).go();
    }
    body.select('.hx-modal-container').remove();
    modalContainer = body.append('div').attr('class', 'hx-modal-container');
    modal = modalContainer.append('div').attr('class', 'hx-modal');
    titleContainer = modal.append('div')["class"]('hx-modal-title-container hx-group hx-horizontal hx-header');
    title = hx.detached('div')["class"]('hx-modal-title');
    if (this.options.closeButtonEnabled) {
      closeButton = hx.detached('div').add(hx.detached('i')["class"]('hx-icon hx-icon-close'))["class"]('hx-modal-close hx-fixed').on('click', 'hx.modal', (function(_this) {
        return function() {
          return closeModal(_this, {
            cause: 'button'
          });
        };
      })(this));
    } else {
      if ((this.title == null) || this.title.length === 0) {
        titleContainer.classed('hx-modal-title-empty', true);
      }
    }
    if (this.options.closeWithShadeEnabled) {
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
    this.options.titlebarRenderer.call(this, title.node(), this);
    this.options.headerRenderer.call(this, titleContainer.node(), title.node(), closeButton != null ? closeButton.node() : void 0, this);
    this.contentContainer = modal.append('div').attr('class', 'hx-modal-content');
    if (this.setup) {
      this.setup(this.contentContainer.node(), this);
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

getTitleRender = function(icon) {
  return function(elem, modal) {
    elem = hx.select(elem);
    if (icon != null) {
      elem.append('i')["class"](icon);
    }
    return elem.append('span').text(this.title);
  };
};

getHeaderRender = function(titleClass) {
  return function(elem, title, button, modal) {
    return hx.select(elem).classed('hx-background-' + titleClass, true).add(title).add(button);
  };
};

modalDialog = function(title, message, callback, options) {
  var modal, setup;
  options = hx.merge.defined({
    callback: void 0,
    buttons: [
      {
        text: 'Cancel',
        icon: 'hx-icon hx-icon-close',
        value: false,
        classes: 'hx-btn hx-negative'
      }, {
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
    container = hx.select(element);
    message = container.append('div')["class"]('hx-modal-message').text(message);
    buttonContainer = container.append('div')["class"]('hx-modal-buttons');
    return makeButtons(buttonContainer, options.buttons, this, callback);
  };
  modal = new Modal(title, setup, {
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

modalInput = function(title, message, callback, options) {
  var modal, setup;
  options = hx.merge.defined({
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
      }, {
        text: 'Confirm',
        icon: 'hx-icon hx-icon-check',
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

hx.Modal = Modal;

hx.modal = {
  dialog: modalDialog,
  input: modalInput
};

})();
(function(){
var Notification, NotificationManager, inbuiltNotificationManager, nextId, redraw, removeNotification, setupNotification, startTimeout, togglePin, updatePinnedStatus;

setupNotification = function(notification, selection) {
  if ((notification.options.icon != null) && notification.options.icon.length > 0) {
    selection.append('div')["class"]('hx-notification-icon-container hx-section hx-fixed hx-no-margin').append('i')["class"]('hx-notification-icon ' + notification.options.icon);
  }
  selection.append('div')["class"]('hx-notification-text hx-section hx-no-margin').text(notification.message);
  if (notification.options.pinnable) {
    notification.domPin = selection.append('div')["class"]('hx-notification-icon-container hx-notification-pin hx-section hx-fixed hx-no-margin').on('click', 'hx.notify', function() {
      return togglePin(notification);
    });
    notification.domPin.append('i').attr('class', 'hx-icon hx-icon-thumb-tack');
    updatePinnedStatus(notification);
  }
  return selection.append('div')["class"]('hx-notification-icon-container hx-notification-close hx-section hx-fixed hx-no-margin').on('click', 'hx.notify', function() {
    return notification.close();
  }).append('i')["class"]('hx-icon hx-icon-close');
};

nextId = function(manager) {
  return manager.currentId++;
};

redraw = function(manager) {
  var container, selection, view;
  selection = hx.select(manager.selector);
  container = selection.select('#' + manager.uniqueId);
  if (container.empty()) {
    container = selection.append('div')["class"]('hx-notification-container').attr('id', manager.uniqueId);
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
    this.uniqueId = 'hx-notify-' + hx.randomId();
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
      icon: 'hx-icon hx-icon-info',
      cssclass: 'hx-info'
    }, options));
  };

  NotificationManager.prototype.warning = function(message, options) {
    if (options == null) {
      options = {};
    }
    return this.notify(message, hx.merge({
      icon: 'hx-icon hx-icon-warning',
      cssclass: 'hx-warning'
    }, options));
  };

  NotificationManager.prototype.negative = function(message, options) {
    if (options == null) {
      options = {};
    }
    return this.notify(message, hx.merge({
      icon: 'hx-icon hx-icon-error',
      cssclass: 'hx-negative'
    }, options));
  };

  NotificationManager.prototype.positive = function(message, options) {
    if (options == null) {
      options = {};
    }
    return this.notify(message, hx.merge({
      icon: 'hx-icon hx-icon-check',
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
(function(){
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
(function(){
var getValidationMessage, validateForm;

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
  hx.select(form).selectAll('.hx-form-error').remove();
  errors = [];
  for (i = j = 0, ref = form.children.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    if (form.children[i].nodeName.toLowerCase() === 'div') {
      element = form.children[i].children[1];
      if (element.nodeName.toLowerCase() === 'input' || element.nodeName.toLowerCase() === 'textarea') {
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
(function(){
var Dropdown, calculateDropdownPosition, checkFixedPos, dropdownAnimateSlideDistance,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

dropdownAnimateSlideDistance = 8;

checkFixedPos = function(node) {
  if (hx.select(node).style('position') === 'fixed') {
    return true;
  }
};

calculateDropdownPosition = function(alignments, selectionRect, dropdownRect, windowRect, ddMaxHeight, scrollbarWidth) {
  var direction, x, y;
  direction = alignments[1] === alignments[3] && alignments[0] !== alignments[2] ? alignments[0] === 'l' ? 'left' : 'right' : alignments[3] === 't' ? 'down' : 'up';
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
  if (direction === 'down' || direction === 'up') {
    x = hx.clamp(0, windowRect.width - dropdownRect.width, x);
  } else {
    y = hx.clamp(0, windowRect.height - dropdownRect.height, y);
  }
  if (direction === 'down' && y > windowRect.height - dropdownRect.height && selectionRect.y - dropdownRect.height > 0) {
    direction = 'up';
    y = selectionRect.y - dropdownRect.height;
    if (alignments[1] === alignments[3]) {
      y += selectionRect.height;
    }
  } else if (direction === 'up' && y < 0 && selectionRect.y + selectionRect.height + dropdownRect.height < windowRect.height) {
    direction = 'down';
    y = selectionRect.y + selectionRect.height;
    if (alignments[1] === alignments[3]) {
      y -= selectionRect.height;
    }
  } else if (direction === 'right' && x > windowRect.width - dropdownRect.width && selectionRect.x - dropdownRect.width > 0) {
    direction = 'left';
    x = selectionRect.x - dropdownRect.width;
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

Dropdown = (function(superClass) {
  extend(Dropdown, superClass);

  function Dropdown(selector, dropdownContent, options) {
    var alignQuad, alignments, clickDetector, onclick, onmouseout, onmouseover, selection, setupDropdown;
    Dropdown.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    this.options = hx.merge.defined({
      mode: 'click',
      align: 'lblt',
      spacing: void 0,
      matchWidth: true,
      ddClass: ''
    }, options);
    setupDropdown = (function() {
      switch (false) {
        case !hx.isString(dropdownContent):
          return function(node) {
            return hx.select(node).html(dropdownContent);
          };
        case !hx.isFunction(dropdownContent):
          return function(node) {
            return dropdownContent(node);
          };
        default:
          hx.consoleWarning('dropdown: dropdownContent is not a valid type. dropdownContent: ', dropdownContent);
          return function() {};
      }
    })();
    clickDetector = new hx.ClickDetector;
    clickDetector.on('click', 'hx.dropdown', (function(_this) {
      return function() {
        return _this.hide();
      };
    })(this));
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
    alignments = alignQuad.split('');
    onclick = (function(_this) {
      return function() {
        return _this.toggle();
      };
    })(this);
    onmouseover = (function(_this) {
      return function() {
        return _this.show();
      };
    })(this);
    onmouseout = (function(_this) {
      return function() {
        return _this.hide();
      };
    })(this);
    selection = hx.select(selector);
    this._ = {
      setupDropdown: setupDropdown,
      clickDetector: clickDetector,
      alignments: alignments,
      onclick: onclick,
      onmouseover: onmouseover,
      onmouseout: onmouseout,
      visible: false,
      dropdown: void 0,
      selection: selection,
      useScroll: false
    };
    if (this.options.mode === 'click' || this.options.mode === 'hover') {
      selection.on('click', 'hx.dropdown', onclick);
    }
    if (this.options.mode === 'hover') {
      selection.on('mouseover', 'hx.dropdown', onmouseover);
      selection.on('mouseout', 'hx.dropdown', onmouseout);
    }
  }

  Dropdown.prototype.addException = function(node) {
    this._.clickDetector.addException(node);
    return this;
  };

  Dropdown.prototype.removeException = function(node) {
    this._.clickDetector.removeException(node);
    return this;
  };

  Dropdown.prototype.toggle = function(cb) {
    if (this.isOpen()) {
      this.hide(cb);
    } else {
      this.show(cb);
    }
    return this;
  };

  Dropdown.prototype.show = function(cb) {
    var _, ddMaxHeight, dropdownRect, parentFixed, parentZIndex, rect, ref, x, y;
    _ = this._;
    if (!_.visible) {
      _.visible = true;
      _.dropdown = hx.select(hx._.dropdown.attachToSelector).append('div').attr('class', 'hx-dropdown');
      if (this.options.ddClass.length > 0) {
        _.dropdown.classed(this.options.ddClass, true);
      }
      _.setupDropdown(_.dropdown.node());
      _.clickDetector.removeAllExceptions();
      _.clickDetector.addException(_.dropdown.node());
      _.clickDetector.addException(_.selection.node());
      _.dropdown.style('display', 'block');
      rect = _.selection.box();
      dropdownRect = _.dropdown.box();
      ddMaxHeight = _.dropdown.style('max-height').replace('px', '');
      parentFixed = hx.checkParents(_.selection.node(), checkFixedPos);
      parentZIndex = hx.parentZIndex(_.selection.node(), true);
      ref = calculateDropdownPosition(_.alignments, {
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
      }, ddMaxHeight, hx.scrollbarSize()), x = ref.x, y = ref.y;
      if (!parentFixed) {
        x += window.scrollX;
        y += window.scrollY;
      }
      if (parentZIndex > 0) {
        _.dropdown.style('z-index', parentZIndex + 1);
      }
      if (parentFixed) {
        _.dropdown.style('position', 'fixed');
      }
      if (this.options.matchWidth) {
        _.dropdown.style('min-width', rect.width + 'px');
      }
      _.dropdown.style('left', x + 'px').style('top', (y + dropdownAnimateSlideDistance) + 'px').style('height', '0px').style('opacity', 0).style('margin-top', this.options.dropdown).morph()["with"]('fadein', 150).and('expandv', 150).and((function(_this) {
        return function() {
          return _.dropdown.animate().style('top', y + 'px', 150);
        };
      })(this)).then((function(_this) {
        return function() {
          if (_.useScroll && (_.dropdown != null)) {
            _.dropdown.style('overflow-y', 'auto');
          }
          _this.emit('showend');
          return typeof cb === "function" ? cb() : void 0;
        };
      })(this)).go();
      this.emit('showstart');
      this.emit('change', true);
    }
    return this;
  };

  Dropdown.prototype.hide = function(cb) {
    var _;
    _ = this._;
    if (_.visible) {
      _.visible = false;
      this.emit('hidestart');
      this.emit('change', false);
      this.emit('hideend');
      if (typeof cb === "function") {
        cb();
      }
      _.dropdown.remove();
      _.dropdown = void 0;
    }
    return this;
  };

  Dropdown.prototype.isOpen = function() {
    return this._.visible;
  };

  Dropdown.prototype.cleanUp = function() {
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

})(hx.EventEmitter);

hx.Dropdown = Dropdown;

hx._.dropdown = {
  attachToSelector: 'body',
  calculateDropdownPosition: calculateDropdownPosition
};

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
        header.prepend('i')["class"]('hx-icon hx-icon-chevron-right hx-collapsible-icon');
      } else {
        toggleBtn.select('i').remove();
        toggleBtn.prepend('i')["class"]('hx-icon hx-icon-chevron-right hx-collapsible-icon');
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
  return hx.selectAll(selector).nodes.map(function(d) {
    return new Collapsible(d, options);
  });
};

})();
(function(){
var context, contexts, flatSelect, paletteContexts;

contexts = ['action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast'];

paletteContexts = ['default', 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast'];

hx.palette = {};

flatSelect = function(selector) {
  if (selector instanceof hx.Selection) {
    return selector;
  } else {
    return hx.select(selector);
  }
};

context = function(contextArray, contextPrefix) {
  var mappedContexts;
  mappedContexts = contextArray.map(function(context) {
    return contextPrefix + "-" + context;
  }).join(' ');
  return function(selector, context) {
    var i, len, selection;
    selection = flatSelect(selector);
    if (arguments.length > 1) {
      selection.classed(mappedContexts, false);
      if (contextArray.indexOf(context) !== -1) {
        selection.classed(contextPrefix + "-" + context, true);
      } else if (context) {
        hx.consoleWarning(context + " is not a known context! Accepted values are " + (contextArray.join(', ')));
      }
      return selection;
    } else {
      for (i = 0, len = paletteContexts.length; i < len; i++) {
        context = paletteContexts[i];
        if (selection.classed(contextPrefix + "-" + context)) {
          return context;
        }
      }
      return void 0;
    }
  };
};

hx.palette.context = context(contexts, 'hx');

hx.palette.textContext = context(paletteContexts, 'hx-text');

hx.palette.backgroundContext = context(paletteContexts, 'hx-background');

hx.palette.borderContext = context(paletteContexts, 'hx-border');

})();
(function(){
var formatExp, formatFixed, formatRound, formatSI, precision, roundPrecision, siSuffixes, strictCheck, zeroPad;

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
(function(){
var LocalStoragePreferencesStore, Preferences, defaultTimezoneList, localeList, lookupLocale,
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

defaultTimezoneList = ['UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:30', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:30', 'UTC-04:00', 'UTC-03:30', 'UTC-03:00', 'UTC-02:00', 'UTC-01:00', 'UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00', 'UTC+03:30', 'UTC+04:00', 'UTC+04:30', 'UTC+05:00', 'UTC+05:30', 'UTC+05:45', 'UTC+06:00', 'UTC+06:30', 'UTC+07:00', 'UTC+08:00', 'UTC+08:30', 'UTC+08:45', 'UTC+09:00', 'UTC+09:30', 'UTC+10:00', 'UTC+10:30', 'UTC+11:00', 'UTC+12:00', 'UTC+12:45', 'UTC+13:00', 'UTC+14:00'];

LocalStoragePreferencesStore = {
  save: function(prefs, cb) {
    localStorage.setItem('hx_preferences', prefs);
    return cb();
  },
  load: function(cb) {
    return cb(void 0, localStorage.getItem('hx_preferences'));
  }
};

lookupLocale = function(locale) {
  return localeList.filter(function(l) {
    return l.value.toLowerCase() === locale.toLowerCase();
  })[0];
};

Preferences = (function(superClass) {
  var option;

  extend(Preferences, superClass);

  function Preferences() {
    var defaultLocaleId, guessedMomentTimezone, modal, ref, setupModal;
    Preferences.__super__.constructor.apply(this, arguments);
    setupModal = (function(_this) {
      return function(element) {
        var locale, localeAutocompleteElement, localeSection, ref, saveButton, supportedLocales, timezone, timezoneAutocompleteElement, timezoneSection;
        locale = _this.locale();
        timezone = _this.timezone();
        localeAutocompleteElement = hx.detached('input');
        localeAutocompleteElement.value((ref = lookupLocale(locale)) != null ? ref.full : void 0);
        supportedLocales = localeList.map(function(l) {
          var ref1;
          return {
            value: l.value,
            full: l.full,
            disabled: !(ref1 = l.value, indexOf.call(_this._.supportedLocales, ref1) >= 0)
          };
        });
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
        new hx.AutoComplete(timezoneAutocompleteElement.node(), _this._.supportedTimezones, {
          showOtherResults: true,
          mustMatch: true
        }).on('change', function(value) {
          return timezone = value;
        });
        timezoneSection = hx.detached('div').add(hx.detached('label').text('Time Zone')).add(timezoneAutocompleteElement);
        saveButton = hx.detached('button')["class"]('hx-btn hx-positive').add(hx.detached('i')["class"]('hx-icon hx-icon-check')).add(hx.detached('span').text(' Save')).on('click', function() {
          _this.locale(locale);
          _this.timezone(timezone);
          return _this.save(function(err) {
            if (err) {
              return hx.notify.negative(err);
            } else {
              hx.notify.positive("Preferences Saved");
              return modal.hide();
            }
          });
        });
        return hx.select(element).append('div')["class"]('hx-form').add(localeSection).add(timezoneSection).add(saveButton);
      };
    })(this);
    modal = new hx.Modal('Preferences', setupModal);
    this._ = {
      backingStore: LocalStoragePreferencesStore,
      supportedTimezones: defaultTimezoneList,
      supportedLocales: localeList.map(function(v) {
        return v.value;
      }),
      timezoneOffsetLookup: function(timezone, datestamp) {
        var stampParts;
        stampParts = timezone.replace('UTC', '').replace('+', '').replace('-0', '-').split(':').map(Number);
        return stampParts[0] + (stampParts[0] >= 0 ? stampParts[1] / 60 : -(stampParts[1] / 60));
      },
      preferences: {},
      modal: modal
    };
    defaultLocaleId = (typeof moment !== "undefined" && moment !== null ? moment.locale() : void 0) || navigator.language;
    if (!(hx.isString(defaultLocaleId) && lookupLocale(defaultLocaleId))) {
      defaultLocaleId = 'en';
    }
    this.locale(defaultLocaleId);
    guessedMomentTimezone = typeof moment !== "undefined" && moment !== null ? (ref = moment.tz) != null ? ref.guess() : void 0 : void 0;
    if (guessedMomentTimezone != null) {
      this.supportedTimezones(moment.tz.names());
      this.timezoneOffsetLookup(function(timezone, datestamp) {
        return -(moment.tz.zone(timezone).offset(timestamp) / 60);
      });
      this.timezone(guessedMomentTimezone);
    } else {
      this.timezone('UTC+00:00');
    }
  }

  Preferences.prototype.timezone = function(timezone) {
    if (arguments.length > 0) {
      if (hx.isString(timezone) && this._.supportedTimezones.indexOf(timezone) !== -1) {
        if (this._.preferences['timezone'] !== timezone) {
          this._.preferences['timezone'] = timezone;
          this.emit('timezonechange', timezone);
        }
      } else {
        hx.consoleWarning('preferences.timezone:', timezone + ' is not a valid timezone');
      }
      return this;
    } else {
      return this._.preferences['timezone'];
    }
  };

  Preferences.prototype.locale = function(locale) {
    var localeObject;
    if (arguments.length > 0) {
      if (hx.isString(locale) && (localeObject = lookupLocale(locale))) {
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

  option = function(name) {
    return function(value) {
      if (arguments.length > 0) {
        this._[name] = value;
        return this;
      } else {
        return this._[name];
      }
    };
  };

  Preferences.prototype.supportedLocales = option('supportedLocales');

  Preferences.prototype.supportedTimezones = option('supportedTimezones');

  Preferences.prototype.timezoneOffsetLookup = option('timezoneOffsetLookup');

  Preferences.prototype.applyTimezoneOffset = function(date, offset) {
    var utc;
    if (offset == null) {
      offset = this._.timezoneOffsetLookup(this.timezone(), date.getTime()) || 0;
    }
    utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + offset * 60 * 60 * 1000);
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

(function(){
var addResizeListener, initializeResizeListeners, removeResizeListener;

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
(function(){
var Menu, MenuItem, addItem, checkEvent, dealWithEvent, emitItem, getAllItems, moveSelectionDown, moveSelectionUp, populateNode, setActive, setupInner, toggleCollapsible,
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
  if ((ref = menu.dropdown._.dropdown) != null) {
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
      if (((dNode = (ref3 = menu.dropdown._.dropdown) != null ? ref3.node() : void 0) != null) && !click) {
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
      content: item != null ? item.content : void 0,
      menu: menu
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
  extend(Menu, superClass);

  function Menu(selector, options) {
    var colorClass, dropdownContent, isInput, selection, self, targetElem;
    this.selector = selector;
    if (options == null) {
      options = {};
    }
    Menu.__super__.constructor.apply(this, arguments);
    this.options = hx.merge.defined({
      dropdownOptions: {
        align: void 0,
        mode: 'click',
        ddClass: '',
        disabled: false
      },
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
    if ((this.options.dropdownOptions.ddClass != null) && this.options.dropdownOptions.ddClass.length === 0) {
      colorClass = hx.palette.context(this.selector);
    }
    this.options.dropdownOptions.ddClass = 'hx-menu ' + (colorClass != null ? 'hx-' + colorClass : this.options.dropdownOptions.ddClass);
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
    this.dropdown = new hx.Dropdown(this.selector, dropdownContent, this.options.dropdownOptions);
    this.dropdown.on('showend', (function(_this) {
      return function() {
        var ddNode, node;
        if (_this.dropdown._.dropdown != null) {
          node = _this.dropdown._.dropdown.node();
          ddNode = hx.select(node);
          if (node.scrollTop < node.scrollHeight - node.clientHeight) {
            ddNode.style('width', ddNode.width() + hx.scrollbarSize() + 'px');
            if (_this.dropdown._.alignments[2] === 'r') {
              return ddNode.style('left', Math.max(0, ddNode.box().left - hx.scrollbarSize()) + 'px');
            }
          }
        }
      };
    })(this));
    selection = hx.select(this.selector);
    selection.off('click', 'hx.dropdown');
    selection.on('click', 'hx.menu', (function(_this) {
      return function() {
        var loading;
        if (!_this.options.disabled) {
          if (_this.dropdown.isOpen()) {
            return _this.dropdown.hide();
          } else {
            if (!_this.loading) {
              if ((_this.data != null) && hx.isFunction(_this.data)) {
                _this.loading = true;
                loading = selection.prepend('span');
                loading.append('i')["class"]('hx-menu-loading hx-icon hx-icon-spin hx-icon-spinner');
                _this.data(function(data) {
                  self.loading = false;
                  loading.remove();
                  return setupItems(self, data);
                });
              }
              return _this.dropdown.show();
            }
          }
        }
      };
    })(this));
    if (selection.node().nodeName.toLowerCase() === 'input') {
      isInput = true;
      targetElem = selection;
    }
    this.dropdown.on('showstart', 'hx.menu', function() {
      var ref;
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
      return (ref = self.dropdown._.dropdown) != null ? ref.on('click', 'hx.menu', function(e) {
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
      }) : void 0;
    });
    this.dropdown.pipe(this, 'dropdown');
    if (this.options.disabled) {
      this.disabled(this.options.disabled);
    }
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

  Menu.prototype.disabled = function(disabled) {
    if (disabled != null) {
      this.options.disabled = disabled;
      hx.select(this.selector).attr('disabled', disabled ? true : void 0).classed('hx-disabled', disabled);
      if (this.dropdown.isOpen() && disabled === true) {
        this.hide();
      }
      return this;
    } else {
      return !!this.options.disabled;
    }
  };

  return Menu;

})(hx.EventEmitter);

hx.Menu = Menu;

})();

(function(){
var DateTimeLocalizer, DateTimeLocalizerMoment, dateTimeLocalizer;

DateTimeLocalizer = (function() {
  var zeroPad;

  function DateTimeLocalizer() {}

  zeroPad = hx.format.zeroPad(2);

  DateTimeLocalizer.prototype.dateOrder = function() {
    return ['DD', 'MM', 'YYYY'];
  };

  DateTimeLocalizer.prototype.weekStart = function() {
    return 0;
  };

  DateTimeLocalizer.prototype.weekDays = function() {
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  };

  DateTimeLocalizer.prototype.todayText = function() {
    return 'Today';
  };

  DateTimeLocalizer.prototype.day = function(day, pad) {
    if (pad) {
      return zeroPad(day);
    } else {
      return day;
    }
  };

  DateTimeLocalizer.prototype.month = function(month, short) {
    if (short) {
      return zeroPad(month + 1);
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
    }
  };

  DateTimeLocalizer.prototype.year = function(year) {
    return year;
  };

  DateTimeLocalizer.prototype.date = function(date, useInbuilt) {
    if (useInbuilt) {
      return date.getFullYear() + '-' + zeroPad(date.getMonth() + 1) + '-' + zeroPad(date.getDate());
    } else {
      return zeroPad(date.getDate()) + '/' + zeroPad(date.getMonth() + 1) + '/' + date.getFullYear();
    }
  };

  DateTimeLocalizer.prototype.time = function(date, showSeconds) {
    var timeString;
    date = hx.preferences.applyTimezoneOffset(date);
    timeString = date.getHours() + ':' + zeroPad(date.getMinutes());
    if (showSeconds) {
      timeString += ':' + zeroPad(date.getSeconds());
    }
    return timeString;
  };

  DateTimeLocalizer.prototype.checkTime = function(time) {
    return !isNaN(time[0]) && !isNaN(time[1]) && !isNaN(time[2]);
  };

  DateTimeLocalizer.prototype.stringToDate = function(dateString, useInbuilt) {
    var allValid, day, daysValid, format, i, j, len, month, monthsValid, order, part, split, w, year, yearsValid;
    if (useInbuilt) {
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

  return DateTimeLocalizer;

})();

DateTimeLocalizerMoment = (function() {
  function DateTimeLocalizerMoment() {}

  DateTimeLocalizerMoment.prototype.dateOrder = function() {
    var date, dateCheck, dayIndex, i, j, monthIndex, ref, result, yearIndex;
    date = moment({
      year: 2003,
      month: 11,
      day: 22
    }).locale(hx.preferences.locale());
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

  DateTimeLocalizerMoment.prototype.weekStart = function() {
    return moment().weekday(0).toDate().getDay();
  };

  DateTimeLocalizerMoment.prototype.weekDays = function() {
    var dayDate, dayNames, i, j;
    dayDate = moment().weekday(0);
    dayDate.locale(hx.preferences.locale());
    dayNames = [dayDate.format('dd')];
    for (i = j = 0; j < 6; i = ++j) {
      dayNames.push(dayDate.add(1, 'd').format('dd'));
    }
    return dayNames;
  };

  DateTimeLocalizerMoment.prototype.todayText = function() {
    var i, j, ref, today, todayArr, tomorrow, tomorrowArr;
    today = moment({
      hour: 12,
      minute: 0,
      second: 0
    }).locale(hx.preferences.locale());
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

  DateTimeLocalizerMoment.prototype.day = function(day, pad) {
    return moment({
      day: day,
      month: 0
    }).locale(hx.preferences.locale()).format(pad ? 'DD' : 'D');
  };

  DateTimeLocalizerMoment.prototype.month = function(month, short) {
    return moment({
      month: month
    }).locale(hx.preferences.locale()).format(short ? 'MM' : 'MMM');
  };

  DateTimeLocalizerMoment.prototype.year = function(year) {
    return moment({
      year: year
    }).locale(hx.preferences.locale()).format('YYYY');
  };

  DateTimeLocalizerMoment.prototype.decade = function(start, end) {
    return this.year(start) + ' - ' + this.year(end);
  };

  DateTimeLocalizerMoment.prototype.date = function(date) {
    return moment(date).locale(hx.preferences.locale()).format('L');
  };

  DateTimeLocalizerMoment.prototype.time = function(date, showSeconds) {
    var format;
    date = hx.preferences.applyTimezoneOffset(date);
    format = showSeconds ? 'H:mm:ss' : 'H:mm';
    return moment(date).locale(hx.preferences.locale()).format(format);
  };

  DateTimeLocalizerMoment.prototype.checkTime = function(time) {
    return moment({
      hours: time[0],
      minutes: time[1],
      seconds: time[2]
    }).locale(hx.preferences.locale()).isValid();
  };

  DateTimeLocalizerMoment.prototype.stringToDate = function(dateString) {
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
        return moment(dateString, format, hx.preferences.locale()).toDate();
      } else {
        return new Date('Invalid Date');
      }
    } else {
      return new Date('Invalid Date');
    }
  };

  return DateTimeLocalizerMoment;

})();

dateTimeLocalizer = function() {
  if (typeof moment !== "undefined" && moment !== null) {
    return new DateTimeLocalizerMoment;
  } else {
    return new DateTimeLocalizer;
  }
};

hx.dateTimeLocalizer = dateTimeLocalizer;

})();
(function(){
var NumberPicker, checkValue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

checkValue = function(numberPicker, context) {
  var max, min, oldValue, value;
  value = oldValue = context.value();
  max = numberPicker.max();
  min = numberPicker.min();
  if (max !== void 0) {
    value = Math.min(value, max);
  }
  if (min !== void 0) {
    value = Math.max(value, min);
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
      max: void 0,
      disabled: false,
      value: 0
    }, options);
    this._ = {};
    container = hx.select(this.selector);
    select = container["class"]('hx-number-picker');
    button = select.append('button').attr('type', 'button')["class"]('hx-btn ' + this.options.buttonClass);
    button.append('i')["class"]('hx-icon hx-icon-chevron-up');
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
    button.append('i')["class"]('hx-icon hx-icon-chevron-down');
    button.on('click', 'hx.number-picker', (function(_this) {
      return function() {
        return _this.decrement();
      };
    })(this));
    if (this.options.max !== void 0) {
      this.max(this.options.max);
    }
    if (this.options.min !== void 0) {
      this.min(this.options.min);
    }
    if (this.options.disabled) {
      this.disabled(this.options.disabled);
    }
    this.selectInput.attr('data-value', this.options.value).value(this.options.value);
  }

  NumberPicker.prototype.value = function(value, screenValue) {
    var prevValue;
    if (arguments.length > 0) {
      prevValue = this.value();
      if (this._.max !== void 0 && value > this._.max) {
        value = this._.max;
      }
      if (this._.min !== void 0 && value < this._.min) {
        value = this._.min;
      }
      if (screenValue && isNaN(screenValue)) {
        this.selectInput.attr('type', 'text').attr('readonly', '');
      } else {
        this.selectInput.attr('type', 'number').node().removeAttribute('readonly');
      }
      this.selectInput.value(screenValue || value);
      this.selectInput.attr('data-value', value);
      if (prevValue !== value) {
        this.emit('change', {
          value: value
        });
      }
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
    var prevValue;
    prevValue = this.value();
    this.value(this.value() + 1);
    if (prevValue !== this.value()) {
      this.emit('increment');
    }
    return this;
  };

  NumberPicker.prototype.decrement = function() {
    var prevValue;
    prevValue = this.value();
    this.value(this.value() - 1);
    if (prevValue !== this.value()) {
      this.emit('decrement');
    }
    return this;
  };

  NumberPicker.prototype.disabled = function(disable) {
    var dis;
    if (disable != null) {
      this.options.disabled = disable;
      dis = disable ? true : void 0;
      hx.select(this.selector).selectAll('button').forEach(function(e) {
        return e.attr('disabled', dis);
      });
      return this.selectInput.attr('disabled', dis);
    } else {
      return this.options.disabled;
    }
  };

  return NumberPicker;

})(hx.EventEmitter);

hx.numberPicker = function(options) {
  var selection;
  selection = hx.detached('div');
  new NumberPicker(selection.node(), options);
  return selection;
};

hx.NumberPicker = NumberPicker;

})();

(function(){
var DragContainer, containerChildren, drag, endDrag, getGrid, startDrag,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

getGrid = function(container, elem) {
  var count, grid;
  grid = [];
  count = -1;
  containerChildren(container).forEach(function(e) {
    var box;
    e = hx.select(e);
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
    return endDrag(container, elem);
  } else if (e.event.which < 2) {
    hx.select(document).on('pointermove', 'hx.drag-container', function(e) {
      return drag(container, elem, controlElem, e);
    }).on('pointerup', 'hx.drag-container', function(e) {
      return endDrag(container, elem, e);
    });
    _.origPageYOffset = window.pageYOffset;
    _.origPageXOffset = window.pageXOffset;
    _.dragging = true;
    _.grid = getGrid(container);
    _.origWidth = elem.style('width').replace('px', '');
    _.origHeight = elem.style('height').replace('px', '');
    _.placeholder = elem.insertAfter(elem.clone(true).clear()).classed('hx-drag-placeholder', true);
    _.placeholder.style('height', _.origHeight + 'px').style('width', _.origWidth + 'px').style('max-height', _.origHeight + 'px').style('max-width', _.origWidth + 'px').style('min-height', _.origHeight + 'px').style('min-width', _.origWidth + 'px').append('div');
    elem.classed('hx-drag-current', true).style('width', _.origWidth + 'px');
    _.selectionBox = elem.box();
    _.controlBox = controlElem.box();
    _.containerBox = container.selection.box();
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
    controlOffsetX = _.controlBox.left + (_.controlBox.width / 2);
    controlOffsetY = _.controlBox.top + (_.controlBox.height / 2);
    selectionOffsetX = _.containerBox.left - _.selectionBox.left;
    selectionOffsetY = _.containerBox.top - _.selectionBox.top;
    scrollOffsetX = window.pageXOffset - _.origPageXOffset;
    scrollOffsetY = window.pageYOffset - _.origPageYOffset;
    xVal = e.x - selectionOffsetX - controlOffsetX + scrollOffsetX;
    yVal = e.y - selectionOffsetY - controlOffsetY + scrollOffsetY;
    elem.style('left', xVal + 'px');
    elem.style('top', yVal + 'px');
    if (!preventGridMove) {
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
            if (before) {
              box.elem.insertBefore(_.placeholder);
            } else {
              box.elem.insertAfter(_.placeholder);
            }
            if (_.options.resizeOnDrag) {
              _.placeholder.style('height', box.height + 'px').style('width', box.width + 'px').style('max-height', box.height + 'px').style('max-width', box.width + 'px').style('min-height', box.height + 'px').style('min-width', box.width + 'px');
              elem.style('width', _.placeholder.style('width'));
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
    hx.select(document).off('pointermove', 'hx.drag-container').off('pointerup', 'hx.drag-container');
    _.placeholder.insertAfter(elem);
    _.placeholder.remove();
    elem.style('top', '').style('left', '').style('width', '').classed('hx-drag-current', false);
    return container.emit('dragend', elem.node());
  }
};

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
  return items.filter(hx.defined);
};

DragContainer = (function(superClass) {
  extend(DragContainer, superClass);

  function DragContainer(selector, options) {
    DragContainer.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    this.selection = hx.select(selector).classed('hx-drag-container', true);
    options = hx.merge({
      lookup: function(node) {
        return hx.select(node).attr('data-id');
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

  DragContainer.prototype.setup = function() {
    this.selection.selectAll('.hx-drag-control').off('pointerdown', 'hx.drag-container');
    containerChildren(this).forEach((function(_this) {
      return function(elem) {
        var controlElem;
        elem = hx.select(elem);
        if (elem.classed('hx-drag-element')) {
          controlElem = hx.select(elem.select('.hx-drag-control').node() || elem.node());
          return controlElem.classed('hx-drag-control', true).on('pointerdown', 'hx.drag-container', function(evt) {
            if (!controlElem.classed('hx-drag-disabled')) {
              return startDrag(_this, elem, controlElem, evt);
            }
          });
        }
      };
    })(this));
    return this;
  };

  DragContainer.prototype.order = function(order) {
    var id, j, k, len, len1, map, node, ref;
    if (arguments.length > 0) {
      map = {};
      if (order == null) {
        order = this._.initialOrder;
      }
      ref = containerChildren(this);
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        map[this.lookup()(node)] = node;
      }
      for (k = 0, len1 = order.length; k < len1; k++) {
        id = order[k];
        this.selection.append(map[id]);
      }
      return this;
    } else {
      return containerChildren(this).map(this.lookup()).filter(hx.defined);
    }
  };

  DragContainer.prototype.lookup = function(fn) {
    if (fn != null) {
      this._.options.lookup = fn;
      return this;
    } else {
      return this._.options.lookup;
    }
  };

  return DragContainer;

})(hx.EventEmitter);

hx.dragContainer = function(options) {
  var selection;
  selection = hx.detached('div');
  new DragContainer(selection.node(), options);
  return selection;
};

hx.DragContainer = DragContainer;

})();
(function(){
var ProgressBar;

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

hx.progressBar = function(options) {
  var selection;
  selection = hx.detached('div');
  new ProgressBar(selection.node(), options);
  return selection;
};

hx.ProgressBar = ProgressBar;

})();
(function(){
var LTTBFeather, arcCurve, arcCurveMinimumRadius, boundLabel, createLabelPoint, createLinearGradient, dataAverage, extent, extent2, findLabel, inefficientSearch, makeLabelDetails, maxTriangle, optionSetterGetter, populateLegendSeries, search, splitAndFeather, splitData, stackSegments, svgCurve;

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

arcCurveMinimumRadius = function(startRadians, endRadians, padding) {
  var radians, theta;
  radians = endRadians - startRadians;
  theta = radians < Math.PI ? radians / 2 : Math.PI - radians / 2;
  return padding / 2 / Math.sin(theta);
};

arcCurve = function(x, y, innerRadius, outerRadius, startRadians, endRadians, padding, dontCurveCenter) {
  var pixelsToRadians, points, pointsRequired, pushPoints, radians;
  radians = endRadians - startRadians;
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
  pointsRequired = Math.min(100, Math.max(3, Math.floor(radians * Math.sqrt(outerRadius)) - 1));
  points = [];
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
      results.push(LTTBFeather(d, Math.floor(d.length * featherFactor)));
    }
    return results;
  } else {
    return splitData(data, defined);
  }
};

LTTBFeather = function(array, maxSize) {
  var bucket, bucketSize, data1, data2, i, j, newData, originalLength, ref;
  if (maxSize == null) {
    maxSize = 200;
  }
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
  if (xProperty == null) {
    xProperty = 'x';
  }
  if (yProperty == null) {
    yProperty = 'y';
  }
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
  gradientId = hx.randomId();
  hx.select(parent).select('.hx-linear-gradient').remove();
  linearGradient = hx.select(parent).append('linearGradient').attr('class', 'hx-linear-gradient').attr('id', gradientId).attr('gradientUnits', "userSpaceOnUse").attr('x1', 0).attr('x2', 0).attr('y1', series.axis.yScale.rangeMin).attr('y2', series.axis.yScale.rangeMax);
  values.forEach(function(value) {
    return linearGradient.append('stop').attr('offset', ((value.yValue - series.axis.yScale.domainMin) / (series.axis.yScale.domainMax - series.axis.yScale.domainMin) * 100) + '%').attr('stop-color', hx.color(value.color).alpha(1).toString()).attr('stop-opacity', hx.color(value.color).alpha());
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
    selection = this.append('g')["class"]('hx-legend-entry');
    selection.append('text');
    selection.append('rect');
    return selection.node();
  }).update(function(s, e, i) {
    this.select('text').text(hx.isFunction(s.title) ? s.title() : s.name).attr('y', i * 20 + 10).attr('x', 15);
    return this.select('rect').text(hx.isFunction(s.title) ? s.title() : s.name).attr('y', i * 20).attr('x', 0).attr('width', 10).attr('height', 10).attr('fill', s.legendColor ? s.legendColor() : s.color);
  }).apply(series);
  width = hx.max(selection.selectAll('text').nodes.map(function(node) {
    return node.getComputedTextLength();
  }));
  background.attr('width', width + 6 + 20);
  background.attr('x', -5);
  background.attr('height', series.length * 20);
  background.attr('y', -5);
  return selection;
};

optionSetterGetter = function(name) {
  return function(value) {
    if (arguments.length > 0) {
      this._.options[name] = value;
      return this;
    } else {
      return this._.options[name];
    }
  };
};

hx._.plot = {
  dataAverage: dataAverage,
  maxTriangle: maxTriangle,
  LTTBFeather: LTTBFeather,
  splitAndFeather: splitAndFeather
};

var Series,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Series = (function(superClass) {
  var defaultLabelValuesExtractor;

  extend(Series, superClass);

  defaultLabelValuesExtractor = function(series, dataPoint, xAccessor, yAccessor, xProperty, yProperty) {
    return [
      {
        name: series.axis.x.title(),
        value: dataPoint[xProperty + 'Label'] || (xAccessor ? xAccessor(dataPoint) : dataPoint.x),
        formatter: series.labelFormatter(xProperty) || series.axis.x.formatter()
      }, {
        name: series.axis.y.title(),
        value: dataPoint[yProperty + 'Label'] || (yAccessor ? yAccessor(dataPoint) : dataPoint.y),
        formatter: series.labelFormatter(yProperty) || series.axis.y.formatter()
      }
    ];
  };

  function Series(options) {
    var base;
    Series.__super__.constructor.apply(this, arguments);
    this._ = {
      options: hx.merge({
        title: void 0,
        data: void 0,
        labelsEnabled: true,
        labelRenderer: hx.plot.label.standard,
        labelInterpolated: false,
        labelFormatters: {},
        "class": '',
        type: void 0,
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

  Series.prototype.title = optionSetterGetter('title');

  Series.prototype.data = optionSetterGetter('data');

  Series.prototype.labelsEnabled = optionSetterGetter('labelsEnabled');

  Series.prototype.labelRenderer = optionSetterGetter('labelRenderer');

  Series.prototype.labelInterpolated = optionSetterGetter('labelInterpolated');

  Series.prototype.labelValuesExtractor = optionSetterGetter('labelValuesExtractor');

  Series.prototype.labelFormatter = function(name, value) {
    if (arguments.length > 1) {
      this._.options.labelFormatters[name] = value;
      return this;
    } else {
      return this._.options.labelFormatters[name];
    }
  };

  Series.prototype["class"] = optionSetterGetter('class');

  Series.prototype.getX = function(y) {
    var d, data, i;
    data = this.data();
    if (hx.isString(y)) {
      d = hx.find(data, function(d) {
        return d.y === y;
      });
      if (hx.defined(d)) {
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

  Series.prototype.getY = function(x, isDiscrete) {
    var d, data, i, x1, x2, y1, y2;
    data = this.data();
    if (hx.isString(x)) {
      d = hx.find(data, function(d) {
        return d.x === x;
      });
      if (hx.defined(d)) {
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

  Series.prototype.getLabelDetails = function(x, y) {};

  Series.prototype.updateSvg = function(element) {};

  Series.prototype.legendColor = function() {};

  return Series;

})(hx.EventEmitter);

var Axis, dimension;

dimension = function(axis, options) {
  var setterGetter, state;
  state = hx.merge({
    scaleType: 'linear',
    visible: true,
    formatter: hx.format.si(2),
    tickRotation: 0,
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

Axis = (function() {
  var scalePad, supportsGroup;

  function Axis(options) {
    var opts, ref;
    opts = hx.merge({
      x: {
        axisTickLabelPosition: 'bottom'
      },
      y: {
        axisTickLabelPosition: 'left'
      }
    }, options);
    this._ = {
      series: new hx.List
    };
    this.x = dimension(this, hx.merge({
      axisTickLabelPosition: 'bottom'
    }, options != null ? options.x : void 0));
    this.y = dimension(this, hx.merge({
      axisTickLabelPosition: 'left'
    }, options != null ? options.y : void 0));
    this.xScale = new LinearScale(0, 1, 0, 1);
    this.yScale = new LinearScale(0, 1, 0, 1);
    this.graph = null;
    this.xAxisSize = 50;
    this.xTitleHeight = 0;
    this.yAxisSize = 50;
    this.yTitleHeight = 0;
    if (options != null) {
      if ((ref = options.series) != null) {
        ref.forEach((function(_this) {
          return function(seriesObj) {
            return _this.addSeries(seriesObj.type, seriesObj.options);
          };
        })(this));
      }
    }
  }

  supportsGroup = function(series) {
    return series instanceof BarSeries || series instanceof LineSeries;
  };

  Axis.prototype.addSeries = function(series, options) {
    if (hx.isString(series)) {
      series = (function() {
        switch (series) {
          case 'line':
            return new LineSeries(options);
          case 'band':
            return new BandSeries(options);
          case 'bar':
            return new BarSeries(options);
          case 'scatter':
            return new ScatterSeries(options);
          case 'straight-line':
            return new StraightLineSeries(options);
          default:
            hx.consoleWarning(series + ' is not a valid series type');
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
      series = new LineSeries;
      this._.series.add(series);
      series.axis = this;
      return series;
    } else {
      hx.consoleWarning(series + ' is not a valid series type');
    }
  };

  Axis.prototype.series = function(series) {
    var k, len, s;
    if (arguments.length > 0) {
      this._.series = new hx.List(series);
      for (k = 0, len = series.length; k < len; k++) {
        s = series[k];
        s.axis = this;
      }
      return this;
    } else {
      return this._.series.values();
    }
  };

  Axis.prototype.removeSeries = function(series) {
    if (this._.series.remove(series)) {
      series.axis = void 0;
      return series;
    }
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
        group = supportsGroup(series) ? series.group() : void 0;
        if (!groups.has(group)) {
          groups.set(group, new hx.List);
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
        entry;
      }
      return internalGroupId;
    };
    types = new hx.Map;
    ref = this.series();
    for (k = 0, len = ref.length; k < len; k++) {
      series = ref[k];
      if (!types.has(series._.type)) {
        types.set(series._.type, new hx.List);
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

  Axis.prototype.preupdateXAxisSvg = function(element) {
    var alpha, alphaDeg, axisGroupSelection, d, data, domain, end, getXTicks, s, self, series, set, start, xLabelTickSize, xmax, xmin, xs;
    self = this;
    switch (this.x.scaleType()) {
      case 'linear':
        this.xScale = new LinearScale().range(0, this.graph.width);
        break;
      case 'discrete':
        this.xScale = new DiscreteScale(this.x.discretePadding()).range(0, this.graph.width);
        break;
      case 'log':
        this.xScale = new LogScale().range(0, this.graph.width);
        break;
      case 'date':
        this.xScale = new DateScale().range(0, this.graph.width);
    }
    if (this.x.scaleType() === 'discrete') {
      domain = (function() {
        var k, l, len, len1, ref, ref1;
        if (this.x.discreteLabels()) {
          return this.x.discreteLabels();
        } else {
          set = new hx.Set;
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
      xs = (function() {
        var k, len, ref, results;
        ref = this.series();
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          s = ref[k];
          if (s instanceof StraightLineSeries) {
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
      xs = xs.filter(hx.identity);
      xmin = hx.min(xs.map(function(d) {
        return d[0];
      }));
      xmax = hx.max(xs.map(function(d) {
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
      hx.select(element).select('.hx-x-axis').remove();
    } else {
      axisGroupSelection = hx.select(element).select('.hx-x-axis');
      alphaDeg = this.x.tickRotation();
      alpha = alphaDeg / 180 * Math.PI;
      getXTicks = (function(_this) {
        return function(scale) {
          var k, l, len, len1, ref, ref1;
          if (self.x.ticksAll()) {
            set = new hx.Set;
            ref = _this.series();
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
      })(this);
      axisGroupSelection.select('.hx-axis-scale').view('.hx-axis-view', 'g').update(function(scale) {
        return this.view('.hx-tick', 'g').update(function(tick) {
          return this.view('.hx-tick-text-x', 'text').update(function(t) {
            var bbox, size;
            this.text(self.x.formatter()(t));
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

  Axis.prototype.preupdateYAxisSvg = function(element, totalXAxisSize) {
    var axisGroupSelection, d, data, domain, group, k, l, len, len1, len2, m, ref, ref1, rmin, s, self, series, set, stackGroups, stackHeight, topSeries, type, types, yLabelTickSize, ymax, ymin, ys, yymax, yymin;
    self = this;
    rmin = this.graph.height - totalXAxisSize;
    switch (this.y.scaleType()) {
      case 'linear':
        this.yScale = new LinearScale().range(rmin, 0);
        break;
      case 'discrete':
        this.yScale = new DiscreteScale(this.y.discretePadding()).range(rmin, 0);
        break;
      case 'log':
        this.yScale = new LogScale().range(rmin, 0);
        break;
      case 'date':
        this.yScale = new DateScale().range(rmin, 0);
    }
    if (this.y.scaleType() === 'discrete') {
      domain = (function() {
        var k, l, len, len1, ref, ref1;
        if (this.yDiscreteLabels) {
          return this.yDiscreteLabels;
        } else {
          set = new hx.Set;
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
      ymin = void 0;
      ymax = void 0;
      types = hx.groupBy(this.series(), function(d) {
        return d._.type;
      });
      stackGroups = types.map(function(d) {
        return {
          type: d[0],
          group: hx.groupBy(d[1], function(s) {
            if (supportsGroup(s)) {
              return s.group();
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
              ref1 = this.series();
              results = [];
              for (m = 0, len2 = ref1.length; m < len2; m++) {
                s = ref1[m];
                data = s.data();
                if (s instanceof StraightLineSeries) {
                  if (!data.dx && !data.dy && data.y) {
                    results.push([data.y, data.y]);
                  } else {
                    results.push(void 0);
                  }
                } else if (s instanceof BandSeries) {
                  results.push(extent2(data, (function(d) {
                    return d.y1;
                  }), function(d) {
                    return d.y2;
                  }));
                } else {
                  results.push(extent(data, function(d) {
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
            ref1 = topSeries.data();
            for (m = 0, len2 = ref1.length; m < len2; m++) {
              d = ref1[m];
              stackHeight = this.getYStack(topSeries._.type, topSeries.group(), d.x, topSeries._.seriesId + 1, this.yScale.domainMin);
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
      ymin = this.y.min() === 'auto' ? ymin : this.y.min();
      ymax = this.y.max() === 'auto' ? ymax : this.y.max();
      if (this.y.min() === 'auto') {
        ymin = scalePad(ymin, ymax - ymin, -this.y.scalePaddingMin());
      }
      if (this.y.max() === 'auto') {
        ymax = scalePad(ymax, ymax - ymin, this.y.scalePaddingMax());
      }
      this.yScale.domain(ymin, ymax);
    }
    yLabelTickSize = 0;
    if (!this.y.visible()) {
      hx.select(element).select('.hx-y-axis').remove();
    } else {
      axisGroupSelection = hx.select(element).select('.hx-y-axis');
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

  Axis.prototype.updateAxisSvg = function(element, xOffset, yOffset, totalXOffset, totalYOffset) {
    var axisGroupSelection, axisX, axisY, gridSelection, height, markerX, markerY, self, width, xline, yline;
    self = this;
    width = this.graph.width;
    height = this.graph.height;
    switch (this.x.scaleType()) {
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
    switch (this.y.scaleType()) {
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
    if (!this.x.visible()) {
      hx.select(element).select('.hx-x-axis').remove();
    } else {
      if (this.x.gridLines()) {
        gridSelection.view('.hx-vertical-grid-line', 'line').update(function(tick) {
          return this.attr('x1', tick[1]).attr('x2', tick[1]).attr('y1', self.yScale.rangeMax).attr('y2', self.yScale.rangeMin);
        }).apply(this.xScale.ticks(self.x.tickSpacing()));
      }
      axisGroupSelection = hx.select(element).select('.hx-x-axis');
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
            return this.text((i % self.x.nthTickVisible()) === 0 ? self.x.formatter()(t) : '');
          }).apply(tick[0]);
        }).apply(self.x.showTicks() ? scale.ticks(self.x.tickSpacing()) : []);
      }).apply(this.xScale);
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
      return hx.select(element).select('.hx-y-axis').remove();
    } else {
      if (this.y.gridLines()) {
        gridSelection.view('.hx-horizontal-grid-line', 'line').update(function(tick) {
          return this.attr('y1', tick[1]).attr('y2', tick[1]).attr('x1', self.xScale.rangeMax).attr('x2', self.xScale.rangeMin);
        }).apply(this.yScale.ticks(self.y.tickSpacing()));
      }
      axisGroupSelection = hx.select(element).select('.hx-y-axis');
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

  Axis.prototype.updateDataSvg = function(fillLayer, sparseLayer) {
    var fill, i, k, len, ref, results, s, sparse;
    fill = [];
    sparse = [];
    hx.select(fillLayer).view('.hx-series', 'g').update(function(d, e) {
      return fill.push(e);
    }).apply(this.series());
    hx.select(sparseLayer).view('.hx-series', 'g').update(function(d, e) {
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

  Axis.prototype.getLabelDetails = function(x, y) {
    var labels;
    labels = hx.flatten(this.series().map(function(series) {
      return series.getLabelDetails(x, y);
    }));
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
      ref = this.series();
      for (j = k = 0, len = ref.length; k < len; j = ++k) {
        series = ref[j];
        if (series._.seriesId < seriesId && series.group() === group && series._.type === type) {
          xs = series.getX(y);
          if (hx.defined(xs)) {
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
      ref = this.series();
      for (j = k = 0, len = ref.length; k < len; j = ++k) {
        series = ref[j];
        if (series._.seriesId < seriesId && series.group() === group && series._.type === type) {
          ys = series.getY(x, this.x.scaleType() === 'discrete');
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
  var clearLabels, getClosestMeta, updateLabels;

  extend(Graph, superClass);

  function Graph(selector, options) {
    var clipPath, defs, id, ref, savedZoomEnd, savedZoomStart, selection, threshold, touchX1, touchX2;
    this.selector = selector;
    Graph.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this._ = {
      options: hx.shallowMerge({
        zoomRangeStart: 0,
        zoomRangeEnd: 1,
        labelsEnabled: true,
        legendsEnabled: false,
        legendLocation: 'auto'
      }, options),
      axes: new hx.List
    };
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
    clipPath = defs.append('clipPath').attr('id', 'clip-series-' + id);
    this.clipRect = clipPath.append('rect');
    this.plotTarget.attr('clip-path', 'url(#clip-series-' + id + ')');
    touchX1 = 0;
    touchX2 = 0;
    savedZoomStart = 0;
    savedZoomEnd = 1;
    this.svgTarget.on('pointerdown', 'hx.plot', (function(_this) {
      return function(p) {
        var x, y;
        x = Math.round(p.x - _this.svgTarget.box().left);
        y = Math.round(p.y - _this.svgTarget.box().top);
        updateLabels(_this, x, y);
        if (p.event.targetTouches && p.event.targetTouches.length > 1) {
          p.event.preventDefault();
          p.event.stopPropagation();
          touchX1 = p.event.targetTouches[0].clientX - _this.svgTarget.box().left - _this.plotArea.x1;
          touchX2 = p.event.targetTouches[1].clientX - _this.svgTarget.box().left - _this.plotArea.x1;
          savedZoomStart = _this.zoomRangeStart();
          return savedZoomEnd = _this.zoomRangeEnd();
        }
      };
    })(this));
    threshold = 0.01;
    this.svgTarget.on('touchmove', 'hx.plot', (function(_this) {
      return function(e) {
        var endFactor, startFactor, w, x1, x2, xhat, xn, z;
        if (e.targetTouches.length > 1 && _this.zoomEnabled()) {
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
          if (_this.zoomRangeEnd === 1 && startFactor > -threshold) {
            startFactor = -threshold;
          }
          if (_this.zoomRangeStart() === 0 && endFactor < threshold) {
            endFactor = threshold;
          }
          _this.zoomRangeStart(hx.clampUnit(xhat + z * startFactor));
          _this.zoomRangeEnd(hx.clampUnit(xhat + z * endFactor));
          _this.emit('zoom', {
            start: _this.zoomRangeStart(),
            end: _this.zoomRangeEnd()
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
        if (_this.labelsEnabled()) {
          updateLabels(_this, x, y);
        }
        if (_this.legendEnabled()) {
          legendContainer = _this.svgTarget.select('.hx-legend-container');
          if (_this.legendLocation() === 'hover') {
            legendContainer.style('display', '');
          }
          if (_this.legendLocation() === 'auto' || _this.legendLocation() === 'hover') {
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
        if (_this.legendEnabled() && _this.legendLocation() === 'hover') {
          return _this.svgTarget.select('.hx-legend-container').style('display', 'none');
        }
      };
    })(this));
    this.svgTarget.on('pointerleave', 'hx.plot', function(p) {
      return clearLabels();
    });
    this.svgTarget.on('click', 'hx.plot', (function(_this) {
      return function(p) {
        var data, labelMeta, x, y;
        x = Math.round(p.x - _this.svgTarget.box().left);
        y = Math.round(p.y - _this.svgTarget.box().top);
        labelMeta = getClosestMeta(_this, x, y);
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
        var delta, endFactor, startFactor, w, x, xhat, xn, z, zoomRangeEnd, zoomRangeStart;
        if (_this.zoomEnabled()) {
          e.preventDefault();
          e.stopPropagation();
          threshold = 0.01;
          delta = -e.deltaY;
          if (e.deltaMode === 1) {
            delta *= 20;
          }
          zoomRangeStart = _this.zoomRangeStart();
          zoomRangeEnd = _this.zoomRangeEnd();
          x = e.clientX - _this.svgTarget.box().left - _this.plotArea.x1;
          w = _this.plotArea.x2 - _this.plotArea.x1;
          xn = hx.clampUnit(x / w);
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
          _this.zoomRangeStart(hx.clampUnit(xhat + z * startFactor));
          _this.zoomRangeEnd(hx.clampUnit(xhat + z * endFactor));
          _this.emit('zoom', {
            start: _this.zoomRangeStart(),
            end: _this.zoomRangeEnd()
          });
          return _this.render();
        }
      };
    })(this));
    if (options != null) {
      if ((ref = options.axes) != null) {
        ref.forEach((function(_this) {
          return function(axis) {
            return _this.addAxis(axis);
          };
        })(this));
      }
    }
  }

  Graph.prototype.zoomRangeStart = optionSetterGetter('zoomRangeStart');

  Graph.prototype.zoomRangeEnd = optionSetterGetter('zoomRangeEnd');

  Graph.prototype.zoomEnabled = optionSetterGetter('zoomEnabled');

  Graph.prototype.labelsEnabled = optionSetterGetter('labelsEnabled');

  Graph.prototype.legendEnabled = optionSetterGetter('legendEnabled');

  Graph.prototype.legendLocation = optionSetterGetter('legendLocation');

  Graph.prototype.axes = function(axes) {
    if (arguments.length > 0) {
      this._.axes = new hx.List(axes);
      this.axes().forEach(function(a) {
        return a.graph = this;
      });
      return this;
    } else {
      return this._.axes.values();
    }
  };

  Graph.prototype.addAxis = function(options) {
    var axis;
    axis = options instanceof Axis ? options : new Axis(options);
    axis.graph = this;
    this._.axes.add(axis);
    return axis;
  };

  Graph.prototype.removeAxis = function(axis) {
    if (this._.axes.remove(axis)) {
      axis.graph = null;
      return axis;
    }
  };

  Graph.prototype.render = function() {
    var enter, hasData, legendContainer, legendContainerTransformX, legendContainerTransformY, selection, self, totalX, totalY, x, y;
    selection = hx.select(this.selector);
    this.width = Number(selection.width());
    this.height = Number(selection.height());
    if (this.width <= 0 || this.height <= 0) {
      return;
    }
    hasData = this.axes().some(function(axis) {
      return axis.series().some(function(series) {
        var data;
        data = series.data();
        return hx.isObject(data) || data.length > 0;
      });
    });
    self = this;
    this.svgTarget.view('.hx-plot-no-data', 'text').update(function() {
      return this.text('No Data').attr('x', self.width / 2).attr('y', self.height / 2);
    }).apply(hasData ? [] : [true]);
    this.axes().forEach(function(a) {
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
    }).apply(this.axes());
    totalY = 0;
    this.axesTarget.view('.hx-axis', 'g').enter(enter).update(function(d, element) {
      d.preupdateYAxisSvg(element, totalX);
      return totalY += d.yAxisSize;
    }).apply(this.axes());
    x = 0;
    y = 0;
    this.axesTarget.view('.hx-axis', 'g').enter(enter).update(function(d, element) {
      d.updateAxisSvg(element, y, x, totalY, totalX);
      x += d.xAxisSize;
      return y += d.yAxisSize;
    }).apply(this.axes());
    this.plotArea = {
      x1: y,
      y1: 0,
      x2: this.width,
      y2: this.height - x
    };
    if (((this.plotArea.x2 - this.plotArea.x1) <= 0) || ((this.plotArea.y2 - this.plotArea.y1) <= 0)) {
      return;
    }
    this.plotTarget.view('.hx-axis-data', 'g').enter(function() {
      var g;
      g = this.append('g')["class"]('hx-axis-data');
      g.append('g')["class"]('hx-graph-fill-layer');
      g.append('g')["class"]('hx-graph-sparse-layer');
      return g.node();
    }).update(function(d, element) {
      return d.updateDataSvg(this.select('.hx-graph-fill-layer').node(), this.select('.hx-graph-sparse-layer').node());
    }).apply(this.axes());
    if (this.legendEnabled()) {
      legendContainer = this.svgTarget.select('.hx-legend-container');
      if (legendContainer.size() === 0) {
        legendContainer = this.svgTarget.append('g')["class"]('hx-legend-container');
      }
      populateLegendSeries(legendContainer, hx.flatten(this.axes().map(function(axis) {
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
    this.clipRect.attr('x', this.plotArea.x1).attr('y', this.plotArea.y1).attr('width', this.plotArea.x2 - this.plotArea.x1).attr('height', this.plotArea.y2 - this.plotArea.y1);
    this.emit('render');
    return this;
  };

  getClosestMeta = function(graph, x, y) {
    var bestDistance, bestMeta, distance, i, l, labels, len, xx, yy;
    x = hx.clamp(graph.plotArea.x1, graph.plotArea.x2, x);
    y = hx.clamp(graph.plotArea.y1, graph.plotArea.y2, y);
    labels = hx.flatten(graph.axes().map(function(axis) {
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
    return hx.select('body').select('.hx-plot-label-container').clear();
  };

  updateLabels = function(graph, x, y) {
    var bestMeta, updateLabel;
    updateLabel = function(data, element) {
      hx.select(element).style('left', Math.round(window.pageXOffset + graph.svgTarget.box().left + data.x) + 'px').style('top', Math.round(window.pageYOffset + graph.svgTarget.box().top + data.y) + 'px');
      return data.series.labelRenderer()(element, data);
    };
    bestMeta = getClosestMeta(graph, x, y);
    if (hx.select('body').select('.hx-plot-label-container').empty()) {
      hx.select('body').append('div')["class"]('hx-plot-label-container');
    }
    return hx.select('body').select('.hx-plot-label-container').view('.hx-plot-label', 'div').update(updateLabel).apply(bestMeta ? boundLabel(bestMeta, graph) : []);
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

  function BandSeries(options) {
    BandSeries.__super__.constructor.call(this, hx.merge({
      fillColor: hx.color(hx.theme.plot.colors[2]).alpha(0.2).toString(),
      sampleThreshold: 200
    }, options));
    this._.type = 'band';
  }

  BandSeries.prototype.fillColor = optionSetterGetter('fillColor');

  BandSeries.prototype.sampleThreshold = optionSetterGetter('sampleThreshold');

  BandSeries.prototype.legendColor = function() {
    return this._.options.fillColor;
  };

  BandSeries.prototype.updateSvg = function(fillLayer) {
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
    return hx.select(fillLayer).view('.hx-series-data', 'path', 'hx-series-area').update(function(d) {
      return this.attr('d', d)["class"]('hx-series-data ' + self["class"]()).attr('fill', fillCol);
    }).apply(areas);
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
        makeLabelDetails(this, point, (function(d) {
          return d.y1;
        }), 'x', 'y1'), makeLabelDetails(this, point, (function(d) {
          return d.y2;
        }), 'x', 'y2')
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

  function BarSeries(options) {
    BarSeries.__super__.constructor.call(this, hx.merge({
      fillColor: hx.theme.plot.colors[1],
      group: void 0
    }, options));
    this._.type = 'bar';
  }

  BarSeries.prototype.fillColor = optionSetterGetter('fillColor');

  BarSeries.prototype.group = optionSetterGetter('group');

  BarSeries.prototype.legendColor = function() {
    return this._.options.fillColor;
  };

  BarSeries.prototype.updateSvg = function(fillLayer) {
    var axis, self;
    self = this;
    axis = this.axis;
    return hx.select(fillLayer).view('.hx-series-data', 'rect').update(function(d) {
      var height, width, x, y;
      if (axis.x.scaleType() === 'discrete') {
        width = axis.xScale.tickWidth() / self._.typeSize;
        x = axis.xScale.apply(d.x) - width * self._.typeSize / 2 + self.groupId * width;
        height = Math.abs(axis.yScale.apply(d.y) - axis.yScale.apply(0));
        y = axis.yScale.apply(axis.getYStack(self._.type, self.group(), d.x, self._.seriesId));
        if (d.y > 0) {
          y -= height;
        }
      } else {
        width = Math.abs(axis.xScale.apply(d.x) - axis.xScale.apply(0));
        x = axis.xScale.apply(axis.getXStack(self._.type, self.group(), d.y, self._.seriesId));
        height = Math.abs(axis.yScale.tickWidth() / self._.typeSize);
        y = axis.yScale.apply(d.y) - height * self._.typeSize / 2 + self.groupId * height;
        if (d.y > 0) {
          y -= height;
        }
      }
      return this["class"]('hx-series-data hx-series-bar ' + self["class"]()).attr("y", y).attr("x", x).attr("height", Math.max(height, 0)).attr("width", Math.max(width, 0)).style("fill", d.color || self.fillColor());
    }).apply(this.data());
  };

  BarSeries.prototype.getLabelDetails = function(x, y) {
    var barData, barX, barY, height, max, meta, min, width, xx, yy;
    if (this.labelsEnabled()) {
      xx = this.axis.xScale.inverse(x);
      yy = this.axis.yScale.inverse(y);
      barData = hx.find(this.data(), function(d) {
        return d.x === xx;
      });
      if (barData) {
        width = this.axis.xScale.tickWidth() / this._.typeSize;
        barX = this.axis.xScale.apply(barData.x) - width * this._.typeSize / 2 + this.groupId * width;
        height = Math.abs(this.axis.yScale.apply(barData.y) - this.axis.yScale.apply(0));
        barY = this.axis.yScale.apply(this.axis.getYStack(this._.type, this.group(), barData.x, this._.seriesId));
        if (barData.y > 0) {
          barY -= height;
        }
        if ((xx != null) && (yy != null) && (barData != null)) {
          min = Math.min(barY, this.axis.yScale.apply(0));
          max = Math.max(barY, barY + height);
          yy = hx.clamp(min, max, this.axis.yScale.apply(yy));
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

})(Series);

var LineSeries, updatePath,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

updatePath = function(series, element, _class, data, type, update) {
  return hx.select(element).view('.hx-series-data', 'g').update(function(d) {
    return this["class"]('hx-series-data hx-series-line ' + series["class"]()).view(_class, type).update(update).apply(d);
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

  function LineSeries(options) {
    LineSeries.__super__.constructor.call(this, hx.merge({
      strokeEnabled: true,
      strokeColor: hx.theme.plot.colors[0],
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

  LineSeries.prototype.strokeEnabled = optionSetterGetter('strokeEnabled');

  LineSeries.prototype.strokeColor = optionSetterGetter('strokeColor');

  LineSeries.prototype.fillEnabled = optionSetterGetter('fillEnabled');

  LineSeries.prototype.fillColor = optionSetterGetter('fillColor');

  LineSeries.prototype.markersEnabled = optionSetterGetter('markersEnabled');

  LineSeries.prototype.markerRadius = optionSetterGetter('markerRadius');

  LineSeries.prototype.markerFillColor = optionSetterGetter('markerFillColor');

  LineSeries.prototype.sampleThreshold = optionSetterGetter('sampleThreshold');

  LineSeries.prototype.group = optionSetterGetter('group');

  LineSeries.prototype.legendColor = function() {
    return this._.options.strokeColor;
  };

  LineSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
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
            color: hx.color(d.color).alpha(0.1).toString('rgba')
          };
        });
        gradientId = createLinearGradient(fillLayer, gradientCols, self);
        fillCol = 'url(#' + gradientId + ')';
      } else {
        fillCol = self.fillColor() || hx.color(self.strokeColor()).alpha(0.1).toString();
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
      preparedData = this.axis.y.scaleType() !== 'discrete' ? applyStack(hx.flatten(featheredData)) : hx.flatten(featheredData);
      return updatePath(this, sparseLayer, '.hx-series-line-markers', scale(preparedData, this.axis), 'circle', function(d) {
        return this.attr('cx', d.x).attr('cy', d.y).attr('r', self.markerRadius()).attr('fill', self.markerFillColor() || self.strokeColor());
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
            return _this.axis.getYStack(_this._.type, _this.group(), d.x, _this._.seriesId) + d.y;
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
        radius: d.radius,
        fillColor: d.fillColor,
        color: d.color,
        size: d.size
      });
    }
    return results;
  };

  function ScatterSeries(options) {
    ScatterSeries.__super__.constructor.call(this, hx.merge({
      fillColor: hx.theme.plot.colors[3],
      radius: 2
    }, options));
    this._.type = 'scatter';
  }

  ScatterSeries.prototype.fillColor = optionSetterGetter('fillColor');

  ScatterSeries.prototype.radius = optionSetterGetter('radius');

  ScatterSeries.prototype.legendColor = function() {
    return this._.options.fillColor;
  };

  ScatterSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
    var self;
    self = this;
    return hx.select(sparseLayer).view('.hx-series-data', 'circle').update(function(d) {
      return this["class"]('hx-series-data hx-series-scatter ' + self["class"]()).attr('cx', d.x).attr('cy', d.y).attr('r', Math.max(d.radius || self.radius(), 0)).style('fill', d.fillColor || self.fillColor());
    }).apply(scale(filter(this.data()), this.axis));
  };

  ScatterSeries.prototype.getLabelDetails = function(x, y) {
    var best, bestSquaredDistance, d, i, len, meta, ref, squaredDistance;
    if (this.labelsEnabled()) {
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

})(Series);

var StraightLineSeries,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StraightLineSeries = (function(superClass) {
  var endpoints;

  extend(StraightLineSeries, superClass);

  function StraightLineSeries(options) {
    StraightLineSeries.__super__.constructor.call(this, hx.merge({
      strokeColor: hx.theme.plot.colors[4],
      data: {}
    }, options));
    this._.type = 'straight-line';
  }

  StraightLineSeries.prototype.strokeColor = optionSetterGetter('strokeColor');

  StraightLineSeries.prototype.legendColor = function() {
    return this._.options.strokeColor;
  };

  StraightLineSeries.prototype.updateSvg = function(fillLayer, sparseLayer) {
    var data, self;
    data = endpoints.call(this);
    if (data) {
      self = this;
      return hx.select(sparseLayer).view('.hx-series-data', 'line').update(function(d) {
        return this["class"]('hx-series-data hx-series-constant ' + self["class"]()).attr('x1', self.axis.xScale.apply(d[0].x)).attr('y1', self.axis.yScale.apply(d[0].y)).attr('x2', self.axis.xScale.apply(d[1].x)).attr('y2', self.axis.yScale.apply(d[1].y)).attr('d', d).attr('stroke', self.strokeColor());
      }).apply([data]);
    }
  };

  StraightLineSeries.prototype.getLabelDetails = function(x, y) {
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

  endpoints = function() {
    var data, domX1, domX2, domY1, domY2, domdx, domdy, dx, dy, i, j, len, len1, p1, p2, quotient, ref, ref1, results, results1, t, x, x0, x1, y, y0, y1;
    data = this.data();
    dx = data.dx || 0;
    dy = data.dy || 0;
    if (dx !== 0 && dy !== 0 && (data.x != null) && (data.y != null)) {
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

})(Series);

var PieChart,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PieChart = (function(superClass) {
  var calculateTotal, clearLabels, defaultLabelFormatter, defaultLabelValuesExtractor, defaultSegmentTextFormatter, getClosestMeta, getSegmentSize, updateLabels;

  extend(PieChart, superClass);

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
    if (segment.size / hx.sum(segments.map(function(s) {
      return s.size;
    })) > 0.05) {
      return segment.size;
    } else {
      return '';
    }
  };

  defaultLabelFormatter = hx.format.si(2);

  function PieChart(selector, options) {
    this.selector = selector;
    PieChart.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    this._ = {
      options: hx.merge({
        segmentPadding: 0,
        innerPadding: 0,
        ringPadding: 0.1,
        totalAngle: Math.PI * 2,
        startAngle: 0,
        fillColor: hx.theme.plot.colors[1],
        labelsEnabled: true,
        labelRenderer: hx.plot.label.standard,
        labelValuesExtractor: defaultLabelValuesExtractor,
        labelFormatter: defaultLabelFormatter,
        segmentTextEnabled: false,
        segmentTextFormatter: defaultSegmentTextFormatter,
        legendEnabled: false,
        legendLocation: 'auto'
      }, options)
    };
  }

  PieChart.prototype.labelsEnabled = optionSetterGetter('labelsEnabled');

  PieChart.prototype.legendEnabled = optionSetterGetter('legendEnabled');

  PieChart.prototype.legendLocation = optionSetterGetter('legendLocation');

  PieChart.prototype.fillColor = optionSetterGetter('fillColor');

  PieChart.prototype.segmentTextEnabled = optionSetterGetter('segmentTextEnabled');

  PieChart.prototype.segmentTextFormatter = optionSetterGetter('segmentTextFormatter');

  PieChart.prototype.labelValuesExtractor = optionSetterGetter('labelValuesExtractor');

  PieChart.prototype.labelFormatter = optionSetterGetter('labelFormatter');

  PieChart.prototype.labelRenderer = optionSetterGetter('labelRenderer');

  PieChart.prototype.segmentPadding = optionSetterGetter('segmentPadding');

  PieChart.prototype.innerPadding = optionSetterGetter('innerPadding');

  PieChart.prototype.ringPadding = optionSetterGetter('ringPadding');

  PieChart.prototype.totalAngle = optionSetterGetter('totalAngle');

  PieChart.prototype.startAngle = optionSetterGetter('startAngle');

  PieChart.prototype.data = optionSetterGetter('data');

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
    var P, approxRingSize, data, diffX, diffY, enterChart, height, innerRadius, legendContainer, midpoint, outerRadius, r, radius, ringSize, segmentPadding, selection, self, startAngle, svgHeight, svgWidth, totalAngle, updateChart, updateRing, updateSegment, updateText, width;
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
    startAngle = this.startAngle();
    totalAngle = this.totalAngle();
    P = Math.PI;
    while (startAngle < 0) {
      startAngle += 2 * P;
    }
    switch (false) {
      case !(totalAngle === P && startAngle % (P / 2) === 0):
        switch (false) {
          case !(startAngle === 0 || startAngle % (2 * P) === 0 || startAngle % P === 0):
            r = hx.clamp(0, height / 2, r * 2);
            break;
          case !(startAngle % (P * (3 / 2)) === 0 || startAngle % (P / 2) === 0):
            r = hx.clamp(0, width / 2, r * 2);
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
    outerRadius = r;
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
      var allZero, end, j, len, minimumInnerRadius, ref, ref1, runningTotal, segment, segments, size, start, startOffset, total;
      segments = d.segments;
      ref = calculateTotal(segments), total = ref.total, allZero = ref.allZero;
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
      ref1 = calculateTotal(segments), total = ref1.total, allZero = ref1.allZero;
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
      var allZero, ref, runningTotal, segments, total;
      segments = d.segments;
      runningTotal = 0;
      ref = calculateTotal(segments), total = ref.total, allZero = ref.allZero;
      return this.view('.hx-pie-segment-text', 'text').update(function(s) {
        var ref1, size, x, y;
        size = getSegmentSize(s, total, allZero);
        ref1 = midpoint(size, runningTotal, total, i, segments.length), x = ref1.x, y = ref1.y;
        this.text(self.segmentTextFormatter()(s, segments)).attr('x', x).attr('y', y);
        return runningTotal += size;
      }).apply(segments);
    };
    enterChart = function(d) {
      var labelGroup;
      self.svgTarget = this.append('svg')["class"]('hx-graph');
      self.plotTarget = self.svgTarget.append('g')["class"]('hx-plot');
      labelGroup = self.svgTarget.append('g')["class"]('hx-label');
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
          if (self.legendLocation() === 'auto' || self.legendLocation() === 'hover') {
            width = self.svgTarget.width();
            height = self.svgTarget.height();
            if (x < width / 2) {
              return legendContainer.attr('transform', 'translate(' + (width - 10 - legendContainer.width()) + ', 10)');
            } else {
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
        legendContainer = this.svgTarget.append('g')["class"]('hx-legend-container');
      }
      data = this.data();
      if (!Array.isArray(data)) {
        data = [data];
      }
      populateLegendSeries(legendContainer, hx.flatten(data.map(function(d) {
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

  getClosestMeta = function(pie, x, y) {
    var a1, a2, allZero, angle, approxRingSize, chosenSegment, chosenSegmentAngleEnd, chosenSegmentAngleMid, chosenSegmentAngleStart, cx, cy, data, end, height, innerRadius, j, labelRadius, labelX, labelY, len, outerRadius, r, radius, ref, ref1, ring, ringSize, runningTotal, segment, segmentPadding, selection, size, start, total, whichRing, width;
    data = pie.data();
    if (!Array.isArray(data)) {
      data = [data];
    }
    selection = hx.select(pie.selector);
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
    whichRing = hx.clamp(0, data.length - 1, Math.floor((r + pie.ringPadding() * ringSize / 2 - innerRadius) / ringSize));
    ring = data[whichRing];
    angle = (Math.atan2(y - cy, x - cx) + Math.PI * 0.5) - pie.startAngle();
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
      a1 = runningTotal / total * pie.totalAngle();
      a2 = (runningTotal + size) / total * pie.totalAngle();
      start = Math.min(a1, a2);
      end = Math.max(a1, a2);
      if ((start < angle && angle < end)) {
        chosenSegment = segment;
        chosenSegmentAngleStart = start;
        chosenSegmentAngleEnd = end;
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

  clearLabels = function() {
    return hx.select('body').select('.hx-plot-label-container').clear();
  };

  updateLabels = function(pie, x, y) {
    var bestMeta, updateLabel;
    updateLabel = function(data, element) {
      hx.select(element).style('left', Math.round(window.pageXOffset + pie.svgTarget.box().left + data.x) + 'px').style('top', Math.round(window.pageYOffset + pie.svgTarget.box().top + data.y) + 'px');
      return pie.labelRenderer()(element, data);
    };
    bestMeta = getClosestMeta(pie, x, y);
    if (hx.select('body').select('.hx-plot-label-container').empty()) {
      hx.select('body').append('div')["class"]('hx-plot-label-container');
    }
    return hx.select('body').select('.hx-plot-label-container').view('.hx-plot-label', 'div').update(updateLabel).apply(bestMeta ? bestMeta : []);
  };

  return PieChart;

})(hx.EventEmitter);

var hx_plot_label;

hx_plot_label = {};

hx_plot_label.standard = function(element, meta) {
  var createEntry, details, header, midX, midY;
  createEntry = function(value) {
    return hx.detached('div')["class"]('hx-plot-label-details-entry').add(hx.detached('span')["class"]('hx-plot-label-details-entry-key').text(value.name)).add(hx.detached('span')["class"]('hx-plot-label-details-entry-value').text(value.formatter(value.value)));
  };
  header = hx.detached('div')["class"]('hx-plot-label-marker').style('background', meta.color);
  details = hx.detached('div')["class"]('hx-plot-label-details').add(hx.detached('div')["class"]('hx-plot-label-details-header').text(meta.title)).add(meta.values.map(createEntry));
  midX = (meta.bounding.x1 + meta.bounding.x2) / 2;
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2;
  details.classed('hx-plot-label-details-left', meta.x >= midX);
  details.classed('hx-plot-label-details-bottom', meta.y >= midY);
  return hx.select(element).clear().add(header).add(details);
};

hx_plot_label.basic = function(element, meta) {
  var details, marker, midX, midY, value;
  marker = hx.detached('div')["class"]('hx-plot-label-marker').style('background', meta.color);
  value = meta.values[1];
  midX = (meta.bounding.x1 + meta.bounding.x2) / 2;
  midY = (meta.bounding.y1 + meta.bounding.y2) / 2;
  details = hx.detached('div')["class"]('hx-plot-label-details-basic').classed('hx-plot-label-details-left', meta.x >= midX).classed('hx-plot-label-details-bottom', meta.y >= midY).text(value.formatter(value.value));
  return hx.select(element).clear().add(marker).add(details);
};

var Sparkline;

Sparkline = (function() {
  function Sparkline(selector, options) {
    var axis, graph, innerLabelRenderer, opts, series;
    opts = hx.merge.defined({
      strokeColor: hx.theme.plot.colors[0],
      data: [],
      type: 'line',
      labelRenderer: function(element, obj) {
        return hx.select(element).text(obj.y + ' (' + obj.x + ')');
      }
    }, options);
    innerLabelRenderer = function(element, meta) {
      var details, labelNode, marker, midX, midY, xValue, yValue;
      marker = hx.detached('div')["class"]('hx-plot-label-marker').style('background', meta.color);
      xValue = meta.values[0];
      yValue = meta.values[1];
      midX = (meta.bounding.x1 + meta.bounding.x2) / 2;
      midY = (meta.bounding.y1 + meta.bounding.y2) / 2;
      labelNode = hx.detached('div').node();
      opts.labelRenderer(labelNode, {
        x: xValue.value,
        y: yValue.value
      });
      details = hx.detached('div')["class"]('hx-plot-label-details-basic').classed('hx-plot-label-details-left', meta.x >= midX).classed('hx-plot-label-details-bottom', meta.y >= midY).add(hx.detached('span')["class"]('hx-plot-label-sparkline-x').add(labelNode));
      return hx.select(element).clear().add(marker).add(details);
    };
    hx.components.clear(selector);
    hx.component.register(selector, this);
    graph = new hx.Graph(selector);
    if (opts.type !== 'bar' && opts.type !== 'line') {
      hx.consoleWarning('options.type can only be "line" or "bar", you supplied "' + opts.type + '"');
      this.render = function() {
        return graph.render();
      };
      return;
    }
    axis = graph.addAxis({
      x: {
        scaleType: opts.type === 'bar' ? 'discrete' : 'linear',
        visible: false
      },
      y: {
        visible: false,
        scalePaddingMin: 0.1,
        scalePaddingMax: 0.1
      }
    });
    series = axis.addSeries(opts.type, {
      fillEnabled: true,
      labelRenderer: innerLabelRenderer
    });
    this._ = {
      options: opts,
      graph: graph,
      series: series
    };
  }

  Sparkline.prototype.data = optionSetterGetter('data');

  Sparkline.prototype.fillColor = optionSetterGetter('fillColor');

  Sparkline.prototype.strokeColor = optionSetterGetter('strokeColor');

  Sparkline.prototype.labelRenderer = optionSetterGetter('labelRenderer');

  Sparkline.prototype.render = function() {
    var self;
    self = this;
    this._.series.data(this.data());
    if (this.fillColor() != null) {
      this._.series.fillColor(this.fillColor());
    }
    if (this._.options.type === 'line') {
      this._.series.strokeColor(this.strokeColor());
    }
    return this._.graph.render();
  };

  return Sparkline;

})();

hx.plot = {};

hx.plot.label = hx_plot_label;

hx.plot.arcCurve = arcCurve;

hx.plot.svgCurve = svgCurve;

hx.Axis = Axis;

hx.Graph = Graph;

hx.graph = function(options) {
  var graph, selection;
  selection = new hx.detached('div');
  graph = new Graph(selection.node(), options);
  return selection;
};

hx.LineSeries = LineSeries;

hx.BandSeries = BandSeries;

hx.ScatterSeries = ScatterSeries;

hx.BarSeries = BarSeries;

hx.StraightLineSeries = StraightLineSeries;

hx.pieChart = function(options) {
  var pieChart, selection;
  selection = hx.detached('div');
  pieChart = new PieChart(selection.node(), options);
  pieChart.render();
  return selection;
};

hx.PieChart = PieChart;

hx.sparkline = function(options) {
  var selection, sparkline;
  selection = hx.detached('div').classed('hx-sparkline', true);
  sparkline = new Sparkline(selection.node(), options);
  sparkline.render();
  return selection;
};

hx.Sparkline = Sparkline;

})();
(function(){
var StickyTableHeaders, cloneEvents, createStickyHeaderNodes, getChildren, getChildrenFromTable, updateHeaderPositions, updateScrollIndicators;

updateScrollIndicators = function(wrapper, top, right, bottom, left) {
  var canScrollDown, canScrollLeft, canScrollRight, canScrollUp, node;
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

updateHeaderPositions = function(container) {
  var leftNode, leftOffset, node, topNode, topOffset;
  node = getChildren(container, '.hx-sticky-table-wrapper')[0];
  leftOffset = -node.scrollLeft;
  topOffset = -node.scrollTop;
  topNode = getChildren(container, '.hx-sticky-table-header-top')[0];
  if (topNode != null) {
    hx.select(topNode).select('.hx-table').style('left', leftOffset + 'px');
  }
  leftNode = getChildren(container, '.hx-sticky-table-header-left')[0];
  if (leftNode != null) {
    return hx.select(leftNode).select('.hx-table').style('top', topOffset + 'px');
  }
};

cloneEvents = function(elem, clone) {
  var cloneChildren, cloneElem, cloneEmitter, elemChildren, elemData, i, j, k, len, listener, listenerNamesRegistered, origEmitter, ref, ref1, results;
  if ((elem != null) && (clone != null)) {
    elemData = hx.select.getHexagonElementDataObject(elem);
    listenerNamesRegistered = (ref = elemData.listenerNamesRegistered) != null ? ref.values() : void 0;
    if (listenerNamesRegistered && listenerNamesRegistered.length > 0) {
      origEmitter = elemData.eventEmitter;
      cloneElem = hx.select(clone);
      for (j = 0, len = listenerNamesRegistered.length; j < len; j++) {
        listener = listenerNamesRegistered[j];
        cloneElem.on(listener, function() {});
      }
      cloneEmitter = hx.select.getHexagonElementDataObject(clone).eventEmitter;
      cloneEmitter.pipe(origEmitter);
    }
    elemChildren = elem.childNodes;
    if (elemChildren) {
      cloneChildren = clone.childNodes;
      results = [];
      for (i = k = 0, ref1 = elemChildren.length; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
        results.push(cloneEvents(elemChildren[i], cloneChildren[i]));
      }
      return results;
    }
  }
};

getChildrenFromTable = function(t, body, single) {
  var realParents;
  realParents = getChildren(t.select(body ? 'tbody' : 'thead'), 'tr');
  return hx.flatten(realParents.map(function(parent) {
    return getChildren(hx.select(parent), 'th, td', single);
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
  for (i = j = 0, ref = real.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    cloneEvents(real[i], cloned[i]);
    results.push(hx.select(real[i]).classed('hx-sticky-table-invisible', true));
  }
  return results;
};

StickyTableHeaders = (function() {
  function StickyTableHeaders(selector, options) {
    var bottomIndicator, container, leftIndicator, resolvedOptions, rightIndicator, selection, self, showScrollIndicators, table, tableIsRootElement, topIndicator, wrapper;
    hx.component.register(selector, this);
    resolvedOptions = hx.merge.defined({
      stickTableHead: true,
      stickFirstColumn: false,
      useResponsive: true,
      fullWidth: void 0,
      containerClass: void 0
    }, options);
    selection = hx.select(selector);
    table = selection.classed('hx-table') || selection.node().nodeName.toLowerCase() === 'table' ? (tableIsRootElement = true, selection) : (tableIsRootElement = false, selection.select('.hx-table'));
    if (table.classed('hx-table-full') && (options.fullWidth == null)) {
      options.fullWidth = true;
    }
    if (resolvedOptions.stickTableHead && table.select('thead').selectAll('tr').empty()) {
      hx.consoleWarning('hx.StickyTableHeaders - ' + selector, 'Sticky table headers initialized with stickTableHead of true without a thead element present');
      resolvedOptions.stickTableHead = false;
    }
    if (resolvedOptions.stickFirstColumn && table.select('tbody').select('tr').selectAll('th, td').empty()) {
      hx.consoleWarning('hx.StickyTableHeaders - ' + selector, 'Sticky table headers initialized with stickFirstColumn of true without any columns to stick');
      resolvedOptions.stickFirstColumn = false;
    }
    container = tableIsRootElement ? table.insertAfter('div')["class"]('hx-sticky-table-headers') : selection.classed('hx-sticky-table-headers', true);
    if (resolvedOptions.containerClass) {
      container.classed(resolvedOptions.containerClass, true);
    }
    wrapper = container.append('div')["class"]('hx-sticky-table-wrapper');
    wrapper.append(table);
    showScrollIndicators = hx.scrollbarSize() === 0;
    if (showScrollIndicators) {
      topIndicator = container.append('div')["class"]('hx-sticky-table-scroll-top');
      rightIndicator = container.append('div')["class"]('hx-sticky-table-scroll-right');
      bottomIndicator = container.append('div')["class"]('hx-sticky-table-scroll-bottom');
      leftIndicator = container.append('div')["class"]('hx-sticky-table-scroll-left');
    }
    wrapper.on('scroll', 'hx.sticky-table-headers', function() {
      if (showScrollIndicators) {
        updateScrollIndicators(wrapper, topIndicator, rightIndicator, bottomIndicator, leftIndicator);
      }
      return updateHeaderPositions(container);
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

  StickyTableHeaders.prototype.render = function() {
    var _, background, bottomIndicator, clonedNodes, container, hasHorizontalScroll, hasVerticalScroll, heightScrollbarOffset, leftHead, leftIndicator, leftTable, offsetHeight, offsetWidth, offsetWidthElem, options, origScroll, realNodes, rightIndicator, scrollOffsetHeight, scrollOffsetWidth, table, tableBox, tableClone, topHead, topIndicator, topLeftHead, topLeftTable, topTable, totalHeight, totalWidth, widthScrollbarOffset, wrapper, wrapperBox, wrapperNode;
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
      offsetWidthElem = hx.select(table.select('tbody').select('tr').select('th, td').nodes[0]);
      offsetWidth = offsetWidthElem.width();
    }
    totalHeight = container.style('height').replace('px', '') - offsetHeight;
    totalWidth = container.style('width').replace('px', '') - offsetWidth;
    wrapper.style('width', totalWidth + 'px').style('height', totalHeight + 'px').style('margin-top', offsetHeight + 'px').style('margin-left', offsetWidth + 'px');
    table.style('margin-top', -offsetHeight + 'px').style('margin-left', -offsetWidth + 'px');
    tableBox = table.box();
    hasVerticalScroll = wrapperNode.scrollHeight > wrapperNode.clientHeight;
    hasHorizontalScroll = wrapperNode.scrollWidth > wrapperNode.clientWidth;
    heightScrollbarOffset = hasHorizontalScroll ? hx.scrollbarSize() : 0;
    widthScrollbarOffset = hasVerticalScroll ? hx.scrollbarSize() : 0;
    wrapperBox = wrapper.box();
    if (options.fullWidth) {
      table.style('width', void 0).style('min-width', wrapperBox.width + offsetWidth - widthScrollbarOffset - 1 + 'px');
    } else {
      wrapper.style('max-width', tableBox.width - offsetWidth + widthScrollbarOffset + 'px').style('max-height', tableBox.height - offsetHeight + heightScrollbarOffset + 'px');
    }
    tableClone = table.clone(true).style('height', table.style('height')).style('width', table.style('width'));
    if (options.stickTableHead) {
      topHead = container.select('.hx-sticky-table-header-top');
      if (topHead.empty()) {
        topHead = container.prepend('div')["class"]('hx-sticky-table-header-top');
        if (!_.showScrollIndicators && options.fullWidth) {
          background = table.select('th').style('background-color');
          topHead.style('background-color', background);
        }
      }
      topHead.clear();
      topTable = topHead.append(tableClone.clone(true));
      realNodes = getChildrenFromTable(table);
      clonedNodes = getChildrenFromTable(topTable);
      createStickyHeaderNodes(realNodes, clonedNodes);
    }
    if (options.stickFirstColumn) {
      leftHead = container.select('.hx-sticky-table-header-left');
      if (leftHead.empty()) {
        leftHead = container.prepend('div')["class"]('hx-sticky-table-header-left');
        if (!_.showScrollIndicators && options.fullWidth) {
          background = table.select('th').style('background-color');
          leftHead.style('background-color', background);
        }
      }
      leftHead.clear();
      leftTable = leftHead.append(tableClone.clone(true));
      realNodes = getChildrenFromTable(table, true, true);
      clonedNodes = getChildrenFromTable(leftTable, true, true);
      createStickyHeaderNodes(realNodes, clonedNodes);
    }
    if (options.stickTableHead && options.stickFirstColumn) {
      topLeftHead = container.select('.hx-sticky-table-header-top-left');
      if (topLeftHead.empty()) {
        topLeftHead = container.prepend('div')["class"]('hx-sticky-table-header-top-left');
      }
      topLeftHead.clear();
      topLeftTable = topLeftHead.append(tableClone.clone(true));
      realNodes = getChildrenFromTable(table, false, true);
      clonedNodes = getChildrenFromTable(topLeftTable, false, true);
      createStickyHeaderNodes(realNodes, clonedNodes);
    }
    if (topHead != null) {
      topHead.style('height', offsetHeight + 'px').style('width', wrapperBox.width + 'px').style('left', offsetWidth + 'px').selectAll('.hx-sticky-table-invisible').classed('hx-sticky-table-invisible', false);
    }
    if (topTable != null) {
      topTable.style('margin-left', -offsetWidth + 'px').selectAll('.hx-sticky-table-invisible').classed('hx-sticky-table-invisible', false);
    }
    if (leftHead != null) {
      leftHead.style('height', wrapperBox.height + 'px').style('width', offsetWidth + 'px').style('top', offsetHeight + 'px').selectAll('.hx-sticky-table-invisible').classed('hx-sticky-table-invisible', false);
    }
    if (leftTable != null) {
      leftTable.style('margin-top', -offsetHeight + 'px');
    }
    if (topLeftHead != null) {
      topLeftHead.style('width', (leftHead != null ? leftHead.style('width') : void 0) || offsetWidth + 'px').style('height', (topHead != null ? topHead.style('height') : void 0) || offsetHeight + 'px').selectAll('.hx-sticky-table-invisible').classed('hx-sticky-table-invisible', false);
    }
    wrapperNode.scrollTop = origScroll;
    if (_.showScrollIndicators) {
      scrollOffsetWidth = offsetWidth - 1;
      scrollOffsetHeight = offsetHeight - 1;
      topIndicator = container.select('.hx-sticky-table-scroll-top').style('top', scrollOffsetHeight + 'px').style('left', scrollOffsetWidth + 'px').style('width', wrapperBox.width + 'px');
      rightIndicator = container.select('.hx-sticky-table-scroll-right').style('top', scrollOffsetHeight + 'px').style('height', wrapperBox.height + 'px');
      bottomIndicator = container.select('.hx-sticky-table-scroll-bottom').style('left', scrollOffsetWidth + 'px').style('width', wrapperBox.width + 'px');
      leftIndicator = container.select('.hx-sticky-table-scroll-left').style('top', scrollOffsetHeight + 'px').style('left', scrollOffsetWidth + 'px').style('height', wrapperBox.height + 'px');
      updateScrollIndicators(wrapper, topIndicator, rightIndicator, bottomIndicator, leftIndicator);
    }
    return updateHeaderPositions(container);
  };

  return StickyTableHeaders;

})();

hx.StickyTableHeaders = StickyTableHeaders;

})();
(function(){
var Picker, setValue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

setValue = function(picker, value, items, cause) {
  var i, item, len, newVal;
  if (cause == null) {
    cause = 'api';
  }
  newVal = void 0;
  for (i = 0, len = items.length; i < len; i++) {
    item = items[i];
    if (item === value || (hx.isObject(item) && (item.value === value || item.value === (value != null ? value.value : void 0)))) {
      newVal = item;
      break;
    }
  }
  if (newVal != null) {
    picker.options.renderer(picker.selectedText.node(), newVal);
  } else {
    picker.selectedText.text(picker.options.noValueText);
  }
  if (picker.current !== newVal) {
    picker.current = newVal;
    return picker.emit('change', {
      value: newVal,
      cause: cause
    });
  }
};

Picker = (function(superClass) {
  extend(Picker, superClass);

  function Picker(selector, options) {
    var button;
    if (options == null) {
      options = {};
    }
    Picker.__super__.constructor.apply(this, arguments);
    this.options = hx.merge.defined({
      dropdownOptions: {},
      items: [],
      noValueText: 'Choose a value...',
      renderer: void 0,
      value: void 0,
      disabled: false
    }, options);
    hx.component.register(selector, this);
    this.selection = hx.select(selector);
    this.current = void 0;
    button = this.selection.classed('hx-picker hx-btn', true).append('span')["class"]('hx-picker-inner').attr('type', 'button');
    this.selectedText = button.append('span')["class"]('hx-picker-text');
    button.append('span')["class"]('hx-picker-icon').append('i')["class"]('hx-icon hx-icon-caret-down');
    this.menu = new hx.Menu(selector, {
      dropdownOptions: this.options.dropdownOptions,
      items: this.options.items,
      renderer: this.options.renderer,
      disabled: this.options.disabled
    });
    this.menu.on('change', 'hx.picker', (function(_this) {
      return function(item) {
        if ((item != null ? item.content : void 0) != null) {
          setValue(_this, item.content, _this.items(), 'user');
          return _this.menu.hide();
        }
      };
    })(this));
    if (this.options.renderer == null) {
      this.options.renderer = this.menu.renderer();
    }
    if (this.options.value != null) {
      this.value(this.options.value);
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
      this.value(this.current);
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
        loading.append('i')["class"]('hx-menu-loading hx-icon hx-icon-spin hx-icon-spinner');
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

  Picker.prototype.disabled = function(disable) {
    var menuDisable;
    menuDisable = this.menu.disabled(disable);
    if (disable != null) {
      return this;
    } else {
      return menuDisable;
    }
  };

  return Picker;

})(hx.EventEmitter);

hx.picker = function(options) {
  var selection;
  selection = hx.detached('button');
  new Picker(selection.node(), options);
  return selection;
};

hx.Picker = Picker;

})();
(function(){
var ButtonGroup,
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
      buttonClass: 'hx-complement',
      activeClass: 'hx-contrast',
      fullWidth: false,
      renderer: function(node, data, current) {
        hx.select(node).text(data.value != null ? data.value : data);
      },
      items: [],
      disabled: false
    }, options);
    this.current = void 0;
    group = hx.select(selector).classed('hx-button-group', true).append('div')["class"]('hx-input-group').classed('hx-input-group-full-width', this.options.fullWidth);
    this.view = group.view('button').enter(function() {
      return this.append('button')["class"]('hx-btn').classed('hx-section hx-no-margin', self.options.fullWidth).classed(self.options.buttonClass, true).node();
    }).update(function(item, node) {
      var buttonClass;
      buttonClass = (item.activeClass != null) && item === self.current ? item.activeClass : item === self.current ? self.options.activeClass : self.options.buttonClass;
      this["class"]('hx-btn').classed('hx-section hx-no-margin', self.options.fullWidth).classed(buttonClass, true).attr('disabled', self.options.disabled ? true : void 0).on('click', 'hx.button-group', function() {
        return self.value(item, true);
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
          this.emit('change', {
            value: item,
            cause: arguments[1] ? 'user' : 'api'
          });
          break;
        }
      }
      return this;
    } else {
      return this.current;
    }
  };

  ButtonGroup.prototype.disabled = function(disabled) {
    if (arguments.length > 0) {
      this.options.disabled = disabled;
      this.items(this.items());
      return this;
    } else {
      return this.options.disabled;
    }
  };

  return ButtonGroup;

})(hx.EventEmitter);

hx.buttonGroup = function(options) {
  var selection;
  selection = hx.detached('div');
  new ButtonGroup(selection.node(), options);
  return selection;
};

hx.ButtonGroup = ButtonGroup;

})();
(function(){
var hx_xhr, parsers, performRequest, reshapedRequest, respondToRequest, sendRequest;

respondToRequest = function(request, url, data, callback, options, index) {
  var e, error1, result, source, status;
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

parsers = {
  'application/json': function(text) {
    if (text) {
      return JSON.parse(text);
    }
  },
  'text/html': function(text) {
    return hx.parseHTML(text);
  },
  'text/plain': function(text) {
    return text;
  }
};

reshapedRequest = function(type) {
  return function(urls, data, callback, options) {
    var defaults, ref;
    if (hx.isFunction(data)) {
      ref = [void 0, data, callback], data = ref[0], callback = ref[1], options = ref[2];
    }
    defaults = type ? {
      contentType: type,
      formatter: function(xhr) {
        return parsers[type](xhr.responseText);
      }
    } : {
      formatter: function(xhr) {
        var mimeType, parser;
        mimeType = xhr.getResponseHeader('content-type').split(';')[0];
        parser = parsers[mimeType];
        if (parser) {
          return parser(xhr.responseText);
        } else {
          hx.consoleWarning("Unknown parser for mime type " + mimeType + ", carrying on anyway");
          return xhr;
        }
      }
    };
    options = hx.merge(defaults, options);
    return hx.request(urls, data, callback, options);
  };
};

hx.json = reshapedRequest('application/json');

hx.html = reshapedRequest('text/html');

hx.text = reshapedRequest('text/plain');

hx.reshapedRequest = reshapedRequest();

})();

(function(){
var DatePicker, buildCalendar, buildDatepicker, calendarGridRowUpdate, calendarGridUpdate, getCalendarDecade, getCalendarMonth, getCalendarYear, isBetweenDates, isSelectable, isSelected, isToday, setupInput, updateDatepicker, validateDates, zeroPad,
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
      data.unshift('days');
      cls = 'hx-calendar-month';
      text = localizer.month(visible.month - 1) + ' / ' + localizer.year(visible.year);
  }
  _.calendarGrid["class"]('hx-calendar-grid ' + cls);
  _.calendarHeadBtn.text(text);
  if ((ref = _.calendarTodayButton) != null) {
    ref.text(localizer.todayText());
  }
  return _.calendarView.apply(data);
};

calendarGridUpdate = function(datepicker, data, elem, index, mode) {
  var _, element;
  _ = datepicker._;
  element = hx.select(elem);
  if (data === 'days') {
    return element.classed('hx-grid-row-heading', true).view('.hx-grid').update(function(d) {
      return this.text(d).node();
    }).apply(datepicker.localizer.weekDays());
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
      return element.on('click', 'hx-date-picker', function() {
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

setupInput = function(datepicker) {
  var _, range;
  _ = datepicker._;
  if (datepicker.options.selectRange) {
    range = datepicker.range();
    _.inputStart.value(datepicker.localizer.date(range.start, _.useInbuilt));
    return _.inputEnd.value(datepicker.localizer.date(range.end || range.start, _.useInbuilt));
  } else {
    return _.input.value(datepicker.localizer.date(datepicker.date(), _.useInbuilt));
  }
};

updateDatepicker = function(datepicker, suppress) {
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
      endDate: new Date,
      uniqueId: hx.randomId()
    };
    hx.preferences.on('localechange', 'hx.date-picker-' + _.uniqueId, (function(_this) {
      return function() {
        return updateDatepicker(_this, true);
      };
    })(this));
    hx.preferences.on('timezonechange', 'hx.date-picker-' + _.uniqueId, (function(_this) {
      return function() {
        return updateDatepicker(_this, true);
      };
    })(this));
    _.startDate.setHours(0, 0, 0, 0);
    _.endDate.setHours(0, 0, 0, 0);
    this.localizer = hx.dateTimeLocalizer();
    this.selection = hx.select(this.selector).classed('hx-date-picker', true);
    inputContainer = this.selection.append('div')["class"]('hx-date-input-container');
    icon = inputContainer.append('i')["class"]('hx-icon hx-icon-calendar');
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
      _.inputStart = inputContainer.append('input')["class"]('hx-date-input').on('input', 'hx.date-picker', function() {
        return inputUpdate(false);
      });
      inputContainer.append('i')["class"]('hx-date-to-icon hx-icon hx-icon-angle-double-right');
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
          date = self.localizer.stringToDate(_.input.value(), _.useInbuilt);
          if (date.getTime()) {
            if (date.getTime() !== self.date().getTime()) {
              self.date(date);
              if (self.options.type === 'calendar') {
                return self.visibleMonth(date.getMonth() + 1, date.getFullYear());
              }
            }
          } else {
            return _.input.classed('hx-date-error', true);
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
      calendarElem["class"]('hx-date-picker-calendar');
      calendarHeader = calendarElem.append('div')["class"]('hx-calendar-header hx-input-group');
      calendarHeader.append('button')["class"]('hx-btn hx-btn-invert hx-calendar-back').on('click', 'hx.date-picker', function() {
        return changeVis(-1);
      }).append('i')["class"]('hx-icon hx-icon-chevron-left');
      _.calendarHeadBtn = calendarHeader.append('button')["class"]('hx-btn hx-btn-invert hx-calendar-button').on('click', 'hx.date-picker', function() {
        switch (_.mode) {
          case 'd':
            break;
          case 'y':
            return buildCalendar(self, 'd');
          default:
            return buildCalendar(self, 'y');
        }
      });
      calendarHeader.append('button')["class"]('hx-btn hx-btn-invert hx-calendar-forward').on('click', 'hx.date-picker', function() {
        return changeVis();
      }).append('i')["class"]('hx-icon hx-icon-chevron-right');
      _.calendarGrid = calendarElem.append('div')["class"]('hx-calendar-grid');
      if (this.options.showTodayButton) {
        _.calendarTodayButton = calendarElem.append('div')["class"]('hx-calendar-today-btn').append('button')["class"]('hx-btn hx-btn-invert').on('click', 'hx.date-picker', function() {
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
      _.dayPicker = new hx.NumberPicker(dayNode, {
        buttonClass: 'hx-btn-invert'
      }).on('change', 'hx.date-picker', function(e) {
        _.userEvent = true;
        return self.day(e.value);
      });
      _.monthPicker = new hx.NumberPicker(monthNode, {
        buttonClass: 'hx-btn-invert'
      }).on('change', 'hx.date-picker', function(e) {
        _.userEvent = true;
        return self.month(e.value);
      });
      _.yearPicker = new hx.NumberPicker(yearNode, {
        buttonClass: 'hx-btn-invert'
      }).on('change', 'hx.date-picker', function(e) {
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
          ref = self.localizer.dateOrder();
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
      this.dropdown.on('hidestart', (function(_this) {
        return function() {
          return _this.emit('hide');
        };
      })(this));
      this.dropdown.on('showstart', (function(_this) {
        return function() {
          return _this.emit('show');
        };
      })(this));
    }
    setupInput(this);
    if (_.disable) {
      this.disabled(_.disabled);
    }
  }

  DatePicker.prototype.disabled = function(disable) {
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

  DatePicker.prototype.show = function() {
    if (!this._.useInbuilt) {
      this.dropdown.show();
    } else {
      this._.input.node().focus();
    }
    return this;
  };

  DatePicker.prototype.hide = function() {
    if (!this._.useInbuilt) {
      this.dropdown.hide();
    } else {
      this.emit('hide');
    }
    return this;
  };

  DatePicker.prototype.getScreenDate = function(endDate) {
    return this.localizer.date(!endDate ? _.startDate : _.endDate);
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
    hx.deprecatedWarning('hx.DatePicker::locale is deprecated. Use hx.preferences.locale instead.');
    if (arguments.length > 0) {
      hx.preferences.locale(locale);
      return this;
    } else {
      return hx.preferences.locale();
    }
  };

  return DatePicker;

})(hx.EventEmitter);

hx.datePicker = function(options) {
  var selection;
  selection = hx.detached('div');
  new DatePicker(selection.node(), options);
  return selection;
};

hx.DatePicker = DatePicker;

})();
(function(){
var TimePicker, setupInput, setupTimepicker, updateTimePicker, zeroPad,
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

updateTimePicker = function(timepicker, suppress) {
  var _;
  if (!timepicker.preventFeedback) {
    _ = timepicker._;
    timepicker.preventFeedback = true;
    timepicker.input.classed('hx-time-error', false);
    setupInput(timepicker);
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

TimePicker = (function(superClass) {
  extend(TimePicker, superClass);

  function TimePicker(selector, options) {
    var _, hourNode, icon, inputContainer, minuteNode, second, setupDropdown, timeout;
    this.selector = selector;
    TimePicker.__super__.constructor.apply(this, arguments);
    this.options = hx.merge({
      showSeconds: false,
      buttonClass: 'hx-btn-invert',
      disabled: false
    }, options);
    hx.component.register(this.selector, this);
    _ = this._ = {
      disabled: this.options.disabled,
      uniqueId: hx.randomId()
    };
    hx.preferences.on('localechange', 'hx.time-picker-' + _.uniqueId, (function(_this) {
      return function() {
        return updateTimePicker(_this, true);
      };
    })(this));
    hx.preferences.on('timezonechange', 'hx.time-picker-' + _.uniqueId, (function(_this) {
      return function() {
        return updateTimePicker(_this, true);
      };
    })(this));
    _.localizer = hx.dateTimeLocalizer();
    _.selectedDate = new Date;
    _.selectedDate.setMilliseconds(0);
    if (!this.showSeconds) {
      _.selectedDate.setSeconds(0);
    }
    this.selection = hx.select(this.selector).classed('hx-time-picker', true);
    inputContainer = this.selection.append('div')["class"]('hx-time-input-container');
    icon = inputContainer.append('i')["class"]('hx-icon hx-icon-clock-o');
    this.input = inputContainer.append('input')["class"]('hx-time-input');
    timeout = void 0;
    if (hx.supports('date') && hx.supports('touch')) {
      this.input.attr('readonly', true);
      this.input.on('click', 'hx.time-picker', function(event) {
        return event.preventDefault();
      });
    } else {
      this.input.on('input', 'hx.time-picker', (function(_this) {
        return function(event) {
          clearTimeout(timeout);
          return timeout = setTimeout(function() {
            var time;
            time = event.target.value.split(':');
            if (time[2] == null) {
              time[2] = 0;
            }
            if (_.localizer.checkTime(time)) {
              _this.hour(time[0]);
              _this.minute(time[1]);
              return _this.second(time[2] || 0);
            } else {
              return _this.input.classed('hx-time-error', true);
            }
          }, 200);
        };
      })(this));
    }
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
        if (!_.disabled) {
          if (_this.input.attr('disabled') === void 0) {
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
        }
      };
    })(this);
    this.dropdown = new hx.Dropdown(this.selector, setupDropdown, {
      matchWidth: false,
      ddClass: 'hx-time-picker-dropdown'
    });
    this.dropdown.on('hidestart', (function(_this) {
      return function() {
        return _this.emit('hide');
      };
    })(this));
    this.dropdown.on('showstart', (function(_this) {
      return function() {
        return _this.emit('show');
      };
    })(this));
    if (_.disabled) {
      this.disabled(_.disabled);
    }
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
    return this._.localizer.time(this.date(), this.options.showSeconds);
  };

  TimePicker.prototype.locale = function(locale) {
    hx.deprecatedWarning('hx.TimePicker::locale is deprecated. Use hx.preferences.locale instead.');
    if (arguments.length > 0) {
      hx.preferences.locale(locale);
      return this;
    } else {
      return hx.preferences.locale();
    }
  };

  TimePicker.prototype.disabled = function(disable) {
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

})(hx.EventEmitter);

hx.timePicker = function(options) {
  var selection;
  selection = hx.detached('div');
  new TimePicker(selection.node(), options);
  return selection;
};

hx.TimePicker = TimePicker;

})();
(function(){
var factory;

factory = function(type, clasz) {
  return function() {
    return hx.detached(type)["class"](clasz);
  };
};

hx.inputGroup = factory('div', 'hx-input-group');

hx.notice = factory('div', 'hx-notice');

hx.notice.head = factory('div', 'hx-notice-head');

hx.notice.body = factory('div', 'hx-notice-body');

hx.spinner = factory('span', 'hx-spinner');

hx.spinner.wide = factory('div', 'hx-spinner-wide');

hx.icon = function(options) {
  return hx.detached('i')["class"](options != null ? options["class"] : void 0);
};

hx.button = function(options) {
  return hx.palette.context(hx.detached('button').attr('type', 'button')["class"]('hx-btn'), options != null ? options.context : void 0);
};

hx.label = function(options) {
  return hx.palette.context(hx.detached('span')["class"]('hx-label'), options != null ? options.context : void 0);
};

hx.group = factory('div', 'hx-group hx-horizontal');

hx.group.vertical = factory('div', 'hx-group hx-vertical');

hx.group.fixed = factory('div', 'hx-group hx-horizontal hx-fixed');

hx.group.vertical.fixed = factory('div', 'hx-group hx-vertical hx-fixed');

hx.section = factory('div', 'hx-section');

hx.section.fixed = factory('div', 'hx-section hx-fixed');

hx.checkbox = function() {
  return hx.detached('input').attr('type', 'checkbox');
};

})();
(function(){
var TagInput,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TagInput = (function(superClass) {
  var addTag;

  extend(TagInput, superClass);

  function TagInput(selector, options) {
    var _, backspacedown, hasError;
    this.selector = selector;
    TagInput.__super__.constructor.apply(this, arguments);
    _ = this._ = {};
    this.options = hx.merge.defined({
      classifier: void 0,
      validator: void 0,
      draggable: true,
      items: []
    }, options);
    hx.component.register(this.selector, this);
    this.selection = hx.select(this.selector).classed('hx-tag-input', true);
    this.tagContainer = this.selection.append('span')["class"]('hx-tags-container');
    if (this.options.draggable) {
      _.dragContainer = new hx.DragContainer(this.tagContainer.node());
    }
    this.form = this.selection.append('form');
    this.input = this.form.append('input').attr('placeholder', 'add tag...');
    backspacedown = false;
    hasError = (function(_this) {
      return function() {
        var error, name;
        name = _this.input.value();
        if (name === '') {
          _this.input.node().setCustomValidity('');
          return false;
        } else if (_this.options.validator) {
          error = _this.options.validator(name) || '';
          _this.input.node().setCustomValidity(error);
          return error.length > 0;
        }
      };
    })(this);
    this.form.on('keypress', 'hx.tag-input', (function(_this) {
      return function(event) {
        var name;
        if (event.keyCode === 13) {
          if (_this.form.node().checkValidity()) {
            event.preventDefault();
            name = _this.input.value();
            if (name) {
              _.userEvent = true;
              return _this.add(name, void 0);
            }
          }
        }
      };
    })(this));
    this.input.on('input', 'hx.tag-input', hasError);
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
    this.input.on('blur', 'hx.tag-input', (function(_this) {
      return function(event) {
        if (_this.input.value().length > 0 && !hasError()) {
          return _this.add(_this.input.value(), void 0);
        }
      };
    })(this));
    this.input.on('focus', 'hx.tag-input', (function(_this) {
      return function(event) {
        if (hasError()) {
          return _this.form.node().checkValidity();
        }
      };
    })(this));
    if (this.options.disabled) {
      this.disabled(this.options.disabled);
    }
    if (this.options.items) {
      this.items(this.options.items);
    }
  }

  addTag = function(tagInput, name, clasz) {
    var cls, tagSelection;
    tagSelection = tagInput.tagContainer.append('div')["class"]('hx-tag').add(hx.detached('span')["class"]('hx-tag-text').text(name)).add(hx.detached('span')["class"]('hx-tag-remove').add(hx.detached('i')["class"]('hx-icon hx-icon-close')));
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
    tagSelection.select('.hx-tag-remove').on('click', 'hx.tag-input', (function(_this) {
      return function() {
        var value;
        if (!tagInput._.disabled && !tagSelection.classed('hx-disabled')) {
          value = tagSelection.text();
          tagSelection.remove();
          return tagInput.emit('remove', {
            value: value,
            type: 'user'
          });
        }
      };
    })(this));
    tagInput.emit('add', {
      value: name,
      type: tagInput._.userEvent ? 'user' : 'api'
    });
    return tagInput._.userEvent = false;
  };

  TagInput.prototype.add = function(name, cssclass) {
    var i, len, n;
    if (hx.isArray(name)) {
      for (i = 0, len = name.length; i < len; i++) {
        n = name[i];
        addTag(this, n, cssclass);
      }
    } else {
      addTag(this, name, cssclass);
    }
    this.input.value('');
    if (this.options.draggable) {
      this._.dragContainer.setup();
    }
    return this;
  };

  TagInput.prototype.remove = function(name) {
    var returnValue, tags;
    if (name != null) {
      returnValue = this.tagContainer.selectAll('.hx-tag').filter(function(d) {
        return d.text() === name;
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
      returnValue = tags.text();
      tags.remove();
    }
    if (this.options.draggable) {
      this._.dragContainer.setup();
    }
    return returnValue;
  };

  TagInput.prototype.items = function(items, cssclass) {
    if (arguments.length > 0) {
      this.remove();
      this.add(items, cssclass);
      return this;
    } else {
      return this.tagContainer.selectAll('.hx-tag').select('.hx-tag-text').text();
    }
  };

  TagInput.prototype.disabled = function(disable) {
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

})(hx.EventEmitter);

hx.tagInput = function(options) {
  var selection;
  selection = hx.detached('div');
  new TagInput(selection.node(), options);
  return selection;
};

hx.TagInput = TagInput;

})();
(function(){
var InlineMorphSection, MorphSection,
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
(function(){
var TitleBar, setVisibility;

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
    isFixed = hx.select('body').classed('hx-heading-fixed');
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
(function(){
var Slider, discreteToPos, posToDiscrete, posToValue, renderValues, slide, slideEnd,
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
  return this._.discreteValues.get(discrete);
};

posToDiscrete = function(pos) {
  var _, j, k, len, ref, ref1, space, v;
  _ = this._;
  space = _.discreteSpacing / 2;
  ref = _.discreteValues.entries();
  for (j = 0, len = ref.length; j < len; j++) {
    ref1 = ref[j], k = ref1[0], v = ref1[1];
    if (pos >= (v - space) && pos < (v + space)) {
      return k;
    }
  }
  return pos;
};

slide = function(e) {
  var _, diff, end, isEnd, offset, pos, prevValue, start, val;
  _ = this._;
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
      step: void 0,
      disabled: false
    }, options);
    this._ = _ = {};
    _.isDiscrete = ((ref = this.options.discreteValues) != null ? ref.length : void 0) > 0 || (this.options.step != null);
    self = this;
    _.container = hx.select(this.selector).classed('hx-slider', true).append('div').classed('hx-slider-inner', true).classed('hx-slider-double', this.options.type === 'range').classed('hx-slider-discrete', _.isDiscrete).on('pointerdown', 'hx.slider', (function(_this) {
      return function(e) {
        if (!_.disabled) {
          _this.emit('slidestart', _this.value());
          return slide.call(_this, e);
        }
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
    if (this.options.disabled) {
      this.disabled(this.options.disabled);
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
      _.discreteValues = new hx.Map();
      _.discreteSpacing = 1 / (array.length - 1);
      _.container.selectAll('.hx-slider-point').remove();
      for (i = j = 0, ref1 = array.length; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
        pos = i * _.discreteSpacing;
        _.discreteValues.set(array[i], pos);
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

  Slider.prototype.disabled = function(disable) {
    if (disable != null) {
      this._.disabled = disable;
      return hx.select(this.selector).classed('hx-disabled', disable);
    } else {
      return !!this._.disabled;
    }
  };

  return Slider;

})(hx.EventEmitter);

hx.slider = function(options) {
  var selection;
  selection = hx.detached('div');
  new Slider(selection.node(), options);
  return selection;
};

hx.Slider = Slider;

})();
(function(){
var AutoComplete, buildAutoComplete, findTerm, showAutoComplete,
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
        _.menu.dropdown._.setupDropdown(_.menu.dropdown._.dropdown.node());
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

  function AutoComplete(selector, data1, options1) {
    var _, _filterOpts, base, base1, base2, input, menu, self, timeout;
    this.selector = selector;
    this.data = data1;
    this.options = options1 != null ? options1 : {};
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
        dropdownOptions: {
          ddClass: 'hx-autocomplete-dropdown'
        }
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

hx.autoComplete = function(data, options) {
  var selection;
  selection = hx.detached('input');
  new AutoComplete(selection.node(), data, options);
  return selection;
};

hx.AutoComplete = AutoComplete;

})();
(function(){
var backgroundContext, classContext, defineComponent, directions, div, fixes, getComponentParent, headers, i, joints, len, ref, size, sizes, span, textContext, textLikeComponent;

div = function(clasz) {
  return hx.detached('div')["class"](clasz);
};

span = function(clasz) {
  return hx.detached('span')["class"](clasz);
};

classContext = function(selection, context) {
  if (context) {
    return selection.classed('hx-' + context, true);
  } else {
    return selection;
  }
};

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

hx.card = function() {
  return div('hx-card');
};

hx.card.small = function() {
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
          types = [size, fixed, joint, direction, header].filter(hx.defined);
          base = hx.card;
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
  base = hx.card;
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
    }).join(' '));
    backgroundContext(selection, options != null ? options.context : void 0);
    hx.component.register(selection.node(), {
      context: function(context) {
        return backgroundContext(selection, context);
      }
    });
    if (typeof setup === "function") {
      setup(selection, options);
    }
    return selection;
  };
};

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
for (i = 0, len = ref.length; i < len; i++) {
  size = ref[i];
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

hx.card.aligned = function() {
  return hx.detached('div')["class"]('hx-card-aligned');
};


/* building blocks */

hx.card.large = {};

textLikeComponent = function(elementType, clasz) {
  return function(options) {
    var context, selection;
    selection = textContext(hx.detached(elementType)["class"](clasz).text(options.text), options != null ? options.context : void 0);
    context = options != null ? options.context : void 0;
    hx.component.register(selection.node(), {
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
    return selection;
  };
};

hx.card.text = textLikeComponent('span', 'hx-card-text');

hx.card.small.text = function(options) {
  return hx.card.text(options).classed('hx-card-small', true);
};

hx.card.large.text = function(options) {
  return hx.card.text(options).classed('hx-card-large', true);
};

hx.card.title = textLikeComponent('div', 'hx-card-title hx-header');

hx.card.small.title = function(options) {
  return hx.card.title(options).classed('hx-card-small', true);
};

hx.card.large.title = function(options) {
  return hx.card.title(options).classed('hx-card-large', true);
};

hx.card.icon = function(options) {
  var selection;
  selection = textContext(hx.detached('i')["class"]('hx-card-icon ' + (options.icon || '')), options != null ? options.context : void 0);
  hx.component.register(selection.node(), {
    icon: function(icon) {
      selection["class"]('hx-card-icon ' + (icon || ''));
      return this;
    },
    context: function(context) {
      textContext(selection, context);
      return this;
    }
  });
  return selection;
};

hx.card.small.icon = function(options) {
  return hx.card.icon(options).classed('hx-card-small', true);
};

hx.card.large.icon = function(options) {
  return hx.card.icon(options).classed('hx-card-large', true);
};


/* sections */

hx.card.action = {
  icon: {}
};

hx.card.icon.action = {};

hx.card.action.section = function(options) {
  return hx.card.section(options).add(hx.detached('a').attr('href', options.link)["class"]('hx-card-action').add(hx.card.text(options)));
};

hx.card.action.icon.section = function(options) {
  return hx.card.section(options).add(hx.detached('a').attr('href', options.link)["class"]('hx-card-action').add(hx.card.text(options)).add(hx.card.icon(options)));
};

hx.card.icon.action.section = function(options) {
  return hx.card.section(options).add(hx.detached('a').attr('href', options.link)["class"]('hx-card-action').add(hx.card.icon(options)).add(hx.card.text(options)));
};

hx.card.notice = function(options) {
  if (options == null) {
    options = {};
  }
  return hx.card().classed('hx-card-small', true).add(hx.card.header.section({
    sectionContext: options.context || 'info'
  }).add(hx.card.title({
    titleText: options.title || 'Note'
  }))).add(hx.card.section().add(hx.card.text({
    text: options.message
  })));
};

})();
(function(){
var ColorPicker, Position,
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
      align: 'lblt',
      disabled: false
    }, options);
    hx.component.register(selector, this);
    this._ = {};
    _ = this._;
    buildDropdown = (function(_this) {
      return function(elem) {
        var absoluteCursorPosition, blueBoxChanged, blueInput, cancelEvent, circleDown, circleDragObject, circleHeight, circleMoved, circleOffset, circlePicker, circlemax, circlemin, colorChanged, colorGroup, correctOffset, dragObject, endMovement, getEventTarget, getMousePos, greenBoxChanged, greenInput, grid, gridSize, hexBoxChanged, hexInput, hslGroup, hueBoxChanged, hueInput, inputs, lightnessBoxChanged, lightnessInput, makeInput, picker, pickerFields, pickerInner, pointerOffset, quickColorBox, redBoxChanged, redInput, rgbGroup, saturationBoxChanged, saturationInput, slider, sliderDown, sliderDragObject, sliderHeight, sliderMoved, sliderOffset, sliderPicker, slidermax, slidermin, staticColorBox;
        if (_this.options.disabled) {
          _this.dropdown.hide();
          return false;
        }
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
            redInput.value(_.currentColor.red());
            greenInput.value(_.currentColor.green());
            blueInput.value(_.currentColor.blue());
            hueInput.value(_.currentColor.hue());
            saturationInput.value(_.currentColor.saturation());
            lightnessInput.value(_.currentColor.lightness());
            quickColorBox.style('background', _.currentColor.toString());
          }
          if (source === 'slider' || source === 'box') {
            gridBG = hx.color().hsl([_.currentColor.hue(), 100, 50]);
            grid.style('background-color', gridBG.toString());
          }
          if (source === 'box') {
            sliderPicker.style('top', (gridSize - ((_.currentColor.hue() / 360) * gridSize) - sliderOffset.y) + 'px');
            pos = new Position((_.currentColor.saturation() / 100) * gridSize, (1 - _.currentColor.lightness() / 100) * gridSize);
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
          _.currentColor.rgb([parseInt(redInput.value()) || 0, _.currentColor.green(), _.currentColor.blue()]);
          return colorChanged('box');
        };
        greenBoxChanged = function(e) {
          _.currentColor.rgb([_.currentColor.red(), parseInt(greenInput.value()) || 0, _.currentColor.blue()]);
          return colorChanged('box');
        };
        blueBoxChanged = function(e) {
          _.currentColor.rgb([_.currentColor.red(), _.currentColor.green(), parseInt(blueInput.value()) || 0]);
          return colorChanged('box');
        };
        hueBoxChanged = function(e) {
          _.currentColor.hsl([parseInt(hueInput.value()) || 0, _.currentColor.saturation(), _.currentColor.lightness()]);
          return colorChanged('box');
        };
        saturationBoxChanged = function(e) {
          _.currentColor.hsl([_.currentColor.hue(), (parseInt(saturationInput.value())) || 0, _.currentColor.lightness()]);
          return colorChanged('box');
        };
        lightnessBoxChanged = function(e) {
          _.currentColor.hsl([_.currentColor.hue(), _.currentColor.saturation(), (parseInt(lightnessInput.value())) || 0]);
          return colorChanged('box');
        };
        sliderMoved = function(pos, elem) {
          pos = correctOffset(pos, sliderOffset, false);
          _.currentColor.hsl([((gridSize - pos.y) / gridSize) * 360, _.currentColor.saturation(), _.currentColor.lightness()]);
          return colorChanged('slider');
        };
        circleMoved = function(pos, elem) {
          pos = correctOffset(pos, circleOffset, false);
          _.currentColor.hsl([_.currentColor.hue(), (pos.x / gridSize) * 100, (1 - pos.y / gridSize) * 100]);
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
    _.selector = selector;
    this.value(this.options.startColor);
    this.dropdown.pipe(this, 'dropdown');
    if (this.options.disabled) {
      this.disabled(this.options.disabled);
    }
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

  ColorPicker.prototype.disabled = function(disabled) {
    if (arguments.length > 0) {
      this.options.disabled = disabled;
      hx.select(this._.selector).attr('disabled', disabled ? true : void 0).classed('hx-disabled', disabled);
      if (this.dropdown.isOpen() && disabled === true) {
        this.dropdown.hide();
      }
      return this;
    } else {
      return this.options.disabled;
    }
  };

  return ColorPicker;

})(hx.EventEmitter);

hx.colorPicker = function(options) {
  var selection;
  selection = hx.detached('div');
  new ColorPicker(selection.node(), options);
  return selection;
};

hx.ColorPicker = ColorPicker;

})();
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
(function(){
var Crumbtrail;

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

hx.crumbtrail = function(options) {
  var selection;
  selection = hx.detached('div');
  new Crumbtrail(selection.node(), options);
  return selection;
};

hx.Crumbtrail = Crumbtrail;

})();
(function(){
var DataTable, collapseBreakPoint, fullWidthColSpan, objectFeed, urlFeed,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fullWidthColSpan = 999;

collapseBreakPoint = 480;

DataTable = (function(superClass) {
  var columnOnlyOption, columnOption, option;

  extend(DataTable, superClass);

  function DataTable(selector, options) {
    var content, filterInput, footer, onInput, pagePicker, pagePickerBack, pagePickerContainer, pagePickerForward, pagePickerNode, pagePickerTotalRows, pageSizeContainer, pageSizeNode, pageSizePicker, paginationContainer, randomId, resolvedOptions, selection, sortColPicker, sortDiv, statusBar;
    DataTable.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    resolvedOptions = hx.merge({
      allowHeaderWrap: false,
      compact: 'auto',
      displayMode: 'paginate',
      feed: void 0,
      filter: void 0,
      filterEnabled: true,
      noDataMessage: 'No Data',
      pageSize: 15,
      pageSizeOptions: void 0,
      retainHorizontalScrollOnRender: true,
      retainVerticalScrollOnRender: false,
      selectEnabled: false,
      singleSelection: false,
      sort: void 0,
      sortEnabled: true,
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
      collapsibleRenderer: void 0,
      cellRenderer: function(element, cell, row) {
        return hx.select(element).text(cell);
      },
      headerCellRenderer: function(element, cell, headers) {
        return hx.select(element).text(cell.name);
      },
      columns: {}
    }, options);
    selection = hx.select(selector).classed('hx-data-table', true);
    content = selection.append('div')["class"]('hx-data-table-content');
    statusBar = selection.append('div')["class"]('hx-data-table-status-bar');
    footer = selection.append('div')["class"]('hx-data-table-footer');
    resolvedOptions.pageSize = Math.min(resolvedOptions.pageSize, 1000);
    onInput = hx.debounce(200, (function(_this) {
      return function() {
        return _this.filter(filterInput.value(), void 0, 'user');
      };
    })(this));
    filterInput = footer.append('input')["class"]('hx-data-table-filter-control').attr('placeholder', 'Search').classed('hx-data-table-filter-visible', resolvedOptions.filterEnabled).on('input', 'hx.data-table', onInput);
    selection.append('div')["class"]('hx-data-table-loading').append('div')["class"]('hx-data-table-loading-inner').append('div')["class"]('hx-spinner').insertAfter('span').text(' Loading');
    statusBar.append('span')["class"]('hx-data-table-status-bar-text').insertAfter('span')["class"]('hx-data-table-status-bar-clear').text(' (clear selection)').on('click', 'hx.data-table', (function(_this) {
      return function() {
        _this._.selectedRows.clear();
        selection.select('.hx-data-table-content').selectAll('.hx-data-table-row-selected').classed('hx-data-table-row-selected', false);
        _this.updateSelected();
        return _this.emit('selectedrowsclear');
      };
    })(this));
    sortDiv = footer.append('div')["class"]('hx-data-table-sort-control').classed('hx-data-table-sort-visible', resolvedOptions.sortEnabled);
    sortDiv.append('span').text('Sort By: ');
    sortColPicker = new hx.Picker(sortDiv.append('button')["class"]('hx-btn hx-btn-invisible').node());
    sortColPicker.on('change', 'hx.data-table', (function(_this) {
      return function(d) {
        if (d.cause === 'user') {
          return _this.sort({
            column: sortColPicker.value().column,
            direction: sortColPicker.value().direction
          });
        }
      };
    })(this));
    footer.append('div')["class"]('hx-data-table-footer-spacer');
    paginationContainer = footer.append('div')["class"]('hx-data-table-pagination-block');
    pagePickerContainer = paginationContainer.append('div')["class"]('hx-data-table-paginator');
    pagePickerNode = pagePickerContainer.append('button')["class"]('hx-data-table-pagination-picker hx-btn hx-btn-invisible').node();
    pagePicker = new hx.Picker(pagePickerNode, {
      dropdownOptions: {
        align: 'rbrt'
      }
    }).on('change', 'hx.data-table', (function(_this) {
      return function(d) {
        if (d.cause === 'user') {
          return _this.page(d.value.value, void 0, d.cause);
        }
      };
    })(this));
    pagePickerTotalRows = pagePickerContainer.append('span')["class"]('hx-data-table-paginator-total-rows');
    pagePickerBack = pagePickerContainer.append('button')["class"]('hx-data-table-paginator-back hx-btn hx-btn-invisible');
    pagePickerBack.append('i')["class"]('hx-icon hx-icon-chevron-left');
    pagePickerBack.on('click', 'hx.data-table', (function(_this) {
      return function() {
        if (!pagePickerBack.classed('hx-data-table-btn-disabled')) {
          return _this.page(_this.page() - 1);
        }
      };
    })(this));
    pagePickerForward = pagePickerContainer.append('button')["class"]('hx-data-table-paginator-forward hx-btn hx-btn-invisible');
    pagePickerForward.append('i')["class"]('hx-icon hx-icon-chevron-right');
    pagePickerForward.on('click', 'hx.data-table', (function(_this) {
      return function() {
        if (!pagePickerForward.classed('hx-data-table-btn-disabled')) {
          return _this.page(_this.page() + 1);
        }
      };
    })(this));
    pageSizeContainer = paginationContainer.append('div')["class"]('hx-data-table-page-size');
    pageSizeContainer.append('span').text('Rows per page: ');
    pageSizeNode = pageSizeContainer.append('button')["class"]('hx-data-table-page-size-picker hx-btn hx-btn-invisible').node();
    pageSizePicker = new hx.Picker(pageSizeNode, {
      dropdownOptions: {
        align: 'rbrt'
      }
    }).on('change', 'hx.data-table', (function(_this) {
      return function(d) {
        if (d.cause === 'user') {
          _this.pageSize(d.value.value, void 0, 'user');
          return _this.page(1, void 0, 'user');
        }
      };
    })(this));
    this._ = {
      selection: selection,
      options: resolvedOptions,
      page: 1,
      pagePicker: pagePicker,
      pageSizePicker: pageSizePicker,
      statusBar: statusBar,
      sortColPicker: sortColPicker,
      selectedRows: new hx.Set,
      expandedRows: new hx.Set,
      renderedCollapsibles: {},
      compactState: (resolvedOptions.compact === 'auto' && selection.width() < collapseBreakPoint) || resolvedOptions.compact === true
    };
    selection.on('resize', 'hx.data-table', (function(_this) {
      return function() {
        var state;
        selection.selectAll('.hx-data-table-collapsible-content-container').map(function(e) {
          return e.style('max-width', (parseInt(selection.style('width')) - _this._.collapsibleSizeDiff) + 'px');
        });
        state = (_this.compact() === 'auto' && selection.width() < collapseBreakPoint) || _this.compact() === true;
        selection.classed('hx-data-table-compact', state);
        if (_this._.compactState !== state) {
          _this._.compactState = state;
          return _this.emit('compactchange', {
            value: _this.compact(),
            state: state,
            cause: 'user'
          });
        }
      };
    })(this));
    randomId = hx.randomId();
    hx.select('body').on('keydown', 'hx.data-table.shift.' + randomId, (function(_this) {
      return function(e) {
        if (e.shiftKey && _this.selectEnabled()) {
          return selection.classed('hx-data-table-disable-text-selection', true);
        }
      };
    })(this));
    hx.select('body').on('keyup', 'hx.data-table.shift.' + randomId, (function(_this) {
      return function(e) {
        if (!e.shiftKey && _this.selectEnabled()) {
          return selection.classed('hx-data-table-disable-text-selection', false);
        }
      };
    })(this));
  }

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

  DataTable.prototype.singleSelection = option('singleSelection');

  DataTable.prototype.sort = option('sort');

  columnOption = function(name) {
    return function(columnId, value, cb) {
      var base, options;
      options = this._.options;
      if (arguments.length > 1 && hx.isString(columnId)) {
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
        if (hx.isString(columnId) && options.columns[columnId]) {
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

  DataTable.prototype.allowHeaderWrap = columnOption('allowHeaderWrap');

  DataTable.prototype.cellRenderer = columnOption('cellRenderer');

  DataTable.prototype.headerCellRenderer = columnOption('headerCellRenderer');

  DataTable.prototype.sortEnabled = columnOption('sortEnabled');

  columnOnlyOption = function(name) {
    return function(columnId, value, cb) {
      var base, options;
      options = this._.options;
      if (hx.isString(columnId)) {
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

  DataTable.prototype.page = function(value, cb, cause) {
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

  DataTable.prototype.selectedRows = function(value, cb) {
    var newSelectedRows;
    if (arguments.length > 0 && !hx.isFunction(value)) {
      if (this.singleSelection() && hx.isArray(value) && value.length) {
        value = [value[0]];
      }
      this._.selectedRows = new hx.Set(value);
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

  DataTable.prototype.expandedRows = function(value, cb) {
    if (arguments.length > 0 && !hx.isFunction(value)) {
      this._.expandedRows = new hx.Set(value);
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

  DataTable.prototype.rowsForIds = function(ids, cb) {
    if (cb != null) {
      this.feed().rowsForIds(ids, this.rowIDLookup(), cb);
    }
    return this;
  };

  DataTable.prototype.renderSuppressed = function(value) {
    if (arguments.length > 0) {
      this._.renderSuppressed = value;
      return this;
    } else {
      return this._.renderSuppressed;
    }
  };

  DataTable.prototype.render = function(cb) {
    var container, feed, getColumnOption, headerRow, options, rowToArray, selection, table, tbody, thead;
    if (this._.renderSuppressed) {
      return;
    }
    feed = this.feed();
    if (feed === void 0 || (feed.headers === void 0 || feed.totalCount === void 0 || feed.rows === void 0)) {
      hx.consoleWarning('No feed specified when rendering data table');
      return;
    }
    selection = this._.selection;
    options = this._.options;
    selection.select('.hx-data-table-pagination-block').classed('hx-data-table-pagination-block-visible', options.displayMode === 'paginate');
    getColumnOption = function(name, id) {
      if (options.columns !== void 0 && options.columns[id] !== void 0 && options.columns[id][name] !== void 0) {
        return options.columns[id][name];
      } else {
        return options[name];
      }
    };
    rowToArray = function(headers, obj) {
      return headers.map(function(header) {
        return obj.cells[header.id];
      });
    };
    container = hx.detached('div')["class"]('hx-data-table-content');
    table = container.append('table')["class"]('hx-data-table-table hx-table');
    thead = table.append('thead')["class"]('hx-data-table-head');
    tbody = table.append('tbody')["class"]('hx-data-table-body');
    headerRow = thead.append('tr')["class"]('hx-data-table-row');
    selection.select('.hx-data-table-loading').style('display', '');
    selection.select('.hx-data-table-filter-control').classed('hx-data-table-filter-visible', options.filterEnabled);
    feed.headers((function(_this) {
      return function(headers) {
        selection.select('.hx-data-table-sort-control').classed('hx-data-table-sort-visible', options.sortEnabled || headers.some(function(header) {
          return getColumnOption('sortEnabled', header.id);
        }));
        return feed.totalCount(function(totalCount) {
          var end, start;
          if (options.displayMode === 'paginate') {
            start = (_this.page() - 1) * options.pageSize;
            end = _this.page() * options.pageSize - 1;
          } else {
            start = void 0;
            end = void 0;
          }
          selection.classed('hx-data-table-infinite', totalCount === void 0);
          return feed.rows({
            start: start,
            end: end,
            sort: _this.sort(),
            filter: _this.filter()
          }, function(arg) {
            var buildCollapsible, col, column, count, currentSort, filteredCount, groupedRow, headerCheckBox, headerControlBox, headerGroups, i, items, j, l, maxHeaderDepth, num, numText, pageSizeOptions, parent, prevCol, prevParent, ref, ref1, relevantHeaders, row, rows, scrollLeft, scrollTop, selectMulti, selectPageSize, selectRow, sortColumns, stickFirstColumn, stickyOpts, toggleCollapsible, wrapperNode;
            rows = arg.rows, filteredCount = arg.filteredCount;
            if (options.displayMode === 'paginate') {
              if (filteredCount === void 0) {
                _this._.numPages = void 0;
                numText = (start + 1) + ' - ' + (end + 1);
                selection.select('.hx-data-table-paginator').classed('hx-data-table-multi-page', true);
              } else {
                _this._.numPages = Math.max(1, Math.ceil(filteredCount / options.pageSize));
                if (_this.page() > _this._.numPages) {
                  _this.page(_this._.numPages);
                }
                selection.select('.hx-data-table-paginator').classed('hx-data-table-multi-page', _this._.numPages > 1);
                if (filteredCount > 0 && _this._.numPages > 1) {
                  numText = 'of ' + filteredCount;
                  items = (function() {
                    var j, ref, results;
                    results = [];
                    for (i = j = 1, ref = this._.numPages; j <= ref; i = j += 1) {
                      num = i * options.pageSize;
                      results.push({
                        text: (num + 1 - options.pageSize) + ' - ' + Math.min(num, filteredCount),
                        value: i
                      });
                    }
                    return results;
                  }).call(_this);
                  _this._.pagePicker.items(items).value(_this.page());
                }
              }
              selection.select('.hx-data-table-paginator-total-rows').text(numText || '');
              selection.select('.hx-data-table-paginator-back').classed('hx-data-table-btn-disabled', _this.page() === 1);
              selection.select('.hx-data-table-paginator-forward').classed('hx-data-table-btn-disabled', _this.page() === _this._.numPages);
            }
            if (headers.some(function(header) {
              return getColumnOption('sortEnabled', header.id);
            })) {
              currentSort = _this.sort() || {};
              sortColumns = hx.flatten(headers.map(function(header) {
                if (getColumnOption('sortEnabled', header.id)) {
                  return [
                    {
                      text: header.name,
                      value: header.id + 'asc',
                      column: header.id,
                      direction: 'asc',
                      cell: header
                    }, {
                      text: header.name,
                      value: header.id + 'desc',
                      column: header.id,
                      direction: 'desc',
                      cell: header
                    }
                  ];
                }
              }).filter(hx.defined));
              _this._.sortColPicker.renderer(function(element, option) {
                if (option.value) {
                  getColumnOption('headerCellRenderer', option.cell.id)(element, option.cell, headers);
                  return hx.select(element).append('i')["class"]('hx-data-table-compact-sort-arrow hx-icon hx-icon-chevron-' + (option.direction === 'asc' ? 'up' : 'down'));
                } else {
                  return hx.select(element).text(option.text);
                }
              }).items([
                {
                  text: 'No Sort',
                  value: void 0
                }
              ].concat(sortColumns));
              if (currentSort.column && _this._.sortColPicker.value().value !== (currentSort.column + currentSort.direction)) {
                _this._.sortColPicker.value({
                  value: currentSort.column + currentSort.direction
                });
              }
            }
            if (filteredCount !== void 0 && filteredCount > 0) {
              selectPageSize = (options.pageSizeOptions != null) && options.pageSizeOptions.length > 0;
              selection.select('.hx-data-table-page-size').classed('hx-data-table-select-page-size', selectPageSize);
              if (selectPageSize) {
                if (options.pageSizeOptions.indexOf(options.pageSize) === -1) {
                  options.pageSizeOptions.push(options.pageSize);
                }
                pageSizeOptions = options.pageSizeOptions.sort(hx.sort.compare).map(function(item) {
                  return {
                    text: item,
                    value: item
                  };
                });
                _this._.pageSizePicker.items(pageSizeOptions).value(options.pageSize);
              }
            }
            if (headers.some(function(header) {
              return header.groups != null;
            })) {
              relevantHeaders = headers.filter(function(e) {
                return e.groups != null;
              }).map(function(e) {
                return e.groups.length;
              });
              maxHeaderDepth = Math.max.apply(null, relevantHeaders);
              headerGroups = headers.map(function(e) {
                var groups;
                groups = e.groups || [];
                while (groups.length < maxHeaderDepth) {
                  groups.push('');
                }
                return groups;
              });
              for (row = j = ref = maxHeaderDepth - 1; j >= 0; row = j += -1) {
                groupedRow = headerRow.insertBefore('tr');
                if (options.selectEnabled || (options.collapsibleRenderer != null)) {
                  groupedRow.append('th')["class"]('hx-data-table-control');
                }
                count = 1;
                for (column = l = 1, ref1 = headerGroups.length; l <= ref1; column = l += 1) {
                  col = headerGroups[column];
                  prevCol = headerGroups[column - 1];
                  if ((col != null) && (prevCol != null)) {
                    parent = col.slice(row, maxHeaderDepth).toString();
                    prevParent = prevCol.slice(row, maxHeaderDepth).toString();
                  }
                  if (column === headerGroups.length || col[row] !== prevCol[row] || parent !== prevParent) {
                    groupedRow.append('th').attr('colspan', count)["class"]('hx-data-table-cell-grouped').text(prevCol[row]);
                    count = 0;
                  }
                  count++;
                }
              }
            }
            if (options.selectEnabled || (options.collapsibleRenderer != null)) {
              headerControlBox = headerRow.append('th')["class"]('hx-data-table-control hx-table-head-no-border');
            }
            if (options.selectEnabled && !options.singleSelection) {
              headerCheckBox = headerControlBox.append('div')["class"]('hx-data-table-checkbox').on('click', 'hx.data-table', function() {
                var enabledRows;
                if (rows.length > 0) {
                  enabledRows = rows.filter(function(row) {
                    return options.rowEnabledLookup(row);
                  });
                  return selectMulti(0, rows.length - 1, !enabledRows.every(function(row) {
                    return _this._.selectedRows.has(options.rowIDLookup(row));
                  }));
                }
              });
              headerCheckBox.append('i')["class"]('hx-icon hx-icon-check');
            }
            headers.forEach(function(header, i) {
              var cellDiv, cellDivContent, dirClass;
              cellDiv = headerRow.append('th')["class"]('hx-data-table-cell').classed('hx-table-header-allow-wrap', getColumnOption('allowHeaderWrap', header.id));
              cellDivContent = cellDiv.append('div')["class"]('hx-data-table-cell-inner');
              getColumnOption('headerCellRenderer', header.id)(cellDivContent.append('span')["class"]('hx-data-table-title').node(), header, headers);
              if (getColumnOption('sortEnabled', header.id)) {
                cellDiv.classed('hx-data-table-cell-sort-enabled', true);
                currentSort = _this.sort();
                dirClass = currentSort && currentSort.column === header.id ? 'hx-icon-sort-' + currentSort.direction + ' hx-data-table-sort-on' : 'hx-icon-sort';
                cellDivContent.append('i')["class"]('hx-icon ' + dirClass + ' hx-data-table-sort-icon');
                return cellDiv.on('click', 'hx.data-table', function() {
                  var direction;
                  currentSort = _this.sort() || {};
                  direction = currentSort.column === header.id ? currentSort.direction === 'asc' ? 'desc' : void 0 : 'asc';
                  column = direction !== void 0 ? header.id : void 0;
                  return _this.sort({
                    column: column,
                    direction: direction
                  }, void 0, 'user');
                });
              }
            });
            _this.updateSelected = function() {
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
              if (_this._.selectedRows.size > 0) {
                for (rowIndex = m = 0, len = rows.length; m < len; rowIndex = ++m) {
                  row = rows[rowIndex];
                  if (_this._.selectedRows.has(options.rowIDLookup(row))) {
                    hx.select(rowDivs.nodes[rowIndex]).classed('hx-data-table-row-selected', true);
                    if (checkBoxDivs.nodes[rowIndex] != null) {
                      hx.select(checkBoxDivs.nodes[rowIndex]).classed('hx-data-table-row-selected', true);
                    }
                  }
                }
              }
              pageHasSelection = tbody.selectAll('.hx-data-table-row-selected').size() > 0;
              selection.classed('hx-data-table-has-page-selection', pageHasSelection && !options.singleSelection);
              selection.classed('hx-data-table-has-selection', _this._.selectedRows.size > 0 && !options.singleSelection);
              if (totalCount !== void 0) {
                return _this._.statusBar.select('.hx-data-table-status-bar-text').text(_this._.selectedRows.size + ' of ' + totalCount + ' selected.');
              }
            };
            selectMulti = function(start, end, force) {
              var id, len, m, n, newRows, ref2, ref3;
              newRows = [];
              for (i = m = ref2 = start, ref3 = end; m <= ref3; i = m += 1) {
                newRows.push(rows[i]);
              }
              for (n = 0, len = newRows.length; n < len; n++) {
                row = newRows[n];
                if (options.rowEnabledLookup(row) && options.rowSelectableLookup(row)) {
                  id = options.rowIDLookup(row);
                  _this._.selectedRows[force ? 'add' : 'delete'](id);
                  _this.emit('selectedrowschange', {
                    row: row,
                    rowValue: _this._.selectedRows.has(id),
                    value: _this.selectedRows(),
                    cause: 'user'
                  });
                }
              }
              return _this.updateSelected();
            };
            selectRow = function(row, index, shiftDown) {
              var deleteOrAdd, force, id;
              if (_this._.userLastSelectedIndex != null) {
                if (options.singleSelection && index !== _this._.userLastSelectedIndex) {
                  _this._.selectedRows.clear();
                } else {
                  if (shiftDown && index !== _this._.userLastSelectedIndex) {
                    force = _this._.selectedRows.has(options.rowIDLookup(rows[_this._.userLastSelectedIndex]));
                    if (index > _this._.userLastSelectedIndex) {
                      selectMulti(_this._.userLastSelectedIndex + 1, index, force);
                    } else {
                      selectMulti(index, _this._.userLastSelectedIndex, force);
                    }
                    return;
                  }
                }
              }
              _this._.userLastSelectedIndex = index;
              if (options.rowSelectableLookup(row)) {
                id = options.rowIDLookup(row);
                deleteOrAdd = _this._.selectedRows.has(id) ? 'delete' : 'add';
                _this._.selectedRows[deleteOrAdd](id);
                _this.emit('selectedrowschange', {
                  row: row,
                  rowValue: _this._.selectedRows.has(id),
                  value: _this.selectedRows(),
                  cause: 'user'
                });
              }
              return _this.updateSelected();
            };
            buildCollapsible = function() {
              var contentDiv, contentRow, hiddenRow;
              contentRow = hx.detached('tr')["class"]('hx-data-table-collapsible-content-row');
              hiddenRow = hx.detached('tr')["class"]('hx-data-table-collapsible-row-spacer');
              contentRow.append('td')["class"]('hx-data-table-collapsible-cell hx-data-table-collapsible-cell-empty');
              contentDiv = contentRow.append('td')["class"]('hx-data-table-collapsible-cell').attr('colspan', fullWidthColSpan).append('div')["class"]('hx-data-table-collapsible-content-container').append('div')["class"]('hx-data-table-collapsible-content');
              return {
                contentRow: contentRow,
                hiddenRow: hiddenRow,
                contentDiv: contentDiv
              };
            };
            toggleCollapsible = function(node, row, force) {
              var cc, currentVis, rowId;
              rowId = options.rowIDLookup(row);
              cc = _this._.renderedCollapsibles[rowId] || buildCollapsible(row);
              _this._.renderedCollapsibles[rowId] = cc;
              node.insertAfter(cc.hiddenRow).insertAfter(cc.contentRow);
              currentVis = force != null ? force : !cc.contentRow.classed('hx-data-table-collapsible-row-visible');
              cc.contentRow.classed('hx-data-table-collapsible-row-visible', currentVis);
              node.classed('hx-data-table-collapsible-row-visible', currentVis);
              node.select('.hx-data-table-collapsible-toggle').select('i')["class"](currentVis ? 'hx-icon hx-icon-minus' : 'hx-icon hx-icon-plus');
              if (currentVis) {
                options.collapsibleRenderer(cc.contentDiv.node(), row);
              } else {
                _this._.renderedCollapsibles[rowId].contentRow.remove();
                _this._.renderedCollapsibles[rowId].hiddenRow.remove();
                delete _this._.renderedCollapsibles[rowId];
              }
              _this._.expandedRows[currentVis ? 'add' : 'delete'](rowId);
              _this._.stickyHeaders.render();
              _this._.collapsibleSizeDiff = parseInt(selection.style('width')) - parseInt(hx.select(cc.contentDiv.node().parentNode).style('width'));
              return currentVis;
            };
            if (filteredCount === void 0 || filteredCount > 0) {
              rows.forEach(function(row, rowIndex) {
                var cell, cellDiv, cellElem, checkbox, collapsibleControl, columnIndex, columnMaxWidth, controlDiv, keyDiv, len, m, ref2, results, rowIsCollapsible, tr;
                tr = tbody.append('tr')["class"]('hx-data-table-row').classed('hx-data-table-row-selected', _this._.selectedRows.has(options.rowIDLookup(row))).classed('hx-data-table-row-disabled', !options.rowEnabledLookup(row));
                tr.on('click', 'hx.data-table', function(e) {
                  return _this.emit('rowclick', {
                    data: row,
                    node: tr.node()
                  });
                });
                rowIsCollapsible = options.rowCollapsibleLookup(row);
                tr.classed('hx-data-table-row-select-enabled', options.selectEnabled);
                if (options.selectEnabled || (options.collapsibleRenderer != null)) {
                  controlDiv = tr.append('th')["class"]('hx-data-table-control');
                  if (options.selectEnabled) {
                    checkbox = controlDiv.append('div')["class"]('hx-data-table-checkbox');
                    checkbox.append('i')["class"]('hx-icon hx-icon-check');
                    if (options.rowEnabledLookup(row)) {
                      checkbox.on('click', 'hx.data-table', function(e) {
                        e.stopPropagation();
                        return selectRow(row, rowIndex, e.shiftKey);
                      });
                    }
                  }
                  if (options.collapsibleRenderer != null) {
                    collapsibleControl = controlDiv.append('div')["class"]('hx-data-table-collapsible-toggle').classed('hx-data-table-collapsible-disabled', !rowIsCollapsible);
                    collapsibleControl.append('i')["class"]('hx-icon hx-icon-plus');
                  }
                  if (rowIsCollapsible) {
                    if (_this._.expandedRows.has(options.rowIDLookup(row))) {
                      toggleCollapsible(tr, row, true);
                    }
                    collapsibleControl.on('click', 'hx.data-table.collapse-row', function(e) {
                      var currentVis;
                      currentVis = toggleCollapsible(tr, row);
                      return _this.emit('expandedrowschange', {
                        value: _this._.expandedRows.values(),
                        row: row,
                        rowValue: currentVis,
                        cause: 'user'
                      });
                    });
                  }
                }
                ref2 = rowToArray(headers, row);
                results = [];
                for (columnIndex = m = 0, len = ref2.length; m < len; columnIndex = ++m) {
                  cell = ref2[columnIndex];
                  keyDiv = hx.detached('div')["class"]('hx-data-table-cell-key');
                  getColumnOption('headerCellRenderer', headers[columnIndex].id)(keyDiv.node(), headers[columnIndex], headers);
                  cellElem = tr.append('td')["class"]('hx-data-table-cell');
                  columnMaxWidth = getColumnOption('maxWidth', headers[columnIndex].id);
                  if (columnMaxWidth != null) {
                    columnMaxWidth = parseInt(columnMaxWidth) + 'px';
                    cellElem.style('max-width', columnMaxWidth).style('width', columnMaxWidth).style('min-width', columnMaxWidth);
                  }
                  cellDiv = cellElem.add(keyDiv).append('div')["class"]('hx-data-table-cell-value').node();
                  results.push(getColumnOption('cellRenderer', headers[columnIndex].id)(cellDiv, cell, row));
                }
                return results;
              });
            } else {
              tbody.append('tr')["class"]('hx-data-table-row-no-data').append('td').attr('colspan', fullWidthColSpan).text(options.noDataMessage);
            }
            _this.updateSelected();
            if (_this.page() === _this._.oldPage) {
              wrapperNode = selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node();
              if (options.retainHorizontalScrollOnRender) {
                scrollLeft = wrapperNode.scrollLeft;
              }
              if (options.retainVerticalScrollOnRender) {
                scrollTop = wrapperNode.scrollTop;
              }
            }
            _this._.oldPage = _this.page();
            selection.select('.hx-data-table-content').insertAfter(container);
            selection.select('.hx-data-table-content').remove();
            selection.classed('hx-data-table-compact', ((options.compact === 'auto') && (selection.width() < collapseBreakPoint)) || (options.compact === true));
            stickFirstColumn = options.selectEnabled || (options.collapsibleRenderer != null);
            stickyOpts = {
              stickFirstColumn: stickFirstColumn && (filteredCount === void 0 || filteredCount > 0),
              fullWidth: true
            };
            _this._.stickyHeaders = new hx.StickyTableHeaders(container.node(), stickyOpts);
            if (scrollLeft != null) {
              selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node().scrollLeft = scrollLeft;
            }
            if (scrollTop != null) {
              selection.select('.hx-data-table-content > .hx-sticky-table-wrapper').node().scrollTop = scrollTop;
            }
            selection.select('.hx-data-table-loading').style('display', 'none');
            _this.emit('render');
            return typeof cb === "function" ? cb() : void 0;
          });
        });
      };
    })(this));
    return this;
  };

  return DataTable;

})(hx.EventEmitter);


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

objectFeed = function(data, options) {
  var filterCacheTerm, filtered, rowsByIdMap, sortCacheTerm, sorted;
  options = hx.merge({
    filter: function(term, row) {
      var j, k, len, part, ref, rowSearchTerm, v;
      rowSearchTerm = ((function() {
        var ref, results;
        ref = row.cells;
        results = [];
        for (k in ref) {
          v = ref[k];
          results.push(v);
        }
        return results;
      })()).join(' ').toLowerCase();
      ref = term.toLowerCase().split(' ');
      for (j = 0, len = ref.length; j < len; j++) {
        part = ref[j];
        if (rowSearchTerm.indexOf(part) === -1) {
          return false;
        }
      }
      return true;
    },
    compare: function(c1, c2) {
      if (c1 > c2) {
        return 1;
      } else {
        return -1;
      }
    }
  }, options);
  filtered = void 0;
  filterCacheTerm = void 0;
  sorted = void 0;
  sortCacheTerm = {};
  rowsByIdMap = void 0;
  return {
    data: data,
    headers: function(cb) {
      return cb(data.headers);
    },
    totalCount: function(cb) {
      return cb(data.rows.length);
    },
    rows: function(range, cb) {
      var column, direction, ref, ref1, ref2, ref3, ref4;
      if (((ref = range.sort) != null ? ref.column : void 0) !== sortCacheTerm.column) {
        filtered = void 0;
      }
      if (filtered === void 0 || filterCacheTerm !== range.filter) {
        filtered = range.filter ? data.rows.filter(function(row) {
          return options.filter(range.filter, row);
        }) : data.rows.slice();
        filterCacheTerm = range.filter;
        sorted = void 0;
      }
      if (sorted === void 0 || sortCacheTerm.column !== ((ref1 = range.sort) != null ? ref1.column : void 0) || sortCacheTerm.direction !== ((ref2 = range.sort) != null ? ref2.direction : void 0)) {
        sorted = range.sort && range.sort.column ? (direction = range.sort.direction === 'asc' ? 1 : -1, column = range.sort.column, filtered.sort(function(r1, r2) {
          return direction * options.compare(r1.cells[column], r2.cells[column]);
        }), filtered.sort(function(r1, r2) {
          return direction * options.compare(r1.cells[column], r2.cells[column]);
        }), filtered) : filtered;
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

urlFeed = function(url, options) {
  var jsonCallback, maybeCached;
  options = hx.merge({
    extra: void 0,
    cache: false
  }, options);
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
        console.error(err);
      }
      return cb(value);
    };
  };
  return {
    url: url,
    headers: maybeCached(function(cb) {
      return hx.json(url, {
        type: 'headers',
        extra: options.extra
      }, jsonCallback(cb));
    }),
    totalCount: maybeCached(function(cb) {
      return hx.json(url, {
        type: 'totalCount',
        extra: options.extra
      }, function(err, res) {
        return jsonCallback(cb)(err, res.count);
      });
    }),
    rows: function(range, cb) {
      return hx.json(url, {
        type: 'rows',
        range: range,
        extra: options.extra
      }, jsonCallback(cb));
    },
    rowsForIds: function(ids, lookupRow, cb) {
      return hx.json(url, {
        type: 'rowsForIds',
        ids: ids,
        extra: options.extra
      }, jsonCallback(cb));
    }
  };
};

hx.DataTable = DataTable;

hx.dataTable = function(options) {
  var dataTable, selection;
  selection = hx.detached('div');
  dataTable = new DataTable(selection.node(), options);
  if (options && options.feed) {
    dataTable.render();
  }
  return selection;
};

hx.dataTable.objectFeed = objectFeed;

hx.dataTable.urlFeed = urlFeed;

})();
(function(){
var DateTimePicker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DateTimePicker = (function(superClass) {
  extend(DateTimePicker, superClass);

  function DateTimePicker(selector, options) {
    var dtNode, tpNode, updateDatePicker, updateTimePicker;
    this.selector = selector;
    DateTimePicker.__super__.constructor.apply(this, arguments);
    this.options = hx.merge({
      datePickerOptions: {},
      timePickerOptions: {}
    }, options);
    delete this.options.datePickerOptions.selectRange;
    hx.component.register(this.selector, this);
    this.suppressCallback = false;
    this.selection = hx.select(this.selector).classed('hx-date-time-picker', true);
    dtNode = this.selection.append('div').node();
    tpNode = this.selection.append('div').node();
    this.options.timePickerOptions.disabled = this.options.datePickerOptions.disabled;
    this.datePicker = new hx.DatePicker(dtNode, this.options.datePickerOptions);
    this.timePicker = new hx.TimePicker(tpNode, this.options.timePickerOptions);
    this._ = {
      uniqueId: hx.randomId()
    };
    hx.preferences.on('timezonechange', 'hx.date-time-picker-' + this._.uniqueId, function() {
      return updateDatePicker();
    });
    this.datePicker.pipe(this, 'date', ['show', 'hide']);
    this.timePicker.pipe(this, 'time', ['show', 'hide']);
    updateTimePicker = (function(_this) {
      return function(data) {
        _this.timePicker.suppressed('change', true);
        _this.timePicker.date(_this.datePicker.date(), true);
        _this.timePicker.suppressed('change', false);
        if (data != null) {
          _this.emit('date.change', data);
          return _this.emit('change', _this.date());
        }
      };
    })(this);
    updateDatePicker = (function(_this) {
      return function(data) {
        _this.datePicker.suppressed('change', true);
        _this.datePicker.date(hx.preferences.applyTimezoneOffset(_this.date()));
        _this.datePicker.suppressed('change', false);
        if (data != null) {
          _this.emit('time.change', data);
          return _this.emit('change', _this.date());
        }
      };
    })(this);
    this.datePicker.on('change', 'hx.date-time-picker', updateTimePicker);
    this.timePicker.on('change', 'hx.date-time-picker', updateDatePicker);
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
    hx.deprecatedWarning('hx.DateTimePicker::locale is deprecated. Please use hx.preferences.locale.');
    if (arguments.length > 0) {
      hx.preferences.locale(locale);
      return this;
    } else {
      return hx.preferences.locale();
    }
  };

  DateTimePicker.prototype.disabled = function(disable) {
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

})(hx.EventEmitter);

hx.dateTimePicker = function(options) {
  var selection;
  selection = hx.detached('div');
  new DateTimePicker(selection.node(), options);
  return selection;
};

hx.DateTimePicker = DateTimePicker;

})();
(function(){
var horizontalLineIntersection, lineIntersection, pointRectangleIntersection, verticalLineIntersection;

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
        return this.c.red(hx.clamp(0, 255, value));
      case 'color.green':
        return this.c.green(hx.clamp(0, 255, value));
      case 'color.blue':
        return this.c.blue(hx.clamp(0, 255, value));
      case 'color.alpha':
        return this.c.alpha(hx.clampUnit(value));
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
      sr = this.value.red();
      sg = this.value.green();
      sb = this.value.blue();
      sa = this.value.alpha();
      c = hx.color(value);
      er = c.red();
      eg = c.green();
      eb = c.blue();
      ea = c.alpha();
      cb = callback ? (function(_this) {
        return function(cancelled) {
          _this.stop = void 0;
          return callback(!cancelled, _this.value);
        };
      })(this) : void 0;
      update = (function(_this) {
        return function(x, cancelled) {
          if (!cancelled) {
            _this.value.red(sr + (er - sr) * x);
            _this.value.green(sg + (eg - sg) * x);
            _this.value.blue(sb + (eb - sb) * x);
            return _this.value.alpha(sa + (ea - sa) * x);
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
    r = color.red();
    g = color.green();
    b = color.blue();
    a = color.alpha() * this.globalAlpha;
    return this.ctx.fillStyle = "rgba(" + (Math.floor(r)) + "," + (Math.floor(g)) + "," + (Math.floor(b)) + "," + a + ")";
  };

  Drawing.prototype.setStrokeColor = function(color) {
    var a, b, g, r;
    r = color.red();
    g = color.green();
    b = color.blue();
    a = color.alpha() * this.globalAlpha;
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
      })(this)).append('i')["class"]('hx-icon hx-icon-bars');
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

hx.Drawing = Drawing;

hx.drawing = function(options) {
  var selection;
  selection = hx.detached('div');
  new Drawing(selection.node(), options);
  return selection;
};

hx._.drawing = {
  Circle: Circle,
  Rectangle: Rectangle,
  Grid: Grid,
  Composite: Composite,
  Line: Line,
  Shape: Shape,
  Text: Text,
  pointRectangleIntersection: pointRectangleIntersection,
  lineIntersection: lineIntersection,
  horizontalLineIntersection: horizontalLineIntersection,
  verticalLineIntersection: verticalLineIntersection
};

})();

(function(){
var DONT_PREVENT_DEFAULT_NODES, setupFastClick,
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
(function(){
var FileInput, fileListToMap, fileValidator, getFileUID,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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
  var file, fileUID, i, len, map;
  map = new hx.Map();
  for (i = 0, len = fileList.length; i < len; i++) {
    file = fileList[i];
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

FileInput = (function(superClass) {
  extend(FileInput, superClass);

  function FileInput(selector, options) {
    var acceptedExtensions, acceptedExtensionsString, button, defaults, drop, dropdown, dropdownDiv, filePreview, group, handleFiles, imageType, input, noFilesTextDiv, preventDefault, ref, resolvedOptions, selectedFiles, selection, self, setupDropdown;
    this.selector = selector;
    FileInput.__super__.constructor.apply(this, arguments);
    hx.component.register(this.selector, this);
    self = this;
    defaults = {
      disabled: false,
      fullWidth: false,
      acceptedExtensions: void 0,
      multiple: false,
      dragEnabled: true,
      buttonClass: 'hx-action',
      noFilesText: 'No File Chosen',
      filesSelectedText: 'Files Selected',
      buttonText: 'Choose File'
    };
    resolvedOptions = hx.merge(defaults, options);
    if (resolvedOptions.multiple && !options.buttonText) {
      resolvedOptions.buttonText = 'Choose Files';
    }
    selection = hx.select(this.selector).classed('hx-file-input', true).classed('hx-file-input-full-width', resolvedOptions.fullWidth);
    if (((ref = resolvedOptions.acceptedExtensions) != null ? ref.length : void 0) > 0) {
      acceptedExtensions = resolvedOptions.acceptedExtensions;
      acceptedExtensionsString = resolvedOptions.acceptedExtensions.map(function(e) {
        return "." + e;
      }).join(',');
    }
    input = hx.detached('input')["class"]('hx-file-input-hidden').attr('type', 'file').attr('accept', acceptedExtensionsString).attr('multiple', resolvedOptions.multiple ? 'multiple' : void 0);
    group = hx.detached('div')["class"]("hx-input-group hx-input-group-full-width hx-no-margin");
    button = hx.detached('button')["class"]("hx-file-input-button hx-btn hx-no-margin " + resolvedOptions.buttonClass).on('click', function() {
      return input.node().click();
    }).add(hx.detached('i')["class"]('hx-file-input-icon hx-icon hx-icon-upload')).add(hx.detached('span').text(resolvedOptions.buttonText));
    noFilesTextDiv = hx.section().text(resolvedOptions.noFilesText);
    selectedFiles = hx.section().classed('hx-file-input-selected', true).add(noFilesTextDiv);
    imageType = /^image\//;
    filePreview = function(file) {
      var container, image, img, reader, remove, text;
      if (imageType.test(file.type)) {
        img = hx.detached('img').node();
        img.file = file;
        reader = new FileReader();
        reader.onload = function(e) {
          return img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        image = hx.section.fixed().classed('hx-file-input-preview-image', true).add(img);
      }
      container = hx.group().classed('hx-file-input-preview', true);
      text = hx.section().classed('hx-file-input-preview-text', true).text(file.name);
      remove = hx.section.fixed().classed('hx-file-input-preview-remove hx-text-negative', true).add(hx.icon({
        "class": 'hx-icon hx-icon-close'
      })).on('click', function() {
        self._.fileMap["delete"](getFileUID(file));
        container.remove();
        return handleFiles(self._.fileMap);
      });
      return container.add(text).add(image).add(remove);
    };
    handleFiles = (function(_this) {
      return function(fileMap) {
        var length;
        selectedFiles.clear().classed('hx-btn', false).off('click', 'hx.file-input');
        length = fileMap.size;
        if (length) {
          if (length === 1) {
            if (dropdown.isOpen()) {
              dropdown.hide();
            }
            selectedFiles.append(filePreview(fileMap.values()[0]));
          } else {
            selectedFiles.classed('hx-btn', true).add(hx.section().text(length + " " + resolvedOptions.filesSelectedText)).add(hx.detached('i')["class"]('hx-file-input-dropdown-icon hx-icon hx-icon-chevron-down')).on('click', 'hx.file-input', function() {
              return dropdown.show();
            });
          }
        } else {
          selectedFiles.append(noFilesTextDiv);
        }
        _this._.fileMap = fileMap;
        return _this.emit('change', {
          cause: 'user',
          data: _this._.fileMap.values()
        });
      };
    })(this);
    dropdownDiv = hx.detached('div');
    setupDropdown = function(element) {
      var sel;
      sel = hx.select(element);
      return self._.fileMap.values().map(function(file) {
        return sel.append(filePreview(file));
      });
    };
    dropdown = new hx.Dropdown(dropdownDiv.node(), setupDropdown, {
      ddClass: 'hx-file-input-dropdown'
    });
    input.on('change', (function(_this) {
      return function(e) {
        handleFiles(fileListToMap(e.target.files, acceptedExtensions, _this, resolvedOptions));
        return input.value('');
      };
    })(this));
    this._ = {
      options: resolvedOptions,
      input: input,
      button: button,
      selectedFiles: selectedFiles,
      noFilesTextDiv: noFilesTextDiv,
      fileMap: new hx.Map()
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
    selection.add(input).add(group.add(button).add(selectedFiles)).add(dropdownDiv);
  }

  FileInput.prototype.disabled = function(disabled) {
    var disabledAttr;
    if (arguments.length) {
      disabledAttr = disabled ? 'disabled' : void 0;
      this._.input.attr('disabled', disabledAttr);
      this._.button.attr('disabled', disabledAttr);
      this._.selectedFiles.classed('hx-text-disabled hx-background-disabled', disabled);
      this._.disabled = disabled;
      if (disabled) {
        this.value(void 0);
      }
      return this;
    } else {
      return this._.disabled || false;
    }
  };

  FileInput.prototype.value = function(value) {
    if (arguments.length) {
      if (value != null) {
        hx.consoleWarning('hx.FileInput.value: It is not possible to set the value of a file input for security reasons. The value can only be cleared by passing in "undefined"');
      } else {
        this._.input.value('');
        this._.selectedFiles.clear().classed('hx-btn', false).off('click', 'hx.file-input');
        this._.selectedFiles.append(this._.noFilesTextDiv);
        this._.fileMap = new hx.Map;
      }
      return this;
    } else {
      return this._.fileMap.values();
    }
  };

  return FileInput;

})(hx.EventEmitter);

hx.FileInput = FileInput;

hx.fileInput = function(options) {
  var selection;
  selection = hx.detached('div');
  new FileInput(selection.node(), options);
  return selection;
};

})();
(function(){
var Form,
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
    if (extras.disable == null) {
      extras.disable = function(sel, disable) {
        return sel.attr('disabled', disable ? 'disabled' : void 0);
      };
    }
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
    if (extras.hidden) {
      this.hidden(name, extras.hidden);
    }
    if (extras.disabled) {
      this.disabled(name, extras.disabled);
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
        key: options.key,
        hidden: options.hidden,
        disabled: options.disabled
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
        key: options.key,
        hidden: options.hidden,
        disabled: options.disabled
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

  Form.prototype.addPicker = function(name, values, options) {
    if (options == null) {
      options = {};
    }
    return this.add(name, 'select', 'div', function() {
      var elem, input, picker, pickerOptions;
      elem = this.append('button').attr('type', 'button')["class"](options.buttonClass);
      pickerOptions = hx.merge({}, options.pickerOptions);
      if (values.length > 0) {
        pickerOptions.items = values;
      }
      picker = new hx.Picker(elem.node(), pickerOptions);
      input = this.append('input')["class"]('hx-hidden-form-input').attr('size', 0);
      this.style('position', 'relative');
      if (typeof options.required !== 'boolean') {
        picker.value(values[0]);
      }
      if (options.required) {
        input.node().setCustomValidity('Please select a value from the list');
        picker.on('change', 'hx.form-builder', function() {
          return input.node().setCustomValidity('');
        });
      }
      return {
        required: options.required,
        componentNode: elem.node(),
        key: options.key,
        hidden: options.hidden,
        disabled: options.disabled,
        disable: function(selection, disabled) {
          return picker.disabled(disabled);
        }
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
        key: options.key,
        hidden: options.hidden,
        disabled: options.disabled
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
      id = self.formId + name.split(' ').join('-');
      count = 0;
      for (i = 0, len = values.length; i < len; i++) {
        value = values[i];
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
        key: options.key,
        hidden: options.hidden,
        disabled: options.disabled,
        disable: function(sel, disabled) {
          return sel.selectAll('input').attr('disabled', disabled ? true : void 0);
        }
      };
    });
  };

  Form.prototype.addDatePicker = function(name, options) {
    if (options == null) {
      options = {};
    }
    return this.add(name, 'datepicker', 'div', function() {
      var datepicker, elem, getValue, setValue;
      elem = this.append('div').node();
      datepicker = new hx.DatePicker(elem, options.datePickerOptions);
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
        setValue: setValue,
        hidden: options.hidden,
        disabled: options.disabled,
        disable: function(sel, disabled) {
          return datepicker.disabled(disabled);
        }
      };
    });
  };

  Form.prototype.addTimePicker = function(name, options) {
    if (options == null) {
      options = {};
    }
    return this.add(name, 'timepicker', 'div', function() {
      var elem, getValue, setValue, timepicker;
      elem = this.append('div').node();
      timepicker = new hx.TimePicker(elem, options.timePickerOptions);
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
        setValue: setValue,
        hidden: options.hidden,
        disabled: options.disabled,
        disable: function(sel, disabled) {
          return timepicker.disabled(disabled);
        }
      };
    });
  };

  Form.prototype.addDateTimePicker = function(name, options) {
    if (options == null) {
      options = {};
    }
    return this.add(name, 'datetimepicker', 'div', function() {
      var datetimepicker, elem, getValue, setValue;
      elem = this.append('div').node();
      datetimepicker = new hx.DateTimePicker(elem, options.dateTimePickerOptions);
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
        setValue: setValue,
        hidden: options.hidden,
        disabled: options.disabled,
        disable: function(sel, disabled) {
          return datetimepicker.disabled(disabled);
        }
      };
    });
  };

  Form.prototype.addSubmit = function(text, icon, submitAction) {
    hx.select(this.selector).append('button').attr('type', 'submit')["class"]('hx-btn hx-action hx-form-submit').add(hx.detached('i')["class"](icon)).add(hx.detached('span').text(" " + text)).on('click', 'hx.form-builder', (function(_this) {
      return function(e) {
        e.preventDefault();
        if (submitAction != null) {
          return submitAction(_this);
        } else {
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
    return this.add(name, 'tagInput', 'div', function() {
      var elem, tagInput;
      elem = this.append('div').node();
      tagInput = new hx.TagInput(elem, options.tagInputOptions);
      return {
        key: options.key,
        componentNode: elem,
        hidden: options.hidden,
        disabled: options.disabled,
        disable: function(sel, disabled) {
          return tagInput.disabled(disabled);
        }
      };
    });
  };

  Form.prototype.addFileInput = function(name, options) {
    var self;
    if (options == null) {
      options = {};
    }
    self = this;
    return this.add(name, 'fileInput', 'div', function() {
      var elem, fileInput;
      elem = this.append('div').node();
      fileInput = new hx.FileInput(elem, options.fileInputOptions);
      return {
        key: options.key,
        componentNode: elem,
        hidden: options.hidden,
        disabled: options.disabled,
        disable: function(sel, disabled) {
          return fileInput.disabled(disabled);
        }
      };
    });
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
    var key, result, value;
    if (arguments.length > 0) {
      for (key in data) {
        if (!hasProp.call(data, key)) continue;
        value = data[key];
        this.value(key, value);
      }
      return this;
    } else {
      result = {};
      this.properties.forEach((function(_this) {
        return function(key, it) {
          if (!it.hidden) {
            return result[key] = _this.value(key);
          }
        };
      })(this));
      return result;
    }
  };

  Form.prototype.hidden = function(property, hidden) {
    var prop, res;
    if (hx.isArray(property)) {
      res = property.map((function(_this) {
        return function(prop) {
          return _this.hidden(prop, hidden);
        };
      })(this));
      if (hidden != null) {
        return this;
      } else {
        return res;
      }
    } else if (this.properties.has(property)) {
      prop = this.properties.get(property);
      if (hidden != null) {
        prop.hidden = hidden;
        hx.select(prop.node.parentNode).style('display', hidden ? 'none' : '');
        this.properties.set(property, prop);
        return this;
      } else {
        return !!prop.hidden;
      }
    }
  };

  Form.prototype.disabled = function(property, disabled) {
    var prop, res;
    if (hx.isArray(property)) {
      res = property.map((function(_this) {
        return function(prop) {
          return _this.disabled(prop, disabled);
        };
      })(this));
      if (disabled != null) {
        return this;
      } else {
        return res;
      }
    } else if (this.properties.has(property)) {
      prop = this.properties.get(property);
      if (disabled != null) {
        prop.disabled = disabled;
        prop.extras.disable(hx.select(prop.node), disabled);
        this.properties.set(property, prop);
        return this;
      } else {
        return !!prop.disabled;
      }
    }
  };

  Form.prototype.node = function(property) {
    if (this.properties.has(property)) {
      return this.properties.get(property).node;
    }
  };

  Form.prototype.errorMessage = function(property, value) {
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
          hx.select(node).selectAll('input').nodes.map(function(e) {
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
          return hx.select(node).select('input').node.validationMessage;
        }
      }
    }
  };

  Form.prototype.value = function(property, value) {
    var fileInput, it, node;
    if (this.properties.has(property)) {
      it = this.properties.get(property);
      node = it.node;
      if (arguments.length > 1) {
        switch (it.type) {
          case 'checkbox':
            return hx.select(node).prop('checked', value);
          case 'radio':
            return hx.select(node).selectAll('input').filter(function(d) {
              return d.value() === value;
            }).prop('checked', true);
          case 'fileInput':
            fileInput = hx.component(it.extras.componentNode || node);
            return fileInput.value(value);
          case 'tagInput':
            return hx.component(it.extras.componentNode || node).items(value);
          case 'select':
            return hx.component(it.extras.componentNode || node).value(value);
          case 'datepicker':
          case 'timepicker':
          case 'datetimepicker':
            return it.extras.setValue(value);
          default:
            return hx.select(node).value(value);
        }
      } else {
        if (!it.hidden && !it.disabled) {
          value = (function() {
            switch (it.type) {
              case 'checkbox':
                return hx.select(it.node).prop('checked');
              case 'radio':
                return hx.select(it.node).select('input:checked').value();
              case 'tagInput':
                return hx.component(it.extras.componentNode || it.node).items();
              case 'fileInput':
                return hx.component(it.extras.componentNode || it.node).value();
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
          return value;
        }
      }
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
(function(){
var InlineEditable,
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
    selection = hx.select(this.selector).classed('hx-inline-editable', true);
    text = selection.text();
    selection.text('');
    this.textSelection = selection.append('a')["class"]('hx-morph-toggle').text(text);
    selection.append('div')["class"]('hx-morph-content hx-input-group').add(hx.detached('input')["class"]('hx-name')).add(hx.detached('button')["class"]('hx-btn hx-positive hx-confirm').add(hx.detached('i')["class"]('hx-icon hx-icon-check')));
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

hx.inlineEditable = function(options) {
  var selection;
  selection = hx.detached('div');
  new InlineEditable(selection.node(), options);
  return selection;
};

hx.InlineEditable = InlineEditable;

})();
(function(){
var InlinePicker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

InlinePicker = (function(superClass) {
  var enterEditMode, exitEditMode;

  extend(InlinePicker, superClass);

  enterEditMode = function(toggle, content) {
    var ref;
    this.picker.value(((ref = this.current) != null ? ref.value : void 0) || this.current);
    return hx.select(content).select('.hx-confirm').on('click', 'hx.inline-picker', (function(_this) {
      return function() {
        _this.current = _this.picker.value();
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

  function InlinePicker(selector, options) {
    var pickerNode, selection;
    this.selector = selector;
    options = hx.merge({
      renderer: void 0,
      items: [],
      contextClass: 'hx-complement',
      ddClass: void 0,
      noValueText: void 0,
      value: void 0
    }, options);
    this.current = void 0;
    selection = hx.select(this.selector).classed('hx-inline-picker', true);
    pickerNode = hx.detached('button')["class"]('hx-btn ' + options.contextClass).node();
    this.textSelection = selection.append('a')["class"]('hx-morph-toggle');
    selection.append('div')["class"]('hx-morph-content hx-input-group').add(pickerNode).add(hx.detached('button')["class"]('hx-btn hx-positive hx-confirm').add(hx.detached('i')["class"]('hx-icon hx-icon-check')));
    this.picker = new hx.Picker(pickerNode, {
      renderer: options.renderer,
      items: options.items,
      ddClass: options.ddClass,
      noValueText: options.noValueText
    });
    if (options.renderer == null) {
      options.renderer = this.picker.renderer();
    }
    this.picker.menu.dropdown.on('showstart', 'hx.inline-picker', (function(_this) {
      return function() {
        return _this.detector.addException(_this.picker.menu.dropdown._.dropdown.node());
      };
    })(this));
    InlinePicker.__super__.constructor.call(this, this.selector, enterEditMode, exitEditMode, options);
    if (this.options.value != null) {
      this.value(this.options.value);
    }
  }

  InlinePicker.prototype.renderer = function(f) {
    if (f != null) {
      this.options.renderer = f;
      this.picker.renderer(this.options.renderer);
      return this;
    } else {
      return this.options.renderer;
    }
  };

  InlinePicker.prototype.items = function(items) {
    if (items != null) {
      this.options.items = items;
      this.picker.items(this.options.items);
      return this;
    } else {
      return this.options.items;
    }
  };

  InlinePicker.prototype.value = function(value) {
    if (arguments.length > 0) {
      this.picker.value(value);
      this.current = this.picker.value();
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

  return InlinePicker;

})(hx.InlineMorphSection);

hx.inlinePicker = function(options) {
  var selection;
  selection = hx.detached('div');
  new InlinePicker(selection.node(), options);
  return selection;
};

hx.InlinePicker = InlinePicker;

})();


(function(){
var Meter;

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
      var endRadians, innerRadius, outerRadius, padding, path, startRadians;
      innerRadius = size / 2 * r1;
      outerRadius = size / 2 * r2;
      startRadians = Math.PI + Math.PI * start;
      endRadians = Math.PI + Math.PI * end;
      padding = 0;
      path = hx.plot.arcCurve(x, y, innerRadius, outerRadius, startRadians, endRadians, padding);
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

hx.meter = function(options) {
  var selection;
  selection = hx.detached('div');
  new Meter(selection.node(), options);
  return selection;
};

hx.Meter = Meter;

})();

(function(){
var Paginator, getRange, render, select,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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

render = function(paginator) {
  var buttonSize, buttonSpace, data, end, maxButtons, maxLength, ref, ref1, start, visibleCount;
  if (paginator._.pageCount === void 0) {
    data = [
      {
        value: paginator._.page,
        selected: true,
        dataLength: paginator._.page.toString().length
      }
    ];
  } else {
    ref = getRange(paginator._), start = ref.start, end = ref.end;
    maxLength = Math.max(start.toString().length, (end - 1).toString().length);
    buttonSize = 30 + (5 * Math.max(0, maxLength - 2));
    buttonSpace = paginator.container.width() - 81;
    maxButtons = Math.floor(buttonSpace / buttonSize);
    visibleCount = Math.min(maxButtons, paginator._.visibleCount);
    visibleCount = Math.max(visibleCount, 1);
    ref1 = getRange(paginator._), start = ref1.start, end = ref1.end;
    data = hx.range(end - start).map(function(i) {
      return {
        value: start + i,
        selected: paginator._.page === start + i,
        dataLength: maxLength
      };
    });
  }
  return paginator.view.apply(data);
};

select = function(paginator, page, cause) {
  var newPage;
  if (paginator._.pageCount === void 0) {
    newPage = Math.max(page, 1);
  } else {
    newPage = hx.clamp(1, paginator._.pageCount, page);
  }
  if (newPage !== paginator._.page) {
    paginator._.page = newPage;
    render(paginator);
    return paginator.emit('change', {
      cause: cause,
      selected: paginator._.page
    });
  }
};

Paginator = (function(superClass) {
  extend(Paginator, superClass);

  function Paginator(selector, options) {
    var pageButtons, self;
    Paginator.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    this.container = hx.select(selector).classed('hx-paginator', true);
    this._ = hx.merge({
      page: 1,
      visibleCount: 10,
      pageCount: 10
    }, options);
    this._.selector = selector;
    self = this;
    this.container.append('button').attr('type', 'button')["class"]('hx-btn ' + hx.theme.paginator.arrowButton).html('<i class="hx-icon hx-icon-step-backward"></i>').on('click', 'hx.paginator', function() {
      if (self._.pageCount === void 0) {
        return select(self, self._.page - 1, 'user');
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
    this.container.append('button').attr('type', 'button')["class"]('hx-btn ' + hx.theme.paginator.arrowButton).html('<i class="hx-icon hx-icon-step-forward"></i>').on('click', 'hx.paginator', function() {
      if (self._.pageCount === void 0) {
        return select(self, self._.page + 1, 'user');
      } else {
        return select(self, self._.pageCount, 'user');
      }
    });
    this.container.on('resize', 'hx.paginator', function() {
      return render(self);
    });
    render(this);
  }

  Paginator.prototype.page = function(i) {
    if (arguments.length > 0) {
      select(this, i, 'api');
      return this;
    } else {
      return this._.page;
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

hx.paginator = function(options) {
  var selection;
  selection = hx.detached('div');
  new Paginator(selection.node(), options);
  return selection;
};

hx.Paginator = Paginator;

})();
(function(){
var PivotTable, createTableView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

createTableView = function(table, head, body) {
  var bodyView, cellViewEnter, cellViewUpdate, headView, rowViewEnter, rowViewUpdate;
  cellViewEnter = function(data, index, isHead) {
    var cell, cellIsHead, cellIsTopLeft, isFirstColum, type;
    isFirstColum = table._.leftShifted && index === 0;
    cellIsHead = isHead || isFirstColum;
    cellIsTopLeft = isHead && isFirstColum;
    type = cellIsHead || hx.isFunction(data) ? 'th' : 'td';
    cell = this.append(type)["class"]('hx-pivot-table-cell');
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
    selection = hx.select(node);
    if (hx.isFunction(data)) {
      return data(node);
    } else if (data == null) {
      return selection.text('');
    } else {
      return table.options.cellRender(data, node, cellIsHead, index);
    }
  };
  rowViewEnter = function(data, isHead) {
    var rowNode, rowView;
    rowNode = this.append('tr').node();
    rowView = hx.select(rowNode).view('.hx-pivot-table-cell').enter(function(datum) {
      var index;
      index = data.indexOf(datum);
      return cellViewEnter.call(this, datum, index, isHead);
    }).update(function(datum, node, index) {
      return cellViewUpdate(datum, node, index, isHead);
    });
    hx.component.register(rowNode, {
      view: rowView
    });
    return rowNode;
  };
  rowViewUpdate = function(data, node, index, isHead) {
    return hx.component(node).view.apply(data);
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

PivotTable = (function(superClass) {
  extend(PivotTable, superClass);

  function PivotTable(selector, options) {
    var ref, self;
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
      useResponsive: true,
      data: void 0
    }, options);
    this._ = {};
    this.selection = hx.select(this.selector).classed('hx-pivot-table', true);
    this.table = this.selection.append('table')["class"]('hx-table');
    this.tableHead = this.table.append('thead');
    this.tableBody = this.table.append('tbody');
    ref = createTableView(this, this.tableHead, this.tableBody), this.tableHeadView = ref[0], this.tableBodyView = ref[1];
    if (this.options.data != null) {
      this.data(this.options.data);
    }
  }

  PivotTable.prototype.data = function(data) {
    var _, bodyData, clonedData, leftData, ref, ref1, ref2, topData;
    if (data != null) {
      _ = this._;
      _.data = data;
      _.leftShifted = false;
      clonedData = hx.clone(data);
      topData = ((ref = clonedData.topHead) != null ? ref.length : void 0) > 0 ? clonedData.topHead : [];
      leftData = ((ref1 = clonedData.leftHead) != null ? ref1.length : void 0) > 0 ? clonedData.leftHead : [];
      bodyData = ((ref2 = clonedData.body) != null ? ref2.length : void 0) > 0 ? clonedData.body : [];
      if (topData.length > 0 && bodyData.length > 0) {
        if (topData.length !== bodyData[0].length) {
          hx.consoleWarning('hx.PivotTable - ' + this.selector, 'The number of columns in the dataset is not equal to the number of headers provided in data.topHead');
        }
      }
      if (leftData.length > 0) {
        if (leftData.length !== bodyData.length) {
          hx.consoleWarning('hx.PivotTable - ' + this.selector, 'The number of rows in the dataset is not equal to the number of headers provided in data.leftHead');
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

hx.pivotTable = function(options) {
  var selection;
  selection = hx.detached('div');
  new PivotTable(selection.node(), options);
  return selection;
};

hx.PivotTable = PivotTable;

})();
(function(){
var SideCollapsible,
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
        morph = (function(_this) {
          return function() {
            _this.selection.style('width', '');
            _this.content.morph()["with"]('expandh', 100).and('fadein', 100).and(function() {
              return _this.openHeading.morph()["with"]('expandh', 100).and('fadein', 100).go(true);
            }).go(true);
            _this.emit('showend');
            return typeof cb === "function" ? cb() : void 0;
          };
        })(this);
        this.closedHeading.morph()["with"]('fadeout', 100).then(morph).go(true);
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
(function(){
var Sidebar,
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
    btn = hx.select(options.headerSelector).prepend('button').attr('type', 'button')["class"]('hx-titlebar-sidebar-button').html('<i class="hx-icon hx-icon-bars"></i>');
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
(function(){
var Tabs, onTabSelected,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

onTabSelected = function(tabs, element, i) {
  var context, selection;
  tabs.selected = i;
  selection = hx.select(tabs.selector);
  selection.selectAll('.hx-tab').classed('hx-tab-active', false);
  hx.select(element).classed('hx-tab-active', true);
  context = hx.palette.context(element);
  hx.palette.borderContext(selection.select('.hx-tabs-content'), context);
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
(function(){
var TimeSlider, zeroPad,
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

hx.timeSlider = function(options) {
  var selection;
  selection = hx.detached('div');
  new TimeSlider(selection.node(), options);
  return selection;
};

hx.TimeSlider = TimeSlider;

})();
(function(){
var Toggle,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Toggle = (function(superClass) {
  extend(Toggle, superClass);

  function Toggle(selector, options) {
    Toggle.__super__.constructor.apply(this, arguments);
    hx.component.register(selector, this);
    this.options = hx.merge.defined({
      value: false
    }, options);
    this.selection = hx.select(selector).classed('hx-toggle', true);
    this.toggle = this.selection.append('div')["class"]('hx-toggle-box');
    this.value(this.options.value);
    this.selection.on('click', 'hx.toggle', (function(_this) {
      return function(e) {
        _this.value(!_this.value());
        return _this.emit('change', _this.value());
      };
    })(this));
  }

  Toggle.prototype.value = function(val) {
    if (val != null) {
      this.options.value = val;
      this.toggle.classed('hx-toggle-box-on', val);
      return this;
    } else {
      return this.options.value;
    }
  };

  return Toggle;

})(hx.EventEmitter);

hx.toggle = function(options) {
  var selection;
  selection = hx.detached('div');
  new Toggle(selection.node(), options);
  return selection;
};

hx.Toggle = Toggle;

})();
(function(){
var Tree, format, formatIcon, recurseUpTree;

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
        selection.attr('class', 'hx-tree-node-parent-icon').append('i').attr('class', 'hx-icon hx-icon-chevron-right hx-tree-node-state-icon');
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
      return selection.attr('class', 'hx-tree-node-parent-icon hx-tree-node-parent-icon-disabled').append('i').attr('class', 'hx-icon hx-icon-chevron-right');
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

hx.tree = function(options) {
  var selection;
  selection = hx.detached('div');
  new Tree(selection.node(), options);
  return selection;
};

hx.Tree = Tree;

hx.initializeTrees = function(selector) {
  return hx.selectAll(selector).nodes.map(function(d) {
    return new Tree(d);
  });
};

})();
(function(){
var _, completeGetterSetter, isValid, partialGetterSetter, userFacingText, userFacingTextDefaults;

_ = {
  initialValues: {},
  localisedText: {}
};

completeGetterSetter = function(object) {
  var key, module, results;
  if (arguments.length) {
    if (hx.isPlainObject(object)) {
      results = [];
      for (module in object) {
        results.push((function() {
          var results1;
          results1 = [];
          for (key in object[module]) {
            results1.push(partialGetterSetter(module, key, object[module][key]));
          }
          return results1;
        })());
      }
      return results;
    } else {
      return hx.consoleWarning("hx.userFacingText: Expected a plain object but was instead passed: " + object);
    }
  } else {
    return hx.clone(_.localisedText);
  }
};

isValid = function(value) {
  return hx.isString(value) && value.length;
};

partialGetterSetter = function(module, key, value) {
  var base, base1, base2, ref, text;
  if (isValid(module) && isValid(key)) {
    if (isValid(value)) {
      if ((base = _.localisedText)[module] == null) {
        base[module] = {};
      }
      _.localisedText[module][key] = value;
      if ((base1 = _.initialValues)[module] == null) {
        base1[module] = {};
      }
      if ((base2 = _.initialValues[module])[key] == null) {
        base2[key] = value;
      }
      return true;
    } else if (value == null) {
      text = (ref = _.localisedText[module]) != null ? ref[key] : void 0;
      if (text) {
        return text;
      } else {
        return hx.consoleWarning("hx.userFacingText: No text was found for key: " + key + " in module: " + module);
      }
    } else {
      return hx.consoleWarning("hx.userFacingText: The value provided must be a string but was passed value: " + value);
    }
  } else {
    return hx.consoleWarning("hx.userFacingText: A module and key are expected as strings but was passed module: " + module + " and key: " + key);
  }
};

userFacingText = function() {
  if (arguments.length <= 1) {
    return completeGetterSetter.apply(this, arguments);
  } else {
    return partialGetterSetter.apply(this, arguments);
  }
};

userFacingTextDefaults = function() {
  return hx.clone(_.initialValues);
};

hx.userFacingText = userFacingText;

hx.userFacingText.defaults = userFacingTextDefaults;

hx.userFacingText._ = _;

})();


})();