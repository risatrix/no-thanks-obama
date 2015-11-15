# No "Thanks, Obama!"

The problem: newsroom social media managers have a firehose of information to deal with. Some of it presents a chance for genuine engagement, but inevitably, much of it comes down to "Thanks, Obama!" or similarly unhelpful feedback.

How to separate the noise from the signal?

"No 'Thanks, Obama!'" is a filtering and feedback loop tool for social media managers and reporters. It helps surface helpful feedback or important questions by dentifying relevant questions and comments and allowing for more meaningful engagement with the community.

Our demo focuses on Twitter and Facebook, but we hope to extend the functionality to comments, email, and beyond. We also started to research a keyword-based alogrithm to help order the information, using a scoring system to present the most relevant information first. Ideally, newsroom managers could customize this algorithm to reflect their individual audience.

Made at SNDMakes Austin by @achavez, @risatrix, @chrismchaines & @mmmcgaha (with special thanks to @chriscoyier for the logo).

## Grunt tasks

- `grunt combinetweets` - combine all the Tweets from the Twitter API responses (twitter_data_*.json) into a single file, [twitter_data_combined.json](twitter_data_combined.json)
- `grunt combinefb` - combine all the Facebook API responses (facebook_data_*.json) into a single file, [faceboook_data_combined.json](facebook_data_combined.json)
- `grunt codingdata` - make a [CSV](for-coding.csv) ~~that has the post text for coding; should only include @mentions with the handle at the beginning of the tweet, replies (as determined by the API) and quote tweets~~ with the text of 100 Facebook comments for coding using the output from the `grunt combinetweets` and `grunt combinefb` commands
