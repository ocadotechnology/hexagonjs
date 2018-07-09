options = {
  inputMap: (item) -> item.name
  renderer: (elem, item) ->
    hx.select(elem)
      .text(item.name)
      .append('span')
        .class('hx-label hx-contrast')
        .text(item.location)
}
new hx.AutoComplete('#autoComplete-Renderer', nameAndLocationData, options)