var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

$(document).ready(function () {

    $(".back").click(card_clicked);

    function card_clicked() {
        $(this).hide();

        if (first_card_clicked == null) {
            first_card_clicked = $(this).prev().find("img").attr("src");
            console.log(first_card_clicked);
            return first_card_clicked;
        }

        else {
            second_card_clicked = $(this).prev().find("img").attr("src");
            console.log(second_card_clicked);
            return second_card_clicked;
        }

    };
});


