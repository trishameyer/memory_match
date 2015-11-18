function Game()
{
    this.cards_mgr;
    this.layout_mgr;
    this.stats_mgr;

    this.init();
}

Game.prototype.init = function()
{
    this.cards_mgr = new CardsManager();
    this.layout_mgr = new LayoutManager(this.cards_mgr.cards);
    this.stats_mgr = new StatsManager();
};

Game.prototype.resetGame = function()
{
    // Reset the global variables
    first_card_clicked = null;
    second_card_clicked = null;
    match_counter = 0;

    this.stats_mgr.incrementGamesPlayed();

    this.stats_mgr.resetStats(); //reset_stats();
    this.stats_mgr.display(); //display_stats();

    this.cards_mgr.init(); //shuffle_src_arr = shuffle_cards(shuffle_src_arr);
    this.layout_mgr.layoutCards(); //layout_cards(shuffle_src_arr);

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
};