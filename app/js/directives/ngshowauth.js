
/*================================================================
=>                  Directive = ngShowAuth
==================================================================*/
/*global app*/

app.directive('ngShowAuth', ['$rootScope', '$timeout', 'Firebase', function ($rootScope, $timeout, Firebase) {
   
	'use strict';

	var isLoggedIn = false;
	function onAuth(userData) {
		if (userData) {
			isLoggedIn = true;
		} else {
			isLoggedIn = false;
		}
	}

	Firebase.onAuth(onAuth);

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.addClass('ng-cloak'); // hide until we process it

			function update() {
				// sometimes if ngCloak exists on same element, they argue, so make sure that
				// this one always runs last for reliability
				$timeout(function () {
					element.toggleClass('ng-cloak', !isLoggedIn);
				}, 0);
			}

			update();

			Firebase.onAuth(update);
		}
	};
}]);


/*-----  End of Directive = ngShowAuth  ------*/