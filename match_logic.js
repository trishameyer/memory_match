function getPosition(elem)
{
    // TODO - add functionality that determines the viewport coordinates of an element
}

function cardClicked(the_card)
{
    console.log("Da card clicked: " + $(the_card));

    if (card_pair_flipped)
    {
        // Do a shaking animation
        $(the_card).addClass("anim-shake");
        var temp_card = $(the_card);
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
        first_card_clicked = $(the_card);
        rotateCard(first_card_clicked);
        makeCardUnclickable(first_card_clicked);
    }
    else
    if (second_card_clicked == null)    // NO
    {
        second_card_clicked = $(the_card);
        rotateCard(second_card_clicked);
        makeCardUnclickable(second_card_clicked);
        card_pair_flipped = true;
        game_ref.stats_mgr.incrementAttempts(); //attempts++;

        // Flowchart - first_card_clicked is equal to second_card_clicked
        if (checkCardsMatch())      // YES
        {
            game_ref.stats_mgr.incrementMatches(); //matches++;

            // Allow other cards to be flipped
            card_pair_flipped = false;

            // Flowchart - increment match counter and
            // Are all cards matched?
            if (game_ref.stats_mgr.getNumMatches() == game_ref.cards_mgr.getTotalPairs()) //(++match_counter == total_card_matches)
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

        game_ref.stats_mgr.display(); //display_stats();
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
    var game_area = game_ref.layout_mgr.game_area;
    // Make all the cards disappear.
    game_area.html('');

    // Add a YOU WON!!! to the game area, where the cards one were.
    game_area.append("<p>YOU WON!!!</p>");

    console.log(game_area);
}
