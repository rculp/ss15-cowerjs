app.controller('EventsCtrl', ['$scope', 'UserService', 'Facebook', 'EventsService', function ($scope, UserService, Facebook, EventsService) {
	'use strict';

	var _user = UserService.getCurrentUser();

	$scope.username = _user.displayName;

	$scope.selectedEvent = null;

	$scope.loading = true;

	EventsService.getEvents().then(function(events) {
		if (events.length > 0) {
			$scope.selectedEvent = events[0];
		}
		$scope.loading = false;
		$scope.events = events;
	});

	$scope.chooseEvent = function(event) {
		$scope.selectedEvent = event;
	};

}]);