/**
 * Deck Static Class
 * Properties: cards
 * Methods: shuffle, card,  
 */
const Card = require('./Card');

var Deck = (function() {
  var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q'];
  var suits = ['H', 'S', 'C', 'D']; //Hearts, spades, clubs, diamonds
  var cards = []; 
  var usedCards = []; 
  function shuffle(midReShuffle) {
    if(midReShuffle) {
      cards = usedCards.splice(0);
      return;
    }
      
    for (var i = 0; i < ranks.length; i++) {
      for(var j = 0; j < suits.length; j++) {
        cards.push(new Card(suits[j], ranks[i])); 
      }
    }
  }
  function addUsedCards(arr) {
    usedCards.push.apply(null, arr); 
  }
  function pick() {
    if (this.cards.length === 0) 
      return false;
    return this.cards.splice(Math.floor(Math.random() * this.cards.length-1), 1)[0];
  }
  return {
    pick: pick,
    cards: cards,
    shuffle:shuffle, 
    addUsedCards: addUsedCards
  }
})();

module.exports = Deck;
