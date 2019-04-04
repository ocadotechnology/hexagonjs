
let currentTheme = {
  plotColor1: 'rgb(177,119,190)',
  plotColor2: 'rgb(90,155,212)',
  plotColor3: 'rgb(241,90,113)',
  plotColor4: 'rgb(151,195,102)',
  plotColor5: 'rgb(250,169,91)',
  plotColor6: 'rgb(226,212,64)',
  plotColors: [
    'rgb(177,119,190)',
    'rgb(90,155,212)',
    'rgb(241,90,113)',
    'rgb(151,195,102)',
    'rgb(250,169,91)',
    'rgb(226,212,64)',
  ],
};

function theme(t) {
  if (arguments.length > 0) {
    currentTheme = t;
  }
  return currentTheme;
}

export {
  theme,
};
