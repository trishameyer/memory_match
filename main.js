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


var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

var cards_array = ["images/ff_Ballade.jpg","images/ff_CutMan.jpg","images/ff_Enker.jpg","images/ff_GutsMan.jpg",
    "images/ff_Punk.jpg","images/ff_QuickMan.jpg","images/ff_Quint.jpg","images/ff_Shadowman.jpg","images/ff_Skullman.jpg"];

function shuffle_cards() {
    for (var i=0; i<cards_array.length; i++) {

    }
}


$(document).ready(function(){

    // call 'card_clicked' function when '.card' div is clicked
    $(".card").click(card_clicked);
    // call 'reset_stats' function when '.reset' button is clicked
    $(".reset").click(reset_stats);

});


function card_clicked(){

    // if an already flipped or 3rd card is clicked, do nothing
    if ($(this).find(".back").is(':hidden') || (second_card_clicked != null)) {
       return;
    }

    // if 1st card is clicked, flip the card
    if (first_card_clicked == null) {
        $(this).find(".back").hide();
        // save 1st card DOM info to the tracker, while setting it to non-null
        first_card_clicked = $(this);
    }
    // if 2nd card is clicked, flip the card
    else {
        $(this).find(".back").hide();
        // save 2nd card DOM info to the tracker, while setting it to non-null
        second_card_clicked = $(this);
        // increment 'attempts' counter
        attempts++;

        // Nested If #1 - if 1st and 2nd cards match by checking image src, check if game is won
        if (first_card_clicked.find(".front img").attr("src") == second_card_clicked.find(".front img").attr("src")) {
            // increment 'matches' counter
            matches++;
            // call 'display_stats' function
            display_stats();
            // reset 'first_card_clicked' and 'second_card_clicked' trackers
            first_card_clicked = null;
            second_card_clicked = null;

            // set timeout when the game is won, so the last card flipped can be seen before winning image
            setTimeout(function(){
                // Nested If #2 - if all possible matches are made, game is won
                if (matches == total_possible_matches) {
                    // display game winning image
                    $("#img_win").css("display", "initial");
                    // alert a win message
                    alert("You Win!");
                }
            }, 1500);
        }
        // Nested Else #1 - if 1st & 2nd cards don't match, flip back the cards
        else {
            // call 'display_stats' to update attempts and accuracy
            display_stats();
            // set timeout before flipping back 1st and 2nd cards
            setTimeout(function(){
                // flip back 1st and 2nd cards
                first_card_clicked.find(".back").show();
                second_card_clicked.find(".back").show();
                // reset 'first_card_clicked' and 'second_card_clicked' trackers
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);
        }

    }

}


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




