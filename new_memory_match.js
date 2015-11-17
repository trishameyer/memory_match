//var card = $('<div>').addClass('card');
//var card_front = $('<div>').addClass('front');
//var card_back = $('<div>').addClass('back');
var game_area = $('<div>').attr('id', 'game-area');
var front = '';

//************************************APPENDING STUFF-STAT SECTION************************************//
//var container = $('<div>').addClass('container-fluid not_header'); //STRICT STAT AREA.
//var stat_container = $('<div>').attr("id", "wrapper"); //INSIDE "STRICT STAT AREA"
//var sidebar_wrapper = $('<div>').attr("id", "sidebar-wrapper");
//var games_played = $('<div>').addClass('.games_played');
//var label = $('<p>').addClass('label');
//var gp_paragraph = $('<p>').addClass('games_played value');
//var complete_container = $('<div>').addClass('container-fluid');
//var header = $('<div>').addClass('jumbotron');
//var logo = $('<img>').attr("src", "http://thumbs.dreamstime.com/x/music-logo-13731704.jpg");
//var h1 = $('<h1>').text('Music Theme');


//games_played.append(label).text('Games Played');
//games_played.append(gp_paragraph);


//var random_paragraph = $('<p>').addClass('value');

//var attempts = $('<div>').addClass('attempts');
//var attempts_value = $('<p>').addClass('attempts value');

//attempts.append(label).text('Attempts');
//attempts.append(attempts_value);

//var accuracy = $('<div>').addClass('accuracy');
//var accuracy_paragraph = $('<p>').addClass('accuracy');

//accuracy.append(label).text('Accuracy');
//accuracy.append(accuracy_paragraph);

//var reset_button = $('<button>').addClass('reset').text('reset Game');

//header.append(logo, h1);
//complete_container.append(header);

//sidebar_wrapper.append(games_played);
//sidebar_wrapper.append(random_paragraph);
//sidebar_wrapper.append(attempts);
//sidebar_wrapper.append(accuracy);
//sidebar_wrapper.append(reset_button);
//stat_container.append(sidebar_wrapper);
//container.append(stat_container);
//complete_container.append(container);

                //array of CARDS not just images, find a way to append them.
                //card_front.append($('<img>').attr('src', 'images/musicnotes.jpg');
                //for (i = 0; i < board.new_array.length; i++) {
                //    var cardBack = card_back.append($('<img>').attr('src', 'images/' + board.new_array[i]) + '.jpg', "picture", board.new_array[i]);	//have a ton of cards with different images.
                //    var full_card = card.append(card_front).append(cardBack);
                //    game_area.append(full_card);
                //}

//complete_container.append(game_area);
//$('body').append(complete_container);
//******************************************************
var card_array = ["michaeljackson", "thebeatles", "ladygaga", "pharrell",
    "atcq", "lanadelrey", "whitneyhouston", "drake", "edsheeran"];

    //can have separate arrays of cards, and depending on which one is clicked, use that array.



