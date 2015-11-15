/**
 * Created by Andrew N on 11/14/2015.
 */
var debug = true;

var GameBoard = function(){
    var self = this;
    self.first_card_clicked = false;
    self.second_card_clicked = false;
    self.stats = {
        'matches': 0,
        'attempts':0,
        'accuracy': 0,
        'games_played':0
    }
    self.mode = {
        'easy':{
            'card_per_row':6,
            'num_rows': 3,
            'possible_matches':18
        },
        'medium': {
            'cards_per_row':10,
            'num_rows': 5,
            'possible_matches':50
        },
        'hard': {
            'cards_per_row':12,
            'num_rows':6,
            'possible_matches':72
        }
    }
    self.img_arr = ['card_1.png', 'card2.png', 'card3.png', 'card4.png', 'card5.png', 'card6.png', 'card7.png',
        'card8.png', 'card9.png', 'card_1.png', 'card2.png', 'card3.png', 'card4.png', 'card5.png', 'card6.png',
        'card7.png', 'card8.png', 'card9.png'];

    self.populate_board = function(){
        var temp_arr = [];
        var num_cards_assigned = 0;
        var current_row = null;
        if(debug) console.log('cards_displayed');
        for(var i=0; i<img_arr.length; i++){//fill temp array with indexes totalling number of cards
            temp_arr.push(i);
        }

        for(var i=0; i<img_arr.length; i++){//loop through img array to create rows with 6 cards
            //also sets random value to each img in array for display of all cards
            var rand_index = Math.floor(Math.random() * (temp_arr.length));//gives random number index from 0 to array length
            //rand index will change as temp array gets smaller after each iteration
            if(current_row == null || num_cards_assigned % cards_per_row === 0){//add 6 cards per row b/c var cards_per_row set as 6
                var row = $('<div>').addClass('row');
                $('#game-area').append(row);
                current_row = row;
            }
            if(debug) console.log(img_arr[temp_arr[rand_index]]);
            self.add_card_to_row(current_row, img_arr[temp_arr[rand_index]], temp_arr[rand_index]); //add card at temp array index
            num_cards_assigned++; //for checking card additions per row

            temp_arr.splice(rand_index,1);//remove placeholder from temp_array to mark usage
        }
    }
    self.add_card_to_row = function(row, card_img, id){
        var back_img_raw = 'card_back.png';
        var card = $('<div>').addClass('card');

        var front = $('<div>').addClass('front');
        var front_img = $('<img>').attr('src','images/'+ card_img );
        $(front_img).attr('id','front-img-'+id);
        var back = $('<div>').addClass('back');
        $(back).attr('id','back-'+id);

        $(back).click( function(){
            self.check_click(id);
        });

        var back_img = $('<img>').attr('src','images/' + back_img_raw); //adds back img to all cards

        front.append(front_img);
        back.append(back_img);
        card.append(front);
        card.append(back);

        row.append(card);
    }
    self.getSrc = function(id) { //for obtaining image source for comparison
        return $('#front-img-'+id).attr('src');
    }
    self.check_click = function(id){
        console.log('test clicked ' + id);
        var element = $('#back-'+id);

        if(first_card_clicked == false){
            //console.log('if initiated');
            $(element).hide(); //show first card
            first_card = element;
            first_card_clicked = true; //first card clicked
            card_img_1 = getSrc(id);
            if(debug) console.log(card_img_1);
        }
        else{
            if(debug) console.log('else initiated');
            $(element).hide(); //show second card
            second_card = element;
            second_card_clicked = true; //second card clicked
            card_img_2 = getSrc(id);
            if(debug) console.log(card_img_2);
            attempts_counter += 1;
            if(debug) console.log('number of attempts is equal to: ' + attempts_counter);

            if(card_img_1 == card_img_2 && first_card_clicked && second_card_clicked){
                match_counter += 1;
                if(debug) console.log(match_counter);
                first_card_clicked = false; //reset variables for next card set
                second_card_clicked = false; //reset variables for next card set
                display_stats();
            }
            else{ //no match!
                if(debug) console.log('second else initiated');
                first_card_clicked = false; //reset variables for next card set
                second_card_clicked = false; //reset variables for next card set

                hide_card(first_card);
                hide_card(second_card);

                display_stats();
            }
        }

        if(match_counter == total_possible_matches){
            if(debug) console.log('you win!');
            games_played += 1;
            if(debug) console.log('number of games played is: ' + games_played);
            display_stats();
        }
    }
    self.display_stats = function(){
        if(debug) console.log('display_stats function called');

        matches = match_counter;
        attempts = attempts_counter;
        accuracy = Math.round((matches / attempts) * 100);

        if(debug) console.log(matches);
        if(debug) console.log(attempts);
        if(debug) console.log(accuracy);
        $('#games_played_stat').text(games_played);
        $('#attempts_stat').text(attempts);
        $('#accuracy_stat').text(((attempts>0)?(accuracy) + '%' : '-'));
    }
    self.reset_stats = function(){
        if(debug) console.log('reset_stats function called');
        var all_cards = $(".back");
        hide_card(all_cards);
        display_stats();
    }
}

var Card = function(card_img, id){
    var self = this;
    self.clicked = false;
    self.matched = false;
    self.img = card_img;
    self.id = id;
    self.hide_self = function(){
        $(this).show(1000);

    }
}