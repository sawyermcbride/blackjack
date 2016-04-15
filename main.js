/**
 * Backjack By Mastered Games: July 2015
 *
 * Sawyer McBride
 *
 * sawyer@masteredgames.com
 *
 */


"use strict";

    var player = {
        hands:[
            
        ],
        init:function(){
            this.setDom();
            this.bindEvents();
        },
        //sets properties to dom elements for reference 
        setDom:function(){
            this.$controls = $('#controls');
            this.$buttons = this.$controls.find('input[type=button]');
            this.$deal = this.$controls.find('#deal-button')
            this.$stay = this.$controls.find('#stay-button')
            this.$dbl = this.$controls.find('#dbl-button')
            this.$split = this.$controls.find('#split-button')
            this.$hit = this.$controls.find('#hit-button')
        },
        //binds events to handlers
        bindEvents:function(){
            this.$buttons.on('mouseover',this.over);
            this.$buttons.on('mouseout',this.out);
					//Function expression invokes function instantly, place calling function with parameters inside a ananymous function callback 
            this.$deal.on('click',this.deal.bind(this));
            this.$hit.on('click',this.hit.bind(this));
        },
        //handles fade in/out of hover of buttons
        over:function(){
            $(this).stop(true,true);
            $(this).fadeTo(289,.6);
        },
        out:function(){
            $(this).stop(true,true);
            $(this).fadeTo(289,1);
        },
        deal:function(){
            this.MakeHand();
            this.hit.call(this.hands[0])
            this.hit.call(this.hands[0])
        },
        //append new hand to hands
        MakeHand:function(){
            this.hands.push([]);
        },
        //appends card to player deck
        hit:function(){
            this.push(deck.pick());
        },
        total:function(){
            var self = this;
            alert(this);
            var total = 0;
            for(var i = 0;i<this.length;i++){
                if(this[i].ace) this[i].ace=11;
            }
            //ternary operator for adding to total
            // self keeps context on original caller array
            var getTotal = function(){
                total = 0;
                for(var i = 0;i<self.length;i++){
                 self[i].ace ? 
                 total+=parseInt(self[i].ace): isNaN(self[i].rank) ? total+=10 : total+=parseInt(self[i].rank);
                }
                return total;
            }
            //temp variable for storage. 
            var fTotal = getTotal();
            for(var i = 0;i<this.length;i++){
                if(this[i].ace&&fTotal>21){
                    this[i].ace='1';
                }
            }
            return getTotal();
        }
        
    };//player object

    var deck = {
        init:function(){
            this.shuffle();
            this.render();
        },
        suits:['c', 'd',
               'h', 's'],
        ranks:['2', '3', '4', '5', '6', '7',
               '8', '9', 'J', 'Q', 'K', 'A'],
        cards:[],
        shuffle:function(){
            for(var x = 0;x<this.suits.length;x++){
                for(var j = 0;j<this.ranks.length;j++){
                    if(this.suits[x]=='d'||this.suits[x]=='h'){
                        if(this.ranks[j]=='A'){
                            this.cards.push(this.NewCard(this.suits[x],this.ranks[j],'red','1'));
                        }else{
                            this.cards.push(this.NewCard(this.suits[x],this.ranks[j],'red'));
                        }
                    }else{
                        if(this.ranks[j]=='A'){
                            this.cards.push(this.NewCard(this.suits[x],this.ranks[j],'black','1'));
                        }else{
                            this.cards.push(this.NewCard(this.suits[x],this.ranks[j],'black'));
                        }                    
                    }
                }
            }  
        },
        NewCard:function(suit,rank,color,ace){
            return{
                suit:suit,
                rank:rank,
                color:color,
                ace:ace
            };
        },
        pick:function(){
            var rand = Math.floor(Math.random()*(this.cards.length));
            var card = this.cards[rand];
            this.cards.splice(rand,1);
            this.render();
            if(card)return card; 
        },
        getImage:function(){
            var suit = suitName;
            var src = "";
            
            switch(suit){
                case('c'):
                    src='images/clubs.png';
                    break;
                case('d'):
                    src='images/diamonds.png';
                    break;
                case('h'):
                    src='images/hearts.png';
                    break;
                case('s'):
                    src='images/Spades.png';
                    break;
            }
            return src;
        },
        render:function(){
            var x = 10;
            var y = 10;
            
            var _deck = $('#deck');
            //emptys deck container div
            _deck.empty();
            //loops through cards to draw deck
            for(var i = 0;i<this.cards.length;i++){
                console.log(i);
                var div = $('<div></div>');
                div.addClass('deck-card');
                div.css('left',x+'px');
                div.css('top',y+'px');
                div.appendTo(_deck);
                x+=1.5;
                y+=1.5;
            }
        },
    }
    window.onload = function(){
		player.init();
		deck.init();
	};


    


    
    

