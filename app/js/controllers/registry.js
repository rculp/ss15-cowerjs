
/*================================================================
=>                  Controller = Registry
==================================================================*/
/*global app*/

app.controller('RegistryCtrl', ['$scope', function ($scope) {

	'use strict';

	console.log('Controller ===  RegistryCtrl');

	var event = {
		'name' : 'The Big Game',
		'owner': {
			'id': 1,
			'name': 'John Doe'
		},
		'admins': [
			{
				'id': 2,
				'name': 'Jane Doe',
			},
			{
				'id': 3,
				'name': 'Joe Dirt'
			}
		],
		'attendees': [
			{
				'id': 2,
				'name': 'Jane Doe',
			},
			{
				'id': 3,
				'name': 'Joe Dirt'
			},
			{
				'id': 4,
				'name': 'James Bond'
			},
			{
				'id': 5,
				'name': 'Jake Smith'
			}
		],
		'needs': {
			'food': [
				{
					'name': 'Pizza',
					'claimedBy': 5
				},
				{
					'name': 'Wings',
					'claimedBy': 2
				},
				{
					'name': 'Chips',
					'claimedBy': null
				},
				{
					'name': 'Salad',
					'claimedBy': 4
				}
			],
			'drink': [
				{
					'name': 'Beer',
					'claimedBy': 1
				},
				{
					'name': 'Soda',
					'claimedBy': 3
				}
			]
		}
	}

	$scope.getEventName = function() {
		return event.name;
	};

	$scope.host = event.owner.name;

	$scope.admins = [];

	angular.forEach(event.admins, function(i) {
		$scope.admins.push(i.name);
	});

	$scope.guests = [];

	angular.forEach(event.attendees, function(i) {
		if($scope.admins.indexOf(i.name) === -1) {
			$scope.guests.push(i.name);
		}
	});

	$scope.foods = [];

	angular.forEach(event.needs.food, function(i) {
		var isClaimed = (i.claimedBy === null);
		var foodObj = {
			'name': i.name,
			'claimedBy': i.claimedBy,
			'isClaimed': isClaimed,
			'getClaimedBy': function() {
				if (event.owner.id === i.claimedBy) {
					return event.owner.name;
				} else {
					var name;
					angular.forEach(event.attendees, function(a) {
						if (a.id === i.claimedBy) {
							name = a.name;
						}
					});
					return name;
				}
			}
		};
		$scope.foods.push(foodObj);
	});

	$scope.drinks = [];

	angular.forEach(event.needs.drink, function(i) {
		var isClaimed = (i.claimedBy === null);
		var drinkObj = {
			'name': i.name,
			'claimedBy': i.claimedBy,
			'isClaimed': isClaimed,
			'getClaimedBy': function() {
				if (event.owner.id === i.claimedBy) {
					return event.owner.name;
				} else {
					var name;
					angular.forEach(event.attendees, function(a) {
						if (a.id === i.claimedBy) {
							name = a.name;
						}
					});
					return name;
				}
			}
		};
		$scope.drinks.push(drinkObj);
	});
}]);


/*-----  End of Controller = Registry  ------*/
