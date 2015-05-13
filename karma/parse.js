describe('ngTweets', function() {

  var scope, el;

  beforeEach(module('ngTweets'));

  beforeEach(inject(function($rootScope, $compile) {
    el = angular.element([
      '<div>',
      '</div>'
    ].join(''));
    scope = $rootScope.$new();
    $compile(el)(scope);
    scope.$digest();
  }));

  it('is true', function() {
    expect(1+1).toBe(2);
  });

});
