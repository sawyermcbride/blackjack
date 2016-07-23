var Player = require('./Player');
var Bank = require('./Bank');
var Dealer = require('./Dealer');
var Deck = require('./Deck');

function Game(numPlayers) {
  this.players = [];
  this.numPlayers = numPlayers;
  this.dealer = null;
  this.bank = null;
}
Game.prototype.start = function() {
  this.dealer = new Dealer();
  this.bank = Bank;
  for(var i = 0; i < this.numPlayers; i++) {
    this.players.push(new Player());
  }
  Deck.shuffle();
}
/**
 * 4/11/16 12:15AM
 * TODO
 * - return cards to used deck after finish
 * -Deal cards to each player at beggining
 * - Set bet for each player
 */
Game.prototype.deal = function() {
  if(this.deckLength() < numPlayers*2+2)
    Deck.shuffle(true);

  this.players.forEach( function(player) {
    player.deal();
  });
  this.dealer.deal();
}
Game.prototype.makeBet = function(id, value) {
  this.players[id].makeBet(value);
}
Game.prototype.deckLength = function() {
  return Deck.cards.length;
}
Game.prototype.finish = function() {
  var dealerVal = this.dealer.resolveHand();
  //everyone wins
  if(dealerVal > 21) {
    this.players.forEach( function(player) {
      player.status = 1;
    });
  }
  
  this.players.forEach( function(player) {
    var playerVal = player.getTotal();
    if(playerVal > 21) {
      player.status = 0;
      return;
    }
    if(playerVal === 21 && player.hands[0].length === 2) {
      player.blackjack = true;
    }
    
    player.cards.forEach( function(hand) {
      Deck.addUsedCards(hand);
    });    
    
    if(playerVal === dealerVal) 
      player.status = 2;
    else if(playerVal > dealerVal) //and they didn't bust ^ see above
      playerVal = 1;
    else if(playerVal < dealerVal)
      player.status = 0;
      
    player.reset(); //sets bet and emptys hand 
  });
  
}
Game.prototype.hitPlayer = function(id) {
  if(this.deckLength() < numPlayers*2+2)
    Deck.shuffle(true);
  
  if(this.deckLength() < numPlayers*2+2)
    Deck.shuffle(true);
  this.players[id].hit();
}
Game.prototype.getPlayerStatus = function(id) {
  return this.players[id].status; //will return -1 if has not been set
}
Game.prototype.payout = function() {
  this.players.forEach( function(player) {
    switch (player.status) {
      case 0:
        player.bank-=player.bet;
        break;
      case 1:
        if(player.blackjack) 
          player.bank += player.bet*1.25;
        else 
          player.bank+=player.bet; 
    }
    //restore bet at 0;
    player.bet = 0;
  });
}
module.exports = Game;