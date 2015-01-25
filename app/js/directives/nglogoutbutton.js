
/*================================================================
=>                  Directive = ngLogoutButton
==================================================================*/
/*global app*/

app.directive('ngLogoutButton', ['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
   
    'use strict';

    function logout() {
    	Auth.$unauth();
    	$location.path("/");
    }

	return {
		restrict: 'AE',
		link: function (scope, element, attrs) {
			element.on('click', logout);
		}
	};
}]);


/*-----  End of Directive = ngLogoutButton  ------*/