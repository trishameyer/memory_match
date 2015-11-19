function CardsManager(game, num_pairs)
{
    this.game = game;
    this.deck = [];
    this.pairs = 0;

    this.card_clicked = null;
    this.first_card_clicked = null;
    this.second_card_clicked = null;

    this.init(num_pairs);
}

CardsManager.prototype.init = function(num_pairs)
{
    // TODO: setting number of pairs (will be 4, 6, 8, or 9)
    this.pairs = num_pairs;

    this.deck = this.shuffleCards(this.getCards());
};


CardsManager.prototype.getTotalPairs = function()
{
    return this.pairs;
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
    for (var i = 0; i < this.pairs; i++)
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
        cm.card_clicked = this;
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
        cm.card_clicked = this;
        game.cardClicked();
    });
};
CardsManager.prototype.disableSingleCard = function(card)
{
    $(card).off('click');
};

CardsManager.prototype.setFirstCardClicked = function(flush)
{
    if (flush != undefined && flush != null && flush == true)
    {
        this.first_card_clicked = null;
    }
    else
    {
        this.first_card_clicked = this.card_clicked;

        this.rotateCard(this.first_card_clicked);
        this.disableSingleCard(this.first_card_clicked);
    }

};

CardsManager.prototype.setSecondCardClicked = function(flush)
{
    if (flush != undefined && flush != null && flush == true)
    {
        this.second_card_clicked = null;
    }
    else
    {
        this.second_card_clicked = this.card_clicked;

        this.rotateCard(this.second_card_clicked);
        this.disableSingleCard(this.second_card_clicked);
    }
};

CardsManager.prototype.flushClickedCards = function()
{
    this.card_clicked = null;
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
};

CardsManager.prototype.flipPairAround = function()
{
    var cm = this;
    setTimeout(
        function()
        {
            cm.rotateCard(cm.first_card_clicked);
            cm.rotateCard(cm.second_card_clicked);
            cm.enableSingleCard(cm.first_card_clicked);
            cm.enableSingleCard(cm.second_card_clicked);
            cm.flushClickedCards();
        },
        FLIP_BACK_DELAY
    );
};
