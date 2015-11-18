var game_area = $('<div>').attr('id', 'game-area');
var front = '';
var current_set = 'peace';
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
        card_back.append($('<img>').attr('src', 'images/war-and-peace.jpg'));
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
        for (var o = 0; o < self.new_array.length; o++) {
            self.new_array.push(self.new_array[o]);
        }
        var index;
        for (i = 0; i < self.new_array.length; i++) {
            index = Math.floor(Math.random() * self.new_array.length);
            self.new_array2.push(self.new_array[index]);
            self.new_array.splice(index, 1);
        }
        for (var t = 0; t < self.new_array2.length; t++) {
            var card = new CardConstructor(self.new_array2[t])
        }
        //copy the array
        //loop until the array is empty
        //pick a random element from the current array length
        //put that element into a new array
        //remove the same element from the old array
    };

    self.remove_half = function () {
        for (var o = 0; o < self.new_array2.length; o++) {
            for (var i = 0; i < self.new_array2.length; i++) {
                if (self.new_array2[o].artist === self.new_array2[i].artist) {
                    self.new_array2.splice(i, 1);
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
        var button_choice = $('<button>').addClass('btn').text('Peace');

        sidebar_wrapper.append(games_played, attempts, accuracy, reset_button, select);
        stat_container.append(sidebar_wrapper);
        container.append(stat_container);
        //stats area finished.
        container.append(game_area);

        complete_container.append(container);

        $('body').append(complete_container);
    };

    self.check_win = function () {
        if (self.matches === self.cards.length) {
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
function new_board(setName) {
    board = new Board_Constructor(card_sets[setName]);
    //board.create_board(game_area);
    board.randomize(card_sets[setName]);
}

$(document).ready(function () {
    new_board(current_set);
    $(".back").on('click', function () {
        var show = this;
        board.display_stats();
        if (front === '') {
            front = $(this).prev().find('img').attr('picture');
            for (var i = 0; i < board.new_array2.length; i++) {
                if (board.new_array2[i].artist === front) {
                    board.new_array2[i].clicked_false(show);
                }
            }
        } else {
            front = $(this).prev().find('img').attr('picture');
            for (var i = 0; i < board.new_array2.length; i++) {
                if (board.new_array2[i].artist === front) {
                    board.new_array2[i].click_check(show);
                }
            }
            front = '';
        }
        console.log(front);
        //loop through array to find the object containing this element.
    });
    $(".reset").click(function () {
        new_board(current_set);
        board.games_played++;
        board.reset_stats();
        board.display_stats();
    });

    $('.btn').on('click', function () {
        board.reset_stats();
        board.display_stats();
        if ($(this).text('Peace')) {
            current_set = 'war';
            //boardwar = new Board_Constructor(card_sets[current_set], 'War Theme');
            new_board(current_set);
            $(this).addClass('btn-danger').text('War');
        } else {
            current_set = 'peace';
            //boardwar = new Board_Constructor(card_sets[current_set], 'Peace Theme');
            new_board(current_set);
            $(this).addClass('btn-success').text('Peace');
        }
    });
    board.games_played = 0;
    board.reset_stats();
});
//get back from break, start appending the board.new_array[i] through a loop into the page.