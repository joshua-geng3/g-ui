let DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  let proto = Element.prototype;

  proto.matches =
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector;
}

/**
 * Finds the closet parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @returns {Function}
 */
function closest(element, selector) {
  while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof element.matches === 'function' && element.matches(selector)) {
      return element;
    }
    element = element.parentNode;
  }
}

export default closest;