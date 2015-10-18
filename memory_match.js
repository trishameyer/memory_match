var first_card_clicked = false;
var second_card_clicked = false;
var total_possible_matches = 9;
var match_counter = 0;
var attempts_counter = 0;

var first_card;
var second_card;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

var debug = true;

$( document ).ready(function() {
    if(debug) console.log( "ready!" );
    display_stats();
});

function getSrc(element) { //for obtaining image source for comparison
    return $(element).next().find("img").attr("src");
}

function hide_card(element) {
    $(element).show(1000);
    if(debug) console.log('card hidden');
}

function card_clicked(element){

    if(first_card_clicked == false){
        //console.log('if initiated');
        $(element).hide(); //show first card
        first_card = element;
        first_card_clicked = true; //first card clicked
        card_img_1 = getSrc(element);
        console.log(card_img_1);
    }
    else{
        console.log('else initiated');
        $(element).hide(); //show second card
        second_card = element;
        second_card_clicked = true; //second card clicked
        card_img_2 = getSrc(element);
        console.log(card_img_2);
        attempts_counter += 1;
        if(debug) console.log('number of attempts is equal to: ' + attempts_counter);

        if(card_img_1 == card_img_2 && first_card_clicked && second_card_clicked){
            match_counter += 1;
            console.log(match_counter);
            first_card_clicked = false; //reset variables for next card set
            second_card_clicked = false; //reset variables for next card set

        }
        else{ //no match!
            if(debug) console.log('second else initiated');
            first_card_clicked = false; //reset variables for next card set
            second_card_clicked = false; //reset variables for next card set

            hide_card(first_card);
            hide_card(second_card);
        }
    }

    if(match_counter == total_possible_matches){
        if(debug) console.log('you win!');
        games_played += 1;
        if(debug) console.log('number of games played is: ' + games_played);
        display_stats();
    }
}

function display_stats(){
    if(debug) console.log('display_stats function called');

    matches = match_counter;
    attempts = attempts_counter;
    accuracy = (matches / attempts);

    if(debug) console.log(matches);
    if(debug) console.log(attempts);
    if(debug) console.log(accuracy);
    $('#games_played_stat').text(games_played);
    $('#attempts_stat').text(attempts);
    $('#accuracy_stat').text(((attempts>0)?(accuracy) * 100 + '%' : '-'));
}

function reset_stats(){
    if(debug) console.log('reset_stats function called');
    var all_cards = $(".back");
    hide_card(all_cards);
    display_stats();
}