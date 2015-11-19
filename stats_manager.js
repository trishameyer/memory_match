function StatsManager(game)
{
    this.game = game;

    // Stats variables

    // Increments when a matching pair is found
    this.matches = (function()
    {
        var count = 0;
        return {
            increment: function() {
                count++;
            },
            reset: function() {
                count = 0;
            },
            value: function() {
                return count;
            }
        };
    })();

    // Increments when the player selects a pair of cards (matching or not).
    this.attempts = (function()
    {
        var count = 0;
        return {
            increment: function() {
                count++;
            },
            reset: function() {
                count = 0;
            },
            value: function() {
                return count;
            }
        };
    })();

    // Increments when the reset button is pressed.
    this.games_played = (function()
    {
        var count = 0;
        return {
            increment: function() {
                count++;
            },
            //reset: function() {
            //    count = 0;
            //},
            value: function() {
                return count;
            }
        };
    })();

    // Quotient of matches and attempts.
    this.accuracy = (function()
    {
        var percentage = 0.0;
        return {
            reset: function() {
                percentage = 0.0;
            },
            calculate: function(matches, attempts) {
                // Protect against division by zero
                if (attempts == 0)
                    percentage = 0;
                else
                    percentage = (matches / attempts);
            },
            value: function() {
                return percentage;
            }
        };
    })();

    this.init();
}

StatsManager.prototype.init = function()
{
    // Add p element to display Games Played
    var temp = $("<p>");
    temp.append(this.games_played.value());
    var gp_div = $('.games-played>.value');
    gp_div.append(temp);

    // Add p element to display attempts
    temp = $("<p>");
    temp.append(this.attempts.value());
    var attempts_div = $('.attempts>.value');
    attempts_div.append(temp);

    // Add p element to display accuracy
    temp = $("<p>");
    temp.append(this.accuracy.value().toFixed(2) + '%');
    var accuracy_div = $('.accuracy>.value');
    accuracy_div.append(temp);
};

StatsManager.prototype.display = function()
{
    // Replace games played number
    $('.games-played>.value').find('p').text(this.games_played.value());

    // Replace attempts number
    $('.attempts>.value').find('p').text(this.attempts.value());

    this.calculateAccuracy();
    var acc = (this.accuracy.value() * 100).toFixed(2);
    $('.accuracy>.value').find('p').text(acc + '%');
};

StatsManager.prototype.resetStats = function()
{
    this.accuracy.reset();
    this.matches.reset();
    this.attempts.reset();
};

StatsManager.prototype.incrementGamesPlayed = function()
{
    this.games_played.increment();
};

StatsManager.prototype.incrementMatches = function()
{
    this.matches.increment();
};

StatsManager.prototype.getNumMatches = function()
{
    return this.matches.value();
};

StatsManager.prototype.incrementAttempts = function()
{
    this.attempts.increment();
};

StatsManager.prototype.calculateAccuracy = function()
{
    return this.accuracy.calculate(this.matches.value(), this.attempts.value());
};