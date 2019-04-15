
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
  paginator: {
    arrowButton: 'n-a',
    defaultButton: 'hx-complement',
    selectedButton: 'hx-action',
  },
  palette: {
    defaultCol: '#E6E6E6',
    actionCol: '#6582A6',
    positiveCol: '#6FB365',
    warningCol: '#CB9856',
    negativeCol: '#C74967',
    infoCol: '#A36FA9',
    complementCol: '#FDFDFD',
    contrastCol: '#3D3D3D',
    lightTextCol: '#F3F3F3',
    darkTextCol: '#3D3D3D',
    disabledCol: '#FAFAFA',
    disabledTextCol: '#939393',
  },
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
