module.exports = function (root, target, selector) {
  var f = target.matches || target.webkitMatchesSelector ||
    target.mozMatchesSelector || target.msMatchesSelector ||
    function (s) {
      return [].indexOf.call(root.querySelectorAll(s), this) !== -1;
    }
  ;
  return f.call(target, selector);
};
