document.addEventListener("DOMContentLoaded", function()
{
    console.log("Excuse me while I kiss the sky.");

    init_display_stats();

    shuffle_src_arr = shuffle_cards(pics);

    var layout_mgr = new LayoutManager(shuffle_src_arr);

    //layout_cards(shuffle_src_arr);
    layout_mgr.layoutCards();

    $("div#game-area>div.card").click(cardClicked);
    //document.querySelector("#game-area>div.card").addEventListener("click", cardClicked);
    $("input.reset").click(resetGame);
});

function isPortrait()
{
    return (screen.height >= screen.width);
}