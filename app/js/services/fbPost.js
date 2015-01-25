/* global app */

app.service('FbPostService', ['Facebook', function (Facebook) {
    'use strict';

    this.postCOSlink = function (userToken, userType, eventId) {
        if (userType === 'host') {
            Facebook.api('/' + eventId + '/feed',
            'POST',
            {
                'access_token': userToken,
                'message': 'Join me on Chips Or Something!',
                'link': 'http://development.ss15-cowerjs.divshot.io',
                'picture': 'http://development.ss15-cowerjs.divshot.io/img/gameday.jpg',
                'description': 'Who\'s bringing what?'
            },
            function (response) {
                if (!response || response.error) {
                    console.log(response);
                } else {
                    console.log(response);
                }
            });
        } else if (userType === 'guest') {
            Facebook.api('/' + eventId + '/feed',
            'POST',
            {
                'access_token': userToken,
                'message': 'Hey, should I bring Chips Or Something?',
                'link': 'http://development.ss15-cowerjs.divshot.io',
                'picture': 'http://development.ss15-cowerjs.divshot.io/img/gameday.jpg',
                'description': 'Who\'s bringing what?'
            },
            function (response) {
                 if (!response || response.error) {
                    console.log(response);
                } else {
                    console.log(response);
                }
            });
        }
    };

    this.postMessage = function(userToken, eventId, message) {
    Facebook.api('/' + eventId + '/feed',
        'POST',
        {
            'access_token': userToken,
            'message': message
        },
        function (response) {
            if (!response || response.error) {
                console.log(response);
            } else {
                console.log(response.id);
            }
        });
    };
}]);