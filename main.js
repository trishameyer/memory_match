/** Memory Match - created by Lance **/
/* To add :
randomize
    - save all card info (img src) into an array
    - populate to DOMs
    - adv. functionalities > get file names (ff_xxxx) and populate to the array
update visuals
    - stat boxes
    - blast beam behind cards
    - winning event > show img slides? moving images? (check game ending)
        > scroll stat numbers, play video?
    - moving starry background?
 */


//var first_card_clicked = null;
//var second_card_clicked = null;
var total_possible_matches = 9;
// var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var cards_array = ["images/ff_Ballade.jpg","images/ff_CutMan.jpg","images/ff_Enker.jpg","images/ff_GutsMan.jpg",
    "images/ff_Punk.jpg","images/ff_QuickMan.jpg","images/ff_Quint.jpg","images/ff_Shadowman.jpg","images/ff_Skullman.jpg"];

$(document).ready(function(){
    $("#game-area").on("click", ".card", function() {
        play(this);
    });
    $("#select-level button").click(function() {
        var level = $(this).attr("id");
        game_board.total_cards(level);
        game_board.randomize_cards();
        game_board.populate_cards();
    });
});

var game_board = {
    total_cards: function(level) {
        if (level == 18) {
            cards_array = cards_array.concat(cards_array);
        }
        else if (level == 36) {
            cards_array = cards_array.concat(cards_array);
            cards_array = cards_array.concat(cards_array);
        }
    },
    randomize_cards: function() {
        var curr_index = cards_array.length;
        var temp_value, rand_index;
        while (0 !== curr_index) {
            rand_index = Math.floor(Math.random() * curr_index);
            curr_index -= 1;
            temp_value = cards_array[curr_index];
            cards_array[curr_index] = cards_array[rand_index];
            cards_array[rand_index] = temp_value;
        }
        console.log(cards_array);
        console.log(cards_array.length);
    },
    populate_cards: function() {
        for (var i=0; i < cards_array.length; i++) {
            var img_front = $("<img>").attr("src", cards_array[i]);
            var div_front = $("<div class='front'>").append(img_front);
            var img_back = $("<img>").attr("src", "images/MegaMan-back2.jpg");
            var div_back = $("<div class='back'>").append(img_back);
            var div_card = $("<div class='card'>").append(div_front, div_back);
            $("#game-area").append(div_card);
        }
    }
};


var cards = {
    first_card_clicked: false,
    second_card_clicked: false,
    first_card: "",
    second_card: "",
    show_front: function(the_card) {
        $(the_card).find(".back").hide();
    },
    show_back: function(card1, card2) {
        $(card1).find(".back").show();
        $(card2).find(".back").show();
    },
    reset_first_second: function() {
        cards.first_card_clicked = false;
        cards.second_card_clicked = false;
        cards.first_card = "";
        cards.second_card = "";
    }
};


var matches = {
    match_counter: 0,
    a_match: false,
    match_check: function(card1, card2) {
        var img1 = $(card1).find(".front img").attr("src");
        var img2 = $(card2).find(".front img").attr("src");
        console.log(img1);
        console.log(img2);
        if (img1 === img2) {
            matches.match_counter++;
            console.log("counter ", matches.match_counter);
            matches.a_match = true;
            matches.win_check();
        }
        else {
            console.log("counter ", matches.match_counter);
            matches.a_match = false;
        }
    },
    win_check: function() {
        if (matches.match_counter === total_possible_matches) {
            console.log("WIN");
        }
    }
};


var play = function(the_card) {

    if (!cards.first_card_clicked) {
        cards.first_card_clicked = true;
        cards.first_card = the_card;
        cards.show_front(the_card);
        console.log(cards.first_card);
    }
    else if (!cards.second_card_clicked) {
        cards.second_card_clicked = true;
        cards.second_card = the_card;
        cards.show_front(the_card);
        console.log(cards.second_card);

        matches.match_check(cards.first_card, cards.second_card);

        if (!matches.a_match) {
            cards.show_back(cards.first_card, cards.second_card);
            cards.reset_first_second();
        }
        else {
            cards.reset_first_second();
        }
    }

};


function display_stats(){

    $(".attempts .value").text(attempts);

    // calculate accuracy
    accuracy = Math.floor((matches / attempts) * 100);
    // if accuracy is NaN, set it to blank
    if (isNaN(accuracy)) {
        $(".accuracy .value").text("");
    }
    else {
        $(".accuracy .value").text(accuracy + "%");
    }

    $(".games-played .value").text(games_played + " times");

}


function reset_stats(){

    matches = 0;
    attempts = 0;
    games_played++;
    display_stats();
    $(".card .back").show();
    $("#img_win").hide();

}




