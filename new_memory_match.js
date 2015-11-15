var card = $('<div>').addClass('card');
var card_front = $('<div>').addClass('front');
var card_back = $('<div>').addClass('back');
var game_area = $('<div>').attr('id', 'game-area');
var card_array = ["images/michaeljackson.jpg", "images/thebeatles.jpg", "images/ladygaga.jpg", "images/pharrell.jpg",
    "images/atcq.jpg", "images/lanadelrey.jpg", "images/whitneyhouston.jpg", "images/drake.jpg", "images/edsheeran.jpg"];

//************************************APPENDING STUFF************************************//
var container = $('<div>').addClass('container-fluid');
var stats_container = $('<div>').attr("id","wrapper");
var sidebar_wrapper = $('<div>').attr("id","sidebar-wrapper");
var games_played = $('<div>').addClass('.games_played');
var label = $('<p>').addClass('label');
var gp_paragraph = $('<p>').addClass('games_played value');

games_played.append(label).text('Games Played');
games_played.append(gp_paragraph);


var random_paragraph = $('<p>').addClass('value');

var attempts = $('<div>').addClass('attempts');
var attempts_value = $('<p>').addClass('attempts value');

attempts.append(label).text('Attempts');
attempts.append(attempts_value);

var accuracy = $('<div>').addClass('accuracy');
var accuracy_paragraph = $('<p>').addClass('accuracy');

accuracy.append(label).text('Accuracy');
accuracy.append(accuracy_paragraph);

var reset_button = $('<button>').addClass('reset').text('reset Game');

sidebar_wrapper.append(games_played);
sidebar_wrapper.append(random_paragraph);
sidebar_wrapper.append(attempts);
sidebar_wrapper.append(accuracy);
sidebar_wrapper.append(reset_button);

//array of CARDS not just images, find a way to append them.
card_front.append($('<img>').attr('src', 'images/musicnotes.jpg');
for (i = 0; i < board.cards.length; i++){
    var cardBack = card_back.append($('<img>').attr('src',board.new_array[i]);	//have a ton of cards with different images.
    var full_card = card.append(card_front).append(cardBack);
    game_area.append(full_card);
}
//******************************************************

var board = new Board_Constructor(card_array); //can have separate arrays of cards, and depending on which one is clicked, use that array.

function Board_Constructor(array) {
    var self = this;
    self.new_array = [];
    self.cards = array;
    self.newArray = this.randomize(array);
    self.randomize = function (array) { //now we have a new array posted in this.new_array.
        for (o = 0; o < 2; o++) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            for (var t = 0;t < array.length; t++) {
                self.new_array[t] = array[t];
            }
        }
    }
}

//get back from break, start appending the board.new_array[i] through a loop into the page.

