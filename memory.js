var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var reset_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var accuracy_percent = (Math.floor((accuracy) * 100));
var cards = 18;


function card_creation() {
    var card_front_img_random = ['images/lilturtle.jpg', 'images/lilturtle.jpg', 'images/darl.png', 'images/darl.png', 'images/doris.jpg', 'images/doris.jpg',
        'http://showbizgeek.com/wp-content/uploads/2013/04/Screen-Shot-2013-04-29-at-18.45.30.png', 'http://showbizgeek.com/wp-content/uploads/2013/04/Screen-Shot-2013-04-29-at-18.45.30.png',
        'https://s-media-cache-ak0.pinimg.com/originals/1c/0c/70/1c0c70c869e98cd5c9ad0fd68410a5ff.jpg', 'https://s-media-cache-ak0.pinimg.com/originals/1c/0c/70/1c0c70c869e98cd5c9ad0fd68410a5ff.jpg',
        'http://static.tumblr.com/jrqkomz/hOxmf1y09/finding_nemo.jpg', 'http://static.tumblr.com/jrqkomz/hOxmf1y09/finding_nemo.jpg', 'https://s-media-cache-ak0.pinimg.com/236x/a9/3f/11/a93f11b692924f7dc50b095c70aa9d7a.jpg',
        'https://s-media-cache-ak0.pinimg.com/236x/a9/3f/11/a93f11b692924f7dc50b095c70aa9d7a.jpg', 'http://media.coveringmedia.com/media/images/movies/2012/09/09/nemo_02cf.jpg',
        'http://media.coveringmedia.com/media/images/movies/2012/09/09/nemo_02cf.jpg', 'http://mobileanimalbackgrounds.com/img/shark/finding-nemo-nemo-dory-a-shark.jpg', 'http://mobileanimalbackgrounds.com/img/shark/finding-nemo-nemo-dory-a-shark.jpg'];

//generate random img index assign it to front img
    var front = Math.floor(Math.random() * (card_front_img_random.length - 1));
//dom creation
    var front_img = $('<img>').attr('src', card_front_img_random[front]).addClass('cards');
    var back_img = $('<img>').attr('src', 'images/darla.jpg').addClass('cards');
    var div_back = $('<div>').addClass('back').append(back_img).attr('onclick', 'cardClick(this)');
    var div_front = $('<div>').addClass('front').append(front_img);
    var div_card = $('<div>').addClass('col-md-2 card bottom_row');
    $(div_back).append(back_img);
    $(div_front).append(front_img);
    $(div_card).append(div_front, div_back);
    $('#game-area').append(div_card);

//splices img index from array in order for there to be no more than the matching pair on board
    card_front_img_random.splice(front, 1);
}

//loops through card creation until there are 18 cards
function board_creation() {
    var i = 0;
    while (i < cards) {
        card_creation();
        i++;
    }
}
//runs board creation
board_creation();


function cardClick(element) {
    var front_img = $(element).parent().find('.front');
    //hides back of card
    var back = $(element);
    $(back).hide();
    //if cards are already matched wont record as matched again
    if (front_img.hasClass('match')) {
        return;
    }

    //checks if its first card if true stores src in first_card_clicked
    if (first_card_clicked == null) {
        //stores first_card_clicked var with src
        first_card_clicked = $(element).parent().find('.front');

    }
    else {
        // stores src in second_card_clicked var
        second_card_clicked = $(element).parent().find('.front');
        attempts++;

        //check if we have a match
        if (first_card_clicked.find('img').attr('src') == second_card_clicked.find('img').attr('src')) {
            $(first_card_clicked).find('img').addClass('match');
            $(second_card_clicked).find('img').addClass('match');
            //set global var back to null
            first_card_clicked = null;
            second_card_clicked = null;

            //increase match counter
            match_counter++;
            display_stats();
            if (match_counter == total_possible_matches) {
                $('#win').css('visibility', 'visible');
                $('.play_again').css('visibility', 'visible');
            }


        }
        //Cards did not match rest back to show and set global var to null
        else {
            var reset_card_1 = $(first_card_clicked).parent().find('.back');
            var reset_card_2 = $(second_card_clicked).parent().find('.back');
            $(reset_card_1).show(1000);
            $(reset_card_2).show(1000);
            first_card_clicked = null;
            second_card_clicked = null;

        }

    }
}


function reset() {
    reset_counter++;
    games_played++;
    $('.games_played_value').empty().append(games_played);
    $('.match').removeClass('match');
    $('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    $('#win').css('visibility', 'hidden');
    $('.play_again').css('visibility', 'hidden');
    reset_stats();
    $('#game-area').html('');
    board_creation();
}

function display_stats() {
    accuracy = match_counter / attempts;
    var accuracy_percent = (Math.floor((accuracy) * 100));

    $('.games_played_value').empty().append(games_played);
    $('.attempts_value').empty().append(attempts);
    $('.accuracy_value').empty().append(accuracy_percent + "%");

}

function reset_stats() {
    match_counter = 0;
    reset_counter = 0;
    attempts = 0;
    accuracy = 0;
    $('.attempts_value').empty().append(attempts);
    $('.accuracy_value').empty().append(accuracy_percent + "%");

}

