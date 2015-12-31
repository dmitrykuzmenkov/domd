var match_selector = require('./match_selector.js');

var event_handler = function (root) {
  return function (e) {
    var target = event.target;

    if (target.nodeType === 3) {
      target = target.parentNode;
    }

    var list = [];
    var phase = event.eventPhase || ( event.target !== event.currentTarget ? 3 : 2 );

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

    for (var i in list) {
      if (match_selector(root, target, list[i].selector)) {
        list[i].callback(e, target);
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
        node.addEventListener(event, event_handler(node), !!use_capture);
      }

      map[event].push({
        selector: selector,
        callback: callback
      });
      console.log(listeners);
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
