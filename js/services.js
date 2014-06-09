
angular.module('codeblockServices', ['firebase'])

.factory('CodeblocksFactory', ['$firebase',
    function ($firebase) {
        return {
            getData: function (fbUrl) {
                return $firebase(new Firebase(fbUrl));
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

