function deprecated (deprecatedItem, ...messages)  {
  const heading = `Deprecation Warning: ${deprecatedItem}`
  console.warn.apply(console, [heading, ...messages])
}

function warn (...messages) {
  console.warn.apply(console, messages)
}

export default {
  deprecated,
  warn
}
