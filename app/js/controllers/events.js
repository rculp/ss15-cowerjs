app.controller('EventsCtrl', ['$scope','UserService', function ($scope, UserService) {

	var _user = UserService.getCurrentUser();

	$scope.username = _user.displayName;

	
}]);