function Game()
{
    this.cards_mgr = null;
    this.layout_mgr = null;
    this.stats_mgr = null;
    this.state_machine = null;
    this.rules_mgr = null;
    this.settings_manager = null;

    this.init();
}

Game.prototype.init = function()
{
    this.settings_manager = new SettingsManager(this);
    this.cards_mgr = new CardsManager(this, this.settings_manager.size.get());
    this.layout_mgr = new LayoutManager(this, this.cards_mgr.deck);
    this.stats_mgr = new StatsManager(this);
    this.state_machine = new StateMachine(this);
    this.rules_mgr = new RulesManager(this);

    cm_ref = this.cards_mgr;
    sm_ref = this.state_machine;

    //this.cards_mgr.enableAllCards();
    // Enable the reset button
    var game = this;    // Eliminate 'this' confusion
    $("input.reset").on('click', function()
    {
        game.resetGame();
    });
};

Game.prototype.resetGame = function()
{
    // Make all the cards clickable.
    this.cards_mgr.disableAllCards();

    this.stats_mgr.incrementGamesPlayed();

    this.stats_mgr.resetStats(); //reset_stats();
    this.stats_mgr.display(); //display_stats();

    this.cards_mgr.init(this.settings_manager.size.get());//this.cards_mgr.getTotalPairs());
    this.layout_mgr.changeDeck(this.cards_mgr.deck);
    this.layout_mgr.init();


    //this.cards_mgr.enableAllCards();

    console.log("resetGame called!!!");
    this.state_machine.init();
};

Game.prototype.cardClicked = function()
{
    console.log("CARD CLICKED");
    this.state_machine.run();
};
