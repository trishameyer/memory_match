//dynamic array
var objArray = [
    {imgSource: 'images/bighead.jpg', audioSrc: 'audio/bighead.mp3'},
    {imgSource: 'images/bighead.jpg', audioSrc: 'audio/bighead.mp3'},
    {imgSource: 'images/gavin.jpg', audioSrc: 'audio/gavin.mp3'},
    {imgSource: 'images/gavin.jpg', audioSrc: 'audio/gavin.mp3'},
    {imgSource: 'images/erlich.jpg', audioSrc: 'audio/erlich.mp3'},
    {imgSource: 'images/erlich.jpg', audioSrc: 'audio/erlich.mp3'},
    {imgSource: 'images/dinesh.jpg', audioSrc: 'audio/dinesh.mp3'},
    {imgSource: 'images/dinesh.jpg', audioSrc: 'audio/dinesh.mp3'},
    {imgSource: 'images/richard.jpg', audioSrc: 'audio/richard.mp3'},
    {imgSource: 'images/richard.jpg', audioSrc: 'audio/richard.mp3'},
    {imgSource: 'images/gilfoyle.jpg', audioSrc: 'audio/gilfoyle.wav'},
    {imgSource: 'images/gilfoyle.jpg', audioSrc: 'audio/gilfoyle.wav'},
    {imgSource: 'images/jared.jpg', audioSrc: 'audio/jared.mp3'},
    {imgSource: 'images/jared.jpg', audioSrc: 'audio/jared.mp3'},
    {imgSource: 'images/jian.jpg', audioSrc: 'audio/jian.mp3'},
    {imgSource: 'images/jian.jpg', audioSrc: 'audio/jian.mp3'},
    {imgSource: 'images/peter.png', audioSrc: 'audio/peter.mp3'},
    {imgSource: 'images/peter.png', audioSrc: 'audio/peter.mp3'}
];

//function for a new game, randomize cards,
function newGame(n) {

    $('.card').remove();
    console.log($('.card'));
    $('#accuracy').next().find('span').text(0);
    $('#funding').next().find('span').text(0);
    $('#round').next().text('A');
    var $imgBack;
    var curSrc;
    var $imgBack;
    var $imgFront;
    var $borderTop;
    var $borderBottom;
    var $borderRight;
    var $borderLeft;
    var $cardContainer;
    var $audio;
    var $gameRowCol = $('.game-board .row').children();

    var $randGameboard = shuffle(objArray); //make a new array of randomized src attributes
    for (var i = 0; i < $randGameboard.length; i++) {
        $imgBack = $('<img>').attr('class', 'back');//img back
        curSrc = $randGameboard[i].imgSource; //store the current index value of random array in a variable
        $imgBack.attr('src', curSrc);

        $imgFront = $('<img>').attr('class', 'front').attr('src', 'images/piper_front.jpg');//img front
        $borderTop = $('<div>').attr('id', 'border-top');//bortop
        $borderBottom = $('<div>').attr('id', 'border-bottom');//borbottom
        $borderRight = $('<div>').attr('id', 'border-right');//bor right
        $borderLeft = $('<div>').attr('id', 'border-left');//bor left
        $cardContainer = $('<div>').attr('class', 'card');
        $audio = $('<audio>').attr('src', $randGameboard[i].audioSrc);//make audio tag with audio src

        $cardContainer.append($imgBack, $imgFront, $borderTop, $borderBottom, $borderRight, $borderLeft, $audio).click(function(){
            flip(this);
            flipAudio();
        });

        $($gameRowCol[i]).append($cardContainer);
    }
    clock(n);
}

//array of cards
var $imgArray = $('.card');

//array of images(the function below makes this into the source array;
var srcArray = [];
//for each index value in the array of images ('.back'), push the attr 'src' into a new array. ^^
$imgArray.each(function(){
    srcArray.push($(this).attr('src'));
});


//shuffle function
function shuffle(array){
    var i = array.length;
    var rand;
    var temp;
    while(--i>0){
        rand = Math.floor(Math.random()*(i+1));
        temp = array[i];array[i] = array[rand];array[rand] = temp;
    }
    return array;
}
//shuffle the game board below..

