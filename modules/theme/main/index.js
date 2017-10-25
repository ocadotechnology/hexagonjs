
let currentTheme = {
  plotColor1: '#000000',
  plotColor2: '#000000',
  plotColor3: '#000000',
  plotColor4: '#000000',
  plotColor5: '#000000',
  plotColor6: '#000000'
}

function theme (t) {
  if (arguments.length > 0) {
    currentTheme = t
  } else {
    return currentTheme
  }
}

export {
  theme
}
