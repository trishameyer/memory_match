document.addEventListener("DOMContentLoaded", function()
{
    console.log("Excuse me while I kiss the sky.");

    var game = new Game();
    game_ref = game;            // Global reference to the game object

    //$("div#game-area>div.card").click(cardClicked);
});

function isPortrait()
{
    return (screen.height >= screen.width);
}