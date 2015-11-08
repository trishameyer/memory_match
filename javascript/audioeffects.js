
var start = 0;
//flip sound
function matchAudio(){

    var audio =  card1.lastChild;

    audio.currentTime = 0;
    audio.play();

    var $src = $card1.find('.back').attr('src');
    $('#match').attr('autoplay', 'autoplay').trigger('load');

}


function flipAudio() {
    $('#flip').attr('autoplay', 'autoplay').trigger('load');
    var $src = $card1.find('.back').attr('src');
}
