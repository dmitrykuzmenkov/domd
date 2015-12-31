var match_selector = require('./match_selector.js');

var event_handler = function (root, listeners) {
  return function (e) {
    var target = event.target;
    if (target.nodeType === 3) {
      target = target.parentNode;
    }

    for (var i in listeners) {
      if (match_selector(root, target, listeners[i].selector)) {
        listeners[i].callback(e, target);
        break;
      }
    }
  };
};

module.exports = function (node) {
  var listeners = [];
  return {
    on: function (event, selector, callback, use_capture) {
      if (!listeners[event]) {
        listeners[event] = [];
        node.addEventListener(event, event_handler(node, listeners[event]), !!use_capture);
      }

      listeners[event].push({
        selector: selector,
        callback: callback
      });
    },

    off: function (event, selector) {
      for (var i in listeners[event] || []) {
        if (listeners[event][i].selector === selector) {
          listeners[event].splice(i, 1);
        }
      }
    }
  };
};
