//Global Variables Declared Here
var first_card_clicked = null;
var second_card_clicked = null;
//Assigned to the total possible number of matches
var total_possible_matches = 9;
//Declare a variable matches and set to 0
var matches = 0;
var attempts = 0;
var accuracy= 0 + '%'; // matches/attempts %
var games_played = 0;
//define a flag variable that controls the ability to click
var canClick = true;
var first = null;
var second = null;


//Add a click handler to each card using either jQuery-intermediate or onclick attribute-fundamentals
$(document).ready(function(){
    shuffle(imgArray);
    //click handler for back of card that calls to function card_clicked
    $('.card').click(function(){
        card_clicked(this);
    });

    //on page load, define a new global variable called games_played & when reset button is clicked it should increment 1
    //var games_played; //this didn't show my values at all

    $('.reset').click(function(){
        games_played++; //not calculating properly when i declare a new variable on page load!
        reset_stats();
        display_stats(); //can't get code quite right in working order
        $('.back').addClass('notFlipped').show();
        $(new_div).hide(); //if this hasn't showed up yet, you get a reference error because the div hasn't been created yet
        $('.card').click(function(){
            card_clicked(this);
        });
    });
});

var imgArray = ['images/bieberPusheen.png', 'images/cookiePusheen.png', 'images/eatingPusheen.png', 'images/glassesPusheen.png', 'images/keyboardPusheen.png', 'images/monoclePusheen.png', 'images/noodlePusheen.png', 'images/pizzaPusheen.png', 'images/pusheen.png', 'images/bieberPusheen.png', 'images/cookiePusheen.png', 'images/eatingPusheen.png', 'images/glassesPusheen.png', 'images/keyboardPusheen.png', 'images/monoclePusheen.png', 'images/noodlePusheen.png', 'images/pizzaPusheen.png', 'images/pusheen.png' ];

//dan start

//declare a function that will randomly pick an image source from your parameter array..original array..and it will store it into a new array
//takes the original array and copies the whole thing into a new array variable so we can use that and not mess with the original array
//declare an empty array variable for later use
//declare a variable that will store the random number that will be the same as the index number we want
// use the original array as the looping reference, and use the method forEach() with a function in it that goes through each index of the original array
//store a random whole number between 0 and the length of the new array in the already declared variable of index
//take the random number generated and use that as your index space in your new array, take that index value and add it to the empty array already declared and your new array has a new length to work with
//take the value at whatever random number you generated and cut it out, with splice, of the new array so it shortens the length of it...make sure you are only cutting out that one value and not multiple ones
//this line before the end of the forEach() loop goes back to beginning of the forEach()loop and loops through the original_array until you loop to the end of the length of the new_array
//end of forEach()loop method
//call the function that will make the cards with the empty array as a parameter, now full of your randomized image sources, and dynamically make cards the cards to have an image with one of the index values in the array you are using as parameter
} //end of the original function you declared at the beginning

//dan end

function makeCards(shuffArray){
    var counter;
    shuffArray.forEach(function(index) {
        counter++;
        var new_img = $('<img>').attr('src', index);
        var new_front_card = $('<div>').addClass('front').append(new_img);
        var back_img = $('<img>').attr('src', 'images/cat_back.gif');
        var new_back_card = $('<div>').addClass('back notFlipped');
        var new_card = $('<div>').addClass('card');

        $(new_back_card).append(back_img);

        $(new_card).append(new_front_card);
        $(new_card).append(new_back_card);
        $('.game-area').append(new_card);
    });
}



function card_clicked(the_card){
    //check the flag variable value: if false(ie. the cards don't match) then exit the card_clicked function
    if(!canClick || $(the_card).find('.back').hasClass('revealed')){
        return;
    }
    //is the first card == to null, if it is then set item clicked to variable first_card_clicked
    $(the_card).find('.back').addClass('revealed').hide();
    //if the card is not already matched....
    if(first_card_clicked == null){ //... and if the card is null
        first_card_clicked = $(the_card).find('.front').find('img').attr('src');
        first = $(the_card).find('.back');
    } else {
        //sets clicked card to variable second_card clicked since it wasn't the first card clicked
        second_card_clicked = $(the_card).find('.front').find('img').attr('src');
        second = $(the_card).find('.back');
        //every time a user attempts to match (clicks second card) the attempts increments by 1
        attempts++;
        //asks if first card clicked is equal to second card click
        if (first_card_clicked == second_card_clicked){
            //increment matches up one and set both card variables equal to null; allows you the ability to click more cards now that the variables are reset
            canClick = false;
            $(first).removeClass('notFlipped');
            $(second).removeClass('notFlipped');
            matches++;
            first_card_clicked = null;
            second_card_clicked = null;
            canClick = true;
            accuracy_percent(matches, attempts);
            //compares number of matched pairs to total possible matches and if they are equal, you win
            if (matches == total_possible_matches){
                //console.log("You won!"); somehow show this to user
                new_div = $('<div>').addClass('new_div').text('You Won!');
                $('.game-area').append(new_div);
                return;
            }
            //1st card clicked is not equal to 2nd card
        } else {
            //set flag variable to false which prevents additional clicks when card clicked is called
            canClick = false;
            setTimeout(function(){
                $('.card').find('.notFlipped').removeClass('revealed').show(10);
                canClick = true; // sets flag variable to true AFTER 2000ms(2 seconds) so you can click the cards after the backs of the cards show
            }, 2000);
            first_card_clicked = null;
            second_card_clicked = null;
            accuracy_percent(matches, attempts);

        } //end of else statement 1st card == 2nd card

        display_stats();
    } //end of else statement 1st card=null

} //end of function


//create a function that calculates the accuracy which is % of matches/attempts
function accuracy_percent(matches, attempts){
    accuracy = (Math.floor(matches/attempts * 100)) + '%';
}

function display_stats(){
    $('.games_played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy);
}

function reset_stats (){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
    $('.game-area').empty(); //doesn't allow me to click on the cards the 2nd time around
    shuffle(imgArray); //adds another 18 cards instead of clearing cards and then creating them again
}






