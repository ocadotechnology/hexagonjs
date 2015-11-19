hasResponse = (request) ->
  responseType = request.responseType
  if responseType and responseType isnt 'text' then request.response else request.responseText

respondToRequest = (request, url, data, callback, options, index) ->
  status = request.status

  source = if data? then {url:url, data:data} else url

  if not status and hasResponse(request) or status >= 200 and status < 300 or status is 304
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
  request.overrideMimeType options.contentType

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

  ### istanbul ignore next: ie 8.0 - 9.x use xDomainRequest, no other browser uses it ###
  if 'withCredentials' not of request and typeof XDomainRequest isnt undefined and /^(http(s)?:)?\/\//.test(url)
    request = new XDomainRequest()

  respond = ->
    respondToRequest(request, url, data, callback, options, index)

  ### istanbul ignore next: onload/onerror are part of XMLHttpRequest 2 spec so this is here for older browser support ###
  if 'onload' of request then request.onload = request.onerror = respond
  else request.onreadystatechange = ->
    request.readyState > 3 and respond()
    return

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


hx.request = -> # url, callback, options || url, data, callback, options
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


reshapedRequest = (args, type, formatter) ->
  urls = args[0]

  if hx.isFunction(args[1])
    callback = args[1]
    options = args[2]
  else
    data = args[1]
    callback = args[2]
    options = args[3]

  defaults =
    contentType: type
    formatter: formatter

  options = hx.merge defaults, options

  hx.request urls, data, callback, options

hx.json = ->
  reshapedRequest arguments, 'application/json', (result) ->
    if result.responseText then JSON.parse(result.responseText)

hx.html = ->
  reshapedRequest arguments, 'text/html', (result) ->
    hx.parseHTML result.responseText
