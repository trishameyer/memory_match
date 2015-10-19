var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(function () {

    function display_stats() {
        accuracy = Math.round(100*(match_counter / attempts));
        $(".games-played .value").text(games_played);
        $(".attempts .value").text(attempts);
        if (match_counter == 0 && attempts == 0) {
            $(".accuracy .value").text("100%");
        }
        //else if (match_counter == 1 && attempts == 1)  {
        //    $(".accuracy .value").text("100%");
        //}
        else {
            $(".accuracy .value").text(accuracy + "%");
        }
    }

    function reset_stats() {
        games_played = games_played + 1;
        accuracy = 0;
        match_counter = 0;
        attempts = 0;
        $(".back").show();
        display_stats();
    }

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
            attempts = attempts + 1;
            console.log(second_card_clicked);

            if (first_card_clicked == second_card_clicked) {
                match_counter = match_counter + 1;
                display_stats();
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
                    display_stats();
                    first_card_clicked = null;
                    second_card_clicked = null;
                    console.log(first_card_clicked);
                    console.log(second_card_clicked);
                    console.log(match_counter);
                    $(".back").removeClass("selected_card").click(card_clicked);
                }, 1200);

            }

        }

    }

    $(".back").click(card_clicked);

    $(".reset").click(reset_stats);

    display_stats();

});


