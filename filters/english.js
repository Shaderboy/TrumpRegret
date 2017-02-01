var util = require("../lib/util");
var regex = util.regex;
var track = util.track;

track("@realDonaldTrump");

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
    regex( "i (voted for|supported) you" ),
    regex( "i (" + adverbsRegexSet + ")? regret (voting for|supporting) you" ),
    regex( "i (" + adverbsRegexSet + ")? wish I (didn't vote|(hadn't|never) voted) for you" )
]
