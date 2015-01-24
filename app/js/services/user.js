/* global app */

app.service('UserService', ['Auth','Facebook', function (Auth, FB) {

  	this.getCurrentUser = function() { return Auth.$getAuth().facebook; };

}]);