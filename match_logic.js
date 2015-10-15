var first_card_clicked = null;
var second_card_clicked = null;
var match_counter = 0;
var card_pair_flipped = false;
var total_card_matches = 9;


$(document).ready(function()
{
   console.log("Excuse me while I kiss the sky.");

    $("div#game-area>div.card").click(cardClicked);
    //document.querySelector("#game-area>div.card").addEventListener("click", cardClicked);
    $("button.reset").click(resetGame);
});

function cardClicked()
{
    console.log("A card was clicked!!!");

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

        if (checkCardsMatch())
        {
            card_pair_flipped = false;
            if(++match_counter == total_card_matches)
            {
                // YOU WON!
                console.log("YOU WON!!!!");
                winGame();
                return;
            }
        }
        else
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
        resetClickedCards();
    }
    return;
}

function rotateCard($the_card)
{
    var $back_card = $the_card.find("span.back");
    $back_card.toggleClass("rotate-card-hide");

    var $front_card = $the_card.find("span.front");
    $front_card.toggleClass("rotate-card-show");
}

function checkCardsMatch()
{
    var $card_src = first_card_clicked.find("span.front>img").attr("src");
    if ($card_src == second_card_clicked.find("span.front>img").attr("src"))
        return true;

    return false;
}

function makeCardUnclickable($card)
{
    $card.off('click');
}

function makeCardClickable($card)
{
    $card.on('click', cardClicked);
}

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

function winGame()
{
    $("div.card").addClass("make-disappear");
    var game_area = $("div#game-area");
    game_area.prepend("<p>YOU WON!!!</p>");
    console.log(game_area);
}

function resetGame()
{
    // Reset the global variables
    first_card_clicked = null;
    second_card_clicked = null;
    match_counter = 0;

    // Make the cards visible and showing their back faces
    $("div.card").removeClass("make-disappear");
    $("div.card>span").removeClass("rotate-card-hide");
    $("div.card>span").removeClass("rotate-card-show");

    // Remove the winning message
    $("div#game-area>p").remove();

    // Make all the cards clickable.
    $("div#game-area>div.card").click(cardClicked);
    card_pair_flipped = false;

    console.log("resetGame called!!!");
}