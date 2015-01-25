/* global app */

app.service('UserService', ['Auth','Facebook', function (Auth, Facebook) {
	'use strict';

  	this.getCurrentUser = function() { return Auth.$getAuth().facebook; };
}]);