var card = $('<div>').addClass('card');
var card_front = $('<div>').addClass('front');
var card_back = $('<div>').addClass('back');

card_front.append($('<img>').attr('src', 'images/musicnotes.jpg');

var full_card = card.append(card_front).append(card_back);
//array of CARDS not just images, find a way to append them.
for (i = 0; i < 2*board.cards.length; i++){
    var cardBack = card_back.append($('<img>').attr('src',board.randomize(board.cards));	//have a ton of cards with different images.
    var full_card = card.append(card_front).append(cardBack);
}



var card_array = ["images/michaeljackson.jpg", "images/thebeatles.jpg", "images/ladygaga.jpg", "images/pharrell.jpg", "images/atcq.jpg", "images/lanadelrey.jpg", "images/whitneyhouston.jpg", "images/drake.jpg", "images/edsheeran.jpg"]


//loop to make cards (also impelment random in);

//start working on object with arrays so you can append those images into cards.

var board = new Board_Constructor(card_array); //can have separate arrays of cards, and depending on which one is clicked, use that array.

function Board_Constructor(array) {
    var self = this;
    this.new_array = [];
    this.cards = array;
    this.newArray = this.randomize(array);
    this.randomize = function (array) { //now we have a new array posted in this.new_array.
        for (o = 0; o < 2; o++) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            for (var t = 0;t < array.length; t++) {
                this.new_array[t] = array[t];
            }
        }
    }
}

//get back from break, start appending the board.new_array[i] through a loop into the page.

