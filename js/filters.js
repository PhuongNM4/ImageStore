
angular.module('codeblockFilters', [])
    .filter('splitTags', function () {
        return function (input) {
            var arrStr = input.split(',');
            var returnStr = "";
            for (var i = 0; i < arrStr.length; i++) {
                returnStr = returnStr + "<code ng-click='filterByTag(&#39;" + $.trim(arrStr[i]) + "&#39;)'>" + $.trim(arrStr[i]) + "</code>";
            }
            return returnStr;
        };
    })
.filter('fromNow', function () {
    return function (date) {
        return moment(date.split(' ')[2]+ ' '+date.split(' ')[0], 'DD-MM-YYYY h:mm').fromNow();
    }
})


