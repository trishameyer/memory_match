var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches=9;
var match_counter = 0;
var attempts_counter = 0;
var matches = 0;
var attempts =  0;
var accuracy = 0;
var games_played = 0;

$(document).ready(function() {
    display_stats();
    $(".accuracy").find(".value").text(0 + "%");
    $(".attempts").find(".value").text(0);
    $("games_played").find(".value").text(0);
});

function card_clicked(element) {
    var the_card = $(element).prev('.front').find('img').attr('src');
    console.log(the_card);

    if (first_card_clicked == null) {
        //we clicked the first card
        first_card_clicked = the_card;
        $(element).addClass("selected_card");
        console.log("card is first");
    }
    else {
        //we clicked the second card
        second_card_clicked = the_card;
        $(element).addClass("selected_card");
        console.log("card is second");

        if (first_card_clicked == second_card_clicked) {
            //there is a match
            $(".selected_card").removeClass('selected_card').addClass('matched_card');
            //resets cards to null
            first_card_clicked = null;
            second_card_clicked = null;
            //increases matches and match_counter
            match_counter = match_counter + 1;
            matches = matches + 1;
            console.log("cards match");
        }
        else {
            //$(".selected_card").removeClass("selected_card");
            //resets card to null
            first_card_clicked = null;
            second_card_clicked = null;
            setTimeout(function () {
                $(".selected_card").removeClass("selected_card");
            }, 1050);
            console.log("cards don't match");

            //user clicks on a non_matched card which increases attempts_counter
            attempts_counter = attempts_counter + 1;
            $(".attempts").find(".value").text(attempts_counter);
        }
        if (match_counter == total_possible_matches) {
            //all matches have been made
            $('#game-area').find('.card').addClass('hide_matched_cards');
            matches = match_counter;
            attempts = attempts_counter;
            accuracy = (matches / attempts) * 10;
            if (accuracy == Infinity) {
                $(".accuracy").find(".value").text(100 + "%");
            }
            else {
                $(".accuracy").find(".value").text(accuracy + "%");
            }
            $("#game-area").append($("<h5>").html("You won the Piston Cup!"));
        }
    }
}
function display_stats() {
    $(".games-played").find(".value").text(games_played);
    $(".attempts").find(".value").text(attempts);
    matches = match_counter;
    attempts = attempts_counter;
    accuracy = (matches / attempts) * 10;
    if (accuracy == Infinity) {
        $(".accuracy").find(".value").text(100 + "%");
    }
    else {
        $(".accuracy").find(".value").text(accuracy + "%");
    }
    console.log("accuracy is" + accuracy + "%");
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter =0;
    attempts_counter =0;
    games_played = games_played + 1;
    $(".games-played").find(".value").text(games_played);
    $(".accuracy").find(".value").text(0 + "%");
    $(".attempts").find(".value").text(0);
    $(".back").show();
    $('#game-area').find('.card').removeClass('hide_matched_cards');
    $('.card').find('.back').removeClass('matched_card');
    $("h5").remove();
}
