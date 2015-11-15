/**
 * Created by Andrew N on 11/14/2015.
 */
$( document ).ready(function() {
    if(debug) console.log( "ready!" );
    display_stats();
    assign_random_cards();

    $('body').on("click", "#reset_button", reset_stats);
});