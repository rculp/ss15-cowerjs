
/*================================================================
=>                  Directive = ngHideAuth
==================================================================*/
/*global app*/

app.directive('ngHideAuth', ['$rootScope', '$timeout', 'Firebase', function ($rootScope, $timeout, Firebase) {
   
    'use strict';

	var isLoggedIn = false;

  Firebase.onAuth(onAuth);

  function onAuth(userData) {
    if (userData) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
  }

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      function update() {
        element.addClass('ng-cloak'); // hide until we process it
        // sometimes if ngCloak exists on same element, they argue, so make sure that
        // this one always runs last for reliability
        $timeout(function () {
          element.toggleClass('ng-cloak', isLoggedIn);
        }, 0);
      }

      update();

      Firebase.onAuth(update);

    }
  };
}]);


/*-----  End of Directive = ngHideAuth  ------*/