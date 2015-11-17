/** Memory Match - created by Lance **/

var cards_array = ["images/ff_Ballade.jpg","images/ff_CutMan.jpg","images/ff_Enker.jpg","images/ff_GutsMan.jpg",
    "images/ff_Punk.jpg","images/ff_QuickMan.jpg","images/ff_Quint.jpg","images/ff_Shadowman.jpg","images/ff_Skullman.jpg"];

$(document).ready(function(){
    $("#game-area").on("click", ".card", function() {
        play(this);
    });
    $("#select-level button").click(function() {
        game_board.hide_select_level();
        var level = $(this).attr("id");
        game_board.total_cards(level);
        game_board.randomize_cards();
        game_board.populate_cards();
        stats.update_games_played();
    });
    $(".reset").on("click", function() {
        game_board.reset_board();
        cards.reset_first_second();
        stats.reset_stats();
    })
});


var game_board = {
    new_deck: [],
    total_cards: function(level) {
        game_board.new_deck = cards_array;
        if (level == 18) {
            game_board.new_deck = cards_array.concat(cards_array);
            matches.total_match = (level / 2);
        }
        else if (level == 36) {
            game_board.new_deck = cards_array.concat(cards_array);
            game_board.new_deck = game_board.new_deck.concat(game_board.new_deck);
            matches.total_match = (level / 2);
        }
    },
    randomize_cards: function() {
        var curr_index = game_board.new_deck.length;
        var temp_value, rand_index;
        while (0 !== curr_index) {
            rand_index = Math.floor(Math.random() * curr_index);
            curr_index -= 1;
            temp_value = game_board.new_deck[curr_index];
            game_board.new_deck[curr_index] = game_board.new_deck[rand_index];
            game_board.new_deck[rand_index] = temp_value;
        }
    },
    populate_cards: function() {
        for (var i=0; i < game_board.new_deck.length; i++) {
            var img_front = $("<img>").attr("src", game_board.new_deck[i]);
            var div_front = $("<div class='front'>").append(img_front);
            var img_back = $("<img>").attr("src", "images/MegaMan-back2.jpg");
            var div_back = $("<div class='back'>").append(img_back);
            var div_card = $("<div class='card'>").append(div_front, div_back);
            $("#game-area").append(div_card);
        }
    },
    reset_board: function() {
        $("#game-area").empty();
        game_board.new_deck = [];
        matches.match_counter = 0;
        matches.total_match = 0;
        matches.a_match = false;
        game_board.show_select_level();
    },
    hide_select_level: function() {
    $("#select-level").css("visibility", "hidden");
    },
    show_select_level: function() {
        $("#select-level").css("visibility", "visible");
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
        setTimeout(function() {
            $(card1).find(".back").show();
            $(card2).find(".back").show();
        }, 2000);
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
    total_match: 0,
    a_match: false,
    match_check: function(card1, card2) {
        var img1 = $(card1).find(".front img").attr("src");
        var img2 = $(card2).find(".front img").attr("src");
        if (img1 === img2) {
            matches.match_counter++;
            matches.a_match = true;
            matches.win_check();
        }
        else {
            matches.a_match = false;
        }
    },
    win_check: function() {
        if (matches.match_counter === matches.total_match) {
            console.log("WIN");
        }
    }
};


var play = function(the_card) {
    // exit function if an open card clicked or 2 cards are open already
    if ($(the_card).find(".back").is(':hidden') || cards.second_card_clicked) {
        return;
    }
    if (!cards.first_card_clicked) {
        cards.first_card_clicked = true;
        cards.first_card = the_card;
        cards.show_front(the_card);
    }
    else if (!cards.second_card_clicked) {
        cards.second_card_clicked = true;
        cards.second_card = the_card;
        cards.show_front(the_card);
        matches.match_check(cards.first_card, cards.second_card);
        stats.update_attempts();
        stats.update_accuracy();

        if (!matches.a_match) {
            cards.show_back(cards.first_card, cards.second_card);
            setTimeout(function() {
                cards.reset_first_second();
            }, 2000);
        }
        else {
            setTimeout(function() {
                cards.reset_first_second();
            }, 2000);
        }
    }
};


var stats = {
    games_played: 0,
    attempts: 0,
    accuracy: 0,
    update_games_played: function() {
        stats.games_played++;
        $(".games-played .value").text(stats.games_played + " times");
    },
    update_attempts: function() {
        stats.attempts++;
        $(".attempts .value").text(stats.attempts);
    },
    update_accuracy: function() {
        stats.accuracy = Math.floor((matches.match_counter / stats.attempts) * 100);
        if (isNaN(stats.accuracy)) {
            $(".accuracy .value").text("");
        }
        else {
            $(".accuracy .value").text(stats.accuracy + "%");
        }
    },
    reset_stats: function() {
        // *stats.games_played is reset when the page is refreshed
        stats.attempts = 0;
        stats.accuracy = 0;
        $(".attempts .value").text("");
        $(".accuracy .value").text("");
    }
};






