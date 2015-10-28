///bounce on match   //Jquery Animate
function bounce(){
    // bounce
    $card2.animate({"bottom": "+=90"}, 20, function(){
        $(this).animate({bottom: '-=23'}, 40, function(){
            $(this).removeClass('clicked');
        });
    }).fadeOut('fast');
    $card1.animate({"bottom": "+=90"}, 20, function(){
        $(this).animate({bottom: '-=23'}, 40, function(){
            $(this).removeClass('clicked');
        });
    }).addClass('match_rotate').fadeOut('fast');
}