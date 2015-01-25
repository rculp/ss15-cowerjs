app.controller('EventsCtrl', ['$scope', 'UserService', 'Facebook', function ($scope, UserService, Facebook) {
	'use strict';

	var _user = UserService.getCurrentUser();

	$scope.username = _user.displayName;

	$scope.selectedEvent = null;

	$scope.loading = true;

	$scope.chooseEvent = function(event) {
		$scope.selectedEvent = event;
	};


	var today = new Date();
	var todayUnix = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 1000;
    var nextweekUnix = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14).getTime() / 1000;

	Facebook.api('/' + _user.id + '/events/attending', { access_token: _user.accessToken, since: todayUnix, until: nextweekUnix }, 
	function (response) {
		$scope.loading = false;
		$scope.events = response.data;
		if ($scope.events.length > 0) {
			$scope.selectedEvent = $scope.events[0];
		}
		return response.data;
	});

}]);