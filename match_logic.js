var first_card_clicked = null;
var second_card_clicked = null;
var match_counter = 0;
var card_pair_flipped = false;
var total_card_matches = 9;

// Stats variables
var matches = 0;        // Increments when a matching pair is found
var attempts = 0;       // Increments when the player selects a pair of cards (matching or not).
var accuracy = 0;       // Quotient of matches and attempts.
var games_played = 0;   // Increments when the reset button is pressed.

var str_card_path = 'assets/images/Card_';
var pics =
    [
        'Ashley.png',
        'Ashley.png',
        'Garrus.png',
        'Garrus.png',
        'Kaidan.png',
        'Kaidan.png',
        'Liara.png',
        'Liara.png',
        'Miranda.png',
        'Miranda.png',
        'ShepardM.png',
        'ShepardM.png',
        'Tali.png',
        'Tali.png',
        'Thane.png',
        'Thane.png',
        'Wrex.png',
        'Wrex.png'
    ];
var shuffle_src_arr = [];

$(document).ready(function()
{
    console.log("Excuse me while I kiss the sky.");


    init_display_stats();

    shuffle_src_arr = shuffle_cards(pics);
    layout_cards(shuffle_src_arr);

    $("div#game-area>div.card").click(cardClicked);
    //document.querySelector("#game-area>div.card").addEventListener("click", cardClicked);
    $("input.reset").click(resetGame);
});

function getPosition(elem)
{
    // TODO - add functionality that determines the viewport coordinates of an element
}

function cardClicked()
{
    console.log("Da card clicked: " + $(this));

    if (card_pair_flipped)
    {
        // Do a shaking animation
        $(this).addClass("anim-shake");
        var temp_card = $(this);
        setTimeout(
            function()
            {
                temp_card.removeClass("anim-shake");
            },
            650);

        return;
    }

    // Flowchart - first_card_clicked is null?
    if (first_card_clicked == null)     // YES
    {
        first_card_clicked = $(this);
        rotateCard(first_card_clicked);
        makeCardUnclickable(first_card_clicked);
    }
    else
    if (second_card_clicked == null)    // NO
    {
        second_card_clicked = $(this);
        rotateCard(second_card_clicked);
        makeCardUnclickable(second_card_clicked);
        card_pair_flipped = true;
        attempts++;

        // Flowchart - first_card_clicked is equal to second_card_clicked
        if (checkCardsMatch())      // YES
        {
            matches++;

            // Allow other cards to be flipped
            card_pair_flipped = false;

            // Flowchart - increment match counter and
            // Are all cards matched?
            if(++match_counter == total_card_matches)
            {
                // Flowchart - Display to the user that they have won
                console.log("YOU WON!!!!");
                setTimeout(
                    function()
                    {
                        winGame();
                    },
                    500
                );
                //winGame();
                //return;
            }
        }
        else                        // NO
        {
            // Shake the screen!
            var temp_wrapper = $('div.page-wrapper');
            setTimeout(
                function()
                {
                    temp_wrapper.addClass("anim-quake");
                },
                500);

            setTimeout(
                function()
                {
                    temp_wrapper.removeClass("anim-quake");
                },
                1000);

            // Need to cache the clicked cards due to the setTimeout,
            // which otherwise would be trying to rotate null cards.
            var temp_one = first_card_clicked;
            var temp_two = second_card_clicked;
            setTimeout(
                function()
                {
                    card_pair_flipped = false;
                    makeCardClickable(temp_one);
                    makeCardClickable(temp_two);
                    rotatePair(temp_one, temp_two);
                },
                2000);
        }

        display_stats();
        // Flowchart - if pair doesn't match or not all cards matched
        // Reset variables
        resetClickedCards();
    }
    return;
}

// Rotates the card either back-to-front or front-to-back, depending
// on the current side facing up.
function rotateCard($the_card)
{
    var $back_card = $the_card.find("span.back");
    $back_card.toggleClass("rotate-card-hide");

    var $front_card = $the_card.find("span.front");
    $front_card.toggleClass("rotate-card-show");
}


// Compares the relative source paths of the two cards picked.
// Returns true if the paths are identical.
function checkCardsMatch()
{
    var $card_src = first_card_clicked.find("span.front>img").attr("src");
    if ($card_src == second_card_clicked.find("span.front>img").attr("src"))
        return true;

    return false;
}


