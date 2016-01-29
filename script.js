//Global Variables Declared Here
var first_card_clicked = null;
var second_card_clicked = null;
//Assigned to the total possible number of matches
var total_possible_matches = 2;
match_counter = 0;



//Add a click handler to each card using either jQuery-intermediate or onclick attribute-fundamentals
$(document).ready(function(){
    //click handler for back of card that calls to function card_clicked
    $('.card').click(function(){
        console.log("card clicked: ", this);
        card_clicked(this);
    });
});

function card_clicked(the_card){
    console.log("card_clicked function called", the_card);

    if(first_card_clicked == null){
        first_card_clicked = $(the_card).find('.front').find('img').attr('src');
        $(the_card).find('.back').hide();
        console.log("First Card Variable set: ", first_card_clicked);
    } else {
        second_card_clicked = $(the_card).find('.front').find('img').attr('src');
        $(the_card).find('.back').hide();
        console.log("Second card variable set:", the_card);

        if (first_card_clicked == second_card_clicked){
            console.log("1st and 2nd card are the same");
            match_counter++;
            console.log("Match counter increments to: ", match_counter);
            first_card_clicked = null;
            console.log("Reset 1st card value: ", first_card_clicked);
            second_card_clicked = null;
            console.log("Reset 1st card value: ", second_card_clicked);

            if (match_counter == total_possible_matches){
                console.log("You won!"); //somehow show this to user
            }
        } else {
            console.log("cards are not the same");
            $('.back').delay(2000).show(100);
            //add some sort of shake to other cards if clicked in this duration
            first_card_clicked = null;
            console.log("Reset 1st card value: ", first_card_clicked);
            second_card_clicked = null;
            console.log("Reset 1st card value: ", second_card_clicked);

        } //end of 1st card = 2nd card conditional

    } //end of card=null conditional

} //end of function

