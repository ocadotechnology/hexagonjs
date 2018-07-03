import { Map as HMap } from 'map/main'
import { List as HList } from 'list/main'
import { isString } from 'utils/main'

class BasicEventEmitter
  constructor: ->
    @callbacks = new HMap
    @allCallbacks = new HList

  # emit an object to all callbacks registered with the name given
  emit: (name, data) ->
    if @callbacks.has(name) then cb(data) for cb in @callbacks.get(name).entries()
    cb(name, data) for cb in @allCallbacks.entries()
    this

  isEmpty: -> @callbacks.values().every((list) -> list.size is 0) and @allCallbacks.size is 0

  # register a callback against the name given
  on: (name, callback) ->
    if name
      if not @callbacks.has(name)
        @callbacks.set(name, new HList)
      @callbacks.get(name).add callback
    else
      @allCallbacks.add callback
    this

  # returns true if emitting an event under the name given will actually call any callbacks
  # this makes it possible to avoid emitting events, when no registered callbacks exist - and
  # avoid the cost of building data that goes with the events. This should only be used in
  # exceptional circumstances where lots of calls to emit have to be done at once.
  has: (name) ->
    @allCallbacks.size > 0 or (@callbacks.has(name) and @callbacks.get(name).size > 0)

  # deregisters a callback
  off: (name, callback) ->
    if callback
      if name
        @callbacks.get(name)?.remove(callback)
      else
        @allCallbacks.remove(callback)
    else
      if name
        @callbacks.set(name, new HList)
      else
        @callbacks = new HMap
        @allCallbacks = new HList
    this

  # lets you pipe events through to another event emitter
  pipe: (eventEmitter, prefix, filter) ->
    filterer = if filter
      (n) -> filter.indexOf(n) isnt -1
    else
      (n) -> true

    if prefix
      @on null, (n, v) ->
        if filterer(n)
          eventEmitter.emit(prefix + '.' + n, v)
    else
      @on null, (n, v) ->
        if filterer(n)
          eventEmitter.emit(n, v)
    this


export class EventEmitter
  constructor: ->
    @suppressedMap = new HMap
    @emitters = new HList
    @emittersMap = new HMap
    @global = addEmitter(this, 'default')

  addEmitter = (ee, namespace) ->
    be = new BasicEventEmitter
    ee.emittersMap.set(namespace, be)
    ee.emitters.add(be)
    be

  removeEmitter = (ee, be, namespace) ->
    if namespace and ee.emittersMap.has(namespace)
      ee.emittersMap.delete(namespace)
    else
      lookedUpNamespace = ee.emittersMap.entries().filter(([_, e]) -> e is be)[0]?[0]
      if lookedUpNamespace
        ee.emittersMap.delete(lookedUpNamespace)
    ee.emitters.remove(be)

  # emit an object to all callbacks registered with the name given
  emit: (name, data) ->
    if not @suppressedMap.get(name)
      # XXX: Deprecated event check - This is useful to have if we need to deprecated events in the future
      # if @deprecatedEvents?
      #   for e of @deprecatedEvents
      #     if @deprecatedEvents[e].event is name
      #       @emit e, data

      for emitter in @emitters.entries()
        emitter.emit(name, data)
    this

  # supresses all events of the given name (so calling emit will have no effect until re-enabled)
  suppressed: (name, suppressed) ->
    if arguments.length > 1
      @suppressedMap.set(name, !!suppressed)
      this
    else
      !!@suppressedMap.get(name)

  # register a callback against the name given
  on: (name, namespace, callback) ->
    if namespace is 'default'
      throw new Error('hx.EventEmitter: "default" is a reserved namespace. It can not be used as a namespace name.')
      return this

    if isString(namespace)
      ee = @emittersMap.get(namespace)
      if not ee
        ee = addEmitter(this, namespace)
      ee.on(name, callback)
    else
      @global.on(name, namespace)
    this

  has: (name) ->
    if @global.has(name) then return true
    for emitter in @emitters.entries()
      if emitter.has(name) then return true
    return false

  # deregisters a callback
  off: (name, namespace, callback) ->
    if isString(namespace)
      if @emittersMap.has(namespace)
        be = @emittersMap.get(namespace)
        be.off(name, callback)
        if be.isEmpty()
          removeEmitter(this, be, namespace)
    else
      if not callback and not isString(namespace)
        callback = namespace

      emitters = @emitters.entries()
      emittersToRemove = []
      emitters.forEach (emitter) =>
        emitter.off(name, callback)
        if emitter isnt @global and emitter.isEmpty()
          emittersToRemove.push(emitter)
      emittersToRemove.map((e) => removeEmitter(this, e))
    this

  # lets you pipe events through to another event emitter
  pipe: (eventEmitter, prefix, filter) ->
    @global.pipe(eventEmitter, prefix, filter)
    this
