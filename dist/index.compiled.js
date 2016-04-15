/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	 
	
	/*** Index File  Blackjack By Sawyer McBride ****/
	
	(function() {
	  var Controller = __webpack_require__(1);
	  var controller1 = new Controller('#game-container');
	  document.addEventListener('DOMContentLoaded', function() {
	    controller1.initEvents(); //register the rest of the events after
	  });
	  
	    
	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(3);
	var Bank = __webpack_require__(6);
	var Dealer = __webpack_require__(7);
	var Deck = __webpack_require__(4);
	
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Deck = __webpack_require__(4);
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Deck Static Class
	 * Properties: cards
	 * Methods: shuffle, card,  
	 */
	const Card = __webpack_require__(5);
	
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Card (suit,rank){
	    this.suit=suit;
	    this.rank=rank;
	}
	
	module.exports = Card;

/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(3);
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=index.compiled.js.map