//this array needs to only be 9 elements.
//for (i = 0; i < board.new_array.length; i++) { //do we need this anymore? board.randomize does this.
//    var cards_object = new CardConstructor(board.new_array[i]);
//    card_object_array.push(cards_object);
}
function CardConstructor(artist) {
    var self = this;
    self.artist = artist;
    self.clicked = false;
    //this.first_click = function (clicked_name) {
    //    for (i = 0; i < board.new_array.length; i++) {
    //        if (clicked_name === card_object_array[i].artist) {
    //            card_object_array.splice(i);
    //        }
    //    }
    //}
    self.make_card = function (attrInfo){
        var card = $('<div>').addClass('card');
        var card_front = $('<div>').addClass('front');
        var card_back = $('<div>').addClass('back');
        card_front.append($('<img>').attr('src', 'images/musicnotes.jpg'));
        var cardBack = card_back.append($('<img>').attr('src',attrInfo));	//have a ton of cards with different images.
        var full_card = card.append(cardBack).append(card_front);
        game_area.append(full_card);

        //board.create_board(game_area);
    };

    self.card_clicked = function (event){


};
    //SOMETHING LIKE THIS NEEDS TO GO INTO MAKE CARD, BUT NOT LOOPED. ANOTHER LOOP WILL CALL IT.
    //for (i = 0; i < board.new_array.length; i++) {
    //    card_front.append($('<img>').attr('src', 'images/musicnotes.jpg'));
       //var cardBack = card_back.append($('<img>').attr('src', 'images/' + board.new_array[i]) + '.jpg', "picture", board.new_array[i]);	//have a ton of cards with different images.
    //    var full_card = card.append(cardBack).append(card_front);
    //    game_area.append(full_card);
    //}
    //board.create_board(game_area);

$(document).ready(function () {
    board = new Board_Constructor(card_array);
    $(".back").click(card_clicked);
    //$(".back").on('click',function(){ FOR PROJECT -> PENDING.
    //
    //});
    $(".back").click(display_stats);
    $(".reset").click(function () {
        games_played++;
        reset_stats();
        display_stats();
    });
    board.games_played = 0;
    board.reset_stats();
});


function card_clicked(event) {
    $(this).hide().addClass('card_selected'); //could put $(this).toggleClass('someclass that affects css') instead.
    console.log('clicked');
    if (front === null) {
        //first_card_clicked = $(this).prev().find('img').attr('src');
        front = $(this).prev().find('img').attr('picture');
        board.catch_from_array(front);
        //redo this to call that method. FOR PROJECT.
    } else {
        //second_card_clicked = $(this).prev().find('img').attr('src');
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
                reset_stats();
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

function Board_Constructor(array) {
    var self = this;
    var card_object_array = [];
    self.matches = 0;
    self.matches_counter = 0;
    self.attempts = 0;
    self.new_array = [];
    self.cards = array;
    self.objects_array = [];
    self.accuracy = 0;

    function randomize(array) { //now we have a new array posted in this.new_array.
        for (o = 0; o < 2; o++) {
            for (var i = array.length - 1; i > 0; i--) { //randomizes loaded array.
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            if (self.objects_array.length < 1) { //makes an array for win condition check.
                for (var object_array = 0; object_array < array.length; object_array++) {
                    self.objects_array.push(new CardConstructor(array[object_array])); //MAY USE THIS INSTEAD.
                }
            }
            for (var t = 0; t < array.length; t++) { //gets done twice -> for card image array.
                self.new_array[t] = array[t];
            }
        }
    }

    //AFTER RANDOMIZE IS CALLED, WE SHOULD HAVE ARRAYS TO WORK WITH.

    self.catch_from_array = function (front) {
        for (i = 0; i < self.card_object_array.length; i++) {
            if (front === self.card_object_array[i].artist) {
                self.card_object_array[i].clicked = true;
                //card_object_array.splice(i);
                break;
            }
        }
    };

    self.check_from_array = function (front) {
        for (i = 0; i < self.card_object_array.length; i++) {
            if (front === self.card_object_array[i].artist) {
                if (self.card_object_array[i].clicked === true) {
                    return true;
                }
            }
        }
        return false;
    };

    self.set_false = function (front) {
        for (i = 0; i < self.card_object_array.length; i++) {
            if (front === self.card_object_array[i].artist) {
                self.card_object_array[i].clicked = false;
            }
        }
    };
    self.create_board = function(game_area) {
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

        var games_played = $('<div>').addClass('.games_played');

        var label = $('<p>').addClass('label');
        var gp_paragraph = $('<p>').addClass('games_played value');

        games_played.append(label.text('Games Played'),gp_paragraph);

        var attempts = $('<div>').addClass('attempts');
        var attempts_value = $('<p>').addClass('attempts value');

        attempts.append(label.text('Attempts'),attempts_value);

        var accuracy = $('<div>').addClass('accuracy');
        var accuracy_paragraph = $('<p>').addClass('accuracy');

        accuracy.append(label.text('Accuracy'), accuracy_paragraph);

        var reset_button = $('<button>').addClass('reset').text('reset Game');

        sidebar_wrapper.append(games_played, attempts, accuracy, reset_button);
        stat_container.append(sidebar_wrapper);
        container.append(stat_container);
        complete_container.append(container);

        var image_attribute = function(){
            for (i = 0; i < board.new_array.length; i++)
                var string = ('images/' + self.new_array[i] + '.jpg', "picture", self.new_array[i]).toString();

        };
        complete_container.append(game_area);

        $('body').append(complete_container);
    };

    self.display_stats = function () {
        $(".games_played .value").text(self.games_played);
        $('.attempts .value').text(self.attempts);
        self.accuracy = Math.round((self.matches/self.attempts) * 100);
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

//get back from break, start appending the board.new_array[i] through a loop into the page.