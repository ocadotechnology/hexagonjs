describe 'hx-request', ->
  defaultCb = -> null

  beforeEach ->
    jasmine.Ajax.install()

    # this might not be an issue
    #if navigator.userAgent.indexOf('Phantom') > -1
    #  # Mock ajax request is broken by mimeType function so we kill it here
    #  XMLHttpRequest.prototype.overrideMimeType = null

  afterEach ->
    jasmine.Ajax.uninstall()

  describe 'hx.request', ->
    it 'should use GET by default as the request type when no data is provided', ->
      hx.request 'test.file', defaultCb

      expect(jasmine.Ajax.requests.count()).toEqual(1)
      expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
      expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')

    it 'should use POST by default as the request type when data is provided', ->
      hx.request 'test.file', {some: 'data'}, defaultCb

      expect(jasmine.Ajax.requests.count()).toEqual(1)
      expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
      expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
      expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify {some: 'data'})

    it 'should correctly set the requestType', ->
      options =
        requestType: 'PUT'

      hx.request 'test.file', defaultCb, options

      expect(jasmine.Ajax.requests.count()).toEqual(1)
      expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
      expect(jasmine.Ajax.requests.at(0).method).toEqual('PUT')

    it 'should correctly set the content type', ->
      options =
        contentType: 'some/type'

      hx.request 'test.file', defaultCb, options

      expect(jasmine.Ajax.requests.count()).toEqual(1)
      expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
      expect(jasmine.Ajax.requests.at(0).requestHeaders['Content-Type']).toEqual('some/type')

    it 'should correctly set the response type', ->
      options =
        responseType: 'some/type'

      hx.request 'test.file', defaultCb, options

      expect(jasmine.Ajax.requests.count()).toEqual(1)
      expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
      expect(jasmine.Ajax.requests.at(0).responseType).toEqual('some/type')

    it 'should allow headers to be explicitly set', ->
      options =
        contentType: 'application/json'
        headers:
          'Content-Type': 'something'
          'accept': 'everything'

      hx.request 'test.file', defaultCb, options

      expect(jasmine.Ajax.requests.count()).toEqual(1)
      expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
      expect(jasmine.Ajax.requests.at(0).requestHeaders['Content-Type']).toEqual('something')
      expect(jasmine.Ajax.requests.at(0).requestHeaders['accept']).toEqual('everything')

    it 'should allow custom headers to be set', ->
      options =
        headers:
          custom: 'some custom thing'

      hx.request 'test.file', defaultCb, options

      expect(jasmine.Ajax.requests.count()).toEqual(1)
      expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
      expect(jasmine.Ajax.requests.at(0).requestHeaders['custom']).toEqual('some custom thing')

    it 'should thrown an error when an incorrect url is passed in', ->
      spyOn(console, 'error')

      hx.request defaultCb
      expect(console.error).toHaveBeenCalledWith('Incorrect URL passed into hx.request: ', defaultCb)

      arr = []
      hx.request arr
      expect(console.error).toHaveBeenCalledWith('Incorrect URL passed into hx.request: ', arr)

    it 'should pass the correct data to the callback', ->
      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result).toBeDefined()
        expect(result.responseText).toEqual('Some text')

      hx.request 'test.file', cb

      jasmine.Ajax.requests.at(0).respondWith({
        status: 200
        responseText: 'Some text'
      })

    it 'should return the correct source when data is not provided', ->
      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result).toBeDefined()
        expect(source).toEqual('test.file')

      hx.request 'test.file', cb
      jasmine.Ajax.requests.at(0).respondWith({
        status: 200
      })

    it 'should return the correct source when data is provided', ->
      data = {some: 'data'}

      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result).toBeDefined()
        expect(source).toEqual({url: 'test.file', data: data})

      hx.request 'test.file', data, cb
      jasmine.Ajax.requests.at(0).respondWith({
        status: 200
      })

    it 'should deal with a response having content but no status', ->
      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result).toBeDefined()
        expect(result.status).not.toBeDefined()
        expect(result.responseText).toEqual('Some text')

      hx.request 'test.file', cb

      jasmine.Ajax.requests.at(0).respondWith({
        responseText: 'Some text'
      })

    it 'should deal with status 304 (cached response)', ->
      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result).toBeDefined()
        expect(result.responseText).toEqual('Some text')

      hx.request 'test.file', cb

      jasmine.Ajax.requests.at(0).respondWith({
        status: 304
        responseText: 'Some text'
      })

    it 'should return an error when an error status is returned', ->
      cb = (error, result, source, index) ->
        expect(error).toBeDefined()
        expect(result).not.toBeDefined()
        expect(error.status).toEqual(404)

      hx.request 'test.file', cb

      jasmine.Ajax.requests.at(0).respondWith({
        status: 404
      })

    it 'should format the response data correctly when one is passed in', ->
      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result).toBeDefined()
        expect(result).toEqual({some: 'data'})

      opts =
        formatter: (r) -> JSON.parse r.responseText

      hx.request 'test.file', cb, opts

      jasmine.Ajax.requests.at(0).respondWith({
        status: 200
        responseText: '{"some":"data"}'
      })

    it 'should return an error when there is an error with the formatter', ->
      cb = (error, result, source, index) ->
        expect(error.message).toBeDefined()
        expect(result).not.toBeDefined()
        expect(source).toEqual('test.file')

      opts =
        formatter: (r) -> JSON.parse(r.responseText)

      hx.request 'test.file', cb, opts

      jasmine.Ajax.requests.at(0).respondWith({
        status: 200
        responseText: '[bob, steve, kate]'
      })

    it 'should check the response if a response type is defined', ->
      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result).toBeDefined()
        expect(result.status).not.toBeDefined()
        expect(result.response).toEqual('01010011 01101111 01101101 01100101 00100000 01110100 01100101 01111000 01110100')
        expect(jasmine.Ajax.requests.at(0).responseType).toEqual('binary')

      opts =
        responseType: 'binary'

      hx.request 'test.file', cb, opts

      jasmine.Ajax.requests.at(0).respondWith({
        response: '01010011 01101111 01101101 01100101 00100000 01110100 01100101 01111000 01110100'
        responseType: 'binary'
      })


    describe 'with url as an object', ->

      it 'should handle sending a request without data', ->
        url =
          url: 'test.file'
        hx.request url, defaultCb

        expect(jasmine.Ajax.requests.count()).toEqual(1)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')

      it 'should handle sending a request with data in the arguments', ->
        url =
          url: 'test.file'

        data = {some: 'data'}
        hx.request url, data, defaultCb

        expect(jasmine.Ajax.requests.count()).toEqual(1)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
        expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)

      it 'should handle sending a request with data in the object', ->
        data = {some: 'data'}
        url =
          url: 'test.file'
          data: data
        hx.request url, defaultCb

        expect(jasmine.Ajax.requests.count()).toEqual(1)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
        expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)

      it 'should send the object data instead of the provided data', ->
        data = {some: 'data'}
        objectData = {some: 'other data'}
        url =
          url: 'test.file'
          data: objectData
        hx.request url, data, defaultCb

        expect(jasmine.Ajax.requests.count()).toEqual(1)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
        expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify objectData)

      it 'should return the correct source in the response', ->
        cb1 = (error, result, source, index) ->
          expect(error).not.toBeDefined()
          expect(result).toBeDefined()
          expect(source).toEqual('test.file')

        cb2 = (error, result, source, index) ->
          expect(error).not.toBeDefined()
          expect(result).toBeDefined()
          expect(source).toEqual({url: 'test.file', data: data})

        cb3 = (error, result, source, index) ->
          expect(error).not.toBeDefined()
          expect(result).toBeDefined()
          expect(source).toEqual({url: 'test.file', data: objData})

        cb4 = (error, result, source, index) ->
          expect(error).not.toBeDefined()
          expect(result).toBeDefined()
          expect(source).toEqual({url: 'test.file', data: objData})

        data = {some: 'data'}
        objData = {some: 'other data'}

        url =
          url: 'test.file'
        hx.request url, cb1

        jasmine.Ajax.requests.at(0).respondWith({
          status: 200
        })

        hx.request url, data, cb2

        jasmine.Ajax.requests.at(1).respondWith({
          status: 200
        })

        url.data = objData

        hx.request url, cb3

        jasmine.Ajax.requests.at(2).respondWith({
          status: 200
        })

        hx.request url, data, cb4

        jasmine.Ajax.requests.at(3).respondWith({
          status: 200
        })


    describe 'with url as an array', ->

      it 'should handle sending a single request without data', ->
        url = ['test.file']

        hx.request url, defaultCb
        expect(jasmine.Ajax.requests.count()).toEqual(1)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')

      it 'should handle sending a single request with data', ->
        url = ['test.file']
        data = {some: 'data'}

        hx.request url, data, defaultCb
        expect(jasmine.Ajax.requests.count()).toEqual(1)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
        expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)

      it 'should handle sending multiple requests without data', ->
        url = ['test1.file', 'test2.file']

        hx.request url, defaultCb
        expect(jasmine.Ajax.requests.count()).toEqual(2)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test1.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')
        expect(jasmine.Ajax.requests.at(1).url).toEqual('test2.file')
        expect(jasmine.Ajax.requests.at(1).method).toEqual('GET')

      it 'should handle sending multiple requests with data', ->
        url = ['test1.file', 'test2.file']
        data = {some: 'data'}

        hx.request url, data, defaultCb

        expect(jasmine.Ajax.requests.count()).toEqual(2)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test1.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
        expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)

        expect(jasmine.Ajax.requests.at(1).url).toEqual('test2.file')
        expect(jasmine.Ajax.requests.at(1).method).toEqual('POST')
        expect(jasmine.Ajax.requests.at(1).params).toEqual(JSON.stringify data)

      it 'should handle sending multiple requests of different types', ->
        data = {some: 'data'}
        url = ['test1.file', {url: 'test2.file'}, {url: 'test3.file', data: data}]

        hx.request url, defaultCb

        expect(jasmine.Ajax.requests.count()).toEqual(3)
        expect(jasmine.Ajax.requests.at(0).url).toEqual('test1.file')
        expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')
        expect(jasmine.Ajax.requests.at(0).params).toEqual(null)

        expect(jasmine.Ajax.requests.at(1).url).toEqual('test2.file')
        expect(jasmine.Ajax.requests.at(1).method).toEqual('GET')
        expect(jasmine.Ajax.requests.at(1).params).toEqual(null)

        expect(jasmine.Ajax.requests.at(2).url).toEqual('test3.file')
        expect(jasmine.Ajax.requests.at(2).method).toEqual('POST')
        expect(jasmine.Ajax.requests.at(2).params).toEqual(JSON.stringify data)

      it 'should return the correct source in all the responses', ->
        cb1 = (error, result, source, index) ->
          expect(error).not.toBeDefined()
          expect(result).toBeDefined()
          switch index
            when 0 then expect(source).toEqual('test1.file')
            when 1 then expect(source).toEqual('test2.file')
            else expect(source).toEqual(['test1.file', 'test2.file'])

        cb2 = (error, result, source, index) ->
          expect(error).not.toBeDefined()
          expect(result).toBeDefined()
          switch index
            when 0 then expect(source).toEqual({url: 'test1.file', data: data})
            when 1 then expect(source).toEqual({url: 'test2.file', data: data})
            else expect(source).toEqual([{url: 'test1.file', data: data}, {url: 'test2.file', data: data}])

        url = [
          'test1.file'
          'test2.file'
        ]

        hx.request url, cb1
        jasmine.Ajax.requests.at(0).respondWith({
          status: 200
        })
        jasmine.Ajax.requests.at(1).respondWith({
          status: 200
        })

        data = {some: 'data'}

        hx.request url, data, cb2
        jasmine.Ajax.requests.at(2).respondWith({
          status: 200
        })
        jasmine.Ajax.requests.at(3).respondWith({
          status: 200
        })

      it 'should call set the index based on the order the urls were called, not the order they return', ->
        cb = (error, result, source, index) ->
          expect(error).not.toBeDefined()
          expect(result).toBeDefined()
          if index isnt -1
            responses[index] = true
            expect(source).toEqual(urls[index])
          else
            expect(source).toEqual(urls)

        responses = {}

        urls = [
          'test1.file'
          'test2.file'
        ]

        hx.request urls, cb

        jasmine.Ajax.requests.at(1).respondWith({
          status: 200
        })
        expect(responses[1]).toEqual(true)

        jasmine.Ajax.requests.at(0).respondWith({
          status: 200
        })
        expect(responses[0]).toEqual(true)


      describe 'of objects', ->

        it 'should handle sending a single request without data', ->
          url = [{url: 'test.file'}]

          hx.request url, defaultCb
          expect(jasmine.Ajax.requests.count()).toEqual(1)
          expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
          expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')

        it 'should handle sending a single request with data', ->
          url = [{url: 'test.file'}]
          data = {some: 'data'}

          hx.request url, data, defaultCb
          expect(jasmine.Ajax.requests.count()).toEqual(1)
          expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
          expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
          expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)

        it 'should handle sending a single request with data in the object', ->
          data = {some: 'data'}
          url = [{url: 'test.file', data: data}]

          hx.request url, data, defaultCb
          expect(jasmine.Ajax.requests.count()).toEqual(1)
          expect(jasmine.Ajax.requests.at(0).url).toEqual('test.file')
          expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
          expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)

        it 'should handle sending multiple requests without data', ->
          url = [{url: 'test1.file'}, {url: 'test2.file'}]

          hx.request url, defaultCb

          expect(jasmine.Ajax.requests.count()).toEqual(2)
          expect(jasmine.Ajax.requests.at(0).url).toEqual('test1.file')
          expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')

          expect(jasmine.Ajax.requests.at(1).url).toEqual('test2.file')
          expect(jasmine.Ajax.requests.at(1).method).toEqual('GET')

        it 'should handle sending multiple requests with data', ->
          url = [{url: 'test1.file'}, {url: 'test2.file'}]
          data = {some: 'data'}
          hx.request url, data, defaultCb

          expect(jasmine.Ajax.requests.count()).toEqual(2)
          expect(jasmine.Ajax.requests.at(0).url).toEqual('test1.file')
          expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
          expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)

          expect(jasmine.Ajax.requests.at(1).url).toEqual('test2.file')
          expect(jasmine.Ajax.requests.at(1).method).toEqual('POST')
          expect(jasmine.Ajax.requests.at(1).params).toEqual(JSON.stringify data)

        it 'should handle sending multiple requests with data in one of the objects', ->
          data = {some: 'data'}
          url = [{url: 'test1.file'}, {url: 'test2.file', data: data}]

          hx.request url, defaultCb

          expect(jasmine.Ajax.requests.count()).toEqual(2)
          expect(jasmine.Ajax.requests.at(0).url).toEqual('test1.file')
          expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')
          expect(jasmine.Ajax.requests.at(0).params).toEqual(null)

          expect(jasmine.Ajax.requests.at(1).url).toEqual('test2.file')
          expect(jasmine.Ajax.requests.at(1).method).toEqual('POST')
          expect(jasmine.Ajax.requests.at(1).params).toEqual(JSON.stringify data)

        it 'should handle sending multiple requests with data and data in one of the objects', ->
          data = {some: 'data'}
          objectData = {some: 'other data'}
          url = [{url: 'test1.file'}, {url: 'test2.file', data: objectData}]

          hx.request url, data, defaultCb

          expect(jasmine.Ajax.requests.count()).toEqual(2)
          expect(jasmine.Ajax.requests.at(0).url).toEqual('test1.file')
          expect(jasmine.Ajax.requests.at(0).method).toEqual('POST')
          expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)

          expect(jasmine.Ajax.requests.at(1).url).toEqual('test2.file')
          expect(jasmine.Ajax.requests.at(1).method).toEqual('POST')
          expect(jasmine.Ajax.requests.at(1).params).toEqual(JSON.stringify objectData)

        it 'should return the correct source in all the responses', ->
          cb1 = (error, result, source, index) ->
            expect(error).not.toBeDefined()
            expect(result).toBeDefined()
            switch index
              when 0 then expect(source).toEqual('test1.file')
              when 1 then expect(source).toEqual({url: 'test2.file', data: objData})
              else expect(source).toEqual(['test1.file', {url: 'test2.file', data: objData}])

          cb2 = (error, result, source, index) ->
            expect(error).not.toBeDefined()
            expect(result).toBeDefined()
            switch index
              when 0 then expect(source).toEqual({url: 'test1.file', data: data})
              when 1 then expect(source).toEqual({url: 'test2.file', data: objData})
              else expect(source).toEqual([{url: 'test1.file', data: data}, {url: 'test2.file', data: objData}])

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
          jasmine.Ajax.requests.at(0).respondWith({
            status: 200
          })
          jasmine.Ajax.requests.at(1).respondWith({
            status: 200
          })

          data = {some: 'data'}

          hx.request url, data, cb2
          jasmine.Ajax.requests.at(2).respondWith({
            status: 200
          })
          jasmine.Ajax.requests.at(3).respondWith({
            status: 200
          })


  describe 'hx.html', ->
    it 'should correctly set the mimeType to text/html', ->
      hx.html 'test.html', defaultCb

      expect(jasmine.Ajax.requests.at(0).overriddenMimeType).toEqual('text/html')
      expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')
      expect(jasmine.Ajax.requests.at(0).params).toEqual(null)

    it 'should format and return the correct data', ->
      test = '<div class="parent"><span class="child">bob</span></div>'

      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result.toString()).toEqual('[object DocumentFragment]')
        expect(result.childNodes.length).toEqual(1)
        expect(result.childNodes[0].className).toEqual('parent')
        expect(result.childNodes[0].childNodes[0].className).toEqual('child')

      hx.html 'test.html', cb

      expect(jasmine.Ajax.requests.at(0).overriddenMimeType).toEqual('text/html')
      expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')
      expect(jasmine.Ajax.requests.at(0).params).toEqual(null)

      jasmine.Ajax.requests.at(0).respondWith({
        status: 200
        responseText: test
      })

    it 'should pass the data through', ->
      data = {some: 'data'}
      hx.html 'test.html', data, defaultCb

      expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)


  describe 'hx.json', ->
    it 'should correctly set the mimeType to application/json', ->
      hx.json 'test.json', defaultCb

      expect(jasmine.Ajax.requests.at(0).overriddenMimeType).toEqual('application/json')
      expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')
      expect(jasmine.Ajax.requests.at(0).params).toEqual(null)

    it 'should format and return the correct data', ->
      cb = (error, result, source, index) ->
        expect(error).not.toBeDefined()
        expect(result).toEqual({some: "data"})

      hx.json 'test.json', cb

      expect(jasmine.Ajax.requests.at(0).overriddenMimeType).toEqual('application/json')
      expect(jasmine.Ajax.requests.at(0).method).toEqual('GET')
      expect(jasmine.Ajax.requests.at(0).params).toEqual(null)

      jasmine.Ajax.requests.at(0).respondWith({
        status: 200
        responseText: '{"some": "data"}'
      })

    it 'should pass the data through', ->
      data = {some: 'data'}
      hx.json 'test.json', data, defaultCb


      expect(jasmine.Ajax.requests.at(0).params).toEqual(JSON.stringify data)