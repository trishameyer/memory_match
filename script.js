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
            }, 650);
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

            //displays 100% instead of NaN, if not 100% displays correct %
            if (accuracy == Infinity) {
                $(".accuracy").find(".value").text(100 + "%");
            }
            else {
                $(".accuracy").find(".value").text(accuracy + "%");
            }
            //adds You Won message after game_area has been cleared
            $("#game-area").append($("<h5>").html("You won the <span>Piston Cup!</span>"));
            $("body").css("background-image", "url(images/dark4.png)");
        }
        //if matches made, change background to darker
        if (match_counter ==3){
            $("body").css("background-image", "url(images/dark1.png)");
        }
        if (match_counter == 5){
            $("body").css("background-image", "url(images/dark2.png)");
        }
        if (match_counter ==7){
            $("body").css("background-image", "url(images/dark3.png)");
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
    $("body").css("background-image", "url(images/cars_28.jpg)");
}

//Jquery objects for dynamic board

var card_div = $("<div>",{
    class : "card"
});

var front_div = $("<div>",{
    class : "front"

});

var back_div = $("<div>", {
    class:"back"
});


var img_front = $("<img>").addClass("front").attr("src", picture);
var img_back = $("<img>").addClass("back").attr("src", "radiatorspringscard.jpg");

front_div.append(img_front);
back_div.append(img_back);
card_div.append(front_div, back_div);
$("#game_area").append(card_div);

var pics_array = ["fillmore.jpg", "flo.jpg", "guido.jpg", "lighteningmcqueen.jpg", "luigi.jpg", "mater.jpg", "ramone.jpg",
    "sally.jpg", "sarge.jpg"];

var fractional_numbers = Math.random() * pics_array.length;
var whole_numbers=Math.floor(fractional_numbers);
var picture = pics_array[whole_numbers];




random_pic_index
random_picture = pics [random_pic_index]
pics.splice(random_pic_index, 1)
