function State(state_machine)
{
    this.machine = state_machine;
    this.init();
}
State.prototype.init = function() {};
State.prototype.execute = function() {};

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
State_PickFirst.prototype.init = function()
{

};
State_PickFirst.prototype.execute = function()
{
    // Card has been clicked
    var cm = this.machine.game.cards_mgr;
    cm.setFirstCardClicked(false);

    this.machine.changeState(new State_PickSecond(this));
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
State_PickSecond.prototype.execute = function()
{
    // Card has been clicked
    var cm = this.machine.game.cards_mgr;
    cm.setSecondCardClicked(false);

    this.machine.changeState(new State_EvaluatePair(this));
};

/**
 * State_EvaluatePair
 * @param state_machine
 * @constructor
 */
function State_EvaluatePair(state_machine)
{
    State.call(this, state_machine);
}
State_EvaluatePair.prototype = new State();
State_EvaluatePair.prototype.constructor = State_EvaluatePair;
State_EvaluatePair.prototype.init = function()
{

};
State_EvaluatePair.prototype.execute = function()
{

};