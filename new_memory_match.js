var card = $('<div>').addClass('card');
var card_front = $('<div>').addClass('front');
var card_back = $('<div>').addClass('back');
var game_area = $('<div>').attr('id', 'game-area');
var card_array = ["michaeljackson", "thebeatles", "ladygaga", "pharrell",
    "atcq", "lanadelrey", "whitneyhouston", "drake", "edsheeran"];
var card_object_array = [];
var front = '';

//************************************APPENDING STUFF************************************//
var container = $('<div>').addClass('container-fluid not_header');
var stat_container = $('<div>').attr("id","wrapper");
var sidebar_wrapper = $('<div>').attr("id","sidebar-wrapper");
var games_played = $('<div>').addClass('.games_played');
var label = $('<p>').addClass('label');
var gp_paragraph = $('<p>').addClass('games_played value');
var complete_container = $('<div>').addClass('container-fluid');
var header = $('<div>').addClass(jumobtron);
var logo = $*('<img>').attr("src","http://thumbs.dreamstime.com/x/music-logo-13731704.jpg");

complete_container.append(logo);

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

header.append(logo);
complete_container.append(header);

sidebar_wrapper.append(games_played);
sidebar_wrapper.append(random_paragraph);
sidebar_wrapper.append(attempts);
sidebar_wrapper.append(accuracy);
sidebar_wrapper.append(reset_button);
stat_container.append(sidebar_wrapper);
container.append(stat_container);
complete_container.append(container);

//array of CARDS not just images, find a way to append them.
card_front.append($('<img>').attr('src', 'images/musicnotes.jpg');
for (i = 0; i < board.cards.length; i++){
    var cardBack = card_back.append($('<img>').attr('src','images/' + board.new_array[i]) + '.jpg',"picture", board.new_array[i]);	//have a ton of cards with different images.
    var full_card = card.append(card_front).append(cardBack);
    game_area.append(full_card);
}

complete_container.append(game_area);
$('body').append(complete_container);
//******************************************************

var board = new Board_Constructor(card_array); //can have separate arrays of cards, and depending on which one is clicked, use that array.

function Board_Constructor(array) {
    var self = this;
    self.matches = 0;
    self.matches_counter = 0;
    self.attempts = 0;
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
    self.matches = 0;
    self.matches_counter = 0;
}

for (i=0; i < board.new_array.length;i++){
    var cards_object = new CardConstructor(board.new_array[i]);
    card_object_array.push(cards_object);
}
function CardConstructor(artist,clicked){
    this.artist = artist;
    this.clicked = false;
    this.first_click = function(clicked_name){
        for(i=0; i < board.new_array.length; i++){
            if (clicked_name === card_object_array[i].artist) {
                card_object_array.splice(i);
            }
        }
    }
}

$( document ).ready(function() {
    $(".back").click(card_clicked);
    //$(".back").on('click',function(){ FOR PROJECT -> PENDING.
    //
    //});
    $(".back").click(display_stats);
    $(".reset").click(function() {
        games_played++;
        reset_stats();
        display_stats();
    });
    games_played = 0;
    reset_stats();
});

function catch_from_array(front){
    for(i=0;i < card_object_array.length;i++){
        if (front === card_object_array[i].artist){
            card_object_array[i].clicked = true;
            //card_object_array.splice(i);
            break;
        }
    }
}

function check_from_array(front){
    for(i=0;i < card_object_array.length;i++){
        if (front === card_object_array[i].artist){
            if (card_object_array[i].clicked === true){
               return true;
            }
        }
    }
    return false;
}

function card_clicked(event) {
    $(this).hide().addClass('card_selected'); //could put $(this).toggleClass('someclass that affects css') instead.
    console.log('clicked');
    if (front === null) {
        //first_card_clicked = $(this).prev().find('img').attr('src');
        front = $(this).prev().find('img').attr('picture');
        catch_from_array(front);
        //redo this to call that method. FOR PROJECT.
    } else {
        //second_card_clicked = $(this).prev().find('img').attr('src');
        front = $(this).prev().find('img').attr('picture');
        var check_match = check_from_array(front);
        if (check_match) {
            board.matches_counter++;
            board.matches++;
            board.attempts++;
            console.log('match_counter is: ' + match_counter);
            front = null;
            $('.card_selected').removeClass('card_selected');
            console.log("class name: "+ this.className);
            if (match_counter === total_possible_matches) {
                alert('You have won!');
                reset_stats();
            } else {
                return console.log('click handler functionality is complete - the first one');
            }
        }
        else {
            console.log('first_card_clicked != second_card_clicked');
            first_card_clicked = null;
            second_card_clicked = null;
            console.log('click handler functionality is complete - the second');
            attempts++;
            $('.card_selected').show(2000);
        }
    }
}

//get back from break, start appending the board.new_array[i] through a loop into the page.

