app.controller('EventsCtrl', ['$scope', 'UserService', 'Facebook', 'EventsService', '$location', 'FbPostService', function ($scope, UserService, Facebook, EventsService, $location, FbPostService) {
	'use strict';

	var _user = UserService.getCurrentUser();

	$scope.selectedEvent = null;
	$scope.organizer = '???';
	$scope.dataAdded = false;
	$scope.loading = true;
	$scope.eventOnlyOnFacebook = true;
	$scope.amEventAdmin = false;

	EventsService.getEvents().then(function(events) {
		if (events.length > 0) {
			var event = events[0];
			$scope.chooseEvent(event);
		} else {
			$scope.loading = false;
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
				$scope.selectedEvent = event;
				initializeEvent();
			});
		} else {
			$scope.selectedEvent = event;
			initializeEvent();
		}
	};

	function initializeEvent() {
		var userId = _user.id;
		var owner = $scope.selectedEvent.facebook.owner.id;
		if(userId === owner){
			$scope.organizer = 'You!';
		} else {
			$scope.organizer = $scope.selectedEvent.facebook.owner.name;
		}
		$scope.amEventAdmin = amEventAdmin();
		$scope.eventOnlyOnFacebook = eventOnlyOnFacebook();
	}

	function eventOnlyOnFacebook() {
		return $scope.selectedEvent == null || !$scope.selectedEvent.data;
	};

	function amEventAdmin() {
		if ($scope.selectedEvent == null) {
			return false;
		}

		if (eventOnlyOnFacebook()) {
			var validFacebookData = $scope.selectedEvent.facebook;
			var isOwner = $scope.selectedEvent.facebook.owner.id == UserService.getCurrentUser().id
			return validFacebookData && isOwner;
		}

		return $scope.selectedEvent.data && $scope.selectedEvent.data.admins && $scope.selectedEvent.data.admins.indexOf(UserService.getCurrentUser().id) !== -1;
	}

	$scope.addEvent = function() {
		//upon user's permission push this data to the event service to add to firebase
		var firebasePromise = EventsService.addToFireBase($scope.selectedEvent);
		firebasePromise.then(function(event){
			$location.path('/registry/' + event.id);
		});
	};

	$scope.requestRegistry = function () {
		FbPostService.postCOSlink(UserService.getCurrentUser().accessToken, 'guest', $scope.selectedEvent.id);
		$scope.dataAdded = true;
	}

}]);