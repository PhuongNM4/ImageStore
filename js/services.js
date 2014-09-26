angular.module('codeblockServices', ['firebase'])

.factory('CodeblocksFactory', ['$firebase',
    function ($firebase) {
        return {
            syncArray: function (fbUrl, limit) {
                return $firebase(new Firebase(fbUrl).limit(limit)).$asArray();
            },
            syncAllAsArray: function (fbUrl) {
                return $firebase(new Firebase(fbUrl)).$asArray();
            },
            syncObject: function (fbUrl, limit) {
                return $firebase(new Firebase(fbUrl)).$asObject();
            }
        }
    }
])

.factory('CommentFactory', ['$firebase',
    function ($firebase) {
        return {
            getComments: function (imageUrl) {
                return $firebase(new Firebase(imageUrl + '/comments'));
            }
        }
    }
])