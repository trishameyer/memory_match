var game_area = $('<div>').attr('id', 'game-area');
var front = '';
var current_set='peace';
var card_sets = {
    peace: ["michaeljackson", "thebeatles", "ladygaga", "pharrell",
        "atcq", "lanadelrey", "whitneyhouston", "drake", "edsheeran"],
    war: ['jasonbourne', 'jackreacher', 'eli', 'johnwick', 'taken',
        'alejandro', 'jamesbond', 'jaqen', 'omar']
};
{
    card_sets[current_set]
}
function CardConstructor(artist) {
    var self = this;
    self.artist = artist;
    self.clicked = false;
    make_card(artist);
    function make_card(artist) {
        console.log('make_card called');
        var card = $('<div>').addClass('card');
        var card_front = $('<div>').addClass('front');
        var card_back = $('<div>').addClass('back');
        card_back.append($('<img>').attr('src', 'images/musicnotes.jpg'));
        var cardFront = card_front.append($('<img>').attr('src', 'images/' + artist + '.jpg').attr("picture", artist));	//have a ton of cards with different images.
        var full_card = card.append(cardFront).append(card_back);
        game_area.append(full_card);
    };
    self.clicked_false = function (show_hide) {
        self.clicked = true;
        $(show_hide).hide().addClass('card_selected');
    };
    self.click_check = function (show_hide) {
        $(show_hide).hide().addClass('card_selected');
        if (self.clicked === true) {
            board.matches++;
            board.attempts++;
            board.check_win();
            $('.card_selected').removeClass('card_selected');
        } else {
            $('.card_selected').show(2000);
            self.clicked = false;
            board.attempts++;
        }
    };
    board.remove_half();

}

//ok keep it how it is, except make the card array twice as long and append from that (or run the loop to randomize twice). Then run a loop in the board object from the cards constructor to remove duplicates.
function Board_Constructor(array) {
    var self = this;
    var card_object_array = [];
    self.matches = 0;
    self.matches_counter = 0;
    self.attempts = 0;
    self.new_array = [];
    self.cards = array;
    self.accuracy = 0;
    self.new_array2 = [];

    self.randomize = function (array) { //now we have a new array posted in this.new_array.
        console.log('called');
        self.create_board(game_area);
        //self.new_array = array.slice(Math.floor(Math.random()*9));
        self.new_array = array.slice();
        for (var o = 0; o < self.new_array.length; o++){
            self.new_array.push(self.new_array[o]);
        }
        var index;
        for(i=0; i < self.new_array.length; i++){
            index = Math.floor(Math.random() * self.new_array.length);
            self.new_array2.push(self.new_array[index]);
            self.new_array.splice(index, 1);
        }
        for (var t = 0; t < self.new_array2.length; t++){
            var card = new CardConstructor(self.new_array2[t])
        }
        //copy the array
        //loop until the array is empty
        //pick a random element from the current array length
        //put that element into a new array
        //remove the same element from the old array
        //for (o = 0; o < 2; o++) {
        //    self.new_array = array.slice(Math.floor(Math.random()*9));
            //for (var i = array.length - 1; i > 0; i--) { //randomizes loaded array.
            //    var j = Math.floor(Math.random() * (i + 1));
            //    var temp = array[i];
            //    array[i] = array[j];
            //    array[j] = temp;
            //}
            //for (var t = 0; t < array.length; t++) { //gets done twice -> for card image array.
            //    self.new_array2.push(new CardConstructor(array[t]));
            //}
    };

    self.remove_half = function () {
        for (var o = 0; o < self.new_array2.length; o++) {
            for (var i = 0; i < self.new_array2.length; i++) {
                if (self.new_array2[o].artist ===self.new_array2[i].artist){
                    self.new_array2.splice(i,1);
                }
            }
        }
    };

    self.create_board = function (game_area, option) {
        console.log('create_board is called');
        var complete_container = $('<div>').addClass('container-fluid');
        //header
        var header = $('<div>').addClass('jumbotron');
        var logo = $('<img>').attr("src", "http://thumbs.dreamstime.com/x/music-logo-13731704.jpg");
        var h1 = $('<h1>').text(option);

        header.append(logo, h1);
        complete_container.append(header);

        //stats area
        var container = $('<div>').addClass('container-fluid not_header'); //STRICT STAT AREA.
        var stat_container = $('<div>').attr("id", "wrapper"); //INSIDE "STRICT STAT AREA"
        var sidebar_wrapper = $('<div>').attr("id", "sidebar-wrapper");

        var games_played = $('<div>').addClass('.games_played');

        var label = $('<p>').addClass('label');
        var gp_paragraph = $('<p>').addClass('games_played value');

        games_played.append(label.text('Games Played'), gp_paragraph);

        var attempts = $('<div>').addClass('attempts');
        var attempts_value = $('<p>').addClass('attempts value');

        attempts.append(label.text('Attempts'), attempts_value);

        var accuracy = $('<div>').addClass('accuracy');
        var accuracy_paragraph = $('<p>').addClass('accuracy');

        accuracy.append(label.text('Accuracy'), accuracy_paragraph);

        var reset_button = $('<button>').addClass('reset').text('reset Game');
        var button_peace = $('<button>').addClass('btn btn-success peace').text('Peace');
        var button_war = $('<button>').addClass('btn btn-danger war').text('War');

        sidebar_wrapper.append(games_played, attempts, accuracy, reset_button, 'button_'+option);
        stat_container.append(sidebar_wrapper);
        container.append(stat_container);
        //stats area finished.
        container.append(game_area);

        complete_container.append(container);

        $('body').append(complete_container);
    };

    self.check_win = function(){
        if (self.matches === self.cards.length){
            alert('you have won!');
        }
    };

    self.display_stats = function () {
        $(".games_played .value").text(self.games_played);
        $('.attempts .value').text(self.attempts);
        self.accuracy = Math.round((self.matches / self.attempts) * 100);
        if (isNaN(self.accuracy)) {
            self.accuracy = 0;
        }
        $('.accuracy .value').text(self.accuracy + '%');
    };

    self.reset_stats = function () {
        self.accuracy = 0;
        self.matches = 0;
        self.attempts = 0;
        self.display_stats();
        $('.back').show();
    };
}

