/* dynamic and getting cards to come back on new round. *///okay so the transition speed on your .front/.back class in css is .5s for the flip, and makes this happen in .5seconds even though this callback is after what's being run.. :(//the problem with doing everything in css lets say doing a bunch of animations on the card.. the transition is already set.. so the timing is fixed for multiple animations..$(document).ready(function(){     newGame();    $('.card').addClass('clicked');    $('.reset').click(function(){    });    $('.card').click(function () {        flip(this);        playAudio();    });    $('#start').click(function(){       hideModal();    });});//shift()//matchAnimation()//bounce()//clockfunction clock(){    var val = 48;//doc ready. val is 60    setInterval(function(){        if(val>45) {//greater than 45            val = val - 1;//-1            $('.game-board .row').css('background-color', 'rgba(0, 0, 0, 0.74)');            $('#deadline').next().text(val);//add that to clock        }else if(val >30 && val <= 45){ //greater than 20                val = val - 1;//-1            $('.game-board .row').css('background-color', 'rgba(95, 26, 236, 0.41)');                $('#deadline').next().text(val);//add that to clock        } else if(val > 11 && val <= 30) {            val = val - 1;//-1            $('.game-board .row').css('background-color', 'rgba(13, 255, 255, 0.2)'); //greater than 10 background green            $('#deadline').next().text(val);//add that to clock        } else if(val > 10 && val <= 11) {            val = val - 1;//-1            $('.game-board .row').css('background-color', 'rgba(0, 0, 0, 0.74)'); //greater than 10 background green            $('#deadline').next().text(val);//add that to clock        }else if(val <=10 && val > 0) {  //less than ten.. pulse red and black            val = val - 1;//-1            $('#deadline').next().text(val);//add that to clock            $('.game-board .row').addClass('warning');        } else if(val < 1){//if 0            $('.game-board .row').removeClass('warning');            var x = confirm('play again?');            if(x){                $('#round').next().text('A');                val = 15;            }        }    }, 1000);}///bounce on match   //Jquery Animatefunction bounce(){    // bounce    $card2.animate({"bottom": "+=23px"}, 290, function(){        $(this).animate({bottom: '-=23px'}, 290);    }).fadeOut('slow ease-out');    $card1.animate({"bottom": "+=23"}, 290, function(){        $(this).animate({bottom: '-=23'}, 290);    }).fadeOut('slow ease-out');}//morph into sphere  //Jquery Animate//if match, one card moves to the other shift! Jquery Animatevar result;function shift(){    var posCard1 = $card1.offset();//grab card one position    var posCard2 = $card2.offset();    var card1X = posCard1.left;    var card2X = posCard2.left;    var card1Y = posCard1.top;    var card2Y = posCard2.top;    var resultX;    var resultY;    var inputX;    var inputY;    //console.log(card1X, card2X);    var thisVal = 1;    //shift on match    if(card2Y>card1Y) {//is second click further down from top than first?        resultY = (card2Y - card1Y);        inputY = '-=' + resultY.toFixed(0).toString() + 'px';        if (card2X > card1X) {//if second card is further from left than first            resultX = card2X - card1X;            inputX = '-=' + resultX.toFixed(0).toString() + 'px';            $card2.find('.front, .back').animate({left: inputX, top: inputY}, 50, function(){                $card1.parent().find('#border-top, #border-bottom, #border-right, #border-left').addClass('matchAnimation');            });            console.log('line 120');        } else {//x2 < x1 but y2 still further down from top than y1            resultX = card1X - card2X;            inputX = '+=' + resultX.toFixed(0).toString() + 'px';            $card2.find('.front, .back').animate({left: inputX, top: inputY}, 50, function(){                $card1.parent().find('#border-top, #border-bottom, #border-right, #border-left').addClass('matchAnimation');            });        }    } else{//if second card y is not as far down as 1st card y        resultY = (card1Y - card2Y);        inputY = '+=' + resultY.toFixed(0).toString() + 'px';// y will have to be added            console.log('line 131');        if (card2X > card1X) {//if second card is further from left than first            resultX = card2X - card1X;            inputX = '-=' + resultX.toFixed(0).toString() + 'px';            $card2.find('.front, .back').animate({left: inputX, top: inputY}, 50, function(){                $card1.parent().find('#border-top, #border-bottom, #border-right, #border-left').addClass('matchAnimation');            });        } else {//x2 < x1 but y2 still closer to top            resultX = card1X - card2X;            inputX = '+=' + resultX.toFixed(0).toString() + 'px';            $card2.find('.front, .back').animate({left: inputX, top: inputY}, 50, function(){                $card1.parent().find('#border-top, #border-bottom, #border-right, #border-left').addClass('matchAnimation');            });        }    }}//flip soundfunction playAudio() {    $('audio').attr('autoplay', 'autoplay').trigger('load');}function shake(){  setTimeout(function(){      $card1.animate({"left": "+=15px"}, 100, function(){          $(this).animate({'left': "-=30px"}, 100, function(){              $(this).animate({'left': '+=15px'});          });      });      $card2.animate({"left": "+=15px"}, 100, function(){          $(this).animate({'left': "-=30px"}, 100, function(){              $(this).animate({'left': '+=15px'});          });      });  }, 500);//temporarilly unavailable while card is static}function nextRound(){    newGame();    roundVal = $('#round').next().text(); //grabs string value    charCode = roundVal.charCodeAt();//charCode is the number associated with letter    nextRoundVal = String.fromCharCode(charCode + 1);    $('#round').next().text(nextRoundVal);//change round value    $('.clicked').removeClass('clicked');//flip cards back over.    //    make accuracy go back down to 0    $('#accuracy').next().find('span').text(0);    $('.front:animated .back:animated').stop();}//show modal functionfunction showModal(){    setTimeout(function(){        $('#modalIntro').css('display', 'block');    }, 10500);}//hide modal functionfunction hideModal(){    $('#modalIntro .btn').click(function(){       $('#modalIntro').hide();    });}//dynamic script creation for youtube apivar $newtag = $('<script>', {    src: "https://www.youtube.com/iframe_api" ,});$('script').before($newtag);/*function onYouTubeIframeAPIReady() {    player = new YT.Player('introVid', {        height: '100%',        width: '100%',        videoId: 'mQF1tHf6IOE',        playerVars: {'controls': 0, 'rel': 0},        events: {            'onReady': onPlayerReady,            'onStateChange': onPlayerStateChange,        }    });}function onPlayerReady(event) {    event.target.playVideo();}var done;function onPlayerStateChange(event) {    // check if video ended and remove player    if (event.data == YT.PlayerState.ENDED) {        //console.log($('#introVid').remove());        done = true;    }}*/var timer;var count = 0;var totalMatches = 0;var card1 = null;var card2 = null;var src1 = null;var src2 = null;var totalMatch = 0;var accuracy;var tries = 0;var newAccuracy;var roundVal;var response = null;var charCode;var addpoints = 0;//flip functionfunction flip(target_element) {    if(timer){        return;//break out of function if true;    }    if (count < 2) {// if less than two cards are flipped        if (count > 0){ //if there's 1 or more cards flipped            card2 = target_element;            $card2 = $(card2);            if(card1!==card2){//if second click is not same card as first                $card2.addClass('clicked'); //flip second                src2 = $card2.find('img:first').attr('src');                count+=1;                //console.log(card1, src1, count);                tries += 1; //we now have another try                //console.log('tries:'+ tries);                if(src1===src2){//if match                    var curFunding = addpoints + 33333; // add points to your variable                   // console.log('newFunding : ' + curFunding + ' ' + typeof curFunding);                    var stat = commas(curFunding); // use that variable of the score and use the function to add commas                    $('#funding').next().find('span').text(stat);// put the stat on the board with comma currency format                    addpoints += 33333;  //add new score to to your variable, so the points will be added to this score next time$card2.find('.front').on('webkitAnimationEnd', function(                    $card2.removeClass('clicked');                    $card2.find('.front').on('webkitTransitionEnd', function(){                        $card2.find('.front, .back').addClass('morph').removeAttr('src');                        $card2.find('.front').on('webkitAnimationEnd', function(){                            console.log('end');                            $card2.find('.front, .back').removeClass('morph').addClass('morphEnd');                            shift();                        });                    });                    //$card2.find('.front, .back').removeClass('morph').addClass('morphEnd');                    //shift();                    card1 = null;// cards go back to null                    card2 = null;                    src1 = null;                    src2 = null;                    totalMatch += 1;                    //console.log('Matches:'+totalMatch);                    accuracy = (totalMatch/tries)*100;                    newAccuracy = accuracy.toFixed(0);                    //console.log('accuracy:'+accuracy);                    $('#accuracy').next().find('span').text(newAccuracy);                    if(totalMatch === 9){//if all cards are match                        if(!($card2.find('.back, .front').is(':animated'))=== true) {                            response = confirm('Ready for the next venture round?');                            if (response) {                                nextRound();                            }                        }                    }                }else{//if not a match                    timer = true;                    shake();                    setTimeout(function(){                        $card1.removeClass('clicked');                        $card2.removeClass('clicked');                        timer = false;// if the timer at the beginning of the function is still true.. exit the function                    }, 800);                    accuracy = (totalMatch/tries)*100;                    newAccuracy = accuracy.toFixed(0);                    $('#accuracy').next().find('span').text(newAccuracy);                    //console.log('Matches:'+totalMatch);                    //console.log('accuracy:'+accuracy);                }                count = 0;            }        }else{ //count is not greater than 0, no cards are flipped            $(target_element).addClass('clicked');            card1 = target_element;            $card1 = $(card1);            src1 = $card1.find('img:first').attr('src');            count += 1;            $('audio').attr('autoplay','autoplay');            //console.log($('audio')[0])            //console.log(card1, src1, count);        }        playAudio();    }else{    }}//function for putting commas in the right spot:function commas(num){    var string = num.toString();   // console.log(typeof string + '' + string);    var arr = string.split('');    var count = 0;    var newArray = [];    var finalString = null;    newArray.unshift(arr[arr.length-1]);    count += 1;    for(var x = arr.length-2; x>=0; x--){        if(count%3===0){            newArray.unshift(arr[x] + ',');            count+=1;        }else{            newArray.unshift(arr[x]);            count+=1;        }    }    finalString = newArray.join('');    return finalString;}//dynamic arrayvar theSrcArray = [    'images/bighead.jpg',    'images/bighead.jpg',    'images/gavin.jpg',    'images/gavin.jpg',    'images/amanda.jpg',    'images/amanda.jpg',    'images/dinesh.jpg',    'images/dinesh.jpg',    'images/richard.jpg',    'images/richard.jpg',    'images/gilfoyle.jpg',    'images/gilfoyle.jpg',    'images/jared.jpg',    'images/jared.jpg',    'images/jian.jpg',    'images/jian.jpg',    'images/peter.png',    'images/peter.png']//function for a new game, randomize cards,function newGame() {    $('.clicked').fadeIn('slow');    $('.clicked').removeClass('match clicked');    $('#accuracy').next().find('span').text(0);    $('#funding').next().find('span').text(0);    $('#round').next().text('A');    var $newEl;    var curSrc;    var $randGameboard = shuffle(theSrcArray); //make a new array of randomized src attributes    for (var i = 0; i < $randGameboard.length; i++){        $newEl = $('<img>').attr('class', 'back');        curSrc = $randGameboard[i]; //store the current index value of random array in a variable        $newEl.attr('src', curSrc);        $($imgArray[i]).prepend($newEl);    }}//array of cardsvar $imgArray = $('.card');//array of images(the function below makes this into the source array;var srcArray = [];//for each index value in the array of images ('.back'), push the attr 'src' into a new array. ^^$imgArray.each(function(){    srcArray.push($(this).attr('src'));});//shuffle functionfunction shuffle(array){    var i = array.length;    var rand;    var temp;    while(--i>0){        rand = Math.floor(Math.random()*(i+1));        temp = array[i];array[i] = array[rand];array[rand] = temp;    }    return array;}//shuffle the game board below..