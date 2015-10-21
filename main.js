/** Memory Match - created by Lance **/

$(document).ready(function(){

  $(".card").click(card_clicked);
  $(".reset").click(reset_stats);

  var first_card_clicked = null;
  var second_card_clicked = null;
  var total_possible_matches = 9;
  var matches = 0;
  var attempts = 0;
  var accuracy = 0;
  var games_played = 0;

  function card_clicked(){

    //Quit if illegal click is made - an already open card or 3rd card is clicked during timeout
    console.log("back-face hidden? " + $(this).find(".back").is(':hidden'));
    if ($(this).find(".back").is(':hidden') || (second_card_clicked != null)) {
      console.log('illegal move! exit this click');
      return;
    }

    //if this is first card, hide back-face, set first_card_clicked to non-Null / save info to it
    if (first_card_clicked == null) {
      console.log("1st card is Null");
      $(this).find(".back").hide();
      first_card_clicked = $(this);
      console.log("1st card is now " + first_card_clicked);
    }
    else {  //this is second card, so hide back-face, set second_card_clicked to non-Null / save info to it
      console.log("1st card is NOT Null. This is 2nd card");
      attempts++;
      console.log(attempts + "attempts so far")
      $(this).find(".back").hide();
      second_card_clicked = $(this);
      console.log("2nd card is now " + second_card_clicked);

        //Check if 1st and 2nd cards match, increment match_counter, reset 1st and 2nd card trackers to Null
        if (first_card_clicked.find(".front img").attr("src") == second_card_clicked.find(".front img").attr("src")) {
          console.log("A match");
          matches++;
          //Display stats after flipping a matching pair
          display_stats()
          //Reset card trackers
          first_card_clicked = null;
          second_card_clicked = null;

          setTimeout(function (){
            //Check for winning condition
            if (matches == total_possible_matches)
            {
              //$(".card").hide();
              $("#img_win").css("display", "initial");
              alert("You Win!");
            } //if not a win, do nothing, wait for next click
          }, 1500);
        }
        else {  //if 1st and 2nd cards don't match, do the following
          console.log("Not a match!");
          //Display stats after flipping an un-matching pair
          display_stats()
          //setTimeout 2 seconds before hiding cards
          setTimeout(function (){
            console.log('setTimeout ran');
            //Hide cards by showing back-faces
            first_card_clicked.find(".back").show();
            second_card_clicked.find(".back").show();
            //Reset card trackers
            first_card_clicked = null;
            second_card_clicked = null;
          }, 2000);  //since this is not a match, wait for next click
        }
    }

  }

  function display_stats(){
    $(".attempts .value").text(attempts);
    accuracy = Math.floor((matches / attempts) * 100);
    $(".accuracy .value").text(accuracy + "%");
    $(".games-played .value").text(games_played + " times");
  }

  function reset_stats(){
    matches = 0;
    attempts = 0;
    games_played++;
    display_stats();
    $(".card .back").show();
    $("#img_win").hide();
  }

});



