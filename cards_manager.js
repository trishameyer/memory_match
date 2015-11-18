function CardsManager()
{
    this.deck = [];
    this.pairs = 4;
    this.init();
}

CardsManager.prototype.init = function()
{
    // TODO: setting number of pairs (will be 4, 6, 8, or 9)

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

CardsManager.prototype.createCardDom = function(card_index)
{
    var card_div = $('<div>',
        {
            class: 'card'
        });

    // Create the back part of the card
    var card_back_span = $('<span>',
        {
            class: 'back'
        });
    var back_img = $('<img>',
        {
            src: (STR_CARD_PATH + 'Back.png')
        });
    card_back_span.append(back_img);

    // Create the front part of the card
    var card_front_span = $('<span>',
        {
            class: 'front'
        });
    var final_card_path = STR_CARD_PATH + this.deck[card_index];
    var front_img = $('<img>',
        {
            src: final_card_path
        });
    card_front_span.append(front_img);

    // Put the new card together
    card_div = card_div.append(card_back_span);
    card_div = card_div.append(card_front_span);

    return card_div;
};