/* eslint-disable no-underscore-dangle */

export default function emit(node, eventName, eventData) {
  if (node && node.__hx__ && node.__hx__.eventEmitter) {
    node.__hx__.eventEmitter.emit(eventName, eventData);
  }
}

/* eslint-enable no-underscore-dangle */
