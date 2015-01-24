app.controller('EventsCtrl', ['$scope','UserService', 'Facebook', function ($scope, UserService, Facebook) {

	var _user = UserService.getCurrentUser();

	$scope.username = _user.displayName;

	$scope.events = function() {
		Facebook.api('/' + _user.id + '', { access_token: _user.accessToken }, function (response) {
			console.log(response);
			return response;
		});
	};

	
}]);