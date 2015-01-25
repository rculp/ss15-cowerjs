
/*================================================================
=>                   Factory = Auth
==================================================================*/
/*global app*/

app.factory('Auth', ['$firebaseAuth', '$location', 'Firebase', function ($firebaseAuth, $location, Firebase) {

	'use strict';

    function authCallback(authData) {
        if (authData) {
            console.log('Authenticated');
        } else {
            console.log('Logged Out');
        }
    }

    Firebase.onAuth(authCallback);

    return $firebaseAuth(Firebase);

}]);


/*-----  End of Factory = Auth  ------*/