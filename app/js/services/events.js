
/*================================================================
=>                   Service = Events
==================================================================*/
/*global app*/

app.service('EventsService', ['$rootScope', 'Firebase', 'Facebook', 'UserService', '$q', 'orderByFilter', function ($rootScope, Firebase, Facebook, UserService, $q, orderByFilter) {

	'use strict';

	var user = UserService.getCurrentUser();

	function getFacebookData() {
		var today = new Date();
		var todayUnix = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 1000;
	    var nextweekUnix = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14).getTime() / 1000;

		return Facebook.api(
			'/' + user.id + '/events/attending', 
			{ access_token: user.accessToken, since: todayUnix, until: nextweekUnix }, 
			function (response) {
				return response;
			}
		);
	}

	this.getEvents = function() {
		return $q(function (resolve, reject) {
			getFacebookData()
			.then(function (response) { 
				resolve(orderByFilter(response.data, 'start_time'));
			});
		});
	}

	this.getEvent = function(id) {
		var firebasePromise = $q(
			function (resolve, reject) {
				Firebase.child('events/' + id).once('value', 
					function (data) {
						resolve(data.val());
					},
					function (error) {
						reject();
					}
				);
			}
		);
		var facebookPromise = Facebook.api(
			'/' + id,
			{ access_token: user.accessToken },
			function (response) {
				return response;
			}
		);
		return $q.all({ data: firebasePromise, facebook: facebookPromise });
	}

}]);


/*-----  End of Service = Events  ------*/