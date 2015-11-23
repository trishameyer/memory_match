function StateMachine(game)
{
    this.game = game;
    this.curr_state;

    this.init();
}

StateMachine.prototype.init = function()
{
    this.changeState(new State_PickFirst(this));
};

StateMachine.prototype.changeState = function(new_state)
{
    delete this.curr_state;
    this.curr_state = new_state;
};

StateMachine.prototype.run = function()
{
    this.curr_state.execute(this);
};
