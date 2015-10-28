//if match, one card moves to the other shift! Jquery Animate
var result;

function shift(){
    var posCard1 = $card1.offset();//grab card one position
    var posCard2 = $card2.offset();
    var card1X = posCard1.left;
    var card2X = posCard2.left;
    var card1Y = posCard1.top;
    var card2Y = posCard2.top;
    var resultX;
    var resultY;
    var inputX;
    var inputY;
    //console.log(card1X, card2X);
    var thisVal = 1;
    //shift on match

    $card1.on('webkitTransitionEnd', function(){//this will show up for times for for divs that are done
        bounce();
    });

    //shift , add line animation.. when line animation done.. bounce/fadeout

    //shift, when shift done, add line animation and bounce

    $card2.find('.front, .back').addClass('spin'); //spin then once done.. shift
    $card2.find('.front').on('webkitAnimationEnd', function() {
        $card2.find('.front, .back').removeClass('spin');

        if (card2Y > card1Y) {//is second click further down from top than first?
            resultY = (card2Y - card1Y);
            inputY = '-=' + resultY.toFixed(0).toString() + 'px';

            if (card2X > card1X) {//if second card is further from left than first
                resultX = card2X - card1X;
                inputX = '-=' + resultX.toFixed(0).toString() + 'px';
                $card2.find('.front, .back').animate({left: inputX, top: inputY}, 100, function () {

                    $card1.parent().find('#border-top, #border-bottom, #border-right, #border-left').addClass('matchAnimation');

                });

            } else {//x2 < x1 but y2 still further down from top than y1
                resultX = card1X - card2X;
                inputX = '+=' + resultX.toFixed(0).toString() + 'px';
                $card2.find('.front, .back').animate({left: inputX, top: inputY}, 100, function () {

                    $card1.parent().find('#border-top, #border-bottom, #border-right, #border-left').addClass('matchAnimation');
                });

            }

        } else {//if second card y is not as far down as 1st card y
            resultY = (card1Y - card2Y);
            inputY = '+=' + resultY.toFixed(0).toString() + 'px';// y will have to be added

            if (card2X > card1X) {//if second card is further from left than first
                resultX = card2X - card1X;
                inputX = '-=' + resultX.toFixed(0).toString() + 'px';
                $card2.find('.front, .back').animate({left: inputX, top: inputY}, 100, function () {

                    $card1.parent().find('#border-top, #border-bottom, #border-right, #border-left').addClass('matchAnimation');
                });


            } else {//x2 < x1 but y2 still closer to top
                resultX = card1X - card2X;
                inputX = '+=' + resultX.toFixed(0).toString() + 'px';
                $card2.find('.front, .back').animate({left: inputX, top: inputY}, 100, function () {

                    $card1.parent().find('#border-top, #border-bottom, #border-right, #border-left').addClass('matchAnimation');
                });


            }
        }
    });
}
