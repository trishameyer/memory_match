function nextRound(){
    var lastFundingVal = $('#funding').next().find('span').text();
    newGame(start);
    $('#funding').next().find('span').text(lastFundingVal);

    $('.card').fadeIn('slow');
    roundVal = $('#round').next().text(); //grabs string value
    charCode = roundVal.charCodeAt();//charCode is the number associated with letter
    nextRoundVal = String.fromCharCode(charCode + 1);
    $('#round').next().text(nextRoundVal);//change round value
    $('.clicked').removeClass('clicked');//flip cards back over.
    //    make accuracy go back down to 0
    $('#accuracy').next().find('span').text(0);
    $('.front:animated .back:animated').stop();
}