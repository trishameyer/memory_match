var game_area = $('<div>').attr('id', 'game-area');
var front = '';
//var current_set = 'war';
//var current_set = 'music';
//var card_set = {
//    music: ["michaeljackson", "thebeatles", "ladygaga", "pharrell",
//        "atcq", "lanadelrey", "whitneyhouston", "drake", "edsheeran"],
//
//    assassins: ['jasonbourne', 'jackreacher', 'eli', 'johnwick', 'taken',
//        'alejandro', 'jamesbond', 'jaqen', 'omar']
//};

var card_array = ["michaeljackson", "thebeatles", "ladygaga", "pharrell",
    "atcq", "lanadelrey", "whitneyhouston", "drake", "edsheeran"];

function CardConstructor(artist, number) {
    var self = this;
    self.artist = artist;
    self.clicked = false;
    self.index = number;
    self.domreference = '';
    self.back = null;
    make_card(artist, number);
    function make_card(artist, number) {
        console.log(artist);
        var card = $('<div>').addClass('card');
        var card_front = $('<div>').addClass('front');
        var card_back = $('<div>').addClass('back');
        card_back.append($('<img>').attr('src', 'images/musicnotes.jpg'));
        var cardFront = card_front.append($('<img>').attr({
            'src': 'images/' + artist + '.jpg',
            "picture": artist,
            'ind': number
        }));	//have a ton of cards with different images.
        var full_card = card.append(cardFront).append(card_back);
        // self.back = card_back;
        game_area.append(full_card);
    }
}

CardConstructor.prototype.clicked_false = function (jquery) {
    var self = this;
    console.log('getting called');
    //self.back.hide().addClass('card_selected');
    //this.find('.back').hide().addClass('card_selected');
    $(jquery).hide().addClass('card_selected');
    self.clicked = true;
    board.display_stats();
    console.log('click called');
};

CardConstructor.prototype.click_check = function (front, jquery) {
    var self = this;
    if (self.artist == front) {
        //matching condition.
        $(jquery).hide().addClass('card_selected');
        self.clicked = true; //????
        board.matches++;
        board.attempts++;
        board.check_win();
        $('.card_selected').removeClass('card_selected');
        console.log('first if');
    } else {
        var self = this;
        $(jquery).hide().addClass('card_selected');
        $('.card_selected').show(2000);
        self.clicked = false;
        board.attempts++;
        console.log('2nd if');
        board.check_win();
        for (var i = 0; i < board.final_array; i++) { //want to loop through and set both object's artist names to false.
            if (board.final_array[i][self.artist] === true) {
                board.final_array[i][self.artist] = false;
            }
        }
    }
    board.display_stats();
};

//since it's just one board object, should use object literal notation instead?
function Board_Constructor(array) {
    var self = this;
    self.matches = 0;
    self.matches_counter = 0;
    self.attempts = 0;
    self.new_array = [];
    self.cards = array;
    self.accuracy = 0;
    self.new_array2 = [];
    self.final_array = [];
}
//will change variable names for arrays.
Board_Constructor.prototype.randomize = function (array) {
    var self = this;
    self.create_board(game_area);

    self.new_array = array.slice();

    var super_array = self.new_array.concat(array);

    var index = '';
    var length = super_array.length;
    console.log('length of super array: ', super_array.length);
    for (i = 0; i < length; i++) {
        index = Math.floor(Math.random() * super_array.length);
        self.new_array2.push(super_array[index]);
        super_array.splice(index, 1);
    }
    length = self.new_array2.length;

    for (var t = 0; t < length; t++) {
        self.final_array.push(new CardConstructor(self.new_array2[t], t));
    }
};

