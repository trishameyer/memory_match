function State(state_machine)
{
    this.init(state_machine);
}
State.prototype.init = function(state_machine) {};
State.prototype.execute = function(state_machine) {};

/**
 * State_PickFirst
 * @param state_machine
 * @constructor
 */
function State_PickFirst(state_machine)
{
    State.call(this, state_machine);
}
State_PickFirst.prototype = new State();
State_PickFirst.prototype.constructor = State_PickFirst;
State_PickFirst.prototype.init = function(state_machine)
{

};
State_PickFirst.prototype.execute = function(state_machine)
{
    console.log("Executing State PICK FIRST");
    // Card has been clicked
    var cm = state_machine.game.cards_mgr;

    if (cm.shakeSingleCard(cm.card_clicked.get()))
        return;

    cm.setFirstCardClicked(false);

    state_machine.changeState(new State_PickSecond(state_machine));
};

/**
 * State_PickSecond
 * @param state_machine
 * @constructor
 */
function State_PickSecond(state_machine)
{
    State.call(this, state_machine);
}
State_PickSecond.prototype = new State();
State_PickSecond.prototype.constructor = State_PickSecond;
State_PickSecond.prototype.init = function()
{

};
State_PickSecond.prototype.execute = function(state_machine)
{
    console.log("Executing State PICK SECOND");
    // Card has been clicked
    var cm = state_machine.game.cards_mgr;
    cm.setSecondCardClicked(false);

    this.evaluatePair(state_machine);
    //state_machine.changeState(new State_EvaluatePair(state_machine));
};
State_PickSecond.prototype.evaluatePair = function(state_machine)
{
    console.log("EVALUATING PAIR");
    this.stats = state_machine.game.stats_mgr;
    this.rm = state_machine.game.rules_mgr;
    this.cm = state_machine.game.cards_mgr;

    this.stats.incrementAttempts();

    // Check for matching pair
    if (this.rm.checkRule(RULE_KEY_PAIRS_MATCH))
    {
        console.log('Matching!!!');
        this.stats.incrementMatches();
        this.stats.display();
        // Check if all pairs match
        if (this.rm.checkRule(RULE_KEY_ALL_PAIRS_MATCHED))
        {
            // win game
            console.log("YOU WIN!");
            state_machine.changeState(new State_WinGame(state_machine));
        }
        else
        {
            this.cm.flushClickedCards();
            state_machine.changeState(new State_PickFirst(state_machine));
        }
    }
    else    // Pair doesn't match
    {
        this.stats.display();
        // Set delay to going back to state pick first
        var lm = state_machine.game.layout_mgr;
        lm.shakeScreen();
        this.cm.shake.set(true);

        this.cm.flipPairAround(this.cm.first_card_clicked.get(), this.cm.second_card_clicked.get());
        this.cm.flushClickedCards();

        state_machine.changeState(new State_PickFirst(state_machine));
    }
};

/**
 * State_EvaluatePair
 * @param state_machine
 * @constructor
 */
function State_EvaluatePair(state_machine)
{
    this.stats = null;
    this.rm = null;
    this.cm = null;
    State.call(this, state_machine);
}
State_EvaluatePair.prototype = new State();
State_EvaluatePair.prototype.constructor = State_EvaluatePair;
State_EvaluatePair.prototype.init = function(state_machine)
{
    this.stats = state_machine.game.stats_mgr;
    this.rm = state_machine.game.rules_mgr;
    this.cm = state_machine.game.cards_mgr;

    this.stats.incrementAttempts();

    // Check for matching pair
    if (this.rm.checkRule(RULE_KEY_PAIRS_MATCH))
    {
        this.stats.incrementMatches();
        this.stats.display();
        // Check if all pairs match
        if (this.rm.checkRule(RULE_KEY_ALL_PAIRS_MATCHED))
        {
            // win game
            console.log("YOU WIN!");
            state_machine.changeState(new State_WinGame(state_machine));
        }
        else
        {
            this.cm.flushClickedCards();
            state_machine.changeState(new State_PickFirst(state_machine));
        }
    }
    else    // Pair doesn't match
    {
        this.stats.display();
        // Set delay to going back to state pick first
        var lm = state_machine.game.layout_mgr;
        lm.shakeScreen();

        this.cm.flipPairAround(this.cm.first_card_clicked.get(), this.cm.second_card_clicked.get());
        this.cm.flushClickedCards();

        state_machine.changeState(new State_PickFirst(state_machine));
    }
};
State_EvaluatePair.prototype.execute = function(state_machine)
{
    // Trying to click on a card shakes the card.
    this.cm.shakeSingleCard(this.cm.card_clicked);
};

/**
 * State_WinGame
 * @param state_machine
 * @constructor
 */
function State_WinGame(state_machine)
{
    State.call(this, state_machine);
}
State_WinGame.prototype = new State();
State_WinGame.prototype.constructor = State_WinGame;
State_WinGame.prototype.init = function(state_machine)
{
    var lm = state_machine.game.layout_mgr;

    lm.winGame();
};