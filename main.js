var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function card_effect(element) {
    $(element).toggleClass("back_effect");
    $(element).prev(".front").toggleClass("front_effect");
}

function display_stats() {
    accuracy = Math.round(100 * (match_counter / attempts));
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);

    if (match_counter == 0 && attempts == 0) {
        $(".accuracy .value").text("100%");
    }
    else {
        $(".accuracy .value").text(accuracy + "%");
    }
}

function reset_stats() {
    $(".back").show();
    $("div").removeClass("back_effect").removeClass("front_effect").removeClass("selected_card").removeClass("matched");
    games_played = games_played + 1;
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
}

function card_clicked(_this) {
    if ($(_this).hasClass("matched") == true || $(_this).hasClass("selected_card") == true) {
        return
    }
    $(_this).addClass("selected_card");
    card_effect(_this);

    if (first_card_clicked == null) {
        first_card_clicked = $(_this).prev().find("img").attr("src");
        return first_card_clicked;
    }

    else {
        second_card_clicked = $(_this).prev().find("img").attr("src");
        attempts = attempts + 1;

        if (first_card_clicked == second_card_clicked) {
            match_counter = match_counter + 1;
            first_card_clicked = null;
            second_card_clicked = null;
            $(".selected_card").addClass("matched");
            $("div").removeClass("selected_card");

            if (match_counter == total_possible_matches) {
                alert("You won!");
            }
        }

        else {
            $(".back").off("click", card_clicked);
            setTimeout(function () {
                card_effect(".selected_card");
                $(".selected_card").show();
                first_card_clicked = null;
                second_card_clicked = null;
                $(".back").removeClass("selected_card").on("click", card_clicked);
            }, 1500);

        }

    }
    display_stats();
}

$(document).ready(function () {

    $(".back").click(function () {
        card_clicked(this);
    });

    $(".reset").click(function () {
        reset_stats();
    });

    display_stats();

});