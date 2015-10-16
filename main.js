var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;

$(document).ready(function () {

    $(".back").click(card_clicked);

    function card_clicked() {
        $(this).addClass("selected_card");
        //$(this).addClass("back_effect");
        $(this).hide();

        if (first_card_clicked == null) {
            first_card_clicked = $(this).prev().find("img").attr("src");
            return first_card_clicked;
        }

        else {
            second_card_clicked = $(this).prev().find("img").attr("src");
            console.log(second_card_clicked);

            if (first_card_clicked == second_card_clicked) {
                match_counter = match_counter + 1;
                first_card_clicked = null;
                second_card_clicked = null;
                console.log(first_card_clicked);
                console.log(second_card_clicked);
                console.log(match_counter);
                $(".back").removeClass("selected_card")

                if (match_counter == total_possible_matches) {
                    alert("You won! It's working! Yay!");
                }
            }

            else {
                $(".back").unbind();
                setTimeout(function () {
                    $(".selected_card").show();
                    first_card_clicked = null;
                    second_card_clicked = null;
                    console.log(first_card_clicked);
                    console.log(second_card_clicked);
                    console.log(match_counter);
                    $(".back").removeClass("selected_card").click(card_clicked);
                }, 1200);

            }

        }

    };
});


