/*
import { EventEmitter } from 'event-emitter'
import { select, div } from 'selection'
import { isObject, isArray, isString, isFunction, isPromise } from 'utils'

class Component extends EventEmitter {
  static const state = Symbol('state')
  static const private = Symbol('private')

  static addSetterGetters (ComponentClass, properties) {
    //XXX: implement
  }

  constructor (properties, options) {
    super()
    this[Component.state] = {}
    this[Component.private] = {}

    //XXX: validate the options passed in against the properties
  }
}

function setterGetter(propertyName, options = {}) {
  return function (value) {
    if (arguments.length > 0) {

      // Validation
      if (options.allowedTypes) {
        const isValidType = options.allowedTypes.some(Type => value instanceof Type)
        if (!isValidType) {
          throw new Error(
            'A value of one of these types was expected: [' + options.allowedTypes.join(', ') + ']'
          )
        }
      }

      // Set the value only if it changed
      if (this._.state[propertyName] !== value) {
        const oldValue = this._.state[propertyName]

        if (options.beforeChange) {
          options.beforeChange()
        }

        this._.state[propertyName] = value

        if (options.afterChange) {
          options.afterChange()
        }

        this.emit(propertyName + '-change', {
          oldValue: oldValue,
          newValue: value
        })

      }
    } else {
      return this._.state[propertyName]
    }
  }
}

//needs isArray, isPromise, isObject, isString

function picker (options) {
  const selection = button()
  new Picker(selection, options)
  return selection
}

class Picker extends Component {
  constructor (selector, options = {}) {
    super(properies, options)

    const private = this[Component.private]

    private.sheet = new Sheet()

    private.selection = select(selector)
      .api('picker', this)
      .api(this)
  }

  // Hides the dropdown
  hide () {

  }
}

const properties = {
  items: {
    eventName: 'items',
    allowedTypes: [Array, Function, Promise],
    inputMapper: normalizeItems
  }),
  renderer: {
    eventName: 'renderer',
    allowedTypes: [Function],
    afterChange() {
      render(this, )
    }
  }),
  searchBoxVisible: {
    eventName: 'search-box-visible',
    allowedTypes: [Boolean]
  }),
  filterer: {
    eventName: 'filterer',
    allowedTypes: [Function]
  }),
  disabled: {
    eventName: 'disabled',
    allowedTypes: [Boolean]
  }),
  groupBy: {
    eventName: 'group-by',
    allowedTypes: [Function]
  })
}

Component.addSetterGetters(Picker, properties)

function render (picker) {
  const { selection } = picker[Component.private]

}

function builtInFilterExtractor (item) {
  if (isString(item)) {
    return item
  } else if (isObject(item)) {
    return item.value
  } else {
    //XXX: implement this
    logger.error({
      component: 'Picker',
      option: 'items',
      message: 'When providing an array, the items must be either strings or objects'
    })
  }
}

// Converts any of the allowed inputs for items into a function that yields a promise
function normalizeItems(items) {
  if (isArray(items)) {
    return (searchTerm) => {
      return Promise.resolve(items.filter(it => {
        return builtInFilterExtractor(it).indexOf(serchTerm) > -1
      }))
    }
  } else if (isPromise(items)) {
    return (searchTerm) => {
      return items
        .then(resolvedItems => {
          return resolvedItems.filter(it => {
            return builtInFilterExtractor(it).indexOf(serchTerm) > -1
          })
        })
    }
  } else {
    return (searchTerm) => {
      return Promise.resolve(items(searchTerm))
    }
  }
}

export {
  picker,
  Picker
}
*/
