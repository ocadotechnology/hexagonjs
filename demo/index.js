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
    hx.select('#container').class('hx-group hx-horizontal view-' + p.value.text)
      .selectAll('.exampleSection')
      .class('hx-section exampleSection ' + p.value.value)
      .selectAll('.example')
      .class('example ' + (p.value.contentClass || ''))
  })

var hx = window.hx

void new hx.Tabs('#tabs')

function tabsTitleRenderer(node, value) {
  hx.select(node).text('Tab ' + value)
}

function tabsContentRenderer(node, value) {
  hx.select(node)
    .style('padding', '1em')
    .add(hx.detached('span').text(value.name))
    .add(hx.label().text(value.town))
}

function setupFluidTabs() {
  var tabItems = [
    {
      title: 1,
      context: 'action',
      content: {
        town: 'Wheathampstead',
        name: 'Bob'
      }
    }, {
      title: 2,
      context: 'negative',
      content: {
        town: 'Welwyn',
        name: 'Kate'
      }
    }, {
      title: 3,
      context: 'positive',
      content: {
        town: 'Digswell',
        name: 'Ganesh'
      }
    }, {
      title: 4,
      content: {
        town: 'Essendon',
        name: 'Lazlo'
      }
    }
  ]

  var tabs = hx.tabs({
    items: tabItems,
    titleRenderer: tabsTitleRenderer,
    contentRenderer: tabsContentRenderer
  })

  hx.select('#tabs-fluid').add(tabs)
}

setupFluidTabs()
