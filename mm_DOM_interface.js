/**
 * Created by Andrew N on 11/14/2015.
 */
$( document ).ready(function() {
    if(debug) console.log( "ready!" );
    var board1 = new GameBoard();
    board1.display_stats();
    board1.populate_board();

    $('body').on("click", "#reset_button", board1.reset_board);
});