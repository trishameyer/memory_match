//dynamic script creation for youtube api

var $newtag = $('<script>', {
    src: "https://www.youtube.com/iframe_api" ,
});

$('script').before($newtag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('introVid', {
        height: '100%',
        width: '100%',
        videoId: 'mQF1tHf6IOE',
        playerVars: {'controls': 0, 'rel': 0},
        events: {
            'onReady': onPlayerReady,

            'onStateChange': onPlayerStateChange,

        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // check if video ended and remove player
    if (event.data == YT.PlayerState.ENDED) {
        //console.log($('#introVid').remove());
        $('#introVid').hide();
        $('#modalIntro').show();
    }
}

