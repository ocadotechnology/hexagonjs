

var chai = require("chai")
var chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
chai.should()

var util = require('../main/util')
var path  = require('path')

describe('util', function () {
  describe('utils', function () {
    describe('doesExist', function () {
      it('should return true when a file exists', function () {
        return util.doesExist('package.json').should.eventually.equal(true)
      })

      it('should return false when a file doesnt exist', function () {
        return util.doesExist("alejandro's-todo-list.txt").should.eventually.equal(false)
      })
    })

    describe('moduleList', function () {

      it('should return an array of the right length', function () {
        return util.moduleList().should.eventually.have.length.of.at.least(72)
      })

      describe('should contain some known modules', function () {
        it('base', function(){
          return util.moduleList().should.eventually.contain('base')
        })
        it('selection', function(){
          return util.moduleList().should.eventually.contain('selection')
        })
        it('button', function(){
          return util.moduleList().should.eventually.contain('button')
        })
      })
    })

    describe('moduleDir', function () {
      it('should return module directory', function () {
        util.moduleDir('module-name').should.equal(path.join(__dirname, '../../modules/module-name'))
      })
    })

    describe('coffee', function () {
      it('should compile some coffeescript', function () {
        return util.coffee('a = (d) -> d * d').should.eventually.equal('var a;\n\na = function(d) {\n  return d * d;\n};\n')
      })
      it('should throw an error if the coffeescript is invalid', function () {
        return util.coffee('a = (d) <*- d * d').should.eventually.be.rejected
      })
    })

    describe('iife', function () {
      it('should wrap a function in an immediately invoked function expression', function () {
        util.iife('lemon').should.equal('(function(){\nlemon\n})();')
      })
    })

    describe('scss', function () {
      it('should compile some scss', function () {
        return util.scss('$v: red;\n.bob{\n  color: $v\n}').should.eventually.equal('.bob {\n  color: red; }\n')
      })
      it('should throw an error if the scss is invalid', function () {
        return util.scss('.bob{\n  color: $v\n}').should.eventually.be.rejected
      })
    })

    describe('convertSpinalToCamel', function () {
      it('should work', function () {
        return util.convertSpinalToCamel('it-should-work').should.equal('itShouldWork')
      })
      it('should return undefined when given undefined', function () {
        return chai.expect(util.convertSpinalToCamel(undefined)).to.equal(undefined)
      })
    })

    describe('convertSpinalKeysToCamel', function () {
      it('convertSpinalKeysToCamel should work', function () {
        return util.convertSpinalKeysToCamel({'it-should-work': 'value', 'it-should-work-2': 'value-2'}).should.eql({'itShouldWork' : 'value', 'itShouldWork2' : 'value-2'})
      })
    })

  })
})
