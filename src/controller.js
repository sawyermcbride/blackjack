var Game = require('./Game');
var $ = function(elem) {
  // return document.querySelector(elem);
  var found = document.querySelectorAll(elem);
  return found.length === 1 ? found[0] : found;  
}

function Controller( mountNode ) {
  this.mountNode = mountNode;
}
Controller.prototype.renderDeck = function() {
  
  var deckCardTemplate = $('#card-template-deck').innerHTML;
  var deckLength = this.Game1.deckLength();
  
  var top = 5;
  var left = 5;
  var cardsArr = [];
  for(var i = 0; i < deckLength; i++) {
    cardsArr.push( {left: left, top: top} );
    ++top;
    left+=2;
  }
  
  $('.deck').innerHTML = Mustache.render(deckCardTemplate, {cards: cardsArr});
}
Controller.prototype.start = function() {
  this.Game1 = new Game(1);
  this.Game1.start();
  this.renderDeck();
}
Controller.prototype.deal = function() {
  this.Game1.deal();
  
  var cardTemplate = $('#card-template').innerHTML;
  var dealerCardTemplate = $('#dealer-card-template').innerHTML;
  
  var cards = [];
  var dCards = [];
  for(var i = 0, hands = this.Game1.players[0].hands; i < hands.length; i++) {
      for(var j = 0; j < hands[i].length; j++) {
        cards.push(
          {
            front: true,
            back: false,
            color: hands[i][j].suit  === 'H' || hands[i][j].suit  === 'D' ? 'red' : 'black',
            suit:  hands[i][j].suit,
            rank: hands[i][j].rank
           } 
        )
      }
  }
  
  for(var x = 0, dHand = this.Game1.dealer.hands[0]; x < dHand.length; x++) {
    dCards.push(
      {
        show: x === 0, 
        color: dHand[x].suit  === 'H' || dHand[x].suit  === 'D' ? 'red' : 'black',
        suit:  dHand[x].suit,
        rank: dHand[x].rank
      } 
    )
  }
  $('section.player').innerHTML = Mustache.render(cardTemplate, {cards: cards});
  $('section.dealer').innerHTML = Mustache.render(dealerCardTemplate, {cards: dCards});
  this.renderDeck();
}
Controller.prototype.initEvents = function() {
  //lots of events
  this.start();
  this.evtDynamicClk('.buttons', 'deal-btn', this.deal.bind(this));
  
}
Controller.prototype.hitEvt = function() {
  console.log(this);
}
Controller.prototype.stayEvt = function() {
  
}
Controller.prototype.evtDynamicClk= function(parent, id, cb) {
  document.querySelector(parent).addEventListener('click', function(e) {
    if(e.target.id === id) {
      cb();
    }
  });
}
module.exports = Controller;