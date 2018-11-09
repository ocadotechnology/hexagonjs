describe 'Request API', ->
  defaultCb = chai.spy()

  xhr = undefined
  requests = undefined

  beforeEach ->
    xhr = sinon.useFakeXMLHttpRequest()
    requests = []
    xhr.onCreate = (req) -> requests.push(req)
    XMLHttpRequest.prototype.overrideMimeType = (mimeType) ->
      this["Content-Type"] = mimeType

  afterEach ->
    xhr.restore()

  describe 'hx.request', ->
    it 'should use GET by default as the request type when no data is provided', ->
      hx.request 'test.file', defaultCb

      requests.length.should.equal(1)
      requests[0].url.should.equal('test.file')
      requests[0].method.should.equal('GET')

    it 'should use POST by default as the request type when data is provided', ->
      hx.request 'test.file', {some: 'data'}, defaultCb

      requests.length.should.equal(1)
      requests[0].method.should.equal('POST')
      requests[0].url.should.equal('test.file')
      requests[0].requestBody.should.equal(JSON.stringify {some: 'data'})

    it 'should correctly set the requestType', ->
      options =
        requestType: 'PUT'

      hx.request 'test.file', defaultCb, options

      requests.length.should.equal(1)
      requests[0].url.should.equal('test.file')
      requests[0].method.should.equal('PUT')

    it 'should correctly set the content type', ->
      options =
        contentType: 'some/type'

      hx.request 'test.file', defaultCb, options

      requests.length.should.equal(1)
      requests[0].url.should.equal('test.file')
      requests[0].requestHeaders['Content-Type'].should.equal('some/type;charset=utf-8')

    it 'should correctly set the response type', ->
      options =
        responseType: 'some/type'

      hx.request 'test.file', defaultCb, options

      requests.length.should.equal(1)
      requests[0].url.should.equal('test.file')
      requests[0].responseType.should.equal('some/type')

    it 'should allow headers to be explicitly set', ->
      options =
        contentType: 'application/json'
        headers:
          'Content-Type': 'something'
          'accept': 'everything'

      hx.request 'test.file', defaultCb, options

      requests.length.should.equal(1)
      requests[0].url.should.equal('test.file')
      requests[0].requestHeaders['Content-Type'].should.equal('something;charset=utf-8')
      requests[0].requestHeaders['accept'].should.equal('everything')

    it 'should allow custom headers to be set', ->
      options =
        headers:
          custom: 'some custom thing'

      hx.request 'test.file', defaultCb, options

      requests.length.should.equal(1)
      requests[0].url.should.equal('test.file')
      requests[0].requestHeaders['custom'].should.equal('some custom thing')

    it 'should thrown an error when an incorrect url is passed in', ->
      origError = console.error
      console.error = chai.spy()

      hx.request defaultCb
      console.error.should.have.been.called.with('Incorrect URL passed into hx.request: ', defaultCb)

      arr = []
      hx.request arr
      console.error.should.have.been.called.with('Incorrect URL passed into hx.request: ', arr)

    it 'should pass the correct data to the callback', ->
      cb = (error, result, source, index) ->
        should.not.exist(error)
        should.exist(result)
        result.responseText.should.equal('Some text')

      hx.request 'test.file', cb

      requests[0].respond(200, undefined, 'Some text')

    it 'should return the correct source when data is not provided', ->
      cb = (error, result, source, index) ->
        should.not.exist(error)
        should.exist(result)
        source.should.equal('test.file')

      hx.request 'test.file', cb
      requests[0].respond(200)

    it 'should return the correct source when data is provided', ->
      data = {some: 'data'}

      cb = (error, result, source, index) ->
        should.not.exist(error)
        should.exist(result)
        source.should.eql({url: 'test.file', data: data})

      hx.request 'test.file', data, cb
      requests[0].respond(200)

    it 'should deal with status 304 (cached response)', ->
      cb = (error, result, source, index) ->
        should.not.exist(error)
        should.exist(result)
        result.responseText.should.equal('Some text')

      hx.request 'test.file', cb

      requests[0].respond(304, undefined, 'Some text')

    it 'should return an error when an error status is returned', ->
      cb = (error, result, source, index) ->
        should.exist(error)
        should.not.exist(result)
        error.status.should.equal(404)

      hx.request 'test.file', cb

      requests[0].respond(404)


    it 'should format the response data correctly when one is passed in', ->
      cb = (error, result, source, index) ->
        should.not.exist(error)
        should.exist(result)
        result.should.eql({some: 'data'})

      opts =
        formatter: (r) -> JSON.parse r.responseText

      hx.request 'test.file', cb, opts

      requests[0].respond(200, undefined, '{"some":"data"}')


    it 'should return an error when there is an error with the formatter', ->
      cb = (error, result, source, index) ->
        should.exist(error.message)
        should.not.exist(result)
        source.should.equal('test.file')

      opts =
        formatter: (r) -> JSON.parse(r.responseText)

      hx.request 'test.file', cb, opts

      requests[0].respond(200, undefined, '[bob, steve, kate]')


    it 'should check the response if a response type is defined', ->
      cb = (error, result, source, index) ->
        should.not.exist(error)
        should.exist(result)
        requests[0].responseType.should.equal("arraybuffer")
        requests[0].response.should.be.instanceOf(ArrayBuffer)

      opts =
        responseType: "arraybuffer"

      hx.request 'test.file', cb, opts

      requests[0].respond(200, {"Content-Type": "application/octet-stream"}, '01010011 01101111 01101101 01100101 00100000 01110100 01100101 01111000 01110100')


    describe 'with url as an object', ->

      it 'should handle sending a request without data', ->
        url =
          url: 'test.file'
        hx.request url, defaultCb

        requests.length.should.equal(1)
        requests[0].url.should.equal('test.file')
        requests[0].method.should.equal('GET')

      it 'should handle sending a request with data in the arguments', ->
        url =
          url: 'test.file'

        data = {some: 'data'}
        hx.request url, data, defaultCb

        requests.length.should.equal(1)
        requests[0].url.should.equal('test.file')
        requests[0].method.should.equal('POST')
        requests[0].requestBody.should.equal(JSON.stringify data)

      it 'should handle sending a request with data in the object', ->
        data = {some: 'data'}
        url =
          url: 'test.file'
          data: data
        hx.request url, defaultCb

        requests.length.should.equal(1)
        requests[0].url.should.equal('test.file')
        requests[0].method.should.equal('POST')
        requests[0].requestBody.should.equal(JSON.stringify data)

      it 'should send the object data instead of the provided data', ->
        data = {some: 'data'}
        objectData = {some: 'other data'}
        url =
          url: 'test.file'
          data: objectData
        hx.request url, data, defaultCb

        requests.length.should.equal(1)
        requests[0].url.should.equal('test.file')
        requests[0].method.should.equal('POST')
        requests[0].requestBody.should.equal(JSON.stringify objectData)

      it 'should return the correct source in the response', ->
        cb1 = (error, result, source, index) ->
          should.not.exist(error)
          should.exist(result)
          source.should.equal('test.file')

        cb2 = (error, result, source, index) ->
          should.not.exist(error)
          should.exist(result)
          source.should.eql({url: 'test.file', data: data})

        cb3 = (error, result, source, index) ->
          should.not.exist(error)
          should.exist(result)
          source.should.eql({url: 'test.file', data: objData})

        cb4 = (error, result, source, index) ->
          should.not.exist(error)
          should.exist(result)
          source.should.eql({url: 'test.file', data: objData})

        data = {some: 'data'}
        objData = {some: 'other data'}

        url =
          url: 'test.file'
        hx.request url, cb1

        requests[0].respond(200)

        hx.request url, data, cb2

        requests[1].respond(200)

        url.data = objData

        hx.request url, cb3

        requests[2].respond(200)

        hx.request url, data, cb4

        requests[3].respond(200)


    describe 'with url as an array', ->

      it 'should handle sending a single request without data', ->
        url = ['test.file']

        hx.request url, defaultCb
        requests.length.should.equal(1)
        requests[0].url.should.equal('test.file')
        requests[0].method.should.equal('GET')

      it 'should handle sending a single request with data', ->
        url = ['test.file']
        data = {some: 'data'}

        hx.request url, data, defaultCb
        requests.length.should.equal(1)
        requests[0].url.should.equal('test.file')
        requests[0].method.should.equal('POST')
        requests[0].requestBody.should.equal(JSON.stringify data)

      it 'should handle sending multiple requests without data', ->
        url = ['test1.file', 'test2.file']

        hx.request url, defaultCb
        requests.length.should.equal(2)
        requests[0].url.should.equal('test1.file')
        requests[0].method.should.equal('GET')
        requests[1].url.should.equal('test2.file')
        requests[1].method.should.equal('GET')

      it 'should handle sending multiple requests with data', ->
        url = ['test1.file', 'test2.file']
        data = {some: 'data'}

        hx.request url, data, defaultCb

        requests.length.should.equal(2)
        requests[0].url.should.equal('test1.file')
        requests[0].method.should.equal('POST')
        requests[0].requestBody.should.equal(JSON.stringify data)

        requests[1].url.should.equal('test2.file')
        requests[1].method.should.equal('POST')
        requests[1].requestBody.should.equal(JSON.stringify data)

      it 'should handle sending multiple requests of different types', ->
        data = {some: 'data'}
        url = ['test1.file', {url: 'test2.file'}, {url: 'test3.file', data: data}]

        hx.request url, defaultCb

        requests.length.should.equal(3)
        requests[0].url.should.equal('test1.file')
        requests[0].method.should.equal('GET')
        should.not.exist(requests[0].requestBody)

        requests[1].url.should.equal('test2.file')
        requests[1].method.should.equal('GET')
        should.not.exist(requests[1].requestBody)

        requests[2].url.should.equal('test3.file')
        requests[2].method.should.equal('POST')
        requests[2].requestBody.should.equal(JSON.stringify data)

      it 'should return the correct source in all the responses', ->
        cb1 = (error, result, source, index) ->
          should.not.exist(error)
          should.exist(result)
          switch index
            when 0 then source.should.equal('test1.file')
            when 1 then source.should.equal('test2.file')
            else source.should.eql(['test1.file', 'test2.file'])

        cb2 = (error, result, source, index) ->
          should.not.exist(error)
          should.exist(result)
          switch index
            when 0 then source.should.eql({url: 'test1.file', data: data})
            when 1 then source.should.eql({url: 'test2.file', data: data})
            else source.should.eql([{url: 'test1.file', data: data}, {url: 'test2.file', data: data}])

        url = [
          'test1.file'
          'test2.file'
        ]

        hx.request url, cb1
        requests[0].respond(200)
        requests[1].respond(200)

        data = {some: 'data'}

        hx.request url, data, cb2
        requests[2].respond(200)
        requests[3].respond(200)

      it 'should call set the index based on the order the urls were called, not the order they return', ->
        cb = (error, result, source, index) ->
          should.not.exist(error)
          should.exist(result)
          if index isnt -1
            responses[index] = true
            source.should.equal(urls[index])
          else
            source.should.eql(urls)

        responses = {}

        urls = [
          'test1.file'
          'test2.file'
        ]

        hx.request urls, cb

        requests[1].respond(200)
        responses[1].should.equal(true)

        requests[0].respond(200)
        responses[0].should.equal(true)


      describe 'of objects', ->

        it 'should handle sending a single request without data', ->
          url = [{url: 'test.file'}]

          hx.request url, defaultCb
          requests.length.should.equal(1)
          requests[0].url.should.equal('test.file')
          requests[0].method.should.equal('GET')

        it 'should handle sending a single request with data', ->
          url = [{url: 'test.file'}]
          data = {some: 'data'}

          hx.request url, data, defaultCb
          requests.length.should.equal(1)
          requests[0].url.should.equal('test.file')
          requests[0].method.should.equal('POST')
          requests[0].requestBody.should.equal(JSON.stringify data)

        it 'should handle sending a single request with data in the object', ->
          data = {some: 'data'}
          url = [{url: 'test.file', data: data}]

          hx.request url, data, defaultCb
          requests.length.should.equal(1)
          requests[0].url.should.equal('test.file')
          requests[0].method.should.equal('POST')
          requests[0].requestBody.should.equal(JSON.stringify data)

        it 'should handle sending multiple requests without data', ->
          url = [{url: 'test1.file'}, {url: 'test2.file'}]

          hx.request url, defaultCb

          requests.length.should.equal(2)
          requests[0].url.should.equal('test1.file')
          requests[0].method.should.equal('GET')

          requests[1].url.should.equal('test2.file')
          requests[1].method.should.equal('GET')

        it 'should handle sending multiple requests with data', ->
          url = [{url: 'test1.file'}, {url: 'test2.file'}]
          data = {some: 'data'}
          hx.request url, data, defaultCb

          requests.length.should.equal(2)
          requests[0].url.should.equal('test1.file')
          requests[0].method.should.equal('POST')
          requests[0].requestBody.should.equal(JSON.stringify data)

          requests[1].url.should.equal('test2.file')
          requests[1].method.should.equal('POST')
          requests[1].requestBody.should.equal(JSON.stringify data)

        it 'should handle sending multiple requests with data in one of the objects', ->
          data = {some: 'data'}
          url = [{url: 'test1.file'}, {url: 'test2.file', data: data}]

          hx.request url, defaultCb

          requests.length.should.equal(2)
          requests[0].url.should.equal('test1.file')
          requests[0].method.should.equal('GET')
          should.not.exist(requests[0].requestBody)

          requests[1].url.should.equal('test2.file')
          requests[1].method.should.equal('POST')
          requests[1].requestBody.should.equal(JSON.stringify data)

        it 'should handle sending multiple requests with data and data in one of the objects', ->
          data = {some: 'data'}
          objectData = {some: 'other data'}
          url = [{url: 'test1.file'}, {url: 'test2.file', data: objectData}]

          hx.request url, data, defaultCb

          requests.length.should.equal(2)
          requests[0].url.should.equal('test1.file')
          requests[0].method.should.equal('POST')
          requests[0].requestBody.should.equal(JSON.stringify data)

          requests[1].url.should.equal('test2.file')
          requests[1].method.should.equal('POST')
          requests[1].requestBody.should.equal(JSON.stringify objectData)

        it 'should return the correct source in all the responses', ->
          cb1 = (error, result, source, index) ->
            should.not.exist(error)
            should.exist(result)
            switch index
              when 0 then source.should.equal('test1.file')
              when 1 then source.should.eql({url: 'test2.file', data: objData})
              else source.should.eql(['test1.file', {url: 'test2.file', data: objData}])

          cb2 = (error, result, source, index) ->
            should.not.exist(error)
            should.exist(result)
            switch index
              when 0 then source.should.eql({url: 'test1.file', data: data})
              when 1 then source.should.eql({url: 'test2.file', data: objData})
              else source.should.eql([{url: 'test1.file', data: data}, {url: 'test2.file', data: objData}])

          objData = {some: 'other data'}

          url = [
            {
              url: 'test1.file'
            }
            {
              url: 'test2.file'
              data: objData
            }
          ]

          hx.request url, cb1
          requests[0].respond(200)
          requests[1].respond(200)

          data = {some: 'data'}

          hx.request url, data, cb2
          requests[2].respond(200)
          requests[3].respond(200)


  describe 'hx.html', ->
    it 'should correctly set the mimeType to text/html', ->
      hx.html 'test.html', defaultCb

      requests[0].requestHeaders["Content-Type"].should.equal('text/html;charset=utf-8')
      requests[0].method.should.equal('GET')
      should.not.exist(requests[0].requestBody)

    it 'should format and return the correct data', ->
      test = '<div class="parent"><span class="child">bob</span></div>'

      cb = (error, result, source, index) ->
        should.not.exist(error)
        result.toString().should.equal('[object DocumentFragment]')
        result.childNodes.length.should.equal(1)
        result.childNodes[0].className.should.equal('parent')
        result.childNodes[0].childNodes[0].className.should.equal('child')

      hx.html 'test.html', cb

      requests[0].requestHeaders["Content-Type"].should.equal('text/html;charset=utf-8')
      requests[0].method.should.equal('GET')
      should.not.exist(requests[0].requestBody)

      requests[0].respond(200, undefined, test)


    it 'should pass the data through', ->
      data = {some: 'data'}
      hx.html 'test.html', data, defaultCb

      requests[0].requestBody.should.equal(JSON.stringify data)

  describe 'hx.text', ->
    it 'should correctly  set the mimeType to text/plain', ->
      hx.text 'test.txt', defaultCb

      requests[0].requestHeaders["Content-Type"].should.equal('text/plain;charset=utf-8')
      requests[0].method.should.equal('GET')
      should.not.exist(requests[0].requestBody)

    it 'should correctly format and return the correct data', (done) ->
      cb = (error, result) ->
        should.not.exist(error)
        result.should.equal('Test data')
        done()

      hx.text 'test.txt', cb

      requests[0].respond(200, undefined, 'Test data')


    it 'should pass the data through', ->
      data = {some: 'data'}
      hx.text 'test.txt', data, defaultCb
      requests[0].requestBody.should.equal(JSON.stringify data)

  describe 'hx.reshapedRequest', ->
    describe 'should format and return the correct data', ->
      it 'for json', (done) ->
        cb = (error, result, source, index) ->
          should.not.exist(error)
          result.should.eql({some: "data"})
          done()

        hx.reshapedRequest 'test.json', cb

        requests[0].method.should.equal('GET')
        requests[0].respond(200, {"Content-Type": "application/json"}, '{"some": "data"}')

      it 'even when there is a charset', (done) ->
        cb = (error, result, source, index) ->
          should.not.exist(error)
          result.should.eql({some: "data"})
          done()

        hx.reshapedRequest 'test.json', cb

        requests[0].method.should.equal('GET')
        requests[0].respond(200, {"Content-Type": 'application/json;charset=UTF-8'}, '{"some": "data"}')

      it 'for html', (done) ->
        cb = (error, result, source, index) ->
          should.not.exist(error)
          result.toString().should.equal('[object DocumentFragment]')
          result.childNodes.length.should.equal(1)
          result.childNodes[0].className.should.equal('parent')
          result.childNodes[0].childNodes[0].className.should.equal('child')
          done()

        hx.reshapedRequest 'test.html', cb

        requests[0].method.should.equal('GET')
        requests[0].respond(200, {"Content-Type": 'text/html'}, '<div class="parent"><span class="child">bob</span></div>')

    it 'should pass the data through', ->
      data = {some: 'data'}
      hx.json 'test.json', data, defaultCb
      requests[0].requestBody.should.equal(JSON.stringify data)

    it 'should log a warning when the content type defined is not text, json or plain', (done) ->
      origConsoleWarning = hx.consoleWarning
      hx.consoleWarning = chai.spy()
      cb = (error, result, source) ->
        should.not.exist(error)
        should.exist(result)
        hx.consoleWarning.should.have.been.called.with("Unknown parser for mime type application/octet-stream, carrying on anyway")
        done()

      hx.reshapedRequest 'test.bin', cb
      requests[0].method.should.equal('GET')
      requests[0].respond(200, {"Content-Type": 'application/octet-stream'}, '1011010010011101010010')

  describe 'hx.json', ->
    it 'should correctly set the mimeType to application/json', ->
      hx.json 'test.json', defaultCb

      requests[0].requestHeaders["Content-Type"].should.equal('application/json;charset=utf-8')
      requests[0].method.should.equal('GET')
      should.not.exist(requests[0].requestBody)

    it 'should format and return the correct data', (done) ->
      cb = (error, result, source, index) ->
        should.not.exist(error)
        result.should.eql({some: "data"})
        done()

      hx.json 'test.json', cb

      requests[0].requestHeaders["Content-Type"].should.equal('application/json;charset=utf-8')
      requests[0].method.should.equal('GET')
      should.not.exist(requests[0].requestBody)
      requests[0].respond(200, undefined, '{"some": "data"}')


    it 'should pass the data through', ->
      data = {some: 'data'}
      hx.json 'test.json', data, defaultCb

      requests[0].requestBody.should.equal(JSON.stringify data)

    it 'should handle undefined as the response', (done) ->
      cb = (error, result, source) ->
        should.not.exist(error)
        should.not.exist(result)
        done()

      hx.json 'test.json', cb
      requests[0].respond(200, undefined, undefined)
