//Global Variables Declared Here
var first_card_clicked = null;
var second_card_clicked = null;
//Assigned to the total possible number of matches
var total_possible_matches = 9;
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
                canClick = true; // sets flag variable to true after 2000ms(2 seconds) so you can click the cards after the backs of the cards show
            }, 2000);
            first_card_clicked = null;
            second_card_clicked = null;

        } //end of else statement 1st card == 2nd card

    } //end of else statement card=null

} //end of function

//Declare a global variable "matches" and set equal to 0: every time applications finds a match,this variable should be incremented by 1
var matches = 0;
for(matches; matches<=9; matches++){

}
//Declare a global variable "attempts" and set to 0: every time a user attempts a match (clicks on 2nd card) the attempts should be incremented by 1
var attempts= 0;
//Declare a global variable, accuracy, and set it to 0: accuracy is defined as a percentage of matches / attempts
var accuracy = 0;
//Declare a global variable, games_played and set it to 0: when the page is loaded a new global variable should be defined called games_played. When the game is reset by clicking the reset button the games_played should be incremented by 1.
var games_played = 0;
//Declare a function, display_stats, that has the following functionality:
        //Inserts the games_played value into the element that would be selected like this “
            // .games-played .value”:
        //Insert attempts value into the element that would be selected using this selector“
            // .attempts .value”
        //Formats accuracy to be a percentage number with the % sign
        //Takes formatted accuracy and inserts the value of the variable into the element that has the
            // selector of “.accuracy .value”
function display_stats(){

}
//Declare a function, reset_stats, that has the following functionality
        //Resets variable accuracy to 0
        //Resets variable matches to 0
        //Resets variable attempts to 0
        //Calls display_stats function
function reset_stats(){

}
//On Reset button click, the function handler for the click event should have the following functionality
        //increment games_played by 1
        //call reset_stats
        //call display_stats
        //Reset all cards to have the back face showing
$('.reset').on('click', function(){
    reset_stats();
    display_stats();
});
