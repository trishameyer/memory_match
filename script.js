//Global Variables Declared Here
var first_card_clicked = null;
var second_card_clicked = null;
//Assigned to the total possible number of matches
var total_possible_matches = 2;
match_counter = 0;
//define a flag variable that controls the ability to click
var canClick = true;



//Add a click handler to each card using either jQuery-intermediate or onclick attribute-fundamentals
$(document).ready(function(){
    //click handler for back of card that calls to function card_clicked
    $('.card').click(function(){
        console.log("card clicked: ", this);
        card_clicked(this);
    });
});

function card_clicked(the_card){
    //check the flag variable value: if false(ie. the cards don't match) then exit the card_clicked function
    if(!canClick){
        return;
    }
    //is the first card == to null, if it is then set item clicked to variable first_card_clicked
    if(first_card_clicked == null){
        first_card_clicked = $(the_card).find('.front').find('img').attr('src');
        $(the_card).find('.back').hide();
    } else {
        //sets clicked card to variable second_card clicked since it wasn't the first card clicked
        second_card_clicked = $(the_card).find('.front').find('img').attr('src');
        $(the_card).find('.back').hide();
        //asks if first card clicked is equal to second card click
        if (first_card_clicked == second_card_clicked){
            //increment match_counter up one and set both card variables equal to null; allows you the ability to click more cards now that the variables are reset
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            //compares number of matched pairs to total possible matches and if they are equal, you win
            if (match_counter == total_possible_matches){
                console.log("You won!"); //somehow show this to user
                new_div = $('<div>').addClass('new_div').text('You Won!');
                $('.game-area').append(new_div);
            }
            //1st card clicked is not equal to 2nd card
        } else {
            //set flag variable to false which prevents additional clicks when card clicked is called
            canClick = false;
            setTimeout(function(){
                $('.back').show(10);
                canClick = true; // sets flag variable to true after 2000ms so you can click the cards
            }, 2000);
            console.log("cards are not the same");
            console.log("delayed on turnover");


            $('.back').delay(2000).show(100);
            first_card_clicked = null;
            second_card_clicked = null;

        } //end of else statement 1st card == 2nd card

    } //end of else statement card=null

} //end of function