// Removes the onclick event-handler for a specific card div.
function makeCardUnclickable($card)
{
    $card.off('click');
}

// Adds the onclick event-handler for a specific card div.
function makeCardClickable($card)
{
    $card.on('click', cardClicked);
}

// Used only to rotate a mismatched pair of cards.
function rotatePair(first, second)
{
    rotateCard(first);
    rotateCard(second);
}

function resetClickedCards()
{
    first_card_clicked = null;
    second_card_clicked = null;
}

// Undergoes the game-winning sequence.
function winGame()
{
    // Make all the cards disappear.
    $("div.card").addClass("make-disappear");

    // Add a YOU WON!!! to the game area, where the cards one were.
    var game_area = $("div#game-area");
    game_area.prepend("<p>YOU WON!!!</p>");

    console.log(game_area);
}

// The event-handling function for when the Reset Game button is clicked.
function resetGame()
{
    // Reset the global variables
    first_card_clicked = null;
    second_card_clicked = null;
    match_counter = 0;

    games_played++;

    reset_stats();
    display_stats();

    shuffle_src_arr = shuffle_cards(shuffle_src_arr);
    layout_cards(shuffle_src_arr);

    // Make the cards visible and showing their back faces
    $("div.card").removeClass("make-disappear");
    $("div.card>span").removeClass("rotate-card-hide");
    $("div.card>span").removeClass("rotate-card-show");

    // Remove the winning message
    $("div#game-area>p").remove();

    // Make all the cards clickable.
    $("div#game-area>div.card").off('click');
    $("div#game-area>div.card").on('click', cardClicked);
    //$("div#game-area>div.card").click(cardClicked);
    card_pair_flipped = false;

    console.log("resetGame called!!!");
}

/* VERSION 1.0 FUNCTIONS BELOW */
// helper function for when the page loads
function init_display_stats()
{
    // Add p element to display Games Played
    var temp = $("<p>");
    temp.append(games_played);
    var gp_div = $('.games-played>.value');
    gp_div.append(temp);

    // Add p element to display attempts
    temp = $("<p>");
    temp.append(attempts);
    var attempts_div = $('.attempts>.value');
    attempts_div.append(temp);

    // Add p element to display accuracy
    temp = $("<p>");
    temp.append(accuracy.toFixed(2) + '%');
    var accuracy_div = $('.accuracy>.value');
    accuracy_div.append(temp);
}
function display_stats()
{
    // Replace games played number
    $('.games-played>.value').find('p').text(games_played);

    // Replace attempts number
    $('.attempts>.value').find('p').text(attempts);

    // Replace accuracy number
    // Protect against division by zero
    if (attempts == 0)
        accuracy = 0;
    else
        accuracy = matches / attempts;
    var acc = (accuracy * 100).toFixed(2);
    $('.accuracy>.value').find('p').text(acc + '%');
}

function reset_stats()
{
    accuracy = 0;
    matches = 0;
    attempts = 0;
}
/* END VERSION 1.0 FUNCTIONS */

// Version 1.5 new functions
function shuffle_cards(card_arr)
{
    var splice_arr = [];
    var rand_index = 0;

    while(card_arr.length > 0)
    {
        rand_index = Math.floor(Math.random() * card_arr.length);

        splice_arr.push(card_arr.splice(rand_index, 1)[0]);
    }

    return splice_arr;
}

function layout_cards(card_arr)
{
    var temp_game_area = $('<div>');
    // Create all cards and put it in the game area
    for (var i = 0; i < card_arr.length; i++)
    {
        // Create the card container
        var card_div = $('<div>',
            {
                class: 'card'
            });

        // Create the back part of the card
        var card_back_span = $('<span>',
            {
                class: 'back'
            });
        var back_img = $('<img>',
            {
                src: (str_card_path + 'Back.png')
            });
        card_back_span.append(back_img);

        // Create the front part of the card
        var card_front_span = $('<span>',
            {
                class: 'front'
            });
        var final_card_path = str_card_path + card_arr[i];
        var front_img = $('<img>',
            {
                src: final_card_path
            });
        card_front_span.append(front_img);

        // Put the new card together
        card_div = card_div.append(card_back_span);
        card_div = card_div.append(card_front_span);

        // Add the card to the game area.
        temp_game_area.append(card_div);
    }
    $('#game-area').html(temp_game_area.html());
    console.log("Final game area: " + $('#game-area').html());
}
/* END VERSION 1.5 FUNCTIONS */