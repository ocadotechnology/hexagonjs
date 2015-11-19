paginator1 = new hx.Paginator('#paginator1')
paginator1.setPageCount(1000)
paginator1.setVisibleCount(1000)

paginator2 = new hx.Paginator('#paginator2')
paginator2.setPageCount(1000)
paginator2.page(100)

paginator3 = new hx.Paginator('#paginator3')
paginator3.setPageCount(undefined)
paginator3.page(1000)

# Will never show too many pages for the content area
paginator4 = new hx.Paginator('#paginator4')
paginator4.setPageCount(1000)
paginator4.page(1000)

paginator1.on 'change', (event) ->
  hx.notify().info('Page ' + event.selected + ' selected')

