/* global app */

app.service('UserService', ['Auth','Facebook', function (Auth, FB) {
	'use strict';

  	this.getCurrentUser = function() { return Auth.$getAuth().facebook; };

}]);