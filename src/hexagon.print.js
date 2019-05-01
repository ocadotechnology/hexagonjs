// Add footnotes to links for printing pages
const { hx } = window;
function beforePrint() {
  const links = hx.detached('ol');
  const refs = [];
  hx.select('body').selectAll('*').forEach((sel) => {
    if (sel.node().nodeName === 'A' && !sel.classed('hx-titlebar-icon')) {
      const thisRef = sel.attr('href');
      if (thisRef && thisRef.length && thisRef !== '#') {
        if (!(refs.indexOf(thisRef) > -1)) refs.push(thisRef);
        const itemIndex = refs.indexOf(thisRef);
        sel.add(hx.detached('sup').class('hx-footnote-ref hx-print-only').text(`[${itemIndex + 1}]`));
      }
    }
  });
  refs.forEach((ref) => {
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
  const mediaQueryList = window.matchMedia('print');
  mediaQueryList.addListener((mql) => {
    if (mql.matches) {
      beforePrint();
    } else {
      afterPrint();
    }
  });
}

window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;
