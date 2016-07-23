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
  this.renderButtons( {hit:0, stay: 0, double: 0, split: 0} );
}
Controller.prototype.renderButtons = function( obj ) {
  var buttonsTemplate = $('#buttons-template').innerHTML;
  var data = {
    hit: typeof obj.hit === 'undefined' ? '' : 'disabled',
    stay: typeof obj.stay === 'undefineasd' ? '' : 'disabled',
    double: typeof obj.double === 'undefined' ? '' : 'disabled',
    deal: typeof obj.deal === 'undefined' ? '' : 'disabled',
    split: typeof obj.split === 'undefined' ? '' : 'disabled',
  }
  $('section.buttons').innerHTML = Mustache.render(buttonsTemplate, data);
}
Controller.prototype.dealEvt = function() {
  this.Game1.deal();
  this.renderDeck();
  this.renderButtons({deal:0});   
}
Controller.prototype.initEvents = function() {
  //lots of events
  this.start();
  this.evtDynamicClk('.buttons', 'deal-btn', this.dealEvt.bind(this));
  this.evtDynamicClk('.buttons', 'hit-btn', this.hit.bind(this));
  
}
Controller.prototype.hitEvt = function() {
  this.Game1.hitPlayer(1);
}
Controller.prototype.stayEvt = function() {
  console.log(this);
}
Controller.prototype.evtDynamicClk= function(parent, id, cb) {
  $(parent).addEventListener('click', function(e) {
    if(e.target.id === id) {
      cb();
    }
  });
}
Controller.prototype.renderCards = function( ) { 
  
  var cardTemplate = $('#card-template').innerHTML;
  var dealerCardTemplate = $('#dealer-card-template').innerHTML;
  
  var cards = [];
  var dealerCards = [];
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
    dealerCards.push(
      {
        show: x === 0, 
        color: dHand[x].suit  === 'H' || dHand[x].suit  === 'D' ? 'red' : 'black',
        suit:  dHand[x].suit,
        rank: dHand[x].rank
      } 
    )
  }
  $('section.player').innerHTML = Mustache.render(cardTemplate, {cards: cards});
  $('section.dealer').innerHTML = Mustache.render(dealerCardTemplate, {cards: dealerCards});
}
module.exports = Controller;