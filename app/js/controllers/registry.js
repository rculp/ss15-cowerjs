
/*================================================================
=>                  Controller = Registry
==================================================================*/
/*global app*/

app.controller('RegistryCtrl', ['$scope', '$routeParams', 'UserService', 'FbPostService', 'EventsService', function ($scope, $routeParams, UserService, FbPostService, EventsService) {

	'use strict';

	console.log('Controller ===  RegistryCtrl');

	var _user = UserService.getCurrentUser();

	var _eventId = $routeParams.eventId;

	function checkClaimed (need) {
		return need.taken;
	}

	EventsService.getEvent(_eventId).then(function(result) {
		$scope.event = result.facebook;
		$scope.eventData = result.data[Object.getOwnPropertyNames(result.data)];
		$scope.attendees = result.attendees.data;

		console.log($scope.eventData);

		$scope.guests = [];

		angular.forEach($scope.attendees, function(i) {
			if($scope.event.owner.id != i.id) {
				$scope.guests.push(i);
			}
		});

		$scope.getClaimerName = function (need) {
			var claimerName;
			angular.forEach($scope.event.attendees, function(i) {

				if(i.id === need.person) {
					claimerName = i.name;
				}
			});

			return claimerName;
		}

	    $scope.suggest = function () {
	    	console.log($scope.suggestions);
	    	EventsService.addNewNeeds(Object.getOwnPropertyNames(result.data), $scope.suggestions);
	    }
	});

	$scope.suggestions = ['Pizza', 'Wings', 'Chips', 'Salad', 'Beer'];

	$scope.claimItem = function (need) {
		EventsService.setItemClaim(_eventId, need).then(function (result) {
			console.log(result);
		});
	}

	$scope.publishList = function() {
		var list;
		angular.forEach($scope.event.needs, function(need) {
			list += $scope.getClaimerName(need) + ' is bringing ' + need.name + '\n';
		});
		FbPostService.postMessage(_user.accessToken, _eventId, list);
	}

}]);


/*-----  End of Controller = Registry  ------*/
