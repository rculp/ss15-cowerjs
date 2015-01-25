
/*================================================================
=>                  App = chipsOrSomething
==================================================================*/
/*global angular*/

var app = angular.module('chipsOrSomething', ['ngRoute', 'ngAnimate', 'firebase', 'ui.select']);


app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	'use strict';

	$routeProvider
		.when('/home', {
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl'
		})
		.when('/about', {
			templateUrl: 'templates/about.html'
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