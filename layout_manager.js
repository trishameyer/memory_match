function LayoutManager(game, cards_arr)
{
    this.game = game;
    this.cards = cards_arr;
    this.game_area = null;
    this.card_dimensions = null;
    this.game_area_dimensions = null;

    this.init();
}

LayoutManager.prototype.init = function()
{
    this.game_area = $('#game-area');
    this.game_area_dimensions = this.calculateGameAreaDimensions();
    this.setGameAreaDimensions();

    this.card_dimensions = this.calculateCardDimensions();

    this.layoutCards();
};

LayoutManager.prototype.changeDeck = function(new_deck)
{
    this.cards = new_deck;
};

LayoutManager.prototype.calculateGameAreaDimensions = function()
{
    var dimensions =
    {
        width: '0vw',
        height: '0vw'
    };

    var area_width = 0.0;
    var area_height = 0.0;
    // Card images are 5 x 7 in ratio
    switch (this.cards.length)
    {
        // 18 -- 3 x 6 (portrait), 6 x 3 (landscape)
        case 18:
            area_width = isPortrait() ? 45.0 : 54.0;
            area_height = isPortrait() ? 126.0 : 37.8;
            break;

        // 16 -- 4 x 4 (portrait), 8 x 2 (landscape)
        case 16:
            area_width = isPortrait() ? 80.0 : 56.0;
            area_height = isPortrait() ? 112.0 : 19.6;
            break;

        // 12 -- 3 x 4 (portrait), 4 x 3 (landscape)
        case 12:
            area_width = isPortrait() ? 60.0 : 36.0;
            area_height = isPortrait() ? 112.0 : 37.8;
            break;

        // 10 -- 2 x 5 (portrait), 5 x 2 (landscape)
        case 10:
            area_width = isPortrait() ? 40.0 : 35.0;
            area_height = isPortrait() ? 140.0 : 19.6;
            break;

        // 8  -- 2 x 4 (portrait), 4 x 2 (landscape)
        case 8:
            area_width = isPortrait() ? 40.0 : 36.0;
            area_height = isPortrait() ? 112.0 : 25.2;
            break;
    }

    dimensions.width = area_width + 'vw';
    dimensions.height = area_height + 'vw';

    return dimensions;
};
LayoutManager.prototype.getGameAreaDimensions = function()
{
    return this.game_area_dimensions;
};
LayoutManager.prototype.setGameAreaDimensions = function()
{
    this.game_area.css(this.getGameAreaDimensions());
};


LayoutManager.prototype.calculateCardDimensions = function()
{
    var dimensions =
    {
        width: '0%',
        height: '0%',
        display: 'inline-block',
        margin: '0',
        float: 'left'
    };

    var card_width = 0;
    var card_height = 0;

    switch (this.cards.length)
    {
        // 18 -- 3 x 6 (portrait), 6 x 3 (landscape)
        case 18:
            if (isPortrait()) {
                card_width = 100.0 / 3.0;
                card_height = 100.0 / 6.0;
            }
            else {
                card_width = 100.0 / 6.0;
                card_height = 100.0 / 3.0;
            }
            break;

        // 16 -- 4 x 4 (portrait), 8 x 2 (landscape)
        case 16:
            card_width = isPortrait() ? 100.0 / 4.0 : 100.0 / 8.0;
            card_height = isPortrait() ? 100.0 / 4.0 : 100.0 / 2.0;
            break;

        // 12 -- 3 x 4 (portrait), 4 x 3 (landscape)
        case 12:
            if (isPortrait()) {
                card_width = 100.0 / 3.0;
                card_height = 100.0 / 4.0;
            }
            else {
                card_width = 100.0 / 4.0;
                card_height = 100.0 / 3.0;
            }
            break;

        // 10  -- 2 x 5 (portrait), 5 x 2 (landscape)
        case 10:
            card_width = isPortrait() ? 100.0 / 2.0 : 100.0 / 5.0;
            card_height = isPortrait() ? 100.0 / 5.0 : 100.0 / 2.0;
            break;

        // 8  -- 4 x 2
        case 8:
            card_width = isPortrait() ? 100.0 / 2.0 : 100.0 / 4.0;
            card_height = isPortrait() ? 100.0 / 4.0 : 100.0 / 2.0;
            break;
    }
    dimensions.width = card_width + '%';
    dimensions.height = card_height + '%';

    return dimensions;
};
LayoutManager.prototype.getCardDimensions = function()
{
    return this.card_dimensions;
};


LayoutManager.prototype.layoutCards = function()
{
    // Empty out the contents of the game area.
    this.game_area.html('');

    // Create all cards and put it in the game area
    for (var i = 0; i < this.cards.length; i++)
    {
        // Create the card container
        var card_div = this.createCardDom(i);
        card_div.css(this.card_dimensions);

        // Add the card to the game area.
        this.game_area.append(card_div);
    }
};

LayoutManager.prototype.createCardDom = function(index)
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
    var final_card_path = STR_CARD_PATH + this.cards[index];
    var front_img = $('<img>',
        {
            src: final_card_path
        });
    card_front_span.append(front_img);

    // Put the new card together
    card_div = card_div.append(card_back_span);
    card_div = card_div.append(card_front_span);

    this.game.cards_mgr.enableSingleCard(card_div);
    return card_div;
};

LayoutManager.prototype.shakeScreen = function()
{
    // Shake the screen!
    var temp_wrapper = $('div.page-wrapper');
    setTimeout(
        function()
        {
            temp_wrapper.addClass("anim-quake");
        },
        500);

    setTimeout(
        function()
        {
            temp_wrapper.removeClass("anim-quake");
        },
        1000);
};

// Undergoes the game-winning sequence.
LayoutManager.prototype.winGame = function()
{
    var self = this;
    setTimeout(
        function()
        {
            // Make all the cards disappear.
            self.game_area.html('');

            // Add a YOU WON!!! to the game area, where the cards one were.
            self.game_area.append("<p>YOU WON!!!</p>");
        },
        500
    );

    console.log(this.game_area);
}