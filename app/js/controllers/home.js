
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



