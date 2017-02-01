# TrumpRegret
Twitter Bot that retweets people who express regret about voting for Trump

TrumpRegret tracks usage of the mention "@realDonaldTrump" on twitter's public stream, and processes each item, looking for exact matches on an array of preset phrases. If there's a match, the bot will retweet.

## Installing

1. Clone this repository
2. Install [node.js and npm](https://nodejs.org)
3. Run `npm install` in the directory that you cloned this repository into
4. Create a `settings.js` file with the format below, filling in your Twitter API credentials and Twitter botname:
5. Run `node .`

#### `settings.js` format:
```javascript
module.exports = {
  CREDS: {
    consumer_key:         '...',
    consumer_secret:      '...',
    access_token:         '...',
    access_token_secret:  '...'
  },
  FILTERS: [],
  HANDLE: 'botname'
}
```

## Running the tests

Simply run `npm test`

## Disabling retweets

Retweets can be disabled for testing purposes by using the argument `--dry-run`, e.g. `node index.js --dry-run`. In dry run mode, matching tweets will be logged to the console but not retweeted.
