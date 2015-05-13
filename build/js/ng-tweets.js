// Nicholas Johnson (www.nicholasjohnson.com)
// Forward Advance Training (www.forwardadvance.com)
// MIT licence

(function() {
var appendTransform = function(defaults, transform) {
  defaults = angular.isArray(defaults) ? defaults : [defaults];
  return defaults.concat(transform);
};

var parse = function(data) {
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
      tweet.html = el.getElementsByClassName('e-entry-title')[0].innerHTML;
      tweet.text = el.getElementsByClassName('e-entry-title')[0].innerText;
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
};

angular.module('ngTweets', [])
  .service('tweets', ["$http", function($http) {
    var service = {
      get: function(config) {
        var url = [
          'http://cdn.syndication.twimg.com/widgets/timelines/',
          config.widgetId,
          '?&lang=',
          (config.lang || 'en'),
          '&callback=JSON_CALLBACK',
          '&suppress_response_codes=true&rnd=',
          Math.random()
        ].join('');

        return $http({
          url: url,
          method: 'JSONP',
          transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
            return parse(value);
          })
        });
      }
    };
    return service;
  }]);


})();