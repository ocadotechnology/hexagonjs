var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var Promise = require('bluebird') // For checking return types
var fs = Promise.promisifyAll(require('fs-extra'))
var path = require('path')
chai.use(chaiAsPromised)
chai.should()

var Builder = require('../main/builder')

describe('builder', function () {
  var builder
  beforeEach(function () {
    builder = new Builder
  })

  it('should initialise with the correct variables and prototypes', function () {
    Object.keys(builder).length.should.equal(3)
    Object.keys(builder.__proto__).length.should.equal(6)
    builder._assetFiles.should.be.an('object')
    builder._themeResources.should.be.an('array')
    builder._moduleDirectories.should.be.an('array')
  })

  describe('theme', function () {
    it('should add additional resources', function () {
      var file = 'file1'
      builder._themeResources.length.should.equal(0)
      builder = builder.theme(file)
      builder._themeResources.length.should.equal(1)
      builder._themeResources[0].should.eql({ type: 'theme', theme: file })
    })
    it('should add additional resources after existing resources', function () {
      var file1 = 'file1'
      var file2 = 'file2'
      builder._themeResources.length.should.equal(0)
      builder = builder.theme(file1)
      builder._themeResources.length.should.equal(1)
      builder._themeResources[0].should.eql({ type: 'theme', theme: file1 })
      builder = builder.theme(file2)
      builder._themeResources.length.should.equal(2)
      builder._themeResources[1].should.eql({ type: 'theme', theme: file2 })
    })
  })

  describe('flatten', function () {
    it('should add the "flatten" object', function () {
      var file = 'file1'
      builder._themeResources.length.should.equal(0)
      builder = builder.flatten()
      builder._themeResources.length.should.equal(1)
      builder._themeResources[0].should.eql({ type: 'flatten' })
    })

    it('should add the "flatten" object after existing resources', function () {
      var file = 'file1'
      builder._themeResources.length.should.equal(0)
      builder = builder.theme(file)
      builder._themeResources.length.should.equal(1)
      builder._themeResources[0].should.eql({ type: 'theme', theme: file })
      builder = builder.flatten()
      builder._themeResources.length.should.equal(2)
      builder._themeResources[1].should.eql({ type: 'flatten' })
    })
  })

  describe('assets', function () {
    it('should add additional assets', function () {
      var asset = {'asset1': {}}
      Object.keys(builder._assetFiles).length.should.equal(0)
      builder = builder.assets(asset)
      Object.keys(builder._assetFiles).length.should.equal(1)
      builder._assetFiles.should.eql(asset)
    })
    it('should overwrite existing assets', function () {
      var asset1 = {'asset1': 'string1'}
      var asset2 = {'asset1': 'string2', 'asset2': 'string1'}
      Object.keys(builder._assetFiles).length.should.equal(0)
      builder = builder.assets(asset1)
      Object.keys(builder._assetFiles).length.should.equal(1)
      builder._assetFiles.should.eql(asset1)
      builder = builder.assets(asset2)
      Object.keys(builder._assetFiles).length.should.equal(2)
      builder._assetFiles.should.eql(asset2)
    })

    it('should add new assets and retain unchanged assets', function () {
      var asset1 = {'asset1': 'string1'}
      var asset2 = {'asset2': 'string2', 'asset3': 'string1'}

      Object.keys(builder._assetFiles).length.should.equal(0)
      builder = builder.assets(asset1)
      Object.keys(builder._assetFiles).length.should.equal(1)
      builder._assetFiles.should.eql(asset1)
      builder = builder.assets(asset2)
      Object.keys(builder._assetFiles).length.should.equal(3)
      builder._assetFiles.should.eql({
        'asset1': 'string1',
        'asset2': 'string2',
        'asset3': 'string1'
      })
    })

    it('should reset and remove existing assets', function () {
      var asset1 = {'asset1': 'string1'}
      var asset2 = {'asset2': 'string2', 'asset3': 'string1'}
      Object.keys(builder._assetFiles).length.should.equal(0)
      builder = builder.assets(asset1)
      Object.keys(builder._assetFiles).length.should.equal(1)
      builder._assetFiles.should.eql(asset1)
      builder = builder.assets(asset2, true)
      Object.keys(builder._assetFiles).length.should.equal(2)
      builder._assetFiles.should.eql(asset2)
    })

  })

  describe('moduleDirectory', function () {
    it('should add additional directories', function () {
      var directory = 'directory1'
      builder._moduleDirectories.length.should.equal(0)
      builder = builder.moduleDirectory(directory)
      builder._moduleDirectories.length.should.equal(1)
      builder._moduleDirectories[0].should.eql(directory)
    })
    it('should add additional directories after existing directories', function () {
      var directory1 = 'directory1'
      var directory2 = 'directory2'
      builder._moduleDirectories.length.should.equal(0)
      builder = builder.moduleDirectory(directory1)
      builder._moduleDirectories.length.should.equal(1)
      builder._moduleDirectories[0].should.eql(directory1)
      builder = builder.moduleDirectory(directory2)
      builder._moduleDirectories.length.should.equal(2)
      builder._moduleDirectories[1].should.eql(directory2)
    })
  })

  describe('build', function () {})

  describe('watch', function () {})

})

