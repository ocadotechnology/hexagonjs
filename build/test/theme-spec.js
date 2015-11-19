
var chai = require("chai")
var chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
chai.should()

var theme = require('../main/theme')

describe('theme', function () {
  describe('merge', function () {
    it('should overwrite the name', function () {
      var theme1 = {
        name: 'theme-1'
      }
      var theme2 = {
        name: 'theme-2'
      }
      theme.merge(theme1, theme2).name.should.equal('theme-2')
    })

    it('should overwrite variables, and leave existing ones intact', function () {
      var theme1 = {
        variables: {
          var1: 1,
          var2: 2
        }
      }
      var theme2 = {
        variables: {
          var1: 4,
          var3: 2
        }
      }
      theme.merge(theme1, theme2).variables.should.eql({
        var1: 4,
        var2: 2,
        var3: 2
      })
    })

    it('should accumulate the extra css and js', function () {
      var theme1 = {
        extra: {
          css: "css1",
          js: "js1"
        }
      }
      var theme2 = {
        extra: {
          css: "css2",
          js: "js2"
        }
      }
      theme.merge(theme1, theme2).extra.should.eql({
        css: "css1\ncss2",
        js: "js1\njs2"
      })
    })

    it('should handle an empty extra object for the first theme', function () {
      var theme1 = {
        extra: {}
      }
      var theme2 = {
        extra: {
          css: "css2",
          js: "js2"
        }
      }
      theme.merge(theme1, theme2).extra.should.eql({
        css: "css2",
        js: "js2"
      })
    })

    it('should handle an a missing extra object for the first theme', function () {
      var theme1 = {}
      var theme2 = {
        extra: {
          css: "css2",
          js: "js2"
        }
      }
      theme.merge(theme1, theme2).extra.should.eql({
        css: "css2",
        js: "js2"
      })
    })

    it('should handle an empty extra object for the second theme', function () {
      var theme1 = {
        extra: {
          css: "css1",
          js: "js1"
        }
      }
      var theme2 = {
        extra: {}
      }
      theme.merge(theme1, theme2).extra.should.eql({
        css: "css1",
        js: "js1"
      })
    })

    it('should handle a missing extra object for the second theme', function () {
      var theme1 = {
        extra: {
          css: "css1",
          js: "js1"
        }
      }
      var theme2 = {}
      theme.merge(theme1, theme2).extra.should.eql({
        css: "css1",
        js: "js1"
      })
    })

    it('should reset the extra js when resetJs = true', function () {
      var theme1 = {
        extra: {
          css: "css1",
          js: "js1"
        }
      }
      var theme2 = {
        extra: {
          resetJs: true,
          css: "css2",
          js: "js2"
        }
      }
      theme.merge(theme1, theme2).extra.should.eql({
        css: "css1\ncss2",
        js: "js2"
      })
    })

    it('should reset the extra css when resetCss = true', function () {
      var theme1 = {
        extra: {
          css: "css1",
          js: "js1"
        }
      }
      var theme2 = {
        extra: {
          resetCss: true,
          css: "css2",
          js: "js2"
        }
      }
      theme.merge(theme1, theme2).extra.should.eql({
        css: "css2",
        js: "js1\njs2"
      })
    })
  })

  describe('mergeModules', function () {
    it('should accumulate the extra section correctly', function () {
      var module1 = {
        extra: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        extra: {
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css1\ncss2",
        scss: "scss1\nscss2",
        themeCss: "themeCss1\nthemeCss2",
        themeScss: "themeScss1\nthemeScss2"
      })
    })

    it('should handle empty extra object in the first module', function () {
      var module1 = {
        extra: {}
      }
      var module2 = {
        extra: {
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css2",
        scss: "scss2",
        themeCss: "themeCss2",
        themeScss: "themeScss2"
      })
    })

    it('should handle a missing extra object in the first module', function () {
      var module1 = {}
      var module2 = {
        extra: {
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css2",
        scss: "scss2",
        themeCss: "themeCss2",
        themeScss: "themeScss2"
      })
    })

    it('should handle an empty extra object in the second module', function () {
      var module1 = {
        extra: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        extra: {}
      }
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css1",
        scss: "scss1",
        themeCss: "themeCss1",
        themeScss: "themeScss1"
      })
    })

    it('should handle a missing extra object in the second module', function () {
      var module1 = {
        extra: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {}
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css1",
        scss: "scss1",
        themeCss: "themeCss1",
        themeScss: "themeScss1"
      })
    })

    it('should reset the extra css correctly when resetCss = true', function () {
      var module1 = {
        extra: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        extra: {
          resetCss: true,
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css2",
        scss: "scss1\nscss2",
        themeCss: "themeCss1\nthemeCss2",
        themeScss: "themeScss1\nthemeScss2"
      })
    })

    it('should reset the extra scss when resetScss = true', function () {
      var module1 = {
        extra: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        extra: {
          resetScss: true,
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css1\ncss2",
        scss: "scss2",
        themeCss: "themeCss1\nthemeCss2",
        themeScss: "themeScss1\nthemeScss2"
      })
    })

    it('should reset the extra theme css when resetThemeCss = true', function () {
      var module1 = {
        extra: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        extra: {
          resetThemeCss: true,
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css1\ncss2",
        scss: "scss1\nscss2",
        themeCss: "themeCss2",
        themeScss: "themeScss1\nthemeScss2"
      })
    })

    it('should reset the extra theme scss when resetThemeScss = true', function () {
      var module1 = {
        extra: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        extra: {
          resetThemeScss: true,
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).extra.should.eql({
        css: "css1\ncss2",
        scss: "scss1\nscss2",
        themeCss: "themeCss1\nthemeCss2",
        themeScss: "themeScss2"
      })
    })


    it('should merge overrides', function () {
      var module1 = {
        overrides: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        overrides: {
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).overrides.should.eql({
        css: "css2",
        scss: "scss2",
        themeCss: "themeCss2",
        themeScss: "themeScss2"
      })
    })

    it('should keep the overrides the same if nothing has changed', function () {
      var module1 = {
        overrides: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        overrides: {}
      }
      theme.mergeModules(module1, module2).overrides.should.eql({
        css: "css1",
        scss: "scss1",
        themeCss: "themeCss1",
        themeScss: "themeScss1"
      })
    })

    it('should handle missing overrides object in the first module', function () {
      var module1 = {
        overrides: {}
      }
      var module2 = {
        overrides: {
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).overrides.should.eql({
        css: "css2",
        scss: "scss2",
        themeCss: "themeCss2",
        themeScss: "themeScss2"
      })
    })

    it('should handle missing overrides object in the first module', function () {
      var module1 = {}
      var module2 = {
        overrides: {
          css: "css2",
          scss: "scss2",
          themeCss: "themeCss2",
          themeScss: "themeScss2"
        }
      }
      theme.mergeModules(module1, module2).overrides.should.eql({
        css: "css2",
        scss: "scss2",
        themeCss: "themeCss2",
        themeScss: "themeScss2"
      })
    })



    it('should handle an empty overrides object in the second module', function () {
      var module1 = {
        overrides: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {
        overrides: {}
      }
      theme.mergeModules(module1, module2).overrides.should.eql({
        css: "css1",
        scss: "scss1",
        themeCss: "themeCss1",
        themeScss: "themeScss1"
      })
    })

    it('should handle missing overrides object in the second module', function () {
      var module1 = {
        overrides: {
          css: "css1",
          scss: "scss1",
          themeCss: "themeCss1",
          themeScss: "themeScss1"
        }
      }
      var module2 = {}
      theme.mergeModules(module1, module2).overrides.should.eql({
        css: "css1",
        scss: "scss1",
        themeCss: "themeCss1",
        themeScss: "themeScss1"
      })
    })


    it('should merge variables', function() {
      var module1 = {
        variables: {
          var1: 1,
          var2: 2
        }
      }
      var module2 = {
        variables: {
          var2: 99,
          var3: 3
        }
      }
      theme.mergeModules(module1, module2).variables.should.eql({
        var1: 1,
        var2: 99,
        var3: 3,
      })
    })

    it('should should be fine with an empty variables object in the first module', function() {
      var module1 = {
        variables: {}
      }
      var module2 = {
        variables: {
          var2: 99,
          var3: 3
        }
      }
      theme.mergeModules(module1, module2).variables.should.eql({
        var2: 99,
        var3: 3,
      })
    })

    it('should should be fine with a missing variables object in the first module', function() {
      var module1 = {
        variables: {}
      }
      var module2 = {
        variables: {
          var2: 99,
          var3: 3
        }
      }
      theme.mergeModules(module1, module2).variables.should.eql({
        var2: 99,
        var3: 3,
      })
    })

    it('should be fine with an empty variables object in the second module', function() {
      var module1 = {
        variables: {
          var1: 1,
          var2: 2
        }
      }
      var module2 = {
        variables: {
        }
      }
      theme.mergeModules(module1, module2).variables.should.eql({
        var1: 1,
        var2: 2
      })
    })

    it('should be fine with a missing variables object in the second module', function() {
      var module1 = {
        variables: {
          var1: 1,
          var2: 2
        }
      }
      var module2 = {}
      theme.mergeModules(module1, module2).variables.should.eql({
        var1: 1,
        var2: 2
      })
    })


    it('should merge properly: test everything in one go', function () {
      var theme1 = {
        name: 'theme-1',
        variables: {
          var1: 1,
          var2: 2
        },
        modules: {
          a: {
            overrides: {
              css: "css1",
              scss: "scss1",
              themeCss: "themeCss1",
              themeScss: "themeScss1"
            },
            extra: {
              css: "css1",
              scss: "scss1",
              themeCss: "themeCss1",
              themeScss: "themeScss1"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          },
          b: {
            overrides: {
              css: "css2",
              scss: "scss2",
              themeCss: "themeCss2",
              themeScss: "themeScss2"
            },
            extra: {
              css: "css2",
              scss: "scss2",
              themeCss: "themeCss2",
              themeScss: "themeScss2"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          },
        }
      }
      var theme2 = {
        name: 'theme-2',
        extra: {
          css: 'css'
        },
        variables: {
          var1: 4,
          var3: 2
        },
        modules: {
          b: {
            overrides: {
              scss: "scss99",
              themeScss: "themeScss99"
            },
            extra: {
              css: "css99",
              scss: "scss99",
            },
            variables: {
              var2: 99,
              var3: 3
            }
          },
          c: {
            overrides: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            extra: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          }
        }
      }
      theme.merge(theme1, theme2).should.eql({
        name: 'theme-2',
        extra: {
          css: 'css'
        },
        variables: {
          var1: 4,
          var2: 2,
          var3: 2
        },
        modules: {
          a: {
            overrides: {
              css: "css1",
              scss: "scss1",
              themeCss: "themeCss1",
              themeScss: "themeScss1"
            },
            extra: {
              css: "css1",
              scss: "scss1",
              themeCss: "themeCss1",
              themeScss: "themeScss1"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          },
          b: {
            overrides: {
              css: "css2",
              scss: "scss99",
              themeCss: "themeCss2",
              themeScss: "themeScss99"
            },
            extra: {
              css: "css2\ncss99",
              scss: "scss2\nscss99",
              themeCss: "themeCss2",
              themeScss: "themeScss2"
            },
            variables: {
              var1: 1,
              var2: 99,
              var3: 3,
            }
          },
          c: {
            overrides: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            extra: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          }
        }
      })
    })


    it('should merge fine coming from an empty object', function () {
      var thm = {
        name: 'theme',
        extra: {
          css: 'css'
        },
        variables: {
          var1: 4,
          var3: 2
        },
        modules: {
          b: {
            overrides: {
              scss: "scss99",
              themeScss: "themeScss99"
            },
            extra: {
              css: "css99",
              scss: "scss99",
            },
            variables: {
              var2: 99,
              var3: 3
            }
          },
          c: {
            overrides: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            extra: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          }
        }
      }

      theme.merge({}, thm).should.eql({
        name: 'theme',
        extra: {
          css: 'css'
        },
        variables: {
          var1: 4,
          var3: 2
        },
        modules: {
          b: {
            overrides: {
              scss: "scss99",
              themeScss: "themeScss99"
            },
            extra: {
              css: "css99",
              scss: "scss99",
            },
            variables: {
              var2: 99,
              var3: 3
            }
          },
          c: {
            overrides: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            extra: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          }
        }
      })
    })
    it('should merge fine with an empty object', function () {
      var thm = {
        name: 'theme',
        extra: {
          css: 'css'
        },
        variables: {
          var1: 4,
          var3: 2
        },
        modules: {
          b: {
            overrides: {
              scss: "scss99",
              themeScss: "themeScss99"
            },
            extra: {
              css: "css99",
              scss: "scss99",
            },
            variables: {
              var2: 99,
              var3: 3
            }
          },
          c: {
            overrides: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            extra: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          }
        }
      }

      theme.merge(thm, {}).should.eql({
        name: 'theme',
        extra: {
          css: 'css'
        },
        variables: {
          var1: 4,
          var3: 2
        },
        modules: {
          b: {
            overrides: {
              scss: "scss99",
              themeScss: "themeScss99"
            },
            extra: {
              css: "css99",
              scss: "scss99",
            },
            variables: {
              var2: 99,
              var3: 3
            }
          },
          c: {
            overrides: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            extra: {
              css: "css3",
              scss: "scss3",
              themeCss: "themeCss3",
              themeScss: "themeScss3"
            },
            variables: {
              var1: 1,
              var2: 2
            }
          }
        }
      })
    })
  })

  describe('flatten', function () {
    it('should keep the same name', function () {
      var thm = {
        name: 'name',
        variables: {
          var1: 'lemon',
          var2: 'kiwi',
          var3: 'pineapple'
        }
      }
      theme.flatten(thm).name.should.equal('name')
    })

    it('should keep the extra object', function () {
      var thm = {
        name: 'name',
        extra: {
          css: 'stuff'
        },
        variables: {
          var1: 'lemon',
          var2: 'kiwi',
          var3: 'pineapple'
        }
      }
      theme.flatten(thm).extra.should.eql({
        css: 'stuff'
      })
    })

    it('should end up with no variables in the global variables list', function () {
      var thm = {
        name: 'name',
        variables: {
          var1: 'lemon',
          var2: 'kiwi',
          var3: 'pineapple'
        }
      }
      Object.keys(theme.flatten(thm).variables).should.be.empty
    })

    it('should apply the variables that exist', function () {
      var thm = {
        name: 'name',
        variables: {
          var1: 'lemon',
          var2: 'kiwi',
          var3: 'pineapple'
        },
        modules: {
          a: {
            variables: {
              var1: '$var2'
            }
          },
          b: {
            variables: {
              var3: '$var5'
            }
          },
          c: {
            variables: {
              var2: '$var1'
            }
          }
        }
      }
      theme.flatten(thm).modules.should.eql({
        a: {
          extra: {},
          overrides: {},
          variables: {
            var1: 'kiwi'
          }
        },
        b: {
          extra: {},
          overrides: {},
          variables: {
            var3: '$var5'
          }
        },
        c: {
          extra: {},
          overrides: {},
          variables: {
            var2: 'lemon'
          }
        }
      })
    })
  })

  describe('formats.quantum', function () {
    it('toJson', function () {

      var src = [
        "@theme my-theme",
        "  @variables",
        "    @var1: rgba(5, 6, 7, 0.5)",
        "  @extra",
        "    @js: Some JavaScript",
        "    @css: Some CSS",
        "    @resetJs true",
        "    @resetCss false",
        "  @modules",
        "    @a",
        "      @extra",
        "        @css: Some CSS",
        "        @scss: Some SCSS",
        "        @themeCss: Some Theme CSS",
        "        @themeScss: Some Theme SCSS",
        "        @resetCss true",
        "        @resetScss false",
        "        @resetThemeCss true",
        "        @resetThemeScss false",
        "      @overrides",
        "        @css: Some CSS",
        "        @scss: Some SCSS",
        "        @themeCss: Some Theme CSS",
        "        @themeScss: Some Theme SCSS",
        "      @variables",
        "        @var2: red"
      ].join('\n')

      theme.formats.quantum.toJson(src).should.eql({
        name: 'my-theme',
        variables: {
          var1: 'rgba(5, 6, 7, 0.5)'
        },
        extra: {
          js: 'Some JavaScript',
          css: 'Some CSS',
          resetJs: true,
          resetCss: false
        },
        modules: {
          a: {
            extra: {
              css: 'Some CSS',
              scss: 'Some SCSS',
              themeCss: 'Some Theme CSS',
              themeScss: 'Some Theme SCSS',
              resetCss: true,
              resetScss: false,
              resetThemeCss: true,
              resetThemeScss: false
            },
            overrides: {
              css: 'Some CSS',
              scss: 'Some SCSS',
              themeCss: 'Some Theme CSS',
              themeScss: 'Some Theme SCSS'
            },
            variables: {
              var2: 'red'
            }
          }
        }
      })
    })

    it('should handle missing extras and overrides subentites', function () {

      var src = [
        "@theme my-theme",
        "  @variables",
        "    @var1: rgba(5, 6, 7, 0.5)",
        "  @extra",
        "  @modules",
        "    @a",
        "      @extra",
        "      @overrides",
        "      @variables",
        "        @var2: red"
      ].join('\n')

      theme.formats.quantum.toJson(src).should.eql({
        name: 'my-theme',
        variables: {
          var1: 'rgba(5, 6, 7, 0.5)'
        },
        extra: {
          js: undefined,
          css: undefined,
          resetJs: false,
          resetCss: false
        },
        modules: {
          a: {
            extra: {
              css: undefined,
              scss: undefined,
              themeCss: undefined,
              themeScss: undefined,
              resetCss: false,
              resetScss: false,
              resetThemeCss: false,
              resetThemeScss: false
            },
            overrides: {
              css: undefined,
              scss: undefined,
              themeCss: undefined,
              themeScss: undefined
            },
            variables: {
              var2: 'red'
            }
          }
        }
      })
    })

    it('should handle missing extras and overrides entites', function () {

      var src = [
        "@theme my-theme",
        "  @modules",
        "    @a"
      ].join('\n')

      theme.formats.quantum.toJson(src).should.eql({
        name: 'my-theme',
        variables: {},
        extra: {},
        modules: {
          a: {
            extra: {},
            overrides: {},
            variables: {}
          }
        }
      })
    })
  })

})