function card_clicked(event) {
    $(this).hide().addClass('card_selected'); //could put $(this).toggleClass('someclass that affects css') instead.
    console.log('clicked');
    if (front === null) {
        front = $(this).prev().find('img').attr('picture');
        board.catch_from_array(front);
    } else {
        front = $(this).prev().find('img').attr('picture');
        var check_match = board.check_from_array(front);
        if (check_match) {
            board.matches_counter++;
            board.matches++;
            board.attempts++;
            console.log('match_counter is: ' + match_counter);
            front = null;
            $('.card_selected').removeClass('card_selected');
            console.log("class name: " + this.className);
            if (board.matches_counter === 9) {
                alert('You have won!');
                board.reset_stats();
            } else {
                return console.log('click handler functionality is complete - the first one');
            }
        }
        else {
            console.log('first_card_clicked != second_card_clicked');
            board.set_false(front);
            front = null;
            console.log('click handler functionality is complete - the second');
            board.attempts++;
            $('.card_selected').show(2000);
        }
    }
}

$(document).ready(function () {
    board = new Board_Constructor(card_sets[current_set]);
    //board.create_board(game_area);
    board.randomize(card_array_peace);
    $(".back").on('click', function () {
        var show = this;
        if (front === '') {
            front = $(this).prev().find('img').attr('picture');
            for (var i = 0; i < board.new_array2.length; i++) {
                if (board.new_array[i].artist === front) {
                    board.new_array[i].clicked_false(show);
                }
            }
        } else {
            front = $(this).prev().find('img').attr('picture');
            for (var i = 0; i < board.new_array2.length; i++) {
                if (board.new_array[i].artist === front) {
                    board.new_array[i].click_check(show);
                }
            }
            front = '';
        }
        console.log(front);
        //loop through array to find the object containing this element.
    });
    $(".back").click(board.display_stats());
    $(".reset").click(function () {
        board.games_played++;
        board.reset_stats();
        board.display_stats();
    });
    $('.war').on('click', function(){
        board.reset_stats();
        board.display_stats();
        boardwar = new Board_Constructor(card_array_war, peace);
        board.randomize(card_array_war);
    });
    $('.war').on('click', function(){
        board.reset_stats();
        board.display_stats();
        boardwar = new Board_Constructor(card_array_peace, war);
        board.randomize(card_array_peace);
    });
    board.games_played = 0;
    board.reset_stats();
});
//get back from break, start appending the board.new_array[i] through a loop into the page.