app.controller('EventsCtrl', ['$scope','UserService', 'Facebook', function ($scope, UserService, Facebook) {

	var _user = UserService.getCurrentUser();

	$scope.username = _user.displayName;

	Facebook.api('/' + _user.id + '/events/attending', { access_token: _user.accessToken }, 
	function (response) {
		$scope.events = response.data;
		return response.data;
	});
	
}]);