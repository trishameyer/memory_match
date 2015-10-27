var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var attempts_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var can_i_click_a_card = true;
var random_picture = null;


//the page has loaded
$(document).ready(function () {
    display_stats();
    $(".accuracy").find(".value").text(0 + "%");
    $(".attempts").find(".value").text(0);
    $("games_played").find(".value").text(0);
    random_pictures();
});

function card_clicked(element) {
    //check if you can click on a card
    if (can_i_click_a_card == true) {
        //takes the img src from the card that is clicked and set it to variable the_card
        var the_card = $(element).prev('.front').find('img').attr('src');
        console.log(the_card);
    }
    else {
        return;
    }

    if (first_card_clicked == null) {
        //we clicked the first card
        first_card_clicked = the_card;
        //the front image of the first card is visible
        $(element).addClass("selected_card");
        console.log("card is first");
    }
    else {
        //we clicked the second card
        second_card_clicked = the_card;
        //the front image of the second card is visible
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
            //the cards don't match
            //prevents from clicking on a third card
            can_i_click_a_card = false;
            //resets card to null
            first_card_clicked = null;
            second_card_clicked = null;

            setTimeout(function () {
                //cards flip back
                $(".selected_card").removeClass("selected_card");
                can_i_click_a_card = true;
            }, 1050);
            console.log("cards don't match");
            //user clicks on a non_matched card which increases attempts_counter
            attempts_counter = attempts_counter + 1;
            //adds one to attempts in the stats area
            $(".attempts").find(".value").text(attempts_counter);
        }
        if (match_counter == total_possible_matches) {
            //all matches have been made
            //all matched cards disappear
            $('#game-area').find('.card').addClass('hide_matched_cards');
            matches = match_counter;
            attempts = attempts_counter;
            accuracy = (matches / attempts) * 10;

            //displays 100% instead of NaN
            if (accuracy == Infinity) {
                $(".accuracy").find(".value").text(100 + "%");
            }
            else {
                //displays % in stats area
                $(".accuracy").find(".value").text(accuracy + "%");
            }
            //adds You Won message after game_area has been cleared
            $("#game-area").append($("<h5>").html("You won the <span>Piston Cup!</span>"));
            //changes background to darkest scene
            $("body").css("background-image", "url(images/dark3.png)");
        }
    }
}
function display_stats() {
    $(".games-played").find(".value").text(games_played);
    $(".attempts").find(".value").text(attempts);
    matches = match_counter;
    attempts = attempts_counter;
    accuracy = Math.floor((matches / attempts)) * 10;
    accuracy = accuracy.toFixed(0);
    if (accuracy == Infinity) {
        $(".accuracy").find(".value").text(100 + "%");
    }
    else {
        $(".accuracy").find(".value").text(accuracy + "%");
    }
    console.log("accuracy is" + accuracy + "%");
}

function reset_stats() {
    //resets variables to zero
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    attempts_counter = 0;
    games_played = games_played + 1;
    $(".container").html("");
    random_pictures();
    //adds one to games_played each time reset button is clicked
    $(".games-played").find(".value").text(games_played);
    $(".accuracy").find(".value").text(0 + " %");
    $(".attempts").find(".value").text(0);
    $(".back").show();
    $('#game-area').find('.card').removeClass('hide_matched_cards');
    $('.card').find('.back').removeClass('matched_card');
    $("h5").remove();
    //resets background to daytime picture
    $("body").css("background-image", "url(images/cars_28.jpg)");
}

//takes all front image urls and stores in array

//returns fractional numbers between 0-18
function random_pictures() {
    var pics_array = ["images/fillmore.jpg",
        "images/flo.jpg",
        "images/guido.jpg",
        "images/lighteningmcqueen.jpg",
        "images/luigi.jpg",
        "images/mater.jpg",
        "images/ramone.jpg",
        "images/sally.jpg",
        "images/sarge.jpg",
        "images/fillmore.jpg",
        "images/flo.jpg",
        "images/guido.jpg",
        "images/lighteningmcqueen.jpg",
        "images/luigi.jpg",
        "images/mater.jpg",
        "images/ramone.jpg",
        "images/sally.jpg",
        "images/sarge.jpg"];

    for (var i = 0; i < 18; i++) {
        var fractional_numbers = Math.random() * pics_array.length;
// rounds fractional numbers to a whole number
        var random_pic_index = Math.floor(fractional_numbers);
        random_picture = pics_array[random_pic_index];
        $("<img>").addClass("front").attr("src", random_picture);
        pics_array.splice(random_pic_index, 1);
        console.log(random_picture);
        var new_card_div = create_card_con(random_picture);
        $(".container").append(new_card_div);
    }
}

function create_card_con(src) {

    //jquery objects for dynamic board
    var card_div = $("<div>").addClass("card");

    var front_div = $("<div>").addClass("front");

    var back_div = $("<div>").addClass("back").attr("onclick", "card_clicked(this)");

    var img_front = $("<img>").addClass("front").attr("src", random_picture);

    var img_back = $("<img>").addClass("back").attr("src", "images/radiatorspringscard.jpg");

    front_div.append(img_front);
    back_div.append(img_back);
    card_div.append(front_div);
    card_div.append(back_div);
    return card_div;
}
