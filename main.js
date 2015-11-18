document.addEventListener("DOMContentLoaded", function()
{
    console.log("Excuse me while I kiss the sky.");

    var game = new Game();
    game_ref = game;            // Remove when done testing.

    matches = game.stats_mgr.matches;
    attempts = game.stats_mgr.attempts;
    accuracy = game.stats_mgr.accuracy;
    games_played = game.stats_mgr.games_played;

    $("div#game-area>div.card").click(cardClicked);
    //document.querySelector("#game-area>div.card").addEventListener("click", cardClicked);
    $("input.reset").on('click', function()
    {
        game.resetGame();
    });
});

function isPortrait()
{
    return (screen.height >= screen.width);
}