describe('resolveTheme', function () {})

describe('exportAssets', function () {
  var exportAssets = Builder.exportAssets
  var testStart = path.join(__dirname, 'builder-export-assets')
  var testDest = path.join(__dirname, '..', '..', 'target', 'test-build')

  it('should return a promise', function () {
    var builder = new Builder()
    ;(exportAssets(builder, {embedAssets: false, dest: 'anywhere'}) instanceof Promise).should.equal(true)
  })

  it('should export all assets when "embedAssets" is false', function (done) {
    var builder = new Builder
    builder = builder.assets({
      'file1': {
        filepath: path.join(testStart, 'file.txt')
      }
    })

    var dest = path.join(testDest, 'builder-export-assets', 'test-1')
    exportAssets(builder, {embedAssets: false, dest: dest})
      .then(function () {
        return fs.accessAsync(path.join(dest, 'file1'), fs.F_OK)
          .then(function () { return true })
          .catch(function () { return false })
      })
      .then(function (exists) {
        exists.should.equal(true)
        done()
      })
  })

  it('should only export assets when "allowEmbed" is true', function (done) {
    var builder = new Builder
    builder = builder.assets({
      'file1': {
        filepath: path.join(testStart, 'file.txt'),
        allowEmbed: true
      },
      'file2': {
        filepath: path.join(testStart, 'file.txt')
      }
    })

    var dest = path.join(testDest, 'builder-export-assets', 'test-2')
    exportAssets(builder, {embedAssets: true, dest: dest})
      .then(function () {
        return fs.accessAsync(path.join(dest, 'file1'), fs.F_OK)
          .then(function () { return true })
          .catch(function () { return false })
          .then(function (exists1) {
            return fs.accessAsync(path.join(dest, 'file2'), fs.F_OK)
              .then(function () { return { exists1: exists1, exists2: true }})
              .catch(function () { return { exists1: exists1, exists2: false }})
          })
      })
      .then(function (exists) {
        exists.should.eql({
          exists1: false,
          exists2: true
        })
        done()
      })
  })
})

describe('getModuleList', function () {
  var testModuleDir1 = path.join(__dirname, 'builder-get-module-list', 'builder-module-test-1')
  var testModuleDir2 = path.join(__dirname, 'builder-get-module-list', 'builder-module-test-2')
  var testModuleDir3 = path.join(__dirname, 'builder-get-module-list', 'builder-module-test-3')
  var getModuleList = Builder.getModuleList

  it('should return a promise', function () {
    (getModuleList([]) instanceof Promise).should.equal(true)
  })

  it('should get the default module list when no custom directories are provided', function (done) {
    getModuleList([])
      .then(function (allModules) {
        Object.keys(allModules).should.have.length.of.at.least(72)
        done()
      })
  })

  it('should map all the keys to their relevant directory', function (done) {
    var expectedRootDir = path.join(__dirname, '..', '..', 'modules')
    getModuleList([])
      .then(function (allModules) {
        for (key in allModules) {
          allModules[key].should.eql({
            name: key,
            directory: path.join(expectedRootDir, key)
          })
        }
        done()
      })
  })

  it('should deal with a single directory', function (done) {
    var expectedRootDir = path.join(__dirname, '..', '..', 'modules')
    getModuleList([testModuleDir1])
      .then(function (allModules) {
        for (key in allModules) {
          if (key === 'module1' || key === 'module2') {
            allModules[key].should.eql({
              name: key,
              directory: path.join(testModuleDir1, key)
            })
          } else {
            allModules[key].should.eql({
              name: key,
              directory: path.join(expectedRootDir, key)
            })
          }

        }
        done()
      })
  })

  it('should override hexagon modules if they exist in the test folder', function (done) {
    var expectedRootDir = path.join(__dirname, '..', '..', 'modules')
    getModuleList([testModuleDir2])
      .then(function (allModules) {
        for (key in allModules) {
          if (key === 'base') {
            allModules[key].should.eql({
              name: key,
              directory: path.join(testModuleDir2, key)
            })
          } else {
            allModules[key].should.eql({
              name: key,
              directory: path.join(expectedRootDir, key)
            })
          }

        }
        done()
      })
  })

  it('should override any modules if they exist in previously included folders', function (done) {
    var expectedRootDir = path.join(__dirname, '..', '..', 'modules')
    getModuleList([testModuleDir1, testModuleDir3])
      .then(function (allModules) {
        for (key in allModules) {
          if (key === 'module1' || key === 'module3' || key === 'module4') {
            allModules[key].should.eql({
              name: key,
              directory: path.join(testModuleDir3, key)
            })
          } else if (key === 'module2') {
            allModules[key].should.eql({
              name: key,
              directory: path.join(testModuleDir1, key)
            })
          } else {
            allModules[key].should.eql({
              name: key,
              directory: path.join(expectedRootDir, key)
            })
          }
        }
        done()
      })
  })
})

