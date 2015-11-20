function shake(){

    setTimeout(function(){
        $card1.animate({"left": "+=15px"}, 100, function(){
            $(this).animate({'left': "-=30px"}, 100, function(){
                $(this).animate({'left': '+=15px'});
                $('#notMatch').attr('autoplay', 'autoplay').trigger('load');
            });
        });
        $card2.animate({"left": "+=15px"}, 100, function(){
            $(this).animate({'left': "-=30px"}, 100, function(){
                $(this).animate({'left': '+=15px'});
                $('#notMatch').attr('autoplay', 'autoplay').trigger('load');
            });
        });
    }, 500);//temporarilly unavailable while card is static
}