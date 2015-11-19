
// Create a color from an array
col = hx.color([123,190,49,1])

// Create a color from a css string
col = hx.color('#7BBE31')
col = hx.color('rgb(123,190,49)')
col = hx.color('rgba(123,190,49,1)')
col = hx.color('hsl(88.5,59%,46.9%)')
col = hx.color('hsla(88.5,59%,46.9%,1)')

// Output a color to an array
col.toArray() // returns [123, 190, 49, 1]

// Lighten a color
hx.color([50,50,50]).lighten(0.5) // returns color object equivalent to [75,75,75,1]

// Darken a color
hx.color([50,50,50]).lighten(-0.5) // returns color object equivalent to [25,25,25,1]

// Mix colors on a 50/50 ratio
hx.color([50,50,50]).mix(hx.color([100,100,100])) // returns color object equivalent to [75,75,75,1]

// Mix colors on a 70/30 ratio
hx.color([50,50,50]).mix(hx.color([100,100,100]), 0.3) // returns color object equivalent to [65,65,65,1]