Board_Constructor.prototype.create_board = function (game_area) {
    var self = this;
    console.log('create_board is called');
    var complete_container = $('<div>').addClass('container-fluid');
    //header
    var header = $('<div>').addClass('jumbotron');
    var logo = $('<img>').attr("src", "http://thumbs.dreamstime.com/x/music-logo-13731704.jpg");
    var h1 = $('<h1>').text('Music Theme');

    header.append(logo, h1);
    complete_container.append(header);

    //stats area
    var container = $('<div>').addClass('container-fluid not_header'); //STRICT STAT AREA.
    var stat_container = $('<div>').attr("id", "wrapper"); //INSIDE "STRICT STAT AREA"
    var sidebar_wrapper = $('<div>').attr("id", "sidebar-wrapper");

    var games_played = $('<div>').addClass('games_played');

    var label1 = $('<p>').addClass('label').text('Games Played');
    var gp_paragraph = $('<p>').addClass('games_played value');

    games_played.append(label1, gp_paragraph);

    var random_paragraph = $('<p>').addClass('value');

    var attempts = $('<div>').addClass('attempts');
    var label2 = $('<p>').addClass('label').text('Accuracy');
    var attempts_value = $('<p>').addClass('attempts value');

    attempts.append(label2, attempts_value);

    var accuracy = $('<div>').addClass('accuracy');
    //var label3 =  $('<p>').addClass('label').text('Accuracy');
    var accuracy_paragraph = $('<p>').addClass('accuracy');

    accuracy.append(accuracy_paragraph);

    var reset_button = $('<button>').addClass('reset').text('reset Game');
    var change_theme = $('<button>').addClass('btn btn-success ').text('Change Theme');

    sidebar_wrapper.append(games_played, random_paragraph, attempts, accuracy, reset_button, change_theme);
    stat_container.append(sidebar_wrapper);
    container.append(stat_container);
    //stats area finished.
    container.append(game_area);

    complete_container.append(container);

    $('body').append(complete_container);
};

Board_Constructor.prototype.check_win = function () {
    var self = this;
    if (self.matches === self.cards.length) {
        alert('you have won!');
        board.reset_stats();
    } else if (self.attempts === 10) {
        alert('you have lost');
        board.reset_stats();
    }
};

Board_Constructor.prototype.display_stats = function () {
    var self = this;
    $(".games_played .value").text(self.games_played);
    $('.attempts .value').text("attempts (you have 10) = " + self.attempts);
    self.accuracy = Math.round((self.matches / self.attempts) * 100);
    if (isNaN(self.accuracy)) {
        self.accuracy = 0;
    }
    $('.accuracy .value').text("Accuracy " + self.accuracy + '%');
};

Board_Constructor.prototype.reset_stats = function () {
    var self = this;
    self.accuracy = 0;
    self.matches = 0;
    self.attempts = 0;
    self.display_stats();
    $('.back').show();
};

function new_board(array) {
    board = new Board_Constructor(array);
    //board.create_board(game_area);
    board.randomize(array);
}

$(document).ready(function () {
    new_board(card_array);
    console.log('original is called');
    $(".back").on('click', function () {
        //$(this).hide().addClass('card_selected');
        if (front === '') {
            front = $(this).prev().find('img').attr('picture');
            console.log(front);
            var index = $(this).prev().find('img').attr('ind');
            console.log(index);
            for (var i = 0; i < board.final_array.length; i++) {
                if (board.final_array[i].index == index) {
                    board.final_array[i].clicked_false(this);
                }
            }
        } else {
            //front = $(this).prev().find('img').attr('picture');
            var index = $(this).prev().find('img').attr('ind');
            console.log(front, index);
            for (var o = 0; o < board.final_array.length; o++) {
                if (board.final_array[o].index == index && board.final_array[o].clicked !== true) {
                    board.final_array[o].click_check(front, this);
                }
            }
            front = '';
        }
        //loop through array to find the object containing this element.
    });
    $(".reset").click(function () {
        board.games_played++;
        board.reset_stats();
        board.display_stats();
    });
    //$('.btn').on('click', function () {
    //    document.body.innerHTML = '';
    //    current_set = 'assassins';
    //    new_board(card_set[current_set])
    //});

    board.games_played = 0;
    board.reset_stats();
});
//get back from break, start appending the board.new_array[i] through a loop into the page.