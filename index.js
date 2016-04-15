
 

/*** Index File  Blackjack By Sawyer McBride ****/

(function() {
  var Controller = require('./src/controller');
  var controller1 = new Controller('#game-container');
  document.addEventListener('DOMContentLoaded', function() {
    controller1.initEvents(); //register the rest of the events after
  });
  
    
})();
