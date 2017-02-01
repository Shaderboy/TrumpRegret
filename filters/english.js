var util = require("../lib/util");
var regex = util.regex;
var track = util.track;

track("vegan");

var adverbs = [
    'really', 'totally', 'probably', 'defin[ia]tely', 'absolutely', 'actually',
    'certainly', 'literally', 'legitimately', 'genuinely', 'honestly', 'truly',
    'undoubtedly', 'unquestionably'
];
var adverbsRegexSet = adverbs.join('|');

var recidivismAdjectives = [
	'hard', 'tough', 'difficult', 'rough'
];
var recidivismAdjectivesRegexSet = recidivismAdjectives.join('|');

module.exports = [
    regex( "help me (be( a)?|become( a)?|go) #?vegan" ),
    regex( "i (" + adverbsRegexSet + ")? ?(want to|wanna|would like to) (be( a)?|become( a)?|go) #?vegan" ),
    // forcing this to be at the start of the tweet is a simple hack for excluding things like "don't tell me I should go vegan"
    regex( "^(i think)? ?i (" + adverbsRegexSet + ")? ?(should) (go|be) #?vegan" ),
    regex( "i (" + adverbsRegexSet + ")? ?(will|do)? ?(need|want) help (going|becoming( a)?|being( a)?|staying( a)?) #?vegan" ),
    regex( "i (" + adverbsRegexSet + ")? ?(want to|wanna|would like to|should) (try) (going|becoming( a)?|being( a)?) #?vegan" ),
    regex( "i('| a)?m (" + adverbsRegexSet + ")? ?(considering|thinking (about|of)|mulling over|planning on) (going|becoming( a)?|being( a)?) #?vegan" ),
    regex( "i (" + adverbsRegexSet + ")? ?(wish) i (was|were) #?vegan" ),
    regex( "i (can|could) (" + adverbsRegexSet + ")? ?(see|picture|imagine)( myself)? (going|being( a)?|becoming( a)?) #?vegan"),
	// stemming recidivism
    regex( "i('| a)?m having a (" + recidivismAdjectivesRegexSet + ") time (staying|being) #?vegan"),
    regex( "i? ?don'?t know how much longer i( can| will|'ll) (stay|be) #?vegan"),
    regex( "(being)? ?#?vegan('| i)s (too)? ?(" + recidivismAdjectivesRegexSet + ")"),
    regex( "((it)?('| i)s)? ?(too)? ?(" + recidivismAdjectivesRegexSet + ") (to be|being|staying) #?vegan")
]
