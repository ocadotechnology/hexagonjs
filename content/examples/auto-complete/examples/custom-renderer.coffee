options = {
  inputMap: (item) -> item.name
  renderer: (elem, item) ->
    hx.select(elem)
      .text(item.name)
      .append('span')
        .class('hx-label')
        .text(item.county)
}
new hx.AutoComplete('#autoComplete-Renderer', nameAndLocationData, options)