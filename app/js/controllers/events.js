app.controller('EventsCtrl', ['$scope', 'UserService', 'Facebook', 'EventsService', function ($scope, UserService, Facebook, EventsService) {
	'use strict';

	$scope.selectedEvent = null;

	var _user = UserService.getCurrentUser();

	$scope.organizer = '???';

	$scope.dataAdded = false;

	$scope.buttonMessage = 'Add event to Chips or Something';

	$scope.loading = true;

	EventsService.getEvents().then(function(events) {
		if (events.length > 0) {
			var event = events[0];
			$scope.chooseEvent(event);
		}
		$scope.events = events;
		$scope.loading = false;
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
				$scope.selectedEvent = event;
				var userId = _user.id;
				var owner = $scope.selectedEvent.facebook.owner.id;
				if(userId === owner){
					$scope.buttonMessage = 'Add your event to Chips or Something';
					$scope.organizer = 'You!';
				}
				else{
					$scope.buttonMessage = 'Suggest using Chips or Something';
					$scope.organizer = $scope.selectedEvent.facebook.owner.name;
				}
			});
		} else {
			$scope.selectedEvent = event;
		}
		
	};

	$scope.addEvent = function(){
			//upon user's permission push this data to the event service to add to firebase
			var firebasePromise = EventsService.addToFireBase($scope.selectedEvent);
			firebasePromise.then(function(){
				$scope.dataAdded = true;
			});
	};

}]);