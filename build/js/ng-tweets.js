// Nicholas Johnson (www.nicholasjohnson.com)
// Forward Advance Training (www.forwardadvance.com)
// MIT licence

(function() {
'use strict';

angular.module('ngTweets', [])
  .service('tweets', ["$http", function($http) {
    var service = this;
    this.get = function(config) {
      return $http({
        url: url(config.widgetId, config.lang),
        method: 'JSONP',
        transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
          return parse(value);
        })
      });
    };
    this.getTweets = function(config) {
      return service.get(config)
        .then(trim);
    };
  }]);

function trim(request) {
  return request.data.tweets;
}

function url(id, lang) {
  return [
    'http://cdn.syndication.twimg.com/widgets/timelines/',
    id,
    '?&lang=',
    (lang || 'en'),
    '&callback=JSON_CALLBACK',
    '&suppress_response_codes=true&rnd=',
    Math.random()
  ].join('');
}


function appendTransform(defaults, transform) {
  defaults = angular.isArray(defaults) ? defaults : [defaults];
  return defaults.concat(transform);
}

function parse(data) {
  var response = {
    headers: data.headers,
    tweets: []
  },
  els,
  el,
  tweet,
  x,
  tmp;

  if (data.body) {
    els = angular.element(data.body)[0].getElementsByClassName('tweet');
    for (x = 0; x < els.length; x++) {
      el = els[x];
      tweet = {};
      tweet.retweet = (el.getElementsByClassName('retweet-credit').length > 0);
      tweet.id = el.getAttribute('data-tweet-id');
      tmp = el.getElementsByClassName('e-entry-title')[0];
      tweet.html = tmp.innerHTML;
      tweet.text = tmp.textContent || tmp.innerText; // IE8 doesn't support textContent
      tmp = el.getElementsByClassName('p-author')[0];
      tweet.author = {
        url: tmp.getElementsByClassName('profile')[0].getAttribute('href'),
        avatar: tmp.getElementsByClassName('avatar')[0].getAttribute('src'),
        fullName: tmp.getElementsByClassName('p-name')[0].innerText,
        nickName: tmp.getElementsByClassName('p-nickname')[0].innerText
      };
      tweet.updated = el.getElementsByClassName('dt-updated')[0].innerText;
      tweet.permalink = el.getElementsByClassName('permalink')[0].getAttribute('href');
      if (el.getElementsByClassName('inline-media')[0]) {
        tweet.inlineMedia = el.getElementsByClassName('inline-media')[0].innerHtml;
      }
      response.tweets.push(tweet);
    }
  }
  return response;
}

})();