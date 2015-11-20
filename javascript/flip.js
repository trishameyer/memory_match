var timer;
var count = 0;
var totalMatches = 0;
var card1 = null;
var card2 = null;
var src1 = null;
var src2 = null;
var totalMatch = 0;
var accuracy;
var tries = 0;
var newAccuracy;
var roundVal;
var response = null;
var charCode;
var addpoints = 0;

//flip function
function flip(target_element) {
    console.log(totalMatches);
    var nodeList = $('.card');
    var curCount = 0;
    for(var i = 0; i < nodeList.length; i++){
        if($(nodeList[i]).hasClass('clicked')){
            curCount += 1;
            if(curCount === 2){
                return;
            }
        }
    }



    if(timer){
        return;//break out of function if true;
    }



    if (count < 2) {// if less than two cards are flipped

        if (count > 0){ //if there's 1 or more cards flipped
            card2 = target_element;
            $card2 = $(card2);
            if(card1!==card2){//if second click is not same card as first
                $card2.addClass('clicked'); //flip second
                src2 = $card2.find('img:first').attr('src');
                count+=1;
                //console.log(card1, src1, count);
                tries += 1; //we now have another try
                //console.log('tries:'+ tries);

                if(src1===src2){//if match
                    matchAudio();
                    var curFunding = addpoints + 33333; // add points to your variable
                    // console.log('newFunding : ' + curFunding + ' ' + typeof curFunding);

                    var stat = commas(curFunding); // use that variable of the score and use the function to add commas

                    $('#funding').next().find('span').text(stat);// put the stat on the board with comma currency format
                    addpoints += 33333;  //add new score to to your variable, so the points will be added to this score next time$card2.find('.front').on('webkitAnimationEnd', function(

                    $card2.find('.front').on('webkitAnimationEnd', function(){
                        $card2.find('.front, .back').addClass('morphEnd').removeClass('morph');
                        shift();
                    });

                    $card2.find('.front').on('webkitTransitionEnd', function(){
                        console.log('flip done');
                        $card2.find('.front, .back').removeAttr('src');
                        $card2.find('.front, .back').addClass('morph');//css animation morph
                    });



                    card1 = null;// cards go back to null
                    card2 = null;
                    src1 = null;
                    src2 = null;
                    totalMatch += 1;
                    console.log(totalMatches);
                    accuracy = (totalMatch/tries)*100;
                    newAccuracy = accuracy.toFixed(0);
                    //console.log('accuracy:'+accuracy);
                    $('#accuracy').next().find('span').text(newAccuracy);

                    if(totalMatch === 9){//if all cards are match
                        if(!($card2.find('.back, .front').is(':animated')) === true) {
                            $('#nextRound').fadeIn('slow').slideDown('slow');
                        }
                    }

                    if(addpoints >= 1000000){
                        $('#modalWin').show();
                    }

                }else{//if not a match

                    timer = true;
                    shake();


                    setTimeout(function(){
                        $card1.removeClass('clicked');
                        $card2.removeClass('clicked');
                        timer = false;// if the timer at the beginning of the function is still true.. exit the function
                    }, 800);

                    accuracy = (totalMatch/tries)*100;
                    newAccuracy = accuracy.toFixed(0);
                    $('#accuracy').next().find('span').text(newAccuracy);
                    //console.log('Matches:'+totalMatch);

                    //console.log('accuracy:'+accuracy);

                }
                count = 0;

            }

        }else{ //count is not greater than 0, no cards are flipped
            $(target_element).addClass('clicked');
            card1 = target_element;
            $card1 = $(card1);
            src1 = $card1.find('img:first').attr('src');
            count += 1;

            //console.log($('audio')[0])
            //console.log(card1, src1, count);
        }

        flipAudio();

    }else{

    }
}