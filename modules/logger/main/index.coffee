deprecated = (deprecatedItem, messages...) ->
  heading = "Deprecation Warning: #{deprecatedItem}"
  messages = ['Alternatives:'].concat messages.map (d) -> '  ' + d
  messages = messages.map (d) -> '  ' + d
  console.warn [heading].concat(messages).join('\n')
  console.trace('Stack Trace')
  return

warn = (heading, messages...) ->
  console.warn.apply(console, [heading].concat(messages))
  console.trace('Stack Trace')
  return

export default {
  deprecated,
  warn
}
