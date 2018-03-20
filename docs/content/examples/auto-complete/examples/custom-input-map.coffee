options = {
  inputMap: (item) -> item.name + ', ' + item.location
}
new hx.AutoComplete('#autoComplete-InputMap', nameAndLocationData, options)