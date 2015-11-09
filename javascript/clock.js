//clock
var timerInterval;
function clock(startVal){
    $('#settings_input').on('change', function(){
        console.log('interval-stopped');
        //var settingsVal = $('#settings_input').val();
        //var newVal;
        //switch(settingsVal){
        //    case '1':
        //        newVal = 60;
        //        break;
        //    case '2':
        //        newVal = 45;
        //        break;
        //    case '3':
        //        newVal = 30;
        //        break;
        //}
        clearInterval(timerInterval);
        //start = newVal;//make global start variable to new Val also
        //newGame(newVal);
    });

    $('#deadline').next().text(startVal);//add that to clock
    var timerEl = $('#timer-sound')[0];
    timerEl.volume = .2;
    timerEl.play();
    var val = startVal;//doc ready. val is 60
    $('.game-board .row').css('background-color', 'rgba(13, 255, 255, 0.2)');

    timerInterval = setInterval(function(){
        if(timerEl.currentTime>8.8){
            timerEl.currentTime = 0;
            timerEl.play();
        }
        if(val>55) {//greater than 45
            val = val - 1;//-1
            $('.game-board .row').css('background-color', 'rgba(0, 0, 0, 0.74)');
            $('#deadline').next().text(val);//add that to clock

        }else if(val >35 && val <= 55){ //greater than 20
            val = val - 1;//-1
            $('.game-board .row').css('background-color', 'rgba(95, 26, 236, 0.41)');
            $('#deadline').next().text(val);//add that to clock


        } else if(val > 11 && val <= 35) {
            val = val - 1;//-1
            $('.game-board .row').css('background-color', 'rgba(13, 255, 255, 0.2)'); //greater than 10 background green
            $('#deadline').next().text(val);//add that to clock

        } else if(val > 10 && val <= 11) {
            val = val - 1;//-1
            $('.game-board .row').css('background-color', 'rgba(0, 0, 0, 0.74)'); //greater than 10 background green
            $('#deadline').next().text(val);//add that to clock

        }else if(val <=10 && val > 0) {  //less than ten.. pulse red and black
            val = val - 1;//-1
            $('#deadline').next().text(val);//add that to clock
            $('.game-board .row').addClass('warning');
            timerEl.currentTime = 8.9;
            timerEl.play();


        } else if(val < 1){//if 0
            clearInterval(clockInterval);
            timerEl.pause();
            $('.game-board .row').removeClass('warning');
            var x = confirm('play again?');
            if(x){
                $('#round').next().text('A');
                val = 60;

            }
        }
    }, 1000);

}
