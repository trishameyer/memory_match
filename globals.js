var STR_CARD_PATH = 'assets/images/Card_';
var DEFAULT_NUM_PAIRS = 9;

var RULE_KEY_PAIRS_MATCH = 'pairs_match';
var RULE_KEY_ALL_PAIRS_MATCHED = 'all_pairs_matched';

var FLIP_BACK_DELAY = 2000;

var SIZE_ARRAY = [4, 5, 6, 8, 9];
function getRandomSize()
{
    var rand_index = Math.floor(Math.random() * SIZE_ARRAY.length);
    return SIZE_ARRAY[rand_index];
}

var game_ref;
var cm_ref;
var sm_ref;
