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
    $(this).find(".back").hide();

    if (first_card_clicked == null) {
      console.log("1st yes null");
      first_card_clicked = $(this);
    }
    else {
      console.log("1st not null");
      second_card_clicked = $(this);

      if (first_card_clicked.find(".front img").attr("src") == second_card_clicked.find(".front img").attr("src")) {
        console.log("a match");
        match_counter++;
        first_card_clicked = null;
        second_card_clicked = null;

        if (match_counter == total_possible_matches) {
          $(".card").hide();
          $("#img_win").css("display","initial");
          alert("You Win!");
        }
        else {
        }
      }

      else {
        setTimeout(function () {
          console.log("no match");
          first_card_clicked.find(".back").show();
          second_card_clicked.find(".back").show();
          first_card_clicked = null;
          second_card_clicked = null;
          console.log("Ack! Try again.");
        }, 1500);
      }

    }
  }

});
