//Stats
var Stats = function () {
    this.matchAttempts = 0;
    this.matchingAccuracy = 0;
    this.gamesPlayed = 0;

    this.displayStats = function () {
        this.matchingAccuracy = Math.round(100 * (newController.currentTotalMatches / this.matchAttempts);

        $(".games-played .value").text(this.gamesPlayed);

        $(".attempts .value").text(this.matchAttempts);

        if (newController.currentTotalMatches == 0 && this.matchAttempts == 0) {
            $(".accuracy .value").text("100%");
        }
        else {
            $(".accuracy .value").text(this.matchingAccuracy + "%");
        }
    };
};

//Cards
var Cards = function () {
    this.cardImage = '';
    this.matched = false;
    this.currentlySelected = false;

    this.cardTransitionEffect = function (element) {
        $(element).toggleClass("back_effect");
        $(element).prev(".front").toggleClass("front_effect");
    }

};

//Game Controller Object
var gameController = function () {
    var self = this;

    self.firstCardClicked = null;
    self.secondCardClicked = null;
    self.totalPossibleMatches = 9;
    self.currentTotalMatches = 0;

};

//Document Ready
$(document).ready(function () {

    $(".back").click(function () {
        card_clicked(this);
    });

    $(".reset").click(function () {
        reset_stats();
    });

    display_stats();

});

//Misc
var gameStats = Stats();
var newController = gameController();