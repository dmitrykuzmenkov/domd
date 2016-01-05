var match_selector = require('./match_selector.js');

var event_handler = function (root) {
  return function (e) {
    var ret;
    var target = e.target;

    if (target.nodeType === 3) {
      target = target.parentNode;
    }

    var list = [];
    var phase = e.eventPhase || ( e.target !== e.currentTarget ? 3 : 2 );

    switch (phase) {
      case 1: //Event.CAPTURING_PHASE:
        list = listeners[1][e.type];
        break;

      case 2: //Event.AT_TARGET:
        if (listeners[0][e.type]) {
          list = list.concat(listeners[0][e.type]);
        }

        if (listeners[1][e.type]) {
          list = list.concat(listeners[1][e.type]);
        }
        break;

      case 3: //Event.BUBBLING_PHASE:
        list = listeners[0][e.type];
      break;
    }

    // Find triggered element cuz we can get child of it in e.target
    while (target) {
      for (var i in list) {
        if (match_selector(root, target, list[i].selector)) {
          list[i].callback(e, target);
          break;
        }
      }

      // If callback returned false - stop next propaganation
      if (ret === false) {
        e.preventDefault();
        return;
      }

      if (target === root) {
        break;
      }

      target = target.parentElement;
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
        node.addEventListener(event, event_handler(node), !!use_capture);
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
