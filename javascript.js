var game_area = $('<div>').attr('id', 'game-area');
var front = '';
var current_set = 'war';
var card_array = ["michaeljackson", "thebeatles", "ladygaga", "pharrell",
    "atcq", "lanadelrey", "whitneyhouston", "drake", "edsheeran"];
//    war: ['jasonbourne', 'jackreacher', 'eli', 'johnwick', 'taken',
//        'alejandro', 'jamesbond', 'jaqen', 'omar']
//};
//{
//    card_sets[current_set]
//}
function CardConstructor(artist, number) {
    var self = this;
    self.artist = artist;
    self.clicked = false;
    self.index = number;
    self.domreference = '';
    self.back = null;
    make_card(artist);
    function make_card(artist, number) {
        console.log(artist);
        var card = $('<div>').addClass('card');
        var card_front = $('<div>').addClass('front');
        var card_back = $('<div>').addClass('back');
        var card_back_image = card_back.append($('<img>').attr('src', 'images/musicnotes.jpg'));
        var cardFront = card_front.append($('<img>').attr('src', 'images/' + artist + '.jpg').attr({"picture": artist, 'ind': number}));	//have a ton of cards with different images.
        var full_card = card.append(cardFront).append(card_back_image);
        self.domreference = full_card;
        game_area.append(full_card);
        self.back = card_back_image;
    };

    self.clicked_false = function (click) {
        //self.back.hide().addClass('card_selected');
        self.domreference.find('.front').prev().hide().addClass('card_selected');
        self.clicked = true;
        board.display_stats();
        console.log('click called');
    };

    self.click_check = function (front) {
        if (self.clicked === false && self.artist === front) {
            //matching condition.
            self.back.hide().addClass('card_selected');
            self.clicked = true; //????
            board.matches++;
            board.attempts++;
            board.check_win();
            $('.card_selected').removeClass('card_selected');
        } else if (self.clicked === true && self.artist === front) {
            alert('select another card');
        } else if (self.artist !== front) {
            self.back.hide().addClass('card_selected');
            $('.card_selected').show(2000);
            self.clicked = false;
            board.attempts++;
            board.check_win();
            for (var i = 0; i < board.final_array; i++) { //want to loop through and set both object's artist names to false.
                if (board.final_array[i][self.artist] === true) {
                    board.final_array[i][self.artist] = false;
                }
            }
        }
        board.display_stats();
    };

}

//ok keep it how it is, except make the card array twice as long and append from that (or run the loop to randomize twice). Then run a loop in the board object from the cards constructor to remove duplicates.
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

    self.randomize = function (array) { //now we have a new array posted in this.new_array.
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

    self.create_board = function (game_area) {
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

        sidebar_wrapper.append(games_played, random_paragraph, attempts, accuracy, reset_button);
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
        } else if(self.attempts > 10){
            alert('you have lost');
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
function new_board(array) {
    board = new Board_Constructor(array);
    //board.create_board(game_area);
    board.randomize(array);
}

$(document).ready(function () {
    new_board(card_array);
    $(".back").on('click', function () {
        //$(this).hide().addClass('card_selected');
        if (front === '') {
            front = $(this).prev().find('img').attr('picture');
            console.log(front);
            var index = $(this).prev().find('img').attr('ind');
            console.log(index);
            for (var i = 0; i < board.final_array.length; i++) {
                if (board.final_array[i].index === index) {
                    board.final_array[i].clicked_false(this);
                }
            }
        } else {
            front = $(this).prev().find('img').attr('picture');
            var index = $(this).prev().attr('ind');
            for (var o = 0; o < board.final_array.length; o++) {
                if (board.final_array[o].index === index) {
                    board.final_array[o].click_check(front, index);
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
    //
    //$('.btn').on('click', function () {
    //    board.reset_stats();
    //    board.display_stats();
    //    if ($(this).text('Peace')) {
    //        current_set = 'war';
    //        //boardwar = new Board_Constructor(card_sets[current_set], 'War Theme');
    //        //how to clear board to append to new below:
    //        board = {};
    //        delete board;
    //        document.body.innerHTML = ""; //erases stats, need to fix, not enough time.
    //        new_board(current_set);
    //        $(this).text('War');
    //    } else {
    //        current_set = 'peace';
    //        //boardwar = new Board_Constructor(card_sets[current_set], 'Peace Theme');
    //        board = {};
    //        delete board;
    //        document.body.innerHTML = ""; //erases stats, need to fix, not enough time.
    //        new_board(current_set);
    //        $(this).text('Peace');
    //
    //    }
    //});
    board.games_played = 0;
    board.reset_stats();
});
//get back from break, start appending the board.new_array[i] through a loop into the page.