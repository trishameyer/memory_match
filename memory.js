var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var reset_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var accuracy_percent = (Math.floor((accuracy) * 100));
var card_front = [];
var cards = 6;



function card_creation(){

    var div_card =  $('<div>').addClass('col-md-2 card');
    var back_img = $('<img>').attr('src','images/darla.jpg').addClass('cards');
    var front_img = $('<img>').attr('src','images/lilturtle.jpg').addClass('cards');
    $(back_img).append(front_img);
    var div_back = $('<div>').addClass('back').append(back_img);
    var div_front = $('<div>').addClass('back').append(back_img);


    $(div_card).append(div_back);
    $('#game-area').append(div_card);
}





function board_creation(){
    var i = 0;
    while(i < cards){
        card_creation();
        i++;
    }
}
board_creation();




$('.back').click(function(){
    $(this).hide();
});



/*

function cardClick(element) {
    var front_img = $(element).parent().find('.front');
    //hides back of card
    var back = $(element);
    $(back).hide()
    //if cards are already matched wont record as matched again
    if (front_img.hasClass('match')) {
        return;
    }
    console.log(front_img);

    //checks if its first card if true stores src in first_card_clicked
    if (first_card_clicked == null) {
        //stores first_card_clicked var with src
        first_card_clicked = $(element).parent().find('.front');
        console.log("this is the img with class " + (front_img));

    }
    else {
        // stores src in second_card_clicked var
        second_card_clicked = $(element).parent().find('.front');
        attempts++;

        //check if we have a match
        if (first_card_clicked.find('img').attr('src') == second_card_clicked.find('img').attr('src')) {
            $(first_card_clicked).find('img').addClass('match');
            $(second_card_clicked).find('img').addClass('match');
            console.log('first set ', first_card_clicked.find('.front').find('img').attr('src'), second_card_clicked.find('.front').find('img').attr('src'));
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
            console.log('second set ', first_card_clicked, second_card_clicked);

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
    console.log('reset works', reset_counter, attempts);
    $('#win').css('visibility', 'hidden');
    $('.play_again').css('visibility', 'hidden');
    reset_stats();
}

function display_stats() {
    console.log(match_counter);
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

*/