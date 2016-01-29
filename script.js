//Declare a global variable "matches" and set equal to 0: every time applications finds a match,this variable should be incremented by 1
var matches = 0;
for(matches; matches<=9; matches++){
    if(this.src = true) {

    }
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
