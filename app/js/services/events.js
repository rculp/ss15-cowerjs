
/*================================================================
=>                   Service = Events
==================================================================*/
/*global app*/

app.service('EventsService', ['$rootScope', 'Firebase', 'Facebook', 'UserService', '$q',  function ($rootScope, Firebase, Facebook, UserService, $q) {

	'use strict';

	var events = [];
	var user = UserService.getCurrentUser();

	function getFacebookData() {
		var today = new Date();
		var todayUnix = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 1000;
	    var nextweekUnix = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14).getTime() / 1000;

		return Facebook.api(
			'/' + user.id + '/events/attending', 
			{ access_token: user.accessToken, since: todayUnix, until: nextweekUnix }, 
			function (response) {
				events = response.data;
			}
		);
	}

	function getExtraData() {
		var promises = [];
		events.forEach(function (event) {
			var firebasePromise = $q(
				function (resolve, reject) {
					Firebase.child('events/' + event.id).once('value', 
						function (data) {
							event.data = data.val();
							resolve();
						},
						function (error) {
							reject();
						}
					);
				}
			);
			var facebookPromise = Facebook.api(
				'/' + event.id,
				{ access_token: user.accessToken },
				function (response) {
					event.facebook = response;
				}
			);
			promises.push(firebasePromise);
			promises.push(facebookPromise);
		});
		return $q.all(promises);
	}

	this.getEvents = function() {
		return $q(function (resolve, reject) {
			getFacebookData()
			.then(getExtraData)
			.then(function () { 
				console.log(events);
				resolve(events);
			});
		});
	}

}]);


/*-----  End of Service = Events  ------*/