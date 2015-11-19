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

CardsManager.prototype.setFirstCardClicked = function(disable)
{
    if (disable == undefined || disable == null || disable == false)
        this.first_card_clicked = this.card_clicked;
    else
        this.first_card_clicked = null;
};

CardsManager.prototype.setSecondCardClicked = function(disable)
{
    if (disable == undefined || disable == null || disable == false)
        this.second_card_clicked = this.card_clicked;
    else
        this.second_card_clicked = null;
};
