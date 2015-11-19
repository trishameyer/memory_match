function RulesManager(game)
{
    this.game = game;
    this.rules = {};

    this.init();
}
RulesManager.prototype.init = function()
{
    // Add rules to the dictionary
    this.addRule(new Rule_PairsMatch(this));
    this.addRule(new Rule_AllPairsMatched(this));
};
RulesManager.prototype.addRule = function(new_rule)
{
    this.rules[new_rule.key_name] = new_rule;
};
RulesManager.prototype.checkRule = function(rule_key)
{
    return this.rules[rule_key].evaluate();
};

/**
 ***********************************************************************************
 */
function Rule(rm)
{
    this.rm = rm;
    this.key_name = '';
}
Rule.prototype.evaluate = function() {};

/**
 * Rule PairsMatch
 * @constructor
 */
function Rule_PairsMatch(rm)
{
    Rule.call(this, rm);
    this.key_name = RULE_KEY_PAIRS_MATCH;
}
Rule_PairsMatch.prototype = new Rule();
Rule_PairsMatch.constructor = Rule_PairsMatch;
Rule_PairsMatch.prototype.evaluate = function()
{
    var cm = this.rm.game.cards_mgr;

    if ($(cm.first_card_clicked.get()).find("span.front>img").attr('src') === $(cm.second_card_clicked.get()).find("span.front>img").attr('src'))
        return true;

    return false;
};
/**
 * Rule_AllPairsMatched
 * @constructor
 */
function Rule_AllPairsMatched(rm)
{
    Rule.call(this, rm);
    this.key_name = RULE_KEY_ALL_PAIRS_MATCHED;
}
Rule_AllPairsMatched.prototype = new Rule();
Rule_AllPairsMatched.constructor = Rule_AllPairsMatched;
Rule_AllPairsMatched.prototype.evaluate = function()
{
    var cm = this.rm.game.cards_mgr;
    var stats = this.rm.game.stats_mgr;

    if (stats.getNumMatches() == cm.getTotalPairs())
        return true;

    return false;
};