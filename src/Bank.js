/**
 * Bank static class
 */
var Bank = (function() {
  var set = false;
  var amount = 1000;
  function subtract (value) {
    if(amount < value)
      return false;
    else {
      amount-=value;
      return value;
    }
  }
  function init(value) {
    if(!set)
      amount = value
    set = true;
  }
  return {
    subtract: subtract,
    init: init
  }
})();

module.exports = Bank;
