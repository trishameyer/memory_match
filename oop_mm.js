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

    self.cardSetOne = ['images/cardfront1.jpg', 'images/cardfront2.jpg', 'images/cardfront3.jpg', 'images/cardfront4.jpg', 'images/cardfront5.jpg', 'images/cardfront6.jpg', 'images/cardfront7.jpg', 'images/cardfront8.jpg', 'images/cardfront9.jpg'];

    self.firstCardClicked = null;
    self.secondCardClicked = null;
    self.totalPossibleMatches = 9;
    self.currentTotalMatches = 0;

    self.tempCard = new Cards();

    self.populateBoard = function (size, controller, stats) {
        console.log(size);

        $('.game_row').html('');

        var tempCard = '<div class="card"><div class="front"></div><div class="back"><img src="images/cardback.jpg" alt="card"></div></div>';

        if (size == 'twelve_cards') {
            $('.game_row').each(function () {
                for (var x = 4; x > 0; x--) {
                    $(this).append(tempCard);
                }
            });
        }

        else {
            $('.game_row').each(function () {
                for (var x = 6; x > 0; x--) {
                    $(this).append(tempCard);
                }
            });
        }

        $(".back").click(function () {
            newController.cardClicked(this, gameStats);
        });

        controller.cardRandomizer();
        stats.resetStats(controller);
    };

    self.cardClicked = function (card, stats) {

        if ($(card).hasClass("matched") == true || $(card).hasClass("selected_card") == true) {
            return
        }

        $(card).addClass("selected_card");
        self.tempCard.cardTransitionEffect(card);

        if (self.firstCardClicked == null) {
            self.firstCardClicked = $(card).prev().find("img").attr("src");
            return self.firstCardClicked;
        }

        else {
            self.secondCardClicked = $(card).prev().find("img").attr("src");
            stats.matchAttempts++;

            if (self.firstCardClicked == self.secondCardClicked) {
                self.currentTotalMatches++;
                self.firstCardClicked = null;
                self.secondCardClicked = null;
                $(".selected_card").addClass("matched");
                $("div").removeClass("selected_card");

                if (self.currentTotalMatches == self.totalPossibleMatches) {
                    $('#game-area').html('<span id="win-message" >You have won.</span>');
                }
            }

            else {
                $(".back").off("click", self.cardClicked);
                setTimeout(function () {
                    self.tempCard.cardTransitionEffect(".selected_card");
                    $(".selected_card").show();
                    self.firstCardClicked = null;
                    self.secondCardClicked = null;
                    $(".back").removeClass("selected_card").on("click", self.cardClicked);
                }, 1500);
            }
        }

        stats.displayStats(self);
    };

    self.cardRandomizer = function () {
        var tempArray = [];

        for (var i = 0; i < (self.cardSetOne.length); i++) {
            tempArray.push(self.cardSetOne[i]);
            tempArray.push(self.cardSetOne[i]);
        }

        $('.front').each(function () {
            var randIndex = Math.floor(Math.random() * tempArray.length);
            var cardFace = $('<img>').attr('src', tempArray[randIndex]);
            $(this).append(cardFace);
            tempArray.splice(randIndex, 1);
        });
    };
};

//Document Ready
$(document).ready(function () {
    newController.populateBoard('twelve_cards', newController, gameStats);

    $(".reset").click(function () {
        gameStats.resetStats(newController);
        newController.cardRandomizer();
    });

    $(".settings-sub").click(function () {
        var boardSize = $(this).attr('id');
        newController.populateBoard(boardSize, newController, gameStats);
    });

    gameStats.displayStats(newController);
});

//Misc
var gameStats = new Stats();
var newController = new gameController();