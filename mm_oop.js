/**
 * Created by Andrew N on 11/14/2015.
 */
var debug = true;
var win_msg = $('#win_msg');
var GameBoard = function(){
    var self = this;
    self.first_card_clicked = false;
    self.second_card_clicked = false;
    self.first_card;
    self.second_card;
    self.card_array = [];
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
            'possible_matches':9
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
        for(var i=0; i<self.img_arr.length; i++){//fill temp array with indexes totalling number of cards
            temp_arr.push(i);
        }

        for(var i=0; i<self.img_arr.length; i++){//loop through img array to create rows with 6 cards
            //also sets random value to each img in array for display of all cards
            var rand_index = Math.floor(Math.random() * (temp_arr.length));//gives random number index from 0 to array length
            //rand index will change as temp array gets smaller after each iteration
            if(current_row == null || num_cards_assigned % self.mode.easy['cards_per_row'] === 0){//add 6 cards per row b/c var cards_per_row set as 6
                var row = $('<div>').addClass('row');
                $('#game-area').append(row);
                current_row = row;
            }
            if(debug) console.log(self.img_arr[temp_arr[rand_index]]);
            var card = new Card(current_row, self.img_arr[temp_arr[rand_index]], temp_arr[rand_index]);//add card at temp array index
            self.card_array.push(card);
            num_cards_assigned++; //for checking card additions per row

            temp_arr.splice(rand_index,1);//remove placeholder from temp_array to mark usage
        }
    }

    self.getSrc = function(id) { //for obtaining image source for comparison
        return $('#front-img-'+id).attr('src');
    }
    self.check_child_click = function(card){
        var total_possible_matches = self.img_arr.length / 2;
        if(debug) console.log('test clicked ' + card.id);
        var element = $('#back-' + card.id);

        if(self.first_card_clicked == false){
            //console.log('if initiated');
            $(element).hide(); //show first card
            self.first_card = card;
            self.first_card_clicked = true; //first card clicked
            card_img_1 = self.getSrc(card.id);
            if(debug) console.log('card_img_1 is: ', card_img_1);
        }
        else{
            if(debug) console.log('else initiated');
            $(element).hide(); //show second card
            self.second_card = card;
            self.second_card_clicked = true; //second card clicked
            card_img_2 = self.getSrc(card.id);
            if(debug) console.log('card_img_2 is: ', card_img_2);
            self.stats['attempts'] += 1;
            if(debug) console.log('number of attempts is equal to: ' + self.stats.attempts);

            if(card_img_1 == card_img_2 && self.first_card_clicked && self.second_card_clicked){
                self.stats['matches'] += 1;
                if(debug) console.log('number of matches is now: ',self.stats['matches']);
                self.first_card_clicked = false; //reset variables for next card set
                self.second_card_clicked = false; //reset variables for next card set
                self.display_stats();
            }
            else{ //no match!
                if(debug) console.log('second else initiated');
                self.first_card_clicked = false; //reset variables for next card set
                self.second_card_clicked = false; //reset variables for next card set

                self.first_card.hide_self();
                self.second_card.hide_self();

                self.first_card = undefined;
                self.second_card = undefined;

                self.display_stats();
            }
        }

        if(self.stats['matches'] == total_possible_matches){
            self.stats['games_played'] += 1;
            if(debug) console.log('number of games played is: ' + self.stats['games_played']);
            self.display_stats();
            self.display_win_modal();
        }
    }
    self.display_stats = function(){
        if(debug) console.log('display_stats function called');

        self.stats['accuracy'] = Math.round((self.stats['matches'] / self.stats['attempts']) * 100);

        if(debug) console.log('accuracy is: ', self.stats['accuracy']);
        $('#games_played_stat').text(self.stats['games_played']);
        $('#attempts_stat').text(self.stats['attempts']);
        $('#accuracy_stat').text(((self.stats['attempts']>0)?(self.stats['accuracy']) + '%' : '-'));
    }
    self.reset_board = function(){
        if(debug) console.log('reset_stats function called');
        var all_cards = $(".back");
        for(var i=0;i<self.card_array.length; i++){
            self.card_array[i].hide_self();
        };
        self.display_stats();
    }
    self.display_win_modal = function(){
        $('#win_modal').modal('show');
    }
}

var Card = function(row, card_img, id){
    var self = this;
    self.clicked = false;
    self.matched = false;
    self.card_img = card_img;
    self.id = id;
    var back_img_raw = 'card_back.png';
    var card = $('<div>').addClass('card');

    var front = $('<div>').addClass('front');
    var front_img = $('<img>').attr('src','images/'+ self.card_img );
    $(front_img).attr('id','front-img-' + self.id);
    var back = $('<div>').addClass('back');
    $(back).attr('id','back-' + self.id);

    $(back).click( function(){
        self.set_click();
    });

    var back_img = $('<img>').attr('src','images/' + back_img_raw); //adds back img to all cards

    front.append(front_img);
    back.append(back_img);
    card.append(front);
    card.append(back);

    row.append(card);

    self.set_click = function(){
        self.clicked = true;
        self.notify_board_of_click(self);
    }
    self.notify_board_of_click = function(card){
        board1.check_child_click(card)
    }
    self.hide_self = function(){
        if(debug) console.log('hide_self called');
        $('#back-' + self.id).show(1000);
    }
}

$( document ).ready(function() {
    if(debug) console.log( "ready!" );
    board1.display_stats();
    board1.populate_board();

    $('body').on("click", "#reset_button", board1.reset_board);
});

var board1 = new GameBoard();