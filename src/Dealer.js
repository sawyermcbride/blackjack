const Player = require('./Player.js');

function Dealer(){
  //call super constructor
  Player.call(this);
  //the constructor will be set to the super (Player) so we restore
  this.constructor = Dealer;
}
//Inheritance
Dealer.prototype = Object.create(Player.prototype);

Dealer.prototype.split = null;
Dealer.prototype.double = null;
//auto hits the hand and returns the total 
Dealer.prototype.resolveHand = function() {
  //stay on soft 17
  // if(this.getTotal() === 17 && this.acesCount() === 1)
  //   return; 
  
  while(this.getTotal() < 17) {
    this.hit();
  }
  return this.getTotal();
}
module.exports = Dealer;