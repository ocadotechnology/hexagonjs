(function () {
  'use strict';

  // Add footnotes to links for printing pages
  var hx = window.hx;
  function beforePrint() {
    var links = hx.detached('ol');
    var refs = [];
    hx.select('body').selectAll('*').forEach(function (sel) {
      if (sel.node().nodeName === 'A' && !sel.classed('hx-titlebar-icon')) {
        var thisRef = sel.attr('href');
        if (thisRef && thisRef.length && thisRef !== '#') {
          if (!(refs.indexOf(thisRef) > -1)) { refs.push(thisRef); }
          var itemIndex = refs.indexOf(thisRef);
          sel.add(hx.detached('sup').class('hx-footnote-ref hx-print-only').text(("[" + (itemIndex + 1) + "]")));
        }
      }
    });
    refs.forEach(function (ref) {
      links.add(hx.detached('li').text(ref));
    });
    if (refs.length > 0) {
      hx.select('body').add(hx.detached('div').class('hx-footnote-links hx-print-only').add('hr').add(hx.detached('h2').text('Links'))
        .add(links));
    }
  }

  function afterPrint() {
    hx.selectAll('.hx-footnote-ref').remove();
    hx.selectAll('.hx-footnote-links').remove();
  }

  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        beforePrint();
      } else {
        afterPrint();
      }
    });
  }

  window.onbeforeprint = beforePrint;
  window.onafterprint = afterPrint;

}());
