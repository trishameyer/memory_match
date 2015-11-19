function StatsManager(game)
{
    this.game = game;

    // Stats variables
    this.matches = 0;        // Increments when a matching pair is found
    this.attempts = 0;       // Increments when the player selects a pair of cards (matching or not).
    this.accuracy = 0;       // Quotient of matches and attempts.
    this.games_played = 0;   // Increments when the reset button is pressed.

    this.init();
}

StatsManager.prototype.init = function()
{
    // Add p element to display Games Played
    var temp = $("<p>");
    temp.append(this.games_played);
    var gp_div = $('.games-played>.value');
    gp_div.append(temp);

    // Add p element to display attempts
    temp = $("<p>");
    temp.append(this.attempts);
    var attempts_div = $('.attempts>.value');
    attempts_div.append(temp);

    // Add p element to display accuracy
    temp = $("<p>");
    temp.append(this.accuracy.toFixed(2) + '%');
    var accuracy_div = $('.accuracy>.value');
    accuracy_div.append(temp);
};

StatsManager.prototype.display = function()
{
    // Replace games played number
    $('.games-played>.value').find('p').text(this.games_played);

    // Replace attempts number
    $('.attempts>.value').find('p').text(this.attempts);

    this.accuracy = this.calculateAccuracy();
    var acc = (this.accuracy * 100).toFixed(2);
    $('.accuracy>.value').find('p').text(acc + '%');
};

StatsManager.prototype.resetStats = function()
{
    this.accuracy = 0;
    this.matches = 0;
    this.attempts = 0;
};

StatsManager.prototype.incrementGamesPlayed = function()
{
    this.games_played++;
};

StatsManager.prototype.incrementMatches = function()
{
    this.matches++;
};

StatsManager.prototype.getNumMatches = function()
{
    return this.matches;
};

StatsManager.prototype.incrementAttempts = function()
{
    this.attempts++;
};

StatsManager.prototype.calculateAccuracy = function()
{
    // Replace accuracy number
    // Protect against division by zero
    if (this.attempts == 0)
        return 0;
    else
        return (this.matches / this.attempts);
};