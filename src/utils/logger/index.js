// `console` is only allowed in this file.`
/* eslint-disable no-console */

function deprecated(deprecatedItem, ...messages) {
  const heading = `Deprecation Warning: ${deprecatedItem}`;
  console.warn(heading, ...messages);
}

function warn(...messages) {
  console.warn(...messages);
}

/* eslint-enable no-console */
export default {
  deprecated,
  warn,
};
