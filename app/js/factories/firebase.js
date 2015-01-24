
/*================================================================
=>                   Factory = Firebase
==================================================================*/
/*global app*/
/*global Firebase*/

app.factory('Firebase', ['FirebaseURL', function (FirebaseURL) {

	'use strict';

    return new Firebase(FirebaseURL);

}]);


/*-----  End of Factory = Firebase  ------*/