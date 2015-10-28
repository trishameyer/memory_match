
//dynamic array
var theSrcArray = [
    'images/bighead.jpg',
    'images/bighead.jpg',
    'images/gavin.jpg',
    'images/gavin.jpg',
    'images/amanda.jpg',
    'images/amanda.jpg',
    'images/dinesh.jpg',
    'images/dinesh.jpg',
    'images/richard.jpg',
    'images/richard.jpg',
    'images/gilfoyle.jpg',
    'images/gilfoyle.jpg',
    'images/jared.jpg',
    'images/jared.jpg',
    'images/jian.jpg',
    'images/jian.jpg',
    'images/peter.png',
    'images/peter.png'
]

//function for a new game, randomize cards,
function newGame() {
    clock();
    $('.card').remove();
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
    var $gameRowCol = $('.game-board .row').children();

    var $randGameboard = shuffle(theSrcArray); //make a new array of randomized src attributes
    for (var i = 0; i < $randGameboard.length; i++) {
        $imgBack = $('<img>').attr('class', 'back');//img back
        curSrc = $randGameboard[i]; //store the current index value of random array in a variable
        $imgBack.attr('src', curSrc);

        $imgFront = $('<img>').attr('class', 'front').attr('src', 'images/piper_front.jpg');//img front
        $borderTop = $('<div>').attr('id', 'border-top');//bortop
        $borderBottom = $('<div>').attr('id', 'border-bottom');//borbottom
        $borderRight = $('<div>').attr('id', 'border-right');//bor right
        $borderLeft = $('<div>').attr('id', 'border-left');//bor left
        $cardContainer = $('<div>').attr('class', 'card');
        $cardContainer.append($imgBack, $imgFront, $borderTop, $borderBottom, $borderRight, $borderLeft).click(function(){
            flip(this);
            flipAudio();
        });

        $($gameRowCol[i]).append($cardContainer);


    }
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

