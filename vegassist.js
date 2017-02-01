var Twit = require('twit');
var settings = require('./settings.js');
var TweetFilter = require('./lib/filter');
var util = require('./lib/util');
var path = require('path');
var fs = require('fs');

// Declare your own Twitter app credentials here, if duplicating
var T = new Twit(settings.CREDS);
// Set a delay time constant of 2 minutes - RTs will be delayed by this amount
var DELAYTIME = 1000 * 60 * 2;
// Load filters from all files in the filters directory
var settingsFilteredTerms = settings.FILTERED_TERMS || [];
var settingsFilters = settings.FILTERS || [];

var handle = settings.HANDLE || "";
if (handle.length > 0){
	if (handle.indexOf('@') != 0)
		handle = '@' + handle;
	util.track(handle);
}

var excludedTerms = settingsFilteredTerms;
T.get("blocks/list", function(err, data, response){
	if (err) return console.log(err);
	for (var i = 0; i < data.users.length; i++){
		excludedTerms.push(data.users[i].name);
	}
	console.log(excludedTerms);
});

var filter = new TweetFilter('filters', settingsFilteredTerms, settingsFilters, handle);
// Whenever the Twitter stream notifies us of a new Tweet with the term 'vegan' (or its international equivalents), we handle it!
var stream = T.stream('statuses/filter', { track: util.trackedTerms });
// Run with option '--dry-run' to disable retweeting and instead log matches to console
var isDryRun = process.argv[2] === '--dry-run';
// Use a different log file for dry-run
var logFile = path.join(__dirname, (isDryRun ? 'matches.dry-run' : 'matches') + '.json');
// Check that we can write to disk, so that we can log it upfront and safely ignore errors later
// This allows the bot to function even if it doesn't have write access to the disk
fs.appendFile(logFile, "", function(err) {
    if (err) { console.warn("Unable to write to log file: " + path.relative(__dirname, logFile)); }
})

console.log("Loaded filters: " + Object.keys(filter.filters).join(", "));

// log tweets and their matches as json, each tweet/match will be a separate line of json
var logMatches = function(tweet, matches) {
    // flatten match objects a bit
    matches = matches.map(function(match){
        return {match: match[0], index: match.index, filter: match.filter.toString(), filterList: match.filterList };
    })
    // provide an empty callback to swallow errors
    fs.appendFile(logFile, JSON.stringify({ tweet: tweet, matches: matches }) + "\n", function(){});
}

console.log("Tracking terms: " + util.trackedTerms.join(", "));

stream.on('connect', function (response) {
    console.log("Connecting to Twitter..." + (isDryRun ? " (dry run, will not retweet matches)" : ""))
})
stream.on('connected', function (response) {
    console.log("Connected")
})
stream.on('reconnect', function (response) {
    console.log("Reconnecting...")
})
stream.on('tweet', function(tweet) {
    var matches = filter.matches(tweet);
    if (matches) {
        logMatches(tweet, matches);
        if (isDryRun) {
            console.log(tweet.id_str + ' : ' + tweet.user.screen_name + ' : ' + tweet.text);
            return;
        }
        // positive match; let's retweet!
        setTimeout(function(){T.post('statuses/retweet/:id', {id: tweet.id_str}, function(err, data, response) {
            if (err) {
                console.log(err);
                return false;
            }
            console.log('Retweeted: ' + tweet.id_str);
        });}, DELAYTIME);
    }
})
stream.on('blocked', function(block){
	console.log("Someone was just blocked: " + block);
})
