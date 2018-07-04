import chai from 'chai'
import { color, isColor, isColorString } from 'color'

const should = chai.should()

export default () =>
  describe('color', () => {
    describe('color', () => {
      it('should default to black when no arguments are passed in', () => {
        color().rgb().should.eql([0, 0, 0, 1])
      })

      it('should create an object from a string', () => {
        color('rgb(77,255,88)').rgb().should.eql([77, 255, 88, 1])
      })

      it('should create an object from an array', () => {
        color(55, 37, 199).rgb().should.eql([55, 37, 199, 1])
      })

      it('should create an object from 3 arguments', () => {
        color(10, 20, 35).rgb().should.eql([10, 20, 35, 1])
      })

      it('should create an object from 4 arguments', () => {
        color(55, 72, 99, 0.6).rgb().should.eql([55, 72, 99, 0.6])
      })

      it('set the color based on a hex string', () => {
        color('#7BBE31').rgb().should.eql([ 123, 190, 49, 1 ])
      })

      it('set the color based on a shortened hex string', () => {
        color('#ABC').rgb().should.eql([ 170, 187, 204, 1 ])
      })

      it('set the color based on an rgb string', () => {
        color('rgb(199,1,37)').rgb().should.eql([ 199, 1, 37, 1 ])
      })

      it('set the color based on an rgba string', () => {
        color('rgba(199,1,37, 0.7)').rgb().should.eql([ 199, 1, 37, 0.7 ])
      })

      it('set the color based on an hsl string', () => {
        color('hsl(50,100,10)').rgb().should.eql([ 51, 43, 0, 1 ])
      })

      it('set the color based on an hsla string', () => {
        color('hsla(50,100,10,0.7)').rgb().should.eql([ 51, 43, 0, 0.7 ])
      })

      it('should return undefined when an invalid color string is passed in ', () => {
        should.not.exist(color('#GGGGGG'))
      })

      it('should return undefined when an invalid color string is passed in ', () => {
        should.not.exist(color(123))
      })

      it('should return undefined when an invalid color string is passed in ', () => {
        should.not.exist(color({}))
      })

      it('should return undefined when an invalid color string is passed in ', () => {
        should.not.exist(color(() => {}))
      })

      it('should return undefined when an invalid color string is passed in ', () => {
        should.not.exist(color('not a string'))
      })

      it('should return undefined when an invalid color string is passed in ', () => {
        should.not.exist(color('hsl(aasd, 12, 12)'))
      })

      it('should return undefined when an invalid color string is passed in ', () => {
        should.not.exist(color('rgb(aasd, 12, 12)'))
      })

      it('should return a color when a valid color string is passed in ', () => {
        color('#FFFFFF').should.eql(color(255, 255, 255, 1))
      })

      it('should return a color when a valid color string is passed in (rgb)', () => {
        color('rgb(255, 255, 255)').should.eql(color(255, 255, 255, 1))
      })

      it('should return a color when a valid color string is passed in (rgba)', () => {
        color('rgba(255, 255, 255, 0.5)').should.eql(color(255, 255, 255, 0.5))
      })

      it('should return a color when a valid color string is passed in hsl', () => {
        color('hsl(50, 50, 50)').should.eql(color().hsl([50, 50, 50]))
      })

      it('should return  a color when a valid color string is passed in hsla', () => {
        color('hsl(50, 50, 50, 0.5)').should.eql(color().hsl([50, 50, 50]).alpha(0.5))
      })

      it('should return a color when a valid array is passed in', () => {
        color(0, 0, 0).should.eql(color().rgb([0, 0, 0]))
      })

      it('should clamp to valid values for arrays', () => {
        color(0, 0, 256).should.eql(color().rgb([0, 0, 255]))
      })
    })

    describe('hx.isColor', () => {
      it('should return true for a color instance', () => {
        isColor(color()).should.equal(true)
      })

      it('should return false for a color instance', () => {
        isColor({}).should.equal(false)
      })
    })

    describe('hx.isColorString', () => {
      it('should return false when an invalid color string is passed in ', () => {
        isColorString('#GGGGGG').should.equal(false)
      })

      it('should return false when an invalid color string is passed in ', () => {
        isColorString(123).should.equal(false)
      })

      it('should return false when an invalid color string is passed in ', () => {
        isColorString({}).should.equal(false)
      })

      it('should return false when an invalid color string is passed in ', () => {
        isColorString(() => {}).should.equal(false)
      })

      it('should return false when an invalid color string is passed in ', () => {
        isColorString('not a string').should.equal(false)
      })

      it('should return false when an invalid color string is passed in ', () => {
        isColorString('hsl(aasd, 12, 12)').should.equal(false)
      })

      it('should return false when an invalid color string is passed in ', () => {
        isColorString('rgb(aasd, 12, 12)').should.equal(false)
      })

      it('should return true when a valid color string is passed in ', () => {
        isColorString('#FFFFFF').should.equal(true)
      })

      it('should return true when a valid color string is passed in (rgb)', () => {
        isColorString('rgb(255, 255, 255)').should.equal(true)
      })

      it('should return true when a valid color string is passed in (rgba)', () => {
        isColorString('rgba(255, 255, 255, 0.5)').should.equal(true)
      })

      it('should return true when a valid color string is passed in hsl', () => {
        isColorString('hsl(50, 50, 50)').should.equal(true)
      })

      it('should return true when a valid color string is passed in hsla', () => {
        isColorString('hsl(50, 50, 50, 0.5)').should.equal(true)
      })
    })

    describe('Color::toString', () => {
      it('should return correct 6 character hex color by default', () => {
        color().toString().should.equal('#000000')
      })

      it('should return correct hex string of color', () => {
        color(123, 190, 49).toString().should.equal('#7bbe31')
      })

      it('should return the rgba css string of a color when no type is passed in', () => {
        color(240, 120, 10, 0.5).toString().should.equal('rgba(240,120,10,0.5)')
      })

      it('should return the rgb css string of a color', () => {
        color(240, 120, 10, 0.5).toString('rgb').should.equal('rgb(240,120,10)')
      })

      it('should return the rgba css string of a color', () => {
        color(240, 120, 10, 0.5).toString('rgba').should.equal('rgba(240,120,10,0.5)')
      })

      it('should return the hsl css string of a color', () => {
        color().hsl([10, 50, 50]).toString('hsl').should.equal('hsl(10,50%,50%)')
      })

      it('should return the hsla css string of a color', () => {
        color().hsl([10, 50, 50, 1]).toString('hsla').should.equal('hsla(10,50%,50%,1)')
      })
    })

    describe('Color::mix', () => {
      it('should return a 50/50 mix of two colors', () => {
        color(51, 204, 51).mix(color(245, 107, 196)).rgb().should.eql([148, 156, 124, 1])
      })

      it('should allow non-color objects', () => {
        color(51, 204, 51).mix([245, 107, 196]).rgb().should.eql([148, 156, 124, 1])
      })

      it('should return a 70/30 mix of two colors', () => {
        color(51, 204, 51).mix(color(245, 107, 196), 0.7).rgb().should.eql([187, 136, 153, 1])
      })
    })

    describe('Color::hue', () => {
      it('should set the hue value of a color', () => {
        color(226, 124, 29).hue(100).rgb().should.eql([95, 226, 29, 1])
      })

      it('the hue should not be changed if the color is grey', () => {
        color(120, 120, 120).hue(30).rgb().should.eql([120, 120, 120, 1])
      })
    })

    describe('Color::saturation', () => {
      it('should set the saturation value of a color', () => {
        color(226, 124, 29).saturation(10).rgb().should.eql([140, 127, 115, 1])
      })

      it('the saturation should not be changed if the saturation of the color is at 0 (color is grey)', () => {
        color(0, 0, 0).saturation(50).rgb().should.eql([0, 0, 0, 1])
      })
    })

    describe('Color::lightness', () => {
      it('should set and get the lightness value of a color', () => {
        color(0, 8, 26).lightness(88).lightness().should.equal(88)
      })

      it('should not set lightness above 100', () => {
        color(53, 29, 184, 0.5).lightness(300).lightness().should.equal(100)
      })

      it('should not set lightness below 0', () => {
        color(53, 29, 184, 0.5).lightness(-300).lightness().should.equal(0)
      })
    })

    describe('Color::alpha', () => {
      it('should set the opacity value for a color', () => {
        color(76, 62, 21, 0.1).alpha(0.93).rgb().should.eql([76, 62, 21, 0.93])
      })

      it('should not set alpha above 1', () => {
        color(53, 29, 184, 0.5).alpha(3).alpha().should.equal(1)
      })

      it('should not set alpha below 0', () => {
        color(53, 29, 184, 0.5).alpha(-3).alpha().should.equal(0)
      })
    })

    describe('Color::lighten', () => {
      it('should increase the lightness of a color', () => {
        color(0, 170, 255).lighten(0.2).rgb().should.eql([51, 187, 255, 1])
      })

      it('should reduce the lightness of a color', () => {
        color(255, 0, 200).lighten(-0.2).rgb().should.eql([204, 0, 160, 1])
      })
    })

    describe('Color::saturate', () => {
      it('increase saturation by a percentage of the colors saturation', () => {
        color(100, 64, 191).saturate(0.5).rgb().should.eql([86, 32, 223, 1])
      })

      it('decrease saturation by a percentage of the colors saturation', () => {
        color(38, 217, 95).saturate(-0.5).rgb().should.eql([83, 172, 111, 1])
      })
    })

    describe('Color::fade', () => {
      it('make a color more opaque', () => {
        color().alpha(0.5).fade(0.5).alpha().should.equal(0.75)
      })

      it('make a color more transparent', () => {
        color().alpha(0.5).fade(-0.5).alpha().should.equal(0.25)
      })

      it('should not set alpha above 1', () => {
        color(53, 29, 184, 0.5).fade(3).alpha().should.equal(1)
      })

      it('should not set alpha below 0', () => {
        color(53, 29, 184, 0.5).fade(-3).alpha().should.equal(0)
      })
    })

    describe('Color::rgb', () => {
      it('should set the color correctly', () => {
        color().rgb([255, 200, 50, 0.7]).rgb().should.eql([255, 200, 50, 0.7])
      })

      it('should return the correct rgb values', () => {
        color(255, 200, 50, 0.7).rgb().should.eql([255, 200, 50, 0.7])
      })

      it('should return the correct rgb values for the default color', () => {
        color().rgb().should.eql([0, 0, 0, 1])
      })

      it('should handle undefined things being passed in', () => {
        const col = color()
        col.rgb(undefined).should.eql(col)
      })
    })

    describe('Color::hsl', () => {
      it('should set the correct hsl values', () => {
        color().hsl([44, 100, 60, 0.7]).hsl().should.eql([44, 100, 60, 0.7])
      })

      it('should return the correct hsl values', () => {
        color(255, 200, 50, 0.7).hsl().should.eql([44, 100, 60, 0.7])
      })

      it('should return the correct hsl values for the default color', () => {
        color().hsl().should.eql([0, 0, 0, 1])
      })

      it('should handle undefined things being passed in', () => {
        const col = color()
        col.hsl(undefined).should.eql(col)
      })
    })

    describe('Color::textCol', () => {
      it('should return white for a dark color', () => {
        color('#3D3D3D').textCol().should.equal('white')
      })

      it('should return black for a light color', () => {
        color('#FAFAFA').textCol().should.equal('black')
      })
    })

    describe('Color::range', () => {
      it('should return the correct number of colors by default', () => {
        color([50, 50, 50]).range().length.should.equal(7)
      })

      it('should return the correct number of colors when numLight/numDark are set', () => {
        color([50, 50, 50]).range(2, 2).length.should.equal(5)
      })

      it('should correctly use the default color difference', () => {
        color([50, 50, 50]).range()
          .map(col => col.rgb())
          .should.eql([
            [25, 25, 25, 1],
            [33, 33, 33, 1],
            [42, 42, 42, 1],
            [50, 50, 50, 1],
            [58, 58, 58, 1],
            [67, 67, 67, 1],
            [75, 75, 75, 1]
          ])
      })

      it('should correctly use the maxRange to set the color difference', () => {
        color([50, 50, 50]).range(1, 1, 1)
          .map(col => col.rgb())
          .should.eql([[0, 0, 0, 1], [50, 50, 50, 1], [100, 100, 100, 1]])
      })

      it('should output in array format', () => {
        color([50, 50, 50]).range(undefined, undefined, undefined, 'array')
          .should.eql([
            [25, 25, 25, 1],
            [33, 33, 33, 1],
            [42, 42, 42, 1],
            [50, 50, 50, 1],
            [58, 58, 58, 1],
            [67, 67, 67, 1],
            [75, 75, 75, 1]
          ])
      })

      it('should output in hex format', () => {
        color([50, 50, 50]).range(undefined, undefined, undefined, 'hex')
          .should.eql([
            '#191919',
            '#212121',
            '#2a2a2a',
            '#323232',
            '#3a3a3a',
            '#434343',
            '#4b4b4b'
          ])
      })
    })
  })
