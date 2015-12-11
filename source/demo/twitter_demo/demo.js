angular.module('app', ['ngTweets'])
  .controller('twitterController', function($scope, tweets) {
    $scope.tweets = tweets.get({
      widgetId: '598065534836600832'
    }).then(function(response){
      $scope.tweets = response.data;
    });
  });
