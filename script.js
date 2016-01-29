//Global Variables Declared Here
var first_card_clicked = null;
var second_card_clicked = null;
//Assigned to the total possible number of matches
var total_possible_matches = 2;
match_counter = 0;



//Add a click handler to each card using either jQuery-intermediate or onclick attribute-fundamentals
$(document).ready(function(){
    $(".back").click(function() {
        //console.log('card clicked: ',this);
        card_clicked(this);
    });

    //$(".front").click(function() {
    //    $(".front").next().show();
    //});

});

function card_clicked(the_card){
    $(the_card).hide();
}

function card_clicked(the_card){
    //could i also just use (first_card_clicked) with no condition?
    if (first_card_clicked == null){
        first_card_clicked =  $(this).find("img").attr('src');
    } else {
        if(first_card_clicked == second_card_clicked){

        }
    }
}
