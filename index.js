
 

/*** Index File  Blackjack By Sawyer McBride ****/

(function() {
  var Controller = require('./src/controller');
  document.addEventListener('DOMContentLoaded', function() {
    new Controller().initEvents(); //register the rest of the events after
  });
})();
