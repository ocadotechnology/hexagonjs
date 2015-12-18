options = {
  inputMap: (item) -> item.name + ', ' + item.county
}
new hx.AutoComplete('#autoComplete-InputMap', nameAndLocationData, options)