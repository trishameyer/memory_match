/**
 * CardsManager
 *  Basically manages functionality for every card,
 *  except for DOM creation.
 */
function CardsManager(game, num_pairs)
{
    this.game = game;
    this.deck = [];

    this.pairs =
        (function()
        {
            var num_pairs = null;

            return {
                set: function(value)
                {
                    num_pairs = value;
                },
                get: function()
                {
                    return num_pairs;
                }
            };
        }
        )();

    this.card_clicked = 
        (function()
            {
                var card_obj = null;

                return {
                    set: function(clicked_card) {
                        card_obj = clicked_card;
                    },
                    get: function() {
                        return card_obj;
                    }
                };
            }
        )();

    this.first_card_clicked = 
        (function()
            {
                var card_obj = null;

                return {
                    set: function(clicked_card) {
                        card_obj = clicked_card;
                    },
                    get: function() {
                        return card_obj;
                    },
                    disable: function() {
                        $(card_obj).off('click');
                    },
                    enable: function(manager) {
                        $(card_obj).on('click', function(){
                            manager.game.cardClicked();
                        });
                    }
                };
            }
        )();

    this.second_card_clicked = 
        (function()
            {
                var card_obj = null;

                return {
                    set: function(clicked_card) {
                        card_obj = clicked_card;
                    },
                    get: function() {
                        return card_obj;
                    },
                    disable: function() {
                        $(card_obj).off('click');
                    },
                    enable: function(manager) {
                        $(card_obj).on('click', function(){
                            manager.game.cardClicked();
                        });
                    }
                };
            }
        )();

    this.shake =
        (function()
            {
                var enabled = false;

                return {
                    get: function() {
                        return enabled;
                    },
                    set: function(flag) {
                        enabled = flag;
                    }
                };
            }
        )();

    this.init(num_pairs);
}

CardsManager.prototype.init = function(num_pairs)
{
    // TODO: setting number of pairs (will be 4, 6, 8, or 9)
    this.pairs.set(num_pairs > 0 ? num_pairs : getRandomSize());

    this.deck = this.shuffleCards(this.getCards());
};


CardsManager.prototype.getTotalPairs = function()
{
    return this.pairs.get();
};

CardsManager.prototype.getCards = function()
{
    var to_shuffle_arr = [];
    var cards_arr =
        [
            'Ashley.png',
            'Garrus.png',
            'Kaidan.png',
            'Liara.png',
            'Miranda.png',
            'ShepardM.png',
            'Tali.png',
            'Thane.png',
            'Wrex.png'
        ];

    // Randomly pick cards to make the to-shuffle deck
    for (var i = 0; i < this.pairs.get(); i++)
    {
        rand_index = Math.floor(Math.random() * cards_arr.length);
        var picked = cards_arr.splice(rand_index, 1).pop();
        to_shuffle_arr.push(picked, picked);
    }

    return to_shuffle_arr;
};

CardsManager.prototype.shuffleCards = function(card_arr)
{
    var splice_arr = [];
    var rand_index = 0;

    while(card_arr.length > 0)
    {
        rand_index = Math.floor(Math.random() * card_arr.length);

        splice_arr.push(card_arr.splice(rand_index, 1)[0]);
    }

    return splice_arr;
};

CardsManager.prototype.enableAllCards = function()
{
    var game = this.game;
    var cm = this;
    $('#game-area').on('click', 'div.card', function()
    {
        cm.card_clicked.set(this);
        game.cardClicked();
    });
};

CardsManager.prototype.disableAllCards = function()
{
    $('#game-area').off('click', 'div.card');
};

CardsManager.prototype.enableSingleCard = function(card)
{
    var game = this.game;
    var cm = this;
    $(card).on('click', function()
    {
        cm.card_clicked.set(this);
        game.cardClicked();
    });
};
//CardsManager.prototype.disableSingleCard = function(card)
//{
//    $(card).off('click');
//};

CardsManager.prototype.setFirstCardClicked = function(flush)
{
    if (flush != undefined && flush != null && flush == true)
    {
        this.first_card_clicked.set(null);
    }
    else
    {
        this.first_card_clicked.set(this.card_clicked.get());

        this.rotateCard(this.first_card_clicked.get());
        this.first_card_clicked.disable();
    }

};

CardsManager.prototype.setSecondCardClicked = function(flush)
{
    if (flush != undefined && flush != null && flush == true)
    {
        this.second_card_clicked.set(null);
    }
    else
    {
        this.second_card_clicked.set(this.card_clicked.get());

        this.rotateCard(this.second_card_clicked.get());
        this.second_card_clicked.disable();
    }
};

CardsManager.prototype.flushClickedCards = function()
{
    this.card_clicked.set(null);
    this.setFirstCardClicked(true);
    this.setSecondCardClicked(true);
};

CardsManager.prototype.rotateCard = function(card)
{
    if (card == null)
        console.log("Trying to rotate a NULL card!!!");

    var back_card = $(card).find("span.back");
    back_card.toggleClass("rotate-card-hide");

    var front_card = $(card).find("span.front");
    front_card.toggleClass("rotate-card-show");
};

CardsManager.prototype.shakeSingleCard = function(card)
{
    if (this.shake.get() == false)
        return false;

    // Do a shaking animation
    $(card).addClass("anim-shake");
    var temp_card = $(card);
    setTimeout(
        function()
        {
            temp_card.removeClass("anim-shake");
        },
        650
    );
    return true;
};

CardsManager.prototype.flipPairAround = function(card_one, card_two)
{
    var self = this;
    setTimeout(function()
        {
            self.rotateCard(card_one);
            self.rotateCard(card_two);
            self.enableSingleCard(card_one);
            self.enableSingleCard(card_two);
            self.shake.set(false);
        },
        FLIP_BACK_DELAY
    );
};
