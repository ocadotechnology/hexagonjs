// View Menu - decide what background to use

var types = [
  {
    text: 'body',
    value: ''
  },
  {
    text: 'content',
    value: 'hx-content'
  },
  {
    text: 'card',
    value: 'hx-card'
  },
  {
    text: 'collapsible content',
    value: 'hx-collapsible-content'
  },
  {
    text: 'modal content',
    value: 'hx-modal-content'
  },
  {
    text: 'tab content',
    value: 'hx-tabs-content'
  }
]

var contexts = []
var notices = []

window.contextNames.forEach(function (ctx) {
  contexts.push({
    text: 'context ' + ctx,
    value: 'hx-background-' + ctx
  })
  notices.push({
    text: 'notice ' + ctx,
    value: 'hx-notice hx-' + ctx,
    contentClass: 'hx-notice-body'
  })
})

new hx.Picker('#viewMenu', {
  items: types.concat(contexts).concat(notices),
  value: '',
  renderer: function (node, item) {
    hx.select(node).text(item.text)
  }
})
  .on('change', function (p) {
    if (p.value.contentClass) {
      hx.selectAll('.demo-section')
        .class(`demo-section ${p.value.value}`)
        .select('.demo-section-examples')
          .class(`demo-section-examples ${p.value.contentClass || ''}`)
    } else {
      hx.selectAll('.demo-section')
        .class('demo-section')
        .select('.demo-section-examples')
          .class(`demo-section-examples ${p.value.value || ''}`)
    }
  })

const contents = hx.select('#contents')

function slug (text) {
  return text.toLowerCase().split(' ').join('-')
}

if (contents.size()) {
  contents.append(hx.selectAll('.demo-group').map(sel => {
    const titleSel = sel.select('h2')
    const titleText = titleSel.text()
    const titleSlug = slug(titleText)
    titleSel.attr('id', titleSlug)
    return hx.detached('li')
      .add(hx.detached('a')
        .attr('href', `#${titleSlug}`)
        .text(titleText))
      .add(hx.detached('ul')
        .add(sel.selectAll('.demo-section').map(innerSel => {
          const titleSel = innerSel.select('h3')
          const titleText = titleSel.text()
          const titleSlug = slug(titleText)
          titleSel.attr('id', titleSlug)
          return hx.detached('li')
            .add(hx.detached('a')
              .attr('href', `#${titleSlug}`)
              .text(titleText))
        })))
  }))
  new hx.Collapsible('#contents-collapsible')
}
