var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

$(document).ready(function () {

    $(".back").click(function () {
        $(this).hide();

        if (first_card_clicked = null) {
            first_card_clicked = $(this).children("img").attr("src");
        }

        console.log(first_card_clicked);
    });

});


