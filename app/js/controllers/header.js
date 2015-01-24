
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



