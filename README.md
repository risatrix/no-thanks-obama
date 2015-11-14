# no-thanks-obama

Great things TK from @risatrix, @chrismchaines & @mmmcgaha

## Grunt tasks

- `grunt combinetweets` - combine all the Tweets from the Twitter API responses (twitter_data_*.json) into a single file, [twitter_data_combined.json](twitter_data_combined.json)
- `grunt combinefb` - combine all the Facebook API responses (facebook_data_*.json) into a single file, [faceboook_data_combined.json](facebook_data_combined.json)
- `grunt codingdata` - make a [CSV](for-coding.csv) ~~that has the post text for coding; should only include @mentions with the handle at the beginning of the tweet, replies (as determined by the API) and quote tweets~~ with the text of 100 Facebook comments for coding using the output from the `grunt combinetweets` and `grunt combinefb` commands
