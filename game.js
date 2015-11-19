function Game()
{
    this.cards_mgr = null;
    this.layout_mgr = null;
    this.stats_mgr = null;

    this.init();
}

Game.prototype.init = function()
{
    this.cards_mgr = new CardsManager(this, DEFAULT_NUM_PAIRS);
    this.layout_mgr = new LayoutManager(this, this.cards_mgr.deck);
    this.stats_mgr = new StatsManager(this);
    this.state_machine = new StateMachine(this);

    this.cards_mgr.enableAllCards();
    // Enable the reset button
    var game = this;    // Eliminate 'this' confusion
    $("input.reset").on('click', function()
    {
        game.resetGame();
    });
};

Game.prototype.resetGame = function()
{
    // Reset the global variables
    first_card_clicked = null;
    second_card_clicked = null;

    this.stats_mgr.incrementGamesPlayed();

    this.stats_mgr.resetStats(); //reset_stats();
    this.stats_mgr.display(); //display_stats();

    this.cards_mgr.init(this.cards_mgr.getTotalPairs()); //shuffle_src_arr = shuffle_cards(shuffle_src_arr);
    this.layout_mgr.changeDeck(this.cards_mgr.deck);
    this.layout_mgr.layoutCards(); //layout_cards(shuffle_src_arr);

    // Make the cards visible and showing their back faces
    $("div.card").removeClass("make-disappear");
    $("div.card>span").removeClass("rotate-card-hide");
    $("div.card>span").removeClass("rotate-card-show");

    // Remove the winning message
    $("div#game-area>p").remove();

    // Make all the cards clickable.
    this.cards_mgr.disableAllCards(); //$("div#game-area>div.card").off('click');
    this.cards_mgr.enableAllCards();
    //$("div#game-area>div.card").click(cardClicked);
    card_pair_flipped = false;

    console.log("resetGame called!!!");
};

Game.prototype.cardClicked = function()
{
    this.state_machine.run();
};
