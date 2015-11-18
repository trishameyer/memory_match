//Stats
var Stats = function () {
    var self = this;

    self.matchAttempts = 0;
    self.matchingAccuracy = 0;
    self.gamesPlayed = 0;

    self.displayStats = function (controller) {
        self.matchingAccuracy = Math.round(100 * (controller.currentTotalMatches / self.matchAttempts));

        $(".games-played .value").text(self.gamesPlayed);

        $(".attempts .value").text(self.matchAttempts);

        if (controller.currentTotalMatches == 0 && self.matchAttempts == 0) {
            $(".accuracy .value").text("100%");
        }
        else {
            $(".accuracy .value").text(self.matchingAccuracy + "%");
        }
    };

    self.resetStats = function (controller) {
        $(".back").show();
        $("div").removeClass("back_effect front_effect selected_card matched");

        self.gamesPlayed++;
        self.matchingAccuracy = 0;
        controller.currentTotalMatches = 0;
        self.matchAttempts = 0;

        self.displayStats(controller);
    }
};

//Cards
//Pass in properties to Cards?
var Cards = function () {
    var self = this;

    self.cardImage = '';
    self.matched = false;
    self.currentlySelected = false;

    self.cardTransitionEffect = function (card) {
        $(card).toggleClass("back_effect");
        $(card).prev(".front").toggleClass("front_effect");
    };
};

//Game Controller Object
var gameController = function () {
    var self = this;

    self.firstCardClicked = null;
    self.secondCardClicked = null;
    self.totalPossibleMatches = 9;
    self.currentTotalMatches = 0;

    self.cardClicked = function (card, stats, controller) {
        if ($(card).hasClass("matched") == true || $(card).hasClass("selected_card") == true) {
            return
        }

        $(card).addClass("selected_card");
        card_effect(card);

        if (self.firstCardClicked == null) {
            self.firstCardClicked = $(card).prev().find("img").attr("src");
            return self.firstCardClicked;
        }

        else {
            self.secondCardClicked = $(card).prev().find("img").attr("src");
            attempts = attempts + 1;

            if (self.firstCardClicked == self.secondCardClicked) {
                self.currentTotalMatches++;
                self.firstCardClicked = null;
                self.secondCardClicked = null;
                $(".selected_card").addClass("matched");
                $("div").removeClass("selected_card");

                if (self.currentTotalMatches == self.totalPossibleMatches) {
                    alert("You won!");
                }
            }

            else {
                $(".back").off("click", self.cardClicked);
                setTimeout(function () {
                    card_effect(".selected_card");
                    $(".selected_card").show();
                    self.firstCardClicked = null;
                    self.secondCardClicked = null;
                    $(".back").removeClass("selected_card").on("click", self.cardClicked);
                }, 1500);
            }
        }

        stats.displayStats(controller);

    };
};

//Document Ready
$(document).ready(function () {
    var gameStats = new Stats();
    var newController = new gameController();

    $(".back").click(function () {
        newController.cardClicked(this);
    });

    $(".reset").click(function () {
        gameStats.resetStats(newController);
    });

    gameStats.displayStats(newController);
});

//Misc

