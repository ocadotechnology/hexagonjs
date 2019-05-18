# HexagonJS

[![Build Status](https://travis-ci.org/ocadotechnology/hexagonjs.svg?branch=master)](https://travis-ci.org/ocadotechnology/hexagonjs)

## About

Hexagon.js is a collection of components, styles and JavaScript utilities. It has been designed from the ground up to support custom theming and extension.

This readme includes no details about how to use the library itself as there is extensive documentation for the library available here: [https://www.hexagonjs.io](https://hexagonjs.io).


## Package Contents

Files to copy and use in the browser directly:
```
dist/
  -  assets/* (icon fonts etc.)
  -  favicon/* (all variants of favicon)
  -  hexagon.css (light theme)
  -  hexagon.js (light theme)
  -  hexagon.print.css
  -  hexagon.print.js
```

Files to build a theme on top of:
- *dist/hexagon.core.css*: This is the bare minimum CSS for a hexagon build and does not include any theming
- *dist/hexagon.variables.css*: All the current hexagon variables. This can be used as a template to create a new theme
- *dist/hexagon.theme.css*: The theme CSS. Uses the hexagon theme variables.

- *dist/hexagon.core.js*: This is the bare minimum JS for a hexagon build and does not include setting any `theme` variables.
- *dist/hexagon.theme.js*: This is the JS for the light hexagon theme. Use as a template to create a new theme.

