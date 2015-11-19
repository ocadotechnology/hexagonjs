describe 'hx-color', ->
  getCol = (col) -> [col.r, col.g, col.b, col.a]

  describe 'hx.color:', ->
    it 'should default to black when no arguments are passed in', ->
      color = hx.color()
      expect(getCol(color)).toEqual([0, 0, 0, 1])

    it 'should create an object from a string', ->
      color = hx.color('rgb(77,255,88)')
      expect(getCol(color)).toEqual([77,255,88,1])

    it 'should create an object from an array', ->
      color = hx.color([55,37,199])
      expect(getCol(color)).toEqual([55,37,199,1])

    it 'should create an object from multiple passed in arguments', ->
      color = hx.color(10, 20, 35)
      expect(getCol(color)).toEqual([10, 20, 35, 1])
      color = hx.color(55, 72, 99, 0.6)
      expect(getCol(color)).toEqual([55, 72, 99, 0.6])

    it 'set the color based on a hex string', ->
      color = hx.color('#7BBE31')
      expect(getCol(color)).toEqual([123,190,49,1])

    it 'set the color based on a shortened hex string', ->
      color = hx.color('#ABC')
      expect(getCol(color)).toEqual([170, 187, 204, 1 ])

    it 'set the color based on an rgb string', ->
      color = hx.color('rgb(199,1,37)')
      expect(getCol(color)).toEqual([199,1,37,1])

    it 'set the color based on an rgba string', ->
      color = hx.color('rgba(199,1,37, 0.7)')
      expect(getCol(color)).toEqual([199,1,37,0.7])

    it 'set the color based on an hsl string', ->
      color = hx.color('hsl(50,100,10)')
      expect(getCol(color)).toEqual([ 51, 43, 0, 1 ])

    it 'set the color based on an hsla string', ->
      color = hx.color('hsla(50,100,10,0.7)')
      expect(getCol(color)).toEqual([ 51, 43, 0, 0.7 ])

    it 'should return undefined when an invalid color string is passed in ', ->
      expect(hx.color('#GGGGGG')).toEqual(undefined)

    it 'should return undefined when an invalid color string is passed in ', ->
      expect(hx.color(123)).toEqual(undefined)

    it 'should return undefined when an invalid color string is passed in ', ->
      expect(hx.color({})).toEqual(undefined)

    it 'should return undefined when an invalid color string is passed in ', ->
      expect(hx.color(->)).toEqual(undefined)

    it 'should return undefined when an invalid color string is passed in ', ->
      expect(hx.color('not a string')).toEqual(undefined)

    it 'should return undefined when an invalid color string is passed in ', ->
      expect(hx.color('hsl(aasd, 12, 12)')).toEqual(undefined)

    it 'should return undefined when an invalid color string is passed in ', ->
      expect(hx.color('rgb(aasd, 12, 12)')).toEqual(undefined)

    it 'should return a color when a valid color string is passed in ', ->
      expect(hx.color('#FFFFFF')).toEqual(hx.color(255, 255, 255, 1))

    it 'should return a color when a valid color string is passed in (rgb)', ->
      expect(hx.color('rgb(255, 255, 255)')).toEqual(hx.color(255, 255, 255, 1))

    it 'should return a color when a valid color string is passed in (rgba)', ->
      expect(hx.color('rgba(255, 255, 255, 0.5)')).toEqual(hx.color(255, 255, 255, 0.5))

    it 'should return a color when a valid color string is passed in hsl', ->
      expect(hx.color('hsl(50, 50, 50)')).toEqual((hx.color()).setHSL([50, 50, 50]))

    it 'should return  a color when a valid color string is passed in hsla', ->
      expect(hx.color('hsl(50, 50, 50, 0.5)')).toEqual((hx.color()).setHSL([50, 50, 50]).alpha(0.5))

    it 'should return a color when a valid array is passed in', ->
      expect(hx.color([0, 0, 0])).toEqual(hx.color().setRGB([0, 0, 0]))

    it 'should clamp to valid values for arrays', ->
      expect(hx.color([0, 0, 256])).toEqual(hx.color().setRGB([0, 0, 255]))



  describe 'hx.isColor:', ->
    it 'should return true for a color instance', ->
      expect(hx.color.isColor(hx.color())).toEqual(true)

    it 'should return false for a color instance', ->
      expect(hx.color.isColor({})).toEqual(false)



  describe 'hx.isColorString:', ->
    it 'should return false when an invalid color string is passed in ', ->
      expect(hx.color.isColorString('#GGGGGG')).toEqual(false)

    it 'should return false when an invalid color string is passed in ', ->
      expect(hx.color.isColorString(123)).toEqual(false)

    it 'should return false when an invalid color string is passed in ', ->
      expect(hx.color.isColorString({})).toEqual(false)

    it 'should return false when an invalid color string is passed in ', ->
      expect(hx.color.isColorString(->)).toEqual(false)

    it 'should return false when an invalid color string is passed in ', ->
      expect(hx.color.isColorString('not a string')).toEqual(false)

    it 'should return false when an invalid color string is passed in ', ->
      expect(hx.color.isColorString('hsl(aasd, 12, 12)')).toEqual(false)

    it 'should return false when an invalid color string is passed in ', ->
      expect(hx.color.isColorString('rgb(aasd, 12, 12)')).toEqual(false)

    it 'should return true when a valid color string is passed in ', ->
      expect(hx.color.isColorString('#FFFFFF')).toEqual(true)

    it 'should return true when a valid color string is passed in (rgb)', ->
      expect(hx.color.isColorString('rgb(255, 255, 255)')).toEqual(true)

    it 'should return true when a valid color string is passed in (rgba)', ->
      expect(hx.color.isColorString('rgba(255, 255, 255, 0.5)')).toEqual(true)

    it 'should return true when a valid color string is passed in hsl', ->
      expect(hx.color.isColorString('hsl(50, 50, 50)')).toEqual(true)

    it 'should return true when a valid color string is passed in hsla', ->
      expect(hx.color.isColorString('hsl(50, 50, 50, 0.5)')).toEqual(true)




  describe 'setRGB', ->
    it 'should set the RGB values of a color', ->
      color = hx.color([99,99,99]).setRGB([120,19,55])
      expect(getCol(color)).toEqual([120,19,55,1])

    it 'should not modify the color if undefined values are passed in', ->
      color = hx.color([10,10,10]).setRGB()
      expect(getCol(color)).toEqual([10,10,10,1])



  describe 'setHSL', ->
    it 'should set the HSL values of a color', ->
      color = hx.color([0,0,0]).setHSL([10,50,100])
      expect([color.h, color.s, color.l, color.a]).toEqual([10/360, 0.5, 1, 1])

    it 'should not modify the color if undefined values are passed in', ->
      color = hx.color([10,10,10]).setHSL()
      expect(getCol(color)).toEqual([10,10,10,1])



  describe 'setting property values:', ->

    testProp = (prop, values) ->
      color = hx.color()
      for value in values
        color[prop] = value
        it 'should set "' + prop + '" properly for value ' + value, ->
          if value? and value >= 0
            expect(color[prop]).toEqual(value)
          else expect(color[prop]).toEqual(0)

    testProp('r', [360, 0, -100, undefined])
    testProp('g', [255, 0, -100, undefined])
    testProp('b', [255, 0, -100, undefined])
    testProp('h', [1, 0, -0.5, undefined])
    testProp('s', [1, 0, -0.5, undefined])
    testProp('l', [1, 0, -0.5, undefined])
    testProp('a', [1, 0, -0.5, undefined])



  describe 'toString:', ->
    it 'should return correct 6 character hex color by default', ->
      color = hx.color().toString()
      expect(color).toEqual('#000000')

    it 'should return correct hex string of color', ->
      color = hx.color([123,190,49]).toString()
      expect(color).toEqual('#7bbe31')

    it 'should return the rgba css string of a color when no type is passed in', ->
      color = hx.color([240,120,10,0.5]).toString()
      expect(color).toEqual('rgba(240,120,10,0.5)')

    it 'should return the rgb css string of a color', ->
      color = hx.color([240,120,10,0.5]).toString('rgb')
      expect(color).toEqual('rgb(240,120,10)')

    it 'should return the rgba css string of a color', ->
      color = hx.color([240,120,10,0.5]).toString('rgba')
      expect(color).toEqual('rgba(240,120,10,0.5)')

    it 'should return the hsl css string of a color', ->
      color = hx.color().setHSL([10,50,50]).toString('hsl')
      expect(color).toEqual('hsl(10,50%,50%)')

    it 'should return the hsla css string of a color', ->
      color = hx.color().setHSL([10,50,50,1]).toString('hsla')
      expect(color).toEqual('hsla(10,50%,50%,1)')



  describe 'mix:', ->
    it 'should return a 50/50 mix of two colors', ->
      color = hx.color([51,204,51]).mix(hx.color([245,107,196]))
      expect(getCol(color)).toEqual([148,156,124,1])

    it 'should allow non-color objects', ->
      color = hx.color([51,204,51]).mix([245,107,196])
      expect(getCol(color)).toEqual([148,156,124,1])

    it 'should return a 70/30 mix of two colors', ->
      color = hx.color([51,204,51]).mix(hx.color([245,107,196]), 0.7)
      expect(getCol(color)).toEqual([187, 136, 153, 1])



  describe 'saturation:', ->
    it 'should set the saturation value of a color', ->
      color = hx.color([226,124,29]).saturation(0.1)
      expect(getCol(color)).toEqual([140,127,115,1])

    it 'the saturation should not be changed if the saturation of the color is at 0 (color is grey)', ->
      color = hx.color([0,0,0]).saturation(0.5)
      expect(getCol(color)).toEqual([0,0,0,1])

    it 'saturate: increase saturation by a percentage of the colors saturation', ->
      color = hx.color([100,64,191]).saturate(0.5)
      expect(getCol(color)).toEqual([86,32,223,1])

    it 'desaturate: decrease saturation by a percentage of the colors saturation', ->
      color = hx.color([38,217,95]).desaturate(0.5)
      expect(getCol(color)).toEqual([83,172,111,1])



  describe 'lightness:', ->
    it 'should set the lightness value of a color', ->
      color = hx.color([0,8,26]).lightness(0.88)
      expect(getCol(color)).toEqual([194,213,255,1])

    it 'lighten: should increase the lightness of a color', ->
      color = hx.color([0,170,255]).lighten(0.2)
      expect(getCol(color)).toEqual([51,187,255,1])

    it 'darken: should reduce the lightness of a color', ->
      color = hx.color([255,0,200]).darken(0.2)
      expect(getCol(color)).toEqual([204,0,160,1])



  describe 'alpha:', ->
    it 'should set the opacity value for a color', ->
      color = hx.color([76,62,21,0.1]).alpha(0.93)
      expect(getCol(color)).toEqual([76,62,21,0.93])

    it 'should set the opacity value for a color', ->
      color = hx.color([44,33,22,0.93]).clone()
      expect(getCol(color)).toEqual([44,33,22,0.93])

    it 'fadeIn: make a color more opaque', ->
      color = hx.color([99,32,87,0.4]).fadeIn(0.5)
      expect(getCol(color)).toEqual([99,32,87,0.6])

    it 'fadeOut: should not set alpha above 1', ->
      color = hx.color([53,29,184,0.5]).fadeIn(2)
      expect(color.a).toEqual(1)

    it 'fadeOut: make a color more transparent', ->
      color = hx.color([53,29,184,0.5]).fadeOut(0.2)
      expect(getCol(color)).toEqual([53,29,184,0.4])

    it 'fadeOut: should not set alpha below 0', ->
      color = hx.color([53,29,184,0.5]).fadeOut(2)
      expect(color.a).toEqual(0)



  describe 'getTextCol:', ->
    it 'should return the right text color for a color', ->
      expect(hx.color('#3D3D3D').getTextCol()).toEqual('white')
      expect(hx.color('#7BBE31').getTextCol()).toEqual('black')
      expect(hx.color('#FAFAFA').getTextCol()).toEqual('black')



  describe 'toArray::', ->
    it 'should return the correct array of colors', ->
      expect(hx.color([122,255,143]).toArray()).toEqual([122,255,143,1])
      expect(hx.color([10,23,100,0.7]).toArray()).toEqual([10,23,100,0.7])



  describe 'range::', ->
    it 'should return the correct number of colors by default', ->
      color = hx.color([50,50,50])
      colorRange = color.range()
      expect(colorRange.length).toEqual(7)

    it 'should return the correct number of colors when numLight/numDark are set', ->
      color = hx.color([50,50,50])
      colorRange = color.range(2,2)
      expect(colorRange.length).toEqual(5)
      colorRange = color.range(5,7)
      expect(colorRange.length).toEqual(13)

    it 'should correctly use the default color difference', ->
      color = hx.color([50,50,50])
      colorRange = color.range()
      expect(colorRange.map((col) -> getCol(col))).toEqual([[25,25,25,1], [33,33,33,1], [42,42,42,1], [50,50,50,1], [58,58,58,1], [67,67,67,1], [75,75,75,1]])

    it 'should correctly use the maxRange to set the color difference', ->
      color = hx.color([50,50,50])
      colorRange = color.range(1,1,1)
      expect(colorRange.map((col) -> getCol(col))).toEqual([[0,0,0,1], [50,50,50,1], [100,100,100,1]])

    it 'should output in array format', ->
      color = hx.color([50,50,50])
      colorRange = color.range(null, null, null, 'array')
      expect(colorRange).toEqual([[25,25,25,1], [33,33,33,1], [42,42,42,1], [50,50,50,1], [58,58,58,1], [67,67,67,1], [75,75,75,1]])

    it 'should output in hex format', ->
      color = hx.color([50,50,50])
      colorRange = color.range(null, null, null, 'hex')
      expect(colorRange).toEqual(['#191919', '#212121', '#2a2a2a', '#323232', '#3a3a3a', '#434343', '#4b4b4b'])


# New function tests
  describe 'rgb', ->
    it 'should return the correct rgb values', ->
      expect(hx.color([255,200,50,0.7]).rgb()).toEqual([255,200,50,0.7])
      expect(hx.color().rgb()).toEqual([0, 0, 0, 1])

  describe 'hsl', ->
    it 'should return the correct hsl values', ->
      expect(hx.color([255,200,50,0.7]).hsl()).toEqual([44,100,60,0.7])
      expect(hx.color().hsl()).toEqual([0, 0, 0, 1])
