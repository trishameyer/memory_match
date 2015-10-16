/**
 * Created by Lance on 10/15/2015.
 */
$(document).ready(function() {

  $(".card").click(card_clicked);

  var first_card_clicked = null;
  var second_card_clicked = null;
  var total_possible_matches = 2;
  var match_counter = 0;

  function card_clicked() {

    //Check and quit, if illegal click is made - an already open card is clicked or 3rd card is clicked during timeout
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
    } else {  //this is second card, so hide back-face, set second_card_clicked to non-Null / save info to it
      console.log("1st card is NOT Null. This is 2nd card");
      $(this).find(".back").hide();
      second_card_clicked = $(this);
      console.log("2nd card is now " + second_card_clicked);

        //Check if 1st and 2nd cards match, increment match_counter, reset 1st and 2nd card trackers to Null
        if (first_card_clicked.find(".front img").attr("src") == second_card_clicked.find(".front img").attr("src")) {
          console.log("A match");
          match_counter++;
          //resetting cards ========//
          first_card_clicked = null;
          second_card_clicked = null;

          setTimeout(function () {
            //Check for winning condition. If match_counter is 2, it is a win. Remove all cards, display winning message
            if (match_counter == total_possible_matches) {
              $(".card").hide();
              $("#img_win").css("display", "initial");
              alert("You Win!");
            } //if not a win, do nothing, wait for next click
          }, 1500);

        } else {  //if 1st and 2nd cards don't match, set Timeout, return back-faces, reset 1st and 2nd card trackers to Null
          console.log("Not a match!")
          setTimeout(function () {
            console.log('setTimeout ran!');
            first_card_clicked.find(".back").show();
            second_card_clicked.find(".back").show();
            first_card_clicked = null;
            second_card_clicked = null;
          }, 2000);  //since this is not a match, wait for next click
        }
    }
  }
});



