deprecatedWarning = (fn) => hx.deprecatedWarning(fn, 'is deprecated and will be removed in a later release')

respondToRequest = (request, url, data, callback, options, index) ->
  status = request.status

  source = if data? then {url:url, data:data} else url

  if status >= 200 and status < 300 or status is 304
    try
      result = options.formatter request
    catch e
      callback e, undefined, source, index
      return
    callback undefined, result, source, index
  else
    callback request, undefined, source, index
  return

sendRequest = (request, url, data, options) ->
  request.open options.requestType, url, true

  for header, value of options.headers
    request.setRequestHeader header, value

  if options.responseType then request.responseType = options.responseType
  if options.contentType then request.overrideMimeType options.contentType

  sendData = if data? and typeof data isnt 'string' then JSON.stringify(data) else data

  request.send sendData

performRequest = (url, data = null, callback, options = {}, index) ->
  defaults =
    requestType: 'GET'
    formatter: hx.identity
    headers: {}

  options = hx.merge defaults, options

  if options.contentType
    options.headers['Content-Type'] ?= options.contentType
    options.headers['accept'] ?= options.contentType + ',*/*'

  if options.requestType is 'GET' and data
    options.requestType = 'POST'

  request = new XMLHttpRequest()

  respond = ->
    respondToRequest(request, url, data, callback, options, index)

  request.onload = request.onerror = respond
  sendRequest(request, url, data, options)


hx_xhr = (urlType, urls, data, callback, options) ->
  if urlType is 'array'
    resultArr = []

    buildResultArr = (error, result, source, index) ->
      resultArr[index] = {data: result, source: source}
      callback(error, result, source, index)
      if resultArr.filter((d) -> d isnt undefined).length is urls.length
        resultSource = resultArr.map((d) -> d.source)
        resultData = resultArr.map((d) -> d.data)
        callback(error, resultData, resultSource, -1)

    for url, i in urls
      if hx.isObject(url)
        data = url.data or data
        url = url.url
      performRequest url, data, buildResultArr, options, i
  else
    if urlType is 'object'
      data = urls.data or data
      url = urls.url
    else
      url = urls
    performRequest url, data, callback, options

standardRequest = -> # url, callback, options || url, data, callback, options
  urls = arguments[0]

  urlType = switch
    when hx.isArray(urls) then 'array'
    when hx.isObject(urls) then 'object'
    when hx.isString(urls) then 'string'

  if not urlType or urlType is 'array' and urls.length is 0
    console.error('Incorrect URL passed into hx.request: ', urls)
    return

  if hx.isFunction(arguments[1])
    callback = arguments[1]
    options = arguments[2]
  else
    data = arguments[1]
    callback = arguments[2]
    options = arguments[3]

  hx_xhr urlType, urls, data or null, callback, options

hx.request = ->
  deprecatedWarning('hx.request')
  standardRequest.apply(null, arguments)


parsers =
  'application/json': (text) -> if text then JSON.parse text
  'text/html': (text) -> hx.parseHTML text
  'text/plain': (text) -> text

reshapedRequest = (type) ->
  fn = switch type
    when 'application/json' then 'hx.json'
    when 'text/html' then 'hx.html'
    when 'text/plain' then 'hx.text'
    when undefined then 'hx.reshapedRequest'

  deprecatedWarning(fn)

  (urls, data, callback, options) ->
    [data, callback, options] = [undefined, data, callback] if hx.isFunction data

    defaults = if type
      contentType: type
      formatter: (xhr) -> parsers[type](xhr.responseText)
    else
      formatter: (xhr) ->
        [mimeType] = xhr.getResponseHeader 'content-type'
          .split ';'
        parser = parsers[mimeType]
        if parser
          parser xhr.responseText
        else
          hx.consoleWarning "Unknown parser for mime type #{mimeType}, carrying on anyway"
          xhr

    options = hx.merge defaults, options
    standardRequest urls, data, callback, options

hx.json = reshapedRequest('application/json')
hx.html = reshapedRequest('text/html')
hx.text = reshapedRequest('text/plain')
hx.reshapedRequest = reshapedRequest()
