var globalObject = require('global-object');
var NativeCustomEvent = globalObject.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

var CustomEvent;
if (useNative()) {
  CustomEvent = NativeCustomEvent;
} else if (!globalObject.document) {
  CustomEvent = undefined;
} else if ('function' === typeof globalObject.document.createEvent) {
  // IE >= 9
  CustomEvent = function (type, params) {
    var e = globalObject.document.createEvent('CustomEvent');
    if (params) {
      e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
    } else {
      e.initCustomEvent(type, false, false, void 0);
    }
    return e;
  }
} else {
  // IE <= 8
  CustomEvent = function (type, params) {
    var e = globalObject.document.createEventObject();
    e.type = type;
    if (params) {
      e.bubbles = Boolean(params.bubbles);
      e.cancelable = Boolean(params.cancelable);
      e.detail = params.detail;
    } else {
      e.bubbles = false;
      e.cancelable = false;
      e.detail = void 0;
    }
    return e;
  }
}
module.exports = CustomEvent;
