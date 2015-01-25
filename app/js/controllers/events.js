app.controller('EventsCtrl', ['$scope', 'UserService', 'Facebook', 'EventsService', function ($scope, UserService, Facebook, EventsService) {
	'use strict';

	$scope.selectedEvent = null;
	$scope.loading = true;

	EventsService.getEvents().then(function(events) {
		if (events.length > 0) {
			var event = events[0];
			$scope.chooseEvent(event);
		}
		$scope.events = events;
	});

	$scope.chooseEvent = function(event) {
		if (!event.dataLoaded) {
			$scope.loading = true;
			EventsService.getEvent(event.id).then(function(result) {
				event.data = result.data;
				event.facebook = result.facebook;
				event.dataLoaded = true;
				$scope.selectedEvent = event;
				$scope.loading = false;
			});
		} else {
			$scope.selectedEvent = event;
		}
	};

}]);