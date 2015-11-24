var selector_matcher = function (element) {
  switch (true) {
    case element.matches !== undefined:
      return 'matches';
    case element.webkitMatchesSelector !== undefined:
      return 'webkitMatchesSelector';
    case element.msMatchesSelector !== undefined:
      return 'msMatchesSelector';
    case element.mozMatchesSelector !== undefined:
      return 'mozMatchesSelector';
    default:
      return false;
  }
};

module.exports = function (root, target) {
  var matcher = selector_matcher(target);
  if (matcher) {
    return function (target, selector) {
      return target[matcher](selector);
    };
  } else {
    return function (target, selector) {
      var elements = root.querySelectorAll(listeners[i].selector);

      for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i] === target) {
          return true;
        }
      }

      return false;
    };
  }
};
