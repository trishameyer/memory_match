
var start = 0;
//flip sound
function matchAudio(){



    var $src = $card1.find('.back').attr('src');
    $('#match').attr('autoplay', 'autoplay').trigger('load');
    console.log(card1);

}


function flipAudio() {
    $('#flip').attr('autoplay', 'autoplay').trigger('load');
    var $src = $card1.find('.back').attr('src');
}
