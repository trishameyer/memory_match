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

$(document).ready(function()
{
    console.log("Excuse me while I kiss the sky.");


    init_display_stats();

    $("div#game-area>div.card").click(cardClicked);
    //document.querySelector("#game-area>div.card").addEventListener("click", cardClicked);
    $("button.reset").click(resetGame);
});

function cardClicked()
{
    console.log("A card was clicked!!!");
    reset_clicked = false;

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
                winGame();
                //return;
            }
        }
        else                        // NO
        {
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