import closest from './closest';

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @returns {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
  let listenerFn = listener.apply(this, arguments);

  element.addEventListener(type, listenerFn, useCapture);

  return {
    destroy() {
      element.removeEventListener(type, listenerFn, useCapture);
    },
  };
}

function delegate(elements, selector, type, callback, useCapture) {
  // Handle the regular Element usage
  if (typeof elements.addEventListener === 'function') {
    return _delegate.apply(null, arguments);
  }

  // Handle Element-less usage, it defaults to global delegation
  if (typeof type === 'function') {
    // Use `document` as the first parameter, then apply arguments
    // This is a short way to .unshift `arguments` without running into deoptimizations
    return _delegate.bind(null, document).apply(null, arguments);
  }

  // Handle Selector-based usage
  if (typeof elements === 'string') {
    elements = document.querySelectorAll(elements);
  }

  // Handle Array-like based usage
  return Array.prototype.map.call(elements, function (element) {
    return _delegate(element, selector, type, callback, useCapture);
  });
}

function listener(element, selector, type, callback) {
  return function (e) {
    e.delegateTarget = closest(e.target, selector);

    if (e.delegateTarget) {
      callback.call(element, e);
    }
  };
}

export default delegate;
