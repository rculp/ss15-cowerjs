
/*================================================================
=>                  App = chipsOrSomething
==================================================================*/
/*global angular*/

var app = angular.module('chipsOrSomething', ["ngRoute", "ngAnimate", "firebase"]);


app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	'use strict';

	$routeProvider
		.when('/home', {
			templateUrl: 'templates/home.html', 
			controller: 'HomeCtrl'
		})
		.otherwise({
			redirectTo: '/home'
		});

	$locationProvider.hashPrefix('!');

	// This is required for Browser Sync to work poperly
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);


/*================================================================
=>                  chipsOrSomething App Run()  
==================================================================*/

app.run(['$rootScope', function ($rootScope) {
	
	'use strict';

	console.log('Angular.js run() function...');
}]);




/* ---> Do not delete this comment (Values) <--- */

app.constant('FirebaseURL', 'https://torid-inferno-6989.firebaseio.com');
/* ---> Do not delete this comment (Constants) <--- */

/*================================================================
=>                  Controller = Headerctrl
==================================================================*/
/*global app*/

app.controller('HeaderCtrl', ['$scope', 'Auth', function ($scope, Auth) {

	'use strict';

  $scope.auth = Auth;
  $scope.user = $scope.auth.$getAuth();

	console.log('Controller ===  HeaderCtrl');
}]);


/*-----  End of Controller = Headerctrl  ------*/





/*================================================================
=>                  Controller = Home
==================================================================*/
/*global app*/

app.controller('HomeCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {

  'use strict';

  $scope.auth = Auth;
  $scope.user = $scope.auth.$getAuth();

	console.log('Controller ===  HomeCtrl');
}]);


/*-----  End of Controller = Home  ------*/





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

/*================================================================
=>                  Directive = ngShowAuth
==================================================================*/
/*global app*/

app.directive('ngShowAuth', ['$rootScope', '$timeout', 'Firebase', function ($rootScope, $timeout, Firebase) {
   
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
      element.addClass('ng-cloak'); // hide until we process it

      function update() {
        // sometimes if ngCloak exists on same element, they argue, so make sure that
        // this one always runs last for reliability
        $timeout(function () {
          element.toggleClass('ng-cloak', !isLoggedIn);
        }, 0);
      }

      update();

      Firebase.onAuth(update);

    }
  };
}]);


/*-----  End of Directive = ngShowAuth  ------*/

/*================================================================
=>                   Factory = Auth
==================================================================*/
/*global app*/

app.factory('Auth', ['$firebaseAuth', '$location', 'Firebase', function ($firebaseAuth, $location, Firebase) {

	'use strict';

  function authCallback(authData) {
    if (authData) {
      console.log("Authenticated");
    } else {
      console.log("Logged Out");
    }
  }

  Firebase.onAuth(authCallback);

  return $firebaseAuth(Firebase);

}]);


/*-----  End of Factory = Auth  ------*/

/*================================================================
=>                   Factory = Firebase
==================================================================*/
/*global app*/

app.factory('Firebase', ['FirebaseURL', function (FirebaseURL) {

	'use strict';

  return new Firebase(FirebaseURL);

}]);


/*-----  End of Factory = Firebase  ------*/