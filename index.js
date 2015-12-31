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

// 0 - bubbling, 1 - capturing
// var listeners = [{}, {}];
var listeners = [{}, {}];

module.exports = function (node) {
  return {
    on: function (event, selector, callback, use_capture) {
      var map = listeners[use_capture ? 1 : 0];
      if (!map[event]) {
        map[event] = [];
        node.addEventListener(event, event_handler(node, map[event]), !!use_capture);
      }

      map[event].push({
        selector: selector,
        callback: callback
      });
    },

    off: function (event, selector) {
      listeners.forEach(function (map) {
        for (var i in map[event] || []) {
          if (map[event][i].selector === selector) {
            map[event].splice(i, 1);
          }
        }
      });
    }
  };
};
