/**
 * Created by Rhett on 10/19/2015.
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var matches =0;
var attempts = 0;
var accuracy = 0;



$( document ).ready(function() {
    $(".back").click(card_clicked);
    $(".back").click(display_stats);
    games_played = 0;
    $(".reset").click(function {
        games_played++;
        reset_stats();
        display_stats();
    });
});

function card_clicked(event) {
    $(this).hide(); //could put $(this).toggleClass('someclass that affects css') instead.
    console.log('event objects worked!');
    if (first_card_clicked == null) {
        first_card_clicked = $(this).prev().find('img').attr('src'); //do I need to  get the image source for the DOM?
    } else {
        second_card_clicked = $(this).prev().find('img').attr('src');
        attempts++;//again, see above comment.
        accuracy = matches/attempts;
        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            matches++;
            console.log('match_counter is: ' + match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                alert('You have won!');
            } else {
                return console.log('click handler functionality is complete - the first one');
            }
        } else {
            console.log('first_card_clicked != second_card_clicked');
            $('.back').show(2000); //could put $('.back').toggleClass('someclass that affects css') instead to flip it back.
            first_card_clicked = null;
            second_card_clicked = null;
            console.log('click handler functionality is complete - the second');
        }
    }
}

function display_stats(event) {
    $(".games_played .value").text(games_played);
    $('.attempts .value').text(attempts);
    accuracy = Math.round((matches/attempts)) + "%"
    $('.accuracy .value').text(accuracy);
}

function reset_stats (event) {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}