describe('replaceAssets', function () {
  var replaceAssets = Builder.replaceAssets
  var data = 'a string with \'filename1.file\' in it and a "filename2.file" filename3.file'
  var asset1 = {
    filename: 'filename1.file',
    file: 'something'
  }
  var asset2 = {
    filename: 'filename2.file',
    file: 'something else'
  }
  var asset3 = {
    filename: 'filename3.file',
    file: 'something else'
  }
  var asset4 = {
    filename: 'filename4.file',
    file: 'something else'
  }

  it('should return a promise', function () {
    (replaceAssets(data, []) instanceof Promise).should.equal(true)
  })

  it('should return the data if there are no assets passed in', function (done) {
    replaceAssets(data, [])
      .then(function (d) {
        d.should.equal(data)
        done()
      })
  })

  it('should replace assets found with single quotes', function (done) {
    replaceAssets(data, [asset1])
      .then(function (d) {
        d.should.equal('a string with something in it and a "filename2.file" filename3.file')
        done()
      })
  })

  it('should replace assets found with double quotes', function (done) {
    replaceAssets(data, [asset2])
      .then(function (d) {
        d.should.equal("a string with 'filename1.file' in it and a something else filename3.file")
        done()
      })
  })

  it('should replace multiple assets', function (done) {
    replaceAssets(data, [asset1, asset2])
      .then(function (d) {
        d.should.equal('a string with something in it and a something else filename3.file')
        done()
      })
  })

  it('should do nothing if an asset is not found in the data', function (done) {
    replaceAssets(data, [asset4])
      .then(function (d) {
        d.should.equal(data)
        done()
      })
  })

  it('should replace multiple assets and ignore assets that are not in the data', function (done) {
    replaceAssets(data, [asset1, asset2, asset3, asset4])
      .then(function (d) {
        d.should.equal('a string with something in it and a something else filename3.file')
        done()
      })
  })
})

describe('outputFile', function () {})
describe('getEmbeddableAssets', function () {})
describe('manipulateBuildAndWrite', function () {})

describe('mergeAssets', function () {
  var obj1 = {
    key1: false,
    key2: true,
    key3: 'string'
  }
  var obj2 = {
    key4: false,
    key5: true,
    key6: 'string'
  }
  var obj3 = {
    key1: true,
    key4: true,
    key2: 'string'
  }
  mergeAssets = Builder.mergeAssets

  it('should merge two assets into one object', function () {
    mergeAssets(obj1, obj2).should.eql({
      key1: false,
      key2: true,
      key3: 'string',
      key4: false,
      key5: true,
      key6: 'string'
    })
  })
  it('should merge and overwrite assets', function () {
    mergeAssets(obj1, obj3).should.eql({
      key1: true,
      key2: 'string',
      key3: 'string',
      key4: true
    })
  })
  it('should return a new object with keys if the right object is undefined', function () {
    var obj = mergeAssets(obj1, undefined)
    obj.should.not.equal(obj1)
    obj.should.eql(obj1)
  })
  it('should return a new object with keys if the left object is undefined', function () {
    var obj = mergeAssets(undefined, obj1)
    obj.should.not.equal(obj1)
    obj.should.eql(obj1)
  })

})
