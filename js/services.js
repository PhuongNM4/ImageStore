
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

