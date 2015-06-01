# Angular Tweets

Get a tweet stream clientside without exposing a private auth token, and without any serverside code. 

The stream will be provided to you via an ordinary $http promise object.

## How does it work?

Twitter has a tight lock on its API. You can't access any API data without a token. However there is a back door, the official Twitter widget which returns HTML.

This module works by scraping the official twitter widget and parsing the result into JSON.

The official twitter widget makes a JSONP call to an API. It does this using a public widget id which allows access to the tweet stream from a single pre-chosen user.

This API call returns a JSON object full of HTML which the widget normally displays in an iframe.

This service pulls that stream, extracts the HTML and reverse engineers it back into a JSON object which can be saved in scope.

Once the tweet stream is in scope you can do what you like with it.

## Can I get a demo?

You can find a working plunkr here.

<http://plnkr.co/edit/gLkDBn?p=preview>

## Kudos

Kudos to Jason Mayes for the idea <http://www.jasonmayes.com/projects/twitterApi/>

## Usage

### Acquiring a widget ID

First go here <https://twitter.com/settings/widgets/new> and create a new widget. Configure the widget to your liking. The data from the widget will be used to compose the response. Inspect the generated widget code and grab the public widget ID. You will need this to configure the service.

**You will not need an API key, secret, etc, etc.**

### Using the service

Inject "ngTweets" into your app. The module provides a service called tweets. Call tweets.get and pass it your widget ID. You will get back an $http promise object which you can interact with in the usual way.

### The controller:

    angular.module('app', ['ngTweets'])
      .controller('twitterController', function($scope, tweets) {
        tweets.get({
          widgetId: '123456'
        }).success(function(data) {
          $scope.feed = data;
        });
      });

### The view:

    <body ng-controller="twitterController">
      <ul>
        <li ng-repeat='tweet in feed.tweets'>
          <pre>{{tweet | json }}</pre>
        </li>
      </ul>
    </body>

## Sample response

You will receive an object containing a header, and an array with a maximum of 20 tweets.

    {
      headers: {
        "status": 200,
        "xPolling": 30,
        "time": 1431449793
      },
      tweets: [
        {
          "retweet": false,
          "id": "598156558984290304",
          "html": "<a href=\"https://twitter.com/kasiakatie\" class=\"PrettyLink profile customisable h-card\" dir=\"ltr\" data-scribe=\"element:mention\">@<b class=\"p-nickname\">kasiakatie</b></a> An unusual choice for breakfast, but we're glad that you enjoyed it :-)",
          "text": "@kasiakatie An unusual choice for breakfast, but we're glad that you enjoyed it :-)",
          "author": {
            "url": "https://twitter.com/higgidy",
            "avatar": "https://pbs.twimg.com/profile_images/378800000697698644/d09c29afa453ce0e224266efda526210_normal.jpeg",
            "fullName": "Higgidy",
            "nickName": "@higgidy"
          },
          "updated": "53m",
          "permalink": "https://twitter.com/higgidy/status/598156558984290304"
        },
        {
          "retweet": false,
          "id": "598130095232913408",
          "html": "Mmm, good choice <a href=\"https://twitter.com/Mmelulu\" class=\"PrettyLink profile customisable h-card\" dir=\"ltr\" data-scribe=\"element:mention\">@<b class=\"p-nickname\">Mmelulu</b></a>",
          "text": "Mmm, good choice @Mmelulu",
          "author": {
            "url": "https://twitter.com/higgidy",
            "avatar": "https://pbs.twimg.com/profile_images/378800000697698644/d09c29afa453ce0e224266efda526210_normal.jpeg",
            "fullName": "Higgidy",
            "nickName": "@higgidy"
          },
          "updated": "2h",
          "permalink": "https://twitter.com/higgidy/status/598130095232913408"
        },
        {
          "retweet": false,
          "id": "598125208021635072",
          "html": "During the <a href=\"https://twitter.com/artistshouses\" class=\"PrettyLink profile customisable h-card\" dir=\"ltr\" data-scribe=\"element:mention\">@<b class=\"p-nickname\">artistshouses</b></a> you can wander into random people's houses (including Abby &amp; Cedar's) and not get told off <a href=\"http://t.co/mSA5CV480n\" class=\"PrettyLink link media customisable\" data-pre-embedded=\"true\" dir=\"ltr\" data-scribe=\"\">pic.twitter.com/mSA5CV480n</a>",
          "text": "During the @artistshouses you can wander into random people's houses (including Abby & Cedar's) and not get told off pic.twitter.com/mSA5CV480n",
          "author": {
            "url": "https://twitter.com/higgidy",
            "avatar": "https://pbs.twimg.com/profile_images/378800000697698644/d09c29afa453ce0e224266efda526210_normal.jpeg",
            "fullName": "Higgidy",
            "nickName": "@higgidy"
          },
          "updated": "2h",
          "permalink": "https://twitter.com/higgidy/status/598125208021635072"
        }
      ]
    }

## Error handling

The header object contains information about any errors that occurred upstream. The header status would normally be 200. Anything else is an error.

Downstream errors are currently not handled. Please feel free to submit a patch for this.


## Contributing

Please feel free to contribute by forking this repository and submitting a pull request. Contributors will be credited in this Readme.

## About me

I'm an Angular developer and trainer working out of Brighton, England. You can find Angular lessons on my website here <http://www.nicholasjohnson.com>

## Browser compatibility

IE9+ only please. It should work everywhere Angular 1.3.1 works.

## Likelihood of failure

Because this service works by scraping HTML, it will fail if the HTML changes. This could happen at any time without warning. Caution is advised.

## Warranty

This plugin is a dirty low down (albeit functional) hack. My assumption is that this hack is likely to remain available as long as older browsers require JSONP to access the API. However I can make no guarantees on this. This is not an official twitter API, there is no uptime guarantee, Twitter can turn it off at any time.

Caution is advised. Use at your discretion. I take no responsibility for any problems of any kind you may encounter, technical, legal, spiritual, military, etc.

## License

MIT license, use it as you see fit. I'm not going to sue you.

