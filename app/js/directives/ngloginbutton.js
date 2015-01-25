
/*================================================================
=>                  Directive = ngLoginButton
==================================================================*/
/*global app*/

app.directive('ngLoginButton', ['$rootScope', '$location', 'Firebase', function ($rootScope, $location, Firebase) {
   
    'use strict';

    function authenticate() {
    	Firebase.authWithOAuthPopup('facebook', authenticated, {
    		scope: 'public_profile,user_friends,user_events,manage_notifications,email,user_groups'
    	});
    }

    function authenticated(error, authData) {
		if (error) {
			console.log("Unauthenticated");
		} else {
			console.log("Authenticated");
	    	$location.path('/events');
		}
    }


	return {
		restrict: 'AE',
		link: function (scope, element, attrs) {
			element.on('click', authenticate);
		}
	};
}]);


/*-----  End of Directive = ngLoginButton  ------*/