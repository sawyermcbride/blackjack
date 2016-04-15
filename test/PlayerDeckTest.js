const Player = require('../src/Player');
const assert = require('chai').assert;
const Deck = require('../src/Deck');
const Dealer = require('../src/Dealer');
const Card = require('../src/Card');

describe('Deck', function() {
   before(function() {
    Deck.shuffle();
  })
  it('card should return an object', function() {
    var card = new Card('D', 'A');
    assert.isObject(card);
  })
  it('should have 52 cards at the beggining', function() {
    assert(Deck.cards.length === 52);
  });
  
  it('should have 51 after a pick and should return an object', function() {
    assert.isObject(Deck.pick());
    assert(Deck.cards.length === 51);
  }); 
  it('should have no cards after all are picked', function() {
    while(Deck.cards.length > 0) {
      Deck.pick();
    }
    assert(Deck.cards.length === 0);
  });
});

describe('Player ', function() {

const TestPlayer = new Player();
  before(function() {
    Deck.shuffle();
  })
  describe('Player deck functions', function() {
    it('Player should have no hands at beggining', function() {
      assert(TestPlayer.hands.length === 0);
    })
    it('should have one hand after deal and two cards in the hand', function() {
      TestPlayer.deal();
      assert(TestPlayer.hands.length === 1);
      assert(TestPlayer.hands[0].length === 2);
    })
    it('the first deck should have 4 cards after 2 hits', function() {
      TestPlayer.hit()
      TestPlayer.hit()
      assert(TestPlayer.hands[0].length === 4);
    })
    it('should return false if the cards in the hand don\'t have the same suit', function() {
      assert(!TestPlayer.split());
    })
  })
  describe('Player betting and total functions', function() {
    it('should have a bet value of 10 after bet', function() {
      TestPlayer.makeBet(10);
      assert(TestPlayer.bet === 10);
    });
    it('should return an array of length 4 of all strings', function() {
      var total = TestPlayer.getTotal();
      assert.isArray(total);
      assert(total.length === 4);
    });
  })
  
  
});
