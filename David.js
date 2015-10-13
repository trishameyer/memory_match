$(function(){
    newGame();
});

function newGame(){
    $('.card').click(function(e) {
        $(this).addClass('clicked');  //on click rotate 180deg
    }
}



var randomBoard = shuffle('$imgArray');//variables to keep track of
var $funding = $('#funding>.value');
var $accuracy = $('#accuracy>.value');
var $round = $('#round>.value');
var srcOfFlipped = [];
var currentFlipped = 0; //you'll add one to this value when a card is flipped
var TotalFlipped = 0; //total ammount of cards flipped on the game board, there's 18 so once total = 18..






//array of images (back);
var $imgArray = $('.back');

//array of images(the function below makes this into the source array;
var srcArray = [];

//array of sourses function
$imgArray.each(function(){
    srcArray.push($(this).attr('src'));
});

console.log(srcArray);


//shuffle function
function shuffle(array){
    var i = array.length;
    var rand;
    var temp;
    while(--i>0){
        rand = Math.floor(Math.random()*(i+1));
        temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }
    return array;
}
//shuffle the game board below..










