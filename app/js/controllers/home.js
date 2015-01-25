
/*================================================================
=>                  Controller = Home
==================================================================*/
/*global app*/

app.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {

	'use strict';

	console.log('Controller ===  HomeCtrl');

	$scope.goToEvents = function () {
		$location.path('/registry');
	};
}]);


/*-----  End of Controller = Home  ------*/



