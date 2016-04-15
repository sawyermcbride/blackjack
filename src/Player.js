const Deck = require('./Deck');
function Player(){
    this.hands=[]; //TODO 2d array to hold split/ other hands
    this.bank=0;
    this.bet = 0;
    this.status = -1; //0 is lost, 1 is won, 2 is push
    this.blackjack = false;
    this.canBet = true;
}
Player.prototype.deal = function() {
  this.hands.push([Deck.pick(), Deck.pick()]);
}
Player.prototype.makeBet = function(value) {
  if(this.canBet) {
    this.bet = value
    this.canBet = false;
    return false;
  }
   else 
    return false;
}
Player.prototype.reset = function() {
  this.hands = [];
  this.bet = 0;
}
Player.prototype.handsLength = function() {
  return this.hands.length;
}
Player.prototype.hit = function(handNum) {
  var handToHit = handNum || 0;
  this.hands[handToHit].push(Deck.pick());
}
Player.prototype.split = function(handNum) {
  var handToSplit = handNum || 0;
  if(this.hands[handToSplit][0].rank === this.hands[handToSplit][1].rank
     && this.hands[handToSplit].length === 2) 
    this.hands.push([this.hands[handToSplit].splice(0,1)]);
  else 
    return false;
}
Player.prototype.double = function(handNum) {
  var handToDouble = handNum || 0;
  if(this.hands[handToDouble].length !== 2)
    return false;
  this.bet*=2;
  this.hit(handToDouble);
}
/**
 * Gets the total of a given hand
 * @param  {Integer} handNum
 * @return {Array<String>} an array of the rank for each card
 */
Player.prototype.getTotal = function(handNum) {
  var self = this;
  function getVal(str) {
    if(!isNaN(str))
      return parseInt(str);
    else {
      if(str === 'K' || str === 'Q' || str === 'J')
        return 10;
      else if(str === 'A') {
        return 11;
      }
    }
  }
  var totalHand = handNum || 0;
  var total = 0;
  var acesThisHand = 0;
  for(var i = 0, hand = this.hands[totalHand]; i < hand.length; i++ ) {
    if(hand[i].rank === 'A')
    ++acesThisHand; //If an ace is in the hand increment the number of aces for the HAND
    total+=getVal(hand[i].rank);
  }
  //ace handling
  while(acesThisHand-->0 && total > 21) {
    total-=10;
  }
  return total;
}


module.exports = Player;